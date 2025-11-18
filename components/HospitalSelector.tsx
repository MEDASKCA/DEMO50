'use client';

import React, { useState } from 'react';
import { useHospital } from '@/lib/hospitalContext';
import { Building2, ChevronDown, Check } from 'lucide-react';

export default function HospitalSelector() {
  const { currentHospital, hospitals, setCurrentHospital, loading } = useHospital();
  const [isOpen, setIsOpen] = useState(false);

  if (loading || !currentHospital) {
    return (
      <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center animate-pulse">
        <Building2 className="w-5 h-5 text-white/70" />
      </button>
    );
  }

  if (hospitals.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all active:scale-95"
        title={currentHospital.name}
      >
        <Building2 className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Select Hospital
              </div>

              {hospitals.map((hospital) => (
                <button
                  key={hospital.id}
                  onClick={() => {
                    setCurrentHospital(hospital);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors ${
                    hospital.id === currentHospital.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${hospital.id === currentHospital.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1 text-left">
                    <div className={`text-sm font-medium ${hospital.id === currentHospital.id ? 'text-blue-900' : 'text-gray-900'}`}>
                      {hospital.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {hospital.trustName}
                    </div>
                  </div>
                  {hospital.id === currentHospital.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 p-2">
              <a
                href="/admin/hospitals"
                className="block w-full px-3 py-2 text-sm text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Manage Hospitals
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
