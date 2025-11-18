'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Procedure,
  ProcedureCost,
  PROCEDURE_COSTS
} from '@/lib/surgicalCompetencyData';
import {
  getPreferenceCard
} from '@/lib/preferenceCardData';
import { INVENTORY_ITEMS } from '@/lib/inventoryData';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, addDoc, updateDoc, doc, where } from 'firebase/firestore';
import { Surgeon } from '@/lib/types/surgeonTypes';
import {
  Search,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  FileText,
  Clock,
  Calendar,
  TrendingUp,
  X,
  Info,
  AlertCircle,
  Package,
  Edit2,
  DollarSign,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { scoreProcedure } from '@/lib/services/procedureScoringService';

interface ProceduresViewProps {
  onBack?: () => void;
  isAdmin?: boolean;
  socUnlocked?: boolean;
}

interface FirebaseSpecialty {
  id: string;
  name: string;
  abbreviation: string;
  subspecialties?: Array<{ name: string; abbreviation: string }>;
}

export default function ProceduresView({ onBack, isAdmin = false, socUnlocked: socUnlockedProp }: ProceduresViewProps) {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProcedures, setExpandedProcedures] = useState<Set<string>>(new Set());
  const [selectedConsultants, setSelectedConsultants] = useState<Record<string, string>>({}); // Maps procedure name to consultant name
  const [showSOC, setShowSOC] = useState(false);
  const [socPassword, setSocPassword] = useState('');
  const [internalSocUnlocked, setInternalSocUnlocked] = useState(false); // Toggle button - no password required for demo

  // Use prop if provided, otherwise use internal state
  const socUnlocked = socUnlockedProp !== undefined ? socUnlockedProp : internalSocUnlocked;
  const setSocUnlocked = socUnlockedProp !== undefined ? () => {} : setInternalSocUnlocked;
  const [socError, setSocError] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<any>(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [firebaseSpecialties, setFirebaseSpecialties] = useState<FirebaseSpecialty[]>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [firebaseProcedures, setFirebaseProcedures] = useState<Procedure[]>([]);
  const [loadingProcedures, setLoadingProcedures] = useState(false);
  const [editingPreferenceCard, setEditingPreferenceCard] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [loadingSurgeons, setLoadingSurgeons] = useState(true);

  // Procedure scores state - stores custom scores for each procedure
  const [procedureScores, setProcedureScores] = useState<Record<string, {
    complexity: number;
    duration: number;
    variability: number;
    surgeon: number;
  }>>({});

  // Sort state
  const [sortBy, setSortBy] = useState<'alphabetical' | 'opcs' | 'score'>('alphabetical');

  // PCS Info tooltip state
  const [showPCSInfo, setShowPCSInfo] = useState(false);

  // Load specialties and surgeons from Firebase
  useEffect(() => {
    loadSpecialties();
    loadSurgeons();
  }, []);

  // Load procedures when specialty or subcategory changes
  useEffect(() => {
    if (selectedSpecialty) {
      loadProcedures();
    } else {
      setFirebaseProcedures([]);
    }
  }, [selectedSpecialty, selectedSubcategory]);

  const loadSpecialties = async () => {
    setLoadingSpecialties(true);
    try {
      const q = query(collection(db, 'specialties'));
      const snapshot = await getDocs(q);
      const loadedSpecialties: FirebaseSpecialty[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        loadedSpecialties.push({
          id: doc.id,
          name: data.name,
          abbreviation: data.abbreviation || data.name.substring(0, 6).toUpperCase(),
          subspecialties: data.subspecialties || []
        });
      });

      loadedSpecialties.sort((a, b) => a.name.localeCompare(b.name));
      setFirebaseSpecialties(loadedSpecialties);
    } catch (error) {
      console.error('Error loading specialties:', error);
    } finally {
      setLoadingSpecialties(false);
    }
  };

  const loadSurgeons = async () => {
    setLoadingSurgeons(true);
    try {
      const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
      const loadedSurgeons: Surgeon[] = [];

      surgeonsSnap.forEach(doc => {
        loadedSurgeons.push({
          id: doc.id,
          ...doc.data()
        } as Surgeon);
      });

      // Sort by lastName
      loadedSurgeons.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setSurgeons(loadedSurgeons);
    } catch (error) {
      console.error('Error loading surgeons:', error);
    } finally {
      setLoadingSurgeons(false);
    }
  };

  // Save preference card to Firebase
  const savePreferenceCard = async (preferenceCard: any) => {
    try {
      // Check if preference card already exists in Firebase
      const preferenceCardsRef = collection(db, 'preferenceCards');
      const q = query(
        preferenceCardsRef,
        where('id', '==', preferenceCard.id)
      );
      const existingCards = await getDocs(q);

      if (!existingCards.empty) {
        // Update existing card
        const cardDoc = existingCards.docs[0];
        await updateDoc(doc(db, 'preferenceCards', cardDoc.id), {
          ...preferenceCard,
          lastUpdated: new Date().toISOString().split('T')[0]
        });
      } else {
        // Create new card
        await addDoc(collection(db, 'preferenceCards'), {
          ...preferenceCard,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString().split('T')[0]
        });
      }

      alert('Preference card saved successfully!');
      setShowEditModal(false);
      setEditingPreferenceCard(null);
    } catch (error) {
      console.error('Error saving preference card:', error);
      alert('Error saving preference card. Please try again.');
    }
  };

  const loadProcedures = async () => {
    setLoadingProcedures(true);
    try {
      // Build API URL with query parameters
      const params = new URLSearchParams();
      if (selectedSpecialty) {
        params.append('specialtyName', selectedSpecialty);
      }
      if (selectedSubcategory) {
        params.append('subspecialtyName', selectedSubcategory);
      }

      const response = await fetch(`/api/procedures?${params.toString()}`);
      const data = await response.json();

      if (data.success && data.procedures) {
        const loadedProcedures: Procedure[] = data.procedures.map((proc: any) => ({
          name: proc.name,
          opcs4: proc.opcs4 || [],
          commonVariations: proc.commonVariations || []
        }));

        // Sort procedures by name
        loadedProcedures.sort((a, b) => a.name.localeCompare(b.name));
        setFirebaseProcedures(loadedProcedures);
      } else {
        setFirebaseProcedures([]);
      }
    } catch (error) {
      console.error('Error loading procedures:', error);
      // Fallback to static data if API fails
      setFirebaseProcedures([]);
    } finally {
      setLoadingProcedures(false);
    }
  };

  // Helper function to get surgeons for currently selected specialty
  const getSurgeonsForProcedure = (): string[] => {
    if (!selectedSpecialty) {
      // If no specialty selected, return all surgeons
      return surgeons.map(s => `${s.title} ${s.firstName} ${s.lastName}`);
    }

    // Filter surgeons by the currently selected specialty
    const surgeonsForSpecialty = surgeons.filter(
      surgeon => surgeon.specialtyName === selectedSpecialty
    );

    if (surgeonsForSpecialty.length === 0) {
      // If no surgeons for this specialty, return all surgeons
      return surgeons.map(s => `${s.title} ${s.firstName} ${s.lastName}`);
    }

    return surgeonsForSpecialty.map(s => `${s.title} ${s.firstName} ${s.lastName}`);
  };

  // Use Firebase specialties if available, fallback to static data
  const specialties = firebaseSpecialties.map(s => s.name);

  // Get subcategories for selected specialty
  const subcategories = useMemo(() => {
    if (!selectedSpecialty) return [];

    // Check Firebase specialties for subspecialties
    const firebaseSpecialty = firebaseSpecialties.find(s => s.name === selectedSpecialty);
    if (firebaseSpecialty && firebaseSpecialty.subspecialties && firebaseSpecialty.subspecialties.length > 0) {
      return firebaseSpecialty.subspecialties.map(sub => sub.name);
    }

    return [];
  }, [selectedSpecialty, firebaseSpecialties]);

  // Get procedures from Firebase only
  const procedures = useMemo(() => {
    if (!selectedSpecialty) return [];
    return firebaseProcedures;
  }, [selectedSpecialty, selectedSubcategory, firebaseProcedures]);

  // Filter procedures by search term
  const filteredProcedures = useMemo(() => {
    let filtered = procedures;

    // Apply search filter
    if (searchTerm) {
      filtered = procedures.filter(
        (proc: Procedure) =>
          proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          proc.opcs4.some((code) => code.toLowerCase().includes(searchTerm.toLowerCase())) ||
          proc.commonVariations?.some((variation) =>
            variation.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'opcs') {
        return a.opcs4[0]?.localeCompare(b.opcs4[0] || '') || 0;
      } else if (sortBy === 'score') {
        // Calculate scores for comparison
        const scoreA = scoreProcedure(a.name, a.opcs4, selectedSpecialty, selectedSubcategory);
        const scoreB = scoreProcedure(b.name, b.opcs4, selectedSpecialty, selectedSubcategory);

        // Use custom scores if available, otherwise use auto-calculated
        const avgA = procedureScores[a.name]
          ? (procedureScores[a.name].complexity + procedureScores[a.name].duration +
             procedureScores[a.name].variability + procedureScores[a.name].surgeon)
          : scoreA.averageScore;
        const avgB = procedureScores[b.name]
          ? (procedureScores[b.name].complexity + procedureScores[b.name].duration +
             procedureScores[b.name].variability + procedureScores[b.name].surgeon)
          : scoreB.averageScore;

        return avgB - avgA; // Sort descending (highest total score first)
      }
      return 0;
    });

    return sorted;
  }, [procedures, searchTerm, sortBy, selectedSpecialty, selectedSubcategory, procedureScores]);

  // Handle SOC unlock
  const handleSOCUnlock = () => {
    if (socPassword === '1234') {
      setSocUnlocked(true);
      setSocError('');
      setShowSOC(false);
      setSocPassword('');
    } else {
      setSocError('Incorrect password');
    }
  };

  // Toggle procedure expansion
  const toggleProcedure = (procedureName: string) => {
    const newExpanded = new Set(expandedProcedures);
    if (newExpanded.has(procedureName)) {
      newExpanded.delete(procedureName);
    } else {
      newExpanded.add(procedureName);
    }
    setExpandedProcedures(newExpanded);
  };

  // Get cost data for a procedure
  const getCostData = (procedure: Procedure): ProcedureCost | null => {
    // Try to find cost data by OPCS-4 code
    for (const opcs4 of procedure.opcs4) {
      if (PROCEDURE_COSTS[opcs4]) {
        return PROCEDURE_COSTS[opcs4];
      }
    }
    return null;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Secret admin access - click title 8 times
  const handleTitleClick = () => {
    // Clear existing timer
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 8) {
      console.log('Admin access granted!');
      setClickCount(0);
      setTimeout(() => {
        router.push('/admin');
      }, 0);
    } else {
      // Reset counter after 2 seconds of no clicks
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      setClickTimer(timer);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        {/* Desktop Header - Hide when isAdmin (page has its own header) */}
        {!isAdmin && (
          <div className="hidden md:block px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h1
                  className="text-2xl font-bold text-gray-900 cursor-pointer select-none"
                  onClick={handleTitleClick}
                >
                  Procedures Reference
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Browse NHS surgical procedures with clinical codes and cost data
                </p>
              </div>

            {/* SOC Toggle Button - No password required for demo */}
            <div className="relative ml-4">
              {!socUnlocked ? (
                <button
                  onClick={() => setSocUnlocked(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  <span>Show SOC</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>SOC Active</span>
                  </div>
                  <button
                    onClick={() => setSocUnlocked(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Hide SOC"
                  >
                    <EyeOff className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* SOC Password Modal - Disabled for demo */}
      {/* SOC data is visible by toggle button for demo purposes */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-2 md:p-3">
        <div className="max-w-full mx-auto space-y-3">
          {/* Amazon-Style Category Boxes - Desktop Only */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-3">
              {/* Specialty Box */}
              <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md">
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-base font-bold text-gray-900">Choose Specialty</h3>
                  <p className="text-xs text-gray-600">Browse by medical field</p>
                </div>
                <div className="p-3">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => {
                      setSelectedSpecialty(e.target.value);
                      setSelectedSubcategory('');
                      setSearchTerm('');
                    }}
                    disabled={loadingSpecialties}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium bg-white hover:border-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{loadingSpecialties ? 'Loading specialties...' : 'All Specialties'}</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  {!selectedSpecialty && (
                    <p className="text-xs text-gray-600 mt-2 px-1">Select a specialty to view subcategories</p>
                  )}
                  {selectedSpecialty && (
                    <div className="mt-2 px-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100 rounded px-2 py-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="font-medium">{selectedSpecialty}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Subcategory Box */}
              <div className={`bg-white rounded-xl border transition-all shadow-sm ${
                selectedSpecialty
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}>
                <div className={`p-3 border-b transition-colors ${
                  selectedSpecialty
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <h3 className="text-base font-bold text-gray-900">Choose Subcategory</h3>
                  <p className="text-xs text-gray-600">Narrow down procedures</p>
                </div>
                <div className="p-3">
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setSearchTerm('');
                    }}
                    disabled={!selectedSpecialty}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium bg-white hover:border-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300"
                  >
                    <option value="">All Subcategories</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                  {!selectedSpecialty && (
                    <p className="text-xs text-gray-400 mt-2 px-1">Select specialty first</p>
                  )}
                  {selectedSpecialty && !selectedSubcategory && (
                    <p className="text-xs text-gray-600 mt-2 px-1">Select a subcategory to view procedures</p>
                  )}
                  {selectedSubcategory && (
                    <div className="mt-2 px-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100 rounded px-2 py-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="font-medium">{selectedSubcategory}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Box */}
              <div className={`bg-white rounded-xl border transition-all shadow-sm ${
                selectedSpecialty && selectedSubcategory
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}>
                <div className={`p-3 border-b transition-colors ${
                  selectedSpecialty && selectedSubcategory
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <h3 className="text-base font-bold text-gray-900">Search Procedures</h3>
                  <p className="text-xs text-gray-600">Find specific procedures</p>
                </div>
                <div className="p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={!selectedSpecialty || !selectedSubcategory}
                      placeholder="Search by name or code..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300"
                    />
                  </div>
                  {!selectedSpecialty || !selectedSubcategory ? (
                    <p className="text-xs text-gray-400 mt-2 px-1">Select specialty and subcategory first</p>
                  ) : (
                    <p className="text-xs text-gray-600 mt-2 px-1">
                      {searchTerm ? `Searching in ${selectedSubcategory}...` : 'Type to filter procedures'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Original Dropdowns */}
          <div className="md:hidden bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-2">Select Specialty & Subcategory</h2>

            <div className="space-y-2">
              {/* Specialty Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    setSelectedSubcategory('');
                    setSearchTerm('');
                  }}
                  disabled={loadingSpecialties}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{loadingSpecialties ? 'Loading specialties...' : 'Choose a specialty...'}</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Dropdown */}
              {selectedSpecialty && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Subcategory</label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setSearchTerm('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="">Choose a subcategory...</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search */}
              {selectedSpecialty && selectedSubcategory && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Search Procedures</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by procedure name, OPCS-4 code, or variation..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {selectedSpecialty && loadingProcedures && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                <p className="text-sm text-gray-600">Loading procedures...</p>
              </div>
            </div>
          )}

          {/* Procedures List */}
          {selectedSpecialty && !loadingProcedures && filteredProcedures.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  {selectedSubcategory || selectedSpecialty} Procedures ({filteredProcedures.length})
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'alphabetical' | 'opcs' | 'score')}
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="opcs">OPCS Code</option>
                    <option value="score">Score</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredProcedures.map((procedure: Procedure, index: number) => {
                  const isExpanded = expandedProcedures.has(procedure.name);
                  const costData = getCostData(procedure);
                  const hasCostData = socUnlocked && costData;

                  // Get or calculate procedure score
                  const autoScore = scoreProcedure(
                    procedure.name,
                    procedure.opcs4,
                    selectedSpecialty,
                    selectedSubcategory
                  );

                  // Use custom scores if set, otherwise use auto-calculated
                  const currentScores = procedureScores[procedure.name] || {
                    complexity: autoScore.complexityScore,
                    duration: autoScore.durationScore,
                    variability: autoScore.variabilityScore,
                    surgeon: autoScore.surgeonLevelScore
                  };

                  // Calculate total (sum of all 4 factors)
                  const averageScore = (
                    currentScores.complexity +
                    currentScores.duration +
                    currentScores.variability +
                    currentScores.surgeon
                  );

                  // Update score for a specific factor
                  const updateScore = (factor: 'complexity' | 'duration' | 'variability' | 'surgeon', value: number) => {
                    setProcedureScores(prev => ({
                      ...prev,
                      [procedure.name]: {
                        ...currentScores,
                        [factor]: value
                      }
                    }));
                  };

                  // Save scores (for future: could persist to Firebase/localStorage)
                  const saveScores = () => {
                    // TODO: Persist to Firebase or localStorage
                    console.log('Saved scores for', procedure.name, currentScores);
                    alert('Scores saved! (Currently in memory only)');
                  };

                  return (
                    <div key={`${procedure.name}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      {/* Procedure Header */}
                      <div
                        onClick={() => toggleProcedure(procedure.name)}
                        className="w-full px-4 py-3 flex items-center justify-between cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleProcedure(procedure.name);
                          }
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{procedure.name}</h4>
                            {hasCostData && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                SOC
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">OPCS-4:</span>
                              <span className="font-bold text-blue-600">{procedure.opcs4.join(', ')}</span>
                            </span>

                            {/* Interactive Score Dropdowns */}
                            <div className="flex flex-wrap items-center gap-2 ml-24" onClick={(e) => e.stopPropagation()}>
                              {/* Complexity Dropdown */}
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-purple-200">
                                <span className="font-medium text-purple-900">Complexity:</span>
                                <select
                                  value={currentScores.complexity}
                                  onChange={(e) => updateScore('complexity', parseFloat(e.target.value))}
                                  className="bg-transparent border-none text-purple-900 font-bold text-xs focus:outline-none focus:ring-0 cursor-pointer p-0"
                                >
                                  <option value="1">1 - Minor</option>
                                  <option value="1.5">1.5 - In-between</option>
                                  <option value="2">2 - Major</option>
                                </select>
                              </div>

                              {/* Duration Dropdown */}
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-blue-200">
                                <span className="font-medium text-blue-900">Duration:</span>
                                <select
                                  value={currentScores.duration}
                                  onChange={(e) => updateScore('duration', parseFloat(e.target.value))}
                                  className="bg-transparent border-none text-blue-900 font-bold text-xs focus:outline-none focus:ring-0 cursor-pointer p-0"
                                >
                                  <option value="0.5">0.5 - &lt;1hr</option>
                                  <option value="1">1 - 1hr</option>
                                  <option value="1.5">1.5 - 1.5hrs</option>
                                  <option value="2">2 - 2hrs</option>
                                  <option value="2.5">2.5 - 2.5hrs</option>
                                  <option value="3">3 - 3hrs</option>
                                  <option value="3.5">3.5 - 3.5hrs</option>
                                  <option value="4">4 - 4hrs</option>
                                  <option value="4.5">4.5 - 4.5hrs</option>
                                  <option value="5">5 - 5hrs+</option>
                                </select>
                              </div>

                              {/* Variability Dropdown */}
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-green-200">
                                <span className="font-medium text-green-900">Variability:</span>
                                <select
                                  value={currentScores.variability}
                                  onChange={(e) => updateScore('variability', parseFloat(e.target.value))}
                                  className="bg-transparent border-none text-green-900 font-bold text-xs focus:outline-none focus:ring-0 cursor-pointer p-0"
                                >
                                  <option value="1">1 - Consistent</option>
                                  <option value="2">2 - Variable</option>
                                </select>
                              </div>

                              {/* Surgeon Factor Dropdown */}
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-orange-200">
                                <span className="font-medium text-orange-900">Surgeon:</span>
                                <select
                                  value={currentScores.surgeon}
                                  onChange={(e) => updateScore('surgeon', parseFloat(e.target.value))}
                                  className="bg-transparent border-none text-orange-900 font-bold text-xs focus:outline-none focus:ring-0 cursor-pointer p-0"
                                >
                                  <option value="1">1 - On-time</option>
                                  <option value="1.5">1.5 - May vary</option>
                                  <option value="2">2 - Slow</option>
                                </select>
                              </div>

                              {/* PCS Display */}
                              <div className="flex items-center gap-1">
                                <div className="px-3 py-1 bg-indigo-100 text-indigo-900 font-bold rounded border border-indigo-300">
                                  PCS: {averageScore.toFixed(2)}
                                </div>
                                <div className="relative">
                                  <div
                                    onMouseEnter={() => setShowPCSInfo(true)}
                                    onMouseLeave={() => setShowPCSInfo(false)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowPCSInfo(!showPCSInfo);
                                    }}
                                    className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors cursor-pointer inline-block"
                                  >
                                    <Info className="w-4 h-4" />
                                  </div>
                                  {showPCSInfo && (
                                    <div className="absolute z-50 left-0 top-6 w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-xl text-xs text-gray-700">
                                      <h4 className="font-bold text-sm text-indigo-900 mb-2">Procedure Complexity Score (PCS)</h4>
                                      <p className="mb-2">A 4-factor scoring system to assess procedure complexity:</p>
                                      <ul className="space-y-1 mb-2">
                                        <li><span className="font-semibold text-purple-700">Complexity:</span> 1 = Minor, 1.5 = In-between, 2 = Major</li>
                                        <li><span className="font-semibold text-blue-700">Duration:</span> 0.5 = &lt;1hr, 1 = 1hr, then +1 per hour</li>
                                        <li><span className="font-semibold text-green-700">Variability:</span> 1 = Consistent, 2 = Variable</li>
                                        <li><span className="font-semibold text-orange-700">Surgeon:</span> 1 = On-time, 1.5 = May vary, 2 = Slow</li>
                                      </ul>
                                      <p className="text-gray-600 italic">PCS = Total (sum) of all 4 factors</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Save Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveScores();
                                }}
                                className="px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded hover:bg-teal-600 transition-colors"
                              >
                                Save
                              </button>
                            </div>

                            {procedure.commonVariations && (
                              <span className="text-gray-400">
                                • Also: {procedure.commonVariations.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50">
                          <div className="space-y-3">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Specialty</div>
                                <div className="text-sm font-semibold text-gray-900">{selectedSpecialty}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Subcategory</div>
                                <div className="text-sm font-semibold text-gray-900">{selectedSubcategory}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Consultant Surgeon</div>
                                <select
                                  className="w-full text-sm font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer p-0"
                                  value={selectedConsultants[procedure.name] || ''}
                                  onChange={(e) => {
                                    setSelectedConsultants({
                                      ...selectedConsultants,
                                      [procedure.name]: e.target.value
                                    });
                                  }}
                                >
                                  <option value="">Select consultant...</option>
                                  {getSurgeonsForProcedure().map((consultant) => (
                                    <option key={consultant} value={consultant}>
                                      {consultant}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Cost Data (if SOC unlocked) - Compact Table View */}
                            {hasCostData && costData && (() => {
                              // Calculate total operational cost
                              const totalCost =
                                (costData.theatreCost || 0) +
                                (costData.staffCost || 0) +
                                (costData.implantCost || 0) +
                                (costData.consumablesCost || 0);

                              // Calculate margin (tariff - cost)
                              const margin = (costData.tariff || 0) - totalCost;
                              const marginPercent = costData.tariff ? ((margin / costData.tariff) * 100).toFixed(1) : 0;

                              return (
                                <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
                                  <div className="flex items-center gap-2 mb-3">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <h4 className="text-xs font-semibold text-blue-900">Financial Overview</h4>
                                  </div>

                                  {/* Compact Table */}
                                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <table className="w-full text-xs">
                                      <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Metric</th>
                                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Amount</th>
                                          <th className="text-right py-2 px-3 font-semibold text-gray-700">Details</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-100">
                                        {/* Revenue */}
                                        <tr className="hover:bg-blue-50">
                                          <td className="py-2 px-3 font-medium text-gray-900">NHS Tariff (Revenue)</td>
                                          <td className="py-2 px-3 text-right font-bold text-blue-600">
                                            {formatCurrency(costData.tariff || 0)}
                                          </td>
                                          <td className="py-2 px-3 text-right text-gray-500">
                                            {costData.hrgCode && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{costData.hrgCode}</span>}
                                          </td>
                                        </tr>

                                        {/* Operational Costs */}
                                        {costData.theatreCost && (
                                          <tr className="hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-700 pl-6">• Theatre Cost</td>
                                            <td className="py-2 px-3 text-right text-gray-900">{formatCurrency(costData.theatreCost)}</td>
                                            <td className="py-2 px-3 text-right text-gray-500 text-[10px]">
                                              {costData.avgTheatreTime && `${costData.avgTheatreTime} min`}
                                            </td>
                                          </tr>
                                        )}
                                        {costData.staffCost && (
                                          <tr className="hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-700 pl-6">• Staff Cost</td>
                                            <td className="py-2 px-3 text-right text-gray-900">{formatCurrency(costData.staffCost)}</td>
                                            <td className="py-2 px-3 text-right"></td>
                                          </tr>
                                        )}
                                        {costData.implantCost !== undefined && (
                                          <tr className="hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-700 pl-6">• Implant Cost</td>
                                            <td className="py-2 px-3 text-right text-gray-900">{formatCurrency(costData.implantCost)}</td>
                                            <td className="py-2 px-3 text-right"></td>
                                          </tr>
                                        )}
                                        {costData.consumablesCost && (
                                          <tr className="hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-700 pl-6">• Consumables Cost</td>
                                            <td className="py-2 px-3 text-right text-gray-900">{formatCurrency(costData.consumablesCost)}</td>
                                            <td className="py-2 px-3 text-right"></td>
                                          </tr>
                                        )}

                                        {/* Total Cost */}
                                        <tr className="bg-gray-50 font-semibold">
                                          <td className="py-2 px-3 text-gray-900">Total Operational Cost</td>
                                          <td className="py-2 px-3 text-right text-gray-900">{formatCurrency(totalCost)}</td>
                                          <td className="py-2 px-3 text-right"></td>
                                        </tr>

                                        {/* Margin */}
                                        <tr className={`font-bold ${margin >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                                          <td className="py-2 px-3 text-gray-900">Margin (Profit/Loss)</td>
                                          <td className={`py-2 px-3 text-right ${margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {formatCurrency(margin)}
                                          </td>
                                          <td className={`py-2 px-3 text-right text-[11px] ${margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {marginPercent}%
                                          </td>
                                        </tr>

                                        {/* Pathway Variants */}
                                        {(costData.dayCase || costData.inpatientElective || costData.inpatientEmergency) && (
                                          <>
                                            <tr className="bg-purple-50">
                                              <td colSpan={3} className="py-1.5 px-3 text-[10px] font-semibold text-purple-900 uppercase">
                                                Pathway Tariffs
                                              </td>
                                            </tr>
                                            {costData.dayCase && costData.dayCase > 0 && (
                                              <tr className="hover:bg-purple-50">
                                                <td className="py-2 px-3 text-gray-700 pl-6">• Day Case</td>
                                                <td className="py-2 px-3 text-right text-green-600 font-semibold">{formatCurrency(costData.dayCase)}</td>
                                                <td className="py-2 px-3 text-right text-gray-500 text-[10px]">Same day</td>
                                              </tr>
                                            )}
                                            {costData.inpatientElective && costData.inpatientElective > 0 && (
                                              <tr className="hover:bg-purple-50">
                                                <td className="py-2 px-3 text-gray-700 pl-6">• Elective Inpatient</td>
                                                <td className="py-2 px-3 text-right text-purple-600 font-semibold">{formatCurrency(costData.inpatientElective)}</td>
                                                <td className="py-2 px-3 text-right text-gray-500 text-[10px]">
                                                  {costData.avgLengthOfStay > 0 ? `${costData.avgLengthOfStay}d` : ''}
                                                </td>
                                              </tr>
                                            )}
                                            {costData.inpatientEmergency && costData.inpatientEmergency > 0 && (
                                              <tr className="hover:bg-purple-50">
                                                <td className="py-2 px-3 text-gray-700 pl-6">• Emergency Inpatient</td>
                                                <td className="py-2 px-3 text-right text-red-600 font-semibold">{formatCurrency(costData.inpatientEmergency)}</td>
                                                <td className="py-2 px-3 text-right text-gray-500 text-[10px]">
                                                  {costData.avgLengthOfStay > 0 ? `${costData.avgLengthOfStay}d` : ''}
                                                </td>
                                              </tr>
                                            )}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>

                                  {/* Last Updated */}
                                  {costData.lastUpdated && (
                                    <div className="mt-2 text-[10px] text-gray-500 text-right">
                                      Updated: {costData.lastUpdated}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            {/* Preference Card Table (if consultant selected) */}
                            {selectedConsultants[procedure.name] && (() => {
                              const consultantFullName = selectedConsultants[procedure.name];
                              const consultantName = consultantFullName.split(' ').slice(1).join(' '); // Remove title

                              // Find the surgeon from Firebase surgeons list
                              const surgeon = surgeons.find(s =>
                                consultantFullName === `${s.title} ${s.firstName} ${s.lastName}`
                              );

                              const preferenceCard = getPreferenceCard(consultantName, procedure.opcs4[0], surgeon ? {
                                id: surgeon.id,
                                firstName: surgeon.firstName,
                                lastName: surgeon.lastName,
                                title: surgeon.title,
                                specialtyName: surgeon.specialtyName,
                                primarySubspecialty: surgeon.primarySubspecialty
                              } : undefined);

                              if (!preferenceCard) {
                                return (
                                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                                    No preference card available for {consultantFullName} for this procedure.
                                  </div>
                                );
                              }

                              // Check if this is a new-format comprehensive preference card
                              const isComprehensiveCard = !!(preferenceCard.generalInfo || preferenceCard.drapesAndConsumables);
                              let totalPreferenceCardCost = 0;

                              // Calculate total cost for comprehensive cards
                              if (isComprehensiveCard && socUnlocked) {
                                // 1. Drapes and Consumables
                                if (preferenceCard.drapesAndConsumables) {
                                  [...preferenceCard.drapesAndConsumables.basic, ...preferenceCard.drapesAndConsumables.specific].forEach(item => {
                                    const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                    if (invItem) totalPreferenceCardCost += (invItem.cost || 0) * item.quantity;
                                  });
                                }

                                // 2. Instrument Sets
                                if (preferenceCard.instrumentSets) {
                                  [...preferenceCard.instrumentSets.basic, ...preferenceCard.instrumentSets.specific].forEach(item => {
                                    if (item.inventoryId) {
                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                      if (invItem) totalPreferenceCardCost += (invItem.cost || 0);
                                    }
                                  });
                                }

                                // 3. Equipment
                                if (preferenceCard.equipment) {
                                  preferenceCard.equipment.items.forEach(item => {
                                    if (item.inventoryId) {
                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                      if (invItem) totalPreferenceCardCost += (invItem.cost || 0) * (item.quantity || 1);
                                    }
                                  });
                                }

                                // 4. Sutures and Closure
                                if (preferenceCard.suturesAndClosure) {
                                  preferenceCard.suturesAndClosure.items.forEach(item => {
                                    if (item.inventoryId) {
                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                      if (invItem) totalPreferenceCardCost += (invItem.cost || 0) * item.quantity;
                                    }
                                  });
                                }

                                // 5. Implants and Prostheses
                                if (preferenceCard.implantsAndProstheses) {
                                  preferenceCard.implantsAndProstheses.items.forEach(item => {
                                    if (item.inventoryId) {
                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                      if (invItem) totalPreferenceCardCost += (invItem.cost || 0) * item.quantity;
                                    }
                                  });
                                }

                                // 6. Medications and Fluids
                                if (preferenceCard.medicationsAndFluids) {
                                  preferenceCard.medicationsAndFluids.items.forEach(item => {
                                    if (item.inventoryId) {
                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                      if (invItem) totalPreferenceCardCost += (invItem.cost || 0);
                                    }
                                  });
                                }
                              }

                              return (
                                <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 mt-3">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <Package className="w-5 h-5 text-purple-600" />
                                      <h4 className="text-sm font-bold text-purple-900">
                                        Surgical Preference Card - {consultantFullName}
                                      </h4>
                                    </div>
                                    {isAdmin && (
                                      <button
                                        onClick={() => {
                                          setEditingPreferenceCard(preferenceCard);
                                          setShowEditModal(true);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                      </button>
                                    )}
                                  </div>

                                  {isComprehensiveCard ? (
                                    <div className="space-y-4">
                                      {/* 1. General Information */}
                                      {preferenceCard.generalInfo && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-b border-blue-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wide">1. General Information</h5>
                                          </div>
                                          <div className="p-4 grid grid-cols-2 gap-3 text-xs">
                                            <div><span className="font-semibold text-gray-700">Procedure:</span> <span className="text-gray-900">{preferenceCard.generalInfo.procedureName}</span></div>
                                            <div><span className="font-semibold text-gray-700">Positioning:</span> <span className="text-gray-900">{preferenceCard.generalInfo.positioning}</span></div>
                                            <div><span className="font-semibold text-gray-700">Anaesthetic:</span> <span className="text-gray-900">{preferenceCard.generalInfo.anaestheticType}</span></div>
                                            {preferenceCard.generalInfo.operatingTable && (
                                              <div><span className="font-semibold text-gray-700">Operating Table:</span> <span className="text-gray-900">{preferenceCard.generalInfo.operatingTable}</span></div>
                                            )}
                                            {preferenceCard.generalInfo.setupNotes && (
                                              <div className="col-span-2"><span className="font-semibold text-gray-700">Setup Notes:</span> <span className="text-gray-900">{preferenceCard.generalInfo.setupNotes}</span></div>
                                            )}
                                            {preferenceCard.generalInfo.cheatSheetLink && (
                                              <div className="col-span-2">
                                                <a href={preferenceCard.generalInfo.cheatSheetLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                                                  <FileText className="w-4 h-4" />
                                                  <span>View Step-by-Step Procedural Guide</span>
                                                </a>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {/* 2. Positioning Equipment */}
                                      {preferenceCard.positioningEquipment && preferenceCard.positioningEquipment.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-teal-100 to-teal-50 border-b border-teal-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wide">2. Positioning Equipment</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Equipment</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Notes</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.positioningEquipment.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-teal-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity || 1}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.notes || '—'}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 3. Cleaning and Prep Solutions */}
                                      {preferenceCard.cleaningAndPrep && preferenceCard.cleaningAndPrep.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-sky-100 to-sky-50 border-b border-sky-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide">3. Cleaning & Prep Solutions</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Solution</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700 w-32">Volume</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Application</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.cleaningAndPrep.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-sky-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-gray-700">{item.volume || '—'}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.application || '—'}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 4. Drapes and Consumables */}
                                      {preferenceCard.drapesAndConsumables && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-green-100 to-green-50 border-b border-green-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-green-900 uppercase tracking-wide">4. Drapes & Consumables</h5>
                                          </div>
                                          <div className="divide-y divide-gray-200">
                                            {/* Basic (Trust Stock) */}
                                            {preferenceCard.drapesAndConsumables.basic.length > 0 && (
                                              <div>
                                                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                                  <h6 className="text-xs font-semibold text-gray-700">Basic (Trust Stock)</h6>
                                                </div>
                                                <table className="w-full text-xs">
                                                  <thead className="bg-gray-50">
                                                    <tr>
                                                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Item & SKU</th>
                                                      <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                      {socUnlocked && (
                                                        <>
                                                          <th className="text-right py-2 px-4 font-semibold text-gray-700 w-24">Unit</th>
                                                          <th className="text-right py-2 px-4 font-semibold text-gray-700 w-24">Total</th>
                                                        </>
                                                      )}
                                                    </tr>
                                                  </thead>
                                                  <tbody className="divide-y divide-gray-100">
                                                    {preferenceCard.drapesAndConsumables.basic.map((item, idx) => {
                                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                                      if (!invItem) return null;
                                                      const itemCost = (invItem.cost || 0) * item.quantity;
                                                      return (
                                                        <tr key={idx} className="hover:bg-green-50 transition-colors">
                                                          <td className="py-2 px-4">
                                                            <div className="font-medium text-gray-900">{invItem.name}</div>
                                                            <div className="text-[10px] text-blue-600 font-mono">{invItem.id}</div>
                                                          </td>
                                                          <td className="py-2 px-4 text-center font-semibold text-gray-900">{item.quantity}</td>
                                                          {socUnlocked && (
                                                            <>
                                                              <td className="py-2 px-4 text-right text-gray-700">{formatCurrency(invItem.cost || 0)}</td>
                                                              <td className="py-2 px-4 text-right font-semibold text-gray-900">{formatCurrency(itemCost)}</td>
                                                            </>
                                                          )}
                                                        </tr>
                                                      );
                                                    })}
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                            {/* Specific (Supplier/Brand) */}
                                            {preferenceCard.drapesAndConsumables.specific.length > 0 && (
                                              <div>
                                                <div className="bg-amber-50 px-4 py-2 border-b border-amber-200">
                                                  <h6 className="text-xs font-semibold text-amber-800">Specific (Supplier/Brand)</h6>
                                                </div>
                                                <table className="w-full text-xs">
                                                  <thead className="bg-gray-50">
                                                    <tr>
                                                      <th className="text-left py-2 px-4 font-semibold text-gray-700">Item & SKU</th>
                                                      <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                      {socUnlocked && (
                                                        <>
                                                          <th className="text-right py-2 px-4 font-semibold text-gray-700 w-24">Unit</th>
                                                          <th className="text-right py-2 px-4 font-semibold text-gray-700 w-24">Total</th>
                                                        </>
                                                      )}
                                                    </tr>
                                                  </thead>
                                                  <tbody className="divide-y divide-gray-100">
                                                    {preferenceCard.drapesAndConsumables.specific.map((item, idx) => {
                                                      const invItem = INVENTORY_ITEMS.find(inv => inv.id === item.inventoryId);
                                                      if (!invItem) return null;
                                                      const itemCost = (invItem.cost || 0) * item.quantity;
                                                      return (
                                                        <tr key={idx} className="hover:bg-amber-50 transition-colors">
                                                          <td className="py-2 px-4">
                                                            <div className="font-medium text-gray-900">{invItem.name}</div>
                                                            <div className="flex items-center gap-2 text-[10px]">
                                                              <span className="text-blue-600 font-mono">{invItem.id}</span>
                                                              {item.notes && <span className="text-amber-700 font-medium">• {item.notes}</span>}
                                                            </div>
                                                          </td>
                                                          <td className="py-2 px-4 text-center font-semibold text-gray-900">{item.quantity}</td>
                                                          {socUnlocked && (
                                                            <>
                                                              <td className="py-2 px-4 text-right text-gray-700">{formatCurrency(invItem.cost || 0)}</td>
                                                              <td className="py-2 px-4 text-right font-semibold text-gray-900">{formatCurrency(itemCost)}</td>
                                                            </>
                                                          )}
                                                        </tr>
                                                      );
                                                    })}
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {/* 5. Instrument Sets */}
                                      {preferenceCard.instrumentSets && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 border-b border-indigo-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">5. Instrument Sets</h5>
                                          </div>
                                          <div className="divide-y divide-gray-200">
                                            {/* Basic (Trust's Trays) */}
                                            {preferenceCard.instrumentSets.basic.length > 0 && (
                                              <div className="p-4">
                                                <h6 className="text-xs font-semibold text-gray-700 mb-3">Basic (Trust's Trays)</h6>
                                                <div className="space-y-2">
                                                  {preferenceCard.instrumentSets.basic.map((set, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-gray-50 rounded">
                                                      <span className="text-indigo-600 mt-0.5">▪</span>
                                                      <div>
                                                        <div className="font-semibold text-gray-900">{set.name}</div>
                                                        {set.description && <div className="text-gray-600 text-[10px]">{set.description}</div>}
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                            {/* Specific (Supplier/Loaned/Consigned) */}
                                            {preferenceCard.instrumentSets.specific.length > 0 && (
                                              <div className="p-4 bg-amber-50">
                                                <h6 className="text-xs font-semibold text-amber-800 mb-3">Specific (Supplier/Loaned/Consigned)</h6>
                                                <div className="space-y-2">
                                                  {preferenceCard.instrumentSets.specific.map((set, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-white rounded border border-amber-200">
                                                      <span className="text-amber-600 mt-0.5">▪</span>
                                                      <div className="flex-1">
                                                        <div className="font-semibold text-gray-900">{set.name}</div>
                                                        <div className="text-[10px] text-gray-600 mt-1 space-x-3">
                                                          {set.supplier && <span><span className="font-medium">Supplier:</span> {set.supplier}</span>}
                                                          <span><span className="font-medium">Type:</span> <span className="capitalize">{set.type}</span></span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {/* 6. Equipment */}
                                      {preferenceCard.equipment && preferenceCard.equipment.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-cyan-100 to-cyan-50 border-b border-cyan-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-cyan-900 uppercase tracking-wide">6. Equipment</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Equipment</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Settings/Notes</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.equipment.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-cyan-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity || 1}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.settings || '—'}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 7. Sutures and Closure */}
                                      {preferenceCard.suturesAndClosure && preferenceCard.suturesAndClosure.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-pink-100 to-pink-50 border-b border-pink-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wide">7. Sutures & Closure Materials</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Type & Size</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Needle</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Usage</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.suturesAndClosure.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-pink-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.type} {item.size}</td>
                                                  <td className="py-2 px-4 text-gray-700">{item.needleType || '—'}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.usage}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 8. Implants/Prostheses */}
                                      {preferenceCard.implantsAndProstheses && preferenceCard.implantsAndProstheses.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-orange-900 uppercase tracking-wide">8. Implants & Prostheses</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Implant</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Manufacturer</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Size</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-32">Type</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.implantsAndProstheses.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-orange-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-gray-700">{item.manufacturer}</td>
                                                  <td className="py-2 px-4 text-gray-700">{item.size || '—'}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity}</td>
                                                  <td className="py-2 px-4 text-center">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                                      item.type === 'consigned' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                      {item.type}
                                                    </span>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 9. Medications and Fluids */}
                                      {preferenceCard.medicationsAndFluids && preferenceCard.medicationsAndFluids.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-red-100 to-red-50 border-b border-red-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-red-900 uppercase tracking-wide">9. Medications & Fluids</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Medication</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Dose</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-24">Route</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Timing</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.medicationsAndFluids.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-red-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-gray-700">{item.dose || '—'}</td>
                                                  <td className="py-2 px-4 text-center text-gray-700">{item.route || '—'}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.timing || '—'}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 10. Wound Dressing */}
                                      {preferenceCard.woundDressing && preferenceCard.woundDressing.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-lime-100 to-lime-50 border-b border-lime-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-lime-900 uppercase tracking-wide">10. Wound Dressing</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Dressing</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-32">Type</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.woundDressing.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-lime-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity || 1}</td>
                                                  <td className="py-2 px-4 text-center">
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-lime-100 text-lime-800">
                                                      {item.type || 'Standard'}
                                                    </span>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 11. Miscellaneous */}
                                      {preferenceCard.miscellaneous && preferenceCard.miscellaneous.items.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">11. Miscellaneous</h5>
                                          </div>
                                          <table className="w-full text-xs">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                              <tr>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Item</th>
                                                <th className="text-center py-2 px-4 font-semibold text-gray-700 w-20">Qty</th>
                                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Notes</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                              {preferenceCard.miscellaneous.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                  <td className="py-2 px-4 font-medium text-gray-900">{item.name}</td>
                                                  <td className="py-2 px-4 text-center text-gray-900">{item.quantity || 1}</td>
                                                  <td className="py-2 px-4 text-gray-600">{item.notes || '—'}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}

                                      {/* 12. Special Instructions */}
                                      {preferenceCard.specialInstructions && (
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-b border-purple-200 px-4 py-2.5">
                                            <h5 className="text-xs font-bold text-purple-900 uppercase tracking-wide">12. Special Instructions</h5>
                                          </div>
                                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {preferenceCard.specialInstructions.preOperative && preferenceCard.specialInstructions.preOperative.length > 0 && (
                                              <div>
                                                <h6 className="text-xs font-semibold text-gray-700 mb-2">Pre-Operative</h6>
                                                <ul className="space-y-1">
                                                  {preferenceCard.specialInstructions.preOperative.map((instr, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                                      <span className="text-purple-600 mt-0.5">•</span>
                                                      <span>{instr}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                            {preferenceCard.specialInstructions.intraOperative && preferenceCard.specialInstructions.intraOperative.length > 0 && (
                                              <div>
                                                <h6 className="text-xs font-semibold text-gray-700 mb-2">Intra-Operative</h6>
                                                <ul className="space-y-1">
                                                  {preferenceCard.specialInstructions.intraOperative.map((instr, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                                      <span className="text-purple-600 mt-0.5">•</span>
                                                      <span>{instr}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                            {preferenceCard.specialInstructions.postOperative && preferenceCard.specialInstructions.postOperative.length > 0 && (
                                              <div>
                                                <h6 className="text-xs font-semibold text-gray-700 mb-2">Post-Operative</h6>
                                                <ul className="space-y-1">
                                                  {preferenceCard.specialInstructions.postOperative.map((instr, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                                      <span className="text-purple-600 mt-0.5">•</span>
                                                      <span>{instr}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                            {preferenceCard.specialInstructions.teamCommunication && preferenceCard.specialInstructions.teamCommunication.length > 0 && (
                                              <div>
                                                <h6 className="text-xs font-semibold text-gray-700 mb-2">Team Communication</h6>
                                                <ul className="space-y-1">
                                                  {preferenceCard.specialInstructions.teamCommunication.map((instr, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                                      <span className="text-purple-600 mt-0.5">•</span>
                                                      <span>{instr}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {/* Cost Comparison (SOC Active Only) */}
                                      {socUnlocked && costData && totalPreferenceCardCost > 0 && (
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 overflow-hidden">
                                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-white" />
                                            <h5 className="text-sm font-bold text-white uppercase tracking-wide">Cost Analysis & Comparison</h5>
                                          </div>
                                          <div className="p-4 space-y-4">
                                            {/* Summary Cards */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                              {/* Preference Card Cost */}
                                              <div className="bg-white rounded-lg border border-blue-200 p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <Package className="w-4 h-4 text-purple-600" />
                                                  <span className="text-xs font-semibold text-gray-600">Preference Card Items</span>
                                                </div>
                                                <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalPreferenceCardCost)}</div>
                                                <div className="text-[10px] text-gray-500 mt-1">Consumables & Equipment</div>
                                              </div>

                                              {/* Procedure Financial Overview */}
                                              <div className="bg-white rounded-lg border border-green-200 p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <DollarSign className="w-4 h-4 text-green-600" />
                                                  <span className="text-xs font-semibold text-gray-600">Total Procedure Cost</span>
                                                </div>
                                                <div className="text-2xl font-bold text-green-700">
                                                  {formatCurrency((costData.theatreCost || 0) + (costData.staffCost || 0) + (costData.implantCost || 0) + (costData.consumablesCost || 0))}
                                                </div>
                                                <div className="text-[10px] text-gray-500 mt-1">Theatre + Staff + Implants + Consumables</div>
                                              </div>

                                              {/* Tariff/Revenue */}
                                              <div className="bg-white rounded-lg border border-blue-200 p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <TrendingUp className="w-4 h-4 text-blue-600" />
                                                  <span className="text-xs font-semibold text-gray-600">NHS Tariff</span>
                                                </div>
                                                <div className="text-2xl font-bold text-blue-700">{formatCurrency(costData.tariff || 0)}</div>
                                                <div className="text-[10px] text-gray-500 mt-1">{costData.hrgCode || 'N/A'}</div>
                                              </div>
                                            </div>

                                            {/* Detailed Breakdown */}
                                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                                <h6 className="text-xs font-bold text-gray-700">Cost Breakdown</h6>
                                              </div>
                                              <div className="p-4">
                                                <table className="w-full text-xs">
                                                  <tbody className="divide-y divide-gray-100">
                                                    <tr>
                                                      <td className="py-2 text-gray-700 font-medium">Theatre Time</td>
                                                      <td className="py-2 text-right text-gray-900 font-semibold">{formatCurrency(costData.theatreCost || 0)}</td>
                                                      <td className="py-2 text-right text-gray-500 text-[10px]">{costData.avgTheatreTime || 0} min</td>
                                                    </tr>
                                                    <tr>
                                                      <td className="py-2 text-gray-700 font-medium">Staff Costs</td>
                                                      <td className="py-2 text-right text-gray-900 font-semibold">{formatCurrency(costData.staffCost || 0)}</td>
                                                      <td className="py-2 text-right text-gray-500 text-[10px]"></td>
                                                    </tr>
                                                    <tr>
                                                      <td className="py-2 text-gray-700 font-medium">Implants (SOC Budget)</td>
                                                      <td className="py-2 text-right text-gray-900 font-semibold">{formatCurrency(costData.implantCost || 0)}</td>
                                                      <td className="py-2 text-right text-gray-500 text-[10px]"></td>
                                                    </tr>
                                                    <tr>
                                                      <td className="py-2 text-gray-700 font-medium">Consumables (SOC Budget)</td>
                                                      <td className="py-2 text-right text-gray-900 font-semibold">{formatCurrency(costData.consumablesCost || 0)}</td>
                                                      <td className="py-2 text-right text-gray-500 text-[10px]"></td>
                                                    </tr>
                                                    <tr className="bg-purple-50">
                                                      <td className="py-2 text-purple-700 font-bold">Preference Card Actual</td>
                                                      <td className="py-2 text-right text-purple-900 font-bold">{formatCurrency(totalPreferenceCardCost)}</td>
                                                      <td className="py-2 text-right">
                                                        {totalPreferenceCardCost > (costData.consumablesCost || 0) + (costData.implantCost || 0) ? (
                                                          <span className="text-[10px] text-red-600 font-semibold">
                                                            +{formatCurrency(totalPreferenceCardCost - (costData.consumablesCost || 0) - (costData.implantCost || 0))}
                                                          </span>
                                                        ) : (
                                                          <span className="text-[10px] text-green-600 font-semibold">
                                                            {formatCurrency(totalPreferenceCardCost - (costData.consumablesCost || 0) - (costData.implantCost || 0))}
                                                          </span>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    <tr className="bg-blue-50 border-t-2 border-blue-200">
                                                      <td className="py-2 text-blue-800 font-bold">Total Procedure Cost</td>
                                                      <td className="py-2 text-right text-blue-900 font-bold text-sm">
                                                        {formatCurrency((costData.theatreCost || 0) + (costData.staffCost || 0) + totalPreferenceCardCost)}
                                                      </td>
                                                      <td className="py-2 text-right text-gray-500 text-[10px]"></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>

                                            {/* Variance Alert */}
                                            {totalPreferenceCardCost > (costData.consumablesCost || 0) + (costData.implantCost || 0) && (
                                              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                  <div className="text-xs font-bold text-amber-900 mb-1">Budget Variance Detected</div>
                                                  <div className="text-xs text-amber-800">
                                                    Preference card items exceed SOC budget by {formatCurrency(totalPreferenceCardCost - (costData.consumablesCost || 0) - (costData.implantCost || 0))}.
                                                    Review consumables and implants for cost optimization opportunities.
                                                  </div>
                                                </div>
                                              </div>
                                            )}

                                            {totalPreferenceCardCost <= (costData.consumablesCost || 0) + (costData.implantCost || 0) && (
                                              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                                                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                  <div className="text-xs font-bold text-green-900 mb-1">Within Budget</div>
                                                  <div className="text-xs text-green-800">
                                                    Preference card items are within SOC budget. {(costData.consumablesCost || 0) + (costData.implantCost || 0) - totalPreferenceCardCost > 0 &&
                                                    `Remaining budget: ${formatCurrency((costData.consumablesCost || 0) + (costData.implantCost || 0) - totalPreferenceCardCost)}`}
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {/* Last Updated & Notes */}
                                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                                        <span>Last updated: {preferenceCard.lastUpdated}</span>
                                        {preferenceCard.notes && (
                                          <span className="italic text-purple-600">{preferenceCard.notes}</span>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    // Legacy format display (backward compatibility)
                                    <div>Legacy preference card format detected - please update to comprehensive format</div>
                                  )}
                                </div>
                              );
                            })()}

                            {/* No Cost Data Message */}
                            {socUnlocked && !costData && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                                No Schedule of Cost (SOC) data available for this procedure yet.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty States */}
          {!selectedSpecialty && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Exploring Procedures</h3>
              <p className="text-sm text-gray-600">
                Select a specialty above to browse surgical procedures and their OPCS-4 codes.
              </p>
            </div>
          )}

          {selectedSpecialty && !selectedSubcategory && subcategories.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Subcategory</h3>
              <p className="text-sm text-gray-600">
                Choose a subcategory within {selectedSpecialty} to view procedures.
              </p>
            </div>
          )}

          {selectedSpecialty && !loadingProcedures && filteredProcedures.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Procedures Found</h3>
              <p className="text-sm text-gray-600">
                {searchTerm
                  ? 'No procedures match your search criteria. Try adjusting your search term.'
                  : 'No procedures available for this specialty/subcategory. Please configure procedures in the admin panel or run the seed script.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Item Modal */}
      {showInventoryModal && selectedInventoryItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedInventoryItem.name}</h3>
                <p className="text-sm text-blue-100 font-mono">{selectedInventoryItem.id}</p>
              </div>
              <button
                onClick={() => {
                  setShowInventoryModal(false);
                  setSelectedInventoryItem(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Description */}
              {selectedInventoryItem.description && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{selectedInventoryItem.description}</p>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Category</div>
                  <div className="text-sm font-semibold text-gray-900">{selectedInventoryItem.category}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Classification</div>
                  <div className="text-sm font-semibold text-gray-900">{selectedInventoryItem.classification}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Supplier</div>
                  <div className="text-sm font-semibold text-gray-900">{selectedInventoryItem.supplier}</div>
                </div>

                {socUnlocked && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-600 mb-1">Unit Cost</div>
                    <div className="text-sm font-bold text-green-700">
                      {formatCurrency(selectedInventoryItem.cost || 0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Specialty Tags */}
              {selectedInventoryItem.specialty && selectedInventoryItem.specialty.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInventoryItem.specialty.map((spec: string) => (
                      <span
                        key={spec}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Information */}
              {selectedInventoryItem.stock && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Stock Levels</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Stock:</span>
                      <span className="font-semibold text-gray-900">{selectedInventoryItem.stock.current}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Minimum Level:</span>
                      <span className="font-semibold text-gray-900">{selectedInventoryItem.stock.minimum}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Maximum Level:</span>
                      <span className="font-semibold text-gray-900">{selectedInventoryItem.stock.maximum}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reorder Point:</span>
                      <span className="font-semibold text-gray-900">{selectedInventoryItem.stock.reorderPoint}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => {
                  setShowInventoryModal(false);
                  setSelectedInventoryItem(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preference Card Edit Modal */}
      {showEditModal && editingPreferenceCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Edit2 className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-bold">Edit Preference Card</h3>
                  <p className="text-sm text-purple-100">{editingPreferenceCard.consultantTitle} {editingPreferenceCard.consultantName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPreferenceCard(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <strong>Note:</strong> Editing preference cards is currently in development. Changes will be saved locally for this session. Full Firebase integration coming soon.
              </div>

              {/* 1. General Information */}
              {editingPreferenceCard.generalInfo && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">1</span>
                    General Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Operating Table</label>
                      <input
                        type="text"
                        defaultValue={editingPreferenceCard.generalInfo.operatingTable}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="e.g., Standard operating table"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Positioning</label>
                      <input
                        type="text"
                        defaultValue={editingPreferenceCard.generalInfo.positioning}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="e.g., Supine"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Anaesthetic Type</label>
                      <select
                        defaultValue={editingPreferenceCard.generalInfo.anaestheticType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="General">General</option>
                        <option value="Regional">Regional</option>
                        <option value="Local">Local</option>
                        <option value="General or Regional">General or Regional</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Cheat Sheet Link (Step-by-Step Guide) 📋
                      </label>
                      <input
                        type="url"
                        defaultValue={editingPreferenceCard.generalInfo.cheatSheetLink}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="https://example.com/procedure-guide"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter URL to procedural guide or instructional document</p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Setup Notes</label>
                      <textarea
                        defaultValue={editingPreferenceCard.generalInfo.setupNotes}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="General setup instructions..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Positioning Equipment */}
              {editingPreferenceCard.positioningEquipment && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs">2</span>
                    Positioning Equipment
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {editingPreferenceCard.positioningEquipment.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="text-gray-400">•</span>
                        <span>{item.name} (Qty: {item.quantity || 1})</span>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 italic mt-2">Editing individual items coming in future update</p>
                  </div>
                </div>
              )}

              {/* 12. Special Instructions */}
              {editingPreferenceCard.specialInstructions && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">12</span>
                    Special Instructions
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Pre-Operative</label>
                      {editingPreferenceCard.specialInstructions.preOperative?.map((instr: string, idx: number) => (
                        <div key={idx} className="mb-2">
                          <input
                            type="text"
                            defaultValue={instr}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Intra-Operative</label>
                      {editingPreferenceCard.specialInstructions.intraOperative?.map((instr: string, idx: number) => (
                        <div key={idx} className="mb-2">
                          <input
                            type="text"
                            defaultValue={instr}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Post-Operative</label>
                      {editingPreferenceCard.specialInstructions.postOperative?.map((instr: string, idx: number) => (
                        <div key={idx} className="mb-2">
                          <input
                            type="text"
                            defaultValue={instr}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional sections placeholder */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <strong>Coming Soon:</strong> Full editing capability for Drapes, Consumables, Instrument Sets, Equipment, Sutures, Implants, Medications, Wound Dressing, and Miscellaneous sections.
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPreferenceCard(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => savePreferenceCard(editingPreferenceCard)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
