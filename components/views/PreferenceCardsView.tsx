'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  PREFERENCE_CARDS,
  PreferenceCard,
  getPreferenceCardsBySpecialty,
  getPreferenceCardsByCategory,
  searchPreferenceCards,
  PREFERENCE_CARD_CATEGORIES,
  autoScorePreferenceCard,
} from '@/lib/preferenceCardsData';
import { scoreProcedure } from '@/lib/services/procedureScoringService';
import {
  Search,
  ChevronDown,
  ChevronRight,
  FileText,
  Package,
  Wrench,
  ShoppingCart,
  Layers,
  Plus,
  Clock,
  Activity,
  User,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface PreferenceCardsViewProps {
  onBack?: () => void;
}

export default function PreferenceCardsView({ onBack }: PreferenceCardsViewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'duration' | 'complexity'>('name');
  const [scoredCards, setScoredCards] = useState<PreferenceCard[]>([]);
  const [isScoring, setIsScoring] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const specialties = ['Orthopaedics & Trauma', 'Cardiac', 'Spines', 'General Surgery', 'Neurosurgery', 'Vascular', 'Plastics', 'ENT', 'Maxillofacial'];

  // Auto-score procedures on mount
  useEffect(() => {
    const scoreAllProcedures = async () => {
      setIsScoring(true);
      const scored: PreferenceCard[] = [];

      for (const card of PREFERENCE_CARDS) {
        // Calculate score for each procedure
        const score = scoreProcedure(
          card.procedureName,
          card.opcs4Codes,
          card.specialty,
          undefined
        );

        scored.push({
          ...card,
          customCode: score.customCode,
          complexityScore: score.complexityScore,
          durationScore: score.durationScore,
          variabilityScore: score.variabilityScore,
          surgeonLevelScore: score.surgeonLevelScore,
          averageScore: score.averageScore,
          complexity: score.complexity,
          estimatedDuration: score.estimatedDuration,
        });
      }

      setScoredCards(scored);
      setIsScoring(false);
    };

    scoreAllProcedures();
  }, []);

  // Filter and sort cards
  const filteredCards = useMemo(() => {
    let cards = scoredCards.length > 0 ? scoredCards : PREFERENCE_CARDS;

    // Filter by category
    if (selectedCategory) {
      cards = cards.filter(card => card.category === selectedCategory);
    }

    // Filter by specialty
    if (selectedSpecialty !== 'All Specialties') {
      cards = cards.filter(card => card.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      cards = cards.filter(card =>
        card.procedureName.toLowerCase().includes(query) ||
        card.opcs4Codes.some(code => code.toLowerCase().includes(query)) ||
        card.category.toLowerCase().includes(query) ||
        card.customCode?.toLowerCase().includes(query)
      );
    }

    // Sort cards
    if (sortBy === 'score') {
      cards = [...cards].sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0));
    } else if (sortBy === 'duration') {
      cards = [...cards].sort((a, b) => b.estimatedDuration - a.estimatedDuration);
    } else if (sortBy === 'complexity') {
      cards = [...cards].sort((a, b) => (b.complexityScore || 0) - (a.complexityScore || 0));
    } else {
      // Default: sort by name
      cards = [...cards].sort((a, b) => a.procedureName.localeCompare(b.procedureName));
    }

    return cards;
  }, [selectedCategory, selectedSpecialty, searchTerm, scoredCards, sortBy]);

  // Toggle card expansion
  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Preference Cards</h1>
            <p className="text-blue-100">Surgical procedure setup guidelines</p>
          </div>
          {onBack && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Total Cards</p>
                <p className="text-2xl font-bold">{PREFERENCE_CARDS.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Categories</p>
                <p className="text-2xl font-bold">{PREFERENCE_CARD_CATEGORIES.length}</p>
              </div>
              <Layers className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Filtered</p>
                <p className="text-2xl font-bold">{filteredCards.length}</p>
              </div>
              <Search className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Specialties</p>
                <p className="text-2xl font-bold">{specialties.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search procedures, OPCS-4 codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {PREFERENCE_CARD_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Specialties">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="score">Sort by Score</option>
            <option value="complexity">Sort by Complexity</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedSpecialty !== 'All Specialties' || searchTerm) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategory && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')} className="hover:text-blue-900">×</button>
              </span>
            )}
            {selectedSpecialty !== 'All Specialties' && (
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center gap-2">
                {selectedSpecialty}
                <button onClick={() => setSelectedSpecialty('All Specialties')} className="hover:text-teal-900">×</button>
              </span>
            )}
            {searchTerm && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2">
                "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="hover:text-purple-900">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedSpecialty('All Specialties');
                setSearchTerm('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Cards List */}
      <div className="flex-1 overflow-auto p-4">
        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <FileText className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-lg font-medium">No preference cards found</p>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCards.map((card) => {
              const isExpanded = expandedCards.has(card.id);
              const totalItems =
                card.basicSets.length +
                card.standbyEquipment.length +
                card.consumables.length +
                card.specificConsumables.length +
                card.addOns.length +
                card.operatingTable.length;

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleCard(card.id)}
                    className="p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {card.procedureName}
                          </h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {card.category}
                          </span>
                        </div>
                        <div className="ml-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {card.opcs4Codes.join(', ')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {card.estimatedDuration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {totalItems} items
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            {card.anesthesiaType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                      {/* Score Breakdown */}
                      {card.averageScore !== undefined && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Procedure Score Breakdown
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white p-3 rounded border border-purple-100">
                              <p className="text-xs text-gray-600 mb-1">Complexity</p>
                              <p className="text-lg font-bold text-purple-900">{card.complexityScore}/2</p>
                              <p className="text-xs text-gray-500">
                                {card.complexityScore === 1 ? 'Minor' : card.complexityScore === 2 ? 'Major' : 'In-between'}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <p className="text-xs text-gray-600 mb-1">Duration</p>
                              <p className="text-lg font-bold text-blue-900">{card.durationScore}</p>
                              <p className="text-xs text-gray-500">{card.estimatedDuration} min</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-green-100">
                              <p className="text-xs text-gray-600 mb-1">Variability</p>
                              <p className="text-lg font-bold text-green-900">{card.variabilityScore}/2</p>
                              <p className="text-xs text-gray-500">
                                {card.variabilityScore === 1 ? 'Consistent' : 'Variable'}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-orange-100">
                              <p className="text-xs text-gray-600 mb-1">Surgeon Factor</p>
                              <p className="text-lg font-bold text-orange-900">{card.surgeonLevelScore}/2</p>
                              <p className="text-xs text-gray-500">
                                {card.surgeonLevelScore === 1 ? 'On-time' : card.surgeonLevelScore === 2 ? 'May vary' : 'Variable'}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-purple-200 flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-900">Average Score</span>
                            <span className="text-2xl font-bold text-purple-900">{card.averageScore.toFixed(2)}</span>
                          </div>
                        </div>
                      )}

                      {/* Procedure Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Specialty</p>
                          <p className="text-gray-900">{card.specialty}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Patient Position</p>
                          <p className="text-gray-900">{card.patientPosition}</p>
                        </div>
                        {card.surgeon && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Surgeon</p>
                            <p className="text-gray-900">{card.surgeon}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Last Updated</p>
                          <p className="text-gray-900">{new Date(card.lastUpdated).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Special Instructions */}
                      {card.specialInstructions && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-yellow-900 mb-1">Special Instructions</p>
                              <p className="text-sm text-yellow-800">{card.specialInstructions}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Items by Category */}
                      <div className="space-y-3">
                        {/* Basic Sets */}
                        {card.basicSets.length > 0 && (
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Package className="w-5 h-5 text-blue-600" />
                              Basic Sets ({card.basicSets.length})
                            </h4>
                            <ul className="space-y-2">
                              {card.basicSets.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item.itemName}</span>
                                  <span className="text-gray-500">Qty: {item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Standby Equipment */}
                        {card.standbyEquipment.length > 0 && (
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Wrench className="w-5 h-5 text-orange-600" />
                              Standby Equipment ({card.standbyEquipment.length})
                            </h4>
                            <ul className="space-y-2">
                              {card.standbyEquipment.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item.itemName}</span>
                                  <span className="text-gray-500">Qty: {item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Consumables */}
                        {card.consumables.length > 0 && (
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <ShoppingCart className="w-5 h-5 text-green-600" />
                              Consumables ({card.consumables.length})
                            </h4>
                            <ul className="space-y-2">
                              {card.consumables.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item.itemName}</span>
                                  <span className="text-gray-500">Qty: {item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Specific Consumables */}
                        {card.specificConsumables.length > 0 && (
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Plus className="w-5 h-5 text-purple-600" />
                              Specific Consumables ({card.specificConsumables.length})
                            </h4>
                            <ul className="space-y-2">
                              {card.specificConsumables.map((item, idx) => (
                                <li key={idx} className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-700">{item.itemName}</span>
                                    <span className="text-gray-500">Qty: {item.quantity}</span>
                                  </div>
                                  {item.notes && (
                                    <p className="text-xs text-gray-500 mt-1 italic">Note: {item.notes}</p>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Operating Table */}
                        {card.operatingTable.length > 0 && (
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Layers className="w-5 h-5 text-teal-600" />
                              Operating Table Setup ({card.operatingTable.length})
                            </h4>
                            <ul className="space-y-2">
                              {card.operatingTable.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item.itemName}</span>
                                  <span className="text-gray-500">Qty: {item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
