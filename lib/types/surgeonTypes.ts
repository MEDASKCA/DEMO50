// Surgeon and Anaesthetist Profile Types for Phase 1

export type EmploymentType = 'Full-time' | 'Part-time' | 'Job-share' | 'Locum';

// Training and career grades for surgeons and anaesthetists
export type TrainingGrade =
  | 'F1' | 'F2'  // Foundation
  | 'CT1' | 'CT2' | 'CT3'  // Core Training
  | 'ST1' | 'ST2' | 'ST3' | 'ST4' | 'ST5' | 'ST6' | 'ST7' | 'ST8'  // Specialty Training
  | 'SAS'  // Staff and Associate Specialist
  | 'Fellow'  // Post-CCT Fellow
  | 'Locum Consultant';

// COLLECTION: 'surgeons' (Consultant Surgeons only)
export interface Surgeon {
  id?: string; // Firestore document ID
  firstName: string;
  lastName: string;
  title: 'Mr' | 'Ms' | 'Miss' | 'Dr' | 'Prof';
  initials: string;

  // Specialty Assignment
  specialtyId: string;
  specialtyName: string;

  // Primary Expertise (their main subspecialty)
  primarySubspecialty?: string;

  // General Competencies (what they can also do)
  // Example: Ortho foot & ankle surgeon can do general trauma
  generalCompetencies?: string[];

  // Employment & Workload
  employmentType: EmploymentType;
  fte: number; // 1.0 = full-time, 0.5 = part-time, etc.
  annualLeaveDays: number; // Typically 25-30
  maxListsPerWeek: number; // Calculated from FTE

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// COLLECTION: 'assistant-surgeons' (Trainee and SAS surgeons)
export interface AssistantSurgeon {
  id?: string; // Firestore document ID
  firstName: string;
  lastName: string;
  title: 'Dr';  // Trainees typically use Dr
  initials: string;

  // Training Grade
  grade: TrainingGrade;

  // Specialty Assignment
  specialtyId: string;
  specialtyName: string;

  // Training focus (if subspecializing)
  primarySubspecialty?: string;

  // Competencies they're developing
  generalCompetencies?: string[];

  // Employment & Workload
  employmentType: EmploymentType;
  fte: number;
  annualLeaveDays: number; // Typically 25-30
  maxListsPerWeek: number; // Reduced compared to consultants (1-3 typically)

  // Supervision requirements (if trainee)
  requiresSupervision?: boolean;

  // Rotation end date (for trainees rotating through)
  rotationEndDate?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// COLLECTION: 'anaesthetists'
export interface Anaesthetist {
  id?: string; // Firestore document ID
  firstName: string;
  lastName: string;
  title: 'Dr';
  initials: string;

  // Grade (Consultant or Training grade)
  grade: 'Consultant' | TrainingGrade;

  // Specialty (always Anaesthetics)
  specialty: 'Anaesthetics';

  // Employment & Workload
  employmentType: EmploymentType;
  fte: number;
  annualLeaveDays: number;
  maxListsPerWeek: number;

  // Optional specialty interests (e.g., Cardiac, Neuro, Paediatric)
  specialtyInterests?: string[];

  // Supervision requirements (if trainee)
  requiresSupervision?: boolean;

  // Rotation end date (for trainees)
  rotationEndDate?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

// Helper type for name generation
export interface NamePair {
  firstName: string;
  lastName: string;
  initials: string;
}

// Specialty coverage calculation
export interface SpecialtyCoverage {
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  existingCount: number;
  requiredCount: number;
  gap: number; // negative = surplus, positive = need more
}

// ============================================================================
// STAGING AND DUPLICATE DETECTION TYPES
// ============================================================================

export type DuplicateCheckStatus = 'pending' | 'checking' | 'clean' | 'duplicates-found';

export interface DuplicateMatch {
  field: 'name' | 'initials' | 'profile';  // What matched
  matchType: 'exact' | 'similar';  // Exact duplicate or similar
  existingRecord?: {
    id: string;
    name: string;
    collection: 'surgeons' | 'assistant-surgeons' | 'anaesthetists';
    grade?: string;
  };
  stagedRecord?: {
    tempId: string;
    name: string;
  };
  severity: 'error' | 'warning';  // Error = exact duplicate, Warning = similar
}

// Staged record before uploading to database
export interface StagedSurgeon extends Omit<Surgeon, 'id'> {
  tempId: string;  // Temporary ID for staging area
  duplicateStatus: DuplicateCheckStatus;
  duplicateMatches?: DuplicateMatch[];
}

export interface StagedAssistantSurgeon extends Omit<AssistantSurgeon, 'id'> {
  tempId: string;
  duplicateStatus: DuplicateCheckStatus;
  duplicateMatches?: DuplicateMatch[];
}

export interface StagedAnaesthetist extends Omit<Anaesthetist, 'id'> {
  tempId: string;
  duplicateStatus: DuplicateCheckStatus;
  duplicateMatches?: DuplicateMatch[];
}
