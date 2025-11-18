/**
 * Consultant Types and Data Structures
 */

export type ConsultantRole =
  | 'Consultant Surgeon'
  | 'Consultant Anaesthetist'
  | 'Assisting Surgeon'
  | 'Assisting Anaesthetist';

export type SpecialtyCode =
  | 'EMER'
  | 'TRAUMA'
  | 'ORTHO'
  | 'SPINE'
  | 'GS'
  | 'CARD'
  | 'NEURO'
  | 'VASC'
  | 'PLAST'
  | 'GYNAE'
  | 'URO'
  | 'ENT'
  | 'OPHTH';

// Mapping from preference card specialties to specialty codes
export const SPECIALTY_MAPPING: Record<string, SpecialtyCode> = {
  'Trauma Orthopaedics': 'TRAUMA',
  'Spines': 'SPINE',
  'Elective Orthopaedics': 'ORTHO',
  'General Surgery': 'GS',
  'Cardiac': 'CARD',
  'Neurosurgery': 'NEURO',
  'Vascular': 'VASC',
  'Plastics': 'PLAST',
  'Gynaecology': 'GYNAE',
  'Urology': 'URO',
  'ENT': 'ENT',
  'Ophthalmology': 'OPHTH'
};

export interface Consultant {
  id: string;
  name: string;
  role: ConsultantRole;
  specialties: SpecialtyCode[];
  gmcNumber?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultantAllocation {
  consultantSurgeonId?: string;
  assistingSurgeonId?: string;
  consultantAnaesthetistId?: string;
  assistingAnaesthetistId?: string;
}
