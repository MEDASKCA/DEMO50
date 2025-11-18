'use client';

import React from 'react';
import {
  X,
  User,
  Clock,
  MapPin,
  Coffee,
  Award,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

interface StaffInfoMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: {
    name: string;
    role: string;
    theatre?: string;
  } | null;
  onViewFullProfile: () => void;
}

export default function StaffInfoMobileModal({
  isOpen,
  onClose,
  staff,
  onViewFullProfile
}: StaffInfoMobileModalProps) {
  if (!isOpen || !staff) return null;

  // Mock data - in real app, fetch from API based on staff.name
  // Use staff name as seed for consistent random values
  const nameSeed = staff.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seededRandom = (index: number) => {
    const x = Math.sin(nameSeed + index) * 10000;
    return x - Math.floor(x);
  };

  const isSenior = staff.role.includes('Consultant') || staff.role.includes('Surgeon');

  const staffDetails = {
    employeeId: 'TS' + Math.floor(seededRandom(1) * 9000 + 1000),
    grade: isSenior ? 'Consultant' : 'Band 7',
    shiftStart: '08:00',
    shiftEnd: '18:00',
    currentLocation: staff.theatre || 'Main Theatre 4',
    breaksTaken: Math.floor(seededRandom(2) * 2),
    breaksScheduled: 2,
    lastBreak: seededRandom(3) > 0.5 ? '12:15 PM (30 mins)' : null,
    status: seededRandom(4) > 0.7 ? 'On scheduled break' : 'On duty',
    casesToday: Math.floor(seededRandom(5) * 3) + 1,
    efficiency: 92 + Math.floor(seededRandom(6) * 8),
    hoursWorked: 6.5 + seededRandom(7) * 2,
    overtimeThisWeek: Math.floor(seededRandom(8) * 5),
    clinicalNotes: isSenior
      ? [
          'Leading THR case since 09:30',
          'Supervising 2 trainees',
          'On-call senior for trauma'
        ]
      : null,
    competencies: !isSenior
      ? [
          { specialty: 'Orthopaedic Trauma', level: 'Expert' },
          { specialty: 'General Anaesthesia', level: 'Competent' }
        ]
      : null,
    reliefAvailable: !isSenior && seededRandom(9) > 0.5,
    performance: {
      casesCompleted: Math.floor(seededRandom(10) * 3) + 1,
      efficiency: 92 + Math.floor(seededRandom(11) * 8),
      onTimeStart: seededRandom(12) > 0.2
    }
  };

  const getCompetencyColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Competent':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Learning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      {/* Full Screen View - Mobile Only */}
      <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">{staff.name}</h3>
                    <p className="text-blue-100 text-sm">{staff.role}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-800 bg-opacity-40 rounded-lg p-3">
                <p className="text-xs text-blue-200 mb-1">ID • Grade</p>
                <p className="text-sm font-bold">{staffDetails.employeeId} • {staffDetails.grade}</p>
              </div>
              <div className="bg-blue-800 bg-opacity-40 rounded-lg p-3">
                <p className="text-xs text-blue-200 mb-1">Shift Today</p>
                <p className="text-sm font-bold">
                  {staffDetails.shiftStart} - {staffDetails.shiftEnd}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Current Status */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-blue-600" />
                Current Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      staffDetails.status.includes('break')
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {staffDetails.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
                    Location
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {staffDetails.currentLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
                    Hours Worked
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {staffDetails.hoursWorked.toFixed(1)} hrs
                  </span>
                </div>
              </div>
            </div>

            {/* Senior Staff: Clinical Notes */}
            {isSenior && staffDetails.clinicalNotes && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Clinical Notes
                </h4>
                <ul className="space-y-2">
                  {staffDetails.clinicalNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* N/P Staff: Breaks & Relief */}
            {!isSenior && (
              <>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center">
                    <Coffee className="w-4 h-4 mr-2 text-blue-600" />
                    Breaks & Wellbeing
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Breaks Taken</span>
                      <span className="text-sm font-bold text-gray-900">
                        {staffDetails.breaksTaken} / {staffDetails.breaksScheduled}
                      </span>
                    </div>
                    {staffDetails.lastBreak && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Break</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {staffDetails.lastBreak}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Relief Available</span>
                      {staffDetails.reliefAvailable ? (
                        <span className="text-sm font-bold text-emerald-700 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-amber-700 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Limited
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Competencies */}
                {staffDetails.competencies && (
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-600" />
                      Top Competencies
                    </h4>
                    <div className="space-y-2">
                      {staffDetails.competencies.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">{comp.specialty}</span>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full border-2 ${getCompetencyColor(
                              comp.level
                            )}`}
                          >
                            {comp.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Performance Today */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                Performance Today
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">
                    {staffDetails.performance.casesCompleted}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Cases Completed</p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-700">
                    {staffDetails.performance.efficiency}%
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Efficiency</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">On-time Start</span>
                {staffDetails.performance.onTimeStart ? (
                  <span className="text-sm font-bold text-emerald-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Yes
                  </span>
                ) : (
                  <span className="text-sm font-bold text-amber-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Late
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Action Button */}
          <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
            <button
              onClick={onViewFullProfile}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span>View Full Competency Profile</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-gray-500 text-center mt-3 italic">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
    </>
  );
}
