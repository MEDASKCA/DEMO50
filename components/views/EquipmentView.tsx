'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  INVENTORY_ITEMS,
  InventoryItem,
  InventoryCategory,
  searchItems,
  formatCurrency,
  SPECIALTIES
} from '@/lib/inventoryData';
import {
  Search,
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Filter,
  Grid,
  List,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Package,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Settings,
  Zap
} from 'lucide-react';

interface EquipmentViewProps {
  onBack?: () => void;
  isAdmin?: boolean;
}

// Equipment-focused categories (capital equipment, not consumables)
const EQUIPMENT_CATEGORIES: InventoryCategory[] = [
  "Power Tools",
  "Medical Devices",
  "Operating Tables",
  "Instrument Trays"
];

export default function EquipmentView({ onBack, isAdmin = false }: EquipmentViewProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | ''>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showStats, setShowStats] = useState(false);

  // Filter equipment items only
  const equipmentItems = useMemo(() => {
    return INVENTORY_ITEMS.filter(item =>
      EQUIPMENT_CATEGORIES.includes(item.category)
    );
  }, []);

  // Apply filters
  const filteredItems = useMemo(() => {
    let items = equipmentItems;

    // Search filter
    if (searchTerm.trim()) {
      items = searchItems(items, searchTerm);
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Specialty filter
    if (selectedSpecialty !== 'All Specialties') {
      items = items.filter(item => item.specialty.includes(selectedSpecialty));
    }

    return items;
  }, [equipmentItems, searchTerm, selectedCategory, selectedSpecialty]);

  // Stats
  const stats = useMemo(() => {
    const total = equipmentItems.length;
    const needsMaintenance = equipmentItems.filter(item =>
      item.stock.current < item.stock.minimum
    ).length;
    const inUse = Math.floor(equipmentItems.length * 0.7); // Mock data
    const available = total - inUse;

    return { total, needsMaintenance, inUse, available };
  }, [equipmentItems]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getStatusInfo = (item: InventoryItem) => {
    const stockPercentage = (item.stock.current / item.stock.maximum) * 100;

    if (stockPercentage < 20) {
      return { label: 'Maintenance Due', color: 'red', icon: AlertCircle };
    } else if (stockPercentage < 50) {
      return { label: 'Check Required', color: 'amber', icon: AlertTriangle };
    } else if (stockPercentage < 80) {
      return { label: 'In Service', color: 'blue', icon: Clock };
    } else {
      return { label: 'Optimal', color: 'green', icon: CheckCircle };
    }
  };

  const getCategoryIcon = (category: InventoryCategory) => {
    switch (category) {
      case 'Power Tools': return Zap;
      case 'Medical Devices': return Settings;
      case 'Operating Tables': return Package;
      case 'Instrument Trays': return Grid;
      default: return Wrench;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Compact Header - Only show for non-admin */}
      {!isAdmin && (
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Wrench className="w-6 h-6" />
                Equipment Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Theatre equipment, capital assets, and maintenance tracking
              </p>
            </div>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5 text-gray-600" /> : <Grid className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      )}

      {/* Toggleable Stats Dashboard */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Quick Stats</span>
            <span className="text-xs text-gray-500">
              ({stats.total} items, {stats.needsMaintenance} need attention)
            </span>
          </div>
          {showStats ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {showStats && (
          <div className="px-4 pb-3 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Total Equipment</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Wrench className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Available</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">In Use</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inUse}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">Maintenance</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.needsMaintenance}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 space-y-3 flex-shrink-0">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search equipment..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category and Specialty Filters */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as InventoryCategory | '')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {EQUIPMENT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SPECIALTIES.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          {(selectedCategory || selectedSpecialty !== 'All Specialties' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedSpecialty('All Specialties');
                setSearchTerm('');
              }}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        <p className="text-xs text-gray-600">
          Showing {filteredItems.length} of {equipmentItems.length} equipment items
        </p>
      </div>

      {/* Equipment List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Wrench className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-semibold">No equipment found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              const status = getStatusInfo(item);
              const StatusIcon = status.icon;
              const CategoryIcon = getCategoryIcon(item.category);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Item Header */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <CategoryIcon className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          status.color === 'green' ? 'bg-green-100 text-green-700' :
                          status.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          status.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-600">{item.category}</span>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-600 font-medium mb-1">Equipment Details</p>
                          <div className="space-y-1">
                            <p className="text-gray-700"><span className="font-medium">ID:</span> {item.id}</p>
                            <p className="text-gray-700"><span className="font-medium">Supplier:</span> {item.supplier}</p>
                            <p className="text-gray-700"><span className="font-medium">Ref:</span> {item.productReference}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium mb-1">Stock Information</p>
                          <div className="space-y-1">
                            <p className="text-gray-700"><span className="font-medium">Current:</span> {item.stock.current}</p>
                            <p className="text-gray-700"><span className="font-medium">Min:</span> {item.stock.minimum}</p>
                            <p className="text-gray-700"><span className="font-medium">Max:</span> {item.stock.maximum}</p>
                          </div>
                        </div>
                      </div>

                      {item.specialty.length > 0 && (
                        <div className="mt-3">
                          <p className="text-gray-600 font-medium text-xs mb-1">Specialties</p>
                          <div className="flex flex-wrap gap-1">
                            {item.specialty.map((spec, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.lastOrdered && (
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Last Ordered: {item.lastOrdered}
                          </span>
                          {item.frequency && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Frequency: {item.frequency}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const status = getStatusInfo(item);
              const StatusIcon = status.icon;
              const CategoryIcon = getCategoryIcon(item.category);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          status.color === 'green' ? 'bg-green-100 text-green-700' :
                          status.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          status.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="font-medium">{item.category}</span>
                      <span>{item.stock.current} units</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
