'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Calendar,
  User,
  Activity,
  Filter,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Main Firebase (surgeons, waiting list)
import { WaitingListPriority } from '@/lib/types/waitingListTypes';

interface Surgeon {
  id: string;
  name: string;
  initials: string;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
}

interface Specialty {
  id: string;
  name: string;
  subspecialties?: string[];
}

interface Procedure {
  code: string;
  name: string;
  specialtyName: string;
}

interface PreferenceCard {
  id: string;
  consultantName: string;
  consultantTitle: string;
  specialty: string;
  procedureOpcs4Codes: string[];
  lastUpdated: string;
  notes?: string;
}

interface GeneratedProcedure {
  id?: string;
  patientName: string;
  hospitalNumber: string;
  age: number;
  procedureName: string;
  procedureCode: string;
  priority: WaitingListPriority;
  specialtyId: string;
  specialtyName: string;
  subspecialtyName?: string;
  consultantId: string;
  consultantName: string;
  surgeonInitials: string;
  estimatedDurationMinutes: number;
  referralDate: string;
  waitingDays: number;
  targetDate: string;
  status: string;
  isScheduled: boolean;
  notes: string;
  preferenceCardId?: string;
  createdAt: string;
  updatedAt: string;
}

const FIRST_NAMES = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Rebecca', 'William', 'Sophie', 'Thomas', 'Anna', 'George', 'Emily', 'Charles', 'Olivia'];
const LAST_NAMES = ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Johnson', 'Roberts', 'Walker', 'Wright', 'Robinson', 'Thompson'];

