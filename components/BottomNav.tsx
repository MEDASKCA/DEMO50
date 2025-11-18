'use client';

import React from 'react';
import { Rss, Sparkles, Activity, Package, Bell, User } from 'lucide-react';
import TomLogo from './TomLogo';
import { useListening } from '@/contexts/ListeningContext';

interface BottomNavProps {
  currentPage: 'feeds' | 'chat' | 'theatres' | 'staff' | 'alerts' | 'menu';
  onNavigate: (page: 'feeds' | 'chat' | 'theatres' | 'staff' | 'alerts' | 'menu') => void;
  alertCount?: number;
}

export default function BottomNav({ currentPage, onNavigate, alertCount = 0 }: BottomNavProps) {
  const { isListening } = useListening();
  const navItems = [
    { id: 'chat' as const, icon: 'tomlogo' as const, label: 'TOM' },
    { id: 'feeds' as const, icon: Rss, label: 'Feeds' },
    { id: 'theatres' as const, icon: Activity, label: 'Ops' },
    { id: 'staff' as const, icon: Package, label: 'Logistics' },
    { id: 'alerts' as const, icon: Bell, label: 'Alerts', badge: alertCount },
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
              <div className="relative">
                {item.icon === 'tomlogo' ? (
                  <TomLogo
                    isListening={isListening && isActive}
                    size={28}
                    variant="inline"
                    className={isActive ? 'opacity-100' : 'opacity-70'}
                  />
                ) : (
                  <>
                    {React.createElement(item.icon as any, {
                      className: `w-6 h-6 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'}`
                    })}
                    {item.badge !== undefined && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-semibold rounded-full min-w-[12px] h-3 flex items-center justify-center px-0.5 shadow-sm">
                        {item.badge > 99 ? '99' : item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
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
