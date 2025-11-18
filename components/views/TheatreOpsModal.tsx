'use client';

import React, { useState } from 'react';
import {
  X,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Calendar,
  User,
  FileText,
  BarChart3
} from 'lucide-react';

interface TheatreOpsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUnit?: 'all' | 'main' | 'acad' | 'recovery';
}

type IssueType = 'operational' | 'clinical' | 'escalation';
type FilterPeriod = 'today' | 'week' | 'month';

export default function TheatreOpsModal({
  isOpen,
  onClose,
  selectedUnit = 'all',
}: TheatreOpsModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<IssueType | 'all'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>('today');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  if (!isOpen) return null;

  // ---- Demo data (unchanged) ----
  const operationalSummary = {
    runningTheatres: 24,
    totalTheatres: 26,
    casesCompleted: 47,
    casesUnderway: 18,
    casesScheduled: 89,
  };

  const issues = [
    {
      id: 1,
      type: 'operational' as IssueType,
      title: 'Main Theatre 2 - Equipment Fault',
      description: 'Anaesthetic machine pressure sensor malfunction',
      theatre: 'Main Theatre 2',
      raisedBy: 'RN A. Flores',
      raisedAt: '08:15',
      status: 'resolved',
      resolvedAt: '09:30',
      resolvedBy: 'Biomed Engineer - J. Chen',
      priority: 'high',
      impact: 'Theatre closed for 75 minutes',
      previousOccurrences: [
        { date: '2024-10-15', theatre: 'Main Theatre 2', issue: 'Same sensor issue', resolvedBy: 'J. Chen' },
        { date: '2024-09-28', theatre: 'Main Theatre 5', issue: 'Pressure sensor fault', resolvedBy: 'K. Williams' },
      ],
      notes: 'Sensor replaced. Preventative maintenance scheduled for all machines',
    },
    {
      id: 2,
      type: 'operational' as IssueType,
      title: 'Main Theatre 7 - CLOSED',
      description: 'Unpopulated list - No cases booked',
      theatre: 'Main Theatre 7',
      raisedBy: 'System Auto-flagged',
      raisedAt: '08:00',
      status: 'acknowledged',
      assignedTo: 'Theatre Coordinator',
      priority: 'low',
      impact: 'Theatre available for emergency cases',
      previousOccurrences: [],
      notes: 'Staff reallocated to other theatres',
    },
    {
      id: 3,
      type: 'clinical' as IssueType,
      title: 'DSU Theatre 3 - Delayed Start',
      description: 'Patient arrived with elevated blood pressure',
      theatre: 'DSU Theatre 3',
      raisedBy: 'Dr. F. James (Anaesthetist)',
      raisedAt: '08:45',
      status: 'resolved',
      resolvedAt: '09:30',
      priority: 'medium',
      impact: '45 minute delay to list',
      previousOccurrences: [],
      notes: 'Patient observed. BP stabilized. Consultant approval obtained. Surgery proceeded',
    },
    {
      id: 4,
      type: 'escalation' as IssueType,
      title: 'Main Theatre 1 - Implant Not Available',
      description: 'Specific hip prosthesis not in stock',
      theatre: 'Main Theatre 1',
      raisedBy: 'J. Smith (Consultant)',
      raisedAt: '08:35',
      status: 'in-progress',
      assignedTo: 'Procurement Manager',
      priority: 'urgent',
      impact: '15 min delay - alternative implant sourced',
      previousOccurrences: [
        { date: '2024-10-10', theatre: 'Main Theatre 1', issue: 'Knee implant stockout', resolvedBy: 'Procurement' },
      ],
      notes: 'Escalated to supply chain. Emergency stock protocol activated',
    },
    {
      id: 5,
      type: 'clinical' as IssueType,
      title: 'Main Theatre 8 - Post-op Complication',
      description: 'Patient requires HDU admission',
      theatre: 'Main Theatre 8',
      raisedBy: 'Dr. B. Morgan (Surgeon)',
      raisedAt: '11:15',
      status: 'resolved',
      resolvedAt: '11:45',
      priority: 'high',
      impact: 'HDU bed secured - No delay to next case',
      previousOccurrences: [],
      notes: 'Patient transferred to HDU. Next case started on time',
    },
  ];

  const filteredIssues = issues.filter((issue) => {
    if (selectedFilter !== 'all' && issue.type !== selectedFilter) return false;
    if (selectedUnit === 'recovery') return false;
    if (selectedUnit === 'main') return issue.theatre.startsWith('Main Theatre');
    if (selectedUnit === 'acad') return issue.theatre.startsWith('DSU Theatre');
    return true; // 'all'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex items-stretch justify-center"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Theatre operations summary"
    >
      {/* Modal shell */}
      <div className="bg-white w-full h-full overflow-hidden flex flex-col">
        {/* Top header (sticky) */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold truncate">Theatre Operations</h2>
            <p className="text-blue-100 text-[11px] sm:text-xs">Live status & issues</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-800/60"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content column */}
        <div className="flex-1 overflow-y-auto">
          {/* SUMMARY STATS (now first, full width) */}
          <section className="px-4 sm:px-6 pt-3 pb-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Summary Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wide">
                    Running Theatres
                  </p>
                  <Activity className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  {operationalSummary.runningTheatres}
                  <span className="text-lg text-green-500">
                    /{operationalSummary.totalTheatres}
                  </span>
                </p>
                <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        (operationalSummary.runningTheatres /
                          operationalSummary.totalTheatres) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide">
                    Cases Completed
                  </p>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                  {operationalSummary.casesCompleted}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-orange-700 uppercase tracking-wide">
                    Cases Underway
                  </p>
                  <Activity className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-700">
                  {operationalSummary.casesUnderway}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">
                    Total Scheduled
                  </p>
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-700">
                  {operationalSummary.casesScheduled}
                </p>
              </div>
            </div>
          </section>

          {/* THEATRE OPERATIONS SUMMARY (title under stats) */}
          <section className="px-4 sm:px-6 pt-2 pb-3">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg text-white px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold truncate">Theatre Operations Summary</h3>
                <p className="text-blue-100 text-[11px] sm:text-xs mt-0.5">
                  Live operational status and issue tracking
                </p>
              </div>
            </div>
          </section>

          {/* FILTERS (sticky just below summary title for quick access) */}
          <div className="sticky top-[48px] sm:top-[56px] z-10 bg-white/95 backdrop-blur border-y border-gray-200">
            <div className="px-4 sm:px-6 py-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-3 h-3 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-700">Type:</span>
                {(['all', 'operational', 'clinical', 'escalation'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-700">Period:</span>
                {(['today', 'week', 'month'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ISSUES LIST */}
          <section className="px-0">
            <ul className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <li key={issue.id} className="bg-white">
                  <button
                    onClick={() =>
                      setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)
                    }
                    className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none"
                    aria-expanded={selectedIssue?.id === issue.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium ${getPriorityColor(
                              issue.priority
                            )}`}
                          >
                            {issue.priority.toUpperCase()}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(
                              issue.status
                            )}`}
                          >
                            {issue.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-[11px] text-gray-500 truncate">
                            {issue.theatre}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-0.5 truncate">
                          {issue.title}
                        </h4>
                        <p className="text-[13px] text-gray-600 mb-1 line-clamp-2 sm:line-clamp-none">
                          {issue.description}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-gray-500 flex-wrap">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" /> Raised by: {issue.raisedBy}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {issue.raisedAt}
                          </span>
                          {issue.previousOccurrences.length > 0 && (
                            <span className="flex items-center text-orange-600 font-medium">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {issue.previousOccurrences.length} prev
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {selectedIssue?.id === issue.id && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-[11px] font-semibold text-blue-900 mb-1">Impact</p>
                        <p className="text-[13px] text-blue-800">{issue.impact}</p>
                      </div>
                      {issue.notes && (
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-[11px] font-semibold text-gray-700 mb-1 flex items-center">
                            <FileText className="w-3 h-3 mr-1" /> Notes
                          </p>
                          <p className="text-[13px] text-gray-700">{issue.notes}</p>
                        </div>
                      )}
                      {issue.resolvedBy && (
                        <div className="bg-green-50 rounded p-3">
                          <p className="text-[11px] font-semibold text-green-900 mb-1">Resolution</p>
                          <p className="text-[13px] text-green-800">
                            Resolved by {issue.resolvedBy} at {issue.resolvedAt}
                          </p>
                        </div>
                      )}
                      {issue.previousOccurrences.length > 0 && (
                        <div className="bg-orange-50 rounded p-3">
                          <p className="text-[11px] font-semibold text-orange-900 mb-2 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Previous Occurrences
                          </p>
                          <div className="space-y-2">
                            {issue.previousOccurrences.map((occurrence, idx) => (
                              <div
                                key={idx}
                                className="text-[12px] text-orange-800 pl-3 border-l-2 border-orange-300"
                              >
                                <p className="font-medium">
                                  {occurrence.date} - {occurrence.theatre}
                                </p>
                                <p>
                                  {occurrence.issue} • Resolved by: {occurrence.resolvedBy}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
