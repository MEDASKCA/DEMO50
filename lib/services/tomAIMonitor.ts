// TOM AI Monitor - The JARVIS Brain for NHS Theatres
// Monitors ALL database changes in real-time and generates intelligent notifications
// Powers proactive alerts, suggestions, and communications

import { collection, query, onSnapshot, addDoc, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AIActivityEvent, Notification, NotificationPriority, AIResponse } from '@/lib/types/messagingTypes';
import { Procedure } from '@/lib/types/procedureTypes';

export class TomAIMonitor {
  private static instance: TomAIMonitor;
  private listeners: (() => void)[] = [];
  private isMonitoring: boolean = false;

  private constructor() {}

  static getInstance(): TomAIMonitor {
    if (!TomAIMonitor.instance) {
      TomAIMonitor.instance = new TomAIMonitor();
    }
    return TomAIMonitor.instance;
  }

  /**
   * Start monitoring all database changes
   */
  startMonitoring() {
    if (this.isMonitoring) {
      console.log('🤖 TOM AI: Already monitoring');
      return;
    }

    console.log('🤖 TOM AI: Initializing Jarvis-level monitoring...');

    this.monitorProcedures();
    this.monitorSessions();
    this.monitorStaff();
    this.monitorInventory();
    this.monitorUsers();

    this.isMonitoring = true;
    console.log('✅ TOM AI: Fully operational - monitoring all systems');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
    this.isMonitoring = false;
    console.log('🤖 TOM AI: Monitoring stopped');
  }

