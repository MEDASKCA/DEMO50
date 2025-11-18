// Session Allocation Service - AI-Powered Smart Scheduling
// Allocates procedures to theatre sessions with intelligent matching
// Commercial-grade algorithm for optimal theatre utilization

import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Procedure } from '@/lib/types/procedureTypes';

export interface TheatreSession {
  id?: string;
  date: string;                       // YYYY-MM-DD
  day: string;                        // Monday, Tuesday, etc.
  theatre: string;                    // Theatre name
  theatreId?: string;
  specialty: string;
  subspecialty?: string;
  sessionType: string;                // AM, PM, Day, Long Day, etc.
  startTime: string;                  // HH:MM
  endTime: string;                    // HH:MM
  totalMinutes: number;
  allocatedMinutes: number;
  availableMinutes: number;
  utilization: number;                // Percentage
  surgeonId?: string;
  surgeonName?: string;
  procedures: AllocatedProcedure[];
  status: 'Available' | 'Fully Booked' | 'Partially Booked' | 'Cancelled';
  notes?: string;
}

export interface AllocatedProcedure {
  procedureId: string;
  procedureName: string;
  opcsCode: string;
  patientName: string;
  hospitalNumber: string;
  duration: number;                   // Minutes
  startTime: string;                  // HH:MM
  endTime: string;                    // HH:MM
  priority: string;
  isBreached?: boolean;
}

export interface AllocationResult {
  success: boolean;
  allocated: number;
  unallocated: number;
  sessions: TheatreSession[];
  unallocatedProcedures: Procedure[];
  errors: string[];
  recommendations: string[];
}

export interface AllocationConstraints {
  startDate: Date;
  endDate: Date;
  specialtyFilter?: string[];
  surgeonFilter?: string[];
  priorityFilter?: string[];
  preferredTheatres?: string[];
  allowPartialAllocation?: boolean;
  respectSurgeonPreferences?: boolean;
}

/**
 * Calculate available sessions in date range
 */
export async function getAvailableSessions(
  startDate: Date,
  endDate: Date,
  specialty?: string
): Promise<TheatreSession[]> {
  try {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    let q = query(
      collection(db, 'theatreSessions'),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr)
    );

    const snapshot = await getDocs(q);
    const sessions: TheatreSession[] = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();

      // Filter by specialty if provided
      if (specialty && data.specialty !== specialty) {
        return;
      }

      sessions.push({
        id: docSnap.id,
        date: data.date,
        day: data.day || new Date(data.date).toLocaleDateString('en-GB', { weekday: 'long' }),
        theatre: data.theatre || data.theatreName,
        theatreId: data.theatreId,
        specialty: data.specialty,
        subspecialty: data.subspecialty,
        sessionType: data.sessionType || 'Day',
        startTime: data.startTime || '08:00',
        endTime: data.endTime || '17:00',
        totalMinutes: data.totalMinutes || 480,
        allocatedMinutes: data.allocatedMinutes || 0,
        availableMinutes: data.availableMinutes || data.totalMinutes || 480,
        utilization: data.utilization || 0,
        surgeonId: data.surgeonId,
        surgeonName: data.surgeonName,
        procedures: data.procedures || [],
        status: data.status || 'Available',
        notes: data.notes
      });
    });

    // Sort by date, then by start time
    sessions.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });

    return sessions;
  } catch (error) {
    console.error('Error getting available sessions:', error);
    return [];
  }
}

/**
 * Score a session for a procedure (AI matching algorithm)
 */
