// Auto-Scheduler Service
// Automatically generates theatre schedules based on your Firebase configurations
// NO SCRIPTS NEEDED - reads directly from your theatre mappings and priorities

import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { TheatreList, SessionType, SESSION_CONFIGS } from '../theatreListTypes';
import { generateTheatreList } from './theatreListGenerator';
import { SURGICAL_PROCEDURES_BY_SPECIALTY, Procedure } from '../surgicalCompetencyData';
import { SESSION_TYPE_PRESETS } from '../scheduling/sessionTypes';
import { scoreProcedure, ProcedureScore } from './procedureScoringService';

interface TheatreMapping {
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  theatreId: string;
  theatreName: string;
  unitId: string;
  unitName: string;
  priority: number;
}

interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  numberOfTheatres: number;
  hospitalId: string;
}

interface Theatre {
  id: string;
  name: string;
  unitId: string;
  status: 'available' | 'maintenance' | 'closed';
  maintenanceUntil?: string;
  openingHours: {
    start: string;
    end: string;
  };
  sessionDuration: number;
}

interface WaitingListProcedure {
  id: string;
  patientName: string;
  hospitalNumber: string;
  procedureName: string;
  procedureCode: string; // OPCS-4 code
  priority: 'Urgent' | 'Expedited' | 'Routine' | 'Planned';
  consultantId: string;
  consultantName: string;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  referralDate: string;
  targetDate: string;
  waitingDays: number;
  isScheduled: boolean;
  sessionId?: string;
}

interface SurgeonSchedule {
  surgeonId: string;
  surgeonName: string;
  date: string;
  sessionType: string;
  theatreId: string;
}

// NEW: Theatre-centric configuration types
interface SessionTypePreference {
  sessionType: SessionType;
  priority: number;
}

interface SpecialtyAssignment {
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  priority: number;
  sessionTypePreferences: SessionTypePreference[];
  daysOfWeek?: number[]; // Days of week this specialty runs [0=Sun, 1=Mon, ..., 6=Sat]. Empty/undefined = all days
}

interface TheatreConfiguration {
  id: string;
  theatreId: string;
  theatreName: string;
  unitId: string;
  unitName: string;
  hospitalId: string;
  specialtyAssignments: SpecialtyAssignment[];
}

// Anaesthetists will be loaded from Firestore

/**
 * Load specialty-theatre mappings from Firebase
 */
async function loadTheatreMappings(hospitalId: string): Promise<TheatreMapping[]> {
  const mappings: TheatreMapping[] = [];

  try {
    // Query for the selected hospital's mappings
    const q = query(
      collection(db, 'specialtyTheatreMappings'),
      where('hospitalId', '==', hospitalId)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      // Support BOTH data structures:
      // 1. theatrePriorities field (setup script format)
      // 2. theatres field (Configurations UI format)

      if (data.theatrePriorities && Array.isArray(data.theatrePriorities)) {
        // Format 1: theatrePriorities (from setup script)
        data.theatrePriorities.forEach((tp: any) => {
          mappings.push({
            specialtyId: data.specialtyId,
            specialtyName: data.specialtyName,
            subspecialtyName: data.subspecialtyName,
            theatreId: tp.theatreId,
            theatreName: tp.theatreName,
            unitId: tp.unitId || '',
            unitName: tp.unitName || '',
            priority: tp.priority
          });
        });
      } else if (data.theatres && Array.isArray(data.theatres)) {
        // Format 2: theatres (from Configurations UI)
        data.theatres.forEach((t: any) => {
          mappings.push({
            specialtyId: data.specialtyId || '',
            specialtyName: data.specialtyName,
            subspecialtyName: data.subspecialtyName,
            theatreId: t.theatreId,
            theatreName: t.theatreName,
            unitId: data.unitId || '',
            unitName: data.unitName || '',
            priority: t.priority || 1
          });
        });
      }
    });

    console.log(`✅ Loaded ${mappings.length} theatre mappings from Firebase`);
    return mappings;
  } catch (error) {
    console.error('Error loading theatre mappings:', error);
    return [];
  }
}

/**
 * Load theatre-centric configurations from Firebase (NEW STRUCTURE)
 * Each configuration has a theatre with specialty assignments and session type preferences
 */
async function loadTheatreConfigurations(hospitalId: string): Promise<TheatreConfiguration[]> {
  const configurations: TheatreConfiguration[] = [];

  try {
    const q = query(
      collection(db, 'theatreConfigurations'),
      where('hospitalId', '==', hospitalId)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      configurations.push({
        id: doc.id,
        theatreId: data.theatreId,
        theatreName: data.theatreName,
        unitId: data.unitId,
        unitName: data.unitName,
        hospitalId: data.hospitalId,
        specialtyAssignments: data.specialtyAssignments || []
      });
    });

    console.log(`✅ Loaded ${configurations.length} theatre configurations from Firebase (new structure)`);
    return configurations;
  } catch (error) {
    console.error('Error loading theatre configurations:', error);
    return [];
  }
}

