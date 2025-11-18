// Real-Time Visualization Data Service
// Provides live data streams for charts, graphs, and dashboards

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit as limitQuery } from 'firebase/firestore';
import { format, subDays, startOfWeek, endOfWeek, addDays, parseISO } from 'date-fns';

// ============================================================================
// TYPES
// ============================================================================

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
  color?: string;
  metadata?: any;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  category?: string;
}

export interface UtilizationData {
  theatre: string;
  utilization: number;
  capacity: number;
  used: number;
  status: 'low' | 'optimal' | 'high' | 'critical';
}

export interface StaffingData {
  role: string;
  available: number;
  required: number;
  gap: number;
  percentage: number;
}

export interface WaitingListData {
  specialty: string;
  count: number;
  urgent: number;
  routine: number;
  avgWaitDays: number;
}

// ============================================================================
// THEATRE UTILIZATION VISUALIZATION
// ============================================================================

export async function getTheatreUtilizationData(
  date?: string
): Promise<UtilizationData[]> {
  const targetDate = date || format(new Date(), 'yyyy-MM-dd');

  try {
    const sessionsRef = collection(db, 'theatreSessions');
    const q = query(sessionsRef, where('date', '==', targetDate));
    const snapshot = await getDocs(q);

    const theatreMap = new Map<string, { used: number; capacity: number }>();

    snapshot.forEach(doc => {
      const data = doc.data();
      const theatre = data.theatreName || data.theatreId || 'Unknown';
      const sessionDuration = calculateSessionDuration(data.sessionType || 'AM');
      const bookedMinutes = data.bookedMinutes || 0;

      if (!theatreMap.has(theatre)) {
        theatreMap.set(theatre, { used: 0, capacity: 0 });
      }

      const current = theatreMap.get(theatre)!;
      current.used += bookedMinutes;
      current.capacity += sessionDuration;
    });

    const utilization: UtilizationData[] = [];

    theatreMap.forEach((data, theatre) => {
      const utilizationPct = data.capacity > 0 ? (data.used / data.capacity) * 100 : 0;

      let status: UtilizationData['status'] = 'optimal';
      if (utilizationPct < 60) status = 'low';
      else if (utilizationPct >= 60 && utilizationPct < 85) status = 'optimal';
      else if (utilizationPct >= 85 && utilizationPct < 95) status = 'high';
      else status = 'critical';

      utilization.push({
        theatre,
        utilization: Math.round(utilizationPct),
        capacity: data.capacity,
        used: data.used,
        status
      });
    });

    return utilization.sort((a, b) => b.utilization - a.utilization);

  } catch (error) {
    console.error('Error getting utilization data:', error);
    return [];
  }
}

// ============================================================================
// WEEKLY TREND ANALYSIS
// ============================================================================

export async function getWeeklyTrendData(
  weeks: number = 4
): Promise<TimeSeriesData[]> {
  try {
    const trends: TimeSeriesData[] = [];
    const startDate = subDays(new Date(), weeks * 7);

    for (let i = 0; i < weeks * 7; i++) {
      const date = addDays(startDate, i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const sessionsRef = collection(db, 'theatreSessions');
      const q = query(sessionsRef, where('date', '==', dateStr));
      const snapshot = await getDocs(q);

      let totalUtilization = 0;
      let sessionCount = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        const sessionDuration = calculateSessionDuration(data.sessionType || 'AM');
        const bookedMinutes = data.bookedMinutes || 0;
        const utilization = sessionDuration > 0 ? (bookedMinutes / sessionDuration) * 100 : 0;

        totalUtilization += utilization;
        sessionCount++;
      });

      const avgUtilization = sessionCount > 0 ? totalUtilization / sessionCount : 0;

      trends.push({
        timestamp: dateStr,
        value: Math.round(avgUtilization),
        category: format(date, 'EEE')
      });
    }

    return trends;

  } catch (error) {
    console.error('Error getting weekly trend data:', error);
    return [];
  }
}

// ============================================================================
// STAFFING LEVELS VISUALIZATION
// ============================================================================

