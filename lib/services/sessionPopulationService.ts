// Session Population Service
// Auto-populates theatre sessions from generated procedures

import { collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GeneratedProcedure } from '@/lib/types/waitingListTypes';

export interface SessionSlot {
  theatreId: string;
  theatreName: string;
  unitId: string;
  unitName: string;
  date: string; // YYYY-MM-DD
  sessionType: 'AM' | 'PM' | 'FULL' | 'EXTENDED' | 'EVE' | 'AD';
  startTime: string;
  endTime: string;
  specialtyId?: string;
  specialtyName?: string;
  surgeonId?: string;
  surgeonName?: string;
  availableMinutes: number;
  bookedMinutes: number;
  procedures: GeneratedProcedure[];
}

/**
 * Gets available session slots for a date range
 */
export async function getAvailableSessionSlots(
  startDate: string,
  endDate: string
): Promise<SessionSlot[]> {
  try {
    // Fetch theatre sessions from Firebase
    const sessionsSnap = await getDocs(collection(db, 'theatreSessions'));
    const slots: SessionSlot[] = [];

    sessionsSnap.forEach(doc => {
      const data = doc.data();
      const sessionDate = data.date;

      // Filter by date range
      if (sessionDate >= startDate && sessionDate <= endDate) {
        // Calculate session duration
        const sessionDuration = calculateSessionDuration(data.sessionType);

        slots.push({
          theatreId: data.theatreId || doc.id,
          theatreName: data.theatreName || 'Unknown Theatre',
          unitId: data.unitId || '',
          unitName: data.unitName || '',
          date: sessionDate,
          sessionType: data.sessionType,
          startTime: getSessionStartTime(data.sessionType),
          endTime: getSessionEndTime(data.sessionType),
          specialtyId: data.specialtyId,
          specialtyName: data.specialtyName,
          surgeonId: data.surgeonId,
          surgeonName: data.surgeonName,
          availableMinutes: sessionDuration,
          bookedMinutes: data.bookedMinutes || 0,
          procedures: []
        });
      }
    });

    return slots.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.theatreName.localeCompare(b.theatreName);
    });
  } catch (error) {
    console.error('Error fetching session slots:', error);
    return [];
  }
}

/**
 * Calculates session duration in minutes
 */
function calculateSessionDuration(sessionType: string): number {
  switch (sessionType) {
    case 'AM': return 240; // 4 hours
    case 'PM': return 240; // 4 hours
    case 'EVE': return 240; // 4 hours
    case 'FULL': return 480; // 8 hours
    case 'EXTENDED': return 600; // 10 hours
    case 'AD': return 240; // 4 hours (add-on)
    default: return 240;
  }
}

/**
 * Gets session start time
 */
function getSessionStartTime(sessionType: string): string {
  switch (sessionType) {
    case 'AM': return '08:00';
    case 'PM': return '13:00';
    case 'EVE': return '17:00';
    case 'FULL': return '08:00';
    case 'EXTENDED': return '08:00';
    case 'AD': return '17:00';
    default: return '08:00';
  }
}

/**
 * Gets session end time
 */
function getSessionEndTime(sessionType: string): string {
  switch (sessionType) {
    case 'AM': return '12:00';
    case 'PM': return '17:00';
    case 'EVE': return '21:00';
    case 'FULL': return '17:00';
    case 'EXTENDED': return '20:00';
    case 'AD': return '21:00';
    default: return '17:00';
  }
}

/**
 * Auto-allocates procedures to available session slots
 */