/**
 * Load theatre units from Firebase
 */
async function loadTheatreUnits(hospitalId: string): Promise<TheatreUnit[]> {
  const units: TheatreUnit[] = [];

  try {
    const q = query(
      collection(db, 'theatreUnits'),
      where('hospitalId', '==', hospitalId)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      units.push({
        id: doc.id,
        name: data.name,
        location: data.location || '',
        numberOfTheatres: data.numberOfTheatres || 0,
        hospitalId: data.hospitalId
      });
    });

    console.log(`✅ Loaded ${units.length} theatre units from Firebase`);
    return units;
  } catch (error) {
    console.error('Error loading theatre units:', error);
    return [];
  }
}

/**
 * Load theatres from Firebase
 */
async function loadTheatres(hospitalId: string): Promise<Theatre[]> {
  const theatres: Theatre[] = [];

  try {
    // Query for the selected hospital's theatres
    const q = query(
      collection(db, 'theatres'),
      where('hospitalId', '==', hospitalId)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      theatres.push({
        id: doc.id,
        name: data.name,
        unitId: data.unitId,
        status: data.status || 'available',
        maintenanceUntil: data.maintenanceUntil,
        openingHours: data.openingHours || { start: '08:00', end: '18:00' },
        sessionDuration: data.sessionDuration || 240
      });
    });

    console.log(`✅ Loaded ${theatres.length} theatres from Firebase`);
    return theatres;
  } catch (error) {
    console.error('Error loading theatres:', error);
    return [];
  }
}

/**
 * Get hospital name from hospitalId
 */
async function getHospitalName(hospitalId: string): Promise<string> {
  // For now, return a simple mapping
  // TODO: Load from Firebase hospitals collection
  const hospitalNames: { [key: string]: string } = {
    'royal-london-hospital': 'Royal London Hospital',
    'whipps-cross': 'Whipps Cross Hospital',
    'newham': 'Newham Hospital'
  };
  return hospitalNames[hospitalId] || 'Unknown Hospital';
}

/**
 * Load anaesthetists from Firebase
 */
async function loadAnaesthetists(hospitalId: string): Promise<any[]> {
  try {
    const anaesSnap = await getDocs(collection(db, 'anaesthetists'));
    const anaesthetists: any[] = [];

    anaesSnap.forEach(doc => {
      const data = doc.data();
      anaesthetists.push({
        id: doc.id,
        name: data.fullName || `${data.title} ${data.firstName} ${data.lastName}`,
        initials: data.initials || getInitials(`${data.firstName} ${data.lastName}`)
      });
    });

    return anaesthetists;
  } catch (error) {
    console.error('Error loading anaesthetists:', error);
    return [];
  }
}

/**
 * Load consultants/surgeons from Firebase
 */
async function loadConsultants(hospitalId: string, specialty: string): Promise<any[]> {
  try {
    // Try surgeons collection first (user's actual data)
    const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
    const consultants: any[] = [];

    surgeonsSnap.forEach(doc => {
      const data = doc.data();
      // Match by specialty name (case-insensitive)
      const surgeonSpecialty = data.specialtyName || data.specialty || '';
      if (surgeonSpecialty.toLowerCase() === specialty.toLowerCase()) {
        const firstName = data.firstName || '';
        const lastName = data.lastName || '';
        const title = data.title || 'Mr';
        const fullName = `${title} ${firstName} ${lastName}`.trim();

        consultants.push({
          id: doc.id,
          fullName: fullName,
          initials: data.initials || getInitials(`${firstName} ${lastName}`),
          specialty: surgeonSpecialty
        });
      }
    });

    return consultants;
  } catch (error) {
    console.error('Error loading consultants:', error);
    return [];
  }
}

function getInitials(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[parts.length - 1][0];
  }
  return fullName.substring(0, 2).toUpperCase();
}

/**
 * Load procedures from waiting list (procedures pool)
 */
