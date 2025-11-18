'use client';

import React, { useState, useEffect } from 'react';
import ProcedureExperienceSelector from './ProcedureExperienceSelector';
import EquipmentExperienceSelector from './EquipmentExperienceSelector';
import EPRExperienceSuggestions from './EPRExperienceSuggestions';
import RemovalRequestModal from './RemovalRequestModal';
import {
  StaffProcedureExperience,
  StaffEquipmentExperience,
  ExperienceUpdateSuggestion,
  RemovalRequest
} from '@/lib/surgicalCompetencyData';
import { competencyService } from '@/lib/services/competencyService';

interface CompetencyManagementProps {
  staffId: string;
  staffName: string;
  staffRole: string;
  primarySpecialty?: 'Orthopaedics' | 'General Surgery' | 'All';
}

export default function CompetencyManagement({
  staffId,
  staffName,
  staffRole,
  primarySpecialty = 'All'
}: CompetencyManagementProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'procedures' | 'equipment'>('suggestions');
  const [procedures, setProcedures] = useState<StaffProcedureExperience[]>([]);
  const [equipment, setEquipment] = useState<StaffEquipmentExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Removal request modal state
  const [removalModal, setRemovalModal] = useState<{
    isOpen: boolean;
    itemType: 'procedure' | 'equipment';
    itemName: string;
    itemId: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, [staffId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [proceduresData, equipmentData] = await Promise.all([
        competencyService.loadStaffProcedureExperience(staffId),
        competencyService.loadStaffEquipmentExperience(staffId)
      ]);

      setProcedures(proceduresData);
      setEquipment(equipmentData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load your competency data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceduresUpdate = (updated: StaffProcedureExperience[]) => {
    setProcedures(updated);
    setHasUnsavedChanges(true);
  };

  const handleEquipmentUpdate = (updated: StaffEquipmentExperience[]) => {
    setEquipment(updated);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        competencyService.saveStaffProcedureExperience(staffId, procedures),
        competencyService.saveStaffEquipmentExperience(staffId, equipment)
      ]);

      setHasUnsavedChanges(false);
      alert('✅ Your experience has been saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('❌ Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: ExperienceUpdateSuggestion) => {
    // Update procedures with the suggested level
    const updated = procedures.map(p =>
      p.opcs4Codes.includes(suggestion.opcs4Code)
        ? { ...p, experienceLevel: (suggestion.suggestedLevel || p.experienceLevel) as 0 | 1 | 2 | 3 | 4 | 5 }
        : p
    );

    // If procedure doesn't exist, add it
    const exists = procedures.some(p => p.opcs4Codes.includes(suggestion.opcs4Code));
    if (!exists && suggestion.suggestedLevel !== undefined) {
      updated.push({
        procedureName: suggestion.procedureName,
        opcs4Codes: [suggestion.opcs4Code],
        experienceLevel: suggestion.suggestedLevel as 0 | 1 | 2 | 3 | 4 | 5,
        specialty: 'Various', // Will be categorized later
        subcategory: 'Various'
      });
    }

    setProcedures(updated);
    setHasUnsavedChanges(true);
  };

  const handleDeclineSuggestion = (suggestion: ExperienceUpdateSuggestion) => {
    // Just dismiss - no changes needed
    console.log('Declined suggestion for', suggestion.procedureName);
  };

  const handleRemovalRequest = async (request: Omit<RemovalRequest, 'id' | 'requestDate' | 'status'>) => {
    try {
      await competencyService.submitRemovalRequest(request);
      alert('✅ Removal request submitted successfully. An administrator will review it.');
      setRemovalModal(null);
    } catch (error) {
      console.error('Error submitting removal request:', error);
      alert('❌ Failed to submit removal request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your competency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 px-3 md:px-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Surgical Competency Profile</h1>
        <p className="text-sm text-gray-600">
          Manage your procedure experience and equipment proficiency.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4 overflow-x-auto px-3 md:px-4">
        <nav className="-mb-px flex space-x-4 md:space-x-6 min-w-min">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`
              py-2 px-3 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap
              ${activeTab === 'suggestions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab('procedures')}
            className={`
              py-2 px-3 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap
              ${activeTab === 'procedures'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Procedures ({procedures.length})
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`
              py-2 px-3 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap
              ${activeTab === 'equipment'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Equipment ({equipment.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mb-4 px-3 md:px-4">
        {activeTab === 'suggestions' && (
          <EPRExperienceSuggestions
            staffId={staffId}
            onAccept={handleAcceptSuggestion}
            onDecline={handleDeclineSuggestion}
          />
        )}

        {activeTab === 'procedures' && (
          <ProcedureExperienceSelector
            selectedProcedures={procedures}
            onUpdate={handleProceduresUpdate}
            userRole={staffRole}
          />
        )}

        {activeTab === 'equipment' && (
          <EquipmentExperienceSelector
            selectedEquipment={equipment}
            onUpdate={handleEquipmentUpdate}
            specialty={primarySpecialty}
          />
        )}
      </div>

      {/* Save Button (sticky at bottom) */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-40">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium text-gray-900">Unsaved changes</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <button
                onClick={loadData}
                disabled={saving}
                className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 md:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>Save</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Removal Request Modal */}
      {removalModal && (
        <RemovalRequestModal
          isOpen={removalModal.isOpen}
          onClose={() => setRemovalModal(null)}
          itemType={removalModal.itemType}
          itemName={removalModal.itemName}
          itemId={removalModal.itemId}
          onSubmit={handleRemovalRequest}
          userRole={staffRole}
          userName={staffName}
        />
      )}
    </div>
  );
}
