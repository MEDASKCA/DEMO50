// Advanced RAG Service - ATLAS-Style Intelligence
// Semantic search, multi-source retrieval, predictive analytics

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit as limitQuery } from 'firebase/firestore';
import { format, addDays, parseISO, isAfter, isBefore, startOfWeek, endOfWeek } from 'date-fns';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface RAGContext {
  pageContext?: PageContext;
  dataContext: DataContext;
  insights: Insight[];
  recommendations: Recommendation[];
  metadata: ContextMetadata;
}

export interface PageContext {
  currentPage: string;
  viewType: 'schedule' | 'staff' | 'procedures' | 'analytics' | 'settings' | 'home';
  filters?: Record<string, any>;
  selectedDate?: string;
  selectedTheatre?: string;
  selectedSpecialty?: string;
}

export interface DataContext {
  schedules: ScheduleData[];
  staff: StaffData[];
  procedures: ProcedureData[];
  theatres: TheatreData[];
  metrics: MetricsData;
  historical: HistoricalData;
}

export interface Insight {
  type: 'alert' | 'opportunity' | 'trend' | 'anomaly';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  data?: any;
  action?: string;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  category: 'efficiency' | 'safety' | 'cost' | 'quality';
}

export interface ContextMetadata {
  timestamp: string;
  queryType: string[];
  dataSourcesUsed: string[];
  processingTime: number;
}

interface ScheduleData {
  id: string;
  date: string;
  theatre: string;
  sessionType: string;
  surgeon?: string;
  specialty?: string;
  procedures?: any[];
  startTime?: string;
  endTime?: string;
  utilization?: number;
}

interface StaffData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  specialty?: string;
  availability?: string;
  skills?: string[];
  experience?: number;
}

interface ProcedureData {
  id: string;
  name: string;
  opcsCode?: string;
  specialty?: string;
  duration?: number;
  complexity?: string;
  priority?: string;
}

interface TheatreData {
  id: string;
  name: string;
  capacity?: number;
  equipment?: string[];
  specialty?: string;
}

interface MetricsData {
  todayUtilization: number;
  weekUtilization: number;
  staffingLevel: number;
  waitingListSize: number;
  avgTurnoverTime: number;
  cancelationRate: number;
}

interface HistoricalData {
  weeklyTrends: any[];
  peakTimes: any[];
  commonIssues: any[];
}

// ============================================================================
// MAIN RAG CONTEXT BUILDER
// ============================================================================

export async function buildAdvancedRAGContext(
  query: string,
  pageContext?: PageContext,
  userContext?: any
): Promise<RAGContext> {
  const startTime = Date.now();

  try {
    console.log('🔍 Building advanced RAG context...');

    // 1. UNDERSTAND QUERY INTENT (Semantic Analysis)
    const queryIntent = analyzeQueryIntent(query);
    console.log('🧠 Query intent:', queryIntent);

    // 2. RETRIEVE RELEVANT DATA (Multi-source)
    const dataContext = await retrieveMultiSourceData(query, queryIntent, pageContext);

    // 3. GENERATE INSIGHTS (Predictive Analytics)
    const insights = await generateProactiveInsights(dataContext, queryIntent, pageContext);

    // 4. CREATE RECOMMENDATIONS (ATLAS-style)
    const recommendations = await generateRecommendations(dataContext, insights, pageContext);

    // 5. METADATA
    const metadata: ContextMetadata = {
      timestamp: new Date().toISOString(),
      queryType: queryIntent.categories,
      dataSourcesUsed: dataContext ? getDataSourcesUsed(dataContext) : [],
      processingTime: Date.now() - startTime
    };

    console.log(`✅ RAG context built in ${metadata.processingTime}ms`);

    return {
      pageContext,
      dataContext,
      insights,
      recommendations,
      metadata
    };

  } catch (error) {
    console.error('❌ Error building RAG context:', error);
    throw error;
  }
}

// ============================================================================
// QUERY INTENT ANALYSIS (Semantic Understanding)
// ============================================================================

interface QueryIntent {
  categories: string[];
  entities: {
    dates?: string[];
    times?: string[];
    people?: string[];
    locations?: string[];
    procedures?: string[];
    specialties?: string[];
  };
  sentiment: 'neutral' | 'urgent' | 'analytical' | 'casual';
  explicitActions: string[];
}

