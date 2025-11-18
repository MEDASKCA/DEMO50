// Waiting List and Procedure Types for Integrated System

export type WaitingListPriority = 'Urgent' | 'Expedited' | 'Routine' | 'Planned';
export type ProcedureStatus = 'waiting' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

// Patient on waiting list
export interface WaitingListPatient {
  id?: string;
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;

  // Clinical Details
  consultantId: string; // Links to surgeons collection
  consultantName: string;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;

  // Procedure Details
  procedureCode: string; // OPCS-4 code
  procedureName: string;
  preferenceCardId?: string; // Links to preference cards

  // Waiting List Data
  priority: WaitingListPriority;
  addedToListDate: string; // ISO date
  targetDate?: string; // RTT target date
  waitingDays: number;

  // Scheduling
  isScheduled: boolean;
  scheduledDate?: string;
  scheduledTheatreId?: string;
  scheduledSessionId?: string;

  // Status
  status: ProcedureStatus;
  notes?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// Generated Procedure (from waiting list)
export interface GeneratedProcedure {
  id?: string;

  // Patient Link
  patientId: string;
  hospitalNumber: string;
  patientName: string;

  // Clinical Team
  surgeonId: string; // From surgeons collection
  surgeonName: string;
  surgeonInitials: string;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;

  // Procedure Details
  procedureCode: string; // OPCS-4 code
  procedureName: string;
  procedureCategory?: string;
  estimatedDurationMinutes: number;

  // Preference Card & Equipment
  preferenceCardId?: string;
  requiredEquipment?: string[];
  requiredInstruments?: string[];
  requiredImplants?: string[];

  // Priority & Scheduling
  priority: WaitingListPriority;
  targetDate?: string;
  proposedDate?: string;
  scheduledDate?: string;
  scheduledTheatreId?: string;
  scheduledSessionId?: string;

  // Staff Requirements (from mapper)
  requiredAnaesthetists: number;
  requiredScrubNurses: number;
  requiredHCAs: number;
  requiredODPs: number;
  customStaffRequirements?: StaffRequirement[];

  // Status
  status: ProcedureStatus;
  notes?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// Staff Requirement for a procedure
export interface StaffRequirement {
  roleId: string;
  roleName: string;
  quantity: number;
  grade?: string; // Band 5, Band 6, etc.
}

// Staff Requirement Mapper (per specialty/subspecialty)
export interface StaffRequirementMapper {
  id?: string;

  // Specialty Mapping
  specialtyId: string;
  specialtyName: string;
  subspecialty?: string;
  keywords?: string[]; // Array of keywords to match (e.g., ["Total Hip", "THR", "Hip replacement"])
  procedureCategory?: string; // Optional: can map by category too

  // Staff Roles (Primary - use this for all role definitions)
  roles?: StaffRequirement[]; // Dynamic list of required roles with quantities

  // Legacy: Single keyword (deprecated, use 'keywords' array)
  keyword?: string | null; // Optional: match by procedure keyword (e.g., "Laser"), null = "Any"

  // Legacy: Default Staff Requirements (deprecated, use 'roles' instead)
  requirements?: {
    anaesthetists: number;
    scrubNurses: number;
    hcas: number;
    odps: number;
  };

  // Legacy fields (deprecated, use 'roles' array)
  anaesthetistsRequired?: number;
  anaesthetistGrade?: string;
  scrubNursesRequired?: number;
  scrubNurseGrade?: string;
  hcasRequired?: number;
  odpsRequired?: number;
  odpGrade?: string;

  // Additional Custom Roles (deprecated, use 'roles' instead)
  customRoles?: StaffRequirement[];

  // Metadata
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Consultant-Procedure Link (which procedures can each consultant perform)
export interface ConsultantProcedureLink {
  id?: string;

  // Consultant
  surgeonId: string;
  surgeonName: string;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;

  // Procedures they can perform
  procedureCodes: string[]; // Array of OPCS-4 codes

  // Competency levels (optional)
  competencyLevels?: {
    [procedureCode: string]: 'Learning' | 'Competent' | 'Expert' | 'Supervisor';
  };

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// Preference Card Enhancement (linking to consultants)
export interface PreferenceCardConsultantLink {
  preferenceCardId: string;
  linkedConsultantIds: string[]; // Surgeons who use this card
  linkedProcedureCodes: string[]; // OPCS codes this card is for
}
