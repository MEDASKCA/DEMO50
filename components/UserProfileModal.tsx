'use client';

import React from 'react';
import { X, Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';
import { type StaffProfile } from '@/lib/socialMockData';

interface UserProfileModalProps {
  user: StaffProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  if (!isOpen || !user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Photo - overlapping header */}
          <div className="relative px-6 -mt-16 pb-4">
            <div className="flex justify-center mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-lg">
                  {user.initials}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{user.role}</p>
              {user.specialty && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  <Award className="w-3.5 h-3.5" />
                  {user.specialty}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              {user.trust && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Trust / Organization</p>
                    <p className="text-sm font-medium text-gray-900">{user.trust}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName.toLowerCase()}.{user.lastName.toLowerCase()}@nhs.net
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Bleep / Extension</p>
                  <p className="text-sm font-medium text-gray-900">Bleep #{Math.floor(Math.random() * 9000) + 1000}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Message
              </button>
              <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