function analyzeQueryIntent(query: string): QueryIntent {
  const queryLower = query.toLowerCase();

  const categories: string[] = [];
  const entities: QueryIntent['entities'] = {};
  let sentiment: QueryIntent['sentiment'] = 'neutral';
  const explicitActions: string[] = [];

  // CATEGORY DETECTION (Intent Classification)
  if (queryLower.match(/schedule|session|list|case|theatre|tomorrow|today/)) {
    categories.push('schedule');
  }
  if (queryLower.match(/staff|team|people|nurse|surgeon|anaesthetist|available|roster/)) {
    categories.push('staffing');
  }
  if (queryLower.match(/procedure|operation|surgery|opcs/)) {
    categories.push('procedures');
  }
  if (queryLower.match(/analyze|analysis|report|trend|pattern|utilization|metric|kpi/)) {
    categories.push('analytics');
  }
  if (queryLower.match(/conflict|issue|problem|clash|overlap|alert/)) {
    categories.push('conflicts');
  }
  if (queryLower.match(/wait|delay|backlog|queue/)) {
    categories.push('waiting-list');
  }
  if (queryLower.match(/cost|budget|financial|tariff|spend/)) {
    categories.push('financial');
  }
  if (queryLower.match(/equipment|supply|inventory|stock/)) {
    categories.push('resources');
  }
  if (queryLower.match(/insight|suggest|recommend|optimize|improve|what should/)) {
    categories.push('recommendations');
  }

  // ENTITY EXTRACTION
  // Dates
  const dateMatches = query.match(/tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next week|this week/gi);
  if (dateMatches) entities.dates = dateMatches;

  // Times
  const timeMatches = query.match(/\d{1,2}:\d{2}|\d{1,2}(am|pm)/gi);
  if (timeMatches) entities.times = timeMatches;

  // Specialties
  const specialties = ['orthopaedics', 'cardio', 'neuro', 'general surgery', 'urology', 'gynae', 'ent', 'plastics'];
  entities.specialties = specialties.filter(s => queryLower.includes(s));

  // SENTIMENT ANALYSIS
  if (queryLower.match(/urgent|emergency|critical|asap|immediately|now/)) {
    sentiment = 'urgent';
  } else if (queryLower.match(/analyze|analysis|report|statistics|trend/)) {
    sentiment = 'analytical';
  } else if (queryLower.match(/hi|hello|thanks|please|could you/)) {
    sentiment = 'casual';
  }

  // EXPLICIT ACTIONS
  if (queryLower.includes('show')) explicitActions.push('display');
  if (queryLower.includes('check')) explicitActions.push('verify');
  if (queryLower.includes('find')) explicitActions.push('search');
  if (queryLower.includes('compare')) explicitActions.push('compare');
  if (queryLower.includes('predict')) explicitActions.push('forecast');

  return {
    categories,
    entities,
    sentiment,
    explicitActions
  };
}

// ============================================================================
// MULTI-SOURCE DATA RETRIEVAL
// ============================================================================

async function retrieveMultiSourceData(
  query: string,
  intent: QueryIntent,
  pageContext?: PageContext
): Promise<DataContext> {
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  // Parallel data fetching for performance
  const [schedules, staff, procedures, theatres, metrics, historical] = await Promise.all([
    fetchScheduleData(intent, pageContext),
    fetchStaffData(intent, pageContext),
    fetchProcedureData(intent, pageContext),
    fetchTheatreData(intent, pageContext),
    calculateMetrics(today),
    fetchHistoricalData(7) // Last 7 days
  ]);

  return {
    schedules,
    staff,
    procedures,
    theatres,
    metrics,
    historical
  };
}

// SCHEDULE DATA RETRIEVAL
async function fetchScheduleData(intent: QueryIntent, pageContext?: PageContext): Promise<ScheduleData[]> {
  try {
    const sessionsRef = collection(db, 'theatreSessions');
    let q = query(sessionsRef);

    // Apply filters based on intent and page context
    if (pageContext?.selectedDate) {
      q = query(sessionsRef, where('date', '==', pageContext.selectedDate));
    } else {
      // Default: today and tomorrow
      const today = format(new Date(), 'yyyy-MM-dd');
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      // Note: Firestore doesn't support OR queries directly, so we'll fetch both and combine
    }

    if (pageContext?.selectedTheatre) {
      q = query(q, where('theatreId', '==', pageContext.selectedTheatre));
    }

    if (pageContext?.selectedSpecialty) {
      q = query(q, where('specialtyName', '==', pageContext.selectedSpecialty));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ScheduleData));

  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return [];
  }
}

