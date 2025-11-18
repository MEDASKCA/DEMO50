import { db } from './firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { format, isToday, parseISO } from 'date-fns';

export interface AIQueryResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * TOM AI Service - Handles natural language queries and retrieves data from Firebase
 * Now uses Azure OpenAI RAG for intelligent responses
 */
export class TomAIService {
  /**
   * Process a user query and return relevant information
   * Uses Azure OpenAI RAG system with fallback to rule-based system
   */
  static async processQuery(userQuery: string): Promise<AIQueryResult> {
    const queryLower = userQuery.toLowerCase();
    console.log('🔍 TOM AI Query:', userQuery);
    console.log('🔍 Query (lowercase):', queryLower);

    try {
      // Check if in demo mode
      if ((db as any).type === 'demo') {
        console.log('⚠️ Database in demo mode');
        return {
          success: false,
          message: "I'm currently in demo mode. Please configure Firebase credentials to access real-time theatre operations data. You can add your Firebase config in the .env.local file."
        };
      }

      // Use direct database queries with pattern matching
      console.log('🔄 Using rule-based pattern matching...');

      // Today's schedule queries
      if (queryLower.includes('today') && (queryLower.includes('schedule') || queryLower.includes('cases') || queryLower.includes('list'))) {
        console.log('✓ Matched: Today schedule query');
        return await this.getTodaySchedule();
      }

      // Tomorrow's schedule queries
      if (queryLower.includes('tomorrow')) {
        console.log('✓ Matched: Tomorrow schedule query');
        return await this.getTomorrowSchedule();
      }

      // Generic "list" queries - assume they want tomorrow
      if (queryLower.includes('list') && !queryLower.includes('staff')) {
        console.log('✓ Matched: Generic list query (defaulting to tomorrow)');
        return await this.getTomorrowSchedule();
      }

      // Generic schedule queries
      if (queryLower.includes('schedule') && !queryLower.includes('staff')) {
        console.log('✓ Matched: Generic schedule query (defaulting to tomorrow)');
        return await this.getTomorrowSchedule();
      }

      // Staff availability queries
      if (queryLower.includes('staff') && (queryLower.includes('available') || queryLower.includes('availability'))) {
        return await this.getStaffAvailability();
      }

      // Theatre-specific queries
      if (queryLower.includes('theatre')) {
        const theatreMatch = queryLower.match(/theatre\s+(\d+)/);
        if (theatreMatch) {
          const theatreNumber = theatreMatch[1];
          return await this.getTheatreInfo(theatreNumber);
        }
      }

      // Efficiency/Analytics queries
      if (queryLower.includes('efficiency') || queryLower.includes('performance') || queryLower.includes('analytics')) {
        return await this.getEfficiencyMetrics();
      }

      // Theatre readiness queries
      if (queryLower.includes('readiness') || queryLower.includes('status')) {
        return await this.getTheatreReadiness();
      }

      // Case status queries
      if (queryLower.includes('elective') || queryLower.includes('emergency') || queryLower.includes('urgent')) {
        const caseType = queryLower.includes('elective') ? 'routine' : queryLower.includes('emergency') ? 'emergency' : 'urgent';
        return await this.getCasesByPriority(caseType);
      }

      // Default response if no pattern matches
      return {
        success: true,
        message: "I can help you with:\n\n• Today's theatre schedule\n• Staff availability\n• Theatre-specific information (e.g., 'Theatre 3 status')\n• Performance metrics and efficiency\n• Case priorities (elective, urgent, emergency)\n• Theatre readiness\n\nWhat would you like to know?"
      };

    } catch (error) {
      console.error('TOM AI Error:', error);
      return {
        success: false,
        message: "I encountered an error processing your request. Please try again or rephrase your question."
      };
    }
  }

  /**
   * Get today's theatre schedule
   */
  private static async getTodaySchedule(): Promise<AIQueryResult> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      console.log('📅 Querying today schedule:', today);

      const casesRef = collection(db, 'cases');

      // Try without orderBy first to avoid index issues
      let snapshot;
      try {
        const q = query(casesRef, where('date', '==', today));
        snapshot = await getDocs(q);
        console.log('✓ Query successful, found', snapshot.size, 'cases');
      } catch (queryError) {
        console.error('❌ Query error:', queryError);
        // If query fails, try just getting all cases
        snapshot = await getDocs(casesRef);
        console.log('⚠️ Fallback: Retrieved all cases, total:', snapshot.size);
      }

      if (snapshot.empty) {
        return {
          success: true,
          message: "No cases scheduled for today. The theatre schedule is clear."
        };
      }

      // Filter and sort in memory
      let cases = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((c: any) => c.date === today);

      console.log('Filtered cases for today:', cases.length);

      // Sort by scheduledTime
      cases.sort((a: any, b: any) => {
        const timeA = a.scheduledTime || '';
        const timeB = b.scheduledTime || '';
        return timeA.localeCompare(timeB);
      });

