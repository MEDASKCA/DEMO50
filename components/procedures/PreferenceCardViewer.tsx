'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Package,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Search,
  Loader2,
  TrendingDown,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  findMatchingInventoryItems,
  checkInventoryAvailabilityForPreferenceCard,
  InventoryItem
} from '@/lib/services/inventoryLinkService';
import { useRouter } from 'next/navigation';

interface PreferenceCardViewerProps {
  procedureCode?: string;
  surgeonId?: string;
}

export default function PreferenceCardViewer({ procedureCode, surgeonId }: PreferenceCardViewerProps) {
  const router = useRouter();
  const [preferenceCards, setPreferenceCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [inventoryLinks, setInventoryLinks] = useState<{
    [itemName: string]: InventoryItem | null;
  }>({});
  const [availability, setAvailability] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPreferenceCards();
  }, [procedureCode, surgeonId]);

  useEffect(() => {
    if (selectedCard) {
      loadInventoryLinks(selectedCard);
      loadAvailability(selectedCard.id);
    }
  }, [selectedCard]);

  const loadPreferenceCards = async () => {
    setLoading(true);
    try {
      const cardsSnap = await getDocs(collection(db, 'preferenceCards'));
      let cards: any[] = [];

      cardsSnap.forEach(doc => {
        cards.push({ id: doc.id, ...doc.data() });
      });

      // Filter by procedure code if provided
      if (procedureCode) {
        cards = cards.filter(card =>
          card.procedureCodes?.includes(procedureCode) ||
          card.procedureCode === procedureCode
        );
      }

      // Filter by surgeon if provided
      if (surgeonId) {
        cards = cards.filter(card =>
          card.surgeonIds?.includes(surgeonId) ||
          card.surgeonId === surgeonId
        );
      }

      setPreferenceCards(cards);

      // Auto-select first card if available
      if (cards.length > 0) {
        setSelectedCard(cards[0]);
      }
    } catch (error) {
      console.error('Error loading preference cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInventoryLinks = async (card: any) => {
    const links: { [itemName: string]: InventoryItem | null } = {};

    // Process all items
    const allItems = [
      ...(card.equipment || []),
      ...(card.instruments || []),
      ...(card.implants || []),
      ...(card.consumables || []),
      ...(card.sutures || [])
    ];

    for (const itemName of allItems) {
      const matches = await findMatchingInventoryItems(itemName);
      links[itemName] = matches[0] || null;
    }

    setInventoryLinks(links);
  };

  const loadAvailability = async (cardId: string) => {
    const avail = await checkInventoryAvailabilityForPreferenceCard(cardId);
    setAvailability(avail);
  };

  const handleItemClick = async (itemName: string) => {
    const inventoryItem = inventoryLinks[itemName];

    if (inventoryItem?.id) {
      // Navigate to inventory page with item highlighted
      router.push(`/admin/inventory?item=${inventoryItem.id}`);
    } else {
      // Search for item in inventory
      router.push(`/admin/inventory?search=${encodeURIComponent(itemName)}`);
    }
  };

  const getItemStatusIcon = (itemName: string) => {
    if (!inventoryLinks[itemName]) {
      return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    }

    const item = inventoryLinks[itemName];

    if (item.currentStock === 0) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }

    if (item.currentStock && item.reorderLevel && item.currentStock <= item.reorderLevel) {
      return <TrendingDown className="w-4 h-4 text-yellow-500" />;
    }

    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getItemStatusColor = (itemName: string) => {
    if (!inventoryLinks[itemName]) return 'border-orange-200 bg-orange-50';

    const item = inventoryLinks[itemName];

    if (item.currentStock === 0) return 'border-red-200 bg-red-50';
    if (item.currentStock && item.reorderLevel && item.currentStock <= item.reorderLevel) {
      return 'border-yellow-200 bg-yellow-50';
    }

    return 'border-green-200 bg-green-50';
  };

  const filteredCards = preferenceCards.filter(card =>
    searchTerm === '' ||
    card.procedureName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.surgeonName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItemSection = (title: string, items: string[], icon: React.ReactNode) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h4 className="font-bold text-gray-900">{title}</h4>
          <span className="text-sm text-gray-500">({items.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((item, index) => {
            const inventoryItem = inventoryLinks[item];

            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={`p-3 border-2 rounded-lg text-left hover:shadow-md transition-all group ${getItemStatusColor(item)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-cyan-600 transition-colors">
                      {item}
                    </p>

                    {inventoryItem && (
                      <div className="mt-2 space-y-1">
                        {inventoryItem.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{inventoryItem.location}</span>
                          </div>
                        )}

                        {inventoryItem.currentStock !== undefined && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Package className="w-3 h-3" />
                            <span>Stock: {inventoryItem.currentStock} {inventoryItem.unitOfMeasure}</span>
                          </div>
                        )}

                        {inventoryItem.expiryDate && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>Expires: {new Date(inventoryItem.expiryDate).toLocaleDateString('en-GB')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {getItemStatusIcon(item)}
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 md:p-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Preference Cards</h1>
        <p className="text-sm md:text-base text-white/90">
          View procedure requirements with real-time inventory availability
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search preference cards..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cards List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-bold text-gray-900 mb-2">
              Preference Cards ({filteredCards.length})
            </h3>

            {filteredCards.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No preference cards found</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                      selectedCard?.id === card.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 text-sm">{card.procedureName}</p>
                    {card.surgeonName && (
                      <p className="text-xs text-gray-600 mt-1">{card.surgeonName}</p>
                    )}
                    {card.specialty && (
                      <p className="text-xs text-gray-500 mt-1">{card.specialty}</p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Card Details */}
          <div className="lg:col-span-2">
            {selectedCard ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCard.procedureName}
                  </h2>

                  {selectedCard.surgeonName && (
                    <p className="text-gray-600 mb-1">Surgeon: {selectedCard.surgeonName}</p>
                  )}

                  {selectedCard.specialty && (
                    <p className="text-gray-600 mb-1">Specialty: {selectedCard.specialty}</p>
                  )}

                  {/* Availability Summary */}
                  {availability && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">Inventory Status</h4>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Available</p>
                          <p className="text-lg font-bold text-green-600">
                            {availability.allAvailable ? 'All' : 'Partial'}
                          </p>
                        </div>

                        {availability.unavailableItems.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-600">Missing</p>
                            <p className="text-lg font-bold text-red-600">
                              {availability.unavailableItems.length}
                            </p>
                          </div>
                        )}

                        {availability.lowStockItems.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-600">Low Stock</p>
                            <p className="text-lg font-bold text-yellow-600">
                              {availability.lowStockItems.length}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Sections */}
                <div className="space-y-6">
                  {renderItemSection(
                    'Equipment',
                    selectedCard.equipment || [],
                    <Package className="w-5 h-5 text-blue-600" />
                  )}

                  {renderItemSection(
                    'Instruments',
                    selectedCard.instruments || [],
                    <Package className="w-5 h-5 text-green-600" />
                  )}

                  {renderItemSection(
                    'Implants',
                    selectedCard.implants || [],
                    <Package className="w-5 h-5 text-purple-600" />
                  )}

                  {renderItemSection(
                    'Consumables',
                    selectedCard.consumables || [],
                    <Package className="w-5 h-5 text-orange-600" />
                  )}

                  {renderItemSection(
                    'Sutures',
                    selectedCard.sutures || [],
                    <Package className="w-5 h-5 text-pink-600" />
                  )}
                </div>

                {/* Legend */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-3">Status Legend</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>In Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-yellow-500" />
                      <span>Low Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span>Out of Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span>Not Linked</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    💡 Click any item to view details in inventory or search for it
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Select a preference card to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
