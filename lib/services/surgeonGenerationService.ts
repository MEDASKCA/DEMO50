// Surgeon Auto-Generation Service - Phase 1
// Generates surgeon and anaesthetist profiles based on configured specialties

import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Surgeon,
  Anaesthetist,
  SpecialtyCoverage,
  NamePair,
  StagedSurgeon,
  AssistantSurgeon,
  StagedAssistantSurgeon,
  StagedAnaesthetist
} from '@/lib/types/surgeonTypes';

// ============================================================================
// NAME POOLS (Diverse, realistic UK NHS names)
// ============================================================================

const TITLES = ['Mr', 'Ms', 'Miss', 'Dr', 'Prof'] as const;

const FIRST_NAMES = [
  // British
  'James', 'Oliver', 'George', 'Harry', 'Jack', 'Charlie', 'Thomas', 'Oscar', 'William', 'Noah',
  'Emily', 'Olivia', 'Amelia', 'Isla', 'Ava', 'Isabella', 'Lily', 'Sophie', 'Grace', 'Mia',
  // South Asian
  'Mohammed', 'Ahmed', 'Ali', 'Hassan', 'Ibrahim', 'Youssef', 'Omar', 'Kareem', 'Khalid', 'Amir',
  'Fatima', 'Aisha', 'Zara', 'Layla', 'Yasmin', 'Amina', 'Nadia', 'Sara', 'Hana', 'Mariam',
  'Raj', 'Amit', 'Priya', 'Ananya', 'Rohan', 'Arjun', 'Neha', 'Kavya', 'Sanjay', 'Deepak',
  // East Asian
  'Chen', 'Wei', 'Li', 'Zhang', 'Ming', 'Ying', 'Mei', 'Xiao',
  // Other
  'Liam', 'Ethan', 'Lucas', 'Mason', 'Alexander', 'Emma', 'Charlotte', 'Sophia', 'Abigail'
];

const LAST_NAMES = [
  // British
  'Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Roberts',
  'Johnson', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Lewis',
  'Clarke', 'Scott', 'Turner', 'Mitchell', 'Carter', 'Parker', 'Cooper', 'Bailey', 'Richardson', 'Cox',
  // South Asian
  'Khan', 'Ali', 'Ahmed', 'Shah', 'Patel', 'Singh', 'Kumar', 'Sharma', 'Kaur', 'Gupta',
  'Rahman', 'Hassan', 'Hussein', 'Malik', 'Iqbal',
  // East Asian
  'Chen', 'Wang', 'Li', 'Zhang', 'Liu', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou',
  // Irish
  'Murphy', 'Kelly', 'O\'Brien', 'Ryan', 'Walsh', 'O\'Connor', 'McCarthy', 'Doyle', 'Flynn', 'Sullivan',
  // European
  'Kowalski', 'Nowak', 'Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez'
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generates initials from first and last name
 */
function generateInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

/**
 * Generates a unique name that doesn't exist in the used names set
 */
function generateUniqueName(usedNames: Set<string>): NamePair {
  let attempts = 0;
  const maxAttempts = 1000;

  while (attempts < maxAttempts) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const fullName = `${firstName} ${lastName}`;

    if (!usedNames.has(fullName)) {
      usedNames.add(fullName);
      return {
        firstName,
        lastName,
        initials: generateInitials(firstName, lastName)
      };
    }
    attempts++;
  }

  // Fallback: add number suffix if somehow we run out of combinations
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const fullName = `${firstName} ${lastName}-${attempts}`;
  usedNames.add(fullName);

  return {
    firstName,
    lastName: `${lastName}-${attempts}`,
    initials: generateInitials(firstName, lastName)
  };
}

/**
 * Calculates required number of surgeons for a specialty/subspecialty
 * Generates 10 surgeons per specialty/subspecialty for realistic staffing pools
 */
function calculateRequiredSurgeons(
  specialtyName: string,
  subspecialtyName?: string
): number {
  // Generate 10 surgeons per specialty or subspecialty
  // This creates a realistic pool for scheduling and rotation
  return 10;
}

/**
 * Generates random but realistic employment details
 */
