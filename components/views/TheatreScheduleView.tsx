'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Users,
  ListOrdered,
  MessageSquare,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  X,
  GripVertical,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Stethoscope,
  Filter
} from 'lucide-react';
import { type ScheduledCase } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import type { Case } from '@/types';
import { useDataSource } from '@/contexts/DataSourceContext';
import { getTheatres } from '@/lib/scheduling/theatreService';
import type { Theatre } from '@/lib/schedulingTypes';

// Type alias for compatibility with existing code
type Procedure = ScheduledCase;

// Map Firebase Case to ScheduledCase format
function mapCaseToScheduledCase(firebaseCase: any, index: number): ScheduledCase {
  const scheduledStart = new Date(firebaseCase.scheduledStart || firebaseCase.actualStart);
  const scheduledEnd = new Date(firebaseCase.scheduledEnd || scheduledStart);

  return {
    id: firebaseCase.id,
    listOrder: index + 1,
    date: firebaseCase.date || scheduledStart.toISOString().split('T')[0],
    theatre: firebaseCase.theatre || 'Main Theatre 1',
    scheduledTime: scheduledStart.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    time: scheduledStart.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    procedure: firebaseCase.procedureName || 'Unknown Procedure',
    procedureName: firebaseCase.procedureName || 'Unknown Procedure',
    specialty: firebaseCase.specialty || 'General Surgery',
    surgeon: firebaseCase.surgeonName || 'Unknown Surgeon',
    patient: {
      mrn: firebaseCase.patientId || 'ANON',
      age: 0, // Not available from Cerner data
      notes: firebaseCase.notes || ''
    },
    estimatedDuration: Math.round((scheduledEnd.getTime() - scheduledStart.getTime()) / (1000 * 60)),
    status: firebaseCase.status || 'scheduled',
    team: {
      surgeon: { name: firebaseCase.surgeonName || 'Unknown', title: 'Mr.' },
      assistant: { name: 'Asst', title: '' },
      anaesthetist: { name: 'Anaes', title: 'Dr.' },
      scrubNurse: { name: 'Nurse', title: '' },
      scrubNP: 'NP'
    },
    assistant: 'Assistant',
    anaesthetist: 'Anaesthetist',
    anaesNP: '',
    scrubNP: '',
    equipment: [],
    requirements: [],
    notes: firebaseCase.notes ? [firebaseCase.notes] : [],
    requests: []
  };
}

interface ContextMenu {
  visible: boolean;
  x: number;
  y: number;
  procedureId: string;
}

interface TheatreScheduleViewProps {
  onBack?: () => void;
}

