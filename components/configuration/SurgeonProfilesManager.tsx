'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Surgeon } from '@/lib/types/surgeonTypes';
import {
  calculateSpecialtyCoverage,
  generateMissingSurgeons,
  generateAllSurgeons,
  getExistingSurgeonNames
} from '@/lib/services/surgeonGenerationService';
import { Loader2, RefreshCw, Plus, Edit2, Trash2, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function SurgeonProfilesManager() {
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeSpecialtyTab, setActiveSpecialtyTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [coverage, setCoverage] = useState<any[]>([]);
  const [loadingCoverage, setLoadingCoverage] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'add'>('list');
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual entry form state
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formTitle, setFormTitle] = useState<'Mr' | 'Ms' | 'Miss' | 'Dr' | 'Prof'>('Mr');
  const [formSpecialtyId, setFormSpecialtyId] = useState('');
  const [formPrimarySubspecialty, setFormPrimarySubspecialty] = useState('');
  const [formEmploymentType, setFormEmploymentType] = useState<'Full-time' | 'Part-time' | 'Job-share' | 'Locum'>('Full-time');
  const [formFTE, setFormFTE] = useState('1.0');
  const [formMaxLists, setFormMaxLists] = useState('4');
  const [formAnnualLeave, setFormAnnualLeave] = useState('27');
  const [formGeneralCompetencies, setFormGeneralCompetencies] = useState('');
  const [saving, setSaving] = useState(false);
  const [configuredSpecialties, setConfiguredSpecialties] = useState<any[]>([]);

  useEffect(() => {
    loadSurgeons();
    loadCoverage();
    loadConfiguredSpecialties();
  }, []);

  async function loadSurgeons() {
    try {
      setLoading(true);
      const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
      const surgeonsData: Surgeon[] = [];

      surgeonsSnap.forEach(doc => {
        surgeonsData.push({
          id: doc.id,
          ...doc.data()
        } as Surgeon);
      });

      // Sort by lastName
      const sorted = surgeonsData.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setSurgeons(sorted);

      // Extract unique specialties for tabs
      const uniqueSpecialties = Array.from(new Set(sorted.map(s => s.specialtyName))).sort();
      setSpecialties(uniqueSpecialties);
    } catch (error) {
      console.error('Error loading surgeons:', error);
      alert('Error loading surgeons. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function loadCoverage() {
    try {
      setLoadingCoverage(true);
      const coverageData = await calculateSpecialtyCoverage();
      setCoverage(coverageData);
    } catch (error) {
      console.error('Error loading coverage:', error);
    } finally {
      setLoadingCoverage(false);
    }
  }

  async function loadConfiguredSpecialties() {
    try {
      const specialtiesSnap = await getDocs(collection(db, 'specialties'));
      const specs: any[] = [];
      specialtiesSnap.forEach(doc => {
        specs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setConfiguredSpecialties(specs);
    } catch (error) {
      console.error('Error loading configured specialties:', error);
    }
  }

  function resetForm() {
    setFormFirstName('');
    setFormLastName('');
    setFormTitle('Mr');
    setFormSpecialtyId('');
    setFormPrimarySubspecialty('');
    setFormEmploymentType('Full-time');
    setFormFTE('1.0');
    setFormMaxLists('4');
    setFormAnnualLeave('27');
    setFormGeneralCompetencies('');
  }

  async function handleManualAdd() {
    if (!formFirstName.trim() || !formLastName.trim() || !formSpecialtyId) {
      alert('Please fill in Name and Specialty fields');
      return;
    }

    try {
      setSaving(true);

      const selectedSpecialty = configuredSpecialties.find(s => s.id === formSpecialtyId);
      if (!selectedSpecialty) {
        alert('Invalid specialty selected');
        return;
      }

      const initials = `${formFirstName[0]}${formLastName[0]}`.toUpperCase();
      const generalComps = formGeneralCompetencies.trim()
        ? formGeneralCompetencies.split(',').map(c => c.trim()).filter(c => c)
        : formPrimarySubspecialty ? [`General ${selectedSpecialty.name}`] : undefined;

      const newSurgeon: Omit<Surgeon, 'id'> = {
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        title: formTitle,
        initials,
        specialtyId: formSpecialtyId,
        specialtyName: selectedSpecialty.name,
        primarySubspecialty: formPrimarySubspecialty.trim() || undefined,
        generalCompetencies: generalComps,
        employmentType: formEmploymentType,
        fte: parseFloat(formFTE),
        maxListsPerWeek: parseInt(formMaxLists),
        annualLeaveDays: parseInt(formAnnualLeave),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'surgeons'), newSurgeon);
      alert(`✅ Added ${formTitle} ${formFirstName} ${formLastName} successfully!`);

      resetForm();
      setShowAddForm(false);
      await loadSurgeons();
      await loadCoverage();
    } catch (error) {
      console.error('Error adding surgeon:', error);
      alert('❌ Error adding surgeon. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerateAll() {
    if (!confirm('Generate ALL surgeons based on configured specialties?\n\nThis will only work if no surgeons exist yet.')) {
      return;
    }

    try {
      setGenerating(true);
      const generated = await generateAllSurgeons();
      alert(`✅ Generated ${generated} surgeon profiles successfully!`);
      await loadSurgeons();
      await loadCoverage();
    } catch (error: any) {
      alert(`❌ ${error.message}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleGenerateMissing() {
    if (!confirm('Generate surgeons for specialties with gaps?\n\nThis will only add missing surgeons, not replace existing ones.')) {
      return;
    }

    try {
      setGenerating(true);
      const generated = await generateMissingSurgeons();

      if (generated === 0) {
        alert('✅ All specialties have adequate surgeon coverage! No gaps found.');
      } else {
        alert(`✅ Generated ${generated} new surgeon profiles successfully!`);
      }

      await loadSurgeons();
      await loadCoverage();
    } catch (error: any) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(surgeon: Surgeon) {
    if (!surgeon.id) return;

    if (!confirm(`Delete ${surgeon.title} ${surgeon.firstName} ${surgeon.lastName}?\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'surgeons', surgeon.id));
      await loadSurgeons();
      await loadCoverage();
    } catch (error) {
      console.error('Error deleting surgeon:', error);
      alert('Error deleting surgeon. Please try again.');
    }
  }

  // Filter surgeons by active tab and search
  const filteredSurgeons = surgeons.filter(surgeon => {
    const matchesSpecialty = activeSpecialtyTab === 'all' || surgeon.specialtyName === activeSpecialtyTab;
    const matchesSearch = searchTerm === '' ||
      `${surgeon.firstName} ${surgeon.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgeon.primarySubspecialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgeon.generalCompetencies?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  // Group surgeons by subspecialty within the filtered list
  const surgeonsBySubspecialty: Record<string, Surgeon[]> = {};
  filteredSurgeons.forEach(surgeon => {
    const key = surgeon.primarySubspecialty || 'General';
    if (!surgeonsBySubspecialty[key]) {
      surgeonsBySubspecialty[key] = [];
    }
    surgeonsBySubspecialty[key].push(surgeon);
  });

  // Calculate totals
  const totalSurgeons = surgeons.length;
  const fullTimeEquivalent = surgeons.reduce((sum, s) => sum + s.fte, 0).toFixed(1);
  const gapsCount = coverage.filter(c => c.gap > 0).length;

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              👨‍⚕️ Surgeon Profiles
            </h2>
            <p className="text-blue-100 mt-1">
              {showAddForm ? 'Manually add real-life consultant surgeons for pilot' : 'Auto-generate demo data or manage existing surgeons'}
            </p>
          </div>
          <div className="flex gap-2">
            {!showAddForm ? (
              <>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Real Surgeon</span>
                </button>
                <button
                  onClick={handleGenerateMissing}
                  disabled={generating || loading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  <span className="font-medium">Generate Missing</span>
                </button>
                <button
                  onClick={handleGenerateAll}
                  disabled={generating || loading || surgeons.length > 0}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span className="font-medium">Generate All (Demo)</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <span className="font-medium">← Back to List</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{totalSurgeons}</div>
            <div className="text-sm text-blue-100">Total Surgeons</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{fullTimeEquivalent}</div>
            <div className="text-sm text-blue-100">FTE (Full-Time Equivalent)</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold flex items-center gap-2">
              {gapsCount}
              {gapsCount > 0 ? <AlertCircle className="w-5 h-5 text-yellow-300" /> : <CheckCircle className="w-5 h-5 text-green-300" />}
            </div>
            <div className="text-sm text-blue-100">Specialty Gaps</div>
          </div>
        </div>
      </div>

      {/* Coverage Report */}
      {loadingCoverage ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">Loading coverage report...</p>
        </div>
      ) : coverage.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Coverage Report</h3>
            <p className="text-xs text-gray-600 mt-0.5">Surgeons per specialty/subspecialty</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {coverage.map((item, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-3 ${
                    item.gap > 0 ? 'border-red-300 bg-red-50' :
                    item.gap < 0 ? 'border-blue-300 bg-blue-50' :
                    'border-green-300 bg-green-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">
                        {item.specialtyName}
                      </div>
                      {item.subspecialtyName && (
                        <div className="text-xs text-gray-600">{item.subspecialtyName}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {item.existingCount}/{item.requiredCount}
                      </div>
                      {item.gap !== 0 && (
                        <div className={`text-xs font-medium ${item.gap > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          {item.gap > 0 ? `Need ${item.gap}` : `${Math.abs(item.gap)} extra`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="text-lg font-semibold text-gray-900">Add Real Surgeon (Pilot Data)</h3>
            <p className="text-sm text-gray-600 mt-1">Manually enter consultant surgeon details for live pilot deployment</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Name and Title Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <select
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={formFirstName}
                  onChange={(e) => setFormFirstName(e.target.value)}
                  placeholder="e.g., James"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={formLastName}
                  onChange={(e) => setFormLastName(e.target.value)}
                  placeholder="e.g., Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Specialty and Subspecialty Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
                <select
                  value={formSpecialtyId}
                  onChange={(e) => setFormSpecialtyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select specialty...</option>
                  {configuredSpecialties.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Subspecialty</label>
                <input
                  type="text"
                  value={formPrimarySubspecialty}
                  onChange={(e) => setFormPrimarySubspecialty(e.target.value)}
                  placeholder="e.g., Foot & Ankle, Colorectal, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank for general practice</p>
              </div>
            </div>

            {/* General Competencies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">General Competencies</label>
              <textarea
                value={formGeneralCompetencies}
                onChange={(e) => setFormGeneralCompetencies(e.target.value)}
                placeholder="e.g., General Trauma Orthopaedics, Emergency Surgery (comma-separated)"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">What else can this surgeon do? Leave blank if subspecialty covers all</p>
            </div>

            {/* Employment Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select
                  value={formEmploymentType}
                  onChange={(e) => {
                    const type = e.target.value as any;
                    setFormEmploymentType(type);
                    // Auto-adjust FTE and lists
                    if (type === 'Full-time') {
                      setFormFTE('1.0');
                      setFormMaxLists('4');
                    } else if (type === 'Part-time' || type === 'Job-share') {
                      setFormFTE('0.5');
                      setFormMaxLists('2');
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Job-share">Job-share</option>
                  <option value="Locum">Locum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FTE</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1.0"
                  value={formFTE}
                  onChange={(e) => setFormFTE(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">0.5 = part-time, 1.0 = full-time</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lists/Week</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formMaxLists}
                  onChange={(e) => setFormMaxLists(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typically 2-5</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Leave (Days)</label>
                <input
                  type="number"
                  min="20"
                  max="35"
                  value={formAnnualLeave}
                  onChange={(e) => setFormAnnualLeave(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typically 25-30</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleManualAdd}
                disabled={saving || !formFirstName.trim() || !formLastName.trim() || !formSpecialtyId}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Save Surgeon</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Specialty Tabs */}
      {!showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex min-w-full">
              <button
                onClick={() => setActiveSpecialtyTab('all')}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSpecialtyTab === 'all'
                    ? 'text-blue-700 border-blue-700 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-blue-700 hover:bg-gray-50'
                }`}
              >
                All Specialties ({surgeons.length})
              </button>
              {specialties.map(specialty => {
                const count = surgeons.filter(s => s.specialtyName === specialty).length;
                return (
                  <button
                    key={specialty}
                    onClick={() => setActiveSpecialtyTab(specialty)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeSpecialtyTab === specialty
                        ? 'text-blue-700 border-blue-700 bg-blue-50'
                        : 'text-gray-600 border-transparent hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    {specialty} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search within active tab */}
          <div className="p-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, subspecialty, or competency..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Surgeons List */}
      {!showAddForm && (
        <>
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
              <p className="text-sm text-gray-600">Loading surgeons...</p>
            </div>
          ) : filteredSurgeons.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Surgeons Found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {surgeons.length === 0
                  ? 'Click "Generate All" to auto-generate surgeon profiles based on your configured specialties.'
                  : 'No surgeons match your search criteria.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Group by Subspecialty */}
              {Object.entries(surgeonsBySubspecialty)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([subspecialty, subspecialtySurgeons]) => (
                  <div key={subspecialty} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">{subspecialty}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{subspecialtySurgeons.length} surgeon{subspecialtySurgeons.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Primary Expertise</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Can Also Do</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Employment</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Lists/Wk</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {subspecialtySurgeons.map((surgeon) => (
                            <tr key={surgeon.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">
                                <div className="font-medium text-gray-900">
                                  {surgeon.title} {surgeon.firstName} {surgeon.lastName}
                                </div>
                                <div className="text-xs text-gray-500">{surgeon.initials}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-sm font-medium text-blue-700">
                                  {surgeon.primarySubspecialty || 'General Practice'}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {surgeon.generalCompetencies && surgeon.generalCompetencies.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {surgeon.generalCompetencies.map((comp, idx) => (
                                      <span key={idx} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                        {comp}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  surgeon.employmentType === 'Full-time' ? 'bg-green-100 text-green-800' :
                                  surgeon.employmentType === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                                  surgeon.employmentType === 'Job-share' ? 'bg-purple-100 text-purple-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {surgeon.employmentType}
                                </span>
                                <div className="text-xs text-gray-500 mt-1">{surgeon.fte} FTE</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="text-sm font-medium text-gray-900">{surgeon.maxListsPerWeek}</div>
                                <div className="text-xs text-gray-500">{surgeon.annualLeaveDays} days leave</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleDelete(surgeon)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete"
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
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