      if (cases.length === 0) {
        return {
          success: true,
          message: "No cases scheduled for today. The theatre schedule is clear."
        };
      }

      let message = `📅 **Today's Schedule** (${cases.length} cases):\n\n`;

      cases.forEach((caseItem: any, index: number) => {
        message += `${index + 1}. **${caseItem.theatre || 'Theatre TBA'}** - ${caseItem.scheduledTime || 'Time TBA'}\n`;
        message += `   ${caseItem.procedureName || caseItem.procedure || 'Procedure TBA'}\n`;
        message += `   Surgeon: ${caseItem.surgeon || caseItem.consultant || 'TBA'}\n`;
        message += `   Status: ${caseItem.status || 'Scheduled'}\n\n`;
      });

      return {
        success: true,
        message,
        data: cases
      };
    } catch (error: any) {
      console.error('❌ getTodaySchedule error:', error);
      return {
        success: false,
        message: `Unable to retrieve today's schedule. Error: ${error.message || 'Unknown error'}`
      };
    }
  }

  /**
   * Get tomorrow's theatre schedule
   */
  private static async getTomorrowSchedule(): Promise<AIQueryResult> {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
      const tomorrowDisplay = format(tomorrow, 'EEEE, d MMMM yyyy');

      console.log('📅 Querying tomorrow schedule:', tomorrowStr);

      const casesRef = collection(db, 'cases');

      // Try without orderBy first to avoid index issues
      let snapshot;
      try {
        const q = query(casesRef, where('date', '==', tomorrowStr));
        snapshot = await getDocs(q);
        console.log('✓ Query successful, found', snapshot.size, 'cases');
      } catch (queryError) {
        console.error('❌ Query error:', queryError);
        // If query fails, try just getting all cases
        snapshot = await getDocs(casesRef);
        console.log('⚠️ Fallback: Retrieved all cases, total:', snapshot.size);
      }

      if (snapshot.empty) {
        return {
          success: true,
          message: `No cases scheduled for tomorrow (${tomorrowDisplay}). The theatre schedule is clear.`
        };
      }

      // Filter and sort in memory if needed
      let cases = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((c: any) => c.date === tomorrowStr);

      console.log('Filtered cases for tomorrow:', cases.length);

      // Sort by scheduledTime if available
      cases.sort((a: any, b: any) => {
        const timeA = a.scheduledTime || '';
        const timeB = b.scheduledTime || '';
        return timeA.localeCompare(timeB);
      });

      if (cases.length === 0) {
        return {
          success: true,
          message: `No cases scheduled for tomorrow (${tomorrowDisplay}). The theatre schedule is clear.`
        };
      }

      let message = `📅 **Tomorrow's Schedule** - ${tomorrowDisplay} (${cases.length} cases):\n\n`;

      cases.forEach((caseItem: any, index: number) => {
        message += `${index + 1}. **${caseItem.theatre || 'Theatre TBA'}** - ${caseItem.scheduledTime || 'Time TBA'}\n`;
        message += `   ${caseItem.procedureName || caseItem.procedure || 'Procedure TBA'}\n`;
        message += `   Surgeon: ${caseItem.surgeon || caseItem.consultant || 'TBA'}\n`;
        if (caseItem.priority) {
          message += `   Priority: ${caseItem.priority}\n`;
        }
        if (caseItem.estimatedDuration) {
          message += `   Duration: ${caseItem.estimatedDuration} min\n`;
        }
        message += '\n';
      });

      return {
        success: true,
        message,
        data: cases
      };
    } catch (error: any) {
      console.error('❌ getTomorrowSchedule error:', error);
      return {
        success: false,
        message: `Unable to retrieve tomorrow's schedule. Error: ${error.message || 'Unknown error'}`
      };
    }
  }

  /**
   * Get staff availability
   */
  private static async getStaffAvailability(): Promise<AIQueryResult> {
    try {
      const staffRef = collection(db, 'staff');
      const q = query(staffRef, where('isActive', '==', true));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: true,
          message: "No active staff members found in the system."
        };
      }

      const staff = snapshot.docs.map(doc => doc.data());

      // Group by role
      const byRole: { [key: string]: any[] } = {};
      staff.forEach((member: any) => {
        if (!byRole[member.role]) {
          byRole[member.role] = [];
        }
        byRole[member.role].push(member);
      });

      let message = `👥 **Staff Availability** (${staff.length} active):\n\n`;

      Object.entries(byRole).forEach(([role, members]) => {
        message += `**${role}s**: ${members.length}\n`;
        members.slice(0, 5).forEach((member: any) => {
          message += `  • ${member.firstName} ${member.lastName}`;
          if (member.specialties && member.specialties.length > 0) {
            message += ` (${member.specialties.join(', ')})`;
          }
          message += '\n';
        });
        if (members.length > 5) {
          message += `  ... and ${members.length - 5} more\n`;
        }
        message += '\n';
      });

      return {
        success: true,
        message,
        data: staff
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to retrieve staff availability. Please check your database connection."
      };
    }
  }

  /**
   * Get theatre-specific information
   */
  private static async getTheatreInfo(theatreNumber: string): Promise<AIQueryResult> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const casesRef = collection(db, 'cases');
      const q = query(
        casesRef,
        where('date', '==', today),
        where('theatre', '==', `Theatre ${theatreNumber}`)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: true,
          message: `🏥 **Theatre ${theatreNumber}**\n\nNo cases scheduled for today. Theatre is available.`
        };
      }

      const cases = snapshot.docs.map(doc => doc.data());
      let message = `🏥 **Theatre ${theatreNumber}** - ${cases.length} case(s) today:\n\n`;

      cases.forEach((caseItem: any, index: number) => {
        message += `${index + 1}. ${caseItem.scheduledTime} - ${caseItem.procedureName}\n`;
        message += `   Surgeon: ${caseItem.surgeon}\n`;
        message += `   Status: ${caseItem.status}\n`;
        message += `   Duration: ${caseItem.estimatedDuration} min\n\n`;
      });

      return {
        success: true,
        message,
        data: cases
      };
    } catch (error) {
      return {
        success: false,
        message: `Unable to retrieve information for Theatre ${theatreNumber}.`
      };
    }
  }

  /**
   * Get efficiency metrics
   */
  private static async getEfficiencyMetrics(): Promise<AIQueryResult> {
    try {
      const metricsRef = collection(db, 'theatre_efficiency');
      const q = query(metricsRef, orderBy('date', 'desc'), limit(7));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: true,
          message: "No performance metrics available yet. Metrics will be generated as cases are completed."
        };
      }

      const metrics = snapshot.docs.map(doc => doc.data());
      const latest = metrics[0];

      let message = `📊 **Performance Metrics**\n\n`;
      message += `**Latest Data:**\n`;
      message += `• Theatre Utilization: ${latest.utilization || 'N/A'}%\n`;
      message += `• On-Time Starts: ${latest.onTimeStarts || 'N/A'}%\n`;
      message += `• Average Turnover: ${latest.avgTurnover || 'N/A'} min\n`;
      message += `• Cases Completed: ${latest.casesCompleted || 'N/A'}\n\n`;

      if (metrics.length > 1) {
        message += `**7-Day Trend:**\n`;
        const avgUtil = metrics.reduce((sum, m) => sum + (m.utilization || 0), 0) / metrics.length;
        message += `• Average Utilization: ${avgUtil.toFixed(1)}%\n`;
      }

      return {
        success: true,
        message,
        data: metrics
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to retrieve performance metrics. Please check your database connection."
      };
    }
  }

  /**
   * Get theatre readiness status
   */
  private static async getTheatreReadiness(): Promise<AIQueryResult> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const allocationsRef = collection(db, 'theatreAllocations');
      const q = query(allocationsRef, where('date', '==', today));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: true,
          message: "No theatre allocations found for today."
        };
      }

      const allocations = snapshot.docs.map(doc => doc.data());
      let message = `✅ **Theatre Readiness Status**\n\n`;

      allocations.forEach((allocation: any) => {
        const status = allocation.status || 'Unknown';
        const emoji = status === 'active' ? '🟢' : status === 'scheduled' ? '🟡' : '⚪';
        message += `${emoji} **${allocation.theatre}**\n`;
        message += `   Specialty: ${allocation.specialty || 'Not assigned'}\n`;
        message += `   Status: ${status}\n`;
        message += `   Surgeon: ${allocation.surgeon || 'TBA'}\n\n`;
      });

      return {
        success: true,
        message,
        data: allocations
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to retrieve theatre readiness status."
      };
    }
  }

  /**
   * Get cases by priority
   */
  private static async getCasesByPriority(priority: string): Promise<AIQueryResult> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const casesRef = collection(db, 'cases');
      const q = query(
        casesRef,
        where('date', '==', today),
        where('priority', '==', priority)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return {
          success: true,
          message: `No ${priority} cases scheduled for today.`
        };
      }

      const cases = snapshot.docs.map(doc => doc.data());
      let message = `🏥 **${priority.charAt(0).toUpperCase() + priority.slice(1)} Cases** (${cases.length}):\n\n`;

      cases.forEach((caseItem: any, index: number) => {
        message += `${index + 1}. **${caseItem.theatre}** - ${caseItem.scheduledTime}\n`;
        message += `   ${caseItem.procedureName}\n`;
        message += `   Status: ${caseItem.status}\n\n`;
      });

      return {
        success: true,
        message,
        data: cases
      };
    } catch (error) {
      return {
        success: false,
        message: `Unable to retrieve ${priority} cases.`
      };
    }
  }
}
