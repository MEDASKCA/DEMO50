'use client';

import React, { useState, useEffect } from 'react';
import {
  Filter,
  RefreshCw,
  Loader2,
  Grid3x3,
  User,
  Calendar,
  Clock,
  AlertCircle,
  Package,
  FileText
} from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GeneratedProcedure {
  id: string;
  // Patient info
  patientId: string;
  patientName: string;
  hospitalNumber: string;

  // Procedure info
  procedureName: string;
  procedureCode: string;
  priority: 'Urgent' | 'Expedited' | 'Routine' | 'Planned';

  // Consultant/Surgeon
  consultantId: string;
  consultantName: string;

  // Specialty
  specialtyName: string;
  subspecialtyName?: string;

  // Dates
  referralDate: string;
  targetDate: string;
  waitingDays: number;

  // Status
  status: 'pooled' | 'scheduled' | 'completed';
  sessionId?: string; // If scheduled

  // Timestamps
  generatedAt: string;
  updatedAt: string;
}

interface Surgeon {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialtyName: string;
  primarySubspecialty?: string;
}

export default function ProceduresPoolContent() {
  const [procedures, setProcedures] = useState<GeneratedProcedure[]>([]);
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedConsultant, setSelectedConsultant] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load generated procedures from waiting list
      const waitingListSnap = await getDocs(collection(db, 'waitingList'));
      const loadedProcedures: GeneratedProcedure[] = [];

      waitingListSnap.forEach(doc => {
        const data = doc.data();
        // Only include if it has been "generated" (you can add a flag for this)
        loadedProcedures.push({
          id: doc.id,
          patientId: doc.id,
          patientName: `${data.firstName} ${data.lastName}`,
          hospitalNumber: data.hospitalNumber,
          procedureName: data.procedureName,
          procedureCode: data.procedureCode,
          priority: data.priority,
          consultantId: data.consultantId,
          consultantName: data.consultantName,
          specialtyName: data.specialtyName,
          subspecialtyName: data.subspecialtyName,
          referralDate: data.referralDate,
          targetDate: data.targetDate,
          waitingDays: data.waitingDays,
          status: data.isScheduled ? 'scheduled' : 'pooled',
          sessionId: data.sessionId,
          generatedAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString()
        });
      });

      setProcedures(loadedProcedures);

      // Load surgeons for consultant filter
      const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
      const loadedSurgeons: Surgeon[] = [];

      surgeonsSnap.forEach(doc => {
        const data = doc.data();
        loadedSurgeons.push({
          id: doc.id,
          ...data
        } as Surgeon);
      });

      setSurgeons(loadedSurgeons.sort((a, b) => a.lastName.localeCompare(b.lastName)));
    } catch (error) {
      console.error('Error loading procedures pool:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPreferenceCard = (procedure: GeneratedProcedure) => {
    alert('🚧 Preference Card Integration\n\nWe are currently working on integrating preference cards with the procedures pool.\n\nThis feature will allow you to:\n• View consultant-specific preference cards\n• Check real-time inventory availability\n• See required equipment, instruments, and supplies\n• Navigate directly to inventory items\n\nComing soon!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'Expedited': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Routine': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Planned': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pooled': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get unique values for filters
  const specialties = Array.from(new Set(procedures.map(p => p.specialtyName))).sort();
  const consultants = Array.from(new Set(procedures.map(p => p.consultantName))).sort();

  // Filter procedures
  const filteredProcedures = procedures.filter(proc => {
    if (selectedSpecialty !== 'all' && proc.specialtyName !== selectedSpecialty) return false;
    if (selectedPriority !== 'all' && proc.priority !== selectedPriority) return false;
    if (selectedConsultant !== 'all' && proc.consultantName !== selectedConsultant) return false;
    if (selectedStatus !== 'all' && proc.status !== selectedStatus) return false;
    return true;
  });


  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 md:p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Grid3x3 className="w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-xl md:text-2xl font-bold">Procedures Pool</h1>
        </div>
        <p className="text-sm md:text-base text-white/90 mb-4">
          Generated procedures ready for scheduling with linked preference cards and staff requirements
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">{procedures.length}</div>
            <div className="text-xs md:text-sm text-white/80">Total Procedures</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">
              {procedures.filter(p => p.status === 'pooled').length}
            </div>
            <div className="text-xs md:text-sm text-white/80">Unscheduled</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">
              {procedures.filter(p => p.priority === 'Urgent').length}
            </div>
            <div className="text-xs md:text-sm text-white/80">Urgent</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">{specialties.length}</div>
            <div className="text-xs md:text-sm text-white/80">Specialties</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Specialties ({procedures.length})</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>
                {spec} ({procedures.filter(p => p.specialtyName === spec).length})
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent ({procedures.filter(p => p.priority === 'Urgent').length})</option>
            <option value="Expedited">Expedited ({procedures.filter(p => p.priority === 'Expedited').length})</option>
            <option value="Routine">Routine ({procedures.filter(p => p.priority === 'Routine').length})</option>
            <option value="Planned">Planned ({procedures.filter(p => p.priority === 'Planned').length})</option>
          </select>

          {/* Consultant Filter */}
          <select
            value={selectedConsultant}
            onChange={(e) => setSelectedConsultant(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Consultants</option>
            {consultants.map(consultant => (
              <option key={consultant} value={consultant}>
                {consultant} ({procedures.filter(p => p.consultantName === consultant).length})
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="pooled">Pooled ({procedures.filter(p => p.status === 'pooled').length})</option>
            <option value="scheduled">Scheduled ({procedures.filter(p => p.status === 'scheduled').length})</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredProcedures.length}</span> of {procedures.length} procedures
          </p>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : filteredProcedures.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Grid3x3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600">No procedures found matching your filters</p>
            {(selectedSpecialty !== 'all' || selectedPriority !== 'all' || selectedConsultant !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSelectedSpecialty('all');
                  setSelectedPriority('all');
                  setSelectedConsultant('all');
                  setSelectedStatus('all');
                }}
                className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-purple-300 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Left: Patient & Procedure Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900">{procedure.procedureName}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Patient: {procedure.patientName} • {procedure.hospitalNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2 py-1 rounded-full border font-medium ${getPriorityColor(procedure.priority)}`}>
                      {procedure.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(procedure.status)}`}>
                      {procedure.status}
                    </span>
                    <span className="text-gray-600">
                      <User className="w-3 h-3 inline mr-1" />
                      {procedure.consultantName}
                    </span>
                    <span className="text-gray-600">
                      <FileText className="w-3 h-3 inline mr-1" />
                      {procedure.specialtyName}
                    </span>
                    <span className="text-gray-600">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Waiting: {procedure.waitingDays} days
                    </span>
                    <span className="text-gray-600">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Target: {new Date(procedure.targetDate).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewPreferenceCard(procedure)}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden md:inline">Preference Card</span>
                    <span className="md:hidden">Card</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
