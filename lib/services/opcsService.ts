// ============================================================================
// OPCS-4.10 SERVICE
// Provides lookup, search, and validation for OPCS codes
// ============================================================================

import opcsLookup from '@/data/opcs410-lookup.json';

interface OPCSCode {
  code: string;
  description: string;
  chapter: string;
  category: string;
  isMainCode: boolean;
  searchTerms?: string[];
}

interface OPCSLookupDatabase {
  version: string;
  generatedDate: string;
  totalCodes: number;
  codeIndex: Record<string, OPCSCode>;
}

// Type assertion for the imported JSON
const opcsDatabase = opcsLookup as OPCSLookupDatabase;

/**
 * Normalize OPCS code (remove dots, uppercase, trim)
 */
function normalizeCode(code: string): string {
  return code.replace(/\./g, '').toUpperCase().trim();
}

/**
 * Look up an OPCS code and return its details
 * @param code - OPCS code (with or without dots, e.g., "H011" or "H01.1")
 * @returns OPCSCode if found, null otherwise
 */
export function lookupOPCSCode(code: string): OPCSCode | null {
  const normalized = normalizeCode(code);
  return opcsDatabase.codeIndex[normalized] || null;
}

/**
 * Validate if an OPCS code exists
 * @param code - OPCS code to validate
 * @returns true if code exists in OPCS-4.10, false otherwise
 */
export function isValidOPCSCode(code: string): boolean {
  return lookupOPCSCode(code) !== null;
}

/**
 * Get description for an OPCS code
 * @param code - OPCS code
 * @returns Description if found, null otherwise
 */
export function getOPCSDescription(code: string): string | null {
  const opcsCode = lookupOPCSCode(code);
  return opcsCode ? opcsCode.description : null;
}

/**
 * Search OPCS codes by keyword
 * @param searchTerm - Search term (procedure name, code, keyword)
 * @param limit - Maximum number of results (default 50)
 * @returns Array of matching OPCS codes
 */
export function searchOPCSCodes(searchTerm: string, limit: number = 50): OPCSCode[] {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const search = searchTerm.toLowerCase().trim();
  const results: OPCSCode[] = [];

  // First, try exact code match
  const exactMatch = lookupOPCSCode(search);
  if (exactMatch) {
    results.push(exactMatch);
  }

  // Then search descriptions
  for (const [code, opcsCode] of Object.entries(opcsDatabase.codeIndex)) {
    if (results.length >= limit) break;

    // Skip if already added as exact match
    if (exactMatch && normalizeCode(code) === normalizeCode(exactMatch.code)) {
      continue;
    }

    // Search in description
    if (opcsCode.description.toLowerCase().includes(search)) {
      results.push(opcsCode);
    }
  }

  return results;
}

/**
 * Find similar OPCS codes (same category/chapter)
 * @param code - OPCS code
 * @param limit - Maximum number of results (default 10)
 * @returns Array of similar OPCS codes
 */
export function findSimilarCodes(code: string, limit: number = 10): OPCSCode[] {
  const opcsCode = lookupOPCSCode(code);
  if (!opcsCode) return [];

  const results: OPCSCode[] = [];
  const targetCategory = opcsCode.category;

  for (const [_, similarCode] of Object.entries(opcsDatabase.codeIndex)) {
    if (results.length >= limit) break;

    // Same category but different code
    if (
      similarCode.category === targetCategory &&
      normalizeCode(similarCode.code) !== normalizeCode(code)
    ) {
      results.push(similarCode);
    }
  }

  return results;
}

/**
 * Get all codes in a chapter (e.g., all Chapter A codes)
 * @param chapter - Chapter letter (A-Z)
 * @param mainCodesOnly - Return only main category codes (default false)
 * @returns Array of OPCS codes in the chapter
 */
export function getCodesByChapter(
  chapter: string,
  mainCodesOnly: boolean = false
): OPCSCode[] {
  const chapterUpper = chapter.toUpperCase();
  const results: OPCSCode[] = [];

  for (const opcsCode of Object.values(opcsDatabase.codeIndex)) {
    if (opcsCode.chapter === chapterUpper) {
      if (!mainCodesOnly || opcsCode.isMainCode) {
        results.push(opcsCode);
      }
    }
  }

  return results;
}

/**
 * Get autocomplete suggestions for OPCS codes
 * Useful for admin UI when adding procedures
 * @param partial - Partial code or description
 * @param limit - Maximum suggestions (default 10)
 * @returns Array of autocomplete suggestions
 */
export function getAutocompleteSuggestions(
  partial: string,
  limit: number = 10
): Array<{ code: string; description: string; label: string }> {
  if (!partial || partial.length < 2) {
    return [];
  }

  const results = searchOPCSCodes(partial, limit);

  return results.map(opcsCode => ({
    code: opcsCode.code,
    description: opcsCode.description,
    label: `${opcsCode.code} - ${opcsCode.description}`
  }));
}

/**
 * Validate multiple OPCS codes
 * @param codes - Array of OPCS codes
 * @returns Object with validation results
 */
export function validateOPCSCodes(codes: string[]): {
  valid: string[];
  invalid: string[];
  details: Array<{ code: string; isValid: boolean; description?: string }>;
} {
  const valid: string[] = [];
  const invalid: string[] = [];
  const details: Array<{ code: string; isValid: boolean; description?: string }> = [];

  for (const code of codes) {
    const opcsCode = lookupOPCSCode(code);
    if (opcsCode) {
      valid.push(code);
      details.push({
        code,
        isValid: true,
        description: opcsCode.description
      });
    } else {
      invalid.push(code);
      details.push({
        code,
        isValid: false
      });
    }
  }

  return { valid, invalid, details };
}

/**
 * Get OPCS database metadata
 */
export function getOPCSDatabaseInfo() {
  return {
    version: opcsDatabase.version,
    generatedDate: opcsDatabase.generatedDate,
    totalCodes: opcsDatabase.totalCodes
  };
}
