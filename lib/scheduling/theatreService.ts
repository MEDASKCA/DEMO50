// Firebase service for Theatre Management
import { db } from '@/lib/firebase';
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
  Timestamp
} from 'firebase/firestore';
import { Theatre } from '@/lib/schedulingTypes';

// Hospital configuration type
export interface HospitalConfig {
  id: string;
  name: string;
  numberOfTheatres: number;
  emergencyTheatres: number;
  specialties: string[];
  createdAt: string;
  updatedAt: string;
}

// Unit Coordinator type
export interface UnitCoordinator {
  id: string;
  hospitalId: string;
  unitLocation: string;      // Links to theatreUnits.location
  label: string;              // Display label (dect phone, room #, etc.)
  roleTitle: string;          // "Theatre Coordinator", etc.
  order: number;              // Row position
}

// Special Unit type
export interface SpecialUnit {
  id: string;
  hospitalId: string;
  unitLocation: string;       // Which column to appear in
  label: string;              // "MILE END", "NIGHT", etc.
  type: string;               // "satellite", "night-shift", "recovery"
  staffPositions?: string[];  // Array of staff roles
  order: number;              // Display order (after theatres)
  rowSpan?: number;           // For cells like NIGHT that span multiple rows
}

// Staff Pool Section type
export interface StaffPoolSection {
  id: string;
  hospitalId: string;
  label: string;              // "MANAGEMENT DAY", "FLOATERS", etc.
  order: number;              // Display order
}

// Firestore collections
const HOSPITALS_COLLECTION = 'hospitals';
const THEATRES_COLLECTION = 'theatres';
const THEATRE_UNITS_COLLECTION = 'theatreUnits';
const SESSIONS_COLLECTION = 'sessions';
const CALENDAR_CONFIG_COLLECTION = 'calendarConfigurations';
const UNIT_COORDINATORS_COLLECTION = 'unitCoordinators';
const SPECIAL_UNITS_COLLECTION = 'specialUnits';
const STAFF_POOL_SECTIONS_COLLECTION = 'staffPoolSections';
const SPECIALTIES_COLLECTION = 'specialties';

/**
 * Get or create hospital configuration
 */
export async function getHospitalConfig(): Promise<HospitalConfig | null> {
  try {
    const docRef = doc(db, HOSPITALS_COLLECTION, 'default');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HospitalConfig;
    }
    return null;
  } catch (error) {
    console.error('Error getting hospital config:', error);
    throw error;
  }
}

/**
 * Save hospital configuration
 */
export async function saveHospitalConfig(config: Omit<HospitalConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  try {
    const docRef = doc(db, HOSPITALS_COLLECTION, 'default');
    const existing = await getDoc(docRef);

    const now = new Date().toISOString();

    if (existing.exists()) {
      await updateDoc(docRef, {
        ...config,
        updatedAt: now
      });
    } else {
      await setDoc(docRef, {
        id: 'default',
        ...config,
        createdAt: now,
        updatedAt: now
      });
    }
  } catch (error) {
    console.error('Error saving hospital config:', error);
    throw error;
  }
}

/**
 * Get all theatres
 */
export async function getTheatres(): Promise<Theatre[]> {
  try {
    const querySnapshot = await getDocs(collection(db, THEATRES_COLLECTION));
    return querySnapshot.docs.map(doc => doc.data() as Theatre);
  } catch (error) {
    console.error('Error getting theatres:', error);
    throw error;
  }
}

/**
 * Get theatre by ID
 */
export async function getTheatreById(id: string): Promise<Theatre | null> {
  try {
    const docRef = doc(db, THEATRES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Theatre;
    }
    return null;
  } catch (error) {
    console.error('Error getting theatre:', error);
    throw error;
  }
}

/**
 * Save theatre (create or update)
 */
export async function saveTheatre(theatre: Theatre, hospitalId?: string): Promise<void> {
  try {
    const docRef = doc(db, THEATRES_COLLECTION, theatre.id);
    const data = hospitalId ? { ...theatre, hospitalId } : theatre;
    await setDoc(docRef, data);
  } catch (error) {
    console.error('Error saving theatre:', error);
    throw error;
  }
}

