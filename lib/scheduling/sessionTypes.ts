// Session Type Presets and Configuration

// All available specialties with abbreviations
export const ALL_SPECIALTIES = [
  { id: 'EMER', name: 'EMERGENCY', abbr: 'EMER' },
  { id: 'TRAUMA', name: 'Trauma Orthopaedics', abbr: 'TRAUMA' },
  { id: 'ORTHO', name: 'Elective Orthopaedics', abbr: 'ORTHO' },
  { id: 'SPINE', name: 'Spines', abbr: 'SPINE' },
  { id: 'GS', name: 'General Surgery', abbr: 'GS' },
  { id: 'CARD', name: 'Cardiac', abbr: 'CARD' },
  { id: 'NEURO', name: 'Neurosurgery', abbr: 'NEURO' },
  { id: 'VASC', name: 'Vascular', abbr: 'VASC' },
  { id: 'PLAST', name: 'Plastics', abbr: 'PLAST' },
  { id: 'GYNAE', name: 'Gynaecology', abbr: 'GYNAE' },
  { id: 'URO', name: 'Urology', abbr: 'URO' },
  { id: 'ENT', name: 'ENT', abbr: 'ENT' },
  { id: 'OPHTH', name: 'Ophthalmology', abbr: 'OPHTH' }
];

// Legacy array for backward compatibility
export const ALL_SPECIALTIES_LEGACY = ALL_SPECIALTIES.map(s => s.name);

export interface SessionTypePreset {
  id: string;
  name: string;
  abbr: string; // Short abbreviation for compact display
  startTime: string;
  endTime: string;
  duration: number; // minutes
  color: string; // for visual distinction
  description: string;
}

export const SESSION_TYPE_PRESETS: SessionTypePreset[] = [
  {
    id: 'day',
    name: 'All Day (08:00-18:00)',
    abbr: 'AD',
    startTime: '08:00',
    endTime: '18:00',
    duration: 600, // 10 hours
    color: '#3b82f6', // blue
    description: 'All day - 10 hours'
  },
  {
    id: 'long-day',
    name: 'All Day Extended (08:00-20:00)',
    abbr: 'ADE',
    startTime: '08:00',
    endTime: '20:00',
    duration: 720, // 12 hours
    color: '#8b5cf6', // purple
    description: 'All day extended - 12 hours'
  },
  {
    id: 'am',
    name: 'Early (08:00-13:00)',
    abbr: 'AM',
    startTime: '08:00',
    endTime: '13:00',
    duration: 300, // 5 hours
    color: '#f59e0b', // amber
    description: 'Morning session - 5 hours'
  },
  {
    id: 'pm',
    name: 'Afternoon (13:00-18:00)',
    abbr: 'PM',
    startTime: '13:00',
    endTime: '18:00',
    duration: 300, // 5 hours
    color: '#10b981', // green
    description: 'Afternoon session - 5 hours'
  },
  {
    id: 'pme',
    name: 'Afternoon Extended (13:00-20:00)',
    abbr: 'PME',
    startTime: '13:00',
    endTime: '20:00',
    duration: 420, // 7 hours
    color: '#ec4899', // pink
    description: 'Extended afternoon - 7 hours'
  },
  {
    id: 'night',
    name: 'Night (20:00-08:00)',
    abbr: 'NIGHT',
    startTime: '20:00',
    endTime: '08:00',
    duration: 720, // 12 hours
    color: '#6366f1', // indigo
    description: 'Night shift - 12 hours'
  },
  {
    id: 'closed',
    name: 'CLOSED',
    abbr: 'X',
    startTime: '',
    endTime: '',
    duration: 0,
    color: '#6b7280', // gray
    description: 'Theatre not operational'
  }
];

export interface DayConfiguration {
  date: string; // YYYY-MM-DD
  theatreId: string;
  sessionTypeId: string;
  specialty?: string; // Assigned specialty for this day
  consultantId?: string; // Assigned consultant for this day (legacy - kept for compatibility)
  consultantSurgeonId?: string; // Consultant Surgeon
  assistingSurgeonId?: string; // Assisting Surgeon
  consultantAnaesthetistId?: string; // Consultant Anaesthetist
  assistingAnaesthetistId?: string; // Assisting Anaesthetist
  closedReason?: string; // Only if sessionTypeId is 'closed'
  customStartTime?: string; // Override preset start time
  customEndTime?: string; // Override preset end time
  customDuration?: number; // Override preset duration
  notes?: string;
}

export interface MonthConfiguration {
  month: string; // YYYY-MM format
  theatreId: string;
  days: DayConfiguration[];
}

export interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  hospitalId?: string; // Which hospital this unit belongs to
  theatreIds: string[]; // Theatre IDs in this unit
  order: number; // Display order
  specialties?: string[]; // Specialties available in this unit
}

// Default theatre units/groupings
export const DEFAULT_UNITS: TheatreUnit[] = [
  {
    id: 'main-suite',
    name: 'Main Theatre Suite',
    location: 'Floor 2',
    theatreIds: ['THR-001', 'THR-002', 'THR-003', 'THR-004', 'THR-005', 'THR-006'],
    order: 1
  },
  {
    id: 'emergency-suite',
    name: 'Emergency Theatre Suite',
    location: 'Floor 1',
    theatreIds: ['THR-007', 'THR-008'],
    order: 2
  },
  {
    id: 'specialized-suite',
    name: 'Specialized Theatres',
    location: 'Floor 3',
    theatreIds: ['THR-009', 'THR-010'],
    order: 3
  }
];

// Helper function to get session type by ID
export function getSessionTypeById(id: string): SessionTypePreset | undefined {
  return SESSION_TYPE_PRESETS.find(preset => preset.id === id);
}

// Helper function to generate default configuration for a month
export function generateDefaultMonthConfiguration(
  month: string,
  theatreId: string,
  defaultSessionTypeId: string = 'day',
  theatreType?: 'elective' | 'emergency' | 'trauma'
): MonthConfiguration {
  const [year, monthNum] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();

  const days: DayConfiguration[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let sessionTypeId = defaultSessionTypeId;
    let closedReason: string | undefined;

    // Configure based on theatre type
    if (theatreType === 'emergency') {
      // EMERGENCY: 24/7 operation with night sessions
      sessionTypeId = 'night'; // 20:00-08:00 (12 hours covering nights)
    } else if (theatreType === 'trauma') {
      // TRAUMA: Long days 7 days a week (08:00-20:00)
      sessionTypeId = 'long-day';
    } else {
      // ELECTIVE: weekdays only, weekends closed
      if (isWeekend) {
        sessionTypeId = 'closed';
        closedReason = 'Weekend';
      }
    }

    days.push({
      date,
      theatreId,
      sessionTypeId,
      closedReason
    });
  }

  return {
    month,
    theatreId,
    days
  };
}

// Helper to get all months in a date range
export function getMonthsInRange(startDate: Date, endDate: Date): string[] {
  const months: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    months.push(`${year}-${month}`);
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

// Helper to format month for display
export function formatMonthDisplay(month: string): string {
  const [year, monthNum] = month.split('-');
  const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}
