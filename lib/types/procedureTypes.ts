// RTT-Aware Procedure Types for NHS Theatre Operations
// Complete procedure lifecycle from referral to completion

export type RTTPathway = 'RTT' | 'Cancer' | 'Planned' | 'Emergency' | 'DayCase';

export type RTTPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'Planned';

export type ProcedureStatus =
  | 'Awaiting'        // Waiting for scheduling
  | 'Scheduled'       // Allocated to session
  | 'In Progress'     // Currently being performed
  | 'Completed'       // Procedure done
  | 'Cancelled'       // Cancelled
  | 'Postponed';      // Postponed to later date

export type PathwayStatus =
  | 'Active'          // RTT clock running
  | 'Suspended'       // Clock stopped (patient choice, medical reasons)
  | 'Completed'       // Procedure completed
  | 'Stopped';        // Clock stopped (patient declined, medically unfit)

export type Laterality = 'Left' | 'Right' | 'Bilateral' | 'N/A';

export interface Procedure {
  id: string;

  // PATIENT INFO
  hospitalNumber: string;
  patientName: string;
  dateOfBirth?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';

  // PROCEDURE INFO
  procedureName: string;              // As written (may vary)
  standardProcedureName?: string;     // Standardized name from OPCS
  opcsCode: string;                   // Primary OPCS code
  additionalOPCSCodes?: string[];     // Additional procedure codes
  specialty: string;                  // e.g., "Orthopaedics"
  subspecialty?: string;              // e.g., "Hip & Knee"
  surgeonId: string;
  surgeonName: string;

  // RTT PATHWAY TRACKING
  pathway: RTTPathway;
  priority: RTTPriority;

  // TIME TRACKING
  referralDate: Date;                 // Date referred
  clockStartDate: Date;               // RTT clock start
  decisionToAdmitDate?: Date;         // DTA date
  targetDate: Date;                   // Must be done by (based on priority)
  daysWaiting: number;                // Days since clock start
  daysToTarget: number;               // Days until breach (negative if breached)
  isBreached: boolean;                // Over target?
  breachDate?: Date;                  // When did it breach?

  // PATHWAY STATUS
  pathwayStatus: PathwayStatus;
  suspensionReason?: string;          // If suspended
  suspensionDate?: Date;

  // SCHEDULING STATUS
  schedulingStatus: ProcedureStatus;
  scheduledDate?: Date;
  scheduledTime?: string;             // e.g., "09:00"
  sessionId?: string;                 // Link to theatre session
  theatreId?: string;
  theatreName?: string;

  // CLINICAL INFO
  laterality?: Laterality;
  isStagedProcedure?: boolean;
  stageNumber?: number;               // 1st stage, 2nd stage, etc.
  relatedProcedureId?: string;        // Link to previous/next stage
  diagnosis?: string;
  comorbidities?: string[];
  specialRequirements?: string;

  // REQUIREMENTS (auto-calculated from procedure analysis)
  estimatedDuration: number;          // Minutes
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major';
  anaestheticType?: 'GA' | 'LA' | 'Spinal' | 'Regional' | 'Sedation';

  // STAFF REQUIREMENTS (auto-determined)
  staffRequired: {
    anaesthetists: number;
    anaesthetistGrade?: string;       // e.g., "Consultant"
    scrubNurses: number;
    scrubNurseGrade?: string;         // e.g., "Band 6"
    circulatingNurses?: number;
    odps: number;                     // Operating Department Practitioners
    odpGrade?: string;
    hcas: number;                     // Healthcare Assistants
    hcaGrade?: string;
    other?: { role: string; count: number; grade?: string }[];
  };

  // EQUIPMENT & RESOURCES
  preferenceCardId?: string;
  equipmentRequired?: string[];
  implantRequired?: boolean;
  implantDetails?: string;
  specialEquipment?: string[];

