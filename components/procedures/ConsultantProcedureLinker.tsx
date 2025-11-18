'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Search,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  RefreshCw,
  Award,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  getAllConsultantProcedureLinks,
  saveConsultantProcedureLink,
  addProcedureToConsultant,
  removeProcedureFromConsultant,
  updateProcedureCompetency,
  generateConsultantLinksFromProfiles
} from '@/lib/services/consultantProcedureLinkService';
import { ConsultantProcedureLink } from '@/lib/types/waitingListTypes';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ConsultantProcedureLinker() {
  const [links, setLinks] = useState<ConsultantProcedureLink[]>([]);
  const [surgeons, setSurgeons] = useState<any[]>([]);
  const [opcsProcedures, setOpcsProcedures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [expandedConsultant, setExpandedConsultant] = useState<string | null>(null);
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantProcedureLink | null>(null);
  const [procedureSearchTerm, setProcedureSearchTerm] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState<'Learning' | 'Competent' | 'Expert' | 'Supervisor'>('Competent');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [linksData, surgeonsData, opcsData] = await Promise.all([
        getAllConsultantProcedureLinks(),
        loadSurgeons(),
        loadOpcsProcedures()
      ]);
      setLinks(linksData);
      setSurgeons(surgeonsData);
      setOpcsProcedures(opcsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSurgeons = async () => {
    const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
    const surgeonsData: any[] = [];
    surgeonsSnap.forEach(doc => {
      surgeonsData.push({ id: doc.id, ...doc.data() });
    });
    return surgeonsData.sort((a, b) => a.lastName.localeCompare(b.lastName));
  };

  const loadOpcsProcedures = async () => {
    const opcsSnap = await getDocs(collection(db, 'opcs4'));
    const opcsData: any[] = [];
    opcsSnap.forEach(doc => {
      opcsData.push({ id: doc.id, ...doc.data() });
    });
    return opcsData;
  };

  const handleGenerateLinks = async () => {
    if (!confirm('Auto-generate consultant-procedure links?\n\nThis will link surgeons to procedures matching their specialty.\n\nExisting links will be skipped.')) {
      return;
    }

    setGenerating(true);
    try {
      const result = await generateConsultantLinksFromProfiles();

      if (result.success) {
        alert(`✅ Success!\n\nCreated: ${result.created} new links\nSkipped: ${result.skipped} existing consultants`);
      } else {
        alert(`⚠️ Completed with errors:\n\n${result.errors.join('\n')}\n\nCreated: ${result.created}\nSkipped: ${result.skipped}`);
      }

      await loadData();
    } catch (error) {
      console.error('Error generating links:', error);
      alert('❌ Failed to generate links. Check console for details.');
    } finally {
      setGenerating(false);
    }
  };

  const handleAddProcedure = async (procedureCode: string, procedureName: string) => {
    if (!selectedConsultant) return;

    try {
      const result = await addProcedureToConsultant(
        selectedConsultant.surgeonId,
        procedureCode,
        selectedCompetency
      );

      if (result.success) {
        alert(`✅ Added ${procedureName} to ${selectedConsultant.surgeonName}`);
        await loadData();
        setShowAddProcedureModal(false);
        setProcedureSearchTerm('');
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding procedure:', error);
      alert('❌ Failed to add procedure. Check console for details.');
    }
  };

  const handleRemoveProcedure = async (link: ConsultantProcedureLink, procedureCode: string) => {
    const procedure = opcsProcedures.find(p => p.code === procedureCode);
    const procedureName = procedure?.name || procedureCode;

    if (!confirm(`Remove ${procedureName} from ${link.surgeonName}?`)) {
      return;
    }

    try {
      const result = await removeProcedureFromConsultant(link.surgeonId, procedureCode);

      if (result.success) {
        alert('✅ Procedure removed successfully!');
        await loadData();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error removing procedure:', error);
      alert('❌ Failed to remove procedure. Check console for details.');
    }
  };

  const handleUpdateCompetency = async (
    link: ConsultantProcedureLink,
    procedureCode: string,
    competency: 'Learning' | 'Competent' | 'Expert' | 'Supervisor'
  ) => {
    try {
      const result = await updateProcedureCompetency(link.surgeonId, procedureCode, competency);

      if (result.success) {
        await loadData();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating competency:', error);
    }
  };

  const getCompetencyColor = (competency?: string) => {
    switch (competency) {
      case 'Expert': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Supervisor': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Competent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Learning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const specialties = Array.from(new Set(links.map(l => l.specialtyName))).sort();

  const filteredLinks = links.filter(link => {
    const matchesSearch = searchTerm === '' ||
      link.surgeonName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || link.specialtyName === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const availableProcedures = opcsProcedures.filter(proc => {
    if (!selectedConsultant) return false;

    const matchesSearch = procedureSearchTerm === '' ||
      proc.name?.toLowerCase().includes(procedureSearchTerm.toLowerCase()) ||
      proc.code?.toLowerCase().includes(procedureSearchTerm.toLowerCase());

    const notAlreadyLinked = !selectedConsultant.procedureCodes.includes(proc.code);

    return matchesSearch && notAlreadyLinked;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 md:p-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Consultant-Procedure Links</h1>
        <p className="text-sm md:text-base text-white/90 mb-4">
          Link consultants to the OPCS procedures they can perform. Used for procedure filtering and allocation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">{links.length}</div>
            <div className="text-xs md:text-sm text-white/80">Consultants Linked</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">
              {links.reduce((sum, link) => sum + link.procedureCodes.length, 0)}
            </div>
            <div className="text-xs md:text-sm text-white/80">Total Procedures</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold">{surgeons.length - links.length}</div>
            <div className="text-xs md:text-sm text-white/80">Unlinked</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
          <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search consultants..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">All Specialties</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <button
            onClick={handleGenerateLinks}
            disabled={generating}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 font-semibold text-sm w-full md:w-auto"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Auto-Generate Links
              </>
            )}
          </button>
        </div>
      </div>

      {/* Consultants List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="text-center py-12 px-4">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 font-semibold mb-2">No consultant-procedure links yet</p>
            <p className="text-sm text-gray-500 mb-4">Auto-generate links from surgeon profiles</p>
            <button
              onClick={handleGenerateLinks}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Auto-Generate Links
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredLinks.map((link) => {
              const isExpanded = expandedConsultant === link.id;

              return (
                <div key={link.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {link.surgeonName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{link.surgeonName}</h3>
                        <p className="text-sm text-gray-600">
                          {link.specialtyName}{link.subspecialtyName ? ` - ${link.subspecialtyName}` : ''}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {link.procedureCodes.length} procedure{link.procedureCodes.length !== 1 ? 's' : ''} linked
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedConsultant(link);
                          setShowAddProcedureModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Add Procedure"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExpandedConsultant(isExpanded ? null : link.id!)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pl-13 space-y-2">
                      {link.procedureCodes.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No procedures linked yet</p>
                      ) : (
                        link.procedureCodes.map((code) => {
                          const procedure = opcsProcedures.find(p => p.code === code);
                          const competency = link.competencyLevels?.[code];

                          return (
                            <div
                              key={code}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">
                                  {procedure?.name || code}
                                </p>
                                <p className="text-xs text-gray-600">Code: {code}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <select
                                  value={competency || 'Competent'}
                                  onChange={(e) =>
                                    handleUpdateCompetency(
                                      link,
                                      code,
                                      e.target.value as 'Learning' | 'Competent' | 'Expert' | 'Supervisor'
                                    )
                                  }
                                  className={`px-2 py-1 text-xs font-semibold rounded border ${getCompetencyColor(competency)}`}
                                >
                                  <option value="Learning">Learning</option>
                                  <option value="Competent">Competent</option>
                                  <option value="Expert">Expert</option>
                                  <option value="Supervisor">Supervisor</option>
                                </select>

                                <button
                                  onClick={() => handleRemoveProcedure(link, code)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Procedure Modal */}
      {showAddProcedureModal && selectedConsultant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Add Procedure to {selectedConsultant.surgeonName}
              </h2>
              <button
                onClick={() => {
                  setShowAddProcedureModal(false);
                  setProcedureSearchTerm('');
                  setSelectedConsultant(null);
                }}
                className="text-white hover:bg-blue-600 rounded-full p-2 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Competency Level
                </label>
                <select
                  value={selectedCompetency}
                  onChange={(e) => setSelectedCompetency(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Learning">Learning</option>
                  <option value="Competent">Competent</option>
                  <option value="Expert">Expert</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Procedures
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={procedureSearchTerm}
                    onChange={(e) => setProcedureSearchTerm(e.target.value)}
                    placeholder="Search by code or name..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableProcedures.slice(0, 50).map((procedure) => (
                  <button
                    key={procedure.code}
                    onClick={() => handleAddProcedure(procedure.code, procedure.name)}
                    className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <p className="font-semibold text-gray-900 text-sm">{procedure.name}</p>
                    <p className="text-xs text-gray-600">Code: {procedure.code}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
