/**
 * AI Scoring Service for Staff-Shift Matching
 *
 * Intelligently ranks staff members based on suitability for a shift requirement.
 * Considers specialty, band, role, availability, workload, cost, and distance.
 */

import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// ==================================================
// TYPES
// ==================================================

export interface ShiftRequirement {
  date: string; // YYYY-MM-DD
  theatreId: string;
  specialty: string; // e.g., 'ORTHO', 'CARD', 'NEURO'
  role: string; // e.g., 'Scrub N/P', 'Anaesthetic N/P', 'HCA'
  band: string; // e.g., 'Band 5', 'Band 6', 'Band 7'
  sessionType: string; // e.g., 'day', 'night', 'am', 'pm'
  startTime: string;
  endTime: string;
  hours: number;
}

export interface StaffCandidate {
  id: string;
  firstName: string;
  lastName: string;
  band: string;
  roles: string[];
  specialtyTree: Array<{ name: string; subcategories: any[] }>;
  specialty?: string;
  professionalQualification?: string;
  employmentType?: 'permanent' | 'bank';
  location?: {
    willingToTravel?: number;
    currentHospital?: string;
  };
  contractedHours?: number;
}

export interface ScoredCandidate {
  staff: StaffCandidate;
  totalScore: number;
  breakdown: {
    specialtyMatch: number;
    bandMatch: number;
    roleMatch: number;
    availabilityScore: number;
    workloadScore: number;
    employmentTypeScore: number;
    distanceScore: number;
  };
  reasoning: string[];
  conflicts: string[];
  available: boolean;
  weeklyHours?: number;
  rank?: number;
}

