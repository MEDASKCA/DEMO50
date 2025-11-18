// Staff Requirement Mapper Service
// Maps specialties/subspecialties to required staff roles

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { StaffRequirementMapper } from '@/lib/types/waitingListTypes';

/**
 * Fetches all staff requirement mappers
 */
export async function getAllStaffRequirementMappers(): Promise<StaffRequirementMapper[]> {
  try {
    const mappersSnap = await getDocs(collection(db, 'staffRequirementMappers'));
    const mappers: StaffRequirementMapper[] = [];

    mappersSnap.forEach(doc => {
      mappers.push({
        id: doc.id,
        ...doc.data()
      } as StaffRequirementMapper);
    });

    return mappers.sort((a, b) => a.specialtyName.localeCompare(b.specialtyName));
  } catch (error) {
    console.error('Error fetching staff requirement mappers:', error);
    return [];
  }
}

/**
 * Fetches staff requirements for a specific specialty/subspecialty
 */
export async function getStaffRequirementsFor(
  specialtyId: string,
  subspecialty?: string
): Promise<StaffRequirementMapper | null> {
  try {
    let mapperQuery;

    if (subspecialty) {
      // Subspecialty-specific mapping
      mapperQuery = query(
        collection(db, 'staffRequirementMappers'),
        where('specialtyId', '==', specialtyId),
        where('subspecialty', '==', subspecialty)
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

    return null;
  } catch (error) {
    console.error('Error fetching staff requirements:', error);
    return null;
  }
}

/**
 * Creates a new staff requirement mapper
 */
export async function createStaffRequirementMapper(
  mapper: Omit<StaffRequirementMapper, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Check if mapper already exists for this specialty/subspecialty
    const existing = await getStaffRequirementsFor(
      mapper.specialtyId,
      mapper.subspecialty || undefined
    );

    if (existing) {
      return {
        success: false,
        error: `Mapper already exists for ${mapper.specialtyName}${mapper.subspecialty ? ` - ${mapper.subspecialty}` : ''}`
      };
    }

    // Create new mapper
    const docRef = await addDoc(collection(db, 'staffRequirementMappers'), {
      ...mapper,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error creating staff requirement mapper:', error);
    return {
      success: false,
      error: `${error}`
    };
  }
}

/**
 * Updates an existing staff requirement mapper
 */
export async function updateStaffRequirementMapper(
  mapperId: string,
  updates: Partial<Omit<StaffRequirementMapper, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    await updateDoc(doc(db, 'staffRequirementMappers', mapperId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating staff requirement mapper:', error);
    return {
      success: false,
      error: `${error}`
    };
  }
}

/**
 * Deletes a staff requirement mapper
 */
export async function deleteStaffRequirementMapper(
  mapperId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'staffRequirementMappers', mapperId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting staff requirement mapper:', error);
    return {
      success: false,
      error: `${error}`
    };
  }
}

/**
 * Creates default staff requirement mappers for all configured specialties
 * Default: 1 Anaesthetist, 2 Scrub Nurses, 1 HCA
 */
export async function generateDefaultStaffMappers(): Promise<{
  success: boolean;
  created: number;
  skipped: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let created = 0;
  let skipped = 0;

  try {
    // Fetch all configured specialties
    const specialtiesSnap = await getDocs(collection(db, 'specialties'));

    for (const specDoc of specialtiesSnap.docs) {
      const specData = specDoc.data();

      // Create specialty-level mapper
      const existingSpecMapper = await getStaffRequirementsFor(specDoc.id);

      if (!existingSpecMapper) {
        const result = await createStaffRequirementMapper({
          specialtyId: specDoc.id,
          specialtyName: specData.name,
          anaesthetistsRequired: 1,
          anaesthetistGrade: 'Consultant',
          scrubNursesRequired: 2,
          scrubNurseGrade: 'Band 5',
          hcasRequired: 1,
          odpsRequired: 0,
          notes: 'Default mapping - adjust as needed'
        });

        if (result.success) {
          created++;
          console.log(`✅ Created default mapper for ${specData.name}`);
        } else {
          errors.push(`Failed to create mapper for ${specData.name}: ${result.error}`);
        }
      } else {
        skipped++;
      }

      // Create subspecialty-level mappers if they exist
      if (specData.subspecialties && Array.isArray(specData.subspecialties)) {
        for (const subspecialty of specData.subspecialties) {
          const existingSubMapper = await getStaffRequirementsFor(
            specDoc.id,
            subspecialty.name
          );

          if (!existingSubMapper) {
            const result = await createStaffRequirementMapper({
              specialtyId: specDoc.id,
              specialtyName: specData.name,
              subspecialty: subspecialty.name,
              anaesthetistsRequired: 1,
              anaesthetistGrade: 'Consultant',
              scrubNursesRequired: 2,
              scrubNurseGrade: 'Band 5',
              hcasRequired: 1,
              odpsRequired: 0,
              notes: 'Default mapping - adjust as needed'
            });

            if (result.success) {
              created++;
              console.log(`✅ Created default mapper for ${specData.name} - ${subspecialty.name}`);
            } else {
              errors.push(`Failed to create mapper for ${specData.name} - ${subspecialty.name}: ${result.error}`);
            }
          } else {
            skipped++;
          }
        }
      }
    }

    return {
      success: errors.length === 0,
      created,
      skipped,
      errors
    };
  } catch (error) {
    console.error('Error generating default staff mappers:', error);
    return {
      success: false,
      created: 0,
      skipped: 0,
      errors: [`Fatal error: ${error}`]
    };
  }
}

/**
 * Gets staff requirements summary by specialty
 */
export async function getStaffRequirementsSummary(): Promise<{
  totalMappers: number;
  bySpecialty: { [specialtyName: string]: number };
  unmappedSpecialties: string[];
}> {
  try {
    const mappers = await getAllStaffRequirementMappers();
    const specialtiesSnap = await getDocs(collection(db, 'specialties'));

    const bySpecialty: { [specialtyName: string]: number } = {};
    const allSpecialtyNames = new Set<string>();
    const mappedSpecialtyNames = new Set<string>();

    // Count by specialty
    mappers.forEach(mapper => {
      const key = `${mapper.specialtyName}${mapper.subspecialty ? ` - ${mapper.subspecialty}` : ''}`;
      bySpecialty[key] = (bySpecialty[key] || 0) + 1;
      mappedSpecialtyNames.add(mapper.specialtyName);
    });

    // Find unmapped specialties
    specialtiesSnap.forEach(doc => {
      const data = doc.data();
      allSpecialtyNames.add(data.name);
    });

    const unmappedSpecialties = Array.from(allSpecialtyNames).filter(
      name => !mappedSpecialtyNames.has(name)
    );

    return {
      totalMappers: mappers.length,
      bySpecialty,
      unmappedSpecialties
    };
  } catch (error) {
    console.error('Error getting staff requirements summary:', error);
    return {
      totalMappers: 0,
      bySpecialty: {},
      unmappedSpecialties: []
    };
  }
}
