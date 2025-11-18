'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  INVENTORY_ITEMS,
  InventoryItem,
  InventoryCategory,
  Classification,
  getItemsByCategory,
  getItemsBySpecialty,
  getItemsByClassification,
  searchItems,
  getLowStockItems,
  formatCurrency,
  SPECIALTIES
} from '@/lib/inventoryData';
import {
  Search,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Package,
  AlertTriangle,
  TrendingDown,
  User,
  Phone,
  Mail,
  Calendar,
  BarChart,
  X,
  Info,
  Filter,
  Grid,
  List,
  Plus,
  Warehouse,
  Trash2,
  Check,
  Loader2,
  Upload,
  Download,
  Edit,
  FileUp,
  ShoppingCart,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  FileText,
  ClipboardList,
  Send,
  AlertCircle
} from 'lucide-react';

interface InventoryViewProps {
  onBack?: () => void;
  isAdmin?: boolean; // Admin mode enables edit/delete/add features
  fixedTab?: 'stock' | 'storage' | 'reorder' | 'requests' | 'audit'; // If provided, locks to this tab and hides tab navigation
  costUnlocked?: boolean;
  onCostUnlockedChange?: (unlocked: boolean) => void;
}

export default function InventoryView({ onBack, isAdmin = false, fixedTab, costUnlocked: propCostUnlocked, onCostUnlockedChange }: InventoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | ''>('');
  const [selectedClassification, setSelectedClassification] = useState<Classification | 'All'>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showCostPassword, setShowCostPassword] = useState(false);
  const [costPassword, setCostPassword] = useState('');
  const [internalCostUnlocked, setInternalCostUnlocked] = useState(false); // Toggle button - no password required for demo
  const [costError, setCostError] = useState('');

  // Use prop if provided, otherwise use internal state
  const costUnlocked = propCostUnlocked !== undefined ? propCostUnlocked : internalCostUnlocked;
  const setCostUnlocked = onCostUnlockedChange || setInternalCostUnlocked;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState<'stock' | 'storage' | 'reorder' | 'requests' | 'audit'>(fixedTab || 'stock');
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileSpecialtyOpen, setMobileSpecialtyOpen] = useState(false);
  const [mobileAlertsOpen, setMobileAlertsOpen] = useState(false);
  const [desktopCategoryOpen, setDesktopCategoryOpen] = useState(true);
  const [desktopSpecialtyOpen, setDesktopSpecialtyOpen] = useState(true);

  // Sync activeTab with fixedTab prop when it changes
  useEffect(() => {
    if (fixedTab) {
      setActiveTab(fixedTab);
    }
  }, [fixedTab]);

  // Storage Management State
  interface StorageLocation {
    id: string;
    name: string;
    description: string;
    type: 'Room' | 'Zone' | 'Cabinet' | 'Shelf';
    specialty: string; // 'Theatre Common' or specific specialty
  }

  interface StorageContainer {
    id: string;
    locationId: string;
    name: string;
    capacity: number;
    items: string[]; // Array of inventory item IDs
  }

  const [storageLocations, setStorageLocations] = useState<StorageLocation[]>([
    { id: 'LOC-001', name: 'Main Theatre Supply Room', description: 'Shared storage for all specialties', type: 'Room', specialty: 'Theatre Common' },
    { id: 'LOC-002', name: 'Sterile Processing Area', description: 'Common sterile instruments', type: 'Zone', specialty: 'Theatre Common' },
    { id: 'LOC-003', name: 'Orthopaedics Equipment Room', description: 'Dedicated orthopaedics storage', type: 'Room', specialty: 'Trauma Orthopaedics' },
  ]);

  const [storageContainers, setStorageContainers] = useState<StorageContainer[]>([
    { id: 'CONT-001', locationId: 'LOC-001', name: 'Shelf A1', capacity: 20, items: [] },
    { id: 'CONT-002', locationId: 'LOC-001', name: 'Shelf A2', capacity: 20, items: [] },
    { id: 'CONT-003', locationId: 'LOC-002', name: 'Sterile Cabinet 1', capacity: 15, items: [] },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddContainer, setShowAddContainer] = useState(false);
  const [selectedLocationForContainer, setSelectedLocationForContainer] = useState<string>('');
  const [newLocation, setNewLocation] = useState({ name: '', description: '', type: 'Room' as const, specialty: 'Theatre Common' });
  const [newContainer, setNewContainer] = useState({ name: '', capacity: 20 });
  const [mobileStorageView, setMobileStorageView] = useState<'items' | 'locations'>('items');
  const [selectedItemForAssignment, setSelectedItemForAssignment] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [storageSearchTerm, setStorageSearchTerm] = useState('');
  const [expandedSpecialties, setExpandedSpecialties] = useState<Set<string>>(new Set(['Theatre Common']));
  const [selectedStorageSpecialty, setSelectedStorageSpecialty] = useState<string>('Theatre Common');
  const [configuredSpecialties, setConfiguredSpecialties] = useState<Array<{id: string; name: string; abbreviation: string}>>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);

  // Admin features state
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUploading, setCsvUploading] = useState(false);

  // Load specialties from Firebase
  useEffect(() => {
    const loadSpecialties = async () => {
      setLoadingSpecialties(true);
      try {
        const { collection, getDocs, query } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase');
        const q = query(collection(db, 'specialties'));
        const snapshot = await getDocs(q);
        const loadedSpecialties: Array<{id: string; name: string; abbreviation: string}> = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          loadedSpecialties.push({
            id: doc.id,
            name: data.name,
            abbreviation: data.abbreviation || data.name.substring(0, 6).toUpperCase()
          });
        });

        loadedSpecialties.sort((a, b) => a.name.localeCompare(b.name));
        setConfiguredSpecialties(loadedSpecialties);
      } catch (error) {
        console.error('Error loading specialties:', error);
      } finally {
        setLoadingSpecialties(false);
      }
    };

    loadSpecialties();
  }, []);

  // Get unique categories
  const categories: InventoryCategory[] = [
    'Instrument Trays',
    'Power Tools',
    'Consumables',
    'Implants',
    'Medical Devices',
    'Drapes',
    'Prep Solutions',
    'Operating Tables',
    'Single Instruments'
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    let items = INVENTORY_ITEMS;

    // Filter by category
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by classification
    if (selectedClassification !== 'All') {
      items = items.filter(item => item.classification === selectedClassification);
    }

    // Filter by specialty
    if (selectedSpecialty !== 'All Specialties') {
      items = items.filter(item =>
        item.specialty.includes(selectedSpecialty) ||
        item.specialty.includes('All Specialties')
      );
    }

    // Filter by search term
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query) ||
        item.productReference.toLowerCase().includes(query) ||
        item.sku?.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [selectedCategory, selectedClassification, selectedSpecialty, searchTerm]);

  // Get low stock items
  const lowStockItems = getLowStockItems();

  // Handle cost unlock
  const handleCostUnlock = () => {
    if (costPassword === '1234') {
      setCostUnlocked(true);
      setCostError('');
      setShowCostPassword(false);
      setCostPassword('');
    } else {
      setCostError('Incorrect password');
    }
  };

  // Storage Management Functions
  const handleAddLocation = () => {
    if (newLocation.name.trim()) {
      const location: StorageLocation = {
        id: `LOC-${String(storageLocations.length + 1).padStart(3, '0')}`,
        name: newLocation.name,
        description: newLocation.description,
        type: newLocation.type,
        specialty: newLocation.specialty
      };
      setStorageLocations([...storageLocations, location]);
      setNewLocation({ name: '', description: '', type: 'Room', specialty: 'Theatre Common' });
      setShowAddLocation(false);
    }
  };

  const handleAddContainer = () => {
    if (newContainer.name.trim() && selectedLocationForContainer) {
      const container: StorageContainer = {
        id: `CONT-${String(storageContainers.length + 1).padStart(3, '0')}`,
        locationId: selectedLocationForContainer,
        name: newContainer.name,
        capacity: newContainer.capacity,
        items: []
      };
      setStorageContainers([...storageContainers, container]);
      setNewContainer({ name: '', capacity: 20 });
      setShowAddContainer(false);
      setSelectedLocationForContainer('');
    }
  };

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (containerId: string) => {
    if (draggedItem) {
      setStorageContainers(containers =>
        containers.map(container => {
          // Remove item from all containers first
          const updatedItems = container.items.filter(id => id !== draggedItem);
          // Add to target container if it's the one being dropped on
          if (container.id === containerId && !container.items.includes(draggedItem)) {
            if (container.items.length < container.capacity) {
              return { ...container, items: [...updatedItems, draggedItem] };
            }
          }
          return { ...container, items: updatedItems };
        })
      );
      setDraggedItem(null);
    }
  };

  const handleRemoveFromContainer = (containerId: string, itemId: string) => {
    setStorageContainers(containers =>
      containers.map(container =>
        container.id === containerId
          ? { ...container, items: container.items.filter(id => id !== itemId) }
          : container
      )
    );
  };

  const getStoredItemIds = () => {
    return new Set(storageContainers.flatMap(c => c.items));
  };

  const getUnassignedItems = () => {
    const storedIds = getStoredItemIds();
    return INVENTORY_ITEMS.filter(item => !storedIds.has(item.id));
  };

  const getFilteredUnassignedItems = () => {
    const unassigned = getUnassignedItems();
    if (!storageSearchTerm.trim()) return unassigned;

    const query = storageSearchTerm.toLowerCase();
    return unassigned.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.specialty.some(s => s.toLowerCase().includes(query))
    );
  };

  const groupItemsBySpecialty = () => {
    const filtered = getFilteredUnassignedItems();
    const grouped: { [key: string]: typeof filtered } = {};

    // If specialties haven't loaded yet, just group everything under Theatre Common
    if (loadingSpecialties || configuredSpecialties.length === 0) {
      grouped['Theatre Common'] = filtered;
      return grouped;
    }

    const configuredSpecialtyNames = new Set(configuredSpecialties.map(s => s.name));

    filtered.forEach(item => {
      // If item has "All Specialties" or multiple specialties, put in "Theatre Common"
      if (item.specialty.includes('All Specialties') || item.specialty.length > 3) {
        if (!grouped['Theatre Common']) grouped['Theatre Common'] = [];
        grouped['Theatre Common'].push(item);
      } else {
        let itemAdded = false;
        // Add to each specialty, but only if it's configured
        item.specialty.forEach(spec => {
          // Only include if specialty is configured in Firebase
          if (configuredSpecialtyNames.has(spec)) {
            if (!grouped[spec]) grouped[spec] = [];
            grouped[spec].push(item);
            itemAdded = true;
          }
        });

        // If item wasn't added to any configured specialty, put in Theatre Common
        if (!itemAdded) {
          if (!grouped['Theatre Common']) grouped['Theatre Common'] = [];
          if (!grouped['Theatre Common'].includes(item)) {
            grouped['Theatre Common'].push(item);
          }
        }
      }
    });

    return grouped;
  };

  const toggleSpecialty = (specialty: string) => {
    const newExpanded = new Set(expandedSpecialties);
    if (newExpanded.has(specialty)) {
      newExpanded.delete(specialty);
    } else {
      newExpanded.add(specialty);
    }
    setExpandedSpecialties(newExpanded);
  };

  const getFilteredStorageLocations = () => {
    // Always show Theatre Common + selected specialty locations
    return storageLocations.filter(loc =>
      loc.specialty === 'Theatre Common' || loc.specialty === selectedStorageSpecialty
    );
  };

  const getAvailableStorageSpecialties = () => {
    const specs = new Set(['Theatre Common']);
    // Use theatre specialties from Firebase configurations
    configuredSpecialties.forEach(s => specs.add(s.name));
    return Array.from(specs).sort((a, b) => {
      if (a === 'Theatre Common') return -1;
      if (b === 'Theatre Common') return 1;
      return a.localeCompare(b);
    });
  };

  const handleMobileAssignItem = (containerId: string) => {
    if (selectedItemForAssignment) {
      handleDrop(containerId);
      setDraggedItem(selectedItemForAssignment);
      setTimeout(() => {
        handleDrop(containerId);
        setSelectedItemForAssignment(null);
        setShowAssignModal(false);
      }, 0);
    }
  };

  // Toggle item expansion
  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // Get stock status
  const getStockStatus = (item: InventoryItem) => {
    if (item.stock.current <= item.stock.reorderPoint) {
      return { status: 'low', color: 'red', label: 'Low Stock' };
    } else if (item.stock.current <= item.stock.minimum) {
      return { status: 'warning', color: 'amber', label: 'Below Min' };
    } else if (item.stock.current >= item.stock.maximum) {
      return { status: 'high', color: 'blue', label: 'At Max' };
    } else {
      return { status: 'ok', color: 'green', label: 'Normal' };
    }
  };

  // Export inventory to CSV
  const exportToCSV = () => {
    // Create CSV header
    const headers = [
      'ID', 'Name', 'Description', 'Category', 'Classification',
      'Specialties', 'Supplier', 'Product Reference', 'SKU',
      'Current Stock', 'Minimum', 'Maximum', 'Reorder Point',
      'Cost (GBP)', 'Frequency'
    ];

    // Create CSV rows
    const rows = INVENTORY_ITEMS.map(item => [
      item.id,
      `"${item.name.replace(/"/g, '""')}"`, // Escape quotes
      `"${item.description.replace(/"/g, '""')}"`,
      item.category,
      item.classification,
      `"${item.specialty.join(', ')}"`,
      item.supplier,
      item.productReference,
      item.sku || '',
      item.stock.current,
      item.stock.minimum,
      item.stock.maximum,
      item.stock.reorderPoint,
      item.cost || '',
      item.frequency
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        {/* Desktop Header - Hide when isAdmin or fixedTab (page has its own header) */}
        {!isAdmin && !fixedTab && (
          <div className="hidden md:block px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Theatre equipment, consumables, and supplies catalog
                </p>
              </div>
            {/* Cost Button - Shows modal without password */}
            <div className="relative ml-4">
              {!costUnlocked ? (
                <button
                  onClick={() => setShowCostPassword(true)}
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
          {/* Desktop Tabs */}
          {!fixedTab && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveTab('stock')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'stock'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Stock
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'storage'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Storage
              </button>
              <button
                onClick={() => setActiveTab('reorder')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'reorder'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Reorder
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'requests'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Requests
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'audit'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Audit
              </button>
            </div>
          )}
        </div>
        )}

        {/* Mobile Header */}
        <div className="md:hidden px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-base font-bold text-gray-900">Inventory</h1>
              <p className="text-[10px] text-gray-600">Royal London Hospital</p>
            </div>
            {/* Compact Cost Toggle - No password for demo */}
            {!costUnlocked ? (
              <button
                onClick={() => setCostUnlocked(true)}
                className="p-1.5 bg-blue-600 text-white rounded-md"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setCostUnlocked(false)}
                className="p-1.5 bg-green-500 text-white rounded-md"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* Mobile Tabs - Scrollable Compact */}
          {!fixedTab && (
            <div className="overflow-x-auto -mx-3 px-3 mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-1.5 min-w-max">
                <button
                  onClick={() => setActiveTab('stock')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'stock'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Stock
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'storage'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Storage
                </button>
                <button
                  onClick={() => setActiveTab('reorder')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'reorder'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Reorder
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'requests'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Requests
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'audit'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Audit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cost Password Modal - Modified for demo */}
      {showCostPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Unlock Cost Data</h3>
                <p className="text-xs text-gray-500 mt-0.5">View Inventory Pricing</p>
              </div>
              <button
                onClick={() => {
                  setShowCostPassword(false);
                  setCostPassword('');
                  setCostError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-900">
                <strong>What Cost shows:</strong> Item costs, total inventory value,
                supplier pricing, and budget management information.
              </p>
            </div>

            {/* Demo Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-amber-900 mb-2">Demo Mode</p>
              <p className="text-xs text-amber-800">
                Password disabled for demo purposes. In production, this would require authorized credentials to access sensitive financial data.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCostPassword(false);
                  setCostPassword('');
                  setCostError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCostUnlocked(true);
                  setShowCostPassword(false);
                  setCostPassword('');
                  setCostError('');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Unlock (Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Stock Tab */}
        {activeTab === 'stock' && (
        <>
        {/* Desktop: Full Width Layout - Left Sidebar + Center Content + Right Alerts */}
        <div className="hidden md:flex h-full w-full">
          {/* Left Sidebar - Filters */}
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter - Accordion */}
              <div className="mb-3 border border-gray-200 rounded-lg">
                <button
                  onClick={() => setDesktopCategoryOpen(!desktopCategoryOpen)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-900">Category</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${desktopCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {desktopCategoryOpen && (
                  <div className="border-t border-gray-200 p-2 space-y-1">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                        selectedCategory === ''
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Specialty Filter - Accordion */}
              <div className="mb-3 border border-gray-200 rounded-lg">
                <button
                  onClick={() => setDesktopSpecialtyOpen(!desktopSpecialtyOpen)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-900">Specialty</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${desktopSpecialtyOpen ? 'rotate-180' : ''}`} />
                </button>
                {desktopSpecialtyOpen && (
                  <div className="border-t border-gray-200 p-2 space-y-1">
                    <button
                      onClick={() => setSelectedSpecialty('All Specialties')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                        selectedSpecialty === 'All Specialties'
                          ? 'bg-teal-100 text-teal-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Specialties
                    </button>
                    {SPECIALTIES.filter(s => s !== 'All Specialties').map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          selectedSpecialty === specialty
                            ? 'bg-teal-100 text-teal-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Desktop Items List */}
            {filteredItems.length > 0 ? (
              <div className="bg-white m-6 rounded-lg border border-gray-200">
                {/* Desktop Header with View Toggle */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Inventory Items ({filteredItems.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => setShowAddItem(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          title="Add New Item"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="hidden lg:inline">Add Item</span>
                        </button>
                        <button
                          onClick={() => setShowCSVUpload(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          title="Upload CSV"
                        >
                          <Upload className="w-4 h-4" />
                          <span className="hidden lg:inline">CSV Upload</span>
                        </button>
                        <button
                          onClick={exportToCSV}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
                          title="Export CSV"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden lg:inline">Export</span>
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      </>
                    )}
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop Grid/List View */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4' : 'divide-y divide-gray-200'}>
                  {filteredItems.map((item, index) => {
                    const isExpanded = expandedItems.has(item.id);
                    const stockStatus = getStockStatus(item);

                    return viewMode === 'grid' ? (
                    // Grid View Card
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                            <span className={`px-2 py-0.5 bg-${stockStatus.color}-100 text-${stockStatus.color}-700 text-xs font-medium rounded`}>
                              {stockStatus.label}
                            </span>
                            {isAdmin && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingItem(item);
                                    setShowEditItem(true);
                                  }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit Item"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeletingItemId(item.id);
                                    setShowDeleteConfirm(true);
                                  }}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Stock:</span>
                            <span className="font-medium text-gray-900">{item.stock.current} / {item.stock.maximum}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Trust:</span>
                            <span className="font-medium text-gray-900 truncate ml-2">{item.supplier}</span>
                          </div>
                          {costUnlocked && item.cost !== undefined && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Cost:</span>
                              <span className="font-bold text-blue-600">{formatCurrency(item.cost, item.currency)}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'View Details'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-gray-50 p-4 text-xs space-y-2">
                          <div>
                            <span className="font-medium text-gray-700">Product Ref:</span>
                            <span className="ml-2 text-gray-900">{item.productReference}</span>
                          </div>
                          {item.sku && (
                            <div>
                              <span className="font-medium text-gray-700">SKU:</span>
                              <span className="ml-2 text-gray-900">{item.sku}</span>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Classification:</span>
                            <span className="ml-2 text-gray-900">{item.classification}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Specialty:</span>
                            <span className="ml-2 text-gray-900">{item.specialty.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Frequency:</span>
                            <span className="ml-2 text-gray-900">{item.frequency}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // List View
                    <div key={item.id} className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex-1 px-4 py-3 flex items-center justify-between text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <span className={`px-2 py-0.5 bg-${stockStatus.color}-100 text-${stockStatus.color}-700 text-xs font-medium rounded`}>
                                {stockStatus.label}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {item.classification}
                              </span>
                              {costUnlocked && item.cost !== undefined && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                  {formatCurrency(item.cost, item.currency)}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.supplier}</span>
                              <span>•</span>
                              <span>Stock: {item.stock.current}/{item.stock.maximum}</span>
                              <span>•</span>
                              <span className="text-gray-400">{item.productReference}</span>
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        {isAdmin && (
                          <div className="flex items-center gap-1 pr-4">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setShowEditItem(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit Item"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingItemId(item.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50">
                          <div className="space-y-3">
                            {/* Description */}
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-700">{item.description}</p>
                            </div>

                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Category</div>
                                <div className="text-sm font-semibold text-gray-900">{item.category}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Classification</div>
                                <div className="text-sm font-semibold text-gray-900">{item.classification}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Trust</div>
                                <div className="text-sm font-semibold text-gray-900">{item.supplier}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Product Ref</div>
                                <div className="text-sm font-semibold text-blue-600">{item.productReference}</div>
                              </div>
                            </div>

                            {/* Stock Information */}
                            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <BarChart className="w-5 h-5 text-blue-600" />
                                <h4 className="text-sm font-semibold text-blue-900">Stock Information</h4>
                              </div>

                              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Current</div>
                                  <div className="text-lg font-bold text-gray-900">{item.stock.current}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Minimum</div>
                                  <div className="text-lg font-bold text-amber-600">{item.stock.minimum}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Maximum</div>
                                  <div className="text-lg font-bold text-blue-600">{item.stock.maximum}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Reorder Point</div>
                                  <div className="text-lg font-bold text-red-600">{item.stock.reorderPoint}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Frequency</div>
                                  <div className="text-sm font-semibold text-gray-900">{item.frequency}</div>
                                </div>
                              </div>

                              {/* Stock Level Bar */}
                              <div className="mt-3">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full bg-${stockStatus.color}-500`}
                                    style={{ width: `${Math.min((item.stock.current / item.stock.maximum) * 100, 100)}%` }}
                                  />
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                  <span>0</span>
                                  <span>{item.stock.current} / {item.stock.maximum}</span>
                                </div>
                              </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              {/* Product Identifiers */}
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Product Identifiers</h5>
                                <div className="space-y-1.5 text-xs">
                                  {item.sku && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">SKU:</span>
                                      <span className="font-medium text-gray-900">{item.sku}</span>
                                    </div>
                                  )}
                                  {item.udiCode && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">UDI:</span>
                                      <span className="font-medium text-gray-900">{item.udiCode}</span>
                                    </div>
                                  )}
                                  {item.barcode && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Barcode:</span>
                                      <span className="font-medium text-gray-900">{item.barcode}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order History */}
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Order History</h5>
                                <div className="space-y-1.5 text-xs">
                                  {item.lastOrdered && (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-3 h-3 text-gray-400" />
                                      <span className="text-gray-600">Last Ordered:</span>
                                      <span className="font-medium text-gray-900">{item.lastOrdered}</span>
                                    </div>
                                  )}
                                  {item.lastReceived && (
                                    <div className="flex items-center gap-2">
                                      <Package className="w-3 h-3 text-gray-400" />
                                      <span className="text-gray-600">Last Received:</span>
                                      <span className="font-medium text-gray-900">{item.lastReceived}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Contacts */}
                            {(item.contacts.rep || item.contacts.procurement) && (
                              <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <User className="w-5 h-5 text-green-600" />
                                  <h4 className="text-sm font-semibold text-green-900">Contacts</h4>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                  {item.contacts.rep && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                      <div className="text-xs text-gray-600 font-medium mb-2">Trust Representative</div>
                                      <div className="space-y-1.5 text-xs">
                                        <div className="font-semibold text-gray-900">{item.contacts.rep.name}</div>
                                        {item.contacts.rep.email && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-3 h-3" />
                                            <span>{item.contacts.rep.email}</span>
                                          </div>
                                        )}
                                        {item.contacts.rep.phone && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            <span>{item.contacts.rep.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {item.contacts.procurement && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                      <div className="text-xs text-gray-600 font-medium mb-2">Procurement Contact</div>
                                      <div className="space-y-1.5 text-xs">
                                        <div className="font-semibold text-gray-900">{item.contacts.procurement.name}</div>
                                        {item.contacts.procurement.email && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-3 h-3" />
                                            <span>{item.contacts.procurement.email}</span>
                                          </div>
                                        )}
                                        {item.contacts.procurement.phone && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            <span>{item.contacts.procurement.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Specialties & Procedures */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Specialties</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.specialty.map((spec, idx) => (
                                    <span key={`${item.id}-${spec}-${idx}`} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {item.procedures.length > 0 && (
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <h5 className="text-xs font-semibold text-gray-700 mb-2">Related Procedures (OPCS-4)</h5>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.procedures.map((proc, idx) => (
                                      <span key={`${item.id}-${proc}-${idx}`} className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-mono rounded">
                                        {proc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Cost Information (if unlocked) */}
                            {costUnlocked && item.cost !== undefined && (
                              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-blue-600 font-medium mb-1">Unit Cost</div>
                                    <div className="text-2xl font-bold text-blue-900">
                                      {formatCurrency(item.cost, item.currency)}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-blue-600 font-medium mb-1">Total Value (Current Stock)</div>
                                    <div className="text-2xl font-bold text-blue-900">
                                      {formatCurrency(item.cost * item.stock.current, item.currency)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            ) : (
              // Empty State
              <div className="bg-white rounded-lg border border-gray-200 m-6 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Found</h3>
                <p className="text-sm text-gray-600">
                  No inventory items match your current filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Stock Alerts */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Stock Alerts
              </h2>
              {lowStockItems.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-600 mb-2">
                    {lowStockItems.length} {lowStockItems.length === 1 ? 'item' : 'items'} below reorder point
                  </div>
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-600 mt-0.5">{item.category}</p>
                        </div>
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 ml-2" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-gray-600">Current: <span className="font-medium text-amber-700">{item.stock.current}</span></span>
                        <span className="text-gray-600">Min: {item.stock.minimum}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600 text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  All stock levels normal
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Amazon-Style Tile Interface */}
        <div className="md:hidden bg-white">
          {/* Search Bar - Always Visible */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Tiles - Amazon Style (Smaller/More Compact) */}
          <div className="p-2 space-y-1.5">
            {/* Stock Alerts Tile - First */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setMobileAlertsOpen(!mobileAlertsOpen)}
                className="w-full flex items-center justify-between p-2 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-medium text-gray-900">Stock Alerts</span>
                  {lowStockItems.length > 0 && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                      {lowStockItems.length}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${mobileAlertsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAlertsOpen && (
                <div className="border-t border-gray-200 bg-gray-50 p-2 max-h-60 overflow-y-auto">
                  {lowStockItems.length > 0 ? (
                    <div className="space-y-1.5">
                      {lowStockItems.slice(0, 10).map((item) => (
                        <div key={item.id} className="p-2 bg-amber-50 border border-amber-200 rounded">
                          <div className="text-xs font-medium text-gray-900 truncate">{item.name}</div>
                          <div className="flex justify-between items-center mt-1 text-[10px]">
                            <span className="text-gray-600">{item.category}</span>
                            <span className="text-amber-700 font-medium">Stock: {item.stock.current}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600 text-center py-3">All stock levels normal</div>
                  )}
                </div>
              )}
            </div>

            {/* Category Tile */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="w-full flex items-center justify-between p-2 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-900">Category</span>
                  {selectedCategory && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                      {selectedCategory}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${mobileCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoryOpen && (
                <div className="border-t border-gray-200 bg-gray-50 p-1.5 space-y-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setMobileCategoryOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                      selectedCategory === ''
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setMobileCategoryOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white font-medium'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specialty Tile */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setMobileSpecialtyOpen(!mobileSpecialtyOpen)}
                className="w-full flex items-center justify-between p-2 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-900">Specialty</span>
                  {selectedSpecialty !== 'All Specialties' && (
                    <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                      {selectedSpecialty}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${mobileSpecialtyOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileSpecialtyOpen && (
                <div className="border-t border-gray-200 bg-gray-50 p-1.5 space-y-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedSpecialty('All Specialties');
                      setMobileSpecialtyOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                      selectedSpecialty === 'All Specialties'
                        ? 'bg-teal-600 text-white font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Specialties
                  </button>
                  {SPECIALTIES.filter(s => s !== 'All Specialties').map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setMobileSpecialtyOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs ${
                        selectedSpecialty === specialty
                          ? 'bg-teal-600 text-white font-medium'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Items List - Forex Trading Style */}
          {filteredItems.length > 0 ? (
            <div className="bg-white md:rounded-lg md:border md:border-gray-200 md:m-6">
              {/* Desktop Header */}
              <div className="hidden md:block px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory Items ({filteredItems.length})
                </h3>
              </div>

              {/* Mobile: Ultra Compact Forex-Style List */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredItems.map((item, index) => {
                  const stockStatus = getStockStatus(item);
                  const stockPercentage = (item.stock.current / item.stock.maximum) * 100;

                  return (
                    <div
                      key={item.id}
                      className={`px-3 py-2 active:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        {/* Left: Item Info */}
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-semibold text-gray-900 truncate">{item.name}</h4>
                            {stockStatus.status === 'low' && (
                              <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500 truncate">{item.supplier}</span>
                            <span className="text-[10px] text-gray-400">•</span>
                            <span className="text-[10px] text-gray-500">{item.category}</span>
                          </div>
                        </div>

                        {/* Right: Stock Info */}
                        <div className="flex flex-col items-end flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-900">{item.stock.current}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              stockStatus.status === 'low' ? 'bg-red-100 text-red-700' :
                              stockStatus.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                              stockStatus.status === 'high' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {stockStatus.status === 'low' ? '⚠ LOW' :
                               stockStatus.status === 'warning' ? '⚡ MIN' :
                               stockStatus.status === 'high' ? '📦 MAX' : '✓ OK'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  stockPercentage < 30 ? 'bg-red-500' :
                                  stockPercentage < 50 ? 'bg-amber-500' :
                                  stockPercentage < 80 ? 'bg-green-500' :
                                  'bg-blue-500'
                                }`}
                                style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400">{Math.round(stockPercentage)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedItems.has(item.id) && (
                        <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5">
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-gray-500">SKU:</span>
                              <span className="ml-1 text-gray-900 font-medium">{item.sku}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Min:</span>
                              <span className="ml-1 text-gray-900 font-medium">{item.stock.minimum}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Max:</span>
                              <span className="ml-1 text-gray-900 font-medium">{item.stock.maximum}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Reorder:</span>
                              <span className="ml-1 text-gray-900 font-medium">{item.stock.reorderPoint}</span>
                            </div>
                          </div>
                          {costUnlocked && (
                            <div className="pt-1.5 border-t border-gray-100">
                              <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500">Unit Cost:</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(item.cost.unit)}</span>
                              </div>
                              <div className="flex justify-between text-[10px] mt-0.5">
                                <span className="text-gray-500">Total Value:</span>
                                <span className="text-blue-600 font-bold">
                                  {formatCurrency(item.cost.unit * item.stock.current)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Keep existing grid/list view */}
              <div className="hidden md:block">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4' : 'divide-y divide-gray-200'}>
                  {filteredItems.map((item, index) => {
                    const isExpanded = expandedItems.has(item.id);
                    const stockStatus = getStockStatus(item);

                    return viewMode === 'grid' ? (
                    // Grid View Card
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                            <span className={`px-2 py-0.5 bg-${stockStatus.color}-100 text-${stockStatus.color}-700 text-xs font-medium rounded`}>
                              {stockStatus.label}
                            </span>
                            {isAdmin && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingItem(item);
                                    setShowEditItem(true);
                                  }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit Item"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeletingItemId(item.id);
                                    setShowDeleteConfirm(true);
                                  }}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Stock:</span>
                            <span className="font-medium text-gray-900">{item.stock.current} / {item.stock.maximum}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Trust:</span>
                            <span className="font-medium text-gray-900 truncate ml-2">{item.supplier}</span>
                          </div>
                          {costUnlocked && item.cost !== undefined && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Cost:</span>
                              <span className="font-bold text-blue-600">{formatCurrency(item.cost, item.currency)}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'View Details'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-gray-50 p-4 text-xs space-y-2">
                          <div>
                            <span className="font-medium text-gray-700">Product Ref:</span>
                            <span className="ml-2 text-gray-900">{item.productReference}</span>
                          </div>
                          {item.sku && (
                            <div>
                              <span className="font-medium text-gray-700">SKU:</span>
                              <span className="ml-2 text-gray-900">{item.sku}</span>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Classification:</span>
                            <span className="ml-2 text-gray-900">{item.classification}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Specialty:</span>
                            <span className="ml-2 text-gray-900">{item.specialty.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Frequency:</span>
                            <span className="ml-2 text-gray-900">{item.frequency}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // List View
                    <div key={item.id} className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex-1 px-4 py-3 flex items-center justify-between text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <span className={`px-2 py-0.5 bg-${stockStatus.color}-100 text-${stockStatus.color}-700 text-xs font-medium rounded`}>
                                {stockStatus.label}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {item.classification}
                              </span>
                              {costUnlocked && item.cost !== undefined && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                  {formatCurrency(item.cost, item.currency)}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.supplier}</span>
                              <span>•</span>
                              <span>Stock: {item.stock.current}/{item.stock.maximum}</span>
                              <span>•</span>
                              <span className="text-gray-400">{item.productReference}</span>
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        {isAdmin && (
                          <div className="flex items-center gap-1 pr-4">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setShowEditItem(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit Item"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingItemId(item.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50">
                          <div className="space-y-3">
                            {/* Description */}
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-sm text-gray-700">{item.description}</p>
                            </div>

                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Category</div>
                                <div className="text-sm font-semibold text-gray-900">{item.category}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Classification</div>
                                <div className="text-sm font-semibold text-gray-900">{item.classification}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Trust</div>
                                <div className="text-sm font-semibold text-gray-900">{item.supplier}</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="text-xs text-gray-600 font-medium mb-1">Product Ref</div>
                                <div className="text-sm font-semibold text-blue-600">{item.productReference}</div>
                              </div>
                            </div>

                            {/* Stock Information */}
                            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <BarChart className="w-5 h-5 text-blue-600" />
                                <h4 className="text-sm font-semibold text-blue-900">Stock Information</h4>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Current</div>
                                  <div className="text-lg font-bold text-gray-900">{item.stock.current}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Minimum</div>
                                  <div className="text-lg font-bold text-amber-600">{item.stock.minimum}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Maximum</div>
                                  <div className="text-lg font-bold text-blue-600">{item.stock.maximum}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Reorder Point</div>
                                  <div className="text-lg font-bold text-red-600">{item.stock.reorderPoint}</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-1">Frequency</div>
                                  <div className="text-sm font-semibold text-gray-900">{item.frequency}</div>
                                </div>
                              </div>

                              {/* Stock Level Bar */}
                              <div className="mt-3">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full bg-${stockStatus.color}-500`}
                                    style={{ width: `${Math.min((item.stock.current / item.stock.maximum) * 100, 100)}%` }}
                                  />
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                  <span>0</span>
                                  <span>{item.stock.current} / {item.stock.maximum}</span>
                                </div>
                              </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Product Identifiers */}
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Product Identifiers</h5>
                                <div className="space-y-1.5 text-xs">
                                  {item.sku && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">SKU:</span>
                                      <span className="font-medium text-gray-900">{item.sku}</span>
                                    </div>
                                  )}
                                  {item.udiCode && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">UDI:</span>
                                      <span className="font-medium text-gray-900">{item.udiCode}</span>
                                    </div>
                                  )}
                                  {item.barcode && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Barcode:</span>
                                      <span className="font-medium text-gray-900">{item.barcode}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order History */}
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Order History</h5>
                                <div className="space-y-1.5 text-xs">
                                  {item.lastOrdered && (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-3 h-3 text-gray-400" />
                                      <span className="text-gray-600">Last Ordered:</span>
                                      <span className="font-medium text-gray-900">{item.lastOrdered}</span>
                                    </div>
                                  )}
                                  {item.lastReceived && (
                                    <div className="flex items-center gap-2">
                                      <Package className="w-3 h-3 text-gray-400" />
                                      <span className="text-gray-600">Last Received:</span>
                                      <span className="font-medium text-gray-900">{item.lastReceived}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Contacts */}
                            {(item.contacts.rep || item.contacts.procurement) && (
                              <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <User className="w-5 h-5 text-green-600" />
                                  <h4 className="text-sm font-semibold text-green-900">Contacts</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {item.contacts.rep && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                      <div className="text-xs text-gray-600 font-medium mb-2">Trust Representative</div>
                                      <div className="space-y-1.5 text-xs">
                                        <div className="font-semibold text-gray-900">{item.contacts.rep.name}</div>
                                        {item.contacts.rep.email && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-3 h-3" />
                                            <span>{item.contacts.rep.email}</span>
                                          </div>
                                        )}
                                        {item.contacts.rep.phone && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            <span>{item.contacts.rep.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {item.contacts.procurement && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                      <div className="text-xs text-gray-600 font-medium mb-2">Procurement Contact</div>
                                      <div className="space-y-1.5 text-xs">
                                        <div className="font-semibold text-gray-900">{item.contacts.procurement.name}</div>
                                        {item.contacts.procurement.email && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-3 h-3" />
                                            <span>{item.contacts.procurement.email}</span>
                                          </div>
                                        )}
                                        {item.contacts.procurement.phone && (
                                          <div className="flex items-center gap-1.5 text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            <span>{item.contacts.procurement.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Specialties & Procedures */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <h5 className="text-xs font-semibold text-gray-700 mb-2">Specialties</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.specialty.map((spec, idx) => (
                                    <span key={`${item.id}-${spec}-${idx}`} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {item.procedures.length > 0 && (
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <h5 className="text-xs font-semibold text-gray-700 mb-2">Related Procedures (OPCS-4)</h5>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.procedures.map((proc, idx) => (
                                      <span key={`${item.id}-${proc}-${idx}`} className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-mono rounded">
                                        {proc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Cost Information (if unlocked) */}
                            {costUnlocked && item.cost !== undefined && (
                              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-blue-600 font-medium mb-1">Unit Cost</div>
                                    <div className="text-2xl font-bold text-blue-900">
                                      {formatCurrency(item.cost, item.currency)}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-blue-600 font-medium mb-1">Total Value (Current Stock)</div>
                                    <div className="text-2xl font-bold text-blue-900">
                                      {formatCurrency(item.cost * item.stock.current, item.currency)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          ) : (
            // Empty State
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Found</h3>
              <p className="text-sm text-gray-600">
                No inventory items match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
        </>
        )}

        {/* Storage Tab */}
        {activeTab === 'storage' && (
          <div className="h-full flex flex-col md:flex-row bg-gray-50">
            {/* Mobile View Toggle */}
            <div className="md:hidden bg-white border-b border-gray-200 p-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setMobileStorageView('items')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mobileStorageView === 'items'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">Unassigned</span>
                    <span className="sm:hidden">Items</span>
                    ({getFilteredUnassignedItems().length})
                  </div>
                </button>
                <button
                  onClick={() => setMobileStorageView('locations')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mobileStorageView === 'locations'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    Locations ({storageLocations.length})
                  </div>
                </button>
              </div>
            </div>

            {/* Left Sidebar - Unassigned Items */}
            <div className={`${
              mobileStorageView === 'items' ? 'flex' : 'hidden'
            } md:flex w-full md:w-80 bg-white border-r border-gray-200 flex-col`}>
              <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
                <h2 className="text-base font-bold text-blue-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Unassigned Items
                </h2>
                <p className="text-xs text-blue-700 mt-1">
                  <span className="hidden md:inline">Drag items to containers</span>
                  <span className="md:hidden">Tap to assign to containers</span>
                </p>
                {loadingSpecialties && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading specialties...
                  </p>
                )}
                {!loadingSpecialties && configuredSpecialties.length === 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    No specialties configured. Go to Theatre Management to add specialties.
                  </p>
                )}
                {!loadingSpecialties && configuredSpecialties.length > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    {configuredSpecialties.length} specialties loaded
                  </p>
                )}

                {/* Search */}
                <div className="mt-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={storageSearchTerm}
                      onChange={(e) => setStorageSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {(() => {
                  const groupedItems = groupItemsBySpecialty();
                  const specialties = Object.keys(groupedItems).sort((a, b) => {
                    if (a === 'Theatre Common') return -1;
                    if (b === 'Theatre Common') return 1;
                    return a.localeCompare(b);
                  });

                  if (specialties.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        {getUnassignedItems().length === 0 ? (
                          <>
                            <Check className="w-12 h-12 mx-auto mb-2 text-green-500" />
                            <p className="text-sm font-medium">All items assigned!</p>
                          </>
                        ) : (
                          <>
                            <Search className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm font-medium">No items found</p>
                            <p className="text-xs text-gray-400 mt-1">Try a different search</p>
                          </>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      {specialties.map(specialty => {
                        const items = groupedItems[specialty];
                        const isExpanded = expandedSpecialties.has(specialty);

                        return (
                          <div key={specialty} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Specialty Header */}
                            <button
                              onClick={() => toggleSpecialty(specialty)}
                              className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                <span className="text-sm font-semibold text-gray-900">{specialty}</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                  {items.length}
                                </span>
                              </div>
                            </button>

                            {/* Items */}
                            {isExpanded && (
                              <div className="p-2 space-y-2 bg-white">
                                {items.map((item) => (
                                  <div
                                    key={item.id}
                                    draggable
                                    onDragStart={() => handleDragStart(item.id)}
                                    onClick={() => {
                                      setSelectedItemForAssignment(item.id);
                                      setDraggedItem(item.id);
                                      setShowAssignModal(true);
                                    }}
                                    className="bg-white border-2 border-gray-200 rounded-lg p-3 cursor-move md:hover:border-blue-400 hover:shadow-md transition-all active:scale-95"
                                  >
                                    <div className="text-sm font-semibold text-gray-900 truncate">{item.name}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.category}</div>
                                    <div className="flex items-center justify-between gap-2 mt-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{item.id}</span>
                                        <span className="text-xs text-gray-500">Stock: {item.stock.current}</span>
                                      </div>
                                      <button className="md:hidden px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                                        Assign
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Main Content - Storage Locations and Containers */}
            <div className={`${
              mobileStorageView === 'locations' ? 'flex' : 'hidden'
            } md:flex flex-1 overflow-y-auto p-3 md:p-6 flex-col`}>
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Storage Locations</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Organize inventory across storage areas</p>
                  </div>
                  <button
                    onClick={() => setShowAddLocation(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full md:w-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Location
                  </button>
                </div>

                {/* Specialty Filter */}
                <div className="bg-white rounded-lg border-2 border-blue-200 p-3">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Filter by Specialty</label>
                  <select
                    value={selectedStorageSpecialty}
                    onChange={(e) => setSelectedStorageSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm font-medium"
                  >
                    {getAvailableStorageSpecialties().map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-600 mt-2">
                    {selectedStorageSpecialty === 'Theatre Common'
                      ? 'Showing shared storage locations visible to all specialties'
                      : `Showing Theatre Common + ${selectedStorageSpecialty} locations`
                    }
                  </p>
                </div>
              </div>

              {/* Storage Locations */}
              <div className="space-y-6">
                {getFilteredStorageLocations().map((location) => {
                  const locationContainers = storageContainers.filter(c => c.locationId === location.id);
                  return (
                    <div key={location.id} className="bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                      <div className="p-3 md:p-4 border-b border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <Warehouse className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base md:text-lg font-bold text-blue-900 truncate">{location.name}</h3>
                              <p className="text-xs text-blue-700 truncate">{location.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              location.specialty === 'Theatre Common'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-cyan-100 text-cyan-700'
                            }`}>
                              {location.specialty}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              {location.type}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedLocationForContainer(location.id);
                                setShowAddContainer(true);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex-1 md:flex-none justify-center"
                            >
                              <Plus className="w-3 h-3" />
                              Add Container
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Containers Grid */}
                      <div className="p-3 md:p-4">
                        {locationContainers.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                            {locationContainers.map((container) => {
                              const containerItems = container.items.map(id =>
                                INVENTORY_ITEMS.find(item => item.id === id)
                              ).filter(Boolean);
                              const utilizationPercent = (container.items.length / container.capacity) * 100;

                              return (
                                <div
                                  key={container.id}
                                  onDragOver={handleDragOver}
                                  onDrop={() => handleDrop(container.id)}
                                  className={`border-2 rounded-lg p-3 transition-all ${
                                    draggedItem
                                      ? 'border-dashed border-blue-400 bg-blue-50'
                                      : 'border-gray-200 bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900 text-sm">{container.name}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                      utilizationPercent >= 90 ? 'bg-red-100 text-red-700' :
                                      utilizationPercent >= 70 ? 'bg-amber-100 text-amber-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {container.items.length}/{container.capacity}
                                    </span>
                                  </div>

                                  <div className="mb-3">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full transition-all ${
                                          utilizationPercent >= 90 ? 'bg-red-500' :
                                          utilizationPercent >= 70 ? 'bg-amber-500' :
                                          'bg-green-500'
                                        }`}
                                        style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                    {containerItems.map((item) => (
                                      <div
                                        key={item!.id}
                                        className="flex items-center justify-between bg-white rounded p-2 border border-gray-200"
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="text-xs font-medium text-gray-900 truncate">{item!.name}</div>
                                          <div className="text-[10px] text-gray-500">{item!.id}</div>
                                        </div>
                                        <button
                                          onClick={() => handleRemoveFromContainer(container.id, item!.id)}
                                          className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ))}
                                    {containerItems.length === 0 && (
                                      <div className="text-center py-6 text-gray-400">
                                        <Package className="w-8 h-8 mx-auto mb-1 opacity-50" />
                                        <p className="text-xs">Empty container</p>
                                        <p className="text-[10px]">Drag items here</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-400">
                            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No containers in this location</p>
                            <p className="text-xs">Click "Add Container" to create one</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Location Modal */}
            {showAddLocation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Add Storage Location</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                      <input
                        type="text"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Supply Room A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newLocation.description}
                        onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Location description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                      <select
                        value={newLocation.specialty}
                        onChange={(e) => setNewLocation({ ...newLocation, specialty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {getAvailableStorageSpecialties().map((spec) => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Theatre Common locations are visible to all specialties
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={newLocation.type}
                        onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Room">Room</option>
                        <option value="Zone">Zone</option>
                        <option value="Cabinet">Cabinet</option>
                        <option value="Shelf">Shelf</option>
                      </select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => {
                          setShowAddLocation(false);
                          setNewLocation({ name: '', description: '', type: 'Room', specialty: 'Theatre Common' });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddLocation}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add Container Modal */}
            {showAddContainer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Add Container</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Container Name</label>
                      <input
                        type="text"
                        value={newContainer.name}
                        onChange={(e) => setNewContainer({ ...newContainer, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Shelf A1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                      <input
                        type="number"
                        value={newContainer.capacity}
                        onChange={(e) => setNewContainer({ ...newContainer, capacity: parseInt(e.target.value) || 20 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => {
                          setShowAddContainer(false);
                          setNewContainer({ name: '', capacity: 20 });
                          setSelectedLocationForContainer('');
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddContainer}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Container
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Assign Item Modal */}
            {showAssignModal && selectedItemForAssignment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Assign Item to Container</h3>
                    <button
                      onClick={() => {
                        setShowAssignModal(false);
                        setSelectedItemForAssignment(null);
                        setDraggedItem(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 bg-blue-50 border-b border-blue-200">
                    {(() => {
                      const item = INVENTORY_ITEMS.find(i => i.id === selectedItemForAssignment);
                      return item ? (
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{item.category} • {item.id}</div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {storageLocations.map((location) => {
                      const locationContainers = storageContainers.filter(c => c.locationId === location.id);
                      if (locationContainers.length === 0) return null;

                      return (
                        <div key={location.id}>
                          <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Warehouse className="w-4 h-4 text-blue-600" />
                            {location.name}
                          </h4>
                          <div className="space-y-2">
                            {locationContainers.map((container) => {
                              const utilizationPercent = (container.items.length / container.capacity) * 100;
                              const isFull = container.items.length >= container.capacity;

                              return (
                                <button
                                  key={container.id}
                                  onClick={() => handleMobileAssignItem(container.id)}
                                  disabled={isFull}
                                  className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                                    isFull
                                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                      : 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md active:scale-95'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">{container.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                      utilizationPercent >= 90 ? 'bg-red-100 text-red-700' :
                                      utilizationPercent >= 70 ? 'bg-amber-100 text-amber-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {container.items.length}/{container.capacity}
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full transition-all ${
                                        utilizationPercent >= 90 ? 'bg-red-500' :
                                        utilizationPercent >= 70 ? 'bg-amber-500' :
                                        'bg-green-500'
                                      }`}
                                      style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                                    />
                                  </div>
                                  {isFull && (
                                    <div className="mt-2 text-xs text-red-600 font-medium">Container Full</div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowAssignModal(false);
                        setSelectedItemForAssignment(null);
                        setDraggedItem(null);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reorder Tab */}
        {activeTab === 'reorder' && (
          <div className="h-full overflow-y-auto bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Header Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border-2 border-red-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-red-900">Urgent Reorders</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-red-900">{getLowStockItems().length}</div>
                  <div className="text-xs text-red-600 mt-1">Below reorder point</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-amber-900">Coming Soon</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-amber-900">0</div>
                  <div className="text-xs text-amber-600 mt-1">Predicted this week</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-blue-900">Purchase Orders</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">0</div>
                  <div className="text-xs text-blue-600 mt-1">Draft orders</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-green-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-green-900">Monthly Spend</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-900">£0</div>
                  <div className="text-xs text-green-600 mt-1">Estimated reorder cost</div>
                </div>
              </div>

              {/* Urgent Reorders Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Urgent Reorders
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Items currently below reorder point</p>
                  </div>
                  {isAdmin && getLowStockItems().length > 0 && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Create Purchase Order
                    </button>
                  )}
                </div>

                <div className="divide-y divide-gray-200">
                  {getLowStockItems().length === 0 ? (
                    <div className="px-6 py-12 text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-gray-600">All items are adequately stocked</p>
                    </div>
                  ) : (
                    getLowStockItems().map(item => {
                      const stockStatus = getStockStatus(item);
                      const recommendedQty = item.stock.maximum - item.stock.current;

                      return (
                        <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <span className={`px-2 py-0.5 bg-${stockStatus.color}-100 text-${stockStatus.color}-700 text-xs font-medium rounded`}>
                                  {stockStatus.label}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-500">Current:</span>
                                  <span className="ml-2 font-semibold text-red-600">{item.stock.current}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Reorder Point:</span>
                                  <span className="ml-2 font-semibold text-gray-900">{item.stock.reorderPoint}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Maximum:</span>
                                  <span className="ml-2 font-semibold text-gray-900">{item.stock.maximum}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Recommended:</span>
                                  <span className="ml-2 font-semibold text-blue-600">{recommendedQty} units</span>
                                </div>
                                {item.cost && (
                                  <div>
                                    <span className="text-gray-500">Cost:</span>
                                    <span className="ml-2 font-semibold text-green-600">{formatCurrency(item.cost * recommendedQty, item.currency)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {isAdmin && (
                              <button className="ml-4 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                Add to Order
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Coming Soon Section */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Reordering Coming Soon</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Predictive analytics, automated purchase orders, usage tracking, and supplier integration will be available soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="h-full overflow-y-auto bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <ClipboardList className="w-6 h-6 text-blue-600" />
                      {isAdmin ? 'Review Requests' : 'My Requests'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {isAdmin
                        ? 'Review and approve inventory change requests from staff'
                        : 'Submit requests for inventory changes that require admin approval'}
                    </p>
                  </div>
                  {!isAdmin && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      New Request
                    </button>
                  )}
                </div>
              </div>

              {/* Sample Requests - This would be replaced with real data */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isAdmin ? 'Pending Requests' : 'Request History'}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Requests Yet</h3>
                    <p className="text-gray-600 mb-6">
                      {isAdmin
                        ? 'No pending requests from staff at this time'
                        : 'You haven\'t submitted any requests yet'}
                    </p>
                    {!isAdmin && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Submit Your First Request
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Request Types Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Add Item</h4>
                  </div>
                  <p className="text-sm text-gray-600">Request to add new inventory items</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-cyan-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <Edit className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Edit Item</h4>
                  </div>
                  <p className="text-sm text-gray-600">Request to modify item details</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Warehouse className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Move Item</h4>
                  </div>
                  <p className="text-sm text-gray-600">Request storage location changes</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Adjust Stock</h4>
                  </div>
                  <p className="text-sm text-gray-600">Request stock level adjustments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="h-full overflow-y-auto bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <BarChart className="w-6 h-6 text-blue-600" />
                      {isAdmin ? 'Audit Management' : 'My Audit Tasks'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {isAdmin
                        ? 'Create audit requests and review completed audits'
                        : 'View and complete assigned audit tasks'}
                    </p>
                  </div>
                  {isAdmin && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Audit Request
                    </button>
                  )}
                </div>
              </div>

              {/* Audit Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-amber-900">Pending Audits</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-amber-900">0</div>
                  <div className="text-xs text-amber-600 mt-1">Awaiting completion</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-blue-900">In Progress</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">0</div>
                  <div className="text-xs text-blue-600 mt-1">Currently being audited</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-green-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-green-900">Completed</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-900">0</div>
                  <div className="text-xs text-green-600 mt-1">This month</div>
                </div>
              </div>

              {/* Audit List */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isAdmin ? 'All Audit Tasks' : 'Assigned to Me'}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <BarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Audits Yet</h3>
                    <p className="text-gray-600 mb-6">
                      {isAdmin
                        ? 'Create your first audit request to get started'
                        : 'No audit tasks have been assigned to you yet'}
                    </p>
                    {isAdmin && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Create First Audit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Audit Types Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Warehouse className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Location Audit</h4>
                  </div>
                  <p className="text-sm text-gray-600">Audit entire storage location</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-cyan-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Container Audit</h4>
                  </div>
                  <p className="text-sm text-gray-600">Audit specific container</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Search className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Item Audit</h4>
                  </div>
                  <p className="text-sm text-gray-600">Audit specific item type</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Full Audit</h4>
                  </div>
                  <p className="text-sm text-gray-600">Complete inventory audit</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && deletingItemId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Item</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this item from the inventory? All data associated with this item will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingItemId(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement actual delete functionality
                    console.log('Deleting item:', deletingItemId);
                    setShowDeleteConfirm(false);
                    setDeletingItemId(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Add New Inventory Item</h3>
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter item name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select category</option>
                          <option value="Instruments">Instruments</option>
                          <option value="Disposables">Disposables</option>
                          <option value="Implants">Implants</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Sutures">Sutures</option>
                          <option value="Dressings">Dressings</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter item description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Classification *</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select classification</option>
                          <option value="Single-use">Single-use</option>
                          <option value="Reusable">Reusable</option>
                          <option value="Sterile">Sterile</option>
                          <option value="Non-sterile">Non-sterile</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialties *</label>
                        <select multiple className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24">
                          {configuredSpecialties.map(spec => (
                            <option key={spec.id} value={spec.name}>{spec.name}</option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Stock Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum *</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum *</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point *</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Supplier Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier/Trust *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter supplier name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Reference *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter product ref"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter SKU"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost (GBP)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usage Frequency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="As Required">As Required</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg flex gap-3">
                <button
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement actual add functionality
                    console.log('Adding new item');
                    setShowAddItem(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {showEditItem && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Edit Item</h3>
                    <p className="text-sm text-gray-600 mt-1">{editingItem.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowEditItem(false);
                      setEditingItem(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                        <input
                          type="text"
                          defaultValue={editingItem.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select
                          defaultValue={editingItem.category}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Instruments">Instruments</option>
                          <option value="Disposables">Disposables</option>
                          <option value="Implants">Implants</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Sutures">Sutures</option>
                          <option value="Dressings">Dressings</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          defaultValue={editingItem.description}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Classification *</label>
                        <select
                          defaultValue={editingItem.classification}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Single-use">Single-use</option>
                          <option value="Reusable">Reusable</option>
                          <option value="Sterile">Sterile</option>
                          <option value="Non-sterile">Non-sterile</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialties *</label>
                        <div className="text-sm text-gray-600 p-2 border border-gray-300 rounded-lg bg-gray-50">
                          {editingItem.specialty.join(', ')}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Specialty editing coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Stock Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                        <input
                          type="number"
                          min="0"
                          defaultValue={editingItem.stock.current}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum *</label>
                        <input
                          type="number"
                          min="0"
                          defaultValue={editingItem.stock.minimum}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum *</label>
                        <input
                          type="number"
                          min="0"
                          defaultValue={editingItem.stock.maximum}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point *</label>
                        <input
                          type="number"
                          min="0"
                          defaultValue={editingItem.stock.reorderPoint}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Supplier Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier/Trust *</label>
                        <input
                          type="text"
                          defaultValue={editingItem.supplier}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Reference *</label>
                        <input
                          type="text"
                          defaultValue={editingItem.productReference}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                        <input
                          type="text"
                          defaultValue={editingItem.sku || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost (GBP)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          defaultValue={editingItem.cost}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usage Frequency</label>
                        <select
                          defaultValue={editingItem.frequency}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="As Required">As Required</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg flex gap-3">
                <button
                  onClick={() => {
                    setShowEditItem(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement actual edit functionality
                    console.log('Saving item:', editingItem.id);
                    setShowEditItem(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CSV Upload Modal */}
        {showCSVUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Upload CSV File</h3>
                  <button
                    onClick={() => {
                      setShowCSVUpload(false);
                      setCsvFile(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label
                      htmlFor="csv-upload"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Choose File
                    </label>
                    {csvFile && (
                      <p className="text-sm text-green-600 mt-3">
                        Selected: {csvFile.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">CSV Format Requirements</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Required columns: name, category, classification, supplier, productReference</li>
                    <li>• Stock columns: current, minimum, maximum, reorderPoint</li>
                    <li>• Optional columns: description, sku, cost, frequency</li>
                    <li>• Specialty should be comma-separated if multiple</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowCSVUpload(false);
                    setCsvFile(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (csvFile) {
                      setCsvUploading(true);
                      // TODO: Implement actual CSV upload functionality
                      setTimeout(() => {
                        console.log('Uploading CSV:', csvFile.name);
                        setCsvUploading(false);
                        setShowCSVUpload(false);
                        setCsvFile(null);
                      }, 2000);
                    }
                  }}
                  disabled={!csvFile || csvUploading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {csvUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload CSV'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