  /**
   * Monitor procedures in real-time
   */
  private monitorProcedures() {
    const q = query(collection(db, 'procedures'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const procedure = { id: change.doc.id, ...change.doc.data() } as Procedure;

        if (change.type === 'added') {
          await this.onProcedureCreated(procedure);
        } else if (change.type === 'modified') {
          await this.onProcedureUpdated(procedure, change);
        } else if (change.type === 'removed') {
          await this.onProcedureDeleted(procedure);
        }
      });
    });

    this.listeners.push(unsubscribe);
  }

  /**
   * Monitor sessions
   */
  private monitorSessions() {
    const q = query(collection(db, 'theatreSessions'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const session = { id: change.doc.id, ...change.doc.data() };

        if (change.type === 'added') {
          await this.onSessionCreated(session);
        } else if (change.type === 'modified') {
          await this.onSessionUpdated(session);
        }
      });
    });

    this.listeners.push(unsubscribe);
  }

  /**
   * Monitor staff allocations
   */
  private monitorStaff() {
    const q = query(collection(db, 'staffAllocations'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const allocation = { id: change.doc.id, ...change.doc.data() };

        if (change.type === 'added' || change.type === 'modified') {
          await this.analyzeStaffAllocation(allocation);
        }
      });
    });

    this.listeners.push(unsubscribe);
  }

  /**
   * Monitor inventory
   */
  private monitorInventory() {
    const q = query(collection(db, 'inventory'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const item = { id: change.doc.id, ...change.doc.data() };

        if (change.type === 'modified') {
          await this.analyzeInventoryChange(item);
        }
      });
    });

    this.listeners.push(unsubscribe);
  }

  /**
   * Monitor user activity
   */
  private monitorUsers() {
    const q = query(collection(db, 'activityLog'), orderBy('timestamp', 'desc'), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const activity = { id: change.doc.id, ...change.doc.data() };
          await this.logUserActivity(activity);
        }
      });
    });

    this.listeners.push(unsubscribe);
  }

  /**
   * AI Analysis: New Procedure Created
   */
  private async onProcedureCreated(procedure: Procedure) {
    console.log(`🤖 TOM AI: New procedure detected - ${procedure.procedureName} for ${procedure.patientName}`);

    // Create activity event
    const event: Omit<AIActivityEvent, 'id'> = {
      type: 'procedure_created',
      entity: 'procedure',
      entityId: procedure.id,
      summary: `New procedure: ${procedure.procedureName}`,
      details: `${procedure.patientName} (${procedure.hospitalNumber}) - ${procedure.procedureName}`,
      timestamp: new Date(),
      aiAnalysis: this.analyzeProcedure(procedure),
      aiSuggestions: this.generateProcedureSuggestions(procedure),
      requiresAction: procedure.isBreached || procedure.daysToTarget <= 7,
      actionPriority: this.determinePriority(procedure),
      affectedUsers: await this.getAffectedUsers(procedure),
      notifiedUsers: []
    };

    await this.saveActivity(event);

    // Generate notifications
    if (procedure.isBreached) {
      await this.sendBreachAlert(procedure);
    } else if (procedure.daysToTarget <= 7) {
      await this.sendAtRiskAlert(procedure);
    }

    // AI suggestion for scheduling
    if (procedure.schedulingStatus === 'Awaiting') {
      await this.suggestScheduling(procedure);
    }
  }

  /**
   * AI Analysis: Procedure Updated
   */
  private async onProcedureUpdated(procedure: Procedure, change: any) {
    console.log(`🤖 TOM AI: Procedure updated - ${procedure.procedureName}`);

    const oldData = change.doc.data();
    const changes: any[] = [];

    // Detect what changed
    if (oldData.schedulingStatus !== procedure.schedulingStatus) {
      changes.push({
        field: 'schedulingStatus',
        oldValue: oldData.schedulingStatus,
        newValue: procedure.schedulingStatus
      });

      if (procedure.schedulingStatus === 'Scheduled') {
        await this.sendScheduledNotification(procedure);
      } else if (procedure.schedulingStatus === 'Cancelled') {
        await this.sendCancelledNotification(procedure);
      }
    }

    if (oldData.isBreached === false && procedure.isBreached === true) {
      // Just breached!
      await this.sendBreachAlert(procedure);
    }

    // Log activity
    if (changes.length > 0) {
      const event: Omit<AIActivityEvent, 'id'> = {
        type: 'procedure_updated',
        entity: 'procedure',
        entityId: procedure.id,
        summary: `Procedure updated: ${procedure.procedureName}`,
        details: `Changes: ${changes.map(c => c.field).join(', ')}`,
        changes,
        timestamp: new Date(),
        aiAnalysis: `Status changed from ${oldData.schedulingStatus} to ${procedure.schedulingStatus}`,
        requiresAction: false,
        affectedUsers: await this.getAffectedUsers(procedure),
        notifiedUsers: []
      };

      await this.saveActivity(event);
    }
  }

  /**
   * AI Analysis: Procedure Deleted/Cancelled
   */
  private async onProcedureDeleted(procedure: Procedure) {
    console.log(`🤖 TOM AI: Procedure deleted - ${procedure.procedureName}`);

    await this.sendCancelledNotification(procedure);
  }

  /**
   * AI Analysis: Session Created
   */
  private async onSessionCreated(session: any) {
    console.log(`🤖 TOM AI: New session created - ${session.theatre} on ${session.date}`);

    const event: Omit<AIActivityEvent, 'id'> = {
      type: 'session_created',
      entity: 'session',
      entityId: session.id,
      summary: `New session: ${session.theatre}`,
      details: `${session.specialty} - ${session.date} ${session.sessionType}`,
      timestamp: new Date(),
      aiAnalysis: `Available session created with ${session.availableMinutes} minutes capacity`,
      aiSuggestions: [`Consider allocating waiting ${session.specialty} procedures to this session`],
      requiresAction: false,
      affectedUsers: [],
      notifiedUsers: []
    };

    await this.saveActivity(event);
  }

  /**
   * AI Analysis: Session Updated
   */
  private async onSessionUpdated(session: any) {
    // Check if session is now full
    if (session.utilization >= 95 && session.status !== 'Fully Booked') {
      const event: Omit<AIActivityEvent, 'id'> = {
        type: 'session_full',
        entity: 'session',
        entityId: session.id,
        summary: `Session almost full: ${session.theatre}`,
        details: `${session.specialty} - ${session.date} is now ${session.utilization}% utilized`,
        timestamp: new Date(),
        aiAnalysis: `This session is nearly at capacity. Consider creating additional sessions for ${session.specialty}.`,
        aiSuggestions: [
          `Create another ${session.specialty} session on ${session.date}`,
          `Review unallocated ${session.specialty} procedures`
        ],
        requiresAction: true,
        actionPriority: 'normal',
        affectedUsers: [],
        notifiedUsers: []
      };

      await this.saveActivity(event);
    }
  }

  /**
   * AI Analysis: Staff Allocation
   */
  private async analyzeStaffAllocation(allocation: any) {
    // Check for staff shortages
    const required = allocation.required || {};
    const allocated = allocation.allocated || {};

    const shortages: string[] = [];

    for (const [role, count] of Object.entries(required)) {
      const allocatedCount = allocated[role] || 0;
      if (allocatedCount < (count as number)) {
        shortages.push(`${role}: need ${(count as number) - allocatedCount} more`);
      }
    }

    if (shortages.length > 0) {
      const event: Omit<AIActivityEvent, 'id'> = {
        type: 'staff_shortage',
        entity: 'staff',
        entityId: allocation.id,
        summary: `Staff shortage detected`,
        details: shortages.join(', '),
        timestamp: new Date(),
        aiAnalysis: `Session on ${allocation.date} has insufficient staff`,
        aiSuggestions: [
          `Contact agency for temporary staff`,
          `Reassign staff from other sessions`,
          `Consider rescheduling non-urgent procedures`
        ],
        requiresAction: true,
        actionPriority: 'high',
        affectedUsers: [],
        notifiedUsers: []
      };

      await this.saveActivity(event);
    }
  }

  /**
   * AI Analysis: Inventory Change
   */
  private async analyzeInventoryChange(item: any) {
    // Check for low stock
    if (item.currentStock <= item.reorderLevel) {
      const event: Omit<AIActivityEvent, 'id'> = {
        type: 'inventory_low',
        entity: 'inventory',
        entityId: item.id,
        summary: `Low stock: ${item.name}`,
        details: `Only ${item.currentStock} ${item.unitOfMeasure} remaining`,
        timestamp: new Date(),
        aiAnalysis: `Stock level has fallen below reorder point`,
        aiSuggestions: [
          `Reorder ${item.reorderQuantity} ${item.unitOfMeasure}`,
          `Check upcoming procedures requiring this item`,
          `Consider alternative suppliers`
        ],
        requiresAction: true,
        actionPriority: item.currentStock === 0 ? 'urgent' : 'normal',
        affectedUsers: [],
        notifiedUsers: []
      };

      await this.saveActivity(event);
    }

    // Check for expiry
    if (item.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      const daysToExpiry = Math.floor((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

      if (daysToExpiry <= 30 && daysToExpiry > 0) {
        const event: Omit<AIActivityEvent, 'id'> = {
          type: 'inventory_expired',
          entity: 'inventory',
          entityId: item.id,
          summary: `Expiring soon: ${item.name}`,
          details: `Expires in ${daysToExpiry} days`,
          timestamp: new Date(),
          aiAnalysis: `Item approaching expiry date`,
          aiSuggestions: [
            `Use this item in upcoming procedures`,
            `Return to supplier if unopened`,
            `Adjust reorder quantities to reduce waste`
          ],
          requiresAction: true,
          actionPriority: daysToExpiry <= 7 ? 'high' : 'normal',
          affectedUsers: [],
          notifiedUsers: []
        };

        await this.saveActivity(event);
      }
    }
  }

  /**
   * Log user activity
   */
  private async logUserActivity(activity: any) {
    console.log(`🤖 TOM AI: User activity - ${activity.userName}: ${activity.action}`);
  }

  /**
   * Analyze procedure and provide insights
   */
  private analyzeProcedure(procedure: Procedure): string {
    const insights: string[] = [];

    if (procedure.isBreached) {
      insights.push(`⚠️ BREACHED: ${Math.abs(procedure.daysToTarget)} days over RTT target`);
    } else if (procedure.daysToTarget <= 7) {
      insights.push(`⚡ AT RISK: Will breach in ${procedure.daysToTarget} days`);
    }

    if (procedure.priority === 'P1') {
      insights.push(`🚨 URGENT: P1 priority - must be scheduled within 72 hours`);
    } else if (procedure.priority === 'P2') {
      insights.push(`⚠️ URGENT: P2 priority - ${procedure.pathway === 'Cancer' ? '2-week cancer wait' : 'expedited'}`);
    }

    if (procedure.complexity === 'Complex Major') {
      insights.push(`🏥 COMPLEX: Requires specialist staff and extended theatre time`);
    }

    if (procedure.estimatedDuration > 120) {
      insights.push(`⏱️ LONG PROCEDURE: ${procedure.estimatedDuration} minutes - plan accordingly`);
    }

    return insights.length > 0 ? insights.join(' | ') : 'Standard procedure - no special considerations';
  }

  /**
   * Generate AI suggestions for procedure
   */
  private generateProcedureSuggestions(procedure: Procedure): string[] {
    const suggestions: string[] = [];

    if (procedure.isBreached) {
      suggestions.push(`Schedule immediately - patient already breached RTT target`);
      suggestions.push(`Consider escalation to theatre coordinator`);
    } else if (procedure.daysToTarget <= 7) {
      suggestions.push(`Schedule within next 7 days to avoid breach`);
    } else if (procedure.daysToTarget <= 14) {
      suggestions.push(`Schedule within next 2 weeks`);
    }

    if (procedure.complexity === 'Complex Major') {
      suggestions.push(`Ensure experienced ${procedure.specialty} surgeon is available`);
      suggestions.push(`Book extended theatre slot (${procedure.estimatedDuration}+ minutes)`);
    }

    if (procedure.pathway === 'Cancer') {
      suggestions.push(`Prioritize for cancer pathway targets`);
    }

    return suggestions;
  }

  /**
   * Determine notification priority
   */
  private determinePriority(procedure: Procedure): NotificationPriority {
    if (procedure.priority === 'P1') return 'critical';
    if (procedure.isBreached) return 'urgent';
    if (procedure.priority === 'P2') return 'high';
    if (procedure.daysToTarget <= 7) return 'high';
    if (procedure.daysToTarget <= 14) return 'normal';
    return 'low';
  }

  /**
   * Get affected users for a procedure
   */
  private async getAffectedUsers(procedure: Procedure): Promise<string[]> {
    const users: string[] = [];

    // Surgeon
    if (procedure.surgeonId) {
      users.push(procedure.surgeonId);
    }

    // Theatre coordinators for this specialty
    // Theatre managers
    // (Would query user database in real implementation)

    return users;
  }

  /**
   * Send breach alert
   */
  private async sendBreachAlert(procedure: Procedure) {
    const notification: Omit<Notification, 'id'> = {
      userId: 'all-managers', // Broadcast to all managers
      type: 'breach',
      priority: 'critical',
      title: '🚨 RTT Breach Alert',
      body: `${procedure.patientName} (${procedure.procedureName}) is ${Math.abs(procedure.daysToTarget)} days over RTT target`,
      actionUrl: `/admin/procedures-pool?id=${procedure.id}`,
      actionLabel: 'Schedule Now',
      procedureId: procedure.id,
      isRead: false,
      timestamp: new Date(),
      isAIGenerated: true,
      aiConfidence: 100,
      aiReasoning: 'RTT target exceeded - immediate action required'
    };

    await addDoc(collection(db, 'notifications'), notification);
  }

  /**
   * Send at-risk alert
   */
  private async sendAtRiskAlert(procedure: Procedure) {
    const notification: Omit<Notification, 'id'> = {
      userId: procedure.surgeonId,
      type: 'alert',
      priority: 'high',
      title: '⚠️ RTT At Risk',
      body: `${procedure.patientName} will breach in ${procedure.daysToTarget} days if not scheduled soon`,
      actionUrl: `/admin/procedures-pool?id=${procedure.id}`,
      actionLabel: 'Schedule',
      procedureId: procedure.id,
      isRead: false,
      timestamp: new Date(),
      isAIGenerated: true,
      aiConfidence: 95
    };

    await addDoc(collection(db, 'notifications'), notification);
  }

  /**
   * Suggest scheduling
   */
  private async suggestScheduling(procedure: Procedure) {
    // Would analyze available sessions and suggest optimal slot
    // (Full implementation would use session allocation service)
  }

  /**
   * Send scheduled notification
   */
  private async sendScheduledNotification(procedure: Procedure) {
    const notification: Omit<Notification, 'id'> = {
      userId: procedure.surgeonId,
      type: 'message',
      priority: 'normal',
      title: '✅ Procedure Scheduled',
      body: `${procedure.patientName} - ${procedure.procedureName} has been scheduled`,
      actionUrl: `/admin/procedures-pool?id=${procedure.id}`,
      actionLabel: 'View Details',
      procedureId: procedure.id,
      isRead: false,
      timestamp: new Date(),
      isAIGenerated: true
    };

    await addDoc(collection(db, 'notifications'), notification);
  }

  /**
   * Send cancelled notification
   */
  private async sendCancelledNotification(procedure: Procedure) {
    const notification: Omit<Notification, 'id'> = {
      userId: procedure.surgeonId,
      type: 'alert',
      priority: 'normal',
      title: '❌ Procedure Cancelled',
      body: `${procedure.patientName} - ${procedure.procedureName} has been cancelled`,
      procedureId: procedure.id,
      isRead: false,
      timestamp: new Date(),
      isAIGenerated: true
    };

    await addDoc(collection(db, 'notifications'), notification);
  }

  /**
   * Save activity event
   */
  private async saveActivity(event: Omit<AIActivityEvent, 'id'>) {
    try {
      await addDoc(collection(db, 'aiActivityEvents'), event);
    } catch (error) {
      console.error('Error saving activity event:', error);
    }
  }

  /**
   * Ask TOM AI a question
   */
  async askTOM(question: string, context?: any): Promise<AIResponse> {
    console.log(`🤖 TOM AI: Processing question - "${question}"`);

    // Analyze question
    const questionLower = question.toLowerCase();

    // Check for specific intents
    if (questionLower.includes('breach') || questionLower.includes('rtt')) {
      return await this.analyzeRTTStatus();
    } else if (questionLower.includes('schedule') || questionLower.includes('session')) {
      return await this.analyzeScheduling();
    } else if (questionLower.includes('staff') || questionLower.includes('shortage')) {
      return await this.analyzeStaffing();
    } else if (questionLower.includes('inventory') || questionLower.includes('stock')) {
      return await this.analyzeInventory();
    }

    // Default response
    return {
      type: 'answer',
      content: 'I\'m TOM AI, your Jarvis for Theatre Operations. I can help you with RTT monitoring, scheduling, staffing, inventory, and more. What would you like to know?',
      confidence: 80,
      suggestions: [
        { title: 'Check RTT Breaches', description: 'View all breached procedures', action: 'view_breaches', actionData: {} },
        { title: 'Optimize Schedule', description: 'AI-powered session allocation', action: 'optimize_schedule', actionData: {} },
        { title: 'Staff Analysis', description: 'Check staffing levels', action: 'analyze_staff', actionData: {} },
        { title: 'Inventory Status', description: 'View low stock items', action: 'check_inventory', actionData: {} }
      ]
    };
  }

  /**
   * Analyze RTT status
   */
  private async analyzeRTTStatus(): Promise<AIResponse> {
    const proceduresSnap = await getDocs(collection(db, 'procedures'));
    let breached = 0;
    let atRisk = 0;
    let total = 0;

    proceduresSnap.forEach(doc => {
      const proc = doc.data() as Procedure;
      total++;
      if (proc.isBreached) breached++;
      else if (proc.daysToTarget <= 7) atRisk++;
    });

    return {
      type: 'answer',
      content: `RTT Status Analysis:\n\n📊 Total Procedures: ${total}\n🚨 Breached: ${breached} (${Math.round((breached/total)*100)}%)\n⚠️ At Risk: ${atRisk} (${Math.round((atRisk/total)*100)}%)\n✅ On Track: ${total - breached - atRisk}`,
      confidence: 100,
      quickActions: [
        { label: 'View Breached', icon: '🚨', action: 'view_breached', actionData: {} },
        { label: 'Schedule At Risk', icon: '⚠️', action: 'schedule_at_risk', actionData: {} }
      ]
    };
  }

  private async analyzeScheduling(): Promise<AIResponse> {
    return {
      type: 'suggestion',
      content: 'I can analyze your theatre schedule and suggest optimal allocations. Would you like me to run the AI scheduling algorithm?',
      confidence: 90,
      suggestions: [
        { title: 'Auto-Allocate Procedures', description: 'Let AI allocate procedures to sessions', action: 'auto_allocate', actionData: {} },
        { title: 'Find Available Slots', description: 'Search for free theatre time', action: 'find_slots', actionData: {} }
      ]
    };
  }

  private async analyzeStaffing(): Promise<AIResponse> {
    return {
      type: 'answer',
      content: 'Staffing analysis coming soon. This feature will monitor staff allocations in real-time.',
      confidence: 70
    };
  }

  private async analyzeInventory(): Promise<AIResponse> {
    return {
      type: 'answer',
      content: 'Inventory analysis coming soon. This feature will track stock levels and expiry dates.',
      confidence: 70
    };
  }
}

// Singleton instance
export const tomAI = TomAIMonitor.getInstance();
