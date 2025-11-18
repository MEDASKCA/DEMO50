'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Minimize2, Smile, Paperclip, Mic, MicOff, Phone, Video, Users, Plus, Check } from 'lucide-react';
import { mockStaffProfiles, mockConversations, getStaffById, getTimeAgo, type Conversation, type Message as MessageType, type StaffProfile } from '@/lib/socialMockData';
import UserProfileModal from '@/components/UserProfileModal';

interface FloatingMessengerProps {
  currentUserId?: string;
}

const emojis = ['😊', '😂', '❤️', '👍', '👏', '🎉', '🔥', '✨', '😍', '🙏', '💪', '⭐'];

export default function FloatingMessenger({ currentUserId = 'user-1' }: FloatingMessengerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video' | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<StaffProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<any>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = (userId: string) => {
    const user = getStaffById(userId);
    if (user) {
      setSelectedUser(user);
      setShowProfileModal(true);
    }
  };

  // Calculate total unread messages
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [activeConversation]);

  // Click outside to close chat (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply on mobile (screen width < 768px)
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        return;
      }

      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        // Close completely on mobile, not just minimize
        setIsOpen(false);
        setActiveConversation(null);
        setShowEmojiPicker(false);
        setShowCreateGroup(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Drag handlers for moveable button
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Constrain to viewport
      const buttonSize = 56; // 14 * 4 (w-14 = 56px)
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize - 80; // Account for bottom nav

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;

      const buttonSize = 56;
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize - 80;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMessageInput(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      receiverId: activeConversation.participants.find(p => p !== currentUserId) || '',
      content: messageInput,
      timestamp: new Date(),
      read: true
    };

    // Update conversation
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage
        };
      }
      return conv;
    }));

    setMessageInput('');
    setShowEmojiPicker(false);
    scrollToBottom();
  };

  const handleOpenConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setIsMinimized(false);

    // Mark as read
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveConversation(null);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    if (!activeConversation) return;
    setIsInCall(true);
    setCallType(type);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallType(null);
  };

  const toggleParticipant = (userId: string) => {
    setSelectedParticipants(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedParticipants.length < 2) {
      alert('Please enter a group name and select at least 2 participants');
      return;
    }

    const newGroup: Conversation = {
      id: `group-${Date.now()}`,
      participants: [currentUserId, ...selectedParticipants],
      isGroup: true,
      groupName: groupName.trim(),
      lastMessage: {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        receiverId: '',
        content: 'Group created',
        timestamp: new Date(),
        read: false
      },
      unreadCount: 0
    };

    setConversations(prev => [newGroup, ...prev]);
    setShowCreateGroup(false);
    setGroupName('');
    setSelectedParticipants([]);
    setActiveConversation(newGroup);
  };

  // Set default position if not dragged yet
  const getButtonStyle = () => {
    if (position.x === 0 && position.y === 0) {
      return {
        position: 'fixed' as const,
        bottom: '5rem',
        right: '1.5rem',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 9998
      };
    }
    return {
      position: 'fixed' as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      cursor: isDragging ? 'grabbing' : 'grab',
      zIndex: 9998
    };
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            if (!isDragging) {
              setIsOpen(true);
            }
          }}
          style={getButtonStyle()}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white"
        >
          <MessageCircle className="w-6 h-6" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalUnread > 9 ? '9+' : totalUnread}
            </span>
          )}
        </button>
      )}

      {/* Messenger Window - Full screen on mobile, modal on desktop */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed inset-0 md:bottom-6 md:right-6 md:left-auto md:top-auto z-[70] md:z-[9999] bg-white md:rounded-2xl shadow-2xl md:border md:border-gray-200 transition-all ${
            isMinimized ? 'h-16 md:w-80' : 'md:w-96 md:h-[600px]'
          } flex flex-col`}
        >
          {/* Header */}
          <div
            className={`bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white px-4 py-3 md:rounded-t-2xl flex items-center justify-between flex-shrink-0 ${isMinimized ? 'cursor-pointer hover:from-blue-700 hover:via-teal-700 hover:to-purple-700' : ''}`}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold">
                {activeConversation ? 'Messenger' : 'Chats'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="hover:bg-white/20 p-1 rounded transition-colors md:block hidden"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Conversations List */}
              {!activeConversation && !showCreateGroup && (
                <div className="flex-1 overflow-y-auto flex flex-col">
                  {/* Create Group Button */}
                  <button
                    onClick={() => setShowCreateGroup(true)}
                    className="m-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    Create Group
                  </button>

                  {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                      <p className="text-sm">No messages yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {conversations.map(conversation => {
                        if (conversation.isGroup) {
                          return (
                            <button
                              key={conversation.id}
                              onClick={() => handleOpenConversation(conversation)}
                              className="w-full p-3 hover:bg-gray-50 transition-colors flex items-start gap-3 text-left"
                            >
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                <Users className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-sm text-gray-900 truncate">
                                    {conversation.groupName}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {getTimeAgo(conversation.lastMessage.timestamp)}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 truncate">
                                  {conversation.participants.length} members
                                </p>
                              </div>
                              {conversation.unreadCount > 0 && (
                                <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                  {conversation.unreadCount}
                                </div>
                              )}
                            </button>
                          );
                        }

                        const otherUserId = conversation.participants.find(p => p !== currentUserId);
                        const otherUser = getStaffById(otherUserId || '');

                        if (!otherUser) return null;

                        return (
                          <div
                            key={conversation.id}
                            className="w-full p-3 hover:bg-gray-50 transition-colors flex items-start gap-3 relative"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProfileClick(otherUser.id);
                              }}
                              className="flex-shrink-0 hover:opacity-80 transition-opacity"
                            >
                              {otherUser.avatar ? (
                                <img
                                  src={otherUser.avatar}
                                  alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                  {otherUser.initials}
                                </div>
                              )}
                            </button>
                            <button
                              onClick={() => handleOpenConversation(conversation)}
                              className="flex-1 min-w-0 text-left"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm text-gray-900 truncate hover:text-blue-600 transition-colors">
                                  {otherUser.firstName} {otherUser.lastName}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {getTimeAgo(conversation.lastMessage.timestamp)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">
                                {conversation.lastMessage.senderId === currentUserId ? 'You: ' : ''}
                                {conversation.lastMessage.content}
                              </p>
                            </button>
                            {conversation.unreadCount > 0 && (
                              <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 absolute top-3 right-3">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Create Group Screen */}
              {showCreateGroup && (
                <div className="flex-1 overflow-y-auto flex flex-col">
                  <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setShowCreateGroup(false);
                        setGroupName('');
                        setSelectedParticipants([]);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ← Back
                    </button>
                    <h3 className="font-semibold">Create Group</h3>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name
                      </label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Participants (minimum 2)
                      </label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {mockStaffProfiles
                          .filter(staff => staff.id !== currentUserId)
                          .map(staff => (
                            <div
                              key={staff.id}
                              className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                                selectedParticipants.includes(staff.id)
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProfileClick(staff.id);
                                }}
                                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                              >
                                {staff.avatar ? (
                                  <img
                                    src={staff.avatar}
                                    alt={`${staff.firstName} ${staff.lastName}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                    {staff.initials}
                                  </div>
                                )}
                              </button>
                              <button
                                onClick={() => toggleParticipant(staff.id)}
                                className="flex-1 text-left"
                              >
                                <p className="font-semibold text-sm text-gray-900">
                                  {staff.firstName} {staff.lastName}
                                </p>
                                <p className="text-xs text-gray-600">{staff.role}</p>
                              </button>
                              {selectedParticipants.includes(staff.id) && (
                                <Check className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    <button
                      onClick={handleCreateGroup}
                      disabled={!groupName.trim() || selectedParticipants.length < 2}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Group ({selectedParticipants.length} members)
                    </button>
                  </div>
                </div>
              )}

              {/* Active Conversation */}
              {activeConversation && (
                <>
                  {/* Conversation Header */}
                  <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => setActiveConversation(null)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ← Back
                    </button>
                    {(() => {
                      const otherUserId = activeConversation.participants.find(p => p !== currentUserId);
                      const otherUser = getStaffById(otherUserId || '');
                      if (!otherUser) return null;

                      return (
                        <>
                          <button
                            onClick={() => handleProfileClick(otherUser.id)}
                            className="flex-shrink-0 hover:opacity-80 transition-opacity"
                          >
                            {otherUser.avatar ? (
                              <img
                                src={otherUser.avatar}
                                alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                {otherUser.initials}
                              </div>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => handleProfileClick(otherUser.id)}
                              className="font-semibold text-sm text-gray-900 truncate hover:text-blue-600 transition-colors text-left block w-full"
                            >
                              {otherUser.firstName} {otherUser.lastName}
                            </button>
                            <p className="text-xs text-gray-500 truncate">{otherUser.role}</p>
                          </div>
                          {/* Call Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStartCall('voice')}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                              title="Voice call"
                            >
                              <Phone className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                              onClick={() => handleStartCall('video')}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                              title="Video call"
                            >
                              <Video className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Call Interface */}
                  {isInCall && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 z-50 flex flex-col items-center justify-center text-white">
                      {(() => {
                        const otherUserId = activeConversation.participants.find(p => p !== currentUserId);
                        const otherUser = getStaffById(otherUserId || '');
                        if (!otherUser) return null;

                        return (
                          <>
                            <button
                              onClick={() => handleProfileClick(otherUser.id)}
                              className="w-24 h-24 rounded-full mb-4 border-4 border-white/30 overflow-hidden bg-white/20 backdrop-blur-sm hover:opacity-80 transition-opacity"
                            >
                              {otherUser.avatar ? (
                                <img
                                  src={otherUser.avatar}
                                  alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                                  {otherUser.initials}
                                </div>
                              )}
                            </button>
                            <button
                              onClick={() => handleProfileClick(otherUser.id)}
                              className="text-2xl font-bold mb-2 hover:text-white/80 transition-colors"
                            >
                              {otherUser.firstName} {otherUser.lastName}
                            </button>
                            <p className="text-white/80 mb-8">{callType === 'video' ? 'Video Call' : 'Voice Call'}</p>

                            {callType === 'video' && (
                              <div className="w-full max-w-sm mb-8">
                                <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                  <Video className="w-16 h-16 text-white/50" />
                                  <p className="absolute text-white/70 text-sm">Camera preview</p>
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4">
                              {callType === 'video' && (
                                <button
                                  className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                  title="Toggle camera"
                                >
                                  <Video className="w-6 h-6" />
                                </button>
                              )}
                              <button
                                className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                title="Mute"
                              >
                                <Mic className="w-6 h-6" />
                              </button>
                              <button
                                onClick={handleEndCall}
                                className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                                title="End call"
                              >
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {/* Mock messages for demonstration */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-900">{activeConversation.lastMessage.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getTimeAgo(activeConversation.lastMessage.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input with Emojis and Voice */}
                  <div className="border-t border-gray-200 p-3 bg-white md:rounded-b-2xl flex-shrink-0">
                    <div className="flex items-end gap-2">
                      {/* Voice Recording Button */}
                      <button
                        onClick={handleVoiceInput}
                        className={`p-2 rounded-full transition-all flex-shrink-0 ${
                          isRecording
                            ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={isRecording ? 'Stop recording' : 'Start voice input'}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>

                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={isRecording ? "Listening..." : "Type a message..."}
                            className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                              title="Add emoji"
                            >
                              <Smile className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                              title="Attach file"
                            >
                              <Paperclip className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                          <div className="absolute bottom-16 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-3 grid grid-cols-6 gap-1 z-10">
                            {emojis.map((emoji, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleEmojiClick(emoji)}
                                className="text-xl hover:bg-gray-100 rounded p-1.5 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        title="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    {isRecording && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <span className="animate-pulse">●</span> Recording...
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