/**
 * Delete theatre
 */
export async function deleteTheatre(id: string): Promise<void> {
  try {
    const docRef = doc(db, THEATRES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting theatre:', error);
    throw error;
  }
}

/**
 * Initialize theatres from static data
 */
export async function initializeTheatresFromStatic(theatres: Theatre[]): Promise<void> {
  try {
    const promises = theatres.map(theatre => saveTheatre(theatre));
    await Promise.all(promises);
  } catch (error) {
    console.error('Error initializing theatres:', error);
    throw error;
  }
}

/**
 * Generate theatre sessions for a date range
 */
export async function generateTheatreSessions(
  startDate: Date,
  endDate: Date,
  theatres: Theatre[]
): Promise<void> {
  try {
    const sessions = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.getDay();

      for (const theatre of theatres) {
        // Emergency theatres operate 24/7
        const isEmergencyTheatre = theatre.name.toLowerCase().includes('emergency');

        // Elective theatres: Monday to Friday
        if (!isEmergencyTheatre && (dayOfWeek === 0 || dayOfWeek === 6)) {
          // Skip weekends for elective theatres
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        // Generate sessions based on theatre opening hours and session duration
        const [startHour, startMin] = theatre.openingHours.start.split(':').map(Number);
        const [endHour, endMin] = theatre.openingHours.end.split(':').map(Number);

        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        const sessionDuration = theatre.sessionDuration;

        let currentSessionStart = startMinutes;

        while (currentSessionStart + sessionDuration <= endMinutes) {
          const sessionStartHour = Math.floor(currentSessionStart / 60);
          const sessionStartMin = currentSessionStart % 60;
          const sessionEndMinutes = currentSessionStart + sessionDuration;
          const sessionEndHour = Math.floor(sessionEndMinutes / 60);
          const sessionEndMin = sessionEndMinutes % 60;

          const sessionId = `${theatre.id}-${dateStr}-${String(sessionStartHour).padStart(2, '0')}${String(sessionStartMin).padStart(2, '0')}`;

          sessions.push({
            id: sessionId,
            theatreId: theatre.id,
            date: dateStr,
            slot: {
              start: `${String(sessionStartHour).padStart(2, '0')}:${String(sessionStartMin).padStart(2, '0')}`,
              end: `${String(sessionEndHour).padStart(2, '0')}:${String(sessionEndMin).padStart(2, '0')}`
            },
            type: isEmergencyTheatre ? 'emergency' : 'elective',
            status: 'available'
          });

          currentSessionStart += sessionDuration;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Save all sessions to Firebase
    const promises = sessions.map(session =>
      setDoc(doc(db, SESSIONS_COLLECTION, session.id), session)
    );

    await Promise.all(promises);
  } catch (error) {
    console.error('Error generating theatre sessions:', error);
    throw error;
  }
}

/**
 * Save calendar configurations
 */
export async function saveCalendarConfigurations(
  configurations: any[]
): Promise<void> {
  try {
    // Group by month-theatre for efficient storage
    const grouped = new Map<string, any[]>();

    configurations.forEach(config => {
      const month = config.date.substring(0, 7); // YYYY-MM
      const key = `${month}-${config.theatreId}`;

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(config);
    });

    // Save each month-theatre configuration
    const promises = Array.from(grouped.entries()).map(([key, configs]) => {
      const docRef = doc(db, CALENDAR_CONFIG_COLLECTION, key);
      return setDoc(docRef, {
        id: key,
        configurations: configs,
        updatedAt: new Date().toISOString()
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error saving calendar configurations:', error);
    throw error;
  }
}

/**
 * Load calendar configurations for a date range
 */
export async function loadCalendarConfigurations(
  startDate: Date,
  endDate: Date,
  theatreIds: string[]
): Promise<any[]> {
  try {
    // Format dates as YYYY-MM-DD
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    // Load ALL calendar configurations (no index required)
    const snapshot = await getDocs(collection(db, CALENDAR_CONFIG_COLLECTION));
    const configurations: any[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      // Filter by date range and theatre IDs in memory
      if (data.date >= startStr && data.date <= endStr) {
        if (theatreIds.length === 0 || theatreIds.includes(data.theatreId)) {
          configurations.push(data);
        }
      }
    });

    return configurations;
  } catch (error) {
    console.error('Error loading calendar configurations:', error);
    throw error;
  }
}

/**
 * Get all theatre units (optionally filtered by hospitalId)
 */
export async function getTheatreUnits(hospitalId?: string): Promise<any[]> {
  try {
    let q;
    if (hospitalId) {
      q = query(collection(db, THEATRE_UNITS_COLLECTION), where('hospitalId', '==', hospitalId));
    } else {
      q = collection(db, THEATRE_UNITS_COLLECTION);
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting theatre units:', error);
    throw error;
  }
}

/**
 * Save theatre unit (create or update)
 */
export async function saveTheatreUnit(unit: any, hospitalId: string): Promise<void> {
  try {
    const docRef = doc(db, THEATRE_UNITS_COLLECTION, unit.id);
    await setDoc(docRef, {
      ...unit,
      hospitalId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving theatre unit:', error);
    throw error;
  }
}

/**
 * Delete theatre unit
 */
export async function deleteTheatreUnit(id: string): Promise<void> {
  try {
    const docRef = doc(db, THEATRE_UNITS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting theatre unit:', error);
    throw error;
  }
}

/**
 * Get unit coordinators for a hospital
 */
export async function getUnitCoordinators(hospitalId?: string): Promise<UnitCoordinator[]> {
  try {
    let q;
    if (hospitalId) {
      q = query(collection(db, UNIT_COORDINATORS_COLLECTION), where('hospitalId', '==', hospitalId));
    } else {
      q = collection(db, UNIT_COORDINATORS_COLLECTION);
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UnitCoordinator).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error getting unit coordinators:', error);
    throw error;
  }
}

/**
 * Save unit coordinator
 */
export async function saveUnitCoordinator(coordinator: UnitCoordinator): Promise<void> {
  try {
    const docRef = doc(db, UNIT_COORDINATORS_COLLECTION, coordinator.id);
    await setDoc(docRef, coordinator);
  } catch (error) {
    console.error('Error saving unit coordinator:', error);
    throw error;
  }
}

/**
 * Delete unit coordinator
 */
export async function deleteUnitCoordinator(id: string): Promise<void> {
  try {
    const docRef = doc(db, UNIT_COORDINATORS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting unit coordinator:', error);
    throw error;
  }
}

/**
 * Get special units for a hospital
 */
export async function getSpecialUnits(hospitalId?: string): Promise<SpecialUnit[]> {
  try {
    let q;
    if (hospitalId) {
      q = query(collection(db, SPECIAL_UNITS_COLLECTION), where('hospitalId', '==', hospitalId));
    } else {
      q = collection(db, SPECIAL_UNITS_COLLECTION);
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as SpecialUnit).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error getting special units:', error);
    throw error;
  }
}

/**
 * Save special unit
 */
export async function saveSpecialUnit(unit: SpecialUnit): Promise<void> {
  try {
    console.log('🔷 saveSpecialUnit called with:', unit);
    console.log('🔷 Collection name:', SPECIAL_UNITS_COLLECTION);
    console.log('🔷 Document ID:', unit.id);

    const docRef = doc(db, SPECIAL_UNITS_COLLECTION, unit.id);
    console.log('🔷 Document reference created');

    await setDoc(docRef, unit);
    console.log('🔷 setDoc completed successfully');
  } catch (error) {
    console.error('❌ Error saving special unit:', error);
    throw error;
  }
}

/**
 * Delete special unit
 */
export async function deleteSpecialUnit(id: string): Promise<void> {
  try {
    const docRef = doc(db, SPECIAL_UNITS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting special unit:', error);
    throw error;
  }
}

/**
 * Get staff pool sections for a hospital
 */
export async function getStaffPoolSections(hospitalId?: string): Promise<StaffPoolSection[]> {
  try {
    let q;
    if (hospitalId) {
      q = query(collection(db, STAFF_POOL_SECTIONS_COLLECTION), where('hospitalId', '==', hospitalId));
    } else {
      q = collection(db, STAFF_POOL_SECTIONS_COLLECTION);
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as StaffPoolSection).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error getting staff pool sections:', error);
    throw error;
  }
}

/**
 * Save staff pool section
 */
export async function saveStaffPoolSection(section: StaffPoolSection): Promise<void> {
  try {
    const docRef = doc(db, STAFF_POOL_SECTIONS_COLLECTION, section.id);
    await setDoc(docRef, section);
  } catch (error) {
    console.error('Error saving staff pool section:', error);
    throw error;
  }
}

/**
 * Delete staff pool section
 */
export async function deleteStaffPoolSection(id: string): Promise<void> {
  try {
    const docRef = doc(db, STAFF_POOL_SECTIONS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting staff pool section:', error);
    throw error;
  }
}

/**
 * Get all specialties with subspecialties
 */
export async function getSpecialties(): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, SPECIALTIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting specialties:', error);
    throw error;
  }
}

/**
 * Initialize default allocation configuration for a hospital
 * This creates the unit coordinators, special units, and staff pool sections
 */
export async function initializeAllocationConfig(hospitalId: string): Promise<void> {
  try {
    // Get theatre units to determine locations
    const units = await getTheatreUnits(hospitalId);
    const uniqueLocations = [...new Set(units.map(u => u.location))];

    // Create unit coordinators for each location
    const coordinators: UnitCoordinator[] = [];
    uniqueLocations.forEach((location, index) => {
      if (location === '4th Floor') {
        coordinators.push({
          id: `coord-${hospitalId}-4th-1`,
          hospitalId,
          unitLocation: location,
          label: '1490',
          roleTitle: 'Theatre Coordinator',
          order: 1
        });
        coordinators.push({
          id: `coord-${hospitalId}-4th-2`,
          hospitalId,
          unitLocation: location,
          label: '1494',
          roleTitle: 'Theatre Coordinator',
          order: 2
        });
      } else if (location === '3rd Floor') {
        coordinators.push({
          id: `coord-${hospitalId}-3rd-1`,
          hospitalId,
          unitLocation: location,
          label: '45871',
          roleTitle: 'Theatre Coordinator',
          order: 1
        });
      }
    });

    // Create special units
    const specialUnitsData: SpecialUnit[] = [
      {
        id: `special-${hospitalId}-mile-end`,
        hospitalId,
        unitLocation: '3rd Floor',
        label: 'MILE END',
        type: 'satellite',
        order: 1000
      },
      {
        id: `special-${hospitalId}-night`,
        hospitalId,
        unitLocation: '3rd Floor',
        label: 'NIGHT',
        type: 'night-shift',
        order: 1001,
        rowSpan: 3
      }
    ];

    // Create staff pool sections
    const poolSections: StaffPoolSection[] = [
      {
        id: `pool-${hospitalId}-mgmt`,
        hospitalId,
        label: 'MANAGEMENT DAY',
        order: 1
      },
      {
        id: `pool-${hospitalId}-floaters`,
        hospitalId,
        label: 'FLOATERS',
        order: 2
      },
      {
        id: `pool-${hospitalId}-unallocated`,
        hospitalId,
        label: 'UNALLOCATED',
        order: 3
      }
    ];

    // Save all to Firebase
    await Promise.all([
      ...coordinators.map(c => saveUnitCoordinator(c)),
      ...specialUnitsData.map(s => saveSpecialUnit(s)),
      ...poolSections.map(p => saveStaffPoolSection(p))
    ]);

    console.log('Allocation configuration initialized successfully');
  } catch (error) {
    console.error('Error initializing allocation config:', error);
    throw error;
  }
}