interface LeaveEntry {
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Shift {
  date: string;
  hours: number;
  status: string;
}

interface RosterData {
  staffId: string;
  leave?: LeaveEntry[];
  shifts?: Shift[];
  totalScheduledHours?: number;
}

// ==================================================
// CONSTANTS
// ==================================================

const MAX_WEEKLY_HOURS = 48; // WTD limit
const SPECIALTY_WEIGHT = 40;
const BAND_WEIGHT = 30;
const ROLE_WEIGHT = 20;
const WORKLOAD_WEIGHT = 10;
const EMPLOYMENT_TYPE_WEIGHT = 5;
const DISTANCE_WEIGHT = 5;

// Specialty mapping from calendar config codes to staff profile names
const SPECIALTY_MAP: Record<string, string[]> = {
  'ORTHO': ['Orthopaedics Theatre', 'Elective Orthopaedics', 'Trauma Orthopaedics'],
  'GS': ['General Surgery Theatre', 'General Surgery'],
  'CARD': ['Cardiac Theatre', 'Cardiac'],
  'NEURO': ['Neurosurgery Theatre', 'Neurosurgery'],
  'VASC': ['Vascular Theatre', 'Vascular'],
  'URO': ['Urology Theatre', 'Urology'],
  'OPHTH': ['Ophthalmology Theatre', 'Ophthalmology'],
  'GYNAE': ['Gynaecology Theatre', 'Gynaecology'],
  'ENT': ['ENT Theatre', 'ENT'],
  'PLAST': ['Plastics Theatre', 'Plastics', 'Plastics & Maxillofacial']
};

// ==================================================
// MAIN SCORING FUNCTION
// ==================================================

export async function scoreStaffForShift(
  requirement: ShiftRequirement,
  staff: StaffCandidate[]
): Promise<ScoredCandidate[]> {
  console.log(`\n🧠 AI Scoring: ${staff.length} candidates for ${requirement.role} on ${requirement.date}`);

  // Load all roster data (leave, shifts) for the staff pool
  const staffIds = staff.map(s => s.id);
  const rosterData = await loadRosterData(staffIds);

  // Score each candidate
  const scored: ScoredCandidate[] = [];

  for (const candidate of staff) {
    const roster = rosterData.get(candidate.id);
    const score = scoreCandidate(requirement, candidate, roster);
    scored.push(score);
  }

  // Sort by total score (descending)
  scored.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  scored.forEach((candidate, index) => {
    candidate.rank = index + 1;
  });

  return scored;
}

// ==================================================
// ROSTER DATA LOADING
// ==================================================

async function loadRosterData(staffIds: string[]): Promise<Map<string, RosterData>> {
  const rosterMap = new Map<string, RosterData>();

  try {
    // Firestore has a limit of 10 items for 'in' queries, so batch them
    const batchSize = 10;
    for (let i = 0; i < staffIds.length; i += batchSize) {
      const batch = staffIds.slice(i, i + batchSize);
      const q = query(collection(db, 'rosters'), where('staffId', 'in', batch));
      const snapshot = await getDocs(q);

      snapshot.forEach(doc => {
        const data = doc.data() as RosterData;
        rosterMap.set(data.staffId, data);
      });
    }
  } catch (error) {
    console.error('Error loading roster data:', error);
  }

  return rosterMap;
}

// ==================================================
// CANDIDATE SCORING
// ==================================================

function scoreCandidate(
  requirement: ShiftRequirement,
  candidate: StaffCandidate,
  roster?: RosterData
): ScoredCandidate {
  const reasoning: string[] = [];
  const conflicts: string[] = [];
  let available = true;

  // 1. Specialty Match (40 points)
  const specialtyScore = scoreSpecialty(requirement.specialty, candidate, reasoning);

  // 2. Band Match (30 points)
  const bandScore = scoreBand(requirement.band, candidate, reasoning);

  // 3. Role Match (20 points)
  const roleScore = scoreRole(requirement.role, candidate, reasoning);

  // 4. Availability Check (CRITICAL - if unavailable, score = 0)
  const availabilityScore = checkAvailability(requirement, candidate, roster, reasoning, conflicts);
  if (availabilityScore === 0) {
    available = false;
  }

  // 5. Workload Score (10 points) - Prefer staff with fewer hours
  const { workloadScore, weeklyHours } = scoreWorkload(requirement, roster, reasoning);

  // 6. Employment Type Score (5 points) - Prefer permanent over bank
  const employmentTypeScore = scoreEmploymentType(candidate, reasoning);

  // 7. Distance Score (5 points) - Prefer closer staff
  const distanceScore = scoreDistance(candidate, reasoning);

  // Calculate total score
  const totalScore = available
    ? specialtyScore + bandScore + roleScore + workloadScore + employmentTypeScore + distanceScore
    : 0;

  return {
    staff: candidate,
    totalScore,
    breakdown: {
      specialtyMatch: specialtyScore,
      bandMatch: bandScore,
      roleMatch: roleScore,
      availabilityScore,
      workloadScore,
      employmentTypeScore,
      distanceScore
    },
    reasoning,
    conflicts,
    available,
    weeklyHours
  };
}

// ==================================================
// SCORING COMPONENTS
// ==================================================

function scoreSpecialty(
  requiredSpecialty: string,
  candidate: StaffCandidate,
  reasoning: string[]
): number {
  const candidateSpecialties = candidate.specialtyTree?.map(s => s.name) || [];

  // Get all possible names for the required specialty
  const possibleNames = SPECIALTY_MAP[requiredSpecialty] || [requiredSpecialty];

  // Check if candidate has any matching specialty
  const hasMatch = candidateSpecialties.some(cs =>
    possibleNames.some(pn => cs.toLowerCase().includes(pn.toLowerCase()) || pn.toLowerCase().includes(cs.toLowerCase()))
  );

  if (hasMatch) {
    reasoning.push(`✅ Specialty match: ${candidateSpecialties[0]}`);
    return SPECIALTY_WEIGHT;
  } else {
    reasoning.push(`⚠️  Specialty mismatch: Has ${candidateSpecialties[0] || 'none'}, needs ${requiredSpecialty}`);
    return 0;
  }
}

function scoreBand(
  requiredBand: string,
  candidate: StaffCandidate,
  reasoning: string[]
): number {
  if (candidate.band === requiredBand) {
    reasoning.push(`✅ Band match: ${candidate.band}`);
    return BAND_WEIGHT;
  } else {
    // Partial credit for adjacent bands
    const requiredNum = parseInt(requiredBand.replace('Band ', ''));
    const candidateNum = parseInt(candidate.band.replace('Band ', ''));
    const diff = Math.abs(requiredNum - candidateNum);

    if (diff === 1) {
      reasoning.push(`⚠️  Band close: ${candidate.band} (needs ${requiredBand})`);
      return BAND_WEIGHT * 0.5;
    } else {
      reasoning.push(`❌ Band mismatch: ${candidate.band} (needs ${requiredBand})`);
      return 0;
    }
  }
}

function scoreRole(
  requiredRole: string,
  candidate: StaffCandidate,
  reasoning: string[]
): number {
  const hasRole = candidate.roles?.includes(requiredRole);

  if (hasRole) {
    reasoning.push(`✅ Role match: ${requiredRole}`);
    return ROLE_WEIGHT;
  } else {
    reasoning.push(`❌ Role mismatch: Has ${candidate.roles?.join(', ') || 'none'}`);
    return 0;
  }
}

function checkAvailability(
  requirement: ShiftRequirement,
  candidate: StaffCandidate,
  roster: RosterData | undefined,
  reasoning: string[],
  conflicts: string[]
): number {
  if (!roster) {
    reasoning.push(`✅ Available (no existing roster)`);
    return 100;
  }

  const requirementDate = new Date(requirement.date);

  // Check leave
  const onLeave = roster.leave?.some(leave => {
    if (leave.status !== 'approved') return false;

    const leaveStart = new Date(leave.startDate);
    const leaveEnd = new Date(leave.endDate);

    return requirementDate >= leaveStart && requirementDate <= leaveEnd;
  });

  if (onLeave) {
    const leaveType = roster.leave?.find(l => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      return requirementDate >= start && requirementDate <= end;
    })?.type;

    reasoning.push(`❌ UNAVAILABLE: On ${leaveType || 'leave'} on ${requirement.date}`);
    conflicts.push(`On ${leaveType || 'leave'}`);
    return 0;
  }

