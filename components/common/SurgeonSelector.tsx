'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, User } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Surgeon } from '@/lib/types/surgeonTypes';

interface SurgeonSelectorProps {
  value: string;
  onChange: (surgeonId: string, surgeon: Surgeon | null) => void;
  specialtyFilter?: string; // Optional: filter by specialty
  subspecialtyFilter?: string; // Optional: filter by subspecialty
  procedureCode?: string; // Optional: only show surgeons who can perform this procedure
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function SurgeonSelector({
  value,
  onChange,
  specialtyFilter,
  subspecialtyFilter,
  procedureCode,
  placeholder = 'Select surgeon...',
  className = '',
  required = false
}: SurgeonSelectorProps) {
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [filteredSurgeons, setFilteredSurgeons] = useState<Surgeon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSurgeon, setSelectedSurgeon] = useState<Surgeon | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [localSpecialtyFilter, setLocalSpecialtyFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurgeons();
  }, []);

  useEffect(() => {
    filterSurgeons();
  }, [surgeons, searchTerm, specialtyFilter, subspecialtyFilter, procedureCode, localSpecialtyFilter]);

  useEffect(() => {
    // Set selected surgeon when value changes
    if (value) {
      const surgeon = surgeons.find(s => s.id === value);
      setSelectedSurgeon(surgeon || null);
    } else {
      setSelectedSurgeon(null);
    }
  }, [value, surgeons]);

  const loadSurgeons = async () => {
    setLoading(true);
    try {
      const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
      const surgeonsData: Surgeon[] = [];
      const uniqueSpecialties = new Set<string>();

      surgeonsSnap.forEach(doc => {
        const surgeon = { id: doc.id, ...doc.data() } as Surgeon;
        surgeonsData.push(surgeon);
        uniqueSpecialties.add(surgeon.specialtyName);
      });

      setSurgeons(surgeonsData.sort((a, b) => a.lastName.localeCompare(b.lastName)));
      setSpecialties(Array.from(uniqueSpecialties).sort());
    } catch (error) {
      console.error('Error loading surgeons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSurgeons = async () => {
    let filtered = [...surgeons];

    // Apply external specialty filter (from props)
    if (specialtyFilter) {
      filtered = filtered.filter(s => s.specialtyId === specialtyFilter);
    }

    // Apply local specialty filter (from dropdown)
    if (localSpecialtyFilter !== 'all') {
      filtered = filtered.filter(s => s.specialtyName === localSpecialtyFilter);
    }

    // Apply subspecialty filter
    if (subspecialtyFilter) {
      filtered = filtered.filter(s => s.primarySubspecialty === subspecialtyFilter);
    }

    // Apply procedure code filter (only surgeons who can perform this procedure)
    if (procedureCode) {
      try {
        const linksSnap = await getDocs(collection(db, 'consultantProcedureLinks'));
        const surgeonIdsWhoCanPerform = new Set<string>();

        linksSnap.forEach(doc => {
          const data = doc.data();
          if (data.procedureCodes && data.procedureCodes.includes(procedureCode)) {
            surgeonIdsWhoCanPerform.add(data.surgeonId);
          }
        });

        filtered = filtered.filter(s => surgeonIdsWhoCanPerform.has(s.id!));
      } catch (error) {
        console.error('Error filtering by procedure:', error);
      }
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.firstName.toLowerCase().includes(search) ||
        s.lastName.toLowerCase().includes(search) ||
        s.specialtyName.toLowerCase().includes(search) ||
        `${s.title} ${s.firstName} ${s.lastName}`.toLowerCase().includes(search)
      );
    }

    setFilteredSurgeons(filtered);
  };

  const handleSelect = (surgeon: Surgeon) => {
    setSelectedSurgeon(surgeon);
    onChange(surgeon.id!, surgeon);
    setShowDropdown(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSelectedSurgeon(null);
    onChange('', null);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Surgeon Display or Search Input */}
      {selectedSurgeon ? (
        <div className="flex items-center justify-between px-3 py-2 border-2 border-gray-300 rounded-lg bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
              {selectedSurgeon.initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {selectedSurgeon.title} {selectedSurgeon.firstName} {selectedSurgeon.lastName}
              </p>
              <p className="text-xs text-gray-600">{selectedSurgeon.specialtyName}</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-red-600 transition-colors"
            type="button"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required={required}
          />
        </div>
      )}

      {/* Dropdown */}
      {showDropdown && !selectedSurgeon && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-xl max-h-96 overflow-hidden flex flex-col">
          {/* Specialty Filter */}
          {!specialtyFilter && specialties.length > 1 && (
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <select
                value={localSpecialtyFilter}
                onChange={(e) => setLocalSpecialtyFilter(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="all">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          )}

          {/* Surgeons List */}
          <div className="overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Loading surgeons...
              </div>
            ) : filteredSurgeons.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchTerm ? 'No surgeons found matching your search' : 'No surgeons available'}
              </div>
            ) : (
              filteredSurgeons.map((surgeon) => (
                <button
                  key={surgeon.id}
                  onClick={() => handleSelect(surgeon)}
                  className="w-full px-3 py-2 text-left hover:bg-cyan-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-0"
                  type="button"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                    {surgeon.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {surgeon.title} {surgeon.firstName} {surgeon.lastName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {surgeon.specialtyName}
                      {surgeon.primarySubspecialty && ` - ${surgeon.primarySubspecialty}`}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showDropdown && !selectedSurgeon && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
