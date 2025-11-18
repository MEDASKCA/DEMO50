"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Copy, Save, RefreshCw, X, MessageSquare } from "lucide-react";
import { Theatre } from "@/lib/schedulingTypes";
import {
  SESSION_TYPE_PRESETS,
  ALL_SPECIALTIES,
  DayConfiguration,
  getMonthsInRange,
  formatMonthDisplay,
  generateDefaultMonthConfiguration,
} from "@/lib/scheduling/sessionTypes";
import { DEFAULT_UNITS, TheatreUnit } from "@/lib/scheduling/sessionTypes";

interface TheatreCalendarProps {
  theatres: Theatre[];
  startDate: Date;
  endDate: Date;
  onSave: (configurations: DayConfiguration[]) => void;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  specialties: string[];
}

export default function TheatreCalendar({
  theatres,
  startDate,
  endDate,
  onSave,
}: TheatreCalendarProps) {
  const months = getMonthsInRange(startDate, endDate);

  // Get current month in YYYY-MM format
  const currentMonth = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  })();

  // Initialize with all months collapsed except current month
  const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(() => {
    const collapsed = new Set<string>();
    months.forEach(month => {
      if (month !== currentMonth) {
        collapsed.add(month);
      }
    });
    return collapsed;
  });

  const [configurations, setConfigurations] = useState<
    Map<string, DayConfiguration>
  >(new Map());
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [units, setUnits] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("all");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("all");
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  // Configuration modal state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingCell, setEditingCell] = useState<{ theatreId: string; date: string } | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    sessionTypeId: string;
    specialty: string;
    consultantId: string;
    closedReason: string;
  }>({
    sessionTypeId: 'day',
    specialty: '',
    consultantId: '',
    closedReason: ''
  });

  // Multi-select state
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Load hospitals, units and consultants from Firebase
  useEffect(() => {
    loadHospitals();
    loadUnits();
    loadConsultants();
  }, []);

  const loadHospitals = async () => {
    setLoadingHospitals(true);
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const hospitalsSnapshot = await getDocs(collection(db, 'hospitals'));
      const loadedHospitals = hospitalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHospitals(loadedHospitals);
      console.log(`✅ Loaded ${loadedHospitals.length} hospitals`);
    } catch (error) {
      console.error('Error loading hospitals:', error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const loadUnits = async () => {
    setLoadingUnits(true);
    try {
      const { getTheatreUnits } = await import(
        "@/lib/scheduling/theatreService"
      );
      const loadedUnits = await getTheatreUnits();
      setUnits(loadedUnits.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error loading units:", error);
    } finally {
      setLoadingUnits(false);
    }
  };

  const loadConsultants = async () => {
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const consultantsSnapshot = await getDocs(collection(db, 'consultants'));
      const loadedConsultants = consultantsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Consultant[];
      setConsultants(loadedConsultants);
      console.log(`✅ Loaded ${loadedConsultants.length} consultants`);
    } catch (error) {
      console.error('Error loading consultants:', error);
    }
  };

  // Filter theatres by selected hospital and unit
  const filteredTheatres = theatres.filter((t) => {
    // Filter by hospital
    if (selectedHospitalId !== "all" && t.hospitalId !== selectedHospitalId) {
      return false;
    }
    // Filter by unit
    if (selectedUnitId !== "all" && t.unitId !== selectedUnitId) {
      return false;
    }
    return true;
  });

  // Sort theatres by unit order, then by theatre ID for consistent ordering
  const sortedTheatres = [...filteredTheatres].sort((a, b) => {
    // Get unit info for both theatres
    const unitA = units.find(u => u.id === a.unitId);
    const unitB = units.find(u => u.id === b.unitId);

    // First sort by unit order
    const orderA = unitA?.order ?? 999;
    const orderB = unitB?.order ?? 999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // Then sort by theatre ID within the same unit
    return a.id.localeCompare(b.id);
  });

  // Group theatres by unit for rendering
  const theatresByUnit = sortedTheatres.reduce((acc, theatre) => {
    const unitId = theatre.unitId || 'unknown';
    if (!acc[unitId]) {
      acc[unitId] = [];
    }
    acc[unitId].push(theatre);
    return acc;
  }, {} as Record<string, Theatre[]>);

  // Initialize configurations - load from Firebase first, then fall back to defaults
  useEffect(() => {
    if (!initialized && theatres.length > 0) {
      loadConfigurationsFromFirebase();
    }
  }, [initialized, theatres.length, months]);

  const loadConfigurationsFromFirebase = async () => {
    try {
      // Try to load from Firebase first
      const { loadCalendarConfigurations } = await import(
        "@/lib/scheduling/theatreService"
      );
      const theatreIds = theatres.map(t => t.id);
      console.log('🔍 Loading configurations for theatres:', theatreIds);
      console.log('🔍 Date range:', startDate.toISOString().split('T')[0], 'to', endDate.toISOString().split('T')[0]);

      const loadedConfigs = await loadCalendarConfigurations(
        startDate,
        endDate,
        theatreIds
      );

      console.log('🔍 Loaded configs from Firebase:', loadedConfigs.length);
      if (loadedConfigs.length > 0) {
        console.log('🔍 Sample config:', loadedConfigs[0]);
      }

      if (loadedConfigs.length > 0) {
        // Use loaded configurations from Firebase
        const newConfigs = new Map<string, DayConfiguration>();
        loadedConfigs.forEach((config: DayConfiguration) => {
          const key = `${config.theatreId}-${config.date}`;
          newConfigs.set(key, config);
        });
        setConfigurations(newConfigs);
        console.log(`✅ Loaded ${loadedConfigs.length} configurations from Firebase`);
      } else {
        // Fall back to generating defaults
        console.log('⚠️ No saved configurations found, generating defaults...');
        generateDefaultConfigurations();
      }
    } catch (error) {
      console.error('❌ Error loading configurations from Firebase:', error);
      // Fall back to generating defaults
      generateDefaultConfigurations();
    }
    setInitialized(true);
  };

  const generateDefaultConfigurations = () => {
    const newConfigs = new Map<string, DayConfiguration>();
    months.forEach((month) => {
      theatres.forEach((theatre) => {
        const monthConfig = generateDefaultMonthConfiguration(
          month,
          theatre.id,
          'day',
          theatre.theatreType
        );
        monthConfig.days.forEach((day) => {
          const key = `${day.theatreId}-${day.date}`;
          newConfigs.set(key, day);
        });
      });
    });
    setConfigurations(newConfigs);
  };

  const toggleMonth = (month: string) => {
    const newCollapsed = new Set(collapsedMonths);
    if (newCollapsed.has(month)) {
      newCollapsed.delete(month);
    } else {
      newCollapsed.add(month);
    }
    setCollapsedMonths(newCollapsed);
  };

  const updateConfiguration = (
    theatreId: string,
    date: string,
    field: keyof DayConfiguration,
    value: any,
  ) => {
    const key = `${theatreId}-${date}`;
    const existing = configurations.get(key);
    if (existing) {
      const updated = { ...existing, [field]: value };
      const newConfigs = new Map(configurations);
      newConfigs.set(key, updated);
      setConfigurations(newConfigs);
    }
  };

  const getConfiguration = (
    theatreId: string,
    date: string,
  ): DayConfiguration | undefined => {
    return configurations.get(`${theatreId}-${date}`);
  };

  const getConsultantsBySpecialty = (specialtyId: string): Consultant[] => {
    if (!specialtyId || specialtyId === "EMER") {
      return consultants; // Show all for emergency
    }
    // Find the full specialty name from the ID
    const specialty = ALL_SPECIALTIES.find(s => s.id === specialtyId);
    if (!specialty) return [];
    return consultants.filter((c) => c.specialty === specialty.name);
  };

  const getSpecialtyColor = (specialtyId: string): string => {
    const colors: Record<string, string> = {
      'EMER': '#ef4444', // red
      'TRAUMA': '#f97316', // orange
      'ORTHO': '#3b82f6', // blue
      'SPINE': '#8b5cf6', // purple
      'GS': '#10b981', // green
      'CARD': '#ec4899', // pink
      'NEURO': '#6366f1', // indigo
      'VASC': '#f59e0b', // amber
      'PLAST': '#14b8a6', // teal
      'GYNAE': '#a855f7', // violet
      'URO': '#0ea5e9', // sky
      'ENT': '#84cc16', // lime
      'OPHTH': '#06b6d4', // cyan
    };
    return colors[specialtyId] || '#6b7280'; // gray default
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const configArray = Array.from(configurations.values());
      await onSave(configArray);
    } finally {
      setSaving(false);
    }
  };

  const copyWeek = (theatreId: string, startDate: string) => {
    // TODO: Implement copy week functionality
    console.log("Copy week", theatreId, startDate);
  };

  const handleCellClick = (theatreId: string, date: string, event: React.MouseEvent) => {
    const cellKey = `${theatreId}-${date}`;

    if (isMultiSelectMode || event.ctrlKey || event.metaKey) {
      // Multi-select mode
      const newSelected = new Set(selectedCells);
      if (newSelected.has(cellKey)) {
        newSelected.delete(cellKey);
      } else {
        newSelected.add(cellKey);
      }
      setSelectedCells(newSelected);
      setIsMultiSelectMode(true);
    } else if (selectedCells.size > 0) {
      // Exit multi-select if clicking without ctrl
      setSelectedCells(new Set());
      setIsMultiSelectMode(false);
      openConfigModal(theatreId, date);
    } else {
      // Normal single-cell edit
      openConfigModal(theatreId, date);
    }
  };

  const handleCellLongPress = (theatreId: string, date: string) => {
    const cellKey = `${theatreId}-${date}`;
    const newSelected = new Set(selectedCells);
    newSelected.add(cellKey);
    setSelectedCells(newSelected);
    setIsMultiSelectMode(true);
  };

  const handleTouchStart = (theatreId: string, date: string) => {
    const timer = setTimeout(() => {
      handleCellLongPress(theatreId, date);
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const openConfigModal = (theatreId: string, date: string) => {
    const config = getConfiguration(theatreId, date);
    if (config) {
      setModalConfig({
        sessionTypeId: config.sessionTypeId || 'day',
        specialty: config.specialty || '',
        consultantId: config.consultantId || '',
        closedReason: config.closedReason || ''
      });
    }
    setEditingCell({ theatreId, date });
    setShowConfigModal(true);
  };

  const openBulkEditModal = () => {
    if (selectedCells.size === 0) return;

    // Initialize with NO_CHANGE for bulk edit - user chooses what to update
    setModalConfig({
      sessionTypeId: 'NO_CHANGE',
      specialty: 'NO_CHANGE',
      consultantId: 'NO_CHANGE',
      closedReason: ''
    });
    setEditingCell(null); // Null means bulk edit
    setShowConfigModal(true);
  };

  const closeConfigModal = () => {
    setShowConfigModal(false);
    setEditingCell(null);
  };

  const saveModalConfig = () => {
    if (editingCell) {
      // Single cell edit
      updateConfiguration(editingCell.theatreId, editingCell.date, 'sessionTypeId', modalConfig.sessionTypeId);
      updateConfiguration(editingCell.theatreId, editingCell.date, 'specialty', modalConfig.specialty);
      updateConfiguration(editingCell.theatreId, editingCell.date, 'consultantId', modalConfig.consultantId);
      updateConfiguration(editingCell.theatreId, editingCell.date, 'closedReason', modalConfig.closedReason);
    } else {
      // Bulk edit - only update fields that are not NO_CHANGE
      selectedCells.forEach(cellKey => {
        const [theatreId, date] = cellKey.split('-');
        if (modalConfig.sessionTypeId !== 'NO_CHANGE') {
          updateConfiguration(theatreId, date, 'sessionTypeId', modalConfig.sessionTypeId);
        }
        if (modalConfig.specialty !== 'NO_CHANGE') {
          updateConfiguration(theatreId, date, 'specialty', modalConfig.specialty);
        }
        if (modalConfig.consultantId !== 'NO_CHANGE') {
          updateConfiguration(theatreId, date, 'consultantId', modalConfig.consultantId);
        }
        if (modalConfig.closedReason !== '') {
          updateConfiguration(theatreId, date, 'closedReason', modalConfig.closedReason);
        }
      });
      setSelectedCells(new Set());
      setIsMultiSelectMode(false);
    }
    closeConfigModal();
  };

  const cancelMultiSelect = () => {
    setSelectedCells(new Set());
    setIsMultiSelectMode(false);
    setShowSessionDropdown(false);
    setShowSpecialtyDropdown(false);
  };

  const applyBulkSession = (sessionTypeId: string) => {
    const newConfigs = new Map(configurations);
    selectedCells.forEach(cellKey => {
      const [theatreId, date] = cellKey.split('-');
      const existing = newConfigs.get(cellKey);
      if (existing) {
        newConfigs.set(cellKey, { ...existing, sessionTypeId });
      }
    });
    setConfigurations(newConfigs);
    setShowSessionDropdown(false);
  };

  const applyBulkSpecialty = (specialtyId: string) => {
    const newConfigs = new Map(configurations);
    selectedCells.forEach(cellKey => {
      const [theatreId, date] = cellKey.split('-');
      const existing = newConfigs.get(cellKey);
      if (existing) {
        newConfigs.set(cellKey, { ...existing, specialty: specialtyId });
      }
    });
    setConfigurations(newConfigs);
    setShowSpecialtyDropdown(false);
  };

  // Get unique unit IDs from selected cells
  const getSelectedUnits = (): string[] => {
    const unitIds = new Set<string>();
    selectedCells.forEach(cellKey => {
      const [theatreId] = cellKey.split('-');
      const theatre = sortedTheatres.find(t => t.id === theatreId);
      if (theatre?.unitId) {
        unitIds.add(theatre.unitId);
      }
    });
    return Array.from(unitIds);
  };

  // Get specialties available for selected units
  const getAvailableSpecialties = (): typeof ALL_SPECIALTIES => {
    const selectedUnitIds = getSelectedUnits();
    if (selectedUnitIds.length === 0) return ALL_SPECIALTIES;

    const availableSpecialtyIds = new Set<string>();
    selectedUnitIds.forEach(unitId => {
      const unit = units.find(u => u.id === unitId);
      if (unit?.specialties) {
        unit.specialties.forEach(specId => availableSpecialtyIds.add(specId));
      }
    });

    return ALL_SPECIALTIES.filter(spec => availableSpecialtyIds.has(spec.id));
  };

  // Deselect all cells
  const deselectAll = () => {
    setSelectedCells(new Set());
    setIsMultiSelectMode(false);
    setShowSessionDropdown(false);
    setShowSpecialtyDropdown(false);
  };

  // Select entire column (theatre) excluding CLOSED cells
  const selectColumn = (theatreId: string, monthDates: string[]) => {
    const newSelected = new Set(selectedCells);
    monthDates.forEach(date => {
      const cellKey = `${theatreId}-${date}`;
      const config = getConfiguration(theatreId, date);
      // Only select if not CLOSED
      if (config && config.sessionTypeId !== 'closed') {
        newSelected.add(cellKey);
      }
    });
    setSelectedCells(newSelected);
    setIsMultiSelectMode(true);
  };

  // Handle drag start
  const handleDragStart = (theatreId: string, date: string, event: React.MouseEvent) => {
    if (event.button !== 0) return; // Only left mouse button
    event.preventDefault();
    setIsDragging(true);
    const cellKey = `${theatreId}-${date}`;
    setDragStartCell(cellKey);
    const newSelected = new Set(selectedCells);
    newSelected.add(cellKey);
    setSelectedCells(newSelected);
    setIsMultiSelectMode(true);
  };

  // Handle drag over
  const handleDragOver = (theatreId: string, date: string) => {
    if (!isDragging) return;
    const cellKey = `${theatreId}-${date}`;
    const newSelected = new Set(selectedCells);
    newSelected.add(cellKey);
    setSelectedCells(newSelected);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartCell(null);
  };

  // Add effect to handle mouse up globally for drag
  React.useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging]);

  return (
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
            background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
          }
          .custom-scrollbar::-webkit-scrollbar-corner {
            background: #e5e7eb;
          }
        `
      }} />
      <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-3 md:p-4 flex flex-col gap-3 sticky top-0 bg-white z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Theatre Schedule Configuration
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Configure session types, specialties, and consultants for each
              theatre
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsedMonths(new Set())}
              className="px-2 md:px-3 py-2 text-xs md:text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 md:gap-2"
            >
              <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden md:inline">Expand All</span>
              <span className="md:hidden">Expand</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 md:px-4 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-1 md:gap-2"
            >
              <Save className="w-3 h-3 md:w-4 md:h-4" />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Hospital and Unit Selectors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          {/* Hospital Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Hospital:
            </label>
            <select
              value={selectedHospitalId}
              onChange={(e) => {
                setSelectedHospitalId(e.target.value);
                setSelectedUnitId("all"); // Reset unit filter when hospital changes
              }}
              className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Hospitals ({theatres.length} theatres)</option>
              {hospitals.map((hospital) => {
                const theatreCount = theatres.filter(
                  (t) => t.hospitalId === hospital.id,
                ).length;
                return (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name || hospital.id} ({theatreCount}{" "}
                    {theatreCount === 1 ? "theatre" : "theatres"})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Unit Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Unit:
            </label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Units ({filteredTheatres.length} theatres)</option>
              {units
                .filter((unit) =>
                  selectedHospitalId === "all" || unit.hospitalId === selectedHospitalId
                )
                .map((unit) => {
                  const theatreCount = filteredTheatres.filter(
                    (t) => t.unitId === unit.id,
                  ).length;
                  return (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({theatreCount}{" "}
                      {theatreCount === 1 ? "theatre" : "theatres"})
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        className="custom-scrollbar overflow-x-auto"
        style={{
          scrollbarWidth: 'auto',
          scrollbarColor: '#0ea5e9 #e5e7eb'
        }}
      >
        {months.map((month) => {
          const isCollapsed = collapsedMonths.has(month);
          const [year, monthNum] = month.split("-").map(Number);
          const daysInMonth = new Date(year, monthNum, 0).getDate();
          const days = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayOfWeek = new Date(date).getDay();
            const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
              dayOfWeek
            ];
            return { day, date, dayName, dayOfWeek };
          });

          return (
            <div key={month} className="border-b border-gray-200">
              {/* Month Header */}
              <button
                onClick={() => toggleMonth(month)}
                className="w-full px-3 md:px-4 py-2 md:py-3 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  )}
                  <span className="text-sm md:text-base font-medium text-gray-900">
                    {formatMonthDisplay(month)}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 ml-2">
                    ({daysInMonth} days)
                  </span>
                </div>
              </button>

              {/* Month Content */}
              {!isCollapsed && (
                <div
                  className="custom-scrollbar overflow-x-auto"
                  style={{
                    scrollbarWidth: 'auto',
                    scrollbarColor: '#0ea5e9 #e5e7eb'
                  }}
                >
                  {/* Multi-select header */}
                  {isMultiSelectMode && selectedCells.size > 0 && (
                    <div className="bg-blue-50 border-b border-blue-200 p-2 md:p-3 flex items-center justify-between sticky top-0 z-20">
                      <span className="text-xs md:text-sm font-medium text-blue-900">
                        {selectedCells.size} cell{selectedCells.size !== 1 ? 's' : ''} selected
                      </span>
                      <div className="flex gap-2 items-center">
                        {/* Session Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => {
                              setShowSessionDropdown(!showSessionDropdown);
                              setShowSpecialtyDropdown(false);
                            }}
                            className="px-2 md:px-3 py-1 bg-blue-600 text-white rounded text-xs md:text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                          >
                            Session
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          {showSessionDropdown && (
                            <div
                              className="custom-scrollbar absolute top-full mt-1 left-0 md:right-0 md:left-auto bg-white border border-gray-200 rounded-lg shadow-lg z-30 min-w-[200px] max-h-[300px] overflow-y-auto"
                              style={{
                                scrollbarWidth: 'auto',
                                scrollbarColor: '#0ea5e9 #e5e7eb'
                              }}
                            >
                              {SESSION_TYPE_PRESETS.map((preset) => (
                                <button
                                  key={preset.id}
                                  onClick={() => applyBulkSession(preset.id)}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                >
                                  <div
                                    className="font-medium text-sm"
                                    style={{ color: preset.color }}
                                  >
                                    {preset.id === 'closed' ? 'CLOSED' : `${preset.startTime} - ${preset.endTime}`}
                                  </div>
                                  <div className="text-xs text-gray-500">{preset.description}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Specialty Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => {
                              setShowSpecialtyDropdown(!showSpecialtyDropdown);
                              setShowSessionDropdown(false);
                            }}
                            className="px-2 md:px-3 py-1 bg-green-600 text-white rounded text-xs md:text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                          >
                            Specialty
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          {showSpecialtyDropdown && (
                            <div
                              className="custom-scrollbar absolute top-full mt-1 left-0 md:right-0 md:left-auto bg-white border border-gray-200 rounded-lg shadow-lg z-30 min-w-[180px] max-h-[300px] overflow-y-auto"
                              style={{
                                scrollbarWidth: 'auto',
                                scrollbarColor: '#0ea5e9 #e5e7eb'
                              }}
                            >
                              {getAvailableSpecialties().map((spec) => (
                                <button
                                  key={spec.id}
                                  onClick={() => applyBulkSpecialty(spec.id)}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                  style={{
                                    borderLeftWidth: '3px',
                                    borderLeftColor: getSpecialtyColor(spec.id)
                                  }}
                                >
                                  <span className="font-medium text-sm">{spec.abbr}</span>
                                  <span className="text-xs text-gray-500">- {spec.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Notes Button */}
                        <button
                          onClick={() => setShowNotesModal(true)}
                          className="px-2 md:px-3 py-1 bg-yellow-600 text-white rounded text-xs md:text-sm hover:bg-yellow-700 transition-colors flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Notes
                        </button>

                        {/* Deselect All Button */}
                        <button
                          onClick={deselectAll}
                          className="px-2 md:px-3 py-1 bg-gray-600 text-white rounded text-xs md:text-sm hover:bg-gray-700 transition-colors"
                        >
                          Deselect All
                        </button>

                        <button
                          onClick={cancelMultiSelect}
                          className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <table className="w-full border-collapse">
                    <thead>
                      {/* Unit header row */}
                      <tr className="bg-blue-50 border-b border-gray-300">
                        <th className="sticky left-0 bg-blue-50 z-10 px-2 md:px-4 py-1 border-r border-gray-300 w-20 md:w-32"></th>
                        {Object.entries(theatresByUnit).map(([unitId, theatresInUnit]) => {
                          const unit = units.find(u => u.id === unitId);
                          return (
                            <th
                              key={unitId}
                              colSpan={theatresInUnit.length}
                              className="px-1 md:px-3 py-1 text-center text-xs md:text-sm font-semibold text-blue-900 border-r-4 border-gray-300"
                            >
                              {unit?.name || unitId}
                            </th>
                          );
                        })}
                      </tr>
                      {/* Theatre header row */}
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="sticky left-0 bg-gray-50 z-10 px-2 md:px-4 py-2 md:py-3 text-center text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-20 md:w-32">
                          Date
                        </th>
                        {sortedTheatres.map((theatre, index) => {
                          // Check if this is the last theatre in its unit
                          const isLastInUnit = index === sortedTheatres.length - 1 ||
                            sortedTheatres[index + 1]?.unitId !== theatre.unitId;
                          return (
                            <th
                              key={theatre.id}
                              onClick={() => selectColumn(theatre.id, days.map(d => d.date))}
                              className={`px-1 md:px-3 py-2 text-center text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-tight border-r border-gray-200 min-w-[90px] md:min-w-[280px] cursor-pointer hover:bg-blue-100 transition-colors ${isLastInUnit ? 'border-r-4 border-gray-300' : ''}`}
                              title="Click to select all non-CLOSED cells in this column"
                            >
                              <div className="truncate">{theatre.name}</div>
                              <div className="text-[9px] md:text-xs text-gray-400 font-normal normal-case truncate">
                                {theatre.location}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {days.map(({ day, date, dayName, dayOfWeek }, dayIndex) => {
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                        const isStartOfWeek = dayOfWeek === 1; // Monday
                        const isFirstDay = dayIndex === 0;

                        return (
                          <tr
                            key={date}
                            className={`${isWeekend ? "bg-gray-50" : ""} ${isStartOfWeek && !isFirstDay ? "border-t-2 border-blue-200" : ""}`}
                          >
                            <td className={`sticky left-0 ${isWeekend ? "bg-gray-50" : "bg-white"} z-10 px-2 md:px-4 py-2 text-xs md:text-base border-r border-gray-200 text-center`}>
                              <div className="font-medium text-gray-900">
                                <span className="md:hidden">
                                  {dayName.substring(0, 1)} {day}
                                </span>
                                <span className="hidden md:inline">
                                  {dayName} {day}
                                </span>
                              </div>
                            </td>
                            {sortedTheatres.map((theatre, theatreIndex) => {
                              const isLastInUnit = theatreIndex === sortedTheatres.length - 1 ||
                                sortedTheatres[theatreIndex + 1]?.unitId !== theatre.unitId;
                              const config = getConfiguration(theatre.id, date);
                              if (!config) return <td key={theatre.id}></td>;

                              const sessionType = SESSION_TYPE_PRESETS.find(
                                (s) => s.id === config.sessionTypeId,
                              );
                              const specialty = ALL_SPECIALTIES.find(s => s.id === config.specialty);
                              const hasConfig = config.specialty || config.sessionTypeId !== 'day';

                              return (
                                <td
                                  key={theatre.id}
                                  className={`p-0 border-r border-gray-200 ${isLastInUnit ? 'border-r-4 border-gray-300' : ''}`}
                                >
                                  <button
                                    onClick={(e) => handleCellClick(theatre.id, date, e)}
                                    onMouseDown={(e) => handleDragStart(theatre.id, date, e)}
                                    onMouseEnter={() => handleDragOver(theatre.id, date)}
                                    onTouchStart={() => handleTouchStart(theatre.id, date)}
                                    onTouchEnd={handleTouchEnd}
                                    className={`w-full h-full min-h-[60px] md:min-h-[80px] px-1 md:px-2 py-2 hover:bg-gray-100 transition-all text-center flex items-center justify-center select-none ${selectedCells.has(`${theatre.id}-${date}`) ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                                    style={{
                                      backgroundColor: specialty ? `${getSpecialtyColor(specialty.id)}20` : 'transparent'
                                    }}
                                  >
                                    {hasConfig ? (
                                      <div className="space-y-1 w-full">
                                        {sessionType && (
                                          <div
                                            className="text-[9px] md:text-xs font-bold"
                                            style={{ color: sessionType.color }}
                                          >
                                            {config.sessionTypeId === 'closed' ? 'CLOSED' : `${sessionType.startTime}-${sessionType.endTime}`}
                                          </div>
                                        )}
                                        {config.specialty && specialty && (
                                          <div className="text-[9px] md:text-xs font-medium text-gray-700">
                                            {specialty.abbr}
                                          </div>
                                        )}
                                        {(config.consultantSurgeonId || config.consultantAnaesthetistId) && (
                                          <div className="text-[7px] md:text-[10px] text-gray-700 font-medium truncate max-w-full">
                                            {(() => {
                                              const surgeon = consultants.find(c => c.id === config.consultantSurgeonId);
                                              const anaesthetist = consultants.find(c => c.id === config.consultantAnaesthetistId);
                                              const surgeonLastName = surgeon?.name?.split(' ').pop()?.toUpperCase() || '';
                                              const anaesthetistLastName = anaesthetist?.name?.split(' ').pop()?.toUpperCase() || '';
                                              return `${surgeonLastName}/${anaesthetistLastName}`;
                                            })()}
                                          </div>
                                        )}
                                        {config.sessionTypeId === 'closed' && config.closedReason && (
                                          <div className="text-[8px] md:text-[10px] text-gray-500 italic">
                                            {config.closedReason}
                                          </div>
                                        )}
                                        {!sessionType && !specialty && (
                                          <div className="text-[9px] md:text-xs text-gray-400 italic">
                                            Click to configure
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-[9px] md:text-xs text-gray-400 italic">
                                        Click to configure
                                      </div>
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="custom-scrollbar bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            style={{
              scrollbarWidth: 'auto',
              scrollbarColor: '#0ea5e9 #e5e7eb'
            }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCell ? 'Configure Theatre Session' : `Bulk Edit ${selectedCells.size} Cells`}
              </h3>
              <button
                onClick={closeConfigModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Session Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type {!editingCell && <span className="text-xs text-gray-500">(select to change, or leave as "No Change")</span>}
                </label>
                <div className="space-y-2">
                  {/* No Change option for bulk edit */}
                  {!editingCell && (
                    <label
                      className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      style={{
                        backgroundColor: modalConfig.sessionTypeId === 'NO_CHANGE' ? '#f3f4f615' : 'transparent',
                        borderColor: modalConfig.sessionTypeId === 'NO_CHANGE' ? '#6b7280' : '#e5e7eb'
                      }}
                    >
                      <input
                        type="radio"
                        checked={modalConfig.sessionTypeId === 'NO_CHANGE'}
                        onChange={() => setModalConfig({ ...modalConfig, sessionTypeId: 'NO_CHANGE' })}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium text-gray-600">No Change</div>
                        <div className="text-xs text-gray-500">Keep existing session types</div>
                      </div>
                    </label>
                  )}
                  {SESSION_TYPE_PRESETS.map((preset) => (
                    <label
                      key={preset.id}
                      className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      style={{
                        backgroundColor: modalConfig.sessionTypeId === preset.id ? `${preset.color}15` : 'transparent',
                        borderColor: modalConfig.sessionTypeId === preset.id ? preset.color : '#e5e7eb'
                      }}
                    >
                      <input
                        type="radio"
                        checked={modalConfig.sessionTypeId === preset.id}
                        onChange={() => setModalConfig({ ...modalConfig, sessionTypeId: preset.id })}
                        className="w-4 h-4"
                        style={{ accentColor: preset.color }}
                      />
                      <div>
                        <div
                          className="font-medium"
                          style={{ color: preset.color }}
                        >
                          {preset.id === 'closed' ? 'CLOSED' : `${preset.startTime} - ${preset.endTime}`}
                        </div>
                        <div className="text-xs text-gray-500">{preset.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Closed Reason */}
              {modalConfig.sessionTypeId === 'closed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Closure
                  </label>
                  <input
                    type="text"
                    value={modalConfig.closedReason}
                    onChange={(e) => setModalConfig({ ...modalConfig, closedReason: e.target.value })}
                    placeholder="e.g., Bank Holiday, Maintenance"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Specialty Selection */}
              {modalConfig.sessionTypeId !== 'closed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty {!editingCell && <span className="text-xs text-gray-500">(select to change, or leave as "No Change")</span>}
                  </label>
                  <div
                    className="custom-scrollbar grid grid-cols-2 gap-2 max-h-60 overflow-y-auto"
                    style={{
                      scrollbarWidth: 'auto',
                      scrollbarColor: '#0ea5e9 #e5e7eb'
                    }}
                  >
                    {/* No Change option for bulk edit */}
                    {!editingCell && (
                      <label
                        className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 col-span-2"
                        style={{
                          backgroundColor: modalConfig.specialty === 'NO_CHANGE' ? '#f3f4f615' : 'transparent',
                          borderColor: modalConfig.specialty === 'NO_CHANGE' ? '#6b7280' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="radio"
                          checked={modalConfig.specialty === 'NO_CHANGE'}
                          onChange={() => setModalConfig({ ...modalConfig, specialty: 'NO_CHANGE' })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-600">No Change - Keep existing specialties</span>
                      </label>
                    )}
                    {ALL_SPECIALTIES.map((spec) => (
                      <label
                        key={spec.id}
                        className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                        style={{
                          backgroundColor: modalConfig.specialty === spec.id ? `${getSpecialtyColor(spec.id)}20` : 'transparent',
                          borderColor: modalConfig.specialty === spec.id ? getSpecialtyColor(spec.id) : '#e5e7eb'
                        }}
                      >
                        <input
                          type="radio"
                          checked={modalConfig.specialty === spec.id}
                          onChange={() => setModalConfig({ ...modalConfig, specialty: spec.id, consultantId: '' })}
                          className="w-4 h-4"
                          style={{ accentColor: getSpecialtyColor(spec.id) }}
                        />
                        <span className="text-sm font-medium">{spec.abbr}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultant Selection */}
              {modalConfig.sessionTypeId !== 'closed' && modalConfig.specialty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultant (Optional)
                  </label>
                  <select
                    value={modalConfig.consultantId}
                    onChange={(e) => setModalConfig({ ...modalConfig, consultantId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select Consultant --</option>
                    <option value="unassigned">Unassigned</option>
                    {getConsultantsBySpecialty(modalConfig.specialty).map((consultant) => (
                      <option key={consultant.id} value={consultant.id}>
                        {consultant.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeConfigModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveModalConfig}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="custom-scrollbar bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{
              scrollbarWidth: 'auto',
              scrollbarColor: '#0ea5e9 #e5e7eb'
            }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Add Notes to Selected Cells
              </h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Adding notes/comments to {selectedCells.size} selected cell{selectedCells.size !== 1 ? 's' : ''}
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes/Comments
                </label>
                <textarea
                  placeholder="Enter your notes or comments here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                  id="bulk-notes"
                />
                <p className="text-xs text-gray-500 mt-1">
                  These notes will be added to the configuration data for the selected cells
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const textarea = document.getElementById('bulk-notes') as HTMLTextAreaElement;
                    const notes = textarea?.value || '';
                    if (notes.trim()) {
                      const newConfigs = new Map(configurations);
                      selectedCells.forEach(cellKey => {
                        const existing = newConfigs.get(cellKey);
                        if (existing) {
                          newConfigs.set(cellKey, { ...existing, notes });
                        }
                      });
                      setConfigurations(newConfigs);
                    }
                    setShowNotesModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
