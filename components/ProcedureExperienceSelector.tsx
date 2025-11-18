'use client';

import React, { useState } from 'react';
import {
  SURGICAL_PROCEDURES_BY_SPECIALTY,
  PROCEDURE_EXPERIENCE_LEVELS,
  Procedure,
  StaffProcedureExperience
} from '@/lib/surgicalCompetencyData';

interface ProcedureExperienceSelectorProps {
  selectedProcedures: StaffProcedureExperience[];
  onUpdate: (procedures: StaffProcedureExperience[]) => void;
  userRole: string;
}

export default function ProcedureExperienceSelector({
  selectedProcedures,
  onUpdate,
  userRole
}: ProcedureExperienceSelectorProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customProcedureName, setCustomProcedureName] = useState('');

  const specialties = Object.keys(SURGICAL_PROCEDURES_BY_SPECIALTY);

  const handleExperienceChange = (
    procedureName: string,
    opcs4: string[],
    level: 0 | 1 | 2 | 3 | 4 | 5
  ) => {
    const existing = selectedProcedures.find(p => p.procedureName === procedureName);

    if (existing) {
      // Update existing
      const updated = selectedProcedures.map(p =>
        p.procedureName === procedureName
          ? {
              ...p,
              experienceLevel: level,
              // Clear tracking data if moving away from level 2 (learning)
              ...(level !== 2 && { timesPerformed: undefined, lastPerformed: undefined })
            }
          : p
      );
      onUpdate(updated);
    } else {
      // Add new
      const newExperience: StaffProcedureExperience = {
        procedureName,
        opcs4Codes: opcs4,
        experienceLevel: level,
        specialty: selectedSpecialty,
        subcategory: selectedSubcategory,
        ...(level === 2 && { timesPerformed: 0 })
      };
      onUpdate([...selectedProcedures, newExperience]);
    }
  };

  const handleTimesPerformedChange = (procedureName: string, times: number) => {
    const updated = selectedProcedures.map(p =>
      p.procedureName === procedureName
        ? { ...p, timesPerformed: times }
        : p
    );
    onUpdate(updated);
  };

  const getCurrentLevel = (procedureName: string): number => {
    const found = selectedProcedures.find(p => p.procedureName === procedureName);
    return found?.experienceLevel || 0;
  };

  const getCurrentTimesPerformed = (procedureName: string): number => {
    const found = selectedProcedures.find(p => p.procedureName === procedureName);
    return found?.timesPerformed || 0;
  };

  const renderProcedureRating = (procedure: Procedure, specialty: string, subcategory: string) => {
    const currentLevel = getCurrentLevel(procedure.name);
    const isLearning = currentLevel === 2;
    const timesPerformed = getCurrentTimesPerformed(procedure.name);

    return (
      <div key={procedure.name} className="border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">{procedure.name}</h4>
            <div className="text-xs text-gray-500 mt-0.5">
              OPCS-4: {procedure.opcs4.join(', ')}
            </div>
            {procedure.commonVariations && (
              <div className="text-xs text-gray-400 mt-0.5">
                Also: {procedure.commonVariations.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Rating Buttons */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {Object.values(PROCEDURE_EXPERIENCE_LEVELS).map((levelData) => {
            const level = levelData.value as 0 | 1 | 2 | 3 | 4 | 5;
            const isSelected = currentLevel === level;

            return (
              <button
                key={level}
                onClick={() => handleExperienceChange(procedure.name, procedure.opcs4, level)}
                className={`
                  px-2 py-1.5 rounded border text-xs font-medium transition-all
                  ${isSelected
                    ? levelData.activeColor
                    : levelData.color
                  }
                `}
                title={`${levelData.label}: ${levelData.description}`}
              >
                {level}
              </button>
            );
          })}
        </div>

        {/* Learning Progress Tracking */}
        {isLearning && (
          <div className="mt-2 p-2.5 bg-orange-50 rounded-lg border border-orange-200">
            <label className="block text-xs font-medium text-orange-900 mb-1.5">
              Learning Progress (times scrubbed)
            </label>
            <input
              type="number"
              min="0"
              value={timesPerformed}
              onChange={(e) => handleTimesPerformedChange(procedure.name, parseInt(e.target.value) || 0)}
              className="w-28 px-2.5 py-1.5 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
            <p className="text-xs text-orange-700 mt-1.5">
              Track how many times you've scrubbed while learning
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleAddCustomProcedure = () => {
    if (!customProcedureName.trim()) return;

    const newExperience: StaffProcedureExperience = {
      procedureName: customProcedureName,
      opcs4Codes: [], // No OPCS-4 unless admin adds it
      experienceLevel: 0,
      specialty: selectedSpecialty || 'Custom',
      subcategory: selectedSubcategory || 'Other',
      notes: 'Custom procedure added by staff'
    };

    onUpdate([...selectedProcedures, newExperience]);
    setCustomProcedureName('');
    setShowAddCustom(false);
  };

  const filteredProcedures = () => {
    if (!selectedSpecialty || !selectedSubcategory) return [];

    const specialty = SURGICAL_PROCEDURES_BY_SPECIALTY[selectedSpecialty as keyof typeof SURGICAL_PROCEDURES_BY_SPECIALTY];
    if (!specialty) return [];

    const subcategory = specialty.subcategories[selectedSubcategory as keyof typeof specialty.subcategories];
    if (!subcategory) return [];

    const procedures = (subcategory as any).procedures;

    if (!searchTerm) return procedures;

    return procedures.filter((proc: Procedure) =>
      proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.opcs4.some(code => code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Surgical Procedures Experience</h2>
        <p className="text-xs md:text-sm text-gray-600">
          Rate your experience level for each procedure you've scrubbed.
        </p>
      </div>

      {/* Specialty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
            Select Specialty
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => {
              setSelectedSpecialty(e.target.value);
              setSelectedSubcategory('');
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a specialty...</option>
            {specialties.map((specialty) => {
              return (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              );
            })}
          </select>
        </div>

        {selectedSpecialty && (
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
              Select Subcategory
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a subcategory...</option>
              {Object.keys(
                SURGICAL_PROCEDURES_BY_SPECIALTY[selectedSpecialty as keyof typeof SURGICAL_PROCEDURES_BY_SPECIALTY].subcategories
              ).map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Search */}
      {selectedSpecialty && selectedSubcategory && (
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
            Search Procedures
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by procedure name or OPCS-4 code..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Procedures List */}
      {selectedSpecialty && selectedSubcategory && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {selectedSubcategory} ({filteredProcedures().length})
            </h3>
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
            >
              + Add Custom
            </button>
          </div>

          {/* Add Custom Procedure Form */}
          {showAddCustom && (
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Add Custom Procedure</h4>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  value={customProcedureName}
                  onChange={(e) => setCustomProcedureName(e.target.value)}
                  placeholder="Enter procedure name..."
                  className="flex-1 px-3 py-2 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomProcedure}
                    className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddCustom(false)}
                    className="flex-1 md:flex-none px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Note: Only administrators can add OPCS-4 codes
              </p>
            </div>
          )}

          {/* Experience Rating Legend */}
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Experience Levels</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.values(PROCEDURE_EXPERIENCE_LEVELS).map((level) => (
                <div key={level.value} className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${level.activeColor}`}>{level.value}</span>
                  <div>
                    <div className="text-xs font-medium">{level.label}</div>
                    <div className="text-xs text-gray-500 hidden md:block">{level.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Procedures */}
          <div className="space-y-1.5">
            {filteredProcedures().map((procedure: Procedure) =>
              renderProcedureRating(procedure, selectedSpecialty, selectedSubcategory)
            )}
            {filteredProcedures().length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500">
                No procedures found matching your search
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedProcedures.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm md:text-base font-semibold text-green-900 mb-2">Your Experience Summary</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Object.values(PROCEDURE_EXPERIENCE_LEVELS).map((level) => {
              const count = selectedProcedures.filter(p => p.experienceLevel === level.value).length;
              return (
                <div key={level.value} className="text-center">
                  <div className={`w-8 h-8 md:w-9 md:h-9 mx-auto rounded flex items-center justify-center text-sm md:text-base font-bold mb-1 ${level.activeColor}`}>{level.value}</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{count}</div>
                  <div className="text-xs text-gray-600">{level.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