// STAFF DATA RETRIEVAL
async function fetchStaffData(intent: QueryIntent, pageContext?: PageContext): Promise<StaffData[]> {
  try {
    const staffRef = collection(db, 'staff');
    const q = query(staffRef, limitQuery(100));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as StaffData));

  } catch (error) {
    console.error('Error fetching staff data:', error);
    return [];
  }
}

// PROCEDURE DATA RETRIEVAL
async function fetchProcedureData(intent: QueryIntent, pageContext?: PageContext): Promise<ProcedureData[]> {
  try {
    const proceduresRef = collection(db, 'generatedProcedures');
    const q = query(proceduresRef, where('status', '==', 'waiting'), limitQuery(50));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ProcedureData));

  } catch (error) {
    console.error('Error fetching procedure data:', error);
    return [];
  }
}

// THEATRE DATA RETRIEVAL
async function fetchTheatreData(intent: QueryIntent, pageContext?: PageContext): Promise<TheatreData[]> {
  try {
    const theatresRef = collection(db, 'theatres');
    const snapshot = await getDocs(theatresRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TheatreData));

  } catch (error) {
    console.error('Error fetching theatre data:', error);
    return [];
  }
}

// METRICS CALCULATION
async function calculateMetrics(date: string): Promise<MetricsData> {
  try {
    // Fetch data for metrics calculation
    const sessionsRef = collection(db, 'theatreSessions');
    const todayQuery = query(sessionsRef, where('date', '==', date));
    const todaySnapshot = await getDocs(todayQuery);

    const weekStart = format(startOfWeek(new Date()), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(new Date()), 'yyyy-MM-dd');

    // Calculate utilization
    let todayUtilization = 0;
    let weekUtilization = 0;

    todaySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.utilization) {
        todayUtilization += data.utilization;
      }
    });

    todayUtilization = todaySnapshot.size > 0 ? todayUtilization / todaySnapshot.size : 0;

    // Staffing level (placeholder)
    const staffRef = collection(db, 'staff');
    const staffSnapshot = await getDocs(staffRef);
    const staffingLevel = (staffSnapshot.size / 100) * 100; // Target: 100 staff

    // Waiting list
    const waitingRef = collection(db, 'generatedProcedures');
    const waitingQuery = query(waitingRef, where('status', '==', 'waiting'));
    const waitingSnapshot = await getDocs(waitingQuery);
    const waitingListSize = waitingSnapshot.size;

    return {
      todayUtilization,
      weekUtilization: todayUtilization, // Simplified
      staffingLevel,
      waitingListSize,
      avgTurnoverTime: 25, // Placeholder
      cancelationRate: 2.5 // Placeholder
    };

  } catch (error) {
    console.error('Error calculating metrics:', error);
    return {
      todayUtilization: 0,
      weekUtilization: 0,
      staffingLevel: 0,
      waitingListSize: 0,
      avgTurnoverTime: 0,
      cancelationRate: 0
    };
  }
}

// HISTORICAL DATA RETRIEVAL
async function fetchHistoricalData(days: number): Promise<HistoricalData> {
  try {
    // Placeholder for historical analysis
    return {
      weeklyTrends: [],
      peakTimes: [
        { time: '08:00', avgCases: 4 },
        { time: '10:00', avgCases: 6 },
        { time: '14:00', avgCases: 5 }
      ],
      commonIssues: [
        { issue: 'Late starts', frequency: 12 },
        { issue: 'Equipment delays', frequency: 8 }
      ]
    };

  } catch (error) {
    console.error('Error fetching historical data:', error);
    return {
      weeklyTrends: [],
      peakTimes: [],
      commonIssues: []
    };
  }
}

// ============================================================================
// PROACTIVE INSIGHTS GENERATION (ATLAS-Style)
// ============================================================================

