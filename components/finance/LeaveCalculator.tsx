'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { defaultFinanceConfig } from '@/lib/financeConfig';

export default function LeaveCalculator() {
  const [totalStaff, setTotalStaff] = useState(160);
  const [leaveDays, setLeaveDays] = useState(27);
  const [bankHolidays, setBankHolidays] = useState(8);
  const [sicknessRate, setSicknessRate] = useState(5);

  const calculations = useMemo(() => {
    const totalLeaveDaysPerPerson = leaveDays + bankHolidays;
    const sicknessDaysPerPerson = (260 * sicknessRate) / 100; // Working days per year
    const totalAbsenceDays = totalLeaveDaysPerPerson + sicknessDaysPerPerson;

    const totalLeavePoolDays = totalStaff * totalLeaveDaysPerPerson;
    const totalSicknessPoolDays = totalStaff * sicknessDaysPerPerson;
    const totalAbsencePoolDays = totalStaff * totalAbsenceDays;

    const dailyLeaveAverage = totalLeavePoolDays / 365;
    const dailySicknessAverage = totalSicknessPoolDays / 365;
    const dailyAbsenceAverage = totalAbsencePoolDays / 365;

    const coverageFTE = dailyAbsenceAverage / 5; // 5-day week
    const coveragePercentage = (coverageFTE / totalStaff) * 100;

    return {
      totalLeaveDaysPerPerson,
      sicknessDaysPerPerson: sicknessDaysPerPerson.toFixed(1),
      totalAbsenceDays: totalAbsenceDays.toFixed(1),
      totalLeavePoolDays: totalLeavePoolDays.toFixed(0),
      totalSicknessPoolDays: totalSicknessPoolDays.toFixed(0),
      totalAbsencePoolDays: totalAbsencePoolDays.toFixed(0),
      dailyLeaveAverage: dailyLeaveAverage.toFixed(1),
      dailySicknessAverage: dailySicknessAverage.toFixed(1),
      dailyAbsenceAverage: dailyAbsenceAverage.toFixed(1),
      coverageFTE: coverageFTE.toFixed(1),
      coveragePercentage: coveragePercentage.toFixed(1)
    };
  }, [totalStaff, leaveDays, bankHolidays, sicknessRate]);

  return (
    <div className="space-y-3 md:space-y-6">
      <div>
        <h2 className="text-base md:text-2xl font-bold text-gray-900">Annual Leave & Absence Calculator</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">Calculate coverage requirements for leave and sickness</p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-3 md:mb-4">Staffing Parameters</h3>

          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Total Staff (FTE)
              </label>
              <input
                type="number"
                value={totalStaff}
                onChange={(e) => setTotalStaff(parseInt(e.target.value) || 0)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Annual Leave Days
              </label>
              <input
                type="number"
                value={leaveDays}
                onChange={(e) => setLeaveDays(parseInt(e.target.value) || 0)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Bank Holidays
              </label>
              <input
                type="number"
                value={bankHolidays}
                onChange={(e) => setBankHolidays(parseInt(e.target.value) || 0)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
                max="15"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Sickness Absence Rate (%)
              </label>
              <input
                type="number"
                value={sicknessRate}
                onChange={(e) => setSicknessRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
                max="20"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">NHS average: 5.0% | Trust target: 3.5%</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 md:p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <span className="text-xs md:text-sm font-semibold text-blue-900">Leave Days per Person</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-blue-900">{calculations.totalLeaveDaysPerPerson}</div>
            <p className="text-xs text-blue-700 mt-1">Annual leave + bank holidays</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 md:p-6 border border-amber-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span className="text-xs md:text-sm font-semibold text-amber-900">Sickness Days per Person</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-amber-900">{calculations.sicknessDaysPerPerson}</div>
            <p className="text-xs text-amber-700 mt-1">Based on {sicknessRate}% absence rate</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 md:p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              <span className="text-xs md:text-sm font-semibold text-purple-900">Total Absence per Person</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-purple-900">{calculations.totalAbsenceDays}</div>
            <p className="text-xs text-purple-700 mt-1">Leave + sickness combined</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-green-50 border-b border-green-200 px-3 md:px-6 py-2 md:py-4">
          <h3 className="text-xs md:text-sm font-bold text-green-900">COVERAGE REQUIREMENTS</h3>
        </div>
        <div className="p-3 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1 md:mb-2">DAILY AVERAGE ON LEAVE</h4>
              <div className="text-xl md:text-3xl font-bold text-gray-900">{calculations.dailyLeaveAverage}</div>
              <p className="text-xs text-gray-500 mt-1">Staff on annual leave each day</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1 md:mb-2">DAILY AVERAGE SICK</h4>
              <div className="text-xl md:text-3xl font-bold text-gray-900">{calculations.dailySicknessAverage}</div>
              <p className="text-xs text-gray-500 mt-1">Staff on sick leave each day</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-1 md:mb-2">TOTAL DAILY ABSENCE</h4>
              <div className="text-xl md:text-3xl font-bold text-gray-900">{calculations.dailyAbsenceAverage}</div>
              <p className="text-xs text-gray-500 mt-1">Combined absence per day</p>
            </div>
          </div>

          <div className="mt-4 md:mt-8 pt-3 md:pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs md:text-sm font-semibold mb-1 md:mb-2">ADDITIONAL COVERAGE FTE REQUIRED</h4>
                  <div className="text-3xl md:text-5xl font-bold">{calculations.coverageFTE}</div>
                  <p className="text-xs md:text-sm mt-1 md:mt-2 opacity-90">
                    {calculations.coveragePercentage}% above base staffing
                  </p>
                </div>
                <Users className="w-12 h-12 md:w-24 md:h-24 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Totals */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-3 md:px-6 py-2 md:py-4">
          <h3 className="text-xs md:text-sm font-bold text-gray-900">ANNUAL TOTALS (ALL STAFF)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700">Absence Type</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700">Total Days</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Cost Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-gray-900">Annual Leave</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right text-gray-900">{calculations.totalLeavePoolDays} days</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right text-green-600 hidden sm:table-cell">Planned</td>
              </tr>
              <tr>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-gray-900">Sickness Absence</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right text-gray-900">{calculations.totalSicknessPoolDays} days</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right text-amber-600 hidden sm:table-cell">Bank/Agency</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-bold text-gray-900">Total Absence</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right font-bold text-gray-900">{calculations.totalAbsencePoolDays} days</td>
                <td className="py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm text-right font-bold text-blue-600 hidden sm:table-cell">Coverage Required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-6">
        <h3 className="text-xs md:text-sm font-bold text-blue-900 mb-2 md:mb-3">WORKFORCE PLANNING RECOMMENDATIONS</h3>
        <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Budget for <strong>{calculations.coverageFTE} additional FTE</strong> to cover leave and sickness</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Use coverage multiplier of <strong>1.35×</strong> when calculating staffing requirements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Maintain bank/flexible pool of <strong>10-15%</strong> for peak periods</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>Target sickness rate of <strong>3.5%</strong> to reduce unplanned absence</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
