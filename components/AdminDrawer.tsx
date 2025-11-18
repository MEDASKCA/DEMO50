'use client';

import React from 'react';
import { Calendar, Target, BarChart3, Settings, FileCheck, Activity, Users as UsersIcon, UserCheck, Package, Warehouse, RefreshCw, ShoppingCart, TrendingUp, Sliders, Grid3x3, ClipboardList, Briefcase, User, CalendarOff, Search, DollarSign, List, Database, AlertTriangle, Clock, XCircle, PoundSterling, HelpCircle, LogOut } from 'lucide-react';
import DrawerNav from './DrawerNav';
import { useRouter } from 'next/navigation';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerType: 'theatres' | 'menu' | 'workforce' | 'inventory' | 'ops' | 'alerts' | 'lists' | null;
  onNavigate: (page: string) => void;
}

export default function AdminDrawer({ isOpen, onClose, drawerType, onNavigate }: AdminDrawerProps) {
  const router = useRouter();

  if (!isOpen || !drawerType) return null;

  const menuItems = {
    ops: [
      { id: 'dashboard', icon: BarChart3, label: 'Dashboard', description: 'Overview & key metrics', color: 'teal' },
      { id: 'configurations', icon: Sliders, label: 'Configurations', description: 'Units, specialties & setup', color: 'blue' },
      { id: 'sessions', icon: Calendar, label: 'Schedule', description: 'Theatre session planning', color: 'purple' },
      { id: 'lists', icon: List, label: 'Lists', description: 'Waiting list & procedures pool', color: 'blue' },
      { id: 'acute-services', icon: Activity, label: 'Acute Services', description: 'Emergency & acute care operations', color: 'purple' },
      { id: 'readiness', icon: FileCheck, label: 'Readiness', description: 'Theatre readiness checks', color: 'purple' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics', description: 'Metrics & reporting config', color: 'teal' },
    ],
    theatres: [
      { id: 'requirements', icon: UsersIcon, label: 'Requirements', description: 'Map specialties to required staff roles', color: 'blue' },
      { id: 'workforce', icon: UsersIcon, label: 'Workforce', description: 'Workforce management & planning', color: 'teal' },
      { id: 'workforce-costs', icon: PoundSterling, label: 'Costs', description: 'Workforce cost analysis', color: 'purple' },
      { id: 'inventory', icon: Package, label: 'Inventory', description: 'Inventory management & control', color: 'purple' },
      { id: 'opcs4-database', icon: Database, label: 'Procedures & Preferences', description: 'Surgical procedures & preference cards', color: 'blue' },
    ],
    menu: [
      { id: 'profile', icon: User, label: 'Profile', description: 'Manage your personal information', color: 'blue' },
      { id: 'settings', icon: Settings, label: 'Settings', description: 'App preferences and configurations', color: 'teal' },
      { id: 'help', icon: HelpCircle, label: 'Help and Support', description: 'Get help and contact support', color: 'purple' },
      { id: 'signout', icon: LogOut, label: 'Sign Out', description: 'Log out of your account', color: 'purple' },
    ],
    alerts: [
      { id: 'critical-alerts', icon: AlertTriangle, label: 'Critical Alerts', description: 'Urgent system notifications', color: 'blue' },
      { id: 'pending-tasks', icon: Clock, label: 'Pending Tasks', description: 'Tasks requiring attention', color: 'teal' },
      { id: 'incidents', icon: XCircle, label: 'Incidents', description: 'Reported incidents & issues', color: 'purple' },
    ],
    lists: [
      { id: 'waiting-list', icon: ClipboardList, label: 'Waiting List', description: 'Patient waiting list management', color: 'blue' },
      { id: 'procedures-pool', icon: Grid3x3, label: 'Procedures Pool', description: 'Procedure scheduling pool', color: 'teal' },
    ],
    workforce: [],
    inventory: []
  };

  const items = menuItems[drawerType];
  const title = drawerType === 'ops' ? 'Operations'
    : drawerType === 'theatres' ? 'Logistics'
    : drawerType === 'alerts' ? 'Alerts & Notifications'
    : drawerType === 'lists' ? 'Lists & Pools'
    : drawerType === 'workforce' ? 'Workforce Management'
    : drawerType === 'inventory' ? 'Inventory Management'
    : drawerType === 'menu' ? 'Account'
    : 'More Options';

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        hover: 'hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300'
      },
      teal: {
        bg: 'bg-gradient-to-br from-teal-50 to-emerald-50',
        border: 'border-teal-200',
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        hover: 'hover:from-teal-100 hover:to-emerald-100 hover:border-teal-300'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        hover: 'hover:from-purple-100 hover:to-pink-100 hover:border-purple-300'
      }
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <DrawerNav isOpen={isOpen} onClose={onClose} title={title}>
      {drawerType === 'menu' && (
        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-base sm:text-xl font-bold">
              AM
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold !text-gray-900">Alexander Monterubio</p>
              <p className="text-xs sm:text-sm !text-gray-700">Theatre Manager</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-1.5 sm:space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const colorClasses = getColorClasses(item.color);
          return (
            <button
              key={item.id}
              onClick={() => {
                // Handle route-based navigation for Logistics - Workforce & Inventory
                if (item.id === 'workforce') {
                  router.push('/admin/workforce');
                  onClose();
                } else if (item.id === 'inventory') {
                  router.push('/admin/inventory');
                  onClose();
                }
                // Handle route-based navigation for Logistics - Procedures
                else if (item.id === 'opcs4-database') {
                  router.push('/admin/procedures/opcs4-database');
                  onClose();
                }
                // Handle route-based navigation for Ops
                else if (item.id === 'dashboard') {
                  onNavigate('dashboard');
                } else if (item.id === 'configurations') {
                  router.push('/admin/theatre-management?tab=configurations');
                  onClose();
                } else if (item.id === 'sessions') {
                  router.push('/admin/sessions');
                  onClose();
                } else if (item.id === 'lists') {
                  router.push('/admin/lists');
                  onClose();
                } else if (item.id === 'schedule') {
                  router.push('/admin/schedule');
                  onClose();
                } else if (item.id === 'requirements') {
                  router.push('/admin/staff-allocation');
                  onClose();
                } else if (item.id === 'workforce-fte') {
                  router.push('/admin/workforce?tab=fte');
                  onClose();
                } else if (item.id === 'workforce-leave') {
                  router.push('/admin/workforce?tab=leave');
                  onClose();
                } else if (item.id === 'workforce-costs') {
                  router.push('/admin/workforce?tab=costs');
                  onClose();
                } else if (item.id === 'readiness') {
                  router.push('/admin/readiness');
                  onClose();
                } else if (item.id === 'analytics') {
                  router.push('/admin/operations');
                  onClose();
                } else if (item.id === 'acute-services') {
                  router.push('/admin/acute-services');
                  onClose();
                }
                // Handle menu navigation
                else if (item.id === 'profile') {
                  onNavigate('profile');
                  onClose();
                } else if (item.id === 'settings') {
                  onNavigate('settings');
                  onClose();
                } else if (item.id === 'help') {
                  onNavigate('help');
                  onClose();
                } else if (item.id === 'signout') {
                  // Handle sign out
                  router.push('/');
                  onClose();
                } else {
                  // Handle view-based navigation for other items (including alerts)
                  onNavigate(item.id);
                  onClose();
                }
              }}
              className={`w-full ${colorClasses.bg} border ${colorClasses.border} rounded-md sm:rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3 ${colorClasses.hover} transition-all shadow-sm active:scale-[0.98]`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 ${colorClasses.iconBg} rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 ${colorClasses.iconColor}`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs sm:text-sm font-bold !text-gray-900 truncate leading-tight sm:leading-normal">{item.label}</p>
                <p className="text-[10px] sm:text-[11px] !text-gray-700 leading-tight line-clamp-1 sm:line-clamp-none">{item.description}</p>
              </div>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 !text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </DrawerNav>
  );
}
