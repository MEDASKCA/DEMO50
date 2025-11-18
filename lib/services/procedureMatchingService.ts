// Procedure Matching Service
// Fuzzy matching for procedure names and OPCS codes
// Handles variations like "Hip Replacement" = "Hip Arthroplasty" = "THR" = "THA"

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface OPCSProcedure {
  id?: string;
  code: string;                       // e.g., "W371"
  officialName: string;               // Official OPCS name
  commonNames: string[];              // Variations
  keywords: string[];                 // Keywords for matching
  specialty: string;
  subspecialty?: string;
  defaultDuration: number;            // Minutes
  complexity: 'Minor' | 'Intermediate' | 'Major' | 'Complex Major';
  anaestheticType?: 'GA' | 'LA' | 'Spinal' | 'Regional' | 'Sedation';
  laterality?: 'Left' | 'Right' | 'Bilateral' | 'N/A';
  category?: string;                  // e.g., "Joint Replacement", "Endoscopy"
  bodySystem?: string;                // e.g., "Musculoskeletal", "Digestive"
}

export interface ProcedureMatchResult {
  opcsCode: string;
  officialName: string;
  matchScore: number;                 // 0-100
  matchReason: string;
  procedure: OPCSProcedure;
}

/**
 * Extract keywords from procedure name
 */
export function extractKeywords(procedureName: string): string[] {
  // Remove common words
  const stopWords = ['the', 'of', 'and', 'or', 'a', 'an', 'with', 'without', 'for', 'in', 'on', 'at'];

  // Convert to lowercase, split by spaces/hyphens/slashes
  const words = procedureName
    .toLowerCase()
    .replace(/[^\w\s-/]/g, '')
    .split(/[\s\-/]+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));

  return [...new Set(words)]; // Remove duplicates
}

/**
 * Calculate similarity between two strings (Levenshtein distance)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  if (s1 === s2) return 100;

  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return 0;
  if (len2 === 0) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const maxLen = Math.max(len1, len2);
  const distance = matrix[len2][len1];
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.round(similarity);
}

/**
 * Check if string is an OPCS code
 */
export function isOPCSCode(input: string): boolean {
  // OPCS codes are usually: Letter + 2-3 digits + optional decimal
  // e.g., W371, W37.1, O291, T123
  return /^[A-Z]\d{2,3}(\.\d+)?$/i.test(input.trim());
}

/**
 * Find matching OPCS procedures by code or name
 */
export async function findMatchingOPCS(
  procedureName: string,
  specialty?: string
): Promise<ProcedureMatchResult[]> {
  try {
    // Load all OPCS procedures
    const opcsSnap = await getDocs(collection(db, 'opcs4'));
    const allProcedures: OPCSProcedure[] = [];

    opcsSnap.forEach(doc => {
      const data = doc.data();
      allProcedures.push({
        id: doc.id,
        code: data.code || doc.id,
        officialName: data.name || data.officialName || '',
        commonNames: data.commonNames || [],
        keywords: data.keywords || [],
        specialty: data.specialty || '',
        subspecialty: data.subspecialty,
        defaultDuration: data.duration || data.defaultDuration || 60,
        complexity: data.complexity || 'Intermediate',
        anaestheticType: data.anaestheticType,
        laterality: data.laterality,
        category: data.category,
        bodySystem: data.bodySystem
      });
    });

    const results: ProcedureMatchResult[] = [];
    const inputTrimmed = procedureName.trim();

    // 1. Exact OPCS code match
    if (isOPCSCode(inputTrimmed)) {
      const exactMatch = allProcedures.find(p =>
        p.code.toUpperCase() === inputTrimmed.toUpperCase()
      );

      if (exactMatch) {
        results.push({
          opcsCode: exactMatch.code,
          officialName: exactMatch.officialName,
          matchScore: 100,
          matchReason: 'Exact OPCS code match',
          procedure: exactMatch
        });
        return results;
      }
    }

    // 2. Exact official name match (case-insensitive)
    const exactNameMatch = allProcedures.find(p =>
      p.officialName.toLowerCase() === inputTrimmed.toLowerCase()
    );

    if (exactNameMatch) {
      results.push({
        opcsCode: exactNameMatch.code,
        officialName: exactNameMatch.officialName,
        matchScore: 100,
        matchReason: 'Exact name match',
        procedure: exactNameMatch
      });
    }

    // 3. Exact common name match
    for (const proc of allProcedures) {
      const commonNameMatch = proc.commonNames.find(cn =>
        cn.toLowerCase() === inputTrimmed.toLowerCase()
      );

      if (commonNameMatch) {
        results.push({
          opcsCode: proc.code,
          officialName: proc.officialName,
          matchScore: 95,
          matchReason: `Common name match: "${commonNameMatch}"`,
          procedure: proc
        });
      }
    }

    // If we found exact matches, return them
    if (results.length > 0) {
      return results;
    }

    // 4. Keyword matching
    const inputKeywords = extractKeywords(procedureName);

    for (const proc of allProcedures) {
      // Skip if specialty doesn't match (if provided)
      if (specialty && proc.specialty && proc.specialty !== specialty) {
        continue;
      }

      // Calculate keyword overlap
      const matchingKeywords = inputKeywords.filter(kw =>
        proc.keywords.some(pk => pk.toLowerCase().includes(kw) || kw.includes(pk.toLowerCase()))
      );

      if (matchingKeywords.length > 0) {
        const keywordScore = (matchingKeywords.length / inputKeywords.length) * 100;

        // Also check similarity with official name
        const nameSimilarity = calculateSimilarity(procedureName, proc.officialName);

        // Also check similarity with common names
        const commonNameSimilarities = proc.commonNames.map(cn =>
          calculateSimilarity(procedureName, cn)
        );
        const bestCommonNameSimilarity = Math.max(0, ...commonNameSimilarities);

        // Combined score
        const combinedScore = Math.round(
          (keywordScore * 0.5) +
          (nameSimilarity * 0.3) +
          (bestCommonNameSimilarity * 0.2)
        );

        if (combinedScore >= 50) {
          results.push({
            opcsCode: proc.code,
            officialName: proc.officialName,
            matchScore: combinedScore,
            matchReason: `Keyword match (${matchingKeywords.join(', ')})`,
            procedure: proc
          });
        }
      }
    }

    // 5. Fuzzy name matching (if no keyword matches)
    if (results.length === 0) {
      for (const proc of allProcedures) {
        // Skip if specialty doesn't match
        if (specialty && proc.specialty && proc.specialty !== specialty) {
          continue;
        }

        const nameSimilarity = calculateSimilarity(procedureName, proc.officialName);

        // Check common names too
        const commonNameSimilarities = proc.commonNames.map(cn =>
          calculateSimilarity(procedureName, cn)
        );
        const bestCommonNameSimilarity = Math.max(0, ...commonNameSimilarities);
        const bestScore = Math.max(nameSimilarity, bestCommonNameSimilarity);

        if (bestScore >= 70) {
          results.push({
            opcsCode: proc.code,
            officialName: proc.officialName,
            matchScore: bestScore,
            matchReason: bestScore === nameSimilarity
              ? 'Similar to official name'
              : 'Similar to common name',
            procedure: proc
          });
        }
      }
    }

    // Sort by match score (highest first)
    results.sort((a, b) => b.matchScore - a.matchScore);

    return results.slice(0, 10); // Return top 10 matches
  } catch (error) {
    console.error('Error finding matching OPCS:', error);
    return [];
  }
}

