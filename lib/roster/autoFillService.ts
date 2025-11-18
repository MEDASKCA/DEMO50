/**
 * Auto-Fill Roster Service
 *
 * Intelligently fills rosters using AI scoring algorithm.
 * Handles multi-day, multi-theatre roster generation with conflict detection.
 */

import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { scoreStaffForShift, ShiftRequirement, StaffCandidate, ScoredCandidate } from './aiScoringService';

// ==================================================
// TYPES
// ==================================================

export interface AutoFillRequest {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  theatreIds?: string[]; // If not specified, fills all theatres
  minScore?: number; // Minimum AI score to accept (default: 50)
  preferPermanent?: boolean; // Prefer permanent over bank staff (default: true)
}

export interface StaffingTemplate {
  role: string;
  count: number;
  band?: string; // Preferred band
}

export interface AutoFillResult {
  success: boolean;
  assignmentsMade: number;
  gapsRemaining: number;
  details: AssignmentDetail[];
  gaps: GapDetail[];
  summary: {
    totalShiftsNeeded: number;
    totalShiftsFilled: number;
    fillRate: number; // percentage
    byRole: Map<string, { needed: number; filled: number }>;
  };
}

export interface AssignmentDetail {
  date: string;
  theatreId: string;
  role: string;
  staffId: string;
  staffName: string;
  score: number;
  reasoning: string[];
}

export interface GapDetail {
  date: string;
  theatreId: string;
  specialty: string;
  role: string;
  band: string;
  reason: string;
}

interface CalendarConfig {
  date: string;
  theatreId: string;
  sessionTypeId: string;
  specialty: string;
}

interface Theatre {
  id: string;
  name: string;
  specialty: string;
}

// ==================================================
// DEFAULT STAFFING TEMPLATES
// ==================================================

// From admin/staff-allocation/page.tsx
const DEFAULT_STAFFING: StaffingTemplate[] = [
  { role: 'Scrub N/P', count: 2, band: 'Band 6' },
  { role: 'Scrub N/P', count: 1, band: 'Band 5' },
  { role: 'Anaesthetic N/P', count: 1, band: 'Band 6' },
  { role: 'HCA', count: 1, band: 'Band 3' }
];

// ==================================================
// MAIN AUTO-FILL FUNCTION
// ==================================================

