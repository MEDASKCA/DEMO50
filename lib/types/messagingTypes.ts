// TOM AI Messaging Types - WhatsApp/Messenger/Telegram Combined
// Real-time communication system with AI intelligence

export type MessageType =
  | 'text'              // Regular text message
  | 'image'             // Image/photo
  | 'file'              // Document/file
  | 'voice'             // Voice message
  | 'video'             // Video message
  | 'location'          // Location (theatre location)
  | 'procedure'         // Shared procedure card
  | 'alert'             // System alert
  | 'suggestion'        // AI suggestion
  | 'notification'      // System notification
  | 'poll'              // Quick poll (yes/no, multiple choice)
  | 'reaction';         // Reaction to message (like, thumbs up, etc.)

export type RoomType =
  | 'direct'            // 1-on-1 chat
  | 'procedure'         // Procedure-specific room
  | 'theatre'           // Theatre-specific room
  | 'team'              // Team room (all scrub nurses, all anaesthetists, etc.)
  | 'specialty'         // Specialty room (all ortho staff)
  | 'broadcast'         // One-way broadcast channel
  | 'emergency';        // Emergency alert channel

export type UserRole =
  | 'surgeon'
  | 'anaesthetist'
  | 'scrub_nurse'
  | 'circulating_nurse'
  | 'odp'
  | 'hca'
  | 'theatre_coordinator'
  | 'theatre_manager'
  | 'matron'
  | 'admin'
  | 'tom_ai';           // TOM AI itself!

export type MessageStatus =
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed';

export type NotificationPriority =
  | 'low'
  | 'normal'
  | 'high'
  | 'urgent'
  | 'critical';

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar?: string;

  type: MessageType;
  content: string;

  // Rich content
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  voiceUrl?: string;
  voiceDuration?: number;
  videoUrl?: string;
  videoDuration?: number;

  // Shared content
  procedureId?: string;
  procedureName?: string;
  patientId?: string;

  // Metadata
  timestamp: Date;
  status: MessageStatus;
  readBy: string[];              // User IDs who read this
  deliveredTo: string[];         // User IDs who received this
  reactions: {
    [emoji: string]: string[];   // emoji -> array of user IDs
  };

  // Reply/Thread
  replyToId?: string;
  threadId?: string;
  threadCount?: number;

  // AI Features
  isAIGenerated?: boolean;
  aiSuggestion?: boolean;
  priority?: NotificationPriority;

  // Edit/Delete
  editedAt?: Date;
  deletedAt?: Date;
  deletedFor?: string[];         // User IDs (delete for everyone vs delete for me)
}

export interface ChatRoom {
  id: string;
  type: RoomType;
  name: string;
  description?: string;
  avatar?: string;

  // Members
  members: RoomMember[];
  admins: string[];              // User IDs with admin rights

  // Associated entities
  procedureId?: string;
  theatreId?: string;
  specialtyId?: string;
  teamId?: string;

  // Settings
  isMuted: boolean;
  isPinned: boolean;
  notificationLevel: 'all' | 'mentions' | 'none';

  // Metadata
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;

  // Features
  allowAttachments: boolean;
  allowPolls: boolean;
  allowVoiceMessages: boolean;
  isEncrypted: boolean;          // End-to-end encryption

  // AI Features
  aiAssistantEnabled: boolean;
  autoSuggestionsEnabled: boolean;
}

export interface RoomMember {
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;

  // Status
  isOnline: boolean;
  lastSeen?: Date;
  isTyping: boolean;

  // Permissions
  canSendMessages: boolean;
  canDeleteMessages: boolean;
  canAddMembers: boolean;

  // Metadata
  joinedAt: Date;
  leftAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;

  type: 'message' | 'mention' | 'alert' | 'suggestion' | 'breach' | 'change' | 'approval';
  priority: NotificationPriority;

  title: string;
  body: string;
  icon?: string;
  image?: string;

  // Action
  actionUrl?: string;
  actionLabel?: string;

  // Related entities
  roomId?: string;
  messageId?: string;
  procedureId?: string;
  sessionId?: string;

  // Status
  isRead: boolean;
  readAt?: Date;
  timestamp: Date;
  expiresAt?: Date;

  // AI Features
  isAIGenerated: boolean;
  aiConfidence?: number;         // 0-100
  aiReasoning?: string;
}

export interface AIActivityEvent {
  id: string;
  type: 'procedure_created' | 'procedure_updated' | 'procedure_scheduled' | 'procedure_cancelled' |
        'session_created' | 'session_updated' | 'session_full' |
        'breach_detected' | 'at_risk_detected' |
        'staff_allocated' | 'staff_shortage' |
        'inventory_low' | 'inventory_expired' |
        'user_login' | 'user_action';

  // What changed
  entity: 'procedure' | 'session' | 'staff' | 'inventory' | 'user';
  entityId: string;

