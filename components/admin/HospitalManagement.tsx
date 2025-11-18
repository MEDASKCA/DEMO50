'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { useHospital, Trust, Hospital } from '@/lib/hospitalContext';
import { Building2, Plus, Edit2, Trash2, Save, X, Building, AlertCircle } from 'lucide-react';

export default function HospitalManagement() {
  const { trusts, hospitals, refreshHospitals } = useHospital();
  const [loading, setLoading] = useState(false);
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [editingTrust, setEditingTrust] = useState<Trust | null>(null);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  const [trustName, setTrustName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [selectedTrustId, setSelectedTrustId] = useState('');

  const openTrustModal = (trust?: Trust) => {
    if (trust) {
      setEditingTrust(trust);
      setTrustName(trust.name);
    } else {
      setEditingTrust(null);
      setTrustName('');
    }
    setShowTrustModal(true);
  };

  const openHospitalModal = (hospital?: Hospital) => {
    if (hospital) {
      setEditingHospital(hospital);
      setHospitalName(hospital.name);
      setSelectedTrustId(hospital.trustId);
    } else {
      setEditingHospital(null);
      setHospitalName('');
      setSelectedTrustId('');
    }
    setShowHospitalModal(true);
  };

  const saveTrust = async () => {
    if (!trustName.trim()) return;

    setLoading(true);
    try {
      const trustId = editingTrust?.id || trustName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const trustRef = doc(db, 'trusts', trustId);

      await setDoc(trustRef, {
        name: trustName.trim(),
        createdAt: editingTrust?.createdAt || new Date()
      });

      await refreshHospitals();
      setShowTrustModal(false);
      setTrustName('');
      setEditingTrust(null);
    } catch (error) {
      console.error('Error saving trust:', error);
      alert('Failed to save trust');
    } finally {
      setLoading(false);
    }
  };

  const saveHospital = async () => {
    if (!hospitalName.trim() || !selectedTrustId) return;

    setLoading(true);
    try {
      const trust = trusts.find(t => t.id === selectedTrustId);
      if (!trust) return;

      const hospitalId = editingHospital?.id ||
        `${selectedTrustId}-${hospitalName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const hospitalRef = doc(db, 'hospitals', hospitalId);

      await setDoc(hospitalRef, {
        name: hospitalName.trim(),
        trustId: selectedTrustId,
        trustName: trust.name,
        createdAt: editingHospital?.createdAt || new Date()
      });

      await refreshHospitals();
      setShowHospitalModal(false);
      setHospitalName('');
      setSelectedTrustId('');
      setEditingHospital(null);
    } catch (error) {
      console.error('Error saving hospital:', error);
      alert('Failed to save hospital');
    } finally {
      setLoading(false);
    }
  };

  const deleteHospital = async (hospital: Hospital) => {
    // Check if hospital has any data
    const hasData = await checkHospitalData(hospital.id);

    if (hasData) {
      const confirmMsg = `WARNING: "${hospital.name}" has existing data (specialties, theatres, surgeons).\n\n` +
        `Deleting this hospital will NOT delete the data, but it will become inaccessible.\n\n` +
        `Are you sure you want to delete this hospital?`;

      if (!confirm(confirmMsg)) return;
    } else {
      if (!confirm(`Delete "${hospital.name}"?`)) return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'hospitals', hospital.id));
      await refreshHospitals();
    } catch (error) {
      console.error('Error deleting hospital:', error);
      alert('Failed to delete hospital');
    } finally {
      setLoading(false);
    }
  };

  const deleteTrust = async (trust: Trust) => {
    const trustHospitals = hospitals.filter(h => h.trustId === trust.id);

    if (trustHospitals.length > 0) {
      alert(`Cannot delete trust "${trust.name}" because it has ${trustHospitals.length} hospital(s).\n\nPlease delete or reassign all hospitals first.`);
      return;
    }

    if (!confirm(`Delete trust "${trust.name}"?`)) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'trusts', trust.id));
      await refreshHospitals();
    } catch (error) {
      console.error('Error deleting trust:', error);
      alert('Failed to delete trust');
    } finally {
      setLoading(false);
    }
  };

  const checkHospitalData = async (hospitalId: string): Promise<boolean> => {
    try {
      // Check specialties
      const specialtiesQuery = query(collection(db, 'specialties'), where('hospitalId', '==', hospitalId));
      const specialtiesSnapshot = await getDocs(specialtiesQuery);
      if (!specialtiesSnapshot.empty) return true;

      // Check theatre units
      const unitsQuery = query(collection(db, 'theatreUnits'), where('hospitalId', '==', hospitalId));
      const unitsSnapshot = await getDocs(unitsQuery);
      if (!unitsSnapshot.empty) return true;

      // Check surgeons
      const surgeonsQuery = query(collection(db, 'surgeons'), where('hospitalId', '==', hospitalId));
      const surgeonsSnapshot = await getDocs(surgeonsQuery);
      if (!surgeonsSnapshot.empty) return true;

      return false;
    } catch (error) {
      console.error('Error checking hospital data:', error);
      return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hospital & Trust Management</h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage NHS Trusts and their hospitals
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openTrustModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Trust
              </button>
              <button
                onClick={() => openHospitalModal()}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Hospital
              </button>
            </div>
          </div>
        </div>

        {/* Trusts List */}
        <div className="p-6">
          {trusts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No NHS Trusts found. Create one to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trusts.map((trust) => {
                const trustHospitals = hospitals.filter(h => h.trustId === trust.id);

                return (
                  <div key={trust.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Trust Header */}
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{trust.name}</h3>
                          <p className="text-xs text-gray-500">
                            {trustHospitals.length} {trustHospitals.length === 1 ? 'hospital' : 'hospitals'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openTrustModal(trust)}
                          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTrust(trust)}
                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                          disabled={trustHospitals.length > 0}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Hospitals under this trust */}
                    <div className="p-4">
                      {trustHospitals.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No hospitals in this trust</p>
                      ) : (
                        <div className="space-y-2">
                          {trustHospitals.map((hospital) => (
                            <div
                              key={hospital.id}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Building2 className="w-4 h-4 text-cyan-600" />
                                <div>
                                  <div className="font-medium text-gray-900">{hospital.name}</div>
                                  <div className="text-xs text-gray-500">ID: {hospital.id}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openHospitalModal(hospital)}
                                  className="px-3 py-1.5 text-sm text-cyan-600 hover:bg-cyan-50 rounded flex items-center gap-1"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteHospital(hospital)}
                                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Trust Modal */}
      {showTrustModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTrust ? 'Edit Trust' : 'Add New Trust'}
              </h3>
              <button
                onClick={() => setShowTrustModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Name *
              </label>
              <input
                type="text"
                value={trustName}
                onChange={(e) => setTrustName(e.target.value)}
                placeholder="e.g., Barts Health NHS Trust"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowTrustModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveTrust}
                disabled={!trustName.trim() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingTrust ? 'Update' : 'Create'} Trust
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Modal */}
      {showHospitalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
              </h3>
              <button
                onClick={() => setShowHospitalModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NHS Trust *
                </label>
                <select
                  value={selectedTrustId}
                  onChange={(e) => setSelectedTrustId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a trust</option>
                  {trusts.map((trust) => (
                    <option key={trust.id} value={trust.id}>
                      {trust.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="e.g., Royal London Hospital"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    The hospital will be created under the selected NHS Trust. You can configure specialties, theatres, and staff for each hospital independently.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowHospitalModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveHospital}
                disabled={!hospitalName.trim() || !selectedTrustId || loading}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingHospital ? 'Update' : 'Create'} Hospital
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
