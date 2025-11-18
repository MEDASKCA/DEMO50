'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Settings,
  Plus,
  X,
  Edit2,
  Trash2,
  Loader2,
  Save,
  Download
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TheatreList } from '@/lib/theatreListTypes';
import { StaffRequirementMapper, StaffRequirement } from '@/lib/types/waitingListTypes';
import { getAllStaffRequirementMappers } from '@/lib/services/staffRequirementMapperService';
import {
  getTheatreUnits,
  getUnitCoordinators,
  getSpecialUnits,
  getStaffPoolSections,
  UnitCoordinator,
  SpecialUnit,
  StaffPoolSection
} from '@/lib/scheduling/theatreService';
import { useHospital } from '@/lib/hospitalContext';

interface DefaultRole {
  id: string;
  roleName: string;
  quantity: number;
  applicableSession?: 'all' | 'day' | 'night' | 'emergency' | 'weekday-day' | 'weekend-day';
  location?: 'all' | 'outside-theatres' | 'inside-theatres' | 'specific-theatres';
  specificTheatres?: string[]; // Theatre IDs when location is 'specific-theatres'
}

interface TheatreStaffRequirement {
  theatreId: string;
  theatreName: string;
  unitId?: string;
  unitName?: string;
  date: string;
  specialty: string;
  roles: StaffRequirement[];
}

interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  order: number;
  numberOfTheatres: number;
  specialties: string[];
}

