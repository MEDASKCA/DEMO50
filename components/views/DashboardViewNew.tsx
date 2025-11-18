'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Activity, Clock, AlertCircle, Users, TrendingUp, Calendar, Stethoscope, Building2, Eye, ArrowUpDown, ArrowUp, ArrowDown, Bell } from 'lucide-react';
import HospitalSelector from '@/components/HospitalSelector';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  band: string;
  professionalQualification?: string;
  currentStatus?: 'scrubbed' | 'circulating' | 'break' | 'available';
}

interface TheatreCard {
  theatreId: string;
  theatreName: string;
  specialty: string;
  sessionType: string;
  status: 'active' | 'setup' | 'closed';
  staffing: {
    required: number;
    assigned: number;
    gap: number;
  };
  roles: Array<{
    role: string;
    required: number;
    assigned: number;
  }>;
  assignedStaff: StaffMember[];
  // Operational metrics for demo
  casesCompleted: number;
  casesTotal: number;
  currentProcedure?: string;
  delays: number;
  delayDetails?: Array<{reason: string; time: string; duration: string}>;
  cancellations: number;
  cancellationDetails?: Array<{reason: string; time: string; patientInformed: boolean}>;
  issues: number;
  issueDetails?: Array<{issue: string; updates: string}>;
  reliefRequests: number;
  reliefDetails?: {
    needsReliefNow: Array<{name: string; role: string}>;
    canRelieve: Array<{name: string; role: string}>;
    needsReliefEndOfShift: Array<{name: string; role: string}>;
  };
  overrunPercentage: number;
  overrunDetails?: {explanation: string; forecast: string};
  currentStatus: 'SENT' | 'ANAES' | 'IN THEATRE' | 'START' | 'FINISH' | 'RECOVERY' | 'WAITING';
  statusTimestamps?: {
    sent?: string;
    anaes?: string;
    inTheatre?: string;
    start?: string;
    finish?: string;
    recovery?: string;
  };
  mealStatus: 'taken' | 'pending' | 'overdue';
  mealBreaks?: {
    teaBreak: {status: 'taken' | 'pending' | 'overdue'; time?: string};
    lunchBreak: {status: 'taken' | 'pending' | 'overdue'; time?: string};
  };
}

interface DashboardViewNewProps {
  onBack?: () => void;
}