  // COST & FINANCE
  expectedCost?: number;
  currencyCode?: string;
  costingCode?: string;               // HRG code, etc.

  // NOTES & COMMUNICATION
  bookingNotes?: string;
  clinicalNotes?: string;
  alerts?: string[];                  // Clinical alerts

  // AUDIT TRAIL
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  cancelledAt?: Date;
  cancelledBy?: string;
  cancellationReason?: string;
}

export interface ProcedureSource {
  type: 'RTT' | 'Cancer' | 'Emergency' | 'Planned' | 'DayCase' | 'Manual';
  sourceId?: string;                  // ID from source system
  sourceName?: string;                // Name of source system
  importedAt?: Date;
}

// For generating procedures from different sources
export interface WaitingListPatient {
  id?: string;
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';

  // Procedure details
  procedureName: string;
  procedureCode: string;              // OPCS code
  additionalProcedures?: string[];

  // Consultant
  consultantId: string;
  consultantName: string;
  specialty: string;
  subspecialty?: string;

  // RTT details
  referralDate: string;
  clockStartDate: string;
  priority: RTTPriority;
  pathway: RTTPathway;

  // Status
  isScheduled: boolean;
  scheduledDate?: string;
  status: PathwayStatus;

  // Clinical
  diagnosis?: string;
  laterality?: Laterality;
  specialRequirements?: string;

  // Tracking
  waitingDays: number;
  daysToTarget: number;
  isBreached: boolean;
}

// Priority targets in days
export const RTT_TARGETS: Record<RTTPriority, number> = {
  'P1': 3,          // 72 hours (emergency/urgent)
  'P2': 14,         // 2 weeks (cancer 2-week wait / urgent)
  'P3': 84,         // 12 weeks
  'P4': 126,        // 18 weeks (standard RTT)
  'Planned': 180    // 6 months (planned/staged)
};

// Priority colors for UI
export const RTT_PRIORITY_COLORS: Record<RTTPriority, {
  bg: string;
  border: string;
  text: string;
  badge: string;
}> = {
  'P1': {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-100 text-red-800 border-red-300'
  },
  'P2': {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-800',
    badge: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  'P3': {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  'P4': {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-800',
    badge: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  'Planned': {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-800',
    badge: 'bg-gray-100 text-gray-800 border-gray-300'
  }
};

// Pathway colors
export const RTT_PATHWAY_COLORS: Record<RTTPathway, {
  bg: string;
  text: string;
  icon: string;
}> = {
  'RTT': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-600'
  },
  'Cancer': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-600'
  },
  'Emergency': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: 'text-red-600'
  },
  'DayCase': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: 'text-green-600'
  },
  'Planned': {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: 'text-gray-600'
  }
};

// Complexity-based staff requirements (default templates)
export const COMPLEXITY_STAFF_TEMPLATES = {
  'Minor': {
    anaesthetists: 1,
    anaesthetistGrade: 'Consultant or Senior ST',
    scrubNurses: 1,
    scrubNurseGrade: 'Band 5',
    odps: 0,
    hcas: 1,
    hcaGrade: 'Band 3'
  },
  'Intermediate': {
    anaesthetists: 1,
    anaesthetistGrade: 'Consultant',
    scrubNurses: 2,
    scrubNurseGrade: 'Band 5-6',
    odps: 0,
    hcas: 1,
    hcaGrade: 'Band 3'
  },
  'Major': {
    anaesthetists: 1,
    anaesthetistGrade: 'Consultant',
    scrubNurses: 2,
    scrubNurseGrade: 'Band 6',
    odps: 1,
    odpGrade: 'Band 5',
    hcas: 0
  },
  'Complex Major': {
    anaesthetists: 2,
    anaesthetistGrade: 'Consultant + Registrar',
    scrubNurses: 3,
    scrubNurseGrade: 'Band 6-7',
    odps: 1,
    odpGrade: 'Band 5-6',
    hcas: 0
  }
};
