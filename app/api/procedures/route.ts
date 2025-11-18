import { NextResponse } from 'next/server';
import { OPCS4_PROCEDURES } from '@/lib/opcs4Procedures';

export interface Procedure {
  name: string;
  specialtyName: string;
  subspecialtyName?: string;
  opcs4: string[];
  commonVariations?: string[];
}

// GET endpoint - Returns procedures from hardcoded OPCS-4.11 data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialtyName = searchParams.get('specialtyName');
    const subspecialtyName = searchParams.get('subspecialtyName');

    console.log(`📋 API: Fetching procedures (specialty: ${specialtyName}, subspecialty: ${subspecialtyName})`);

    // Filter by specialty if provided
    let filteredProcedures = OPCS4_PROCEDURES;

    if (specialtyName) {
      const specialtyUpper = specialtyName.toUpperCase();

      // For EMERGENCY, return all procedures (any procedure can be emergency)
      if (specialtyUpper === 'EMERGENCY') {
        filteredProcedures = OPCS4_PROCEDURES; // All 10,404 procedures
      }
      // For TRAUMA, return trauma-relevant procedures
      else if (specialtyUpper === 'TRAUMA') {
        // Include: Orthopaedics, Neurology, General Surgery, Vascular
        const traumaSpecialties = ['ORTHOPAEDICS', 'NEUROLOGY', 'GENERAL SURGERY', 'VASCULAR'];
        filteredProcedures = OPCS4_PROCEDURES.filter(proc =>
          traumaSpecialties.includes(proc.specialtyName.toUpperCase())
        );
      } else {
        filteredProcedures = OPCS4_PROCEDURES.filter(
          proc => proc.specialtyName.toUpperCase() === specialtyUpper
        );
      }
    }

    // Convert to Procedure format
    const procedures: Procedure[] = filteredProcedures.map(proc => ({
      name: proc.name,
      specialtyName: proc.specialtyName,
      subspecialtyName: '',
      opcs4: [proc.code],
      commonVariations: []
    }));

    // Filter by subspecialty if provided
    if (subspecialtyName) {
      // Note: OPCS-4 doesn't have subspecialties, so this filter won't match anything
      // Kept for API compatibility
    }

    console.log(`✅ API: Found ${procedures.length} procedures`);

    return NextResponse.json({
      success: true,
      procedures: procedures,
      count: procedures.length,
      totalProcedures: OPCS4_PROCEDURES.length,
      source: 'hardcoded-opcs-4.11'
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'hardcoded-opcs-4.11'
      },
      { status: 500 }
    );
  }
}
