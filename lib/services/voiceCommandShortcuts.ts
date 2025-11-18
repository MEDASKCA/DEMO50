// Voice Command Shortcuts Service
// Fast command recognition and execution for common voice commands

import { format, addDays } from 'date-fns';

export interface VoiceCommand {
  id: string;
  patterns: string[]; // Regex patterns or keywords
  category: 'schedule' | 'staff' | 'status' | 'analytics' | 'navigation' | 'general';
  handler: (transcript: string, context?: any) => Promise<CommandResult>;
  description: string;
  examples: string[];
}

export interface CommandResult {
  handled: boolean;
  response?: string;
  action?: {
    type: 'navigate' | 'display' | 'query' | 'none';
    target?: string;
    data?: any;
  };
  shouldContinueToLLM?: boolean; // If true, also send to LLM for detailed response
}

// ============================================================================
// COMMAND DEFINITIONS
// ============================================================================

export const VOICE_COMMANDS: VoiceCommand[] = [
  // SCHEDULE COMMANDS
  {
    id: 'show-schedule-today',
    patterns: ['show.*today', 'today.*schedule', 'what.*today', 'schedule.*today'],
    category: 'schedule',
    handler: async (transcript, context) => {
      const today = format(new Date(), 'EEEE, d MMMM');
      return {
        handled: true,
        response: `Loading today's theatre schedule for ${today}...`,
        action: {
          type: 'query',
          target: 'schedule',
          data: { date: format(new Date(), 'yyyy-MM-dd') }
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Show today\'s theatre schedule',
    examples: ['Show me today\'s schedule', 'What\'s on today?', 'Today\'s cases']
  },

  {
    id: 'show-schedule-tomorrow',
    patterns: ['show.*tomorrow', 'tomorrow.*schedule', 'what.*tomorrow', 'schedule.*tomorrow'],
    category: 'schedule',
    handler: async (transcript, context) => {
      const tomorrow = format(addDays(new Date(), 1), 'EEEE, d MMMM');
      return {
        handled: true,
        response: `Loading tomorrow's theatre schedule for ${tomorrow}...`,
        action: {
          type: 'query',
          target: 'schedule',
          data: { date: format(addDays(new Date(), 1), 'yyyy-MM-dd') }
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Show tomorrow\'s theatre schedule',
    examples: ['Show me tomorrow', 'What\'s on tomorrow?', 'Tomorrow\'s schedule']
  },

  // STAFF COMMANDS
  {
    id: 'check-staff-availability',
    patterns: ['staff.*available', 'who.*available', 'check.*staff', 'available.*staff'],
    category: 'staff',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Checking current staff availability...',
        action: {
          type: 'query',
          target: 'staff',
          data: { filter: 'available' }
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Check staff availability',
    examples: ['Who\'s available?', 'Check staff availability', 'Available staff']
  },

  {
    id: 'show-staff-roster',
    patterns: ['staff.*roster', 'show.*roster', 'roster.*today', 'who.*working'],
    category: 'staff',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Loading staff roster...',
        action: {
          type: 'navigate',
          target: '/staff'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Show staff roster',
    examples: ['Show me the roster', 'Who\'s working today?', 'Staff roster']
  },

  // STATUS & READINESS COMMANDS
  {
    id: 'check-readiness',
    patterns: ['check.*readiness', 'ready.*theatre', 'readiness.*check', 'theatre.*ready'],
    category: 'status',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Running theatre readiness check...',
        action: {
          type: 'query',
          target: 'readiness'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Check theatre readiness status',
    examples: ['Check readiness', 'Are we ready?', 'Theatre readiness']
  },

  {
    id: 'check-conflicts',
    patterns: ['check.*conflict', 'any.*conflict', 'conflict.*check', 'schedule.*conflict'],
    category: 'status',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Scanning for schedule conflicts...',
        action: {
          type: 'query',
          target: 'conflicts'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Check for schedule conflicts',
    examples: ['Check for conflicts', 'Any conflicts?', 'Schedule conflicts']
  },

  // ANALYTICS COMMANDS
  {
    id: 'show-utilization',
    patterns: ['show.*utilization', 'utilization.*rate', 'capacity.*usage', 'how.*busy'],
    category: 'analytics',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Analyzing theatre utilization...',
        action: {
          type: 'query',
          target: 'utilization'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Show theatre utilization metrics',
    examples: ['Show utilization', 'How busy are we?', 'Capacity usage']
  },

  {
    id: 'show-metrics',
    patterns: ['show.*metrics', 'key.*metrics', 'dashboard', 'overview'],
    category: 'analytics',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Loading key performance metrics...',
        action: {
          type: 'navigate',
          target: '/analytics'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Show key metrics dashboard',
    examples: ['Show metrics', 'Dashboard', 'Key metrics']
  },

  // NAVIGATION COMMANDS
  {
    id: 'go-to-schedule',
    patterns: ['^go to schedule', '^navigate.*schedule', '^open schedule'],
    category: 'navigation',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Opening theatre schedule...',
        action: {
          type: 'navigate',
          target: '/schedule'
        }
      };
    },
    description: 'Navigate to schedule view',
    examples: ['Go to schedule', 'Open schedule', 'Navigate to schedule']
  },

  {
    id: 'go-to-staff',
    patterns: ['^go to staff', '^navigate.*staff', '^open staff'],
    category: 'navigation',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Opening staff management...',
        action: {
          type: 'navigate',
          target: '/staff'
        }
      };
    },
    description: 'Navigate to staff view',
    examples: ['Go to staff', 'Open staff', 'Navigate to staff']
  },

  {
    id: 'go-to-procedures',
    patterns: ['^go to procedures', '^navigate.*procedures', '^open.*procedures', '^waiting list'],
    category: 'navigation',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Opening procedures and waiting list...',
        action: {
          type: 'navigate',
          target: '/procedures'
        }
      };
    },
    description: 'Navigate to procedures view',
    examples: ['Go to procedures', 'Open procedures', 'Waiting list']
  },

  // GENERAL COMMANDS
  {
    id: 'help',
    patterns: ['^help$', 'what can you do', 'show.*commands', 'available.*commands'],
    category: 'general',
    handler: async (transcript, context) => {
      const commandList = VOICE_COMMANDS
        .filter(cmd => cmd.examples.length > 0)
        .map(cmd => `• ${cmd.examples[0]}`)
        .slice(0, 10)
        .join('\n');

      return {
        handled: true,
        response: `Here are some quick voice commands you can use:\n\n${commandList}\n\nOr just ask me anything about theatre operations!`,
        action: { type: 'display' }
      };
    },
    description: 'Show available voice commands',
    examples: ['Help', 'What can you do?', 'Show commands']
  },

  {
    id: 'quick-status',
    patterns: ['^status$', '^quick.*status', '^how.*doing', '^everything ok'],
    category: 'status',
    handler: async (transcript, context) => {
      return {
        handled: true,
        response: 'Getting quick status overview...',
        action: {
          type: 'query',
          target: 'status'
        },
        shouldContinueToLLM: true
      };
    },
    description: 'Get quick status overview',
    examples: ['Status', 'How are we doing?', 'Everything OK?']
  }
];

// ============================================================================
// COMMAND MATCHING & EXECUTION
// ============================================================================

export async function matchVoiceCommand(
  transcript: string,
  context?: any
): Promise<CommandResult> {
  const cleanTranscript = transcript.toLowerCase().trim();

  console.log('🎤 Matching voice command:', cleanTranscript);

  // Try to match against each command pattern
  for (const command of VOICE_COMMANDS) {
    for (const pattern of command.patterns) {
      const regex = new RegExp(pattern, 'i');

      if (regex.test(cleanTranscript)) {
        console.log(`✅ Matched command: ${command.id}`);

        try {
          const result = await command.handler(cleanTranscript, context);
          return result;
        } catch (error) {
          console.error(`Error executing command ${command.id}:`, error);
          return {
            handled: false,
            shouldContinueToLLM: true
          };
        }
      }
    }
  }

  console.log('ℹ️  No voice command matched, passing to LLM');

  // No command matched - send to LLM for natural language processing
  return {
    handled: false,
    shouldContinueToLLM: true
  };
}

// ============================================================================
// COMMAND UTILITIES
// ============================================================================

export function getCommandsByCategory(category: VoiceCommand['category']): VoiceCommand[] {
  return VOICE_COMMANDS.filter(cmd => cmd.category === category);
}

export function getAllCommandExamples(): string[] {
  return VOICE_COMMANDS
    .flatMap(cmd => cmd.examples)
    .filter(example => example.length > 0);
}

export function searchCommands(query: string): VoiceCommand[] {
  const queryLower = query.toLowerCase();

  return VOICE_COMMANDS.filter(cmd =>
    cmd.description.toLowerCase().includes(queryLower) ||
    cmd.examples.some(ex => ex.toLowerCase().includes(queryLower)) ||
    cmd.category.toLowerCase().includes(queryLower)
  );
}

// ============================================================================
// COMMAND EXECUTION HELPERS
// ============================================================================

export function createQuickResponse(message: string, action?: CommandResult['action']): CommandResult {
  return {
    handled: true,
    response: message,
    action
  };
}

export function continueToLLM(transcript: string): CommandResult {
  return {
    handled: false,
    shouldContinueToLLM: true
  };
}

// ============================================================================
// VOICE COMMAND SUGGESTIONS
// ============================================================================

export function suggestCommandsForContext(currentPage: string, recentActivity?: string[]): VoiceCommand[] {
  const suggestions: VoiceCommand[] = [];

  // Suggest based on current page
  if (currentPage.includes('/schedule')) {
    suggestions.push(...getCommandsByCategory('schedule').slice(0, 3));
  } else if (currentPage.includes('/staff')) {
    suggestions.push(...getCommandsByCategory('staff').slice(0, 3));
  } else if (currentPage.includes('/analytics')) {
    suggestions.push(...getCommandsByCategory('analytics').slice(0, 3));
  }

  // Always include general status commands
  suggestions.push(...getCommandsByCategory('status').slice(0, 2));

  return suggestions.slice(0, 5);
}
