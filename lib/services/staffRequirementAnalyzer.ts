// Staff Requirement Analyzer
// Analyzes procedures to determine required staff
// Based on OPCS code, keywords, complexity, specialty patterns

import { OPCSProcedure, getOPCSByCode, extractKeywords } from './procedureMatchingService';
import { COMPLEXITY_STAFF_TEMPLATES } from '@/lib/types/procedureTypes';

export interface StaffRequirements {
  anaesthetists: number;
  anaesthetistGrade?: string;
  scrubNurses: number;
  scrubNurseGrade?: string;
  circulatingNurses?: number;
  odps: number;
  odpGrade?: string;
  hcas: number;
  hcaGrade?: string;
  other?: { role: string; count: number; grade?: string }[];
  rationale?: string;
}

export interface ProcedureAnalysis {
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major';
  estimatedDuration: number;
  staffRequired: StaffRequirements;
  anaestheticType?: 'GA' | 'LA' | 'Spinal' | 'Regional' | 'Sedation';
  analysisRationale: string;
}

/**
 * Analyze procedure and determine complexity
 */
export function analyzeProcedureComplexity(
  opcsCode: string,
  procedureName: string,
  specialty: string,
  opcsProcedure?: OPCSProcedure
): 'Minor' | 'Intermediate' | 'Major' | 'Complex Major' {
  // If OPCS procedure has complexity defined, use it
  if (opcsProcedure?.complexity) {
    return opcsProcedure.complexity;
  }

  const keywords = extractKeywords(procedureName.toLowerCase());

  // Complex Major indicators
  const complexMajorKeywords = [
    'cardiothoracic', 'cardiac', 'neurosurgery', 'spinal fusion',
    'total pancreatectomy', 'whipple', 'oesophagectomy', 'liver resection',
    'free flap', 'revision arthroplasty', 'complex revision'
  ];

  if (complexMajorKeywords.some(kw => keywords.some(k => k.includes(kw) || kw.includes(k)))) {
    return 'Complex Major';
  }

  // Major procedure indicators
  const majorKeywords = [
    'total', 'replacement', 'arthroplasty', 'colectomy', 'gastrectomy',
    'nephrectomy', 'hysterectomy', 'mastectomy', 'thoracotomy',
    'laparotomy', 'craniotomy', 'laminectomy', 'spinal'
  ];

  if (majorKeywords.some(kw => keywords.some(k => k.includes(kw) || kw.includes(k)))) {
    return 'Major';
  }

  // Intermediate procedure indicators
  const intermediateKeywords = [
    'repair', 'reconstruction', 'arthroscopy', 'laparoscopic',
    'endoscopic', 'hernia', 'appendicectomy', 'cholecystectomy',
    'thyroidectomy', 'discectomy'
  ];

  if (intermediateKeywords.some(kw => keywords.some(k => k.includes(kw) || kw.includes(k)))) {
    return 'Intermediate';
  }

  // Minor procedure indicators
  const minorKeywords = [
    'excision', 'biopsy', 'cystoscopy', 'colonoscopy', 'endoscopy',
    'removal', 'drainage', 'skin', 'lipoma', 'cyst', 'wart',
    'injection', 'aspiration'
  ];

  if (minorKeywords.some(kw => keywords.some(k => k.includes(kw) || kw.includes(k)))) {
    return 'Minor';
  }

  // Default based on specialty
  if (['Cardiothoracic Surgery', 'Neurosurgery', 'Vascular Surgery'].includes(specialty)) {
    return 'Major';
  }

  // Default
  return 'Intermediate';
}

/**
 * Estimate procedure duration
 */
export function estimateProcedureDuration(
  opcsCode: string,
  procedureName: string,
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major',
  specialty: string,
  opcsProcedure?: OPCSProcedure
): number {
  // If OPCS procedure has duration defined, use it
  if (opcsProcedure?.defaultDuration && opcsProcedure.defaultDuration > 0) {
    return opcsProcedure.defaultDuration;
  }

  const keywords = extractKeywords(procedureName.toLowerCase());

  // Specific procedure patterns
  const durationPatterns: { pattern: string[]; duration: number }[] = [
    { pattern: ['total', 'hip', 'replacement'], duration: 90 },
    { pattern: ['total', 'knee', 'replacement'], duration: 90 },
    { pattern: ['revision', 'hip'], duration: 180 },
    { pattern: ['revision', 'knee'], duration: 180 },
    { pattern: ['arthroscopy', 'knee'], duration: 45 },
    { pattern: ['arthroscopy', 'shoulder'], duration: 60 },
    { pattern: ['carpal', 'tunnel'], duration: 30 },
    { pattern: ['cataract'], duration: 30 },
    { pattern: ['laparoscopic', 'cholecystectomy'], duration: 60 },
    { pattern: ['appendicectomy'], duration: 60 },
    { pattern: ['hernia', 'repair'], duration: 45 },
    { pattern: ['colonoscopy'], duration: 30 },
    { pattern: ['endoscopy'], duration: 20 },
    { pattern: ['hysterectomy'], duration: 120 },
    { pattern: ['mastectomy'], duration: 120 },
    { pattern: ['colectomy'], duration: 180 },
    { pattern: ['spinal', 'fusion'], duration: 240 },
    { pattern: ['craniotomy'], duration: 240 }
  ];

  for (const { pattern, duration } of durationPatterns) {
    if (pattern.every(p => keywords.some(k => k.includes(p) || p.includes(k)))) {
      return duration;
    }
  }

  // Default by complexity
  const defaultDurations = {
    'Minor': 30,
    'Intermediate': 60,
    'Major': 120,
    'Complex Major': 240
  };

  return defaultDurations[complexity];
}

