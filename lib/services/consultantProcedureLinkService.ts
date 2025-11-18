// Consultant-Procedure Linking Service
// Links surgeons to the OPCS procedures they can perform

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ConsultantProcedureLink } from '@/lib/types/waitingListTypes';
import { Surgeon } from '@/lib/types/surgeonTypes';

/**
 * Gets all consultant-procedure links
 */
export async function getAllConsultantProcedureLinks(): Promise<ConsultantProcedureLink[]> {
  try {
    const linksSnap = await getDocs(collection(db, 'consultantProcedureLinks'));
    const links: ConsultantProcedureLink[] = [];

    linksSnap.forEach(doc => {
      links.push({
        id: doc.id,
        ...doc.data()
      } as ConsultantProcedureLink);
    });

    return links.sort((a, b) => a.surgeonName.localeCompare(b.surgeonName));
  } catch (error) {
    console.error('Error fetching consultant procedure links:', error);
    return [];
  }
}

/**
 * Gets procedures linked to a specific consultant
 */
export async function getConsultantProcedures(surgeonId: string): Promise<ConsultantProcedureLink | null> {
  try {
    const linkQuery = query(
      collection(db, 'consultantProcedureLinks'),
      where('surgeonId', '==', surgeonId)
    );

    const linkSnap = await getDocs(linkQuery);

    if (!linkSnap.empty) {
      const doc = linkSnap.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as ConsultantProcedureLink;
    }

    return null;
  } catch (error) {
    console.error('Error fetching consultant procedures:', error);
    return null;
  }
}

/**
 * Gets consultants who can perform a specific procedure
 */
export async function getConsultantsForProcedure(procedureCode: string): Promise<ConsultantProcedureLink[]> {
  try {
    const linksSnap = await getDocs(collection(db, 'consultantProcedureLinks'));
    const matchingLinks: ConsultantProcedureLink[] = [];

    linksSnap.forEach(doc => {
      const data = doc.data() as ConsultantProcedureLink;
      if (data.procedureCodes && data.procedureCodes.includes(procedureCode)) {
        matchingLinks.push({
          id: doc.id,
          ...data
        });
      }
    });

    return matchingLinks;
  } catch (error) {
    console.error('Error fetching consultants for procedure:', error);
    return [];
  }
}

/**
 * Creates or updates consultant-procedure link
 */
