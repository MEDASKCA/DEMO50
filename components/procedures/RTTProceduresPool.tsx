'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  MapPin,
  TrendingUp,
  Filter,
  Search,
  ArrowRight,
  Zap,
  Heart,
  MessageCircle,
  MoreVertical,
  Star,
  Loader2
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Procedure, RTT_PRIORITY_COLORS, RTT_PATHWAY_COLORS } from '@/lib/types/procedureTypes';

export default function RTTProceduresPool() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedPathway, setSelectedPathway] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  useEffect(() => {
    loadProcedures();
  }, []);

  const loadProcedures = async () => {
    setLoading(true);
    try {
      // Load procedures from Firebase
      const proceduresSnap = await getDocs(collection(db, 'procedures'));
      const loadedProcedures: Procedure[] = [];

      proceduresSnap.forEach(doc => {
        const data = doc.data();
        loadedProcedures.push({
          id: doc.id,
          ...data,
          referralDate: data.referralDate?.toDate?.() || new Date(data.referralDate),
          clockStartDate: data.clockStartDate?.toDate?.() || new Date(data.clockStartDate),
          targetDate: data.targetDate?.toDate?.() || new Date(data.targetDate),
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt)
        } as Procedure);
      });

      setProcedures(loadedProcedures);
    } catch (error) {
      console.error('Error loading procedures:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter procedures
  const filteredProcedures = procedures.filter(proc => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        proc.patientName.toLowerCase().includes(search) ||
        proc.hospitalNumber.toLowerCase().includes(search) ||
        proc.procedureName.toLowerCase().includes(search) ||
        proc.surgeonName.toLowerCase().includes(search);

      if (!matchesSearch) return false;
    }

    // Priority filter
    if (selectedPriority !== 'all' && proc.priority !== selectedPriority) {
      return false;
    }

    // Pathway filter
    if (selectedPathway !== 'all' && proc.pathway !== selectedPathway) {
      return false;
    }

    return true;
  });

  // Sort procedures (breached first, then by days to target)
  const sortedProcedures = [...filteredProcedures].sort((a, b) => {
    if (a.isBreached !== b.isBreached) {
      return a.isBreached ? -1 : 1;
    }
    return a.daysToTarget - b.daysToTarget;
  });

  // Stats
  const stats = {
    total: procedures.length,
    breached: procedures.filter(p => p.isBreached).length,
    atRisk: procedures.filter(p => !p.isBreached && p.daysToTarget <= 7).length,
    p1: procedures.filter(p => p.priority === 'P1').length,
    p2: procedures.filter(p => p.priority === 'P2').length,
    scheduled: procedures.filter(p => p.schedulingStatus === 'Scheduled').length,
    awaiting: procedures.filter(p => p.schedulingStatus === 'Awaiting').length
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Premium Header - Instagram/Uber Style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        {/* Title Bar */}
        <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
          <h1 className="text-lg md:text-xl font-bold text-teal-800 tracking-tight">Procedures Pool</h1>
          <p className="text-xs text-teal-600 mt-0.5">RTT-tracked procedures awaiting allocation</p>
        </div>

        {/* Stats Bar - Amazon/Uber Style KPIs */}
        <div className="px-3 py-2 bg-white overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-[10px] text-blue-600 font-medium">Total</p>
                <p className="text-sm font-bold text-blue-800">{stats.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-[10px] text-red-600 font-medium">Breached</p>
                <p className="text-sm font-bold text-red-800">{stats.breached}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <Zap className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-[10px] text-yellow-600 font-medium">At Risk</p>
                <p className="text-sm font-bold text-yellow-800">{stats.atRisk}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-[10px] text-green-600 font-medium">Scheduled</p>
                <p className="text-sm font-bold text-green-800">{stats.scheduled}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <Clock className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-[10px] text-purple-600 font-medium">Awaiting</p>
                <p className="text-sm font-bold text-purple-800">{stats.awaiting}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters - Instagram Style */}
        <div className="px-4 py-3 space-y-2">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients, procedures, surgeons..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Pills - Instagram Story Style */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedPriority('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all ${
                selectedPriority === 'all'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => setSelectedPriority('P1')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all ${
                selectedPriority === 'P1'
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
              }`}
            >
              P1 ({stats.p1})
            </button>
            <button
              onClick={() => setSelectedPriority('P2')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all ${
                selectedPriority === 'P2'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
              }`}
            >
              P2 ({stats.p2})
            </button>
            <button
              onClick={() => setSelectedPathway('RTT')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all ${
                selectedPathway === 'RTT'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
              }`}
            >
              RTT
            </button>
            <button
              onClick={() => setSelectedPathway('Cancer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all ${
                selectedPathway === 'Cancer'
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
              }`}
            >
              Cancer
            </button>
          </div>
        </div>
      </div>

      {/* Procedure Cards - Instagram Feed Style */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-3" />
            <p className="text-sm text-gray-600 font-medium">Loading procedures...</p>
          </div>
        ) : sortedProcedures.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 font-medium">No procedures found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          sortedProcedures.map(proc => {
            const priorityColors = RTT_PRIORITY_COLORS[proc.priority];
            const pathwayColors = RTT_PATHWAY_COLORS[proc.pathway];

            return (
              <div
                key={proc.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Card Header - Instagram Post Style */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {proc.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{proc.patientName}</p>
                      <p className="text-xs text-gray-500">{proc.hospitalNumber}</p>
                    </div>
                  </div>

                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="px-4 py-3 space-y-2">
                  {/* Procedure Name - Bold */}
                  <h3 className="font-bold text-gray-900 text-base">{proc.procedureName}</h3>

                  {/* Badges Row - Instagram/Amazon Style */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${priorityColors.badge}`}>
                      {proc.priority}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${pathwayColors.bg} ${pathwayColors.text}`}>
                      {proc.pathway}
                    </span>
                    {proc.isBreached && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        BREACHED
                      </span>
                    )}
                    {!proc.isBreached && proc.daysToTarget <= 7 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        AT RISK
                      </span>
                    )}
                  </div>

                  {/* Details Grid - Clean Layout */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-600">{proc.surgeonName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-600">{proc.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-600">Waiting: {proc.daysWaiting}d</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className={`text-xs font-medium ${proc.daysToTarget < 0 ? 'text-red-600' : proc.daysToTarget <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {proc.daysToTarget < 0 ? `${Math.abs(proc.daysToTarget)}d over` : `${proc.daysToTarget}d to target`}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar - Uber Style */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-gray-500 font-medium">RTT Progress</span>
                      <span className="text-[10px] text-gray-600 font-bold">
                        {Math.min(100, Math.round((proc.daysWaiting / (proc.daysWaiting + Math.max(0, proc.daysToTarget))) * 100))}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          proc.isBreached
                            ? 'bg-red-500'
                            : proc.daysToTarget <= 7
                            ? 'bg-yellow-500'
                            : 'bg-gradient-to-r from-teal-400 to-cyan-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.round((proc.daysWaiting / (proc.daysWaiting + Math.max(0, proc.daysToTarget))) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions - Instagram Style */}
                <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-medium">Save</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Notes</span>
                    </button>
                  </div>

                  <button className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm hover:shadow active:scale-95">
                    Schedule
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
