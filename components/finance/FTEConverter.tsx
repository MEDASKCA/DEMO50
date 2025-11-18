'use client';

import React, { useState, useMemo } from 'react';
import { Users, Clock, Calculator } from 'lucide-react';

export default function FTEConverter() {
  const [targetFTE, setTargetFTE] = useState(76);
  const [fullTimePercent, setFullTimePercent] = useState(70);
  const [partTime30Percent, setPartTime30Percent] = useState(20);
  const [partTime22Percent, setPartTime22Percent] = useState(10);

  const calculations = useMemo(() => {
    // Normalize percentages to 100%
    const total = fullTimePercent + partTime30Percent + partTime22Percent;
    const normFullTime = (fullTimePercent / total) * 100;
    const normPart30 = (partTime30Percent / total) * 100;
    const normPart22 = (partTime22Percent / total) * 100;

    // Calculate FTE for each category
    const fteFullTime = targetFTE * (normFullTime / 100);
    const ftePart30 = targetFTE * (normPart30 / 100);
    const ftePart22 = targetFTE * (normPart22 / 100);

    // Convert to headcount
    const headcountFullTime = Math.ceil(fteFullTime / 1);
    const headcountPart30 = Math.ceil(ftePart30 / (30 / 37.5));
    const headcountPart22 = Math.ceil(ftePart22 / (22.5 / 37.5));

    const totalHeadcount = headcountFullTime + headcountPart30 + headcountPart22;

    // Calculate actual FTE from headcount
    const actualFTE =
      (headcountFullTime * 1) +
      (headcountPart30 * (30 / 37.5)) +
      (headcountPart22 * (22.5 / 37.5));

    return {
      fullTime: {
        fte: fteFullTime.toFixed(1),
        headcount: headcountFullTime,
        hours: 37.5,
        actualFTE: (headcountFullTime * 1).toFixed(1)
      },
      partTime30: {
        fte: ftePart30.toFixed(1),
        headcount: headcountPart30,
        hours: 30,
        actualFTE: (headcountPart30 * (30 / 37.5)).toFixed(1)
      },
      partTime22: {
        fte: ftePart22.toFixed(1),
        headcount: headcountPart22,
        hours: 22.5,
        actualFTE: (headcountPart22 * (22.5 / 37.5)).toFixed(1)
      },
      totalHeadcount,
      actualFTE: actualFTE.toFixed(1),
      variance: (actualFTE - targetFTE).toFixed(1)
    };
  }, [targetFTE, fullTimePercent, partTime30Percent, partTime22Percent]);

  return (
    <div className="space-y-3 md:space-y-6">
      <div>
        <h2 className="text-base md:text-2xl font-bold text-gray-900">FTE to Headcount Converter</h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">Convert FTE requirements to actual staff headcount based on part-time mix</p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-3 md:mb-4">Configuration</h3>

          <div className="space-y-3 md:space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Target FTE Required
              </label>
              <input
                type="number"
                value={targetFTE}
                onChange={(e) => setTargetFTE(parseFloat(e.target.value) || 0)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-base md:text-lg font-bold"
                min="0"
                step="0.5"
              />
            </div>

            <div className="border-t border-gray-200 pt-3 md:pt-4">
              <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Part-Time Mix</h4>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <label className="text-xs md:text-sm font-medium text-gray-700">
                      Full-Time (37.5h/week)
                    </label>
                    <span className="text-xs md:text-sm font-bold text-gray-900">{fullTimePercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fullTimePercent}
                    onChange={(e) => setFullTimePercent(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <label className="text-xs md:text-sm font-medium text-gray-700">
                      Part-Time (30h/week)
                    </label>
                    <span className="text-xs md:text-sm font-bold text-gray-900">{partTime30Percent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={partTime30Percent}
                    onChange={(e) => setPartTime30Percent(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <label className="text-xs md:text-sm font-medium text-gray-700">
                      Part-Time (22.5h/week)
                    </label>
                    <span className="text-xs md:text-sm font-bold text-gray-900">{partTime22Percent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={partTime22Percent}
                    onChange={(e) => setPartTime22Percent(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 md:p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
              <span className="text-xs md:text-sm font-semibold text-blue-900">Total Headcount Needed</span>
            </div>
            <div className="text-3xl md:text-5xl font-bold text-blue-900">{calculations.totalHeadcount}</div>
            <p className="text-xs md:text-sm text-blue-700 mt-1 md:mt-2">Staff members to employ</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 md:p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Calculator className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <span className="text-xs md:text-sm font-semibold text-green-900">Actual FTE Delivered</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-green-900">{calculations.actualFTE}</div>
            <p className="text-xs md:text-sm text-green-700 mt-1 md:mt-2">
              {parseFloat(calculations.variance) >= 0 ? '+' : ''}{calculations.variance} variance from target
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 md:p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              <span className="text-xs md:text-sm font-semibold text-purple-900">Avg Hours per Staff</span>
            </div>
            <div className="text-2xl md:text-4xl font-bold text-purple-900">
              {((parseFloat(calculations.actualFTE) / calculations.totalHeadcount) * 37.5).toFixed(1)}h
            </div>
            <p className="text-xs md:text-sm text-purple-700 mt-1 md:mt-2">Per week average</p>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 text-white px-3 md:px-6 py-2 md:py-4">
          <h3 className="text-xs md:text-sm font-bold">STAFFING BREAKDOWN</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700">Working Pattern</th>
                <th className="text-center py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Hours/Week</th>
                <th className="text-center py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700">Target FTE</th>
                <th className="text-center py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700">Headcount</th>
                <th className="text-center py-2 md:py-3 px-2 md:px-6 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Actual FTE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-blue-50">
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm font-medium text-gray-900">Full-Time</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.fullTime.hours}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900">{calculations.fullTime.fte}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center font-bold text-blue-600">{calculations.fullTime.headcount}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.fullTime.actualFTE}</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm font-medium text-gray-900">Part-Time (30h)</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.partTime30.hours}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900">{calculations.partTime30.fte}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center font-bold text-green-600">{calculations.partTime30.headcount}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.partTime30.actualFTE}</td>
              </tr>
              <tr className="hover:bg-purple-50">
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm font-medium text-gray-900">Part-Time (22.5h)</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.partTime22.hours}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900">{calculations.partTime22.fte}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center font-bold text-purple-600">{calculations.partTime22.headcount}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-gray-900 hidden sm:table-cell">{calculations.partTime22.actualFTE}</td>
              </tr>
              <tr className="bg-blue-50 border-t-2 border-blue-300">
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm font-bold text-blue-900">TOTAL</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center text-blue-900 hidden sm:table-cell">—</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center font-bold text-blue-900">{targetFTE}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-sm md:text-lg text-center font-bold text-blue-900">{calculations.totalHeadcount}</td>
                <td className="py-2 md:py-4 px-2 md:px-6 text-xs md:text-sm text-center font-bold text-blue-900 hidden sm:table-cell">{calculations.actualFTE}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-6">
        <h3 className="text-xs md:text-sm font-bold text-green-900 mb-2 md:mb-3">BENEFITS OF PART-TIME MIX</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-green-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Flexibility:</strong> Attract experienced staff who need flexible hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Retention:</strong> Keep skilled staff who might otherwise leave</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Coverage:</strong> More staff for peak periods and leave cover</span>
            </li>
          </ul>
          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-green-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Fresh perspectives:</strong> Reduced burnout with shorter shifts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Work-life balance:</strong> Improved staff wellbeing and satisfaction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><strong>Cost efficiency:</strong> Balance experience with workforce flexibility</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