function generateEmploymentDetails(): {
  employmentType: 'Full-time' | 'Part-time' | 'Job-share' | 'Locum';
  fte: number;
  maxListsPerWeek: number;
  annualLeaveDays: number;
} {
  // 80% full-time, 15% part-time, 5% job-share
  const rand = Math.random();

  if (rand < 0.80) {
    // Full-time: 3-4 lists per week
    return {
      employmentType: 'Full-time',
      fte: 1.0,
      maxListsPerWeek: Math.random() < 0.5 ? 3 : 4,
      annualLeaveDays: 25 + Math.floor(Math.random() * 6) // 25-30 days
    };
  } else if (rand < 0.95) {
    // Part-time: 2 lists per week
    return {
      employmentType: 'Part-time',
      fte: 0.5,
      maxListsPerWeek: 2,
      annualLeaveDays: 13 + Math.floor(Math.random() * 3) // 13-15 days (pro-rata)
    };
  } else {
    // Job-share: 2 lists per week
    return {
      employmentType: 'Job-share',
      fte: 0.5,
      maxListsPerWeek: 2,
      annualLeaveDays: 13 + Math.floor(Math.random() * 3)
    };
  }
}

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Loads existing surgeons from Firebase and builds a set of used names
 */
export async function getExistingSurgeonNames(): Promise<Set<string>> {
  const usedNames = new Set<string>();

  try {
    const surgeonsSnap = await getDocs(collection(db, 'surgeons'));
    surgeonsSnap.forEach(doc => {
      const data = doc.data() as Surgeon;
      const fullName = `${data.firstName} ${data.lastName}`;
      usedNames.add(fullName);
    });
  } catch (error) {
    console.error('Error loading existing surgeons:', error);
  }

  return usedNames;
}

/**
 * Loads configured specialties from Firebase
 */
export async function getConfiguredSpecialties(): Promise<Array<{
  id: string;
  name: string;
  abbreviation: string;
  subspecialties?: Array<{ name: string; abbreviation: string }>;
}>> {
  const specialties: Array<any> = [];

  try {
    const specialtiesSnap = await getDocs(collection(db, 'specialties'));
    specialtiesSnap.forEach(doc => {
      specialties.push({
        id: doc.id,
        ...doc.data()
      });
    });
  } catch (error) {
    console.error('Error loading specialties:', error);
  }

  return specialties;
}

/**
 * Calculates specialty coverage (existing vs required)
 */
export async function calculateSpecialtyCoverage(): Promise<SpecialtyCoverage[]> {
  const specialties = await getConfiguredSpecialties();
  const surgeonsSnap = await getDocs(collection(db, 'surgeons'));

  const existingSurgeons: Surgeon[] = [];
  surgeonsSnap.forEach(doc => {
    existingSurgeons.push({ id: doc.id, ...doc.data() } as Surgeon);
  });

  const coverage: SpecialtyCoverage[] = [];

  specialties.forEach(specialty => {
    if (specialty.subspecialties && specialty.subspecialties.length > 0) {
      // Has subspecialties
      specialty.subspecialties.forEach(subspe => {
        const existingCount = existingSurgeons.filter(s =>
          s.specialtyId === specialty.id && s.subspecialtyName === subspe.name
        ).length;

        const requiredCount = calculateRequiredSurgeons(specialty.name, subspe.name);

        coverage.push({
          specialtyId: specialty.id,
          specialtyName: specialty.name,
          subspecialtyName: subspe.name,
          existingCount,
          requiredCount,
          gap: requiredCount - existingCount
        });
      });
    } else {
      // No subspecialties
      const existingCount = existingSurgeons.filter(s =>
        s.specialtyId === specialty.id && !s.subspecialtyName
      ).length;

      const requiredCount = calculateRequiredSurgeons(specialty.name);

      coverage.push({
        specialtyId: specialty.id,
        specialtyName: specialty.name,
        subspecialtyName: undefined,
        existingCount,
        requiredCount,
        gap: requiredCount - existingCount
      });
    }
  });

  return coverage;
}

/**
 * Generates missing surgeons based on specialty coverage gaps
 * Returns number of surgeons generated
 */
