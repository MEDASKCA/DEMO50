// Theatre Definitions for Hospital
// Base configuration - will be synced to Firebase

export interface Theatre {
  id: string;
  name: string;
  location: string;
  floor: number;
  capacity: number; // Operating tables
  specialties: string[]; // Which specialties can use this theatre
  equipment: string[]; // Standard equipment available
  status: 'available' | 'maintenance' | 'closed';
  openingHours: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  sessionDuration: number; // Default session length in minutes
}

export const THEATRES: Theatre[] = [
  // Main General Theatres (1-6)
  {
    id: 'THR-001',
    name: 'Theatre 1',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'Trauma Orthopaedics',
      'General Surgery',
      'Vascular',
      'Plastics',
      'Gynaecology',
      'Urology'
    ],
    equipment: [
      'Standard Operating Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Image Intensifier'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '20:00'
    },
    sessionDuration: 240 // 4-hour sessions
  },
  {
    id: 'THR-002',
    name: 'Theatre 2',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'Trauma Orthopaedics',
      'Upper Limb',
      'Lower Limb',
      'Joint Replacement',
      'Spines'
    ],
    equipment: [
      'Orthopaedic Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Image Intensifier',
      'Tourniquet System',
      'Power Tools'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 240
  },
  {
    id: 'THR-003',
    name: 'Theatre 3',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'General Surgery',
      'Vascular',
      'Urology',
      'Gynaecology'
    ],
    equipment: [
      'Standard Operating Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Laparoscopy Stack',
      'Cystoscopy Equipment'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 240
  },
  {
    id: 'THR-004',
    name: 'Theatre 4',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'ENT',
      'Ophthalmology',
      'Plastics'
    ],
    equipment: [
      'Standard Operating Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Microscope',
      'ENT Equipment Set'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 180 // 3-hour sessions for shorter procedures
  },
  {
    id: 'THR-005',
    name: 'Theatre 5',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'Trauma Orthopaedics',
      'Spines',
      'Upper Limb',
      'Lower Limb',
      'Joint Replacement'
    ],
    equipment: [
      'Orthopaedic Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Image Intensifier',
      'Tourniquet System',
      'Power Tools',
      'Spinal Frame'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 240
  },
  {
    id: 'THR-006',
    name: 'Theatre 6',
    location: 'Main Theatre Suite',
    floor: 2,
    capacity: 1,
    specialties: [
      'General Surgery',
      'Gynaecology',
      'Urology',
      'Vascular'
    ],
    equipment: [
      'Standard Operating Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Laparoscopy Stack'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 240
  },

  // Emergency/Trauma Theatres (7-8)
  {
    id: 'THR-007',
    name: 'Emergency Theatre 1',
    location: 'Emergency Theatre Suite',
    floor: 1,
    capacity: 1,
    specialties: [
      'Trauma Orthopaedics',
      'General Surgery',
      'Vascular',
      'Neurosurgery'
    ],
    equipment: [
      'Trauma Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Image Intensifier',
      'Rapid Infuser',
      'Level 1 Warmer'
    ],
    status: 'available',
    openingHours: {
      start: '00:00',
      end: '23:59' // 24/7
    },
    sessionDuration: 240
  },
  {
    id: 'THR-008',
    name: 'Emergency Theatre 2',
    location: 'Emergency Theatre Suite',
    floor: 1,
    capacity: 1,
    specialties: [
      'Trauma Orthopaedics',
      'General Surgery',
      'Vascular',
      'Neurosurgery'
    ],
    equipment: [
      'Trauma Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Image Intensifier',
      'Rapid Infuser',
      'Level 1 Warmer'
    ],
    status: 'available',
    openingHours: {
      start: '00:00',
      end: '23:59' // 24/7
    },
    sessionDuration: 240
  },

  // Specialized Theatres (9-10)
  {
    id: 'THR-009',
    name: 'Cardiac Theatre',
    location: 'Cardiac Suite',
    floor: 3,
    capacity: 1,
    specialties: ['Cardiac'],
    equipment: [
      'Cardiac Operating Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Cardiopulmonary Bypass Machine',
      'Cell Saver',
      'TOE Machine',
      'Defibrillator'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 360 // 6-hour sessions for cardiac cases
  },
  {
    id: 'THR-010',
    name: 'Neurosurgery Theatre',
    location: 'Neurosciences Suite',
    floor: 3,
    capacity: 1,
    specialties: ['Neurosurgery', 'Spines'],
    equipment: [
      'Neurosurgery Table',
      'Anaesthesia Machine',
      'Surgical Lights',
      'Diathermy Unit',
      'Suction Unit',
      'Operating Microscope',
      'Neuronavigation System',
      'Image Intensifier',
      'Mayfield Clamp'
    ],
    status: 'available',
    openingHours: {
      start: '08:00',
      end: '18:00'
    },
    sessionDuration: 360 // 6-hour sessions for neurosurgery
  }
];

// Helper function to get theatres by specialty
export function getTheatresBySpecialty(specialty: string): Theatre[] {
  return THEATRES.filter(theatre =>
    theatre.specialties.includes(specialty) &&
    theatre.status === 'available'
  );
}

// Helper function to get theatre by ID
export function getTheatreById(id: string): Theatre | undefined {
  return THEATRES.find(theatre => theatre.id === id);
}

// Standard session times
export const SESSION_TIMES = {
  morning: { start: '08:00', end: '12:00' },
  afternoon: { start: '13:00', end: '17:00' },
  evening: { start: '18:00', end: '20:00' },
  night: { start: '20:00', end: '02:00' }
};

// Days of operation (Monday to Friday for elective, all days for emergency)
export const ELECTIVE_DAYS = [1, 2, 3, 4, 5]; // Monday to Friday
export const EMERGENCY_DAYS = [0, 1, 2, 3, 4, 5, 6]; // All days
