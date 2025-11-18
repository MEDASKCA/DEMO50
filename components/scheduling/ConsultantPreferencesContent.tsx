'use client';

import React, { useState, useEffect } from 'react';
import { UserCircle, Calendar, Clock, Users2, Save, Plus, X, Loader2, Filter } from 'lucide-react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Surgeon } from '@/lib/types/surgeonTypes';

interface ConsultantPreference {
  id: string; // Firestore document ID
  surgeonId: string;
  name: string;
  specialty: string;
  subspecialty?: string;
  waitingPatients: number;
  preferredDays: string[]; // Maps to preferredTheatreDays
  unavailableDays: string[];
  clinicDays: string[];
  preferredSessionTypes: string[];
  minSessionsPerWeek?: number;
  maxSessionsPerWeek?: number;
  avgProceduresPerSession?: number;
  weekendAvailability?: boolean;
  consecutiveDaysPreference?: boolean;
  annualLeaveWeeks?: number;
  studyLeaveWeeks?: number;
  notes?: string;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SESSION_TYPES = ['AM', 'PM', 'FULL', 'EXTENDED'];

export default function ConsultantPreferencesContent() {
  const [consultants, setConsultants] = useState<ConsultantPreference[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantPreference | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  useEffect(() => {
    // Load consultant preferences from Firebase
    const loadConsultants = async () => {
      try {
        setLoading(true);
        const preferencesSnap = await getDocs(collection(db, 'consultantPreferences'));
        const preferences: ConsultantPreference[] = [];

        preferencesSnap.forEach(doc => {
          const data = doc.data();
          preferences.push({
            id: doc.id,
            surgeonId: data.surgeonId,
            name: data.surgeonName,
            specialty: data.specialty,
            subspecialty: data.subspecialty,
            waitingPatients: data.waitingListCount || 0,
            preferredDays: data.preferredTheatreDays || [],
            unavailableDays: data.unavailableDays || [],
            clinicDays: data.clinicDays || [],
            preferredSessionTypes: data.preferredSessionTypes || [],
            minSessionsPerWeek: data.minSessionsPerWeek,
            maxSessionsPerWeek: data.maxSessionsPerWeek,
            avgProceduresPerSession: data.avgProceduresPerSession,
            weekendAvailability: data.weekendAvailability,
            consecutiveDaysPreference: data.consecutiveDaysPreference,
            annualLeaveWeeks: data.annualLeaveWeeks,
            studyLeaveWeeks: data.studyLeaveWeeks,
            notes: data.notes
          });
        });

        // Sort by name
        const sortedPreferences = preferences.sort((a, b) => a.name.localeCompare(b.name));
        setConsultants(sortedPreferences);
      } catch (error) {
        console.error('Error loading consultant preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConsultants();
  }, []);

  const handleEditClick = (consultant: ConsultantPreference) => {
    setSelectedConsultant({ ...consultant });
    setShowEditModal(true);
  };

  const handleSavePreferences = async () => {
    if (!selectedConsultant) return;

    try {
      // Update in Firebase
      const docRef = doc(db, 'consultantPreferences', selectedConsultant.id);
      await updateDoc(docRef, {
        preferredTheatreDays: selectedConsultant.preferredDays,
        unavailableDays: selectedConsultant.unavailableDays,
        clinicDays: selectedConsultant.clinicDays,
        preferredSessionTypes: selectedConsultant.preferredSessionTypes,
        waitingListCount: selectedConsultant.waitingPatients,
        minSessionsPerWeek: selectedConsultant.minSessionsPerWeek,
        maxSessionsPerWeek: selectedConsultant.maxSessionsPerWeek,
        weekendAvailability: selectedConsultant.weekendAvailability,
        consecutiveDaysPreference: selectedConsultant.consecutiveDaysPreference,
        notes: selectedConsultant.notes,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setConsultants(prev =>
        prev.map(c => c.id === selectedConsultant.id ? selectedConsultant : c)
      );
      setShowEditModal(false);
      setSelectedConsultant(null);
    } catch (error) {
      console.error('Error saving consultant preferences:', error);
      alert('Failed to save preferences. Please try again.');
    }
  };

  const toggleDay = (dayType: 'preferred' | 'clinic', day: string) => {
    if (!selectedConsultant) return;

    const field = dayType === 'preferred' ? 'preferredDays' : 'clinicDays';
    const currentDays = selectedConsultant[field];

    setSelectedConsultant({
      ...selectedConsultant,
      [field]: currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day]
    });
  };

  const toggleSessionType = (sessionType: string) => {
    if (!selectedConsultant) return;

    const current = selectedConsultant.preferredSessionTypes;
    setSelectedConsultant({
      ...selectedConsultant,
      preferredSessionTypes: current.includes(sessionType)
        ? current.filter(s => s !== sessionType)
        : [...current, sessionType]
    });
  };

  // Get unique specialties for filter
  const specialties = Array.from(new Set(consultants.map(c => c.specialty))).sort();

  // Filter consultants by specialty
  const filteredConsultants = selectedSpecialty === 'all'
    ? consultants
    : consultants.filter(c => c.specialty === selectedSpecialty);

  return (
    <div className="space-y-2 md:space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
          <div className="flex-1">
            <h2 className="text-base md:text-xl font-bold text-gray-900">Consultant Preferences</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
              Manage consultant availability, preferences, and patient waiting lists
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold text-sm">
            <Plus className="w-4 h-4" />
            Add Consultant
          </button>
        </div>

        {/* Filter by Specialty */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="flex-1 md:flex-none md:w-64 px-3 py-2 border border-gray-300 rounded-lg text-xs md:text-sm bg-white font-medium focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Specialties ({consultants.length})</option>
            {specialties.map(specialty => {
              const count = consultants.filter(c => c.specialty === specialty).length;
              return (
                <option key={specialty} value={specialty}>
                  {specialty} ({count})
                </option>
              );
            })}
          </select>
          {selectedSpecialty !== 'all' && (
            <button
              onClick={() => setSelectedSpecialty('all')}
              className="px-3 py-2 text-xs md:text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-200 rounded-lg p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-bold text-teal-900 mb-1.5 md:mb-2">How It Works</h3>
        <p className="text-[10px] md:text-xs text-teal-800 mb-1.5 md:mb-2 leading-tight">
          The Smart Theatre Allocation System uses consultant preferences to optimize theatre scheduling:
        </p>
        <ul className="text-[10px] md:text-xs text-teal-700 space-y-0.5 md:space-y-1 leading-tight">
          <li>✅ Prioritizes consultants with larger patient waiting lists</li>
          <li>✅ Respects clinic days and unavailable periods</li>
          <li>✅ Considers preferred days and session types</li>
          <li>✅ Balances workload across the surgical team</li>
        </ul>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
        </div>
      )}

      {/* Consultants Grid */}
      {!loading && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredConsultants.map((consultant) => (
          <div
            key={consultant.id}
            className="bg-white rounded-lg border-2 border-gray-200 hover:border-cyan-300 transition-all overflow-hidden"
          >
            {/* Consultant Header */}
            <div className="bg-gradient-to-r from-cyan-100 to-teal-100 p-3 md:p-4 border-b border-cyan-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500 rounded-full flex items-center justify-center text-teal-900 font-bold text-sm md:text-lg flex-shrink-0">
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">{consultant.name}</h3>
                    <p className="text-xs md:text-sm text-gray-700 truncate">{consultant.specialty}</p>
                    {consultant.subspecialty && (
                      <p className="text-[10px] md:text-xs text-gray-600 truncate">{consultant.subspecialty}</p>
                    )}
                  </div>
                </div>
                <div className="bg-cyan-500 text-white px-2 md:px-3 py-1 rounded-full flex-shrink-0">
                  <div className="text-base md:text-lg font-bold leading-tight">{consultant.waitingPatients}</div>
                  <div className="text-[8px] md:text-[9px] font-semibold">WAITING</div>
                </div>
              </div>
            </div>

            {/* Consultant Details */}
            <div className="p-3 md:p-4 space-y-2.5 md:space-y-3">
              {/* Preferred Days */}
              <div>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-600 flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700">Preferred Theatre Days</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {consultant.preferredDays.length > 0 ? (
                    consultant.preferredDays.map(day => (
                      <span key={day} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-cyan-100 text-cyan-800 text-[10px] md:text-xs rounded font-medium">
                        {day.substring(0, 3)}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] md:text-xs text-gray-400">No preferences set</span>
                  )}
                </div>
              </div>

              {/* Clinic Days */}
              <div>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <UserCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700">Clinic Days (Unavailable)</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {consultant.clinicDays.length > 0 ? (
                    consultant.clinicDays.map(day => (
                      <span key={day} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-orange-100 text-orange-800 text-[10px] md:text-xs rounded font-medium">
                        {day.substring(0, 3)}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] md:text-xs text-gray-400">No clinic days set</span>
                  )}
                </div>
              </div>

              {/* Preferred Session Types */}
              <div>
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700">Preferred Session Types</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {consultant.preferredSessionTypes.map(session => (
                    <span key={session} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-purple-100 text-purple-800 text-[10px] md:text-xs rounded font-medium">
                      {session}
                    </span>
                  ))}
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEditClick(consultant)}
                className="w-full mt-2 px-3 md:px-4 py-1.5 md:py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold text-xs md:text-sm"
              >
                Edit Preferences
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedConsultant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-cyan-500 text-white px-4 md:px-6 py-3 md:py-4 rounded-t-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-xl font-bold truncate">{selectedConsultant.name}</h2>
                  <p className="text-xs md:text-sm text-teal-800 truncate">{selectedConsultant.specialty}</p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-teal-900 hover:bg-teal-900/20 rounded-full p-1.5 md:p-2 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Waiting Patients */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Waiting Patients
                </label>
                <input
                  type="number"
                  value={selectedConsultant.waitingPatients}
                  onChange={(e) => setSelectedConsultant({
                    ...selectedConsultant,
                    waitingPatients: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 md:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none text-sm"
                />
              </div>

              {/* Preferred Days */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Preferred Theatre Days
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay('preferred', day)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedConsultant.preferredDays.includes(day)
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinic Days */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Clinic Days (Unavailable for Theatre)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay('clinic', day)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedConsultant.clinicDays.includes(day)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Session Types */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Preferred Session Types
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {SESSION_TYPES.map(session => (
                    <button
                      key={session}
                      onClick={() => toggleSessionType(session)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedConsultant.preferredSessionTypes.includes(session)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {session}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold text-sm md:text-base"
                >
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
