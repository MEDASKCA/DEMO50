'use client';

import React, { useState, useEffect } from 'react';
import {
  getSchedulePool,
  getPoolSpecialties,
  getPoolSurgeons,
  getPoolStatistics,
  ProcedurePoolItem,
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

export default function ListManagementContent() {
  const [poolData, setPoolData] = useState<ProcedurePoolItem[]>([]);
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

  const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];

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
      'Procedure Name',
      'OPCS4 Codes',
      'Specialty',
      'Subspecialty',
      'Surgeon',
      'Surgeon Initials',
      'Priority',
      'PCS Score',
      'Year',
      'Created At'
    ];

    const rows = poolData.map(procedure => [
      procedure.id,
      procedure.name,
      procedure.opcs4.join('; '),
      procedure.specialty,
      procedure.subspecialty || '',
      procedure.surgeon,
      procedure.surgeonInitials,
      procedure.priority,
      procedure.pcsScore,
      procedure.year,
      procedure.createdAt
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `procedure-pool-2025-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getPcsScoreColor = (score: number): string => {
    if (score >= 15) return 'bg-red-100 text-red-800'; // High complexity
    if (score >= 10) return 'bg-yellow-100 text-yellow-800'; // Medium complexity
    return 'bg-green-100 text-green-800'; // Low complexity
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
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Procedure Pool 2025</h1>
            <p className="text-gray-600 mt-1">
              Year-long procedure pool with {statistics?.totalProcedures.toLocaleString() || 0} procedures
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
            <button
              onClick={loadInitialData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Procedures</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {statistics.totalProcedures.toLocaleString()}
                  </p>
                </div>
                <Stethoscope className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg PCS Score</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {Math.round(statistics.averageUtilisation)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Specialties</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {specialties.length}
                  </p>
                </div>
                <User className="h-8 w-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Surgeons</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {surgeons.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Specialty Filter */}
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    value={filters.specialty || ''}
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Subspecialty Filter */}
                <div>
                  <label htmlFor="subspecialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Subspecialty
                  </label>
                  <input
                    id="subspecialty"
                    type="text"
                    placeholder="Enter subspecialty"
                    value={filters.subspecialty || ''}
                    onChange={(e) => setFilters({ ...filters, subspecialty: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Priority Filter */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={filters.priority || ''}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value as any || undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Priorities</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                {/* Surgeon Filter */}
                <div>
                  <label htmlFor="surgeon" className="block text-sm font-medium text-gray-700 mb-1">
                    Surgeon
                  </label>
                  <select
                    id="surgeon"
                    value={filters.surgeon || ''}
                    onChange={(e) => setFilters({ ...filters, surgeon: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Surgeons</option>
                    {surgeons.map(surg => (
                      <option key={surg} value={surg}>{surg}</option>
                    ))}
                  </select>
                </div>

                {/* PCS Score Range */}
                <div>
                  <label htmlFor="minPcs" className="block text-sm font-medium text-gray-700 mb-1">
                    Min PCS Score
                  </label>
                  <input
                    id="minPcs"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="0"
                    value={filters.minUtilisation || ''}
                    onChange={(e) => setFilters({ ...filters, minUtilisation: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="maxPcs" className="block text-sm font-medium text-gray-700 mb-1">
                    Max PCS Score
                  </label>
                  <input
                    id="maxPcs"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="50"
                    value={filters.maxUtilisation || ''}
                    onChange={(e) => setFilters({ ...filters, maxUtilisation: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilters}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Filter className="h-4 w-4" />
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{poolData.length}</span> results
          </p>
        </div>

        {/* Procedure Pool Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OPCS4 Codes</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subspecialty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surgeon</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PCS Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {poolData.map((procedure) => {
                  const isExpanded = expandedRow === procedure.id;

                  return (
                    <React.Fragment key={procedure.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : procedure.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-medium text-sm">{procedure.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {procedure.opcs4.map((code, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                                {code}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{procedure.specialty}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{procedure.subspecialty || '-'}</td>
                        <td className="px-4 py-3 text-sm">
                          <div>
                            <p className="font-medium">{procedure.surgeon}</p>
                            <p className="text-xs text-gray-500">{procedure.surgeonInitials}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(procedure.priority)}`}>
                            {procedure.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getPcsScoreColor(procedure.pcsScore)}`}>
                            {procedure.pcsScore}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded Row - Procedure Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-4 py-4 bg-gray-50">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900">Procedure Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white rounded border border-gray-200 p-3">
                                  <p className="text-xs text-gray-500 mb-1">Procedure ID</p>
                                  <p className="text-sm font-medium">{procedure.id}</p>
                                </div>
                                <div className="bg-white rounded border border-gray-200 p-3">
                                  <p className="text-xs text-gray-500 mb-1">Year</p>
                                  <p className="text-sm font-medium">{procedure.year}</p>
                                </div>
                                <div className="bg-white rounded border border-gray-200 p-3">
                                  <p className="text-xs text-gray-500 mb-1">Created At</p>
                                  <p className="text-sm font-medium">{procedure.createdAt}</p>
                                </div>
                                <div className="bg-white rounded border border-gray-200 p-3">
                                  <p className="text-xs text-gray-500 mb-1">Status</p>
                                  <p className="text-sm font-medium">
                                    {procedure.isActive ? (
                                      <span className="text-green-600">Active</span>
                                    ) : (
                                      <span className="text-gray-500">Inactive</span>
                                    )}
                                  </p>
                                </div>
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
            <div className="text-center py-12">
              <p className="text-gray-500">No procedures found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
