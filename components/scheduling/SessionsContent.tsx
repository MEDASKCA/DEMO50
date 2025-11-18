'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTheatreListsByDateRange } from '@/lib/services/theatreListService';
import { TheatreList } from '@/lib/theatreListTypes';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Hospital ID constant
const ROYAL_LONDON_HOSPITAL_ID = 'royal-london';

// Specialty abbreviation mapping
const SPECIALTY_ABBR_MAP: { [key: string]: string } = {
  'Orthopaedics': 'ORTHO',
  'Trauma': 'TRAUMA',
  'Emergency': 'EMER',
  'General Surgery': 'GS',
  'Gynaecology': 'GYNAE',
  'Urology': 'URO',
  'ENT': 'ENT',
  'Ophthalmology': 'OPHTH',
  'Plastic Surgery': 'PLAST',
  'Vascular': 'VASC',
  'Cardiac': 'CARD',
  'Neurosurgery': 'NEURO',
  'Hepatobiliary': 'HPB',
  'Colorectal': 'COLO',
  'Upper GI': 'UGI',
  'Maxillofacial': 'MAX'
};

export default function SessionsContent() {
  const [lists, setLists] = useState<TheatreList[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday(new Date()));
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSurgeon, setSelectedSurgeon] = useState<string>('all');
  const [specialtyAbbreviations, setSpecialtyAbbreviations] = useState<{ [key: string]: string }>({});
  const [subspecialtyAbbreviations, setSubspecialtyAbbreviations] = useState<{ [key: string]: string }>({});
  const [configUnits, setConfigUnits] = useState<Array<{ id: string; name: string; abbreviation: string; theatreCount: number }>>([]);
  const [configSpecialties, setConfigSpecialties] = useState<string[]>([]);
  const [configTheatres, setConfigTheatres] = useState<Array<{ id: string; name: string; unitId: string; unitName: string; unitAbbreviation: string }>>([]);
  const [configSessionTypes, setConfigSessionTypes] = useState<Array<{ id: string; name: string; abbreviation: string; displayAs: string; startTime?: string; endTime?: string }>>([]);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    theatreId: string;
    theatreName: string;
    date: Date;
    existingLists: TheatreList[];
  } | null>(null);
  const [allocationSpecialty, setAllocationSpecialty] = useState('');
  const [allocationConsultant, setAllocationConsultant] = useState('');
  const [allocationSessionType, setAllocationSessionType] = useState<string>('AM');
  const [allocationStatus, setAllocationStatus] = useState<'draft' | 'published' | 'in-progress' | 'completed' | 'cancelled'>('draft');
  const [savingAllocation, setSavingAllocation] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalCell, setActionModalCell] = useState<{
    theatreId: string;
    theatreName: string;
    date: Date;
    existingLists: TheatreList[];
  } | null>(null);
  const [showListDetailModal, setShowListDetailModal] = useState(false);
  const [selectedListForView, setSelectedListForView] = useState<TheatreList | null>(null);

  useEffect(() => {
    loadAbbreviations();
    loadConfigurations();
  }, []);

  useEffect(() => {
    loadWeekData();
  }, [currentWeekStart, viewMode]);

  async function loadAbbreviations() {
    try {
      const specialtiesSnap = await getDocs(collection(db, 'specialties'));
      const specAbbrMap: { [key: string]: string } = {};
      const subspecAbbrMap: { [key: string]: string } = {};

      specialtiesSnap.forEach(doc => {
        const data = doc.data();
        if (data.name && data.abbreviation) {
          specAbbrMap[data.name] = data.abbreviation;
        }
        if (data.subspecialties && Array.isArray(data.subspecialties)) {
          data.subspecialties.forEach((sub: any) => {
            if (sub.name && sub.abbreviation) {
              subspecAbbrMap[sub.name] = sub.abbreviation;
            }
          });
        }
      });

      setSpecialtyAbbreviations(specAbbrMap);
      setSubspecialtyAbbreviations(subspecAbbrMap);
    } catch (error) {
      console.error('Error loading abbreviations:', error);
      setSpecialtyAbbreviations(SPECIALTY_ABBR_MAP);
    }
  }

  async function loadConfigurations() {
    try {
      const [unitsSnap, specialtiesSnap, theatresSnap, sessionTypesSnap] = await Promise.all([
        getDocs(collection(db, 'theatreUnits')),
        getDocs(collection(db, 'specialties')),
        getDocs(collection(db, 'theatres')),
        getDocs(collection(db, 'sessionTypes'))
      ]);

      const units: Array<{ id: string; name: string; abbreviation: string; theatreCount: number }> = [];
      const unitAbbrevMap: { [unitId: string]: string } = {};

      unitsSnap.forEach(doc => {
        const data = doc.data();
        let abbrev = data.abbreviation;
        if (!abbrev) {
          if (data.name.includes('Main')) abbrev = 'Main';
          else if (data.name.includes('ACAD')) abbrev = 'ACAD';
          else if (data.name.includes('Emergency')) abbrev = 'Emerg';
          else abbrev = data.name.split(' ')[0];
        }
        units.push({
          id: doc.id,
          name: data.name,
          abbreviation: abbrev,
          theatreCount: data.numberOfTheatres || 0
        });
        unitAbbrevMap[doc.id] = abbrev;
      });
      setConfigUnits(units);

      const theatres: Array<{ id: string; name: string; unitId: string; unitName: string; unitAbbreviation: string }> = [];
      theatresSnap.forEach(doc => {
        const data = doc.data();
        const unit = units.find(u => u.id === data.unitId);
        theatres.push({
          id: doc.id,
          name: data.name,
          unitId: data.unitId,
          unitName: unit?.name || data.unitName || '',
          unitAbbreviation: unit?.abbreviation || unitAbbrevMap[data.unitId] || ''
        });
      });
      setConfigTheatres(theatres);

      const specialties: string[] = [];
      specialtiesSnap.forEach(doc => {
        const data = doc.data();
        if (data.name) {
          specialties.push(data.name);
        }
      });
      setConfigSpecialties(specialties.sort());

      const sessionTypes: Array<{ id: string; name: string; abbreviation: string; displayAs: string; startTime?: string; endTime?: string }> = [];
      sessionTypesSnap.forEach(doc => {
        const data = doc.data();
        if (data.abbreviation) {
          sessionTypes.push({
            id: doc.id,
            name: data.name || data.abbreviation,
            abbreviation: data.abbreviation,
            displayAs: data.displayAs || data.abbreviation,
            startTime: data.startTime,
            endTime: data.endTime
          });
        }
      });
      setConfigSessionTypes(sessionTypes.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error loading configurations:', error);
    }
  }

  function getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function getMonthStart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function getMonthEnd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  const loadWeekData = async () => {
    try {
      setLoading(true);
      let startDate: string;
      let endDate: string;

      if (viewMode === 'month') {
        const monthStart = getMonthStart(currentWeekStart);
        const monthEnd = getMonthEnd(currentWeekStart);
        startDate = monthStart.toISOString().split('T')[0];
        endDate = monthEnd.toISOString().split('T')[0];
      } else {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        startDate = currentWeekStart.toISOString().split('T')[0];
        endDate = weekEnd.toISOString().split('T')[0];
      }

      const data = await getTheatreListsByDateRange(startDate, endDate);
      setLists(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const prevWeek = () => {
    const newDate = new Date(currentWeekStart);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentWeekStart(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeekStart(newDate);
  };

  const goToThisWeek = () => {
    if (viewMode === 'month') {
      setCurrentWeekStart(new Date());
    } else {
      setCurrentWeekStart(getMonday(new Date()));
    }
  };

  const handleCellClick = (theatreId: string, theatreName: string, date: Date, isClosed: boolean) => {
    if (isClosed) return;
    const dayLists = getListsForTheatreAndDate(theatreId, date);

    // If there are existing lists, show action modal (view or modify)
    if (dayLists.length > 0) {
      setActionModalCell({ theatreId, theatreName, date, existingLists: dayLists });
      setShowActionModal(true);
    } else {
      // If no existing lists, go directly to create allocation modal
      setSelectedCell({ theatreId, theatreName, date, existingLists: dayLists });
      setAllocationSpecialty('');
      setAllocationConsultant('');
      setAllocationSessionType('AM');
      setAllocationStatus('draft');
      setShowAllocationModal(true);
    }
  };

  const handleCloseAllocationModal = () => {
    setShowAllocationModal(false);
    setSelectedCell(null);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false);
    setActionModalCell(null);
  };

  const handleViewList = () => {
    if (!actionModalCell || !actionModalCell.existingLists || actionModalCell.existingLists.length === 0) return;
    // Show the first list (or we could enhance this to let user choose if multiple)
    setSelectedListForView(actionModalCell.existingLists[0]);
    setShowListDetailModal(true);
    setShowActionModal(false);
    setActionModalCell(null);
  };

  const handleCloseListDetailModal = () => {
    setShowListDetailModal(false);
    setSelectedListForView(null);
  };

  const handleModifyList = () => {
    if (!actionModalCell) return;
    // Close action modal and open allocation modal for modification
    setSelectedCell({
      theatreId: actionModalCell.theatreId,
      theatreName: actionModalCell.theatreName,
      date: actionModalCell.date,
      existingLists: actionModalCell.existingLists
    });
    setShowActionModal(false);
    setActionModalCell(null);
    setAllocationSpecialty('');
    setAllocationConsultant('');
    setAllocationSessionType('AM');
    setAllocationStatus('draft');
    setShowAllocationModal(true);
  };

  const handleSaveAllocation = async () => {
    if (!selectedCell) return;
    if (!allocationSpecialty || !allocationConsultant || !allocationSessionType) {
      alert('Please fill in all required fields');
      return;
    }

    setSavingAllocation(true);
    try {
      const theatre = configTheatres.find(t => t.id === selectedCell.theatreId);
      if (!theatre) throw new Error('Theatre not found');

      // Find the selected session type configuration
      const selectedSessionConfig = sessionTypes.find(st =>
        typeof st === 'string' ? st === allocationSessionType : st.abbreviation === allocationSessionType
      );

      // Determine session times and duration
      let startTime = '08:00';
      let endTime = '18:00';
      let durationMinutes = 600;

      if (selectedSessionConfig && typeof selectedSessionConfig !== 'string') {
        startTime = selectedSessionConfig.startTime || '08:00';
        endTime = selectedSessionConfig.endTime || '18:00';
        // Calculate duration in minutes
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      } else {
        // Fallback for legacy hardcoded values
        if (allocationSessionType === 'AM') {
          startTime = '08:00';
          endTime = '13:00';
          durationMinutes = 300;
        } else if (allocationSessionType === 'PM') {
          startTime = '13:00';
          endTime = '17:00';
          durationMinutes = 240;
        } else if (allocationSessionType === 'EVE') {
          startTime = '17:00';
          endTime = '21:00';
          durationMinutes = 240;
        } else if (allocationSessionType === 'FULL') {
          startTime = '08:00';
          endTime = '18:00';
          durationMinutes = 600;
        } else if (allocationSessionType === 'EXTENDED') {
          startTime = '08:00';
          endTime = '20:00';
          durationMinutes = 720;
        }
      }

      const newList: Partial<TheatreList> = {
        date: selectedCell.date.toISOString().split('T')[0],
        dayOfWeek: selectedCell.date.toLocaleDateString('en-GB', { weekday: 'long' }),
        theatreId: selectedCell.theatreId,
        theatreName: selectedCell.theatreName,
        unitId: theatre.unitId,
        unitName: theatre.unitName,
        hospitalId: ROYAL_LONDON_HOSPITAL_ID,
        hospitalName: 'Royal London Hospital',
        specialty: allocationSpecialty,
        sessionType: allocationSessionType,
        sessionTimes: {
          start: startTime,
          end: endTime
        },
        sessionDurationMinutes: durationMinutes,
        primarySurgeonName: allocationConsultant,
        primarySurgeonInitials: allocationConsultant.split(' ').map(n => n[0]).join(''),
        primaryAnaesthetistName: 'TBD',
        primaryAnaesthetistInitials: 'TBD',
        cases: [],
        totalCases: 0,
        totalEstimatedTime: 0,
        utilizationPercentage: 0,
        status: allocationStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: `Manual allocation - ${allocationSpecialty}`
      };

      await addDoc(collection(db, 'theatreLists'), newList);
      await loadWeekData();
      handleCloseAllocationModal();
      alert('Allocation saved successfully!');
    } catch (error) {
      console.error('Error saving allocation:', error);
      alert('Failed to save allocation. Please try again.');
    } finally {
      setSavingAllocation(false);
    }
  };

  const generateSchedule = async () => {
    if (!confirm('Generate schedules for the next 4 weeks based on your theatre configurations?')) return;

    setGenerating(true);
    try {
      const startDate = new Date(currentWeekStart);
      const endDate = new Date(currentWeekStart);
      endDate.setDate(endDate.getDate() + 28);

      const response = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospitalId: 'royal-london-hospital',
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert(`✅ Success!\n\nGenerated ${result.listsGenerated} theatre lists.`);
        await loadWeekData();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('❌ Failed to generate schedule.');
    } finally {
      setGenerating(false);
    }
  };

  const getTheatres = (): { id: string; name: string; unitName: string; unitAbbreviation: string }[] => {
    if (configTheatres.length > 0) {
      return configTheatres
        .map(t => ({
          id: t.id,
          name: t.name,
          unitName: t.unitName.replace(/\s+Suite$/i, ''),
          unitAbbreviation: t.unitAbbreviation
        }))
        .sort((a, b) => {
          const numA = parseInt(a.name.match(/\d+/)?.[0] || '999');
          const numB = parseInt(b.name.match(/\d+/)?.[0] || '999');
          return numA - numB;
        });
    }
    return [];
  };

  const getUnits = (): Array<{ name: string; theatreCount: number }> => {
    return configUnits.map(u => ({ name: u.name, theatreCount: u.theatreCount })).sort((a, b) => a.name.localeCompare(b.name));
  };

  const getSurgeons = (): string[] => {
    const surgeons = new Set<string>();
    lists.forEach(list => surgeons.add(list.primarySurgeonName));
    return Array.from(surgeons).sort();
  };

  const getWeekDays = (): Date[] => {
    const days: Date[] = [];
    if (viewMode === 'month') {
      const monthStart = getMonthStart(currentWeekStart);
      const monthEnd = getMonthEnd(currentWeekStart);
      const daysInMonth = monthEnd.getDate();
      for (let i = 0; i < daysInMonth; i++) {
        const day = new Date(monthStart);
        day.setDate(day.getDate() + i);
        days.push(day);
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const day = new Date(currentWeekStart);
        day.setDate(day.getDate() + i);
        days.push(day);
      }
    }
    return days;
  };

  const getListsForTheatreAndDate = (theatreId: string, date: Date): TheatreList[] => {
    const dateStr = date.toISOString().split('T')[0];

    // Match lists by individual theatreId
    // Each theatre gets its own list based on priority mappings
    return lists.filter(list => list.theatreId === theatreId && list.date === dateStr).sort((a, b) => {
      const order = { FULL: 0, AM: 1, PM: 2, EVE: 3, EXTENDED: 4 };
      return order[a.sessionType] - order[b.sessionType];
    });
  };

  const getSpecialties = (): string[] => {
    return configSpecialties.length > 0 ? configSpecialties : Array.from(new Set(lists.map(l => l.specialty))).sort();
  };

  const getAbbreviation = (specialty: string, subspecialty?: string): string => {
    if (subspecialty && subspecialtyAbbreviations[subspecialty]) {
      return subspecialtyAbbreviations[subspecialty];
    }
    if (specialtyAbbreviations[specialty]) {
      return specialtyAbbreviations[specialty];
    }
    if (SPECIALTY_ABBR_MAP[specialty]) {
      return SPECIALTY_ABBR_MAP[specialty];
    }
    return specialty.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 6);
  };

  const isEmergencyOrTrauma = (theatreName: string): boolean => {
    const nameLower = theatreName.toLowerCase();
    return nameLower.includes('emergency') || nameLower.includes('trauma');
  };

  const splitSessionForDisplay = (list: TheatreList): Array<{
    list: TheatreList;
    displaySessionType: string;
    displayTimes: { start: string; end: string };
  }> => {
    const startTime = list.sessionTimes.start;
    const endTime = list.sessionTimes.end;

    if (list.sessionType === 'FULL' && endTime >= '18:00') {
      return [
        { list, displaySessionType: 'AM', displayTimes: { start: '08:00', end: '13:00' } },
        { list, displaySessionType: 'PM', displayTimes: { start: '13:00', end: '18:00' } },
        { list, displaySessionType: 'EXTENDED', displayTimes: { start: '18:00', end: endTime } }
      ];
    }

    if (endTime > '18:00' && list.sessionType !== 'AM' && list.sessionType !== 'PM') {
      return [{ list, displaySessionType: 'EXTENDED', displayTimes: { start: startTime, end: endTime } }];
    }

    return [{ list, displaySessionType: list.sessionType, displayTimes: { start: startTime, end: endTime } }];
  };

  const allTheatres = getTheatres();
  const theatres = selectedUnit === 'all' ? allTheatres : allTheatres.filter(t => t.unitName === selectedUnit);
  const theatresByUnit = theatres.reduce((acc, theatre) => {
    const unitName = theatre.unitName;
    if (!acc[unitName]) acc[unitName] = [];
    acc[unitName].push(theatre);
    return acc;
  }, {} as Record<string, typeof theatres>);

  const weekDays = getWeekDays();
  const specialties = getSpecialties();
  const units = getUnits();
  const surgeons = getSurgeons();
  // Use configured session types or fallback to default hardcoded types
  const sessionTypes = configSessionTypes.length > 0
    ? configSessionTypes
    : [
        { id: 'am', name: 'AM', abbreviation: 'AM', displayAs: 'AM', startTime: '08:00', endTime: '13:00' },
        { id: 'pm', name: 'PM', abbreviation: 'PM', displayAs: 'PM', startTime: '13:00', endTime: '17:00' },
        { id: 'eve', name: 'EVE', abbreviation: 'EVE', displayAs: 'EVE', startTime: '17:00', endTime: '21:00' },
        { id: 'full', name: 'FULL', abbreviation: 'FULL', displayAs: 'FULL', startTime: '08:00', endTime: '18:00' },
        { id: 'extended', name: 'EXTENDED', abbreviation: 'EXTENDED', displayAs: 'EXTENDED', startTime: '08:00', endTime: '20:00' }
      ];
  const statuses = ['draft', 'published', 'in-progress', 'completed', 'cancelled'];

  const weekDisplay = viewMode === 'month'
    ? currentWeekStart.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : `${currentWeekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${weekDays[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  return (
    <div className="w-full">
      <div className="max-w-[2000px] mx-auto">
        {/* Week Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-4 mb-2 md:mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-2 md:mb-4 gap-2">
            <div className="flex items-center gap-1 md:gap-2 w-full md:w-auto">
              <button
                onClick={prevWeek}
                className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100 rounded-lg transition-colors text-xs md:text-sm"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium hidden md:inline">Previous {viewMode === 'week' ? 'Week' : 'Month'}</span>
                <span className="font-medium md:hidden">Prev</span>
              </button>

              <div className="text-center flex-1">
                <h2 className="text-sm md:text-xl font-bold text-gray-900">{weekDisplay}</h2>
              </div>

              <button
                onClick={nextWeek}
                className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100 rounded-lg transition-colors text-xs md:text-sm"
              >
                <span className="font-medium hidden md:inline">Next {viewMode === 'week' ? 'Week' : 'Month'}</span>
                <span className="font-medium md:hidden">Next</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 md:gap-3">
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-md transition-colors ${
                  viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-md transition-colors ${
                  viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Month
              </button>
            </div>

            <button onClick={goToThisWeek} className="px-2 py-1 md:px-4 md:py-2 bg-blue-500 text-white text-xs md:text-sm rounded-lg hover:bg-blue-600 transition-colors">
              Today
            </button>

            <button
              onClick={generateSchedule}
              disabled={generating}
              className="px-2 py-1 md:px-4 md:py-2 bg-green-600 text-white text-xs md:text-sm rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-2 border-white border-t-transparent"></div>
                  <span className="hidden md:inline">Generating...</span>
                </>
              ) : (
                <>🤖 <span className="hidden md:inline">Auto-Generate</span><span className="md:hidden">Gen</span></>
              )}
            </button>

            <div className="w-full md:w-auto">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm"
              >
                <option value="all">All Units</option>
                {units.map(unit => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}{unit.theatreCount > 0 ? ` (${unit.theatreCount})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-auto">
              <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                <option value="all">All Specialties</option>
                {specialties.map(specialty => <option key={specialty} value={specialty}>{specialty}</option>)}
              </select>
            </div>

            <div className="w-full md:w-auto">
              <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                <option value="all">All Sessions</option>
                {sessionTypes.map(session => <option key={typeof session === 'string' ? session : session.abbreviation} value={typeof session === 'string' ? session : session.abbreviation}>{typeof session === 'string' ? session : session.name}</option>)}
              </select>
            </div>

            <div className="w-full md:w-auto">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                <option value="all">All Statuses</option>
                {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
              </select>
            </div>

            <div className="w-full md:w-auto">
              <select value={selectedSurgeon} onChange={(e) => setSelectedSurgeon(e.target.value)} className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm">
                <option value="all">All Surgeons</option>
                {surgeons.map(surgeon => <option key={surgeon} value={surgeon}>{surgeon}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Theatre Schedule Grid */}
        {loading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schedule...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-sm overflow-x-auto touch-pan-x">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-300">
                  <th className={`${viewMode === 'month' ? 'px-0.5 py-2 min-w-[50px] max-w-[50px] w-[50px]' : 'px-2 py-2 md:px-4 md:py-3 min-w-[80px] md:min-w-[120px]'} text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 border-r-2 border-gray-300`}>
                  </th>
                  {weekDays.map((day, idx) => {
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                      <th
                        key={idx}
                        className={`${viewMode === 'month' ? 'px-0.5 py-2 w-[40px] min-w-[40px] max-w-[40px]' : 'px-1 py-2 md:px-3 md:py-3 min-w-[100px] md:min-w-[150px]'} text-center text-xs font-semibold border-r-2 border-gray-300 ${
                          isToday ? 'bg-blue-100' : isWeekend ? 'bg-gray-100' : 'bg-gray-50'
                        }`}
                      >
                        {viewMode === 'month' ? (
                          <div className={`text-sm font-bold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>{day.getDate()}</div>
                        ) : (
                          <>
                            <div className={`text-[10px] md:text-xs ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                              {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                            </div>
                            <div className={`text-sm md:text-lg font-bold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>{day.getDate()}</div>
                            <div className={`text-[10px] md:text-xs ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                              {day.toLocaleDateString('en-GB', { month: 'short' })}
                            </div>
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {Object.entries(theatresByUnit).map(([unitName, unitTheatres]) => {
                  const unitData = units.find(u => u.name === unitName);
                  const theatreCount = unitData?.theatreCount || unitTheatres.length;
                  let displayUnitName = unitName.replace(/\s+Suite$/i, '');
                  if (!displayUnitName.includes('Theatres')) {
                    displayUnitName = displayUnitName.replace(/Theatre$/i, 'Theatres');
                  }

                  return (
                    <React.Fragment key={unitName}>
                      <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-b-2 border-gray-300">
                        <td
                          colSpan={weekDays.length + 1}
                          className={`${viewMode === 'month' ? 'px-2 py-1.5 text-base' : 'px-2 py-2 md:px-4 md:py-3 text-sm md:text-xl'} font-bold sticky left-0 z-10 text-center`}
                        >
                          {viewMode === 'month' ? `${unitData?.abbreviation || displayUnitName.split(' ')[0]} (${theatreCount})` : `${displayUnitName} (${theatreCount})`}
                        </td>
                      </tr>

                      {unitTheatres.map((theatre, theatreIdx) => {
                        const isEmergencyTrauma = isEmergencyOrTrauma(theatre.name);
                        const theatreNumber = theatre.name.match(/\d+/)?.[0] || '';
                        const displayName = theatreNumber ? `${theatre.unitAbbreviation} ${theatreNumber}` : theatre.name;

                        return (
                          <tr
                            key={theatre.id}
                            className={`border-b-2 border-gray-300 hover:bg-gray-50 transition-colors ${
                              theatreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}
                          >
                            <td className={`${viewMode === 'month' ? 'px-0.5 py-2 w-[50px] min-w-[50px] max-w-[50px]' : 'px-2 py-2 md:px-4 md:py-3'} sticky left-0 z-10 border-r-2 border-gray-300 ${
                              theatreIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}>
                              <div className={`font-bold ${viewMode === 'month' ? 'text-sm leading-tight' : 'text-sm md:text-lg'} text-gray-900 text-center`}>{displayName}</div>
                            </td>

                            {weekDays.map((day, dayIdx) => {
                              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                              const isToday = day.toDateString() === new Date().toDateString();
                              const dayLists = getListsForTheatreAndDate(theatre.id, day);
                              const filteredLists = dayLists.filter(list => {
                                if (selectedSpecialty !== 'all' && list.specialty !== selectedSpecialty) return false;
                                if (selectedSession !== 'all' && list.sessionType !== selectedSession) return false;
                                if (selectedStatus !== 'all' && list.status !== selectedStatus) return false;
                                if (selectedSurgeon !== 'all' && list.primarySurgeonName !== selectedSurgeon) return false;
                                return true;
                              });
                              const shouldShowClosed = isWeekend && !isEmergencyTrauma && filteredLists.length === 0;

                              return (
                                <td
                                  key={dayIdx}
                                  onClick={() => handleCellClick(theatre.id, theatre.name, day, shouldShowClosed)}
                                  className={`border-r-2 border-gray-300 ${
                                    shouldShowClosed ? 'bg-red-500 p-0 cursor-not-allowed' :
                                    isToday ? 'bg-blue-50 cursor-pointer hover:bg-blue-100' :
                                    isWeekend ? 'bg-gray-50 cursor-pointer hover:bg-gray-100' :
                                    theatreIdx % 2 === 0 ? 'bg-white cursor-pointer hover:bg-gray-50' : 'bg-gray-50/30 cursor-pointer hover:bg-gray-100'
                                  } ${!shouldShowClosed && (viewMode === 'month' ? 'px-0.5 py-2 w-[40px] min-w-[40px] max-w-[40px] h-[40px] align-middle' : 'px-1 py-1 md:px-2 md:py-2 align-top')} transition-colors`}
                                >
                                  {shouldShowClosed ? (
                                    viewMode === 'month' ? (
                                      <div className="bg-red-500 text-white w-full h-full flex items-center justify-center min-h-[40px]">
                                        <div className="text-[8px] font-bold">CLOSED</div>
                                      </div>
                                    ) : (
                                      <div className="bg-red-500 text-white text-center font-bold text-xs md:text-sm h-full min-h-[100px] flex items-center justify-center">
                                        CLOSED
                                      </div>
                                    )
                                  ) : filteredLists.length > 0 ? (
                                    viewMode === 'month' ? (
                                      <div className="flex flex-wrap gap-0.5 justify-center">
                                        {filteredLists.flatMap((list) => {
                                          const displaySessions = splitSessionForDisplay(list);
                                          return displaySessions.map((session, idx) => {
                                            const bgColor =
                                              session.displaySessionType === 'FULL' || session.displaySessionType === 'EXTENDED' ? 'bg-red-500' :
                                              session.displaySessionType === 'AM' ? 'bg-blue-500' :
                                              session.displaySessionType === 'PM' ? 'bg-purple-500' :
                                              session.displaySessionType === 'EVE' ? 'bg-orange-500' :
                                              'bg-gray-500';

                                            return (
                                              <div
                                                key={`${list.id}-${idx}`}
                                                className={`${bgColor} w-2.5 h-2.5 rounded-full cursor-pointer hover:opacity-70 transition-opacity`}
                                                title={`${list.specialty}${list.subspecialty ? ' - ' + list.subspecialty : ''}\n${session.displaySessionType} Session (${session.displayTimes.start}-${session.displayTimes.end})\nSurgeon: ${list.primarySurgeonName}\n${list.totalCases} cases`}
                                              />
                                            );
                                          });
                                        })}
                                      </div>
                                    ) : (
                                      <div className="space-y-1">
                                        {filteredLists.flatMap((list) => {
                                          const displaySessions = splitSessionForDisplay(list);
                                          return displaySessions.map((session, idx) => {
                                            const bgColor =
                                              session.displaySessionType === 'FULL' || session.displaySessionType === 'EXTENDED' ? 'bg-red-100 text-red-800 border-red-300' :
                                              session.displaySessionType === 'AM' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                              session.displaySessionType === 'PM' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                                              session.displaySessionType === 'EVE' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                                              'bg-gray-100 text-gray-800 border-gray-300';
                                            const abbr = getAbbreviation(list.specialty, list.subspecialty);

                                            // Utilization color coding
                                            const utilization = list.utilizationPercentage || 0;
                                            const utilizationColor =
                                              utilization >= 80 ? 'bg-green-500' :
                                              utilization >= 60 ? 'bg-amber-500' :
                                              'bg-red-500';

                                            // Format currency
                                            const revenue = list.estimatedRevenue || list.totalEstimatedCost || 0;
                                            const revenueLost = list.potentialRevenueLost || 0;
                                            const revenueDisplay = revenue > 0 ? `£${(revenue / 1000).toFixed(1)}k` : '';
                                            const canFitMore = list.canFitMore || false;

                                            return (
                                              <div
                                                key={`${list.id}-${idx}`}
                                                className={`${bgColor} px-1.5 py-1.5 md:px-2 md:py-2 rounded border cursor-pointer hover:opacity-80 transition-opacity relative ${canFitMore ? 'ring-2 ring-green-400' : ''}`}
                                                title={`${list.specialty}${list.subspecialty ? ' - ' + list.subspecialty : ''}\n${session.displaySessionType} Session (${session.displayTimes.start}-${session.displayTimes.end})\nSurgeon: ${list.primarySurgeonName}\nAnaesthetist: ${list.primaryAnaesthetistName}\n${list.totalCases} cases • ${list.utilizationPercentage}% utilized\n${revenue > 0 ? `Revenue: £${revenue.toLocaleString()}` : ''}\n${revenueLost > 0 ? `Potential Lost: £${revenueLost.toLocaleString()}` : ''}\n${canFitMore ? '✓ Space available for more cases' : ''}`}
                                              >
                                                <div className="flex items-start justify-between mb-0.5 md:mb-1">
                                                  <div className="text-xs md:text-sm font-bold">{abbr}</div>
                                                  <div className={`${utilizationColor} text-white text-[8px] md:text-[9px] px-1 py-0.5 rounded font-bold`}>
                                                    {utilization}%
                                                  </div>
                                                </div>
                                                <div className="text-[9px] md:text-[10px] leading-tight">
                                                  <div>{session.displayTimes.start}-{session.displayTimes.end} ({session.abbreviation || session.type})</div>
                                                  <div>{list.primarySurgeonInitials}/{list.primaryAnaesthetistInitials}</div>
                                                  {revenueDisplay && (
                                                    <div className="text-[8px] md:text-[9px] font-bold text-green-700 mt-0.5">
                                                      {revenueDisplay}
                                                    </div>
                                                  )}
                                                </div>
                                                {canFitMore && (
                                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Space available"></div>
                                                )}
                                              </div>
                                            );
                                          });
                                        })}
                                      </div>
                                    )
                                  ) : (
                                    <div className="text-center text-[10px] md:text-xs text-gray-400 py-1 md:py-2">
                                      <div className="font-mono text-red-500">#{theatreIdx+1}.{dayIdx+1}</div>
                                      <div>—</div>
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Period Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(() => {
              const filteredSessionsForStats = lists.filter(list => {
                if (selectedSpecialty !== 'all' && list.specialty !== selectedSpecialty) return false;
                if (selectedSession !== 'all' && list.sessionType !== selectedSession) return false;
                if (selectedStatus !== 'all' && list.status !== selectedStatus) return false;
                if (selectedSurgeon !== 'all' && list.primarySurgeonName !== selectedSurgeon) return false;
                return true;
              });

              const totalSessions = filteredSessionsForStats.length;
              const totalRevenue = filteredSessionsForStats.reduce((sum, list) => sum + (list.estimatedRevenue || list.totalEstimatedCost || 0), 0);
              const totalRevenueLost = filteredSessionsForStats.reduce((sum, list) => sum + (list.potentialRevenueLost || 0), 0);
              const avgUtilization = totalSessions > 0
                ? Math.round(filteredSessionsForStats.reduce((sum, list) => sum + (list.utilizationPercentage || 0), 0) / totalSessions)
                : 0;
              const totalCases = filteredSessionsForStats.reduce((sum, list) => sum + (list.totalCases || 0), 0);

              const utilizationColor =
                avgUtilization >= 80 ? 'text-green-600' :
                avgUtilization >= 60 ? 'text-amber-600' :
                'text-red-600';

              return (
                <>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Sessions</div>
                    <div className="text-2xl font-bold text-gray-900">{totalSessions}</div>
                    <div className="text-xs text-gray-500 mt-1">{totalCases} cases</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Avg Utilization</div>
                    <div className={`text-2xl font-bold ${utilizationColor}`}>{avgUtilization}%</div>
                    <div className="text-xs text-gray-500 mt-1">across all sessions</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-green-600">£{(totalRevenue / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-gray-500 mt-1">generated</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Revenue Lost</div>
                    <div className="text-2xl font-bold text-red-600">£{(totalRevenueLost / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-gray-500 mt-1">unused capacity</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span>AM (08:00-13:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span>PM (13:00-18:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>Extended (18:00+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
              <span>EVE Session</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>CLOSED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              <span>Space Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Selection Modal */}
      {showActionModal && actionModalCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[95vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 md:px-6 py-3 md:py-4 rounded-t-lg sticky top-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-xl font-bold truncate">{actionModalCell.theatreName}</h2>
                  <p className="text-xs md:text-sm text-white/90 truncate">{actionModalCell.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <button onClick={handleCloseActionModal} className="text-white hover:bg-white/20 rounded-full p-1.5 md:p-2 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-3 md:p-6">
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">What would you like to do?</h3>

              {/* Show existing lists */}
              <div className="mb-4 md:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3">Current Sessions ({actionModalCell.existingLists.length})</h4>
                <div className="space-y-2">
                  {actionModalCell.existingLists.map((list) => (
                    <div key={list.id} className="bg-white border border-blue-200 rounded-lg p-2 md:p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs md:text-sm font-semibold text-blue-900 truncate">{list.specialty}</div>
                          <div className="text-[10px] md:text-xs text-blue-700 truncate">
                            {list.sessionType} • {list.primarySurgeonName} • {list.totalCases} cases
                          </div>
                        </div>
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[9px] md:text-xs font-medium flex-shrink-0 ${
                          list.status === 'published' ? 'bg-green-100 text-green-800' :
                          list.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          list.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          list.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {list.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <button
                  onClick={handleViewList}
                  className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg hover:from-blue-100 hover:to-cyan-100 active:scale-95 transition-all group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm md:text-lg text-gray-900">View List</div>
                    <div className="text-[10px] md:text-xs text-gray-600">See details</div>
                  </div>
                </button>

                <button
                  onClick={handleModifyList}
                  className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg hover:from-purple-100 hover:to-pink-100 active:scale-95 transition-all group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm md:text-lg text-gray-900">Modify</div>
                    <div className="text-[10px] md:text-xs text-gray-600">Add sessions</div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleCloseActionModal}
                className="w-full mt-3 md:mt-4 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-50 active:scale-95 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Modal */}
      {showAllocationModal && selectedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedCell.theatreName}</h2>
                  <p className="text-sm text-white/90">{selectedCell.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <button onClick={handleCloseAllocationModal} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors" disabled={savingAllocation}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedCell.existingLists.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Allocations</h3>
                  <div className="space-y-2">
                    {selectedCell.existingLists.map((list) => (
                      <div key={list.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-blue-900">{list.specialty}</div>
                            <div className="text-xs text-blue-700">
                              {list.sessionType} Session • {list.primarySurgeonName} • {list.totalCases} cases
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            list.status === 'published' ? 'bg-green-100 text-green-800' :
                            list.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            list.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            list.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {list.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  {selectedCell.existingLists.length > 0 ? 'Add New Allocation' : 'Create Allocation'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={allocationSpecialty}
                      onChange={(e) => setAllocationSpecialty(e.target.value)}
                      disabled={savingAllocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultant/Surgeon <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={allocationConsultant}
                      onChange={(e) => setAllocationConsultant(e.target.value)}
                      disabled={savingAllocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select Surgeon</option>
                      {surgeons.map(surgeon => (
                        <option key={surgeon} value={surgeon}>{surgeon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={allocationSessionType}
                      onChange={(e) => setAllocationSessionType(e.target.value)}
                      disabled={savingAllocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      {sessionTypes.map(session => {
                        const sessionAbbr = typeof session === 'string' ? session : session.abbreviation;
                        const sessionName = typeof session === 'string' ? session : session.name;
                        const sessionTime = typeof session === 'string' ? '' : (session.startTime && session.endTime ? ` (${session.startTime}-${session.endTime})` : '');
                        return (
                          <option key={sessionAbbr} value={sessionAbbr}>
                            {sessionName}{sessionTime}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={allocationStatus}
                      onChange={(e) => setAllocationStatus(e.target.value as any)}
                      disabled={savingAllocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveAllocation}
                    disabled={savingAllocation}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {savingAllocation ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Allocation'
                    )}
                  </button>
                  <button
                    onClick={handleCloseAllocationModal}
                    disabled={savingAllocation}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Detail Modal */}
      {showListDetailModal && selectedListForView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 md:px-6 py-3 md:py-4 flex-shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-xl font-bold truncate">Theatre List Details</h2>
                  <p className="text-xs md:text-sm text-white/90 truncate">
                    {selectedListForView.theatreName} • {selectedListForView.dayOfWeek} {new Date(selectedListForView.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button onClick={handleCloseListDetailModal} className="text-white hover:bg-white/20 rounded-full p-1.5 md:p-2 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              {/* Session Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Session Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.specialty}</span>
                    </div>
                    {selectedListForView.subspecialty && (
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-600">Subspecialty:</span>
                        <span className="font-semibold text-gray-900">{selectedListForView.subspecialty}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Session Type:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.sessionType}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Session Times:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.sessionTimes.start} - {selectedListForView.sessionTimes.end}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.sessionDurationMinutes} minutes</span>
                    </div>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Surgeon:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.primarySurgeonName}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Anaesthetist:</span>
                      <span className="font-semibold text-gray-900">{selectedListForView.primaryAnaesthetistName}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        selectedListForView.status === 'published' ? 'bg-green-100 text-green-800' :
                        selectedListForView.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        selectedListForView.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        selectedListForView.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedListForView.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-2 md:p-3">
                  <div className="text-[10px] md:text-xs text-gray-600 mb-1">Total Cases</div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedListForView.totalCases}</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-2 md:p-3">
                  <div className="text-[10px] md:text-xs text-gray-600 mb-1">Utilization</div>
                  <div className={`text-lg md:text-2xl font-bold ${
                    selectedListForView.utilizationPercentage >= 80 ? 'text-green-600' :
                    selectedListForView.utilizationPercentage >= 60 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {selectedListForView.utilizationPercentage}%
                  </div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-2 md:p-3">
                  <div className="text-[10px] md:text-xs text-gray-600 mb-1">Total Time</div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">{selectedListForView.totalEstimatedTime} min</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-2 md:p-3">
                  <div className="text-[10px] md:text-xs text-gray-600 mb-1">Time Remaining</div>
                  <div className="text-lg md:text-2xl font-bold text-blue-600">{selectedListForView.timeRemaining || 0} min</div>
                </div>
              </div>

              {/* Financial Info */}
              {(selectedListForView.estimatedRevenue || selectedListForView.totalEstimatedCost || selectedListForView.potentialRevenueLost) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {(selectedListForView.estimatedRevenue || selectedListForView.totalEstimatedCost) && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-2 md:p-3">
                      <div className="text-[10px] md:text-xs text-green-700 mb-1">Estimated Revenue</div>
                      <div className="text-lg md:text-2xl font-bold text-green-600">
                        £{((selectedListForView.estimatedRevenue || selectedListForView.totalEstimatedCost || 0) / 1000).toFixed(1)}k
                      </div>
                    </div>
                  )}
                  {selectedListForView.potentialRevenueLost && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-2 md:p-3">
                      <div className="text-[10px] md:text-xs text-red-700 mb-1">Revenue Lost</div>
                      <div className="text-lg md:text-2xl font-bold text-red-600">
                        £{(selectedListForView.potentialRevenueLost / 1000).toFixed(1)}k
                      </div>
                    </div>
                  )}
                  {selectedListForView.canFitMore && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-2 md:p-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl mb-1">✓</div>
                        <div className="text-[10px] md:text-xs text-blue-700 font-semibold">Space Available</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Procedures List */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3 md:p-4">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Procedures ({selectedListForView.cases.length})</h3>

                {selectedListForView.cases.length === 0 ? (
                  <div className="text-center py-6 md:py-8 text-gray-500">
                    <div className="text-3xl md:text-4xl mb-2">📋</div>
                    <div className="text-sm md:text-base">No procedures added yet</div>
                    <div className="text-xs md:text-sm text-gray-400 mt-1">This is an empty theatre list</div>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    {selectedListForView.cases.map((caseItem, index) => (
                      <div key={caseItem.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-2 md:gap-3">
                          {/* Case Number */}
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm">
                            {caseItem.caseOrder}
                          </div>

                          {/* Case Details */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs md:text-sm text-gray-900 mb-1">{caseItem.procedureName}</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 text-[10px] md:text-xs text-gray-600">
                              <div className="flex justify-between md:block">
                                <span className="text-gray-500">Surgeon:</span>
                                <span className="font-medium ml-1 md:ml-0">{caseItem.surgeonFullName}</span>
                              </div>
                              <div className="flex justify-between md:block">
                                <span className="text-gray-500">Anaesthetist:</span>
                                <span className="font-medium ml-1 md:ml-0">{caseItem.anaesthetistFullName}</span>
                              </div>
                              <div className="flex justify-between md:block">
                                <span className="text-gray-500">Anaesthetic:</span>
                                <span className="font-medium ml-1 md:ml-0">{caseItem.anaestheticType}</span>
                              </div>
                              <div className="flex justify-between md:block">
                                <span className="text-gray-500">Specialty:</span>
                                <span className="font-medium ml-1 md:ml-0">{caseItem.specialty}</span>
                              </div>
                            </div>

                            {/* Time Breakdown */}
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
                              <div className="bg-blue-100 rounded px-1.5 md:px-2 py-1">
                                <div className="text-[9px] md:text-[10px] text-blue-700">Surgical</div>
                                <div className="text-xs md:text-sm font-bold text-blue-900">{caseItem.estimatedSurgicalTime} min</div>
                              </div>
                              <div className="bg-purple-100 rounded px-1.5 md:px-2 py-1">
                                <div className="text-[9px] md:text-[10px] text-purple-700">Anaesthetic</div>
                                <div className="text-xs md:text-sm font-bold text-purple-900">{caseItem.anaestheticTime} min</div>
                              </div>
                              <div className="bg-amber-100 rounded px-1.5 md:px-2 py-1">
                                <div className="text-[9px] md:text-[10px] text-amber-700">Turnover</div>
                                <div className="text-xs md:text-sm font-bold text-amber-900">{caseItem.turnoverTime} min</div>
                              </div>
                              <div className="bg-green-100 rounded px-1.5 md:px-2 py-1">
                                <div className="text-[9px] md:text-[10px] text-green-700">Total</div>
                                <div className="text-xs md:text-sm font-bold text-green-900">{caseItem.totalCaseTime} min</div>
                              </div>
                            </div>

                            {/* PCS Scores */}
                            <div className="mt-2 flex flex-wrap gap-1">
                              <span className="bg-gray-200 text-gray-700 text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-medium">
                                PCS: {caseItem.pcsScore.toFixed(1)}
                              </span>
                              <span className="bg-gray-200 text-gray-700 text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-medium">
                                Complexity: {caseItem.complexityScore.toFixed(1)}
                              </span>
                              {caseItem.estimatedCost && (
                                <span className="bg-green-200 text-green-800 text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-medium">
                                  £{(caseItem.estimatedCost / 1000).toFixed(1)}k
                                </span>
                              )}
                            </div>

                            {/* OPCS4 Codes */}
                            {caseItem.opcs4Codes && caseItem.opcs4Codes.length > 0 && (
                              <div className="mt-2">
                                <div className="text-[9px] md:text-[10px] text-gray-500 mb-0.5">OPCS-4 Codes:</div>
                                <div className="flex flex-wrap gap-1">
                                  {caseItem.opcs4Codes.map((code, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-700 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded border border-blue-200 font-mono">
                                      {code}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            {caseItem.notes && (
                              <div className="mt-2 text-[10px] md:text-xs text-gray-600 italic">
                                Note: {caseItem.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Procedures (if space available) */}
              {selectedListForView.canFitMore && selectedListForView.recommendedProcedures && selectedListForView.recommendedProcedures.length > 0 && (
                <div className="mt-4 md:mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-3 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold text-green-900 mb-2 md:mb-3">Recommended Procedures to Fill Capacity</h3>
                  <div className="text-xs md:text-sm text-green-800 mb-2">Based on remaining time, these procedures could fit:</div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedListForView.recommendedProcedures.map((proc, idx) => (
                      <span key={idx} className="bg-white text-green-800 text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-green-300 font-medium">
                        {proc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedListForView.notes && (
                <div className="mt-4 md:mt-6 bg-amber-50 border-2 border-amber-200 rounded-lg p-3 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold text-amber-900 mb-2">Notes</h3>
                  <div className="text-xs md:text-sm text-amber-800">{selectedListForView.notes}</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 bg-gray-50 px-3 md:px-6 py-3 md:py-4 border-t border-gray-200 flex gap-2 md:gap-3">
              <button
                onClick={handleCloseListDetailModal}
                className="flex-1 px-4 md:px-6 py-2 md:py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition-all font-semibold text-sm md:text-base"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleCloseListDetailModal();
                  // TODO: Could add edit functionality here
                }}
                className="flex-1 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 active:scale-95 transition-all font-semibold text-sm md:text-base"
              >
                Edit List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