/**
 * Determine anaesthetic type
 */
export function determineAnaestheticType(
  procedureName: string,
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major',
  specialty: string,
  opcsProcedure?: OPCSProcedure
): 'GA' | 'LA' | 'Spinal' | 'Regional' | 'Sedation' {
  if (opcsProcedure?.anaestheticType) {
    return opcsProcedure.anaestheticType;
  }

  const keywords = extractKeywords(procedureName.toLowerCase());

  // LA indicators
  const laKeywords = ['excision', 'biopsy', 'skin', 'lipoma', 'cyst', 'carpal tunnel'];
  if (complexity === 'Minor' && laKeywords.some(kw => keywords.includes(kw))) {
    return 'LA';
  }

  // Sedation indicators
  const sedationKeywords = ['endoscopy', 'colonoscopy', 'cystoscopy', 'gastroscopy'];
  if (sedationKeywords.some(kw => keywords.includes(kw))) {
    return 'Sedation';
  }

  // Spinal/Regional indicators
  const spinalKeywords = ['hip', 'knee', 'lower limb', 'caesarean'];
  if (spinalKeywords.some(kw => keywords.some(k => k.includes(kw) || kw.includes(k)))) {
    return 'Spinal';
  }

  // Default to GA for intermediate and above
  if (['Intermediate', 'Major', 'Complex Major'].includes(complexity)) {
    return 'GA';
  }

  return 'LA';
}

/**
 * Calculate required staff based on procedure analysis
 */
export function calculateStaffRequirements(
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major',
  specialty: string,
  procedureName: string,
  anaestheticType: 'GA' | 'LA' | 'Spinal' | 'Regional' | 'Sedation'
): StaffRequirements {
  // Start with complexity template
  const baseRequirements = { ...COMPLEXITY_STAFF_TEMPLATES[complexity] };

  const keywords = extractKeywords(procedureName.toLowerCase());
  let rationale = `${complexity} complexity procedure`;

  // Specialty-specific adjustments
  if (specialty === 'Orthopaedics') {
    if (keywords.includes('revision') || keywords.includes('complex')) {
      baseRequirements.scrubNurses = Math.max(baseRequirements.scrubNurses, 2);
      baseRequirements.odps = 1;
      rationale += ', complex orthopaedics requires additional scrub staff';
    }
  }

  if (specialty === 'Cardiothoracic Surgery') {
    baseRequirements.anaesthetists = 2;
    baseRequirements.scrubNurses = 3;
    baseRequirements.odps = 2;
    rationale = 'Cardiothoracic surgery requires enhanced staffing';
  }

  if (specialty === 'Neurosurgery') {
    baseRequirements.scrubNurses = Math.max(baseRequirements.scrubNurses, 2);
    baseRequirements.odps = 1;
    rationale += ', neurosurgery requires specialized staff';
  }

  if (specialty === 'Plastics') {
    if (keywords.includes('free') && keywords.includes('flap')) {
      baseRequirements.anaesthetists = 2;
      baseRequirements.scrubNurses = 3;
      rationale = 'Free flap surgery requires extended staffing';
    }
  }

  // Anaesthetic type adjustments
  if (anaestheticType === 'LA' || anaestheticType === 'Sedation') {
    // LA/Sedation might not need full anaesthetist
    if (complexity === 'Minor') {
      baseRequirements.anaesthetists = 0;
      baseRequirements.anaesthetistGrade = 'N/A';
      rationale += ', LA/Sedation only';
    }
  }

  return {
    ...baseRequirements,
    rationale
  };
}

/**
 * Full procedure analysis - main function
 */
export async function analyzeProcedure(
  procedureName: string,
  opcsCode: string,
  specialty: string
): Promise<ProcedureAnalysis> {
  // Get OPCS procedure details if available
  const opcsProcedure = await getOPCSByCode(opcsCode);

  // Determine complexity
  const complexity = analyzeProcedureComplexity(
    opcsCode,
    procedureName,
    specialty,
    opcsProcedure
  );

  // Estimate duration
  const estimatedDuration = estimateProcedureDuration(
    opcsCode,
    procedureName,
    complexity,
    specialty,
    opcsProcedure
  );

  // Determine anaesthetic type
  const anaestheticType = determineAnaestheticType(
    procedureName,
    complexity,
    specialty,
    opcsProcedure
  );

  // Calculate staff requirements
  const staffRequired = calculateStaffRequirements(
    complexity,
    specialty,
    procedureName,
    anaestheticType
  );

  return {
    complexity,
    estimatedDuration,
    staffRequired,
    anaestheticType,
    analysisRationale: `Procedure analyzed as ${complexity} complexity based on OPCS code ${opcsCode}, specialty ${specialty}, and procedure name analysis. ${staffRequired.rationale || ''}`
  };
}

/**
 * Batch analyze multiple procedures
 */
export async function analyzeProcedures(
  procedures: Array<{
    procedureName: string;
    opcsCode: string;
    specialty: string;
  }>
): Promise<ProcedureAnalysis[]> {
  const analyses: ProcedureAnalysis[] = [];

  for (const proc of procedures) {
    const analysis = await analyzeProcedure(
      proc.procedureName,
      proc.opcsCode,
      proc.specialty
    );
    analyses.push(analysis);
  }

  return analyses;
}
