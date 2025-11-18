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
  Activity
} from 'lucide-react';
import { getEfficiencyForDate } from '@/lib/firebase/services/theatreService';
import { TheatreEfficiency } from '@/types/tom';

interface TurnoverTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterUnit = 'all' | 'main' | 'acad' | 'recovery';

export default function TurnoverTimeModal({ isOpen, onClose }: TurnoverTimeModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<FilterUnit>('all');
  const [efficiencyData, setEfficiencyData] = useState<TheatreEfficiency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadTurnoverData();
    }
  }, [isOpen]);

  const loadTurnoverData = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const data = await getEfficiencyForDate(today);
      setEfficiencyData(data);
    } catch (error) {
      console.error('Error loading turnover data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Calculate summary from Firebase data
  const calculateSummary = () => {
    if (efficiencyData.length === 0) {
      return {
        averageTurnover: 0,
        target: 20,
        bestTheatre: 'N/A',
        worstTheatre: 'N/A',
        totalTurnovers: 0,
        onTarget: 0,
        delayed: 0
      };
    }

    const avgTurnover = Math.round(
      efficiencyData.reduce((sum, t) => sum + t.turnoverTime, 0) / efficiencyData.length
    );
    const totalTurnovers = efficiencyData.reduce((sum, t) => sum + t.casesCompleted, 0);
    const onTarget = efficiencyData.filter(t => t.turnoverTime <= t.targetTurnoverTime).reduce((sum, t) => sum + t.casesCompleted, 0);
    const delayed = totalTurnovers - onTarget;
    const best = efficiencyData.reduce((prev, curr) =>
      curr.turnoverTime < prev.turnoverTime ? curr : prev
    );
    const worst = efficiencyData.reduce((prev, curr) =>
      curr.turnoverTime > prev.turnoverTime ? curr : prev
    );

    return {
      averageTurnover: avgTurnover,
      target: 20,
      bestTheatre: best.theatreName,
      worstTheatre: worst.theatreName,
      totalTurnovers,
      onTarget,
      delayed
    };
  };

  const todaysSummary = calculateSummary();

  // Map Firebase data to display format
  const theatreData = efficiencyData.map(eff => ({
    theatre: eff.theatreName,
    unit: eff.theatreName.includes('DSU') ? 'acad' as const : 'main' as const,
    currentTurnover: eff.turnoverTime,
    avgTurnover: eff.turnoverTime,
    target: eff.targetTurnoverTime,
    turnoversToday: eff.casesCompleted,
    onTarget: eff.turnoverTime <= eff.targetTurnoverTime ? eff.casesCompleted : 0,
    delayed: eff.turnoverTime > eff.targetTurnoverTime ? eff.casesCompleted : 0,
    trend: eff.trend,
    delayReasons: [], // TODO: Add delay reasons from procedures
    lastTurnover: 'N/A', // TODO: Calculate from procedures
    nextCase: 'N/A' // TODO: Calculate from procedures
  }));

  const filteredTheatres = theatreData.filter(t => (selectedUnit === 'all' ? true : t.unit === selectedUnit));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'worsening': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceColor = (current: number, target: number) => {
    const pct = (current / target) * 100;
    if (pct <= 75) return 'bg-green-50 border-green-200';
    if (pct <= 100) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex items-stretch justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Turnover time analysis"
    >
      <div className="bg-white w-full h-full overflow-hidden flex flex-col">
        {/* Sticky top header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold truncate">Average Turnover Time</h2>
            <p className="text-indigo-100 text-[11px] sm:text-xs">Real-time theatre turnover performance</p>
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
                <p className="text-sm text-gray-600">Loading turnover data...</p>
              </div>
            </div>
          ) : theatreData.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-600">No turnover data available for today</p>
              </div>
            </div>
          ) : (
            <div>
          {/* 1) SUMMARY FIRST */}
          <section className="px-4 sm:px-6 pt-2 sm:pt-3 pb-1 sm:pb-2">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Today's Summary</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-3">
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-indigo-700 uppercase tracking-wide">Avg</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-indigo-800">{todaysSummary.averageTurnover}m</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-slate-50 to-gray-50 border-gray-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wide">Target</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-gray-800">{todaysSummary.target}m</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-blue-700 uppercase tracking-wide">Total</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-blue-800">{todaysSummary.totalTurnovers}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-green-700 uppercase tracking-wide">Target</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-green-800">{todaysSummary.onTarget}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-rose-50 to-red-50 border-rose-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-rose-700 uppercase tracking-wide">Delay</p>
                <p className="text-base sm:text-2xl md:text-3xl font-bold text-rose-800">{todaysSummary.delayed}</p>
              </div>
              <div className="rounded sm:rounded-lg p-1.5 sm:p-3 border bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <p className="text-[8px] sm:text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">Best</p>
                <p className="text-[10px] sm:text-xs font-semibold text-emerald-800 truncate">{todaysSummary.bestTheatre}</p>
              </div>
            </div>
          </section>

          {/* 2) TITLE BAR */}
          <section className="px-4 sm:px-6 pt-2 pb-3">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg text-white px-4 py-3 sm:px-5 sm:py-4">
              <h3 className="text-base sm:text-lg font-bold">Turnover Performance – Details</h3>
              <p className="text-indigo-100 text-[11px] sm:text-xs mt-0.5">
                Breakdown by theatre with trends, delays and targets
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
                        ? 'bg-indigo-600 text-white'
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
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded text-[11px] font-medium hover:bg-blue-700 transition-colors"
                >
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
                className={`rounded-lg p-4 border ${getPerformanceColor(theatre.currentTurnover, theatre.target)}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{theatre.theatre}</h4>
                      {getTrendIcon(theatre.trend)}
                      <span className="text-xs font-medium capitalize text-gray-700">({theatre.trend})</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-600">Current Turnover</p>
                        <p className="font-bold">{theatre.currentTurnover} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Today's Average</p>
                        <p className="font-bold">{theatre.avgTurnover} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Turnovers Today</p>
                        <p className="font-bold">{theatre.turnoversToday}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">On Target / Delayed</p>
                        <p className="font-bold">
                          <span className="text-green-700">{theatre.onTarget}</span>
                          {' / '}
                          <span className="text-red-700">{theatre.delayed}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-600">Last Turnover</p>
                    <p className="text-sm font-bold">{theatre.lastTurnover}</p>
                    <p className="text-xs text-blue-600 mt-1">Next: {theatre.nextCase}</p>
                  </div>
                </div>

                {/* Delays */}
                {theatre.delayReasons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Delays Today
                    </p>
                    <div className="space-y-1">
                      {theatre.delayReasons.map((d, idx) => (
                        <div key={idx} className="bg-white rounded p-2 text-xs border border-gray-100">
                          <span className="font-medium">{d.time}</span>{' - '}
                          <span>{d.reason}</span>{' '}
                          <span className="text-red-700 font-semibold">(+{d.duration})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All on target */}
                {theatre.delayed === 0 && theatre.turnoversToday > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-green-700 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      All turnovers on target today
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
