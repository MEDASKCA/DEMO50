'use client';

import React from 'react';
import { ClipboardList, Users, Package, Activity, BarChart3, Shield, Settings, Menu as MenuIcon, Bot, Bell, Box, User, Rss } from 'lucide-react';
import TomLogo from './TomLogo';
import { useListening } from '@/contexts/ListeningContext';

interface AdminBottomNavProps {
  currentPage: 'ai' | 'home' | 'ops' | 'theatres' | 'alerts' | 'menu' | 'workforce' | 'inventory';
  onNavigate: (page: 'ai' | 'home' | 'ops' | 'theatres' | 'alerts' | 'menu' | 'workforce' | 'inventory') => void;
}

export default function AdminBottomNav({ currentPage, onNavigate }: AdminBottomNavProps) {
  const { isListening } = useListening();
  const navItems = [
    { id: 'ai' as const, icon: 'tomlogo' as const, label: 'TOM' },
    { id: 'home' as const, icon: Rss, label: 'Feeds' },
    { id: 'ops' as const, icon: Activity, label: 'Ops' },
    { id: 'theatres' as const, icon: Box, label: 'Logistics' },
    { id: 'alerts' as const, icon: Bell, label: 'Alerts' },
    { id: 'menu' as const, icon: User, label: 'Account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[60] safe-area-inset-bottom shadow-lg">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors relative ${
                isActive ? 'text-teal-600' : 'text-gray-600'
              }`}
            >
              {item.icon === 'tomlogo' ? (
                <TomLogo
                  isListening={isListening && isActive}
                  size={28}
                  variant="inline"
                  className={isActive ? 'opacity-100' : 'opacity-70'}
                />
              ) : (
                React.createElement(item.icon as any, {
                  className: `w-6 h-6 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'}`
                })
              )}
              <span className={`text-[10px] font-semibold ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