function scoreSession(
  procedure: Procedure,
  session: TheatreSession
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Specialty match (CRITICAL - 40 points)
  if (session.specialty === procedure.specialty) {
    score += 40;
    reasons.push('✓ Specialty match');
  } else {
    return { score: 0, reasons: ['✗ Specialty mismatch'] };
  }

  // 2. Subspecialty match (10 points)
  if (session.subspecialty && procedure.subspecialty) {
    if (session.subspecialty === procedure.subspecialty) {
      score += 10;
      reasons.push('✓ Subspecialty match');
    }
  }

  // 3. Surgeon match (15 points)
  if (session.surgeonId && session.surgeonId === procedure.surgeonId) {
    score += 15;
    reasons.push('✓ Surgeon already assigned to session');
  } else if (!session.surgeonId) {
    score += 10;
    reasons.push('✓ Session unassigned (can allocate any surgeon)');
  }

  // 4. Time availability (15 points)
  if (session.availableMinutes >= procedure.estimatedDuration) {
    score += 15;
    reasons.push(`✓ Sufficient time (${session.availableMinutes} mins available)`);
  } else {
    return { score: 0, reasons: ['✗ Insufficient time'] };
  }

  // 5. Priority urgency (10 points)
  if (procedure.priority === 'P1') {
    score += 10;
    reasons.push('✓ P1 priority (urgent)');
  } else if (procedure.priority === 'P2') {
    score += 7;
    reasons.push('✓ P2 priority');
  }

  // 6. RTT breach risk (10 points)
  if (procedure.isBreached) {
    score += 10;
    reasons.push('✓ Already breached (high priority)');
  } else if (procedure.daysToTarget <= 7) {
    score += 8;
    reasons.push('✓ Near breach (< 7 days)');
  } else if (procedure.daysToTarget <= 14) {
    score += 5;
    reasons.push('✓ Approaching breach (< 14 days)');
  }

  // 7. Session utilization bonus (prefer filling sessions efficiently)
  const utilizationAfter = ((session.allocatedMinutes + procedure.estimatedDuration) / session.totalMinutes) * 100;
  if (utilizationAfter >= 80 && utilizationAfter <= 95) {
    score += 5;
    reasons.push('✓ Optimal utilization (80-95%)');
  } else if (utilizationAfter > 95) {
    score -= 5;
    reasons.push('⚠ Over-utilization risk');
  }

  return { score, reasons };
}

/**
 * Allocate procedures to sessions (Main AI Algorithm)
 */
