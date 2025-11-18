'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import HospitalFinder from '@/features/duties/components/HospitalFinder';

interface DutiesViewProps {
  onBack?: () => void;
}

export default function DutiesView({ onBack }: DutiesViewProps) {
  const [activeTab, setActiveTab] = useState<'finder' | 'shifts'>('finder');

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('finder')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'finder'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Hospital Finder
          </button>
          <button
            onClick={() => setActiveTab('shifts')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'shifts'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            My Shifts
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'finder' && <HospitalFinder />}
        {activeTab === 'shifts' && <MyShiftsContent />}
      </div>
    </div>
  );
}

function MyShiftsContent() {
  // Mock shift data - split by status
  const pendingRequests = [
    {
      id: '1',
      date: '2025-11-10',
      hospital: 'St Bartholomew\'s Hospital',
      theatre: 'Theatre 2',
      role: 'Scrub Nurse',
      time: '08:00 - 18:00',
      specialty: 'Cardiothoracic',
      status: 'pending',
      requestedAt: '2025-10-30T10:30:00'
    },
    {
      id: '2',
      date: '2025-11-12',
      hospital: 'Royal London Hospital',
      theatre: 'Theatre 5',
      role: 'Circulating Nurse',
      time: '13:00 - 20:00',
      specialty: 'Neurosurgery',
      status: 'pending',
      requestedAt: '2025-10-29T14:20:00'
    }
  ];

  const confirmedShifts = [
    {
      id: '3',
      date: '2025-11-05',
      hospital: 'Royal London Hospital',
      theatre: 'Theatre 1',
      role: 'Scrub Nurse',
      time: '08:00 - 18:00',
      specialty: 'Trauma & Orthopaedics',
      status: 'confirmed',
      confirmedAt: '2025-10-28T09:15:00'
    },
    {
      id: '4',
      date: '2025-11-07',
      hospital: 'Royal London Hospital',
      theatre: 'Theatre 3',
      role: 'Circulating Nurse',
      time: '13:00 - 20:00',
      specialty: 'General Surgery',
      status: 'confirmed',
      confirmedAt: '2025-10-27T16:45:00'
    }
  ];

  const pastShifts = [
    {
      id: '4',
      date: '2025-10-28',
      hospital: 'Royal London Hospital',
      theatre: 'Theatre 1',
      role: 'Scrub Nurse',
      time: '08:00 - 18:00',
      specialty: 'Trauma & Orthopaedics',
      status: 'completed'
    },
    {
      id: '5',
      date: '2025-10-25',
      hospital: 'Royal London Hospital',
      theatre: 'Theatre 4',
      role: 'Circulating Nurse',
      time: '08:00 - 13:00',
      specialty: 'ENT',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-4 pb-20">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
          <div className="text-xs text-gray-600 mt-1">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600">{confirmedShifts.length}</div>
          <div className="text-xs text-gray-600 mt-1">Confirmed</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-600">{pastShifts.length}</div>
          <div className="text-xs text-gray-600 mt-1">Completed</div>
        </div>
      </div>

      {/* Two Column Layout on Desktop, Stack on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests / Awaiting Approval */}
        {pendingRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Pending Approval
            </h2>
            <div className="space-y-3">
              {pendingRequests.map((shift) => (
              <div key={shift.id} className="bg-white rounded-lg border-2 border-yellow-200 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{shift.hospital}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
                        awaiting approval
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(shift.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Requested {new Date(shift.requestedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })} at {new Date(shift.requestedAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Theatre:</span>
                    <span className="ml-1 font-medium text-gray-900">{shift.theatre}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="ml-1 font-medium text-gray-900">{shift.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Time:</span>
                    <span className="ml-1 font-medium text-gray-900">{shift.time}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Specialty:</span>
                    <span className="ml-1 font-medium text-gray-900">{shift.specialty}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors font-medium">
                    Withdraw Request
                  </button>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed Shifts */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Confirmed Shifts
          </h2>
          <div className="space-y-3">
            {confirmedShifts.map((shift) => (
            <div key={shift.id} className="bg-white rounded-lg border-2 border-green-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{shift.hospital}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 border border-green-300">
                      ✓ confirmed
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(shift.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Confirmed {new Date(shift.confirmedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Theatre:</span>
                  <span className="ml-1 font-medium text-gray-900">{shift.theatre}</span>
                </div>
                <div>
                  <span className="text-gray-500">Role:</span>
                  <span className="ml-1 font-medium text-gray-900">{shift.role}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-1 font-medium text-gray-900">{shift.time}</span>
                </div>
                <div>
                  <span className="text-gray-500">Specialty:</span>
                  <span className="ml-1 font-medium text-gray-900">{shift.specialty}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Shifts - Full Width Below */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Past Shifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pastShifts.map((shift) => (
            <div key={shift.id} className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900 text-sm">{shift.hospital}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(shift.status)}`}>
                    {shift.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(shift.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {shift.theatre} • {shift.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
