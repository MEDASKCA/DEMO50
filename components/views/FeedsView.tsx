'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Heart, Share2, Plus, Image as ImageIcon, Smile, ThumbsUp, ThumbsDown, X, Shield } from 'lucide-react';
import { mockStaffProfiles, mockPosts, getStaffById, getTimeAgo, type Post as PostType, type Comment as CommentType, type StaffProfile } from '@/lib/socialMockData';
import TomAIChatPanel from '@/components/TomAIChatPanel';
import ShareModal from '@/components/ShareModal';
import AdvertsPanel from '@/components/AdvertsPanel';
import UserProfileModal from '@/components/UserProfileModal';
import { useRouter } from 'next/navigation';

interface Story {
  id: string;
  userId: string;
  imageUrl?: string;
  timestamp: Date;
}

const reactionEmojis = [
  { emoji: '❤️', label: 'Love' },
  { emoji: '👍', label: 'Like' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '🙌', label: 'Celebrate' },
  { emoji: '👌', label: 'OK' },
  { emoji: '🤝', label: 'Handshake' },
  { emoji: '💪', label: 'Strong' },
  { emoji: '🙏', label: 'Thank You' },
  { emoji: '😂', label: 'Laugh' },
  { emoji: '😮', label: 'Wow' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '⭐', label: 'Star' }
];

