'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Check, ChevronDown, ChevronRight, Building2, Layers } from 'lucide-react';
import {
  getTheatreUnits,
  saveTheatreUnit,
  deleteTheatreUnit,
  getSpecialUnits,
  saveSpecialUnit,
  deleteSpecialUnit,
  SpecialUnit
} from '@/lib/scheduling/theatreService';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useHospital } from '@/lib/hospitalContext';

interface TheatreUnit {
  id: string;
  name: string;
  location: string;
  order: number;
  numberOfTheatres: number;
  specialties: string[]; // Array of specialty IDs
}

interface Subspecialty {
  name: string;
  abbreviation: string;
}

interface Specialty {
  id: string;
  name: string;
  abbreviation: string;
  subspecialties?: Subspecialty[];
}

export default function TheatreUnitsManager() {
  const { currentHospital } = useHospital();
  const [units, setUnits] = useState<TheatreUnit[]>([]);
  const [specialUnits, setSpecialUnits] = useState<SpecialUnit[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  // New unit form state
  const [newUnitName, setNewUnitName] = useState('');
  const [newUnitLocation, setNewUnitLocation] = useState('');
  const [newUnitTheatres, setNewUnitTheatres] = useState<number | ''>('');
  const [newUnitSpecialties, setNewUnitSpecialties] = useState<string[]>([]);

  // New auxiliary unit form state
  const [newAuxLabel, setNewAuxLabel] = useState('');
  const [newAuxType, setNewAuxType] = useState('satellite');
  const [newAuxUnitLocation, setNewAuxUnitLocation] = useState('');
  const [newAuxRowSpan, setNewAuxRowSpan] = useState<number>(1);

  // Edit unit form state
  const [editingName, setEditingName] = useState('');
  const [editingLocation, setEditingLocation] = useState('');
  const [editingTheatres, setEditingTheatres] = useState(1);
  const [editingSpecialties, setEditingSpecialties] = useState<string[]>([]);

  useEffect(() => {
    if (currentHospital) {
      loadUnits();
      loadSpecialties();
      loadSpecialUnits();
    }
  }, [currentHospital]);

  const loadUnits = async () => {
    if (!currentHospital) return;

    setLoading(true);
    try {
      const loadedUnits = await getTheatreUnits(currentHospital.id);
      setUnits(loadedUnits.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading units:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialUnits = async () => {
    if (!currentHospital) return;

    try {
      const loadedSpecialUnits = await getSpecialUnits(currentHospital.id);
      setSpecialUnits(loadedSpecialUnits.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading special units:', error);
    }
  };

  const loadSpecialties = async () => {
    if (!currentHospital) return;

    try {
      const q = query(collection(db, 'specialties'), where('hospitalId', '==', currentHospital.id));
      const snapshot = await getDocs(q);
      const loadedSpecialties: Specialty[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        loadedSpecialties.push({
          id: doc.id,
          name: data.name,
          abbreviation: data.abbreviation || data.name.substring(0, 6).toUpperCase(),
          subspecialties: data.subspecialties || []
        });
      });

      // Sort alphabetically
      loadedSpecialties.sort((a, b) => a.name.localeCompare(b.name));
      setSpecialties(loadedSpecialties);
    } catch (error) {
      console.error('Error loading specialties:', error);
    }
  };

  const toggleExpanded = (unitId: string) => {
    setExpandedUnits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  const handleAddUnit = async () => {
    if (!newUnitName.trim() || !newUnitLocation.trim() || !newUnitTheatres) return;
    if (!currentHospital) {
      alert('No hospital selected. Please select a hospital first.');
      return;
    }

    setSaving(true);
    try {
      const maxId = units.length;
      const unitId = `${currentHospital.id}-UNIT-${String(maxId + 1).padStart(3, '0')}`;

      const newUnit: TheatreUnit = {
        id: unitId,
        name: newUnitName.trim(),
        location: newUnitLocation.trim(),
        order: units.length + 1,
        numberOfTheatres: typeof newUnitTheatres === 'number' ? newUnitTheatres : 1,
        specialties: newUnitSpecialties
      };

      await saveTheatreUnit(newUnit, currentHospital.id);

      // Automatically generate theatres for this unit
      const { saveTheatre, getTheatres } = await import('@/lib/scheduling/theatreService');
      const existingTheatres = await getTheatres();

      // Generate theatres for this unit
      for (let i = 1; i <= newUnit.numberOfTheatres; i++) {
        const theatreId = `${newUnit.id}-T${String(i).padStart(2, '0')}`;
        const existingTheatre = existingTheatres.find(t => t.id === theatreId);

        if (!existingTheatre) {
          const theatre = {
            id: theatreId,
            name: `${newUnit.name} ${i}`,
            location: newUnit.location,
            capacity: 1,
            specialties: newUnit.specialties || [],
            equipment: [],
            status: 'available' as const,
            unitId: newUnit.id,
            openingHours: {
              start: '08:00',
              end: '18:00'
            },
            sessionDuration: 240
          };
          await saveTheatre(theatre, currentHospital.id);
        }
      }

      setNewUnitName('');
      setNewUnitLocation('');
      setNewUnitTheatres('');
      setNewUnitSpecialties([]);
      await loadUnits();
    } catch (error) {
      console.error('Error adding unit:', error);
      alert('Error adding unit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAuxiliaryUnit = async () => {
    console.log('🔵 Add Auxiliary Unit clicked');
    console.log('Form values:', { newAuxLabel, newAuxUnitLocation, newAuxType, newAuxRowSpan });

    if (!newAuxLabel.trim() || !newAuxUnitLocation.trim()) {
      console.log('❌ Validation failed - missing label or location');
      return;
    }
    if (!currentHospital) {
      alert('No hospital selected. Please select a hospital first.');
      return;
    }

    console.log('✅ Validation passed, starting save...');
    setSaving(true);
    try {
      const maxOrder = specialUnits.length > 0 ? Math.max(...specialUnits.map(u => u.order)) : 1000;
      const auxId = `${currentHospital.id}-AUX-${Date.now()}`;

      const newAuxUnit: SpecialUnit = {
        id: auxId,
        hospitalId: currentHospital.id,
        unitLocation: newAuxUnitLocation,
        label: newAuxLabel.trim(),
        type: newAuxType,
        order: maxOrder + 1,
        rowSpan: newAuxRowSpan
      };

      console.log('💾 Saving auxiliary unit:', newAuxUnit);
      await saveSpecialUnit(newAuxUnit);
      console.log('✅ Auxiliary unit saved successfully');

      setNewAuxLabel('');
      setNewAuxType('satellite');
      setNewAuxUnitLocation('');
      setNewAuxRowSpan(1);

      console.log('🔄 Reloading special units...');
      await loadSpecialUnits();
      console.log('✅ Special units reloaded');
    } catch (error) {
      console.error('❌ Error adding auxiliary unit:', error);
      alert(`Error adding auxiliary unit: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAuxUnit = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete auxiliary unit "${label}"?`)) {
      return;
    }

    setSaving(true);
    try {
      await deleteSpecialUnit(id);
      await loadSpecialUnits();
    } catch (error) {
      console.error('Error deleting auxiliary unit:', error);
      alert('Error deleting auxiliary unit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (unit: TheatreUnit) => {
    setEditingId(unit.id);
    setEditingName(unit.name);
    setEditingLocation(unit.location);
    setEditingTheatres(unit.numberOfTheatres);
    setEditingSpecialties(unit.specialties);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingLocation('');
    setEditingTheatres(1);
    setEditingSpecialties([]);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim() || !editingLocation.trim()) return;
    if (!currentHospital) return;

    setSaving(true);
    try {
      const unit = units.find(u => u.id === editingId);
      if (!unit) return;

      const updatedUnit: TheatreUnit = {
        ...unit,
        name: editingName.trim(),
        location: editingLocation.trim(),
        numberOfTheatres: editingTheatres,
        specialties: editingSpecialties
      };

      await saveTheatreUnit(updatedUnit, currentHospital.id);

      // Update theatres
      const { saveTheatre, getTheatres } = await import('@/lib/scheduling/theatreService');
      const existingTheatres = await getTheatres();

      for (let i = 1; i <= updatedUnit.numberOfTheatres; i++) {
        const theatreId = `${updatedUnit.id}-T${String(i).padStart(2, '0')}`;
        const existingTheatre = existingTheatres.find(t => t.id === theatreId);

        if (!existingTheatre) {
          const theatre = {
            id: theatreId,
            name: `${updatedUnit.name} ${i}`,
            location: updatedUnit.location,
            capacity: 1,
            specialties: updatedUnit.specialties || [],
            equipment: [],
            status: 'available' as const,
            unitId: updatedUnit.id,
            openingHours: {
              start: '08:00',
              end: '18:00'
            },
            sessionDuration: 240
          };
          await saveTheatre(theatre, currentHospital.id);
        } else {
          const updatedTheatre = {
            ...existingTheatre,
            name: `${updatedUnit.name} ${i}`,
            location: updatedUnit.location,
            specialties: updatedUnit.specialties || [],
            unitId: updatedUnit.id
          };
          await saveTheatre(updatedTheatre, currentHospital.id);
        }
      }

      setEditingId(null);
      setEditingName('');
      setEditingLocation('');
      setEditingTheatres(1);
      setEditingSpecialties([]);
      await loadUnits();
    } catch (error) {
      console.error('Error updating unit:', error);
      alert('Error updating unit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUnit = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?\n\nThis cannot be undone.`)) {
      return;
    }

    setSaving(true);
    try {
      await deleteTheatreUnit(id);
      await loadUnits();
    } catch (error) {
      console.error('Error deleting unit:', error);
      alert('Error deleting unit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSpecialty = (specialtyId: string, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingSpecialties(prev =>
        prev.includes(specialtyId)
          ? prev.filter(s => s !== specialtyId)
          : [...prev, specialtyId]
      );
    } else {
      setNewUnitSpecialties(prev =>
        prev.includes(specialtyId)
          ? prev.filter(s => s !== specialtyId)
          : [...prev, specialtyId]
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Add New Unit Form */}
      <div className="bg-white border border-gray-200 p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddUnit();
              }
            }}
            placeholder="Unit name (e.g., Main Theatres)"
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            disabled={saving}
          />
          <input
            type="text"
            value={newUnitLocation}
            onChange={(e) => setNewUnitLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddUnit();
              }
            }}
            placeholder="Location (e.g., Floor 2)"
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            disabled={saving}
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="20"
              value={newUnitTheatres}
              onChange={(e) => setNewUnitTheatres(e.target.value === '' ? '' : parseInt(e.target.value) || '')}
              placeholder="# Theatres"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              disabled={saving}
            />
            <button
              onClick={handleAddUnit}
              disabled={!newUnitName.trim() || !newUnitLocation.trim() || !newUnitTheatres || saving}
              className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span className="hidden sm:inline">Add Unit</span>
            </button>
          </div>
        </div>

        {/* Specialty Selection */}
        {specialties.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 mb-2">Select specialties for this unit:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {specialties.map((specialty) => (
                <label
                  key={specialty.id}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded cursor-pointer transition-colors ${
                    newUnitSpecialties.includes(specialty.id)
                      ? 'bg-teal-100 text-teal-700 border border-teal-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={newUnitSpecialties.includes(specialty.id)}
                    onChange={() => toggleSpecialty(specialty.id)}
                    className="w-3 h-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
                  />
                  <span className="truncate" title={specialty.name}>{specialty.abbreviation}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Auxiliary Unit Form */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-orange-900 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Add Auxiliary Unit (e.g., MILE END, NIGHT)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={newAuxLabel}
            onChange={(e) => setNewAuxLabel(e.target.value)}
            placeholder="Label (e.g., MILE END)"
            className="px-3 py-2 text-sm border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={saving}
          />
          <select
            value={newAuxType}
            onChange={(e) => setNewAuxType(e.target.value)}
            className="px-3 py-2 text-sm border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={saving}
          >
            <option value="satellite">Satellite Unit</option>
            <option value="night-shift">Night Shift</option>
            <option value="recovery">Recovery</option>
            <option value="other">Other</option>
          </select>
          <select
            value={newAuxUnitLocation}
            onChange={(e) => setNewAuxUnitLocation(e.target.value)}
            className="px-3 py-2 text-sm border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={saving}
          >
            <option value="">Select Unit Location</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.location}>{unit.name} ({unit.location})</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="5"
              value={newAuxRowSpan}
              onChange={(e) => setNewAuxRowSpan(parseInt(e.target.value) || 1)}
              placeholder="Row Span"
              title="How many rows this unit spans"
              className="w-20 px-3 py-2 text-sm border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              disabled={saving}
            />
            <button
              onClick={handleAddAuxiliaryUnit}
              disabled={!newAuxLabel.trim() || !newAuxUnitLocation.trim() || saving}
              className="flex-1 px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Add Aux Unit</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-orange-700">
          Auxiliary units appear below the selected unit's theatres in the allocation view.
        </p>
      </div>

      {/* Units List */}
      {units.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No theatre units configured. Add your first unit above.
        </div>
      ) : (
        <div className="space-y-2">
          {units.map((unit) => (
            <div key={unit.id} className="border border-gray-300 rounded overflow-hidden">
              {/* Unit Bar */}
              {editingId === unit.id ? (
                <div className="bg-white p-3">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        placeholder="Unit name"
                        className="px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        autoFocus
                        disabled={saving}
                      />
                      <input
                        type="text"
                        value={editingLocation}
                        onChange={(e) => setEditingLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        placeholder="Location"
                        className="px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={saving}
                      />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={editingTheatres}
                        onChange={(e) => setEditingTheatres(parseInt(e.target.value) || 1)}
                        className="px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={saving}
                      />
                    </div>

                    {/* Specialty Selection for Editing */}
                    {specialties.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Specialties:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                          {specialties.map((specialty) => (
                            <label
                              key={specialty.id}
                              className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded cursor-pointer transition-colors ${
                                editingSpecialties.includes(specialty.id)
                                  ? 'bg-teal-100 text-teal-700 border border-teal-300'
                                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={editingSpecialties.includes(specialty.id)}
                                onChange={() => toggleSpecialty(specialty.id, true)}
                                className="w-3 h-3 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
                              />
                              <span className="truncate" title={specialty.name}>{specialty.abbreviation}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={!editingName.trim() || !editingLocation.trim() || saving}
                        className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="flex-1 px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-white hover:bg-gray-50 transition-colors p-4 cursor-pointer"
                  onClick={() => toggleExpanded(unit.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left side - Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {unit.name}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                          {unit.location}
                        </span>
                      </div>

                      {/* Stats badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1 rounded-md border border-teal-200">
                          <Building2 className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">
                            {unit.numberOfTheatres} Theatre{unit.numberOfTheatres !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {unit.specialties && unit.specialties.length > 0 && (
                          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md border border-cyan-200">
                            <Layers className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">
                              {unit.specialties.length} Specialt{unit.specialties.length !== 1 ? 'ies' : 'y'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(unit);
                        }}
                        disabled={saving}
                        className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors disabled:opacity-50 border border-transparent hover:border-cyan-200"
                        title="Edit unit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <div className="p-1">
                        {expandedUnits.has(unit.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded Section - Show Theatres */}
              {expandedUnits.has(unit.id) && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {/* Individual Theatres */}
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Theatres in this unit:</p>
                    <div className="space-y-1">
                      {Array.from({ length: unit.numberOfTheatres }, (_, i) => i + 1).map((num) => (
                        <div
                          key={num}
                          className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded text-sm"
                        >
                          <span className="font-medium text-gray-900">{unit.name} {num}</span>
                          <span className="text-xs text-gray-500">{unit.location}</span>
                        </div>
                      ))}
                    </div>

                    {/* Show Specialties */}
                    {unit.specialties && unit.specialties.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-2">Available specialties:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {unit.specialties.map((specialtyId) => {
                            const specialty = specialties.find(s => s.id === specialtyId);
                            if (!specialty) return null;
                            return (
                              <div
                                key={specialtyId}
                                className="text-xs bg-teal-100 text-teal-700 px-3 py-2 rounded border border-teal-200 truncate"
                                title={specialty.name}
                              >
                                {specialty.abbreviation}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Auxiliary Units for this location */}
                    {(() => {
                      const auxUnitsForLocation = specialUnits.filter(su => su.unitLocation === unit.location);
                      if (auxUnitsForLocation.length > 0) {
                        return (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-700 mb-2">Auxiliary Units:</p>
                            <div className="space-y-1">
                              {auxUnitsForLocation.map((auxUnit) => (
                                <div
                                  key={auxUnit.id}
                                  className="flex items-center justify-between p-2 bg-orange-50 border border-orange-200 rounded text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5 text-orange-600" />
                                    <span className="font-medium text-orange-900">{auxUnit.label}</span>
                                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                                      {auxUnit.type}
                                    </span>
                                    {auxUnit.rowSpan && auxUnit.rowSpan > 1 && (
                                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                                        Spans {auxUnit.rowSpan} rows
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleDeleteAuxUnit(auxUnit.id, auxUnit.label)}
                                    disabled={saving}
                                    className="p-1 text-orange-600 hover:bg-orange-100 rounded transition-colors disabled:opacity-50"
                                    title="Delete auxiliary unit"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  {/* Action Buttons */}
                  <div className="p-3 bg-white border-t border-gray-200">
                    <button
                      onClick={() => handleDeleteUnit(unit.id, unit.name)}
                      disabled={saving}
                      className="p-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                      title="Delete unit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-gray-500 mt-2">
        Total units: {units.length}
      </p>
    </div>
  );
}