export async function allocateProceduresToSessions(
  procedures: Procedure[],
  constraints: AllocationConstraints
): Promise<AllocationResult> {
  const result: AllocationResult = {
    success: false,
    allocated: 0,
    unallocated: 0,
    sessions: [],
    unallocatedProcedures: [],
    errors: [],
    recommendations: []
  };

  try {
    // 1. Get available sessions in date range
    result.sessions = await getAvailableSessions(
      constraints.startDate,
      constraints.endDate,
      constraints.specialtyFilter?.[0]
    );

    if (result.sessions.length === 0) {
      result.errors.push('No available sessions found in date range');
      return result;
    }

    // 2. Filter procedures
    let proceduresToAllocate = [...procedures];

    if (constraints.specialtyFilter && constraints.specialtyFilter.length > 0) {
      proceduresToAllocate = proceduresToAllocate.filter(p =>
        constraints.specialtyFilter!.includes(p.specialty)
      );
    }

    if (constraints.surgeonFilter && constraints.surgeonFilter.length > 0) {
      proceduresToAllocate = proceduresToAllocate.filter(p =>
        constraints.surgeonFilter!.includes(p.surgeonId)
      );
    }

    if (constraints.priorityFilter && constraints.priorityFilter.length > 0) {
      proceduresToAllocate = proceduresToAllocate.filter(p =>
        constraints.priorityFilter!.includes(p.priority)
      );
    }

    // 3. Sort procedures by priority (breached > P1 > P2 > P3 > P4 > longest waiting)
    proceduresToAllocate.sort((a, b) => {
      if (a.isBreached !== b.isBreached) {
        return a.isBreached ? -1 : 1;
      }
      const priorityOrder = { 'P1': 1, 'P2': 2, 'P3': 3, 'P4': 4, 'Planned': 5 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      return b.daysWaiting - a.daysWaiting;
    });

    // 4. Allocate each procedure to best matching session
    for (const procedure of proceduresToAllocate) {
      // Skip if already scheduled
      if (procedure.schedulingStatus === 'Scheduled') {
        continue;
      }

      // Find best matching sessions
      const sessionScores = result.sessions.map(session => ({
        session,
        ...scoreSession(procedure, session)
      }));

      // Sort by score (highest first)
      sessionScores.sort((a, b) => b.score - a.score);

      // Try to allocate to best session
      const bestMatch = sessionScores[0];

      if (bestMatch.score > 0) {
        // Allocate procedure to this session
        const session = bestMatch.session;

        // Calculate start/end times
        const startMinutes = session.allocatedMinutes;
        const startHour = Math.floor(startMinutes / 60);
        const startMin = startMinutes % 60;
        const sessionStartParts = session.startTime.split(':');
        const sessionStartHour = parseInt(sessionStartParts[0]);
        const sessionStartMin = parseInt(sessionStartParts[1]);
        const procStartHour = sessionStartHour + startHour;
        const procStartMin = sessionStartMin + startMin;
        const procStartTime = `${String(procStartHour).padStart(2, '0')}:${String(procStartMin).padStart(2, '0')}`;

        const endMinutes = startMinutes + procedure.estimatedDuration;
        const endHour = Math.floor(endMinutes / 60);
        const endMin = endMinutes % 60;
        const procEndHour = sessionStartHour + endHour;
        const procEndMin = sessionStartMin + endMin;
        const procEndTime = `${String(procEndHour).padStart(2, '0')}:${String(procEndMin).padStart(2, '0')}`;

        // Add procedure to session
        session.procedures.push({
          procedureId: procedure.id,
          procedureName: procedure.procedureName,
          opcsCode: procedure.opcsCode,
          patientName: procedure.patientName,
          hospitalNumber: procedure.hospitalNumber,
          duration: procedure.estimatedDuration,
          startTime: procStartTime,
          endTime: procEndTime,
          priority: procedure.priority,
          isBreached: procedure.isBreached
        });

        // Update session metrics
        session.allocatedMinutes += procedure.estimatedDuration;
        session.availableMinutes -= procedure.estimatedDuration;
        session.utilization = Math.round((session.allocatedMinutes / session.totalMinutes) * 100);

        if (session.utilization >= 95) {
          session.status = 'Fully Booked';
        } else if (session.utilization > 0) {
          session.status = 'Partially Booked';
        }

        // Assign surgeon to session if not already assigned
        if (!session.surgeonId) {
          session.surgeonId = procedure.surgeonId;
          session.surgeonName = procedure.surgeonName;
        }

        result.allocated++;
      } else {
        // Could not allocate
        result.unallocatedProcedures.push(procedure);
        result.unallocated++;
        result.errors.push(
          `Could not allocate ${procedure.procedureName} (${procedure.patientName}): ${bestMatch.reasons.join(', ')}`
        );
      }
    }

    // 5. Generate recommendations
    if (result.unallocated > 0) {
      result.recommendations.push(
        `${result.unallocated} procedures could not be allocated. Consider adding more sessions.`
      );

      // Group unallocated by specialty
      const unallocatedBySpecialty: { [specialty: string]: number } = {};
      result.unallocatedProcedures.forEach(p => {
        unallocatedBySpecialty[p.specialty] = (unallocatedBySpecialty[p.specialty] || 0) + 1;
      });

      Object.entries(unallocatedBySpecialty).forEach(([specialty, count]) => {
        result.recommendations.push(
          `Add ${count} more ${specialty} session(s) to accommodate waiting procedures`
        );
      });
    }

    if (result.allocated > 0) {
      result.recommendations.push(
        `Successfully allocated ${result.allocated} procedures across ${result.sessions.filter(s => s.procedures.length > 0).length} sessions`
      );
    }

    // Check utilization
    const averageUtilization = result.sessions.length > 0
      ? result.sessions.reduce((sum, s) => sum + s.utilization, 0) / result.sessions.length
      : 0;

    if (averageUtilization < 70) {
      result.recommendations.push(
        `Average utilization is ${Math.round(averageUtilization)}%. Consider consolidating sessions to improve efficiency.`
      );
    }

    result.success = true;
  } catch (error: any) {
    console.error('Error allocating procedures:', error);
    result.errors.push(error.message || 'Unknown error during allocation');
  }

  return result;
}

/**
 * Save allocation results to Firebase
 */
export async function saveAllocation(sessions: TheatreSession[]): Promise<{
  success: boolean;
  saved: number;
  errors: string[];
}> {
  const result = {
    success: false,
    saved: 0,
    errors: [] as string[]
  };

  try {
    for (const session of sessions) {
      if (session.procedures.length === 0) continue;

      const sessionData = {
        ...session,
        updatedAt: new Date().toISOString()
      };

      if (session.id) {
        // Update existing session
        await updateDoc(doc(db, 'theatreSessions', session.id), sessionData);
      } else {
        // Create new session
        await addDoc(collection(db, 'theatreSessions'), sessionData);
      }

      result.saved++;
    }

    result.success = true;
  } catch (error: any) {
    console.error('Error saving allocation:', error);
    result.errors.push(error.message || 'Failed to save allocation');
  }

  return result;
}
