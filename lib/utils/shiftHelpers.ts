/**
 * Shift time helpers for real-time theatre management
 */

export interface ShiftStatus {
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  needsRelief: boolean;
  onBreak: boolean;
  shiftType: 'early' | 'late' | 'night' | 'long-day' | 'day' | 'pm-half' | 'am-half' | 'unknown';
  remainingMinutes: number;
}

/**
 * Parse shift string like "08:00-18:00" and return start/end times
 */
export const parseShift = (shift: string): { start: Date; end: Date } | null => {
  if (!shift || !shift.includes('-')) return null;

  const [startStr, endStr] = shift.split('-');
  const [startHour, startMin] = startStr.split(':').map(Number);
  const [endHour, endMin] = endStr.split(':').map(Number);

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMin);
  let end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMin);

  // Handle shifts that cross midnight (e.g., 20:00-08:30)
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  return { start, end };
};

/**
 * Get current shift status based on time
 */
export const getShiftStatus = (shift: string, currentTime: Date = new Date()): ShiftStatus => {
  const parsed = parseShift(shift);

  if (!parsed) {
    return {
      isActive: false,
      isPast: false,
      isFuture: false,
      needsRelief: false,
      onBreak: false,
      shiftType: 'unknown',
      remainingMinutes: 0
    };
  }

  const { start, end } = parsed;
  const now = currentTime;

  // Check if currently within shift time
  const isActive = now >= start && now <= end;
  const isPast = now > end;
  const isFuture = now < start;

  // Calculate remaining minutes
  const remainingMinutes = isActive ? Math.floor((end.getTime() - now.getTime()) / (1000 * 60)) : 0;

  // Needs relief if less than 1 hour remaining
  const needsRelief = isActive && remainingMinutes > 0 && remainingMinutes <= 60;

  // On break if it's lunch time (12:00-13:00) or tea break (15:00-15:30)
  const hour = now.getHours();
  const minute = now.getMinutes();
  const onBreak = isActive && (
    (hour === 12 && minute >= 0 && minute < 60) || // Lunch
    (hour === 15 && minute >= 0 && minute < 30)    // Tea break
  );

  // Determine shift type
  let shiftType: ShiftStatus['shiftType'] = 'unknown';
  const shiftDuration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
  const startHour = start.getHours();

  if (shift.startsWith('07:') || shift.startsWith('08:')) {
    if (shiftDuration >= 720) {
      shiftType = 'long-day'; // 12+ hours
    } else if (shiftDuration >= 480) {
      shiftType = 'day'; // 8-10 hours
    } else if (shiftDuration <= 300) {
      shiftType = 'am-half'; // up to 5 hours
    } else {
      shiftType = 'early';
    }
  } else if (shift.startsWith('13:')) {
    if (shiftDuration <= 300) {
      shiftType = 'pm-half';
    } else {
      shiftType = 'late';
    }
  } else if (shift.startsWith('20:') || shift.startsWith('19:')) {
    shiftType = 'night';
  }

  return {
    isActive,
    isPast,
    isFuture,
    needsRelief,
    onBreak,
    shiftType,
    remainingMinutes
  };
};

/**
 * Determine which staff should be active at a given time
 */
export const getActiveShiftType = (currentTime: Date = new Date()): string => {
  const hour = currentTime.getHours();

  if (hour >= 7 && hour < 13) {
    return 'Early/AM shifts';
  } else if (hour >= 13 && hour < 20) {
    return 'Late/PM shifts';
  } else {
    return 'Night shifts';
  }
};

/**
 * Check if a theatre should be operational at current time
 */
export const isTheatreOperational = (session: string, currentTime: Date = new Date()): boolean => {
  // Parse session like "08:00 - 20:00"
  const match = session.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
  if (!match) return false;

  const shiftStr = `${match[1]}-${match[2]}`;
  const parsed = parseShift(shiftStr);
  if (!parsed) return false;

  const { start, end } = parsed;
  return currentTime >= start && currentTime <= end;
};

/**
 * Get visual indicator for shift status
 */
export const getShiftIndicator = (status: ShiftStatus): {
  color: string;
  badge: string;
  tooltip: string;
} => {
  if (!status.isActive) {
    return {
      color: 'text-gray-400',
      badge: 'OFF',
      tooltip: 'Off duty'
    };
  }

  if (status.onBreak) {
    return {
      color: 'text-blue-600',
      badge: 'BREAK',
      tooltip: 'On break'
    };
  }

  if (status.needsRelief) {
    return {
      color: 'text-orange-600',
      badge: 'RELIEF',
      tooltip: `Needs relief (${status.remainingMinutes}min remaining)`
    };
  }

  return {
    color: 'text-green-600',
    badge: 'ACTIVE',
    tooltip: `Active (${status.remainingMinutes}min remaining)`
  };
};