async function loadProceduresFromWaitingList(
  specialty: string,
  consultantId?: string
): Promise<WaitingListProcedure[]> {
  try {
    let q = query(
      collection(db, 'waitingList'),
      where('isScheduled', '==', false), // Only unscheduled procedures
      where('specialtyName', '==', specialty)
    );

    if (consultantId) {
      q = query(q, where('consultantId', '==', consultantId));
    }

    const snapshot = await getDocs(q);
    const procedures: WaitingListProcedure[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      procedures.push({
        id: doc.id,
        patientName: `${data.firstName} ${data.lastName}`,
        hospitalNumber: data.hospitalNumber,
        procedureName: data.procedureName,
        procedureCode: data.procedureCode,
        priority: data.priority,
        consultantId: data.consultantId,
        consultantName: data.consultantName,
        specialtyId: data.specialtyId,
        specialtyName: data.specialtyName,
        subspecialtyName: data.subspecialtyName,
        referralDate: data.referralDate,
        targetDate: data.targetDate,
        waitingDays: data.waitingDays,
        isScheduled: data.isScheduled || false,
        sessionId: data.sessionId
      });
    });

    // Sort by priority (Urgent first) and waiting days (longer wait first)
    return procedures.sort((a, b) => {
      const priorityOrder: Record<string, number> = { 'Urgent': 0, 'Expedited': 1, 'Routine': 2, 'Planned': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.waitingDays - a.waitingDays;
    });
  } catch (error) {
    console.error('Error loading procedures from waiting list:', error);
    return [];
  }
}

/**
 * Convert waiting list procedures to Procedure format for generateTheatreList
 */
function convertWaitingListToProcedures(waitingListProcs: WaitingListProcedure[]): Procedure[] {
  return waitingListProcs.map(wlProc => ({
    name: wlProc.procedureName,
    opcs4: [wlProc.procedureCode],
    commonVariations: [],
    specialtyName: wlProc.specialtyName,
    subspecialtyName: wlProc.subspecialtyName
  }));
}

/**
 * Get procedures for a specialty (LEGACY - for fallback)
 */
function getProceduresForSpecialty(specialty: string): Procedure[] {
  const procedures: Procedure[] = [];

  const specialtyMap: { [key: string]: string[] } = {
    'Orthopaedics': ['Trauma Orthopaedics', 'Elective Orthopaedics'],
    'Trauma': ['Trauma Orthopaedics'],
    'General Surgery': ['General Surgery', 'Emergency Surgery', 'Colorectal', 'Upper GI'],
    'Emergency': ['Emergency Surgery', 'General Surgery'],
    'Colorectal': ['Colorectal'],
    'Hepatobiliary': ['Hepatobiliary'],
    'Upper GI': ['Upper GI'],
    'Vascular': ['Vascular'],
    'Urology': ['Urology'],
    'Gynaecology': ['Gynaecology'],
    'ENT': ['ENT'],
    'Ophthalmology': ['Ophthalmology'],
    'Plastic Surgery': ['Plastic Surgery'],
    'Maxillofacial': ['Maxillofacial'],
    'Neurosurgery': ['Neurosurgery'],
    'Cardiac': ['Cardiac'],
    'Endoscopy': ['Endoscopy']
  };

  const categories = specialtyMap[specialty] || [specialty];

  for (const category of categories) {
    const specialtyData = SURGICAL_PROCEDURES_BY_SPECIALTY[category as keyof typeof SURGICAL_PROCEDURES_BY_SPECIALTY];
    if (specialtyData && 'subcategories' in specialtyData) {
      const subcats: any = specialtyData.subcategories;
      for (const subcatKey of Object.keys(subcats)) {
        const subcat = subcats[subcatKey];
        if (subcat && subcat.procedures && Array.isArray(subcat.procedures)) {
          procedures.push(...subcat.procedures);
        }
      }
    }
  }

  return procedures;
}

/**
 * Determine procedure count limit based on session type
 * User requirements: 4 for AD (All Day 8-6), 6 for ADE (All Day Extended 8-8)
 */
function getProcedureCountForSessionType(sessionTypeId: string): number {
  // Session type mapping from lib/scheduling/sessionTypes.ts:
  // 'day' = 'All Day (08:00-18:00)' = AD = 4 procedures
  // 'long-day' = 'All Day Extended (08:00-20:00)' = ADE = 6 procedures

  switch (sessionTypeId) {
    case 'day': // AD: 08:00-18:00
      return 4;
    case 'long-day': // ADE: 08:00-20:00
      return 6;
    case 'am': // AM: 08:00-13:00
      return 3;
    case 'pm': // PM: 13:00-18:00
      return 3;
    case 'pme': // PME: 13:00-20:00
      return 4;
    case 'night': // NIGHT: 20:00-08:00
      return 6;
    default:
      return 4; // Default fallback
  }
}

/**
 * Check if surgeon is already scheduled on this date/session
 */
function isSurgeonAvailable(
  surgeonId: string,
  date: string,
  sessionType: string,
  scheduledSurgeons: SurgeonSchedule[]
): boolean {
  return !scheduledSurgeons.some(
    schedule =>
      schedule.surgeonId === surgeonId &&
      schedule.date === date &&
      schedule.sessionType === sessionType
  );
}

