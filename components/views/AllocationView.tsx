'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Download, Save, Printer, List, X, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  getTheatreUnits,
  getUnitCoordinators,
  getSpecialUnits,
  getStaffPoolSections,
  getSpecialties,
  initializeAllocationConfig,
  UnitCoordinator,
  SpecialUnit,
  StaffPoolSection
} from '@/lib/scheduling/theatreService';
import { useHospital } from '@/lib/hospitalContext';
import { ALL_SPECIALTIES, SESSION_TYPE_PRESETS } from '@/lib/scheduling/sessionTypes';
import { getTheatreListsByDateRange } from '@/lib/services/theatreListService';
import { TheatreList } from '@/lib/theatreListTypes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAllStaffRequirementMappers } from '@/lib/services/staffRequirementMapperService';
import { StaffRequirementMapper } from '@/lib/types/waitingListTypes';
import {
  generateAutoRoster,
  saveAutoRosterAllocations,
  loadAutoRosterAllocations,
  SessionAllocation,
  RoleAllocation,
  StaffAssignment
} from '@/lib/autoRosterService';

interface StaffMember {
  id: string;
  name: string;
  title?: string;
  role: 'Scrub N/P' | 'HCA' | 'Anaes N/P' | 'MD' | 'Floater';
  band: '5' | '6' | '7' | '8' | '9';
  team?: string;
  shiftStart: string;
  shiftEnd: string;
  allocated?: boolean;
}

interface RoleSlot {
  role: string;
  assignedStaff?: StaffMember;
}

interface TheatreData {
  id: string;
  name: string;
  specialty: string;
  sessionType: string;
  roles: RoleSlot[];
  theatreType?: 'elective' | 'emergency' | 'trauma';
}

interface ContextMenu {
  visible: boolean;
  x: number;
  y: number;
  theatreId: string;
  roleIndex: number;
}

interface AuxUnitContextMenu {
  visible: boolean;
  x: number;
  y: number;
  auxUnitId: string;
  unitLocation: string;
}

interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  order: number;
  numberOfTheatres: number;
  specialties: string[];
}

interface TheatreLabel {
  label: string; // e.g., "MT1", "ACAD1"
  unitName: string; // e.g., "Main Theatre", "ACAD"
}

interface AllocationViewProps {
  templateMode?: boolean;
}

interface StaffRequirementEditorModal {
  visible: boolean;
  theatreId: string;
  theatreName: string;
  specialty: string;
  requirements: { roleName: string; quantity: number }[];
}

