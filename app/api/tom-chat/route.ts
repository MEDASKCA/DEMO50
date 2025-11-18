import { NextRequest, NextResponse } from 'next/server';
import { queryOpenAI } from '@/lib/openai';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { format } from 'date-fns';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/tom-chat
 * TOM AI chat endpoint with OpenAI + Firebase RAG
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('🔍 TOM AI received query:', message);

    // Build context from database
    const context = await buildContext(message);

    // Create system prompt with context
    const systemPrompt = `You are TOM AI, an intelligent assistant for NHS theatre operations management at Barts Health NHS Trust.

Current date: ${format(new Date(), 'EEEE, d MMMM yyyy')}

${context ? `\n\nRELEVANT DATA FROM DATABASE:\n${context}\n` : ''}

Your role:
- Help theatre staff with scheduling, procedures, and operations
- Provide clear, concise, professional responses
- Use data from the database when available
- Be supportive and helpful

Answer the user's question based on the context provided.`;

    // Query OpenAI
    const response = await queryOpenAI(message, systemPrompt);

    return NextResponse.json({
      success: true,
      message: response,
    });

  } catch (error: any) {
    console.error('❌ TOM Chat API Error:', error);

    // Fallback to basic response
    return NextResponse.json({
      success: true,
      message: "I apologize, but I'm having trouble connecting to my AI service right now. Please try again, or ask me about specific theatre schedules, staff availability, or operations.",
    });
  }
}

/**
 * Build context from Firebase based on the user's query
 */
async function buildContext(query: string): Promise<string> {
  try {
    const queryLower = query.toLowerCase();
    let context = '';

    // Check for schedule queries
    if (queryLower.includes('tomorrow') || queryLower.includes('schedule') || queryLower.includes('list')) {
      const date = queryLower.includes('tomorrow')
        ? getTomorrowDate()
        : format(new Date(), 'yyyy-MM-dd');

      const cases = await getScheduleForDate(date);
      if (cases.length > 0) {
        context += `\nTheatre Schedule for ${date}:\n`;
        cases.forEach((c: any, i: number) => {
          context += `${i + 1}. ${c.theatre || 'Theatre TBA'} at ${c.scheduledTime || 'TBA'}\n`;
          context += `   Procedure: ${c.procedureName || c.procedure || 'TBA'}\n`;
          context += `   Surgeon: ${c.surgeon || c.consultant || 'TBA'}\n`;
          if (c.priority) context += `   Priority: ${c.priority}\n`;
          context += '\n';
        });
      } else {
        context += `\nNo cases scheduled for ${date}.\n`;
      }
    }

    // Check for staff queries
    if (queryLower.includes('staff') && queryLower.includes('available')) {
      const staff = await getActiveStaff();
      if (staff.length > 0) {
        context += `\nActive Staff (${staff.length} members):\n`;
        const byRole: any = {};
        staff.forEach((s: any) => {
          if (!byRole[s.role]) byRole[s.role] = [];
          byRole[s.role].push(`${s.firstName} ${s.lastName}`);
        });
        Object.entries(byRole).forEach(([role, members]: [string, any]) => {
          context += `${role}s: ${members.slice(0, 5).join(', ')}${members.length > 5 ? `, and ${members.length - 5} more` : ''}\n`;
        });
      }
    }

    return context;
  } catch (error) {
    console.error('Error building context:', error);
    return '';
  }
}

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return format(tomorrow, 'yyyy-MM-dd');
}

async function getScheduleForDate(date: string): Promise<any[]> {
  try {
    const casesRef = collection(db, 'cases');
    const q = query(casesRef, where('date', '==', date));
    const snapshot = await getDocs(q);

    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
  } catch (error) {
    console.error('Error getting schedule:', error);
    return [];
  }
}

async function getActiveStaff(): Promise<any[]> {
  try {
    const staffRef = collection(db, 'staff');
    const q = query(staffRef, where('isActive', '==', true));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting staff:', error);
    return [];
  }
}