/**
 * Determine session type based on theatre name and specialty (LEGACY)
 * DEPRECATED: Use getPreferredSessionType() with session type preferences instead
 */
function getSessionType(theatreName: string, specialtyName: string): SessionType {
  const nameLower = theatreName.toLowerCase();
  const specialtyLower = specialtyName.toLowerCase();

  // Emergency and Trauma run FULL sessions (08:00-20:00) 7 days/week
  if (specialtyLower.includes('emergency') || specialtyLower.includes('trauma')) {
    return 'FULL';
  }

  // Default to AM and PM sessions for elective cases
  return Math.random() < 0.5 ? 'AM' : 'PM';
}

/**
 * Get preferred session type based on session type preferences (NEW)
 * Returns the session type with priority 1, or FULL as default
 * DEPRECATED: Use determinePCSBasedSessionType() for intelligent session type selection
 */
function getPreferredSessionType(sessionTypePreferences: SessionTypePreference[]): SessionType {
  if (!sessionTypePreferences || sessionTypePreferences.length === 0) {
    // Default to FULL day if no preferences configured
    return 'FULL';
  }

  // Sort by priority (1 = highest priority)
  const sorted = [...sessionTypePreferences].sort((a, b) => a.priority - b.priority);

  // Return the session type with priority 1
  return sorted[0].sessionType;
}

// CONFIGURABLE THRESHOLDS - Adjust these to control session utilization
const SESSION_CONFIG = {
  TURNOVER_TIME: 20,        // Minutes between cases
  SETUP_TIME: 30,           // Minutes for session setup
  TARGET_UTILIZATION: 0.85, // Target 85% utilization (leave 15% buffer)
  MIN_REMAINING_TIME: 30,   // Minimum minutes to suggest additional case
};

/**
 * PCS-AWARE SESSION TYPE DETERMINATION
 * Analyzes waiting list procedures to determine optimal session type (AD vs ADE)
 * Based on total procedure duration + complexity + turnover time
 */
