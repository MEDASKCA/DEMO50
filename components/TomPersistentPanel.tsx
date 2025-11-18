'use client';

import React, { useState, createContext, useContext } from 'react';
import TomAIChatPanel from './views/TomAIView';
import { Menu, X, Maximize2, Minimize2 } from 'lucide-react';

interface TomContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const TomContext = createContext<TomContextType | undefined>(undefined);

export const useTom = () => {
  const context = useContext(TomContext);
  if (!context) {
    throw new Error('useTom must be used within TomProvider');
  }
  return context;
};

export function TomProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TomContext.Provider value={{ isOpen, setIsOpen, isExpanded, setIsExpanded }}>
      {children}
    </TomContext.Provider>
  );
}

export default function TomPersistentPanel() {
  const { isOpen, setIsOpen, isExpanded, setIsExpanded } = useTom();

  return (
    <>
      {/* Desktop Persistent Panel */}
      <div className="hidden md:block">
        {isOpen && (
          <div
            className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 ${
              isExpanded ? 'w-[600px]' : 'w-[380px]'
            }`}
          >
            {/* Header */}
            <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  TOM
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">TOM AI</h2>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Theatre Operations Manager</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Close TOM"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* TOM Chat Interface */}
            <div className="h-[calc(100vh-3.5rem)]">
              <TomAIChatPanel showHeader={false} />
            </div>
          </div>
        )}

        {/* Reopen Button when closed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed left-4 bottom-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white font-bold text-lg group"
            title="Open TOM"
          >
            <span className="group-hover:scale-110 transition-transform">TOM</span>
          </button>
        )}
      </div>

      {/* Mobile Floating Button */}
      <div className="md:hidden fixed right-4 bottom-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Full-Screen Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900">
          <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                TOM
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">TOM AI</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Theatre Operations Manager</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="h-[calc(100vh-3.5rem)]">
            <TomAIChatPanel showHeader={false} />
          </div>
        </div>
      )}
    </>
  );
}
