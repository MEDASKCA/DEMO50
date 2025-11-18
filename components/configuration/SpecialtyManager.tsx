'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useHospital } from '@/lib/hospitalContext';

interface Subspecialty {
  name: string;
  abbreviation: string;
}

interface Specialty {
  id: string;
  name: string;
  abbreviation: string;
  subspecialties?: Subspecialty[]; // Array of subspecialty objects
}

export default function SpecialtyManager() {
  const { currentHospital } = useHospital();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [newSpecialtyAbbr, setNewSpecialtyAbbr] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingAbbr, setEditingAbbr] = useState('');
  const [saving, setSaving] = useState(false);
  const [expandedSpecialties, setExpandedSpecialties] = useState<Set<string>>(new Set());
  const [addingSubspecialtyFor, setAddingSubspecialtyFor] = useState<string | null>(null);
  const [newSubspecialtyName, setNewSubspecialtyName] = useState('');
  const [newSubspecialtyAbbr, setNewSubspecialtyAbbr] = useState('');
  const [editingSubspecialty, setEditingSubspecialty] = useState<{ specialtyId: string; index: number } | null>(null);
  const [editingSubName, setEditingSubName] = useState('');
  const [editingSubAbbr, setEditingSubAbbr] = useState('');

  useEffect(() => {
    if (currentHospital) {
      loadSpecialties();
    }
  }, [currentHospital]);

  const loadSpecialties = async () => {
    if (!currentHospital) return;

    setLoading(true);
    try {
      const q = query(collection(db, 'specialties'), where('hospitalId', '==', currentHospital.id));
      const snapshot = await getDocs(q);
      const loadedSpecialties: Specialty[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        loadedSpecialties.push({
          id: doc.id,
          name: data.name,
          abbreviation: data.abbreviation || data.name.substring(0, 10).toUpperCase(),
          subspecialties: data.subspecialties || []
        });
      });

      // Sort alphabetically
      loadedSpecialties.sort((a, b) => a.name.localeCompare(b.name));
      setSpecialties(loadedSpecialties);
    } catch (error) {
      console.error('Error loading specialties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpecialty = async () => {
    if (!newSpecialtyName.trim()) return;
    if (!currentHospital) {
      alert('No hospital selected. Please select a hospital first.');
      return;
    }

    // Use provided abbreviation or generate from name
    const abbr = newSpecialtyAbbr.trim() || newSpecialtyName.trim().substring(0, 10).toUpperCase();

    if (abbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    setSaving(true);
    try {
      // Create a slug ID from hospital ID and name for uniqueness
      const id = `${currentHospital.id}-${newSpecialtyName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`;

      await setDoc(doc(db, 'specialties', id), {
        hospitalId: currentHospital.id,
        name: newSpecialtyName.trim(),
        abbreviation: abbr,
        subspecialties: []
      });

      setNewSpecialtyName('');
      setNewSpecialtyAbbr('');
      await loadSpecialties();
    } catch (error) {
      console.error('Error adding specialty:', error);
      alert('Error adding specialty. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (specialty: Specialty) => {
    setEditingId(specialty.id);
    setEditingName(specialty.name);
    setEditingAbbr(specialty.abbreviation);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingAbbr('');
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    if (!currentHospital) return;

    if (editingAbbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    setSaving(true);
    try {
      const specialty = specialties.find(s => s.id === editingId);
      await setDoc(doc(db, 'specialties', editingId), {
        hospitalId: currentHospital.id,
        name: editingName.trim(),
        abbreviation: editingAbbr.trim() || editingName.trim().substring(0, 10).toUpperCase(),
        subspecialties: specialty?.subspecialties || []
      });

      setEditingId(null);
      setEditingName('');
      setEditingAbbr('');
      await loadSpecialties();
    } catch (error) {
      console.error('Error updating specialty:', error);
      alert('Error updating specialty. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleExpanded = (specialtyId: string) => {
    setExpandedSpecialties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(specialtyId)) {
        newSet.delete(specialtyId);
      } else {
        newSet.add(specialtyId);
      }
      return newSet;
    });
  };

  const handleAddSubspecialty = async (specialtyId: string) => {
    if (!newSubspecialtyName.trim()) return;
    if (!currentHospital) return;

    const abbr = newSubspecialtyAbbr.trim() || newSubspecialtyName.trim().substring(0, 10).toUpperCase();

    if (abbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    setSaving(true);
    try {
      const specialty = specialties.find(s => s.id === specialtyId);
      if (!specialty) return;

      const newSubspecialty: Subspecialty = {
        name: newSubspecialtyName.trim(),
        abbreviation: abbr
      };

      const updatedSubspecialties = [...(specialty.subspecialties || []), newSubspecialty];

      await setDoc(doc(db, 'specialties', specialtyId), {
        hospitalId: currentHospital.id,
        name: specialty.name,
        abbreviation: specialty.abbreviation,
        subspecialties: updatedSubspecialties
      });

      setNewSubspecialtyName('');
      setNewSubspecialtyAbbr('');
      setAddingSubspecialtyFor(null);
      await loadSpecialties();
    } catch (error) {
      console.error('Error adding subspecialty:', error);
      alert('Error adding subspecialty. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSubspecialty = async (specialtyId: string, subspecialtyName: string) => {
    if (!confirm(`Are you sure you want to delete subspecialty "${subspecialtyName}"?`)) {
      return;
    }
    if (!currentHospital) return;

    setSaving(true);
    try {
      const specialty = specialties.find(s => s.id === specialtyId);
      if (!specialty) return;

      const updatedSubspecialties = (specialty.subspecialties || []).filter(s => s.name !== subspecialtyName);

      await setDoc(doc(db, 'specialties', specialtyId), {
        hospitalId: currentHospital.id,
        name: specialty.name,
        abbreviation: specialty.abbreviation,
        subspecialties: updatedSubspecialties
      });

      await loadSpecialties();
    } catch (error) {
      console.error('Error deleting subspecialty:', error);
      alert('Error deleting subspecialty. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEditSubspecialty = (specialtyId: string, index: number, sub: Subspecialty) => {
    setEditingSubspecialty({ specialtyId, index });
    setEditingSubName(sub.name);
    setEditingSubAbbr(sub.abbreviation);
  };

  const handleCancelEditSubspecialty = () => {
    setEditingSubspecialty(null);
    setEditingSubName('');
    setEditingSubAbbr('');
  };

  const handleSaveEditSubspecialty = async () => {
    if (!editingSubspecialty || !editingSubName.trim()) return;
    if (!currentHospital) return;

    if (editingSubAbbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    setSaving(true);
    try {
      const specialty = specialties.find(s => s.id === editingSubspecialty.specialtyId);
      if (!specialty) return;

      const updatedSubspecialties = [...(specialty.subspecialties || [])];
      updatedSubspecialties[editingSubspecialty.index] = {
        name: editingSubName.trim(),
        abbreviation: editingSubAbbr.trim() || editingSubName.trim().substring(0, 10).toUpperCase()
      };

      await setDoc(doc(db, 'specialties', editingSubspecialty.specialtyId), {
        hospitalId: currentHospital.id,
        name: specialty.name,
        abbreviation: specialty.abbreviation,
        subspecialties: updatedSubspecialties
      });

      setEditingSubspecialty(null);
      setEditingSubName('');
      setEditingSubAbbr('');
      await loadSpecialties();
    } catch (error) {
      console.error('Error updating subspecialty:', error);
      alert('Error updating subspecialty. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpecialty = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?\n\nThis cannot be undone.`)) {
      return;
    }

    setSaving(true);
    try {
      await deleteDoc(doc(db, 'specialties', id));
      await loadSpecialties();
    } catch (error) {
      console.error('Error deleting specialty:', error);
      alert('Error deleting specialty. Please try again.');
    } finally {
      setSaving(false);
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
      {/* Add New Specialty */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSpecialtyName}
            onChange={(e) => setNewSpecialtyName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSpecialty();
              }
            }}
            placeholder="e.g., Trauma and Orthopaedics..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            disabled={saving}
          />
          <input
            type="text"
            value={newSpecialtyAbbr}
            onChange={(e) => setNewSpecialtyAbbr(e.target.value.substring(0, 10))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSpecialty();
              }
            }}
            placeholder="Abbr (10 max)"
            maxLength={10}
            className="w-full sm:w-32 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 uppercase"
            disabled={saving}
          />
        </div>
        <button
          onClick={handleAddSpecialty}
          disabled={!newSpecialtyName.trim() || saving}
          className="w-full md:w-auto p-2 text-sm font-medium bg-teal-600 text-white rounded shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          title="Add specialty"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Specialties List */}
      {specialties.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No specialties defined yet. Add your first specialty above.
        </div>
      ) : (
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="border border-gray-300 rounded overflow-hidden">
              {/* Specialty Bar */}
              {editingId === specialty.id ? (
                <div className="bg-white py-2 px-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2">
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
                        placeholder="Full name"
                        className="flex-1 px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        autoFocus
                        disabled={saving}
                      />
                      <input
                        type="text"
                        value={editingAbbr}
                        onChange={(e) => setEditingAbbr(e.target.value.substring(0, 10))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        placeholder="Abbr"
                        maxLength={10}
                        className="w-full sm:w-24 px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 uppercase"
                        disabled={saving}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={!editingName.trim() || saving}
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
                  className="bg-white hover:bg-gray-50 transition-colors py-2 px-3 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleExpanded(specialty.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {specialty.name}
                    </span>
                    {specialty.subspecialties && specialty.subspecialties.length > 0 && (
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                        {specialty.subspecialties.length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(specialty);
                      }}
                      disabled={saving}
                      className="p-1 text-cyan-600 hover:bg-cyan-50 rounded transition-colors disabled:opacity-50"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {expandedSpecialties.has(specialty.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              )}

              {/* Expanded Subspecialties Section */}
              {expandedSpecialties.has(specialty.id) && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {/* Add subspecialty input */}
                  {addingSubspecialtyFor === specialty.id && (
                    <div className="p-3 bg-white border-b border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSubspecialtyName}
                          onChange={(e) => setNewSubspecialtyName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSubspecialty(specialty.id);
                            } else if (e.key === 'Escape') {
                              setAddingSubspecialtyFor(null);
                              setNewSubspecialtyName('');
                              setNewSubspecialtyAbbr('');
                            }
                          }}
                          placeholder="e.g., Spine, Hip & Knee..."
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          autoFocus
                          disabled={saving}
                        />
                        <input
                          type="text"
                          value={newSubspecialtyAbbr}
                          onChange={(e) => setNewSubspecialtyAbbr(e.target.value.substring(0, 10))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSubspecialty(specialty.id);
                            } else if (e.key === 'Escape') {
                              setAddingSubspecialtyFor(null);
                              setNewSubspecialtyName('');
                              setNewSubspecialtyAbbr('');
                            }
                          }}
                          placeholder="Abbr (10 max)"
                          maxLength={10}
                          className="w-28 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 uppercase"
                          disabled={saving}
                        />
                        <button
                          onClick={() => handleAddSubspecialty(specialty.id)}
                          disabled={!newSubspecialtyName.trim() || saving}
                          className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setAddingSubspecialtyFor(null);
                            setNewSubspecialtyName('');
                            setNewSubspecialtyAbbr('');
                          }}
                          disabled={saving}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List subspecialties */}
                  {specialty.subspecialties && specialty.subspecialties.length > 0 ? (
                    <div className="p-3">
                      <div className="space-y-2">
                        {specialty.subspecialties.map((sub, index) => (
                          <div key={index}>
                            {editingSubspecialty?.specialtyId === specialty.id && editingSubspecialty?.index === index ? (
                              // Edit mode
                              <div className="p-2 bg-white border border-teal-300 rounded">
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      value={editingSubName}
                                      onChange={(e) => setEditingSubName(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSaveEditSubspecialty();
                                        } else if (e.key === 'Escape') {
                                          handleCancelEditSubspecialty();
                                        }
                                      }}
                                      placeholder="Full name"
                                      className="flex-1 px-3 py-2 text-sm border border-teal-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                      autoFocus
                                      disabled={saving}
                                    />
                                    <input
                                      type="text"
                                      value={editingSubAbbr}
                                      onChange={(e) => setEditingSubAbbr(e.target.value.substring(0, 10))}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSaveEditSubspecialty();
                                        } else if (e.key === 'Escape') {
                                          handleCancelEditSubspecialty();
                                        }
                                      }}
                                      placeholder="Abbr"
                                      maxLength={10}
                                      className="w-full sm:w-28 px-3 py-2 text-sm border border-teal-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 uppercase"
                                      disabled={saving}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleSaveEditSubspecialty}
                                      disabled={!editingSubName.trim() || saving}
                                      className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                      <Check className="w-4 h-4" />
                                      <span>Save</span>
                                    </button>
                                    <button
                                      onClick={handleCancelEditSubspecialty}
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
                              // Display mode
                              <div className="flex items-center justify-between py-1.5 px-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-900 truncate">{sub.name}</div>
                                  <div className="text-xs text-gray-600 uppercase">{sub.abbreviation}</div>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  <button
                                    onClick={() => handleStartEditSubspecialty(specialty.id, index, sub)}
                                    disabled={saving}
                                    className="p-1 text-teal-600 hover:bg-teal-50 rounded transition-colors disabled:opacity-50"
                                    title="Edit subspecialty"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubspecialty(specialty.id, sub.name)}
                                    disabled={saving}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                                    title="Delete subspecialty"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : !addingSubspecialtyFor && (
                    <div className="p-3 text-center">
                      <p className="text-sm text-gray-500 italic">No subspecialties yet</p>
                    </div>
                  )}

                  {/* Action buttons at bottom */}
                  <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => setAddingSubspecialtyFor(specialty.id)}
                      disabled={saving || addingSubspecialtyFor === specialty.id}
                      className="flex-1 p-2 text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                      title="Add subspecialty"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSpecialty(specialty.id, specialty.name)}
                      disabled={saving}
                      className="p-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                      title="Delete specialty"
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
        Total specialties: {specialties.length}
      </p>
    </div>
  );
}
