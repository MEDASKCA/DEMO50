// =============================================================================
// SCHEDULE POOL SERVICE
// Fetches year-long schedule pool from Procedures Firebase
// =============================================================================

import { collection, query, where, orderBy, limit, getDocs, QueryConstraint } from 'firebase/firestore';
import { proceduresDb } from '../proceduresFirebase';

// Individual procedure in the pool (new structure)
export interface ProcedurePoolItem {
  id: string;
  name: string;
  opcs4: string[];
  specialty: string;
  subspecialty?: string;
  pcsScore: number;
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  surgeon: string;
  surgeonInitials: string;
  createdAt: string;
  year: number;
  isActive: boolean;
  uploadedAt?: string;
}

// Legacy interface (for backward compatibility if needed)
export interface TheatreListTemplate {
  id: string;
  specialty: string;
  subspecialty?: string;
  sessionType: string;
  procedures: ProcedureWithPriority[];
  totalPCS: number;
  maxPCS: number;
  surgeon: string;
  anaesthetist: string;
  weekNumber: number;
  dayOfWeek: string;
  date: string;
  sessionStart: string;
  sessionEnd: string;
  createdAt: string;
  year: number;
  isActive: boolean;
}

export interface ProcedureWithPriority {
  name: string;
  opcs4: string[];
  commonVariations?: string[];
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  pcsScore: number;
  replaceable: boolean;
}

export interface SchedulePoolFilters {
  specialty?: string;
  subspecialty?: string;
  surgeon?: string;
  priority?: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  minUtilisation?: number; // Now represents min PCS score
  maxUtilisation?: number; // Now represents max PCS score
  year?: number;
}

/**
 * Fetch schedule pool from Procedures Firebase with optional filters
 */
export async function getSchedulePool(
  filters: SchedulePoolFilters = {},
  maxResults: number = 500
): Promise<ProcedurePoolItem[]> {
  try {
    const queryConstraints: QueryConstraint[] = [
      where('isActive', '==', true)
    ];

    // Apply year filter (default 2025)
    if (filters.year) {
      queryConstraints.push(where('year', '==', filters.year));
    } else {
      queryConstraints.push(where('year', '==', 2025));
    }

    // Apply specialty filter
    if (filters.specialty) {
      queryConstraints.push(where('specialty', '==', filters.specialty));
    }

    // Apply subspecialty filter
    if (filters.subspecialty) {
      queryConstraints.push(where('subspecialty', '==', filters.subspecialty));
    }

    // Apply surgeon filter
    if (filters.surgeon) {
      queryConstraints.push(where('surgeon', '==', filters.surgeon));
    }

    // Apply priority filter
    if (filters.priority) {
      queryConstraints.push(where('priority', '==', filters.priority));
    }

    // Order by specialty, then priority
    queryConstraints.push(orderBy('specialty'));
    queryConstraints.push(orderBy('priority'));

    // Limit results
    queryConstraints.push(limit(maxResults));

    const q = query(collection(proceduresDb, 'schedulePool2025'), ...queryConstraints);
    const snapshot = await getDocs(q);

    let results: ProcedurePoolItem[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as ProcedurePoolItem;
      results.push(data);
    });

    // Apply client-side filters (PCS score filter instead of utilization)
    if (filters.minUtilisation !== undefined || filters.maxUtilisation !== undefined) {
      results = results.filter(procedure => {
        const pcsScore = procedure.pcsScore;

        // Treat min/max utilisation as min/max PCS score
        if (filters.minUtilisation !== undefined && pcsScore < filters.minUtilisation) {
          return false;
        }

        if (filters.maxUtilisation !== undefined && pcsScore > filters.maxUtilisation) {
          return false;
        }

        return true;
      });
    }

    return results;
  } catch (error) {
    console.error('Error fetching schedule pool:', error);
    throw error;
  }
}

/**
 * Get unique specialties from the pool
 */
export async function getPoolSpecialties(): Promise<string[]> {
  try {
    const q = query(
      collection(proceduresDb, 'schedulePool2025'),
      where('isActive', '==', true),
      limit(5000)
    );

    const snapshot = await getDocs(q);
    const specialties = new Set<string>();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.specialty) {
        specialties.add(data.specialty);
      }
    });

    return Array.from(specialties).sort();
  } catch (error) {
    console.error('Error fetching pool specialties:', error);
    return [];
  }
}

/**
 * Get unique surgeons from the pool
 */
export async function getPoolSurgeons(): Promise<string[]> {
  try {
    const q = query(
      collection(proceduresDb, 'schedulePool2025'),
      where('isActive', '==', true),
      limit(5000)
    );

    const snapshot = await getDocs(q);
    const surgeons = new Set<string>();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.surgeon) {
        surgeons.add(data.surgeon);
      }
    });

    return Array.from(surgeons).sort();
  } catch (error) {
    console.error('Error fetching pool surgeons:', error);
    return [];
  }
}

/**
 * Get pool statistics
 */
export async function getPoolStatistics(): Promise<{
  totalLists: number;
  averageUtilisation: number;
  totalProcedures: number;
  specialtyBreakdown: Record<string, number>;
}> {
  try {
    const q = query(
      collection(proceduresDb, 'schedulePool2025'),
      where('isActive', '==', true)
    );

    const snapshot = await getDocs(q);

    let totalPcsScore = 0;
    const specialtyBreakdown: Record<string, number> = {};
    const priorityBreakdown: Record<string, number> = {};

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Each document is now a single procedure
      if (data.pcsScore) {
        totalPcsScore += data.pcsScore;
      }

      if (data.specialty) {
        specialtyBreakdown[data.specialty] = (specialtyBreakdown[data.specialty] || 0) + 1;
      }

      if (data.priority) {
        priorityBreakdown[data.priority] = (priorityBreakdown[data.priority] || 0) + 1;
      }
    });

    // Calculate average PCS score as a proxy for utilization
    const avgPcsScore = snapshot.size > 0 ? totalPcsScore / snapshot.size : 0;

    return {
      totalLists: snapshot.size, // Now represents total procedures
      averageUtilisation: avgPcsScore, // Average PCS score instead of utilization %
      totalProcedures: snapshot.size, // Same as totalLists since each doc is 1 procedure
      specialtyBreakdown
    };
  } catch (error) {
    console.error('Error fetching pool statistics:', error);
    throw error;
  }
}
