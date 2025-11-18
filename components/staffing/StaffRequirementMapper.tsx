'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Save,
  X,
  Search
} from 'lucide-react';
import {
  getAllStaffRequirementMappers,
  createStaffRequirementMapper,
  updateStaffRequirementMapper,
  deleteStaffRequirementMapper
} from '@/lib/services/staffRequirementMapperService';
import { StaffRequirementMapper, StaffRequirement } from '@/lib/types/waitingListTypes';
import { THEATRE_ROLES, TheatreRole } from '@/lib/constants/theatreRoles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function StaffRequirementMapperComponent() {
  const [mappers, setMappers] = useState<StaffRequirementMapper[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMapper, setEditingMapper] = useState<StaffRequirementMapper | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formSpecialtyId, setFormSpecialtyId] = useState('');
  const [formSubspecialty, setFormSubspecialty] = useState('');
  const [formKeywords, setFormKeywords] = useState<string[]>([]);
  const [formUseKeywords, setFormUseKeywords] = useState(false);
  const [formRoles, setFormRoles] = useState<StaffRequirement[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [mappersData, specialtiesData] = await Promise.all([
        getAllStaffRequirementMappers(),
        loadSpecialties()
      ]);
      setMappers(mappersData);
      setSpecialties(specialtiesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialties = async () => {
    const specialtiesSnap = await getDocs(collection(db, 'specialties'));
    const specs: any[] = [];
    specialtiesSnap.forEach(doc => {
      const data = doc.data();
      specs.push({
        id: doc.id,
        name: data.name,
        subspecialties: data.subspecialties || []
      });
    });
    return specs.sort((a, b) => a.name.localeCompare(b.name));
  };

  const handleAdd = () => {
    setEditingMapper(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (mapper: StaffRequirementMapper) => {
    setEditingMapper(mapper);
    setFormSpecialtyId(mapper.specialtyId);
    setFormSubspecialty(mapper.subspecialty || '');

    // Load keywords from new 'keywords' array or migrate from legacy 'keyword' field
    if (mapper.keywords && mapper.keywords.length > 0) {
      setFormKeywords([...mapper.keywords]);
      setFormUseKeywords(true);
    } else if (mapper.keyword !== null && mapper.keyword !== undefined && mapper.keyword !== '') {
      // Migrate from old single keyword
      setFormKeywords([mapper.keyword]);
      setFormUseKeywords(true);
    } else {
      setFormKeywords([]);
      setFormUseKeywords(false);
    }

    // Load roles from new 'roles' field or migrate from legacy 'requirements' field
    if (mapper.roles && mapper.roles.length > 0) {
      setFormRoles([...mapper.roles]);
    } else if (mapper.requirements) {
      // Migrate from old requirements structure
      const migratedRoles: StaffRequirement[] = [];
      if (mapper.requirements.anaesthetists > 0) {
        migratedRoles.push({
          roleId: 'anaes-np',
          roleName: 'Anaes N/P',
          quantity: mapper.requirements.anaesthetists
        });
      }
      if (mapper.requirements.scrubNurses > 0) {
        migratedRoles.push({
          roleId: 'scrub-np',
          roleName: 'Scrub N/P',
          quantity: mapper.requirements.scrubNurses
        });
      }
      if (mapper.requirements.hcas > 0) {
        migratedRoles.push({
          roleId: 'hca',
          roleName: 'HCA',
          quantity: mapper.requirements.hcas
        });
      }
      setFormRoles(migratedRoles);
    } else {
      setFormRoles([]);
    }

    setShowModal(true);
  };

  const resetForm = () => {
    setFormSpecialtyId('');
    setFormSubspecialty('');
    setFormKeywords([]);
    setFormUseKeywords(false);
    setFormRoles([
      { roleId: 'anaes-np', roleName: 'Anaes N/P', quantity: 1 },
      { roleId: 'scrub-np', roleName: 'Scrub N/P', quantity: 2 },
      { roleId: 'hca', roleName: 'HCA', quantity: 1 }
    ]);
  };

  const handleAddKeyword = (keyword: string) => {
    const trimmed = keyword.trim();
    if (trimmed && !formKeywords.includes(trimmed)) {
      setFormKeywords([...formKeywords, trimmed]);
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormKeywords(formKeywords.filter((_, i) => i !== index));
  };

  const getSelectedSpecialty = () => {
    return specialties.find(s => s.id === formSpecialtyId);
  };

  const handleAddRole = () => {
    setFormRoles([
      ...formRoles,
      { roleId: '', roleName: '', quantity: 1 }
    ]);
  };

  const handleRemoveRole = (index: number) => {
    setFormRoles(formRoles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index: number, field: keyof StaffRequirement, value: any) => {
    const updatedRoles = [...formRoles];

    if (field === 'roleName') {
      // Check if this is a predefined role
      const predefinedRole = THEATRE_ROLES.find(r => r.name === value);
      if (predefinedRole) {
        updatedRoles[index] = {
          ...updatedRoles[index],
          roleId: predefinedRole.id,
          roleName: predefinedRole.name
        };
      } else {
        // Custom role
        updatedRoles[index] = {
          ...updatedRoles[index],
          roleId: value.toLowerCase().replace(/\s+/g, '-'),
          roleName: value
        };
      }
    } else {
      updatedRoles[index] = {
        ...updatedRoles[index],
        [field]: value
      };
    }

    setFormRoles(updatedRoles);
  };

  const handleSave = async () => {
    if (!formSpecialtyId) {
      alert('Please select a specialty');
      return;
    }

    if (formUseKeywords && formKeywords.length === 0) {
      alert('Please add at least one keyword or uncheck "Use procedure keywords"');
      return;
    }

    if (formRoles.length === 0) {
      alert('Please add at least one role requirement');
      return;
    }

    // Validate all roles have names and quantities
    const invalidRole = formRoles.find(r => !r.roleName || r.quantity < 0);
    if (invalidRole) {
      alert('Please ensure all roles have valid names and quantities');
      return;
    }

    setSaving(true);
    try {
      const selectedSpecialty = specialties.find(s => s.id === formSpecialtyId);

      const mapperData: any = {
        specialtyId: formSpecialtyId,
        specialtyName: selectedSpecialty?.name || '',
        subspecialty: formSubspecialty || null,
        roles: formRoles.filter(r => r.roleName && r.quantity >= 0)
      };

      // Only add keywords field if using keywords
      if (formUseKeywords && formKeywords.length > 0) {
        mapperData.keywords = formKeywords;
      }

      if (editingMapper) {
        await updateStaffRequirementMapper(editingMapper.id!, mapperData);
      } else {
        await createStaffRequirementMapper(mapperData);
      }

      await loadData();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving mapper:', error);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this requirement?')) return;

    try {
      await deleteStaffRequirementMapper(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting mapper:', error);
      alert('Failed to delete');
    }
  };

  const filteredMappers = mappers.filter(m => {
    const searchLower = searchTerm.toLowerCase();
    return (
      m.specialtyName.toLowerCase().includes(searchLower) ||
      m.subspecialty?.toLowerCase().includes(searchLower) ||
      m.keyword?.toLowerCase().includes(searchLower) ||
      m.keywords?.some(k => k.toLowerCase().includes(searchLower))
    );
  });

  // Group mappers by specialty
  const groupedMappers = filteredMappers.reduce((acc, mapper) => {
    const specialty = mapper.specialtyName;
    if (!acc[specialty]) {
      acc[specialty] = [];
    }
    acc[specialty].push(mapper);
    return acc;
  }, {} as Record<string, StaffRequirementMapper[]>);

  // Sort specialties alphabetically
  const sortedSpecialties = Object.keys(groupedMappers).sort();

  // Helper function to get keywords from mapper (handles both new and legacy formats)
  const getMapperKeywords = (mapper: StaffRequirementMapper): string[] => {
    if (mapper.keywords && mapper.keywords.length > 0) {
      return mapper.keywords;
    }
    // Migrate from legacy single keyword
    if (mapper.keyword && mapper.keyword !== null) {
      return [mapper.keyword];
    }
    return [];
  };

  // Helper function to get roles from mapper (handles both new and legacy formats)
  const getMapperRoles = (mapper: StaffRequirementMapper): StaffRequirement[] => {
    if (mapper.roles && mapper.roles.length > 0) {
      return mapper.roles;
    }
    // Migrate from legacy requirements
    if (mapper.requirements) {
      const roles: StaffRequirement[] = [];
      if (mapper.requirements.anaesthetists > 0) {
        roles.push({ roleId: 'anaes-np', roleName: 'Anaes N/P', quantity: mapper.requirements.anaesthetists });
      }
      if (mapper.requirements.scrubNurses > 0) {
        roles.push({ roleId: 'scrub-np', roleName: 'Scrub N/P', quantity: mapper.requirements.scrubNurses });
      }
      if (mapper.requirements.hcas > 0) {
        roles.push({ roleId: 'hca', roleName: 'HCA', quantity: mapper.requirements.hcas });
      }
      return roles;
    }
    return [];
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Staff Requirements</h2>
          <p className="text-sm text-gray-600">Configure staffing by specialty and keywords</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-cyan-500 text-white text-xs md:text-sm rounded hover:bg-cyan-600 transition-colors font-medium"
        >
          <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
          Add
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search specialty or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
          </div>
        ) : filteredMappers.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm">No requirements configured</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Subspecialty</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Keywords</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Required Roles</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSpecialties.map((specialty) => (
                <React.Fragment key={specialty}>
                  {/* Specialty Header Row */}
                  <tr className="bg-gradient-to-r from-cyan-50 to-blue-50 border-t-2 border-cyan-200">
                    <td colSpan={4} className="px-4 py-2">
                      <div className="font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-1 h-5 bg-cyan-500 rounded"></div>
                        {specialty}
                        <span className="text-xs font-normal text-gray-600 ml-2">
                          ({groupedMappers[specialty].length} {groupedMappers[specialty].length === 1 ? 'mapping' : 'mappings'})
                        </span>
                      </div>
                    </td>
                  </tr>
                  {/* Mapper Rows */}
                  {groupedMappers[specialty].map((mapper) => {
                    const roles = getMapperRoles(mapper);
                    const keywords = getMapperKeywords(mapper);
                    return (
                      <tr key={mapper.id} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="px-4 py-3 pl-8">
                          {mapper.subspecialty ? (
                            <div className="text-sm text-gray-700">{mapper.subspecialty}</div>
                          ) : (
                            <div className="text-sm text-gray-400 italic">All subspecialties</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {keywords.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {keywords.map((kw, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium">Any</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {roles.map((role, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 text-xs font-medium"
                              >
                                {role.quantity}x {role.roleName}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(mapper)}
                              className="p-1 text-gray-600 hover:text-cyan-600"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(mapper.id!)}
                              className="p-1 text-gray-600 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Form */}
      {showModal && (
        <div className="mt-4 bg-white border-2 border-cyan-200 rounded-lg shadow-lg">
          <div className="w-full">
            <div className="flex items-center justify-between p-2 md:p-4 border-b bg-gradient-to-r from-cyan-50 to-blue-50">
              <h3 className="text-sm md:text-lg font-semibold">
                {editingMapper ? 'Edit Requirement' : 'Add Requirement'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="p-2 md:p-4 space-y-2 md:space-y-4">
              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty *
                </label>
                <select
                  value={formSpecialtyId}
                  onChange={(e) => setFormSpecialtyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select specialty</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Subspecialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subspecialty <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  value={formSubspecialty}
                  onChange={(e) => setFormSubspecialty(e.target.value)}
                  disabled={!formSpecialtyId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">None</option>
                  {formSpecialtyId && getSelectedSpecialty()?.subspecialties?.map((sub: any, idx: number) => {
                    const subName = typeof sub === 'string' ? sub : sub.name;
                    return (
                      <option key={`${subName}-${idx}`} value={subName}>{subName}</option>
                    );
                  })}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Select a specialty first to see subspecialties
                </p>
              </div>

              {/* Use Keywords Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formUseKeywords}
                    onChange={(e) => {
                      setFormUseKeywords(e.target.checked);
                      if (!e.target.checked) {
                        setFormKeywords([]);
                      }
                    }}
                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Use procedure keywords
                  </span>
                </label>
                <p className="mt-1 text-xs text-gray-500 ml-6">
                  When unchecked, requirements apply to all procedures in this specialty
                </p>
              </div>

              {/* Keywords - Only show if using keywords */}
              {formUseKeywords && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Procedure Keywords *
                    </label>
                  </div>

                  {/* Add keyword input */}
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      id="keyword-input"
                      placeholder="e.g., Total Hip, Laser, Bleeding Risk"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          handleAddKeyword(input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('keyword-input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          handleAddKeyword(input.value);
                          input.value = '';
                        }
                      }}
                      className="px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display added keywords */}
                  {formKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      {formKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium"
                        >
                          {kw}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(idx)}
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      No keywords added yet. Add keywords that will match procedure names or characteristics.
                    </p>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    Add multiple keywords that should trigger these staff requirements. Examples: "Total Hip", "THR", "Hip replacement" OR "Laser", "High bleeding risk"
                  </p>
                </div>
              )}

              {/* Roles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Required Roles *
                  </label>
                  <button
                    onClick={handleAddRole}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  >
                    <Plus className="w-3 h-3" />
                    Add Role
                  </button>
                </div>

                <div className="space-y-2">
                  {formRoles.map((role, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Role Name
                          </label>
                          <input
                            type="text"
                            list={`roles-list-${index}`}
                            value={role.roleName}
                            onChange={(e) => handleRoleChange(index, 'roleName', e.target.value)}
                            placeholder="Select or type custom role"
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                          <datalist id={`roles-list-${index}`}>
                            {THEATRE_ROLES.map(tr => (
                              <option key={tr.id} value={tr.name} />
                            ))}
                          </datalist>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Number Required
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={role.quantity}
                            onChange={(e) => handleRoleChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
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

                {formRoles.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No roles added yet. Click "Add Role" to add staff requirements.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-2 md:p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="w-3 h-3 md:w-3.5 md:h-3.5 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
