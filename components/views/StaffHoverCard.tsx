'use client';

import React from 'react';
import {
  User,
  Clock,
  Coffee,
  Award,
  MapPin,
  Calendar,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface StaffHoverCardProps {
  staff: {
    name: string;
    role: string;
    id: string;
  };
  visible: boolean;
  position?: { x: number; y: number };
}

export default function StaffHoverCard({ staff, visible, position }: StaffHoverCardProps) {
  if (!visible) return null;

  // Calculate smart positioning based on cursor location
  const calculatePosition = () => {
    if (!position) return { left: 0, top: 0, transform: 'translate(-50%, 0)' };

    const cardWidth = 420; // Slightly wider for better layout
    const cardMaxHeight = window.innerHeight * 0.85;
    const margin = 20;
    const cursorOffset = 15;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const isTopThird = position.y < viewportHeight / 3;
    const isBottomThird = position.y > (viewportHeight * 2) / 3;
    const isMiddleVertical = !isTopThird && !isBottomThird;

    const isLeftHalf = position.x < viewportWidth / 2;
    const isRightHalf = !isLeftHalf;

    let left = position.x;
    let top = position.y;
    let transform = 'translate(-50%, 0)';

    if (isRightHalf) {
      left = position.x - cursorOffset;
      transform = 'translate(-100%, 0)';
    } else {
      left = position.x + cursorOffset;
      transform = 'translate(0, 0)';
    }

    if (left + cardWidth > viewportWidth - margin) {
      left = viewportWidth - cardWidth - margin;
      transform = 'translate(0, 0)';
    }
    if (left < margin) {
      left = margin;
      transform = 'translate(0, 0)';
    }

    if (isBottomThird) {
      top = viewportHeight / 2 - cardMaxHeight / 2;
    } else if (isMiddleVertical) {
      top = position.y - cardMaxHeight / 2;
    } else {
      top = position.y + cursorOffset;
    }

    if (top + cardMaxHeight > viewportHeight - margin) {
      top = viewportHeight - cardMaxHeight - margin;
    }
    if (top < margin) {
      top = margin;
    }

    return { left, top, transform };
  };

  const smartPosition = calculatePosition();

  const isConsultant = staff.role.includes('Consultant');
  const isAssistant = staff.role.includes('Assistant');
  const isAnaesthetist = staff.role.includes('Anaesthetist') && !staff.role.includes('Nurse') && !staff.role.includes('N/P');
  const isSeniorStaff = isConsultant || isAssistant || isAnaesthetist;

  // Mock detailed staff data
  const getStaffDetails = () => {
    if (isConsultant) {
      return {
        employeeId: 'NHS-4521',
        department: 'Surgery',
        grade: 'Consultant Surgeon',
        currentLocation: 'Main Theatre 1',
        shiftStart: '08:00',
        shiftEnd: '18:00',
        status: 'On Time',
        arrivingLate: false,
        lateReason: '',
        message: 'Proceed with WHO checklist - Happy with current list order',
        additionalNotes: 'Patient 3 may need extended time - complex revision',
        todaysActivity: {
          casesScheduled: 3,
          casesCompleted: 1,
          currentCase: 'Total Hip Replacement',
          estimatedFinish: '10:30'
        }
      };
    } else if (isAssistant) {
      return {
        employeeId: 'NHS-3892',
        department: 'Surgery',
        grade: 'Surgical Registrar',
        currentLocation: 'Main Theatre 1',
        shiftStart: '08:00',
        shiftEnd: '16:00',
        status: 'On Time',
        arrivingLate: false,
        lateReason: '',
        message: 'Ready to assist - All pre-op notes reviewed',
        additionalNotes: '',
        todaysActivity: {
          casesScheduled: 3,
          casesCompleted: 1,
          currentCase: 'Total Hip Replacement',
          estimatedFinish: '10:30'
        }
      };
    } else if (isAnaesthetist) {
      return {
        employeeId: 'NHS-5673',
        department: 'Anaesthetics',
        grade: 'Consultant Anaesthetist',
        currentLocation: 'Main Theatre 1',
        shiftStart: '08:00',
        shiftEnd: '19:00',
        status: 'Arriving Late',
        arrivingLate: true,
        lateReason: 'In Theatre 5 managing emergency case - ETA 09:15',
        message: 'Contact Anaesthetic Coordinator (Ext. 2299) for cover',
        additionalNotes: 'Locum arranged - Dr. S. Patel covering until arrival',
        todaysActivity: {
          casesScheduled: 4,
          casesCompleted: 0,
          currentCase: 'Emergency laparotomy (Theatre 5)',
          estimatedFinish: '09:00'
        }
      };
    } else {
      return {
        employeeId: 'NHS-2847',
        department: 'Anaesthetics',
        grade: 'Band 6',
        currentLocation: 'Theatre 1 - Orthopaedics',
        shiftStart: '08:00',
        shiftEnd: '19:00',
        breakStatus: {
          taken: false,
          lastBreak: '08:00',
          nextDue: '11:00',
          totalBreaks: '0/3'
        },
        competencies: [
          { specialty: 'Orthopaedics', level: 'Expert', certified: true },
          { specialty: 'General Surgery', level: 'Expert', certified: true },
          { specialty: 'Emergency', level: 'Competent', certified: true },
          { specialty: 'Neurosurgery', level: 'Learning', certified: false }
        ],
        canRelieveIn: [
          { theatre: 'Theatre 1', available: true, reason: 'Primary theatre' },
          { theatre: 'Theatre 2', available: true, reason: 'Competent in General' },
          { theatre: 'Theatre 3', available: false, reason: 'Not certified for Cardiac' },
          { theatre: 'Theatre 4', available: false, reason: 'Neuro - Learning only' },
          { theatre: 'Theatre 5', available: true, reason: 'Emergency certified' }
        ],
        todaysActivity: {
          casesCompleted: 3,
          reliefProvided: 1,
          averageEfficiency: '94%',
          overtime: '0 hrs'
        },
        reliefHistory: [
          { time: '09:30', relieved: 'Dr. Smith', theatre: 'Theatre 1', duration: '15 min', reason: 'Break' },
        ]
      };
    }
  };

  const staffDetails = getStaffDetails();

  const getCompetencyColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Competent': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Learning': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const showCompetencies = staff.role.includes('Scrub') || staff.role.includes('Anaes N/P') || staff.role.includes('Anaesthetic Nurse');
  const isScrubRole = staff.role.includes('Scrub');
  const isAnaesNP = staff.role.includes('Anaes N/P') || staff.role.includes('Anaesthetic Nurse');

  return (
    <div
      className="hidden lg:block lg:fixed z-[60] bg-white rounded-xl shadow-2xl border-2 border-blue-100 w-[420px] max-h-[85vh] overflow-y-auto"
      style={{
        left: `${smartPosition.left}px`,
        top: `${smartPosition.top}px`,
        transform: smartPosition.transform
      }}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
    >
      {/* Header Section - EPIC Blue Theme */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 rounded-t-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <User className="w-5 h-5" />
              <h3 className="font-bold text-white text-lg">{staff.name}</h3>
            </div>
            <p className="text-blue-100 text-sm font-medium">{staff.role}</p>
            <p className="text-blue-100 text-xs mt-1">{staffDetails.grade} • ID: {staffDetails.employeeId}</p>
          </div>
          <div className="text-right bg-blue-800 bg-opacity-40 px-3 py-2 rounded-lg">
            <p className="text-xs text-blue-100 mb-1">Shift Today</p>
            <p className="text-sm font-bold text-white">{staffDetails.shiftStart} - {staffDetails.shiftEnd}</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-5 space-y-4">
        {/* Status Section - Different for senior staff vs N/P */}
        {isSeniorStaff ? (
          <>
            {/* Senior Staff Status Card */}
            <div className={`rounded-lg p-4 border-2 ${(staffDetails as any).arrivingLate ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Current Status</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${(staffDetails as any).arrivingLate ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {(staffDetails as any).status}
                </span>
              </div>
              {(staffDetails as any).arrivingLate && (staffDetails as any).lateReason && (
                <div className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 inline mr-2 text-amber-600" />
                  <span className="font-semibold">Reason:</span> {(staffDetails as any).lateReason}
                </div>
              )}
            </div>

            {/* Message/Instructions Card */}
            {(staffDetails as any).message && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-blue-900 mb-2 flex items-center uppercase tracking-wide">
                  <Activity className="w-4 h-4 mr-2" />
                  Clinical Notes
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">{(staffDetails as any).message}</p>
                {(staffDetails as any).additionalNotes && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Additional:</span> {(staffDetails as any).additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Today's Activity - Senior Staff */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Today's Activity
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Scheduled</span>
                  <span className="text-lg font-bold text-gray-900">{(staffDetails as any).todaysActivity.casesScheduled}</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Completed</span>
                  <span className="text-lg font-bold text-emerald-600">{(staffDetails as any).todaysActivity.casesCompleted}</span>
                </div>
                <div className="col-span-2 bg-white rounded-lg p-2.5 border border-gray-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Current Case</span>
                  <span className="text-sm font-semibold text-gray-900">{(staffDetails as any).todaysActivity.currentCase}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* N/P Staff Location & Breaks */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-700">Location:</span>
                  </div>
                  <span className="text-sm text-gray-900 font-medium">{(staffDetails as any).currentLocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Coffee className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-700">Breaks Taken:</span>
                  </div>
                  <span className={`text-sm font-bold ${(staffDetails as any).breakStatus.taken ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {(staffDetails as any).breakStatus.totalBreaks}
                  </span>
                </div>
              </div>
              {!(staffDetails as any).breakStatus.taken && (
                <div className="mt-3 px-3 py-2 bg-amber-100 border border-amber-200 text-amber-800 rounded-lg text-xs font-medium">
                  Break overdue - Last break at {(staffDetails as any).breakStatus.lastBreak}
                </div>
              )}
            </div>
          </>
        )}

        {/* Competencies - Only for N/P staff */}
        {showCompetencies && (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center uppercase tracking-wide">
              <Award className="w-4 h-4 mr-2 text-blue-600" />
              {isScrubRole ? 'Surgical Competencies' : 'Anaesthetic Skills'}
            </h4>
            <div className="space-y-2">
              {isScrubRole ? (
                staffDetails.competencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border ${getCompetencyColor(comp.level)}`}
                  >
                    <span className="font-semibold text-sm">{comp.specialty}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold">{comp.level}</span>
                      {comp.certified && <Shield className="w-4 h-4" />}
                    </div>
                  </div>
                ))
              ) : (
                [
                  { specialty: 'General Anaesthesia', level: 'Expert', certified: true },
                  { specialty: 'Regional Anaesthesia', level: 'Expert', certified: true },
                  { specialty: 'Paediatric Anaesthesia', level: 'Competent', certified: true },
                  { specialty: 'Airway Management', level: 'Expert', certified: true }
                ].map((comp, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border ${getCompetencyColor(comp.level)}`}
                  >
                    <span className="font-semibold text-sm">{comp.specialty}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold">{comp.level}</span>
                      {comp.certified && <Shield className="w-4 h-4" />}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Relief Availability - Only for N/P staff */}
        {!isSeniorStaff && (
          <>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center uppercase tracking-wide">
                <Activity className="w-4 h-4 mr-2 text-blue-600" />
                Relief Availability
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {(staffDetails as any).canRelieveIn.map((theatre: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2 px-2.5 py-2 rounded-lg border ${
                      theatre.available ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    title={theatre.reason}
                  >
                    {theatre.available ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${theatre.available ? 'text-emerald-700' : 'text-gray-500'}`}>
                      {theatre.theatre}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Activity - N/P version */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="text-xs font-bold text-blue-900 mb-3 uppercase tracking-wide">Today's Performance</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-2.5 border border-blue-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Cases</span>
                  <span className="text-lg font-bold text-gray-900">{(staffDetails as any).todaysActivity.casesCompleted}</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-blue-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Reliefs</span>
                  <span className="text-lg font-bold text-blue-600">{(staffDetails as any).todaysActivity.reliefProvided}</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-blue-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Efficiency</span>
                  <span className="text-lg font-bold text-emerald-600">{(staffDetails as any).todaysActivity.averageEfficiency}</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-blue-200">
                  <span className="text-xs text-gray-600 block mb-0.5">Overtime</span>
                  <span className="text-lg font-bold text-gray-900">{(staffDetails as any).todaysActivity.overtime}</span>
                </div>
              </div>
            </div>

            {/* Last Relief Provided */}
            {(staffDetails as any).reliefHistory.length > 0 && (
              <div className="bg-gray-50 border-t-2 border-gray-200 rounded-lg p-3">
                <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Recent Relief</h4>
                <div className="text-xs text-gray-700 leading-relaxed">
                  <span className="font-semibold">{(staffDetails as any).reliefHistory[0].time}</span> - Relieved {(staffDetails as any).reliefHistory[0].relieved} in{' '}
                  {(staffDetails as any).reliefHistory[0].theatre} ({(staffDetails as any).reliefHistory[0].duration})
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer - Compliance Note */}
      <div className="border-t-2 border-gray-200 bg-gray-50 px-5 py-3 rounded-b-xl">
        <div className="flex items-center text-xs text-gray-600">
          <AlertCircle className="w-3.5 h-3.5 mr-2 text-blue-600 flex-shrink-0" />
          <span className="italic">All staff activities logged for NHS compliance &  documentation</span>
        </div>
      </div>
    </div>
  );
}
