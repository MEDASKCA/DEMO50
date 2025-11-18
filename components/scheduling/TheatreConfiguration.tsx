'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Save, MapPin, ChevronDown, ChevronRight, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useHospital } from '@/lib/hospitalContext';

// ========== TYPE DEFINITIONS ==========

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

interface Theatre {
  id: string;
  name: string;
  unitId: string;
  unitName?: string;
}

interface SessionTypePreference {
  sessionType: 'FULL' | 'AM' | 'PM' | 'EVE' | 'EXTENDED';
  priority: number; // 1 = most preferred, 2 = second choice, etc.
}

interface SpecialtyAssignment {
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  priority: number; // 1 = highest priority (primary specialty for this theatre)
  sessionTypePreferences: SessionTypePreference[];
  daysOfWeek?: number[]; // NEW: Days of week this specialty runs [0=Sun, 1=Mon, ..., 6=Sat]. Empty/undefined = all days
}

interface TheatreConfiguration {
  id: string;
  theatreId: string;
  theatreName: string;
  unitId: string;
  unitName: string;
  hospitalId: string;
  specialtyAssignments: SpecialtyAssignment[];
}

// SESSION TYPE DISPLAY INFO
const SESSION_TYPES = [
  { value: 'FULL', label: 'Full Day', time: '08:00-18:00', color: 'bg-blue-100 text-blue-800' },
  { value: 'AM', label: 'Morning', time: '08:00-13:00', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'PM', label: 'Afternoon', time: '13:00-18:00', color: 'bg-orange-100 text-orange-800' },
  { value: 'EVE', label: 'Evening', time: '18:00-20:00', color: 'bg-purple-100 text-purple-800' },
  { value: 'EXTENDED', label: 'Extended', time: '08:00-20:00', color: 'bg-red-100 text-red-800' }
] as const;

// ========== MAIN COMPONENT ==========

