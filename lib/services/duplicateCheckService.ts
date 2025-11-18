// Duplicate Detection Service for Staged Staff Profiles
// Checks for duplicates across surgeons, assistant-surgeons, and anaesthetists collections

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Surgeon,
  AssistantSurgeon,
  Anaesthetist,
  StagedSurgeon,
  StagedAssistantSurgeon,
  StagedAnaesthetist,
  DuplicateMatch
} from '@/lib/types/surgeonTypes';

// ============================================================================
// SIMILARITY DETECTION (Levenshtein Distance)
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching of names
 */
function levenshteinDistance(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

/**
 * Check if two names are similar (within threshold)
 */
function areNamesSimilar(name1: string, name2: string, threshold: number = 3): boolean {
  const distance = levenshteinDistance(name1, name2);
  return distance <= threshold;
}

// ============================================================================
// DATABASE LOADING
// ============================================================================

/**
 * Load all existing staff from all three collections
 */
async function loadAllExistingStaff(): Promise<{
  surgeons: Surgeon[];
  assistantSurgeons: AssistantSurgeon[];
  anaesthetists: Anaesthetist[];
}> {
  const [surgeonsSnap, assistantsSnap, anaesthetistsSnap] = await Promise.all([
    getDocs(collection(db, 'surgeons')),
    getDocs(collection(db, 'assistant-surgeons')),
    getDocs(collection(db, 'anaesthetists'))
  ]);

  const surgeons: Surgeon[] = [];
  const assistantSurgeons: AssistantSurgeon[] = [];
  const anaesthetists: Anaesthetist[] = [];

  surgeonsSnap.forEach(doc => surgeons.push({ id: doc.id, ...doc.data() } as Surgeon));
  assistantsSnap.forEach(doc => assistantSurgeons.push({ id: doc.id, ...doc.data() } as AssistantSurgeon));
  anaesthetistsSnap.forEach(doc => anaesthetists.push({ id: doc.id, ...doc.data() } as Anaesthetist));

  return { surgeons, assistantSurgeons, anaesthetists };
}

// ============================================================================
// DUPLICATE CHECKING
// ============================================================================

/**
 * Check a staged surgeon for duplicates
 */
export async function checkSurgeon(
  staged: StagedSurgeon,
  otherStaged: StagedSurgeon[]
): Promise<DuplicateMatch[]> {
  const matches: DuplicateMatch[] = [];
  const fullName = `${staged.firstName} ${staged.lastName}`;

  // Load existing data
  const existing = await loadAllExistingStaff();

  // Check against existing surgeons (same collection)
  existing.surgeons.forEach(surgeon => {
    const existingName = `${surgeon.firstName} ${surgeon.lastName}`;

    // Exact name match
    if (existingName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        existingRecord: {
          id: surgeon.id!,
          name: existingName,
          collection: 'surgeons'
        },
        severity: 'error'
      });
    }
    // Similar name match
    else if (areNamesSimilar(existingName, fullName)) {
      matches.push({
        field: 'name',
        matchType: 'similar',
        existingRecord: {
          id: surgeon.id!,
          name: existingName,
          collection: 'surgeons'
        },
        severity: 'warning'
      });
    }
    // Same initials + specialty
    else if (surgeon.initials === staged.initials && surgeon.specialtyName === staged.specialtyName) {
      matches.push({
        field: 'initials',
        matchType: 'exact',
        existingRecord: {
          id: surgeon.id!,
          name: existingName,
          collection: 'surgeons'
        },
        severity: 'warning'
      });
    }
  });

  // Check against assistant surgeons
  existing.assistantSurgeons.forEach(assistant => {
    const existingName = `${assistant.firstName} ${assistant.lastName}`;
    if (existingName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        existingRecord: {
          id: assistant.id!,
          name: existingName,
          collection: 'assistant-surgeons',
          grade: assistant.grade
        },
        severity: 'error'
      });
    }
  });

  // Check against anaesthetists
  existing.anaesthetists.forEach(anaesthetist => {
    const existingName = `${anaesthetist.firstName} ${anaesthetist.lastName}`;
    if (existingName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        existingRecord: {
          id: anaesthetist.id!,
          name: existingName,
          collection: 'anaesthetists',
          grade: anaesthetist.grade
        },
        severity: 'error'
      });
    }
  });

  // Check against other staged records
  otherStaged.forEach(other => {
    if (other.tempId === staged.tempId) return; // Skip self
    const otherName = `${other.firstName} ${other.lastName}`;
    if (otherName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        stagedRecord: {
          tempId: other.tempId,
          name: otherName
        },
        severity: 'error'
      });
    }
  });

  return matches;
}

/**
 * Check a staged assistant surgeon for duplicates
 */
