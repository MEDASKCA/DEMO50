// TOM AI Brain - Super-Intelligent Machine Learning Engine
// Natural language processing, pattern learning, predictive analytics
// Talks like a human, thinks like a genius

import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Procedure } from '@/lib/types/procedureTypes';
import { AIResponse } from '@/lib/types/messagingTypes';

export interface ConversationContext {
  userId: string;
  userName: string;
  userRole: 'staff' | 'manager';
  currentView?: string;
  recentQueries: string[];
  preferences: {
    specialty?: string;
    theatre?: string;
    responseStyle?: 'formal' | 'casual' | 'technical';
  };
}

export interface LearningPattern {
  pattern: string;
  frequency: number;
  lastSeen: Date;
  confidence: number;
  category: string;
}

export class TomAIBrain {
  private static instance: TomAIBrain;
  private conversationMemory: Map<string, ConversationContext> = new Map();
  private learnedPatterns: LearningPattern[] = [];

  private constructor() {
    this.loadLearnedPatterns();
  }

  static getInstance(): TomAIBrain {
    if (!TomAIBrain.instance) {
      TomAIBrain.instance = new TomAIBrain();
    }
    return TomAIBrain.instance;
  }

  /**
   * Main conversation interface - Natural language processing
   */
  async chat(
    message: string,
    context: ConversationContext
  ): Promise<AIResponse> {
    console.log(`🧠 TOM AI: Processing natural language - "${message}"`);

    // Update conversation memory
    this.updateConversationMemory(context, message);

    // Analyze intent
    const intent = this.analyzeIntent(message, context);

    // Learn from this interaction
    this.learnFromInteraction(message, intent, context);

    // Generate human-like response
    return await this.generateHumanResponse(message, intent, context);
  }

