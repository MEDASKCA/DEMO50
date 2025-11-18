// Procedure Generator Service
// Generates procedures from waiting list + OPCS database + Consultant availability

import { collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  WaitingListPatient,
  GeneratedProcedure,
  ProcedureStatus,
  WaitingListPriority,
  StaffRequirementMapper
} from '@/lib/types/waitingListTypes';
import { Surgeon } from '@/lib/types/surgeonTypes';

/**
 * Fetches all waiting list patients
 */
export async function getWaitingListPatients(): Promise<WaitingListPatient[]> {
  try {
    const waitingListSnap = await getDocs(collection(db, 'waitingList'));
    const patients: WaitingListPatient[] = [];

    waitingListSnap.forEach(doc => {
      patients.push({
        id: doc.id,
        ...doc.data()
      } as WaitingListPatient);
    });

    // Sort by priority and waiting days
    return patients.sort((a, b) => {
      // Priority order: Urgent > Expedited > Routine > Planned
      const priorityOrder = { 'Urgent': 0, 'Expedited': 1, 'Routine': 2, 'Planned': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

      if (priorityDiff !== 0) return priorityDiff;

      // If same priority, longer wait goes first
      return b.waitingDays - a.waitingDays;
    });
  } catch (error) {
    console.error('Error fetching waiting list:', error);
    return [];
  }
}

/**
 * Fetches OPCS procedure details by code
 */
export async function getOPCSProcedure(procedureCode: string) {
  try {
    const opcsQuery = query(
      collection(db, 'opcs4'),
      where('code', '==', procedureCode)
    );

    const opcsSnap = await getDocs(opcsQuery);

    if (!opcsSnap.empty) {
      const doc = opcsSnap.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching OPCS procedure:', error);
    return null;
  }
}

/**
 * Fetches surgeon by ID
 */
export async function getSurgeonById(surgeonId: string): Promise<Surgeon | null> {
  try {
    const surgeonsSnap = await getDocs(collection(db, 'surgeons'));

    for (const docSnap of surgeonsSnap.docs) {
      if (docSnap.id === surgeonId) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Surgeon;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching surgeon:', error);
    return null;
  }
}

/**
 * Fetches preference card for a procedure code
 */
export async function getPreferenceCardForProcedure(procedureCode: string) {
  try {
    const prefsQuery = query(
      collection(db, 'preferenceCards'),
      where('procedureCodes', 'array-contains', procedureCode)
    );

    const prefsSnap = await getDocs(prefsQuery);

    if (!prefsSnap.empty) {
      const doc = prefsSnap.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching preference card:', error);
    return null;
  }
}

/**
 * Fetches staff requirement mapper for specialty/subspecialty
 */
export async function getStaffRequirements(
  specialtyId: string,
  subspecialtyName?: string
): Promise<StaffRequirementMapper | null> {
  try {
    let mapperQuery;

    if (subspecialtyName) {
      // Try to find subspecialty-specific mapping first
      mapperQuery = query(
        collection(db, 'staffRequirementMappers'),
        where('specialtyId', '==', specialtyId),
        where('subspecialtyName', '==', subspecialtyName)
      );
    } else {
      // Specialty-level mapping
      mapperQuery = query(
        collection(db, 'staffRequirementMappers'),
        where('specialtyId', '==', specialtyId)
      );
    }

    const mapperSnap = await getDocs(mapperQuery);

    if (!mapperSnap.empty) {
      const doc = mapperSnap.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as StaffRequirementMapper;
    }

    // Fallback to default (1 Anaes, 2 Scrub, 1 HCA)
    return {
      specialtyId,
      specialtyName: '',
      anaesthetistsRequired: 1,
      scrubNursesRequired: 2,
      hcasRequired: 1,
      odpsRequired: 0
    };
  } catch (error) {
    console.error('Error fetching staff requirements:', error);
    return null;
  }
}

/**
 * Generates procedures from waiting list
 * Links: Patients → Surgeons → OPCS → Preference Cards → Staff Requirements
 */
export async function generateProceduresFromWaitingList(
  options: {
    limitCount?: number;
    priorityFilter?: WaitingListPriority[];
    specialtyFilter?: string[];
    consultantFilter?: string[];
  } = {}
): Promise<{
  success: boolean;
  generatedCount: number;
  procedures: GeneratedProcedure[];
  errors: string[];
}> {
  const errors: string[] = [];
  const generatedProcedures: GeneratedProcedure[] = [];

  try {
    // 1. Fetch waiting list patients
    let patients = await getWaitingListPatients();
    console.log(`📋 Total patients loaded: ${patients.length}`);

    // Apply filters
    if (options.priorityFilter && options.priorityFilter.length > 0) {
      patients = patients.filter(p => options.priorityFilter!.includes(p.priority));
      console.log(`   After priority filter: ${patients.length}`);
    }

    if (options.specialtyFilter && options.specialtyFilter.length > 0) {
      patients = patients.filter(p => options.specialtyFilter!.includes(p.specialtyName));
      console.log(`   After specialty filter: ${patients.length}`);
    }

    if (options.consultantFilter && options.consultantFilter.length > 0) {
      patients = patients.filter(p => options.consultantFilter!.includes(p.consultantName));
      console.log(`   After consultant filter: ${patients.length}`);
    }

    // Only process unscheduled patients
    const beforeUnscheduledFilter = patients.length;
    patients = patients.filter(p => !p.isScheduled && p.status === 'waiting');
    console.log(`   After unscheduled filter: ${patients.length} (filtered out ${beforeUnscheduledFilter - patients.length})`);

    // Limit count if specified
    if (options.limitCount) {
      patients = patients.slice(0, options.limitCount);
    }

    console.log(`📋 Processing ${patients.length} patients from waiting list...`);

    // 2. Generate procedures for each patient
    for (const patient of patients) {
      try {
        // Fetch surgeon details
        const surgeon = await getSurgeonById(patient.consultantId);
        if (!surgeon) {
          errors.push(`Surgeon not found for patient ${patient.hospitalNumber}`);
          continue;
        }

        // Fetch OPCS procedure details
        const opcsProcedure = await getOPCSProcedure(patient.procedureCode);

        // Estimate duration (use OPCS data or default)
        const estimatedDuration = opcsProcedure?.averageDuration || 60;

        // Fetch preference card
        const prefCard = await getPreferenceCardForProcedure(patient.procedureCode);

        // Fetch staff requirements
        const staffReqs = await getStaffRequirements(
          patient.specialtyId,
          patient.subspecialtyName
        );

        // Calculate target/proposed date (add 2 weeks from now as default)
        const targetDate = patient.targetDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Create generated procedure
        const procedure: GeneratedProcedure = {
          // Patient
          patientId: patient.id!,
          hospitalNumber: patient.hospitalNumber,
          patientName: `${patient.firstName} ${patient.lastName}`,

          // Surgeon
          surgeonId: surgeon.id!,
          surgeonName: `${surgeon.title} ${surgeon.firstName} ${surgeon.lastName}`,
          surgeonInitials: surgeon.initials,
          specialtyId: patient.specialtyId,
          specialtyName: patient.specialtyName,
          subspecialtyName: patient.subspecialtyName,

          // Procedure
          procedureCode: patient.procedureCode,
          procedureName: patient.procedureName,
          procedureCategory: opcsProcedure?.category,
          estimatedDurationMinutes: estimatedDuration,

          // Preference Card
          preferenceCardId: prefCard?.id,
          requiredEquipment: prefCard?.equipment || [],
          requiredInstruments: prefCard?.instruments || [],
          requiredImplants: prefCard?.implants || [],

          // Priority & Dates
          priority: patient.priority,
          targetDate: targetDate,
          proposedDate: targetDate,

          // Staff Requirements
          requiredAnaesthetists: staffReqs?.anaesthetistsRequired || 1,
          requiredScrubNurses: staffReqs?.scrubNursesRequired || 2,
          requiredHCAs: staffReqs?.hcasRequired || 1,
          requiredODPs: staffReqs?.odpsRequired || 0,
          customStaffRequirements: staffReqs?.customRoles,

          // Status
          status: 'waiting',
          notes: patient.notes,

          // Timestamps
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save to Firebase
        const docRef = await addDoc(collection(db, 'generatedProcedures'), procedure);
        procedure.id = docRef.id;

        generatedProcedures.push(procedure);

        // Update waiting list patient status
        if (patient.id) {
          await updateDoc(doc(db, 'waitingList', patient.id), {
            isScheduled: false, // Not yet scheduled to a session
            status: 'waiting',
            updatedAt: new Date().toISOString()
          });
        }

        console.log(`✅ Generated procedure for ${patient.hospitalNumber}`);
      } catch (error) {
        console.error(`Error processing patient ${patient.hospitalNumber}:`, error);
        errors.push(`Failed to process patient ${patient.hospitalNumber}: ${error}`);
      }
    }

    return {
      success: errors.length === 0,
      generatedCount: generatedProcedures.length,
      procedures: generatedProcedures,
      errors
    };
  } catch (error) {
    console.error('Error generating procedures:', error);
    return {
      success: false,
      generatedCount: 0,
      procedures: [],
      errors: [`Fatal error: ${error}`]
    };
  }
}

/**
 * Updates a generated procedure (after scheduling to a session)
 */
export async function updateGeneratedProcedure(
  procedureId: string,
  updates: Partial<GeneratedProcedure>
) {
  try {
    await updateDoc(doc(db, 'generatedProcedures', procedureId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating procedure:', error);
    return { success: false, error };
  }
}

/**
 * Fetches all generated procedures
 */
export async function getGeneratedProcedures(filters?: {
  status?: ProcedureStatus;
  specialtyId?: string;
  surgeonId?: string;
}): Promise<GeneratedProcedure[]> {
  try {
    let proceduresQuery = collection(db, 'generatedProcedures');

    const proceduresSnap = await getDocs(proceduresQuery);
    let procedures: GeneratedProcedure[] = [];

    proceduresSnap.forEach(doc => {
      procedures.push({
        id: doc.id,
        ...doc.data()
      } as GeneratedProcedure);
    });

    // Apply filters
    if (filters?.status) {
      procedures = procedures.filter(p => p.status === filters.status);
    }
    if (filters?.specialtyId) {
      procedures = procedures.filter(p => p.specialtyId === filters.specialtyId);
    }
    if (filters?.surgeonId) {
      procedures = procedures.filter(p => p.surgeonId === filters.surgeonId);
    }

    // Sort by priority and target date
    return procedures.sort((a, b) => {
      const priorityOrder = { 'Urgent': 0, 'Expedited': 1, 'Routine': 2, 'Planned': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

      if (priorityDiff !== 0) return priorityDiff;

      // Sort by target date
      return new Date(a.targetDate || '9999-12-31').getTime() - new Date(b.targetDate || '9999-12-31').getTime();
    });
  } catch (error) {
    console.error('Error fetching generated procedures:', error);
    return [];
  }
}