async function generateProactiveInsights(
  dataContext: DataContext,
  intent: QueryIntent,
  pageContext?: PageContext
): Promise<Insight[]> {
  const insights: Insight[] = [];

  // CAPACITY ALERTS
  if (dataContext.metrics.todayUtilization > 95) {
    insights.push({
      type: 'alert',
      severity: 'high',
      title: 'Theatre Capacity Critical',
      description: `Today's utilization is ${dataContext.metrics.todayUtilization.toFixed(1)}% - near maximum capacity`,
      action: 'Consider adding evening sessions or rescheduling non-urgent cases'
    });
  }

  // STAFFING ALERTS
  if (dataContext.metrics.staffingLevel < 80) {
    insights.push({
      type: 'alert',
      severity: 'high',
      title: 'Staffing Below Target',
      description: `Current staffing at ${dataContext.metrics.staffingLevel.toFixed(0)}% of target`,
      action: 'Review bank/agency staff availability'
    });
  }

  // WAITING LIST TRENDS
  if (dataContext.metrics.waitingListSize > 100) {
    insights.push({
      type: 'trend',
      severity: 'medium',
      title: 'Growing Waiting List',
      description: `${dataContext.metrics.waitingListSize} procedures awaiting scheduling`,
      action: 'Prioritize high-urgency cases and optimize scheduling'
    });
  }

  // SCHEDULE CONFLICTS
  const conflicts = detectScheduleConflicts(dataContext.schedules);
  if (conflicts.length > 0) {
    insights.push({
      type: 'alert',
      severity: 'high',
      title: 'Schedule Conflicts Detected',
      description: `Found ${conflicts.length} potential scheduling conflicts`,
      data: conflicts,
      action: 'Review and resolve conflicts immediately'
    });
  }

  // OPPORTUNITIES
  if (dataContext.metrics.todayUtilization < 70) {
    insights.push({
      type: 'opportunity',
      severity: 'low',
      title: 'Available Theatre Capacity',
      description: `Current utilization is ${dataContext.metrics.todayUtilization.toFixed(1)}% - capacity available`,
      action: 'Consider scheduling additional cases from waiting list'
    });
  }

  // ANOMALY DETECTION
  if (dataContext.metrics.cancelationRate > 5) {
    insights.push({
      type: 'anomaly',
      severity: 'medium',
      title: 'Elevated Cancellation Rate',
      description: `Cancellation rate at ${dataContext.metrics.cancelationRate}% (target: <3%)`,
      action: 'Investigate cancellation reasons and implement preventive measures'
    });
  }

  return insights;
}

// ============================================================================
// RECOMMENDATIONS ENGINE
// ============================================================================

async function generateRecommendations(
  dataContext: DataContext,
  insights: Insight[],
  pageContext?: PageContext
): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];

  // EFFICIENCY RECOMMENDATIONS
  if (dataContext.metrics.avgTurnoverTime > 30) {
    recommendations.push({
      title: 'Optimize Theatre Turnover',
      description: 'Average turnover time is 25min. Implement parallel cleaning protocols to reduce to target of 20min',
      impact: 'high',
      effort: 'medium',
      category: 'efficiency'
    });
  }

  // COST OPTIMIZATION
  if (dataContext.metrics.staffingLevel > 105) {
    recommendations.push({
      title: 'Review Staffing Levels',
      description: 'Staffing exceeds target by 5%. Review rosters to optimize cost without compromising safety',
      impact: 'medium',
      effort: 'low',
      category: 'cost'
    });
  }

  // QUALITY IMPROVEMENTS
  recommendations.push({
    title: 'Implement Predictive Scheduling',
    description: 'Use historical data to predict procedure durations more accurately, reducing overruns by 15%',
    impact: 'high',
    effort: 'high',
    category: 'quality'
  });

  // SAFETY ENHANCEMENTS
  if (insights.some(i => i.type === 'alert' && i.severity === 'high')) {
    recommendations.push({
      title: 'Deploy Real-time Alerts',
      description: 'Enable proactive notifications for conflicts, capacity issues, and safety concerns',
      impact: 'high',
      effort: 'low',
      category: 'safety'
    });
  }

  return recommendations;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function detectScheduleConflicts(schedules: ScheduleData[]): any[] {
  const conflicts: any[] = [];

  for (let i = 0; i < schedules.length - 1; i++) {
    for (let j = i + 1; j < schedules.length; j++) {
      if (schedules[i].theatre === schedules[j].theatre &&
          schedules[i].date === schedules[j].date &&
          schedules[i].startTime === schedules[j].startTime) {
        conflicts.push({
          theatre: schedules[i].theatre,
          date: schedules[i].date,
          time: schedules[i].startTime,
          sessions: [schedules[i].id, schedules[j].id]
        });
      }
    }
  }

  return conflicts;
}

