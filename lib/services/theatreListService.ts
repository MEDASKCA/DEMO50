// Firebase Service for Theatre Lists
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  writeBatch,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore';
import { TheatreList, SurgicalCase } from '../theatreListTypes';

// Firestore collections
const THEATRE_LISTS_COLLECTION = 'theatreLists';
const SURGICAL_CASES_COLLECTION = 'surgicalCases';

/**
 * Save a theatre list to Firebase
 */
export async function saveTheatreList(list: TheatreList): Promise<void> {
  try {
    const docRef = doc(db, THEATRE_LISTS_COLLECTION, list.id);
    await setDoc(docRef, {
      ...list,
      createdAt: list.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving theatre list:', error);
    throw error;
  }
}

/**
 * Remove undefined values from an object (Firebase doesn't allow undefined)
 */
function removeUndefinedFields(obj: any): any {
  if (Array.isArray(obj)) {
    // Handle arrays by cleaning each element
    return obj.map(item => removeUndefinedFields(item));
  }

  if (typeof obj !== 'object' || obj === null) {
    // Primitive value, return as-is
    return obj;
  }

  // Handle objects
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively clean nested objects and arrays
        cleaned[key] = removeUndefinedFields(obj[key]);
      } else {
        cleaned[key] = obj[key];
      }
    }
  }
  return cleaned;
}

/**
 * Save multiple theatre lists in batches
 */
export async function batchSaveTheatreLists(lists: TheatreList[]): Promise<void> {
  try {
    const batchSize = 500; // Firestore batch limit
    const batches: TheatreList[][] = [];

    for (let i = 0; i < lists.length; i += batchSize) {
      batches.push(lists.slice(i, i + batchSize));
    }

    console.log(`📦 Saving ${lists.length} lists in ${batches.length} batches...`);

    for (let i = 0; i < batches.length; i++) {
      const batch = writeBatch(db);
      const currentBatch = batches[i];

      for (const list of currentBatch) {
        const docRef = doc(db, THEATRE_LISTS_COLLECTION, list.id);
        const cleanedList = removeUndefinedFields({
          ...list,
          createdAt: list.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        batch.set(docRef, cleanedList);
      }

      await batch.commit();
      console.log(`✅ Batch ${i + 1}/${batches.length} saved (${currentBatch.length} lists)`);
    }

    console.log(`🎉 All ${lists.length} theatre lists saved to Firebase!`);
  } catch (error) {
    console.error('Error batch saving theatre lists:', error);
    throw error;
  }
}

/**
 * Get a theatre list by ID
 */
export async function getTheatreListById(id: string): Promise<TheatreList | null> {
  try {
    const docRef = doc(db, THEATRE_LISTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as TheatreList;
    }
    return null;
  } catch (error) {
    console.error('Error getting theatre list:', error);
    throw error;
  }
}

/**
 * Get theatre lists for a specific date
 */
export async function getTheatreListsByDate(date: string, hospitalId?: string): Promise<TheatreList[]> {
  try {
    let q = query(
      collection(db, THEATRE_LISTS_COLLECTION),
      where('date', '==', date)
    );

    if (hospitalId) {
      q = query(q, where('hospitalId', '==', hospitalId));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as TheatreList);
  } catch (error) {
    console.error('Error getting theatre lists by date:', error);
    throw error;
  }
}

/**
 * Get theatre lists for a date range
 */
export async function getTheatreListsByDateRange(
  startDate: string,
  endDate: string,
  hospitalId?: string,
  theatreId?: string
): Promise<TheatreList[]> {
  try {
    let q = query(
      collection(db, THEATRE_LISTS_COLLECTION),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date')
    );

    if (hospitalId) {
      q = query(q, where('hospitalId', '==', hospitalId));
    }

    if (theatreId) {
      q = query(q, where('theatreId', '==', theatreId));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as TheatreList);
  } catch (error) {
    console.error('Error getting theatre lists by date range:', error);
    throw error;
  }
}

/**
 * Get theatre lists for a specific theatre
 */
export async function getTheatreListsByTheatreId(theatreId: string, limitCount?: number): Promise<TheatreList[]> {
  try {
    let q = query(
      collection(db, THEATRE_LISTS_COLLECTION),
      where('theatreId', '==', theatreId),
      orderBy('date', 'desc')
    );

    if (limitCount) {
      q = query(q, firestoreLimit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as TheatreList);
  } catch (error) {
    console.error('Error getting theatre lists by theatre ID:', error);
    throw error;
  }
}

/**
 * Get theatre lists for a specific specialty
 */
export async function getTheatreListsBySpecialty(
  specialty: string,
  startDate?: string,
  endDate?: string
): Promise<TheatreList[]> {
  try {
    let q = query(
      collection(db, THEATRE_LISTS_COLLECTION),
      where('specialty', '==', specialty)
    );

    if (startDate && endDate) {
      q = query(q, where('date', '>=', startDate), where('date', '<=', endDate));
    }

    q = query(q, orderBy('date'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as TheatreList);
  } catch (error) {
    console.error('Error getting theatre lists by specialty:', error);
    throw error;
  }
}

/**
 * Update a theatre list
 */
export async function updateTheatreList(id: string, updates: Partial<TheatreList>): Promise<void> {
  try {
    const docRef = doc(db, THEATRE_LISTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating theatre list:', error);
    throw error;
  }
}

/**
 * Delete a theatre list
 */
export async function deleteTheatreList(id: string): Promise<void> {
  try {
    const docRef = doc(db, THEATRE_LISTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting theatre list:', error);
    throw error;
  }
}

/**
 * Get all theatre lists (with optional filters)
 */
export async function getAllTheatreLists(filters?: {
  hospitalId?: string;
  unitId?: string;
  specialty?: string;
  status?: string;
}): Promise<TheatreList[]> {
  try {
    let q = query(collection(db, THEATRE_LISTS_COLLECTION));

    if (filters?.hospitalId) {
      q = query(q, where('hospitalId', '==', filters.hospitalId));
    }

    if (filters?.unitId) {
      q = query(q, where('unitId', '==', filters.unitId));
    }

    if (filters?.specialty) {
      q = query(q, where('specialty', '==', filters.specialty));
    }

    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as TheatreList);
  } catch (error) {
    console.error('Error getting all theatre lists:', error);
    throw error;
  }
}

/**
 * Get summary statistics for a date range
 */
export async function getTheatreListStats(startDate: string, endDate: string): Promise<{
  totalLists: number;
  totalCases: number;
  averageCasesPerList: number;
  averageUtilization: number;
  listsBySpecialty: { [specialty: string]: number };
  listsByTheatre: { [theatreId: string]: number };
}> {
  try {
    const lists = await getTheatreListsByDateRange(startDate, endDate);

    const listsBySpecialty: { [specialty: string]: number } = {};
    const listsByTheatre: { [theatreId: string]: number } = {};
    let totalCases = 0;
    let totalUtilization = 0;

    for (const list of lists) {
      listsBySpecialty[list.specialty] = (listsBySpecialty[list.specialty] || 0) + 1;
      listsByTheatre[list.theatreId] = (listsByTheatre[list.theatreId] || 0) + 1;
      totalCases += list.totalCases;
      totalUtilization += list.utilizationPercentage;
    }

    return {
      totalLists: lists.length,
      totalCases,
      averageCasesPerList: lists.length > 0 ? totalCases / lists.length : 0,
      averageUtilization: lists.length > 0 ? totalUtilization / lists.length : 0,
      listsBySpecialty,
      listsByTheatre
    };
  } catch (error) {
    console.error('Error getting theatre list stats:', error);
    throw error;
  }
}
