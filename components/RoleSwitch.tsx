'use client';

import React, { useState } from 'react';
import { Users, UserCheck, Briefcase, TrendingUp, ChevronDown } from 'lucide-react';

export type UserRole = 'staff' | 'manager';

interface RoleSwitchProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  userName?: string;
  userTitle?: string;
  className?: string;
}

export default function RoleSwitch({
  currentRole,
  onRoleChange,
  userName = 'Alexander Monterubio',
  userTitle = 'Band 7 Theatre Coordinator',
  className = ''
}: RoleSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'staff' as UserRole,
      icon: UserCheck,
      label: 'Staff View',
      description: 'My shifts, my procedures, my rota',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700'
    },
    {
      id: 'manager' as UserRole,
      icon: Briefcase,
      label: 'Manager View',
      description: 'All staff, all procedures, scheduling',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700'
    }
  ];

  const currentRoleData = roles.find(r => r.id === currentRole);
  const Icon = currentRoleData?.icon || UserCheck;

  return (
    <div className={`relative ${className}`}>
      {/* Current Role Display - Uber Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all hover:shadow-md ${
          currentRoleData?.bgColor
        } ${currentRoleData?.borderColor}`}
      >
        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentRoleData?.color} flex items-center justify-center text-white shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-bold ${currentRoleData?.textColor}`}>
              {currentRoleData?.label}
            </p>
            <ChevronDown className={`w-4 h-4 ${currentRoleData?.textColor} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-xs text-gray-600">{currentRoleData?.description}</p>
        </div>
      </button>

      {/* Dropdown Menu - Uber Style */}
      {isOpen && (
        <>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-gray-200 shadow-xl overflow-hidden z-50">
            {/* User Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <p className="text-sm font-bold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userTitle}</p>
            </div>

            {/* Role Options */}
            <div className="p-2">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                const isActive = role.id === currentRole;

                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      onRoleChange(role.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? `${role.bgColor} ${role.borderColor} border-2`
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-white shadow-sm`}>
                      <RoleIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-bold ${isActive ? role.textColor : 'text-gray-900'}`}>
                          {role.label}
                        </p>
                        {isActive && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>

                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Footer */}
            <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-t border-gray-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-800">Dual-Role Account</p>
                  <p className="text-[10px] text-teal-600 leading-tight">
                    Switch between Staff and Manager views anytime. Your data stays in sync!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}

// Compact version for mobile/small spaces
export function RoleSwitchCompact({
  currentRole,
  onRoleChange,
  className = ''
}: Omit<RoleSwitchProps, 'userName' | 'userTitle'>) {
  const roles = [
    {
      id: 'staff' as UserRole,
      icon: UserCheck,
      label: 'Staff',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'manager' as UserRole,
      icon: Briefcase,
      label: 'Manager',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-gray-100 rounded-lg ${className}`}>
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = role.id === currentRole;

        return (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              isActive
                ? `bg-gradient-to-r ${role.color} text-white shadow-sm`
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Role indicator badge (for showing current role in UI)
export function RoleBadge({ role, className = '' }: { role: UserRole; className?: string }) {
  const roleConfig = {
    staff: {
      label: 'Staff View',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      icon: UserCheck
    },
    manager: {
      label: 'Manager View',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: Briefcase
    }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 ${config.color} text-white text-xs font-bold rounded-full shadow-sm ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}
