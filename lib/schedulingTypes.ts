// Scheduling Types for Theatre Operations Manager

export interface Theatre {
  id: string;
  name: string;
  location: string;
  floor?: number;
  capacity: number; // e.g., operating table count
  specialties: string[]; // Which specialties can use this theatre
  equipment: string[]; // Available equipment IDs
  status: 'available' | 'maintenance' | 'closed';
  hospitalId?: string; // Which hospital this theatre belongs to
  unitId?: string; // Which unit/suite this theatre belongs to
  theatreType?: 'elective' | 'emergency' | 'trauma'; // Theatre operational type
  openingHours?: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  sessionDuration?: number; // Default session length in minutes
}

export interface TimeSlot {
  start: string; // HH:mm format (e.g., "08:00")
  end: string;   // HH:mm format (e.g., "12:00")
}

export interface TheatreSession {
  id: string;
  theatreId: string;
  date: string; // YYYY-MM-DD format
  slot: TimeSlot;
  type: 'elective' | 'emergency' | 'trauma';
  status: 'available' | 'booked' | 'blocked' | 'completed' | 'cancelled';
}

export interface Booking {
  id: string;
  sessionId: string; // Links to TheatreSession
  theatreId: string;

  // Procedure details
  procedureName: string;
  procedureOpcs4: string;
  specialty: string;
  subcategory: string;

  // Personnel
  consultantName: string;
  consultantTitle: string;
  teamMembers?: {
    role: string;
    name: string;
  }[];

  // Patient (anonymous for demo)
  patientId: string;
  patientAge?: number;
  patientGender?: 'M' | 'F' | 'Other';
  urgency: 'routine' | 'urgent' | 'emergency';

  // Timing
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  estimatedDuration: number; // minutes

  // Resources
  preferenceCardId?: string;
  requiredEquipment: string[]; // Inventory IDs
  specialRequirements?: string;

  // Status
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'postponed';

  // Metadata
  createdBy: string;
  createdAt: string; // ISO timestamp
  updatedBy?: string;
  updatedAt?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  cancellationReason?: string;

  // Notes
  notes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  role: 'consultant' | 'registrar' | 'nurse' | 'anaesthetist' | 'other';
  specialty?: string;
  availability?: {
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    slots: TimeSlot[];
  }[];
}

export interface BookingConflict {
  type: 'double-booking' | 'consultant-unavailable' | 'equipment-unavailable' | 'theatre-unavailable';
  message: string;
  conflictingBookingId?: string;
}

// Helper types for UI
export interface DaySchedule {
  date: string;
  sessions: (TheatreSession & { booking?: Booking })[];
}

export interface WeekSchedule {
  weekStart: string; // Monday's date
  days: DaySchedule[];
}

// Search/Filter types
export interface BookingFilters {
  theatreId?: string;
  specialty?: string;
  consultant?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: Booking['status'];
}
