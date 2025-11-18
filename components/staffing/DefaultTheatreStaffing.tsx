'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  Users
} from 'lucide-react';
import { useHospital } from '@/lib/hospitalContext';
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

export default function DefaultTheatreStaffing() {
  const { currentHospital } = useHospital();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<TheatreStaffRole[]>([]);
  const [editingRole, setEditingRole] = useState<TheatreStaffRole | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentHospital) {
      loadRoles();
    }
  }, [currentHospital]);

  const loadRoles = async () => {
    if (!currentHospital) return;

    setLoading(true);
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

          const role = {
            ...data,
            category,
            id: doc.id  // Ensure document ID is used, overriding any id in data
          };

          // Debug: Log roles with empty IDs
          if (!role.id || role.id.trim() === '') {
            console.warn('Found role with empty ID:', doc.id, data);
          }

          return role;
        })
        .filter(role => {
          // Filter out roles with invalid IDs
          if (!role.id || role.id.trim() === '') {
            console.warn('Filtering out role with invalid ID');
            return false;
          }
          return true;
        }) as TheatreStaffRole[];

      console.log('Loaded roles with IDs:', rolesData.map(r => ({
        id: r.id,
        idType: typeof r.id,
        idLength: r.id?.length,
        name: r.roleName,
        category: r.category
      })));

      // Check for duplicate IDs
      const idCounts = rolesData.reduce((acc, role) => {
        acc[role.id] = (acc[role.id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const duplicates = Object.entries(idCounts).filter(([id, count]) => count > 1);
      if (duplicates.length > 0) {
        console.error('Found duplicate IDs:', duplicates);
      }

      setRoles(rolesData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading theatre staff roles:', error);
    } finally {
      setLoading(false);
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
    setShowModal(true);
  };

  const handleEditRole = (role: TheatreStaffRole) => {
    setEditingRole(role);
    setShowModal(true);
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
      setShowModal(false);
      setEditingRole(null);
      await loadRoles();
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
      await loadRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
        <span className="ml-2 text-gray-600">Loading staffing configuration...</span>
      </div>
    );
  }

  // Group roles by category
  const rolesByCategory = roles.reduce((acc, role) => {
    const category = role.category || 'other'; // Ensure category is never undefined
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(role);
    return acc;
  }, {} as Record<string, TheatreStaffRole[]>);

  console.log('Roles by category:', Object.entries(rolesByCategory).map(([cat, roles]) => ({
    category: cat,
    count: roles.length,
    roles: roles.map(r => ({ id: r.id, name: r.roleName }))
  })));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            Define default staffing levels for theatre sessions. These will be used as templates when creating new theatre lists.
          </p>
        </div>
        <button
          onClick={handleAddRole}
          className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 bg-teal-600 text-white text-xs md:text-sm rounded hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Add Role</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Roles by Category */}
      {roles.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Staffing Roles Configured</h3>
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
                  <h3 className="font-semibold text-gray-900">{category.label}</h3>
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

      {/* Add/Edit Form */}
      {showModal && editingRole && (
        <div className="mt-4 bg-white border-2 border-teal-200 rounded-lg shadow-lg">
          <div className="bg-white rounded-lg max-w-full">
            <div className="flex items-center justify-between p-2 md:p-4 border-b bg-gradient-to-r from-teal-50 to-blue-50">
              <h3 className="text-sm md:text-lg font-semibold">
                {editingRole.id ? 'Edit' : 'Add'} Theatre Staff Role
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="p-2 md:p-4 space-y-2 md:space-y-4">
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

            <div className="flex items-center justify-end gap-2 p-2 md:p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                disabled={saving || !editingRole.roleName}
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
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
