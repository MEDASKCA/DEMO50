/**
 * Auto-Roster Service
 *
 * Automatically generates staff allocations based on:
 * - Template requirements (Step 2 + Step 3 mappers)
 * - Staff availability (FTE, leave, breaks)
 * - Staff competencies (role matching)
 * - Fair distribution (rotation, experience balance)
 */

import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// ========== INTERFACES ==========

export interface StaffProfile {
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
  band: string;
  fte: number;
  specialty?: string;
  specialtyTree?: Array<{ name: string }>;
  competentSpecialties?: string[];
  supernumeraryIn?: string[];
  yearsExperience?: number;
}

export interface RoleRequirement {
  roleName: string;
  quantity: number;
}

export interface StaffAssignment {
  staffId: string;
  staffName: string;
  band: string;
  fte: number;
  slotNumber: number;  // For "Scrub N/P 1", "Scrub N/P 2", etc.
}

export interface RoleAllocation {
  id: string;
  role: string;
  count: number;
  assignedStaff: StaffAssignment[];
}

export interface SessionAllocation {
  sessionId: string;
  theatreId: string;
  date: string;
  sessionTypeId: string;
  specialty: string;
  roles: RoleAllocation[];
  updatedAt: string;
  generatedBy: 'auto' | 'manual';
}

export interface StaffLeave {
  staffId: string;
  startDate: string;
  endDate: string;
  type: 'annual' | 'sick' | 'training' | 'other';
}

export interface StaffShift {
  staffId: string;
  date: string;
  shiftType: 'day' | 'long-day' | 'night';
  hoursWorked: number;
}

// ========== HELPER FUNCTIONS ==========

/**
 * Load all staff profiles from JSON file
 * In production, this would load from Firebase 'staff' collection
 */
export async function loadStaffProfiles(): Promise<StaffProfile[]> {
  try {
    const response = await fetch('/data/staffProfiles172.json');
    if (!response.ok) {
      throw new Error('Failed to load staff profiles');
    }
    const profiles = await response.json();

    // Ensure FTE is set (default to 1.0 if missing)
    return profiles.map((p: any) => ({
      ...p,
      fte: p.fte || 1.0,
      competentSpecialties: p.competentSpecialties || [p.specialty || p.specialtyTree?.[0]?.name || 'General Surgery'],
      supernumeraryIn: p.supernumeraryIn || []
    }));
  } catch (error) {
    console.error('Error loading staff profiles:', error);
    return [];
  }
}

/**
 * Load staff leave records for a given date range
 */
