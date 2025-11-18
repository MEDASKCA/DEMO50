'use client';

import React, { useState } from 'react';
import { X, Send, Search } from 'lucide-react';
import { mockStaffProfiles, getStaffById, type StaffProfile } from '@/lib/socialMockData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
}

export default function ShareModal({ isOpen, onClose, postContent }: ShareModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const filteredContacts = mockStaffProfiles.filter(staff =>
    staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleContact = (staffId: string) => {
    setSelectedContacts(prev =>
      prev.includes(staffId)
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleShare = () => {
    if (selectedContacts.length === 0) return;
    // In a real app, this would send the post to selected contacts
    console.log('Sharing with:', selectedContacts, 'Message:', message);
    onClose();
    setSelectedContacts([]);
    setMessage('');
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 via-teal-50 to-purple-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded-t-2xl">
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
            Share with Network
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-all shadow-sm active:scale-95"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{postContent}</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Selected Contacts */}
        {selectedContacts.length > 0 && (
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Selected: {selectedContacts.length}</p>
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map(id => {
                const contact = getStaffById(id);
                if (!contact) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                  >
                    {contact.firstName} {contact.lastName}
                    <button
                      onClick={() => handleToggleContact(id)}
                      className="hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => handleToggleContact(contact.id)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedContacts.includes(contact.id) ? 'bg-blue-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {contact.initials}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{contact.role}</p>
              </div>
              {selectedContacts.includes(contact.id) && (
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message (optional)..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            rows={2}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={selectedContacts.length === 0}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            Share ({selectedContacts.length})
          </button>
        </div>
      </div>
    </div>
  );
}