export async function generateMissingSurgeons(): Promise<number> {
  const coverage = await calculateSpecialtyCoverage();
  const usedNames = await getExistingSurgeonNames();
  let generated = 0;

  for (const item of coverage) {
    if (item.gap > 0) {
      // Need to generate surgeons for this specialty/subspecialty
      for (let i = 0; i < item.gap; i++) {
        const { firstName, lastName, initials } = generateUniqueName(usedNames);
        const title = TITLES[Math.floor(Math.random() * TITLES.length)];
        const employment = generateEmploymentDetails();

        // Assign primary subspecialty and general competencies
        const surgeon: Omit<Surgeon, 'id'> = {
          firstName,
          lastName,
          title,
          initials,
          specialtyId: item.specialtyId,
          specialtyName: item.specialtyName,
          primarySubspecialty: item.subspecialtyName,
          generalCompetencies: item.subspecialtyName
            ? [`General ${item.specialtyName}`] // If they have a subspecialty, they can do general work
            : undefined,
          ...employment,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        try {
          await addDoc(collection(db, 'surgeons'), surgeon);
          generated++;
          console.log(`Generated: ${title} ${firstName} ${lastName} - ${item.specialtyName}${item.subspecialtyName ? ` (${item.subspecialtyName})` : ''}`);
        } catch (error) {
          console.error('Error adding surgeon:', error);
        }
      }
    }
  }

  return generated;
}

/**
 * Generates ALL surgeons (for initial setup)
 * Use this when surgeons collection is empty
 */
export async function generateAllSurgeons(): Promise<number> {
  // Check if surgeons already exist
  const existingSnap = await getDocs(collection(db, 'surgeons'));
  if (existingSnap.size > 0) {
    throw new Error(`Surgeons already exist (${existingSnap.size} found). Use "Generate Missing" instead.`);
  }

  return await generateMissingSurgeons();
}

// ============================================================================
// ANAESTHETIST GENERATION
// ============================================================================

/**
 * Calculates required number of anaesthetists based on theatre capacity
 * Formula: (theatres × sessions per day × operating days) ÷ 5 lists per anaesthetist × 1.2 buffer
 */
export async function calculateRequiredAnaesthetists(): Promise<number> {
  // Default: 10 theatres × 2 sessions × 5 days = 100 sessions/week
  // Each anaesthetist does 5 sessions/week
  // 100 ÷ 5 = 20, plus 20% buffer = 24

  // Could make this dynamic by loading theatre config
  const weeklyCapacity = 100; // sessions per week
  const sessionsPerAnaesthetist = 5;
  const buffer = 1.2;

  return Math.ceil((weeklyCapacity / sessionsPerAnaesthetist) * buffer);
}

/**
 * Generates missing anaesthetists
 */
export async function generateMissingAnaesthetists(): Promise<number> {
  const required = await calculateRequiredAnaesthetists();
  const existingSnap = await getDocs(collection(db, 'anaesthetists'));
  const existing = existingSnap.size;
  const gap = required - existing;

  if (gap <= 0) {
    return 0;
  }

  const usedNames = new Set<string>();
  existingSnap.forEach(doc => {
    const data = doc.data() as Anaesthetist;
    usedNames.add(`${data.firstName} ${data.lastName}`);
  });

  let generated = 0;

  for (let i = 0; i < gap; i++) {
    const { firstName, lastName, initials } = generateUniqueName(usedNames);
    const employment = generateEmploymentDetails();

    const anaesthetist: Omit<Anaesthetist, 'id'> = {
      firstName,
      lastName,
      title: 'Dr',
      initials,
      specialty: 'Anaesthetics',
      ...employment,
      maxListsPerWeek: employment.fte === 1.0 ? 5 : 3, // Full-time = 5, part-time = 3
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'anaesthetists'), anaesthetist);
      generated++;
      console.log(`Generated: Dr ${firstName} ${lastName} - Anaesthetist`);
    } catch (error) {
      console.error('Error adding anaesthetist:', error);
    }
  }

  return generated;
}

/**
 * Generates ALL anaesthetists (for initial setup)
 */
export async function generateAllAnaesthetists(): Promise<number> {
  const existingSnap = await getDocs(collection(db, 'anaesthetists'));
  if (existingSnap.size > 0) {
    throw new Error(`Anaesthetists already exist (${existingSnap.size} found). Use "Generate Missing" instead.`);
  }

  return await generateMissingAnaesthetists();
}
