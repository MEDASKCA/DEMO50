'use client';

import React from 'react';
import { X, Activity, Calendar, Users, ClipboardList, Bell, Package, Target, BarChart3, User, Settings, HelpCircle, LogOut, LayoutDashboard, Wrench, Shield, Database } from 'lucide-react';
import DrawerNav from './DrawerNav';
import { useRouter } from 'next/navigation';

interface SubMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuType: 'menu' | 'ops' | 'logistics' | null;
  onNavigate: (page: string) => void;
}

export default function SubMenuModal({ isOpen, onClose, menuType, onNavigate }: SubMenuModalProps) {
  const router = useRouter();

  if (!isOpen || !menuType) return null;

  const menuItems = {
    menu: [
      { id: 'profile', icon: User, label: 'Profile', description: 'Manage your personal information', color: 'blue' },
      { id: 'settings', icon: Settings, label: 'Settings', description: 'App preferences and configurations', color: 'teal' },
      { id: 'help', icon: HelpCircle, label: 'Help and Support', description: 'Get help and contact support', color: 'purple' },
      { id: 'signout', icon: LogOut, label: 'Sign Out', description: 'Log out of your account', color: 'red' },
    ],
    ops: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', description: 'Operations overview & insights', color: 'teal' },
      { id: 'theatreSchedule', icon: Calendar, label: 'Schedule', description: 'Theatre schedule & bookings', color: 'blue' },
      { id: 'readiness', icon: Target, label: 'Readiness', description: 'Theatre readiness status', color: 'teal' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics', description: 'Performance metrics', color: 'blue' },
    ],
    logistics: [
      { id: 'roster', icon: Calendar, label: 'My Shifts', description: 'View and manage your shifts', color: 'blue' },
      { id: 'supply', icon: Package, label: 'Supply', description: 'Catalogue & inventory mgmt', color: 'teal' },
      { id: 'equipment', icon: Wrench, label: 'Equipment', description: 'Equipment tracking & maintenance', color: 'purple' },
      { id: 'procedures-preferences', icon: Database, label: 'Procedures & Preferences', description: 'Surgical procedures & preference cards', color: 'blue' },
    ]
  };

  const items = menuItems[menuType];
  const title = menuType === 'ops' ? 'Operations' : menuType === 'logistics' ? 'Logistics' : 'Account';

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
        border: 'border-green-200',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        hover: 'hover:from-green-100 hover:to-emerald-100 hover:border-green-300'
      },
      indigo: {
        bg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        border: 'border-indigo-200',
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        hover: 'hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        hover: 'hover:from-purple-100 hover:to-pink-100 hover:border-purple-300'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        hover: 'hover:from-orange-100 hover:to-amber-100 hover:border-orange-300'
      },
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        hover: 'hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300'
      },
      cyan: {
        bg: 'bg-gradient-to-br from-cyan-50 to-teal-50',
        border: 'border-cyan-200',
        iconBg: 'bg-cyan-100',
        iconColor: 'text-cyan-600',
        hover: 'hover:from-cyan-100 hover:to-teal-100 hover:border-cyan-300'
      },
      teal: {
        bg: 'bg-gradient-to-br from-teal-50 to-emerald-50',
        border: 'border-teal-200',
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        hover: 'hover:from-teal-100 hover:to-emerald-100 hover:border-teal-300'
      },
      amber: {
        bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
        border: 'border-amber-200',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        hover: 'hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300'
      },
      red: {
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        hover: 'hover:from-red-100 hover:to-rose-100 hover:border-red-300'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <DrawerNav isOpen={isOpen} onClose={onClose} title={title}>
      {menuType === 'menu' && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
              AM
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Alexander Monterubio</p>
              <p className="text-sm text-gray-600">Theatre Manager</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const colorClasses = getColorClasses(item.color);
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'admin') {
                  router.push('/admin');
                  onClose();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`w-full ${colorClasses.bg} border ${colorClasses.border} rounded-lg p-3 flex items-center space-x-3 ${colorClasses.hover} transition-all shadow-sm active:scale-[0.98]`}
            >
              <div className={`w-11 h-11 ${colorClasses.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${colorClasses.iconColor}`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{item.label}</p>
                <p className="text-[11px] text-gray-600 leading-tight">{item.description}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </DrawerNav>
  );
}