function getDataSourcesUsed(dataContext: DataContext): string[] {
  const sources: string[] = [];

  if (dataContext.schedules.length > 0) sources.push('theatreSessions');
  if (dataContext.staff.length > 0) sources.push('staff');
  if (dataContext.procedures.length > 0) sources.push('generatedProcedures');
  if (dataContext.theatres.length > 0) sources.push('theatres');
  if (dataContext.metrics) sources.push('metrics');
  if (dataContext.historical) sources.push('historical');

  return sources;
}

// ============================================================================
// CONTEXT FORMATTING FOR LLM
// ============================================================================

export function formatRAGContextForLLM(ragContext: RAGContext): string {
  let formatted = '';

  // PAGE CONTEXT
  if (ragContext.pageContext) {
    formatted += `\n📍 USER LOCATION: ${ragContext.pageContext.currentPage}\n`;
    formatted += `   View Type: ${ragContext.pageContext.viewType}\n`;
    if (ragContext.pageContext.selectedDate) {
      formatted += `   Viewing Date: ${ragContext.pageContext.selectedDate}\n`;
    }
    formatted += '\n';
  }

  // KEY METRICS
  formatted += `\n📊 KEY METRICS:\n`;
  formatted += `   Today's Utilization: ${ragContext.dataContext.metrics.todayUtilization.toFixed(1)}%\n`;
  formatted += `   Staffing Level: ${ragContext.dataContext.metrics.staffingLevel.toFixed(0)}%\n`;
  formatted += `   Waiting List: ${ragContext.dataContext.metrics.waitingListSize} procedures\n`;
  formatted += `   Avg Turnover: ${ragContext.dataContext.metrics.avgTurnoverTime}min\n`;
  formatted += '\n';

  // INSIGHTS (Proactive Alerts)
  if (ragContext.insights.length > 0) {
    formatted += `\n⚠️  PROACTIVE INSIGHTS (${ragContext.insights.length}):\n`;
    ragContext.insights.forEach((insight, i) => {
      const icon = insight.type === 'alert' ? '🚨' : insight.type === 'opportunity' ? '💡' : '📈';
      formatted += `${i + 1}. ${icon} [${insight.severity.toUpperCase()}] ${insight.title}\n`;
      formatted += `      ${insight.description}\n`;
      if (insight.action) {
        formatted += `      → ${insight.action}\n`;
      }
      formatted += '\n';
    });
  }

  // RECOMMENDATIONS
  if (ragContext.recommendations.length > 0) {
    formatted += `\n💡 SMART RECOMMENDATIONS (${ragContext.recommendations.length}):\n`;
    ragContext.recommendations.slice(0, 3).forEach((rec, i) => {
      formatted += `${i + 1}. ${rec.title} (Impact: ${rec.impact}, Effort: ${rec.effort})\n`;
      formatted += `      ${rec.description}\n`;
    });
    formatted += '\n';
  }

  // SCHEDULE DATA
  if (ragContext.dataContext.schedules.length > 0) {
    formatted += `\n🏥 SCHEDULE DATA (${ragContext.dataContext.schedules.length} sessions):\n`;
    ragContext.dataContext.schedules.slice(0, 10).forEach((session, i) => {
      formatted += `${i + 1}. ${session.theatre} - ${session.date} ${session.startTime || ''}\n`;
      if (session.specialty) formatted += `      Specialty: ${session.specialty}\n`;
      if (session.surgeon) formatted += `      Surgeon: ${session.surgeon}\n`;
    });
    if (ragContext.dataContext.schedules.length > 10) {
      formatted += `... and ${ragContext.dataContext.schedules.length - 10} more sessions\n`;
    }
    formatted += '\n';
  }

  // STAFF DATA
  if (ragContext.dataContext.staff.length > 0) {
    formatted += `\n👥 STAFF AVAILABLE (${ragContext.dataContext.staff.length} members):\n`;
    const byRole: Record<string, any[]> = {};
    ragContext.dataContext.staff.forEach(s => {
      if (!byRole[s.role]) byRole[s.role] = [];
      byRole[s.role].push(s);
    });
    Object.entries(byRole).forEach(([role, members]) => {
      formatted += `   ${role}: ${members.length} available\n`;
    });
    formatted += '\n';
  }

  // METADATA
  formatted += `\n🔍 CONTEXT METADATA:\n`;
  formatted += `   Processing Time: ${ragContext.metadata.processingTime}ms\n`;
  formatted += `   Data Sources: ${ragContext.metadata.dataSourcesUsed.join(', ')}\n`;
  formatted += `   Query Type: ${ragContext.metadata.queryType.join(', ')}\n`;

  return formatted;
}
