// Shift Marketplace Types - Uber-Style NHS Staffing
// Solves the £2,000/shift agency crisis

export type ShiftStatus =
  | 'open'          // Available for claiming
  | 'claimed'       // Someone claimed it
  | 'confirmed'     // Manager confirmed the claim
  | 'completed'     // Shift finished
  | 'cancelled';    // Cancelled

export type ShiftUrgency =
  | 'critical'      // < 24 hours (pay premium 2x)
  | 'urgent'        // < 48 hours (pay premium 1.5x)
  | 'soon'          // < 7 days (pay premium 1.2x)
  | 'planned';      // > 7 days (standard rate)

export type StaffRole =
  | 'Scrub Nurse'
  | 'Circulating Nurse'
  | 'Anaesthetist'
  | 'ODP'
  | 'HCA'
  | 'Theatre Coordinator'
  | 'Recovery Nurse';

export type BandLevel =
  | 'Band 3'
  | 'Band 4'
  | 'Band 5'
  | 'Band 6'
  | 'Band 7'
  | 'Band 8'
  | 'Consultant'
  | 'Registrar';

export interface ShiftNeed {
  id: string;

  // What's needed
  role: StaffRole;
  bandLevel: BandLevel;
  count: number;                    // How many needed (e.g., need 2 scrub nurses)
  claimedCount: number;             // How many claimed so far

  // When/Where
  date: string;                     // YYYY-MM-DD
  startTime: string;                // HH:MM
  endTime: string;                  // HH:MM
  durationHours: number;
  theatre: string;
  theatreId?: string;
  specialty: string;

  // Pay (transparent pricing - beat agency rates!)
  baseRate: number;                 // £/hour base rate
  urgencyMultiplier: number;        // 1.0 - 2.0x
  totalRate: number;                // baseRate * urgencyMultiplier
  totalPay: number;                 // totalRate * durationHours

  // Comparison (show savings!)
  agencyRate?: number;              // What agency would charge
  savingsVsAgency?: number;         // How much hospital saves

  // Status
  status: ShiftStatus;
  urgency: ShiftUrgency;
  postedAt: Date;
  expiresAt?: Date;                 // Auto-cancel if not claimed by this time

  // Posted by
  postedBy: string;                 // User ID
  postedByName: string;
  postedByRole: string;

  // Requirements
  requirements?: string;            // e.g., "Must have ortho experience"
  specialtyExperience?: string[];   // Required specialties
  minimumExperience?: number;       // Years

  // Session details
  sessionId?: string;
  procedureCount?: number;
  procedureTypes?: string[];

  // Claims
  claims: ShiftClaim[];
  confirmedStaff: string[];         // User IDs of confirmed staff

  // Notifications
  notifiedStaff: string[];          // Who's been notified about this shift
}

export interface ShiftClaim {
  id: string;
  shiftNeedId: string;

  // Who claimed
  staffId: string;
  staffName: string;
  staffRole: StaffRole;
  staffBand: BandLevel;
  staffRating?: number;             // 0-5 stars

  // Status
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  claimedAt: Date;
  respondedAt?: Date;

  // Message
  message?: string;                 // Staff can add note when claiming

  // Manager response
  managerResponse?: string;
  rejectionReason?: string;
}

export interface ShiftOpportunity {
  shift: ShiftNeed;
  matchScore: number;               // 0-100 (how well does this match staff profile)
  matchReasons: string[];           // Why this is a good match
  distance?: number;                // km from staff's home (if location enabled)
  isRecommended: boolean;           // TOM AI recommendation
}

export interface StaffProfile {
  userId: string;
  name: string;
  role: StaffRole;
  band: BandLevel;

  // Experience
  yearsExperience: number;
  specialties: string[];            // Specialties they've worked in
  competencies: string[];           // Specific skills

  // Preferences
  preferredShiftTimes: ('morning' | 'afternoon' | 'evening' | 'night')[];
  preferredDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  preferredTheatres?: string[];
  preferredSpecialties?: string[];

  // Availability
  maxHoursPerWeek?: number;
  minHourlyRate?: number;

  // Ratings
  rating: number;                   // 0-5 stars
  totalShiftsCompleted: number;
  reliabilityScore: number;         // 0-100

  // Location
  postcode?: string;
  maxTravelDistance?: number;       // km

