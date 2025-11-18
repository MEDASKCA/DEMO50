'use client';

import React, { useState, useEffect } from 'react';
import { Users, Calendar, Save, X, Trash2 } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, startOfDay, isSameDay } from 'date-fns';

interface Consultant {
  id: string;
  name: string;
  role: string;
  specialties: string[];
}

interface DayConfiguration {
  date: string;
  theatreId: string;
  sessionTypeId: string;
  specialty?: string;
  consultantSurgeonId?: string;
  assistingSurgeonId?: string;
  consultantAnaesthetistId?: string;
  assistingAnaesthetistId?: string;
}

interface Theatre {
  id: string;
  name: string;
  unitId?: string;
  theatreType?: string;
}

interface StaffRole {
  id: string;
  role: string;
  count: number;
}

// Auxiliary roles (per unit per day)
const AUXILIARY_ROLES = [
  'Floor Coordinator',
  'Anaes N/P Bleep',
  'Anaes N/P Support',
  'Scrub N/P (Orthopaedic) Floater'
];

// Night staff roles (per unit per night)
const NIGHT_STAFF_ROLES = [
  'Night Floor Coordinator',
  'Night Anaes N/P',
  'Night Scrub N/P',
  'Night HCA'
];

// Default auxiliary staffing per unit per day
const DEFAULT_AUXILIARY_STAFFING: StaffRole[] = [
  { id: 'default-floor-coord', role: 'Floor Coordinator', count: 1 },
  { id: 'default-anaes-bleep', role: 'Anaes N/P Bleep', count: 2 },
  { id: 'default-anaes-support', role: 'Anaes N/P Support', count: 1 },
  { id: 'default-ortho-floater', role: 'Scrub N/P (Orthopaedic) Floater', count: 1 }
];

// Default night staffing per unit per night
const DEFAULT_NIGHT_STAFFING: StaffRole[] = [
  { id: 'default-night-floor-coord', role: 'Night Floor Coordinator', count: 1 },
  { id: 'default-night-scrub', role: 'Night Scrub N/P', count: 6 },
  { id: 'default-night-anaes', role: 'Night Anaes N/P', count: 3 },
  { id: 'default-night-hca', role: 'Night HCA', count: 2 }
];

// Available theatre roles
const THEATRE_ROLES = [
  'Scrub N/P',
  'Anaes N/P',
  'Recovery N/P',
  'HCA',
  'Surgical Care Practitioner',
  'Theatre Nurse Assistant',
  'Senior Sister/Charge Nurse',
  'Matron',
  'Theatre Manager',
  'Clinical Services Manager'
];