  // Check existing shifts
  const alreadyAssigned = roster.shifts?.some(
    shift => shift.date === requirement.date && shift.status === 'confirmed'
  );

  if (alreadyAssigned) {
    reasoning.push(`❌ UNAVAILABLE: Already assigned shift on ${requirement.date}`);
    conflicts.push(`Already assigned`);
    return 0;
  }

  reasoning.push(`✅ Available on ${requirement.date}`);
  return 100;
}

function scoreWorkload(
  requirement: ShiftRequirement,
  roster: RosterData | undefined,
  reasoning: string[]
): { workloadScore: number; weeklyHours: number } {
  if (!roster) {
    reasoning.push(`✅ Low workload: No current shifts`);
    return { workloadScore: WORKLOAD_WEIGHT, weeklyHours: 0 };
  }

  // Calculate hours for the week of the requirement
  const requirementDate = new Date(requirement.date);
  const weekStart = new Date(requirementDate);
  weekStart.setDate(requirementDate.getDate() - requirementDate.getDay() + 1); // Monday

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // Sunday

  const weeklyHours = roster.shifts
    ?.filter(shift => {
      const shiftDate = new Date(shift.date);
      return shiftDate >= weekStart && shiftDate <= weekEnd && shift.status === 'confirmed';
    })
    .reduce((sum, shift) => sum + (shift.hours || 0), 0) || 0;

  const totalHours = weeklyHours + requirement.hours;

  if (totalHours > MAX_WEEKLY_HOURS) {
    reasoning.push(`❌ WTD VIOLATION: Would have ${totalHours}h/week (max 48h)`);
    return { workloadScore: 0, weeklyHours };
  } else if (totalHours > MAX_WEEKLY_HOURS * 0.9) {
    reasoning.push(`⚠️  High workload: ${weeklyHours}h/week (would be ${totalHours}h)`);
    return { workloadScore: WORKLOAD_WEIGHT * 0.3, weeklyHours };
  } else if (totalHours > MAX_WEEKLY_HOURS * 0.75) {
    reasoning.push(`⚠️  Moderate workload: ${weeklyHours}h/week`);
    return { workloadScore: WORKLOAD_WEIGHT * 0.6, weeklyHours };
  } else {
    reasoning.push(`✅ Good workload balance: ${weeklyHours}h/week`);
    return { workloadScore: WORKLOAD_WEIGHT, weeklyHours };
  }
}