function generateNHSNumber(): string {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  return `${digits.slice(0, 3).join('')} ${digits.slice(3, 6).join('')} ${digits.slice(6).join('')}`;
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function estimateDuration(procedureName: string): number {
  const durations: Record<string, number> = {
    'Total Hip Replacement': 120,
    'Total Knee Replacement': 120,
    'Arthroscopy': 45,
    'ACL Reconstruction': 90,
    'Hip Fracture Fixation': 120,
    'Cholecystectomy': 90,
    'Appendicectomy': 60,
    'Hernia Repair': 60,
    'Hysterectomy': 120,
    'TURP': 60,
    'Cystoscopy': 30,
    'Tonsillectomy': 45,
    'Thyroidectomy': 120,
    'Cataract Surgery': 30
  };

  for (const [key, duration] of Object.entries(durations)) {
    if (procedureName.toLowerCase().includes(key.toLowerCase())) {
      return duration;
    }
  }

  return 90; // Default
}

export default function WaitingListManager() {
  const [generatedProcedures, setGeneratedProcedures] = useState<GeneratedProcedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedConsultant, setSelectedConsultant] = useState<string>('all');
  const [countToGenerate, setCountToGenerate] = useState<number>(10);

  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [specialtiesFromDb, setSpecialtiesFromDb] = useState<Specialty[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [preferenceCards, setPreferenceCards] = useState<PreferenceCard[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load specialties from Firestore
      const specialtiesSnap = await getDocs(collection(db, 'specialties'));
      const specialtiesData: Specialty[] = [];
      specialtiesSnap.forEach(doc => {
        const data = doc.data();
        const name = data.name || '';
        // Filter out unspecified, empty, or invalid specialties
        if (name &&
            name.trim() !== '' &&
            name.toUpperCase() !== 'UNSPECIFIED' &&
            name.toUpperCase() !== 'OTHER') {
          specialtiesData.push({
            id: doc.id,
            name: name.trim(),
            subspecialties: data.subspecialties || []
          });
        }
      });
      setSpecialtiesFromDb(specialtiesData);
      console.log(`✅ Loaded ${specialtiesData.length} specialties from Firestore`);

      // Load surgeons
      const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
      const surgeonsData: Surgeon[] = [];
      surgeonsSnap.forEach(doc => {
        const data = doc.data();
        surgeonsData.push({
          id: doc.id,
          name: `${data.title || 'Mr'} ${data.firstName} ${data.lastName}`,
          initials: data.initials || 'XX',
          specialtyId: data.specialtyId || '',
          specialtyName: data.specialtyName || 'GENERAL SURGERY',
          subspecialtyName: data.subspecialtyName
        });
      });
      setSurgeons(surgeonsData);

      // Load all procedures from API (hardcoded OPCS-4.11 data)
      console.log('📋 Loading procedures from API...');
      const proceduresResponse = await fetch('/api/procedures');
      const proceduresResult = await proceduresResponse.json();

      const proceduresData: Procedure[] = [];
      if (proceduresResult.success && proceduresResult.procedures) {
        proceduresResult.procedures.forEach((proc: any) => {
          const name = proc.name || 'Unknown Procedure';
          const nameUpper = name.toUpperCase();

          // Filter out UNSPECIFIED, OTHER SPECIFIED, NEC, etc.
          if (nameUpper === 'UNSPECIFIED' ||
              nameUpper === 'OTHER SPECIFIED' ||
              nameUpper.includes('UNSPECIFIED') ||
              nameUpper === 'NEC' ||
              nameUpper.endsWith(' NEC')) {
            return; // Skip this procedure
          }

          proceduresData.push({
            code: proc.opcs4?.[0] || 'XXXX',
            name: name,
            specialtyName: proc.specialtyName || ''
          });
        });
        console.log(`✅ Loaded ${proceduresData.length} procedures from API (filtered out unspecified/NEC)`);
      } else {
        console.error('❌ Failed to load procedures from API:', proceduresResult);
      }
      setProcedures(proceduresData);

      // Load preference cards from Firestore
      console.log('🎴 Loading preference cards...');
      const preferenceCardsSnap = await getDocs(collection(db, 'preferenceCards'));
      const preferenceCardsData: PreferenceCard[] = [];
      preferenceCardsSnap.forEach(doc => {
        const data = doc.data();
        preferenceCardsData.push({
          id: doc.id,
          consultantName: data.consultantName || '',
          consultantTitle: data.consultantTitle || 'Mr',
          specialty: data.specialty || '',
          procedureOpcs4Codes: data.procedureOpcs4Codes || [],
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          notes: data.notes
        });
      });
      setPreferenceCards(preferenceCardsData);
      console.log(`✅ Loaded ${preferenceCardsData.length} preference cards`);

      // Load existing generated procedures
      const waitingListSnap = await getDocs(collection(db, 'waitingList'));
      const existingProcedures: GeneratedProcedure[] = [];
      waitingListSnap.forEach(doc => {
        const data = doc.data();
        existingProcedures.push({
          id: doc.id,
          ...data
        } as GeneratedProcedure);
      });
      setGeneratedProcedures(existingProcedures);

      console.log(`✅ Loaded ${surgeonsData.length} surgeons, ${proceduresData.length} procedures, ${existingProcedures.length} existing`);

      // Show specialty breakdown
      if (surgeonsData.length > 0) {
        const surgeonSpecialties = Array.from(new Set(surgeonsData.map(s => s.specialtyName)));
        console.log('📊 Surgeon specialties:', surgeonSpecialties);
      }

      if (proceduresData.length > 0) {
        const procedureSpecialties = Array.from(new Set(proceduresData.map(p => p.specialtyName)));
        console.log('📊 Procedure specialties:', procedureSpecialties);
      } else {
        console.warn('⚠️  No procedures loaded from API! Check that /api/procedures is working.');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateProcedures = async () => {
    console.log('🔥 Generate button clicked');
    console.log('   Surgeons available:', surgeons.length);
    console.log('   Procedures available:', procedures.length);

    if (procedures.length > 0) {
      const uniqueSpecialties = Array.from(new Set(procedures.map(p => p.specialtyName)));
      console.log('   Procedure specialties available:', uniqueSpecialties);
    }

    if (surgeons.length === 0) {
      alert('⚠️ No surgeons found!\n\nPlease add surgeons first in /admin/schedule → Surgeons tab');
      return;
    }

    if (procedures.length === 0) {
      alert('⚠️ No procedures loaded!\n\nThe OPCS-4.11 procedures haven\'t loaded yet. Please wait a moment and try again.\n\nIf this persists, check that /api/procedures is working.');
      return;
    }

    setGenerating(true);
    try {
      console.log('🚀 Starting generation...');

      // Filter surgeons based on specialty and consultant
      let filteredSurgeons = [...surgeons];
      console.log('   Initial surgeons:', filteredSurgeons.length);

      if (selectedSpecialty !== 'all') {
        filteredSurgeons = filteredSurgeons.filter(s => s.specialtyName === selectedSpecialty);
        console.log('   After specialty filter:', filteredSurgeons.length);
      }
      if (selectedConsultant !== 'all') {
        filteredSurgeons = filteredSurgeons.filter(s => s.name === selectedConsultant);
        console.log('   After consultant filter:', filteredSurgeons.length);
      }

      if (filteredSurgeons.length === 0) {
        alert('⚠️ No surgeons match the selected filters!');
        setGenerating(false);
        return;
      }

      console.log(`   Will generate ${countToGenerate} procedures`);

      const newProcedures: GeneratedProcedure[] = [];

      for (let i = 0; i < countToGenerate; i++) {
        console.log(`   Generating procedure ${i + 1}/${countToGenerate}...`);
        // Pick random surgeon
        const surgeon = randomItem(filteredSurgeons);

        // Check if this surgeon has preference cards
        const surgeonPreferenceCards = preferenceCards.filter(pc =>
          pc.consultantName === surgeon.name
        );

        console.log(`   Surgeon: ${surgeon.name} (${surgeon.specialtyName})`);
        console.log(`   Preference cards found: ${surgeonPreferenceCards.length}`);

        let procedureCode = 'XXXX';
        let procedureName = 'Unknown Procedure';
        let preferenceCardId: string | undefined = undefined;

        // If surgeon has preference cards, use those
        if (surgeonPreferenceCards.length > 0) {
          // Get all OPCS-4 codes from surgeon's preference cards
          const preferenceCardOpcs4Codes = new Set<string>();
          surgeonPreferenceCards.forEach(pc => {
            pc.procedureOpcs4Codes.forEach(code => preferenceCardOpcs4Codes.add(code));
          });

          console.log(`   Preference card OPCS-4 codes: ${Array.from(preferenceCardOpcs4Codes).slice(0, 10).join(', ')}...`);

          // Filter procedures that match preference card OPCS-4 codes
          const preferenceCardProcedures = procedures.filter(p =>
            preferenceCardOpcs4Codes.has(p.code)
          );

          console.log(`   Found ${preferenceCardProcedures.length} procedures matching preference cards`);

          if (preferenceCardProcedures.length > 0) {
            const proc = randomItem(preferenceCardProcedures);
            procedureCode = proc.code;
            procedureName = proc.name;

            // Find which preference card this procedure belongs to
            const matchingCard = surgeonPreferenceCards.find(pc =>
              pc.procedureOpcs4Codes.includes(procedureCode)
            );
            if (matchingCard) {
              preferenceCardId = matchingCard.id;
            }

            console.log(`   ✅ Using procedure from preference card: ${procedureName} (${procedureCode})`);
          } else {
            // Surgeon has preference cards, but none match available procedures
            alert(`⚠️ No matching procedures found for ${surgeon.name}!\n\nThis surgeon has ${surgeonPreferenceCards.length} preference card(s), but none of the OPCS-4 codes match available procedures.\n\nPreference card codes: ${Array.from(preferenceCardOpcs4Codes).slice(0, 20).join(', ')}\n\nPlease check the preference cards for this consultant.`);
            setGenerating(false);
            return;
          }
        } else {
          // No preference cards - use all procedures for this specialty
          const normalizeName = (name: string) => name.trim().toUpperCase().replace(/\s+/g, ' ');
          const surgeonSpecialty = normalizeName(surgeon.specialtyName);

          // Get procedures for this specialty with flexible matching
          const specialtyProcedures = procedures.filter(p => {
            const procSpecialty = normalizeName(p.specialtyName);
            return procSpecialty === surgeonSpecialty ||
                   procSpecialty.includes(surgeonSpecialty) ||
                   surgeonSpecialty.includes(procSpecialty);
          });

          console.log(`   Normalized: "${surgeonSpecialty}"`);
          console.log(`   Found ${specialtyProcedures.length} matching procedures (no preference cards)`);

          if (specialtyProcedures.length > 0) {
            const proc = randomItem(specialtyProcedures);
            procedureCode = proc.code;
            procedureName = proc.name;
            console.log(`   ✅ Using procedure: ${procedureName} (${procedureCode})`);
          } else {
            // No procedures found for this specialty
            const availableSpecialties = Array.from(new Set(procedures.map(p => p.specialtyName))).sort();

            console.error(`   ❌ No procedures found for specialty: ${surgeon.specialtyName}`);
            console.error(`   → Searched for (normalized): "${surgeonSpecialty}"`);
            console.error(`   → Available specialties:`, availableSpecialties);

            alert(`⚠️ No procedures found for "${surgeon.specialtyName}"!\n\nSearched for: "${surgeonSpecialty}" (normalized)\n\nAvailable OPCS-4.11 specialties:\n${availableSpecialties.join('\n')}\n\nPlease check the surgeon's specialty name matches one of these.`);
            setGenerating(false);
            return;
          }
        }

        // Determine priority
        let priority: WaitingListPriority;
        if (selectedPriority !== 'all') {
          priority = selectedPriority as WaitingListPriority;
        } else {
          priority = randomItem(['Urgent', 'Expedited', 'Routine', 'Planned'] as WaitingListPriority[]);
        }

        // Calculate dates based on priority
        let waitingDays: number;
        let targetDays: number;

        switch (priority) {
          case 'Urgent':
            waitingDays = Math.floor(Math.random() * 14) + 1;
            targetDays = Math.floor(Math.random() * 7) + 1;
            break;
          case 'Expedited':
            waitingDays = Math.floor(Math.random() * 30) + 14;
            targetDays = Math.floor(Math.random() * 30) + 7;
            break;
          case 'Routine':
            waitingDays = Math.floor(Math.random() * 90) + 30;
            targetDays = Math.floor(Math.random() * 60) + 30;
            break;
          case 'Planned':
          default:
            waitingDays = Math.floor(Math.random() * 180) + 60;
            targetDays = Math.floor(Math.random() * 90) + 90;
            break;
        }

        const referralDate = new Date(Date.now() - waitingDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const targetDate = new Date(Date.now() + targetDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const procedure: GeneratedProcedure = {
          patientName: `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`,
          hospitalNumber: generateNHSNumber(),
          age: Math.floor(Math.random() * 60) + 20,
          procedureName,
          procedureCode,
          priority,
          specialtyId: surgeon.specialtyId,
          specialtyName: surgeon.specialtyName,
          subspecialtyName: surgeon.subspecialtyName || '',
          consultantId: surgeon.id,
          consultantName: surgeon.name,
          surgeonInitials: surgeon.initials,
          estimatedDurationMinutes: estimateDuration(procedureName),
          referralDate,
          waitingDays,
          targetDate,
          status: 'waiting',
          isScheduled: false,
          notes: preferenceCardId
            ? `Generated ${priority} priority procedure (Preference Card: ${preferenceCardId})`
            : `Generated ${priority} priority procedure`,
          preferenceCardId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        try {
          // Save to Firebase
          console.log(`   Saving procedure ${i + 1} to Firebase...`);
          const docRef = await addDoc(collection(db, 'waitingList'), procedure);
          procedure.id = docRef.id;
          newProcedures.push(procedure);
          console.log(`   ✅ Saved procedure ${i + 1}`);
        } catch (saveError) {
          console.error(`   ❌ Failed to save procedure ${i + 1}:`, saveError);
          throw saveError;
        }
      }

      console.log(`✅ Generated ${newProcedures.length} procedures`);

      alert(`✅ Success!\n\nGenerated ${newProcedures.length} procedures.\n\nThey are now in the Procedures Pool.`);

      // Reload data
      await loadData();
    } catch (error: any) {
      console.error('❌ Error generating procedures:', error);
      console.error('   Error details:', error.message);
      console.error('   Error stack:', error.stack);
      alert(`❌ Failed to generate procedures.\n\nError: ${error.message}\n\nCheck console for full details.`);
    } finally {
      setGenerating(false);
    }
  };

  const getPriorityColor = (priority: WaitingListPriority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'Expedited': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Routine': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Planned': return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  // Use specialties from Firestore collection (not from surgeons)
  const specialties = specialtiesFromDb.map(s => s.name).sort();
  const consultantNames = Array.from(new Set(surgeons.map(s => s.name))).sort();

  const filteredProcedures = generatedProcedures.filter(p => {
    if (selectedPriority !== 'all' && p.priority !== selectedPriority) return false;
    if (selectedSpecialty !== 'all' && p.specialtyName !== selectedSpecialty) return false;
    if (selectedConsultant !== 'all' && p.consultantName !== selectedConsultant) return false;
    return true;
  });

  return (
    <div className="space-y-2 sm:space-y-4">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-2 sm:p-3 md:p-4 text-white">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div>
            <h1 className="text-sm sm:text-lg md:text-xl font-bold">Generate Procedures</h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/90 line-clamp-1 sm:line-clamp-none">
              Generate from surgeon profiles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3">
          <div className="bg-white/20 backdrop-blur rounded-md p-1.5 sm:p-2">
            <div className="text-sm sm:text-xl md:text-2xl font-bold leading-tight">{surgeons.length}</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 leading-tight">Surgeons</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-md p-1.5 sm:p-2">
            <div className="text-sm sm:text-xl md:text-2xl font-bold leading-tight">
              {loading ? (
                <Loader2 className="w-3 h-3 sm:w-5 sm:h-5 animate-spin mx-auto" />
              ) : (
                procedures.length.toLocaleString()
              )}
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 truncate leading-tight">OPCS-4</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-md p-1.5 sm:p-2">
            <div className="text-sm sm:text-xl md:text-2xl font-bold leading-tight">{generatedProcedures.length}</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 leading-tight">In Pool</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-md p-1.5 sm:p-2">
            <div className="text-sm sm:text-xl md:text-2xl font-bold leading-tight">
              {generatedProcedures.filter(p => p.priority === 'Urgent').length}
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 leading-tight">Urgent</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-md p-1.5 sm:p-2">
            <div className="text-sm sm:text-xl md:text-2xl font-bold leading-tight">{specialtiesFromDb.length}</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 leading-tight">Specs</div>
          </div>
        </div>
      </div>

      {/* Generation Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4">
        <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Generation Filters</h3>
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 items-start md:items-end">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1 w-full">
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-[90px] flex-1 sm:flex-none">
              <label className="text-[10px] sm:text-xs text-gray-600 font-medium">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="Expedited">Expedited</option>
                <option value="Routine">Routine</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-[100px] flex-1 sm:flex-none">
              <label className="text-[10px] sm:text-xs text-gray-600 font-medium">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm bg-white"
              >
                <option value="all">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-[100px] flex-1 sm:flex-none">
              <label className="text-[10px] sm:text-xs text-gray-600 font-medium">Consultant</label>
              <select
                value={selectedConsultant}
                onChange={(e) => setSelectedConsultant(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm bg-white"
              >
                <option value="all">All Consultants</option>
                {consultantNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              <label className="text-[10px] sm:text-xs text-gray-600 font-medium">Count</label>
              <input
                type="number"
                value={countToGenerate}
                onChange={(e) => setCountToGenerate(Math.max(1, Math.min(100, parseInt(e.target.value) || 10)))}
                min="1"
                max="100"
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm bg-white w-16 sm:w-20"
              />
            </div>
          </div>

          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleGenerateProcedures}
              disabled={generating || loading || surgeons.length === 0 || procedures.length === 0}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-md sm:rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none"
            >
              {generating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  <span className="hidden sm:inline">Generating...</span>
                  <span className="sm:hidden">Gen...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Generate {countToGenerate}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Procedures List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3">
          <h2 className="font-bold text-gray-900 text-sm sm:text-base">
            Generated Procedures ({filteredProcedures.length})
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Use filters above to generate new procedures with specific criteria
          </p>
        </div>

        <div className="p-2 sm:p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-cyan-600" />
            </div>
          ) : filteredProcedures.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" />
              <p className="font-semibold mb-1 text-sm sm:text-base">No procedures generated yet</p>
              <p className="text-xs sm:text-sm">Click "Generate" above to create procedures from your surgeon profiles</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredProcedures.map((procedure) => (
                <div
                  key={procedure.id}
                  className="border-2 border-cyan-200 rounded-md sm:rounded-lg p-2 sm:p-4 bg-cyan-50/30 hover:border-cyan-400 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 sm:gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0 text-xs sm:text-sm">
                          {procedure.surgeonInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-lg truncate">
                            {procedure.patientName}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                            {procedure.procedureName} ({procedure.procedureCode})
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium truncate">{procedure.consultantName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{procedure.specialtyName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700">{procedure.estimatedDurationMinutes} mins</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700">Waiting: {procedure.waitingDays} days</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 sm:gap-2 items-end">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-semibold ${getPriorityColor(procedure.priority)}`}>
                        {procedure.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