function determinePCSBasedSessionType(
  waitingListProcs: WaitingListProcedure[],
  specialtyName: string
): {
  sessionType: SessionType;
  selectedProcedures: WaitingListProcedure[];
  reasoning: string;
  timeUsed: number;
  timeAvailable: number;
  remainingTime: number;
  canFitMore: boolean;
  recommendedProcedures: WaitingListProcedure[];
} {
  if (waitingListProcs.length === 0) {
    return {
      sessionType: 'FULL',
      selectedProcedures: [],
      reasoning: 'No procedures in waiting list, defaulting to FULL',
      timeUsed: 0,
      timeAvailable: 600,
      remainingTime: 600,
      canFitMore: true,
      recommendedProcedures: []
    };
  }

  // Define available theatre time for each session type (in minutes)
  const SESSION_TIMES: Record<SessionType, number> = {
    'AM': 300,       // 08:00-13:00 = 5 hours = 300 min
    'PM': 300,       // 13:00-18:00 = 5 hours = 300 min
    'FULL': 600,     // 08:00-18:00 = 10 hours = 600 min (AD - All Day)
    'EVE': 120,      // 18:00-20:00 = 2 hours = 120 min
    'PME': 420,      // 13:00-20:00 = 7 hours = 420 min
    'EXTENDED': 720, // 08:00-20:00 = 12 hours = 720 min (ADE - All Day Extended)
    'NIGHT': 720     // 20:00-08:00 = 12 hours = 720 min
  };

  // Turnover time between cases (minutes)
  const TURNOVER_TIME = SESSION_CONFIG.TURNOVER_TIME;

  // Reserved time for setup/cleanup (minutes)
  const SETUP_TIME = SESSION_CONFIG.SETUP_TIME;

  // Calculate PCS scores and estimated durations for all procedures
  interface ScoredProcedure {
    procedure: WaitingListProcedure;
    score: ProcedureScore;
    totalTime: number; // Duration + turnover
  }

  const scoredProcedures: ScoredProcedure[] = waitingListProcs.map(proc => {
    const score = scoreProcedure(
      proc.procedureName,
      [proc.procedureCode],
      specialtyName
    );

    const totalTime = score.estimatedDuration + TURNOVER_TIME;

    return {
      procedure: proc,
      score,
      totalTime
    };
  });

  // Sort by priority (Urgent first) and waiting days (longer wait first)
  scoredProcedures.sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      'Urgent': 0, 'Expedited': 1, 'Routine': 2, 'Planned': 3
    };
    const priorityDiff = priorityOrder[a.procedure.priority] - priorityOrder[b.procedure.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.procedure.waitingDays - a.procedure.waitingDays;
  });

  // Try to fill theatre time efficiently
  // Start with FULL (AD), then try EXTENDED (ADE) if needed
  const selectedProcedures: WaitingListProcedure[] = [];
  let totalTimeNeeded = SETUP_TIME; // Start with setup time
  let sessionType: SessionType = 'FULL'; // Default to AD (All Day)

  // Strategy: Fill as many procedures as possible without exceeding theatre time
  for (const scored of scoredProcedures) {
    const potentialTotal = totalTimeNeeded + scored.totalTime;

    // Check if this procedure fits in FULL (AD) session
    if (potentialTotal <= SESSION_TIMES['FULL']) {
      selectedProcedures.push(scored.procedure);
      totalTimeNeeded = potentialTotal;
    } else if (potentialTotal <= SESSION_TIMES['EXTENDED']) {
      // Doesn't fit in FULL, but fits in EXTENDED (ADE)
      selectedProcedures.push(scored.procedure);
      totalTimeNeeded = potentialTotal;
      sessionType = 'EXTENDED'; // Upgrade to ADE (All Day Extended)
    } else {
      // Doesn't fit in EXTENDED either, stop here
      break;
    }
  }

  // If nothing selected, take at least the first procedure
  if (selectedProcedures.length === 0 && scoredProcedures.length > 0) {
    selectedProcedures.push(scoredProcedures[0].procedure);
    totalTimeNeeded = SETUP_TIME + scoredProcedures[0].totalTime;

    // Determine session type based on first procedure duration
    if (totalTimeNeeded <= SESSION_TIMES['FULL']) {
      sessionType = 'FULL';
    } else {
      sessionType = 'EXTENDED';
    }
  }

  // Calculate remaining time and check if we can fit more
  const timeAvailable = SESSION_TIMES[sessionType];
  const targetTime = timeAvailable * SESSION_CONFIG.TARGET_UTILIZATION; // Target 85% utilization
  const remainingTime = timeAvailable - totalTimeNeeded;
  const canFitMore = remainingTime >= SESSION_CONFIG.MIN_REMAINING_TIME;

  // Get IDs of already selected procedures
  const selectedIds = new Set(selectedProcedures.map(p => p.id));

  // Find procedures that could fit in remaining time
  const recommendedProcedures: WaitingListProcedure[] = [];
  if (canFitMore) {
    // Look through unselected procedures
    const unselectedScored = scoredProcedures.filter(sp => !selectedIds.has(sp.procedure.id));

    for (const scored of unselectedScored) {
      // Check if this procedure + turnover would fit
      const timeWithTurnover = scored.totalTime;
      if (timeWithTurnover <= remainingTime) {
        recommendedProcedures.push(scored.procedure);
        // Only show top 3 recommendations
        if (recommendedProcedures.length >= 3) break;
      }
    }
  }

  // Calculate utilization percentage
  const utilizationPct = Math.round((totalTimeNeeded / timeAvailable) * 100);

  // Generate reasoning
  const reasoning = `PCS Analysis: ${selectedProcedures.length} procedures, ` +
    `${totalTimeNeeded} min used (${utilizationPct}% utilization). ` +
    `Session: ${sessionType === 'FULL' ? 'AD (All Day)' : 'ADE (All Day Extended)'} - ` +
    `${timeAvailable} min available, ${remainingTime} min remaining.` +
    (canFitMore ? ` ${recommendedProcedures.length} additional cases could fit.` : '');

  console.log(`      🧠 ${reasoning}`);

  if (recommendedProcedures.length > 0) {
    console.log(`      💡 Recommendations: ${recommendedProcedures.length} additional procedures could fit in remaining ${remainingTime} min`);
  }

  return {
    sessionType,
    selectedProcedures,
    reasoning,
    timeUsed: totalTimeNeeded,
    timeAvailable,
    remainingTime,
    canFitMore,
    recommendedProcedures
  };
}

/**
 * Check if theatre is available on a given date
 */
function isTheatreAvailable(theatre: Theatre, date: Date): boolean {
  // Check if under maintenance
  if (theatre.status === 'maintenance' && theatre.maintenanceUntil) {
    const maintenanceEnd = new Date(theatre.maintenanceUntil);
    if (date <= maintenanceEnd) {
      return false; // Blocked due to maintenance
    }
  }

  // Weekend check - but NOT blocking, just informational
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Emergency/Trauma theatres operate on weekends
  if (theatre.name.toLowerCase().includes('emergency') ||
      theatre.name.toLowerCase().includes('trauma')) {
    return true;
  }

  // Regular theatres on weekends - still available for scheduling if needed
  // (user can override weekend closure)
  return true;
}