export async function autoAllocateProceduresToSessions(
  procedures: GeneratedProcedure[],
  startDate: string,
  endDate: string
): Promise<{
  success: boolean;
  allocated: number;
  unallocated: number;
  sessions: SessionSlot[];
  errors: string[];
}> {
  const errors: string[] = [];
  let allocated = 0;
  let unallocated = 0;

  try {
    // Get available session slots
    const slots = await getAvailableSessionSlots(startDate, endDate);

    // Sort procedures by priority
    const sortedProcedures = [...procedures].sort((a, b) => {
      const priorityOrder = { 'Urgent': 0, 'Expedited': 1, 'Routine': 2, 'Planned': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Try to allocate each procedure
    for (const procedure of sortedProcedures) {
      try {
        // Skip if already scheduled
        if (procedure.scheduledSessionId) {
          continue;
        }

        // Find matching sessions (by specialty and surgeon if specified)
        const matchingSlots = slots.filter(slot => {
          // Match specialty
          if (slot.specialtyId && slot.specialtyId !== procedure.specialtyId) {
            return false;
          }

          // Match surgeon if session is assigned to specific surgeon
          if (slot.surgeonId && slot.surgeonId !== procedure.surgeonId) {
            return false;
          }

          // Check if there's enough time
          const remainingMinutes = slot.availableMinutes - slot.bookedMinutes;
          return remainingMinutes >= procedure.estimatedDurationMinutes;
        });

        if (matchingSlots.length > 0) {
          // Allocate to the earliest available slot
          const targetSlot = matchingSlots[0];

          // Add procedure to slot
          targetSlot.procedures.push(procedure);
          targetSlot.bookedMinutes += procedure.estimatedDurationMinutes;

          // Update procedure in database
          if (procedure.id) {
            await updateDoc(doc(db, 'generatedProcedures', procedure.id), {
              scheduledDate: targetSlot.date,
              scheduledTheatreId: targetSlot.theatreId,
              scheduledSessionId: `${targetSlot.theatreId}_${targetSlot.date}_${targetSlot.sessionType}`,
              status: 'scheduled',
              updatedAt: new Date().toISOString()
            });
          }

          allocated++;
          console.log(`✅ Allocated ${procedure.procedureName} to ${targetSlot.theatreName} on ${targetSlot.date}`);
        } else {
          unallocated++;
          console.log(`⚠️ No available slot for ${procedure.procedureName}`);
        }
      } catch (error) {
        errors.push(`Failed to allocate procedure ${procedure.id}: ${error}`);
        unallocated++;
      }
    }

    return {
      success: errors.length === 0,
      allocated,
      unallocated,
      sessions: slots.filter(slot => slot.procedures.length > 0),
      errors
    };
  } catch (error) {
    console.error('Error auto-allocating procedures:', error);
    return {
      success: false,
      allocated: 0,
      unallocated: procedures.length,
      sessions: [],
      errors: [`Fatal error: ${error}`]
    };
  }
}

/**
 * Gets procedures scheduled for a specific session
 */
export async function getSessionProcedures(
  theatreId: string,
  date: string,
  sessionType: string
): Promise<GeneratedProcedure[]> {
  try {
    const sessionId = `${theatreId}_${date}_${sessionType}`;

    const proceduresQuery = query(
      collection(db, 'generatedProcedures'),
      where('scheduledSessionId', '==', sessionId)
    );

    const proceduresSnap = await getDocs(proceduresQuery);
    const procedures: GeneratedProcedure[] = [];

    proceduresSnap.forEach(doc => {
      procedures.push({
        id: doc.id,
        ...doc.data()
      } as GeneratedProcedure);
    });

    return procedures;
  } catch (error) {
    console.error('Error fetching session procedures:', error);
    return [];
  }
}

/**
 * Removes a procedure from a session (unschedule)
 */
export async function unscheduleProcedure(procedureId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await updateDoc(doc(db, 'generatedProcedures', procedureId), {
      scheduledDate: null,
      scheduledTheatreId: null,
      scheduledSessionId: null,
      status: 'waiting',
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error unscheduling procedure:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Manually assigns a procedure to a specific session
 */
export async function assignProcedureToSession(
  procedureId: string,
  theatreId: string,
  date: string,
  sessionType: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const sessionId = `${theatreId}_${date}_${sessionType}`;

    await updateDoc(doc(db, 'generatedProcedures', procedureId), {
      scheduledDate: date,
      scheduledTheatreId: theatreId,
      scheduledSessionId: sessionId,
      status: 'scheduled',
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error assigning procedure to session:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Gets session utilization summary
 */
export async function getSessionUtilizationSummary(
  startDate: string,
  endDate: string
): Promise<{
  totalSessions: number;
  sessionsWithProcedures: number;
  totalProcedures: number;
  averageUtilization: number;
  utilizationBySpecialty: { [specialtyName: string]: number };
}> {
  try {
    const slots = await getAvailableSessionSlots(startDate, endDate);

    // Get all scheduled procedures
    const proceduresSnap = await getDocs(collection(db, 'generatedProcedures'));
    const scheduledProcedures: GeneratedProcedure[] = [];

    proceduresSnap.forEach(doc => {
      const data = doc.data() as GeneratedProcedure;
      if (data.scheduledSessionId && data.scheduledDate >= startDate && data.scheduledDate <= endDate) {
        scheduledProcedures.push({ id: doc.id, ...data });
      }
    });

    // Calculate utilization
    let totalUtilization = 0;
    let sessionsWithProcedures = 0;
    const utilizationBySpecialty: { [specialtyName: string]: number } = {};

    for (const slot of slots) {
      // Get procedures for this session
      const sessionProcedures = scheduledProcedures.filter(
        p => p.scheduledSessionId === `${slot.theatreId}_${slot.date}_${slot.sessionType}`
      );

      if (sessionProcedures.length > 0) {
        sessionsWithProcedures++;

        const bookedMinutes = sessionProcedures.reduce(
          (sum, p) => sum + p.estimatedDurationMinutes,
          0
        );

        const utilization = (bookedMinutes / slot.availableMinutes) * 100;
        totalUtilization += utilization;

        // Track by specialty
        if (slot.specialtyName) {
          if (!utilizationBySpecialty[slot.specialtyName]) {
            utilizationBySpecialty[slot.specialtyName] = 0;
          }
          utilizationBySpecialty[slot.specialtyName] += utilization;
        }
      }
    }

    return {
      totalSessions: slots.length,
      sessionsWithProcedures,
      totalProcedures: scheduledProcedures.length,
      averageUtilization: slots.length > 0 ? totalUtilization / slots.length : 0,
      utilizationBySpecialty
    };
  } catch (error) {
    console.error('Error calculating session utilization:', error);
    return {
      totalSessions: 0,
      sessionsWithProcedures: 0,
      totalProcedures: 0,
      averageUtilization: 0,
      utilizationBySpecialty: {}
    };
  }
}
