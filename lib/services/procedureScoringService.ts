// ============================================================================
// PROCEDURE SCORING SERVICE
// Multi-factor scoring system with custom specialty codes
// Factors: Complexity, Duration, Variability, Surgeon Experience Required
// ============================================================================

import { lookupOPCSCode } from './opcsService';

export type ProcedureComplexity = 'minor' | 'major';

export interface ProcedureScore {
  // Custom code (e.g., EMER-1, ORTHO-1.5, CARDIAC-2)
  customCode: string;

  // Four scoring factors (refined scale)
  complexityScore: number; // 1=minor, 1.5=in-between, 2=major
  durationScore: number; // 0.5=<1hr, 1=1hr, 2=2hrs, 3=3hrs, etc.
  variabilityScore: number; // 1=consistent, 2=not consistent
  surgeonLevelScore: number; // 1=consultant on-time, 1.5=consultant slow OR junior quick, 2=junior slow

  // Overall total score (TALLIED, not averaged)
  averageScore: number; // Total (sum) of the 4 factors above (typically 4-10 points)

  // Legacy fields for compatibility
  complexity: ProcedureComplexity;
  baseScore: number; // Same as averageScore
  estimatedDuration: number; // minutes

  // Metadata
  confidence: 'high' | 'medium' | 'low'; // How confident we are in the auto-score
  reasoning: string; // Why this score was assigned
}

// Keywords that indicate MAJOR complexity
const MAJOR_KEYWORDS = [
  'major', 'radical', 'total', 'extensive', 'complex',
  'revision', 'salvage', 'emergency', 'trauma',
  'hemispherectomy', 'lobectomy', 'gastrectomy', 'colectomy',
  'whipple', 'pancreaticoduodenectomy', 'esophagectomy',
  'arthroplasty', 'replacement', 'reconstruction',
  'fusion', 'craniotomy', 'thoracotomy', 'laparotomy',
  'amputation', 'transplant', 'bypass', 'endarterectomy',
  'aortic', 'cardiac', 'vascular', 'aneurysm'
];

// Keywords that indicate MINOR complexity
const MINOR_KEYWORDS = [
  'minor', 'simple', 'superficial', 'limited', 'local',
  'excision', 'biopsy', 'drainage', 'aspiration',
  'injection', 'removal', 'arthroscopy', 'endoscopy',
  'cystoscopy', 'colonoscopy', 'bronchoscopy',
  'suture', 'repair', 'debridement', 'wound'
];

// OPCS Chapter complexity weights
// Chapters with typically more complex procedures
const CHAPTER_COMPLEXITY_WEIGHT: Record<string, number> = {
  'A': 8, // Nervous System - typically complex
  'B': 6, // Endocrine/Eye - moderate-high
  'C': 5, // Eye procedures - moderate
  'D': 4, // Ear - moderate-low
  'E': 5, // Respiratory - moderate
  'F': 5, // Mouth - moderate
  'G': 7, // Upper Digestive - moderate-high
  'H': 6, // Lower Digestive - moderate-high
  'J': 7, // Hepatobiliary - high
  'K': 7, // Heart - high
  'L': 7, // Arteries/Veins - high
  'M': 6, // Urinary - moderate-high
  'N': 5, // Male genital - moderate
  'P': 5, // Lower female genital - moderate
  'Q': 6, // Upper female genital - moderate-high
  'R': 7, // Obstetrics - high
  'S': 5, // Skin - moderate
  'T': 6, // Soft tissue - moderate-high
  'U': 5, // Diagnostic imaging - moderate
  'V': 7, // Bones/Joints spine - high
  'W': 6, // Other bones/joints - moderate-high
  'X': 4, // Misc operations - moderate-low
  'Y': 3, // Site/approach codes - low
  'Z': 3  // Method codes - low
};

// Specialty complexity modifiers
const SPECIALTY_MODIFIERS: Record<string, number> = {
  'Neurosurgery': 1.3,
  'Neurology': 1.3,
  'Cardiac': 1.3,
  'Vascular': 1.2,
  'Hepatobiliary': 1.2,
  'Orthopaedic Spine': 1.2,
  'Orthopaedics': 1.1,
  'General Surgery': 1.0,
  'Gynaecology': 1.0,
  'Urology': 1.0,
  'ENT': 0.9,
  'Plastics': 0.9,
  'Ophthalmology': 0.8,
  'Endoscopy': 0.7
};

/**
 * Analyze text for complexity keywords
 */
function analyzeKeywords(text: string): { majorCount: number; minorCount: number } {
  const lowerText = text.toLowerCase();
  let majorCount = 0;
  let minorCount = 0;

  for (const keyword of MAJOR_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      majorCount++;
    }
  }

  for (const keyword of MINOR_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      minorCount++;
    }
  }

  return { majorCount, minorCount };
}