export default function StaffingTemplate() {
  const { currentHospital } = useHospital();
  const [loading, setLoading] = useState(true);
  const [theatreLists, setTheatreLists] = useState<TheatreList[]>([]);
  const [staffMappers, setStaffMappers] = useState<StaffRequirementMapper[]>([]);
  const [availableTheatres, setAvailableTheatres] = useState<{id: string, name: string, unitId?: string, unitName?: string}[]>([]);

  // Allocation table structure data
  const [theatreUnits, setTheatreUnits] = useState<TheatreUnit[]>([]);
  const [unitCoordinators, setUnitCoordinators] = useState<UnitCoordinator[]>([]);
  const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
  const [staffPoolSections, setStaffPoolSections] = useState<StaffPoolSection[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);

  const [defaultRoles, setDefaultRoles] = useState<DefaultRole[]>([
    { id: 'floor-coordinator', roleName: 'Floor Coordinator', quantity: 1, applicableSession: 'weekday-day', location: 'inside-theatres' },
    { id: 'night-coordinator', roleName: 'Night Coordinator', quantity: 1, applicableSession: 'night', location: 'inside-theatres' },
    { id: 'night-staff', roleName: 'Night Staff', quantity: 2, applicableSession: 'night', location: 'outside-theatres' }
  ]);

  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [showDefaultRolesModal, setShowDefaultRolesModal] = useState(false);
  const [staffingRequirements, setStaffingRequirements] = useState<TheatreStaffRequirement[]>([]);

  // Static column width settings (same as allocation)
  const leftColumnWidth = 33;
  const col1Width = 38;
  const col2Width = 38;
  const col3Width = 24;

  useEffect(() => {
    // Load default roles from localStorage
    const savedRoles = localStorage.getItem('staffing-default-roles');
    if (savedRoles) {
      try {
        setDefaultRoles(JSON.parse(savedRoles));
      } catch (error) {
        console.error('Error parsing saved default roles:', error);
      }
    }
    if (currentHospital) {
      loadTheatreUnits();
    }
  }, [currentHospital]);

  const loadTheatreUnits = async () => {
    try {
      setLoading(true);

      const [units, coordinators, specials, poolSections] = await Promise.all([
        getTheatreUnits(currentHospital?.id),
        getUnitCoordinators(currentHospital?.id),
        getSpecialUnits(currentHospital?.id),
        getStaffPoolSections(currentHospital?.id)
      ]);

      setTheatreUnits(units);
      setUnitCoordinators(coordinators);
      setSpecialUnits(specials);
      setStaffPoolSections(poolSections);

      // Sort units by order and extract locations
      const sortedUnitsByOrder = [...units].sort((a, b) => a.order - b.order);
      const locations = sortedUnitsByOrder.map(u => u.location);
      setUniqueLocations(locations);

      // Load theatres and data
      await loadTheatres();
      await loadData();

      setLoading(false);
    } catch (error) {
      console.error('Error loading theatre units:', error);
      setLoading(false);
    }
  };

  const loadTheatres = async () => {
    try {
      const theatresSnap = await getDocs(collection(db, 'theatres'));
      const theatres: {id: string, name: string, unitId?: string, unitName?: string}[] = [];
      theatresSnap.forEach(doc => {
        const data = doc.data();
        theatres.push({
          id: doc.id,
          name: data.name || data.theatreName || 'Unknown Theatre',
          unitId: data.unitId,
          unitName: data.unitName
        });
      });
      setAvailableTheatres(theatres.sort((a, b) => {
        // Sort by unit name first, then by theatre name
        const unitCompare = (a.unitName || '').localeCompare(b.unitName || '');
        if (unitCompare !== 0) return unitCompare;
        return a.name.localeCompare(b.name);
      }));
    } catch (error) {
      console.error('Error loading theatres:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [lists, mappers] = await Promise.all([
        fetchTheatreLists(),
        getAllStaffRequirementMappers()
      ]);

      setTheatreLists(lists);
      setStaffMappers(mappers);

      // Calculate staffing requirements
      const requirements = calculateStaffingRequirements(lists, mappers);
      setStaffingRequirements(requirements);
    } catch (error) {
      console.error('Error loading staffing template data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTheatreLists = async (): Promise<TheatreList[]> => {
    try {
      const listsQuery = query(
        collection(db, 'theatreLists'),
        where('date', '>=', dateRange.start),
        where('date', '<=', dateRange.end),
        orderBy('date')
      );

      const snapshot = await getDocs(listsQuery);
      const lists: TheatreList[] = [];

      snapshot.forEach(doc => {
        lists.push({ id: doc.id, ...doc.data() } as TheatreList);
      });

      // Sort by theatre name in memory
      return lists.sort((a, b) => {
        if (a.date === b.date) {
          return a.theatreName.localeCompare(b.theatreName);
        }
        return a.date.localeCompare(b.date);
      });
    } catch (error) {
      console.error('Error fetching theatre lists:', error);
      return [];
    }
  };

  const calculateStaffingRequirements = (
    lists: TheatreList[],
    mappers: StaffRequirementMapper[]
  ): TheatreStaffRequirement[] => {
    const requirements: TheatreStaffRequirement[] = [];

    lists.forEach(list => {
      const roleMap = new Map<string, number>();

      // Determine if list date is a weekday (Mon-Fri) or weekend (Sat-Sun)
      const listDate = new Date(list.date + 'T12:00:00');
      const dayOfWeek = listDate.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Add default roles (only inside-theatres or specific-theatres roles)
      defaultRoles.forEach(defaultRole => {
        // Check if default role applies to this session
        const sessionApplies =
          defaultRole.applicableSession === 'all' ||
          (defaultRole.applicableSession === 'night' && list.sessionType === 'EVE') ||
          (defaultRole.applicableSession === 'day' && ['AM', 'PM', 'FULL'].includes(list.sessionType)) ||
          (defaultRole.applicableSession === 'emergency' && list.specialty === 'EMERGENCY') ||
          (defaultRole.applicableSession === 'weekday-day' && isWeekday && ['AM', 'PM', 'FULL'].includes(list.sessionType)) ||
          (defaultRole.applicableSession === 'weekend-day' && isWeekend && ['AM', 'PM', 'FULL'].includes(list.sessionType));

        if (!sessionApplies) return;

        // Check location filtering
        const location = defaultRole.location || 'all';

        if (location === 'outside-theatres') {
          // Skip - these will be shown separately
          return;
        } else if (location === 'all' || location === 'inside-theatres') {
          // Apply to all theatres
          roleMap.set(defaultRole.roleName, (roleMap.get(defaultRole.roleName) || 0) + defaultRole.quantity);
        } else if (location === 'specific-theatres') {
          // Only apply if this theatre is in the list
          if (defaultRole.specificTheatres?.includes(list.theatreId)) {
            roleMap.set(defaultRole.roleName, (roleMap.get(defaultRole.roleName) || 0) + defaultRole.quantity);
          }
        }
      });

      // Process each case in the list
      list.cases?.forEach(surgicalCase => {
        // Find matching mapper
        const matcher = findMatchingMapper(
          surgicalCase.specialty,
          surgicalCase.subspecialty,
          surgicalCase.procedureName,
          mappers
        );

        if (matcher && matcher.roles) {
          // Add roles from mapper
          matcher.roles.forEach(role => {
            roleMap.set(role.roleName, (roleMap.get(role.roleName) || 0) + role.quantity);
          });
        } else if (matcher && matcher.requirements) {
          // Legacy format
          if (matcher.requirements.anaesthetists > 0) {
            roleMap.set('Anaes N/P', (roleMap.get('Anaes N/P') || 0) + matcher.requirements.anaesthetists);
          }
          if (matcher.requirements.scrubNurses > 0) {
            roleMap.set('Scrub N/P', (roleMap.get('Scrub N/P') || 0) + matcher.requirements.scrubNurses);
          }
          if (matcher.requirements.hcas > 0) {
            roleMap.set('HCA', (roleMap.get('HCA') || 0) + matcher.requirements.hcas);
          }
        }
      });

      // Convert map to array
      const roles: StaffRequirement[] = Array.from(roleMap.entries()).map(([roleName, quantity]) => ({
        roleId: roleName.toLowerCase().replace(/\s+/g, '-'),
        roleName,
        quantity
      }));

      requirements.push({
        theatreId: list.theatreId,
        theatreName: list.theatreName,
        unitId: list.unitId,
        unitName: list.unitName,
        date: list.date,
        specialty: list.specialty,
        roles
      });
    });

    return requirements;
  };

  const findMatchingMapper = (
    specialty: string,
    subspecialty: string | undefined,
    procedureName: string,
    mappers: StaffRequirementMapper[]
  ): StaffRequirementMapper | null => {
    // Try to find exact match with keywords
    for (const mapper of mappers) {
      if (mapper.specialtyName !== specialty) continue;

      // Check subspecialty match
      if (mapper.subspecialty && mapper.subspecialty !== subspecialty) continue;

      // Check keyword match
      if (mapper.keywords && mapper.keywords.length > 0) {
        const procedureLower = procedureName.toLowerCase();
        const hasMatch = mapper.keywords.some(kw =>
          procedureLower.includes(kw.toLowerCase())
        );
        if (hasMatch) return mapper;
      } else if (mapper.keyword) {
        // Legacy single keyword
        const procedureLower = procedureName.toLowerCase();
        if (procedureLower.includes(mapper.keyword.toLowerCase())) {
          return mapper;
        }
      } else if (!mapper.keywords && !mapper.keyword) {
        // No keywords = applies to all in specialty
        return mapper;
      }
    }

    return null;
  };

  // Calculate outside-theatres roles per date
  const getOutsideTheatresRoles = (date: string): StaffRequirement[] => {
    const roleMap = new Map<string, number>();

    const listDate = new Date(date + 'T12:00:00');
    const dayOfWeek = listDate.getDay();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Find all lists for this date to determine what sessions are running
    const listsForDate = theatreLists.filter(l => l.date === date);

    defaultRoles.forEach(defaultRole => {
      if (defaultRole.location !== 'outside-theatres') return;

      // Check if role applies to any session on this date
      const applies = listsForDate.some(list => {
        return (
          defaultRole.applicableSession === 'all' ||
          (defaultRole.applicableSession === 'night' && list.sessionType === 'EVE') ||
          (defaultRole.applicableSession === 'day' && ['AM', 'PM', 'FULL'].includes(list.sessionType)) ||
          (defaultRole.applicableSession === 'emergency' && list.specialty === 'EMERGENCY') ||
          (defaultRole.applicableSession === 'weekday-day' && isWeekday && ['AM', 'PM', 'FULL'].includes(list.sessionType)) ||
          (defaultRole.applicableSession === 'weekend-day' && isWeekend && ['AM', 'PM', 'FULL'].includes(list.sessionType))
        );
      });

      if (applies) {
        roleMap.set(defaultRole.roleName, (roleMap.get(defaultRole.roleName) || 0) + defaultRole.quantity);
      }
    });

    return Array.from(roleMap.entries()).map(([roleName, quantity]) => ({
      roleId: roleName.toLowerCase().replace(/\s+/g, '-'),
      roleName,
      quantity
    }));
  };

  // Group requirements by date
  const groupedByDate = staffingRequirements.reduce((acc, req) => {
    if (!acc[req.date]) {
      acc[req.date] = [];
    }
    acc[req.date].push(req);
    return acc;
  }, {} as Record<string, TheatreStaffRequirement[]>);

  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-4">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Staffing Template</h2>
          <p className="text-sm text-gray-600">Auto-generated staff requirements based on scheduled procedures</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDefaultRolesModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <Settings className="w-3.5 h-3.5" />
            Default Roles
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Calendar className="w-3.5 h-3.5" />
            )}
            Generate
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors text-sm font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Date Range:</label>
          </div>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Staffing Requirements - Allocation Format */}
      <div className="min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
          </div>
        ) : sortedDates.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No theatre sessions scheduled for this date range</p>
          </div>
        ) : (
          sortedDates.map((date) => {
            const outsideRoles = getOutsideTheatresRoles(date);
            const leftColumnWidth = 33;

            // Group by unit
            const byUnit = groupedByDate[date].reduce((acc, req) => {
              const unitKey = req.unitName || 'Unassigned';
              if (!acc[unitKey]) acc[unitKey] = [];
              acc[unitKey].push(req);
              return acc;
            }, {} as Record<string, TheatreStaffRequirement[]>);

            const unitNames = Object.keys(byUnit);
            const maxRows = Math.max(...unitNames.map(unit => byUnit[unit].length));

            // Calculate column widths
            const hasOutsideColumn = outsideRoles.length > 0;
            const col3Width = hasOutsideColumn ? 24 : 0;
            const remainingWidth = 100 - col3Width;
            const colWidth = remainingWidth / unitNames.length;

            return (
              <div key={date} className="mb-6">
                {/* Date Header */}
                <div className="mb-2 px-2">
                  <h3 className="font-bold text-sm text-gray-900">
                    {new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </h3>
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {unitNames.map((unitName) => (
                        <th
                          key={unitName}
                          className="border border-gray-900 bg-white p-1 text-[7px] font-bold text-gray-900 text-center"
                          style={{ width: `${colWidth}%` }}
                        >
                          {unitName}
                        </th>
                      ))}
                      {hasOutsideColumn && (
                        <th className="border border-gray-900 bg-white p-1 text-[7px] font-bold text-gray-900 text-center" style={{ width: `${col3Width}%` }}></th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: maxRows }).map((_, rowIdx) => (
                      <tr key={rowIdx}>
                        {unitNames.map((unitName) => {
                          const req = byUnit[unitName][rowIdx];

                          if (!req) {
                            return (
                              <td key={unitName} className="border border-gray-900 bg-white p-0">
                                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                                  <div className="border-r border-gray-900 px-0.5 py-0.5 text-[5px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[42px]"></div>
                                  <div className="p-0.5 bg-white min-h-[42px]"></div>
                                </div>
                              </td>
                            );
                          }

                          return (
                            <td key={unitName} className="border border-gray-900 bg-white p-0">
                              <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                                {/* Left - Theatre Name & Specialty */}
                                <div className="border-r border-gray-900 px-0.5 py-0.5 text-[5px] font-bold text-gray-900 flex flex-col items-center justify-center gap-0 min-h-[42px]" style={{ background: '#8DA399' }}>
                                  <div className="flex flex-col items-center gap-0 leading-none">
                                    <div className="font-bold text-[5.5px]">{req.theatreName}</div>
                                    {req.specialty && (
                                      <div className="font-bold text-[5.5px]">{req.specialty}</div>
                                    )}
                                  </div>
                                </div>

                                {/* Right - Staff Requirements (exact allocation format) */}
                                <div className={`px-0.5 py-0.5 bg-white flex flex-col gap-0 min-h-[42px]`}>
                                  <div className="flex flex-col gap-0 w-full">
                                    {req.roles.length > 0 ? (
                                      (() => {
                                        // Separate roles by category to match allocation structure
                                        const anaesRoles = req.roles.filter(r => r.roleName.toLowerCase().includes('anaes'));
                                        const scrubRoles = req.roles.filter(r =>
                                          (r.roleName.toLowerCase().includes('scrub') ||
                                           r.roleName.toLowerCase().includes('n/p')) &&
                                          !r.roleName.toLowerCase().includes('anaes')
                                        );
                                        const hcaRoles = req.roles.filter(r => r.roleName.toLowerCase().includes('hca'));
                                        const otherRoles = req.roles.filter(r =>
                                          !anaesRoles.includes(r) &&
                                          !scrubRoles.includes(r) &&
                                          !hcaRoles.includes(r)
                                        );

                                        return (
                                          <>
                                            {/* Anaesthetist section */}
                                            {anaesRoles.map((role, idx) => (
                                              <div key={`anaes-${idx}`} className="text-[5px] leading-[0.9] flex justify-between w-full">
                                                <span>{role.roleName}</span>
                                                <span className="ml-1">{role.quantity}</span>
                                              </div>
                                            ))}

                                            {/* Spacer between anaes and scrub */}
                                            {anaesRoles.length > 0 && (scrubRoles.length > 0 || otherRoles.length > 0) && (
                                              <div className="h-0.5"></div>
                                            )}

                                            {/* Scrub section */}
                                            {scrubRoles.map((role, idx) => (
                                              <div key={`scrub-${idx}`} className="text-[5px] leading-[0.9] flex justify-between w-full">
                                                <span>{role.roleName}</span>
                                                <span className="ml-1">{role.quantity}</span>
                                              </div>
                                            ))}

                                            {/* Other roles */}
                                            {otherRoles.map((role, idx) => (
                                              <div key={`other-${idx}`} className="text-[5px] leading-[0.9] flex justify-between w-full">
                                                <span>{role.roleName}</span>
                                                <span className="ml-1">{role.quantity}</span>
                                              </div>
                                            ))}

                                            {/* Spacer before HCA */}
                                            {hcaRoles.length > 0 && (anaesRoles.length > 0 || scrubRoles.length > 0 || otherRoles.length > 0) && (
                                              <div className="h-0.5"></div>
                                            )}

                                            {/* HCA section */}
                                            {hcaRoles.map((role, idx) => (
                                              <div key={`hca-${idx}`} className="text-[5px] leading-[0.9] flex justify-between w-full">
                                                <span>{role.roleName}</span>
                                                <span className="ml-1">{role.quantity}</span>
                                              </div>
                                            ))}
                                          </>
                                        );
                                      })()
                                    ) : (
                                      <div className="text-[5px] text-gray-400 italic">-</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        })}

                        {/* Outside Theatres Column (third column like MANAGEMENT DAY/FLOATERS) */}
                        {hasOutsideColumn && rowIdx === 0 && (
                          <td className="border border-gray-900 bg-white p-0.5 text-left align-top" rowSpan={maxRows}>
                            <div className="flex flex-col gap-0 items-start">
                              {/* OUTSIDE THEATRES Section */}
                              <div className="w-full">
                                <div className="text-[6px] font-bold text-gray-900 bg-blue-200 px-0.5 py-0.5 mb-0.5">OUTSIDE THEATRES</div>
                                {outsideRoles.map((role, roleIdx) => (
                                  <div key={roleIdx} className="text-[5px] leading-[0.9] flex justify-between w-full">
                                    <span>{role.roleName}</span>
                                    <span className="ml-1">{role.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>

      {/* Default Roles Modal */}
      {showDefaultRolesModal && (
        <DefaultRolesModal
          defaultRoles={defaultRoles}
          availableTheatres={availableTheatres}
          onClose={() => setShowDefaultRolesModal(false)}
          onSave={(roles) => {
            setDefaultRoles(roles);
            // Save to localStorage
            localStorage.setItem('staffing-default-roles', JSON.stringify(roles));
            setShowDefaultRolesModal(false);
            loadData(); // Recalculate with new defaults
          }}
        />
      )}
    </div>
  );
}

// Default Roles Modal Component
interface DefaultRolesModalProps {
  defaultRoles: DefaultRole[];
  availableTheatres: {id: string, name: string}[];
  onClose: () => void;
  onSave: (roles: DefaultRole[]) => void;
}

function DefaultRolesModal({ defaultRoles, availableTheatres, onClose, onSave }: DefaultRolesModalProps) {
  const [roles, setRoles] = useState<DefaultRole[]>([...defaultRoles]);

  const handleAddRole = () => {
    setRoles([
      ...roles,
      {
        id: `custom-${Date.now()}`,
        roleName: '',
        quantity: 1,
        applicableSession: 'all',
        location: 'inside-theatres',
        specificTheatres: []
      }
    ]);
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index: number, field: keyof DefaultRole, value: any) => {
    const updated = [...roles];
    updated[index] = { ...updated[index], [field]: value };
    setRoles(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Default & Auxiliary Roles</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Define default and auxiliary roles that apply to sessions. These are added on top of specialty-specific staff requirements.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <p className="font-medium mb-1">Examples of default roles:</p>
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              <li><strong>Floor Coordinator</strong> - Applies to weekday day sessions (Mon-Fri)</li>
              <li><strong>Night Coordinator</strong> - Applies to evening/night sessions only</li>
              <li><strong>Night Staff</strong> - Additional support staff for night sessions</li>
              <li><strong>Weekend Coordinator</strong> - Applies to weekend day sessions only</li>
              <li><strong>Emergency Coordinator</strong> - Applies to emergency theatres only</li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Default Roles</label>
            <button
              onClick={handleAddRole}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-3 h-3" />
              Add Role
            </button>
          </div>

          <div className="space-y-3">
            {roles.map((role, index) => (
              <div key={index} className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Role Name</label>
                      <input
                        type="text"
                        value={role.roleName}
                        onChange={(e) => handleRoleChange(index, 'roleName', e.target.value)}
                        placeholder="e.g., Floor Coordinator"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Number Required</label>
                      <input
                        type="number"
                        min="0"
                        value={role.quantity}
                        onChange={(e) => handleRoleChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Applies To</label>
                      <select
                        value={role.applicableSession}
                        onChange={(e) => handleRoleChange(index, 'applicableSession', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="all">All Sessions</option>
                        <option value="day">All Day Sessions</option>
                        <option value="weekday-day">Weekday Day Sessions (Mon-Fri)</option>
                        <option value="weekend-day">Weekend Day Sessions (Sat-Sun)</option>
                        <option value="night">Night/Evening Only</option>
                        <option value="emergency">Emergency Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                      <select
                        value={role.location || 'inside-theatres'}
                        onChange={(e) => {
                          handleRoleChange(index, 'location', e.target.value);
                          // Clear specific theatres if not using specific-theatres
                          if (e.target.value !== 'specific-theatres') {
                            handleRoleChange(index, 'specificTheatres', []);
                          }
                        }}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="all">All Locations</option>
                        <option value="outside-theatres">Outside Theatres (Global)</option>
                        <option value="inside-theatres">Inside Theatres (All)</option>
                        <option value="specific-theatres">Specific Theatres</option>
                      </select>
                    </div>

                    {role.location === 'specific-theatres' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Select Theatres</label>
                        <select
                          multiple
                          value={role.specificTheatres || []}
                          onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => option.value);
                            handleRoleChange(index, 'specificTheatres', selected);
                          }}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          size={3}
                        >
                          {availableTheatres.map(theatre => (
                            <option key={theatre.id} value={theatre.id}>
                              {theatre.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-0.5">Hold Ctrl/Cmd to select multiple</p>
                      </div>
                    )}
                  </div>

                  {role.location === 'specific-theatres' && role.specificTheatres && role.specificTheatres.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {role.specificTheatres.map(theatreId => {
                        const theatre = availableTheatres.find(t => t.id === theatreId);
                        return theatre ? (
                          <span key={theatreId} className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded text-xs">
                            {theatre.name}
                            <button
                              onClick={() => {
                                const updated = (role.specificTheatres || []).filter(id => id !== theatreId);
                                handleRoleChange(index, 'specificTheatres', updated);
                              }}
                              className="hover:text-cyan-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveRole(index)}
                  className="mt-6 p-1.5 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {roles.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No default roles configured. Click "Add Role" to add auxiliary staff roles.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(roles)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