export default function TheatreScheduleView({ onBack }: TheatreScheduleViewProps = {}) {
  const { isCernerEnabled } = useDataSource();

  // Use actual current date for Cerner, mock date for mock data
  const TODAY = isCernerEnabled ? new Date() : new Date(2024, 9, 21);
  if (isCernerEnabled) {
    TODAY.setHours(0, 0, 0, 0); // Reset to midnight for date comparisons
  }

  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [currentMonth, setCurrentMonth] = useState(TODAY);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'surgeon' | 'anaesthetist' | 'procedure' | 'equipment' | 'requirement' | 'staff'>('all');
  const [filterValue, setFilterValue] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState<string>('');
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0, procedureId: '' });
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showListOrderModal, setShowListOrderModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [showProcedureDetailsModal, setShowProcedureDetailsModal] = useState(false);
  const [showOtherTeamMembers, setShowOtherTeamMembers] = useState(false);
  const [draggedProcedure, setDraggedProcedure] = useState<string | null>(null);
  const [showProcedureList, setShowProcedureList] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [procedureComments, setProcedureComments] = useState<{ [key: string]: Array<{ text: string; recalled: boolean; timestamp: string }> }>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load hospitals and theatres dynamically from Firebase
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loadingTheatres, setLoadingTheatres] = useState(true);

  // Load cases - either from Firebase (Cerner) or mock data
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);

  // Load theatres from Firebase
  useEffect(() => {
    const loadTheatres = async () => {
      try {
        console.log('🔍 TheatreScheduleView: Loading theatres from Firebase...');
        const loaded = await getTheatres();
        setTheatres(loaded);
        console.log(`✅ TheatreScheduleView: Loaded ${loaded.length} theatres`);

        // Set initial selected theatre to first theatre if available
        if (loaded.length > 0 && !selectedTheatre) {
          setSelectedTheatre(loaded[0].name);
        }
      } catch (error) {
        console.error('Error loading theatres:', error);
      } finally {
        setLoadingTheatres(false);
      }
    };

    loadTheatres();
  }, []);

  // Load hospitals from Firebase
  useEffect(() => {
    const loadHospitals = async () => {
      try {
        console.log('🔍 TheatreScheduleView: Loading hospitals from Firebase...');
        const { collection, getDocs } = await import('firebase/firestore');
        const hospitalsSnapshot = await getDocs(collection(db, 'hospitals'));
        const loadedHospitals = hospitalsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHospitals(loadedHospitals);
        console.log(`✅ TheatreScheduleView: Loaded ${loadedHospitals.length} hospitals`);
      } catch (error) {
        console.error('Error loading hospitals:', error);
      } finally {
        setLoadingHospitals(false);
      }
    };

    loadHospitals();
  }, []);

  // Load all cases from Firebase
  useEffect(() => {
    console.log('🔍 TheatreScheduleView: Loading cases from Firebase...');
    const casesRef = collection(db, 'cases');

    const unsubscribe = onSnapshot(casesRef, (snapshot) => {
      console.log(`✅ TheatreScheduleView: Loaded ${snapshot.size} cases`);
      const casesData: Procedure[] = [];
      snapshot.forEach((doc, index) => {
        const caseData = doc.data();
        casesData.push(mapCaseToScheduledCase({ id: doc.id, ...caseData }, index));
      });
      // Sort by date and time
      casesData.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
      setProcedures(casesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Generate calendar days for the full month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get starting day (Sunday of the week containing the 1st)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Get ending day (Saturday of the week containing the last day)
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  // Get procedures for a specific date and selected theatre
  const getProceduresForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    return procedures.filter(p => p.date === dateStr && p.theatre === selectedTheatre);
  };

  const getProcedureCountByDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const theatreProcs = procedures.filter(p => p.date === dateStr && p.theatre === selectedTheatre);
    return theatreProcs.length;
  };

  const getSurgeonsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const theatreProcs = procedures.filter(p => p.date === dateStr && p.theatre === selectedTheatre);
    if (theatreProcs.length > 0) {
      return Array.from(new Set(theatreProcs.map(p => p.surgeon)));
    }
    return [];
  };

  const getAnaesthetistsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const theatreProcs = procedures.filter(p => p.date === dateStr && p.theatre === selectedTheatre);
    if (theatreProcs.length > 0) {
      return Array.from(new Set(theatreProcs.map(p => p.anaesthetist)));
    }
    return [];
  };

  const handleDayClick = (day: Date) => {
    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
    if (!isCurrentMonth) return; // Don't select days outside current month

    setSelectedDayData(day);
    setSelectedDate(day);
    // No modal - just update the selected date to show in the right panel
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get unique values for filter dropdowns
  const surgeons = Array.from(new Set(procedures.map(p => p.surgeon))).sort();
  const anaesthetists = Array.from(new Set(procedures.map(p => p.anaesthetist))).sort();
  const procedureNames = Array.from(new Set(procedures.map(p => p.procedureName))).sort();
  const allEquipment = Array.from(new Set(procedures.flatMap(p => p.equipment))).sort();
  const allRequirements = Array.from(new Set(procedures.flatMap(p => p.requirements))).sort();
  const allStaff = Array.from(new Set([...surgeons, ...anaesthetists])).sort();

  // Filter procedures based on selected criteria and global filter
  const filteredProcedures = procedures.filter(proc => {
    // Apply specialty filter (from globalFilter dropdown)
    if (globalFilter) {
      if (proc.specialty !== globalFilter) return false;
    }

    // Apply specific filters
    if (filterType !== 'all' && filterValue) {
      switch (filterType) {
        case 'surgeon':
          return proc.surgeon === filterValue;
        case 'anaesthetist':
          return proc.anaesthetist === filterValue;
        case 'procedure':
          return proc.procedureName === filterValue;
        case 'equipment':
          return proc.equipment.includes(filterValue);
        case 'requirement':
          return proc.requirements.includes(filterValue);
        case 'staff':
          return proc.surgeon === filterValue || proc.anaesthetist === filterValue;
        default:
          return true;
      }
    }
    return true;
  });

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, procedureId: string) => {
    setDraggedProcedure(procedureId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetProcedureId: string) => {
    e.preventDefault();
    if (!draggedProcedure || draggedProcedure === targetProcedureId) return;

    const draggedProc = procedures.find(p => p.id === draggedProcedure);
    const targetProc = procedures.find(p => p.id === targetProcedureId);

    if (!draggedProc || !targetProc) return;
    if (draggedProc.theatre !== targetProc.theatre || draggedProc.date !== targetProc.date) return;

    const updatedProcedures = [...procedures];
    const draggedIndex = updatedProcedures.findIndex(p => p.id === draggedProcedure);
    const targetIndex = updatedProcedures.findIndex(p => p.id === targetProcedureId);

    // Swap list orders
    const tempOrder = updatedProcedures[draggedIndex].listOrder;
    updatedProcedures[draggedIndex].listOrder = updatedProcedures[targetIndex].listOrder;
    updatedProcedures[targetIndex].listOrder = tempOrder;

    setProcedures(updatedProcedures);
    setDraggedProcedure(null);
  };

  // Calculate session count based on start and end times
  const calculateSessions = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;

    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);

    if (end <= 12) return 1; // Morning only
    if (end <= 18) return 2; // Morning + Afternoon
    return 3; // Morning + Afternoon + Evening
  };

  const handleContextMenu = (e: React.MouseEvent, procedure: Procedure) => {
    e.preventDefault();

    const menuWidth = 220;
    const menuHeight = 180;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > windowWidth) {
      x = windowWidth - menuWidth - 10;
    }

    if (y + menuHeight > windowHeight) {
      y = windowHeight - menuHeight - 10;
    }

    setContextMenu({
      visible: true,
      x,
      y,
      procedureId: procedure.id
    });
    setSelectedProcedure(procedure);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu({ visible: false, x: 0, y: 0, procedureId: '' });
      }
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu.visible]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'delayed':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getFilterOptions = () => {
    switch (filterType) {
      case 'surgeon':
        return surgeons;
      case 'anaesthetist':
        return anaesthetists;
      case 'procedure':
        return procedureNames;
      case 'equipment':
        return allEquipment;
      case 'requirement':
        return allRequirements;
      case 'staff':
        return allStaff;
      default:
        return [];
    }
  };

  // Get initials from name (e.g., "Dr. John Smith" -> "JS")
  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(part => !part.startsWith('Dr.') && !part.startsWith('Mr.') && !part.startsWith('Ms.') && !part.startsWith('Mrs.'));
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  // Get specialty abbreviation
  const getSpecialtyAbbr = (specialty: string) => {
    const abbrs: Record<string, string> = {
      'Orthopaedics': 'Ortho',
      'Cardiology': 'Cardio',
      'Neurosurgery': 'Neuro',
      'General Surgery': 'Gen Surg',
      'Plastic Surgery': 'Plastics',
      'Ophthalmology': 'Ophthal',
      'ENT': 'ENT',
      'Urology': 'Uro',
      'Vascular': 'Vasc',
      'Gynaecology': 'Gynae'
    };
    return abbrs[specialty] || specialty.substring(0, 6);
  };

  // Render calendar grid
  const renderCalendar = () => {
    return (
      <div className="space-y-2">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white rounded-xl p-3 shadow-md">
          <button
            onClick={handlePreviousMonth}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm sm:text-base font-bold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 rounded-xl border-2 border-blue-200 p-2 sm:p-3 shadow-sm">

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-blue-900 py-1">
            <span className="sm:hidden">{day[0]}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid - Compact on Mobile, Slightly smaller on Desktop */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          const isToday = day.toDateString() === TODAY.toDateString();
          const isSelected = day.toDateString() === selectedDate.toDateString();
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const dayProcedures = getProceduresForDay(day);
          const procedureCount = getProcedureCountByDay(day);

          // Check if this day has procedures matching the filter
          const hasMatchingProcedures = globalFilter && dayProcedures.length > 0 && dayProcedures.some(proc => {
            const filterLower = globalFilter.toLowerCase();
            return proc.procedureName.toLowerCase().includes(filterLower) ||
                   proc.specialty.toLowerCase().includes(filterLower) ||
                   proc.surgeon.toLowerCase().includes(filterLower) ||
                   proc.anaesthetist.toLowerCase().includes(filterLower) ||
                   proc.equipment.some(eq => eq.toLowerCase().includes(filterLower)) ||
                   proc.requirements.some(req => req.toLowerCase().includes(filterLower));
          });

          const surgeons = dayProcedures.length > 0 ? Array.from(new Set(dayProcedures.map(p => p.surgeon))) : getSurgeonsForDay(day);
          const anaesthetists = dayProcedures.length > 0 ? Array.from(new Set(dayProcedures.map(p => p.anaesthetist))) : getAnaesthetistsForDay(day);
          const specialties = dayProcedures.length > 0 ? Array.from(new Set(dayProcedures.map(p => p.specialty))) : [];

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(day)}
              className={`
                min-h-[50px] sm:min-h-[90px] p-1 sm:p-2 rounded-lg border-2 transition-all cursor-pointer
                ${!isCurrentMonth
                  ? 'bg-gray-50 border-gray-200 text-gray-400'
                  : hasMatchingProcedures
                  ? 'border-yellow-500 bg-yellow-50 hover:shadow-lg sm:ring-2 sm:ring-yellow-300'
                  : isSelected
                  ? 'border-purple-500 bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 hover:shadow-lg ring-2 ring-purple-400'
                  : isToday
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-lg ring-2 ring-cyan-300'
                  : 'border-blue-200 bg-white hover:border-purple-400 hover:shadow-md hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50'
              }`}
            >
              {/* Mobile View - Compact */}
              <div className="sm:hidden flex flex-col items-center justify-center h-full">
                <span className={`text-sm font-bold ${isToday ? 'text-cyan-700' : isSelected ? 'text-purple-700' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                  {day.getDate()}
                </span>
                {isCurrentMonth && procedureCount > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-1"></div>
                )}
              </div>

              {/* Desktop View - Centered with Circular Badge */}
              <div className="hidden sm:flex flex-col items-center justify-center h-full relative">
                <div className="text-center mb-1">
                  <span className={`text-base font-bold ${isToday ? 'text-cyan-700' : isSelected ? 'text-purple-700' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                    {day.getDate()}
                  </span>
                </div>

                {isCurrentMonth && procedureCount > 0 && (
                  <>
                    <div className="text-center space-y-1">
                      {specialties.length > 0 && (
                        <div className="text-sm text-blue-700 font-bold">
                          {getSpecialtyAbbr(specialties[0])}
                        </div>
                      )}
                      {surgeons.length > 0 && anaesthetists.length > 0 && (
                        <div className="text-sm text-purple-700 font-medium">
                          {getInitials(surgeons[0])} / {getInitials(anaesthetists[0])}
                        </div>
                      )}
                    </div>

                    {/* Circular badge in bottom right */}
                    <div className="absolute bottom-1 right-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${hasMatchingProcedures ? 'bg-yellow-400' : 'bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600'}`}>
                        <span className={`text-sm font-bold ${hasMatchingProcedures ? 'text-yellow-900' : 'text-white'}`}>
                          {procedureCount}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
          </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header - Only on mobile */}
      <div className="sm:hidden mb-4 text-white" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}}>
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold mb-1">Theatre Schedule</h1>
            <p className="text-xs text-white/80 truncate">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-500 text-white rounded-lg shadow-md active:scale-95 transition-all flex-shrink-0"
          >
            <Filter className="w-4 h-4" />
            <span className="text-xs font-semibold">Filters</span>
            {showMobileFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Filters Panel - Collapsible */}
        {showMobileFilters && (
          <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 space-y-3 shadow-sm mb-4 animate-in slide-in-from-top duration-200">
            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">Filter by Hospital</label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingHospitals}
              >
                {loadingHospitals ? (
                  <option value="">Loading hospitals...</option>
                ) : (
                  <>
                    <option value="">All Hospitals</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>{hospital.name || hospital.id}</option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">Filter by Surgeon</label>
              <select
                value={filterType === 'surgeon' ? filterValue : ''}
                onChange={(e) => {
                  setFilterType('surgeon');
                  setFilterValue(e.target.value);
                }}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Surgeons</option>
                {Array.from(new Set(procedures.map(p => p.surgeon))).sort().map((surgeon) => (
                  <option key={surgeon} value={surgeon}>{surgeon}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">Filter by Anaesthetist</label>
              <select
                value={filterType === 'anaesthetist' ? filterValue : ''}
                onChange={(e) => {
                  setFilterType('anaesthetist');
                  setFilterValue(e.target.value);
                }}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Anaesthetists</option>
                {Array.from(new Set(procedures.map(p => p.anaesthetist))).sort().map((anaesthetist) => (
                  <option key={anaesthetist} value={anaesthetist}>{anaesthetist}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">Filter by Theatre</label>
              <select
                value={selectedTheatre}
                onChange={(e) => setSelectedTheatre(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingTheatres}
              >
                {loadingTheatres ? (
                  <option value="">Loading theatres...</option>
                ) : theatres.length === 0 ? (
                  <option value="">No theatres available</option>
                ) : (
                  theatres.map((theatre) => (
                    <option key={theatre.id} value={theatre.name}>{theatre.name}</option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">Filter by Specialty</label>
              <select
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specialties</option>
                {Array.from(new Set(procedures.map(p => p.specialty))).sort().map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Desktop: Calendar and Team on top, List below */}
      <div className="hidden sm:flex flex-col p-6 overflow-y-auto h-full">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Theatre Schedule</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage surgical procedures and theatre bookings</p>
        </div>

        {/* Top Section: Calendar and Right Panels side by side */}
        <div className="flex gap-4 mb-4">
          {/* Left - Calendar */}
          <div className="w-[60%]">
            {renderCalendar()}
          </div>

          {/* Right - Filters and Team Members */}
          <div className="w-[40%] flex flex-col gap-3">
            {/* Filter Panel */}
            <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 mb-3">Filters</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">Hospital</label>
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loadingHospitals}
                  >
                    {loadingHospitals ? (
                      <option value="">Loading hospitals...</option>
                    ) : (
                      <>
                        <option value="">All Hospitals</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital.id} value={hospital.id}>{hospital.name || hospital.id}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">Surgeon</label>
                  <select
                    value={filterType === 'surgeon' ? filterValue : ''}
                    onChange={(e) => {
                      setFilterType('surgeon');
                      setFilterValue(e.target.value);
                    }}
                    className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Surgeons</option>
                    {Array.from(new Set(procedures.map(p => p.surgeon))).sort().map((surgeon) => (
                      <option key={surgeon} value={surgeon}>{surgeon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">Anaesthetist</label>
                  <select
                    value={filterType === 'anaesthetist' ? filterValue : ''}
                    onChange={(e) => {
                      setFilterType('anaesthetist');
                      setFilterValue(e.target.value);
                    }}
                    className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Anaesthetists</option>
                    {Array.from(new Set(procedures.map(p => p.anaesthetist))).sort().map((anaesthetist) => (
                      <option key={anaesthetist} value={anaesthetist}>{anaesthetist}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">Theatre</label>
                  <select
                    value={selectedTheatre}
                    onChange={(e) => setSelectedTheatre(e.target.value)}
                    className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loadingTheatres}
                  >
                    {loadingTheatres ? (
                      <option value="">Loading theatres...</option>
                    ) : theatres.length === 0 ? (
                      <option value="">No theatres available</option>
                    ) : (
                      theatres.map((theatre) => (
                        <option key={theatre.id} value={theatre.name}>{theatre.name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">Specialty</label>
                  <select
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Specialties</option>
                    {Array.from(new Set(procedures.map(p => p.specialty))).sort().map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Team Members Panel */}
            {getProceduresForDay(selectedDate).length > 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="mb-3 pb-3 border-b border-blue-200">
                  <h2 className="text-base font-bold text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {getProcedureCountByDay(selectedDate)} procedure{getProcedureCountByDay(selectedDate) !== 1 ? 's' : ''}
                  </p>
                </div>

                <h3 className="text-base font-bold text-blue-900 mb-3">Team Members</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(() => {
                    const dayProcs = getProceduresForDay(selectedDate);
                    const allSurgeons = Array.from(new Set(dayProcs.map(p => p.surgeon)));
                    const allAssistants = Array.from(new Set(dayProcs.map(p => p.assistant)));
                    const allAnaesthetists = Array.from(new Set(dayProcs.map(p => p.anaesthetist)));
                    const allAnaesNPs = Array.from(new Set(dayProcs.map(p => p.anaesNP)));
                    const allScrubNPs = Array.from(new Set(dayProcs.map(p => p.scrubNP)));
                    const allHCAs = Array.from(new Set(dayProcs.map(p => p.hca).filter(h => h)));

                    // Add default team members if missing
                    const defaultHCA = allHCAs.length > 0 ? allHCAs : ['HCA J. Wilson'];
                    const defaultAssistantAnaes = ['Dr. M. Clarke']; // Default assistant anaesthetist
                    const defaultScrubNP2 = ['ODP S. Hughes']; // Default second scrub

                    return (
                      <>
                        {/* Left Column - Doctors */}
                        <div className="space-y-2">
                          <h4 className="font-bold text-blue-900 text-sm mb-2 uppercase">Medical Staff</h4>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Consultant Surgeon</p>
                            <p className="text-gray-700 text-sm">{allSurgeons[0] || 'TBC'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Assistant Surgeon</p>
                            <p className="text-gray-700 text-sm">{allAssistants[0] || 'TBC'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Consultant Anaesthetist</p>
                            <p className="text-gray-700 text-sm">{allAnaesthetists[0] || 'TBC'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Assistant Anaesthetist</p>
                            <p className="text-gray-700 text-sm">{defaultAssistantAnaes[0]}</p>
                          </div>
                        </div>

                        {/* Right Column - N/P and HCA */}
                        <div className="space-y-2">
                          <h4 className="font-bold text-blue-900 text-sm mb-2 uppercase">Support Staff</h4>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Anaes N/P</p>
                            <p className="text-gray-700 text-sm">{allAnaesNPs[0] || 'TBC'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Scrub N/P 1</p>
                            <p className="text-gray-700 text-sm">{allScrubNPs[0] || 'TBC'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">Scrub N/P 2</p>
                            <p className="text-gray-700 text-sm">{defaultScrubNP2[0]}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm">HCA</p>
                            <p className="text-gray-700 text-sm">{defaultHCA[0]}</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500 text-center">Select a date with procedures to view team</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Procedure List (Full Width) */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">Procedures</h3>
          <div className="space-y-3">
            {getProceduresForDay(selectedDate).length > 0 ? (
              getProceduresForDay(selectedDate).sort((a, b) => a.listOrder - b.listOrder).map((proc, idx) => (
                <div
                  key={proc.id}
                  className={`
                    rounded-lg p-4 border-2 transition-all
                    ${idx === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}
                  `}
                >
                  {/* Top Row: List Order, Procedure Name, Doctors, Time */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0
                      ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-100 text-blue-700'}
                    `}>
                      {proc.listOrder}
                    </div>

                    {idx === 0 && <Award className="w-5 h-5 text-yellow-600 flex-shrink-0" />}

                    <div className="flex-1 flex items-center gap-4 flex-wrap">
                      <span className="text-base font-bold text-gray-900">{proc.procedureName}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-blue-700 font-medium">{proc.surgeon}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-purple-700 font-medium">{proc.anaesthetist}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {proc.startTime} - {proc.endTime}
                    </div>
                  </div>

                  {/* Clinical Notes/Narrative */}
                  {proc.notes && proc.notes.length > 0 && (
                    <div className="mb-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                      <div className="space-y-2">
                        {proc.notes.map((note, i) => (
                          <div key={i} className="text-sm">
                            <MessageSquare className="w-4 h-4 inline mr-2 text-blue-600" />
                            <span className="text-gray-700">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generate clinical narrative if no notes exist */}
                  {(!proc.notes || proc.notes.length === 0) && (
                    <div className="mb-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                      <div className="space-y-2 text-sm text-gray-700">
                        {(() => {
                          // Generate context-aware narrative based on procedure type
                          const narratives = [];

                          if (proc.procedureName.includes('Hip')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Lateral position required. Patient has history of NKDA. Ensure appropriate hip prosthesis size available.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Spinal anaesthesia preferred. Watch for positioning-related nerve compression. BP monitoring essential.`
                            );
                          } else if (proc.procedureName.includes('Knee')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Supine position with tourniquet. Patient allergic to penicillin - use alternative prophylaxis.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Regional block planned. Check anticoagulation status preoperatively.`
                            );
                          } else if (proc.procedureName.includes('ACL')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Supine position. Ensure arthroscopy equipment tested. Young athlete - counsel regarding rehabilitation.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: GA with LMA. PONV prophylaxis recommended.`
                            );
                          } else if (proc.procedureName.includes('Shoulder')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Beach chair position. Risk of hypotension - ensure adequate cerebral perfusion.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Interscalene block + GA. Monitor BP closely with position changes.`
                            );
                          } else if (proc.procedureName.includes('CABG')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Standard sternotomy approach. Saphenous vein harvesting required. Ensure bypass machine ready.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Full invasive monitoring. TEE essential. Patient on aspirin - check recent labs.`
                            );
                          } else if (proc.procedureName.includes('Craniotomy')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Supine with head pins. Neuronavigation required. Anticipate 4+ hour procedure.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: TIVA preferred. Maintain cerebral perfusion pressure. Have mannitol ready.`
                            );
                          } else if (proc.procedureName.includes('Cataract')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Bilateral procedure - second eye consent confirmed. Patient anxious about procedure.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Local anaesthetic blocks. Patient on warfarin - INR checked and acceptable.`
                            );
                          } else if (proc.procedureName.includes('Thyroidectomy')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Supine with neck extension. Ensure nerve monitoring available. Retrosternal extension noted on imaging.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Anticipate difficult intubation. Have smaller ETT sizes available. Check calcium levels.`
                            );
                          } else if (proc.procedureName.includes('Hysterectomy')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Laparoscopic approach. Patient BMI 35 - may need additional port. Large fibroid on scan.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Standard GA. PONV prophylaxis essential. Patient anxious - consider premedication.`
                            );
                          } else if (proc.procedureName.includes('AAA')) {
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Open repair planned. Cross-clamp time critical. Two units blood cross-matched.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Arterial line + CVP mandatory. Anticipate hemodynamic instability. ICU bed confirmed.`
                            );
                          } else {
                            // Default narrative for other procedures
                            narratives.push(
                              `${proc.surgeon.split(' ').slice(-1)[0]}: Standard positioning. Check all equipment available. Patient consented and marked.`,
                              `${proc.anaesthetist.split(' ').slice(-1)[0]}: Standard anaesthetic plan. NKDA confirmed. Recent labs reviewed.`
                            );
                          }

                          return narratives.map((narrative, i) => (
                            <div key={i}>
                              <MessageSquare className="w-4 h-4 inline mr-2 text-blue-600" />
                              <span>{narrative}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Requirements & Requests */}
                  {(proc.requirements?.length > 0 || proc.requests?.length > 0) && (
                    <div className="mb-3 space-y-2">
                      {proc.requirements && proc.requirements.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 mb-1">Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {proc.requirements.map((req, i) => (
                              <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-300">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {proc.requests && proc.requests.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-orange-700 mb-1">Requests:</p>
                          <div className="flex flex-wrap gap-1">
                            {proc.requests.map((req, i) => (
                              <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Comments Section */}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        {procedureComments[proc.id]?.map((comment, i) => (
                          <div key={i} className="mb-2 flex items-center gap-2">
                            <span className={`text-sm ${comment.recalled ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {comment.text}
                            </span>
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                            {!comment.recalled && (
                              <button
                                onClick={() => {
                                  setProcedureComments(prev => ({
                                    ...prev,
                                    [proc.id]: prev[proc.id].map((c, idx) =>
                                      idx === i ? { ...c, recalled: true } : c
                                    )
                                  }));
                                }}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Recall
                              </button>
                            )}
                          </div>
                        ))}

                        {editingComment === proc.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add comment..."
                              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                if (commentText.trim()) {
                                  setProcedureComments(prev => ({
                                    ...prev,
                                    [proc.id]: [
                                      ...(prev[proc.id] || []),
                                      {
                                        text: commentText,
                                        recalled: false,
                                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                      }
                                    ]
                                  }));
                                  setCommentText('');
                                  setEditingComment(null);
                                }
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => {
                                setCommentText('');
                                setEditingComment(null);
                              }}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingComment(proc.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            + Add Comment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No procedures scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Calendar and List */}
      <div className="sm:hidden flex flex-col p-3 overflow-y-auto h-full space-y-4">
        {renderCalendar()}

        {/* Procedures List */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3">Procedures for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
          <div className="space-y-3">
            {getProceduresForDay(selectedDate).length > 0 ? (
              getProceduresForDay(selectedDate).sort((a, b) => a.listOrder - b.listOrder).map((proc, idx) => (
                <div
                  key={proc.id}
                  className={`
                    rounded-lg p-4 border-2 transition-all
                    ${idx === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}
                  `}
                >
                  {/* Top Row: List Order, Procedure Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0
                      ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-100 text-blue-700'}
                    `}>
                      {proc.listOrder}
                    </div>

                    {idx === 0 && <Award className="w-5 h-5 text-yellow-600 flex-shrink-0" />}

                    <div className="flex-1">
                      <span className="text-base font-bold text-gray-900">{proc.procedureName}</span>
                    </div>
                  </div>

                  {/* Doctors and Time */}
                  <div className="mb-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Surgeon:</span>
                      <span className="text-blue-700 font-medium">{proc.surgeon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Anaesthetist:</span>
                      <span className="text-purple-700 font-medium">{proc.anaesthetist}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{proc.scheduledTime}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-700">{proc.estimatedDuration} min</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      proc.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                      proc.status === 'In Progress' ? 'bg-green-50 text-green-700 border-green-300' :
                      proc.status === 'Completed' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                      'bg-yellow-50 text-yellow-700 border-yellow-300'
                    }`}>
                      {proc.status}
                    </span>
                  </div>

                  {/* Requirements & Requests */}
                  {(proc.requirements?.length > 0 || proc.requests?.length > 0) && (
                    <div className="mb-3 space-y-2">
                      {proc.requirements && proc.requirements.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 mb-1">Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {proc.requirements.map((req, i) => (
                              <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-300">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {proc.requests && proc.requests.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-orange-700 mb-1">Requests:</p>
                          <div className="flex flex-wrap gap-1">
                            {proc.requests.map((req, i) => (
                              <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No procedures scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day Detail Modal */}
      {showDayModal && selectedDayData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedDayData.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {getProcedureCountByDay(selectedDayData)} procedures in {selectedTheatre}
                </p>
              </div>
              <button
                onClick={() => setShowDayModal(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {getProceduresForDay(selectedDayData).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(
                    getProceduresForDay(selectedDayData).reduce((acc, proc) => {
                      if (!acc[proc.theatre]) acc[proc.theatre] = [];
                      acc[proc.theatre].push(proc);
                      return acc;
                    }, {} as Record<string, Procedure[]>)
                  ).map(([theatre, procs]) => (
                    <div key={theatre} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-600 text-white px-4 py-2 font-bold">
                        {theatre}
                      </div>
                      <div className="divide-y divide-gray-200">
                        {procs.map((proc) => (
                          <div key={proc.id} className="p-3 hover:bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-sm">{proc.scheduledTime}</span>
                                <span className="text-gray-500">•</span>
                                <span className="font-semibold">{proc.procedureName}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(proc.status)}`}>
                                  {proc.status}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">{proc.estimatedDuration} min</span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>👨‍⚕️ {proc.surgeon} • 💉 {proc.anaesthetist}</p>
                              {proc.requirements.length > 0 && (
                                <p className="text-xs">
                                  {proc.requirements.map((req, idx) => (
                                    <span key={idx} className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded mr-1">
                                      {req}
                                    </span>
                                  ))}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures scheduled</h3>
                  <p className="text-gray-600">There are no procedures for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            zIndex: 1000
          }}
          className="bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[200px]"
        >
          <button
            onClick={() => {
              setShowListOrderModal(true);
              setContextMenu({ visible: false, x: 0, y: 0, procedureId: '' });
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
          >
            <ListOrdered className="w-4 h-4 text-gray-600" />
            <span>Change List Order</span>
          </button>
          <button
            onClick={() => {
              setShowTeamModal(true);
              setContextMenu({ visible: false, x: 0, y: 0, procedureId: '' });
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
          >
            <Users className="w-4 h-4 text-gray-600" />
            <span>View Team & Requirements</span>
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => {
              console.log('Add note for', contextMenu.procedureId);
              setContextMenu({ visible: false, x: 0, y: 0, procedureId: '' });
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4 text-gray-600" />
            <span>Add Note</span>
          </button>
          <button
            onClick={() => {
              console.log('Add request for', contextMenu.procedureId);
              setContextMenu({ visible: false, x: 0, y: 0, procedureId: '' });
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
          >
            <ClipboardList className="w-4 h-4 text-gray-600" />
            <span>Add Request</span>
          </button>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && selectedProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Team & Requirements</h2>
              <button onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{selectedProcedure.procedureName}</h3>
                <p className="text-sm text-gray-600">
                  {selectedProcedure.theatre} • {selectedProcedure.scheduledTime} • {selectedProcedure.estimatedDuration} min
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Team Members</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surgeon:</span>
                    <span className="font-medium">{selectedProcedure.surgeon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assistant:</span>
                    <span className="font-medium">{selectedProcedure.assistant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Anaesthetist:</span>
                    <span className="font-medium">{selectedProcedure.anaesthetist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Anaes N/P:</span>
                    <span className="font-medium">{selectedProcedure.anaesNP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scrub N/P:</span>
                    <span className="font-medium">{selectedProcedure.scrubNP}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Equipment Required</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProcedure.equipment.map((eq, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              {selectedProcedure.requirements.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Special Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProcedure.requirements.map((req, idx) => (
                      <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List Order Modal */}
      {showListOrderModal && selectedProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Change List Order</h2>
              <button onClick={() => setShowListOrderModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Change the list order for: <span className="font-medium">{selectedProcedure.procedureName}</span>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Position: {selectedProcedure.listOrder}
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue={selectedProcedure.listOrder}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowListOrderModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowListOrderModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Procedure List Modal */}
      {showProcedureList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedTheatre} - {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {getProceduresForDay(selectedDate).length} procedures scheduled
                </p>
              </div>
              <button
                onClick={() => setShowProcedureList(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {getProceduresForDay(selectedDate).length > 0 ? (
                <div className="space-y-2">
                  {(() => {
                    const dayProcs = getProceduresForDay(selectedDate).sort((a, b) => a.listOrder - b.listOrder);
                    const firstProc = dayProcs[0];
                    const lastProc = dayProcs[dayProcs.length - 1];
                    const sessionCount = firstProc && lastProc ? calculateSessions(firstProc.startTime, lastProc.endTime) : 0;
                    const startTime = firstProc?.startTime || '';
                    const endTime = lastProc?.endTime || '';

                    return (
                      <>
                        {/* Session Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-gray-900">{startTime} - {endTime}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                  {sessionCount} Session{sessionCount !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">
                              Drag procedures to reorder
                            </span>
                          </div>
                        </div>

                        {/* Procedures */}
                        {dayProcs.map((proc, idx) => (
                          <div
                            key={proc.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, proc.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, proc.id)}
                            onClick={() => {
                              setSelectedProcedure(proc);
                              setShowProcedureDetailsModal(true);
                            }}
                            className={`
                              bg-white border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all
                              ${draggedProcedure === proc.id ? 'opacity-50' : ''}
                              ${idx === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 cursor-move" />

                              {/* List Order with Gold Badge */}
                              <div className="flex items-center space-x-2">
                                <div className={`
                                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                  ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-100 text-blue-700'}
                                `}>
                                  {proc.listOrder}
                                </div>
                                {idx === 0 && (
                                  <Award className="w-5 h-5 text-yellow-600" title="Gold Patient" />
                                )}
                              </div>

                              {/* Time */}
                              <div className="flex items-center space-x-1 text-gray-700">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium text-sm">{proc.startTime}</span>
                                <span className="text-xs text-gray-500">({proc.estimatedDuration}min)</span>
                              </div>

                              {/* Procedure Details */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900">{proc.procedureName}</h3>
                                  {proc.requirements && proc.requirements.length > 0 && (
                                    <AlertCircle className="w-5 h-5 text-red-600 cursor-pointer" title="Has alerts" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <span>👨‍⚕️ {proc.surgeon}</span>
                                  <span>•</span>
                                  <span>💉 {proc.anaesthetist}</span>
                                </div>
                              </div>

                              {/* Status */}
                              <div className={`
                                px-3 py-1 rounded text-xs font-semibold
                                ${proc.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                                  proc.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'}
                              `}>
                                {proc.status.replace('-', ' ').toUpperCase()}
                              </div>
                            </div>

                            {/* Notes Preview */}
                            {proc.notes && proc.notes.length > 0 && (
                              <div className="ml-16 mt-2 flex items-start space-x-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded">
                                <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>{proc.notes[0]}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures scheduled</h3>
                  <p className="text-gray-600">There are no procedures for this date and theatre</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Procedure Details Modal */}
      {showProcedureDetailsModal && selectedProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                    {selectedProcedure.listOrder}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedProcedure.procedureName}</h2>
                    <p className="text-purple-100 text-sm mt-1">
                      {selectedProcedure.theatre} • {selectedProcedure.specialty}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowProcedureDetailsModal(false);
                  setShowOtherTeamMembers(false);
                }}
                className="p-2 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-4">
              {/* Time & Duration */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Scheduled Time</p>
                    <p className="font-semibold text-gray-900">{selectedProcedure.startTime} - {selectedProcedure.endTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Duration</p>
                    <p className="font-semibold text-gray-900">{selectedProcedure.estimatedDuration} minutes</p>
                  </div>
                </div>
              </div>

              {/* Primary Team */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Primary Team
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Surgeon:</span>
                    <span className="font-medium text-gray-900">{selectedProcedure.surgeon}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Assistant:</span>
                    <span className="font-medium text-gray-900">{selectedProcedure.assistant}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Anaesthetist:</span>
                    <span className="font-medium text-gray-900">{selectedProcedure.anaesthetist}</span>
                  </div>
                </div>
              </div>

              {/* Collapsible Other Team Members */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setShowOtherTeamMembers(!showOtherTeamMembers)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-purple-600" />
                    Other Team Members
                  </span>
                  {showOtherTeamMembers ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {showOtherTeamMembers && (
                  <div className="p-4 pt-0 space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Anaes N/P:</span>
                      <span className="font-medium text-gray-900">{selectedProcedure.anaesNP}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Scrub N/P:</span>
                      <span className="font-medium text-gray-900">{selectedProcedure.scrubNP}</span>
                    </div>
                    {selectedProcedure.hca && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">HCA:</span>
                        <span className="font-medium text-gray-900">{selectedProcedure.hca}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Equipment */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Equipment Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProcedure.equipment.map((eq, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Requirements / Alerts */}
              {selectedProcedure.requirements && selectedProcedure.requirements.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    Alerts & Special Requirements
                  </h3>
                  <div className="space-y-2">
                    {selectedProcedure.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                        <span className="text-sm text-red-900">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes/Comments */}
              {selectedProcedure.notes && selectedProcedure.notes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                    Notes & Comments
                  </h3>
                  <div className="space-y-2">
                    {selectedProcedure.notes.map((note, idx) => (
                      <div key={idx} className="bg-blue-50 border-l-4 border-blue-600 px-4 py-3 rounded">
                        <p className="text-sm text-blue-900">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
