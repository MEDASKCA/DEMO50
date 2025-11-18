// Intelligent Theatre List Generator
// Generates realistic surgical lists based on PCS scoring, specialty, and capacity

import { Procedure } from '../surgicalCompetencyData';
import { scoreProcedure, ProcedureScore } from './procedureScoringService';
import { calculateProcedureCost, calculateCostSummary } from './costCalculationService';
import {
  SurgicalCase,
  TheatreList,
  AnaestheticType,
  SessionType,
  SESSION_CONFIGS,
  ANAESTHETIC_TIMES,
  getTurnoverTime,
  getAnaestheticTime,
  calculateTotalCaseTime
} from '../theatreListTypes';

// Anaesthetic type assignment based on procedure characteristics
export function determineAnaestheticType(
  procedureName: string,
  complexityScore: number,
  specialty: string
): AnaestheticType {
  const nameLower = procedureName.toLowerCase();

  // Local anaesthetic procedures
  if (
    nameLower.includes('carpal tunnel') ||
    nameLower.includes('trigger finger') ||
    nameLower.includes('ganglion') ||
    nameLower.includes('lipoma') ||
    nameLower.includes('skin lesion') ||
    nameLower.includes('biopsy')
  ) {
    return 'Local';
  }

  // Sedation procedures
  if (
    nameLower.includes('endoscopy') ||
    nameLower.includes('colonoscopy') ||
    nameLower.includes('gastroscopy') ||
    nameLower.includes('cystoscopy') ||
    nameLower.includes('diagnostic')
  ) {
    return 'Sedation';
  }

  // Spinal/Regional for lower limb orthopaedics
  if (specialty === 'Orthopaedics' && (
    nameLower.includes('knee') ||
    nameLower.includes('ankle') ||
    nameLower.includes('hip replacement') ||
    nameLower.includes('lower limb')
  )) {
    // 70% spinal, 30% GA
    return Math.random() < 0.7 ? 'Spinal' : 'GA';
  }

  // Regional for upper limb
  if (
    nameLower.includes('shoulder') ||
    nameLower.includes('elbow') ||
    nameLower.includes('hand') ||
    nameLower.includes('wrist')
  ) {
    return Math.random() < 0.4 ? 'Regional' : 'GA';
  }

  // Major procedures - GA
  if (complexityScore >= 1.8 || specialty === 'Neurosurgery' || specialty === 'Cardiac') {
    return 'GA';
  }

  // Default to GA with some combined for major cases
  if (complexityScore >= 1.5 && Math.random() < 0.15) {
    return 'Combined';
  }

  return 'GA';
}

// Convert PCS duration score to actual minutes
export function convertDurationScoreToMinutes(durationScore: number): number {
  // Duration score: 0.5 = <60min, 1 = 60min, 2 = 120min, etc.
  if (durationScore === 0.5) return 45; // Average for <1hr
  return Math.round(durationScore * 60);
}