export async function checkAssistantSurgeon(
  staged: StagedAssistantSurgeon,
  otherStaged: StagedAssistantSurgeon[]
): Promise<DuplicateMatch[]> {
  const matches: DuplicateMatch[] = [];
  const fullName = `${staged.firstName} ${staged.lastName}`;
  const existing = await loadAllExistingStaff();

  // Check all collections
  [...existing.surgeons, ...existing.assistantSurgeons, ...existing.anaesthetists].forEach(person => {
    const existingName = `${person.firstName} ${person.lastName}`;
    if (existingName.toLowerCase() === fullName.toLowerCase()) {
      const col = 'grade' in person && person.specialty !== 'Anaesthetics'
        ? 'assistant-surgeons'
        : 'specialty' in person ? 'anaesthetists' : 'surgeons';

      matches.push({
        field: 'name',
        matchType: 'exact',
        existingRecord: {
          id: person.id!,
          name: existingName,
          collection: col as any,
          grade: 'grade' in person ? person.grade : undefined
        },
        severity: 'error'
      });
    }
  });

  // Check against other staged assistant surgeons
  otherStaged.forEach(other => {
    if (other.tempId === staged.tempId) return;
    const otherName = `${other.firstName} ${other.lastName}`;
    if (otherName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        stagedRecord: {
          tempId: other.tempId,
          name: otherName
        },
        severity: 'error'
      });
    }
  });

  return matches;
}

/**
 * Check a staged anaesthetist for duplicates
 */
export async function checkAnaesthetist(
  staged: StagedAnaesthetist,
  otherStaged: StagedAnaesthetist[]
): Promise<DuplicateMatch[]> {
  const matches: DuplicateMatch[] = [];
  const fullName = `${staged.firstName} ${staged.lastName}`;
  const existing = await loadAllExistingStaff();

  // Check all collections
  [...existing.surgeons, ...existing.assistantSurgeons, ...existing.anaesthetists].forEach(person => {
    const existingName = `${person.firstName} ${person.lastName}`;
    if (existingName.toLowerCase() === fullName.toLowerCase()) {
      const col = 'grade' in person && person.specialty !== 'Anaesthetics'
        ? 'assistant-surgeons'
        : 'specialty' in person ? 'anaesthetists' : 'surgeons';

      matches.push({
        field: 'name',
        matchType: 'exact',
        existingRecord: {
          id: person.id!,
          name: existingName,
          collection: col as any,
          grade: 'grade' in person ? person.grade : undefined
        },
        severity: 'error'
      });
    }
  });

  // Check against other staged anaesthetists
  otherStaged.forEach(other => {
    if (other.tempId === staged.tempId) return;
    const otherName = `${other.firstName} ${other.lastName}`;
    if (otherName.toLowerCase() === fullName.toLowerCase()) {
      matches.push({
        field: 'name',
        matchType: 'exact',
        stagedRecord: {
          tempId: other.tempId,
          name: otherName
        },
        severity: 'error'
      });
    }
  });

  return matches;
}

/**
 * Batch check all staged surgeons
 */
export async function checkAllStagedSurgeons(
  staged: StagedSurgeon[]
): Promise<StagedSurgeon[]> {
  const results: StagedSurgeon[] = [];

  for (const surgeon of staged) {
    const matches = await checkSurgeon(surgeon, staged);
    results.push({
      ...surgeon,
      duplicateStatus: matches.length > 0 ? 'duplicates-found' : 'clean',
      duplicateMatches: matches.length > 0 ? matches : undefined
    });
  }

  return results;
}

/**
 * Batch check all staged assistant surgeons
 */
export async function checkAllStagedAssistantSurgeons(
  staged: StagedAssistantSurgeon[]
): Promise<StagedAssistantSurgeon[]> {
  const results: StagedAssistantSurgeon[] = [];

  for (const assistant of staged) {
    const matches = await checkAssistantSurgeon(assistant, staged);
    results.push({
      ...assistant,
      duplicateStatus: matches.length > 0 ? 'duplicates-found' : 'clean',
      duplicateMatches: matches.length > 0 ? matches : undefined
    });
  }

  return results;
}

/**
 * Batch check all staged anaesthetists
 */
export async function checkAllStagedAnaesthetists(
  staged: StagedAnaesthetist[]
): Promise<StagedAnaesthetist[]> {
  const results: StagedAnaesthetist[] = [];

  for (const anaesthetist of staged) {
    const matches = await checkAnaesthetist(anaesthetist, staged);
    results.push({
      ...anaesthetist,
      duplicateStatus: matches.length > 0 ? 'duplicates-found' : 'clean',
      duplicateMatches: matches.length > 0 ? matches : undefined
    });
  }

  return results;
}