export default function AllocationView({ templateMode = false }: AllocationViewProps) {
  const { currentHospital } = useHospital();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dayName, setDayName] = useState<string>('');
  const [scrubStaff, setScrubStaff] = useState<StaffMember[]>([]);
  const [anaesStaff, setAnaesStaff] = useState<StaffMember[]>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0, theatreId: '', roleIndex: 0 });
  const [auxUnitContextMenu, setAuxUnitContextMenu] = useState<AuxUnitContextMenu>({ visible: false, x: 0, y: 0, auxUnitId: '', unitLocation: '' });
  const [auxUnitSpecialties, setAuxUnitSpecialties] = useState<Record<string, string>>({}); // auxUnitId -> specialtyId
  const [auxUnitSessionTypes, setAuxUnitSessionTypes] = useState<Record<string, string>>({}); // auxUnitId -> sessionTypeId
  const [showStaffList, setShowStaffList] = useState(false);
  const [theatreUnits, setTheatreUnits] = useState<TheatreUnit[]>([]);
  const [firebaseSpecialties, setFirebaseSpecialties] = useState<any[]>([]); // Specialties from Firebase with subspecialties

  // Static column width settings
  const leftColumnWidth = 33; // percentage for left column in each cell
  const col1Width = 38; // 4th Floor column width
  const col2Width = 38; // 3rd Floor column width
  const col3Width = 24; // Third column width
  const [fourthFloorTheatres, setFourthFloorTheatres] = useState<TheatreData[]>([]);
  const [thirdFloorTheatres, setThirdFloorTheatres] = useState<TheatreData[]>([]);
  const [unitCoordinators, setUnitCoordinators] = useState<UnitCoordinator[]>([]);
  const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
  const [staffPoolSections, setStaffPoolSections] = useState<StaffPoolSection[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [theatreLists, setTheatreLists] = useState<TheatreList[]>([]);
  const [fontSize, setFontSize] = useState<number>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 110 : 180
  ); // percentage - 110% mobile, 180% desktop
  const [theatreConfigs, setTheatreConfigs] = useState<any[]>([]);
  const [theatres, setTheatres] = useState<any[]>([]); // Theatre entities with theatreType
  const [theatreStaffRoles, setTheatreStaffRoles] = useState<any[]>([]);
  const [staffRequirementMappers, setStaffRequirementMappers] = useState<StaffRequirementMapper[]>([]);
  const [staffRequirementModal, setStaffRequirementModal] = useState<StaffRequirementEditorModal>({
    visible: false,
    theatreId: '',
    theatreName: '',
    specialty: '',
    requirements: []
  });
  const [customTheatreRequirements, setCustomTheatreRequirements] = useState<Record<string, { roleName: string; quantity: number }[]>>({});

  // Auto-roster state
  const [autoRosterAllocations, setAutoRosterAllocations] = useState<Map<string, SessionAllocation>>(new Map());
  const [isGeneratingRoster, setIsGeneratingRoster] = useState(false);
  const [autoRosterMode, setAutoRosterMode] = useState<'single' | 'range'>('single');
  const [autoRosterEndDate, setAutoRosterEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [rosterProgress, setRosterProgress] = useState<{ current: number; total: number } | null>(null);
  const [showExtraControls, setShowExtraControls] = useState(false);

  // Use specialty and session type data from configuration
  const specialties = ALL_SPECIALTIES;
  const sessionTypes = SESSION_TYPE_PRESETS;

  // Helper functions to get abbreviations
  const getSpecialtyAbbr = (specialtyId: string): string => {
    const specialty = ALL_SPECIALTIES.find(s => s.id === specialtyId || s.name === specialtyId);
    return specialty?.abbr || specialtyId || '';
  };

  const getSessionTypeAbbr = (sessionTypeId: string): string => {
    const sessionType = SESSION_TYPE_PRESETS.find(s => s.id === sessionTypeId || s.name === sessionTypeId);

    // Convert session types to session count format
    if (!sessionType) return sessionTypeId || '';

    switch (sessionType.id) {
      case 'day': // All Day (08:00-18:00)
        return 'x2';
      case 'long-day': // All Day Extended (08:00-20:00)
        return 'x3';
      case 'am': // Early (08:00-13:00)
        return 'AM';
      case 'pm': // Afternoon (13:00-18:00)
        return 'PM';
      case 'pme': // Afternoon Extended (13:00-20:00)
        return 'PME';
      case 'night': // Night (20:00-08:00)
        return 'NIGHT';
      case 'closed':
        return 'X';
      default:
        return sessionType.abbr;
    }
  };

  // Helper function to get theatre lists for a specific theatre
  const getTheatreListsForTheatre = (theatreName: string): TheatreList[] => {
    // Try exact match first
    let filtered = theatreLists.filter(list => list.theatreName === theatreName);

    // If no exact match, try flexible matching
    // "Main 1" should match "Main Theatre 1"
    // "ACAD 1" should match "ACAD Theatre 1"
    if (filtered.length === 0) {
      filtered = theatreLists.filter(list => {
        // Remove "Theatre" and extra spaces for comparison
        const normalizedListName = list.theatreName.replace(/Theatre\s+/gi, '').trim();
        const normalizedTheatreName = theatreName.replace(/Theatre\s+/gi, '').trim();
        return normalizedListName === normalizedTheatreName;
      });
    }

    console.log(`🎭 Getting lists for theatre "${theatreName}":`, filtered.length, 'sessions', filtered.length > 0 ? `(matched: ${filtered[0].theatreName})` : '');
    return filtered;
  };

  // Helper function to calculate session count from TheatreList sessionType
  const getSessionCount = (lists: TheatreList[], theatreName: string): string => {
    if (lists.length > 0) {
      // Count unique session types for the theatre
      const uniqueSessions = new Set(lists.map(list => list.sessionType));

      // If there's a FULL session, it's 2 sessions
      if (uniqueSessions.has('FULL')) return 'x2';
      // If there's an EXTENDED session, it's 3 sessions
      if (uniqueSessions.has('EXTENDED')) return 'x3';

      // Otherwise, count the number of different sessions (AM, PM, EVE)
      const count = uniqueSessions.size;
      return count > 1 ? `x${count}` : '';
    }

    // For 24/7 emergency theatres with no scheduled sessions, don't show a session count
    return '';
  };

  // Helper function to get specialty abbreviation from theatre lists
  const getSpecialtyFromLists = (lists: TheatreList[], theatreName: string): string => {
    // First try to get from session data
    if (lists.length > 0) {
      const specialty = lists[0].specialty;
      const fbSpecialty = firebaseSpecialties.find(s =>
        s.name === specialty || s.id === specialty
      );
      if (fbSpecialty) {
        return fbSpecialty.abbreviation || fbSpecialty.abbr || specialty;
      }
      const allSpecialty = ALL_SPECIALTIES.find(s =>
        s.name === specialty || s.id === specialty
      );
      return allSpecialty?.abbr || specialty;
    }

    // Fallback to theatre configuration for 24/7 emergency theatres
    const config = theatreConfigs.find(c => {
      const normalizedConfigName = c.theatreName?.replace(/Theatre\s+/gi, '').trim();
      const normalizedTheatreName = theatreName.replace(/Theatre\s+/gi, '').trim();
      return normalizedConfigName === normalizedTheatreName;
    });

    if (config && config.specialtyAssignments && config.specialtyAssignments.length > 0) {
      // Get the highest priority specialty
      const primarySpecialty = config.specialtyAssignments.sort((a: any, b: any) => a.priority - b.priority)[0];
      const specialtyName = primarySpecialty.specialtyName;

      // Try to get abbreviation
      const fbSpecialty = firebaseSpecialties.find(s =>
        s.name === specialtyName || s.id === specialtyName
      );
      if (fbSpecialty) {
        return fbSpecialty.abbreviation || fbSpecialty.abbr || specialtyName;
      }
      const allSpecialty = ALL_SPECIALTIES.find(s =>
        s.name === specialtyName || s.id === specialtyName
      );
      return allSpecialty?.abbr || specialtyName.substring(0, 6).toUpperCase();
    }

    return '';
  };

  // Update day name when date changes
  useEffect(() => {
    const date = new Date(selectedDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setDayName(days[date.getDay()]);
  }, [selectedDate]);

  // Load theatre units from Firebase and generate dynamic theatre data
  useEffect(() => {
    if (currentHospital) {
      loadTheatreUnits();
    }
  }, [currentHospital]);

  // Load theatre configurations
  useEffect(() => {
    if (currentHospital?.id) {
      loadTheatreConfigurations();
      loadTheatres();
    }
  }, [currentHospital?.id]);

  // Load theatre lists for selected date
  useEffect(() => {
    if (selectedDate && currentHospital?.id) {
      console.log('🔄 Effect triggered - loading theatre lists');
      loadTheatreListsForDate();
    }
  }, [selectedDate, currentHospital?.id]);

  // Load staff allocations for selected date
  useEffect(() => {
    const loadAllocations = async () => {
      if (selectedDate && currentHospital?.id && !templateMode) {
        console.log('🔄 Loading allocations for date:', selectedDate);
        const allocations = await loadAutoRosterAllocations(selectedDate, currentHospital.id);
        setAutoRosterAllocations(allocations);
        console.log(`📊 Loaded ${allocations.size} allocations into state`);
      }
    };
    loadAllocations();
  }, [selectedDate, currentHospital?.id, templateMode]);

  // Load theatre staff roles and requirement mappers (needed for both template mode AND auto-roster)
  useEffect(() => {
    if (currentHospital?.id) {
      loadTheatreStaffRolesAndMappers();
    }
  }, [currentHospital?.id]);

  const loadTheatreConfigurations = async () => {
    if (!currentHospital?.id) return;

    try {
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const q = query(
        collection(db, 'theatreConfigurations'),
        where('hospitalId', '==', currentHospital.id)
      );
      const snapshot = await getDocs(q);
      const configs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('🏥 Loaded theatre configurations:', configs.length);
      setTheatreConfigs(configs);
    } catch (error) {
      console.error('❌ Error loading theatre configurations:', error);
    }
  };

  const loadTheatres = async () => {
    if (!currentHospital?.id) return;

    try {
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const q = query(
        collection(db, 'theatres'),
        where('hospitalId', '==', currentHospital.id)
      );
      const snapshot = await getDocs(q);
      const theatreEntities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('🎭 Loaded theatres with types:', theatreEntities.map(t => ({
        name: t.name,
        theatreType: t.theatreType
      })));
      setTheatres(theatreEntities);
    } catch (error) {
      console.error('❌ Error loading theatres:', error);
    }
  };

  const loadTheatreListsForDate = async () => {
    try {
      console.log('🔍 Loading theatre lists for date:', selectedDate);
      console.log('🔍 Date format check - typeof:', typeof selectedDate, 'value:', selectedDate);
      console.log('🔍 Current hospital:', currentHospital?.id, currentHospital?.name);

      // Query WITHOUT hospitalId to avoid composite index requirement
      // We'll filter by hospital in memory
      const allLists = await getTheatreListsByDateRange(
        selectedDate,
        selectedDate
      );

      console.log('📦 All lists loaded:', allLists.length);

      // Filter by hospital in memory
      const lists = currentHospital?.id
        ? allLists.filter(list => list.hospitalId === currentHospital.id)
        : allLists;

      console.log('✅ Loaded theatre lists:', lists.length, 'sessions found after filtering');
      if (lists.length > 0) {
        console.log('📋 First session date:', lists[0].date);
        console.log('📋 Theatre names in lists:', lists.map(l => `${l.theatreName} (${l.date})`));
        console.log('📋 Hospital IDs in lists:', [...new Set(lists.map(l => l.hospitalId))]);
        console.log('📋 Unit names in lists:', [...new Set(lists.map(l => l.unitName))]);
      } else {
        console.log('⚠️ No sessions found for date:', selectedDate, 'hospital:', currentHospital?.id);
      }
      console.log('📋 Full theatre lists data:', JSON.stringify(lists, null, 2));
      setTheatreLists(lists);
    } catch (error) {
      console.error('❌ Error loading theatre lists:', error);
    }
  };

  const loadTheatreStaffRolesAndMappers = async () => {
    if (!currentHospital?.id) return;

    try {
      console.log('📋 Loading theatre staff roles and requirement mappers for template...');

      // Load theatre staff roles
      const rolesQuery = query(
        collection(db, 'theatreStaffRoles'),
        where('hospitalId', '==', currentHospital.id)
      );
      const rolesSnapshot = await getDocs(rolesQuery);
      const roles = rolesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Load staff requirement mappers
      const mappers = await getAllStaffRequirementMappers();

      // Load theatre-specific staffing templates
      const templatesQuery = query(
        collection(db, 'theatreStaffingDefaults'),
        where('hospitalId', '==', currentHospital.id)
      );
      const templatesSnapshot = await getDocs(templatesQuery);
      const templates: Record<string, { roleName: string; quantity: number }[]> = {};
      templatesSnapshot.docs.forEach(doc => {
        const data = doc.data();
        templates[data.theatreId] = data.requirements || [];
      });

      console.log('✅ Loaded theatre staff roles:', roles);
      console.log('✅ Loaded requirement mappers:', mappers);
      console.log('✅ Loaded theatre-specific templates:', templates);

      setTheatreStaffRoles(roles);
      setStaffRequirementMappers(mappers);
      setCustomTheatreRequirements(templates);
    } catch (error) {
      console.error('❌ Error loading theatre staff roles and mappers:', error);
    }
  };

  // Calculate staff requirements for a theatre based on its specialty and number of sessions
  // Accepts optional theatreListsData parameter for auto-roster
  const calculateStaffRequirements = (specialtyAbbr: string, theatreId?: string, theatreName?: string, theatreListsData?: TheatreList[]): { roleName: string; quantity: number }[] => {
    // Check if there are custom requirements for this theatre
    if (theatreId && customTheatreRequirements[theatreId]) {
      console.log(`🎯 Using custom requirements for ${theatreName}`);
      return customTheatreRequirements[theatreId];
    }

    if (!theatreStaffRoles || theatreStaffRoles.length === 0) {
      console.log(`⚠️ No theatre staff roles configured!`);
      return [];
    }

    console.log(`✅ Found ${theatreStaffRoles.length} default theatre staff roles`);

    // Check if this is an emergency or trauma theatre
    const theatre = theatres.find(t => {
      const normalizedTheatreName = t.name?.toLowerCase().replace(/theatre\s+/gi, '').trim();
      const normalizedTargetName = theatreName?.toLowerCase().replace(/theatre\s+/gi, '').trim();
      return normalizedTheatreName === normalizedTargetName || t.id === theatreId;
    });

    const isEmergencyTheatre = theatre?.theatreType === 'emergency' || theatre?.theatreType === 'trauma';
    console.log(`🏥 Theatre "${theatreName}" type: ${theatre?.theatreType || 'elective'} (emergency: ${isEmergencyTheatre})`);

    // Start with default quantities from theatre staff roles (group by category for display order)
    const requirements: Record<string, number> = {};

    // Get default quantities
    theatreStaffRoles.forEach(role => {
      requirements[role.roleName] = role.defaultQuantity || 0;
    });

    console.log(`📊 Default requirements:`, requirements);

    // Find specialty mapper to add additional requirements
    console.log(`🔍 Looking for mapper - Theatre: ${theatreName}, Specialty: "${specialtyAbbr}", Emergency: ${isEmergencyTheatre}`);

    // Use provided theatre lists data (for auto-roster) or component state (for display)
    const listsToUse = theatreListsData || theatreLists;

    // Get procedure list for this theatre session
    let procedureNames: string[] = [];
    if (theatreName && listsToUse) {
      const theatreSessions = listsToUse.filter(list => {
        const listTheatreName = list.theatreName?.toLowerCase().replace(/theatre\s+/gi, '').trim();
        const targetTheatreName = theatreName.toLowerCase().replace(/theatre\s+/gi, '').trim();
        return listTheatreName === targetTheatreName;
      });

      procedureNames = theatreSessions.flatMap(session =>
        session.cases?.map(c => c.procedureName) || []
      );
      console.log(`📋 Procedures in session:`, procedureNames);
    }

    if (staffRequirementMappers && (specialtyAbbr || isEmergencyTheatre)) {
      // For emergency theatres, look for "Emergency" specialty mapper
      const searchSpecialty = isEmergencyTheatre ? 'Emergency' : specialtyAbbr;

      const specialty = firebaseSpecialties.find(s =>
        s.abbreviation === searchSpecialty ||
        s.name === searchSpecialty ||
        s.abbr === searchSpecialty ||
        (isEmergencyTheatre && (s.name === 'Emergency' || s.abbreviation === 'EMERG'))
      );

      console.log(`✅ Matched specialty:`, specialty);

      if (specialty) {
        // Find all mappers for this specialty
        const matchingMappers = staffRequirementMappers.filter(m =>
          m.specialtyId === specialty.id || m.specialtyName === specialty.name
        );

        console.log(`📋 Found ${matchingMappers.length} mappers for specialty`);

        matchingMappers.forEach(mapper => {
          let shouldApplyMapper = false;

          // Check if this mapper should apply
          if (isEmergencyTheatre && (mapper.keyword === null || !mapper.keyword)) {
            // Emergency theatre with "apply to all" mapper
            shouldApplyMapper = true;
            console.log(`⚕️ Emergency theatre - applying "all procedures" mapper`);
          } else if (mapper.keyword === null || !mapper.keyword) {
            // Non-emergency but mapper applies to all procedures in this specialty
            shouldApplyMapper = true;
            console.log(`✅ Mapper applies to all procedures in specialty`);
          } else if (mapper.keywords && mapper.keywords.length > 0) {
            // Check if any procedure name contains the keywords
            shouldApplyMapper = procedureNames.some(procName =>
              mapper.keywords!.some(kw =>
                procName.toLowerCase().includes(kw.toLowerCase())
              )
            );
            if (shouldApplyMapper) {
              console.log(`✅ Procedure keyword match found:`, mapper.keywords);
            }
          } else if (mapper.keyword) {
            // Legacy single keyword check
            shouldApplyMapper = procedureNames.some(procName =>
              procName.toLowerCase().includes(mapper.keyword!.toLowerCase())
            );
            if (shouldApplyMapper) {
              console.log(`✅ Procedure keyword match found:`, mapper.keyword);
            }
          }

          if (shouldApplyMapper && mapper.roles) {
            console.log(`➕ Adding ${mapper.roles.length} additional roles from mapper`);
            mapper.roles.forEach(req => {
              console.log(`  - Adding ${req.quantity}x ${req.roleName}`);
              if (requirements[req.roleName]) {
                requirements[req.roleName] += req.quantity;
              } else {
                requirements[req.roleName] = req.quantity;
              }
            });
          }
        });
      } else {
        console.log(`⚠️ Could not match specialty: ${searchSpecialty}`);
      }
    }

    // Convert to array and sort by category order (Anaes, Scrub, HCA, others)
    return Object.entries(requirements).map(([roleName, quantity]) => ({
      roleName,
      quantity
    })).sort((a, b) => {
      // Define order priority
      const order = ['Anaes N/P', 'Scrub N/P', 'HCA'];
      const aIndex = order.findIndex(r => a.roleName.includes(r));
      const bIndex = order.findIndex(r => b.roleName.includes(r));

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.roleName.localeCompare(b.roleName);
    });
  };

  const handleInitializeConfig = async () => {
    if (!currentHospital?.id) {
      alert('No hospital selected');
      return;
    }

    try {
      await initializeAllocationConfig(currentHospital.id);
      alert('Configuration initialized successfully! Reloading...');
      await loadTheatreUnits();
    } catch (error) {
      console.error('Error initializing config:', error);
      alert('Error initializing configuration. Check console for details.');
    }
  };

  const handleAuxUnitLabelClick = (e: React.MouseEvent, auxUnit: SpecialUnit) => {
    e.preventDefault();
    e.stopPropagation();

    const menuWidth = 220;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // DEAD CENTER of the viewport - horizontally
    const x = (viewportWidth - menuWidth) / 2;

    // DEAD CENTER of the viewport - vertically
    // Assuming menu is approximately 400px tall, offset by half
    const y = (viewportHeight / 2) - 200;

    setAuxUnitContextMenu({
      visible: true,
      x,
      y,
      auxUnitId: auxUnit.id,
      unitLocation: auxUnit.unitLocation
    });
  };

  const handleTheatreLabelClick = (e: React.MouseEvent, theatre: TheatreData, unitLocation: string) => {
    e.preventDefault();
    e.stopPropagation();

    const menuWidth = 220;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // DEAD CENTER of the viewport - horizontally
    const x = (viewportWidth - menuWidth) / 2;

    // DEAD CENTER of the viewport - vertically
    // Assuming menu is approximately 400px tall, offset by half
    const y = (viewportHeight / 2) - 200;

    setAuxUnitContextMenu({
      visible: true,
      x,
      y,
      auxUnitId: theatre.id,
      unitLocation: unitLocation
    });
  };

  const handleSelectAuxUnitSpecialty = (auxUnitId: string, abbreviation: string) => {
    // Directly assign the selected abbreviation
    setAuxUnitSpecialties(prev => ({
      ...prev,
      [auxUnitId]: abbreviation
    }));
    setAuxUnitContextMenu({ visible: false, x: 0, y: 0, auxUnitId: '', unitLocation: '' });
  };

  const handleSelectAuxUnitSessionType = (auxUnitId: string, sessionTypeId: string) => {
    // Assign the selected session type
    setAuxUnitSessionTypes(prev => ({
      ...prev,
      [auxUnitId]: sessionTypeId
    }));
    setAuxUnitContextMenu({ visible: false, x: 0, y: 0, auxUnitId: '', unitLocation: '' });
  };

  const handleTheatreStaffClick = (e: React.MouseEvent, theatre: TheatreData, specialty: string) => {
    console.log('🖱️ Theatre staff cell clicked!', {
      templateMode,
      theatreId: theatre.id,
      theatreName: theatre.name,
      specialty
    });

    if (!templateMode) {
      console.log('⚠️ Not in template mode, ignoring click');
      return; // Only allow in template mode
    }

    e.preventDefault();
    e.stopPropagation();

    // Calculate current requirements
    const requirements = calculateStaffRequirements(specialty, theatre.id, theatre.name);
    console.log('📊 Calculated requirements:', requirements);

    setStaffRequirementModal({
      visible: true,
      theatreId: theatre.id,
      theatreName: theatre.name,
      specialty: specialty,
      requirements: requirements.length > 0 ? requirements : []
    });

    console.log('✅ Modal should now be visible');
  };

  const handleSaveStaffRequirements = async (requirements: { roleName: string; quantity: number }[]) => {
    if (!staffRequirementModal.theatreId || !currentHospital?.id) return;

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Save to Firebase
      const docId = `${currentHospital.id}_${staffRequirementModal.theatreId}`;
      await setDoc(doc(db, 'theatreStaffingDefaults', docId), {
        hospitalId: currentHospital.id,
        theatreId: staffRequirementModal.theatreId,
        theatreName: staffRequirementModal.theatreName,
        requirements: requirements,
        updatedAt: new Date().toISOString()
      });

      console.log('✅ Saved theatre staffing defaults to Firebase');

      // Update local state
      setCustomTheatreRequirements(prev => ({
        ...prev,
        [staffRequirementModal.theatreId]: requirements
      }));

      setStaffRequirementModal({
        visible: false,
        theatreId: '',
        theatreName: '',
        specialty: '',
        requirements: []
      });
    } catch (error) {
      console.error('❌ Error saving theatre staffing defaults:', error);
      alert('Failed to save staffing requirements');
    }
  };

  const handleCloseStaffModal = () => {
    setStaffRequirementModal({
      visible: false,
      theatreId: '',
      theatreName: '',
      specialty: '',
      requirements: []
    });
  };

  const closeAuxUnitContextMenu = () => {
    setAuxUnitContextMenu({ visible: false, x: 0, y: 0, auxUnitId: '', unitLocation: '' });
  };

  const loadTheatreUnits = async () => {
    try {
      setLoading(true);

      // Load all configuration data including specialties from Firebase
      const [units, coordinators, specials, poolSections, fbSpecialties] = await Promise.all([
        getTheatreUnits(currentHospital?.id),
        getUnitCoordinators(currentHospital?.id),
        getSpecialUnits(currentHospital?.id),
        getStaffPoolSections(currentHospital?.id),
        getSpecialties()
      ]);

      console.log('Loaded units:', units);
      console.log('Loaded coordinators:', coordinators);
      console.log('Loaded specials:', specials);
      console.log('Loaded pool sections:', poolSections);
      console.log('Loaded Firebase specialties:', fbSpecialties);

      // Check for duplicate special units
      const specialUnitLabels = specials.map(s => s.label);
      const duplicateLabels = specialUnitLabels.filter((label, index) => specialUnitLabels.indexOf(label) !== index);
      if (duplicateLabels.length > 0) {
        console.warn('⚠️ DUPLICATE SPECIAL UNITS FOUND:', duplicateLabels);
        console.warn('⚠️ Full special units data:', specials.map(s => ({
          id: s.id,
          label: s.label,
          unitLocation: s.unitLocation,
          type: s.type,
          order: s.order
        })));
      }

      setTheatreUnits(units);
      setUnitCoordinators(coordinators);
      setSpecialUnits(specials);
      setStaffPoolSections(poolSections);
      setFirebaseSpecialties(fbSpecialties);

      // Sort units by order and extract locations
      const sortedUnitsByOrder = [...units].sort((a, b) => a.order - b.order);
      const locations = sortedUnitsByOrder.map(u => u.location);
      console.log('Locations by unit order:', locations);
      setUniqueLocations(locations);

      // Create default role structure for each theatre
      const createDefaultRoles = (): RoleSlot[] => [
        { role: 'Scrub N/P 1' },
        { role: 'Scrub N/P 2' },
        { role: 'Anaes N/P' },
        { role: 'HCA' },
      ];

      // Sort all units by order field
      const sortedUnits = [...units].sort((a, b) => a.order - b.order);

      // First unit goes to column 1
      const firstColumnUnits = sortedUnits[0] ? [sortedUnits[0]] : [];
      const fourthFloorData: TheatreData[] = [];

      // Load actual theatres from Firebase
      const { getTheatres } = await import('@/lib/scheduling/theatreService');
      const allTheatres = await getTheatres();

      firstColumnUnits.forEach((unit) => {
        const unitTheatres = allTheatres.filter(t => t.unitId === unit.id);
        unitTheatres.forEach(theatre => {
          fourthFloorData.push({
            id: theatre.id,
            name: theatre.name,
            specialty: '',
            sessionType: '',
            roles: createDefaultRoles(),
            theatreType: theatre.theatreType
          });
        });
      });

      // Second unit goes to column 2
      const secondColumnUnits = sortedUnits[1] ? [sortedUnits[1]] : [];
      const thirdFloorData: TheatreData[] = [];

      secondColumnUnits.forEach((unit) => {
        const unitTheatres = allTheatres.filter(t => t.unitId === unit.id);
        unitTheatres.forEach(theatre => {
          thirdFloorData.push({
            id: theatre.id,
            name: theatre.name,
            specialty: '',
            sessionType: '',
            roles: createDefaultRoles(),
            theatreType: theatre.theatreType
          });
        });
      });

      console.log(`🏥 Loaded theatres:`, {
        fourthFloor: fourthFloorData.length,
        fourthFloorNames: fourthFloorData.map(t => t.name),
        thirdFloor: thirdFloorData.length,
        thirdFloorNames: thirdFloorData.map(t => t.name)
      });

      setFourthFloorTheatres(fourthFloorData);
      setThirdFloorTheatres(thirdFloorData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading theatre units:', error);
      setLoading(false);
    }
  };

  // Handle Excel upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'scrub' | 'anaes') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const parsedStaff: StaffMember[] = jsonData.map((row: any, index: number) => ({
          id: `${type}-${index}`,
          name: row['Name'] || row['Staff Name'] || '',
          title: row['Title'] || '',
          role: type === 'scrub' ? 'Scrub N/P' : 'Anaes N/P',
          band: parseBand(row['Band'] || row['Grade'] || ''),
          team: row['Team'] || row['Specialty'] || '',
          shiftStart: parseTime(row['Start Time'] || row['Start'] || ''),
          shiftEnd: parseTime(row['End Time'] || row['End'] || ''),
          allocated: false
        })).filter(staff => staff.name);

        if (type === 'scrub') {
          setScrubStaff(parsedStaff);
        } else {
          setAnaesStaff(parsedStaff);
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please ensure it follows the Optima Health Roster format.');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const parseBand = (bandString: string): '5' | '6' | '7' | '8' | '9' => {
    const band = bandString.toString().replace(/[^\d]/g, '');
    if (['5', '6', '7', '8', '9'].includes(band)) return band as '5' | '6' | '7' | '8' | '9';
    return '5';
  };

  const parseTime = (timeString: string): string => {
    if (!timeString) return '08:00';
    return timeString.toString().slice(0, 5);
  };

  // Update specialty for a theatre
  const updateTheatreSpecialty = (theatreId: string, specialty: string) => {
    setFourthFloorTheatres(prev => prev.map(t =>
      t.id === theatreId ? { ...t, specialty } : t
    ));
    setThirdFloorTheatres(prev => prev.map(t =>
      t.id === theatreId ? { ...t, specialty } : t
    ));
  };

  // Update session type for a theatre
  const updateTheatreSessionType = (theatreId: string, sessionType: string) => {
    setFourthFloorTheatres(prev => prev.map(t =>
      t.id === theatreId ? { ...t, sessionType } : t
    ));
    setThirdFloorTheatres(prev => prev.map(t =>
      t.id === theatreId ? { ...t, sessionType } : t
    ));
  };

  // Handle right-click on role slot
  const handleRightClick = (e: React.MouseEvent, theatreId: string, roleIndex: number) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      theatreId,
      roleIndex
    });
  };

  // Assign staff to role
  const assignStaff = (staff: StaffMember) => {
    const { theatreId, roleIndex } = contextMenu;

    // Find theatre and update
    const updateTheatre = (theatres: TheatreData[], setTheatres: React.Dispatch<React.SetStateAction<TheatreData[]>>) => {
      const theatre = theatres.find(t => t.id === theatreId);
      if (theatre) {
        const newTheatres = theatres.map(t => {
          if (t.id === theatreId) {
            const newRoles = [...t.roles];
            newRoles[roleIndex] = { ...newRoles[roleIndex], assignedStaff: staff };
            return { ...t, roles: newRoles };
          }
          return t;
        });
        setTheatres(newTheatres);

        // Mark staff as allocated
        if (staff.role === 'Scrub N/P') {
          setScrubStaff(prev => prev.map(s => s.id === staff.id ? { ...s, allocated: true } : s));
        } else if (staff.role === 'Anaes N/P') {
          setAnaesStaff(prev => prev.map(s => s.id === staff.id ? { ...s, allocated: true } : s));
        }
      }
    };

    updateTheatre(fourthFloorTheatres, setFourthFloorTheatres);
    updateTheatre(thirdFloorTheatres, setThirdFloorTheatres);

    setContextMenu({ ...contextMenu, visible: false });
  };

  // Clear all allocations
  const handleClear = () => {
    if (confirm('Clear all staff allocations?')) {
      setFourthFloorTheatres(prev => prev.map(t => ({
        ...t,
        roles: t.roles.map(r => ({ role: r.role }))
      })));
      setThirdFloorTheatres(prev => prev.map(t => ({
        ...t,
        roles: t.roles.map(r => ({ role: r.role }))
      })));
      setScrubStaff(prev => prev.map(s => ({ ...s, allocated: false })));
      setAnaesStaff(prev => prev.map(s => ({ ...s, allocated: false })));
      setAutoRosterAllocations(new Map()); // Clear auto-roster allocations
    }
  };

  // Helper function to get dates in range
  const getDateRange = (startDate: string, endDate: string): string[] => {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const current = new Date(start);
    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // Generate requirements for a specific date
  const generateRequirementsForDate = async (date: string) => {
    console.log(`\n🔍 Loading theatre lists for ${date}...`);

    // Load theatre lists for this specific date
    const dateLists = await getTheatreListsByDateRange(date, date);

    console.log(`📋 Found ${dateLists.length} theatre sessions for ${date}`);
    if (dateLists.length > 0) {
      console.log('Theatre sessions:', dateLists.map(l => ({
        name: l.theatreName,
        specialty: l.specialty,
        type: l.sessionType
      })));
    }

    const requirements = new Map<string, { theatreId: string; sessionTypeId: string; specialty: string; roles: { roleName: string; quantity: number }[] }>();

    console.log(`\n🏥 Processing ${fourthFloorTheatres.length} 4th floor theatres...`);
    // Process 4th floor theatres
    for (const theatre of fourthFloorTheatres) {
      const theatreLists = dateLists.filter(list => {
        const normalizedListName = list.theatreName.replace(/Theatre\s+/gi, '').trim();
        const normalizedTheatreName = theatre.name.replace(/Theatre\s+/gi, '').trim();
        const match = normalizedListName === normalizedTheatreName;

        if (match) {
          console.log(`  ✅ Matched: "${list.theatreName}" → "${theatre.name}"`);
        }

        return match;
      });

      if (theatreLists.length > 0) {
        const theatreList = theatreLists[0];
        const specialty = getSpecialtyAbbr(theatreList.specialty);
        console.log(`  📊 Calculating requirements for ${theatre.name} (${specialty})...`);

        // Pass dateLists as the 4th parameter so it uses the correct theatre data
        const roleRequirements = calculateStaffRequirements(specialty, theatre.id, theatre.name, dateLists);

        console.log(`     Requirements: ${roleRequirements.length} roles`);

        if (roleRequirements.length > 0) {
          requirements.set(theatre.id, {
            theatreId: theatre.id,
            sessionTypeId: theatreList.sessionType,
            specialty: theatreList.specialty,
            roles: roleRequirements
          });
          console.log(`     ✅ Added to requirements map`);
        } else {
          console.log(`     ⚠️ No role requirements calculated`);
        }
      } else {
        console.log(`  ⚠️ No session found for ${theatre.name}`);
      }
    }

    console.log(`\n🏥 Processing ${thirdFloorTheatres.length} 3rd floor theatres...`);
    // Process 3rd floor theatres
    for (const theatre of thirdFloorTheatres) {
      const theatreLists = dateLists.filter(list => {
        const normalizedListName = list.theatreName.replace(/Theatre\s+/gi, '').trim();
        const normalizedTheatreName = theatre.name.replace(/Theatre\s+/gi, '').trim();
        const match = normalizedListName === normalizedTheatreName;

        if (match) {
          console.log(`  ✅ Matched: "${list.theatreName}" → "${theatre.name}"`);
        }

        return match;
      });

      if (theatreLists.length > 0) {
        const theatreList = theatreLists[0];
        const specialty = getSpecialtyAbbr(theatreList.specialty);
        console.log(`  📊 Calculating requirements for ${theatre.name} (${specialty})...`);

        // Pass dateLists as the 4th parameter so it uses the correct theatre data
        const roleRequirements = calculateStaffRequirements(specialty, theatre.id, theatre.name, dateLists);

        console.log(`     Requirements: ${roleRequirements.length} roles`);

        if (roleRequirements.length > 0) {
          requirements.set(theatre.id, {
            theatreId: theatre.id,
            sessionTypeId: theatreList.sessionType,
            specialty: theatreList.specialty,
            roles: roleRequirements
          });
          console.log(`     ✅ Added to requirements map`);
        } else {
          console.log(`     ⚠️ No role requirements calculated`);
        }
      } else {
        console.log(`  ⚠️ No session found for ${theatre.name}`);
      }
    }

    // Add emergency theatres (even without theatre lists) + Mile End + Night
    console.log(`\n🚨 Adding emergency theatres, Mile End, and Night shift staffing...`);

    // Check all 4th floor theatres for emergency types without sessions
    for (const theatre of fourthFloorTheatres) {
      if ((theatre.theatreType === 'emergency' || theatre.theatreType === 'trauma') && !requirements.has(theatre.id)) {
        console.log(`  🚑 Emergency theatre without session: ${theatre.name} - adding default emergency staffing`);
        const emergencyRoles = calculateStaffRequirements('Emergency', theatre.id, theatre.name);
        if (emergencyRoles.length > 0) {
          requirements.set(theatre.id, {
            theatreId: theatre.id,
            sessionTypeId: 'EMERGENCY',
            specialty: 'Emergency',
            roles: emergencyRoles
          });
          console.log(`     ✅ Added emergency staffing for ${theatre.name}`);
        }
      }
    }

    // Add Mile End (assuming it's a separate theatre location)
    const mileEndRoles = calculateStaffRequirements('General Surgery', 'mile-end', 'Mile End');
    if (mileEndRoles.length > 0) {
      requirements.set('mile-end', {
        theatreId: 'mile-end',
        sessionTypeId: 'FULL',
        specialty: 'General Surgery',
        roles: mileEndRoles
      });
      console.log(`  ✅ Added Mile End staffing`);
    }

    // Add Night shift staffing (20:00-08:00 on-call cover)
    const nightRoles = [
      { roleName: 'Anaes N/P', quantity: 2 },
      { roleName: 'Scrub N/P', quantity: 7 },
      { roleName: 'HCA', quantity: 2 }
    ];
    requirements.set('night-shift', {
      theatreId: 'night-shift',
      sessionTypeId: 'NIGHT',
      specialty: 'Emergency',
      roles: nightRoles
    });
    console.log(`  ✅ Added Night shift staffing`);

    console.log(`\n✅ Total requirements generated: ${requirements.size} theatres (including emergency, Mile End, Night)`);

    return requirements;
  };

  // Generate auto-roster
  const handleAutoRoster = async () => {
    if (!currentHospital) {
      alert('Please select a hospital first');
      return;
    }

    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }

    // CRITICAL CHECK: Verify theatre staff roles are configured
    if (!theatreStaffRoles || theatreStaffRoles.length === 0) {
      alert('❌ CONFIGURATION REQUIRED!\n\nYou must configure Default Theatre Staff Roles first.\n\nGo to:\nAdmin → Schedule → Configurations → Staffing\n\nAdd roles like:\n- Scrub N/P (Default Qty: 2)\n- Anaes N/P (Default Qty: 1)\n- Recovery N/P (Default Qty: 1)\n- HCA (Default Qty: 1)\n\nWithout these, the system cannot calculate staffing requirements.');
      console.error('❌ Cannot run auto-roster: No theatre staff roles configured!');
      console.log('Current theatreStaffRoles:', theatreStaffRoles);
      return;
    }

    console.log(`✅ Theatre staff roles loaded: ${theatreStaffRoles.length} roles`);

    // Determine date range
    const dates = autoRosterMode === 'range'
      ? getDateRange(selectedDate, autoRosterEndDate)
      : [selectedDate];

    const dateRangeText = autoRosterMode === 'range'
      ? `${selectedDate} to ${autoRosterEndDate} (${dates.length} days)`
      : selectedDate;

    if (confirm(`Generate automatic staff allocations for ${dateRangeText}?\n\nThis will create allocations based on:\n- Template requirements (Step 2 + Step 3 mappers)\n- Staff availability (FTE, leave)\n- Staff competencies\n\nExisting manual allocations will be replaced.`)) {
      setIsGeneratingRoster(true);
      setRosterProgress({ current: 0, total: dates.length });
      console.log(`🤖 Starting auto-roster generation for ${dates.length} days...`);

      try {
        const allAllocations = new Map<string, SessionAllocation>();

        // Process each date in range
        for (let i = 0; i < dates.length; i++) {
          const currentDate = dates[i];
          setRosterProgress({ current: i + 1, total: dates.length });
          console.log(`\n📅 Processing ${currentDate} (${i + 1}/${dates.length})...`);

          // Generate requirements for this specific date
          const requirements = await generateRequirementsForDate(currentDate);

          if (requirements.size === 0) {
            console.log(`⚠️ No theatre sessions found for ${currentDate}, skipping...`);
            continue;
          }

          console.log(`📊 Generated requirements for ${requirements.size} theatres on ${currentDate}`);

          // Generate auto-roster for this date
          const allocations = await generateAutoRoster(currentDate, requirements, currentHospital.id);

          // Merge allocations
          allocations.forEach((allocation, key) => {
            allAllocations.set(key, allocation);
          });

          // Save to Firebase immediately for this date
          await saveAutoRosterAllocations(allocations);

          console.log(`✅ Completed ${currentDate}: ${allocations.size} sessions allocated`);
        }

        // Update state with all allocations
        setAutoRosterAllocations(allAllocations);

        console.log(`\n✅ Auto-roster generation complete for ${dates.length} days!`);
        console.log(`📊 Allocation keys:`, Array.from(allAllocations.keys()));
        console.log(`📊 Sample allocation:`, Array.from(allAllocations.values())[0]);
        alert(`Successfully generated staff allocations for ${dates.length} days!\n\nTotal sessions: ${allAllocations.size}`);

      } catch (error) {
        console.error('❌ Error generating auto-roster:', error);
        alert(`Failed to generate auto-roster: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsGeneratingRoster(false);
        setRosterProgress(null);
      }
    }
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
    if (contextMenu.visible) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu.visible]);

  // Close auxiliary unit context menu when clicking outside
  useEffect(() => {
    const handleClick = () => closeAuxUnitContextMenu();
    if (auxUnitContextMenu.visible) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [auxUnitContextMenu.visible]);

  return (
    <div className="min-h-screen print:min-h-0 print:bg-white print:p-0 bg-gray-50">
      {/* Print-only header */}
      <div className="hidden print:block text-center py-1">
        <h1 className="text-xs font-bold text-gray-900">{currentHospital?.name || 'Hospital'} - Staff Allocation for {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</h1>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-3 sm:p-4 mb-4 print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
          {/* Date Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">{dayName}</span>
          </div>

          {/* Font Size Control */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Font Size:</label>
            <button
              onClick={() => setFontSize(prev => Math.max(50, prev - 10))}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-center">{fontSize}%</span>
            <button
              onClick={() => setFontSize(prev => Math.min(200, prev + 10))}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              +
            </button>
            <button
              onClick={() => setFontSize(typeof window !== 'undefined' && window.innerWidth < 768 ? 110 : 180)}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 flex items-center gap-1"
            >
              <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
              Print
            </button>

            <button className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 flex items-center gap-1">
              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
              Save
            </button>

            {/* Toggle Extra Controls Button */}
            <button
              onClick={() => setShowExtraControls(!showExtraControls)}
              className="px-3 py-1.5 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-gray-700 transition-all flex items-center gap-1"
            >
              {showExtraControls ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
              {showExtraControls ? 'Hide' : 'More'}
            </button>
          </div>

          {/* Extra Controls (Collapsible) */}
          {showExtraControls && (
          <div className="flex flex-wrap gap-2">
            <label className="px-3 py-1.5 text-white text-xs sm:text-sm font-medium rounded transition-all cursor-pointer flex items-center gap-1" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
              Upload Scrub
              <input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e, 'scrub')} className="hidden" />
            </label>

            <label className="px-3 py-1.5 text-white text-xs sm:text-sm font-medium rounded transition-all cursor-pointer flex items-center gap-1" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
              Upload Anaes
              <input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e, 'anaes')} className="hidden" />
            </label>

            <button
              onClick={handleClear}
              className="px-3 py-1.5 bg-red-700 text-white text-xs sm:text-sm font-medium rounded hover:bg-red-800 transition-all flex items-center gap-1"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              Clear
            </button>

            {!templateMode && (
              <>
                {/* Auto-Roster Mode Toggle */}
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                  <button
                    onClick={() => setAutoRosterMode('single')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      autoRosterMode === 'single'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Single
                  </button>
                  <button
                    onClick={() => setAutoRosterMode('range')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      autoRosterMode === 'range'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Range
                  </button>
                </div>

                {/* End Date Picker (only for range mode) */}
                {autoRosterMode === 'range' && (
                  <div className="flex items-center gap-1">
                    <label className="text-xs font-medium text-white">To:</label>
                    <input
                      type="date"
                      value={autoRosterEndDate}
                      onChange={(e) => setAutoRosterEndDate(e.target.value)}
                      min={selectedDate}
                      className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}

                {/* Auto-Roster Button */}
                <button
                  onClick={handleAutoRoster}
                  disabled={isGeneratingRoster}
                  className="px-3 py-1.5 bg-purple-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-purple-700 transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingRoster ? (
                    <>
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                      {rosterProgress ? `${rosterProgress.current}/${rosterProgress.total}` : 'Generating...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      Auto-Roster
                    </>
                  )}
                </button>
              </>
            )}

            <button
              onClick={() => setShowStaffList(!showStaffList)}
              className="px-3 py-1.5 text-white text-xs sm:text-sm font-medium rounded transition-all flex items-center gap-1"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <List className="w-3 h-3 sm:w-4 sm:h-4" />
              Staff List
            </button>

            <button
              onClick={handleInitializeConfig}
              className="px-3 py-1.5 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-gray-700 transition-all"
            >
              Initialize
            </button>
          </div>
          )}
        </div>

        {/* Staff Summary */}
        {(scrubStaff.length > 0 || anaesStaff.length > 0) && (
          <div className="mt-3 pt-3 border-t print:hidden" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="text-center">
                <p className="text-xs text-gray-200">Total Scrub Staff</p>
                <p className="text-lg font-semibold text-white">{scrubStaff.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-200">Allocated Scrub</p>
                <p className="text-lg font-semibold text-white">{scrubStaff.filter(s => s.allocated).length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-200">Total Anaes Staff</p>
                <p className="text-lg font-semibold text-white">{anaesStaff.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-200">Allocated Anaes</p>
                <p className="text-lg font-semibold text-white">{anaesStaff.filter(s => s.allocated).length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Three Column Grid - Full Width */}
      <div className="min-h-screen print:min-h-0 print:m-0" style={{ fontSize: '16px' }}>
        {/* Header Row */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-900 bg-blue-200 p-1 font-bold text-gray-900 text-center" style={{ width: `${col1Width}%`, fontSize: `${0.4375 * fontSize / 100}rem` }}>
                {fourthFloorTheatres.length > 0 ? uniqueLocations[0] : 'Loading...'}
              </th>
              <th className="border border-gray-900 bg-blue-200 p-1 font-bold text-gray-900 text-center" style={{ width: `${col2Width}%`, fontSize: `${0.4375 * fontSize / 100}rem` }}>
                {thirdFloorTheatres.length > 0 ? uniqueLocations[1] : ''}
              </th>
              <th className="border-l border-t border-r border-gray-900 bg-white p-1 font-bold text-gray-900 text-center print-no-bottom-border" style={{ width: `${col3Width}%`, fontSize: `${0.4375 * fontSize / 100}rem` }}></th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1: 1490 and 45871 */}
            <tr>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-0.5 py-0 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${0.75 * fontSize / 100}rem` }}>1490</div>
                  <div className={`px-0.5 py-0 flex items-center justify-center ${templateMode ? 'bg-gray-50' : 'bg-white'}`} style={{ minHeight: `${0.75 * fontSize / 100}rem` }}>
                    <div className="leading-[1.35] w-full text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                      {templateMode ? (
                        <span className="text-gray-600 font-medium">Band 7 (Coordinator)</span>
                      ) : (
                        <span className="text-gray-400 italic">No staff allocated</span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-0.5 py-0 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${0.75 * fontSize / 100}rem` }}>45871</div>
                  <div className={`px-0.5 py-0 flex items-center justify-center ${templateMode ? 'bg-gray-50' : 'bg-white'}`} style={{ minHeight: `${0.75 * fontSize / 100}rem` }}>
                    <div className="leading-[1.35] w-full text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                      {templateMode ? (
                        <span className="text-gray-600 font-medium">Band 7 (Coordinator)</span>
                      ) : (
                        <span className="text-gray-400 italic">No staff allocated</span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="border-l border-r border-gray-900 bg-white p-0 print-no-top-bottom-border"></td>
            </tr>

            {/* Row 2: 1494 */}
            <tr>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-0.5 py-0 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${0.75 * fontSize / 100}rem` }}>1494</div>
                  <div className={`px-0.5 py-0 flex items-center justify-center ${templateMode ? 'bg-gray-50' : 'bg-white'}`} style={{ minHeight: `${0.75 * fontSize / 100}rem` }}>
                    <div className="leading-[1.35] w-full text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                      {templateMode ? (
                        <span className="text-gray-600 font-medium">Anaes N/P (not allocated)</span>
                      ) : (
                        <span className="text-gray-400 italic">No staff allocated</span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-0.5 py-0 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${0.75 * fontSize / 100}rem` }}></div>
                  <div className="p-0 bg-white" style={{ minHeight: `${0.75 * fontSize / 100}rem` }}></div>
                </div>
              </td>
              <td className="border-l border-r border-gray-900 bg-white p-0 print-no-top-bottom-border"></td>
            </tr>

            {/* Dynamic theatre rows */}
            {loading ? (
              <tr>
                <td colSpan={2} className="border border-gray-900 bg-white p-2 text-center">
                  <p className=" text-gray-600">Loading theatres...</p>
                </td>
              </tr>
            ) : (
              (() => {
                // Calculate total rows including auxiliary units for each column
                const firstColumnSpecialUnits = specialUnits.filter(su => su.unitLocation === uniqueLocations[0]);
                const secondColumnSpecialUnits = specialUnits.filter(su => su.unitLocation === uniqueLocations[1]);

                const firstColumnTotalRows = fourthFloorTheatres.length + firstColumnSpecialUnits.length;
                const secondColumnTotalRows = thirdFloorTheatres.length + secondColumnSpecialUnits.length;
                const maxRows = Math.max(firstColumnTotalRows, secondColumnTotalRows);

                console.log('🔍 Row calculation:', {
                  firstColumnTheatres: fourthFloorTheatres.length,
                  firstColumnSpecialUnits: firstColumnSpecialUnits.length,
                  firstColumnTotal: firstColumnTotalRows,
                  secondColumnTheatres: thirdFloorTheatres.length,
                  secondColumnSpecialUnits: secondColumnSpecialUnits.length,
                  secondColumnTotal: secondColumnTotalRows,
                  maxRows
                });

                return Array.from({ length: maxRows }).map((_, idx) => {
                  const fourthFloorTheatre = fourthFloorTheatres[idx];
                  const thirdFloorTheatre = thirdFloorTheatres[idx];

                return (
                  <tr key={idx}>
                    {/* 4th Floor Theatre */}
                    {fourthFloorTheatre ? (() => {
                      const lists = getTheatreListsForTheatre(fourthFloorTheatre.name);
                      const specialty = getSpecialtyFromLists(lists, fourthFloorTheatre.name);
                      const sessionCount = getSessionCount(lists, fourthFloorTheatre.name);
                      return (
                      <td className="border border-gray-900 bg-white p-0">
                        <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                          <div
                            className={`border-r border-gray-900 px-0.5 py-0.5  font-bold text-gray-900 bg-blue-200 flex flex-col items-center justify-center gap-0 cursor-pointer hover:opacity-90 transition-all min-h-[42px]`}
                            onClick={(e) => handleTheatreLabelClick(e, fourthFloorTheatre, uniqueLocations[0])}
                          >
                            <div className="flex flex-col items-center gap-0 leading-none">
                              <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{fourthFloorTheatre.name}</div>
                              {specialty && (
                                <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{specialty}</div>
                              )}
                              {sessionCount && (
                                <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{sessionCount}</div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`px-0.5 py-0.5 ${templateMode ? 'bg-gray-50 cursor-pointer hover:bg-gray-100' : 'bg-white'} flex flex-col gap-0 min-h-[42px] transition-colors`}
                            onClick={templateMode ? (e) => handleTheatreStaffClick(e, fourthFloorTheatre, specialty) : undefined}
                          >
                            <div className={`flex flex-col gap-0 w-full ${templateMode ? 'pointer-events-none' : ''}`}>
                              {templateMode ? (() => {
                                console.log(`📊 Rendering template for ${fourthFloorTheatre.name}, specialty: "${specialty}"`);
                                const requirements = calculateStaffRequirements(specialty || '', fourthFloorTheatre.id, fourthFloorTheatre.name);
                                console.log(`   Requirements calculated:`, requirements);

                                if (requirements.length === 0) {
                                  console.log(`⚠️ No requirements for ${fourthFloorTheatre.name}`);
                                  return <div className="leading-[1.35] w-full text-gray-400 italic text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>No staff configured</div>;
                                }

                                // Group requirements by role base name and render with separators
                                const elements: JSX.Element[] = [];
                                let lastRoleBase = '';

                                requirements.forEach((req, index) => {
                                  const currentRoleBase = req.roleName.includes('Anaes') ? 'Anaes' :
                                                         req.roleName.includes('Scrub') ? 'Scrub' : req.roleName;

                                  // Add separator between different role types
                                  if (lastRoleBase && lastRoleBase !== currentRoleBase && index > 0) {
                                    elements.push(<div key={`sep-${index}`} className="h-0.5"></div>);
                                  }

                                  // Render each staff position
                                  for (let i = 1; i <= req.quantity; i++) {
                                    const suffix = req.quantity > 1 ? ` ${i}` : '';
                                    elements.push(
                                      <div key={`${req.roleName}-${i}`} className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        {req.roleName}{suffix}
                                      </div>
                                    );
                                  }

                                  lastRoleBase = currentRoleBase;
                                });

                                return <>{elements}</>;
                              })() : (() => {
                                // Allocation mode: Show actual staff assignments
                                const sessionId = `${fourthFloorTheatre.id}-${selectedDate}`;
                                const allocation = autoRosterAllocations.get(sessionId);

                                console.log(`🔍 Theatre: ${fourthFloorTheatre.name}, sessionId="${sessionId}", found=${!!allocation}`);
                                if (autoRosterAllocations.size === 0) {
                                  console.log('⚠️ autoRosterAllocations Map is EMPTY');
                                }

                                if (!allocation || allocation.roles.length === 0) {
                                  return (
                                    <div className="leading-[1.35] w-full text-gray-400 italic text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                      No staff allocated
                                    </div>
                                  );
                                }

                                const elements: JSX.Element[] = [];
                                let lastRole = '';

                                allocation.roles.forEach((roleAlloc, roleIdx) => {
                                  // Group by role type (Anaes, Scrub, etc.)
                                  const currentRoleBase = roleAlloc.role.includes('Anaes') ? 'Anaes' :
                                                         roleAlloc.role.includes('Scrub') ? 'Scrub' : roleAlloc.role;

                                  // Add separator between different role types
                                  if (lastRole && lastRole !== currentRoleBase && roleIdx > 0) {
                                    elements.push(<div key={`sep-${roleIdx}`} className="h-0.5"></div>);
                                  }

                                  // Render each assigned staff member
                                  roleAlloc.assignedStaff.forEach((staff, staffIdx) => {
                                    elements.push(
                                      <div key={`${roleAlloc.id}-${staffIdx}`} className="leading-[1.35] flex justify-between w-full" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        <span className="font-medium text-gray-900">{staff.staffName} ({staff.band})</span>
                                        <span className="ml-1 text-gray-600">8-6</span>
                                      </div>
                                    );
                                  });

                                  lastRole = currentRoleBase;
                                });

                                return <>{elements}</>;
                              })()}
                            </div>
                          </div>
                        </div>
                      </td>
                      );
                    })() : (() => {
                      // Get special units for first column's location
                      const columnLocation = uniqueLocations[0];
                      const specialUnitsForColumn = specialUnits.filter(su => su.unitLocation === columnLocation);
                      const specialUnitIndex = idx - fourthFloorTheatres.length;

                      if (specialUnitIndex >= 0 && specialUnitIndex < specialUnitsForColumn.length) {
                        const specialUnit = specialUnitsForColumn[specialUnitIndex];
                        const rowSpan = specialUnit.rowSpan || 1;
                        const minHeight = rowSpan * 42;

                        return (
                          <td className="border border-gray-900 bg-white p-0" rowSpan={rowSpan}>
                            <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                              <div
                                className={`border-r border-gray-900 px-0.5 py-0.5  font-bold text-gray-900 bg-blue-200 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-colors`}
                                style={{ minHeight: `${minHeight}px` }}
                                onClick={(e) => handleAuxUnitLabelClick(e, specialUnit)}
                              >
                                <div style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{specialUnit.label}</div>
                                {auxUnitSpecialties[specialUnit.id] && (
                                  <div className="mt-0.5" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{auxUnitSpecialties[specialUnit.id]}</div>
                                )}
                                {auxUnitSessionTypes[specialUnit.id] && (
                                  <div className="mt-0.5" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{getSessionTypeAbbr(auxUnitSessionTypes[specialUnit.id])}</div>
                                )}
                              </div>
                              <div className={`px-0.5 py-0.5 ${templateMode ? 'bg-gray-50' : 'bg-white'} flex flex-col gap-0`} style={{ minHeight: `${minHeight}px` }}>
                                <div className="flex flex-col gap-0 w-full">
                                  {specialUnit.type === 'night-shift' ? (
                                    templateMode ? (
                                      <>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P 2</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 2</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 3</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 4</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 5</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 6</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 7</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA 2</div>
                                      </>
                                    ) : (
                                      <div className="leading-[1.35] w-full text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        No staff allocated
                                      </div>
                                    )
                                  ) : (
                                    templateMode ? (
                                      <>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 2</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA</div>
                                      </>
                                    ) : (
                                      <div className="leading-[1.35] w-full text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        No staff allocated
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      }

                      // Check if this row should be skipped due to rowspan from previous special unit
                      let skipDueToRowSpan = false;
                      for (let i = 0; i < specialUnitIndex; i++) {
                        const prevUnit = specialUnitsForColumn[i];
                        if (prevUnit) {
                          const prevRowSpan = prevUnit.rowSpan || 1;
                          if (specialUnitIndex < i + prevRowSpan) {
                            skipDueToRowSpan = true;
                            break;
                          }
                        }
                      }

                      if (skipDueToRowSpan) {
                        return null;
                      }

                      return (
                        <td className="border border-gray-900 bg-white p-0">
                          <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                            <div className="border-r border-gray-900 px-0.5 py-0.5 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${2.625 * fontSize / 100}rem` }}></div>
                            <div className="p-0.5 bg-white min-h-[42px]"></div>
                          </div>
                        </td>
                      );
                    })()}

                    {/* 3rd Floor Theatre */}
                    {thirdFloorTheatre ? (() => {
                      const lists = getTheatreListsForTheatre(thirdFloorTheatre.name);
                      const specialty = getSpecialtyFromLists(lists, thirdFloorTheatre.name);
                      const sessionCount = getSessionCount(lists, thirdFloorTheatre.name);
                      return (
                      <td className="border border-gray-900 bg-white p-0">
                        <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                          <div
                            className={`border-r border-gray-900 px-0.5 py-0.5  font-bold text-gray-900 bg-blue-200 flex flex-col items-center justify-center gap-0 cursor-pointer hover:opacity-90 transition-colors min-h-[42px]`}
                            onClick={(e) => handleTheatreLabelClick(e, thirdFloorTheatre, uniqueLocations[1])}
                          >
                            <div className="flex flex-col items-center gap-0 leading-none">
                              <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{thirdFloorTheatre.name}</div>
                              {specialty && (
                                <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{specialty}</div>
                              )}
                              {sessionCount && (
                                <div className="font-bold text-center" style={{ fontSize: `${0.34375 * fontSize / 100}rem` }}>{sessionCount}</div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`px-0.5 py-0.5 ${templateMode ? 'bg-gray-50 cursor-pointer hover:bg-gray-100' : 'bg-white'} flex flex-col gap-0 min-h-[42px] transition-colors`}
                            onClick={templateMode ? (e) => handleTheatreStaffClick(e, thirdFloorTheatre, specialty) : undefined}
                          >
                            <div className={`flex flex-col gap-0 w-full ${templateMode ? 'pointer-events-none' : ''}`}>
                              {templateMode ? (() => {
                                console.log(`📊 Rendering template for ${thirdFloorTheatre.name}, specialty: "${specialty}"`);
                                const requirements = calculateStaffRequirements(specialty || '', thirdFloorTheatre.id, thirdFloorTheatre.name);
                                console.log(`   Requirements calculated:`, requirements);

                                if (requirements.length === 0) {
                                  console.log(`⚠️ No requirements for ${thirdFloorTheatre.name}`);
                                  return <div className="leading-[1.35] w-full text-gray-400 italic text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>No staff configured</div>;
                                }

                                // Group requirements by role base name and render with separators
                                const elements: JSX.Element[] = [];
                                let lastRoleBase = '';

                                requirements.forEach((req, index) => {
                                  const currentRoleBase = req.roleName.includes('Anaes') ? 'Anaes' :
                                                         req.roleName.includes('Scrub') ? 'Scrub' : req.roleName;

                                  // Add separator between different role types
                                  if (lastRoleBase && lastRoleBase !== currentRoleBase && index > 0) {
                                    elements.push(<div key={`sep-${index}`} className="h-0.5"></div>);
                                  }

                                  // Render each staff position
                                  for (let i = 1; i <= req.quantity; i++) {
                                    const suffix = req.quantity > 1 ? ` ${i}` : '';
                                    elements.push(
                                      <div key={`${req.roleName}-${i}`} className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        {req.roleName}{suffix}
                                      </div>
                                    );
                                  }

                                  lastRoleBase = currentRoleBase;
                                });

                                return <>{elements}</>;
                              })() : (() => {
                                // Allocation mode: Show actual staff assignments
                                const sessionId = `${thirdFloorTheatre.id}-${selectedDate}`;
                                const allocation = autoRosterAllocations.get(sessionId);

                                if (!allocation || allocation.roles.length === 0) {
                                  return (
                                    <div className="leading-[1.35] w-full text-gray-400 italic text-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                      No staff allocated
                                    </div>
                                  );
                                }

                                const elements: JSX.Element[] = [];
                                let lastRole = '';

                                allocation.roles.forEach((roleAlloc, roleIdx) => {
                                  // Group by role type (Anaes, Scrub, etc.)
                                  const currentRoleBase = roleAlloc.role.includes('Anaes') ? 'Anaes' :
                                                         roleAlloc.role.includes('Scrub') ? 'Scrub' : roleAlloc.role;

                                  // Add separator between different role types
                                  if (lastRole && lastRole !== currentRoleBase && roleIdx > 0) {
                                    elements.push(<div key={`sep-${roleIdx}`} className="h-0.5"></div>);
                                  }

                                  // Render each assigned staff member
                                  roleAlloc.assignedStaff.forEach((staff, staffIdx) => {
                                    elements.push(
                                      <div key={`${roleAlloc.id}-${staffIdx}`} className="leading-[1.35] flex justify-between w-full" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        <span className="font-medium text-gray-900">{staff.staffName} ({staff.band})</span>
                                        <span className="ml-1 text-gray-600">8-6</span>
                                      </div>
                                    );
                                  });

                                  lastRole = currentRoleBase;
                                });

                                return <>{elements}</>;
                              })()}
                            </div>
                          </div>
                        </div>
                      </td>
                      );
                    })() : (() => {
                      // Get special units for this column's location
                      const columnLocation = uniqueLocations[1];
                      const specialUnitsForColumn = specialUnits.filter(su => su.unitLocation === columnLocation);
                      const specialUnitIndex = idx - thirdFloorTheatres.length;

                      if (specialUnitIndex >= 0 && specialUnitIndex < specialUnitsForColumn.length) {
                        const specialUnit = specialUnitsForColumn[specialUnitIndex];
                        const rowSpan = specialUnit.rowSpan || 1;
                        const minHeight = rowSpan * 42;

                        return (
                          <td className="border border-gray-900 bg-white p-0" rowSpan={rowSpan}>
                            <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                              <div
                                className={`border-r border-gray-900 px-0.5 py-0.5  font-bold text-gray-900 bg-blue-200 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-colors`}
                                style={{ minHeight: `${minHeight}px` }}
                                onClick={(e) => handleAuxUnitLabelClick(e, specialUnit)}
                              >
                                <div style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{specialUnit.label}</div>
                                {auxUnitSpecialties[specialUnit.id] && (
                                  <div className="mt-0.5" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{auxUnitSpecialties[specialUnit.id]}</div>
                                )}
                                {auxUnitSessionTypes[specialUnit.id] && (
                                  <div className="mt-0.5" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>{getSessionTypeAbbr(auxUnitSessionTypes[specialUnit.id])}</div>
                                )}
                              </div>
                              <div className={`px-0.5 py-0.5 ${templateMode ? 'bg-gray-50' : 'bg-white'} flex flex-col gap-0`} style={{ minHeight: `${minHeight}px` }}>
                                <div className="flex flex-col gap-0 w-full">
                                  {specialUnit.type === 'night-shift' ? (
                                    templateMode ? (
                                      <>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P 2</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 2</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 3</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 4</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 5</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 6</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 7</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA 2</div>
                                      </>
                                    ) : (
                                      <div className="leading-[1.35] w-full text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        No staff allocated
                                      </div>
                                    )
                                  ) : (
                                    templateMode ? (
                                      <>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Anaes N/P</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 1</div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Scrub N/P 2</div>
                                        <div className="h-0.5"></div>
                                        <div className="leading-[1.35] w-full text-gray-600 font-medium" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>HCA</div>
                                      </>
                                    ) : (
                                      <div className="leading-[1.35] w-full text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>
                                        No staff allocated
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      }

                      // Check if this row should be skipped due to rowspan from previous special unit
                      let skipDueToRowSpan = false;
                      for (let i = 0; i < specialUnitIndex; i++) {
                        const prevUnit = specialUnitsForColumn[i];
                        if (prevUnit) {
                          const prevRowSpan = prevUnit.rowSpan || 1;
                          if (specialUnitIndex < i + prevRowSpan) {
                            skipDueToRowSpan = true;
                            break;
                          }
                        }
                      }

                      if (skipDueToRowSpan) {
                        return null;
                      }

                      return (
                      <td className="border border-gray-900 bg-white p-0">
                        <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                          <div className="border-r border-gray-900 px-0.5 py-0.5 font-bold text-gray-900 bg-blue-200 flex items-center justify-center" style={{ fontSize: `${0.3125 * fontSize / 100}rem`, minHeight: `${2.625 * fontSize / 100}rem` }}></div>
                          <div className="p-0.5 bg-white min-h-[42px]"></div>
                        </div>
                      </td>
                    );
                    })()}

                    {/* Management Day Column - Only on first row */}
                    {idx === 0 && (
                      <td className="border-l border-r border-b border-gray-900 bg-white p-0.5 text-left align-top" rowSpan={maxRows + 2}>
                        <div className="flex flex-col gap-0 items-start">
                          {/* MANAGEMENT DAY Section */}
                          <div className={`w-full ${templateMode ? 'bg-gray-50 p-1' : ''}`}>
                            <div className="font-bold text-gray-900 bg-blue-200 px-0.5 py-0.5 mb-0.5" style={{ fontSize: `${0.375 * fontSize / 100}rem` }}>MANAGEMENT DAY</div>
                            {templateMode ? (
                              <div className="text-gray-600 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>2-3 Band 7s per day</div>
                            ) : (
                              <div className="text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>No staff allocated</div>
                            )}
                          </div>

                          {/* FLOATERS Section */}
                          <div className={`w-full mt-1 ${templateMode ? 'bg-gray-50 p-1' : ''}`}>
                            <div className="font-bold text-gray-900 bg-blue-200 px-0.5 py-0.5 mb-0.5" style={{ fontSize: `${0.375 * fontSize / 100}rem` }}>FLOATERS</div>
                            {templateMode ? (
                              <div className="text-gray-600 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Max 2 staff (any role)</div>
                            ) : (
                              <div className="text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>No staff allocated</div>
                            )}
                          </div>

                          {/* UNALLOCATED Section */}
                          <div className={`w-full mt-1 ${templateMode ? 'bg-gray-50 p-1' : ''}`}>
                            <div className="font-bold text-gray-900 bg-blue-200 px-0.5 py-0.5 mb-0.5" style={{ fontSize: `${0.375 * fontSize / 100}rem` }}>UNALLOCATED</div>
                            {templateMode ? (
                              <div className="text-gray-600 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>Theatre cancellations only</div>
                            ) : (
                              <div className="text-gray-400 italic text-center py-2" style={{ fontSize: `${0.3125 * fontSize / 100}rem` }}>No staff allocated</div>
                            )}
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              });
              })()
            )}
          </tbody>
        </table>
      </div>

      {/* Context Menu for Staff Assignment */}
      {contextMenu.visible && (
        <div
          className="fixed bg-white border border-gray-300 rounded-lg shadow-xl p-2 z-50 max-h-60 overflow-y-auto"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <p className="text-xs font-semibold text-gray-700 mb-2 px-2">Assign Staff:</p>

          {/* Scrub Staff */}
          {contextMenu.theatreId && [...fourthFloorTheatres, ...thirdFloorTheatres]
            .find(t => t.id === contextMenu.theatreId)
            ?.roles[contextMenu.roleIndex]?.role.includes('Scrub') && (
            <>
              <p className="text-[10px] font-bold text-blue-700 px-2 mt-1">Scrub N/P:</p>
              {scrubStaff.filter(s => !s.allocated).map(staff => (
                <button
                  key={staff.id}
                  onClick={() => assignStaff(staff)}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-blue-50 rounded transition-colors"
                >
                  <div className="font-medium text-gray-900">{staff.name}</div>
                  <div className="text-[10px] text-gray-600">
                    Band {staff.band} • {staff.shiftStart}-{staff.shiftEnd}
                    {staff.team && ` • ${staff.team}`}
                  </div>
                </button>
              ))}
            </>
          )}

          {/* Anaes Staff */}
          {contextMenu.theatreId && [...fourthFloorTheatres, ...thirdFloorTheatres]
            .find(t => t.id === contextMenu.theatreId)
            ?.roles[contextMenu.roleIndex]?.role.includes('Anaes') && (
            <>
              <p className="text-[10px] font-bold text-purple-700 px-2 mt-1">Anaes N/P:</p>
              {anaesStaff.filter(s => !s.allocated).map(staff => (
                <button
                  key={staff.id}
                  onClick={() => assignStaff(staff)}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-purple-50 rounded transition-colors"
                >
                  <div className="font-medium text-gray-900">{staff.name}</div>
                  <div className="text-[10px] text-gray-600">
                    Band {staff.band} • {staff.shiftStart}-{staff.shiftEnd}
                    {staff.team && ` • ${staff.team}`}
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Auxiliary Unit Specialty Selection Context Menu */}
      {auxUnitContextMenu.visible && (() => {
        console.log('🔍 Aux unit context menu:', {
          unitLocation: auxUnitContextMenu.unitLocation,
          theatreUnits: theatreUnits,
          allLocations: theatreUnits.map(u => u.location)
        });

        const unit = theatreUnits.find(u => u.location === auxUnitContextMenu.unitLocation);
        console.log('🔍 Found unit:', unit);

        const specialties = unit?.specialties || [];
        console.log('🔍 Unit specialties:', specialties);

        const maxMenuHeight = Math.min(500, window.innerHeight - 40);

        return (
          <div
            className="fixed bg-white border-2 border-blue-400 rounded-lg shadow-2xl p-2 z-50 overflow-y-auto"
            style={{
              top: `${auxUnitContextMenu.y}px`,
              left: `${auxUnitContextMenu.x}px`,
              width: '220px',
              maxHeight: `${maxMenuHeight}px`
            }}
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <p className="text-xs font-semibold text-gray-700">Configure Theatre</p>
              <button
                onClick={() => closeAuxUnitContextMenu()}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 px-2 mb-2">Unit: {unit?.name || 'Not found'} ({auxUnitContextMenu.unitLocation})</p>

            {/* Specialty Selection Section */}
            <p className="text-xs font-semibold text-gray-700 px-2 mb-2 mt-2">Specialty:</p>

            {/* Clear Specialty Button */}
            {auxUnitSpecialties[auxUnitContextMenu.auxUnitId] && (
              <button
                onClick={() => {
                  setAuxUnitSpecialties(prev => {
                    const updated = {...prev};
                    delete updated[auxUnitContextMenu.auxUnitId];
                    return updated;
                  });
                  closeAuxUnitContextMenu();
                }}
                className="w-full text-left px-2 py-1.5 text-xs hover:bg-red-50 text-red-600 rounded transition-colors border-b border-gray-200 mb-1 font-medium"
              >
                Clear Specialty
              </button>
            )}

            {specialties.length > 0 ? (
              specialties.map(specialtyId => {
                // Try to find specialty from Firebase specialties first, then fall back to ALL_SPECIALTIES
                let specialty = firebaseSpecialties.find(s => {
                  const normalizedId = specialtyId.toLowerCase().replace(/[^a-z]/g, '');
                  const normalizedName = (s.name || '').toLowerCase().replace(/[^a-z]/g, '');
                  const normalizedSId = (s.id || '').toLowerCase();
                  const normalizedAbbr = (s.abbr || s.abbreviation || '').toLowerCase().replace(/[^a-z]/g, '');

                  return (
                    s.id === specialtyId ||
                    s.name === specialtyId ||
                    normalizedSId === normalizedId ||
                    normalizedAbbr === normalizedId ||
                    normalizedName.includes(normalizedId) ||
                    normalizedId.includes(normalizedName)
                  );
                });

                // Fallback to ALL_SPECIALTIES if not found in Firebase
                if (!specialty) {
                  specialty = ALL_SPECIALTIES.find(s => {
                    const normalizedId = specialtyId.toLowerCase().replace(/[^a-z]/g, '');
                    const normalizedName = s.name.toLowerCase().replace(/[^a-z]/g, '');
                    const normalizedSId = s.id.toLowerCase();

                    return (
                      s.id === specialtyId ||
                      s.name === specialtyId ||
                      normalizedSId === normalizedId ||
                      normalizedName.includes(normalizedId) ||
                      normalizedId.includes(normalizedName)
                    );
                  });
                }

                console.log('🔍 Looking for specialty:', specialtyId, 'Found:', specialty);
                if (!specialty) return null;

                const specialtyAbbr = specialty.abbr || specialty.abbreviation || specialtyId;
                const items: JSX.Element[] = [];

                // Add the main specialty option
                items.push(
                  <button
                    key={`${specialtyId}-main`}
                    onClick={() => handleSelectAuxUnitSpecialty(auxUnitContextMenu.auxUnitId, specialtyAbbr)}
                    className="w-full text-left px-2 py-1 text-xs hover:bg-blue-50 rounded transition-colors"
                  >
                    <div className="font-medium text-gray-900">{specialty.name}</div>
                    <div className="text-[10px] text-gray-600">Abbr: {specialtyAbbr}</div>
                  </button>
                );

                // Add all subspecialties if they exist
                if (specialty.subspecialties && specialty.subspecialties.length > 0) {
                  specialty.subspecialties.forEach((sub: any) => {
                    const subAbbr = sub.abbreviation || sub.abbr;
                    items.push(
                      <button
                        key={`${specialtyId}-${sub.name}`}
                        onClick={() => handleSelectAuxUnitSpecialty(auxUnitContextMenu.auxUnitId, subAbbr)}
                        className="w-full text-left px-3 py-1 text-xs hover:bg-cyan-50 rounded transition-colors border-l-2 border-cyan-400 ml-2"
                      >
                        <div className="font-medium text-gray-900 text-[11px]">{sub.name}</div>
                        <div className="text-[10px] text-gray-600">Abbr: {subAbbr}</div>
                      </button>
                    );
                  });
                }

                return items;
              })
            ) : (
              <div className="px-2 py-2">
                <p className="text-xs text-red-500 mb-2">No specialties configured for this unit</p>
                <p className="text-[10px] text-gray-500">Go to Configuration → Theatre Units → Edit this unit → Select specialties</p>
              </div>
            )}

            {/* Session Type Selection */}
            <div className="border-t-2 border-gray-300 mt-3 pt-3">
              <p className="text-xs font-semibold text-gray-700 px-2 mb-2">Session Type:</p>

              {/* Clear Session Type Button */}
              {auxUnitSessionTypes[auxUnitContextMenu.auxUnitId] && (
                <button
                  onClick={() => {
                    setAuxUnitSessionTypes(prev => {
                      const updated = {...prev};
                      delete updated[auxUnitContextMenu.auxUnitId];
                      return updated;
                    });
                    closeAuxUnitContextMenu();
                  }}
                  className="w-full text-left px-2 py-1.5 text-xs hover:bg-red-50 text-red-600 rounded transition-colors border-b border-gray-200 mb-1 font-medium"
                >
                  Clear Session Type
                </button>
              )}

              {/* Session Type Options */}
              <div className="space-y-1">
                {SESSION_TYPE_PRESETS.map(sessionType => (
                  <button
                    key={sessionType.id}
                    onClick={() => handleSelectAuxUnitSessionType(auxUnitContextMenu.auxUnitId, sessionType.id)}
                    className="w-full text-left px-2 py-1 text-xs hover:bg-purple-50 rounded transition-colors"
                  >
                    <div className="font-medium text-gray-900">{sessionType.name}</div>
                    <div className="text-[10px] text-gray-600">
                      Abbr: {sessionType.abbr} • {sessionType.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}


      {/* Staff List Modal */}
      {showStaffList && !window.matchMedia('print').matches && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Full Staff List</h2>
              <button onClick={() => setShowStaffList(false)} className="p-2 hover:bg-white/20 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scrub Staff */}
                <div>
                  <h3 className="text-lg font-bold text-blue-700 mb-3">Scrub N/P Staff ({scrubStaff.length})</h3>
                  <div className="space-y-2">
                    {scrubStaff.map(staff => (
                      <div key={staff.id} className={`p-3 rounded border ${staff.allocated ? 'bg-cyan-50 border-cyan-300' : 'bg-gray-50 border-gray-300'}`}>
                        <p className="font-semibold text-gray-900">{staff.name}</p>
                        <p className="text-xs text-gray-600">
                          Band {staff.band} • {staff.shiftStart}-{staff.shiftEnd}
                          {staff.team && ` • ${staff.team}`}
                        </p>
                        <p className="text-xs mt-1">
                          <span className={`font-medium ${staff.allocated ? 'text-cyan-700' : 'text-amber-700'}`}>
                            {staff.allocated ? '✓ Allocated' : '○ Available'}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anaes Staff */}
                <div>
                  <h3 className="text-lg font-bold text-purple-700 mb-3">Anaes N/P Staff ({anaesStaff.length})</h3>
                  <div className="space-y-2">
                    {anaesStaff.map(staff => (
                      <div key={staff.id} className={`p-3 rounded border ${staff.allocated ? 'bg-cyan-50 border-cyan-300' : 'bg-gray-50 border-gray-300'}`}>
                        <p className="font-semibold text-gray-900">{staff.name}</p>
                        <p className="text-xs text-gray-600">
                          Band {staff.band} • {staff.shiftStart}-{staff.shiftEnd}
                          {staff.team && ` • ${staff.team}`}
                        </p>
                        <p className="text-xs mt-1">
                          <span className={`font-medium ${staff.allocated ? 'text-cyan-700' : 'text-amber-700'}`}>
                            {staff.allocated ? '✓ Allocated' : '○ Available'}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Theatre Block Component
interface TheatreBlockProps {
  theatre: TheatreData;
  specialties: string[];
  sessionTypes: string[];
  onSpecialtyChange: (value: string) => void;
  onSessionTypeChange: (value: string) => void;
  onRoleRightClick: (roleIndex: number, e: React.MouseEvent) => void;
}

function TheatreBlock({ theatre, specialties, sessionTypes, onSpecialtyChange, onSessionTypeChange, onRoleRightClick }: TheatreBlockProps) {
  const isClosed = theatre.sessionType === 'Theatre Closed';

  return (
    <div className="grid grid-cols-2 border-3 border-black shadow-lg overflow-hidden" style={{ minHeight: '140px', borderWidth: '3px' }}>
      {/* Left Cell - Theatre Info (38%) */}
      <div className="p-3 flex flex-col gap-2 border-r-3 border-black" style={{ background: '#d1e7f5', borderRightWidth: '3px' }}>
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{theatre.name}</h3>

        <select
          value={theatre.specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="px-2 py-1.5 text-xs border-2 border-gray-500 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ backgroundColor: 'white' }}
        >
          <option value="">Select Specialty</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>

        <select
          value={theatre.sessionType}
          onChange={(e) => onSessionTypeChange(e.target.value)}
          className="px-2 py-1.5 text-xs border-2 border-gray-500 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ backgroundColor: 'white' }}
        >
          <option value="">Session Type</option>
          {sessionTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Right Cell - Staff Roster (62%) */}
      <div className="p-2 bg-white relative">
        {isClosed ? (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#770016' }}>
            <span className="text-white font-bold text-3xl">CLOSED</span>
          </div>
        ) : (
          <div className="space-y-0.5">
            {theatre.roles.map((role, idx) => (
              <div
                key={idx}
                onContextMenu={(e) => !templateMode && onRoleRightClick(idx, e)}
                className={`flex items-center gap-2 text-[11px] px-2 py-1 ${!templateMode ? 'cursor-pointer' : ''} transition-colors border ${
                  templateMode
                    ? 'bg-gray-50 border-gray-200'
                    : role.assignedStaff
                    ? 'bg-blue-50 hover:bg-gray-300 border-blue-400'
                    : 'bg-white hover:bg-gray-50 border-gray-300'
                }`}
              >
                {templateMode ? (
                  <>
                    <span className="font-bold text-gray-800">{role.role}</span>
                    <span className="text-gray-500 text-[10px]">(Required)</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-gray-800 min-w-[75px] whitespace-nowrap">{role.role}:</span>
                    {role.assignedStaff ? (
                      <span className="font-semibold text-gray-900">{role.assignedStaff.name}</span>
                    ) : (
                      <span className="text-gray-400 text-[10px] italic">Right-click to assign</span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: A3 landscape;
              margin: 0.12cm 0.18cm 0.12cm 0.18cm;
            }
            html, body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
              margin: 0 !important;
              padding: 0 !important;
              height: auto !important;
            }
            * {
              font-size: 58% !important;
              line-height: 0.98 !important;
            }
            table {
              page-break-inside: avoid;
              width: 100% !important;
              margin: 0 !important;
              border-collapse: collapse !important;
              border-spacing: 0 !important;
            }
            td, th {
              padding: 0.05rem 0.1rem !important;
              height: auto !important;
              min-height: 0 !important;
              border: 1px solid #111827 !important;
            }
            th.print-no-bottom-border,
            td.print-no-bottom-border {
              border-left: 1px solid #111827 !important;
              border-top: 1px solid #111827 !important;
              border-right: 1px solid #111827 !important;
              border-bottom: none !important;
            }
            td.print-no-top-border {
              border-left: 1px solid #111827 !important;
              border-top: none !important;
              border-right: 1px solid #111827 !important;
              border-bottom: 1px solid #111827 !important;
            }
            td.print-no-top-bottom-border {
              border-left: 1px solid #111827 !important;
              border-top: none !important;
              border-right: 1px solid #111827 !important;
              border-bottom: none !important;
            }
            .border-r,
            div.border-r,
            td div.border-r,
            td .border-r {
              border-right: 1px solid #111827 !important;
            }
            button, nav, .lucide, svg {
              display: none !important;
            }
            h1 {
              font-size: 0.6rem !important;
              margin: 0 !important;
              padding: 0.04rem 0 0.08rem 0 !important;
            }
            div {
              margin: 0 !important;
            }
          }
        `
      }} />

      {/* Staff Requirement Editor Modal */}
      {staffRequirementModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{staffRequirementModal.theatreName}</h3>
                {staffRequirementModal.specialty && (
                  <p className="text-sm text-gray-600">Specialty: {staffRequirementModal.specialty}</p>
                )}
              </div>
              <button
                onClick={handleCloseStaffModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">Configure staff requirements for this theatre:</p>

              {staffRequirementModal.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {req.roleName}
                    </label>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min="0"
                      value={req.quantity}
                      onChange={(e) => {
                        const newReqs = [...staffRequirementModal.requirements];
                        newReqs[index].quantity = parseInt(e.target.value) || 0;
                        setStaffRequirementModal({
                          ...staffRequirementModal,
                          requirements: newReqs
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={handleCloseStaffModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveStaffRequirements(staffRequirementModal.requirements)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