// Create a surgical case from a procedure
export function createSurgicalCase(
  procedure: Procedure,
  specialty: string,
  subspecialty: string | undefined,
  surgeonName: string,
  surgeonInitials: string,
  anaesthetistName: string,
  anaesthetistInitials: string,
  caseOrder: number
): SurgicalCase {
  // Score the procedure
  const score: ProcedureScore = scoreProcedure(
    procedure.name,
    procedure.opcs4,
    specialty,
    subspecialty
  );

  // Determine anaesthetic type
  const anaestheticType = determineAnaestheticType(
    procedure.name,
    score.complexityScore,
    specialty
  );

  // Calculate times
  const surgicalTime = convertDurationScoreToMinutes(score.durationScore);
  const anaestheticTime = getAnaestheticTime(anaestheticType);
  const turnoverTime = getTurnoverTime(score.complexityScore);
  const totalTime = surgicalTime + anaestheticTime + turnoverTime;

  // Calculate cost based on PCS score
  const estimatedCost = calculateProcedureCost(score.averageScore, specialty);

  return {
    id: `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    procedureName: procedure.name,
    opcs4Codes: procedure.opcs4,
    specialty,
    subspecialty,
    pcsScore: score.averageScore,
    complexityScore: score.complexityScore,
    durationScore: score.durationScore,
    variabilityScore: score.variabilityScore,
    surgeonLevelScore: score.surgeonLevelScore,
    estimatedSurgicalTime: surgicalTime,
    anaestheticType,
    anaestheticTime,
    turnoverTime,
    totalCaseTime: totalTime,
    estimatedCost,
    surgeonInitials,
    surgeonFullName: surgeonName,
    anaesthetistInitials,
    anaesthetistFullName: anaesthetistName,
    caseOrder,
    notes: `${score.complexity} complexity - ${score.confidence} confidence - Est. £${estimatedCost.toLocaleString()}`
  };
}

// Procedure templates for common specialty mixes
export const SPECIALTY_CASE_MIX_PATTERNS = {
  'Orthopaedics': [
    {
      name: 'Mixed Arthroscopy',
      pattern: ['Knee Arthroscopy', 'Shoulder Arthroscopy', 'Knee Arthroscopy'],
      targetTime: 240
    },
    {
      name: 'Joint Replacement',
      pattern: ['Total Hip Replacement', 'Total Knee Replacement'],
      targetTime: 300
    },
    {
      name: 'Trauma Mix',
      pattern: ['DHS', 'ORIF Ankle', 'K-Wire Fixation'],
      targetTime: 300
    }
  ],
  'General Surgery': [
    {
      name: 'Hernia Day',
      pattern: ['Inguinal Hernia', 'Inguinal Hernia', 'Umbilical Hernia', 'Incisional Hernia'],
      targetTime: 300
    },
    {
      name: 'Colorectal',
      pattern: ['Right Hemicolectomy', 'Anterior Resection'],
      targetTime: 360
    },
    {
      name: 'Upper GI',
      pattern: ['Laparoscopic Cholecystectomy', 'Laparoscopic Cholecystectomy', 'Gastroscopy'],
      targetTime: 240
    }
  ],
  'Urology': [
    {
      name: 'Endoscopy Day',
      pattern: ['TURP', 'Cystoscopy', 'Cystoscopy', 'JJ Stent Insertion'],
      targetTime: 300
    },
    {
      name: 'Stone Surgery',
      pattern: ['PCNL', 'Ureteroscopy', 'ESWL'],
      targetTime: 300
    }
  ],
  'Gynaecology': [
    {
      name: 'Laparoscopy List',
      pattern: ['Diagnostic Laparoscopy', 'Laparoscopic Sterilization', 'Hysteroscopy'],
      targetTime: 240
    },
    {
      name: 'Major Gynae',
      pattern: ['Total Abdominal Hysterectomy', 'Anterior Repair'],
      targetTime: 300
    }
  ],
  'ENT': [
    {
      name: 'Airway List',
      pattern: ['Tonsillectomy', 'Adenoidectomy', 'Tonsillectomy', 'Grommets'],
      targetTime: 240
    },
    {
      name: 'Rhinology',
      pattern: ['Septoplasty', 'FESS', 'Turbinate Reduction'],
      targetTime: 280
    }
  ],
  'Ophthalmology': [
    {
      name: 'Cataract Day',
      pattern: ['Cataract', 'Cataract', 'Cataract', 'Cataract', 'Cataract', 'Cataract'],
      targetTime: 240
    },
    {
      name: 'Mixed Ophth',
      pattern: ['Vitrectomy', 'Trabeculectomy', 'DCR'],
      targetTime: 280
    }
  ],
  'Plastic Surgery': [
    {
      name: 'Skin Cancer',
      pattern: ['Wide Local Excision', 'Skin Graft', 'Flap Reconstruction'],
      targetTime: 300
    },
    {
      name: 'Hand Surgery',
      pattern: ['Carpal Tunnel', 'Dupuytren', 'Trigger Finger', 'Ganglion'],
      targetTime: 200
    }
  ],
  'Vascular': [
    {
      name: 'Vascular Access',
      pattern: ['AV Fistula', 'Tunnelled Line', 'Varicose Veins'],
      targetTime: 240
    },
    {
      name: 'Major Vascular',
      pattern: ['AAA Repair', 'Fem-Pop Bypass'],
      targetTime: 420
    }
  ]
};

// Match procedures to keywords
export function findProcedureByKeyword(
  procedures: Procedure[],
  keyword: string
): Procedure | null {
  const keywordLower = keyword.toLowerCase();

  for (const proc of procedures) {
    if (proc.name.toLowerCase().includes(keywordLower)) {
      return proc;
    }
    if (proc.commonVariations?.some(v => v.toLowerCase().includes(keywordLower))) {
      return proc;
    }
  }

  return null;
}

// Generate realistic case mix for a session
// IMPORTANT: PCS is now TALLIED (sum of 4 factors) - total PCS should not exceed 32 points per list
export function generateCaseMixForSession(
  specialty: string,
  availableProcedures: Procedure[],
  sessionDurationMinutes: number,
  surgeonName: string,
  surgeonInitials: string,
  anaesthetistName: string,
  anaesthetistInitials: string,
  isEmergency: boolean = false,
  subspecialty?: string
): SurgicalCase[] {
  const cases: SurgicalCase[] = [];
  let currentTime = 0;
  let totalPCS = 0; // TALLY PCS instead of average
  const MAX_PCS = 32; // Maximum total PCS points per list (updated for tallied scoring: 4x previous limit)
  let caseOrder = 1;

  // Emergency theatres: mix of urgent cases
  if (isEmergency || specialty === 'Emergency' || specialty === 'Trauma') {
    // Emergency cases are more variable
    const emergencyPatterns = [
      'Appendicectomy',
      'Laparotomy',
      'ORIF',
      'DHS',
      'Hernia Repair',
      'Laparoscopy'
    ];

    while (currentTime < sessionDurationMinutes * 0.85 && cases.length < 8) {
      const keyword = emergencyPatterns[Math.floor(Math.random() * emergencyPatterns.length)];
      const procedure = findProcedureByKeyword(availableProcedures, keyword);

      if (procedure) {
        const surgicalCase = createSurgicalCase(
          procedure,
          specialty,
          undefined,
          surgeonName,
          surgeonInitials,
          anaesthetistName,
          anaesthetistInitials,
          caseOrder++
        );

        if (currentTime + surgicalCase.totalCaseTime <= sessionDurationMinutes * 0.95) {
          cases.push(surgicalCase);
          currentTime += surgicalCase.totalCaseTime;
        } else {
          break;
        }
      }
    }

    return cases;
  }

  // Elective cases: use specialty patterns
  // FILTER procedures to match subspecialty if specified
  let filteredProcedures = availableProcedures;
  if (subspecialty) {
    // Only use procedures that match this subspecialty
    // For now, use all from the specialty (we'll need better filtering later)
    filteredProcedures = availableProcedures;
  }

  const patterns = SPECIALTY_CASE_MIX_PATTERNS[specialty as keyof typeof SPECIALTY_CASE_MIX_PATTERNS];

  if (patterns && patterns.length > 0) {
    // Pick a random pattern
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];

    for (const keyword of pattern.pattern) {
      const procedure = findProcedureByKeyword(filteredProcedures, keyword);

      if (procedure && currentTime < sessionDurationMinutes * 0.85 && totalPCS < MAX_PCS) {
        const surgicalCase = createSurgicalCase(
          procedure,
          specialty,
          subspecialty,
          surgeonName,
          surgeonInitials,
          anaesthetistName,
          anaesthetistInitials,
          caseOrder++
        );

        // Check BOTH time AND total PCS
        if (currentTime + surgicalCase.totalCaseTime <= sessionDurationMinutes * 0.95 &&
            totalPCS + surgicalCase.pcsScore <= MAX_PCS) {
          cases.push(surgicalCase);
          currentTime += surgicalCase.totalCaseTime;
          totalPCS += surgicalCase.pcsScore; // TALLY the PCS
        }
      }
    }
  }

  // If no pattern or need to fill remaining time/PCS, add random procedures
  if (cases.length === 0) {
    const shuffled = [...filteredProcedures].sort(() => Math.random() - 0.5);

    for (const procedure of shuffled) {
      if (currentTime >= sessionDurationMinutes * 0.85 || totalPCS >= MAX_PCS || cases.length >= 8) break;

      const surgicalCase = createSurgicalCase(
        procedure,
        specialty,
        subspecialty,
        surgeonName,
        surgeonInitials,
        anaesthetistName,
        anaesthetistInitials,
        caseOrder++
      );

      // Check BOTH time AND total PCS
      if (currentTime + surgicalCase.totalCaseTime <= sessionDurationMinutes * 0.95 &&
          totalPCS + surgicalCase.pcsScore <= MAX_PCS) {
        cases.push(surgicalCase);
        currentTime += surgicalCase.totalCaseTime;
        totalPCS += surgicalCase.pcsScore; // TALLY the PCS
      }
    }
  }

  return cases;
}

// Generate a theatre list
export function generateTheatreList(
  date: Date,
  theatreId: string,
  theatreName: string,
  unitId: string,
  unitName: string,
  hospitalId: string,
  hospitalName: string,
  specialty: string,
  sessionType: SessionType,
  availableProcedures: Procedure[],
  surgeonName: string,
  surgeonInitials: string,
  anaesthetistName: string,
  anaesthetistInitials: string,
  isEmergency: boolean = false,
  subspecialty?: string
): TheatreList {
  const sessionConfig = SESSION_CONFIGS[sessionType];
  const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });

  const cases = generateCaseMixForSession(
    specialty,
    availableProcedures,
    sessionConfig.duration,
    surgeonName,
    surgeonInitials,
    anaesthetistName,
    anaesthetistInitials,
    isEmergency,
    subspecialty
  );

  const totalTime = cases.reduce((sum, c) => sum + c.totalCaseTime, 0);
  const utilization = (totalTime / sessionConfig.duration) * 100;

  // Calculate financial metrics
  const procedureCosts = cases.map(c => c.estimatedCost || 0);
  const costSummary = calculateCostSummary(
    procedureCosts,
    totalTime,
    sessionConfig.duration
  );

  // Calculate remaining time and check if more can fit
  const timeRemaining = sessionConfig.duration - totalTime;
  const canFitMore = timeRemaining >= 30; // At least 30 minutes

  return {
    id: `list-${theatreId}-${date.toISOString().split('T')[0]}-${sessionType}`,
    date: date.toISOString().split('T')[0],
    dayOfWeek,
    theatreId,
    theatreName,
    unitId,
    unitName,
    hospitalId,
    hospitalName,
    specialty,
    subspecialty,
    sessionType,
    sessionTimes: {
      start: sessionConfig.start,
      end: sessionConfig.end
    },
    sessionDurationMinutes: sessionConfig.duration,
    primarySurgeonInitials: surgeonInitials,
    primarySurgeonName: surgeonName,
    primaryAnaesthetistInitials: anaesthetistInitials,
    primaryAnaesthetistName: anaesthetistName,
    cases,
    totalCases: cases.length,
    totalEstimatedTime: totalTime,
    utilizationPercentage: Math.round(utilization),
    // Financial metrics
    totalEstimatedCost: costSummary.totalRevenue,
    estimatedRevenue: costSummary.totalRevenue,
    potentialRevenueLost: costSummary.potentialRevenueLost,
    // Optimization metadata
    timeRemaining,
    canFitMore,
    recommendedProcedures: [], // Will be populated by auto-scheduler
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: `Generated list for ${specialty} - ${cases.length} cases scheduled - Est. revenue: £${costSummary.totalRevenue.toLocaleString()}`
  };
}
