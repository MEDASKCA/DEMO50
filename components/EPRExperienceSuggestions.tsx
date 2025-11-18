'use client';

import React, { useState, useEffect } from 'react';
import {
  ExperienceUpdateSuggestion,
  PROCEDURE_EXPERIENCE_LEVELS,
  StaffProcedureExperience
} from '@/lib/surgicalCompetencyData';
import { competencyService } from '@/lib/services/competencyService';

interface EPRExperienceSuggestionsProps {
  staffId: string;
  onAccept: (suggestion: ExperienceUpdateSuggestion) => void;
  onDecline: (suggestion: ExperienceUpdateSuggestion) => void;
}

export default function EPRExperienceSuggestions({
  staffId,
  onAccept,
  onDecline
}: EPRExperienceSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ExperienceUpdateSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadSuggestions();
  }, [staffId]);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const data = await competencyService.generateExperienceSuggestions(staffId);
      setSuggestions(data.filter(s => s.status === 'pending'));
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (suggestion: ExperienceUpdateSuggestion) => {
    setProcessing(suggestion.id);
    try {
      await competencyService.respondToSuggestion(suggestion.id, 'accepted', staffId);
      onAccept(suggestion);
      setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
    } catch (error) {
      console.error('Error accepting suggestion:', error);
      alert('Failed to accept suggestion. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleDecline = async (suggestion: ExperienceUpdateSuggestion) => {
    setProcessing(suggestion.id);
    try {
      await competencyService.respondToSuggestion(suggestion.id, 'declined', staffId);
      onDecline(suggestion);
      setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
    } catch (error) {
      console.error('Error declining suggestion:', error);
      alert('Failed to decline suggestion. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
        <p className="text-gray-600">
          You have no pending experience updates from recent scrub episodes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Experience Update Suggestions</h2>
          <p className="text-gray-600 mt-1">
            Based on your recent scrub episodes, we suggest these experience updates
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {suggestions.length} pending
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => {
          const currentLevelData = PROCEDURE_EXPERIENCE_LEVELS[suggestion.currentLevel as keyof typeof PROCEDURE_EXPERIENCE_LEVELS];
          const suggestedLevelData = suggestion.suggestedLevel
            ? PROCEDURE_EXPERIENCE_LEVELS[suggestion.suggestedLevel as keyof typeof PROCEDURE_EXPERIENCE_LEVELS]
            : null;

          return (
            <div
              key={suggestion.id}
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {suggestion.procedureName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>OPCS-4: {suggestion.opcs4Code}</span>
                    <span>•</span>
                    <span>Scrubbed on {new Date(suggestion.scrubDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <p className="text-blue-900">{suggestion.message}</p>
              </div>

              {/* Experience Level Change */}
              <div className="flex items-center gap-4 mb-4">
                {/* Current Level */}
                <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-600 mb-2">Current Level</div>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-semibold text-gray-900">{currentLevelData.label}</div>
                      <div className="text-xs text-gray-600">{currentLevelData.description}</div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {suggestedLevelData && (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                    {/* Suggested Level */}
                    <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xs text-green-800 mb-2">Suggested Level</div>
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold text-green-900">{suggestedLevelData.label}</div>
                          <div className="text-xs text-green-700">{suggestedLevelData.description}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAccept(suggestion)}
                  disabled={processing === suggestion.id}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing === suggestion.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>✓ Accept & Update</>
                  )}
                </button>
                <button
                  onClick={() => handleDecline(suggestion)}
                  disabled={processing === suggestion.id}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✗ Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
