// API endpoint to auto-generate schedules from Firebase configurations
import { NextRequest, NextResponse } from 'next/server';
import { generateScheduleFromConfig } from '@/lib/services/autoScheduler';
import { batchSaveTheatreLists } from '@/lib/services/theatreListService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hospitalId, startDate, endDate } = body;

    if (!hospitalId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: hospitalId, startDate, endDate' },
        { status: 400 }
      );
    }

    console.log('🤖 API: Generating schedule...');
    console.log(`   Hospital: ${hospitalId}`);
    console.log(`   Period: ${startDate} to ${endDate}`);

    // Generate lists from Firebase configurations
    const lists = await generateScheduleFromConfig(
      hospitalId,
      new Date(startDate),
      new Date(endDate)
    );

    // Save to Firebase
    if (lists.length > 0) {
      await batchSaveTheatreLists(lists);
    }

    return NextResponse.json({
      success: true,
      listsGenerated: lists.length,
      message: `Successfully generated ${lists.length} theatre lists`
    });

  } catch (error) {
    console.error('Error generating schedule:', error);
    return NextResponse.json(
      { error: 'Failed to generate schedule', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