// Demo data generator for operational metrics ONLY (NOT specialty)
const generateDemoOperationalData = (theatreId: string, index: number, isEmergency: boolean = false) => {
  const statuses: Array<'SENT' | 'ANAES' | 'IN THEATRE' | 'START' | 'FINISH' | 'RECOVERY' | 'WAITING'> = ['SENT', 'ANAES', 'IN THEATRE', 'START', 'FINISH', 'RECOVERY', 'WAITING'];
  const mealStatuses: Array<'taken' | 'pending' | 'overdue'> = ['taken', 'pending', 'overdue'];

  const procedures = [
    'Total Hip Replacement',
    'Laparoscopic Cholecystectomy',
    'Anterior Cruciate Ligament Repair',
    'Inguinal Hernia Repair',
    'Arthroscopy (Knee)',
    'Carpal Tunnel Release'
  ];

  // Create realistic variance based on theatre number
  const seed = parseInt(theatreId.replace(/\D/g, '')) || index;

  // Emergency theatres: just count since shift start (no total)
  const casesTotal = isEmergency ? 0 : (4 + (seed % 3));
  const casesCompleted = isEmergency ? (seed % 8) : Math.min(seed % (casesTotal + 1), casesTotal);

  const delayCount = seed % 3;
  const cancellationCount = seed % 2;
  const issueCount = seed % 4;

  // Relief details
  const needsReliefNow = seed % 2 === 0 ? [
    {name: 'J. Smith', role: 'Lead Scrub Nurse'},
    {name: 'A. Jones', role: 'ODP'}
  ].slice(0, seed % 3) : [];

  const canRelieve = [
    {name: 'M. Brown', role: 'Scrub Nurse'},
    {name: 'P. Davis', role: 'ODP'},
    {name: 'K. Wilson', role: 'Circulating Nurse'}
  ].slice(0, (seed % 4));

  const needsReliefEndOfShift = [
    {name: 'L. Taylor', role: 'Anaesthetic Practitioner'},
    {name: 'R. Martin', role: 'Scrub Nurse'}
  ].slice(0, seed % 3);

  const reliefCount = needsReliefNow.length + needsReliefEndOfShift.length;

  const currentStatusValue = statuses[seed % statuses.length];
  const now = new Date();

  return {
    casesCompleted,
    casesTotal,
    currentProcedure: casesCompleted < casesTotal || isEmergency ? procedures[seed % procedures.length] : undefined,
    delays: delayCount,
    delayDetails: delayCount > 0 ? [
      {reason: 'Patient late to theatre', time: '08:45', duration: '15 mins'},
      {reason: 'Equipment malfunction', time: '10:20', duration: '30 mins'},
      {reason: 'Anaesthetic induction delay', time: '13:15', duration: '20 mins'}
    ].slice(0, delayCount) : [],
    cancellations: cancellationCount,
    cancellationDetails: cancellationCount > 0 ? [
      {reason: 'Patient unwell - elevated temperature', time: '07:30', patientInformed: true},
      {reason: 'No bed available on ward', time: '14:45', patientInformed: false}
    ].slice(0, cancellationCount) : [],
    issues: issueCount,
    issueDetails: issueCount > 0 ? [
      {issue: 'Missing laparoscopic equipment', updates: 'Being sourced from Main Theatre 5'},
      {issue: 'Staff shortage - 1 scrub nurse short', updates: 'Bank staff called, ETA 30 mins'},
      {issue: 'Temperature control issue', updates: 'Estates notified, investigating'},
      {issue: 'Emergency case priority', updates: 'Waiting for theatre to become available'}
    ].slice(0, issueCount) : [],
    reliefRequests: reliefCount,
    reliefDetails: {
      needsReliefNow,
      canRelieve,
      needsReliefEndOfShift
    },
    overrunPercentage: (seed * 5) % 30,
    overrunDetails: {
      explanation: seed % 2 === 0
        ? 'Current case more complex than anticipated. Unexpected adhesions found requiring additional dissection.'
        : 'Previous case overran by 45 minutes due to anaesthetic complications.',
      forecast: `Based on current progress, expecting to finish ${Math.floor((seed * 5) % 30)} minutes late. Next case may need to be moved to another theatre.`
    },
    currentStatus: currentStatusValue,
    statusTimestamps: {
      sent: currentStatusValue !== 'WAITING' ? new Date(now.getTime() - 120*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
      anaes: ['ANAES', 'IN THEATRE', 'START', 'FINISH', 'RECOVERY'].includes(currentStatusValue) ? new Date(now.getTime() - 90*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
      inTheatre: ['IN THEATRE', 'START', 'FINISH', 'RECOVERY'].includes(currentStatusValue) ? new Date(now.getTime() - 60*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
      start: ['START', 'FINISH', 'RECOVERY'].includes(currentStatusValue) ? new Date(now.getTime() - 45*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
      finish: ['FINISH', 'RECOVERY'].includes(currentStatusValue) ? new Date(now.getTime() - 15*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
      recovery: currentStatusValue === 'RECOVERY' ? new Date(now.getTime() - 5*60000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) : undefined,
    },
    mealStatus: mealStatuses[seed % mealStatuses.length],
    mealBreaks: {
      teaBreak: {
        status: seed % 3 === 0 ? 'taken' : seed % 3 === 1 ? 'overdue' : 'pending',
        time: seed % 3 === 0 ? '10:15' : undefined
      },
      lunchBreak: {
        status: mealStatuses[seed % mealStatuses.length],
        time: mealStatuses[seed % mealStatuses.length] === 'taken' ? '13:00' : undefined
      }
    }
  };
};

type SortColumn = 'theatre' | 'specialty' | 'cases' | 'delays' | 'cancel' | 'issues' | 'relief' | 'overrun' | null;
type SortDirection = 'asc' | 'desc';

export default function DashboardViewNew({ onBack }: DashboardViewNewProps = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theatreCards, setTheatreCards] = useState<TheatreCard[]>([]);
  const [sortedCards, setSortedCards] = useState<TheatreCard[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalTheatres: 0,
    activeTheatres: 0,
    totalStaffRequired: 0,
    totalStaffAssigned: 0,
    gapCount: 0
  });
  const [liveUpdate, setLiveUpdate] = useState(0);
  const [sortBy, setSortBy] = useState<SortColumn>('theatre');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCell, setSelectedCell] = useState<{
    type: string;
    theatreName: string;
    value: any;
    data: TheatreCard;
  } | null>(null);

  const handleViewTeam = (theatreId: string, theatreName: string, assignedStaff: StaffMember[]) => {
    // For now, navigate to workforce page with filters
    // TODO: Create a dedicated team view modal showing assigned staff with lunch/supper status
    const dateStr = format(currentDate, 'yyyy-MM-dd');

    if (assignedStaff.length === 0) {
      alert(`No staff currently assigned to ${theatreName} on ${format(currentDate, 'MMM d, yyyy')}`);
      return;
    }

    router.push(`/admin/workforce?theatre=${theatreId}&date=${dateStr}&name=${encodeURIComponent(theatreName)}`);
  };

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleCellClick = (type: string, card: TheatreCard, value: any) => {
    setSelectedCell({
      type,
      theatreName: card.theatreName,
      value,
      data: card
    });
  };

  // Sort cards whenever sorting changes
  useEffect(() => {
    if (theatreCards.length === 0) return;

    const sorted = [...theatreCards].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'theatre':
          // Sort by Unit ID (Unit 1 first, then Unit 2), then by theatre name
          const unitA = a.theatreId.match(/UNIT-(\d+)/)?.[1] || '999';
          const unitB = b.theatreId.match(/UNIT-(\d+)/)?.[1] || '999';
          comparison = unitA.localeCompare(unitB);
          if (comparison === 0) {
            comparison = a.theatreName.localeCompare(b.theatreName);
          }
          break;

        case 'specialty':
          comparison = a.specialty.localeCompare(b.specialty);
          break;

        case 'cases':
          // Sort by completion percentage
          const percentA = a.casesTotal > 0 ? (a.casesCompleted / a.casesTotal) : 0;
          const percentB = b.casesTotal > 0 ? (b.casesCompleted / b.casesTotal) : 0;
          comparison = percentB - percentA; // Higher percentage first
          break;

        case 'delays':
          comparison = b.delays - a.delays; // More delays first
          break;

        case 'cancel':
          comparison = b.cancellations - a.cancellations; // More cancellations first
          break;

        case 'issues':
          comparison = b.issues - a.issues; // More issues first
          break;

        case 'relief':
          comparison = b.reliefRequests - a.reliefRequests; // More relief requests first
          break;

        case 'overrun':
          comparison = b.overrunPercentage - a.overrunPercentage; // Higher overrun first
          break;

        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setSortedCards(sorted);
  }, [theatreCards, sortBy, sortDirection]);

  useEffect(() => {
    loadDashboardData();
  }, [currentDate]);

  // Add dynamic live updates for demo (updates every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdate(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dateStr = format(currentDate, 'yyyy-MM-dd');

      // Load all data in parallel including theatre lists (sessions)
      const [theatresSnapshot, staffSnapshot, rostersSnapshot, allocationsSnapshot, configsSnapshot, theatreListsSnapshot] = await Promise.all([
        getDocs(collection(db, 'theatres')),
        getDocs(collection(db, 'staff')),
        getDocs(collection(db, 'rosters')),
        getDocs(query(collection(db, 'staffAllocations'), where('date', '==', dateStr))),
        getDocs(collection(db, 'calendarConfigurations')),
        getDocs(query(collection(db, 'theatreLists'), where('date', '==', dateStr)))
      ]);

      // Build theatre map
      const theatreMap = new Map<string, { name: string; specialty: string }>();
      theatresSnapshot.docs.forEach(doc => {
        const data = doc.data();
        theatreMap.set(data.id, {
          name: data.name,
          specialty: data.specialty
        });
      });

      // Build theatre lists map (sessions for the day with actual specialty)
      console.log('🔍 THEATRE LISTS FOR TODAY:', dateStr);
      console.log('Found', theatreListsSnapshot.docs.length, 'theatre lists');

      const theatreListsMap = new Map<string, any>();
      theatreListsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        console.log('📋 Theatre List:', {
          id: doc.id,
          theatreId: data.theatreId,
          theatreName: data.theatreName,
          specialty: data.specialty,
          sessionType: data.sessionType,
          unitId: data.unitId
        });
        const key = data.theatreId;
        if (!theatreListsMap.has(key)) {
          theatreListsMap.set(key, []);
        }
        theatreListsMap.get(key)!.push(data);
      });

      console.log('📊 Total theatres in lists map:', theatreListsMap.size);

      // Build staff map
      const staffMap = new Map<string, StaffMember>();
      staffSnapshot.docs.forEach(doc => {
        const data = doc.data();
        staffMap.set(data.id, {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          band: data.band,
          professionalQualification: data.professionalQualification
        });
      });

      // Find today's configurations
      const todaysConfigs: any[] = [];
      configsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.configurations && Array.isArray(data.configurations)) {
          data.configurations.forEach((config: any) => {
            if (config.date === dateStr) {
              todaysConfigs.push(config);
            }
          });
        }
      });

      // Build assignment map from rosters
      const assignmentsByTheatre = new Map<string, Set<string>>();
      rostersSnapshot.docs.forEach(doc => {
        const roster = doc.data();
        const todaysShifts = roster.shifts?.filter((s: any) => s.date === dateStr) || [];

        todaysShifts.forEach((shift: any) => {
          if (shift.theatreId) {
            if (!assignmentsByTheatre.has(shift.theatreId)) {
              assignmentsByTheatre.set(shift.theatreId, new Set());
            }
            assignmentsByTheatre.get(shift.theatreId)!.add(roster.staffId);
          }
        });
      });

      // Build theatre cards FROM THEATRE LISTS (actual sessions), not allocations!
      const cards: TheatreCard[] = [];
      let totalRequired = 0;
      let totalAssigned = 0;

      console.log('📋 BUILDING CARDS FROM THEATRE LISTS (SESSIONS)');
      console.log('Theatre lists for today:', theatreListsSnapshot.docs.length);

      // Iterate through ACTUAL theatre lists/sessions, not allocations
      theatreListsSnapshot.docs.forEach(doc => {
        const theatreList = doc.data();
        const theatreId = theatreList.theatreId;

        console.log('🎭 Processing theatre list:', {
          id: doc.id,
          theatreId,
          theatreName: theatreList.theatreName,
          specialty: theatreList.specialty,
          sessionType: theatreList.sessionType
        });

        // Get allocation for this theatre (if it exists)
        const allocation = allocationsSnapshot.docs.find(d => d.data().theatreId === theatreId)?.data();
        const config = todaysConfigs.find(c => c.theatreId === theatreId);

        // Get staff IDs assigned to this theatre
        const staffIds = assignmentsByTheatre.get(theatreId) || new Set();

        // Build full staff member list with demo status
        const assignedStaffList: StaffMember[] = [];
        const staffStatuses: Array<'scrubbed' | 'circulating' | 'break' | 'available'> = ['scrubbed', 'circulating', 'break', 'available'];
        let statusIndex = 0;
        staffIds.forEach(staffId => {
          const staff = staffMap.get(staffId);
          if (staff) {
            assignedStaffList.push({
              ...staff,
              currentStatus: staffStatuses[statusIndex % staffStatuses.length]
            });
            statusIndex++;
          }
        });

        // Get theatre details
        const theatreDetails = theatreMap.get(theatreId);
        const theatreName = theatreList.theatreName || theatreDetails?.name || theatreId;

        // Check if this is an emergency theatre (Main Theatre 7 or 12)
        const isEmergency = theatreId === 'UNIT-001-T07' || theatreId === 'UNIT-001-T12';

        // Generate demo operational data (NOT including specialty)
        const demoData = generateDemoOperationalData(theatreId, cards.length, isEmergency);

        // Get specialty FROM THEATRE LIST (session) - this is the ACTUAL scheduled specialty!
        // For emergency theatres, override if it's "night-shift" or similar
        let specialty = theatreList.specialty || 'Unknown';
        if (isEmergency && (specialty.toLowerCase().includes('night') || specialty === 'Unknown')) {
          specialty = 'Emergency';
        }

        console.log(`✅ Theatre ${theatreId}: Specialty = ${specialty} (from theatre list)`);

        // Calculate requirements from allocation (if it exists)
        const roles = allocation?.roles || [];
        const requiredCount = roles.reduce((sum: number, r: any) => sum + r.count, 0);
        const assignedCount = assignedStaffList.length;

        totalRequired += requiredCount;
        totalAssigned += assignedCount;

        // Determine status
        let status: 'active' | 'setup' | 'closed';
        if (assignedCount >= requiredCount) {
          status = 'active';
        } else if (assignedCount > 0) {
          status = 'setup';
        } else {
          status = 'closed';
        }

        cards.push({
          theatreId,
          theatreName,
          specialty,
          sessionType: theatreList.sessionType || 'day',
          status,
          staffing: {
            required: requiredCount,
            assigned: assignedCount,
            gap: requiredCount - assignedCount
          },
          roles: roles.map((r: any) => ({
            role: r.role,
            required: r.count,
            assigned: 0
          })),
          assignedStaff: assignedStaffList,
          ...demoData
        });
      });

      // Sort by Unit (Main first, then ACAD), then by theatre number
      cards.sort((a, b) => {
        // Extract unit and theatre number
        const aMatch = a.theatreId.match(/UNIT-(\d+)-T(\d+)/);
        const bMatch = b.theatreId.match(/UNIT-(\d+)-T(\d+)/);

        if (!aMatch || !bMatch) {
          return a.theatreName.localeCompare(b.theatreName);
        }

        const aUnit = parseInt(aMatch[1]);
        const bUnit = parseInt(bMatch[1]);
        const aTheatreNum = parseInt(aMatch[2]);
        const bTheatreNum = parseInt(bMatch[2]);

        // Sort by unit first (001 = Main, 002 = ACAD)
        if (aUnit !== bUnit) {
          return aUnit - bUnit;
        }

        // Within same unit, sort by theatre number
        return aTheatreNum - bTheatreNum;
      });

      setTheatreCards(cards);
      setOverallStats({
        totalTheatres: cards.length,
        activeTheatres: cards.filter(c => c.status === 'active').length,
        totalStaffRequired: totalRequired,
        totalStaffAssigned: totalAssigned,
        gapCount: totalRequired - totalAssigned
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 border-green-400 text-green-800';
      case 'setup': return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'closed': return 'bg-red-100 border-red-400 text-red-800';
      default: return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const getSessionTypeColor = (sessionType: string) => {
    switch (sessionType) {
      case 'day': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'long-day': return 'bg-green-50 text-green-700 border-green-200';
      case 'night': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSessionTypeLabel = (sessionType: string) => {
    switch (sessionType) {
      case 'day': return 'Day (08:00-18:00)';
      case 'long-day': return 'Long Day (08:00-20:00)';
      case 'night': return 'Night (20:00-08:00)';
      default: return sessionType;
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Clock className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 overflow-auto" style={{fontFamily: 'Arial, sans-serif'}}>
      {/* Compact Summary Stats */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-600">Total Theatres: </span>
              <span className="font-semibold text-gray-900">{overallStats.totalTheatres}</span>
            </div>
            <div>
              <span className="text-gray-600">Active: </span>
              <span className="font-semibold text-green-600">{overallStats.activeTheatres}</span>
            </div>
            <div>
              <span className="text-gray-600">Staff: </span>
              <span className="font-semibold text-gray-900">{overallStats.totalStaffAssigned}/{overallStats.totalStaffRequired}</span>
            </div>
            {overallStats.gapCount > 0 && (
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>{overallStats.gapCount} Short</span>
              </div>
            )}
          </div>
          <div className="text-gray-600">
            {format(currentDate, 'MMM d, yyyy')}
          </div>
        </div>
      </div>

      {/* NBA Standings Table */}
      <div className="p-4 md:p-6">
        {theatreCards.length === 0 ? (
          <div className="text-center py-12 bg-white rounded shadow">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Theatre Sessions</h3>
            <p className="text-sm text-gray-600">
              No scheduled sessions for {format(currentDate, 'MMM d, yyyy')}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Live Theatre Operations</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-600">Live Updates</span>
              </div>
            </div>

            {/* Desktop Table - Compact Operations View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="text-left px-2 py-2 font-semibold text-gray-700 border-r border-gray-200">#</th>
                    <th
                      onClick={() => handleSort('theatre')}
                      className="text-left px-3 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        Theatre
                        {sortBy === 'theatre' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('specialty')}
                      className="text-left px-3 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        Specialty
                        {sortBy === 'specialty' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('cases')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Cases
                        {sortBy === 'cases' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('delays')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Delays
                        {sortBy === 'delays' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('cancel')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Cancel
                        {sortBy === 'cancel' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('issues')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Issues
                        {sortBy === 'issues' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('relief')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Relief
                        {sortBy === 'relief' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('overrun')}
                      className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        Overrun
                        {sortBy === 'overrun' ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700 border-r border-gray-200">Current Status</th>
                    <th className="text-center px-2 py-2 font-semibold text-gray-700 border-r border-gray-200">Meal</th>
                    <th className="text-center px-2 py-2 font-semibold text-gray-700">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCards.map((card, index) => {
                    return (
                      <tr
                        key={card.theatreId}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-all bg-white"
                      >
                        <td className="px-2 py-2.5 text-gray-600 font-normal border-r border-gray-100">{index + 1}</td>
                        <td
                          onClick={() => handleCellClick('theatre', card, {name: card.theatreName, id: card.theatreId})}
                          className="px-3 py-2.5 font-semibold text-gray-900 border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          {card.theatreName}
                        </td>
                        <td
                          onClick={() => handleCellClick('specialty', card, card.specialty)}
                          className="px-3 py-2.5 text-gray-700 border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className="font-normal">{card.specialty}</span>
                        </td>
                        <td
                          onClick={() => handleCellClick('cases', card, {completed: card.casesCompleted, total: card.casesTotal, procedure: card.currentProcedure})}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`font-semibold ${
                            card.casesTotal === 0 ? 'text-blue-600' :
                            card.casesCompleted === card.casesTotal ? 'text-green-600' :
                            card.casesCompleted > 0 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {card.casesTotal === 0 ? card.casesCompleted : `${card.casesCompleted}/${card.casesTotal}`}
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('delays', card, {count: card.delays, details: card.delayDetails})}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`font-semibold ${card.delays > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                            {card.delays}
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('cancellations', card, {count: card.cancellations, details: card.cancellationDetails})}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`font-semibold ${card.cancellations > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                            {card.cancellations}
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('issues', card, {count: card.issues, details: card.issueDetails})}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`font-semibold ${card.issues > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                            {card.issues}
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('relief', card, card.reliefRequests)}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          {card.reliefRequests > 0 ? (
                            <div className="flex items-center justify-center gap-1 text-xs font-semibold">
                              <span className="text-green-600">{card.reliefDetails?.canRelieve.length || 0}</span>
                              <span className="text-gray-400">/</span>
                              <span className="text-red-600">{card.reliefDetails?.needsReliefNow.length || 0}</span>
                              <span className="text-gray-400">/</span>
                              <span className="text-amber-600">{card.reliefDetails?.needsReliefEndOfShift.length || 0}</span>
                            </div>
                          ) : (
                            <span className="font-semibold text-gray-400">-</span>
                          )}
                        </td>
                        <td
                          onClick={() => handleCellClick('overrun', card, card.overrunPercentage)}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`font-semibold ${
                            card.overrunPercentage > 20 ? 'text-red-600' :
                            card.overrunPercentage > 10 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {card.overrunPercentage}%
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('status', card, card.currentStatus)}
                          className="px-3 py-2.5 border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold rounded ${
                            card.currentStatus === 'IN THEATRE' ? 'bg-green-100 text-green-800' :
                            card.currentStatus === 'START' ? 'bg-blue-100 text-blue-800' :
                            card.currentStatus === 'ANAES' ? 'bg-purple-100 text-purple-800' :
                            card.currentStatus === 'RECOVERY' ? 'bg-cyan-100 text-cyan-800' :
                            card.currentStatus === 'FINISH' ? 'bg-gray-100 text-gray-800' :
                            card.currentStatus === 'SENT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              card.currentStatus === 'IN THEATRE' || card.currentStatus === 'START' ? 'bg-green-600' :
                              card.currentStatus === 'ANAES' ? 'bg-purple-600' :
                              card.currentStatus === 'RECOVERY' ? 'bg-cyan-600' :
                              'bg-gray-400'
                            }`}></span>
                            {card.currentStatus}
                          </span>
                        </td>
                        <td
                          onClick={() => handleCellClick('meal', card, card.mealStatus)}
                          className="px-2 py-2.5 text-center border-r border-gray-100 cursor-pointer hover:bg-blue-100"
                        >
                          <span className={`text-lg ${
                            card.mealStatus === 'taken' ? 'text-green-600' :
                            card.mealStatus === 'overdue' ? 'text-red-600' :
                            'text-gray-400'
                          }`}>
                            {card.mealStatus === 'taken' ? '✓' : card.mealStatus === 'overdue' ? '🔴' : '-'}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {card.reliefRequests > 0 && (
                              <button
                                onClick={() => handleCellClick('relief', card, card.reliefRequests)}
                                className="inline-flex items-center gap-1 px-1.5 py-1 text-[10px] font-semibold rounded transition-colors text-orange-700 bg-orange-50 hover:bg-orange-100 animate-pulse"
                                title={`${card.reliefRequests} relief request(s)`}
                              >
                                <Bell className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={() => handleViewTeam(card.theatreId, card.theatreName, card.assignedStaff)}
                              className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded transition-colors ${
                                card.assignedStaff && card.assignedStaff.length > 0
                                  ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                                  : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                              }`}
                              title={`View team (${card.assignedStaff?.length || 0} staff)`}
                              disabled={!card.assignedStaff || card.assignedStaff.length === 0}
                            >
                              <Users className="w-3 h-3" />
                              {card.assignedStaff?.length || 0}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {theatreCards.map((card, index) => {
                return (
                  <div key={card.theatreId} className="px-3 py-2.5 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-500">#{index + 1}</span>
                          <h3 className="text-sm font-bold text-gray-900">{card.theatreName}</h3>
                        </div>
                        <p className="text-xs text-gray-600 font-semibold">{card.specialty}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                        card.currentStatus === 'IN THEATRE' ? 'bg-green-100 text-green-800' :
                        card.currentStatus === 'START' ? 'bg-blue-100 text-blue-800' :
                        card.currentStatus === 'ANAES' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-1 h-1 rounded-full animate-pulse ${
                          card.currentStatus === 'IN THEATRE' || card.currentStatus === 'START' ? 'bg-green-600' : 'bg-gray-400'
                        }`}></span>
                        {card.currentStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 text-[11px] mb-2">
                      <div className="text-center bg-gray-50 rounded p-1">
                        <div className="text-gray-600 text-[9px]">Cases</div>
                        <div className={`font-bold ${card.casesCompleted === card.casesTotal ? 'text-green-600' : 'text-blue-600'}`}>
                          {card.casesCompleted}/{card.casesTotal}
                        </div>
                      </div>
                      <div className="text-center bg-gray-50 rounded p-1">
                        <div className="text-gray-600 text-[9px]">Delays</div>
                        <div className={`font-bold ${card.delays > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                          {card.delays}
                        </div>
                      </div>
                      <div className="text-center bg-gray-50 rounded p-1">
                        <div className="text-gray-600 text-[9px]">Cancel</div>
                        <div className={`font-bold ${card.cancellations > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                          {card.cancellations}
                        </div>
                      </div>
                      <div className="text-center bg-gray-50 rounded p-1">
                        <div className="text-gray-600 text-[9px]">Issues</div>
                        <div className={`font-bold ${card.issues > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                          {card.issues}
                        </div>
                      </div>
                      <div className="text-center bg-gray-50 rounded p-1">
                        <div className="text-gray-600 text-[9px]">Relief</div>
                        <div className={`font-bold ${card.reliefRequests > 0 ? 'text-purple-600' : 'text-gray-400'}`}>
                          {card.reliefRequests}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Overrun:</span>
                          <span className={`font-bold ${
                            card.overrunPercentage > 20 ? 'text-red-600' :
                            card.overrunPercentage > 10 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>{card.overrunPercentage}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Meal:</span>
                          <span className={`${
                            card.mealStatus === 'taken' ? 'text-green-600' :
                            card.mealStatus === 'overdue' ? 'text-red-600' :
                            'text-gray-400'
                          }`}>
                            {card.mealStatus === 'taken' ? '✓' : card.mealStatus === 'overdue' ? '🔴' : '-'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewTeam(card.theatreId, card.theatreName, card.assignedStaff)}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded transition-colors ${
                          card.assignedStaff && card.assignedStaff.length > 0
                            ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                            : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                        }`}
                        disabled={!card.assignedStaff || card.assignedStaff.length === 0}
                      >
                        <Users className="w-3 h-3" />
                        Team ({card.assignedStaff?.length || 0})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cell Info Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCell(null)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedCell.theatreName}</h3>
                <p className="text-sm text-blue-100 capitalize">{selectedCell.type} Details</p>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="text-white hover:bg-white hover:text-blue-600 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {selectedCell.type === 'theatre' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Theatre ID</p>
                      <p className="text-lg font-bold text-gray-900">{selectedCell.value.id}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Theatre Name</p>
                      <p className="text-lg font-bold text-gray-900">{selectedCell.value.name}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Specialty</p>
                      <p className="text-lg font-bold text-gray-900">{selectedCell.data.specialty}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className={`text-lg font-bold ${
                        selectedCell.data.status === 'active' ? 'text-green-600' :
                        selectedCell.data.status === 'setup' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{selectedCell.data.status.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Assigned Staff ({selectedCell.data.assignedStaff.length})</p>
                    <div className="space-y-2">
                      {selectedCell.data.assignedStaff.map((staff: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded">
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900">{staff.firstName} {staff.lastName}</span>
                            <span className="text-xs text-gray-500 ml-2">{staff.band}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            staff.currentStatus === 'scrubbed' ? 'bg-green-100 text-green-700' :
                            staff.currentStatus === 'circulating' ? 'bg-blue-100 text-blue-700' :
                            staff.currentStatus === 'break' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {staff.currentStatus === 'scrubbed' ? 'Scrubbed' :
                             staff.currentStatus === 'circulating' ? 'Circulating' :
                             staff.currentStatus === 'break' ? 'On Break' :
                             'Available'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedCell.type === 'specialty' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-2">Theatre Specialty</p>
                    <p className="text-3xl font-bold text-gray-900">{selectedCell.value}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Cases</p>
                      <p className="text-2xl font-bold text-blue-900">{selectedCell.data.casesCompleted}/{selectedCell.data.casesTotal}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Staff</p>
                      <p className="text-2xl font-bold text-green-900">{selectedCell.data.assignedStaff.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-lg font-bold text-purple-900">{selectedCell.data.currentStatus}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCell.type === 'cases' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-6 rounded-lg text-center border-2 border-green-200">
                      <p className="text-sm text-gray-600 mb-2">Completed Cases</p>
                      <p className="text-5xl font-semibold text-green-600">{selectedCell.value.completed}</p>
                    </div>
                    {selectedCell.value.total > 0 ? (
                      <div className="bg-blue-50 p-6 rounded-lg text-center border-2 border-blue-200">
                        <p className="text-sm text-gray-600 mb-2">Total Cases</p>
                        <p className="text-5xl font-semibold text-blue-600">{selectedCell.value.total}</p>
                      </div>
                    ) : (
                      <div className="bg-purple-50 p-6 rounded-lg text-center border-2 border-purple-200">
                        <p className="text-sm text-gray-600 mb-2">Emergency Theatre</p>
                        <p className="text-lg font-semibold text-purple-600">24/7 Operation<br/>Count since shift start</p>
                      </div>
                    )}
                  </div>
                  {selectedCell.value.procedure && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Current Procedure</p>
                      <p className="text-xl font-semibold text-blue-900">{selectedCell.value.procedure}</p>
                    </div>
                  )}
                  {selectedCell.value.total > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">Completion Progress</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {Math.round((selectedCell.value.completed / selectedCell.value.total) * 100)}%
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all"
                          style={{width: `${(selectedCell.value.completed / selectedCell.value.total) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'delays' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg text-center border-2 ${selectedCell.value.count > 0 ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-sm text-gray-600 mb-2">Delays</p>
                    <p className={`text-6xl font-semibold ${selectedCell.value.count > 0 ? 'text-orange-600' : 'text-gray-400'}`}>{selectedCell.value.count}</p>
                  </div>
                  {selectedCell.value.count > 0 && selectedCell.value.details ? (
                    <div className="space-y-2">
                      {selectedCell.value.details.map((delay: any, idx: number) => (
                        <div key={idx} className="bg-white border-2 border-orange-200 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-gray-900">{delay.reason}</p>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">{delay.duration}</span>
                          </div>
                          <p className="text-sm text-gray-600">Time: {delay.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">No delays reported for this theatre.</p>
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'cancellations' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg text-center border-2 ${selectedCell.value.count > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-sm text-gray-600 mb-2">Cancellations</p>
                    <p className={`text-6xl font-semibold ${selectedCell.value.count > 0 ? 'text-red-600' : 'text-gray-400'}`}>{selectedCell.value.count}</p>
                  </div>
                  {selectedCell.value.count > 0 && selectedCell.value.details ? (
                    <div className="space-y-2">
                      {selectedCell.value.details.map((cancel: any, idx: number) => (
                        <div key={idx} className="bg-white border-2 border-red-200 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-gray-900">{cancel.reason}</p>
                            <span className={`text-xs px-2 py-1 rounded font-semibold ${cancel.patientInformed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {cancel.patientInformed ? '✓ Patient Informed' : '⚠ Patient Not Informed'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Cancelled at: {cancel.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">No cancellations for this theatre.</p>
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'issues' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg text-center border-2 ${selectedCell.value.count > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-sm text-gray-600 mb-2">Issues</p>
                    <p className={`text-6xl font-semibold ${selectedCell.value.count > 0 ? 'text-red-600' : 'text-gray-400'}`}>{selectedCell.value.count}</p>
                  </div>
                  {selectedCell.value.count > 0 && selectedCell.value.details ? (
                    <div className="space-y-2">
                      {selectedCell.value.details.map((issue: any, idx: number) => (
                        <div key={idx} className="bg-white border-2 border-red-200 p-4 rounded-lg">
                          <p className="font-semibold text-gray-900 mb-2">{issue.issue}</p>
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="text-xs text-gray-600 font-semibold mb-1">Update:</p>
                            <p className="text-sm text-gray-700">{issue.updates}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">No issues reported for this theatre.</p>
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'relief' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
                      <p className="text-xs text-gray-600 mb-1">Can Relieve</p>
                      <p className="text-4xl font-semibold text-green-600">{selectedCell.data.reliefDetails?.canRelieve.length || 0}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center border-2 border-red-200">
                      <p className="text-xs text-gray-600 mb-1">Need Relief Now</p>
                      <p className="text-4xl font-semibold text-red-600">{selectedCell.data.reliefDetails?.needsReliefNow.length || 0}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg text-center border-2 border-amber-200">
                      <p className="text-xs text-gray-600 mb-1">Need at End Shift</p>
                      <p className="text-4xl font-semibold text-amber-600">{selectedCell.data.reliefDetails?.needsReliefEndOfShift.length || 0}</p>
                    </div>
                  </div>

                  {selectedCell.data.reliefDetails?.needsReliefNow && selectedCell.data.reliefDetails.needsReliefNow.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                        Needs Relief Now (Urgent)
                      </p>
                      <div className="space-y-2">
                        {selectedCell.data.reliefDetails.needsReliefNow.map((staff: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded border-2 border-red-200">
                            <p className="font-semibold text-gray-900">{staff.name}</p>
                            <p className="text-xs text-gray-600">{staff.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCell.data.reliefDetails?.canRelieve && selectedCell.data.reliefDetails.canRelieve.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Available to Relieve</p>
                      <div className="space-y-2">
                        {selectedCell.data.reliefDetails.canRelieve.map((staff: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded border-2 border-green-200">
                            <p className="font-semibold text-gray-900">{staff.name}</p>
                            <p className="text-xs text-gray-600">{staff.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCell.data.reliefDetails?.needsReliefEndOfShift && selectedCell.data.reliefDetails.needsReliefEndOfShift.length > 0 && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Will Need Relief at End of Shift</p>
                      <div className="space-y-2">
                        {selectedCell.data.reliefDetails.needsReliefEndOfShift.map((staff: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded border-2 border-amber-200">
                            <p className="font-semibold text-gray-900">{staff.name}</p>
                            <p className="text-xs text-gray-600">{staff.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'overrun' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg text-center border-2 ${
                    selectedCell.value > 20 ? 'bg-red-50 border-red-200' :
                    selectedCell.value > 10 ? 'bg-orange-50 border-orange-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <p className="text-sm text-gray-600 mb-2">Overrun Percentage</p>
                    <p className={`text-6xl font-semibold ${
                      selectedCell.value > 20 ? 'text-red-600' :
                      selectedCell.value > 10 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>{selectedCell.value}%</p>
                  </div>
                  {selectedCell.data.overrunDetails && (
                    <>
                      <div className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Why Overrunning:</p>
                        <p className="text-sm text-gray-700">{selectedCell.data.overrunDetails.explanation}</p>
                      </div>
                      <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Forecast:</p>
                        <p className="text-sm text-gray-700">{selectedCell.data.overrunDetails.forecast}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {selectedCell.type === 'status' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg text-center border-2 border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Current Status</p>
                    <p className="text-3xl font-semibold text-blue-900">{selectedCell.value}</p>
                  </div>
                  {selectedCell.data.statusTimestamps && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Status Timestamps:</p>
                      {selectedCell.data.statusTimestamps.sent && (
                        <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          <span className="text-sm font-semibold text-gray-700">Patient Sent</span>
                          <span className="text-sm font-semibold text-yellow-700">{selectedCell.data.statusTimestamps.sent}</span>
                        </div>
                      )}
                      {selectedCell.data.statusTimestamps.anaes && (
                        <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200">
                          <span className="text-sm font-semibold text-gray-700">Anaesthetics</span>
                          <span className="text-sm font-semibold text-purple-700">{selectedCell.data.statusTimestamps.anaes}</span>
                        </div>
                      )}
                      {selectedCell.data.statusTimestamps.inTheatre && (
                        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <span className="text-sm font-semibold text-gray-700">In Theatre</span>
                          <span className="text-sm font-semibold text-blue-700">{selectedCell.data.statusTimestamps.inTheatre}</span>
                        </div>
                      )}
                      {selectedCell.data.statusTimestamps.start && (
                        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="text-sm font-semibold text-gray-700">Surgery Started</span>
                          <span className="text-sm font-semibold text-green-700">{selectedCell.data.statusTimestamps.start}</span>
                        </div>
                      )}
                      {selectedCell.data.statusTimestamps.finish && (
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <span className="text-sm font-semibold text-gray-700">Surgery Finished</span>
                          <span className="text-sm font-semibold text-gray-700">{selectedCell.data.statusTimestamps.finish}</span>
                        </div>
                      )}
                      {selectedCell.data.statusTimestamps.recovery && (
                        <div className="flex items-center justify-between bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                          <span className="text-sm font-semibold text-gray-700">In Recovery</span>
                          <span className="text-sm font-semibold text-cyan-700">{selectedCell.data.statusTimestamps.recovery}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedCell.type === 'meal' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg text-center border-2 ${
                    selectedCell.value === 'taken' ? 'bg-green-50 border-green-200' :
                    selectedCell.value === 'overdue' ? 'bg-red-50 border-red-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <p className="text-sm text-gray-600 mb-2">Team Meal Status</p>
                    <p className={`text-3xl font-semibold ${
                      selectedCell.value === 'taken' ? 'text-green-600' :
                      selectedCell.value === 'overdue' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {selectedCell.value === 'taken' ? '✓ Taken' :
                       selectedCell.value === 'overdue' ? '🔴 Overdue' :
                       '⏳ Pending'}
                    </p>
                  </div>
                  {selectedCell.data.mealBreaks && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border-2 ${
                        selectedCell.data.mealBreaks.teaBreak.status === 'taken' ? 'bg-green-50 border-green-200' :
                        selectedCell.data.mealBreaks.teaBreak.status === 'overdue' ? 'bg-red-50 border-red-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Tea Break</p>
                        <p className={`text-xl font-semibold ${
                          selectedCell.data.mealBreaks.teaBreak.status === 'taken' ? 'text-green-600' :
                          selectedCell.data.mealBreaks.teaBreak.status === 'overdue' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {selectedCell.data.mealBreaks.teaBreak.status === 'taken' ? '✓ Taken' :
                           selectedCell.data.mealBreaks.teaBreak.status === 'overdue' ? '🔴 Overdue' :
                           '⏳ Pending'}
                        </p>
                        {selectedCell.data.mealBreaks.teaBreak.time && (
                          <p className="text-xs text-gray-600 mt-1">at {selectedCell.data.mealBreaks.teaBreak.time}</p>
                        )}
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${
                        selectedCell.data.mealBreaks.lunchBreak.status === 'taken' ? 'bg-green-50 border-green-200' :
                        selectedCell.data.mealBreaks.lunchBreak.status === 'overdue' ? 'bg-red-50 border-red-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Lunch Break</p>
                        <p className={`text-xl font-semibold ${
                          selectedCell.data.mealBreaks.lunchBreak.status === 'taken' ? 'text-green-600' :
                          selectedCell.data.mealBreaks.lunchBreak.status === 'overdue' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {selectedCell.data.mealBreaks.lunchBreak.status === 'taken' ? '✓ Taken' :
                           selectedCell.data.mealBreaks.lunchBreak.status === 'overdue' ? '🔴 Overdue' :
                           '⏳ Pending'}
                        </p>
                        {selectedCell.data.mealBreaks.lunchBreak.time && (
                          <p className="text-xs text-gray-600 mt-1">at {selectedCell.data.mealBreaks.lunchBreak.time}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
