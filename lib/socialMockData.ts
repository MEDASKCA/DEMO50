// Mock data for NHS theatre staff social feed

export interface StaffProfile {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  specialty?: string;
  trust: string;
  avatar?: string;
  initials: string;
}

export interface Reaction {
  emoji: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: string[]; // Array of user IDs who liked
  reactions: { [userId: string]: Reaction }; // Map of user IDs to their reaction details
  comments: Comment[];
  shares: number;
  type: 'text' | 'announcement' | 'shift-swap' | 'achievement';
  imageUrl?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: string[];
  replies?: Comment[];
  parentId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

// Mock NHS Theatre Staff Profiles - Diverse perioperative team
export const mockStaffProfiles: StaffProfile[] = [
  {
    id: 'user-1',
    firstName: 'Alexander',
    lastName: 'Monterubio',
    role: 'Senior Scrub Team Leader • RN, Band 7',
    specialty: 'Orthopaedics & Trauma',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces',
    initials: 'AM'
  },
  {
    id: 'user-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Consultant Orthopaedic Surgeon',
    specialty: 'Trauma & Arthroplasty',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces',
    initials: 'SJ'
  },
  {
    id: 'user-3',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'Scrub Practitioner • RN, Band 6',
    specialty: 'Upper GI & Laparoscopic Surgery',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=faces',
    initials: 'MC'
  },
  {
    id: 'user-4',
    firstName: 'Emma',
    lastName: 'Williams',
    role: 'Theatre Operations Manager • Band 8a',
    specialty: 'Perioperative Services',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=faces',
    initials: 'EW'
  },
  {
    id: 'user-5',
    firstName: 'David',
    lastName: 'Patel',
    role: 'Consultant Anaesthetist',
    specialty: 'Anaesthetics & Critical Care',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=faces',
    initials: 'DP'
  },
  {
    id: 'user-6',
    firstName: 'Rachel',
    lastName: 'Thompson',
    role: 'Operating Department Practitioner',
    specialty: 'Anaesthetics & Recovery',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&h=150&fit=crop&crop=faces',
    initials: 'RT'
  },
  {
    id: 'user-7',
    firstName: 'James',
    lastName: 'Kumar',
    role: 'CT Surgery Registrar • ST6',
    specialty: 'Cardiothoracic Surgery',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=150&h=150&fit=crop&crop=faces',
    initials: 'JK'
  },
  {
    id: 'user-8',
    firstName: 'Lisa',
    lastName: 'O\'Brien',
    role: 'Recovery Lead Nurse • Band 7',
    specialty: 'Post-Anaesthetic Care',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    initials: 'LO'
  },
  {
    id: 'user-9',
    firstName: 'Aisha',
    lastName: 'Mohammed',
    role: 'Healthcare Assistant • Band 3',
    specialty: 'Theatre Support',
    trust: 'Barts Health NHS Trust',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=faces',
    initials: 'AM'
  },
  {
    id: 'user-10',
    firstName: 'Tom',
    lastName: 'Richards',
    role: 'Clinical Specialist • Stryker Orthopaedics',
    specialty: 'Joint Replacement Systems',
    trust: 'Industry Partner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    initials: 'TR'
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    content: 'Fantastic teamwork in Theatre 3 today! Successfully completed a complex total knee replacement 45 minutes ahead of schedule. Huge thanks to the entire team - this is what excellent collaboration looks like! 💙',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: ['user-1', 'user-3', 'user-4', 'user-5', 'user-6'],
    reactions: {
      'user-1': { emoji: '❤️', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000) },
      'user-3': { emoji: '👍', timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000) },
      'user-4': { emoji: '❤️', timestamp: new Date(Date.now() - 1.7 * 60 * 60 * 1000) },
      'user-5': { emoji: '😂', timestamp: new Date(Date.now() - 1.6 * 60 * 60 * 1000) },
      'user-6': { emoji: '👍', timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000) }
    },
    comments: [
      {
        id: 'comment-1',
        authorId: 'user-1',
        content: 'It was a pleasure working with you Dr. Johnson! Great case.',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        likes: ['user-2']
      },
      {
        id: 'comment-2',
        authorId: 'user-5',
        content: 'Smooth anaesthetic management throughout. Well done team!',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: ['user-1', 'user-2']
      }
    ],
    shares: 3,
    type: 'achievement'
  },
  {
    id: 'post-2',
    authorId: 'user-4',
    content: '📢 Theatre Efficiency Review Meeting - Friday 2pm, Boardroom A. All team leads please attend. Agenda: Q4 performance metrics, new staffing protocols, and equipment upgrade proposals.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: ['user-1', 'user-2', 'user-3', 'user-7', 'user-8'],
    reactions: {
      'user-1': { emoji: '👍', timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000) },
      'user-2': { emoji: '👍', timestamp: new Date(Date.now() - 3.8 * 60 * 60 * 1000) },
      'user-3': { emoji: '👍', timestamp: new Date(Date.now() - 3.7 * 60 * 60 * 1000) },
      'user-7': { emoji: '👍', timestamp: new Date(Date.now() - 3.6 * 60 * 60 * 1000) },
      'user-8': { emoji: '❤️', timestamp: new Date(Date.now() - 3.9 * 60 * 60 * 1000) }
    },
    comments: [
      {
        id: 'comment-3',
        authorId: 'user-1',
        content: 'Will be there. Can we also discuss the new inventory management system?',
        timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
        likes: ['user-4']
      }
    ],
    shares: 12,
    type: 'announcement'
  },
  {
    id: 'post-3',
    authorId: 'user-3',
    content: '✅ New hip implant inventory has arrived and been catalogued. Smith & Nephew Anthology system now fully stocked. Please check the supply catalogue for product codes and specifications.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: ['user-1', 'user-2', 'user-6', 'user-7'],
    reactions: { 'user-1': '👍', 'user-2': '👍', 'user-6': '👍', 'user-7': '👍' },
    comments: [],
    shares: 5,
    type: 'announcement'
  },
  {
    id: 'post-4',
    authorId: 'user-7',
    content: 'Looking for someone to swap my night shift on Thursday 7th Nov. I can cover any day shift Fri 8th - Sun 10th Nov in return. DM if interested!',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: ['user-3', 'user-6'],
    reactions: { 'user-3': '👍', 'user-6': '😮' },
    comments: [
      {
        id: 'comment-4',
        authorId: 'user-6',
        content: 'Might be able to help. Let me check my schedule and DM you!',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        likes: ['user-7']
      }
    ],
    shares: 0,
    type: 'shift-swap'
  },
  {
    id: 'post-5',
    authorId: 'user-8',
    content: 'Recovery team handled 14 major cases today without any delays or complications. Exceptional patient care all around. Proud of this team! 🌟',
    timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), // 1.5 days ago
    likes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
    reactions: { 'user-1': '❤️', 'user-2': '❤️', 'user-3': '❤️', 'user-4': '👍', 'user-5': '😮', 'user-6': '❤️' },
    comments: [
      {
        id: 'comment-5',
        authorId: 'user-4',
        content: 'Outstanding performance! This level of efficiency is what we strive for.',
        timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000),
        likes: ['user-8', 'user-1']
      }
    ],
    shares: 2,
    type: 'achievement'
  },
  {
    id: 'post-6',
    authorId: 'user-5',
    content: 'Reminder: New WHO surgical safety checklist training session tomorrow at 1pm. Mandatory for all theatre staff. See you there!',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-6', 'user-7', 'user-8'],
    reactions: { 'user-1': '👍', 'user-2': '👍', 'user-3': '👍', 'user-4': '👍', 'user-6': '👍', 'user-7': '👍', 'user-8': '👍' },
    comments: [],
    shares: 15,
    type: 'announcement'
  }
];

// Mock Conversations for Messenger
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['user-1', 'user-2'],
    lastMessage: {
      id: 'msg-1',
      senderId: 'user-2',
      receiverId: 'user-1',
      content: 'Thanks for the great support during today\'s case!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    unreadCount: 1
  },
  {
    id: 'conv-2',
    participants: ['user-1', 'user-4'],
    lastMessage: {
      id: 'msg-2',
      senderId: 'user-1',
      receiverId: 'user-4',
      content: 'Sure, I can attend Friday\'s meeting',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    },
    unreadCount: 0
  },
  {
    id: 'conv-3',
    participants: ['user-1', 'user-7'],
    lastMessage: {
      id: 'msg-3',
      senderId: 'user-7',
      receiverId: 'user-1',
      content: 'Any chance you can help with the shift swap?',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false
    },
    unreadCount: 2
  }
];

// Helper function to get staff by ID
export function getStaffById(id: string): StaffProfile | undefined {
  return mockStaffProfiles.find(staff => staff.id === id);
}

// Helper function to get formatted time ago
export function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
