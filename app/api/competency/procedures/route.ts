// API Route for saving/loading staff procedure experience
// app/api/competency/procedures/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { StaffProcedureExperience } from '@/lib/surgicalCompetencyData';

// This is a template - replace with your actual database logic
// (Firebase, Prisma, MongoDB, etc.)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { staffId, procedures } = body as {
      staffId: string;
      procedures: StaffProcedureExperience[];
    };

    if (!staffId || !procedures) {
      return NextResponse.json(
        { error: 'Missing staffId or procedures' },
        { status: 400 }
      );
    }

    // TODO: Replace with your database logic
    // Example with Firebase:
    /*
    const firestore = getFirestore();
    const docRef = doc(firestore, 'staff_procedure_experience', staffId);

    await setDoc(docRef, {
      staffId,
      procedures,
      updatedAt: new Date().toISOString()
    });
    */

    // Example with Prisma:
    /*
    await prisma.staffProcedureExperience.upsert({
      where: { staffId },
      update: { procedures, updatedAt: new Date() },
      create: { staffId, procedures }
    });
    */

    // For now, just return success
    console.log(`Saving procedures for staff ${staffId}:`, procedures.length, 'items');

    return NextResponse.json({
      success: true,
      message: 'Procedures saved successfully',
      count: procedures.length
    });

  } catch (error) {
    console.error('Error saving procedures:', error);
    return NextResponse.json(
      { error: 'Failed to save procedures' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staffId');

    if (!staffId) {
      return NextResponse.json(
        { error: 'Missing staffId parameter' },
        { status: 400 }
      );
    }

    // TODO: Replace with your database logic
    // Example with Firebase:
    /*
    const firestore = getFirestore();
    const docRef = doc(firestore, 'staff_procedure_experience', staffId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return NextResponse.json({
        procedures: data.procedures || []
      });
    }
    */

    // Example with Prisma:
    /*
    const data = await prisma.staffProcedureExperience.findUnique({
      where: { staffId }
    });

    return NextResponse.json({
      procedures: data?.procedures || []
    });
    */

    // For now, return empty array
    console.log(`Loading procedures for staff ${staffId}`);

    return NextResponse.json({
      procedures: []
    });

  } catch (error) {
    console.error('Error loading procedures:', error);
    return NextResponse.json(
      { error: 'Failed to load procedures' },
      { status: 500 }
    );
  }
}
