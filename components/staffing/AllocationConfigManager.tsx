'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { useHospital } from '@/lib/hospitalContext';
import {
  getUnitCoordinators,
  getSpecialUnits,
  getStaffPoolSections,
  saveUnitCoordinator,
  saveSpecialUnit,
  saveStaffPoolSection,
  deleteUnitCoordinator,
  deleteSpecialUnit,
  deleteStaffPoolSection,
  UnitCoordinator,
  SpecialUnit,
  StaffPoolSection
} from '@/lib/scheduling/theatreService';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AllocationConfigManager() {
  const { currentHospital } = useHospital();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'coordinators' | 'special' | 'pools'>('coordinators');

  // Unit Coordinators
  const [coordinators, setCoordinators] = useState<UnitCoordinator[]>([]);
  const [editingCoordinator, setEditingCoordinator] = useState<UnitCoordinator | null>(null);
  const [showCoordinatorModal, setShowCoordinatorModal] = useState(false);

  // Special Units
  const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
  const [editingSpecialUnit, setEditingSpecialUnit] = useState<SpecialUnit | null>(null);
  const [showSpecialUnitModal, setShowSpecialUnitModal] = useState(false);

  // Staff Pool Sections
  const [poolSections, setPoolSections] = useState<StaffPoolSection[]>([]);
  const [editingPoolSection, setEditingPoolSection] = useState<StaffPoolSection | null>(null);
  const [showPoolSectionModal, setShowPoolSectionModal] = useState(false);

  const [locations, setLocations] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentHospital) {
      loadData();
    }
  }, [currentHospital]);

  const loadData = async () => {
    if (!currentHospital) return;

    setLoading(true);
    try {
      const [coordsData, specialData, poolsData, unitsData] = await Promise.all([
        getUnitCoordinators(currentHospital.id),
        getSpecialUnits(currentHospital.id),
        getStaffPoolSections(currentHospital.id),
        loadLocations()
      ]);

      setCoordinators(coordsData.sort((a, b) => a.order - b.order));
      setSpecialUnits(specialData.sort((a, b) => a.order - b.order));
      setPoolSections(poolsData.sort((a, b) => a.order - b.order));
      setLocations(unitsData);
    } catch (error) {
      console.error('Error loading allocation config:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLocations = async () => {
    if (!currentHospital) return [];

    const q = query(
      collection(db, 'theatreUnits'),
      where('hospitalId', '==', currentHospital.id)
    );
    const snapshot = await getDocs(q);
    const units = snapshot.docs.map(doc => doc.data());
    const uniqueLocations = [...new Set(units.map((u: any) => u.location))];
    return uniqueLocations as string[];
  };

  // Unit Coordinator Functions
  const handleAddCoordinator = () => {
    setEditingCoordinator({
      id: '',
      hospitalId: currentHospital!.id,
      unitLocation: locations[0] || '',
      label: '',
      roleTitle: '',
      order: coordinators.length + 1
    });
    setShowCoordinatorModal(true);
  };

  const handleEditCoordinator = (coord: UnitCoordinator) => {
    setEditingCoordinator(coord);
    setShowCoordinatorModal(true);
  };

  const handleSaveCoordinator = async () => {
    if (!editingCoordinator || !currentHospital) return;

    setSaving(true);
    try {
      const coordinatorData = {
        ...editingCoordinator,
        id: editingCoordinator.id || `coord-${currentHospital.id}-${Date.now()}`,
        hospitalId: currentHospital.id
      };

      await saveUnitCoordinator(coordinatorData);
      setShowCoordinatorModal(false);
      setEditingCoordinator(null);
      await loadData();
    } catch (error) {
      console.error('Error saving coordinator:', error);
      alert('Failed to save coordinator');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCoordinator = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coordinator?')) return;

    try {
      await deleteUnitCoordinator(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting coordinator:', error);
      alert('Failed to delete coordinator');
    }
  };

  // Special Unit Functions
  const handleAddSpecialUnit = () => {
    setEditingSpecialUnit({
      id: '',
      hospitalId: currentHospital!.id,
      unitLocation: locations[0] || '',
      label: '',
      type: 'satellite',
      order: specialUnits.length + 1000,
      rowSpan: 1
    });
    setShowSpecialUnitModal(true);
  };

  const handleEditSpecialUnit = (unit: SpecialUnit) => {
    setEditingSpecialUnit(unit);
    setShowSpecialUnitModal(true);
  };

  const handleSaveSpecialUnit = async () => {
    if (!editingSpecialUnit || !currentHospital) return;

    setSaving(true);
    try {
      const unitData = {
        ...editingSpecialUnit,
        id: editingSpecialUnit.id || `special-${currentHospital.id}-${Date.now()}`,
        hospitalId: currentHospital.id
      };

      await saveSpecialUnit(unitData);
      setShowSpecialUnitModal(false);
      setEditingSpecialUnit(null);
      await loadData();
    } catch (error) {
      console.error('Error saving special unit:', error);
      alert('Failed to save special unit');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpecialUnit = async (id: string) => {
    if (!confirm('Are you sure you want to delete this special unit?')) return;

    try {
      await deleteSpecialUnit(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting special unit:', error);
      alert('Failed to delete special unit');
    }
  };

  // Staff Pool Section Functions
  const handleAddPoolSection = () => {
    setEditingPoolSection({
      id: '',
      hospitalId: currentHospital!.id,
      label: '',
      order: poolSections.length + 1
    });
    setShowPoolSectionModal(true);
  };

  const handleEditPoolSection = (section: StaffPoolSection) => {
    setEditingPoolSection(section);
    setShowPoolSectionModal(true);
  };

  const handleSavePoolSection = async () => {
    if (!editingPoolSection || !currentHospital) return;

    setSaving(true);
    try {
      const sectionData = {
        ...editingPoolSection,
        id: editingPoolSection.id || `pool-${currentHospital.id}-${Date.now()}`,
        hospitalId: currentHospital.id
      };

      await saveStaffPoolSection(sectionData);
      setShowPoolSectionModal(false);
      setEditingPoolSection(null);
      await loadData();
    } catch (error) {
      console.error('Error saving pool section:', error);
      alert('Failed to save pool section');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePoolSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pool section?')) return;

    try {
      await deleteStaffPoolSection(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting pool section:', error);
      alert('Failed to delete pool section');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
        <span className="ml-2 text-gray-600">Loading configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('coordinators')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'coordinators'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Unit Coordinators
        </button>
        <button
          onClick={() => setActiveTab('special')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'special'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Special Units
        </button>
        <button
          onClick={() => setActiveTab('pools')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'pools'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Staff Pool Sections
        </button>
      </div>

      {/* Unit Coordinators Tab */}
      {activeTab === 'coordinators' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Configure unit coordinators that appear in rows above theatres (e.g., floor coordinators, bleep holders)
            </p>
            <button
              onClick={handleAddCoordinator}
              className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 bg-teal-600 text-white text-xs md:text-sm rounded hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add Coordinator</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Order</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Label</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Role Title</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Unit Location</th>
                  <th className="border border-gray-200 px-4 py-2 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coordinators.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                      No unit coordinators configured. Click "Add Coordinator" to create one.
                    </td>
                  </tr>
                ) : (
                  coordinators.map((coord) => (
                    <tr key={coord.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">{coord.order}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-medium">{coord.label}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{coord.roleTitle}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{coord.unitLocation}</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditCoordinator(coord)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCoordinator(coord.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Special Units Tab */}
      {activeTab === 'special' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Configure special units like satellite theatres or night shifts
            </p>
            <button
              onClick={handleAddSpecialUnit}
              className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 bg-teal-600 text-white text-xs md:text-sm rounded hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add Special Unit</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Order</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Label</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Type</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Unit Location</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Row Span</th>
                  <th className="border border-gray-200 px-4 py-2 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {specialUnits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                      No special units configured. Click "Add Special Unit" to create one.
                    </td>
                  </tr>
                ) : (
                  specialUnits.map((unit) => (
                    <tr key={unit.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">{unit.order}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-medium">{unit.label}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{unit.type}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{unit.unitLocation}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{unit.rowSpan || 1}</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditSpecialUnit(unit)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSpecialUnit(unit.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Staff Pool Sections Tab */}
      {activeTab === 'pools' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Configure staff pool sections that appear in column 3 (e.g., Management Day, Floaters, Unallocated)
            </p>
            <button
              onClick={handleAddPoolSection}
              className="flex items-center gap-1 px-2 py-1 md:px-4 md:py-2 bg-teal-600 text-white text-xs md:text-sm rounded hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add Pool Section</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Order</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Label</th>
                  <th className="border border-gray-200 px-4 py-2 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {poolSections.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                      No pool sections configured. Click "Add Pool Section" to create one.
                    </td>
                  </tr>
                ) : (
                  poolSections.map((section) => (
                    <tr key={section.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">{section.order}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-medium">{section.label}</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditPoolSection(section)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePoolSection(section.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Unit Coordinator Modal */}
      {showCoordinatorModal && editingCoordinator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingCoordinator.id ? 'Edit' : 'Add'} Unit Coordinator
              </h3>
              <button
                onClick={() => setShowCoordinatorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (e.g., "1490", "45871")
                </label>
                <input
                  type="text"
                  value={editingCoordinator.label}
                  onChange={(e) => setEditingCoordinator({...editingCoordinator, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter label"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={editingCoordinator.roleTitle}
                  onChange={(e) => setEditingCoordinator({...editingCoordinator, roleTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Theatre Coordinator, Anaesthetic Bleep Holder"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Location
                </label>
                <select
                  value={editingCoordinator.unitLocation}
                  onChange={(e) => setEditingCoordinator({...editingCoordinator, unitLocation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingCoordinator.order}
                  onChange={(e) => setEditingCoordinator({...editingCoordinator, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowCoordinatorModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCoordinator}
                disabled={saving || !editingCoordinator.label || !editingCoordinator.roleTitle}
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

      {/* Special Unit Modal */}
      {showSpecialUnitModal && editingSpecialUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingSpecialUnit.id ? 'Edit' : 'Add'} Special Unit
              </h3>
              <button
                onClick={() => setShowSpecialUnitModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (e.g., "MILE END", "NIGHT")
                </label>
                <input
                  type="text"
                  value={editingSpecialUnit.label}
                  onChange={(e) => setEditingSpecialUnit({...editingSpecialUnit, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter label"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={editingSpecialUnit.type}
                  onChange={(e) => setEditingSpecialUnit({...editingSpecialUnit, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="satellite">Satellite Theatre</option>
                  <option value="night-shift">Night Shift</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Location
                </label>
                <select
                  value={editingSpecialUnit.unitLocation}
                  onChange={(e) => setEditingSpecialUnit({...editingSpecialUnit, unitLocation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Row Span (how many rows tall)
                </label>
                <input
                  type="number"
                  value={editingSpecialUnit.rowSpan || 1}
                  onChange={(e) => setEditingSpecialUnit({...editingSpecialUnit, rowSpan: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingSpecialUnit.order}
                  onChange={(e) => setEditingSpecialUnit({...editingSpecialUnit, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowSpecialUnitModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSpecialUnit}
                disabled={saving || !editingSpecialUnit.label}
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

      {/* Staff Pool Section Modal */}
      {showPoolSectionModal && editingPoolSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingPoolSection.id ? 'Edit' : 'Add'} Staff Pool Section
              </h3>
              <button
                onClick={() => setShowPoolSectionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (e.g., "MANAGEMENT DAY", "FLOATERS")
                </label>
                <input
                  type="text"
                  value={editingPoolSection.label}
                  onChange={(e) => setEditingPoolSection({...editingPoolSection, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter label"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingPoolSection.order}
                  onChange={(e) => setEditingPoolSection({...editingPoolSection, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowPoolSectionModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePoolSection}
                disabled={saving || !editingPoolSection.label}
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
