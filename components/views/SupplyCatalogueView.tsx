'use client';

import React, { useState } from 'react';
import { Box, Warehouse, ShoppingCart, ClipboardList, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import InventoryView from './InventoryView';

interface SupplyCatalogueViewProps {
  onBack: () => void;
}

type SidebarTab = 'stock' | 'storage' | 'reorder' | 'requests' | 'audit';

export default function SupplyCatalogueView({ onBack }: SupplyCatalogueViewProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('stock');
  const [costUnlocked, setCostUnlocked] = useState(false);

  const sidebarItems = [
    { id: 'stock' as SidebarTab, label: 'Stock', icon: Box, description: 'Current inventory levels' },
    { id: 'storage' as SidebarTab, label: 'Storage', icon: Warehouse, description: 'Storage locations & organization' },
    { id: 'reorder' as SidebarTab, label: 'Reorder', icon: ShoppingCart, description: 'Reorder points & purchasing' },
    { id: 'requests' as SidebarTab, label: 'Requests', icon: ClipboardList, description: 'Staff supply requests' },
    { id: 'audit' as SidebarTab, label: 'Audit', icon: FileText, description: 'Stock audits & tracking' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Title & Description - Desktop Only */}
      <div className="hidden md:block px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Supplies Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Theatre equipment, consumables, and supplies catalog
            </p>
          </div>
          {/* Cost Button */}
          <div className="relative ml-4">
            {!costUnlocked ? (
              <button
                onClick={() => setCostUnlocked(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Cost</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Cost Visible</span>
                </div>
                <button
                  onClick={() => setCostUnlocked(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  title="Lock Cost"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200">
          <div className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-teal-50 border-l-4 border-teal-600'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    isActive ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className={`font-semibold text-sm ${
                      isActive ? 'text-teal-900' : 'text-gray-700'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <InventoryView
            onBack={onBack}
            fixedTab={activeTab}
            costUnlocked={costUnlocked}
            onCostUnlockedChange={setCostUnlocked}
          />
        </div>
      </div>
    </div>
  );
}