export default function TheatreConfiguration() {
  const { currentHospital } = useHospital();

  // State
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [configurations, setConfigurations] = useState<TheatreConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<TheatreConfiguration | null>(null);
  const [expandedConfigs, setExpandedConfigs] = useState<Set<string>>(new Set());

  // Modal state
  const [selectedTheatre, setSelectedTheatre] = useState<string>('');
  const [specialtyAssignments, setSpecialtyAssignments] = useState<SpecialtyAssignment[]>([]);
  const [saving, setSaving] = useState(false);

  // Load data on mount
  useEffect(() => {
    if (currentHospital) {
      loadData();
    }
  }, [currentHospital]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadSpecialties(),
        loadTheatres(),
        loadConfigurations()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialties = async () => {
    if (!currentHospital) return;

    const q = query(collection(db, 'specialties'), where('hospitalId', '==', currentHospital.id));
    const snapshot = await getDocs(q);
    const loaded: Specialty[] = [];

    snapshot.forEach(doc => {
      loaded.push({
        id: doc.id,
        name: doc.data().name,
        abbreviation: doc.data().abbreviation || doc.data().name.substring(0, 6).toUpperCase(),
        subspecialties: doc.data().subspecialties || []
      });
    });

    setSpecialties(loaded.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const loadTheatres = async () => {
    if (!currentHospital) return;

    const unitsQuery = query(collection(db, 'theatreUnits'), where('hospitalId', '==', currentHospital.id));
    const unitsSnapshot = await getDocs(unitsQuery);

    const theatresQuery = query(collection(db, 'theatres'), where('hospitalId', '==', currentHospital.id));
    const theatresSnapshot = await getDocs(theatresQuery);

    const unitsMap = new Map();
    unitsSnapshot.forEach(doc => {
      unitsMap.set(doc.id, doc.data().name);
    });

    const loaded: Theatre[] = [];
    theatresSnapshot.forEach(doc => {
      const data = doc.data();
      loaded.push({
        id: doc.id,
        name: data.name,
        unitId: data.unitId,
        unitName: unitsMap.get(data.unitId) || 'Unknown Unit'
      });
    });

    setTheatres(loaded.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const loadConfigurations = async () => {
    if (!currentHospital) return;

    const q = query(collection(db, 'theatreConfigurations'), where('hospitalId', '==', currentHospital.id));
    const snapshot = await getDocs(q);
    const loaded: TheatreConfiguration[] = [];

    snapshot.forEach(doc => {
      loaded.push({
        id: doc.id,
        ...doc.data()
      } as TheatreConfiguration);
    });

    setConfigurations(loaded);
  };

  // ========== MODAL ACTIONS ==========

  const openModal = (config?: TheatreConfiguration) => {
    if (config) {
      setEditingConfig(config);
      setSelectedTheatre(config.theatreId);
      setSpecialtyAssignments(config.specialtyAssignments);
    } else {
      setEditingConfig(null);
      setSelectedTheatre('');
      setSpecialtyAssignments([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingConfig(null);
    setSelectedTheatre('');
    setSpecialtyAssignments([]);
  };

  const addSpecialtyAssignment = () => {
    const nextPriority = specialtyAssignments.length + 1;
    setSpecialtyAssignments([
      ...specialtyAssignments,
      {
        specialtyId: '',
        specialtyName: '',
        priority: nextPriority,
        sessionTypePreferences: [
          { sessionType: 'FULL', priority: 1 }, // Default to FULL day as top priority
          { sessionType: 'AM', priority: 2 },
          { sessionType: 'PM', priority: 3 }
        ]
      }
    ]);
  };

  const removeSpecialtyAssignment = (index: number) => {
    const updated = specialtyAssignments.filter((_, i) => i !== index);
    // Renumber priorities
    updated.forEach((assignment, i) => {
      assignment.priority = i + 1;
    });
    setSpecialtyAssignments(updated);
  };

  const updateSpecialtyAssignment = (index: number, field: string, value: any) => {
    const updated = [...specialtyAssignments];
    if (field === 'specialtyId') {
      const specialty = specialties.find(s => s.id === value);
      if (specialty) {
        updated[index].specialtyId = value;
        updated[index].specialtyName = specialty.name;
      }
    } else if (field === 'subspecialtyName') {
      updated[index].subspecialtyName = value;
    } else if (field === 'priority') {
      updated[index].priority = value;
    }
    setSpecialtyAssignments(updated);
  };

  const updateSessionTypePriority = (assignmentIndex: number, sessionType: string, priority: number) => {
    const updated = [...specialtyAssignments];
    const sessionPref = updated[assignmentIndex].sessionTypePreferences.find(s => s.sessionType === sessionType);
    if (sessionPref) {
      sessionPref.priority = priority;
    }
    setSpecialtyAssignments(updated);
  };

  const saveConfiguration = async () => {
    if (!selectedTheatre || specialtyAssignments.length === 0 || !currentHospital) {
      alert('Please select a theatre and add at least one specialty');
      return;
    }

    // Validate all assignments have specialties selected
    const incomplete = specialtyAssignments.some(a => !a.specialtyId);
    if (incomplete) {
      alert('Please select a specialty for all assignments');
      return;
    }

    setSaving(true);
    try {
      const theatre = theatres.find(t => t.id === selectedTheatre);
      if (!theatre) throw new Error('Theatre not found');

      const configId = editingConfig?.id || `theatre-config-${selectedTheatre}`;

      const configData: TheatreConfiguration = {
        id: configId,
        theatreId: selectedTheatre,
        theatreName: theatre.name,
        unitId: theatre.unitId,
        unitName: theatre.unitName || '',
        hospitalId: currentHospital.id,
        specialtyAssignments: specialtyAssignments
      };

      await setDoc(doc(db, 'theatreConfigurations', configId), configData);

      await loadConfigurations();
      closeModal();
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const deleteConfiguration = async (configId: string) => {
    if (!confirm('Are you sure you want to delete this theatre configuration?')) return;

    try {
      await deleteDoc(doc(db, 'theatreConfigurations', configId));
      await loadConfigurations();
    } catch (error) {
      console.error('Error deleting configuration:', error);
      alert('Failed to delete configuration');
    }
  };

  const toggleExpanded = (configId: string) => {
    const newExpanded = new Set(expandedConfigs);
    if (newExpanded.has(configId)) {
      newExpanded.delete(configId);
    } else {
      newExpanded.add(configId);
    }
    setExpandedConfigs(newExpanded);
  };

  // ========== RENDER ==========

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Theatre Configuration</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure each theatre with priority specialties and session type preferences
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Configure Theatre
        </button>
      </div>

      {/* Configurations List */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {configurations.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No theatre configurations yet</p>
            <p className="text-sm mt-1">Click "Configure Theatre" to set up your first theatre</p>
          </div>
        ) : (
          configurations.map(config => (
            <div key={config.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => toggleExpanded(config.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedConfigs.has(config.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{config.theatreName}</h3>
                    <p className="text-sm text-gray-500">{config.unitName}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {config.specialtyAssignments.length} {config.specialtyAssignments.length === 1 ? 'Specialty' : 'Specialties'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(config)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteConfiguration(config.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedConfigs.has(config.id) && (
                <div className="mt-4 ml-8 space-y-3">
                  {config.specialtyAssignments
                    .sort((a, b) => a.priority - b.priority)
                    .map((assignment, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                              {assignment.priority}
                            </span>
                            <span className="font-medium text-gray-900">
                              {assignment.specialtyName}
                              {assignment.subspecialtyName && ` - ${assignment.subspecialtyName}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Session Preferences:</span>
                          {assignment.sessionTypePreferences
                            .sort((a, b) => a.priority - b.priority)
                            .slice(0, 3) // Show top 3
                            .map((pref, i) => {
                              const sessionInfo = SESSION_TYPES.find(s => s.value === pref.sessionType);
                              return sessionInfo ? (
                                <span key={i} className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${sessionInfo.color}`}>
                                  #{pref.priority} {sessionInfo.label}
                                </span>
                              ) : null;
                            })}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={closeModal} />

            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {editingConfig ? 'Edit Theatre Configuration' : 'Configure Theatre'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Theatre Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Theatre
                    </label>
                    <select
                      value={selectedTheatre}
                      onChange={(e) => setSelectedTheatre(e.target.value)}
                      disabled={!!editingConfig}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Choose a theatre...</option>
                      {theatres.map(theatre => (
                        <option key={theatre.id} value={theatre.id}>
                          {theatre.name} ({theatre.unitName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Specialty Assignments */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Specialty Assignments (Priority Order)
                      </label>
                      <button
                        onClick={addSpecialtyAssignment}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Specialty
                      </button>
                    </div>

                    <div className="space-y-4">
                      {specialtyAssignments.map((assignment, idx) => {
                        const specialty = specialties.find(s => s.id === assignment.specialtyId);
                        return (
                          <div key={idx} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                                {idx + 1}
                              </span>
                              <button
                                onClick={() => removeSpecialtyAssignment(idx)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Specialty Selection */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Specialty *
                                </label>
                                <select
                                  value={assignment.specialtyId}
                                  onChange={(e) => updateSpecialtyAssignment(idx, 'specialtyId', e.target.value)}
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                >
                                  <option value="">Select specialty...</option>
                                  {specialties.map(spec => (
                                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Subspecialty Selection */}
                              {specialty && specialty.subspecialties && specialty.subspecialties.length > 0 && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subspecialty (Optional)
                                  </label>
                                  <select
                                    value={assignment.subspecialtyName || ''}
                                    onChange={(e) => updateSpecialtyAssignment(idx, 'subspecialtyName', e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                  >
                                    <option value="">All (no subspecialty)</option>
                                    {specialty.subspecialties.map((sub, subIdx) => (
                                      <option key={subIdx} value={sub.name}>{sub.name}</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>

                            {/* Session Type Preferences */}
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Session Type Preferences (1 = Most Preferred)
                              </label>
                              <div className="grid grid-cols-5 gap-2">
                                {SESSION_TYPES.map(sessionType => {
                                  const pref = assignment.sessionTypePreferences.find(p => p.sessionType === sessionType.value);
                                  return (
                                    <div key={sessionType.value} className="text-center">
                                      <div className={`p-2 rounded-lg mb-1 ${sessionType.color}`}>
                                        <div className="text-xs font-semibold">{sessionType.label}</div>
                                        <div className="text-xs">{sessionType.time}</div>
                                      </div>
                                      <select
                                        value={pref?.priority || 99}
                                        onChange={(e) => updateSessionTypePriority(idx, sessionType.value, parseInt(e.target.value))}
                                        className="block w-full text-center text-sm border-gray-300 rounded-md"
                                      >
                                        <option value="99">-</option>
                                        <option value="1">1st</option>
                                        <option value="2">2nd</option>
                                        <option value="3">3rd</option>
                                        <option value="4">4th</option>
                                        <option value="5">5th</option>
                                      </select>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {specialtyAssignments.length === 0 && (
                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-sm">No specialty assignments yet</p>
                        <p className="text-xs mt-1">Click "Add Specialty" to begin</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={saveConfiguration}
                  disabled={saving}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Save Configuration
                    </>
                  )}
                </button>
                <button
                  onClick={closeModal}
                  disabled={saving}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
