// Service to fetch procedures from separate procedures Firebase database
// Handles 14,000+ procedures efficiently

import { collection, getDocs, query, where, orderBy, limit, DocumentData } from 'firebase/firestore';
import { proceduresDb } from '../proceduresFirebase';

export interface ProcedureFromDB {
  id: string;
  name: string;
  opcs4: string[];
  commonVariations?: string[];
  specialty: string;
  subspecialty?: string;
  category?: string;
  complexity?: 'minor' | 'major';
  isActive: boolean;
}

/**
 * Get procedures from separate procedures database
 * Optimized for large datasets (14,000+ procedures)
 */
export async function getProcedures(
  specialty?: string,
  subspecialty?: string,
  searchTerm?: string,
  maxResults: number = 500
): Promise<ProcedureFromDB[]> {
  try {
    let q = query(
      collection(proceduresDb, 'procedures'),
      where('isActive', '==', true)
    );

    // Filter by specialty if provided
    if (specialty) {
      q = query(q, where('specialty', '==', specialty.toUpperCase()));
    }

    // Filter by subspecialty if provided
    if (subspecialty) {
      q = query(q, where('subspecialty', '==', subspecialty.toUpperCase()));
    }

    // Limit results to prevent memory issues
    q = query(q, orderBy('name'), limit(maxResults));

    const snapshot = await getDocs(q);
    const procedures: ProcedureFromDB[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      procedures.push({
        id: doc.id,
        name: data.name,
        opcs4: data.opcs4 || [],
        commonVariations: data.commonVariations || [],
        specialty: data.specialty,
        subspecialty: data.subspecialty,
        category: data.category,
        complexity: data.complexity,
        isActive: data.isActive ?? true
      });
    });

    // Client-side search if search term provided
    if (searchTerm && searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      return procedures.filter(proc =>
        proc.name.toLowerCase().includes(searchLower) ||
        proc.opcs4.some(code => code.toLowerCase().includes(searchLower)) ||
        proc.commonVariations?.some(v => v.toLowerCase().includes(searchLower))
      );
    }

    console.log(`✅ Fetched ${procedures.length} procedures from procedures DB`);
    return procedures;
  } catch (error) {
    console.error('❌ Error fetching procedures from procedures DB:', error);
    throw error;
  }
}

/**
 * Get all specialties available in procedures database
 */
export async function getAvailableSpecialties(): Promise<string[]> {
  try {
    const snapshot = await getDocs(collection(proceduresDb, 'specialties'));
    const specialties: string[] = [];

    snapshot.forEach(doc => {
      specialties.push(doc.data().name);
    });

    return specialties.sort();
  } catch (error) {
    console.error('Error fetching specialties:', error);
    return [];
  }
}

/**
 * Get procedure by OPCS code
 */
export async function getProcedureByOPCS(opcsCode: string): Promise<ProcedureFromDB | null> {
  try {
    const q = query(
      collection(proceduresDb, 'procedures'),
      where('opcs4', 'array-contains', opcsCode.toUpperCase()),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      opcs4: data.opcs4 || [],
      commonVariations: data.commonVariations || [],
      specialty: data.specialty,
      subspecialty: data.subspecialty,
      category: data.category,
      complexity: data.complexity,
      isActive: data.isActive ?? true
    };
  } catch (error) {
    console.error('Error fetching procedure by OPCS:', error);
    return null;
  }
}

/**
 * Get procedure count (for admin dashboards)
 */
export async function getProcedureCount(specialty?: string): Promise<number> {
  try {
    let q = query(collection(proceduresDb, 'procedures'));

    if (specialty) {
      q = query(q, where('specialty', '==', specialty.toUpperCase()));
    }

    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting procedure count:', error);
    return 0;
  }
}