/**
 * Calculate base score from OPCS code chapter
 */
function getChapterScore(chapter: string): number {
  return CHAPTER_COMPLEXITY_WEIGHT[chapter.toUpperCase()] || 5;
}

/**
 * Get specialty modifier
 */
function getSpecialtyModifier(specialtyName: string): number {
  // Check for exact match
  if (SPECIALTY_MODIFIERS[specialtyName]) {
    return SPECIALTY_MODIFIERS[specialtyName];
  }

  // Check for partial matches
  for (const [specialty, modifier] of Object.entries(SPECIALTY_MODIFIERS)) {
    if (specialtyName.includes(specialty) || specialty.includes(specialtyName)) {
      return modifier;
    }
  }

  return 1.0; // Default modifier
}

/**
 * Determine if procedure involves multiple codes (increases complexity)
 */
function analyzeMultipleCodes(opcsCodes: string[]): number {
  if (opcsCodes.length === 1) return 0;
  if (opcsCodes.length === 2) return 0.5;
  if (opcsCodes.length >= 3) return 1;
  return 0;
}

/**
 * Calculate duration score based on estimated hours
 * Rules:
 * - Less than 1 hour = 0.5
 * - Exactly 1 hour = 1
 * - More than 1 hour = 1 + (1 per additional hour)
 */
function calculateDurationScore(estimatedMinutes: number): number {
  const hours = estimatedMinutes / 60;

  if (hours < 1) {
    return 0.5;
  } else if (hours === 1) {
    return 1;
  } else {
    // More than 1 hour: 1 + (1 per hour)
    // e.g., 2 hours = 2, 3 hours = 3, 2.5 hours = 2.5
    return Math.floor(hours) + (hours % 1 >= 0.5 ? 0.5 : 0);
  }
}

/**
 * Calculate variability score based on procedure characteristics
 * Rules:
 * - Consistent (predictable complexity and duration) = 1
 * - Not consistent (variable) = 2
 */
function calculateVariabilityScore(
  procedureName: string,
  opcsDescriptions: string,
  isEmergency: boolean
): number {
  // Factors that make procedures variable (score = 2)
  const variableFactors = [
    isEmergency,
    procedureName.toLowerCase().includes('trauma'),
    procedureName.toLowerCase().includes('fracture'),
    procedureName.toLowerCase().includes('exploratory'),
    procedureName.toLowerCase().includes('ex-lap'),
    procedureName.toLowerCase().includes('revision'),
    procedureName.toLowerCase().includes('emergency'),
    opcsDescriptions.toLowerCase().includes('fracture'),
  ];

  // If any variable factors are present, score = 2
  if (variableFactors.some(factor => factor)) {
    return 2;
  }

  // Factors that indicate consistency (score = 1)
  const consistentFactors = [
    procedureName.toLowerCase().includes('replacement') && !isEmergency,
    procedureName.toLowerCase().includes('arthroplasty') && !isEmergency,
    procedureName.toLowerCase().includes('elective'),
    procedureName.toLowerCase().includes('planned'),
    procedureName.toLowerCase().includes('scheduled'),
  ];

  // If any consistent factors are present, score = 1
  if (consistentFactors.some(factor => factor)) {
    return 1;
  }

  // Default: slightly variable (score = 1.5, but we only allow 1 or 2, so use 1)
  return 1;
}

/**
 * Calculate surgeon level/speed factor
 * Rules:
 * - Consultant, on time = 1
 * - Consultant but may sometimes take longer = 1.5
 * - Assistant/Junior operating without consultant, usually quicker = 1.5
 * - Slow assistant or junior = 2
 */
function calculateSurgeonLevel(
  complexityScore: number,
  procedureName: string,
  opcsDescriptions: string,
  specialtyName?: string
): number {
  // Complex procedures usually require experienced consultant (on time)
  if (complexityScore === 2) {
    // Major procedures - consultant on time
    return 1;
  }

  // Minor straightforward procedures can be done by juniors quickly
  if (complexityScore === 1) {
    // Check if it's a simple procedure suitable for junior
    const simpleKeywords = [
      'drainage', 'biopsy', 'excision', 'removal',
      'superficial', 'minor', 'simple'
    ];

    const isSimple = simpleKeywords.some(keyword =>
      procedureName.toLowerCase().includes(keyword) ||
      opcsDescriptions.toLowerCase().includes(keyword)
    );

    if (isSimple) {
      // Junior can do it quickly
      return 1.5;
    } else {
      // Consultant but straightforward, on time
      return 1;
    }
  }

  // In-between complexity (1.5) - depends on characteristics
  // Default: consultant but may take longer
  let surgeonScore = 1.5;

  // Complex specialties always need consultant
  if (specialtyName) {
    const complexSpecialties = [
      'Neurosurgery', 'Cardiac', 'Vascular',
      'Hepatobiliary', 'Spinal'
    ];

    const isComplexSpecialty = complexSpecialties.some(spec =>
      specialtyName.includes(spec)
    );

    if (isComplexSpecialty) {
      // Consultant on time for complex specialty
      surgeonScore = 1;
    }
  }

  // Procedures known to be unpredictable in duration
  const unpredictableKeywords = [
    'revision', 'redo', 'complex', 'extensive'
  ];

  const isUnpredictable = unpredictableKeywords.some(keyword =>
    procedureName.toLowerCase().includes(keyword) ||
    opcsDescriptions.toLowerCase().includes(keyword)
  );

  if (isUnpredictable) {
    // Consultant but may take longer
    surgeonScore = 1.5;
  }

  return surgeonScore;
}