export async function getStaffingLevelsData(): Promise<StaffingData[]> {
  try {
    const staffRef = collection(db, 'staff');
    const snapshot = await getDocs(staffRef);

    const roleMap = new Map<string, number>();

    snapshot.forEach(doc => {
      const data = doc.data();
      const role = data.role || 'Unknown';

      roleMap.set(role, (roleMap.get(role) || 0) + 1);
    });

    // Target staffing levels (configurable)
    const targets: Record<string, number> = {
      'Scrub Nurse': 50,
      'Anaesthetist': 30,
      'ODP': 40,
      'HCA': 25,
      'Theatre Coordinator': 10
    };

    const staffingData: StaffingData[] = [];

    Object.entries(targets).forEach(([role, required]) => {
      const available = roleMap.get(role) || 0;
      const gap = required - available;
      const percentage = (available / required) * 100;

      staffingData.push({
        role,
        available,
        required,
        gap,
        percentage: Math.round(percentage)
      });
    });

    return staffingData.sort((a, b) => a.percentage - b.percentage);

  } catch (error) {
    console.error('Error getting staffing levels data:', error);
    return [];
  }
}

// ============================================================================
// WAITING LIST BY SPECIALTY
// ============================================================================

export async function getWaitingListDataBySpecialty(): Promise<WaitingListData[]> {
  try {
    const proceduresRef = collection(db, 'generatedProcedures');
    const q = query(proceduresRef, where('status', '==', 'waiting'));
    const snapshot = await getDocs(q);

    const specialtyMap = new Map<string, {
      count: number;
      urgent: number;
      routine: number;
      totalWaitDays: number;
    }>();

    snapshot.forEach(doc => {
      const data = doc.data();
      const specialty = data.specialtyName || 'Unknown';
      const priority = data.priority || 'Routine';
      const createdAt = data.createdAt ? parseISO(data.createdAt) : new Date();
      const waitDays = Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

      if (!specialtyMap.has(specialty)) {
        specialtyMap.set(specialty, {
          count: 0,
          urgent: 0,
          routine: 0,
          totalWaitDays: 0
        });
      }

      const current = specialtyMap.get(specialty)!;
      current.count++;
      current.totalWaitDays += waitDays;

      if (priority === 'Urgent' || priority === 'P1' || priority === 'P2') {
        current.urgent++;
      } else {
        current.routine++;
      }
    });

    const waitingListData: WaitingListData[] = [];

    specialtyMap.forEach((data, specialty) => {
      waitingListData.push({
        specialty,
        count: data.count,
        urgent: data.urgent,
        routine: data.routine,
        avgWaitDays: Math.round(data.totalWaitDays / data.count)
      });
    });

    return waitingListData.sort((a, b) => b.count - a.count);

  } catch (error) {
    console.error('Error getting waiting list data:', error);
    return [];
  }
}

// ============================================================================
// CASE MIX BY SPECIALTY
// ============================================================================

export async function getCaseMixData(
  startDate?: string,
  endDate?: string
): Promise<ChartDataPoint[]> {
  const start = startDate || format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const end = endDate || format(new Date(), 'yyyy-MM-dd');

  try {
    const sessionsRef = collection(db, 'theatreSessions');
    const snapshot = await getDocs(sessionsRef);

    const specialtyMap = new Map<string, number>();

    snapshot.forEach(doc => {
      const data = doc.data();
      const sessionDate = data.date;

      if (sessionDate >= start && sessionDate <= end) {
        const specialty = data.specialtyName || 'Unknown';
        specialtyMap.set(specialty, (specialtyMap.get(specialty) || 0) + 1);
      }
    });

    const caseMix: ChartDataPoint[] = [];
    let index = 0;

    specialtyMap.forEach((count, specialty) => {
      caseMix.push({
        x: specialty,
        y: count,
        label: specialty,
        color: getSpecialtyColor(index++)
      });
    });

    return caseMix.sort((a, b) => b.y - a.y);

  } catch (error) {
    console.error('Error getting case mix data:', error);
    return [];
  }
}

// ============================================================================
// TURNOVER TIME ANALYSIS
// ============================================================================

export async function getTurnoverTimeData(): Promise<ChartDataPoint[]> {
  try {
    // Placeholder data - would be calculated from actual session data
    const turnoverData: ChartDataPoint[] = [
      { x: 'Mon', y: 22, label: 'Monday' },
      { x: 'Tue', y: 25, label: 'Tuesday' },
      { x: 'Wed', y: 23, label: 'Wednesday' },
      { x: 'Thu', y: 27, label: 'Thursday' },
      { x: 'Fri', y: 24, label: 'Friday' }
    ];

    return turnoverData;

  } catch (error) {
    console.error('Error getting turnover time data:', error);
    return [];
  }
}

// ============================================================================
// REAL-TIME METRICS DASHBOARD DATA
// ============================================================================

