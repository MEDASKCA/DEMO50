'use client';

// This is a complete rewrite to match the EXACT allocation table structure
// Showing staffing requirements instead of staff assignments

import React, { useState, useEffect } from 'react';
import { Calendar, Loader2, Plus, Edit2, Trash2, Save, X, Users } from 'lucide-react';
import { collection, getDocs, query, where, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';
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

interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  order: number;
  numberOfTheatres: number;
  specialties: string[];
}

interface TheatreRequirement {
  theatreId: string;
  theatreName: string;
  specialty: string;
  roles: StaffRequirement[];
}

interface TheatreStaffRole {
  id: string;
  hospitalId: string;
  roleName: string;
  category: 'nurse-practitioner' | 'support' | 'medical' | 'other';
  defaultQuantity: number;
  minimumRequired: number;
  order: number;
}

const ROLE_CATEGORIES = [
  { value: 'nurse-practitioner', label: 'Nurse / Practitioner' },
  { value: 'medical', label: 'Medical' },
  { value: 'support', label: 'Support Staff' },
  { value: 'other', label: 'Other' }
];

export default function StaffingTemplateAllocation() {
  const { currentHospital } = useHospital();
  const [loading, setLoading] = useState(true);

  // Staff roles management
  const [roles, setRoles] = useState<TheatreStaffRole[]>([]);
  const [editingRole, setEditingRole] = useState<TheatreStaffRole | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showRoleManagement, setShowRoleManagement] = useState(false);

  // Allocation table structure
  const [theatreUnits, setTheatreUnits] = useState<TheatreUnit[]>([]);
  const [unitCoordinators, setUnitCoordinators] = useState<UnitCoordinator[]>([]);
  const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
  const [staffPoolSections, setStaffPoolSections] = useState<StaffPoolSection[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [staffMappers, setStaffMappers] = useState<StaffRequirementMapper[]>([]);

  // Theatre requirements by location
  const [firstColumnTheatres, setFirstColumnTheatres] = useState<TheatreRequirement[]>([]);
  const [secondColumnTheatres, setSecondColumnTheatres] = useState<TheatreRequirement[]>([]);

  // Static column width settings (same as allocation)
  const leftColumnWidth = 33;
  const col1Width = 38;
  const col2Width = 38;
  const col3Width = 24;

  // Calculate total rows for rowSpan
  const totalRows = unitCoordinators.length + Math.max(firstColumnTheatres.length, secondColumnTheatres.length) + (specialUnits.length > 0 ? specialUnits.length : 0);

  // Load data
  useEffect(() => {
    if (currentHospital) {
      loadAllData();
    }
  }, [currentHospital]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [units, coordinators, specials, poolSections, mappers, rolesData] = await Promise.all([
        getTheatreUnits(currentHospital?.id),
        getUnitCoordinators(currentHospital?.id),
        getSpecialUnits(currentHospital?.id),
        getStaffPoolSections(currentHospital?.id),
        getAllStaffRequirementMappers(),
        loadStaffRoles()
      ]);

      setTheatreUnits(units);
      setUnitCoordinators(coordinators);
      setSpecialUnits(specials);
      setStaffPoolSections(poolSections);
      setStaffMappers(mappers);
      setRoles(rolesData);

      // Sort units by order and extract locations
      const sortedUnits = [...units].sort((a, b) => a.order - b.order);
      const locations = sortedUnits.map(u => u.location);
      setUniqueLocations(locations);

      // Load theatre requirements for this date
      await loadTheatreRequirements(sortedUnits, mappers);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const loadStaffRoles = async (): Promise<TheatreStaffRole[]> => {
    if (!currentHospital) return [];

    try {
      const q = query(
        collection(db, 'theatreStaffRoles'),
        where('hospitalId', '==', currentHospital.id)
      );
      const snapshot = await getDocs(q);
      const rolesData = snapshot.docs
        .map(doc => {
          const data = doc.data();
          let category = data.category;

          // Migrate old category values to new unified category
          if (category === 'nursing' || category === 'odp') {
            category = 'nurse-practitioner';
          }

          return {
            ...data,
            category,
            id: doc.id
          };
        })
        .filter(role => role.id && role.id.trim() !== '') as TheatreStaffRole[];

      return rolesData.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error loading staff roles:', error);
      return [];
    }
  };

  const handleAddRole = () => {
    setEditingRole({
      id: '',
      hospitalId: currentHospital!.id,
      roleName: '',
      category: 'nurse-practitioner',
      defaultQuantity: 1,
      minimumRequired: 1,
      order: roles.length + 1
    });
    setShowRoleModal(true);
  };

  const handleEditRole = (role: TheatreStaffRole) => {
    setEditingRole(role);
    setShowRoleModal(true);
  };

  const handleSaveRole = async () => {
    if (!editingRole || !currentHospital) return;

    setSaving(true);
    try {
      const roleId = editingRole.id || `role-${currentHospital.id}-${Date.now()}`;
      const roleData = {
        ...editingRole,
        hospitalId: currentHospital.id
      };

      await setDoc(doc(db, 'theatreStaffRoles', roleId), roleData);
      setShowRoleModal(false);
      setEditingRole(null);

      // Reload roles
      const rolesData = await loadStaffRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Failed to save role');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      await deleteDoc(doc(db, 'theatreStaffRoles', id));
      const rolesData = await loadStaffRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  const loadTheatreRequirements = async (units: TheatreUnit[], mappers: StaffRequirementMapper[]) => {
    try {
      // Generate template requirements per unit (no need to fetch theatre lists)
      const sortedUnits = [...units].sort((a, b) => a.order - b.order);

      // First column (first unit)
      if (sortedUnits[0]) {
        const firstUnit = sortedUnits[0];
        const reqs = await generateTheatreRequirements(firstUnit, [], mappers);
        setFirstColumnTheatres(reqs);
      }

      // Second column (second unit)
      if (sortedUnits[1]) {
        const secondUnit = sortedUnits[1];
        const reqs = await generateTheatreRequirements(secondUnit, [], mappers);
        setSecondColumnTheatres(reqs);
      }
    } catch (error) {
      console.error('Error loading theatre requirements:', error);
    }
  };

  const generateTheatreRequirements = async (
    unit: TheatreUnit,
    lists: TheatreList[],
    mappers: StaffRequirementMapper[]
  ): Promise<TheatreRequirement[]> => {
    const requirements: TheatreRequirement[] = [];

    for (let i = 1; i <= unit.numberOfTheatres; i++) {
      const theatreName = `${unit.name} ${i}`; // Use full unit name like "Main Theatres 1"

      // Get default staff roles template
      const defaultRoles: StaffRequirement[] = roles
        .sort((a, b) => a.order - b.order)
        .map(role => ({
          roleId: role.id,
          roleName: role.roleName,
          quantity: role.defaultQuantity
        }));

      requirements.push({
        theatreId: `${unit.id}-T${i}`,
        theatreName,
        specialty: '', // Template doesn't have specific specialty
        roles: defaultRoles
      });
    }

    return requirements;
  };

  const calculateRequirements = (list: TheatreList, mappers: StaffRequirementMapper[]): StaffRequirement[] => {
    const roleMap = new Map<string, number>();

    list.cases?.forEach(surgicalCase => {
      const matcher = mappers.find(m =>
        m.specialtyName === surgicalCase.specialty &&
        (!m.subspecialty || m.subspecialty === surgicalCase.subspecialty)
      );

      if (matcher && matcher.roles) {
        matcher.roles.forEach(role => {
          roleMap.set(role.roleName, (roleMap.get(role.roleName) || 0) + role.quantity);
        });
      }
    });

    return Array.from(roleMap.entries()).map(([roleName, quantity]) => ({
      roleId: roleName.toLowerCase().replace(/\s+/g, '-'),
      roleName,
      quantity
    }));
  };

  // Group roles by category
  const rolesByCategory = roles.reduce((acc, role) => {
    const category = role.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(role);
    return acc;
  }, {} as Record<string, TheatreStaffRole[]>);

  return (
    <div className="min-h-screen" style={{ background: '#A4B5B0' }}>
      {/* Header */}
      <div className="shadow-md p-3 sm:p-4 mb-4" style={{ background: '#455A64' }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Default Staffing Template</h2>
            <span className="text-sm text-white/80">Configure default staff roles for each theatre</span>
          </div>
          <button
            onClick={() => setShowRoleManagement(!showRoleManagement)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            <Users className="w-4 h-4" />
            {showRoleManagement ? 'Hide' : 'Manage'} Staff Roles
          </button>
        </div>
      </div>

      {/* Role Management Section */}
      {showRoleManagement && (
        <div className="bg-white rounded-lg shadow-lg mx-4 mb-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Theatre Staff Roles</h3>
              <p className="text-sm text-gray-600">
                Define default staffing levels for theatre sessions
              </p>
            </div>
            <button
              onClick={handleAddRole}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>

          {roles.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Staffing Roles Configured</h4>
              <p className="text-gray-600 mb-4">Get started by adding your first theatre staffing role.</p>
              <button
                onClick={handleAddRole}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add First Role
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {ROLE_CATEGORIES.map(category => {
                const categoryRoles = rolesByCategory[category.value] || [];
                if (categoryRoles.length === 0) return null;

                return (
                  <div key={category.value} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">{category.label}</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Role Name</th>
                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Default Qty</th>
                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Min Required</th>
                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {categoryRoles.map((role, index) => (
                            <tr key={`${category.value}-${role.id || index}-${index}`} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{role.roleName}</td>
                              <td className="px-4 py-3 text-sm text-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 rounded-full font-semibold">
                                  {role.defaultQuantity}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold">
                                  {role.minimumRequired}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleEditRole(role)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit role"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRole(role.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete role"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Table - Exact Allocation Format */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-900 bg-white p-1 text-xs font-bold text-gray-900 text-center" style={{ width: `${col1Width}%` }}>
              {firstColumnTheatres.length > 0 ? uniqueLocations[0] : 'Loading...'}
            </th>
            <th className="border border-gray-900 bg-white p-1 text-xs font-bold text-gray-900 text-center" style={{ width: `${col2Width}%` }}>
              {secondColumnTheatres.length > 0 ? uniqueLocations[1] : ''}
            </th>
            <th className="border border-gray-900 bg-white p-1 text-xs font-bold text-gray-900 text-center" style={{ width: `${col3Width}%` }}></th>
          </tr>
        </thead>
        <tbody>
          {/* Unit Coordinator Rows - min-h-[18px] */}
          <tr>
            <td className="border border-gray-900 bg-white p-0">
              <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]">
                  {unitCoordinators[0]?.label || ''}
                </div>
                <div className="px-1 py-1 bg-white flex items-center min-h-[18px]">
                  <div className="text-[10px] leading-[1.2] flex justify-between w-full">
                    <span>{unitCoordinators[0]?.roleName || ''}</span>
                    <span className="ml-1 font-semibold">{unitCoordinators[0] ? '1' : ''}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-gray-900 bg-white p-0">
              <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]">
                  {unitCoordinators[1]?.label || ''}
                </div>
                <div className="px-1 py-1 bg-white flex items-center min-h-[18px]">
                  <div className="text-[10px] leading-[1.2] flex justify-between w-full">
                    <span>{unitCoordinators[1]?.roleName || ''}</span>
                    <span className="ml-1 font-semibold">{unitCoordinators[1] ? '1' : ''}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-gray-900 bg-white p-1 text-left align-top" rowSpan={totalRows}>
              <div className="flex flex-col gap-0 items-start h-full">
                {staffPoolSections.map((section, sectionIdx) => (
                  <div key={section.id} className={`w-full ${sectionIdx > 0 ? 'mt-3' : 'mt-1'}`}>
                    <div className="text-[11px] font-bold text-gray-900 bg-blue-200 px-1 py-1 mb-1">{section.label}</div>
                    {section.roles?.map((role, roleIdx) => (
                      <div key={roleIdx} className="text-[10px] leading-[1.3] flex justify-between w-full px-1 py-0.5">
                        <span>{role.roleName}</span>
                        <span className="ml-2 font-semibold">{role.quantity}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </td>
          </tr>

          <tr>
            <td className="border border-gray-900 bg-white p-0">
              <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]">
                  {unitCoordinators[2]?.label || ''}
                </div>
                <div className="px-1 py-1 bg-white flex items-center min-h-[18px]">
                  <div className="text-[10px] leading-[1.2] flex justify-between w-full">
                    <span>{unitCoordinators[2]?.roleName || ''}</span>
                    <span className="ml-1 font-semibold">{unitCoordinators[2] ? '1' : ''}</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-gray-900 bg-white p-0">
              <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]"></div>
                <div className="p-1 bg-white min-h-[18px]"></div>
              </div>
            </td>
          </tr>

          {unitCoordinators.slice(3).map((coord, idx) => (
            <tr key={coord.id}>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]">
                    {coord.label}
                  </div>
                  <div className="px-1 py-1 bg-white flex items-center min-h-[18px]">
                    <div className="text-[10px] leading-[1.2] flex justify-between w-full">
                      <span>{coord.roleName || 'Coordinator'}</span>
                      <span className="ml-1 font-semibold">1</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="border border-gray-900 bg-white p-0">
                <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                  <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[18px]"></div>
                  <div className="p-1 bg-white min-h-[18px]"></div>
                </div>
              </td>
            </tr>
          ))}

          {/* Dynamic Theatre Rows */}
          {loading ? (
            <tr>
              <td colSpan={2} className="border border-gray-900 bg-white p-2 text-center">
                <p className="text-[8px] text-gray-600">Loading theatre requirements...</p>
              </td>
            </tr>
          ) : (
            Array.from({ length: Math.max(firstColumnTheatres.length, secondColumnTheatres.length) }).map((_, idx) => {
              const firstReq = firstColumnTheatres[idx];
              const secondReq = secondColumnTheatres[idx];

              return (
                <tr key={idx}>
                  {/* First Column Theatre */}
                  {firstReq ? (
                    <td className="border border-gray-900 bg-white p-0">
                      <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                        <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 flex flex-col items-center justify-center gap-0 min-h-[42px]" style={{ background: '#B8D4E6' }}>
                          <div className="flex flex-col items-center gap-0.5 leading-tight">
                            <div className="font-bold text-[10px]">{firstReq.theatreName}</div>
                            <div className="text-[8px] text-gray-600">Template</div>
                          </div>
                        </div>
                        <div className="px-1 py-1 bg-white flex flex-col gap-0 min-h-[42px]">
                          <div className="flex flex-col gap-0.5 w-full">
                            {firstReq.roles.length > 0 ? (
                              firstReq.roles.map((role, roleIdx) => (
                                <div key={roleIdx} className="text-[10px] leading-[1.3] flex justify-between w-full">
                                  <span>{role.roleName}</span>
                                  <span className="ml-2 font-semibold text-teal-700">{role.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-[9px] text-gray-400 italic">No roles configured</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="border border-gray-900 bg-white p-0">
                      <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                        <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[42px]"></div>
                        <div className="p-1 bg-white min-h-[42px]"></div>
                      </div>
                    </td>
                  )}

                  {/* Second Column Theatre */}
                  {secondReq ? (
                    <td className="border border-gray-900 bg-white p-0">
                      <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                        <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 flex flex-col items-center justify-center gap-0 min-h-[42px]" style={{ background: '#B8D4E6' }}>
                          <div className="flex flex-col items-center gap-0.5 leading-tight">
                            <div className="font-bold text-[10px]">{secondReq.theatreName}</div>
                            <div className="text-[8px] text-gray-600">Template</div>
                          </div>
                        </div>
                        <div className="px-1 py-1 bg-white flex flex-col gap-0 min-h-[42px]">
                          <div className="flex flex-col gap-0.5 w-full">
                            {secondReq.roles.length > 0 ? (
                              secondReq.roles.map((role, roleIdx) => (
                                <div key={roleIdx} className="text-[10px] leading-[1.3] flex justify-between w-full">
                                  <span>{role.roleName}</span>
                                  <span className="ml-2 font-semibold text-teal-700">{role.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-[9px] text-gray-400 italic">No roles configured</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="border border-gray-900 bg-white p-0">
                      <div className="grid h-full" style={{ gridTemplateColumns: `${leftColumnWidth}% ${100 - leftColumnWidth}%` }}>
                        <div className="border-r border-gray-900 px-1 py-1 text-[10px] font-bold text-gray-900 bg-gray-300 flex items-center justify-center min-h-[42px]"></div>
                        <div className="p-1 bg-white min-h-[42px]"></div>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Add/Edit Role Modal */}
      {showRoleModal && editingRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingRole.id ? 'Edit' : 'Add'} Theatre Staff Role
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingRole.roleName}
                  onChange={(e) => setEditingRole({...editingRole, roleName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Scrub Nurse, ODP, Healthcare Assistant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={editingRole.category}
                  onChange={(e) => setEditingRole({...editingRole, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {ROLE_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={editingRole.defaultQuantity}
                    onChange={(e) => setEditingRole({...editingRole, defaultQuantity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Normal staffing level</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={editingRole.minimumRequired}
                    onChange={(e) => setEditingRole({...editingRole, minimumRequired: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Absolute minimum</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingRole.order}
                  onChange={(e) => setEditingRole({...editingRole, order: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                disabled={saving || !editingRole.roleName}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