export async function loadStaffLeave(startDate: string, endDate: string): Promise<StaffLeave[]> {
  try {
    const leaveQuery = query(
      collection(db, 'staffLeave'),
      where('startDate', '<=', endDate),
      where('endDate', '>=', startDate)
    );
    const snapshot = await getDocs(leaveQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StaffLeave[];
  } catch (error) {
    console.error('Error loading staff leave:', error);
    return [];
  }
}

/**
 * Load existing staff shifts for a given date
 */
export async function loadStaffShifts(date: string): Promise<StaffShift[]> {
  try {
    const shiftsQuery = query(
      collection(db, 'staffShifts'),
      where('date', '==', date)
    );
    const snapshot = await getDocs(shiftsQuery);
    return snapshot.docs.map(doc => doc.data()) as StaffShift[];
  } catch (error) {
    console.error('Error loading staff shifts:', error);
    return [];
  }
}

/**
 * Check if a staff member is available on a given date
 */
export function isStaffAvailable(
  staff: StaffProfile,
  date: string,
  existingShifts: StaffShift[],
  leaveRecords: StaffLeave[]
): boolean {
  // Check if on leave
  const onLeave = leaveRecords.some(leave => {
    const leaveStart = new Date(leave.startDate);
    const leaveEnd = new Date(leave.endDate);
    const checkDate = new Date(date);
    return checkDate >= leaveStart && checkDate <= leaveEnd && leave.staffId === staff.id;
  });

  if (onLeave) return false;

  // Check if already allocated to another session today
  const alreadyWorking = existingShifts.some(shift =>
    shift.staffId === staff.id && shift.date === date
  );

  if (alreadyWorking) return false;

  // Check FTE - if less than 1.0, they might not work every day
  // For simplicity, assume FTE < 1.0 means they work proportionally fewer days
  // This is a simplified model - in reality, you'd need a roster pattern
  if (staff.fte < 1.0) {
    // For now, randomly decide based on FTE probability
    // In production, this should be based on contracted working days
    const random = Math.random();
    if (random > staff.fte) {
      return false;  // Not scheduled to work this day
    }
  }

  return true;
}

/**
 * Check if staff member is competent in a given role
 */
export function isStaffCompetentForRole(staff: StaffProfile, roleName: string): boolean {
  // Direct role match
  if (staff.roles.includes(roleName)) {
    return true;
  }

  // Check for role variations/aliases
  const roleAliases: Record<string, string[]> = {
    'Scrub N/P': ['Scrub N/P', 'Scrub Nurse', 'ODP Scrub', 'Scrub Practitioner'],
    'Anaes N/P': ['Anaes N/P', 'Anaesthetic N/P', 'Anaesthetic Nurse', 'ODP Anaes', 'Anaesthetic Practitioner'],
    'Recovery N/P': ['Recovery N/P', 'Recovery Nurse', 'PACU Nurse'],
    'HCA': ['HCA', 'Healthcare Assistant', 'Theatre Assistant']
  };

  // Check if any role the staff has matches the required role's aliases
  const requiredAliases = roleAliases[roleName] || [roleName];
  return staff.roles.some(staffRole =>
    requiredAliases.some(alias =>
      staffRole.toLowerCase().includes(alias.toLowerCase()) ||
      alias.toLowerCase().includes(staffRole.toLowerCase())
    )
  );
}

/**
 * Sort staff by allocation preference
 * Prioritize: Band (appropriate for role), experience, fairness (least recently allocated)
 */
export function sortStaffByPreference(
  staff: StaffProfile[],
  roleName: string,
  preferredBands: string[] = ['Band 6', 'Band 5', 'Band 7']
): StaffProfile[] {
  return staff.sort((a, b) => {
    // 1. Prioritize preferred bands
    const aBandIdx = preferredBands.indexOf(a.band);
    const bBandIdx = preferredBands.indexOf(b.band);

    if (aBandIdx !== -1 && bBandIdx !== -1) {
      if (aBandIdx !== bBandIdx) {
        return aBandIdx - bBandIdx;
      }
    } else if (aBandIdx !== -1) {
      return -1;
    } else if (bBandIdx !== -1) {
      return 1;
    }

    // 2. Prioritize more experienced staff
    const aExp = a.yearsExperience || 0;
    const bExp = b.yearsExperience || 0;
    if (Math.abs(aExp - bExp) > 2) {  // Only if significant difference
      return bExp - aExp;
    }

    // 3. Randomize for fairness (in production, track allocation counts)
    return Math.random() - 0.5;
  });
}

/**
 * Get band preferences for a role
 */
export function getPreferredBandsForRole(roleName: string): string[] {
  const rolePreferences: Record<string, string[]> = {
    'Scrub N/P': ['Band 6', 'Band 5', 'Band 7'],
    'Anaes N/P': ['Band 6', 'Band 5', 'Band 7'],
    'Recovery N/P': ['Band 5', 'Band 6'],
    'HCA': ['Band 3', 'Band 2', 'Band 4'],
    'Senior Sister/Charge Nurse': ['Band 7', 'Band 8a'],
    'Matron': ['Band 8a', 'Band 8b'],
  };

  return rolePreferences[roleName] || ['Band 6', 'Band 5', 'Band 7'];
}

// ========== MAIN AUTO-ROSTER FUNCTION ==========

/**
 * Generate automatic staff allocations for a given date based on template requirements
 *
 * @param date - Date to generate roster for (YYYY-MM-DD format)
 * @param requirements - Map of theatreId to role requirements
 * @param hospitalId - Hospital ID for filtering staff
 * @returns Map of sessionId to SessionAllocation
 */
export async function generateAutoRoster(
  date: string,
  requirements: Map<string, { theatreId: string; sessionTypeId: string; specialty: string; roles: RoleRequirement[] }>,
  hospitalId: string
): Promise<Map<string, SessionAllocation>> {
  console.log(`🤖 Generating auto-roster for ${date}...`);

  // 1. Load all necessary data
  const [allStaff, leaveRecords, existingShifts] = await Promise.all([
    loadStaffProfiles(),
    loadStaffLeave(date, date),
    loadStaffShifts(date)
  ]);

  console.log(`📊 Loaded ${allStaff.length} staff profiles, ${leaveRecords.length} leave records, ${existingShifts.length} existing shifts`);
  console.log(`📊 STAFF IDS SAMPLE:`, allStaff.slice(0, 5).map(s => ({ name: `${s.firstName} ${s.lastName}`, id: s.id, idType: typeof s.id })));

  // 2. Filter available staff for this date
  let availableStaff = allStaff.filter(staff =>
    isStaffAvailable(staff, date, existingShifts, leaveRecords)
  );

  console.log(`✅ ${availableStaff.length} staff available for allocation`);

  // 3. Process each session/theatre
  const allocations = new Map<string, SessionAllocation>();

  for (const [theatreId, sessionReq] of requirements) {
    const sessionId = `${theatreId}-${date}`;
    const roleAllocations: RoleAllocation[] = [];

    console.log(`\n🏥 Processing ${theatreId} (${sessionReq.specialty}, ${sessionReq.sessionTypeId})...`);
    console.log(`📊 Available staff pool size at START of ${theatreId}: ${availableStaff.length}`);

    // 4. For each role requirement, assign staff
    for (const roleReq of sessionReq.roles) {
      console.log(`  👔 Allocating ${roleReq.quantity}x ${roleReq.roleName}...`);

      // Find competent staff for this role
      const competentStaff = availableStaff.filter(staff =>
        isStaffCompetentForRole(staff, roleReq.roleName)
      );

      console.log(`    Found ${competentStaff.length} competent staff`);

      // Sort by preference
      const preferredBands = getPreferredBandsForRole(roleReq.roleName);
      const sortedStaff = sortStaffByPreference([...competentStaff], roleReq.roleName, preferredBands);

      // Assign top N staff to this role
      const assignedStaff: StaffAssignment[] = [];
      for (let i = 0; i < roleReq.quantity; i++) {
        const staff = sortedStaff[i];
        if (staff) {
          assignedStaff.push({
            staffId: staff.id,
            staffName: `${staff.firstName} ${staff.lastName}`,
            band: staff.band,
            fte: staff.fte,
            slotNumber: i + 1
          });

          // Remove from available pool to prevent double-booking
          console.log(`    🔍 Before removal: ${availableStaff.length} staff available, removing ${staff.firstName} ${staff.lastName} (ID: ${staff.id})`);
          const idx = availableStaff.findIndex(s => s.id === staff.id);
          if (idx !== -1) {
            availableStaff.splice(idx, 1);
            console.log(`    ✅ Removed from pool at index ${idx}. Now ${availableStaff.length} staff available`);
          } else {
            console.error(`    ❌ ERROR: Could not find ${staff.firstName} ${staff.lastName} (ID: ${staff.id}) in available pool!`);
          }

          console.log(`    ✓ Assigned ${staff.firstName} ${staff.lastName} (${staff.band}) as ${roleReq.roleName} ${i + 1}`);
        } else {
          console.warn(`    ⚠️ Could not find staff for ${roleReq.roleName} slot ${i + 1}`);
        }
      }

      roleAllocations.push({
        id: `${roleReq.roleName}-${Date.now()}-${Math.random()}`,
        role: roleReq.roleName,
        count: roleReq.quantity,
        assignedStaff
      });
    }

    // 5. Create session allocation
    allocations.set(sessionId, {
      sessionId,
      theatreId: sessionReq.theatreId,
      date,
      sessionTypeId: sessionReq.sessionTypeId,
      specialty: sessionReq.specialty,
      roles: roleAllocations,
      updatedAt: new Date().toISOString(),
      generatedBy: 'auto'
    });
  }

  console.log(`\n✅ Auto-roster generation complete: ${allocations.size} sessions allocated`);

  return allocations;
}

/**
 * Save auto-generated allocations to Firebase
 */
export async function saveAutoRosterAllocations(allocations: Map<string, SessionAllocation>): Promise<void> {
  console.log(`💾 Saving ${allocations.size} allocations to Firebase...`);

  const savePromises: Promise<void>[] = [];

  for (const [sessionId, allocation] of allocations) {
    const promise = setDoc(doc(db, 'staffAllocations', sessionId), {
      ...allocation,
      // Convert roles with assigned staff to format compatible with existing system
      roles: allocation.roles.map(role => ({
        id: role.id,
        role: role.role,
        count: role.count,
        assignedStaff: role.assignedStaff  // NEW field
      }))
    });

    savePromises.push(promise);
  }

  await Promise.all(savePromises);

  console.log(`✅ All allocations saved to Firebase`);
}

/**
 * Load auto-roster allocations for a specific date
 */
export async function loadAutoRosterAllocations(date: string, hospitalId: string): Promise<Map<string, SessionAllocation>> {
  console.log(`📖 Loading allocations for ${date} from Firebase...`);

  try {
    // Query allocations for this date
    const allocationsRef = collection(db, 'staffAllocations');
    const q = query(allocationsRef, where('date', '==', date));
    const snapshot = await getDocs(q);

    const allocations = new Map<string, SessionAllocation>();

    snapshot.forEach((doc) => {
      const data = doc.data() as SessionAllocation;
      allocations.set(doc.id, data);
    });

    console.log(`✅ Loaded ${allocations.size} allocations from Firebase for ${date}`);
    return allocations;
  } catch (error) {
    console.error('❌ Error loading allocations:', error);
    return new Map();
  }
}
