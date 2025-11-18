'use client';

import React, { useState } from 'react';
import {
  X,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  Activity
} from 'lucide-react';

interface StaffDutyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRoster?: () => void;
  selectedUnit?: 'all' | 'main' | 'acad' | 'recovery';
}

export default function StaffDutyModal({
  isOpen,
  onClose,
  onNavigateToRoster,
  selectedUnit = 'all'
}: StaffDutyModalProps) {
  const [showAvailableStaff, setShowAvailableStaff] = useState(false);
  const [selectedDate, setSelectedDate] = useState<'today' | 'week' | 'month'>('today');

  if (!isOpen) return null;

  // ---- Demo data (unchanged) ----
  const staffSummary = {
    totalOnDuty: 156,
    onBreak: 7,
    arrivingLate: 3,
    sickToday: 5,
    vacantShifts: { tomorrow: 2, next7Days: 8 }
  };

  const sickStaff = [
    {
      name: 'RN S. Williams',
      role: 'Scrub N/P',
      department: 'Main Theatres',
      reason: 'Flu symptoms',
      startDate: '2024-10-21',
      expectedReturn: '2024-10-23',
      episodes: 2,
      lastSickness: '2024-09-15 - Cold (3 days)',
      status: 'covered',
      coverBy: 'RN K. Martinez (Bank Staff)',
      shiftsCovered: ['Main Theatre 3: 08:00-18:00']
    },
    {
      name: 'ODP M. Johnson',
      role: 'Anaes N/P',
      department: 'DSU Theatres',
      reason: 'Migraine',
      startDate: '2024-10-21',
      expectedReturn: '2024-10-21',
      episodes: 1,
      lastSickness: '2024-08-10 - Stomach bug (2 days)',
      status: 'covered',
      coverBy: 'ODP R. Thompson (Internal)',
      shiftsCovered: ['DSU Theatre 5: 08:00-18:00']
    },
    {
      name: 'Dr. A. Patel',
      role: 'Anaesthetist',
      department: 'Anaesthetics',
      reason: 'Family emergency',
      startDate: '2024-10-21',
      expectedReturn: '2024-10-22',
      episodes: 0,
      lastSickness: 'None this year',
      status: 'covered',
      coverBy: 'Dr. S. Kumar (Locum)',
      shiftsCovered: ['Main Theatre 6: 08:00-18:00', 'DSU Theatre 2: 08:00-18:00']
    },
    {
      name: 'HCA T. Brown',
      role: 'Healthcare Assistant',
      department: 'Main Theatres',
      reason: 'Back pain',
      startDate: '2024-10-20',
      expectedReturn: '2024-10-22',
      episodes: 3,
      lastSickness: '2024-09-05 - Back pain (2 days)',
      status: 'gap',
      shiftsCovered: []
    },
    {
      name: 'RN D. Garcia',
      role: 'Recovery Nurse',
      department: 'Recovery',
      reason: 'Covid-19',
      startDate: '2024-10-19',
      expectedReturn: '2024-10-26',
      episodes: 1,
      lastSickness: 'None',
      status: 'gap',
      shiftsCovered: []
    }
  ];

  const arrivingLate = [
    {
      name: 'Dr. F. James',
      role: 'Consultant Anaesthetist',
      assignedTo: 'Main Theatre 1',
      scheduledStart: '08:00',
      expectedArrival: '09:15',
      reason: 'Managing emergency in Theatre 5',
      cover: 'Dr. S. Patel (Locum) - confirmed',
      impact: 'No delay - covered'
    },
    {
      name: 'J. Smith',
      role: 'Consultant Surgeon',
      assignedTo: 'Main Theatre 4',
      scheduledStart: '08:00',
      expectedArrival: '08:30',
      reason: 'Traffic delay - M1 accident',
      cover: 'Surgical Registrar ready to prep',
      impact: 'Minor delay - 15 min'
    },
    {
      name: 'RN L. Anderson',
      role: 'Scrub N/P',
      assignedTo: 'DSU Theatre 8',
      scheduledStart: '08:00',
      expectedArrival: '07:45',
      reason: 'Childcare issue',
      cover: 'ODP M. Wilson covering',
      impact: 'No delay - covered'
    }
  ];

  const vacantShifts = [
    {
      date: 'Tomorrow (22 Oct)',
      shifts: [
        { role: 'Anaes N/P', department: 'Main Theatre 5', time: '08:00-18:00', priority: 'urgent', availableCover: 3 },
        { role: 'Scrub N/P', department: 'DSU Theatre 3', time: '12:00-20:00', priority: 'high', availableCover: 5 }
      ]
    },
    {
      date: '23 Oct',
      shifts: [
        { role: 'HCA', department: 'Main Theatre 1', time: '08:00-16:00', priority: 'medium', availableCover: 8 },
        { role: 'Anaes N/P', department: 'DSU Theatre 7', time: '08:00-18:00', priority: 'high', availableCover: 2 }
      ]
    },
    {
      date: '24 Oct',
      shifts: [
        { role: 'Scrub N/P', department: 'Main Theatre 9', time: '08:00-18:00', priority: 'medium', availableCover: 6 },
        { role: 'Recovery Nurse', department: 'Main Recovery', time: '13:00-21:00', priority: 'urgent', availableCover: 1 }
      ]
    }
  ];

  // ---- Unit filters (unchanged) ----
  const filteredSickStaff = sickStaff.filter(staff => {
    if (selectedUnit === 'all') return true;
    if (selectedUnit === 'recovery') return staff.department === 'Recovery';
    if (selectedUnit === 'main') return staff.department === 'Main Theatres' || staff.department === 'Anaesthetics';
    if (selectedUnit === 'acad') return staff.department === 'DSU Theatres';
    return true;
  });

  const filteredArrivingLate = arrivingLate.filter(staff => {
    if (selectedUnit === 'all') return true;
    if (selectedUnit === 'recovery') return staff.assignedTo?.includes('Recovery');
    if (selectedUnit === 'main') return staff.assignedTo?.startsWith('Main Theatre');
    if (selectedUnit === 'acad') return staff.assignedTo?.startsWith('DSU Theatre');
    return true;
  });

  const filteredVacantShifts = vacantShifts
    .map(dateGroup => ({
      ...dateGroup,
      shifts: dateGroup.shifts.filter(shift => {
        if (selectedUnit === 'all') return true;
        if (selectedUnit === 'recovery') return shift.department?.includes('Recovery');
        if (selectedUnit === 'main')
          return shift.department?.startsWith('Main Theatre') || shift.department?.includes('Main Recovery');
        if (selectedUnit === 'acad') return shift.department?.startsWith('DSU Theatre');
        return true;
      })
    }))
    .filter(dateGroup => dateGroup.shifts.length > 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex items-stretch justify-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Staff on duty overview"
    >
      <div className="bg-white w-full h-full overflow-hidden flex flex-col">
        {/* Sticky top header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold truncate">Staff on Duty</h2>
            <p className="text-blue-100 text-[11px] sm:text-xs">Current levels & coverage</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-blue-800/60" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable column */}
        <div className="flex-1 overflow-y-auto">
          {/* 1) STAFFING SUMMARY (first) */}
          <section className="px-4 sm:px-6 pt-3 pb-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Staffing Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wide">Total On Duty</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">{staffSummary.totalOnDuty}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <p className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide">On Break</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-700">{staffSummary.onBreak}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">Arriving Late</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-700">{staffSummary.arrivingLate}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-3 border border-rose-200">
                <p className="text-[10px] font-semibold text-rose-700 uppercase tracking-wide">Sick Today</p>
                <p className="text-2xl sm:text-3xl font-bold text-rose-700">{staffSummary.sickToday}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-200">
                <p className="text-[10px] font-semibold text-purple-700 uppercase tracking-wide">Vacant Shifts (7d)</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-700">{staffSummary.vacantShifts.next7Days}</p>
              </div>
            </div>
          </section>

          {/* 2) TITLE BAR (second) */}
          <section className="px-4 sm:px-6 pt-2 pb-3">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg text-white px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold truncate">Staff on Duty – Overview</h3>
                <p className="text-blue-100 text-[11px] sm:text-xs mt-0.5">
                  Current staffing levels, sickness tracking & vacant shifts
                </p>
              </div>
            </div>
          </section>

          {/* 3) STICKY FILTERS */}
          <div className="sticky top-[48px] sm:top-[56px] z-10 bg-white/95 backdrop-blur border-y border-gray-200">
            <div className="px-4 sm:px-6 py-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Activity className="w-3 h-3 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-700">View:</span>
                {(['today', 'week', 'month'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      selectedDate === key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {key === 'today' ? 'Today' : key === 'week' ? 'This Week' : 'This Month'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <User className="w-3 h-3 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-700">Options:</span>
                <button
                  onClick={() => setShowAvailableStaff(!showAvailableStaff)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    showAvailableStaff ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showAvailableStaff ? 'Hide' : 'Show'} Available Staff
                </button>
                <button
                  onClick={() => onNavigateToRoster?.()}
                  className="px-2 py-1 rounded text-[11px] font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Go to Staff Roster →
                </button>
              </div>
            </div>
          </div>

          {/* 4) CONTENT SECTIONS */}
          <div className="px-4 sm:px-6 py-3 space-y-3">
            {/* Sickness Today */}
            <section className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                Sickness Today ({filteredSickStaff.length} staff)
              </h3>
              <div className="space-y-2">
                {filteredSickStaff.map((staff, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{staff.name}</h4>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{staff.role}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              staff.status === 'covered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {staff.status === 'covered' ? '✓ Covered' : '⚠ Gap'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <div>
                            <span className="text-gray-600">Reason:</span>
                            <span className="ml-2 font-medium text-gray-900">{staff.reason}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Expected Return:</span>
                            <span className="ml-2 font-medium text-gray-900">{staff.expectedReturn}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Episodes (YTD):</span>
                            <span className="ml-2 font-medium text-gray-900">{staff.episodes}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Sickness:</span>
                            <span className="ml-2 text-gray-700">{staff.lastSickness}</span>
                          </div>
                        </div>
                        {staff.status === 'covered' ? (
                          <div className="mt-2 bg-green-50 rounded p-2 text-xs">
                            <CheckCircle className="w-3 h-3 inline text-green-600 mr-1" />
                            <span className="font-medium text-green-900">Covered by: {staff.coverBy}</span>
                            {staff.shiftsCovered.length > 0 && (
                              <div className="mt-1 text-[10px] text-green-700 ml-4">
                                {staff.shiftsCovered.join(', ')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-2 bg-red-50 rounded p-2 text-xs flex items-center">
                            <XCircle className="w-3 h-3 text-red-600 mr-2" />
                            <span className="font-medium text-red-900">Coverage gap - requires urgent action</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Arriving Late */}
            <section className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                Arriving Late ({filteredArrivingLate.length} staff)
              </h3>
              <div className="space-y-2">
                {filteredArrivingLate.map((staff, idx) => (
                  <div key={idx} className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {staff.name} - {staff.role}
                      </h4>
                      <span className="text-xs text-orange-700 font-medium">
                        Due: {staff.scheduledStart} → ETA: {staff.expectedArrival}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Assigned:</span>
                        <span className="ml-2 font-medium">{staff.assignedTo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Reason:</span>
                        <span className="ml-2">{staff.reason}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Cover:</span>
                        <span className="ml-2 text-green-700 font-medium">{staff.cover}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Impact:</span>
                        <span className="ml-2">{staff.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vacant Shifts */}
            <section className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                Vacant Shifts - Next 7 Days
              </h3>
              <div className="space-y-2">
                {filteredVacantShifts.map((day, idx) => (
                  <div key={idx} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm">{day.date}</h4>
                    <div className="space-y-2">
                      {day.shifts.map((shift, shiftIdx) => (
                        <div key={shiftIdx} className="bg-white rounded p-2 border border-purple-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`px-2 py-1 rounded text-[10px] font-medium ${
                                    shift.priority === 'urgent'
                                      ? 'bg-red-100 text-red-700'
                                      : shift.priority === 'high'
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  {shift.priority.toUpperCase()}
                                </span>
                                <span className="font-medium text-gray-900 text-xs">{shift.role}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-xs text-gray-600">{shift.department}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {shift.time} • {shift.availableCover} staff available to cover
                              </div>
                            </div>
                            {shift.availableCover === 0 && (
                              <span className="text-red-600 font-medium text-xs flex items-center">
                                <XCircle className="w-3 h-3 mr-1" />
                                No cover available!
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {showAvailableStaff && (
                <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm">Available Bank/Agency Staff</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {['RN K. Martinez', 'ODP R. Thompson', 'RN L. Davis', 'HCA M. Wilson', 'ODP S. Ahmed', 'RN P. Robinson'].map(
                      (name, idx) => (
                        <div key={idx} className="bg-white rounded p-2 border border-blue-200 text-center">
                          {name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
