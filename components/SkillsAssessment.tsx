'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Star, Award, TrendingUp } from 'lucide-react';
import { COMPETENCY_LEVELS, ALL_ROLE_COMPETENCIES } from '@/lib/competencyData';

interface SkillsAssessmentProps {
  role: string;
  competencies: any;
  onUpdate: (competencies: any) => void;
}

export default function SkillsAssessment({ role, competencies, onUpdate }: SkillsAssessmentProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});
  const [expandedProcedures, setExpandedProcedures] = useState<Record<string, boolean>>({});

  const roleData = ALL_ROLE_COMPETENCIES[role as keyof typeof ALL_ROLE_COMPETENCIES];

  if (!roleData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Select a role in the Overview tab to see specialty competencies.</p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSubsection = (key: string) => {
    setExpandedSubsections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleProcedure = (key: string) => {
    setExpandedProcedures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setCompetencyLevel = (path: string, level: number) => {
    const newCompetencies = { ...competencies, [path]: level };
    onUpdate(newCompetencies);
  };

  const getCompetencyLevel = (path: string): number => {
    return competencies[path] || 0;
  };

  const getLevelColor = (level: number) => {
    const levelData = COMPETENCY_LEVELS.find(l => l.value === level);
    return levelData?.color || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const calculateSectionProgress = (sectionKey: string, sectionData: any): number => {
    let totalItems = 0;
    let completedItems = 0;

    // Count competencies
    if (sectionData.competencies) {
      totalItems += sectionData.competencies.length;
      sectionData.competencies.forEach((comp: any) => {
        if (getCompetencyLevel(`${sectionKey}.${comp.id}`) >= 3) completedItems++;
      });
    }

    // Count equipment
    if (sectionData.equipment) {
      totalItems += sectionData.equipment.length;
      sectionData.equipment.forEach((equip: any, idx: number) => {
        if (getCompetencyLevel(`${sectionKey}.equipment.${idx}`) >= 3) completedItems++;
      });
    }

    // Count subspecialties and procedures
    if (sectionData.subspecialties) {
      Object.keys(sectionData.subspecialties).forEach(subKey => {
        const subspecialty = sectionData.subspecialties[subKey];
        if (subspecialty.procedures) {
          totalItems += subspecialty.procedures.length;
          subspecialty.procedures.forEach((proc: any, idx: number) => {
            if (getCompetencyLevel(`${sectionKey}.${subKey}.${idx}`) >= 3) completedItems++;
          });
        }
      });
    }

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  return (
    <div className="space-y-4">
      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Competency Progress - {role}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Track your skills and competency levels</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-teal-600">
              {Object.keys(roleData).map(sectionKey => calculateSectionProgress(sectionKey, roleData[sectionKey])).reduce((a, b) => a + b, 0) / Object.keys(roleData).length || 0}%
            </p>
            <p className="text-xs text-gray-600">Overall Competent+</p>
          </div>
        </div>

        {/* Competency Level Legend */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
          {COMPETENCY_LEVELS.map(level => (
            <div key={level.value} className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${level.color} text-xs font-medium`}>
              <span className="font-bold">{level.value}</span>
              <span>{level.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {Object.keys(roleData).map(sectionKey => {
        const section = roleData[sectionKey];
        const progress = calculateSectionProgress(sectionKey, section);
        const isExpanded = expandedSections[sectionKey];

        return (
          <div key={sectionKey} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionKey)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{sectionKey}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right mr-4">
                  <p className="text-sm font-semibold text-teal-600">{progress}% Competent+</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-teal-600 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
              </div>
            </button>

            {/* Section Content */}
            {isExpanded && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                {/* General Competencies */}
                {section.competencies && (
                  <div className="space-y-3 mb-6">
                    {section.competencies.map((comp: any) => {
                      const path = `${sectionKey}.${comp.id}`;
                      const level = getCompetencyLevel(path);

                      return (
                        <div key={comp.id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                {comp.name}
                                {comp.critical && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">Critical</span>
                                )}
                              </h4>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {COMPETENCY_LEVELS.map(lvl => (
                              <button
                                key={lvl.value}
                                onClick={() => setCompetencyLevel(path, lvl.value)}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                  level === lvl.value ? lvl.color : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                                title={lvl.description}
                              >
                                <span className="font-bold mr-1">{lvl.value}</span>
                                {lvl.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Equipment */}
                {section.equipment && (
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Equipment & Systems</h4>
                    {section.equipment.map((equip: any, equipIdx: number) => {
                      const path = `${sectionKey}.equipment.${equipIdx}`;
                      const level = getCompetencyLevel(path);
                      const equipKey = `${sectionKey}-equip-${equipIdx}`;
                      const isEquipExpanded = expandedProcedures[equipKey];

                      return (
                        <div key={equipIdx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleProcedure(equipKey)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                          >
                            <div className="flex-1 text-left">
                              <h5 className="font-medium text-gray-900">{equip.name}</h5>
                              {equip.types && <p className="text-xs text-gray-600 mt-1">{equip.types.slice(0, 3).join(', ')}{equip.types.length > 3 ? '...' : ''}</p>}
                            </div>
                            {isEquipExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                          </button>

                          {isEquipExpanded && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 space-y-3">
                              {/* Rating */}
                              <div>
                                <p className="text-xs font-medium text-gray-700 mb-2">Your Competency Level:</p>
                                <div className="flex flex-wrap gap-2">
                                  {COMPETENCY_LEVELS.map(lvl => (
                                    <button
                                      key={lvl.value}
                                      onClick={() => setCompetencyLevel(path, lvl.value)}
                                      className={`px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                                        level === lvl.value ? lvl.color : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                      }`}
                                    >
                                      {lvl.value} - {lvl.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Types/Models */}
                              {equip.types && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-1">Types/Models:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {equip.types.map((type: string, idx: number) => (
                                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                        {type}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Manufacturers */}
                              {equip.manufacturers && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-1">Manufacturers:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {equip.manufacturers.map((mfr: string, idx: number) => (
                                      <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                                        {mfr}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Skills */}
                              {equip.skills && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-1">Key Skills:</p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {equip.skills.map((skill: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                        <span>{skill}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Subspecialties with Procedures */}
                {section.subspecialties && (
                  <div className="space-y-4">
                    {Object.keys(section.subspecialties).map(subKey => {
                      const subspecialty = section.subspecialties[subKey];
                      const subFullKey = `${sectionKey}-${subKey}`;
                      const isSubExpanded = expandedSubsections[subFullKey];

                      return (
                        <div key={subKey} className="border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSubsection(subFullKey)}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between hover:from-gray-100 hover:to-gray-200 transition-colors"
                          >
                            <div className="flex-1 text-left">
                              <h4 className="font-semibold text-gray-900">{subKey}</h4>
                              {subspecialty.procedures && (
                                <p className="text-xs text-gray-600 mt-1">{subspecialty.procedures.length} procedures</p>
                              )}
                            </div>
                            {isSubExpanded ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
                          </button>

                          {isSubExpanded && subspecialty.procedures && (
                            <div className="p-4 bg-white space-y-3">
                              {subspecialty.procedures.map((proc: any, procIdx: number) => {
                                const procPath = `${sectionKey}.${subKey}.${procIdx}`;
                                const procLevel = getCompetencyLevel(procPath);
                                const procKey = `${subFullKey}-proc-${procIdx}`;
                                const isProcExpanded = expandedProcedures[procKey];

                                return (
                                  <div key={procIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                      onClick={() => toggleProcedure(procKey)}
                                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                                    >
                                      <div className="flex-1 text-left">
                                        <h5 className="font-medium text-gray-900">{proc.name}</h5>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(procLevel)}`}>
                                            Level {procLevel}
                                          </span>
                                        </div>
                                      </div>
                                      {isProcExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                                    </button>

                                    {isProcExpanded && (
                                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 space-y-4">
                                        {/* Competency Rating */}
                                        <div>
                                          <p className="text-sm font-medium text-gray-900 mb-2">Rate Your Competency:</p>
                                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {COMPETENCY_LEVELS.map(lvl => (
                                              <button
                                                key={lvl.value}
                                                onClick={() => setCompetencyLevel(procPath, lvl.value)}
                                                className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                                                  procLevel === lvl.value ? lvl.color : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                                }`}
                                                title={lvl.description}
                                              >
                                                <div className="font-bold text-base">{lvl.value}</div>
                                                <div className="text-xs">{lvl.label}</div>
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Systems */}
                                        {proc.systems && proc.systems.length > 0 && (
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-2">Systems/Manufacturers:</p>
                                            <div className="flex flex-wrap gap-1">
                                              {proc.systems.map((sys: string, idx: number) => (
                                                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded font-medium">
                                                  {sys}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Implants */}
                                        {proc.implants && proc.implants.length > 0 && (
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-2">Implants/Components:</p>
                                            <div className="flex flex-wrap gap-1">
                                              {proc.implants.map((imp: string, idx: number) => (
                                                <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                                                  {imp}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Instrumentation */}
                                        {proc.instrumentation && proc.instrumentation.length > 0 && (
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-2">Instrumentation:</p>
                                            <div className="flex flex-wrap gap-1">
                                              {proc.instrumentation.map((inst: string, idx: number) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                                  {inst}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Equipment */}
                                        {proc.equipment && proc.equipment.length > 0 && (
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-2">Equipment Required:</p>
                                            <div className="flex flex-wrap gap-1">
                                              {proc.equipment.map((eq: string, idx: number) => (
                                                <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                                                  {eq}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {/* Specific Skills */}
                                        {proc.specificSkills && proc.specificSkills.length > 0 && (
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 mb-2">Key Skills & Knowledge:</p>
                                            <ul className="text-xs text-gray-700 space-y-1">
                                              {proc.specificSkills.map((skill: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                  <Star className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                                  <span>{skill}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* General Equipment (if at section level) */}
                {section.generalEquipment && (
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">General Equipment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.generalEquipment.map((equip: any, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                          <p className="font-medium text-gray-900 text-sm">{equip.name}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {equip.manufacturers.map((mfr: string, mfrIdx: number) => (
                              <span key={mfrIdx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {mfr}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