function scoreEmploymentType(
  candidate: StaffCandidate,
  reasoning: string[]
): number {
  if (candidate.employmentType === 'permanent') {
    reasoning.push(`✅ Permanent staff (cost effective)`);
    return EMPLOYMENT_TYPE_WEIGHT;
  } else if (candidate.employmentType === 'bank') {
    reasoning.push(`⚠️  Bank staff (higher cost)`);
    return EMPLOYMENT_TYPE_WEIGHT * 0.5;
  } else {
    // Assume permanent if not specified
    reasoning.push(`✅ Permanent staff`);
    return EMPLOYMENT_TYPE_WEIGHT;
  }
}

function scoreDistance(
  candidate: StaffCandidate,
  reasoning: string[]
): number {
  const willingToTravel = candidate.location?.willingToTravel || 15;

  if (willingToTravel <= 5) {
    reasoning.push(`✅ Local staff (≤5 miles)`);
    return DISTANCE_WEIGHT;
  } else if (willingToTravel <= 10) {
    reasoning.push(`✅ Nearby staff (≤10 miles)`);
    return DISTANCE_WEIGHT * 0.7;
  } else {
    reasoning.push(`⚠️  Longer commute (${willingToTravel} miles)`);
    return DISTANCE_WEIGHT * 0.3;
  }
}

// ==================================================
// HELPER FUNCTIONS
// ==================================================

export function formatScore(score: ScoredCandidate): string {
  const { staff, totalScore, breakdown, reasoning, conflicts, available, weeklyHours } = score;

  let output = `\n${'='.repeat(70)}\n`;
  output += `${staff.firstName} ${staff.lastName} (${staff.id})\n`;
  output += `${staff.band} | ${staff.roles?.join(', ') || 'No roles'}\n`;
  output += `Specialty: ${staff.specialtyTree?.[0]?.name || 'None'}\n`;
  output += `${'='.repeat(70)}\n`;
  output += `TOTAL SCORE: ${totalScore.toFixed(1)} / 110\n`;
  output += `AVAILABLE: ${available ? '✅ YES' : '❌ NO'}\n`;

  if (weeklyHours !== undefined) {
    output += `WEEKLY HOURS: ${weeklyHours}h / 48h\n`;
  }

  output += `\nBREAKDOWN:\n`;
  output += `  Specialty Match: ${breakdown.specialtyMatch} / ${SPECIALTY_WEIGHT}\n`;
  output += `  Band Match: ${breakdown.bandMatch} / ${BAND_WEIGHT}\n`;
  output += `  Role Match: ${breakdown.roleMatch} / ${ROLE_WEIGHT}\n`;
  output += `  Workload: ${breakdown.workloadScore} / ${WORKLOAD_WEIGHT}\n`;
  output += `  Employment Type: ${breakdown.employmentTypeScore} / ${EMPLOYMENT_TYPE_WEIGHT}\n`;
  output += `  Distance: ${breakdown.distanceScore} / ${DISTANCE_WEIGHT}\n`;

  output += `\nREASONING:\n`;
  reasoning.forEach(r => output += `  ${r}\n`);

  if (conflicts.length > 0) {
    output += `\nCONFLICTS:\n`;
    conflicts.forEach(c => output += `  ⚠️  ${c}\n`);
  }

  return output;
}

export function getTopCandidates(
  scored: ScoredCandidate[],
  count: number = 5
): ScoredCandidate[] {
  return scored
    .filter(c => c.available)
    .slice(0, count);
}