export async function autoFillRoster(
  request: AutoFillRequest
): Promise<AutoFillResult> {
  console.log('\n🤖 AUTO-FILL ROSTER SERVICE');
  console.log('='.repeat(70));
  console.log(`Period: ${request.startDate} to ${request.endDate}`);
  console.log(`Theatres: ${request.theatreIds ? request.theatreIds.join(', ') : 'ALL'}`);
  console.log(`Min Score: ${request.minScore || 50}`);
  console.log('');

  const minScore = request.minScore || 50;
  const details: AssignmentDetail[] = [];
  const gaps: GapDetail[] = [];

  // 1. Load calendar configurations for the date range
  const calendarConfigs = await loadCalendarConfigurations(
    request.startDate,
    request.endDate,
    request.theatreIds
  );

  console.log(`📅 Loaded ${calendarConfigs.length} calendar configurations\n`);

  if (calendarConfigs.length === 0) {
    console.log('❌ No calendar configurations found for this period');
    return {
      success: false,
      assignmentsMade: 0,
      gapsRemaining: 0,
      details: [],
      gaps: [],
      summary: {
        totalShiftsNeeded: 0,
        totalShiftsFilled: 0,
        fillRate: 0,
        byRole: new Map()
      }
    };
  }

  // 2. Load all staff
  const allStaff = await loadAllStaff();
  console.log(`👥 Loaded ${allStaff.length} staff members\n`);

  // 3. Load theatres
  const theatres = await loadTheatres();
  const theatreMap = new Map(theatres.map(t => [t.id, t]));

  // 4. Process each calendar configuration
  let totalShiftsNeeded = 0;
  let assignmentsMade = 0;
  const byRole = new Map<string, { needed: number; filled: number }>();

  for (const config of calendarConfigs) {
    // Skip if closed
    if (config.sessionTypeId === 'closed') {
      continue;
    }

    const theatre = theatreMap.get(config.theatreId);
    if (!theatre) {
      console.warn(`⚠️  Theatre ${config.theatreId} not found, skipping`);
      continue;
    }

    console.log(`\n📍 ${config.date} | ${theatre.name} | ${config.specialty}`);

    // For each role in the staffing template
    for (const template of DEFAULT_STAFFING) {
      for (let i = 0; i < template.count; i++) {
        totalShiftsNeeded++;

        // Track by role
        const roleKey = `${template.role} (${template.band || 'any'})`;
        if (!byRole.has(roleKey)) {
          byRole.set(roleKey, { needed: 0, filled: 0 });
        }
        byRole.get(roleKey)!.needed++;

        // Create shift requirement
        const requirement: ShiftRequirement = {
          date: config.date,
          theatreId: config.theatreId,
          specialty: config.specialty,
          role: template.role,
          band: template.band || 'Band 5',
          sessionType: config.sessionTypeId,
          startTime: '08:00',
          endTime: '18:00',
          hours: 10
        };

        // Find candidates (filter by role and band)
        const candidates = allStaff.filter(
          s =>
            s.roles?.includes(template.role) &&
            (template.band ? s.band === template.band : true)
        );

        if (candidates.length === 0) {
          console.log(`   ❌ No candidates for ${template.role} ${template.band || ''}`);
          gaps.push({
            date: config.date,
            theatreId: config.theatreId,
            specialty: config.specialty,
            role: template.role,
            band: template.band || 'any',
            reason: 'No staff with required role/band'
          });
          continue;
        }

        // Score candidates
        const scored = await scoreStaffForShift(requirement, candidates);

        // Find best available candidate above min score
        const bestCandidate = scored.find(
          c => c.available && c.totalScore >= minScore
        );

        if (bestCandidate) {
          // Assign this staff member
          const assignment: AssignmentDetail = {
            date: config.date,
            theatreId: config.theatreId,
            role: template.role,
            staffId: bestCandidate.staff.id,
            staffName: `${bestCandidate.staff.firstName} ${bestCandidate.staff.lastName}`,
            score: bestCandidate.totalScore,
            reasoning: bestCandidate.reasoning
          };

          details.push(assignment);
          assignmentsMade++;
          byRole.get(roleKey)!.filled++;

          console.log(
            `   ✅ ${template.role}: ${assignment.staffName} (score: ${assignment.score.toFixed(1)})`
          );

          // TODO: Actually save this assignment to Firebase rosters collection
          // This would require updating the staff member's roster document
        } else {
          // No suitable candidate found
          const reason = scored.length > 0 && scored[0].available
            ? `Best score ${scored[0].totalScore.toFixed(1)} below minimum ${minScore}`
            : scored.length > 0
            ? scored[0].conflicts[0] || 'All staff unavailable'
            : 'No candidates found';

          console.log(`   ❌ ${template.role}: ${reason}`);

          gaps.push({
            date: config.date,
            theatreId: config.theatreId,
            specialty: config.specialty,
            role: template.role,
            band: template.band || 'any',
            reason
          });
        }
      }
    }
  }

  const fillRate = totalShiftsNeeded > 0
    ? (assignmentsMade / totalShiftsNeeded) * 100
    : 0;

  console.log('\n' + '='.repeat(70));
  console.log('📊 AUTO-FILL SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total shifts needed: ${totalShiftsNeeded}`);
  console.log(`Total shifts filled: ${assignmentsMade}`);
  console.log(`Gaps remaining: ${gaps.length}`);
  console.log(`Fill rate: ${fillRate.toFixed(1)}%`);
  console.log('');

  console.log('BY ROLE:');
  Array.from(byRole.entries()).forEach(([role, stats]) => {
    const roleRate = stats.needed > 0
      ? ((stats.filled / stats.needed) * 100).toFixed(1)
      : '0.0';
    console.log(`  ${role}: ${stats.filled}/${stats.needed} (${roleRate}%)`);
  });

  return {
    success: fillRate > 50, // Consider success if > 50% filled
    assignmentsMade,
    gapsRemaining: gaps.length,
    details,
    gaps,
    summary: {
      totalShiftsNeeded,
      totalShiftsFilled: assignmentsMade,
      fillRate,
      byRole
    }
  };
}

// ==================================================
// DATA LOADING FUNCTIONS
// ==================================================

async function loadCalendarConfigurations(
  startDate: string,
  endDate: string,
  theatreIds?: string[]
): Promise<CalendarConfig[]> {
  try {
    const configs: CalendarConfig[] = [];

    let q = query(collection(db, 'calendarConfigurations'));

    // Note: Firestore doesn't support range queries on strings easily,
    // so we'll load all and filter in memory
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data() as CalendarConfig;

      // Filter by date range
      if (data.date < startDate || data.date > endDate) {
        return;
      }

      // Filter by theatres if specified
      if (theatreIds && !theatreIds.includes(data.theatreId)) {
        return;
      }

      configs.push(data);
    });

    // Sort by date then theatre
    configs.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.theatreId.localeCompare(b.theatreId);
    });

    return configs;
  } catch (error) {
    console.error('Error loading calendar configurations:', error);
    return [];
  }
}

async function loadAllStaff(): Promise<StaffCandidate[]> {
  try {
    const snapshot = await getDocs(collection(db, 'staff'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StaffCandidate[];
  } catch (error) {
    console.error('Error loading staff:', error);
    return [];
  }
}

async function loadTheatres(): Promise<Theatre[]> {
  try {
    const snapshot = await getDocs(collection(db, 'theatres'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Theatre[];
  } catch (error) {
    console.error('Error loading theatres:', error);
    return [];
  }
}

// ==================================================
// HELPER FUNCTIONS FOR GAP DETECTION
// ==================================================

export function getGapsByDate(result: AutoFillResult): Map<string, GapDetail[]> {
  const gapsByDate = new Map<string, GapDetail[]>();

  for (const gap of result.gaps) {
    if (!gapsByDate.has(gap.date)) {
      gapsByDate.set(gap.date, []);
    }
    gapsByDate.get(gap.date)!.push(gap);
  }

  return gapsByDate;
}

export function getGapsByRole(result: AutoFillResult): Map<string, GapDetail[]> {
  const gapsByRole = new Map<string, GapDetail[]>();

  for (const gap of result.gaps) {
    const roleKey = `${gap.role} (${gap.band})`;
    if (!gapsByRole.has(roleKey)) {
      gapsByRole.set(roleKey, []);
    }
    gapsByRole.get(roleKey)!.push(gap);
  }

  return gapsByRole;
}
