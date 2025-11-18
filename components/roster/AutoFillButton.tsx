'use client';

import React, { useState } from 'react';
import { Wand2, Calendar, Clock, CheckCircle, AlertCircle, X, TrendingUp, Users } from 'lucide-react';
import { format, addDays, addWeeks, startOfWeek, endOfWeek } from 'date-fns';

interface AutoFillResult {
  success: boolean;
  assignmentsMade: number;
  gapsRemaining: number;
  totalShiftsNeeded: number;
  totalShiftsFilled: number;
  fillRate: number;
  details: any[];
  gaps: any[];
  byRole?: Map<string, { needed: number; filled: number }>;
  bySpecialty?: Map<string, { needed: number; filled: number }>;
}

interface AutoFillButtonProps {
  currentWeekStart: Date;
  onAutoFill: (startDate: string, endDate: string) => Promise<AutoFillResult>;
  onComplete: () => void;
}

export default function AutoFillButton({
  currentWeekStart,
  onAutoFill,
  onComplete
}: AutoFillButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [fillMode, setFillMode] = useState<'week' | 'month'>('week');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AutoFillResult | null>(null);

  const handleAutoFill = async () => {
    setLoading(true);
    setResult(null);

    try {
      const startDate = format(currentWeekStart, 'yyyy-MM-dd');
      let endDate: string;

      if (fillMode === 'week') {
        endDate = format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'yyyy-MM-dd');
      } else {
        // Month: 4 weeks
        endDate = format(addDays(addWeeks(currentWeekStart, 4), -1), 'yyyy-MM-dd');
      }

      const fillResult = await onAutoFill(startDate, endDate);
      setResult(fillResult);
    } catch (error) {
      console.error('Auto-fill error:', error);
      alert('Failed to auto-fill rosters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setResult(null);
    if (result?.success) {
      onComplete();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
      >
        <Wand2 className="w-5 h-5" />
        <span>Auto-Fill with TOM</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Wand2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">TOM Auto-Fill Rosters</h2>
                  <p className="text-sm text-white/90">
                    Let TOM's AI automatically fill rosters using intelligent matching
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={loading}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Not Started - Mode Selection */}
              {!loading && !result && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Fill Period
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Week Option */}
                      <button
                        onClick={() => setFillMode('week')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          fillMode === 'week'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className={`w-5 h-5 ${fillMode === 'week' ? 'text-purple-600' : 'text-gray-600'}`} />
                          <span className="font-semibold text-gray-900">This Week</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(currentWeekStart, 'MMM d')} - {format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          ~350 shifts across 20 theatres
                        </div>
                      </button>

                      {/* Month Option */}
                      <button
                        onClick={() => setFillMode('month')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          fillMode === 'month'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className={`w-5 h-5 ${fillMode === 'month' ? 'text-purple-600' : 'text-gray-600'}`} />
                          <span className="font-semibold text-gray-900">Next 4 Weeks</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(currentWeekStart, 'MMM d')} - {format(addDays(addWeeks(currentWeekStart, 4), -1), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          ~1,400 shifts across 20 theatres
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 mb-1">How TOM Auto-Fill Works</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Uses 110-point AI scoring for every position</li>
                          <li>• Detects conflicts (leave, double-booking, WTD)</li>
                          <li>• Prefers permanent staff over bank (cost optimization)</li>
                          <li>• Balances workload across team</li>
                          <li>• Reports gaps with actionable reasons</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAutoFill}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Wand2 className="w-5 h-5" />
                      Start Auto-Fill
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">TOM is filling rosters...</h3>
                  <p className="text-gray-600">
                    Analyzing 128 staff members for {fillMode === 'week' ? '~350' : '~1,400'} shifts
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    This may take 30-60 seconds
                  </p>
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {!loading && result && (
                <>
                  {/* Success Header */}
                  <div className="text-center mb-6">
                    {result.fillRate >= 80 ? (
                      <>
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Auto-Fill Complete!</h3>
                        <p className="text-green-600 font-medium">Excellent fill rate</p>
                      </>
                    ) : result.fillRate >= 60 ? (
                      <>
                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <TrendingUp className="w-10 h-10 text-yellow-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Auto-Fill Complete</h3>
                        <p className="text-yellow-600 font-medium">Some gaps remain</p>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Auto-Fill Complete</h3>
                        <p className="text-red-600 font-medium">Many gaps remain - review required</p>
                      </>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">{result.totalShiftsFilled}</div>
                      <div className="text-xs text-blue-700 mt-1">Shifts Filled</div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-amber-600">{result.gapsRemaining}</div>
                      <div className="text-xs text-amber-700 mt-1">Gaps Remaining</div>
                    </div>
                    <div className={`${
                      result.fillRate >= 80 ? 'bg-green-50 border-green-200' :
                      result.fillRate >= 60 ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    } border rounded-lg p-4 text-center`}>
                      <div className={`text-3xl font-bold ${
                        result.fillRate >= 80 ? 'text-green-600' :
                        result.fillRate >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {Math.round(result.fillRate)}%
                      </div>
                      <div className={`text-xs mt-1 ${
                        result.fillRate >= 80 ? 'text-green-700' :
                        result.fillRate >= 60 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        Fill Rate
                      </div>
                    </div>
                  </div>

                  {/* Gaps Warning */}
                  {result.gapsRemaining > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-900 mb-2">
                            {result.gapsRemaining} Gaps Need Attention
                          </h4>
                          <p className="text-sm text-amber-700 mb-2">
                            TOM couldn't fill all positions. Common reasons:
                          </p>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• Staff on leave or already assigned</li>
                            <li>• WTD compliance limits reached (48h/week)</li>
                            <li>• Specialty mismatch (no qualified staff available)</li>
                            <li>• Consider using Bank staff or adjusting requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                    >
                      View Updated Roster
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