/**
 * Generate specialty abbreviation for custom code
 */
function getSpecialtyAbbreviation(specialtyName?: string): string {
  if (!specialtyName) return 'GEN';

  const abbrevMap: Record<string, string> = {
    'Emergency': 'EMER',
    'Orthopaedics': 'ORTHO',
    'Orthopaedic': 'ORTHO',
    'Cardiac': 'CARD',
    'Cardiothoracic': 'CARD',
    'Neurosurgery': 'NEURO',
    'Neurology': 'NEURO',
    'General Surgery': 'GENSURG',
    'Vascular': 'VASC',
    'ENT': 'ENT',
    'Gynaecology': 'GYNAE',
    'Obstetrics': 'OBS',
    'Urology': 'URO',
    'Plastics': 'PLAST',
    'Ophthalmology': 'OPTHAL',
    'Endoscopy': 'ENDO',
    'Hepatobiliary': 'HPB',
    'Colorectal': 'COLO',
    'Upper Gastrointestinal': 'UGI',
    'Oral and Maxillofacial': 'OMFS',
    'Spines': 'SPINE'
  };

  // Check exact matches
  for (const [specialty, abbrev] of Object.entries(abbrevMap)) {
    if (specialtyName.includes(specialty)) {
      return abbrev;
    }
  }

  // Default: first 4 letters uppercase
  return specialtyName.substring(0, 4).toUpperCase().replace(/\s/g, '');
}

/**
 * Main scoring function - automatically scores a procedure using 4 factors
 */