export default function StaffAllocationContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlStartDate = searchParams?.get('start');
  const initialDate = urlStartDate ? new Date(urlStartDate) : new Date('2025-10-01');

  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(initialDate, { weekStartsOn: 1 }));
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [configurations, setConfigurations] = useState<DayConfiguration[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('all');
  const [staffAllocations, setStaffAllocations] = useState<Map<string, StaffRole[]>>(new Map());
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<DayConfiguration | null>(null);
  const [currentRoles, setCurrentRoles] = useState<StaffRole[]>([]);
  const [auxiliaryStaffing, setAuxiliaryStaffing] = useState<Map<string, StaffRole[]>>(new Map());
  const [showAuxiliaryModal, setShowAuxiliaryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentAuxiliaryRoles, setCurrentAuxiliaryRoles] = useState<StaffRole[]>([]);
  const [nightStaffing, setNightStaffing] = useState<Map<string, StaffRole[]>>(new Map());
  const [showNightStaffModal, setShowNightStaffModal] = useState(false);
  const [currentNightRoles, setCurrentNightRoles] = useState<StaffRole[]>([]);
  const [showDailySummary, setShowDailySummary] = useState(false);
  const [summaryDate, setSummaryDate] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [currentWeekStart]);

  const weekStart = currentWeekStart;
  const weekEnd = addDays(weekStart, 83);
  const weekDays = Array.from({ length: 84 }, (_, i) => addDays(weekStart, i));
  const today = startOfDay(new Date());

  const loadData = async () => {
    setLoading(true);
    try {
      const { getTheatres } = await import('@/lib/scheduling/theatreService');
      const loadedTheatres = await getTheatres();
      setTheatres(loadedTheatres);

      const { loadCalendarConfigurations } = await import('@/lib/scheduling/theatreService');
      const theatreIds = loadedTheatres.map(t => t.id);
      const loadedConfigs = await loadCalendarConfigurations(weekStart, weekEnd, theatreIds);
      setConfigurations(loadedConfigs);

      const { collection, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const consultantsSnapshot = await getDocs(collection(db, 'consultants'));
      const loadedConsultants = consultantsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Consultant[];
      setConsultants(loadedConsultants);

      const staffAllocationsSnapshot = await getDocs(collection(db, 'staffAllocations'));
      const loadedAllocations = new Map<string, StaffRole[]>();
      staffAllocationsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        loadedAllocations.set(data.sessionId, data.roles || []);
      });
      setStaffAllocations(loadedAllocations);

      const auxiliarySnapshot = await getDocs(collection(db, 'auxiliaryStaffing'));
      const loadedAuxiliary = new Map<string, StaffRole[]>();
      auxiliarySnapshot.docs.forEach(doc => {
        const data = doc.data();
        loadedAuxiliary.set(data.date, data.roles || []);
      });
      setAuxiliaryStaffing(loadedAuxiliary);

      const nightStaffingSnapshot = await getDocs(collection(db, 'nightStaffing'));
      const loadedNightStaffing = new Map<string, StaffRole[]>();
      nightStaffingSnapshot.docs.forEach(doc => {
        const data = doc.data();
        loadedNightStaffing.set(data.date, data.roles || []);
      });
      setNightStaffing(loadedNightStaffing);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConfigurations = configurations.filter(config => {
    if (selectedSpecialty !== 'all' && config.specialty !== selectedSpecialty) return false;
    if (selectedSessionType !== 'all' && config.sessionTypeId !== selectedSessionType) return false;
    return config.sessionTypeId !== 'closed';
  });

  const configsByDate = filteredConfigurations.reduce((acc, config) => {
    if (!acc[config.date]) {
      acc[config.date] = [];
    }
    acc[config.date].push(config);
    return acc;
  }, {} as Record<string, DayConfiguration[]>);

  const getConsultantLastName = (id?: string): string => {
    if (!id) return '';
    const consultant = consultants.find(c => c.id === id);
    return consultant?.name?.split(' ').pop()?.toUpperCase() || '';
  };

  const getTheatreName = (theatreId: string): string => {
    const theatre = theatres.find(t => t.id === theatreId);
    return theatre?.name || theatreId;
  };

  const specialties = Array.from(new Set(configurations.map(c => c.specialty).filter(Boolean))) as string[];
  const sessionTypes = Array.from(new Set(configurations.map(c => c.sessionTypeId).filter(s => s !== 'closed')));

  const openStaffModal = (config: DayConfiguration) => {
    setSelectedSession(config);
    const sessionId = `${config.theatreId}-${config.date}`;
    const existingRoles = staffAllocations.get(sessionId);

    if (!existingRoles || existingRoles.length === 0) {
      const theatre = theatres.find(t => t.id === config.theatreId);
      const isEmergency = theatre?.theatreType === 'emergency';
      const defaultRoles: StaffRole[] = [
        { id: 'default-anaes', role: 'Anaes N/P', count: 1 },
        { id: 'default-scrub', role: 'Scrub N/P', count: isEmergency ? 3 : 2 },
        { id: 'default-hca', role: 'HCA', count: 1 }
      ];
      setCurrentRoles(defaultRoles.map(role => ({
        ...role,
        id: `${role.role}-${Date.now()}-${Math.random()}`
      })));
    } else {
      setCurrentRoles(existingRoles);
    }
    setShowStaffModal(true);
  };

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const addRole = (role: string) => {
    setCurrentRoles([...currentRoles, { id: `role-${Date.now()}`, role, count: 1 }]);
  };

  const updateRoleCount = (roleId: string, count: number) => {
    setCurrentRoles(currentRoles.map(r =>
      r.id === roleId ? { ...r, count: Math.max(0, count) } : r
    ));
  };

  const removeRole = (roleId: string) => {
    setCurrentRoles(currentRoles.filter(r => r.id !== roleId));
  };

  const saveStaffAllocation = async () => {
    if (!selectedSession) return;

    try {
      const sessionId = `${selectedSession.theatreId}-${selectedSession.date}`;
      const roles = currentRoles.filter(r => r.count > 0);
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      await setDoc(doc(db, 'staffAllocations', sessionId), {
        sessionId,
        theatreId: selectedSession.theatreId,
        date: selectedSession.date,
        sessionTypeId: selectedSession.sessionTypeId,
        specialty: selectedSession.specialty || '',
        consultantSurgeonId: selectedSession.consultantSurgeonId || '',
        assistingSurgeonId: selectedSession.assistingSurgeonId || '',
        consultantAnaesthetistId: selectedSession.consultantAnaesthetistId || '',
        assistingAnaesthetistId: selectedSession.assistingAnaesthetistId || '',
        roles,
        updatedAt: new Date().toISOString()
      });

      const newAllocations = new Map(staffAllocations);
      newAllocations.set(sessionId, roles);
      setStaffAllocations(newAllocations);
      setShowStaffModal(false);
      setSelectedSession(null);
      setCurrentRoles([]);
    } catch (error) {
      console.error('Error saving staff allocation:', error);
      alert('Failed to save staff allocation. Please try again.');
    }
  };

  const getSessionStaffCount = (theatreId: string, date: string): number => {
    const sessionId = `${theatreId}-${date}`;
    const roles = staffAllocations.get(sessionId) || [];
    return roles.reduce((sum, role) => sum + role.count, 0);
  };

  const openAuxiliaryModal = (date: string) => {
    setSelectedDate(date);
    const existing = auxiliaryStaffing.get(date);
    if (!existing || existing.length === 0) {
      setCurrentAuxiliaryRoles(DEFAULT_AUXILIARY_STAFFING.map(role => ({
        ...role,
        id: `${role.role}-${Date.now()}-${Math.random()}`
      })));
    } else {
      setCurrentAuxiliaryRoles(existing);
    }
    setShowAuxiliaryModal(true);
  };

  const addAuxiliaryRole = (role: string) => {
    setCurrentAuxiliaryRoles([...currentAuxiliaryRoles, { id: `role-${Date.now()}`, role, count: 1 }]);
  };

  const updateAuxiliaryRoleCount = (roleId: string, count: number) => {
    setCurrentAuxiliaryRoles(currentAuxiliaryRoles.map(r =>
      r.id === roleId ? { ...r, count: Math.max(0, count) } : r
    ));
  };

  const removeAuxiliaryRole = (roleId: string) => {
    setCurrentAuxiliaryRoles(currentAuxiliaryRoles.filter(r => r.id !== roleId));
  };

  const saveAuxiliaryStaffing = async () => {
    if (!selectedDate) return;
    try {
      const roles = currentAuxiliaryRoles.filter(r => r.count > 0);
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      await setDoc(doc(db, 'auxiliaryStaffing', selectedDate), {
        date: selectedDate,
        roles,
        updatedAt: new Date().toISOString()
      });

      const newAuxiliary = new Map(auxiliaryStaffing);
      newAuxiliary.set(selectedDate, roles);
      setAuxiliaryStaffing(newAuxiliary);
      setShowAuxiliaryModal(false);
      setSelectedDate('');
      setCurrentAuxiliaryRoles([]);
    } catch (error) {
      console.error('Error saving auxiliary staffing:', error);
      alert('Failed to save auxiliary staffing. Please try again.');
    }
  };

  const getAuxiliaryStaffCount = (date: string): number => {
    const roles = auxiliaryStaffing.get(date) || [];
    return roles.reduce((sum, role) => sum + role.count, 0);
  };

  const openNightStaffModal = (date: string) => {
    setSelectedDate(date);
    const existing = nightStaffing.get(date);
    if (!existing || existing.length === 0) {
      setCurrentNightRoles(DEFAULT_NIGHT_STAFFING.map(role => ({
        ...role,
        id: `${role.role}-${Date.now()}-${Math.random()}`
      })));
    } else {
      setCurrentNightRoles([...existing]);
    }
    setShowNightStaffModal(true);
  };

  const addNightRole = (roleName: string) => {
    setCurrentNightRoles([...currentNightRoles, { id: `night-${Date.now()}-${Math.random()}`, role: roleName, count: 1 }]);
  };

  const updateNightRoleCount = (roleId: string, count: number) => {
    setCurrentNightRoles(currentNightRoles.map(role =>
      role.id === roleId ? { ...role, count } : role
    ));
  };

  const removeNightRole = (roleId: string) => {
    setCurrentNightRoles(currentNightRoles.filter(role => role.id !== roleId));
  };

  const saveNightStaffing = async () => {
    if (!selectedDate) return;
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      await setDoc(doc(db, 'nightStaffing', selectedDate), {
        date: selectedDate,
        roles: currentNightRoles,
        updatedAt: new Date().toISOString()
      });

      const updated = new Map(nightStaffing);
      updated.set(selectedDate, currentNightRoles);
      setNightStaffing(updated);
      setShowNightStaffModal(false);
      setSelectedDate('');
      setCurrentNightRoles([]);
    } catch (error) {
      console.error('Error saving night staffing:', error);
      alert('Failed to save night staffing. Please try again.');
    }
  };

  const getNightStaffCount = (date: string): number => {
    const roles = nightStaffing.get(date) || [];
    return roles.reduce((sum, role) => sum + role.count, 0);
  };

  const calculateDailySummary = (date: string) => {
    const dayConfigs = configsByDate[date] || [];
    const roleTally = new Map<string, number>();
    const roleByShiftType = new Map<string, { day: number; longDay: number; night: number }>();

    dayConfigs.forEach(config => {
      const sessionId = `${config.theatreId}-${date}`;
      const allocation = staffAllocations.get(sessionId);

      if (allocation) {
        allocation.forEach(role => {
          const current = roleTally.get(role.role) || 0;
          roleTally.set(role.role, current + role.count);

          if (!roleByShiftType.has(role.role)) {
            roleByShiftType.set(role.role, { day: 0, longDay: 0, night: 0 });
          }
          const shiftCounts = roleByShiftType.get(role.role)!;

          if (config.sessionTypeId === 'long-day') {
            shiftCounts.longDay += role.count;
          } else if (config.sessionTypeId === 'day') {
            shiftCounts.day += role.count;
          } else if (config.sessionTypeId === 'night') {
            shiftCounts.night += role.count;
          } else {
            shiftCounts.day += role.count;
          }
        });
      }
    });

    const auxRoles = auxiliaryStaffing.get(date) || [];
    auxRoles.forEach(role => {
      const current = roleTally.get(role.role) || 0;
      roleTally.set(role.role, current + role.count);
      if (!roleByShiftType.has(role.role)) {
        roleByShiftType.set(role.role, { day: 0, longDay: 0, night: 0 });
      }
      const shiftCounts = roleByShiftType.get(role.role)!;
      shiftCounts.day += role.count;
    });

    const nightRoles = nightStaffing.get(date) || [];
    nightRoles.forEach(role => {
      const normalizedRole = role.role.replace(/^Night\s+/i, '');
      const current = roleTally.get(normalizedRole) || 0;
      roleTally.set(normalizedRole, current + role.count);
      if (!roleByShiftType.has(normalizedRole)) {
        roleByShiftType.set(normalizedRole, { day: 0, longDay: 0, night: 0 });
      }
      const shiftCounts = roleByShiftType.get(normalizedRole)!;
      shiftCounts.night += role.count;
    });

    const totalStaff = Array.from(roleTally.values()).reduce((sum, count) => sum + count, 0);
    const totalSessions = dayConfigs.length;

    return {
      roleTally,
      roleByShiftType,
      totalStaff,
      totalSessions,
      auxiliaryCount: auxRoles.reduce((sum, r) => sum + r.count, 0),
      nightCount: nightRoles.reduce((sum, r) => sum + r.count, 0)
    };
  };

  const openDailySummary = (date: string) => {
    setSummaryDate(date);
    setShowDailySummary(true);
  };

  return (
    <>
      {/* Week Navigation and Filters */}
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">
                {format(weekStart, 'MMMM d')} - {format(weekEnd, 'MMMM d, yyyy')}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-500">12 weeks • Scroll horizontally to view all dates →</p>
            </div>
            <button
              onClick={goToToday}
              className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md"
            >
              Jump to Today
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 border border-gray-300 rounded-md text-[10px] sm:text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            >
              <option value="all">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <select
              value={selectedSessionType}
              onChange={(e) => setSelectedSessionType(e.target.value)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 border border-gray-300 rounded-md text-[10px] sm:text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            >
              <option value="all">All Sessions</option>
              {sessionTypes.map(sessionType => (
                <option key={sessionType} value={sessionType}>{sessionType}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading staff allocation data...</p>
        </div>
      )}

      {!loading && (
        <>
          <style dangerouslySetInnerHTML={{
            __html: `
              .custom-scrollbar::-webkit-scrollbar {
                width: 12px;
                height: 12px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #e5e7eb;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
                border-radius: 10px;
                border: 2px solid #e5e7eb;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #1e40af 0%, #0891b2 100%);
              }
            `
          }} />
          <div
            className="custom-scrollbar bg-white rounded-lg shadow-md overflow-x-auto overflow-y-auto"
            style={{
              maxHeight: 'calc(100vh - 300px)',
              scrollbarWidth: 'auto',
              scrollbarColor: '#0ea5e9 #e5e7eb'
            }}
          >
            <table className="border-collapse text-[10px] md:text-xs" style={{ minWidth: '200%' }}>
            <thead>
              <tr style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}} className="text-white">
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[11px] md:text-sm font-semibold sticky left-0 z-10 min-w-[90px] md:min-w-[120px]" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}}>
                  Theatre
                </th>
                {weekDays.map(day => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const summary = calculateDailySummary(dateStr);
                  const isToday = isSameDay(day, today);
                  return (
                    <th key={day.toISOString()} className={`px-2 md:px-3 py-2 md:py-3 text-center text-[10px] md:text-sm font-semibold min-w-[120px] md:min-w-[140px] ${isToday ? 'bg-cyan-400 text-black' : ''}`}>
                      <div className={`text-[11px] md:text-base ${isToday ? 'font-bold' : ''}`}>{format(day, 'EEE')}</div>
                      <div className={`text-[9px] md:text-xs font-normal ${isToday ? 'font-semibold' : ''}`}>{format(day, 'd/M')}</div>
                      {isToday && <div className="text-[8px] font-bold">TODAY</div>}
                      <button
                        onClick={() => openDailySummary(dateStr)}
                        className={`mt-1 px-2 py-0.5 text-[9px] rounded transition-colors font-normal ${isToday ? 'bg-orange-700 hover:bg-orange-800 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                      >
                        {summary.totalStaff} staff
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Auxiliary Staff Row */}
              <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-300">
                <td className="px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-sm font-bold text-amber-900 sticky left-0 bg-amber-100 border-r border-amber-300 z-10">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Auxiliary Staff</span>
                  </div>
                </td>
                {weekDays.map(day => {
                  const dayStr = format(day, 'yyyy-MM-dd');
                  const auxStaffCount = getAuxiliaryStaffCount(dayStr);
                  const auxRoles = auxiliaryStaffing.get(dayStr) || [];
                  const hasSessions = (configsByDate[dayStr] || []).length > 0;

                  return (
                    <td key={`aux-${dayStr}`} className="px-1.5 md:px-2 py-1.5 md:py-2 border-r border-amber-200">
                      {hasSessions ? (
                        <div className="space-y-1 bg-amber-50 p-1.5 md:p-2 rounded border border-amber-200">
                          {auxStaffCount > 0 ? (
                            <div className="space-y-0.5">
                              {auxRoles.map(role => (
                                <div key={role.id} className="text-[9px] text-amber-800 truncate">
                                  {role.count}x {role.role.replace('Anaes N/P', 'A').replace('Scrub N/P', 'S').replace('Floor Coordinator', 'FC').replace('(Orthopaedic) Floater', 'Float')}
                                </div>
                              ))}
                              <div className="text-[9px] text-amber-900 font-bold bg-amber-100 px-1.5 py-0.5 rounded mt-1">
                                ✓ {auxStaffCount} total
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-amber-400 text-[9px]">Not set</div>
                          )}
                          <button
                            onClick={() => openAuxiliaryModal(dayStr)}
                            className="w-full px-1.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-medium rounded transition-colors mt-1"
                          >
                            {auxStaffCount > 0 ? 'Edit' : '+Aux'}
                          </button>
                        </div>
                      ) : (
                        <div className="h-full bg-gray-100 text-gray-500 text-[9px] font-medium flex items-center justify-center py-3 rounded text-center">
                          NO SESSIONS<br/>BOOKED
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Night Staff Row */}
              <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-300">
                <td className="px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-sm font-bold text-indigo-900 sticky left-0 bg-indigo-100 border-r border-indigo-300 z-10">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Night Staff</span>
                  </div>
                </td>
                {weekDays.map(day => {
                  const dayStr = format(day, 'yyyy-MM-dd');
                  const nightStaffCount = getNightStaffCount(dayStr);
                  const nightRoles = nightStaffing.get(dayStr) || [];
                  const hasSessions = (configsByDate[dayStr] || []).length > 0;

                  return (
                    <td key={`night-${dayStr}`} className="px-1.5 md:px-2 py-1.5 md:py-2 border-r border-indigo-200">
                      {hasSessions ? (
                        <div className="space-y-1 bg-indigo-50 p-1.5 md:p-2 rounded border border-indigo-200">
                          {nightStaffCount > 0 ? (
                            <div className="space-y-0.5">
                              {nightRoles.map(role => (
                                <div key={role.id} className="text-[9px] text-indigo-800 truncate">
                                  {role.count}x {role.role.replace('Night Floor Coordinator', 'In Charge ⭐').replace('Night Anaes N/P', 'Anaes N/P').replace('Night Scrub N/P', 'Scrub N/P').replace('Night HCA', 'HCA')}
                                </div>
                              ))}
                              <div className="text-[9px] text-indigo-900 font-bold bg-indigo-100 px-1.5 py-0.5 rounded mt-1">
                                ✓ {nightStaffCount} total
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-indigo-400 text-[9px]">Not set</div>
                          )}
                          <button
                            onClick={() => openNightStaffModal(dayStr)}
                            className="w-full px-1.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-medium rounded transition-colors mt-1"
                          >
                            {nightStaffCount > 0 ? 'Edit' : '+Night'}
                          </button>
                        </div>
                      ) : (
                        <div className="h-full bg-gray-100 text-gray-500 text-[9px] font-medium flex items-center justify-center py-3 rounded text-center">
                          NO SESSIONS<br/>BOOKED
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Theatre Rows */}
              {theatres.map(theatre => {
                const theatreConfigs = filteredConfigurations.filter(c => c.theatreId === theatre.id);
                if (theatreConfigs.length === 0) return null;

                return (
                  <tr key={theatre.id} className="hover:bg-gray-50">
                    <td className="px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-sm font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-200">
                      <div className="truncate max-w-[90px] md:max-w-none">{theatre.name}</div>
                    </td>
                    {weekDays.map(day => {
                      const dayStr = format(day, 'yyyy-MM-dd');
                      const config = theatreConfigs.find(c => c.date === dayStr);
                      const sessionId = config ? `${config.theatreId}-${config.date}` : '';
                      const staffCount = config ? getSessionStaffCount(config.theatreId, config.date) : 0;
                      const sessionRoles = config ? (staffAllocations.get(sessionId) || []) : [];
                      const consultantSurgeon = config ? getConsultantLastName(config.consultantSurgeonId) : '';
                      const assistingSurgeon = config ? getConsultantLastName(config.assistingSurgeonId) : '';
                      const consultantAnaes = config ? getConsultantLastName(config.consultantAnaesthetistId) : '';
                      const assistingAnaes = config ? getConsultantLastName(config.assistingAnaesthetistId) : '';

                      return (
                        <td key={`${theatre.id}-${dayStr}`} className="px-1.5 md:px-2 py-1.5 md:py-2 border-r border-gray-100">
                          {config ? (
                            <div className="space-y-1 bg-gray-50 p-1.5 md:p-2 rounded border border-gray-200">
                              <div className="flex items-center justify-between gap-1">
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-medium rounded truncate max-w-[50px]">
                                  {config.sessionTypeId}
                                </span>
                                {config.specialty && (
                                  <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[9px] font-medium rounded truncate max-w-[50px]">
                                    {config.specialty}
                                  </span>
                                )}
                              </div>

                              <div className="text-[9px] text-gray-700 truncate">
                                <span className="font-semibold">S:</span> {consultantSurgeon || 'N/A'}
                                {assistingSurgeon && <span className="text-gray-500">/{assistingSurgeon}</span>}
                              </div>

                              <div className="text-[9px] text-gray-700 truncate">
                                <span className="font-semibold">A:</span> {consultantAnaes || 'N/A'}
                                {assistingAnaes && <span className="text-gray-500">/{assistingAnaes}</span>}
                              </div>

                              {staffCount > 0 ? (
                                <div className="space-y-0.5">
                                  {(() => {
                                    const anaesRoles = sessionRoles.filter(r => r.role.includes('Anaes'));
                                    const scrubRoles = sessionRoles.filter(r => r.role.includes('Scrub'));
                                    const hcaRoles = sessionRoles.filter(r => r.role.includes('HCA'));
                                    const otherRoles = sessionRoles.filter(r =>
                                      !r.role.includes('Anaes') &&
                                      !r.role.includes('Scrub') &&
                                      !r.role.includes('HCA')
                                    );

                                    return (
                                      <>
                                        {anaesRoles.map(role => (
                                          <div key={role.id} className="text-[9px] text-gray-800 truncate">
                                            {role.count}x Anaes N/P
                                          </div>
                                        ))}
                                        {scrubRoles.map((role) => {
                                          if (role.count > 0) {
                                            return (
                                              <React.Fragment key={role.id}>
                                                <div className="text-[9px] text-gray-800 truncate">
                                                  1x Scrub N/P ⭐
                                                </div>
                                                {role.count > 1 && (
                                                  <div className="text-[9px] text-gray-800 truncate">
                                                    {role.count - 1}x Scrub N/P
                                                  </div>
                                                )}
                                              </React.Fragment>
                                            );
                                          }
                                          return null;
                                        })}
                                        {hcaRoles.map(role => (
                                          <div key={role.id} className="text-[9px] text-gray-800 truncate">
                                            {role.count}x HCA
                                          </div>
                                        ))}
                                        {otherRoles.map(role => (
                                          <div key={role.id} className="text-[9px] text-gray-800 truncate">
                                            {role.count}x {role.role.replace('Recovery N/P', 'Recovery').replace('Surgical Care Practitioner', 'SCP')}
                                          </div>
                                        ))}
                                      </>
                                    );
                                  })()}
                                  <div className="text-[9px] text-gray-900 font-bold bg-green-50 px-1.5 py-0.5 rounded mt-1">
                                    ✓ {staffCount} total
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-gray-400 text-[9px]">No staff</div>
                              )}

                              <button
                                onClick={() => openStaffModal(config)}
                                className="w-full px-1.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-medium rounded transition-colors"
                              >
                                {staffCount > 0 ? 'Edit' : '+Staff'}
                              </button>
                            </div>
                          ) : (
                            <div className="h-full bg-red-100 text-black text-[10px] font-semibold flex items-center justify-center py-3 rounded">
                              CLOSED
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {theatres.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600">Try adjusting your filters to see theatre sessions.</p>
            </div>
          )}
        </div>
        </>
      )}

      {/* Modals - Staff Allocation, Auxiliary, Night Staff, Daily Summary */}
      {showStaffModal && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="min-w-0">
                <h2 className="text-xl font-bold">Allocate Staff</h2>
                <p className="text-sm text-white/80 mt-1 truncate">
                  {getTheatreName(selectedSession.theatreId)} - {format(new Date(selectedSession.date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowStaffModal(false);
                  setSelectedSession(null);
                  setCurrentRoles([]);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Theatre Role</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addRole(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a role to add...</option>
                  {THEATRE_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {currentRoles.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No staff roles allocated yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Allocated Roles ({currentRoles.reduce((sum, r) => sum + r.count, 0)} total)</h3>
                  {currentRoles.map(role => (
                    <div key={role.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{role.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Count:</label>
                        <input
                          type="number"
                          min="0"
                          value={role.count}
                          onChange={(e) => updateRoleCount(role.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowStaffModal(false);
                  setSelectedSession(null);
                  setCurrentRoles([]);
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveStaffAllocation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuxiliaryModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Auxiliary Staff</h2>
                <p className="text-sm text-white/80 mt-1">
                  {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAuxiliaryModal(false);
                  setSelectedDate('');
                  setCurrentAuxiliaryRoles([]);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Auxiliary Role</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addAuxiliaryRole(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a role to add...</option>
                  {AUXILIARY_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {currentAuxiliaryRoles.length === 0 ? (
                <div className="text-center py-12 bg-amber-50 rounded-lg">
                  <Users className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <p className="text-gray-600">No auxiliary staff allocated yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Allocated Roles ({currentAuxiliaryRoles.reduce((sum, r) => sum + r.count, 0)} total)</h3>
                  {currentAuxiliaryRoles.map(role => (
                    <div key={role.id} className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{role.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Count:</label>
                        <input
                          type="number"
                          min="0"
                          value={role.count}
                          onChange={(e) => updateAuxiliaryRoleCount(role.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeAuxiliaryRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowAuxiliaryModal(false);
                  setSelectedDate('');
                  setCurrentAuxiliaryRoles([]);
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAuxiliaryStaffing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showNightStaffModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Night Staff</h2>
                <p className="text-sm text-white/80 mt-1">
                  {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNightStaffModal(false);
                  setSelectedDate('');
                  setCurrentNightRoles([]);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Night Staff Role</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addNightRole(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a role to add...</option>
                  {NIGHT_STAFF_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {currentNightRoles.length === 0 ? (
                <div className="text-center py-12 bg-indigo-50 rounded-lg">
                  <Users className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                  <p className="text-gray-600">No night staff allocated yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Allocated Roles ({currentNightRoles.reduce((sum, r) => sum + r.count, 0)} total)</h3>
                  {currentNightRoles.map(role => (
                    <div key={role.id} className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{role.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Count:</label>
                        <input
                          type="number"
                          min="0"
                          value={role.count}
                          onChange={(e) => updateNightRoleCount(role.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeNightRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowNightStaffModal(false);
                  setSelectedDate('');
                  setCurrentNightRoles([]);
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNightStaffing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDailySummary && summaryDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Daily Staffing Summary</h2>
                <p className="text-sm text-white/80 mt-1">
                  {format(new Date(summaryDate), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDailySummary(false);
                  setSummaryDate('');
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {(() => {
                const summary = calculateDailySummary(summaryDate);
                const dayConfigs = configsByDate[summaryDate] || [];

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-900">{summary.totalSessions}</div>
                        <div className="text-sm text-blue-700">Sessions</div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-900">{summary.totalStaff}</div>
                        <div className="text-sm text-green-700">Total Staff</div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="text-2xl font-bold text-amber-900">{summary.auxiliaryCount}</div>
                        <div className="text-sm text-amber-700">Auxiliary</div>
                      </div>
                    </div>

                    {dayConfigs.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          Theatre Sessions ({dayConfigs.length})
                        </h3>
                        <div className="space-y-2">
                          {dayConfigs.map((config, idx) => {
                            const sessionId = `${config.theatreId}-${summaryDate}`;
                            const allocation = staffAllocations.get(sessionId) || [];
                            const sessionStaffCount = allocation.reduce((sum, r) => sum + r.count, 0);

                            return (
                              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-gray-900">
                                    {getTheatreName(config.theatreId)}
                                  </div>
                                  <div className="text-sm font-semibold text-blue-600">
                                    {sessionStaffCount} staff
                                  </div>
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                  {config.specialty} • {config.sessionTypeId}
                                </div>
                                {allocation.length > 0 && (
                                  <div className="text-xs text-gray-700 space-y-1">
                                    {allocation.map((role, ridx) => (
                                      <div key={ridx} className="flex items-center justify-between">
                                        <span>{role.role}</span>
                                        <span className="font-medium">×{role.count}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {summary.roleTally.size > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Requirements by Shift Type
                        </h3>
                        <div className="space-y-3">
                          {Array.from(summary.roleTally.entries())
                            .sort((a, b) => b[1] - a[1])
                            .map(([role, count]) => {
                              const shiftCounts = summary.roleByShiftType.get(role) || { day: 0, longDay: 0, night: 0 };
                              return (
                                <div key={role} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 flex items-center justify-between">
                                    <span className="font-semibold">{role}</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                                      Total: {count}
                                    </span>
                                  </div>
                                  <div className="p-4">
                                    <div className="grid grid-cols-3 gap-3">
                                      <div className={`${shiftCounts.day > 0 ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'} border-2 rounded-lg p-3`}>
                                        <div className={`text-xs font-medium mb-1 ${shiftCounts.day > 0 ? 'text-blue-700' : 'text-gray-500'}`}>
                                          Day Shift
                                        </div>
                                        <div className={`text-2xl font-bold ${shiftCounts.day > 0 ? 'text-blue-900' : 'text-gray-400'}`}>
                                          {shiftCounts.day}
                                        </div>
                                      </div>
                                      <div className={`${shiftCounts.longDay > 0 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'} border-2 rounded-lg p-3`}>
                                        <div className={`text-xs font-medium mb-1 ${shiftCounts.longDay > 0 ? 'text-green-700' : 'text-gray-500'}`}>
                                          Long Day
                                        </div>
                                        <div className={`text-2xl font-bold ${shiftCounts.longDay > 0 ? 'text-green-900' : 'text-gray-400'}`}>
                                          {shiftCounts.longDay}
                                        </div>
                                      </div>
                                      <div className={`${shiftCounts.night > 0 ? 'bg-indigo-50 border-indigo-300' : 'bg-gray-50 border-gray-200'} border-2 rounded-lg p-3`}>
                                        <div className={`text-xs font-medium mb-1 ${shiftCounts.night > 0 ? 'text-indigo-700' : 'text-gray-500'}`}>
                                          Night
                                        </div>
                                        <div className={`text-2xl font-bold ${shiftCounts.night > 0 ? 'text-indigo-900' : 'text-gray-400'}`}>
                                          {shiftCounts.night}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {summary.totalStaff === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No staff requirements defined</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end">
              <button
                onClick={() => {
                  setShowDailySummary(false);
                  setSummaryDate('');
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
