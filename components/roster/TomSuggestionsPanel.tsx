'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Trophy, Clock, Users, Briefcase, MapPin } from 'lucide-react';
import type { ScoredCandidate, ShiftRequirement } from '@/lib/roster/aiScoringService';

interface TomSuggestionsPanelProps {
  suggestions: ScoredCandidate[];
  requirement: ShiftRequirement;
  onAssign: (candidate: ScoredCandidate) => void;
  onClose: () => void;
  loading?: boolean;
}

export default function TomSuggestionsPanel({
  suggestions,
  requirement,
  onAssign,
  onClose,
  loading = false
}: TomSuggestionsPanelProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRankEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">TOM's AI Suggestions</h2>
              <p className="text-sm text-white/90">
                {requirement.role} • {requirement.band} • {requirement.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Requirement Summary */}
        <div className="bg-purple-50 border-b border-purple-200 px-6 py-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-purple-900">{requirement.specialty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700">
                {requirement.startTime} - {requirement.endTime} ({requirement.hours}h)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700">{requirement.sessionType}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <Clock className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">TOM is analyzing 128 staff members...</p>
              <p className="text-sm text-gray-500 mt-2">Checking availability, conflicts, and suitability</p>
            </div>
          </div>
        )}

        {/* Suggestions List */}
        {!loading && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {suggestions.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Staff Found</h3>
                <p className="text-gray-600">
                  All staff are either on leave, already assigned, or would exceed WTD limits.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Consider using Bank staff or adjusting shift requirements.
                </p>
              </div>
            ) : (
              suggestions.map((candidate, index) => (
                <div
                  key={candidate.staff.id}
                  className={`border-2 rounded-lg p-4 ${
                    candidate.available
                      ? getScoreBgColor(candidate.totalScore)
                      : 'bg-gray-50 border-gray-300 opacity-75'
                  }`}
                >
                  {/* Candidate Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {getRankEmoji(index + 1)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {candidate.staff.firstName} {candidate.staff.lastName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">{candidate.staff.band}</span>
                          <span>•</span>
                          <span>{candidate.staff.professionalQualification || 'RN'}</span>
                          <span>•</span>
                          <span className={candidate.staff.employmentType === 'bank' ? 'text-amber-600 font-medium' : 'text-green-600 font-medium'}>
                            {candidate.staff.employmentType === 'bank' ? 'Bank' : candidate.staff.employmentType === 'permanent' ? 'Permanent' : 'Permanent'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {candidate.staff.specialty}
                        </div>
                      </div>
                    </div>

                    {/* Score Badge */}
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(candidate.totalScore)}`}>
                        {candidate.totalScore.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">/ 110</div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Specialty</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.specialtyMatch >= 30 ? 'text-green-600' : 'text-red-600'}`}>
                        {candidate.breakdown.specialtyMatch}/40
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Band</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.bandMatch >= 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {candidate.breakdown.bandMatch}/30
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Role</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.roleMatch >= 15 ? 'text-green-600' : 'text-red-600'}`}>
                        {candidate.breakdown.roleMatch}/20
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Workload</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.workloadScore >= 7 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {candidate.breakdown.workloadScore}/10
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Type</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.employmentTypeScore >= 4 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {candidate.breakdown.employmentTypeScore}/5
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Distance</div>
                      <div className={`text-sm font-bold ${candidate.breakdown.distanceScore >= 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {candidate.breakdown.distanceScore}/5
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Hours</div>
                      <div className={`text-sm font-bold ${(candidate.weeklyHours || 0) < 40 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {candidate.weeklyHours || 0}h
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="space-y-1 mb-3">
                    {candidate.reasoning.map((reason, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Conflicts */}
                  {candidate.conflicts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-red-900 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        Conflicts Detected
                      </div>
                      <div className="space-y-1">
                        {candidate.conflicts.map((conflict, i) => (
                          <div key={i} className="text-sm text-red-700 flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>{conflict}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => onAssign(candidate)}
                    disabled={!candidate.available}
                    className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-colors ${
                      candidate.available
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {candidate.available ? (
                      <>Assign {candidate.staff.firstName} to this shift</>
                    ) : (
                      <>Unavailable - {candidate.conflicts[0]}</>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <span>Powered by TOM AI • Theatre Operations Manager</span>
            </div>
            <div>
              {suggestions.length > 0 && (
                <span>{suggestions.filter(s => s.available).length} of {suggestions.length} available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
