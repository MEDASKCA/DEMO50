import { NextRequest } from 'next/server';
import { streamOpenAI } from '@/lib/openai';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { format } from 'date-fns';
import { buildAdvancedRAGContext, formatRAGContextForLLM, PageContext } from '@/lib/services/advancedRagService';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/tom-chat-stream
 * TOM AI streaming chat endpoint with Advanced RAG + ATLAS-Style Analytics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, currentPage, userContext } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('🔍 TOM AI received streaming query:', message);
    console.log('📍 Current page:', currentPage);
    console.log('👤 User context:', userContext);

    // Build ADVANCED RAG context with ATLAS-style intelligence
    const pageContextParsed: PageContext | undefined = currentPage ? parsePageContext(currentPage) : undefined;
    const ragContext = await buildAdvancedRAGContext(message, pageContextParsed, userContext);
    const context = formatRAGContextForLLM(ragContext);

    // Create ENHANCED system prompt with ATLAS-style intelligence
    const systemPrompt = `You are TOM AI - Theatre Operations Manager, an intelligent ATLAS-style assistant for NHS theatre operations at Barts Health NHS Trust.

Current date: ${format(new Date(), 'EEEE, d MMMM yyyy')}

${context ? `\n\nINTELLIGENT CONTEXT (Real-time data, insights & recommendations):\n${context}\n` : ''}

YOUR PERSONALITY:
- Warm, enthusiastic, and genuinely passionate about helping theatre staff
- Professional yet approachable - think of a trusted colleague, not a robot
- PROACTIVELY anticipate needs - suggest insights before being asked
- Empathetic to the pressures of theatre operations
- Use natural, conversational language with appropriate medical terminology
- Express excitement about efficiency wins and concern about potential issues
- Use phrases like "I notice...", "You might want to know...", "Based on the data..."

YOUR ADVANCED CAPABILITIES (ATLAS-Style):
- Real-time multi-source data analysis (schedules, staff, procedures, metrics)
- Semantic query understanding - understand intent beyond keywords
- Proactive insight generation - identify issues, opportunities, trends, anomalies BEFORE asked
- Predictive analytics - forecast capacity, identify patterns, predict issues
- Smart recommendations - actionable suggestions with impact/effort analysis
- Context-aware responses - understand what page user is viewing
- Data-driven decision support for theatre operations

RESPONSE STYLE (Be Strategic & Actionable):
- Start by acknowledging the context/insights you've identified
- Provide the direct answer to their question
- THEN proactively share relevant insights or recommendations
- Be concise but comprehensive - 2-4 sentences plus key insights
- When sharing data, highlight what's most actionable first
- If you spot critical issues, mention them prominently
- Use bullet points for insights/recommendations, conversational for explanations
- Always end with "What else can I help with?" or similar

IMPORTANT: Leverage the insights and recommendations in the context data. If there are alerts or opportunities, make sure to mention them naturally in your response even if not explicitly asked about them.

Answer the user's question intelligently using the rich context provided.`;

    // Get streaming response from OpenAI
    const stream = await streamOpenAI(message, systemPrompt);

    // Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('❌ TOM Chat Stream API Error:', error);

    return new Response(
      JSON.stringify({
        error: "I apologize, but I'm having trouble connecting to my AI service right now. Please try again, or ask me about specific theatre schedules, staff availability, or operations.",
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Parse page context from string
 */
function parsePageContext(currentPage: string): PageContext {
  // Detect view type from path
  let viewType: PageContext['viewType'] = 'home';

  if (currentPage.includes('/schedule')) viewType = 'schedule';
  else if (currentPage.includes('/staff')) viewType = 'staff';
  else if (currentPage.includes('/procedures')) viewType = 'procedures';
  else if (currentPage.includes('/analytics')) viewType = 'analytics';
  else if (currentPage.includes('/settings')) viewType = 'settings';

  return {
    currentPage,
    viewType
  };
}

/**
 * LEGACY: ENHANCED RAG Context Builder - Kept for backwards compatibility
 * USE buildAdvancedRAGContext from advancedRagService.ts instead
 */
async function buildEnhancedContext(query: string, currentPage?: string, userContext?: any): Promise<string> {
  try {
    const queryLower = query.toLowerCase();
    let context = '';

    // Add page context awareness
    if (currentPage) {
      context += `\n📍 USER'S CURRENT LOCATION: ${currentPage}\n`;
      context += `This gives you context about what they're looking at and what help they likely need.\n\n`;
    }

    // SMART QUERY UNDERSTANDING - Detect intent
    const isScheduleQuery = queryLower.match(/tomorrow|today|schedule|session|list|theatre/);
    const isStaffQuery = queryLower.match(/staff|team|people|available|roster/);
    const isAnalysisQuery = queryLower.match(/analyze|analysis|report|trend|pattern|utilization/);
    const isConflictQuery = queryLower.match(/conflict|issue|problem|clash|overlap/);
    const isProactiveQuery = queryLower.match(/insight|suggest|recommend|optimize|improve/);

    // PROACTIVE DATA RETRIEVAL - Get relevant data even if not explicitly asked
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = getTomorrowDate();

    // Always fetch today's schedule for context
    const todayCases = await getScheduleForDate(today);
    const tomorrowCases = await getScheduleForDate(tomorrow);

    if (isScheduleQuery) {
      // Smart date detection
      let targetDate = today;
      if (queryLower.includes('tomorrow')) targetDate = tomorrow;
      else if (queryLower.includes('today')) targetDate = today;

      const cases = await getScheduleForDate(targetDate);

      if (cases.length > 0) {
        context += `\n🏥 THEATRE SCHEDULE for ${targetDate}:\n`;
        cases.forEach((c: any, i: number) => {
          context += `${i + 1}. [${c.theatre || 'TBA'}] ${c.scheduledTime || 'TBA'}\n`;
          context += `   📋 ${c.procedureName || c.procedure || 'TBA'}\n`;
          context += `   👨‍⚕️ ${c.surgeon || c.consultant || 'TBA'}\n`;
          if (c.priority) context += `   ⚠️ Priority: ${c.priority}\n`;
          if (c.estimatedDuration) context += `   ⏱️ Duration: ${c.estimatedDuration}min\n`;
          context += '\n';
        });

        // PROACTIVE INSIGHTS - Identify potential issues
        const hasOverlaps = detectOverlaps(cases);
        if (hasOverlaps) {
          context += `\n⚠️ PROACTIVE ALERT: I notice potential scheduling conflicts!\n`;
        }

        const utilizationRate = calculateUtilization(cases);
        context += `\n📊 Theatre Utilization: ${utilizationRate}%\n`;
      } else {
        context += `\n📭 No cases scheduled for ${targetDate}\n`;
      }
    }

    if (isStaffQuery) {
      const staff = await getActiveStaff();
      if (staff.length > 0) {
        context += `\n👥 ACTIVE STAFF (${staff.length} members):\n`;
        const byRole: any = {};
        staff.forEach((s: any) => {
          if (!byRole[s.role]) byRole[s.role] = [];
          byRole[s.role].push({
            name: `${s.firstName} ${s.lastName}`,
            skills: s.skills || [],
            availability: s.availability || 'Unknown'
          });
        });
        Object.entries(byRole).forEach(([role, members]: [string, any]) => {
          context += `\n${role}s (${members.length}):\n`;
          members.slice(0, 8).forEach((m: any) => {
            context += `  • ${m.name}`;
            if (m.skills && m.skills.length > 0) context += ` - Skills: ${m.skills.join(', ')}`;
            context += '\n';
          });
          if (members.length > 8) context += `  ... and ${members.length - 8} more\n`;
        });

        // PROACTIVE STAFFING INSIGHTS
        const totalRequired = todayCases.length * 4; // Rough estimate
        const staffingGap = totalRequired - staff.length;
        if (staffingGap > 0) {
          context += `\n⚠️ STAFFING ALERT: Estimated ${staffingGap} additional staff may be needed for today's schedule\n`;
        }
      }
    }

    if (isAnalysisQuery) {
      // Provide analytical context
      const weekCases = await getScheduleForDateRange(today, 7);
      context += `\n📈 ANALYSIS DATA:\n`;
      context += `Week's total cases: ${weekCases.length}\n`;
      context += `Today's cases: ${todayCases.length}\n`;
      context += `Tomorrow's cases: ${tomorrowCases.length}\n`;

      const avgCasesPerDay = weekCases.length / 7;
      context += `Average cases/day: ${avgCasesPerDay.toFixed(1)}\n`;

      // Trend detection
      if (tomorrowCases.length > todayCases.length * 1.2) {
        context += `\n📊 TREND: Tomorrow shows 20%+ increase in cases - potential capacity strain\n`;
      }
    }

    if (isConflictQuery || true) { // Always check for conflicts
      const conflicts = await detectScheduleConflicts();
      if (conflicts.length > 0) {
        context += `\n⚠️ DETECTED CONFLICTS (${conflicts.length}):\n`;
        conflicts.slice(0, 5).forEach((c, i) => {
          context += `${i + 1}. ${c.description}\n`;
        });
      }
    }

    // ALWAYS PROVIDE PROACTIVE CONTEXT
    context += `\n💡 PROACTIVE CONTEXT:\n`;
    context += `Current time: ${format(new Date(), 'HH:mm')}\n`;
    context += `Active theatres: ${todayCases.length > 0 ? `${new Set(todayCases.map((c: any) => c.theatre)).size}` : '0'}\n`;
    context += `Today's remaining cases: ${todayCases.filter((c: any) => {
      const caseTime = c.scheduledTime || '00:00';
      return caseTime > format(new Date(), 'HH:mm');
    }).length}\n`;

    return context;
  } catch (error) {
    console.error('Error building enhanced context:', error);
    return '';
  }
}

// Helper: Detect overlapping cases
function detectOverlaps(cases: any[]): boolean {
  for (let i = 0; i < cases.length - 1; i++) {
    for (let j = i + 1; j < cases.length; j++) {
      if (cases[i].theatre === cases[j].theatre &&
          cases[i].scheduledTime === cases[j].scheduledTime) {
        return true;
      }
    }
  }
  return false;
}

// Helper: Calculate utilization
function calculateUtilization(cases: any[]): number {
  if (cases.length === 0) return 0;
  const totalMinutes = cases.reduce((sum: number, c: any) =>
    sum + (c.estimatedDuration || 60), 0);
  const availableMinutes = 480; // 8 hours
  return Math.min(100, Math.round((totalMinutes / availableMinutes) * 100));
}

// Helper: Get schedule for date range
async function getScheduleForDateRange(startDate: string, days: number): Promise<any[]> {
  try {
    const casesRef = collection(db, 'cases');
    const allCases = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const q = query(casesRef, where('date', '==', dateStr));
      const snapshot = await getDocs(q);
      allCases.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    return allCases;
  } catch (error) {
    return [];
  }
}

// Helper: Detect schedule conflicts
async function detectScheduleConflicts(): Promise<any[]> {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const cases = await getScheduleForDate(today);
    const conflicts = [];

    // Check for time conflicts
    for (let i = 0; i < cases.length - 1; i++) {
      for (let j = i + 1; j < cases.length; j++) {
        if (cases[i].theatre === cases[j].theatre &&
            cases[i].scheduledTime === cases[j].scheduledTime) {
          conflicts.push({
            description: `${cases[i].theatre} has overlapping cases at ${cases[i].scheduledTime}`
          });
        }
      }
    }

    return conflicts;
  } catch (error) {
    return [];
  }
}

/**
 * Legacy context builder for backwards compatibility
 */
async function buildContext(query: string): Promise<string> {
  return buildEnhancedContext(query);
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