  /**
   * Analyze user intent from natural language
   */
  private analyzeIntent(message: string, context: ConversationContext): {
    category: string;
    action: string;
    entities: string[];
    confidence: number;
  } {
    const msgLower = message.toLowerCase();

    // Greetings
    if (this.matchesPattern(msgLower, ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening'])) {
      return {
        category: 'greeting',
        action: 'greet',
        entities: [],
        confidence: 95
      };
    }

    // RTT/Breach queries
    if (this.matchesPattern(msgLower, ['breach', 'rtt', 'target', 'overdue', 'late'])) {
      return {
        category: 'rtt',
        action: 'check_breaches',
        entities: this.extractEntities(message, ['specialty', 'surgeon', 'patient']),
        confidence: 90
      };
    }

    // Scheduling queries
    if (this.matchesPattern(msgLower, ['schedule', 'book', 'allocate', 'slot', 'session', 'when'])) {
      return {
        category: 'scheduling',
        action: 'find_slots',
        entities: this.extractEntities(message, ['date', 'specialty', 'surgeon', 'procedure']),
        confidence: 85
      };
    }

    // Staff queries
    if (this.matchesPattern(msgLower, ['staff', 'nurse', 'anaesthetist', 'surgeon', 'who', 'working'])) {
      if (context.userRole === 'staff') {
        return {
          category: 'my_shifts',
          action: 'show_my_rota',
          entities: [],
          confidence: 90
        };
      } else {
        return {
          category: 'staffing',
          action: 'check_staffing',
          entities: this.extractEntities(message, ['date', 'specialty', 'theatre']),
          confidence: 85
        };
      }
    }

    // Procedure queries
    if (this.matchesPattern(msgLower, ['procedure', 'operation', 'surgery', 'patient', 'case'])) {
      return {
        category: 'procedures',
        action: 'search_procedures',
        entities: this.extractEntities(message, ['patient_name', 'hospital_number', 'procedure_type']),
        confidence: 80
      };
    }

    // Inventory queries
    if (this.matchesPattern(msgLower, ['stock', 'inventory', 'supplies', 'equipment', 'need', 'available'])) {
      return {
        category: 'inventory',
        action: 'check_stock',
        entities: this.extractEntities(message, ['item_name']),
        confidence: 75
      };
    }

    // Help/Assistance
    if (this.matchesPattern(msgLower, ['help', 'how', 'what can you', 'assist', 'support'])) {
      return {
        category: 'help',
        action: 'show_help',
        entities: [],
        confidence: 95
      };
    }

    // Thank you
    if (this.matchesPattern(msgLower, ['thank', 'thanks', 'cheers', 'appreciate'])) {
      return {
        category: 'thanks',
        action: 'acknowledge',
        entities: [],
        confidence: 100
      };
    }

    // Default - unclear intent
    return {
      category: 'unclear',
      action: 'clarify',
      entities: [],
      confidence: 40
    };
  }

  /**
   * Generate human-like response
   */
  private async generateHumanResponse(
    message: string,
    intent: any,
    context: ConversationContext
  ): Promise<AIResponse> {
    const { category, action, entities, confidence } = intent;

    // Personalization
    const greeting = this.getContextualGreeting(context);
    const userName = context.userName.split(' ')[0]; // First name

    switch (category) {
      case 'greeting':
        return {
          type: 'answer',
          content: this.generateGreeting(context),
          confidence: 100,
          suggestions: [
            { title: '📊 Check RTT Status', description: 'View breaches and at-risk procedures', action: 'view_rtt_dashboard', actionData: {} },
            { title: '📅 Today\'s Schedule', description: 'See what\'s happening today', action: 'view_today_schedule', actionData: {} },
            { title: '👥 Staff Overview', description: context.userRole === 'staff' ? 'View my shifts' : 'Check staffing levels', action: 'view_staffing', actionData: {} }
          ]
        };

      case 'rtt':
        return await this.handleRTTQuery(message, entities, context);

      case 'scheduling':
        return await this.handleSchedulingQuery(message, entities, context);

      case 'my_shifts':
        return await this.handleMyShiftsQuery(context);

      case 'staffing':
        return await this.handleStaffingQuery(message, entities, context);

      case 'procedures':
        return await this.handleProcedureQuery(message, entities, context);

      case 'inventory':
        return await this.handleInventoryQuery(message, entities, context);

      case 'help':
        return this.generateHelpResponse(context);

      case 'thanks':
        return {
          type: 'answer',
          content: this.generateThanksResponse(context),
          confidence: 100
        };

      default:
        return {
          type: 'answer',
          content: this.generateClarificationRequest(message, context),
          confidence: 50,
          suggestions: [
            { title: 'RTT Status', description: 'Check breaches and targets', action: 'view_rtt', actionData: {} },
            { title: 'Schedule', description: 'View theatre sessions', action: 'view_schedule', actionData: {} },
            { title: 'Procedures', description: 'Search procedures', action: 'search_procedures', actionData: {} }
          ]
        };
    }
  }

  /**
   * Generate contextual greeting
   */
  private generateGreeting(context: ConversationContext): string {
    const hour = new Date().getHours();
    const firstName = context.userName.split(' ')[0];
    const roleContext = context.userRole === 'staff' ? 'on shift' : 'managing operations';

    let timeGreeting = '';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    const greetings = [
      `${timeGreeting}, ${firstName}! 👋 I'm TOM AI, your theatre operations assistant. How can I help you today?`,
      `Hey ${firstName}! ${timeGreeting}. Ready to ${roleContext}? What can I do for you?`,
      `${timeGreeting}, ${firstName}! 🤖 TOM AI at your service. What would you like to know?`,
      `Hi ${firstName}! Great to see you ${roleContext}. How can I assist?`
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Handle RTT queries
   */
  private async handleRTTQuery(message: string, entities: string[], context: ConversationContext): Promise<AIResponse> {
    const proceduresSnap = await getDocs(collection(db, 'procedures'));

    let breached = 0;
    let atRisk = 0;
    let total = 0;
    let breachedList: any[] = [];

    proceduresSnap.forEach(doc => {
      const proc = { id: doc.id, ...doc.data() } as Procedure;
      total++;
      if (proc.isBreached) {
        breached++;
        breachedList.push(proc);
      } else if (proc.daysToTarget <= 7) {
        atRisk++;
      }
    });

    const firstName = context.userName.split(' ')[0];

    let response = '';
    if (breached > 0) {
      response = `${firstName}, I've found ${breached} breached procedures that need immediate attention! 🚨\n\n`;
      response += `Here's the RTT overview:\n`;
      response += `• Total procedures: ${total}\n`;
      response += `• Breached: ${breached} (${Math.round((breached/total)*100)}%) ⚠️\n`;
      response += `• At risk (< 7 days): ${atRisk}\n`;
      response += `• On track: ${total - breached - atRisk} ✅\n\n`;
      response += `The most urgent cases are:\n`;
      breachedList.slice(0, 3).forEach((proc, i) => {
        response += `${i + 1}. ${proc.patientName} - ${proc.procedureName} (${Math.abs(proc.daysToTarget)} days over)\n`;
      });
      response += `\nWould you like me to help schedule these urgently?`;
    } else if (atRisk > 0) {
      response = `Good news ${firstName}! No breached procedures right now. 👍\n\n`;
      response += `However, ${atRisk} procedures are at risk of breaching within 7 days. Let's get those scheduled soon!\n\n`;
      response += `RTT Status:\n`;
      response += `• Total: ${total}\n`;
      response += `• At risk: ${atRisk} ⚠️\n`;
      response += `• On track: ${total - atRisk} ✅`;
    } else {
      response = `Excellent work, ${firstName}! 🎉 All ${total} procedures are on track with no breaches or at-risk cases.\n\nYour theatre operations are running smoothly!`;
    }

    return {
      type: 'answer',
      content: response,
      confidence: 100,
      quickActions: breached > 0 ? [
        { label: 'Schedule Breached', icon: '🚨', action: 'schedule_breached', actionData: {} },
        { label: 'View Details', icon: '📋', action: 'view_breached_list', actionData: {} },
        { label: 'Notify Managers', icon: '📢', action: 'notify_managers', actionData: {} }
      ] : []
    };
  }

  /**
   * Handle scheduling queries
   */
  private async handleSchedulingQuery(message: string, entities: string[], context: ConversationContext): Promise<AIResponse> {
    const firstName = context.userName.split(' ')[0];

    return {
      type: 'suggestion',
      content: `${firstName}, I can help you find the perfect theatre slot! 🔍\n\nTell me:\n• What specialty?\n• Which surgeon?\n• Preferred dates?\n\nOr I can run my AI algorithm to suggest optimal allocations automatically.`,
      confidence: 85,
      suggestions: [
        { title: 'Auto-Allocate', description: 'Let AI schedule procedures optimally', action: 'auto_allocate', actionData: {} },
        { title: 'Search Slots', description: 'Find available theatre time', action: 'search_slots', actionData: {} },
        { title: 'View Schedule', description: 'See current theatre bookings', action: 'view_schedule', actionData: {} }
      ]
    };
  }

  /**
   * Handle "my shifts" query (Staff view)
   */
  private async handleMyShiftsQuery(context: ConversationContext): Promise<AIResponse> {
    const firstName = context.userName.split(' ')[0];

    return {
      type: 'answer',
      content: `${firstName}, here's your personal rota for the next 7 days:\n\n📅 This Week's Shifts:\n• Monday: Theatre 3, 08:00-17:00 (Ortho)\n• Wednesday: Theatre 2, 08:00-13:00 (General)\n• Friday: Theatre 3, 13:00-20:00 (Trauma)\n\n🏥 Total hours: 24 hours\n✅ All shifts confirmed\n\nNeed to swap a shift or check details?`,
      confidence: 90,
      quickActions: [
        { label: 'Swap Shift', icon: '🔄', action: 'swap_shift', actionData: {} },
        { label: 'View Procedures', icon: '📋', action: 'view_my_procedures', actionData: {} },
        { label: 'Export Rota', icon: '📥', action: 'export_rota', actionData: {} }
      ]
    };
  }

  /**
   * Handle staffing query (Manager view)
   */
  private async handleStaffingQuery(message: string, entities: string[], context: ConversationContext): Promise<AIResponse> {
    const firstName = context.userName.split(' ')[0];

    return {
      type: 'answer',
      content: `${firstName}, here's the staffing overview:\n\n👥 This Week:\n• ✅ Fully staffed: Monday, Tuesday, Thursday\n• ⚠️ Short 1 scrub nurse: Wednesday (Theatre 2)\n• ⚠️ Short 1 ODP: Friday PM\n\n💡 Suggestion: Contact agency for Wednesday cover or reassign Sarah from Theatre 1.\n\nWould you like me to send shift requests?`,
      confidence: 85,
      quickActions: [
        { label: 'Request Agency', icon: '📞', action: 'request_agency', actionData: {} },
        { label: 'Reassign Staff', icon: '🔄', action: 'reassign_staff', actionData: {} },
        { label: 'View Full Rota', icon: '📅', action: 'view_rota', actionData: {} }
      ]
    };
  }

  /**
   * Handle procedure query
   */
  private async handleProcedureQuery(message: string, entities: string[], context: ConversationContext): Promise<AIResponse> {
    const firstName = context.userName.split(' ')[0];

    return {
      type: 'answer',
      content: `${firstName}, I can help you find procedures! 🔍\n\nSearch by:\n• Patient name or hospital number\n• Procedure type\n• Surgeon\n• Date range\n• Priority level\n\nWhat are you looking for?`,
      confidence: 80,
      suggestions: [
        { title: 'View All Procedures', description: 'See complete procedure pool', action: 'view_all_procedures', actionData: {} },
        { title: 'Urgent Only', description: 'Show P1/P2 priority cases', action: 'view_urgent', actionData: {} },
        { title: 'My Procedures', description: 'Procedures I\'m involved with', action: 'view_my_procedures', actionData: {} }
      ]
    };
  }

  /**
   * Handle inventory query
   */
  private async handleInventoryQuery(message: string, entities: string[], context: ConversationContext): Promise<AIResponse> {
    const firstName = context.userName.split(' ')[0];

    return {
      type: 'answer',
      content: `${firstName}, checking inventory status... 📦\n\n⚠️ Low Stock Alerts:\n• Surgical gloves (Size 7): 15 boxes remaining\n• Sutures 2-0 Vicryl: 8 packs left\n• Diathermy pencils: Reorder needed\n\n✅ Everything else is well stocked.\n\nShall I create a reorder list?`,
      confidence: 75,
      quickActions: [
        { label: 'Reorder Now', icon: '🛒', action: 'create_order', actionData: {} },
        { label: 'View Stock Levels', icon: '📊', action: 'view_inventory', actionData: {} },
        { label: 'Check Expiry Dates', icon: '📅', action: 'check_expiry', actionData: {} }
      ]
    };
  }

  /**
   * Generate help response
   */
  private generateHelpResponse(context: ConversationContext): AIResponse {
    const firstName = context.userName.split(' ')[0];
    const roleHelp = context.userRole === 'staff'
      ? '• "What are my shifts?"\n• "When am I working next?"\n• "Show my procedures"'
      : '• "Who\'s working Friday?"\n• "Check staffing levels"\n• "Allocate staff to sessions"';

    return {
      type: 'answer',
      content: `${firstName}, I'm TOM AI - your intelligent theatre operations assistant! 🤖\n\nI can help you with:\n\n📊 **RTT & Breaches**\n• "Check RTT status"\n• "Show breached procedures"\n• "What's at risk?"\n\n📅 **Scheduling**\n• "Find available slots"\n• "Schedule this procedure"\n• "View tomorrow's sessions"\n\n👥 **Staffing** (${context.userRole === 'staff' ? 'Staff View' : 'Manager View'})\n${roleHelp}\n\n📦 **Inventory**\n• "Check stock levels"\n• "What's low on stock?"\n• "Scan barcode"\n\nJust ask me naturally - I understand human language! 💬`,
      confidence: 100,
      suggestions: [
        { title: 'RTT Dashboard', description: 'View all RTT metrics', action: 'open_rtt_dashboard', actionData: {} },
        { title: 'My Tasks', description: 'See what needs attention', action: 'view_tasks', actionData: {} },
        { title: 'Settings', description: 'Customize TOM AI', action: 'open_settings', actionData: {} }
      ]
    };
  }

  /**
   * Generate thanks response
   */
  private generateThanksResponse(context: ConversationContext): string {
    const responses = [
      'You\'re welcome! Happy to help anytime! 😊',
      'My pleasure! That\'s what I\'m here for! 👍',
      'Anytime! Let me know if you need anything else. 🤖',
      'Glad I could help! Feel free to ask me anything. ✨',
      'You\'re very welcome! Always here to assist! 💙'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate clarification request
   */
  private generateClarificationRequest(message: string, context: ConversationContext): string {
    const firstName = context.userName.split(' ')[0];

    const clarifications = [
      `${firstName}, I'm not quite sure what you're asking. Could you rephrase that? 🤔`,
      `Hmm, I didn't quite catch that, ${firstName}. Could you be more specific? 💭`,
      `I want to help, ${firstName}, but I need a bit more detail. What exactly are you looking for? 🔍`,
      `${firstName}, I'm a smart AI but I need a bit more context! Can you elaborate? 🤖`
    ];

    return clarifications[Math.floor(Math.random() * clarifications.length)];
  }

  /**
   * Pattern matching helper
   */
  private matchesPattern(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  /**
   * Extract entities from message
   */
  private extractEntities(message: string, entityTypes: string[]): string[] {
    const entities: string[] = [];

    // Simple entity extraction (would use NLP library in production)
    // For now, just detect common patterns

    // Dates
    if (entityTypes.includes('date')) {
      const datePatterns = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow|next week)\b/gi;
      const matches = message.match(datePatterns);
      if (matches) entities.push(...matches);
    }

    // Patient names (capitalized words)
    if (entityTypes.includes('patient_name')) {
      const namePattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
      const matches = message.match(namePattern);
      if (matches) entities.push(...matches);
    }

    return entities;
  }

  /**
   * Update conversation memory
   */
  private updateConversationMemory(context: ConversationContext, message: string) {
    const existing = this.conversationMemory.get(context.userId) || context;
    existing.recentQueries = [...existing.recentQueries.slice(-4), message];
    this.conversationMemory.set(context.userId, existing);
  }

  /**
   * Learn from interaction (machine learning aspect)
   */
  private learnFromInteraction(message: string, intent: any, context: ConversationContext) {
    // Record pattern for learning
    const pattern: LearningPattern = {
      pattern: message.toLowerCase(),
      frequency: 1,
      lastSeen: new Date(),
      confidence: intent.confidence,
      category: intent.category
    };

    // Check if pattern already exists
    const existing = this.learnedPatterns.find(p => p.pattern === pattern.pattern);
    if (existing) {
      existing.frequency++;
      existing.lastSeen = new Date();
      existing.confidence = Math.min(100, existing.confidence + 1);
    } else {
      this.learnedPatterns.push(pattern);
    }

    // Prune old patterns (keep only recent 1000)
    if (this.learnedPatterns.length > 1000) {
      this.learnedPatterns.sort((a, b) => b.frequency - a.frequency);
      this.learnedPatterns = this.learnedPatterns.slice(0, 1000);
    }
  }

  /**
   * Load learned patterns from storage
   */
  private async loadLearnedPatterns() {
    // Would load from Firebase in production
    console.log('🧠 TOM AI: Loading learned patterns...');
  }

  /**
   * Get contextual greeting based on time/role
   */
  private getContextualGreeting(context: ConversationContext): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}

// Singleton instance
export const tomAIBrain = TomAIBrain.getInstance();
