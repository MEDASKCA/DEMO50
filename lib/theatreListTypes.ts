// Theatre List Types - For Surgical Case Scheduling
// No patient identifiable information

export type AnaestheticType = 'GA' | 'Spinal' | 'Regional' | 'Sedation' | 'Local' | 'Combined';

export type SessionType = 'AM' | 'PM' | 'EVE' | 'FULL' | 'EXTENDED';

export interface SurgicalCase {
  id: string;
  procedureName: string;
  opcs4Codes: string[];
  specialty: string;
  subspecialty?: string;

  // PCS Scoring
  pcsScore: number;
  complexityScore: number;
  durationScore: number;
  variabilityScore: number;
  surgeonLevelScore: number;

  // Time estimates
  estimatedSurgicalTime: number; // minutes
  anaestheticType: AnaestheticType;
  anaestheticTime: number; // minutes
  turnoverTime: number; // minutes between cases
  totalCaseTime: number; // surgical + anaesthetic + turnover

  // Personnel
  surgeonInitials: string;
  surgeonFullName: string;
  anaesthetistInitials: string;
  anaesthetistFullName: string;

  // Financial (NHS tariff/HRG-based)
  estimatedCost?: number; // £ - Based on PCS/complexity
  tariffCode?: string; // HRG code

  // Metadata
  caseOrder: number; // Position in the list (1, 2, 3, etc.)
  notes?: string;
}

export interface TheatreList {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Monday, Tuesday, etc.

  // Theatre details
  theatreId: string;
  theatreName: string;
  unitId: string;
  unitName: string;
  hospitalId: string;
  hospitalName: string;

  // Session details
  specialty: string;
  subspecialty?: string;
  sessionType: SessionType;
  sessionTimes: {
    start: string; // HH:mm
    end: string; // HH:mm
  };
  sessionDurationMinutes: number;

  // Primary personnel (shown on admin calendar)
  primarySurgeonInitials: string;
  primarySurgeonName: string;
  primaryAnaesthetistInitials: string;
  primaryAnaesthetistName: string;

  // Cases
  cases: SurgicalCase[];
  totalCases: number;
  totalEstimatedTime: number; // Sum of all case times
  utilizationPercentage: number; // (totalEstimatedTime / sessionDuration) * 100

  // Financial
  totalEstimatedCost?: number; // £ - Sum of all case costs
  estimatedRevenue?: number; // £ - Based on NHS tariff
  potentialRevenueLost?: number; // £ - Revenue lost due to unused theatre time

  // Optimization Metadata (from PCS-aware scheduling)
  timeRemaining?: number; // Minutes of unused theatre time
  canFitMore?: boolean; // Whether additional cases could fit
  recommendedProcedures?: string[]; // Procedure names that could fit

  // Status
  status: 'draft' | 'published' | 'in-progress' | 'completed' | 'cancelled';

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  notes?: string;
}

export interface SpecialtyAllocation {
  id: string;
  hospitalId: string;
  unitId: string;
  theatreId: string;
  specialty: string;
  priority: number; // 1 = highest priority
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
  sessionTypes: SessionType[];
  allocatedSessions: number; // Number of sessions per week
}

export interface AnaestheticTimeDefaults {
  GA: { min: number; max: number; avg: number };
  Spinal: { min: number; max: number; avg: number };
  Regional: { min: number; max: number; avg: number };
  Sedation: { min: number; max: number; avg: number };
  Local: { min: number; max: number; avg: number };
  Combined: { min: number; max: number; avg: number };
}

// Standard anaesthetic times (in minutes)
export const ANAESTHETIC_TIMES: AnaestheticTimeDefaults = {
  GA: { min: 20, max: 35, avg: 25 },
  Spinal: { min: 15, max: 25, avg: 20 },
  Regional: { min: 20, max: 30, avg: 25 },
  Sedation: { min: 10, max: 15, avg: 12 },
  Local: { min: 5, max: 10, avg: 7 },
  Combined: { min: 25, max: 40, avg: 30 }
};

// Standard turnover times (in minutes)
export const TURNOVER_TIMES = {
  minor: 15, // Minor procedures
  intermediate: 20, // Intermediate procedures
  major: 30, // Major procedures
  complex: 40 // Complex/contaminated procedures
};

// Session time configurations (in minutes)
export const SESSION_CONFIGS = {
  AM: { start: '08:00', end: '13:00', duration: 300 },
  PM: { start: '13:00', end: '18:00', duration: 300 },
  EVE: { start: '18:00', end: '20:00', duration: 120 },
  FULL: { start: '08:00', end: '18:00', duration: 600 }, // Full day
  EXTENDED: { start: '08:00', end: '20:00', duration: 720 } // Extended day
};

// Helper function to determine turnover time based on complexity
export function getTurnoverTime(complexityScore: number): number {
  if (complexityScore <= 1) return TURNOVER_TIMES.minor;
  if (complexityScore <= 1.5) return TURNOVER_TIMES.intermediate;
  if (complexityScore < 2) return TURNOVER_TIMES.major;
  return TURNOVER_TIMES.complex;
}

// Helper function to get anaesthetic time
export function getAnaestheticTime(type: AnaestheticType, variability: 'min' | 'avg' | 'max' = 'avg'): number {
  return ANAESTHETIC_TIMES[type][variability];
}

// Calculate total case time
export function calculateTotalCaseTime(
  surgicalTime: number,
  anaestheticType: AnaestheticType,
  complexityScore: number
): number {
  const anaestheticTime = getAnaestheticTime(anaestheticType);
  const turnoverTime = getTurnoverTime(complexityScore);
  return surgicalTime + anaestheticTime + turnoverTime;
}