  // Details
  summary: string;
  details: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];

  // Who/When
  userId?: string;
  userName?: string;
  timestamp: Date;

  // AI Analysis
  aiAnalysis?: string;
  aiSuggestions?: string[];
  requiresAction: boolean;
  actionPriority?: NotificationPriority;

  // Affected users
  affectedUsers: string[];
  notifiedUsers: string[];
}

export interface AIResponse {
  type: 'answer' | 'suggestion' | 'alert' | 'confirmation' | 'error';
  content: string;
  confidence: number;            // 0-100

  // Rich responses
  suggestions?: {
    title: string;
    description: string;
    action: string;
    actionData?: any;
  }[];

  // Quick actions
  quickActions?: {
    label: string;
    icon?: string;
    action: string;
    actionData?: any;
  }[];

  // Related data
  relatedProcedures?: string[];
  relatedSessions?: string[];
  relatedStaff?: string[];

  // Metadata
  processingTime?: number;       // ms
  dataSourcesUsed?: string[];
}

export interface TypingIndicator {
  roomId: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

export interface OnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
  currentActivity?: string;      // "Viewing procedures", "In Theatre 3", etc.
}

// Reactions
export const AVAILABLE_REACTIONS = [
  '👍', '❤️', '😂', '😮', '😢', '🙏',
  '✅', '⚠️', '🚨', '🎉', '👏', '🔥'
] as const;

export type Reaction = typeof AVAILABLE_REACTIONS[number];

// Quick replies for common scenarios
export interface QuickReply {
  id: string;
  category: 'scheduling' | 'status' | 'approval' | 'emergency' | 'general';
  text: string;
  icon?: string;
}

export const QUICK_REPLIES: QuickReply[] = [
  // Scheduling
  { id: 'schedule_confirm', category: 'scheduling', text: 'Confirmed for tomorrow', icon: '✅' },
  { id: 'schedule_reschedule', category: 'scheduling', text: 'Need to reschedule', icon: '📅' },
  { id: 'schedule_cancel', category: 'scheduling', text: 'Cancel this procedure', icon: '❌' },

  // Status
  { id: 'status_ready', category: 'status', text: 'Theatre ready', icon: '✅' },
  { id: 'status_delayed', category: 'status', text: '15 min delay', icon: '⏰' },
  { id: 'status_issue', category: 'status', text: 'Issue - need help', icon: '⚠️' },

  // Approval
  { id: 'approve_yes', category: 'approval', text: 'Approved', icon: '👍' },
  { id: 'approve_no', category: 'approval', text: 'Not approved', icon: '👎' },
  { id: 'approve_review', category: 'approval', text: 'Need to review', icon: '👀' },

  // Emergency
  { id: 'emergency_urgent', category: 'emergency', text: 'URGENT - Emergency case', icon: '🚨' },
  { id: 'emergency_help', category: 'emergency', text: 'Need immediate assistance', icon: '🆘' },

  // General
  { id: 'general_thanks', category: 'general', text: 'Thanks!', icon: '🙏' },
  { id: 'general_ok', category: 'general', text: 'OK', icon: '👌' },
  { id: 'general_understood', category: 'general', text: 'Understood', icon: '✓' }
];

// Message templates for AI
export interface MessageTemplate {
  id: string;
  type: MessageType;
  category: string;
  template: string;
  variables: string[];
  icon?: string;
  color?: string;
}

export const AI_MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'breach_alert',
    type: 'alert',
    category: 'RTT',
    template: '🚨 RTT Breach Alert: {patientName} ({procedureName}) is now {daysOver} days over target. Priority: {priority}',
    variables: ['patientName', 'procedureName', 'daysOver', 'priority'],
    color: 'red'
  },
  {
    id: 'at_risk_warning',
    type: 'alert',
    category: 'RTT',
    template: '⚠️ RTT At Risk: {patientName} ({procedureName}) will breach in {daysLeft} days if not scheduled soon.',
    variables: ['patientName', 'procedureName', 'daysLeft'],
    color: 'yellow'
  },
  {
    id: 'procedure_scheduled',
    type: 'notification',
    category: 'Scheduling',
    template: '✅ Procedure Scheduled: {patientName} - {procedureName} scheduled for {date} at {time} in {theatre}',
    variables: ['patientName', 'procedureName', 'date', 'time', 'theatre'],
    color: 'green'
  },
  {
    id: 'staff_shortage',
    type: 'alert',
    category: 'Staffing',
    template: '⚠️ Staff Shortage: {specialty} session on {date} needs {count} more {role}(s)',
    variables: ['specialty', 'date', 'count', 'role'],
    color: 'orange'
  },
  {
    id: 'inventory_low',
    type: 'alert',
    category: 'Inventory',
    template: '📦 Low Stock Alert: {itemName} has only {quantity} {unit} remaining. Reorder level: {reorderLevel}',
    variables: ['itemName', 'quantity', 'unit', 'reorderLevel'],
    color: 'orange'
  },
  {
    id: 'ai_suggestion',
    type: 'suggestion',
    category: 'AI',
    template: '💡 TOM AI Suggestion: {suggestion}',
    variables: ['suggestion'],
    color: 'blue'
  }
];