export async function saveConsultantProcedureLink(
  surgeonId: string,
  surgeonName: string,
  specialtyId: string,
  specialtyName: string,
  subspecialtyName: string | undefined,
  procedureCodes: string[],
  competencyLevels?: { [procedureCode: string]: 'Learning' | 'Competent' | 'Expert' | 'Supervisor' }
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Check if link already exists
    const existingLink = await getConsultantProcedures(surgeonId);

    const linkData = {
      surgeonId,
      surgeonName,
      specialtyId,
      specialtyName,
      subspecialtyName,
      procedureCodes,
      competencyLevels,
      updatedAt: new Date().toISOString()
    };

    if (existingLink) {
      // Update existing
      await updateDoc(doc(db, 'consultantProcedureLinks', existingLink.id!), linkData);
      return { success: true, id: existingLink.id };
    } else {
      // Create new
      const docRef = await addDoc(collection(db, 'consultantProcedureLinks'), {
        ...linkData,
        createdAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    }
  } catch (error) {
    console.error('Error saving consultant procedure link:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Adds a procedure to a consultant's list
 */
export async function addProcedureToConsultant(
  surgeonId: string,
  procedureCode: string,
  competencyLevel?: 'Learning' | 'Competent' | 'Expert' | 'Supervisor'
): Promise<{ success: boolean; error?: string }> {
  try {
    const link = await getConsultantProcedures(surgeonId);

    if (!link) {
      return { success: false, error: 'Consultant link not found. Create base link first.' };
    }

    // Check if procedure already exists
    if (link.procedureCodes.includes(procedureCode)) {
      return { success: false, error: 'Procedure already linked to this consultant' };
    }

    // Add procedure
    const updatedCodes = [...link.procedureCodes, procedureCode];
    const updatedCompetencies = { ...link.competencyLevels };

    if (competencyLevel) {
      updatedCompetencies[procedureCode] = competencyLevel;
    }

    await updateDoc(doc(db, 'consultantProcedureLinks', link.id!), {
      procedureCodes: updatedCodes,
      competencyLevels: updatedCompetencies,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding procedure to consultant:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Removes a procedure from a consultant's list
 */
export async function removeProcedureFromConsultant(
  surgeonId: string,
  procedureCode: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const link = await getConsultantProcedures(surgeonId);

    if (!link) {
      return { success: false, error: 'Consultant link not found' };
    }

    // Remove procedure
    const updatedCodes = link.procedureCodes.filter(code => code !== procedureCode);
    const updatedCompetencies = { ...link.competencyLevels };
    delete updatedCompetencies[procedureCode];

    await updateDoc(doc(db, 'consultantProcedureLinks', link.id!), {
      procedureCodes: updatedCodes,
      competencyLevels: updatedCompetencies,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error removing procedure from consultant:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Updates competency level for a procedure
 */
export async function updateProcedureCompetency(
  surgeonId: string,
  procedureCode: string,
  competencyLevel: 'Learning' | 'Competent' | 'Expert' | 'Supervisor'
): Promise<{ success: boolean; error?: string }> {
  try {
    const link = await getConsultantProcedures(surgeonId);

    if (!link) {
      return { success: false, error: 'Consultant link not found' };
    }

    if (!link.procedureCodes.includes(procedureCode)) {
      return { success: false, error: 'Procedure not linked to consultant' };
    }

    const updatedCompetencies = {
      ...link.competencyLevels,
      [procedureCode]: competencyLevel
    };

    await updateDoc(doc(db, 'consultantProcedureLinks', link.id!), {
      competencyLevels: updatedCompetencies,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating procedure competency:', error);
    return { success: false, error: `${error}` };
  }
}

/**
 * Auto-generates consultant-procedure links from surgeon profiles
 * Links surgeons to common procedures in their specialty
 */
export async function generateConsultantLinksFromProfiles(): Promise<{
  success: boolean;
  created: number;
  skipped: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let created = 0;
  let skipped = 0;

  try {
    // Get all surgeons
    const surgeonsSnap = await getDocs(collection(db, 'surgeons'));

    // Get all OPCS procedures
    const opcsSnap = await getDocs(collection(db, 'opcs4'));
    const opcsProcedures: any[] = [];
    opcsSnap.forEach(doc => {
      opcsProcedures.push({ id: doc.id, ...doc.data() });
    });

    for (const surgeonDoc of surgeonsSnap.docs) {
      const surgeon = { id: surgeonDoc.id, ...surgeonDoc.data() } as Surgeon;

      try {
        // Check if link already exists
        const existing = await getConsultantProcedures(surgeon.id!);

        if (existing) {
          skipped++;
          continue;
        }

        // Find procedures matching surgeon's specialty
        const matchingProcedures = opcsProcedures.filter(proc => {
          // Match by specialty name or subspecialty
          const procSpecialty = proc.specialty?.toLowerCase() || '';
          const surgeonSpecialty = surgeon.specialtyName.toLowerCase();
          const surgeonSubspecialty = surgeon.primarySubspecialty?.toLowerCase() || '';

          return procSpecialty.includes(surgeonSpecialty) ||
                 (surgeonSubspecialty && procSpecialty.includes(surgeonSubspecialty));
        });

        // Create link with matched procedures
        const procedureCodes = matchingProcedures.slice(0, 20).map(p => p.code); // Limit to 20 initial procedures

        if (procedureCodes.length > 0) {
          const result = await saveConsultantProcedureLink(
            surgeon.id!,
            `${surgeon.title} ${surgeon.firstName} ${surgeon.lastName}`,
            surgeon.specialtyId,
            surgeon.specialtyName,
            surgeon.primarySubspecialty,
            procedureCodes
          );

          if (result.success) {
            created++;
            console.log(`✅ Created link for ${surgeon.firstName} ${surgeon.lastName} with ${procedureCodes.length} procedures`);
          } else {
            errors.push(`Failed to create link for ${surgeon.firstName} ${surgeon.lastName}: ${result.error}`);
          }
        } else {
          skipped++;
          console.log(`⚠️ No matching procedures found for ${surgeon.firstName} ${surgeon.lastName}`);
        }
      } catch (error) {
        errors.push(`Error processing ${surgeon.firstName} ${surgeon.lastName}: ${error}`);
      }
    }

    return {
      success: errors.length === 0,
      created,
      skipped,
      errors
    };
  } catch (error) {
    console.error('Error generating consultant links:', error);
    return {
      success: false,
      created: 0,
      skipped: 0,
      errors: [`Fatal error: ${error}`]
    };
  }
}

/**
 * Deletes a consultant-procedure link
 */
export async function deleteConsultantProcedureLink(linkId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'consultantProcedureLinks', linkId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting consultant procedure link:', error);
    return { success: false, error: `${error}` };
  }
}
