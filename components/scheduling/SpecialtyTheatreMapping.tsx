'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Save, MapPin, ChevronDown, ChevronRight, Clock, Calendar, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getTheatres } from '@/lib/scheduling/theatreService';
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

type SessionType = 'FULL' | 'AM' | 'PM' | 'EVE' | 'EXTENDED';

interface SessionTypePreference {
  sessionType: SessionType;
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

// Session type display data
const SESSION_TYPES = [
  { value: 'FULL', label: 'Full Day', time: '08:00-18:00', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'AM', label: 'Morning', time: '08:00-13:00', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { value: 'PM', label: 'Afternoon', time: '13:00-18:00', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { value: 'EVE', label: 'Evening', time: '18:00-20:00', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { value: 'EXTENDED', label: 'Extended', time: '08:00-20:00', color: 'bg-red-100 text-red-800 border-red-300' }
] as const;

// Days of week
const DAYS_OF_WEEK = [
  { value: 1, label: 'Mon', fullLabel: 'Monday' },
  { value: 2, label: 'Tue', fullLabel: 'Tuesday' },
  { value: 3, label: 'Wed', fullLabel: 'Wednesday' },
  { value: 4, label: 'Thu', fullLabel: 'Thursday' },
  { value: 5, label: 'Fri', fullLabel: 'Friday' },
  { value: 6, label: 'Sat', fullLabel: 'Saturday' },
  { value: 0, label: 'Sun', fullLabel: 'Sunday' }
] as const;

export default function SpecialtyTheatreMapping() {
  const { currentHospital } = useHospital();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [configurations, setConfigurations] = useState<TheatreConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<TheatreConfiguration | null>(null);
  const [expandedConfigs, setExpandedConfigs] = useState<Set<string>>(new Set());
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

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

      loadedSpecialties.sort((a, b) => a.name.localeCompare(b.name));
      setSpecialties(loadedSpecialties);
    } catch (error) {
      console.error('Error loading specialties:', error);
    }
  };

  const loadTheatres = async () => {
    try {
      const loadedTheatres = await getTheatres();
      setTheatres(loadedTheatres);
    } catch (error) {
      console.error('Error loading theatres:', error);
    }
  };

  const loadConfigurations = async () => {
    if (!currentHospital) return;

    try {
      const q = query(collection(db, 'theatreConfigurations'), where('hospitalId', '==', currentHospital.id));
      const snapshot = await getDocs(q);
      const loadedConfigs: TheatreConfiguration[] = [];

      snapshot.forEach(doc => {
        loadedConfigs.push({
          id: doc.id,
          ...doc.data()
        } as TheatreConfiguration);
      });

      setConfigurations(loadedConfigs);
    } catch (error) {
      console.error('Error loading configurations:', error);
    }
  };

  const handleSave = async (config: TheatreConfiguration) => {
    try {
      if (!currentHospital) {
        setAlertMessage('No hospital selected. Please select a hospital first.');
        setShowAlert(true);
        return;
      }

      // Clean specialty assignments to remove undefined values (Firestore doesn't accept undefined)
      const cleanedAssignments = config.specialtyAssignments.map(assignment => {
        const cleaned: any = {
          specialtyId: assignment.specialtyId,
          specialtyName: assignment.specialtyName,
          priority: assignment.priority,
          sessionTypePreferences: assignment.sessionTypePreferences
        };
        // Only include subspecialtyName if it has a value
        if (assignment.subspecialtyName) {
          cleaned.subspecialtyName = assignment.subspecialtyName;
        }
        // Only include daysOfWeek if it has values
        if (assignment.daysOfWeek && assignment.daysOfWeek.length > 0) {
          cleaned.daysOfWeek = assignment.daysOfWeek;
        }
        return cleaned;
      });

      const docRef = doc(db, 'theatreConfigurations', config.id);
      await setDoc(docRef, {
        theatreId: config.theatreId,
        theatreName: config.theatreName,
        unitId: config.unitId,
        unitName: config.unitName,
        hospitalId: currentHospital.id,
        specialtyAssignments: cleanedAssignments
      });

      await loadConfigurations();

      setSuccessMessage(`Configuration saved successfully for ${config.theatreName}!`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      setEditingConfig(null);
    } catch (error) {
      console.error('Error saving configuration:', error);
      setAlertMessage('Failed to save configuration');
      setShowAlert(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this theatre configuration?')) return;

    try {
      await deleteDoc(doc(db, 'theatreConfigurations', id));
      await loadConfigurations();
    } catch (error) {
      console.error('Error deleting configuration:', error);
      setAlertMessage('Failed to delete configuration');
      setShowAlert(true);
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedConfigs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedConfigs(newExpanded);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-r-lg mb-4">
        <h3 className="text-sm md:text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          How Theatre Mapping Works
        </h3>
        <div className="space-y-2 text-xs md:text-sm text-blue-800">
          <p>
            <strong>Build weekly patterns for each theatre</strong> by adding multiple specialty assignments with different days.
          </p>
          <div className="bg-white rounded p-2 mt-2 border border-blue-200">
            <p className="font-semibold mb-1">Example: Main Theatre 3</p>
            <ul className="text-[11px] md:text-xs space-y-0.5 ml-4">
              <li>• <strong>Assignment 1:</strong> Orthopaedics - Monday, Wednesday, Friday</li>
              <li>• <strong>Assignment 2:</strong> OMFS - Tuesday</li>
              <li>• <strong>Assignment 3:</strong> General Surgery - Thursday</li>
              <li>• <strong>Assignment 4:</strong> Emergency - Saturday, Sunday</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingConfig(null);
              setShowModal(true);
            }}
            className="px-3 md:px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
            Configure Theatre
          </button>

          {configurations.length > 0 && (
            <button
              onClick={async () => {
                if (!confirm(`⚠️ WARNING: This will delete ALL ${configurations.length} theatre configuration(s).\n\nThis action cannot be undone.\n\nAre you sure you want to delete all configurations?`)) {
                  return;
                }

                setLoading(true);
                try {
                  // Delete all configurations
                  await Promise.all(
                    configurations.map(config => deleteDoc(doc(db, 'theatreConfigurations', config.id)))
                  );

                  setSuccessMessage(`Successfully deleted ${configurations.length} theatre configuration(s)!`);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 4000);

                  await loadConfigurations();
                } catch (error) {
                  console.error('Error deleting configurations:', error);
                  setAlertMessage('Failed to delete configurations. Please try again.');
                  setShowAlert(true);
                } finally {
                  setLoading(false);
                }
              }}
              className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
              Delete All
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="text-sm text-gray-500 mt-2">Loading configurations...</p>
        </div>
      ) : configurations.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded-lg">
          No theatre configurations set up. Click "Configure Theatre" to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {configurations.map((config) => (
            <div
              key={config.id}
              className="border border-gray-300 rounded overflow-hidden"
            >
              {/* Collapsed Bar */}
              <div
                className="bg-white hover:bg-gray-50 transition-colors p-2 cursor-pointer"
                onClick={() => toggleExpand(config.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {config.theatreName}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <div className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[10px] font-medium">{config.unitName}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-200">
                          <span className="text-[10px] font-medium">
                            {config.specialtyAssignments.length} Specialty{config.specialtyAssignments.length !== 1 ? ' Assignments' : ' Assignment'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingConfig(config);
                        setShowModal(true);
                      }}
                      disabled={loading}
                      className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded transition-colors disabled:opacity-50"
                      title="Edit configuration"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedConfigs.has(config.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {expandedConfigs.has(config.id) && (
                <div className="bg-gray-50 border-t border-gray-200">
                  <div className="p-3">
                    {/* Weekly Coverage Summary */}
                    <div className="mb-4 bg-white rounded-lg border border-gray-200 p-3">
                      <p className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Weekly Pattern
                      </p>
                      <div className="grid grid-cols-7 gap-1">
                        {DAYS_OF_WEEK.map((day) => {
                          // Calculate coverage for this day
                          const dayAssignments = config.specialtyAssignments.filter(assignment => {
                            if (!assignment.daysOfWeek || assignment.daysOfWeek.length === 0) return true;
                            return assignment.daysOfWeek.includes(day.value);
                          }).sort((a, b) => a.priority - b.priority);

                          const primaryAssignment = dayAssignments[0];

                          return (
                            <div
                              key={day.value}
                              className={`text-center p-1 rounded ${
                                primaryAssignment
                                  ? 'bg-indigo-50 border border-indigo-200'
                                  : 'bg-red-50 border border-red-200'
                              }`}
                              title={primaryAssignment ? `${primaryAssignment.specialtyName}${dayAssignments.length > 1 ? ` (+${dayAssignments.length - 1} more)` : ''}` : 'Not assigned'}
                            >
                              <div className={`text-[8px] font-bold ${
                                primaryAssignment ? 'text-gray-700' : 'text-red-600'
                              }`}>
                                {day.label}
                              </div>
                              {primaryAssignment && (
                                <div className="text-[7px] font-medium text-indigo-700 truncate">
                                  {primaryAssignment.specialtyName.substring(0, 8)}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-xs font-medium text-gray-700 mb-3">Specialty Assignments ({config.specialtyAssignments.length}):</p>

                    <div className="space-y-3">
                      {config.specialtyAssignments
                        .sort((a, b) => a.priority - b.priority)
                        .map((assignment) => {
                          const priorityColors =
                            assignment.priority === 1 ? 'bg-green-50 border-green-300' :
                            assignment.priority === 2 ? 'bg-blue-50 border-blue-300' :
                            assignment.priority === 3 ? 'bg-yellow-50 border-yellow-300' :
                            'bg-gray-50 border-gray-300';

                          return (
                            <div
                              key={`${assignment.specialtyId}-${assignment.subspecialtyName || 'main'}`}
                              className={`p-3 border rounded ${priorityColors}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                                    Priority {assignment.priority}
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {assignment.specialtyName}
                                  </p>
                                  {assignment.subspecialtyName && (
                                    <p className="text-xs text-teal-600 font-medium">
                                      {assignment.subspecialtyName}
                                    </p>
                                  )}

                                  {/* Weekly Pattern Display */}
                                  <div className="mt-2 flex flex-wrap gap-1 items-center">
                                    <span className="text-[9px] md:text-[10px] font-medium text-gray-500 mr-0.5">Days:</span>
                                    {assignment.daysOfWeek && assignment.daysOfWeek.length > 0 ? (
                                      assignment.daysOfWeek.sort((a, b) => {
                                        // Sort Monday-Sunday (1-6, 0)
                                        const orderA = a === 0 ? 7 : a;
                                        const orderB = b === 0 ? 7 : b;
                                        return orderA - orderB;
                                      }).map(dayNum => {
                                        const day = DAYS_OF_WEEK.find(d => d.value === dayNum);
                                        return (
                                          <span
                                            key={dayNum}
                                            className="inline-flex items-center px-1.5 md:px-2 py-0.5 md:py-1 text-[9px] md:text-[10px] font-semibold bg-indigo-500 text-white rounded shadow-sm"
                                          >
                                            {day?.label}
                                          </span>
                                        );
                                      })
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-1 text-[9px] md:text-[10px] font-semibold bg-gray-500 text-white rounded shadow-sm">
                                        All Days
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-[10px] font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Session Type Preferences:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {assignment.sessionTypePreferences
                                    .sort((a, b) => a.priority - b.priority)
                                    .map((pref) => {
                                      const sessionInfo = SESSION_TYPES.find(s => s.value === pref.sessionType);
                                      return (
                                        <div
                                          key={pref.sessionType}
                                          className={`px-2 py-1 rounded border text-[10px] font-medium ${sessionInfo?.color}`}
                                        >
                                          <span className="font-bold">#{pref.priority}</span> {sessionInfo?.label} ({sessionInfo?.time})
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-gray-200">
                    <button
                      onClick={() => handleDelete(config.id)}
                      disabled={loading}
                      className="p-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      title="Delete configuration"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Configuration
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ConfigurationModal
          configuration={editingConfig}
          specialties={specialties}
          theatres={theatres}
          configurations={configurations}
          showSuccess={showSuccess}
          successMessage={successMessage}
          onClose={() => {
            setShowModal(false);
            setEditingConfig(null);
            setShowSuccess(false);
          }}
          onSave={handleSave}
        />
      )}

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Alert</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-6">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== CONFIGURATION MODAL ==========

interface ConfigurationModalProps {
  configuration: TheatreConfiguration | null;
  specialties: Specialty[];
  theatres: Theatre[];
  configurations: TheatreConfiguration[];
  showSuccess: boolean;
  successMessage: string;
  onClose: () => void;
  onSave: (config: TheatreConfiguration) => Promise<void>;
}

function ConfigurationModal({
  configuration,
  specialties,
  theatres,
  configurations,
  showSuccess,
  successMessage,
  onClose,
  onSave
}: ConfigurationModalProps) {
  const [selectedTheatreId, setSelectedTheatreId] = useState(configuration?.theatreId || '');
  const [specialtyAssignments, setSpecialtyAssignments] = useState<SpecialtyAssignment[]>(
    configuration?.specialtyAssignments || []
  );
  const [saving, setSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  // Calculate which days are covered by current assignments
  const getDayCoverage = () => {
    const coverage: { [key: number]: SpecialtyAssignment[] } = {
      1: [], // Monday
      2: [], // Tuesday
      3: [], // Wednesday
      4: [], // Thursday
      5: [], // Friday
      6: [], // Saturday
      0: []  // Sunday
    };

    specialtyAssignments.forEach(assignment => {
      if (!assignment.daysOfWeek || assignment.daysOfWeek.length === 0) {
        // All days
        [1, 2, 3, 4, 5, 6, 0].forEach(day => {
          coverage[day].push(assignment);
        });
      } else {
        assignment.daysOfWeek.forEach(day => {
          coverage[day].push(assignment);
        });
      }
    });

    return coverage;
  };

  useEffect(() => {
    if (!configuration) {
      setSelectedTheatreId('');
      setSpecialtyAssignments([]);
    } else {
      setSelectedTheatreId(configuration.theatreId);
      setSpecialtyAssignments(configuration.specialtyAssignments);
    }
  }, [configuration]);

  const selectedTheatre = theatres.find(t => t.id === selectedTheatreId);

  const addSpecialtyAssignment = () => {
    const maxPriority = specialtyAssignments.length > 0
      ? Math.max(...specialtyAssignments.map(a => a.priority))
      : 0;

    // Default session type preferences: FULL=1, AM=2, PM=3
    const defaultSessionPrefs: SessionTypePreference[] = [
      { sessionType: 'FULL', priority: 1 },
      { sessionType: 'AM', priority: 2 },
      { sessionType: 'PM', priority: 3 },
      { sessionType: 'EVE', priority: 4 },
      { sessionType: 'EXTENDED', priority: 5 }
    ];

    setSpecialtyAssignments([
      ...specialtyAssignments,
      {
        specialtyId: '',
        specialtyName: '',
        subspecialtyName: undefined,
        priority: maxPriority + 1,
        sessionTypePreferences: defaultSessionPrefs
      }
    ]);
  };

  const removeSpecialtyAssignment = (index: number) => {
    setSpecialtyAssignments(specialtyAssignments.filter((_, i) => i !== index));
  };

  const updateSpecialtyAssignment = (index: number, updates: Partial<SpecialtyAssignment>) => {
    setSpecialtyAssignments(
      specialtyAssignments.map((assignment, i) =>
        i === index ? { ...assignment, ...updates } : assignment
      )
    );
  };

  const updateSessionTypePriority = (assignmentIndex: number, sessionType: SessionType, newPriority: number) => {
    const assignment = specialtyAssignments[assignmentIndex];
    const updatedPrefs = assignment.sessionTypePreferences.map(pref =>
      pref.sessionType === sessionType ? { ...pref, priority: newPriority } : pref
    );

    updateSpecialtyAssignment(assignmentIndex, { sessionTypePreferences: updatedPrefs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTheatreId || specialtyAssignments.length === 0) {
      setAlertMessage('Please select a theatre and add at least one specialty assignment.');
      setShowAlert(true);
      return;
    }

    // Validate all assignments have specialties selected
    const invalidAssignment = specialtyAssignments.find(a => !a.specialtyId);
    if (invalidAssignment) {
      setAlertMessage('Please select a specialty for all assignments.');
      setShowAlert(true);
      return;
    }

    if (!selectedTheatre) return;

    // Check for duplicate specialty-day combinations (same specialty on same days)
    const duplicates: string[] = [];
    for (let i = 0; i < specialtyAssignments.length; i++) {
      for (let j = i + 1; j < specialtyAssignments.length; j++) {
        const a1 = specialtyAssignments[i];
        const a2 = specialtyAssignments[j];

        // Same specialty
        if (a1.specialtyId === a2.specialtyId) {
          // Check for overlapping days
          const days1 = a1.daysOfWeek || [0, 1, 2, 3, 4, 5, 6];
          const days2 = a2.daysOfWeek || [0, 1, 2, 3, 4, 5, 6];
          const overlap = days1.filter(d => days2.includes(d));

          if (overlap.length > 0) {
            const dayNames = overlap.map(d => DAYS_OF_WEEK.find(day => day.value === d)?.fullLabel).join(', ');
            duplicates.push(`${a1.specialtyName} is assigned to ${dayNames} multiple times`);
          }
        }
      }
    }

    if (duplicates.length > 0) {
      setAlertMessage(`Duplicate assignments detected:\n\n${duplicates.join('\n')}\n\nPlease remove duplicate assignments before saving.`);
      setShowAlert(true);
      return;
    }

    // Check for day overlaps between different specialties (warn but allow)
    const coverage = getDayCoverage();
    const overlappingDays = Object.entries(coverage)
      .filter(([_, assignments]) => assignments.length > 1)
      .map(([day]) => DAYS_OF_WEEK.find(d => d.value === parseInt(day))?.fullLabel);

    if (overlappingDays.length > 0 && !confirm(
      `Multiple specialties are assigned to the following days:\n\n${overlappingDays.join(', ')}\n\nThe specialty with the highest priority (lowest number) will be scheduled on these days.\n\nDo you want to continue?`
    )) {
      return;
    }

    const configData: TheatreConfiguration = {
      id: configuration?.id || `theatre-${selectedTheatreId}`,
      theatreId: selectedTheatreId,
      theatreName: selectedTheatre.name,
      unitId: selectedTheatre.unitId,
      unitName: selectedTheatre.unitName || '',
      hospitalId: '', // Will be set by parent
      specialtyAssignments
    };

    setSaving(true);
    try {
      await onSave(configData);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <h2 className="text-base md:text-xl font-semibold text-gray-900">
            {configuration ? 'Edit Theatre' : 'Configure Theatre'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-3 md:p-6 space-y-4 md:space-y-6 overflow-y-auto max-h-[calc(95vh-140px)] md:max-h-[calc(90vh-140px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theatre *
            </label>
            <select
              required
              value={selectedTheatreId}
              onChange={(e) => setSelectedTheatreId(e.target.value)}
              disabled={!!configuration}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select a theatre</option>
              {theatres.map(theatre => (
                <option key={theatre.id} value={theatre.id}>
                  {theatre.name} ({theatre.unitName})
                </option>
              ))}
            </select>
            {configuration && (
              <p className="text-xs text-gray-500 mt-1">
                Theatre cannot be changed when editing. Delete and create new if needed.
              </p>
            )}
          </div>

          {/* Weekly Coverage Calendar */}
          {selectedTheatreId && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-lg p-3 md:p-4">
              <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Weekly Coverage
              </h3>
              <p className="text-[10px] md:text-xs text-gray-600 mb-3">
                Add multiple specialty assignments below to build your weekly pattern. Each specialty can run on specific days.
              </p>

              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const coverage = getDayCoverage();
                  const dayAssignments = coverage[day.value] || [];
                  const primaryAssignment = dayAssignments.length > 0
                    ? dayAssignments.sort((a, b) => a.priority - b.priority)[0]
                    : null;

                  return (
                    <div
                      key={day.value}
                      className={`rounded-lg border-2 p-1.5 md:p-2 text-center transition-all ${
                        primaryAssignment
                          ? 'bg-white border-indigo-400 shadow-sm'
                          : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <div className={`text-[9px] md:text-[10px] font-bold mb-1 ${
                        primaryAssignment ? 'text-gray-700' : 'text-red-600'
                      }`}>
                        {day.label}
                      </div>
                      {primaryAssignment ? (
                        <>
                          <div className="text-[8px] md:text-[9px] font-semibold text-indigo-700 leading-tight line-clamp-2">
                            {primaryAssignment.specialtyName}
                          </div>
                          {dayAssignments.length > 1 && (
                            <div className="text-[7px] md:text-[8px] text-gray-500 mt-0.5">
                              +{dayAssignments.length - 1} more
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-[8px] md:text-[9px] font-medium text-red-600">
                          Not Set
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {Object.values(getDayCoverage()).some(assignments => assignments.length === 0) && (
                <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-lg p-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] md:text-xs text-amber-800">
                    <strong>Some days are unassigned.</strong> Add more specialty assignments below to cover the entire week.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Day Selector Legend */}
          {specialtyAssignments.length > 0 && (
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Day Selector Guide:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 bg-white border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 bg-amber-50 border-2 border-amber-400 rounded relative">
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 border border-white rounded-full"></div>
                  </div>
                  <span className="text-amber-800">Already Taken</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-6 bg-indigo-600 border-2 border-indigo-700 rounded"></div>
                  <span className="text-indigo-700">Selected</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Specialty Assignments * ({specialtyAssignments.length})
              </label>
              <button
                type="button"
                onClick={addSpecialtyAssignment}
                className="px-3 py-1 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-700 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Specialty
              </button>
            </div>
            <p className="text-[10px] md:text-xs text-gray-600 mb-3 italic">
              💡 <strong>Tip:</strong> Days with a ⚠️ warning are already mapped. You can still select them - priority determines which specialty runs.
            </p>

            {specialtyAssignments.length === 0 ? (
              <div className="text-xs md:text-sm text-gray-500 p-3 md:p-4 border border-gray-200 rounded-lg text-center">
                No specialties assigned. Click "Add Specialty" to add one.
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {specialtyAssignments.map((assignment, index) => {
                  const specialty = specialties.find(s => s.id === assignment.specialtyId);
                  const hasSubspecialties = specialty?.subspecialties && specialty.subspecialties.length > 0;

                  return (
                    <div key={index} className="border border-gray-300 rounded-lg p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Specialty Priority {assignment.priority}
                            </label>
                            <select
                              value={assignment.specialtyId}
                              onChange={(e) => {
                                const selectedSpec = specialties.find(s => s.id === e.target.value);
                                updateSpecialtyAssignment(index, {
                                  specialtyId: e.target.value,
                                  specialtyName: selectedSpec?.name || '',
                                  subspecialtyName: undefined
                                });
                              }}
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select specialty</option>
                              {specialties.map(spec => (
                                <option key={spec.id} value={spec.id}>
                                  {spec.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {hasSubspecialties && (
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Subspecialty (Optional)
                              </label>
                              <select
                                value={assignment.subspecialtyName || ''}
                                onChange={(e) => updateSpecialtyAssignment(index, {
                                  subspecialtyName: e.target.value || undefined
                                })}
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">All {specialty?.name}</option>
                                {specialty?.subspecialties?.map(sub => (
                                  <option key={sub.name} value={sub.name}>
                                    {sub.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Priority
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={assignment.priority}
                              onChange={(e) => updateSpecialtyAssignment(index, {
                                priority: parseInt(e.target.value) || 1
                              })}
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSpecialtyAssignment(index)}
                          className="ml-2 p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove assignment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs md:text-sm font-medium text-gray-600">
                            Days of Week {!assignment.daysOfWeek || assignment.daysOfWeek.length === 0 ? '(All Days)' : ''}
                          </label>

                          {/* Quick Select Buttons */}
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => updateSpecialtyAssignment(index, { daysOfWeek: [1, 2, 3, 4, 5] })}
                              className="px-2 py-1 text-[9px] md:text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                              title="Monday to Friday"
                            >
                              Weekdays
                            </button>
                            <button
                              type="button"
                              onClick={() => updateSpecialtyAssignment(index, { daysOfWeek: [0, 6] })}
                              className="px-2 py-1 text-[9px] md:text-[10px] font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded hover:bg-orange-100 transition-colors"
                              title="Saturday and Sunday"
                            >
                              Weekend
                            </button>
                            <button
                              type="button"
                              onClick={() => updateSpecialtyAssignment(index, { daysOfWeek: undefined })}
                              className="px-2 py-1 text-[9px] md:text-[10px] font-medium bg-gray-50 text-gray-700 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                              title="All days of the week"
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        {/* Mobile: 2 rows layout */}
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 md:gap-2 mb-3">
                          {DAYS_OF_WEEK.map((day) => {
                            const isSelected = assignment.daysOfWeek?.includes(day.value) || false;

                            // Check if this day is taken by other assignments
                            const otherAssignments = specialtyAssignments.filter((a, i) => i !== index);
                            const dayTakenByOthers = otherAssignments.filter(a => {
                              if (!a.daysOfWeek || a.daysOfWeek.length === 0) return true; // "All days" takes everything
                              return a.daysOfWeek.includes(day.value);
                            });
                            const isTakenByOthers = dayTakenByOthers.length > 0;
                            const takenBySpecialty = dayTakenByOthers[0]?.specialtyName;

                            return (
                              <div key={day.value} className="relative">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentDays = assignment.daysOfWeek || [];
                                    const newDays = isSelected
                                      ? currentDays.filter(d => d !== day.value)
                                      : [...currentDays, day.value];
                                    updateSpecialtyAssignment(index, {
                                      daysOfWeek: newDays.length > 0 ? newDays : undefined
                                    });
                                  }}
                                  className={`w-full px-2 py-2 md:py-1.5 text-[11px] md:text-xs font-semibold rounded-md border-2 transition-all active:scale-95 relative ${
                                    isSelected
                                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                                      : isTakenByOthers
                                      ? 'bg-amber-50 text-amber-800 border-amber-400 hover:bg-amber-100'
                                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                  }`}
                                  title={isTakenByOthers ? `Already taken by: ${takenBySpecialty}` : day.fullLabel}
                                >
                                  <span className="block sm:hidden">{day.label}</span>
                                  <span className="hidden sm:block">{day.label}</span>
                                  {isTakenByOthers && !isSelected && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 border border-white rounded-full flex items-center justify-center">
                                      <AlertCircle className="w-2 h-2 text-white" />
                                    </div>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Show warning if any selected days are taken by others */}
                        {(() => {
                          const selectedDays = assignment.daysOfWeek || [];
                          const otherAssignments = specialtyAssignments.filter((a, i) => i !== index);
                          const conflicts = selectedDays.filter(dayNum => {
                            return otherAssignments.some(a => {
                              if (!a.daysOfWeek || a.daysOfWeek.length === 0) return true;
                              return a.daysOfWeek.includes(dayNum);
                            });
                          });

                          if (conflicts.length > 0) {
                            const conflictDayNames = conflicts.map(d => DAYS_OF_WEEK.find(day => day.value === d)?.fullLabel).join(', ');
                            return (
                              <div className="mb-2 flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-lg p-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-[10px] md:text-xs text-amber-800">
                                  <strong>Conflict:</strong> {conflictDayNames} {conflicts.length === 1 ? 'is' : 'are'} already assigned to another specialty. The highest priority specialty will be used.
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })()}

                        <p className="text-[10px] md:text-xs text-gray-500 mb-2 italic">
                          {assignment.daysOfWeek && assignment.daysOfWeek.length > 0
                            ? `Selected: ${assignment.daysOfWeek.length} day${assignment.daysOfWeek.length > 1 ? 's' : ''}`
                            : 'Tap days to create a weekly pattern, or leave blank for all days'
                          }
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <label className="block text-xs md:text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="hidden md:inline">Session Type Preferences (1 = Most Preferred)</span>
                          <span className="md:hidden">Session Preferences</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2">
                          {SESSION_TYPES.map((sessionType) => {
                            const pref = assignment.sessionTypePreferences.find(
                              p => p.sessionType === sessionType.value
                            );
                            return (
                              <div key={sessionType.value} className={`p-2 md:p-2.5 rounded-md border ${sessionType.color}`}>
                                <div className="text-[10px] md:text-[11px] font-bold mb-0.5 md:mb-1">{sessionType.label}</div>
                                <div className="text-[8px] md:text-[9px] text-gray-600 mb-1 leading-tight">{sessionType.time}</div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-gray-500 font-medium">Priority:</span>
                                  <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={pref?.priority || 1}
                                    onChange={(e) => updateSessionTypePriority(
                                      index,
                                      sessionType.value as SessionType,
                                      parseInt(e.target.value) || 1
                                    )}
                                    className="flex-1 px-1.5 py-1 text-xs font-semibold border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1-5"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 md:gap-3 pt-3 md:pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 md:py-2 border border-gray-300 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 md:py-2 bg-cyan-600 text-white text-sm md:text-base rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span className="hidden md:inline">{configuration ? 'Update Configuration' : 'Save Configuration'}</span>
              <span className="md:hidden">{configuration ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Validation Error</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-6">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
