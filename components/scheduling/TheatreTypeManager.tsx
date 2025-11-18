'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Zap, Calendar } from 'lucide-react';
import { getTheatres, saveTheatre } from '@/lib/scheduling/theatreService';
import { Theatre } from '@/lib/schedulingTypes';

export default function TheatreTypeManager() {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    setLoading(true);
    try {
      const loaded = await getTheatres();
      setTheatres(loaded.sort((a, b) => a.id.localeCompare(b.id)));
    } catch (error) {
      console.error('Error loading theatres:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTheatreType = async (theatre: Theatre, type: 'elective' | 'emergency' | 'trauma') => {
    setUpdating(theatre.id);
    try {
      const updated = { ...theatre, theatreType: type };
      await saveTheatre(updated);
      await loadTheatres();
    } catch (error) {
      console.error('Error updating theatre type:', error);
      alert('Failed to update theatre type');
    } finally {
      setUpdating(null);
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-300';
      case 'trauma': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'elective': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'emergency': return <AlertCircle className="w-4 h-4" />;
      case 'trauma': return <Activity className="w-4 h-4" />;
      case 'elective': return <Calendar className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
          Theatre Type Configuration
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          Assign operational types to theatres to auto-configure their schedules
        </p>
      </div>

      {/* Legend */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs font-medium text-gray-700 mb-2">Theatre Types:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-red-600" />
            <span className="font-medium">EMERGENCY:</span> 24/7 (Night sessions)
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-orange-600" />
            <span className="font-medium">TRAUMA:</span> Long days 7 days/week
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-blue-600" />
            <span className="font-medium">ELECTIVE:</span> Weekdays only
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading theatres...</div>
      ) : (
        <div className="space-y-2">
          {theatres.map((theatre) => (
            <div
              key={theatre.id}
              className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm md:text-base text-gray-900">{theatre.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(theatre.theatreType)} flex items-center gap-1`}>
                      {getTypeIcon(theatre.theatreType)}
                      {theatre.theatreType?.toUpperCase() || 'NOT SET'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{theatre.location}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateTheatreType(theatre, 'emergency')}
                    disabled={updating === theatre.id || theatre.theatreType === 'emergency'}
                    className="px-2 md:px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Emergency
                  </button>
                  <button
                    onClick={() => updateTheatreType(theatre, 'trauma')}
                    disabled={updating === theatre.id || theatre.theatreType === 'trauma'}
                    className="px-2 md:px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    <Activity className="w-3 h-3" />
                    Trauma
                  </button>
                  <button
                    onClick={() => updateTheatreType(theatre, 'elective')}
                    disabled={updating === theatre.id || theatre.theatreType === 'elective'}
                    className="px-2 md:px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    Elective
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> After changing theatre types, refresh the schedule calendar to see the updated default configurations.
        </p>
      </div>
    </div>
  );
}