export default function FeedsView() {
  const router = useRouter();
  const currentUserId = 'user-1';
  const [posts, setPosts] = useState<PostType[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [postToShare, setPostToShare] = useState<PostType | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showReactionsList, setShowReactionsList] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<StaffProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = (userId: string) => {
    const user = getStaffById(userId);
    if (user) {
      setSelectedUser(user);
      setShowProfileModal(true);
    }
  };

  // Mock stories data
  const stories: Story[] = [
    { id: 'story-1', userId: 'user-2', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: 'story-2', userId: 'user-3', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'story-3', userId: 'user-5', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 'story-4', userId: 'user-7', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) }
  ];

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: PostType = {
      id: `post-${Date.now()}`,
      authorId: currentUserId,
      content: newPostContent,
      timestamp: new Date(),
      likes: [],
      reactions: {},
      comments: [],
      shares: 0,
      type: 'text'
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleReaction = (postId: string, emoji: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        const currentReaction = newReactions[currentUserId];
        const currentEmoji = typeof currentReaction === 'string' ? currentReaction : currentReaction?.emoji;

        // If user already reacted with same emoji, remove it
        if (currentEmoji === emoji) {
          delete newReactions[currentUserId];
        } else {
          // Otherwise, set/update their reaction with timestamp
          newReactions[currentUserId] = {
            emoji: emoji,
            timestamp: new Date()
          };
        }

        return {
          ...post,
          reactions: newReactions,
          likes: Object.keys(newReactions) // Keep likes in sync for compatibility
        };
      }
      return post;
    }));
    setShowReactions(null); // Close the popup after selecting
  };

  const handleLongPressStart = (postId: string) => {
    const timer = setTimeout(() => {
      setShowReactions(postId);
    }, 500); // 500ms for long press
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = (postId: string) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleQuickReact = (postId: string) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    // If no reaction, show picker. If already reacted, toggle off
    const post = posts.find(p => p.id === postId);
    const userReaction = post?.reactions?.[currentUserId];

    if (!userReaction) {
      setShowReactions(showReactions === postId ? null : postId);
    }
  };

  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: CommentType = {
          id: `comment-${Date.now()}`,
          authorId: currentUserId,
          content: commentText,
          timestamp: new Date(),
          likes: []
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              const hasLiked = comment.likes.includes(currentUserId);
              return {
                ...comment,
                likes: hasLiked
                  ? comment.likes.filter(id => id !== currentUserId)
                  : [...comment.likes, currentUserId]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleShare = (post: PostType) => {
    setPostToShare(post);
    setShareModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop View - Split with TOM AI */}
      <div className="hidden md:grid md:grid-cols-4 flex-1 overflow-hidden">
        {/* TOM AI Panel - Left Side (Desktop) */}
        <div className="col-span-1 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col overflow-hidden">
          <TomAIChatPanel />
        </div>

        {/* Posts Feed - Middle (Desktop) */}
        <div className="col-span-2 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
          <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Feeds</h2>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
          <div className="py-6 px-4 space-y-4">
            {/* Stories Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {/* Add Your Story */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <button className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 flex items-center justify-center hover:from-blue-200 hover:to-purple-200 transition-all">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </button>
                  <span className="text-xs text-gray-600 font-medium">Your Story</span>
                </div>

                {/* Stories from other users */}
                {stories.map(story => {
                  const user = getStaffById(story.userId);
                  if (!user) return null;
                  return (
                    <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleProfileClick(user.id)}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 p-0.5 hover:scale-105 transition-transform"
                      >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="w-14 h-14 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                              {user.initials}
                            </div>
                          )}
                        </div>
                      </button>
                      <span className="text-xs text-gray-600 font-medium truncate w-16 text-center">
                        {user.firstName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
              <div className="flex gap-3">
                {getStaffById(currentUserId)?.avatar ? (
                  <img
                    src={getStaffById(currentUserId)?.avatar}
                    alt={`${getStaffById(currentUserId)?.firstName}`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {getStaffById(currentUserId)?.initials}
                  </div>
                )}
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                      <ImageIcon className="w-4 h-4" />
                      <span>Photo</span>
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => {
              const author = getStaffById(post.authorId);
              if (!author) return null;

              const userReactionData = post.reactions?.[currentUserId];
              const userReaction = typeof userReactionData === 'string' ? userReactionData : userReactionData?.emoji;
              const isCommentsOpen = showComments === post.id;

              return (
                <div key={post.id} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  {/* Post Header */}
                  <div className="p-4 flex items-start gap-3">
                    <button
                      onClick={() => handleProfileClick(author.id)}
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      {author.avatar ? (
                        <img
                          src={author.avatar}
                          alt={`${author.firstName} ${author.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {author.initials}
                        </div>
                      )}
                    </button>
                    <div className="flex-1">
                      <button
                        onClick={() => handleProfileClick(author.id)}
                        className="font-semibold text-gray-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                      >
                        {author.firstName} {author.lastName}
                      </button>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{author.role} • {getTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-gray-700 dark:text-slate-200 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Stats */}
                  <div className="px-4 py-2 flex items-center justify-between text-sm border-t border-gray-100 dark:border-slate-800">
                    <button
                      onClick={() => setShowReactionsList(showReactionsList === post.id ? null : post.id)}
                      className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                    >
                      {post.likes.length} {post.likes.length === 1 ? 'reaction' : 'reactions'}
                    </button>
                    <button
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                    >
                      {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                    </button>
                  </div>

                  {/* Reactions List */}
                  {showReactionsList === post.id && post.likes.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Reactions</p>
                      <div className="space-y-2">
                        {Object.entries(post.reactions || {}).map(([userId, reactionData]) => {
                          const user = getStaffById(userId);
                          if (!user) return null;
                          const reaction = typeof reactionData === 'string' ? { emoji: reactionData, timestamp: new Date() } : reactionData;
                          return (
                            <div key={userId} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleProfileClick(user.id)}
                                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                                >
                                  {user.avatar ? (
                                    <img
                                      src={user.avatar}
                                      alt={`${user.firstName} ${user.lastName}`}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                      {user.initials}
                                    </div>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleProfileClick(user.id)}
                                  className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                                >
                                  {user.firstName} {user.lastName}
                                </button>
                                <span className="text-xl">{reaction.emoji}</span>
                              </div>
                              <span className="text-xs text-gray-500">{getTimeAgo(reaction.timestamp)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="px-4 pb-3 pt-2 flex items-center gap-2 border-t border-gray-100">
                    <div className="relative flex-1">
                      {/* Backdrop to close popup when clicking outside */}
                      {showReactions === post.id && (
                        <div
                          className="fixed inset-0 z-[5]"
                          onClick={() => setShowReactions(null)}
                        />
                      )}

                      <button
                        onClick={() => handleQuickReact(post.id)}
                        onMouseDown={() => handleLongPressStart(post.id)}
                        onMouseUp={() => handleLongPressEnd(post.id)}
                        onMouseLeave={() => handleLongPressEnd(post.id)}
                        onTouchStart={() => handleLongPressStart(post.id)}
                        onTouchEnd={() => handleLongPressEnd(post.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        {userReaction ? (
                          <span className="text-xl">{userReaction}</span>
                        ) : (
                          <Heart className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium">React</span>
                      </button>

                      {/* Reaction Picker Popup */}
                      {showReactions === post.id && (
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-full shadow-2xl border border-gray-200 px-4 py-3 flex gap-2 z-10 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {reactionEmojis.map((reaction, index) => (
                            <button
                              key={reaction.emoji}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReaction(post.id, reaction.emoji);
                              }}
                              className="text-5xl hover:scale-125 hover:-translate-y-2 active:scale-110 transition-all duration-300 cursor-pointer animate-in zoom-in-0 bounce-in"
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animationDuration: '500ms',
                                animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                              }}
                              title={reaction.label}
                              type="button"
                            >
                              {reaction.emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setShowComments(isCommentsOpen ? null : post.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>

                    <button
                      onClick={() => handleShare(post)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {isCommentsOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 space-y-3">
                      {/* Existing Comments */}
                      {post.comments.map((comment) => {
                        const commentAuthor = getStaffById(comment.authorId);
                        if (!commentAuthor) return null;

                        const hasLikedComment = comment.likes.includes(currentUserId);

                        return (
                          <div key={comment.id} className="flex gap-2">
                            <button
                              onClick={() => handleProfileClick(commentAuthor.id)}
                              className="flex-shrink-0 hover:opacity-80 transition-opacity"
                            >
                              {commentAuthor.avatar ? (
                                <img
                                  src={commentAuthor.avatar}
                                  alt={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                  {commentAuthor.initials}
                                </div>
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="bg-white rounded-lg px-3 py-2">
                                <button
                                  onClick={() => handleProfileClick(commentAuthor.id)}
                                  className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors text-left"
                                >
                                  {commentAuthor.firstName} {commentAuthor.lastName}
                                </button>
                                <p className="text-sm text-gray-700 mt-0.5">{comment.content}</p>
                              </div>
                              <div className="flex items-center gap-3 mt-1 px-2">
                                <button
                                  onClick={() => handleLikeComment(post.id, comment.id)}
                                  className={`text-xs font-semibold ${
                                    hasLikedComment ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                                  }`}
                                >
                                  {hasLikedComment ? 'Liked' : 'Like'}
                                </button>
                                <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                                {comment.likes.length > 0 && (
                                  <span className="text-xs text-gray-500">
                                    ❤️ {comment.likes.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Comment */}
                      <div className="flex gap-2 pt-2">
                        {getStaffById(currentUserId)?.avatar ? (
                          <img
                            src={getStaffById(currentUserId)?.avatar}
                            alt={`${getStaffById(currentUserId)?.firstName}`}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {getStaffById(currentUserId)?.initials}
                          </div>
                        )}
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 placeholder-gray-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        </div>

        {/* Adverts Panel - Right Side (Desktop) */}
        <div className="col-span-1 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <AdvertsPanel />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-full overflow-hidden bg-gray-50">
        {/* Header */}
        <div className="text-white px-4 py-4 flex-shrink-0" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}}>
          <div>
            <h2 className="text-lg font-bold">Feeds</h2>
            <p className="text-xs text-white/80 mt-0.5">Theatre staff collaboration</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Stories Section */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex gap-3 overflow-x-auto">
              {/* Add Your Story */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <button className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-blue-600" />
                </button>
                <span className="text-xs text-gray-600">You</span>
              </div>

              {/* Stories */}
              {stories.map(story => {
                const user = getStaffById(story.userId);
                if (!user) return null;
                return (
                  <div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleProfileClick(user.id)}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 p-0.5"
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                            {user.initials}
                          </div>
                        )}
                      </div>
                    </button>
                    <span className="text-xs text-gray-600 truncate w-14 text-center">
                      {user.firstName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Create Post Mobile */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex gap-2">
              {getStaffById(currentUserId)?.avatar ? (
                <img
                  src={getStaffById(currentUserId)?.avatar}
                  alt={`${getStaffById(currentUserId)?.firstName}`}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {getStaffById(currentUserId)?.initials}
                </div>
              )}
              <button
                onClick={() => {/* Open post composer modal */}}
                className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-full text-left text-sm text-gray-500"
              >
                What's on your mind?
              </button>
            </div>
          </div>

          {/* Posts Feed Mobile */}
          <div className="space-y-2 p-3 pb-6">
            {posts.map((post) => {
              const author = getStaffById(post.authorId);
              if (!author) return null;

              const userReactionData = post.reactions?.[currentUserId];
              const userReaction = typeof userReactionData === 'string' ? userReactionData : userReactionData?.emoji;
              const isCommentsOpen = showComments === post.id;

              return (
                <div key={post.id} className="bg-white rounded-lg border border-gray-200">
                  {/* Post Header */}
                  <div className="p-3 flex items-start gap-2">
                    <button
                      onClick={() => handleProfileClick(author.id)}
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      {author.avatar ? (
                        <img
                          src={author.avatar}
                          alt={`${author.firstName} ${author.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {author.initials}
                        </div>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => handleProfileClick(author.id)}
                        className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors text-left"
                      >
                        {author.firstName} {author.lastName}
                      </button>
                      <p className="text-xs text-gray-500">{author.role} • {getTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-3 pb-2">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Stats */}
                  <div className="px-3 py-1.5 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setShowReactionsList(showReactionsList === post.id ? null : post.id)}
                      className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                    >
                      {post.likes.length} reactions
                    </button>
                    <button
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                    >
                      {post.comments.length} comments
                    </button>
                  </div>

                  {/* Reactions List */}
                  {showReactionsList === post.id && post.likes.length > 0 && (
                    <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Reactions</p>
                      <div className="space-y-1.5">
                        {Object.entries(post.reactions || {}).map(([userId, reactionData]) => {
                          const user = getStaffById(userId);
                          if (!user) return null;
                          const reaction = typeof reactionData === 'string' ? { emoji: reactionData, timestamp: new Date() } : reactionData;
                          return (
                            <div key={userId} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleProfileClick(user.id)}
                                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                                >
                                  {user.avatar ? (
                                    <img
                                      src={user.avatar}
                                      alt={`${user.firstName} ${user.lastName}`}
                                      className="w-5 h-5 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                      {user.initials}
                                    </div>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleProfileClick(user.id)}
                                  className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                                >
                                  {user.firstName} {user.lastName}
                                </button>
                                <span className="text-base">{reaction.emoji}</span>
                              </div>
                              <span className="text-[10px] text-gray-500">{getTimeAgo(reaction.timestamp)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="px-3 pb-2 pt-1.5 flex items-center gap-1 border-t border-gray-100">
                    <div className="relative flex-1">
                      {/* Backdrop to close popup when clicking outside */}
                      {showReactions === post.id && (
                        <div
                          className="fixed inset-0 z-[5]"
                          onClick={() => setShowReactions(null)}
                        />
                      )}

                      <button
                        onClick={() => handleQuickReact(post.id)}
                        onMouseDown={() => handleLongPressStart(post.id)}
                        onMouseUp={() => handleLongPressEnd(post.id)}
                        onMouseLeave={() => handleLongPressEnd(post.id)}
                        onTouchStart={() => handleLongPressStart(post.id)}
                        onTouchEnd={() => handleLongPressEnd(post.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-gray-600 active:bg-gray-100 transition-colors"
                      >
                        {userReaction ? (
                          <span className="text-base">{userReaction}</span>
                        ) : (
                          <Heart className="w-4 h-4" />
                        )}
                        <span className="text-xs font-medium">React</span>
                      </button>

                      {/* Reaction Picker Popup */}
                      {showReactions === post.id && (
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-full shadow-2xl border border-gray-200 px-3 py-2 flex gap-1 z-10 max-w-[90vw] overflow-x-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {reactionEmojis.map((reaction, index) => (
                            <button
                              key={reaction.emoji}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReaction(post.id, reaction.emoji);
                              }}
                              className="text-4xl active:scale-110 hover:scale-125 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex-shrink-0 animate-in zoom-in-0 bounce-in"
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animationDuration: '500ms',
                                animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                              }}
                              title={reaction.label}
                              type="button"
                            >
                              {reaction.emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setShowComments(isCommentsOpen ? null : post.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-gray-600 active:bg-gray-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-medium">Comment</span>
                    </button>

                    <button
                      onClick={() => handleShare(post)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-gray-600 active:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Share</span>
                    </button>
                  </div>

                  {/* Comments Section Mobile */}
                  {isCommentsOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 space-y-2">
                      {/* Existing Comments */}
                      {post.comments.map((comment) => {
                        const commentAuthor = getStaffById(comment.authorId);
                        if (!commentAuthor) return null;

                        const hasLikedComment = comment.likes.includes(currentUserId);

                        return (
                          <div key={comment.id} className="flex gap-2">
                            <button
                              onClick={() => handleProfileClick(commentAuthor.id)}
                              className="flex-shrink-0 hover:opacity-80 transition-opacity"
                            >
                              {commentAuthor.avatar ? (
                                <img
                                  src={commentAuthor.avatar}
                                  alt={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                  {commentAuthor.initials}
                                </div>
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="bg-white rounded-lg px-2.5 py-1.5">
                                <button
                                  onClick={() => handleProfileClick(commentAuthor.id)}
                                  className="font-semibold text-xs text-gray-900 hover:text-blue-600 transition-colors text-left"
                                >
                                  {commentAuthor.firstName} {commentAuthor.lastName}
                                </button>
                                <p className="text-xs text-gray-700 mt-0.5">{comment.content}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-1 px-2">
                                <button
                                  onClick={() => handleLikeComment(post.id, comment.id)}
                                  className={`text-xs font-semibold ${
                                    hasLikedComment ? 'text-red-600' : 'text-gray-600'
                                  }`}
                                >
                                  {hasLikedComment ? 'Liked' : 'Like'}
                                </button>
                                <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                                {comment.likes.length > 0 && (
                                  <span className="text-xs text-gray-500">❤️ {comment.likes.length}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Comment Mobile */}
                      <div className="flex gap-2 pt-1">
                        {getStaffById(currentUserId)?.avatar ? (
                          <img
                            src={getStaffById(currentUserId)?.avatar}
                            alt={`${getStaffById(currentUserId)?.firstName}`}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {getStaffById(currentUserId)?.initials}
                          </div>
                        )}
                        <div className="flex-1 flex gap-1.5">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white text-gray-900 placeholder-gray-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="p-1.5 bg-blue-600 text-white rounded-full disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => {
          setShareModalOpen(false);
          setPostToShare(null);
        }}
        postContent={postToShare?.content || ''}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}
