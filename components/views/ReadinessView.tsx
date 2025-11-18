'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Users,
  Package,
  Wrench,
  Shield,
  Activity,
  Calendar
} from 'lucide-react';
import {
  TheatreReadiness,
  ReadinessStatus,
  CheckItem
} from '@/lib/readiness/readinessTypes';

interface ReadinessViewProps {
  onBack?: () => void;
}

export default function ReadinessView({ onBack }: ReadinessViewProps) {
  const router = useRouter();
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['staff']));

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Mock data - Staff view shows assigned theatre
  const myTheatre: TheatreReadiness = {
    id: 'THR-001',
    sessionInfo: {
      sessionId: 'SES-001',
      theatreId: 'THR-001',
      theatreName: 'Theatre 1',
      date: selectedDate,
      startTime: '08:00',
      endTime: '18:00',
      sessionType: 'day',
      specialty: 'Trauma & Orthopaedics',
      expectedCases: 5
    },
    overallStatus: 'in-progress',
    lastUpdated: new Date().toISOString(),
    staffReadiness: {
      status: 'ready',
      details: {
        consultantSurgeon: { name: 'Dr. Smith', present: true, checkedIn: new Date().toISOString() },
        scrubNurse: { name: 'Sarah Johnson', present: true, checkedIn: new Date().toISOString() },
        additionalStaff: []
      },
      missingRoles: []
    },
    inventoryReadiness: {
      status: 'in-progress',
      details: {
        criticalSuppliesVerified: { id: '1', name: 'Critical Supplies', status: 'completed', required: true },
        procedureSpecificEquipment: { id: '2', name: 'Procedure Equipment', status: 'pending', required: true },
        sterilePacks: { id: '3', name: 'Sterile Packs', status: 'completed', required: true },
        medications: { id: '4', name: 'Medications', status: 'completed', required: true },
        lowStockAlerts: [
          { itemId: 'I-001', itemName: 'Surgical Gloves Size 7', currentStock: 5, minimumRequired: 20 }
        ]
      },
      criticalShortages: []
    },
    equipmentReadiness: {
      status: 'in-progress',
      details: {
        anaestheticMachine: { id: 'e1', name: 'Anaesthetic Machine', status: 'completed', required: true },
        ventilator: { id: 'e2', name: 'Ventilator', status: 'completed', required: true },
        monitoringEquipment: { id: 'e3', name: 'Monitoring Equipment', status: 'pending', required: true },
        surgicalLights: { id: 'e4', name: 'Surgical Lights', status: 'completed', required: true },
        operatingTable: { id: 'e5', name: 'Operating Table', status: 'completed', required: true },
        diathermy: { id: 'e6', name: 'Diathermy', status: 'completed', required: true },
        suction: { id: 'e7', name: 'Suction', status: 'completed', required: true },
        emergencyEquipment: { id: 'e8', name: 'Emergency Equipment', status: 'completed', required: true },
        specializedEquipment: []
      },
      failedChecks: []
    },
    roomSetupReadiness: {
      status: 'in-progress',
      details: {
        theatreCleaned: { id: 'r1', name: 'Theatre Cleaned', status: 'completed', required: true },
        environmentalControls: { id: 'r2', name: 'Environmental Controls', status: 'pending', required: true },
        whoSafetyChecklist: { id: 'r3', name: 'WHO Safety Checklist', status: 'pending', required: true },
        fireExtinguisher: { id: 'r4', name: 'Fire Extinguisher', status: 'completed', required: true },
        emergencyExits: { id: 'r5', name: 'Emergency Exits', status: 'completed', required: true },
        communicationSystems: { id: 'r6', name: 'Communication Systems', status: 'completed', required: true },
        documentationReady: { id: 'r7', name: 'Documentation Ready', status: 'pending', required: true }
      },
      pendingTasks: ['Environmental Controls', 'WHO Safety Checklist', 'Documentation']
    },
    blockingIssues: [],
    readinessSignedOff: false
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: ReadinessStatus) => {
    switch (status) {
      case 'ready': return 'text-green-700 bg-green-100 border-green-300';
      case 'not-ready': return 'text-red-700 bg-red-100 border-red-300';
      case 'in-progress': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'blocked': return 'text-orange-700 bg-orange-100 border-orange-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status: ReadinessStatus) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-6 h-6" />;
      case 'not-ready': return <XCircle className="w-6 h-6" />;
      case 'in-progress': return <Clock className="w-6 h-6" />;
      case 'blocked': return <AlertTriangle className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const handleCheckItem = (itemId: string) => {
    // TODO: Update Firebase with check status
    console.log('Checking item:', itemId);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="sm:hidden text-white px-4 py-3 sticky top-0 z-30" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold">Theatre Readiness</h1>
            <p className="text-xs text-white/90 mt-0.5">Pre-session checklist and operational status</p>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:block bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Theatre Readiness</h1>
              <p className="text-sm text-gray-600 mt-1">Complete all checks before session start</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">
                {new Date(selectedDate).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* My Theatre Card */}
        <div className={`border-2 rounded-lg p-4 ${getStatusColor(myTheatre.overallStatus)}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold">{myTheatre.sessionInfo.theatreName}</h2>
              <div className="text-sm opacity-90">{myTheatre.sessionInfo.specialty}</div>
            </div>
            {getStatusIcon(myTheatre.overallStatus)}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{myTheatre.sessionInfo.startTime} - {myTheatre.sessionInfo.endTime}</span>
            </div>
            <div className="font-medium">{myTheatre.sessionInfo.expectedCases} cases</div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-600">11/15</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Remaining</div>
            <div className="text-2xl font-bold text-yellow-600">4</div>
          </div>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-3">
          {/* Staff Readiness */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              onClick={() => toggleSection('staff')}
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Staff</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(myTheatre.staffReadiness.status)}`}>
                  {myTheatre.staffReadiness.status}
                </span>
              </div>
              {expandedSections.has('staff') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.has('staff') && (
              <div className="p-4 space-y-2">
                {myTheatre.staffReadiness.details.consultantSurgeon && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Consultant Surgeon</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{myTheatre.staffReadiness.details.consultantSurgeon.name}</span>
                      {myTheatre.staffReadiness.details.consultantSurgeon.present ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                )}
                {myTheatre.staffReadiness.details.scrubNurse && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Scrub Nurse</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{myTheatre.staffReadiness.details.scrubNurse.name}</span>
                      {myTheatre.staffReadiness.details.scrubNurse.present ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Inventory */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              onClick={() => toggleSection('inventory')}
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Inventory</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(myTheatre.inventoryReadiness.status)}`}>
                  {myTheatre.inventoryReadiness.status}
                </span>
              </div>
              {expandedSections.has('inventory') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.has('inventory') && (
              <div className="p-4 space-y-3">
                {Object.entries(myTheatre.inventoryReadiness.details)
                  .filter(([key]) => key !== 'lowStockAlerts')
                  .map(([key, item]: [string, any]) => (
                    item && (
                      <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <input
                          type="checkbox"
                          checked={item.status === 'completed'}
                          onChange={() => handleCheckItem(item.id)}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                    )
                  ))}
                {myTheatre.inventoryReadiness.details.lowStockAlerts.length > 0 && (
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="text-xs font-semibold text-yellow-900 mb-1">Low Stock Alert:</div>
                    {myTheatre.inventoryReadiness.details.lowStockAlerts.map((alert) => (
                      <div key={alert.itemId} className="text-xs text-yellow-700">
                        {alert.itemName}: {alert.currentStock}/{alert.minimumRequired}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Equipment */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              onClick={() => toggleSection('equipment')}
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Equipment</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(myTheatre.equipmentReadiness.status)}`}>
                  {myTheatre.equipmentReadiness.status}
                </span>
              </div>
              {expandedSections.has('equipment') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.has('equipment') && (
              <div className="p-4 space-y-2">
                {Object.entries(myTheatre.equipmentReadiness.details)
                  .filter(([key]) => key !== 'specializedEquipment')
                  .map(([key, item]: [string, any]) => (
                    item && (
                      <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50">
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <input
                          type="checkbox"
                          checked={item.status === 'completed'}
                          onChange={() => handleCheckItem(item.id)}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                    )
                  ))}
              </div>
            )}
          </div>

          {/* Room Setup */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              onClick={() => toggleSection('room')}
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Room Setup</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(myTheatre.roomSetupReadiness.status)}`}>
                  {myTheatre.roomSetupReadiness.status}
                </span>
              </div>
              {expandedSections.has('room') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.has('room') && (
              <div className="p-4 space-y-2">
                {Object.entries(myTheatre.roomSetupReadiness.details).map(([key, item]: [string, any]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <input
                      type="checkbox"
                      checked={item.status === 'completed'}
                      onChange={() => handleCheckItem(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Complete Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg">
            Submit Readiness Checks
          </button>
        </div>
      </div>
    </div>
  );
}
