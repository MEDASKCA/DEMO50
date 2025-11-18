'use client';

import React, { useState, useMemo } from 'react';
import {
  PoundSterling,
  Users,
  TrendingUp,
  Download,
  Save,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import {
  defaultFinanceConfig,
  royalLondonDefault,
  calculateAnnualCost,
  StaffingScenario,
  staffRoles
} from '@/lib/financeConfig';

export default function StaffingCostCalculator() {
  const [scenario, setScenario] = useState<StaffingScenario>(royalLondonDefault);
  const [config, setConfig] = useState(defaultFinanceConfig);
  const [showOncosts, setShowOncosts] = useState(true);

  // Calculate costs for each role
  const roleCosts = useMemo(() => {
    const costs: Record<string, { fte: number; baseCost: number; totalCost: number }> = {};

    scenario.roles.forEach(role => {
      const bandKey = role.band as keyof typeof config.salaryScales;
      const salary = config.salaryScales[bandKey]?.avg || 0;
      const baseCost = role.fte * salary;
      const oncosts = baseCost * (config.oncostPercentage / 100);
      const totalCost = baseCost + oncosts;

      const key = `${role.roleId}-${role.band}`;
      costs[key] = {
        fte: role.fte,
        baseCost,
        totalCost: showOncosts ? totalCost : baseCost
      };
    });

    return costs;
  }, [scenario, config, showOncosts]);

  // Calculate totals
  const totals = useMemo(() => {
    let totalFTE = 0;
    let baseCost = 0;
    let totalCost = 0;

    Object.values(roleCosts).forEach(cost => {
      totalFTE += cost.fte;
      baseCost += cost.baseCost;
      totalCost += cost.totalCost;
    });

    const oncosts = baseCost * (config.oncostPercentage / 100);

    return { totalFTE, baseCost, oncosts, totalCost: showOncosts ? totalCost : baseCost };
  }, [roleCosts, config, showOncosts]);

  // Update FTE for a specific role
  const updateFTE = (roleId: string, band: string, newFTE: number) => {
    setScenario(prev => ({
      ...prev,
      roles: prev.roles.map(role =>
        role.roleId === roleId && role.band === band
          ? { ...role, fte: Math.max(0, newFTE) }
          : role
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Group roles by category
  const groupedRoles = useMemo(() => {
    const groups: Record<string, typeof scenario.roles> = {
      anaes: [],
      scrub: [],
      recovery: [],
      hca: [],
      management: []
    };

    scenario.roles.forEach(role => {
      if (role.roleId === 'anaes') groups.anaes.push(role);
      else if (role.roleId === 'scrub') groups.scrub.push(role);
      else if (role.roleId === 'recovery') groups.recovery.push(role);
      else if (role.roleId === 'hca') groups.hca.push(role);
      else groups.management.push(role);
    });

    return groups;
  }, [scenario]);

  // Reset to default
  const resetToDefault = () => {
    setScenario(royalLondonDefault);
  };

  // Export scenario
  const exportScenario = () => {
    const dataStr = JSON.stringify(scenario, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `staffing-scenario-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-base md:text-2xl font-bold text-gray-900">Staffing Cost Calculator</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">{scenario.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs md:text-sm"
          >
            <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={exportScenario}
            className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs md:text-sm"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 md:p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-semibold text-blue-900">Total FTE</span>
          </div>
          <div className="text-xl md:text-3xl font-bold text-blue-900">{totals.totalFTE.toFixed(1)}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 md:p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <PoundSterling className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <span className="text-xs md:text-sm font-semibold text-green-900">Base Cost</span>
          </div>
          <div className="text-xl md:text-3xl font-bold text-green-900">{formatCurrency(totals.baseCost)}</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 md:p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
            <span className="text-xs md:text-sm font-semibold text-amber-900">Oncosts ({config.oncostPercentage}%)</span>
          </div>
          <div className="text-xl md:text-3xl font-bold text-amber-900">{formatCurrency(totals.oncosts)}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 md:p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <PoundSterling className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <span className="text-xs md:text-sm font-semibold text-purple-900">Annual Total</span>
          </div>
          <div className="text-xl md:text-3xl font-bold text-purple-900">{formatCurrency(totals.totalCost)}</div>
        </div>
      </div>

      {/* Toggle Oncosts */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 md:p-3">
        <input
          type="checkbox"
          id="showOncosts"
          checked={showOncosts}
          onChange={(e) => setShowOncosts(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="showOncosts" className="text-xs md:text-sm text-gray-700">
          Include oncosts (NI, pension, etc.) - {config.oncostPercentage}%
        </label>
      </div>

      {/* Anaesthetic Staff */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 border-b border-blue-200 px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold text-blue-900">ANAESTHETIC STAFF (N/P)</h3>
        </div>
        <div className="p-2 md:p-4 space-y-2 md:space-y-4">
          {groupedRoles.anaes.map((role) => {
            const key = `${role.roleId}-${role.band}`;
            const cost = roleCosts[key];
            const bandKey = role.band as keyof typeof config.salaryScales;
            const salary = config.salaryScales[bandKey]?.avg || 0;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-2 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">{role.band.toUpperCase()} - {role.qualification || 'RN/ODP'}</h4>
                    <p className="text-xs text-gray-600">Avg: {formatCurrency(salary)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-lg font-bold text-blue-600">{formatCurrency(cost.totalCost)}</div>
                    <div className="text-xs text-gray-500">{role.fte} FTE</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte - 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value))}
                    className="flex-1"
                  />

                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte + 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="number"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value) || 0)}
                    className="w-16 md:w-20 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-center text-sm"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrub Staff */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-green-50 border-b border-green-200 px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold text-green-900">SCRUB STAFF (N/P)</h3>
        </div>
        <div className="p-2 md:p-4 space-y-2 md:space-y-4">
          {groupedRoles.scrub.map((role) => {
            const key = `${role.roleId}-${role.band}`;
            const cost = roleCosts[key];
            const bandKey = role.band as keyof typeof config.salaryScales;
            const salary = config.salaryScales[bandKey]?.avg || 0;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-2 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">{role.band.toUpperCase()} - {role.qualification || 'RN/ODP'}</h4>
                    <p className="text-xs text-gray-600">Avg: {formatCurrency(salary)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-lg font-bold text-green-600">{formatCurrency(cost.totalCost)}</div>
                    <div className="text-xs text-gray-500">{role.fte} FTE</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte - 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="0.5"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value))}
                    className="flex-1"
                  />

                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte + 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="number"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value) || 0)}
                    className="w-16 md:w-20 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-center text-sm"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recovery Staff */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-teal-50 border-b border-teal-200 px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold text-teal-900">RECOVERY NURSES (RN)</h3>
        </div>
        <div className="p-2 md:p-4 space-y-2 md:space-y-4">
          {groupedRoles.recovery.map((role) => {
            const key = `${role.roleId}-${role.band}`;
            const cost = roleCosts[key];
            const bandKey = role.band as keyof typeof config.salaryScales;
            const salary = config.salaryScales[bandKey]?.avg || 0;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-2 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">{role.band.toUpperCase()} - {role.qualification || 'RN'}</h4>
                    <p className="text-xs text-gray-600">Avg: {formatCurrency(salary)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-lg font-bold text-teal-600">{formatCurrency(cost.totalCost)}</div>
                    <div className="text-xs text-gray-500">{role.fte} FTE</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte - 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.5"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value))}
                    className="flex-1"
                  />

                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte + 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="number"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value) || 0)}
                    className="w-16 md:w-20 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-center text-sm"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Healthcare Assistants */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-amber-50 border-b border-amber-200 px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold text-amber-900">HEALTHCARE ASSISTANTS</h3>
        </div>
        <div className="p-2 md:p-4 space-y-2 md:space-y-4">
          {groupedRoles.hca.map((role) => {
            const key = `${role.roleId}-${role.band}`;
            const cost = roleCosts[key];
            const bandKey = role.band as keyof typeof config.salaryScales;
            const salary = config.salaryScales[bandKey]?.avg || 0;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-2 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">{role.band.toUpperCase()}</h4>
                    <p className="text-xs text-gray-600">Avg: {formatCurrency(salary)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-lg font-bold text-amber-600">{formatCurrency(cost.totalCost)}</div>
                    <div className="text-xs text-gray-500">{role.fte} FTE</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte - 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value))}
                    className="flex-1"
                  />

                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte + 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="number"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value) || 0)}
                    className="w-16 md:w-20 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-center text-sm"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Management */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-purple-50 border-b border-purple-200 px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold text-purple-900">MANAGEMENT & LEADERSHIP</h3>
        </div>
        <div className="p-2 md:p-4 space-y-2 md:space-y-4">
          {groupedRoles.management.map((role) => {
            const key = `${role.roleId}-${role.band}`;
            const cost = roleCosts[key];
            const bandKey = role.band as keyof typeof config.salaryScales;
            const salary = config.salaryScales[bandKey]?.avg || 0;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-2 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">{role.band.toUpperCase()}</h4>
                    <p className="text-xs text-gray-600">Avg: {formatCurrency(salary)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm md:text-lg font-bold text-purple-600">{formatCurrency(cost.totalCost)}</div>
                    <div className="text-xs text-gray-500">{role.fte} FTE</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte - 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value))}
                    className="flex-1"
                  />

                  <button
                    onClick={() => updateFTE(role.roleId, role.band, role.fte + 1)}
                    className="p-1 md:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <input
                    type="number"
                    value={role.fte}
                    onChange={(e) => updateFTE(role.roleId, role.band, parseFloat(e.target.value) || 0)}
                    className="w-16 md:w-20 px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-center text-sm"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 text-white px-3 md:px-4 py-2 md:py-3">
          <h3 className="text-xs md:text-sm font-bold">COST SUMMARY</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Grade</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">FTE</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Avg Salary</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Annual Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scenario.roles.map(role => {
                const key = `${role.roleId}-${role.band}`;
                const cost = roleCosts[key];
                const bandKey = role.band as keyof typeof config.salaryScales;
                const salary = config.salaryScales[bandKey]?.avg || 0;

                return (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-900">{role.band.toUpperCase()}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-900">{role.fte}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-700 hidden sm:table-cell">{formatCurrency(salary)}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right font-semibold text-gray-900">{formatCurrency(cost.totalCost)}</td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 border-t-2 border-gray-300">
                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-900">Subtotal</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right font-bold text-gray-900">{totals.totalFTE.toFixed(1)}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 hidden sm:table-cell"></td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right font-bold text-gray-900">{formatCurrency(totals.baseCost)}</td>
              </tr>
              {showOncosts && (
                <tr className="bg-amber-50">
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-amber-900" colSpan={3}>Oncosts ({config.oncostPercentage}%)</td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-right font-semibold text-amber-900">{formatCurrency(totals.oncosts)}</td>
                </tr>
              )}
              <tr className="bg-blue-50 border-t-2 border-blue-300">
                <td className="py-3 md:py-4 px-2 md:px-4 text-sm md:text-lg font-bold text-blue-900" colSpan={3}>TOTAL ANNUAL BUDGET</td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-base md:text-xl text-right font-bold text-blue-900">{formatCurrency(totals.totalCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
