'use client';

import React, { useState, useEffect } from 'react';
import {
  getSchedulePool,
  getPoolSpecialties,
  getPoolSurgeons,
  getPoolStatistics,
  TheatreListTemplate,
  SchedulePoolFilters
} from '@/lib/firebase/services/schedulePoolService';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PoolView() {
  const [poolData, setPoolData] = useState<TheatreListTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [surgeons, setSurgeons] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<SchedulePoolFilters>({
    year: 2025
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const sessionTypes = ['AM', 'PM', 'FULL', 'EXTENDED', 'EVE'];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [poolResults, stats, specs, surgs] = await Promise.all([
        getSchedulePool(filters, 500),
        getPoolStatistics(),
        getPoolSpecialties(),
        getPoolSurgeons()
      ]);

      setPoolData(poolResults);
      setStatistics(stats);
      setSpecialties(specs);
      setSurgeons(surgs);
    } catch (error) {
      console.error('Error loading pool data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const results = await getSchedulePool(filters, 500);
      setPoolData(results);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ year: 2025 });
    loadInitialData();
  };

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Week',
      'Date',
      'Day',
      'Session Type',
      'Session Time',
      'Specialty',
      'Subspecialty',
      'Surgeon',
      'Anaesthetist',
      'Total PCS',
      'Max PCS',
      'Utilisation %',
      'Procedures Count'
    ];

    const rows = poolData.map(list => [
      list.id,
      list.weekNumber,
      list.date,
      list.dayOfWeek,
      list.sessionType,
      `${list.sessionStart}-${list.sessionEnd}`,
      list.specialty,
      list.subspecialty || '',
      list.surgeon,
      list.anaesthetist,
      list.totalPCS,
      list.maxPCS,
      `${Math.round((list.totalPCS / list.maxPCS) * 100)}%`,
      list.procedures.length
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule-pool-2025-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getUtilisationColor = (utilisation: number): string => {
    if (utilisation >= 85) return 'bg-green-100 text-green-800';
    if (utilisation >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800';
      case 'P3': return 'bg-yellow-100 text-yellow-800';
      case 'P4': return 'bg-blue-100 text-blue-800';
      case 'P5': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && !poolData.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading schedule pool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-auto">
      <div className="space-y-2 md:space-y-4 p-2 md:p-4">
        {/* Header - Hidden on mobile as it's shown in parent page */}
        <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">Schedule Pool</h1>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1 truncate">
              Year-long theatre schedule pool with {statistics?.totalLists.toLocaleString() || 0} lists
            </p>
          </div>
          <div className="flex gap-1 md:gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Filter className="h-3 w-3 md:h-4 md:w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={loadInitialData}
              disabled={loading}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
            >
              <RefreshCw className={`h-3 w-3 md:h-4 md:w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold"
            >
              <Download className="h-3 w-3 md:h-4 md:w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden flex gap-1.5 justify-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-2 py-1.5 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Filter className="h-3 w-3" />
            Filters
          </button>
          <button
            onClick={loadInitialData}
            disabled={loading}
            className="flex items-center gap-1 px-2 py-1.5 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1 px-2 py-1.5 text-xs bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold"
          >
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs font-medium text-gray-600 truncate">Total Lists</p>
                  <p className="text-sm md:text-xl font-bold text-gray-900 mt-0.5 md:mt-1 truncate">
                    {statistics.totalLists.toLocaleString()}
                  </p>
                </div>
                <Calendar className="h-4 w-4 md:h-6 md:w-6 text-cyan-600 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs font-medium text-gray-600 truncate">Avg Utilisation</p>
                  <p className="text-sm md:text-xl font-bold text-green-600 mt-0.5 md:mt-1 truncate">
                    {Math.round(statistics.averageUtilisation)}%
                  </p>
                </div>
                <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs font-medium text-gray-600 truncate">Total Procedures</p>
                  <p className="text-sm md:text-xl font-bold text-gray-900 mt-0.5 md:mt-1 truncate">
                    {statistics.totalProcedures.toLocaleString()}
                  </p>
                </div>
                <Stethoscope className="h-4 w-4 md:h-6 md:w-6 text-purple-600 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs font-medium text-gray-600 truncate">Specialties</p>
                  <p className="text-sm md:text-xl font-bold text-gray-900 mt-0.5 md:mt-1 truncate">
                    {specialties.length}
                  </p>
                </div>
                <User className="h-4 w-4 md:h-6 md:w-6 text-orange-600 flex-shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-2 md:p-3 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-teal-50">
              <h3 className="text-sm md:text-base font-semibold text-teal-800 flex items-center gap-1.5 md:gap-2">
                <Filter className="h-4 w-4 md:h-5 md:w-5" />
                Filters
              </h3>
            </div>
            <div className="p-2 md:p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
                {/* Specialty Filter */}
                <div>
                  <label htmlFor="specialty" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    value={filters.specialty || ''}
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value || undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Week Number Filter */}
                <div>
                  <label htmlFor="weekNumber" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Week Number
                  </label>
                  <input
                    id="weekNumber"
                    type="number"
                    min="1"
                    max="52"
                    placeholder="1-52"
                    value={filters.weekNumber || ''}
                    onChange={(e) => setFilters({ ...filters, weekNumber: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Day of Week Filter */}
                <div>
                  <label htmlFor="dayOfWeek" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Day of Week
                  </label>
                  <select
                    id="dayOfWeek"
                    value={filters.dayOfWeek || ''}
                    onChange={(e) => setFilters({ ...filters, dayOfWeek: e.target.value || undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Days</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                {/* Session Type Filter */}
                <div>
                  <label htmlFor="sessionType" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Session Type
                  </label>
                  <select
                    id="sessionType"
                    value={filters.sessionType || ''}
                    onChange={(e) => setFilters({ ...filters, sessionType: e.target.value || undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Sessions</option>
                    {sessionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Surgeon Filter */}
                <div>
                  <label htmlFor="surgeon" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Surgeon
                  </label>
                  <select
                    id="surgeon"
                    value={filters.surgeon || ''}
                    onChange={(e) => setFilters({ ...filters, surgeon: e.target.value || undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Surgeons</option>
                    {surgeons.map(surg => (
                      <option key={surg} value={surg}>{surg}</option>
                    ))}
                  </select>
                </div>

                {/* Utilisation Range */}
                <div>
                  <label htmlFor="minUtil" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Min Utilisation %
                  </label>
                  <input
                    id="minUtil"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={filters.minUtilisation || ''}
                    onChange={(e) => setFilters({ ...filters, minUtilisation: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="maxUtil" className="block text-[10px] md:text-xs font-medium text-gray-700 mb-0.5 md:mb-1">
                    Max Utilisation %
                  </label>
                  <input
                    id="maxUtil"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="100"
                    value={filters.maxUtilisation || ''}
                    onChange={(e) => setFilters({ ...filters, maxUtilisation: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex gap-1.5 md:gap-2 mt-2 md:mt-4">
                <button
                  onClick={applyFilters}
                  disabled={loading}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 font-semibold"
                >
                  <Filter className="h-3 w-3 md:h-4 md:w-4" />
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between px-1 md:px-0">
          <p className="text-xs md:text-sm text-gray-600">
            Showing <span className="font-semibold">{poolData.length}</span> results
          </p>
        </div>

        {/* Pool Data Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider w-8 md:w-12"></th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Week</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Date</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Day</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Session</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Time</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Specialty</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider hidden md:table-cell">Subspecialty</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Surgeon</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider hidden md:table-cell">Anaesthetist</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Procs</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">PCS</th>
                  <th className="px-2 md:px-3 py-2 md:py-3 text-left text-[10px] md:text-xs font-medium text-teal-800 uppercase tracking-wider">Util%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {poolData.map((list) => {
                  const utilisation = Math.round((list.totalPCS / list.maxPCS) * 100);
                  const isExpanded = expandedRow === list.id;

                  return (
                    <React.Fragment key={list.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-2 md:px-3 py-2 md:py-3">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : list.id)}
                            className="p-0.5 md:p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />}
                          </button>
                        </td>
                        <td className="px-2 md:px-3 py-2 md:py-3 font-medium text-[10px] md:text-sm">W{list.weekNumber}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm">{list.date}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm">{list.dayOfWeek.substring(0, 3)}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3">
                          <span className="px-1.5 md:px-2 py-0.5 md:py-1 text-[9px] md:text-xs font-medium bg-cyan-100 text-cyan-800 rounded">
                            {list.sessionType}
                          </span>
                        </td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm text-gray-600">
                          {list.sessionStart}-{list.sessionEnd}
                        </td>
                        <td className="px-2 md:px-3 py-2 md:py-3 font-medium text-[10px] md:text-sm truncate max-w-[100px]">{list.specialty}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm text-gray-600 truncate max-w-[80px] hidden md:table-cell">{list.subspecialty || '-'}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm truncate max-w-[100px]">{list.surgeon}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-[10px] md:text-sm truncate max-w-[100px] hidden md:table-cell">{list.anaesthetist}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3 text-center text-[10px] md:text-sm">{list.procedures?.length || 0}</td>
                        <td className="px-2 md:px-3 py-2 md:py-3">
                          <span className="text-[10px] md:text-sm font-medium">
                            {list.totalPCS}/{list.maxPCS}
                          </span>
                        </td>
                        <td className="px-2 md:px-3 py-2 md:py-3">
                          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[9px] md:text-xs font-medium rounded ${getUtilisationColor(utilisation)}`}>
                            {utilisation}%
                          </span>
                        </td>
                      </tr>

                      {/* Expanded Row - Procedures */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={13} className="px-4 py-4 bg-gray-50">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900">Procedures ({list.procedures?.length || 0})</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {(list.procedures || []).map((proc, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200"
                                  >
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(proc.priority)}`}>
                                      {proc.priority}
                                    </span>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-900">{proc.name}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">
                                          OPCS: {proc.opcs4.join(', ')}
                                        </span>
                                        <span className="text-xs font-medium text-blue-600">
                                          PCS: {proc.pcsScore}
                                        </span>
                                        {proc.replaceable && (
                                          <span className="px-2 py-0.5 text-xs border border-gray-300 rounded">
                                            Replaceable
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {poolData.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <p className="text-xs md:text-sm text-gray-500">No schedule lists found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-3 md:mt-4 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