/**
 * AUTO-GENERATE schedule for a date range based on Firebase configurations
 * READS DIRECTLY FROM YOUR CONFIGURATIONS - NO DUPLICATION!
 * NOW WITH SMART PROCEDURE ALLOCATION FROM WAITING LIST!
 */
export async function generateScheduleFromConfig(
  hospitalId: string,
  startDate: Date,
  endDate: Date
): Promise<TheatreList[]> {
  console.log('🤖 AUTO-SCHEDULER: Starting (Smart Mode - Using Procedures Pool)...');
  console.log(`📅 Date range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);
  console.log('📖 Reading configurations from Firebase...\n');

  const lists: TheatreList[] = [];
  const scheduledSurgeons: SurgeonSchedule[] = []; // Track surgeon conflicts

  // Load configurations from Firebase
  const units = await loadTheatreUnits(hospitalId);
  const theatres = await loadTheatres(hospitalId);
  const anaesthetists = await loadAnaesthetists(hospitalId);

  // Try NEW theatre configurations first, fall back to OLD mappings
  let theatreConfigurations = await loadTheatreConfigurations(hospitalId);
  let mappings: TheatreMapping[] = [];
  let usingNewStructure = false;

  if (theatreConfigurations.length > 0) {
    console.log(`✅ Using NEW theatre-centric configuration structure`);
    usingNewStructure = true;
  } else {
    console.log(`⚠️  No theatre configurations found, falling back to legacy mappings...`);
    mappings = await loadTheatreMappings(hospitalId);
    console.log(`✅ Loaded ${mappings.length} specialty-theatre mappings (legacy)`);
  }

  console.log(`✅ Loaded ${units.length} theatre units`);
  console.log(`✅ Loaded ${theatres.length} theatres`);
  console.log(`✅ Loaded ${anaesthetists.length} anaesthetists`);

  if (units.length === 0) {
    console.warn('⚠️  No theatre units found. Please configure theatre units first.');
    return [];
  }

  if (!usingNewStructure && mappings.length === 0) {
    console.warn('⚠️  No theatre configurations or mappings found. Please configure theatres first.');
    return [];
  }

  if (usingNewStructure && theatreConfigurations.length === 0) {
    console.warn('⚠️  No theatre configurations found. Please configure theatres first.');
    return [];
  }

  // Build theatre-level priority mappings with session type preferences
  // Each theatre can have multiple specialties with different priorities
  interface TheatreSpecialtyAssignment {
    theatreId: string;
    theatreName: string;
    unitId: string;
    unitName: string;
    specialtyName: string;
    subspecialtyName?: string;
    priority: number;
    sessionTypePreferences?: SessionTypePreference[]; // NEW: session type priorities
  }

  const theatreAssignments = new Map<string, TheatreSpecialtyAssignment[]>();

  if (usingNewStructure) {
    // Build assignments from NEW theatre configurations
    theatreConfigurations.forEach(config => {
      const assignments: TheatreSpecialtyAssignment[] = [];

      config.specialtyAssignments.forEach(assignment => {
        assignments.push({
          theatreId: config.theatreId,
          theatreName: config.theatreName,
          unitId: config.unitId,
          unitName: config.unitName,
          specialtyName: assignment.specialtyName,
          subspecialtyName: assignment.subspecialtyName,
          priority: assignment.priority,
          sessionTypePreferences: assignment.sessionTypePreferences // Include preferences!
        });
      });

      // Sort by priority (Priority 1 = highest)
      assignments.sort((a, b) => a.priority - b.priority);

      if (assignments.length > 0) {
        theatreAssignments.set(config.theatreId, assignments);
      }
    });
  } else {
    // Build assignments from LEGACY mappings (backward compatibility)
    mappings.forEach(mapping => {
      if (!theatreAssignments.has(mapping.theatreId)) {
        theatreAssignments.set(mapping.theatreId, []);
      }
      theatreAssignments.get(mapping.theatreId)!.push({
        theatreId: mapping.theatreId,
        theatreName: mapping.theatreName,
        unitId: mapping.unitId,
        unitName: mapping.unitName,
        specialtyName: mapping.specialtyName,
        subspecialtyName: mapping.subspecialtyName,
        priority: mapping.priority,
        sessionTypePreferences: undefined // No preferences in legacy mode
      });
    });

    // Sort assignments by priority for each theatre (Priority 1 = highest)
    theatreAssignments.forEach(assignments => {
      assignments.sort((a, b) => a.priority - b.priority);
    });
  }

  console.log(`\n🏥 Processing ${theatreAssignments.size} individual theatres...`);

  // Generate lists for each day
  const currentDate = new Date(startDate);
  let dayCount = 0;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    dayCount++;
    console.log(`\n📅 Day ${dayCount}: ${currentDate.toISOString().split('T')[0]} (${dayName})`);

    // Process each INDIVIDUAL THEATRE (not units)
    for (const [theatreId, assignments] of theatreAssignments.entries()) {
      if (assignments.length === 0) {
        continue; // No specialty assigned to this theatre
      }

      // Get the theatre details
      const theatre = theatres.find(t => t.id === theatreId);
      if (!theatre) {
        console.warn(`   ⚠️  Theatre ${theatreId} not found in theatres collection`);
        continue;
      }

      // Check if this is an emergency/trauma theatre (operates 7 days/week)
      const isEmergencyTheatre = theatre.name.toLowerCase().includes('emergency') ||
                                  theatre.name.toLowerCase().includes('trauma');

      // Skip weekends for non-emergency/trauma theatres
      if (isWeekend && !isEmergencyTheatre) {
        continue; // Theatre closed on weekend
      }

      // Filter assignments by day of week, then get the highest priority one
      const dayOfWeekNum = dayOfWeek; // 0=Sunday, 1=Monday, ..., 6=Saturday
      const assignmentsForToday = assignments.filter(assignment => {
        // If daysOfWeek is not specified or empty, this specialty runs all days
        if (!assignment.daysOfWeek || assignment.daysOfWeek.length === 0) {
          return true;
        }
        // Otherwise, check if today is in the daysOfWeek array
        return assignment.daysOfWeek.includes(dayOfWeekNum);
      });

      // If no assignments match today's day of week, skip this theatre
      if (assignmentsForToday.length === 0) {
        console.log(`   ⏭️  ${assignments[0]?.theatreName || 'Theatre'}: No specialty assigned for ${dayName}`);
        continue;
      }

      // Get the highest priority specialty for today (already sorted by priority)
      const assignment = assignmentsForToday[0];

      const dayPatternInfo = assignment.daysOfWeek && assignment.daysOfWeek.length > 0
        ? ` [${assignment.daysOfWeek.map(d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(',')}]`
        : ' [All Days]';

      console.log(`   ✨ ${assignment.theatreName}: ${assignment.specialtyName}${assignment.subspecialtyName ? ` - ${assignment.subspecialtyName}` : ''} (Priority ${assignment.priority})${dayPatternInfo}`);

      // Get consultants for this specialty
      const consultants = await loadConsultants(hospitalId, assignment.specialtyName);

      if (consultants.length === 0) {
        console.warn(`      ⚠️  No consultants found for ${assignment.specialtyName}`);
        continue;
      }

      // 🚀 SMART PROCEDURE ALLOCATION: Load from waiting list FIRST
      console.log(`      📋 Loading procedures from waiting list...`);

      // Load all unscheduled procedures for this specialty
      let waitingListProcedures = await loadProceduresFromWaitingList(
        assignment.specialtyName
      );

      console.log(`      📊 Found ${waitingListProcedures.length} procedures in waiting list`);

      // 🎯 USE CONFIGURED SESSION TYPE PREFERENCES FROM MAPPING
      // Get the highest priority session type from theatre configuration
      const sessionTypePrefs = assignment.sessionTypePreferences || [];
      const preferredSessionType = sessionTypePrefs.length > 0
        ? sessionTypePrefs.sort((a, b) => a.priority - b.priority)[0].sessionType
        : 'FULL' as SessionType;

      const sessionType = preferredSessionType;

      console.log(`      📅 Session type: ${sessionType} (from theatre mapping - Priority ${sessionTypePrefs.find(s => s.sessionType === sessionType)?.priority || 'N/A'})`);

      // Filter procedures that fit in this session type based on duration
      const sessionConfig = SESSION_CONFIGS[sessionType];
      const sessionDuration = sessionConfig?.duration || 480; // minutes

      let selectedWaitingListProcs: WaitingListProcedure[] = [];
      let totalMinutes = 0;

      // Sort by priority and waiting days
      const sortedProcs = waitingListProcedures.sort((a, b) => {
        const priorityOrder = { 'Urgent': 1, 'Expedited': 2, 'Routine': 3, 'Planned': 4 };
        const priorityDiff = (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5);
        if (priorityDiff !== 0) return priorityDiff;
        return b.waitingDays - a.waitingDays;
      });

      // Add procedures until we hit session duration limit
      for (const proc of sortedProcs) {
        // Estimate 60 minutes per procedure (can be refined later)
        const estimatedDuration = 60;
        if (totalMinutes + estimatedDuration <= sessionDuration) {
          selectedWaitingListProcs.push(proc);
          totalMinutes += estimatedDuration;
        }
      }

      console.log(`      ✅ Selected ${selectedWaitingListProcs.length} procedures (${totalMinutes} minutes of ${sessionDuration} available)`);

      // Find an available consultant (check conflicts)
      const dateStr = currentDate.toISOString().split('T')[0];
      let surgeon = null;
      let attempts = 0;

      // Filter procedures by surgeon and find available surgeon
      while (!surgeon && attempts < consultants.length) {
        const candidate = consultants[Math.floor(Math.random() * consultants.length)];

        if (isSurgeonAvailable(candidate.id, dateStr, sessionType, scheduledSurgeons)) {
          surgeon = candidate;
          // Record this surgeon's schedule
          scheduledSurgeons.push({
            surgeonId: candidate.id,
            surgeonName: candidate.fullName,
            date: dateStr,
            sessionType: sessionType,
            theatreId: theatre.id
          });
        }
        attempts++;
      }

      if (!surgeon) {
        console.warn(`      ⚠️  No available consultants (all busy) for ${assignment.specialtyName}`);
        continue;
      }

      // Filter selected procedures to this surgeon's patients
      const surgeonProcedures = selectedWaitingListProcs.filter(
        proc => proc.consultantId === surgeon.id
      );

      // If no procedures for this surgeon, try any surgeon's procedures
      const finalProcedures = surgeonProcedures.length > 0
        ? surgeonProcedures
        : selectedWaitingListProcs;

      console.log(`      👨‍⚕️ Surgeon: ${surgeon.fullName} (${finalProcedures.length} procedures)`);

      // Pick a random anaesthetist
      if (anaesthetists.length === 0) {
        console.warn(`      ⚠️  No anaesthetists available`);
        continue;
      }
      const anaesthetist = anaesthetists[Math.floor(Math.random() * anaesthetists.length)];

      // Determine if this is emergency/trauma
      const isEmergency = assignment.unitName.toLowerCase().includes('emergency');
      const isTrauma = assignment.unitName.toLowerCase().includes('trauma');

      // If no procedures in waiting list, fallback to legacy hardcoded data
      let procedures: Procedure[] = [];
      if (finalProcedures.length === 0) {
        console.warn(`      ⚠️  No procedures in waiting list for ${assignment.specialtyName}, using fallback data`);
        procedures = getProceduresForSpecialty(assignment.specialtyName);

        if (procedures.length === 0) {
          console.warn(`      ⚠️  No procedures found (even in fallback)`);
          continue;
        }

        // Generate the theatre list using legacy method
        const list = generateTheatreList(
          new Date(currentDate),
          theatre.id,
          theatre.name,
          assignment.unitId,
          assignment.unitName,
          hospitalId,
          await getHospitalName(hospitalId),
          assignment.specialtyName,
          sessionType,
          procedures,
          surgeon.fullName,
          surgeon.initials,
          anaesthetist.fullName,
          anaesthetist.initials,
          isEmergency || isTrauma,
          assignment.subspecialtyName
        );

        lists.push(list);
        console.log(`      ✅ Generated ${list.totalCases} cases (Legacy Mode)`);
      } else {
        // 🎯 PCS-BASED SMART MODE: Use selected procedures from PCS analysis
        console.log(`      🎯 PCS-Based Smart Mode: ${finalProcedures.length} procedures selected`);

        // Convert to Procedure format for theatre list generation
        const proceduresForList = convertWaitingListToProcedures(finalProcedures);

        // Generate the theatre list using PCS-based allocation
        const list = generateTheatreList(
          new Date(currentDate),
          theatre.id,
          theatre.name,
          assignment.unitId,
          assignment.unitName,
          hospitalId,
          await getHospitalName(hospitalId),
          assignment.specialtyName,
          sessionType,
          proceduresForList,
          surgeon.fullName,
          surgeon.initials,
          anaesthetist.fullName,
          anaesthetist.initials,
          isEmergency || isTrauma,
          assignment.subspecialtyName
        );

        lists.push(list);
        console.log(`      ✅ Generated ${list.totalCases} cases (PCS-Based Smart Mode)`);
        console.log(`      📊 Priority mix: ${finalProcedures.map(p => p.priority).join(', ')}`);
      }
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(`\n🎉 AUTO-SCHEDULER COMPLETE!`);
  console.log(`   📊 Generated ${lists.length} theatre lists`);
  console.log(`   📋 Total cases: ${lists.reduce((sum, l) => sum + l.totalCases, 0)}`);
  console.log(`   ⏱️  Average utilization: ${(lists.reduce((sum, l) => sum + l.utilizationPercentage, 0) / lists.length).toFixed(1)}%`);

  return lists;
}

/**
 * Generate schedule for a single date (for on-demand generation)
 */
export async function generateScheduleForDate(
  hospitalId: string,
  date: Date
): Promise<TheatreList[]> {
  return generateScheduleFromConfig(hospitalId, date, date);
}