export function scoreProcedure(
  procedureName: string,
  opcsCodes: string[],
  specialtyName?: string,
  subspecialtyName?: string
): ProcedureScore {
  let confidence: 'high' | 'medium' | 'low' = 'medium';
  const reasoningParts: string[] = [];

  // ========================================
  // STEP 1: Calculate Complexity Score (1, 1.5, or 2)
  // Rules:
  // - Minor = 1
  // - In-between = 1.5
  // - Major = 2
  // ========================================
  let complexityScore = 1.5; // Default: in-between

  // Analyze procedure name keywords
  const nameKeywords = analyzeKeywords(procedureName);

  // Analyze OPCS codes and descriptions
  let opcsDescriptions = '';
  let opcsChapterWeight = 0;
  let validCodesCount = 0;

  for (const code of opcsCodes) {
    const opcsData = lookupOPCSCode(code);
    if (opcsData) {
      validCodesCount++;
      opcsDescriptions += ' ' + opcsData.description;
      const chapterScore = getChapterScore(opcsData.chapter);
      opcsChapterWeight += chapterScore;
    }
  }

  // OPCS description keywords
  const opcsKeywords = analyzeKeywords(opcsDescriptions);

  // Determine complexity based on keywords
  const totalMajorKeywords = nameKeywords.majorCount + opcsKeywords.majorCount;
  const totalMinorKeywords = nameKeywords.minorCount + opcsKeywords.minorCount;

  if (totalMajorKeywords > totalMinorKeywords && totalMajorKeywords >= 1) {
    // Strong indication of major procedure
    complexityScore = 2;
    reasoningParts.push(`Major complexity (${totalMajorKeywords} major keywords)`);
    confidence = 'high';
  } else if (totalMinorKeywords > totalMajorKeywords && totalMinorKeywords >= 1) {
    // Strong indication of minor procedure
    complexityScore = 1;
    reasoningParts.push(`Minor complexity (${totalMinorKeywords} minor keywords)`);
    confidence = 'high';
  } else {
    // In-between or unclear - use OPCS chapter weight
    if (validCodesCount > 0) {
      const avgChapterWeight = opcsChapterWeight / validCodesCount;

      if (avgChapterWeight >= 7) {
        complexityScore = 2; // Major
        reasoningParts.push(`Major complexity (high chapter weight: ${avgChapterWeight.toFixed(1)})`);
      } else if (avgChapterWeight <= 4) {
        complexityScore = 1; // Minor
        reasoningParts.push(`Minor complexity (low chapter weight: ${avgChapterWeight.toFixed(1)})`);
      } else {
        complexityScore = 1.5; // In-between
        reasoningParts.push(`In-between complexity (chapter weight: ${avgChapterWeight.toFixed(1)})`);
      }
      confidence = 'high';
    } else {
      // No OPCS data - use default
      complexityScore = 1.5;
      confidence = 'low';
      reasoningParts.push('In-between complexity (no OPCS data)');
    }
  }

  // ========================================
  // STEP 2: Estimate Duration (in minutes)
  // ========================================
  let estimatedDuration = 60; // Default 1 hour

  // Base duration on complexity
  if (complexityScore === 1) {
    estimatedDuration = 45; // Minor: 45 min (< 1 hour)
  } else if (complexityScore === 1.5) {
    estimatedDuration = 90; // In-between: 1.5 hours
  } else if (complexityScore === 2) {
    estimatedDuration = 120; // Major: 2 hours
  }

  // Apply specialty modifier
  if (specialtyName) {
    const specialtyMod = getSpecialtyModifier(specialtyName);
    estimatedDuration = Math.round(estimatedDuration * specialtyMod);
  }

  // Emergency/trauma procedures take longer
  const isEmergency = specialtyName?.includes('Emergency') ||
                      procedureName.toLowerCase().includes('emergency');
  if (isEmergency) {
    estimatedDuration = Math.round(estimatedDuration * 1.2);
  }

  // Multiple codes suggest longer duration
  if (opcsCodes.length > 1) {
    estimatedDuration = Math.round(estimatedDuration * (1 + (opcsCodes.length - 1) * 0.15));
  }

  const durationScore = calculateDurationScore(estimatedDuration);
  reasoningParts.push(`Duration: ${estimatedDuration} min (${durationScore}/5)`);

  // ========================================
  // STEP 3: Calculate Variability Score (1-5)
  // ========================================
  const variabilityScore = calculateVariabilityScore(
    procedureName,
    opcsDescriptions,
    isEmergency
  );
  reasoningParts.push(`Variability: ${variabilityScore}/5`);

  // ========================================
  // STEP 4: Calculate Surgeon Level Required (1-5)
  // ========================================
  const surgeonLevelScore = calculateSurgeonLevel(
    complexityScore,
    procedureName,
    opcsDescriptions,
    specialtyName
  );
  reasoningParts.push(`Surgeon Level: ${surgeonLevelScore}/5`);

  // ========================================
  // STEP 5: Calculate Total Score (TALLY, not average)
  // ========================================
  const totalScore = (
    complexityScore +
    durationScore +
    variabilityScore +
    surgeonLevelScore
  );

  const roundedTotal = Math.round(totalScore * 10) / 10; // Round to 1 decimal

  // ========================================
  // STEP 6: Generate Custom Code
  // ========================================
  const specialtyAbbrev = getSpecialtyAbbreviation(specialtyName);
  const scoreRounded = Math.round(roundedTotal);
  const customCode = `${specialtyAbbrev}-${scoreRounded}`;

  // ========================================
  // STEP 7: Determine complexity label
  // ========================================
  const complexity: ProcedureComplexity = complexityScore >= 1.5 ? 'major' : 'minor';

  return {
    customCode,
    complexityScore,
    durationScore,
    variabilityScore,
    surgeonLevelScore,
    averageScore: roundedTotal, // Now returns total (tallied) score, not average
    complexity,
    baseScore: roundedTotal, // Now returns total (tallied) score, not average
    estimatedDuration,
    confidence,
    reasoning: reasoningParts.join('; ')
  };
}

/**
 * Batch score multiple procedures
 */
export function batchScoreProcedures(
  procedures: Array<{
    name: string;
    opcs4: string[];
    specialtyName?: string;
    subspecialtyName?: string;
  }>
): Array<{
  name: string;
  score: ProcedureScore;
}> {
  return procedures.map(proc => ({
    name: proc.name,
    score: scoreProcedure(
      proc.name,
      proc.opcs4,
      proc.specialtyName,
      proc.subspecialtyName
    )
  }));
}

/**
 * Get complexity color for UI
 */
export function getComplexityColor(complexity: ProcedureComplexity): string {
  return complexity === 'major' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
}

/**
 * Get score color (gradient from green to red)
 */
export function getScoreColor(score: number): string {
  if (score <= 3) return 'bg-green-100 text-green-800';
  if (score <= 5) return 'bg-blue-100 text-blue-800';
  if (score <= 7) return 'bg-yellow-100 text-yellow-800';
  if (score <= 9) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}
