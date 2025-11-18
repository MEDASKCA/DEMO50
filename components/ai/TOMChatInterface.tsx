'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic, Send, X, Minimize2, Maximize2, Volume2, VolumeX,
  Sparkles, Zap, TrendingUp, AlertCircle, CheckCircle,
  Calendar, Users, Briefcase, FileText, Target, Award,
  Loader, Brain, MessageSquare, Settings, HelpCircle
} from 'lucide-react';

export interface TOMMessage {
  id: string;
  type: 'user' | 'tom';
  content: string;
  timestamp: Date;
  isVoice?: boolean;

  // Rich responses
  suggestions?: string[];
  data?: {
    type: 'procedure' | 'shift' | 'staff' | 'rtt' | 'analytics';
    payload: any;
  };

  // Actions
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
}

export interface TOMSuggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
  category: 'quick' | 'contextual' | 'proactive';
}

interface TOMChatInterfaceProps {
  currentUserId: string;
  currentUserName: string;
  isOpen: boolean;
  isMinimized: boolean;
  onToggle: () => void;
  onMinimize: () => void;
  onSendMessage: (message: string, isVoice: boolean) => Promise<TOMMessage>;
  context?: {
    userRole: 'staff' | 'manager';
    currentPage?: string;
    recentActivity?: any[];
  };
}

export default function TOMChatInterface({
  currentUserId,
  currentUserName,
  isOpen,
  isMinimized,
  onToggle,
  onMinimize,
  onSendMessage,
  context
}: TOMChatInterfaceProps) {
  const [messages, setMessages] = useState<TOMMessage[]>([
    {
      id: '1',
      type: 'tom',
      content: `Good morning, ${currentUserName.split(' ')[0]}! 👋 I'm TOM, your intelligent theatre operations assistant. How can I help you today?`,
      timestamp: new Date(),
      suggestions: [
        'Show me today\'s procedures',
        'Any RTT breaches?',
        'Available shifts this week',
        'Team performance summary'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick suggestions based on context
  const quickSuggestions: TOMSuggestion[] = [
    {
      id: 'procedures',
      text: 'Show procedures',
      icon: <FileText className="w-4 h-4" />,
      category: 'quick'
    },
    {
      id: 'shifts',
      text: 'My shifts',
      icon: <Briefcase className="w-4 h-4" />,
      category: 'quick'
    },
    {
      id: 'rtt',
      text: 'RTT status',
      icon: <Target className="w-4 h-4" />,
      category: 'quick'
    },
    {
      id: 'team',
      text: 'Team overview',
      icon: <Users className="w-4 h-4" />,
      category: 'quick'
    }
  ];

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: TOMMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      isVoice: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const tomResponse = await onSendMessage(input, false);
      setMessages(prev => [...prev, tomResponse]);

      // Speak response if voice enabled
      if (voiceEnabled && !tomResponse.isVoice) {
        speakText(tomResponse.content);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'tom',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Process voice input (would use Web Speech API)
      setIsProcessing(true);

      // Simulate voice recognition
      setTimeout(async () => {
        const recognizedText = 'Show me procedures for tomorrow';
        setInput(recognizedText);

        const userMessage: TOMMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: recognizedText,
          timestamp: new Date(),
          isVoice: true
        };

        setMessages(prev => [...prev, userMessage]);

        const tomResponse = await onSendMessage(recognizedText, true);
        setMessages(prev => [...prev, tomResponse]);

        if (voiceEnabled) {
          speakText(tomResponse.content);
        }

        setInput('');
        setIsProcessing(false);
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    // Floating Button - Siri/Jarvis Style
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-50 group animate-pulse-subtle"
      >
        <div className="relative">
          <Brain className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask TOM
          <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1" />
        </div>
      </button>
    );
  }

  if (isMinimized) {
    // Minimized Bar
    return (
      <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl border-2 border-gray-200 shadow-2xl z-50">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">TOM</h3>
              <p className="text-xs text-gray-600">
                {isProcessing ? 'Thinking...' : 'Ready to help'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMinimize}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Chat Interface - Jarvis Style
  return (
    <div className="fixed bottom-6 right-6 w-[480px] h-[700px] bg-white rounded-2xl border-2 border-gray-200 shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header - Jarvis Style */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative">
              <Brain className="w-6 h-6 text-white" />
              {isProcessing && (
                <div className="absolute inset-0 rounded-full border-2 border-white/50 border-t-white animate-spin" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                TOM
                <Sparkles className="w-4 h-4" />
              </h2>
              <p className="text-xs text-white/80">
                {isProcessing ? 'Analyzing...' : isSpeaking ? 'Speaking...' : 'Online & Ready'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onMinimize}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Context Indicator */}
        {context && (
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 bg-white/20 rounded-full font-bold">
              {context.userRole === 'staff' ? 'Staff View' : 'Manager View'}
            </span>
            {context.currentPage && (
              <span className="px-2 py-0.5 bg-white/20 rounded-full">
                {context.currentPage}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSuggestionClick={handleSuggestionClick}
          />
        ))}

        {isProcessing && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 border-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Loader className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="text-sm text-gray-600">TOM is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {showSuggestions && messages.length <= 2 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <p className="text-xs font-bold text-gray-600 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-colors text-sm font-bold text-gray-700"
              >
                {suggestion.icon}
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Siri Style */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          {/* Voice Button */}
          <button
            onClick={handleVoiceInput}
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              isRecording
                ? 'bg-red-500 animate-pulse shadow-lg'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg'
            }`}
            disabled={isProcessing}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>

          {/* Text Input */}
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isRecording ? 'Listening...' : 'Ask TOM anything...'}
              disabled={isRecording || isProcessing}
              rows={1}
              className="flex-1 bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-500"
              style={{ maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing || isRecording}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          {isRecording ? '🎤 Listening... Click mic to stop' : 'Press Enter to send, Shift+Enter for new line'}
        </p>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({
  message,
  onSuggestionClick
}: {
  message: TOMMessage;
  onSuggestionClick: (suggestion: string) => void;
}) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* TOM Avatar */}
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
              : 'bg-white border-2 border-gray-200 text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {message.isVoice && (
              <span className="text-xs">
                {isUser ? '🎤' : '🔊'}
              </span>
            )}
            {!isUser && (
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            )}
          </div>

          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          <p className={`text-[10px] mt-1 ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-3 py-1.5 rounded-lg bg-white border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-sm font-bold text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-col gap-2 w-full">
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-black">
          ME
        </div>
      )}
    </div>
  );
}