/**
 * Get OPCS procedure by exact code
 */
export async function getOPCSByCode(code: string): Promise<OPCSProcedure | null> {
  try {
    const q = query(
      collection(db, 'opcs4'),
      where('code', '==', code.toUpperCase())
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        code: data.code || doc.id,
        officialName: data.name || data.officialName || '',
        commonNames: data.commonNames || [],
        keywords: data.keywords || [],
        specialty: data.specialty || '',
        subspecialty: data.subspecialty,
        defaultDuration: data.duration || data.defaultDuration || 60,
        complexity: data.complexity || 'Intermediate',
        anaestheticType: data.anaestheticType,
        laterality: data.laterality,
        category: data.category,
        bodySystem: data.bodySystem
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting OPCS by code:', error);
    return null;
  }
}

/**
 * Suggest OPCS codes based on specialty and keywords
 */
export async function suggestOPCSCodes(
  specialty: string,
  keywords: string[]
): Promise<ProcedureMatchResult[]> {
  try {
    const opcsSnap = await getDocs(collection(db, 'opcs4'));
    const results: ProcedureMatchResult[] = [];

    opcsSnap.forEach(doc => {
      const data = doc.data();
      const proc: OPCSProcedure = {
        id: doc.id,
        code: data.code || doc.id,
        officialName: data.name || data.officialName || '',
        commonNames: data.commonNames || [],
        keywords: data.keywords || [],
        specialty: data.specialty || '',
        subspecialty: data.subspecialty,
        defaultDuration: data.duration || data.defaultDuration || 60,
        complexity: data.complexity || 'Intermediate',
        anaestheticType: data.anaestheticType,
        laterality: data.laterality,
        category: data.category,
        bodySystem: data.bodySystem
      };

      // Must match specialty
      if (proc.specialty !== specialty) return;

      // Calculate keyword overlap
      const matchingKeywords = keywords.filter(kw =>
        proc.keywords.some(pk => pk.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(pk.toLowerCase()))
      );

      if (matchingKeywords.length > 0) {
        const score = (matchingKeywords.length / keywords.length) * 100;

        results.push({
          opcsCode: proc.code,
          officialName: proc.officialName,
          matchScore: Math.round(score),
          matchReason: `Matches: ${matchingKeywords.join(', ')}`,
          procedure: proc
        });
      }
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    return results.slice(0, 20);
  } catch (error) {
    console.error('Error suggesting OPCS codes:', error);
    return [];
  }
}

/**
 * Normalize procedure name (standardize variations)
 */
export async function normalizeProcedureName(procedureName: string): Promise<{
  standardName: string;
  opcsCode: string | null;
  confidence: number;
}> {
  const matches = await findMatchingOPCS(procedureName);

  if (matches.length > 0 && matches[0].matchScore >= 80) {
    return {
      standardName: matches[0].officialName,
      opcsCode: matches[0].opcsCode,
      confidence: matches[0].matchScore
    };
  }

  return {
    standardName: procedureName,
    opcsCode: null,
    confidence: 0
  };
}
