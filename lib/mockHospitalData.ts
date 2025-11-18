// Mock NHS Hospital Data - Staff perspective: Finding hospitals nearby for duties

export interface NHSHospital {
  id: string;
  name: string;
  trust: string;
  address: string;
  postcode: string;
  location: {
    lat: number;
    lng: number;
  };
  distance?: number; // Calculated based on user location
  specialties: string[];
  theatres: {
    total: number;
    available: number;
  };
  shifts: {
    type: 'early' | 'late' | 'night' | 'long-day';
    date: string;
    role: string;
    band: string;
    hourlyRate: number;
    status: 'available' | 'urgent' | 'filled';
  }[];
  rating: number;
  staffCount: number;
  urgentNeeds: boolean;
}

export const MOCK_NHS_HOSPITALS: NHSHospital[] = [
  {
    id: 'h1',
    name: 'Royal London Hospital',
    trust: 'Barts Health NHS Trust',
    address: 'Whitechapel Road',
    postcode: 'E1 1FR',
    location: {
      lat: 51.5177,
      lng: -0.0597
    },
    specialties: ['Trauma', 'Emergency', 'Orthopaedics', 'General Surgery', 'Cardiac'],
    theatres: {
      total: 16,
      available: 3
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-20',
        role: 'Scrub Nurse',
        band: 'Band 6',
        hourlyRate: 28,
        status: 'available'
      },
      {
        type: 'late',
        date: '2025-11-20',
        role: 'Anaesthetic Nurse',
        band: 'Band 7',
        hourlyRate: 35,
        status: 'urgent'
      },
      {
        type: 'night',
        date: '2025-11-21',
        role: 'ODP',
        band: 'Band 5',
        hourlyRate: 25,
        status: 'available'
      }
    ],
    rating: 4.7,
    staffCount: 45,
    urgentNeeds: true
  },
  {
    id: 'h2',
    name: 'St Thomas\' Hospital',
    trust: 'Guy\'s and St Thomas\' NHS Foundation Trust',
    address: 'Westminster Bridge Road',
    postcode: 'SE1 7EH',
    location: {
      lat: 51.4989,
      lng: -0.1177
    },
    specialties: ['Cardiac', 'Vascular', 'Neurosurgery', 'Emergency', 'General Surgery'],
    theatres: {
      total: 20,
      available: 5
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-21',
        role: 'Theatre Nurse',
        band: 'Band 6',
        hourlyRate: 29,
        status: 'available'
      },
      {
        type: 'long-day',
        date: '2025-11-22',
        role: 'Scrub Nurse',
        band: 'Band 7',
        hourlyRate: 36,
        status: 'urgent'
      }
    ],
    rating: 4.8,
    staffCount: 62,
    urgentNeeds: true
  },
  {
    id: 'h3',
    name: 'University College Hospital',
    trust: 'University College London Hospitals NHS Foundation Trust',
    address: 'Euston Road',
    postcode: 'NW1 2BU',
    location: {
      lat: 51.5246,
      lng: -0.1340
    },
    specialties: ['Neurosurgery', 'Oncology', 'General Surgery', 'ENT', 'Ophthalmology'],
    theatres: {
      total: 18,
      available: 2
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-23',
        role: 'Recovery Nurse',
        band: 'Band 5',
        hourlyRate: 24,
        status: 'available'
      },
      {
        type: 'late',
        date: '2025-11-23',
        role: 'ODP',
        band: 'Band 6',
        hourlyRate: 27,
        status: 'available'
      }
    ],
    rating: 4.6,
    staffCount: 58,
    urgentNeeds: false
  },
  {
    id: 'h4',
    name: 'King\'s College Hospital',
    trust: 'King\'s College Hospital NHS Foundation Trust',
    address: 'Denmark Hill',
    postcode: 'SE5 9RS',
    location: {
      lat: 51.4686,
      lng: -0.0934
    },
    specialties: ['Trauma', 'Liver', 'Neurosurgery', 'Cardiac', 'General Surgery'],
    theatres: {
      total: 22,
      available: 4
    },
    shifts: [
      {
        type: 'night',
        date: '2025-11-24',
        role: 'Anaesthetic Nurse',
        band: 'Band 7',
        hourlyRate: 38,
        status: 'urgent'
      },
      {
        type: 'early',
        date: '2025-11-25',
        role: 'Scrub Nurse',
        band: 'Band 6',
        hourlyRate: 28,
        status: 'available'
      },
      {
        type: 'late',
        date: '2025-11-25',
        role: 'HCA',
        band: 'Band 3',
        hourlyRate: 19,
        status: 'available'
      }
    ],
    rating: 4.5,
    staffCount: 71,
    urgentNeeds: true
  },
  {
    id: 'h5',
    name: 'Chelsea and Westminster Hospital',
    trust: 'Chelsea and Westminster Hospital NHS Foundation Trust',
    address: 'Fulham Road',
    postcode: 'SW10 9NH',
    location: {
      lat: 51.4805,
      lng: -0.1827
    },
    specialties: ['Maternity', 'Paediatrics', 'General Surgery', 'Gynaecology', 'Orthopaedics'],
    theatres: {
      total: 14,
      available: 6
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-26',
        role: 'Theatre Nurse',
        band: 'Band 5',
        hourlyRate: 26,
        status: 'available'
      },
      {
        type: 'late',
        date: '2025-11-26',
        role: 'ODP',
        band: 'Band 5',
        hourlyRate: 25,
        status: 'available'
      }
    ],
    rating: 4.4,
    staffCount: 38,
    urgentNeeds: false
  },
  {
    id: 'h6',
    name: 'Hammersmith Hospital',
    trust: 'Imperial College Healthcare NHS Trust',
    address: 'Du Cane Road',
    postcode: 'W12 0HS',
    location: {
      lat: 51.5197,
      lng: -0.2302
    },
    specialties: ['Renal', 'Neurosurgery', 'Cardiac', 'Cancer', 'General Surgery'],
    theatres: {
      total: 15,
      available: 1
    },
    shifts: [
      {
        type: 'long-day',
        date: '2025-11-27',
        role: 'Scrub Nurse',
        band: 'Band 7',
        hourlyRate: 37,
        status: 'urgent'
      },
      {
        type: 'night',
        date: '2025-11-27',
        role: 'Recovery Nurse',
        band: 'Band 6',
        hourlyRate: 30,
        status: 'available'
      }
    ],
    rating: 4.9,
    staffCount: 52,
    urgentNeeds: true
  },
  {
    id: 'h7',
    name: 'Whittington Hospital',
    trust: 'Whittington Health NHS Trust',
    address: 'Magdala Avenue',
    postcode: 'N19 5NF',
    location: {
      lat: 51.5650,
      lng: -0.1398
    },
    specialties: ['General Surgery', 'Orthopaedics', 'Urology', 'ENT', 'Emergency'],
    theatres: {
      total: 10,
      available: 3
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-28',
        role: 'Anaesthetic Nurse',
        band: 'Band 6',
        hourlyRate: 27,
        status: 'available'
      },
      {
        type: 'late',
        date: '2025-11-28',
        role: 'Theatre Nurse',
        band: 'Band 5',
        hourlyRate: 24,
        status: 'available'
      }
    ],
    rating: 4.3,
    staffCount: 29,
    urgentNeeds: false
  },
  {
    id: 'h8',
    name: 'Guy\'s Hospital',
    trust: 'Guy\'s and St Thomas\' NHS Foundation Trust',
    address: 'Great Maze Pond',
    postcode: 'SE1 9RT',
    location: {
      lat: 51.5033,
      lng: -0.0873
    },
    specialties: ['Dental', 'Cancer', 'Cardiac', 'Renal', 'General Surgery'],
    theatres: {
      total: 17,
      available: 4
    },
    shifts: [
      {
        type: 'early',
        date: '2025-11-29',
        role: 'ODP',
        band: 'Band 6',
        hourlyRate: 28,
        status: 'urgent'
      },
      {
        type: 'night',
        date: '2025-11-30',
        role: 'Scrub Nurse',
        band: 'Band 7',
        hourlyRate: 36,
        status: 'available'
      }
    ],
    rating: 4.7,
    staffCount: 56,
    urgentNeeds: true
  }
];

// Helper function to calculate distance (same as staff data)
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
