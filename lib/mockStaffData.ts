import type { StaffProfile } from '@/types/marketplace';

// Mock staff data for the marketplace
export const MOCK_STAFF: StaffProfile[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@nhs.uk',
    phone: '07700 900123',
    role: 'Scrub Nurse',
    band: 'Band 6',
    employmentType: 'permanent',
    yearsExperience: 8,
    currentTrust: 'Royal London Hospital',
    currentDepartment: 'Main Theatres',
    location: {
      address: 'Whitechapel Road, London',
      postcode: 'E1 1BB',
      coordinates: {
        lat: 51.5177,
        lng: -0.0597
      }
    },
    availability: {
      preferredRadius: 10,
      preferredShifts: ['early', 'late'],
      preferredSpecialties: ['Orthopaedics', 'General Surgery'],
      unavailableDates: [],
      minHourlyRate: 25
    },
    performance: {
      totalShifts: 45,
      completedShifts: 44,
      cancelledShifts: 1,
      rating: 4.8
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-28')
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'm.chen@nhs.uk',
    phone: '07700 900456',
    role: 'Anaesthetic Nurse',
    band: 'Band 7',
    employmentType: 'both',
    yearsExperience: 12,
    currentTrust: 'St Thomas Hospital',
    currentDepartment: 'Cardiac Theatres',
    location: {
      address: 'Westminster Bridge Road, London',
      postcode: 'SE1 7EH',
      coordinates: {
        lat: 51.4989,
        lng: -0.1177
      }
    },
    availability: {
      preferredRadius: 15,
      preferredShifts: ['early', 'late', 'long-day'],
      preferredSpecialties: ['Cardiac', 'Vascular', 'Neurosurgery'],
      unavailableDates: ['2025-02-10', '2025-02-11'],
      minHourlyRate: 32
    },
    performance: {
      totalShifts: 78,
      completedShifts: 76,
      cancelledShifts: 2,
      rating: 4.9
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2025-01-29')
  },
  {
    id: '3',
    firstName: 'Aisha',
    lastName: 'Patel',
    email: 'aisha.patel@nhs.uk',
    phone: '07700 900789',
    role: 'ODP',
    band: 'Band 5',
    employmentType: 'bank',
    yearsExperience: 5,
    currentTrust: 'University College Hospital',
    currentDepartment: 'DSU',
    location: {
      address: 'Euston Road, London',
      postcode: 'NW1 2BU',
      coordinates: {
        lat: 51.5246,
        lng: -0.1340
      }
    },
    availability: {
      preferredRadius: 8,
      preferredShifts: ['early', 'late'],
      preferredSpecialties: ['General Surgery', 'Gynaecology', 'Urology'],
      unavailableDates: [],
      minHourlyRate: 22
    },
    performance: {
      totalShifts: 32,
      completedShifts: 32,
      cancelledShifts: 0,
      rating: 5.0
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2025-01-28')
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Williams',
    email: 'd.williams@nhs.uk',
    phone: '07700 900321',
    role: 'Theatre Nurse',
    band: 'Band 6',
    employmentType: 'agency',
    yearsExperience: 15,
    currentTrust: 'Guy\'s Hospital',
    currentDepartment: 'Main Theatres',
    location: {
      address: 'Great Maze Pond, London',
      postcode: 'SE1 9RT',
      coordinates: {
        lat: 51.5033,
        lng: -0.0873
      }
    },
    availability: {
      preferredRadius: 12,
      preferredShifts: ['early', 'late', 'night', 'long-day'],
      preferredSpecialties: ['Trauma', 'Orthopaedics', 'Plastic Surgery'],
      unavailableDates: [],
      minHourlyRate: 28
    },
    performance: {
      totalShifts: 124,
      completedShifts: 120,
      cancelledShifts: 4,
      rating: 4.7
    },
    verified: true,
    isActive: false,
    createdAt: new Date('2022-08-05'),
    updatedAt: new Date('2025-01-25')
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@nhs.uk',
    phone: '07700 900654',
    role: 'Recovery Nurse',
    band: 'Band 5',
    employmentType: 'permanent',
    yearsExperience: 4,
    currentTrust: 'King\'s College Hospital',
    currentDepartment: 'Recovery',
    location: {
      address: 'Denmark Hill, London',
      postcode: 'SE5 9RS',
      coordinates: {
        lat: 51.4686,
        lng: -0.0934
      }
    },
    availability: {
      preferredRadius: 10,
      preferredShifts: ['early', 'late'],
      preferredSpecialties: ['General Surgery', 'ENT', 'Ophthalmology'],
      unavailableDates: ['2025-02-15', '2025-02-16', '2025-02-17'],
      minHourlyRate: 24
    },
    performance: {
      totalShifts: 28,
      completedShifts: 28,
      cancelledShifts: 0,
      rating: 4.6
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2025-01-27')
  },
  {
    id: '6',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'j.anderson@nhs.uk',
    phone: '07700 900987',
    role: 'HCA',
    band: 'Band 3',
    employmentType: 'bank',
    yearsExperience: 2,
    currentTrust: 'Chelsea and Westminster Hospital',
    currentDepartment: 'Theatres',
    location: {
      address: 'Fulham Road, London',
      postcode: 'SW10 9NH',
      coordinates: {
        lat: 51.4805,
        lng: -0.1827
      }
    },
    availability: {
      preferredRadius: 15,
      preferredShifts: ['early', 'late', 'long-day'],
      preferredSpecialties: ['General Surgery', 'Orthopaedics'],
      unavailableDates: [],
      minHourlyRate: 18
    },
    performance: {
      totalShifts: 15,
      completedShifts: 15,
      cancelledShifts: 0,
      rating: 4.4
    },
    verified: false,
    isActive: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2025-01-29')
  },
  {
    id: '7',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@nhs.uk',
    phone: '07700 900246',
    role: 'Scrub Nurse',
    band: 'Band 7',
    employmentType: 'permanent',
    yearsExperience: 18,
    currentTrust: 'Hammersmith Hospital',
    currentDepartment: 'Neurosurgery',
    location: {
      address: 'Du Cane Road, London',
      postcode: 'W12 0HS',
      coordinates: {
        lat: 51.5197,
        lng: -0.2302
      }
    },
    availability: {
      preferredRadius: 8,
      preferredShifts: ['early', 'late'],
      preferredSpecialties: ['Neurosurgery', 'Spinal'],
      unavailableDates: [],
      minHourlyRate: 35
    },
    performance: {
      totalShifts: 156,
      completedShifts: 155,
      cancelledShifts: 1,
      rating: 5.0
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2020-03-15'),
    updatedAt: new Date('2025-01-30')
  },
  {
    id: '8',
    firstName: 'Tom',
    lastName: 'Harrison',
    email: 't.harrison@nhs.uk',
    phone: '07700 900135',
    role: 'Anaesthetic Nurse',
    band: 'Band 6',
    employmentType: 'both',
    yearsExperience: 9,
    currentTrust: 'Whittington Hospital',
    currentDepartment: 'Main Theatres',
    location: {
      address: 'Magdala Avenue, London',
      postcode: 'N19 5NF',
      coordinates: {
        lat: 51.5650,
        lng: -0.1398
      }
    },
    availability: {
      preferredRadius: 12,
      preferredShifts: ['early', 'late', 'night'],
      preferredSpecialties: ['General Surgery', 'Trauma', 'Emergency'],
      unavailableDates: ['2025-03-01', '2025-03-02'],
      minHourlyRate: 27
    },
    performance: {
      totalShifts: 68,
      completedShifts: 66,
      cancelledShifts: 2,
      rating: 4.5
    },
    verified: true,
    isActive: true,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2025-01-28')
  }
];

// Helper function to calculate distance (mock for now)
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