export interface DashboardMetrics {
  utilization: {
    current: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  casesCompleted: {
    today: number;
    week: number;
    month: number;
  };
  waitingList: {
    total: number;
    urgent: number;
    avgWaitDays: number;
  };
  staffing: {
    available: number;
    required: number;
    percentage: number;
  };
  efficiency: {
    onTimeStarts: number;
    avgTurnover: number;
    cancelRate: number;
  };
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');

    // Get utilization
    const utilizationData = await getTheatreUtilizationData(today);
    const avgUtilization = utilizationData.length > 0
      ? utilizationData.reduce((sum, d) => sum + d.utilization, 0) / utilizationData.length
      : 0;

    // Get waiting list
    const waitingListData = await getWaitingListDataBySpecialty();
    const totalWaiting = waitingListData.reduce((sum, d) => sum + d.count, 0);
    const urgentCount = waitingListData.reduce((sum, d) => sum + d.urgent, 0);
    const avgWait = waitingListData.length > 0
      ? waitingListData.reduce((sum, d) => sum + d.avgWaitDays, 0) / waitingListData.length
      : 0;

    // Get staffing
    const staffingData = await getStaffingLevelsData();
    const totalAvailable = staffingData.reduce((sum, d) => sum + d.available, 0);
    const totalRequired = staffingData.reduce((sum, d) => sum + d.required, 0);
    const staffingPct = totalRequired > 0 ? (totalAvailable / totalRequired) * 100 : 0;

    return {
      utilization: {
        current: Math.round(avgUtilization),
        trend: avgUtilization > 80 ? 'up' : avgUtilization < 70 ? 'down' : 'stable',
        change: 0 // Would be calculated from historical data
      },
      casesCompleted: {
        today: utilizationData.length,
        week: utilizationData.length * 5,
        month: utilizationData.length * 20
      },
      waitingList: {
        total: totalWaiting,
        urgent: urgentCount,
        avgWaitDays: Math.round(avgWait)
      },
      staffing: {
        available: totalAvailable,
        required: totalRequired,
        percentage: Math.round(staffingPct)
      },
      efficiency: {
        onTimeStarts: 85, // Placeholder
        avgTurnover: 25, // Placeholder
        cancelRate: 2.5 // Placeholder
      }
    };

  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    return {
      utilization: { current: 0, trend: 'stable', change: 0 },
      casesCompleted: { today: 0, week: 0, month: 0 },
      waitingList: { total: 0, urgent: 0, avgWaitDays: 0 },
      staffing: { available: 0, required: 0, percentage: 0 },
      efficiency: { onTimeStarts: 0, avgTurnover: 0, cancelRate: 0 }
    };
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateSessionDuration(sessionType: string): number {
  const durations: Record<string, number> = {
    'AM': 240,      // 4 hours
    'PM': 240,      // 4 hours
    'EVE': 240,     // 4 hours
    'FULL': 480,    // 8 hours
    'PME': 420,     // 7 hours
    'EXTENDED': 600, // 10 hours
    'NIGHT': 720    // 12 hours
  };

  return durations[sessionType] || 240;
}

function getSpecialtyColor(index: number): string {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
    '#6366f1', // indigo
    '#84cc16'  // lime
  ];

  return colors[index % colors.length];
}

// ============================================================================
// LIVE DATA STREAMING (WebSocket/Polling Support)
// ============================================================================

export interface LiveDataUpdate {
  type: 'utilization' | 'staffing' | 'waiting-list' | 'metrics';
  timestamp: string;
  data: any;
}

export async function getLiveDataUpdates(): Promise<LiveDataUpdate[]> {
  // This would be implemented with WebSockets or Server-Sent Events
  // For now, return latest data snapshot
  const updates: LiveDataUpdate[] = [];

  try {
    const [utilization, staffing, waitingList, metrics] = await Promise.all([
      getTheatreUtilizationData(),
      getStaffingLevelsData(),
      getWaitingListDataBySpecialty(),
      getDashboardMetrics()
    ]);

    updates.push(
      {
        type: 'utilization',
        timestamp: new Date().toISOString(),
        data: utilization
      },
      {
        type: 'staffing',
        timestamp: new Date().toISOString(),
        data: staffing
      },
      {
        type: 'waiting-list',
        timestamp: new Date().toISOString(),
        data: waitingList
      },
      {
        type: 'metrics',
        timestamp: new Date().toISOString(),
        data: metrics
      }
    );

    return updates;

  } catch (error) {
    console.error('Error getting live data updates:', error);
    return [];
  }
}
