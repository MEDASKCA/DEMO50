"use client";

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Radio,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { getShiftStatus, getShiftIndicator, isTheatreOperational } from '@/lib/utils/shiftHelpers';

import TheatreTimelineModal from './TheatreTimelineModal';
import TheatreTimelineModalWithCerner from './TheatreTimelineModalWithCerner';
import StaffReliefModal from './StaffReliefModal';
import StaffHoverCard from './StaffHoverCard';
import StaffCompetencyModal from './StaffCompetencyModal';
import StaffInfoMobileModal from './StaffInfoMobileModal';
import TheatreOpsModal from './TheatreOpsModal';
import StaffDutyModal from './StaffDutyModal';
import TurnoverTimeModal from './TurnoverTimeModal';
import EfficiencyScoreModal from './EfficiencyScoreModal';
import StaffContextMenu from './StaffContextMenu';
import { Bell } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function DashboardView() {
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showReliefModal, setShowReliefModal] = useState(false);
  const [selectedStaffForRelief, setSelectedStaffForRelief] = useState<any>(null);
  const [hoveredStaff, setHoveredStaff] = useState<any>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showCompetencyModal, setShowCompetencyModal] = useState(false);
  const [selectedStaffForCompetency, setSelectedStaffForCompetency] = useState<any>(null);
  const [showMobileStaffInfo, setShowMobileStaffInfo] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<'all' | 'main' | 'acad' | 'recovery'>('all');
  const [showTheatreOpsModal, setShowTheatreOpsModal] = useState(false);
  const [showStaffDutyModal, setShowStaffDutyModal] = useState(false);
  const [showTurnoverModal, setShowTurnoverModal] = useState(false);
  const [showEfficiencyModal, setShowEfficiencyModal] = useState(false);
  const [theatreAllocations, setTheatreAllocations] = useState<any[]>([]);
  const [isLoadingAllocations, setIsLoadingAllocations] = useState(true);
  const [avgTurnover, setAvgTurnover] = useState<number>(0);
  const [avgEfficiency, setAvgEfficiency] = useState<number>(0);
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; position: { x: number; y: number }; staff: any | null }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    staff: null
  });

  // --- Date helpers ---
  const makeDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState<string>(() => makeDateStr(new Date()));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const isTodaySelected = selectedDate === makeDateStr(new Date());

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Relative date label: Today / Yesterday / N days ago / In N days
  const relativeDateLabel = () => {
    const today = new Date();
    const sel = new Date(selectedDate + 'T00:00:00');
    const diffDays = Math.round((sel.getTime() - new Date(makeDateStr(today) + 'T00:00:00').getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  useEffect(() => {
    const fetchTheatreAllocations = async () => {
      if (!db) {
        console.warn('Firestore not initialized - using demo data');
        setIsLoadingAllocations(false);
        return;
      }
      try {
        const q = query(collection(db, 'theatreAllocations'), where('date', '==', selectedDate));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        data.sort((a: any, b: any) => a.theatreNumber - b.theatreNumber);

        const mapped = data.map((alloc: any) => ({
          theatre: alloc.theatreName,
          unit: alloc.unit,
          specialty: 'General Surgery',
          session: alloc.sessionType ? `${alloc.sessionType.startTime} - ${alloc.sessionType.endTime}` : '08:00 - 20:00',
          sessionsCount: alloc.sessionType?.sessionCount || 0,
          casesCompleted: alloc.status === 'in-use' ? 1 : 0,
          status: alloc.status === 'in-use' ? 'surgery_started' : alloc.status,
          patientStatus: alloc.status === 'in-use' ? 'Surgery Started' : alloc.status === 'ready' ? 'Ready' : 'CLOSED',
          currentProcedure: alloc.status === 'in-use' ? 'Surgery in Progress' : '',
          nextCase: alloc.status === 'ready' ? 'Next Case Scheduled' : '',
          surgeryStartTime: alloc.status === 'in-use' ? '08:50' : '',
          estimatedFinish: alloc.status === 'in-use' ? '10:30' : '',
          reliefRequired: alloc.reliefRequired || false,
          team: {
            surgeon: { name: alloc.team?.surgeon?.name || 'VACANT', shift: alloc.team?.surgeon?.shift || '' },
            assistant: { name: alloc.team?.assistant?.name || 'VACANT', shift: alloc.team?.assistant?.shift || '' },
            anaesthetist: { name: alloc.team?.anaesthetist?.name || 'VACANT', shift: alloc.team?.anaesthetist?.shift || '' },
            anaesNP: { name: alloc.team?.anaesNP?.name || 'VACANT', shift: alloc.team?.anaesNP?.shift || '' },
            scrubNP1: { name: alloc.team?.scrubNP1?.name || 'VACANT', shift: alloc.team?.scrubNP1?.shift || '', scrubbed: alloc.team?.scrubNP1?.scrubbed || false, etf: alloc.team?.scrubNP1?.scrubbed ? '10:30' : undefined },
            scrubNP2: { name: alloc.team?.scrubNP2?.name || 'VACANT', shift: alloc.team?.scrubNP2?.shift || '' },
            hca: { name: alloc.team?.hca?.name || 'VACANT', shift: alloc.team?.hca?.shift || '' }
          },
          alerts: alloc.status === 'closed' ? 'THEATRE CLOSED - No cases scheduled' : ''
        }));

        setTheatreAllocations(mapped);
        setIsLoadingAllocations(false);
      } catch (e) {
        console.error('Error fetching theatre allocations:', e);
        setIsLoadingAllocations(false);
      }
    };
    fetchTheatreAllocations();
  }, [selectedDate]);

  // Fetch efficiency and turnover data from Firebase
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!db) return;
      try {
        const efficiencyQuery = query(collection(db, 'theatre_efficiency'), where('date', '==', selectedDate));
        const efficiencySnap = await getDocs(efficiencyQuery);

        if (!efficiencySnap.empty) {
          const efficiencyData = efficiencySnap.docs.map(doc => doc.data());
          const avgEff = Math.round(
            efficiencyData.reduce((sum: number, item: any) => sum + (item.efficiencyScore || 0), 0) / efficiencyData.length
          );
          const avgTurn = Math.round(
            efficiencyData.reduce((sum: number, item: any) => sum + (item.turnoverTime || 0), 0) / efficiencyData.length
          );
          setAvgEfficiency(avgEff);
          setAvgTurnover(avgTurn);
        } else {
          // Default values if no data
          setAvgEfficiency(0);
          setAvgTurnover(0);
        }
      } catch (e) {
        console.error('Error fetching metrics:', e);
      }
    };
    fetchMetrics();
  }, [selectedDate]);

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(makeDateStr(d));
  };
  const goToToday = () => setSelectedDate(makeDateStr(new Date()));

  const formatTime = () => {
    if (!mounted) return '00:00:00';
    return currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // ——— Titles helper (with HCA rule) ———
  const addStaffTitle = (name: string, role: string): string => {
    if (!name || name === 'VACANT') return name;
    const stripped = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|RN|ODP|HCA)\s+/i, '').trim();
    if (/healthcare assistant/i.test(role) || /^hca\b/i.test(role)) {
      return `HCA ${stripped}`;
    }
    if (/^(Mr\.|Mrs\.|Ms\.|Dr\.|RN|ODP)\s+/i.test(name)) return name;
    if (/Consultant|Assistant/i.test(role)) return `Mr. ${stripped}`;
    if (/Anaesthetist/i.test(role)) return `Dr. ${stripped}`;
    if (/Nurse|Practitioner/i.test(role)) return `RN ${stripped}`;
    return stripped;
  };

  const handleTheatreClick = (theatreName: string) => {
    setSelectedTheatre(theatreName);
    setShowTimeline(true);
  };
  const handleReliefRequest = (staffName: string, role: string, theatre: string) => {
    setSelectedStaffForRelief({ name: staffName, role, theatre });
    setShowReliefModal(true);
  };
  const handleStaffHover = (e: React.MouseEvent, staffName: string, role: string) => {
    setHoveredStaff({ name: staffName, role, id: staffName });
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };
  const handleStaffClick = (staffName: string, role: string, theatre: string) => {
    setSelectedStaffForCompetency({ name: staffName, role, theatre });
    if (window.innerWidth < 1024) setShowMobileStaffInfo(true); else setShowCompetencyModal(true);
  };

  const handleStaffRightClick = (e: React.MouseEvent, staff: any, theatre: any) => {
    e.preventDefault();
    e.stopPropagation();

    // Only show context menu on desktop
    if (window.innerWidth >= 1024) {
      setContextMenu({
        isOpen: true,
        position: { x: e.clientX, y: e.clientY },
        staff: {
          name: staff.name,
          role: staff.role,
          theatre: theatre.theatre,
          theatreId: theatre.theatreId,
          shift: staff.shift
        }
      });
    }
  };

  const handleSendBreak = (type: 'meal' | 'tea') => {
    console.log(`Sending ${contextMenu.staff?.name} for ${type} break`);
    // TODO: Update Firebase to mark staff on break
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, staff: null });
  };

  const handleSwapStaff = (targetTheatreId: string, targetStaffKey: string) => {
    console.log(`Swapping ${contextMenu.staff?.name} with staff in ${targetTheatreId}`);
    // TODO: Update Firebase to swap staff
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, staff: null });
  };

  const filteredTheatres = theatreAllocations.filter(t => {
    if (selectedUnit === 'all') return t.unit !== 'recovery'; // Exclude recovery from "all"
    if (selectedUnit === 'main') return t.unit === 'main';
    if (selectedUnit === 'acad') return t.unit === 'acad';
    if (selectedUnit === 'recovery') return t.unit === 'recovery';
    return false;
  });

  const theatreStats = {
    running: selectedUnit === 'recovery'
      ? filteredTheatres.filter(t => t.status === 'occupied').length
      : filteredTheatres.filter(t => t.status !== 'closed').length,
    total: filteredTheatres.length
  };
  const staffCount = filteredTheatres.reduce((n, th) => {
    const team = th.team || {};
    return n + Object.values(team).filter((s: any) => s && s.name && s.name !== 'VACANT').length;
  }, 0);

  const calculateDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return '';
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const diff = (eh * 60 + em) - (sh * 60 + sm);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `${h}h ${m}min`;
    if (h > 0) return `${h}h`;
    return `${m}min`;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* content container aligned with header; wide enough so names fit */}
      <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 lg:px-6">
        {/* Top bar */}
        <div className="border-b border-gray-200 py-3 sm:py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button onClick={() => changeDate(-1)} className="p-1.5 hover:bg-white rounded transition-colors" title="Previous day">
                <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              <div className="flex items-center gap-2 px-3" suppressHydrationWarning>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-2">
                  <span className="text-sm sm:text-xl font-normal text-gray-900 leading-tight">
                    {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 leading-tight font-normal">{relativeDateLabel()}</span>
                </div>
              </div>
              <button onClick={() => changeDate(1)} className="p-1.5 hover:bg-white rounded transition-colors" title="Next day">
                <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>

            {!isTodaySelected ? (
              <button onClick={goToToday} className="px-3 py-1.5 text-xs font-normal bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-200 transition-colors">
                Today
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm sm:text-lg text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg" suppressHydrationWarning>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="font-mono font-normal">{formatTime()}</span>
              </div>
            )}
          </div>

          {isTodaySelected && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-normal text-green-700">Live</span>
            </div>
          )}
        </div>

        {/* Unit filters */}
        <div className="border-b border-gray-200 py-3">
          <div className="grid grid-cols-4 gap-2">
            {(['all','main','acad','recovery'] as const).map(k => (
              <button
                key={k}
                onClick={() => setSelectedUnit(k)}
                className={`px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-normal transition-all ${
                  selectedUnit === k
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {k === 'all' ? 'All' : k === 'main' ? 'Main' : k === 'acad' ? 'DSU' : 'Rec'}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs – now clickable */}
        <div className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Theatres */}
            <button
              type="button"
              onClick={() => setShowTheatreOpsModal(true)}
              className="text-left bg-white border border-gray-200 p-4 sm:p-5 rounded-xl hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-all active:scale-[0.98]"
              aria-label="Open theatres operational details"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">
                {selectedUnit === 'recovery' ? 'N/A' : `${theatreStats.running}/${theatreStats.total}`}
              </h3>
              <p className="text-gray-500 font-normal text-xs sm:text-sm">Theatres</p>
            </button>

            {/* Staff */}
            <button
              type="button"
              onClick={() => setShowStaffDutyModal(true)}
              className="text-left bg-white border border-gray-200 p-4 sm:p-5 rounded-xl hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-all active:scale-[0.98]"
              aria-label="Open staff-on-duty details"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">{staffCount}</h3>
              <p className="text-gray-500 font-normal text-xs sm:text-sm">Staff</p>
            </button>

            {/* Turnover */}
            <button
              type="button"
              onClick={() => setShowTurnoverModal(true)}
              className="text-left bg-white border border-gray-200 p-4 sm:p-5 rounded-xl hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-all active:scale-[0.98]"
              aria-label="Open turnover time details"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">{avgTurnover > 0 ? `${avgTurnover}m` : 'N/A'}</h3>
              <p className="text-gray-500 font-normal text-xs sm:text-sm">Turnover</p>
            </button>

            {/* Efficiency */}
            <button
              type="button"
              onClick={() => setShowEfficiencyModal(true)}
              className="text-left bg-white border border-gray-200 p-4 sm:p-5 rounded-xl hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-all active:scale-[0.98]"
              aria-label="Open efficiency score details"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">{avgEfficiency > 0 ? `${avgEfficiency}%` : 'N/A'}</h3>
              <p className="text-gray-500 font-normal text-xs sm:text-sm">Efficiency</p>
            </button>
          </div>
        </div>

        {/* Main content – one panel on mobile; two on desktop */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT */}
          <div className="w-full md:flex-1">
            {selectedUnit !== 'recovery' && (
              <section className="border-t md:border-t-0 md:border-r border-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg sm:text-xl font-normal text-gray-900">
                      {selectedUnit === 'all' ? 'All Theatres' : selectedUnit === 'main' ? 'Main Theatres' : 'DSU Theatres'}
                    </h2>
                  </div>
                </div>

                <div className="max-h[640px] md:max-h-[640px] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTheatres.map((allocation, idx) => (
                      <div
                        key={idx}
                        className={`p-5 sm:p-5 border border-gray-200 ${idx % 3 !== 2 ? 'lg:border-r' : ''} ${idx >= 1 ? 'border-t' : ''} cursor-pointer hover:bg-gray-50 transition-colors`}
                        onClick={() => handleTheatreClick(allocation.theatre)}
                      >
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-normal text-base sm:text-lg text-gray-900 flex items-center">
                              {allocation.theatre}
                              <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 ml-1 text-gray-400" />
                            </p>
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-normal ${
                                allocation.status === 'surgery_started'
                                  ? 'bg-green-100 text-green-700'
                                  : allocation.status === 'anaesthetic_room'
                                  ? 'bg-purple-100 text-purple-700'
                                  : allocation.status === 'patient_sent'
                                  ? 'bg-blue-100 text-blue-700'
                                  : allocation.status === 'standby'
                                  ? 'bg-gray-100 text-gray-600'
                                  : allocation.status === 'closed'
                                  ? 'bg-red-100 text-red-700'
                                  : allocation.status === 'paused'
                                  ? 'bg-orange-100 text-orange-700'
                                  : allocation.status === 'ready'
                                  ? 'bg-cyan-100 text-cyan-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                              title={allocation.status === 'paused' && allocation.pauseDuration ? `Paused for ${allocation.pauseDuration} minutes` : undefined}
                            >
                              {allocation.status === 'surgery_started' ? 'SURG'
                                : allocation.status === 'anaesthetic_room' ? 'ANAES'
                                : allocation.status === 'patient_sent' ? 'SENT'
                                : allocation.status === 'standby' ? 'STBY'
                                : allocation.status === 'closed' ? 'CLSD'
                                : allocation.status === 'paused' ? `PAUSED ${allocation.pauseDuration ? allocation.pauseDuration + 'm' : ''}`
                                : allocation.status === 'ready' ? 'READY' : 'OTHER'}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-700 font-normal mb-1">{allocation.specialty}</p>
                          <p className="text-xs sm:text-sm text-gray-500 font-normal">
                            {allocation.session}
                            {allocation.sessionsCount > 0 && ` • ${allocation.casesCompleted || 0}/${allocation.sessionsCount}`}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {Object.entries({
                            'Cons': { ...allocation.team.surgeon, role: allocation.team.surgeon?.role || 'Consultant Surgeon', fullLabel: 'Consultant' },
                            'Assist': { ...allocation.team.assistant, role: allocation.team.assistant?.role || 'Assistant Surgeon', fullLabel: 'Assistant' },
                            'Anaes': { ...allocation.team.anaesthetist, role: allocation.team.anaesthetist?.role || 'Consultant Anaesthetist', fullLabel: 'Anaesthetist' },
                            ...(allocation.team.assistantAnaes ? { 'Assist Anaes': { ...allocation.team.assistantAnaes, role: 'Assistant Anaesthetist', fullLabel: 'Assist Anaes' } } : {}),
                            'Anaes N/P': { ...allocation.team.anaesNP, role: 'Anaesthetic Nurse/Practitioner', fullLabel: 'Anaes N/P' },
                            ...(allocation.team.anaesNP2 ? { 'Anaes N/P 2': { ...allocation.team.anaesNP2, role: 'Anaesthetic Nurse/Practitioner', fullLabel: 'Anaes N/P 2' } } : {}),
                            'Scrub 1': { ...allocation.team.scrubNP1, role: 'Scrub Nurse/Practitioner', fullLabel: 'Scrub N/P 1' },
                            ...(allocation.team.scrubNP2 ? { 'Scrub 2': { ...allocation.team.scrubNP2, role: 'Scrub Nurse/Practitioner', fullLabel: 'Scrub N/P 2' } } : {}),
                            ...(allocation.team.scrubNP3 ? { 'Scrub 3': { ...allocation.team.scrubNP3, role: 'Scrub Nurse/Practitioner', fullLabel: 'Scrub N/P 3' } } : {}),
                            ...(allocation.team.hca ? { 'HCA': { ...allocation.team.hca, role: 'Healthcare Assistant', fullLabel: 'HCA' } } : {}),
                            ...(allocation.team.cellSaver ? { 'Cell Saver': { ...allocation.team.cellSaver, role: 'Cell Saver Practitioner', fullLabel: 'Cell Saver' } } : {})
                          } as Record<string, any>).map(([label, staff]) => {
                            if (!staff || !staff.name) return null;

                            // Get real-time shift status
                            const shiftStatus = isTodaySelected && staff.shift ? getShiftStatus(staff.shift, currentTime) : null;
                            const indicator = shiftStatus ? getShiftIndicator(shiftStatus) : null;

                            return (
                              <div key={label} className="flex items-center justify-between text-sm">
                                <div className="flex items-center flex-1 min-w-0">
                                  <span className={`text-xs mr-2 min-w-[70px] sm:min-w-[90px] font-normal ${staff.name === 'VACANT' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="lg:hidden">{label}:</span>
                                    <span className="hidden lg:inline">{staff.fullLabel || label}:</span>
                                  </span>
                                  {staff.name === 'VACANT' ? (
                                    <span className="text-gray-400 italic text-xs">Vacant</span>
                                  ) : (
                                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                                      <span
                                        className={`cursor-pointer font-normal text-xs sm:text-sm ${
                                          shiftStatus?.isPast ? 'text-gray-400 line-through' :
                                          shiftStatus?.isFuture ? 'text-gray-500 italic' :
                                          indicator?.color || 'text-gray-900'
                                        } hover:underline ${staff.notes ? 'underline decoration-dotted' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handleStaffClick(staff.name.replace(/[☕⚠️]/g, '').trim(), staff.role, allocation.theatre); }}
                                        onContextMenu={(e) => handleStaffRightClick(e, staff, allocation)}
                                        onMouseEnter={(e) => handleStaffHover(e, staff.name.replace(/[☕⚠️]/g, '').trim(), staff.role)}
                                        onMouseLeave={() => setHoveredStaff(null)}
                                        title={staff.notes || (shiftStatus?.isPast ? 'Shift ended' : shiftStatus?.isFuture ? 'Shift not started' : undefined)}
                                      >
                                        {(staff.title ? staff.title + ' ' : '') + addStaffTitle(staff.name.replace(/[☕⚠️]/g, '').trim(), staff.role)}
                                        {staff.notes && <span className="ml-1 text-orange-600">⚠</span>}
                                      </span>

                                      {/* Real-time status badge */}
                                      {indicator && isTodaySelected && (
                                        <span
                                          className={`text-[9px] px-2 py-0.5 rounded-full font-normal ${
                                            indicator.badge === 'BREAK' ? 'bg-blue-100 text-blue-700' :
                                            indicator.badge === 'RELIEF' ? 'bg-orange-100 text-orange-700' :
                                            indicator.badge === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-500'
                                          }`}
                                          title={indicator.tooltip}
                                        >
                                          {indicator.badge}
                                        </span>
                                      )}

                                      {staff.scrubbed && (
                                        <span
                                          className="text-[9px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-normal"
                                          title={allocation.surgeryStartTime && staff.etf ? `ETF: ${staff.etf} (${calculateDuration(allocation.surgeryStartTime, staff.etf)})` : 'Scrubbed in'}
                                        >
                                          Scrubbed
                                        </span>
                                      )}
                                      {(shiftStatus?.needsRelief || staff.name.includes('⚠️')) && (
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleReliefRequest(staff.name.replace(/[☕⚠️]/g, '').trim(), staff.role, allocation.theatre); }}
                                          className="flex-shrink-0"
                                          title="Urgent: Staff needs relief"
                                        >
                                          <Bell className="w-3 h-3 text-orange-500 fill-orange-200" />
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                                {staff.shift && staff.name !== 'VACANT' && (
                                  <span className={`text-[9px] ml-2 px-2 py-0.5 rounded-full font-normal ${
                                    indicator?.badge === 'RELIEF' ? 'bg-orange-50 text-orange-700' :
                                    indicator?.badge === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                                    indicator?.badge === 'BREAK' ? 'bg-blue-50 text-blue-700' :
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {staff.shift}
                                  </span>
                                )}
                              </div>
                            );
                          }).filter(Boolean)}
                        </div>

                        {allocation.alerts && (
                          <div className={`mt-3 text-xs px-3 py-2 rounded-lg border ${allocation.status === 'closed' ? 'text-red-700 bg-red-50 border-red-200 font-normal' : 'text-orange-700 bg-orange-50 border-orange-200 font-normal'}`}>
                            {allocation.status === 'closed' ? '⛔' : '⚠️'} {allocation.alerts}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {selectedUnit === 'recovery' && (
              <section className="border-t md:border-t-0 md:border-r border-gray-200">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recovery Bays</h2>
                    {isTodaySelected && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                        <Radio className="w-3 h-3 text-green-600 animate-pulse" />
                        <span className="text-xs font-semibold text-green-700">Live</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recovery Efficiency Metrics */}
                {(() => {
                  const recoveryUnits = theatreAllocations.filter(t => t.unit === 'recovery');

                  // Calculate metrics
                  let totalBays = 0;
                  let occupiedBays = 0;
                  let patientsReady = 0;
                  let longStayers = 0;

                  recoveryUnits.forEach(recovery => {
                    const bays = Object.entries(recovery.team).filter(([key]) => key.startsWith('bay'));
                    totalBays += bays.length;

                    bays.forEach(([, staff]: [string, any]) => {
                      if (staff.occupied) {
                        occupiedBays++;
                        // Long stayer if >2 hours (mock logic - would be real time calc)
                        if (Math.random() < 0.15) longStayers++;
                        // Ready for discharge if random
                        if (Math.random() < 0.3) patientsReady++;
                      }
                    });
                  });

                  const occupancyRate = totalBays > 0 ? Math.round((occupiedBays / totalBays) * 100) : 0;

                  return totalBays > 0 ? (
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Occupancy</p>
                          <p className={`text-2xl font-bold mt-1 ${
                            occupancyRate > 85 ? 'text-red-600' :
                            occupancyRate > 70 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {occupancyRate}%
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{occupiedBays}/{totalBays} bays</p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Ready</p>
                          <p className="text-2xl font-bold text-green-600 mt-1">{patientsReady}</p>
                          <p className="text-xs text-gray-500 mt-0.5">For discharge</p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Long Stay</p>
                          <p className="text-2xl font-bold text-orange-600 mt-1">{longStayers}</p>
                          <p className="text-xs text-gray-500 mt-0.5">&gt;2 hours</p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Avg Time</p>
                          <p className="text-2xl font-bold text-gray-700 mt-1">{Math.round(45 + Math.random() * 30)}m</p>
                          <p className="text-xs text-gray-500 mt-0.5">In recovery</p>
                        </div>
                      </div>

                      {longStayers > 2 && (
                        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-xs font-semibold text-orange-800 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Bottleneck Alert: {longStayers} patients awaiting ward beds
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null;
                })()}

                <div className="max-h-[640px] md:max-h-[640px] overflow-y-auto">
                  {theatreAllocations.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No recovery data available for {selectedDate}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {theatreAllocations
                        .filter(t => t.unit === 'recovery')
                        .map((recovery, idx) => (
                          <div
                            key={idx}
                            className={`p-4 sm:p-5 border border-gray-200 ${idx % 3 !== 2 ? 'lg:border-r' : ''} ${idx >= 1 ? 'border-t' : ''}`}
                          >
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-base sm:text-lg text-gray-900">
                                  {recovery.theatre}
                                </p>
                                <span
                                  className={`text-xs sm:text-sm px-2 py-1 rounded font-bold ${
                                    recovery.status === 'occupied'
                                      ? 'bg-green-100 text-green-700'
                                      : recovery.status === 'ready'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {recovery.status === 'occupied' ? 'OCCUPIED'
                                    : recovery.status === 'ready' ? 'READY'
                                    : recovery.status === 'cleaning' ? 'CLEANING' : 'AVAIL'}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {recovery.session}
                              </p>
                              {recovery.currentPatient && (
                                <p className="text-xs text-gray-700 font-medium mt-1">
                                  {recovery.currentPatient}
                                </p>
                              )}
                            </div>

                            {/* Efficiency metrics for this unit */}
                            {recovery.totalBays && (
                              <div className="mb-3 p-2 bg-gray-50 rounded border border-gray-200">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                  <div>
                                    <p className="text-xs text-gray-600">Bays</p>
                                    <p className="text-sm font-bold text-gray-700">{recovery.totalBays}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Occupied</p>
                                    <p className="text-sm font-bold text-green-700">{recovery.occupiedBays || 0}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Available</p>
                                    <p className="text-sm font-bold text-gray-700">{recovery.totalBays - (recovery.occupiedBays || 0)}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="space-y-1 sm:space-y-1.5">
                              {Object.entries(recovery.team).map(([key, staff]: [string, any]) => {
                                if (!staff || !staff.name) return null;

                                // Skip coordinator for bay list
                                if (key === 'coordinator') {
                                  // Show coordinator separately
                                  return (
                                    <div key={key} className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                                      <div className="flex items-center flex-1 min-w-0">
                                        <span className="text-[10px] sm:text-sm mr-2 font-semibold text-gray-700">
                                          Coordinator:
                                        </span>
                                        <span className="cursor-pointer text-gray-900 hover:underline font-medium text-[10px] sm:text-sm">
                                          {staff.name}
                                        </span>
                                      </div>
                                      {staff.shift && (
                                        <span className="text-[9px] sm:text-xs ml-2 px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                                          {staff.shift}
                                        </span>
                                      )}
                                    </div>
                                  );
                                }

                                // Get real-time shift status
                                const shiftStatus = isTodaySelected && staff.shift ? getShiftStatus(staff.shift, currentTime) : null;
                                const indicator = shiftStatus ? getShiftIndicator(shiftStatus) : null;

                                return (
                                  <div key={key} className={`flex items-center justify-between p-2 rounded ${
                                    staff.occupied ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                                  }`}>
                                    <div className="flex items-center flex-1 min-w-0">
                                      <span className="text-[10px] sm:text-sm mr-2 min-w-[60px] font-semibold text-gray-700">
                                        Bay {staff.bayNumber}:
                                      </span>
                                      <div className="flex items-center gap-1 min-w-0 flex-wrap">
                                        <span
                                          className={`cursor-pointer text-blue-600 hover:underline font-medium text-[10px] sm:text-sm ${indicator?.color || ''}`}
                                          onClick={(e) => { e.stopPropagation(); handleStaffClick(staff.name, 'Recovery Nurse', recovery.theatre); }}
                                          onMouseEnter={(e) => handleStaffHover(e, staff.name, 'Recovery Nurse')}
                                          onMouseLeave={() => setHoveredStaff(null)}
                                        >
                                          RN {staff.name}
                                        </span>

                                        {/* Real-time status badge */}
                                        {indicator && isTodaySelected && (
                                          <span
                                            className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                              indicator.badge === 'BREAK' ? 'bg-blue-100 text-blue-700' :
                                              indicator.badge === 'RELIEF' ? 'bg-orange-100 text-orange-700' :
                                              indicator.badge === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                              'bg-gray-100 text-gray-500'
                                            }`}
                                            title={indicator.tooltip}
                                          >
                                            {indicator.badge}
                                          </span>
                                        )}

                                        {shiftStatus?.needsRelief && (
                                          <button
                                            onClick={(e) => { e.stopPropagation(); handleReliefRequest(staff.name, 'Recovery Nurse', recovery.theatre); }}
                                            className="flex-shrink-0"
                                            title="Urgent: Staff needs relief"
                                          >
                                            <Bell className="w-3 h-3 text-orange-500 fill-orange-200" />
                                          </button>
                                        )}

                                        {/* Occupied status */}
                                        {staff.occupied && (
                                          <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded font-bold bg-green-100 text-green-700">
                                            PATIENT
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Patient time in recovery if occupied */}
                                    {staff.occupied && staff.patientTimeIn && (
                                      <div className="flex items-center gap-1 ml-2">
                                        <Clock className="w-3 h-3 text-gray-500" />
                                        <span className="text-[9px] sm:text-xs text-gray-600">
                                          In: {staff.patientTimeIn}
                                        </span>
                                      </div>
                                    )}

                                    {staff.shift && !staff.occupied && (
                                      <span className={`text-[9px] sm:text-xs ml-2 px-1.5 py-0.5 rounded ${
                                        indicator?.badge === 'RELIEF' ? 'bg-orange-50 text-orange-700 font-bold' :
                                        indicator?.badge === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                                        indicator?.badge === 'BREAK' ? 'bg-blue-50 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                      }`}>
                                        {staff.shift}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT column – kept for desktop; hidden on mobile */}
          <aside className="hidden md:block md:w-[35%] space-y-6">
            {/* Critical Alerts Panel */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-700" />
                  <h3 className="font-bold text-lg text-gray-900">Critical Alerts</h3>
                </div>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {(() => {
                  const alerts = [];

                  // Relief required
                  const needsRelief = theatreAllocations
                    .filter(t => t.reliefRequired && t.unit !== 'recovery')
                    .slice(0, 3);

                  needsRelief.forEach(theatre => {
                    alerts.push({
                      type: 'relief',
                      severity: 'high',
                      theatre: theatre.theatre,
                      message: 'Staff needs relief',
                      time: 'Now'
                    });
                  });

                  // Paused theatres
                  const paused = theatreAllocations
                    .filter(t => t.status === 'paused' && t.unit !== 'recovery')
                    .slice(0, 2);

                  paused.forEach(theatre => {
                    alerts.push({
                      type: 'paused',
                      severity: 'medium',
                      theatre: theatre.theatre,
                      message: `Paused ${theatre.pauseDuration ? theatre.pauseDuration + 'm' : ''}`,
                      time: theatre.operationalIssue?.time || 'Unknown'
                    });
                  });

                  // Operational issues
                  const issues = theatreAllocations
                    .filter(t => t.operationalIssue && !t.operationalIssue.resolved && t.unit !== 'recovery')
                    .slice(0, 3);

                  issues.forEach(theatre => {
                    alerts.push({
                      type: 'issue',
                      severity: 'medium',
                      theatre: theatre.theatre,
                      message: theatre.operationalIssue.type,
                      time: theatre.operationalIssue.time
                    });
                  });

                  return alerts.length > 0 ? (
                    <div className="space-y-3">
                      {alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            alert.severity === 'high'
                              ? 'bg-red-50 border-red-200'
                              : 'bg-orange-50 border-orange-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-bold text-sm text-gray-900">{alert.theatre}</p>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                          <p className={`text-xs font-medium ${
                            alert.severity === 'high' ? 'text-red-700' : 'text-orange-700'
                          }`}>
                            {alert.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No critical alerts</p>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* Upcoming Lists Panel */}
            <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-700" />
                  <h3 className="font-bold text-lg text-gray-900">Upcoming</h3>
                </div>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {(() => {
                  const upcoming = [];

                  // Theatres in anaesthetic room (next to start)
                  const inAnaes = theatreAllocations
                    .filter(t => t.status === 'anaesthetic_room' && t.unit !== 'recovery')
                    .slice(0, 3);

                  inAnaes.forEach(theatre => {
                    upcoming.push({
                      theatre: theatre.theatre,
                      status: 'Anaesthetic Room',
                      case: theatre.currentCase ? `Case ${theatre.currentCase}` : 'Unknown',
                      time: 'Soon',
                      color: 'purple'
                    });
                  });

                  // Patient sent for
                  const sentFor = theatreAllocations
                    .filter(t => t.status === 'patient_sent' && t.unit !== 'recovery')
                    .slice(0, 3);

                  sentFor.forEach(theatre => {
                    upcoming.push({
                      theatre: theatre.theatre,
                      status: 'Patient Sent For',
                      case: theatre.currentCase ? `Case ${theatre.currentCase}` : 'Unknown',
                      time: '10-15 min',
                      color: 'blue'
                    });
                  });

                  // Ready theatres
                  const ready = theatreAllocations
                    .filter(t => t.status === 'ready' && t.unit !== 'recovery')
                    .slice(0, 2);

                  ready.forEach(theatre => {
                    upcoming.push({
                      theatre: theatre.theatre,
                      status: 'Ready',
                      case: theatre.currentCase ? `Case ${theatre.currentCase}` : 'Next case',
                      time: 'Ready',
                      color: 'cyan'
                    });
                  });

                  return upcoming.length > 0 ? (
                    <div className="space-y-3">
                      {upcoming.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            item.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                            item.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                            'bg-cyan-50 border-cyan-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-bold text-sm text-gray-900">{item.theatre}</p>
                            <span className="text-xs text-gray-500">{item.time}</span>
                          </div>
                          <p className={`text-xs font-medium ${
                            item.color === 'purple' ? 'text-purple-700' :
                            item.color === 'blue' ? 'text-blue-700' :
                            'text-cyan-700'
                          }`}>
                            {item.status} • {item.case}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No upcoming activities</p>
                    </div>
                  );
                })()}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Context Menu */}
      <StaffContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        staff={contextMenu.staff}
        allTheatres={theatreAllocations}
        onClose={() => setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, staff: null })}
        onSendBreak={handleSendBreak}
        onSwapStaff={handleSwapStaff}
      />

      {/* Modals */}
      <TheatreTimelineModalWithCerner
        isOpen={showTimeline}
        onClose={() => { setShowTimeline(false); setSelectedTheatre(null); }}
        theatre={selectedTheatre || ''}
        date={selectedDate} />
      <StaffReliefModal
        isOpen={showReliefModal}
        onClose={() => { setShowReliefModal(false); setSelectedStaffForRelief(null); }}
        staffMember={selectedStaffForRelief} />
      <StaffHoverCard staff={hoveredStaff} visible={!!hoveredStaff} position={hoverPosition} />
      <StaffCompetencyModal
        isOpen={showCompetencyModal}
        onClose={() => { setShowCompetencyModal(false); setSelectedStaffForCompetency(null); }}
        staff={selectedStaffForCompetency} />
      <StaffInfoMobileModal
        isOpen={showMobileStaffInfo}
        onClose={() => setShowMobileStaffInfo(false)}
        staff={selectedStaffForCompetency}
        onViewFullProfile={() => { setShowMobileStaffInfo(false); setShowCompetencyModal(true); }} />
      <TheatreOpsModal isOpen={showTheatreOpsModal} onClose={() => setShowTheatreOpsModal(false)} selectedUnit={selectedUnit} />
      <StaffDutyModal
        isOpen={showStaffDutyModal}
        onClose={() => setShowStaffDutyModal(false)}
        onNavigateToRoster={() => { setShowStaffDutyModal(false); console.log('Navigate to Staff Roster tab'); }}
        selectedUnit={selectedUnit} />
      <TurnoverTimeModal isOpen={showTurnoverModal} onClose={() => setShowTurnoverModal(false)} />
      <EfficiencyScoreModal isOpen={showEfficiencyModal} onClose={() => setShowEfficiencyModal(false)} />
    </div>
  );
}