  // Notifications
  instantNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface ShiftEarnings {
  staffId: string;

  // This week
  weekShifts: number;
  weekHours: number;
  weekEarnings: number;

  // This month
  monthShifts: number;
  monthHours: number;
  monthEarnings: number;

  // All time
  totalShifts: number;
  totalHours: number;
  totalEarnings: number;

  // Breakdown
  byRole: { [role: string]: { shifts: number; hours: number; earnings: number } };
  bySpecialty: { [specialty: string]: { shifts: number; hours: number; earnings: number } };
}

export interface ShiftAnalytics {
  // For managers
  totalNeeds: number;
  openNeeds: number;
  filledNeeds: number;
  fillRate: number;                 // Percentage filled

  avgTimeToFill: number;            // Hours
  avgCostPerShift: number;
  totalSavingsVsAgency: number;

  // By urgency
  criticalUnfilled: number;
  urgentUnfilled: number;

  // By role
  needsByRole: { [role: string]: { total: number; filled: number; open: number } };
}

// Base hourly rates (internal rates - much cheaper than agency!)
export const BASE_HOURLY_RATES: { [key in StaffRole]: number } = {
  'Scrub Nurse': 35,
  'Circulating Nurse': 32,
  'Anaesthetist': 80,
  'ODP': 35,
  'HCA': 22,
  'Theatre Coordinator': 45,
  'Recovery Nurse': 32
};

// Agency comparison rates (what agency charges - 3-5x higher!)
export const AGENCY_RATES: { [key in StaffRole]: number } = {
  'Scrub Nurse': 120,
  'Circulating Nurse': 100,
  'Anaesthetist': 250,
  'ODP': 110,
  'HCA': 70,
  'Theatre Coordinator': 150,
  'Recovery Nurse': 100
};

// Urgency multipliers
export const URGENCY_MULTIPLIERS: { [key in ShiftUrgency]: number } = {
  'critical': 2.0,    // Less than 24h - double pay!
  'urgent': 1.5,      // Less than 48h - 50% extra
  'soon': 1.2,        // Less than 7 days - 20% extra
  'planned': 1.0      // Standard rate
};

// Calculate urgency based on time until shift
export function calculateUrgency(shiftDate: string, shiftTime: string): ShiftUrgency {
  const shiftDateTime = new Date(`${shiftDate}T${shiftTime}`);
  const now = new Date();
  const hoursUntil = (shiftDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntil < 24) return 'critical';
  if (hoursUntil < 48) return 'urgent';
  if (hoursUntil < 168) return 'soon'; // 7 days
  return 'planned';
}

// Calculate shift pay
export function calculateShiftPay(
  role: StaffRole,
  durationHours: number,
  urgency: ShiftUrgency
): {
  baseRate: number;
  urgencyMultiplier: number;
  totalRate: number;
  totalPay: number;
  agencyRate: number;
  savingsVsAgency: number;
} {
  const baseRate = BASE_HOURLY_RATES[role];
  const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency];
  const totalRate = baseRate * urgencyMultiplier;
  const totalPay = totalRate * durationHours;

  const agencyRate = AGENCY_RATES[role];
  const agencyCost = agencyRate * durationHours;
  const savingsVsAgency = agencyCost - totalPay;

  return {
    baseRate,
    urgencyMultiplier,
    totalRate,
    totalPay,
    agencyRate,
    savingsVsAgency
  };
}

// Urgency colors for UI
export const URGENCY_COLORS = {
  'critical': {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-500 text-white',
    gradient: 'from-red-500 to-orange-500'
  },
  'urgent': {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-800',
    badge: 'bg-orange-500 text-white',
    gradient: 'from-orange-500 to-yellow-500'
  },
  'soon': {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    badge: 'bg-yellow-500 text-white',
    gradient: 'from-yellow-500 to-green-500'
  },
  'planned': {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-800',
    badge: 'bg-green-500 text-white',
    gradient: 'from-green-500 to-teal-500'
  }
};

// Status colors
export const STATUS_COLORS = {
  'open': { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🔵' },
  'claimed': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '🟡' },
  'confirmed': { bg: 'bg-green-100', text: 'text-green-800', icon: '🟢' },
  'completed': { bg: 'bg-gray-100', text: 'text-gray-800', icon: '✅' },
  'cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' }
};
