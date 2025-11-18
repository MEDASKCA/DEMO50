'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  X,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Coffee,
  ArrowRight,
  Activity,
  Users,
  UserCheck,
  UserX
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ScheduledCase } from '@/lib/mockData';

interface TheatreTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  theatre: string;
  date?: string; // YYYY-MM-DD format
}

export default function TheatreTimelineModal({ isOpen, onClose, theatre, date }: TheatreTimelineModalProps) {
  const [theatreCases, setTheatreCases] = useState<ScheduledCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !date) return;

    const loadCases = async () => {
      try {
        setLoading(true);
        const casesRef = collection(db, 'cases');
        const q = query(
          casesRef,
          where('theatre', '==', theatre),
          where('date', '==', date)
        );
        const snapshot = await getDocs(q);

        const cases: ScheduledCase[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          cases.push({
            id: doc.id,
            ...data
          } as ScheduledCase);
        });

        setTheatreCases(cases);
      } catch (error) {
        console.error('Error loading theatre cases:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, [isOpen, theatre, date]);

  if (!isOpen) return null;

  // Transform to timeline format with mock timeline events
  // For demo purposes, generating simplified timeline events
  const procedures = theatreCases.map((caseData, idx) => {
    const schedTime = caseData.scheduledTime;
    const [schedHour, schedMin] = schedTime.split(':').map(Number);

    // Generate realistic timeline based on procedure time
    const generateTimeline = () => {
      const timeline = [];
      let currentMin = schedHour * 60 + schedMin;

      // Patient sent for (30 min before)
      currentMin -= 30;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Patient sent for',
        status: caseData.status === 'completed' ? 'completed' : (idx === 0 ? 'completed' : 'pending'),
        ward: `Ward ${Math.floor(Math.random() * 10) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
        comment: `Request sent to porter`
      });

      // Patient arrived (15 min before)
      currentMin += 15;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Patient arrived in reception',
        status: caseData.status === 'completed' ? 'completed' : (idx === 0 ? 'completed' : 'pending'),
        comment: `Accepted by ${caseData.team.scrubNurse.name}`
      });

      // Pre-op checks (10 min before)
      currentMin += 5;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Pre-op checks complete',
        status: caseData.status === 'completed' ? 'completed' : (idx === 0 ? 'completed' : 'pending'),
        staff: caseData.team.scrubNurse.name
      });

      // Into theatre (scheduled time)
      currentMin += 10;
      timeline.push({
        time: schedTime,
        event: 'Into theatre',
        status: caseData.status === 'completed' ? 'completed' : (idx === 0 ? 'in-progress' : 'pending')
      });

      // Anaesthetic start
      currentMin += 10;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Anaesthetic start',
        status: caseData.status === 'completed' ? 'completed' : (idx === 0 ? 'in-progress' : 'pending'),
        staff: caseData.team.anaesthetist.name,
        note: 'WHO checklist completed'
      });

      // Surgery start
      currentMin += 15;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Surgery start',
        status: caseData.status === 'completed' ? 'completed' : 'pending',
        staff: `${caseData.surgeon} (Lead), ${caseData.assistant} (Assist)`
      });

      // Surgery end
      currentMin += caseData.estimatedDuration;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Surgery end',
        status: caseData.status === 'completed' ? 'completed' : 'pending'
      });

      // To recovery
      currentMin += 15;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'To recovery',
        status: caseData.status === 'completed' ? 'completed' : 'pending',
        staff: 'Handover to Recovery RN'
      });

      // Discharged to ward
      currentMin += 45;
      timeline.push({
        time: `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`,
        event: 'Discharged to ward',
        status: caseData.status === 'completed' ? 'completed' : 'pending',
        ward: caseData.estimatedDuration > 180 ? 'HDU Level 2' : `Ward ${Math.floor(Math.random() * 10) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`
      });

      return timeline;
    };

    return {
      id: caseData.id,
      time: schedTime,
      procedure: caseData.procedureName,
      patient: `MRN: ${caseData.patient.mrn}`,
      surgeon: caseData.surgeon.split(' ').slice(1).join(' '), // Remove title
      timeline: generateTimeline(),
      alerts: caseData.notes.length > 0 ? [{ type: 'warning', message: caseData.notes[0], time: '' }] : []
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'relief': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'relief': return <Users className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="bg-white w-full h-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{theatre} - Detailed Timeline</h2>
            <p className="text-blue-100 text-sm mt-1">
              Current Time: {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} |
              Cases: {procedures.length} | Est. Finish: 18:30
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Activity className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading theatre cases...</p>
              </div>
            </div>
          ) : theatreCases.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-600">No cases scheduled for this theatre on {date}</p>
              </div>
            </div>
          ) : (
            procedures.map((proc, idx) => (
            <div key={proc.id} className="border-b border-gray-200 last:border-b-0">
              {/* Procedure Header */}
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-gray-800">{proc.time}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{proc.procedure}</h3>
                    <p className="text-sm text-gray-600">
                      {proc.patient} | Surgeon: {proc.surgeon}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {proc.alerts.map((alert, i) => (
                    <div key={i} className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      alert.type === 'delay' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <AlertCircle className="w-3 h-3" />
                      <span>{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-4">
                <div className="relative">
                  {/* Timeline line - gray for whole timeline */}
                  <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  {/* Colored line for completed stages */}
                  {proc.timeline.map((event, eventIdx) => {
                    const isCompleted = event.status === 'completed';
                    const nextEventCompleted = eventIdx < proc.timeline.length - 1 && proc.timeline[eventIdx + 1].status === 'completed';

                    return isCompleted && eventIdx < proc.timeline.length - 1 ? (
                      <div
                        key={`line-${eventIdx}`}
                        className="absolute left-16 w-0.5 bg-green-500"
                        style={{
                          top: `${eventIdx * 80}px`,
                          height: nextEventCompleted ? '80px' : '40px'
                        }}
                      ></div>
                    ) : null;
                  })}

                  {proc.timeline.map((event, eventIdx) => (
                    <div key={eventIdx} className="relative flex items-start mb-4 last:mb-0">
                      {/* Time */}
                      <div className="w-14 text-sm font-medium text-gray-600 text-right">
                        {event.time}
                      </div>

                      {/* Icon */}
                      <div className="ml-2 mr-4 z-10 bg-white">
                        {getStatusIcon(event.status)}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className={`inline-block px-3 py-1.5 rounded-lg border ${getStatusColor(event.status)}`}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{event.event}</span>
                            {event.ward && (
                              <span className="text-xs bg-white px-2 py-0.5 rounded">
                                📍 {event.ward}
                              </span>
                            )}
                          </div>
                          {event.staff && (
                            <div className="text-xs mt-1 flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{event.staff}</span>
                            </div>
                          )}
                          {event.note && (
                            <div className="text-xs mt-1 italic text-gray-600">
                              {event.note}
                            </div>
                          )}
                          {event.comment && (
                            <div className="text-xs mt-1 text-blue-700 bg-blue-50 px-2 py-1 rounded">
                              💬 {event.comment}
                            </div>
                          )}
                        </div>

                        {/* Calculate gap to next event */}
                        {eventIdx < proc.timeline.length - 1 && (
                          <div className="mt-2 mb-2 text-xs text-gray-500 flex items-center">
                            <ArrowRight className="w-3 h-3 mr-1" />
                            {(() => {
                              const current = proc.timeline[eventIdx].time.split(':').map(Number);
                              const next = proc.timeline[eventIdx + 1].time.split(':').map(Number);
                              const diffMinutes = (next[0] - current[0]) * 60 + (next[1] - current[1]);
                              if (diffMinutes > 0) {
                                return `${diffMinutes} min`;
                              }
                              return '';
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnover Time */}
              {idx < procedures.length - 1 && (
                <div className="bg-yellow-50 px-6 py-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-800">
                    Turnover Time
                  </span>
                  <span className="text-sm text-yellow-700">
                    30 minutes (Target: 25 min)
                  </span>
                </div>
              )}
            </div>
          ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">
                <strong>Total OR Time:</strong> 10h 30m
              </span>
              <span className="text-gray-600">
                <strong>Utilization:</strong> 87%
              </span>
              <span className="text-gray-600">
                <strong>Avg Turnover:</strong> 28 min
              </span>
            </div>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Export Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}