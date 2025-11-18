'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Filter,
  BarChart3,
  Target,
  Clock,
  Activity
} from 'lucide-react';
import { getEfficiencyForDate } from '@/lib/firebase/services/theatreService';
import { TheatreEfficiency } from '@/types/tom';

interface EfficiencyScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterUnit = 'all' | 'main' | 'acad' | 'recovery';

export default function EfficiencyScoreModal({ isOpen, onClose }: EfficiencyScoreModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<FilterUnit>('all');
  const [efficiencyData, setEfficiencyData] = useState<TheatreEfficiency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadEfficiencyData();
    }
  }, [isOpen]);

  const loadEfficiencyData = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const data = await getEfficiencyForDate(today);
      setEfficiencyData(data);
    } catch (error) {
      console.error('Error loading efficiency data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Calculate summary from Firebase data
  const calculateSummary = () => {
    if (efficiencyData.length === 0) {
      return {
        overallEfficiency: 0,
        target: 85,
        bestTheatre: 'N/A',
        worstTheatre: 'N/A',
        aboveTarget: 0,
        belowTarget: 0
      };
    }

    const avgEfficiency = Math.round(
      efficiencyData.reduce((sum, t) => sum + t.efficiencyScore, 0) / efficiencyData.length
    );
    const aboveTarget = efficiencyData.filter(t => t.efficiencyScore >= t.targetScore).length;
    const belowTarget = efficiencyData.length - aboveTarget;
    const best = efficiencyData.reduce((prev, curr) =>
      curr.efficiencyScore > prev.efficiencyScore ? curr : prev
    );
    const worst = efficiencyData.reduce((prev, curr) =>
      curr.efficiencyScore < prev.efficiencyScore ? curr : prev
    );

    return {
      overallEfficiency: avgEfficiency,
      target: 85,
      bestTheatre: best.theatreName,
      worstTheatre: worst.theatreName,
      aboveTarget,
      belowTarget
    };
  };

  const todaysSummary = calculateSummary();

  // Map Firebase data to display format
  const theatreData = efficiencyData.map(eff => ({
    theatre: eff.theatreName,
    unit: eff.theatreName.includes('DSU') ? 'acad' as const : 'main' as const,
    efficiency: eff.efficiencyScore,
    target: eff.targetScore,
    trend: eff.trend,
    casesScheduled: eff.casesScheduled,
    casesCompleted: eff.casesCompleted,
    casesInProgress: eff.casesInProgress,
    utilizationRate: eff.utilizationRate,
    avgCaseTime: eff.avgCaseTime,
    scheduledTime: eff.avgScheduledTime,
    delayMinutes: eff.totalDelayMinutes,
    factors: eff.factors
  }));

  const filteredTheatres = theatreData.filter(t => (selectedUnit === 'all' ? true : t.unit === selectedUnit));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'worsening': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />;
    }
  };

  const getEfficiencyColor = (eff: number, tgt: number) => {
    if (eff >= tgt + 5) return 'bg-green-50 border-green-200';
    if (eff >= tgt) return 'bg-blue-50 border-blue-200';
    if (eff >= tgt - 10) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getFactorColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 text-green-800 border-green-200';
      case 'good': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'needs-attention': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex items-stretch justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Efficiency score analysis"
    >
      <div className="bg-white w-full h-full overflow-hidden flex flex-col">
        {/* Sticky top header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold truncate">Theatre Efficiency Score</h2>
            <p className="text-orange-100 text-[11px] sm:text-xs">Real-time efficiency & performance factors</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-blue-800/60" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable column */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Activity className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Loading efficiency data...</p>
              </div>
            </div>
          ) : theatreData.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-600">No efficiency data available for today</p>
              </div>
            </div>
          ) : (
            <div>
          {/* 1) SUMMARY FIRST */}
          <section className="px-4 sm:px-6 pt-2 sm:pt-3 pb-1 sm:pb-2">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Today's Summary</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-3">
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-orange-700 uppercase tracking-wide">Efficiency</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-orange-800">{todaysSummary.overallEfficiency}%</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-slate-50 to-gray-50 border-gray-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wide">Target</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-gray-800">{todaysSummary.target}%</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">Above</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-emerald-800">{todaysSummary.aboveTarget}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-rose-50 to-red-50 border-rose-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-rose-700 uppercase tracking-wide">Below</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-rose-800">{todaysSummary.belowTarget}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">Top</p>
                <p className="text-[10px] sm:text-xs font-semibold text-emerald-900 truncate">{todaysSummary.bestTheatre}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-red-700 uppercase tracking-wide">Support</p>
                <p className="text-[10px] sm:text-xs font-semibold text-red-900 truncate">{todaysSummary.worstTheatre}</p>
              </div>
            </div>
          </section>

          {/* 2) TITLE BAR */}
          <section className="px-4 sm:px-6 pt-2 pb-3">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg text-white px-4 py-3 sm:px-5 sm:py-4">
              <h3 className="text-base sm:text-lg font-bold">Efficiency – Details</h3>
              <p className="text-indigo-100 text-[11px] sm:text-xs mt-0.5">
                Breakdown by theatre with trends, utilization and factors
              </p>
            </div>
          </section>

          {/* 3) STICKY FILTERS */}
          <div className="sticky top-[48px] sm:top-[56px] z-10 bg-white/95 backdrop-blur border-y border-gray-200">
            <div className="px-4 sm:px-6 py-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-3 h-3 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-700">Filter by Unit:</span>
                {(['all', 'main', 'acad', 'recovery'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setSelectedUnit(unit)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedUnit === unit
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={selectedUnit === unit}
                  >
                    {unit === 'all' ? 'All Units' : unit.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <BarChart3 className="w-3 h-3 text-gray-500" />
                <button className="px-2 py-1 bg-blue-600 text-white rounded text-[11px] font-medium hover:bg-blue-700 transition-colors">
                  View Period Analytics
                </button>
              </div>
            </div>
          </div>

          {/* 4) THEATRE LIST */}
          <div className="px-4 sm:px-6 py-3 space-y-3">
            {filteredTheatres.map((theatre) => (
              <div
                key={theatre.theatre}
                className={`rounded-lg p-4 border ${getEfficiencyColor(theatre.efficiency, theatre.target)}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{theatre.theatre}</h4>
                      {getTrendIcon(theatre.trend)}
                      <span className="text-xs font-medium capitalize text-gray-700">({theatre.trend})</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-gray-600">Efficiency</p>
                    <p className="text-xl font-extrabold">{theatre.efficiency}%</p>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3 text-sm">
                  <div className="bg-white bg-opacity-50 rounded p-2">
                    <p className="text-xs text-gray-600 flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      Cases
                    </p>
                    <p className="font-bold">
                      {theatre.casesCompleted}/{theatre.casesScheduled}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded p-2">
                    <p className="text-xs text-gray-600 flex items-center">
                      <Activity className="w-3 h-3 mr-1" />
                      Utilization
                    </p>
                    <p className="font-bold">{theatre.utilizationRate}%</p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded p-2">
                    <p className="text-xs text-gray-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Avg Time
                    </p>
                    <p className="font-bold">{theatre.avgCaseTime} min</p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded p-2">
                    <p className="text-xs text-gray-600">Scheduled</p>
                    <p className="font-bold">{theatre.scheduledTime} min</p>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded p-2">
                    <p className="text-xs text-gray-600">Total Delay</p>
                    <p className={`font-bold ${theatre.delayMinutes > 20 ? 'text-red-700' : 'text-gray-800'}`}>
                      {theatre.delayMinutes} min
                    </p>
                  </div>
                </div>

                {/* Factors */}
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Performance Factors</p>
                  <div className="grid grid-cols-2 gap-2">
                    {theatre.factors.map((f, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-3 py-2 rounded border text-xs ${getFactorColor(f.status)}`}
                      >
                        <span className="font-medium">{f.factor}</span>
                        <span className="font-bold">{f.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                {theatre.efficiency < theatre.target - 10 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="bg-red-50 rounded p-2 text-xs text-red-800 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="font-semibold">
                        Critical: Efficiency {theatre.target - theatre.efficiency}% below target. Immediate action required.
                      </span>
                    </div>
                  </div>
                )}

                {theatre.efficiency >= theatre.target + 5 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-green-700 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Excellent performance – {theatre.efficiency - theatre.target}% above target
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
