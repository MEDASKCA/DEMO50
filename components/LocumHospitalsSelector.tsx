'use client';

import React, { useState, useMemo } from 'react';
import { NHS_TRUSTS } from '@/lib/profileData';
import { Search, X, MapPin, Building2, CheckCircle } from 'lucide-react';

interface LocumHospital {
  trust: string;
  hospital: string;
  region: string;
}

interface LocumHospitalsSelectorProps {
  selectedHospitals: LocumHospital[];
  onUpdate: (hospitals: LocumHospital[]) => void;
}

// London regions mapping
const LONDON_REGIONS = {
  'East London': ['Barts Health NHS Trust', 'Lewisham and Greenwich NHS Trust'],
  'North London': ['Royal Free London NHS Foundation Trust', 'University College London Hospitals NHS Foundation Trust'],
  'South London': ["Guy's and St Thomas' NHS Foundation Trust", "King's College Hospital NHS Foundation Trust", "St George's University Hospitals NHS Foundation Trust", 'Epsom and St Helier University Hospitals NHS Trust'],
  'West London': ['Imperial College Healthcare NHS Trust', 'Chelsea and Westminster Hospital NHS Foundation Trust'],
  'Central London': ['University College London Hospitals NHS Foundation Trust']
};

// Get region for a trust
const getRegionForTrust = (trust: string): string => {
  for (const [region, trusts] of Object.entries(LONDON_REGIONS)) {
    if (trusts.includes(trust)) return region;
  }
  return 'Other';
};

// Flatten all hospitals with their trust and region
const getAllHospitals = (): LocumHospital[] => {
  const hospitals: LocumHospital[] = [];
  Object.entries(NHS_TRUSTS).forEach(([trust, trustHospitals]) => {
    const region = getRegionForTrust(trust);
    trustHospitals.forEach(hospital => {
      hospitals.push({ trust, hospital, region });
    });
  });
  return hospitals;
};

export default function LocumHospitalsSelector({ selectedHospitals, onUpdate }: LocumHospitalsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const allHospitals = useMemo(() => getAllHospitals(), []);
  const regions = useMemo(() => ['All', ...Object.keys(LONDON_REGIONS), 'Other'], []);

  // Filter hospitals based on search and region
  const filteredHospitals = useMemo(() => {
    return allHospitals.filter(hospital => {
      const matchesSearch =
        hospital.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.trust.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || hospital.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [allHospitals, searchTerm, selectedRegion]);

  const isHospitalSelected = (hospital: LocumHospital): boolean => {
    return selectedHospitals.some(
      h => h.trust === hospital.trust && h.hospital === hospital.hospital
    );
  };

  const handleToggleHospital = (hospital: LocumHospital) => {
    if (isHospitalSelected(hospital)) {
      // Remove hospital
      onUpdate(selectedHospitals.filter(
        h => !(h.trust === hospital.trust && h.hospital === hospital.hospital)
      ));
    } else {
      // Add hospital
      onUpdate([...selectedHospitals, hospital]);
    }
  };

  const handleRemoveHospital = (hospital: LocumHospital) => {
    onUpdate(selectedHospitals.filter(
      h => !(h.trust === hospital.trust && h.hospital === hospital.hospital)
    ));
  };

  // Group selected hospitals by region
  const selectedByRegion = useMemo(() => {
    const grouped: Record<string, LocumHospital[]> = {};
    selectedHospitals.forEach(hospital => {
      if (!grouped[hospital.region]) {
        grouped[hospital.region] = [];
      }
      grouped[hospital.region].push(hospital);
    });
    return grouped;
  }, [selectedHospitals]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Locum Hospitals Worked</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Select all hospitals where you've worked as a locum nurse. You can search by hospital name or filter by region.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        {/* Region Filter */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Filter by Region</label>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Search Hospitals</label>
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
              placeholder="Search by hospital or trust name..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Dropdown with filtered results */}
          {showDropdown && (searchTerm || selectedRegion !== 'All') && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredHospitals.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No hospitals found
                </div>
              ) : (
                <div className="p-2">
                  {filteredHospitals.map((hospital, index) => {
                    const selected = isHospitalSelected(hospital);
                    return (
                      <button
                        key={`${hospital.trust}-${hospital.hospital}-${index}`}
                        type="button"
                        onClick={() => {
                          handleToggleHospital(hospital);
                          setSearchTerm('');
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                          selected ? 'bg-teal-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {hospital.hospital}
                              </span>
                              {selected && <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{hospital.trust}</span>
                            </div>
                            <div className="mt-1 text-xs text-teal-600 font-medium">
                              {hospital.region}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Hospitals Summary */}
      {selectedHospitals.length > 0 && (
        <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-teal-900">
              Selected Hospitals ({selectedHospitals.length})
            </h4>
            <button
              type="button"
              onClick={() => onUpdate([])}
              className="text-xs text-teal-700 hover:text-teal-900 underline"
            >
              Clear All
            </button>
          </div>

          {/* Group by Region */}
          <div className="space-y-3">
            {Object.entries(selectedByRegion).map(([region, hospitals]) => (
              <div key={region}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <h5 className="text-xs font-semibold text-teal-900">{region}</h5>
                  <span className="text-xs text-teal-600">({hospitals.length})</span>
                </div>
                <div className="space-y-1 ml-6">
                  {hospitals.map((hospital, index) => (
                    <div
                      key={`${hospital.trust}-${hospital.hospital}-${index}`}
                      className="flex items-start justify-between gap-2 p-2 bg-white rounded border border-teal-100"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {hospital.hospital}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {hospital.trust}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveHospital(hospital)}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove hospital"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
