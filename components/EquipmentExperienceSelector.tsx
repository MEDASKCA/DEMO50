'use client';

import React, { useState } from 'react';
import {
  ORTHOPAEDIC_EQUIPMENT,
  GENERAL_SURGERY_EQUIPMENT,
  EQUIPMENT_EXPERIENCE_LEVELS,
  StaffEquipmentExperience
} from '@/lib/surgicalCompetencyData';

interface EquipmentExperienceSelectorProps {
  selectedEquipment: StaffEquipmentExperience[];
  onUpdate: (equipment: StaffEquipmentExperience[]) => void;
  specialty: 'Orthopaedics' | 'General Surgery' | 'All';
}

export default function EquipmentExperienceSelector({
  selectedEquipment,
  onUpdate,
  specialty
}: EquipmentExperienceSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customEquipment, setCustomEquipment] = useState({
    name: '',
    manufacturer: '',
    category: ''
  });

  const getEquipmentData = () => {
    if (specialty === 'Orthopaedics') return ORTHOPAEDIC_EQUIPMENT;
    if (specialty === 'General Surgery') return GENERAL_SURGERY_EQUIPMENT;
    // Combine both
    return { ...ORTHOPAEDIC_EQUIPMENT, ...GENERAL_SURGERY_EQUIPMENT };
  };

  const equipmentData = getEquipmentData();
  const categories = Object.keys(equipmentData);

  const isEquipmentSelected = (manufacturer: string, product: string): boolean => {
    return selectedEquipment.some(
      eq => eq.manufacturer === manufacturer && eq.productLine === product
    );
  };

  const getEquipmentLevel = (manufacturer: string, product: string): number => {
    const found = selectedEquipment.find(
      eq => eq.manufacturer === manufacturer && eq.productLine === product
    );
    return found?.experienceLevel || 0;
  };

  const getTimesUsed = (manufacturer: string, product: string): number => {
    const found = selectedEquipment.find(
      eq => eq.manufacturer === manufacturer && eq.productLine === product
    );
    return found?.timesUsed || 0;
  };

  const handleEquipmentToggle = (
    category: string,
    manufacturer: string,
    product: string
  ) => {
    const isSelected = isEquipmentSelected(manufacturer, product);

    if (isSelected) {
      // Remove
      onUpdate(selectedEquipment.filter(
        eq => !(eq.manufacturer === manufacturer && eq.productLine === product)
      ));
    } else {
      // Add with default level 0
      const newEquipment: StaffEquipmentExperience = {
        equipmentName: product,
        manufacturer,
        productLine: product,
        category,
        experienceLevel: 0
      };
      onUpdate([...selectedEquipment, newEquipment]);
    }
  };

  const handleExperienceChange = (
    manufacturer: string,
    product: string,
    level: 0 | 1 | 2 | 3
  ) => {
    const updated = selectedEquipment.map(eq =>
      eq.manufacturer === manufacturer && eq.productLine === product
        ? {
            ...eq,
            experienceLevel: level,
            // Clear tracking data if moving away from level 1 (learning)
            ...(level !== 1 && { timesUsed: undefined, lastUsed: undefined })
          }
        : eq
    );
    onUpdate(updated);
  };

  const handleTimesUsedChange = (manufacturer: string, product: string, times: number) => {
    const updated = selectedEquipment.map(eq =>
      eq.manufacturer === manufacturer && eq.productLine === product
        ? { ...eq, timesUsed: times }
        : eq
    );
    onUpdate(updated);
  };

  const handleAddCustomEquipment = () => {
    if (!customEquipment.name.trim()) return;

    const newEquipment: StaffEquipmentExperience = {
      equipmentName: customEquipment.name,
      manufacturer: customEquipment.manufacturer || 'Other',
      productLine: customEquipment.name,
      category: customEquipment.category || selectedCategory || 'Other',
      experienceLevel: 0
    };

    onUpdate([...selectedEquipment, newEquipment]);
    setCustomEquipment({ name: '', manufacturer: '', category: '' });
    setShowAddCustom(false);
  };

  const renderEquipmentCheckbox = (category: string, manufacturer: string, product: string) => {
    const isSelected = isEquipmentSelected(manufacturer, product);
    const currentLevel = getEquipmentLevel(manufacturer, product);
    const isLearning = currentLevel === 1;
    const timesUsed = getTimesUsed(manufacturer, product);

    return (
      <div key={`${manufacturer}-${product}`} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
        {/* Checkbox and Product Name */}
        <div className="flex items-start gap-2 mb-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleEquipmentToggle(category, manufacturer, product)}
            className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-900 cursor-pointer">
              {product}
            </label>
            <div className="text-xs text-gray-500 mt-0.5">
              {manufacturer}
            </div>
          </div>
        </div>

        {/* 3-Star Rating (only if selected) */}
        {isSelected && (
          <div className="ml-6 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {([1, 2, 3] as const).map((level) => {
                const levelData = EQUIPMENT_EXPERIENCE_LEVELS[level];
                const isActive = currentLevel === level;

                return (
                  <button
                    key={level}
                    onClick={() => handleExperienceChange(manufacturer, product, level)}
                    className={`
                      px-2 py-1.5 rounded border text-xs font-medium transition-all
                      ${isActive
                        ? levelData.activeColor
                        : levelData.color
                      }
                    `}
                    title={`${levelData.label}: ${levelData.description}`}
                  >
                    {levelData.stars} {levelData.stars === 1 ? 'Star' : 'Stars'}
                  </button>
                );
              })}
            </div>

            {/* Learning Progress Tracking */}
            {isLearning && (
              <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-200">
                <label className="block text-xs font-medium text-orange-900 mb-1.5">
                  Learning Progress (times used)
                </label>
                <input
                  type="number"
                  min="0"
                  value={timesUsed}
                  onChange={(e) => handleTimesUsedChange(manufacturer, product, parseInt(e.target.value) || 0)}
                  className="w-28 px-2.5 py-1.5 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
                <p className="text-xs text-orange-700 mt-1.5">
                  Track how many times you've used while learning
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Equipment & Instruments Experience</h2>
        <p className="text-xs md:text-sm text-gray-600">
          Select equipment you've used and rate your experience level (1-3 stars).
        </p>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
          Select Equipment Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a category...</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      {selectedCategory && (
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
            Search Equipment
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name or manufacturer..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Equipment List */}
      {selectedCategory && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {selectedCategory}
            </h3>
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
            >
              + Add Custom
            </button>
          </div>

          {/* Add Custom Equipment Form */}
          {showAddCustom && (
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Add Custom Equipment</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={customEquipment.name}
                  onChange={(e) => setCustomEquipment({ ...customEquipment, name: e.target.value })}
                  placeholder="Equipment/Product name..."
                  className="w-full px-3 py-2 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={customEquipment.manufacturer}
                  onChange={(e) => setCustomEquipment({ ...customEquipment, manufacturer: e.target.value })}
                  placeholder="Manufacturer (optional)..."
                  className="w-full px-3 py-2 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomEquipment}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddCustom(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Equipment Rating Legend */}
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Experience Levels (3-Star System)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {([1, 2, 3] as const).map((level) => {
                const levelData = EQUIPMENT_EXPERIENCE_LEVELS[level];
                return (
                  <div key={level} className="flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${levelData.activeColor}`}>{levelData.stars}</span>
                    <div>
                      <div className="text-xs font-medium">{levelData.label}</div>
                      <div className="text-xs text-gray-500 hidden md:block">{levelData.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Equipment by Manufacturer */}
          {selectedCategory && (
            <div className="space-y-3">
              {Object.entries(equipmentData[selectedCategory as keyof typeof equipmentData] as Record<string, { products: string[] }>)
                .map(([manufacturer, data]) => {
                  const filteredProducts = searchTerm
                    ? data.products.filter(p =>
                        p.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    : data.products;

                  if (filteredProducts.length === 0) return null;

                  return (
                    <div key={manufacturer} className="border border-gray-300 rounded-lg p-3">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                        {manufacturer}
                      </h4>
                      <div className="space-y-1.5">
                        {filteredProducts.map((product) =>
                          renderEquipmentCheckbox(selectedCategory, manufacturer, product)
                        )}
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {selectedEquipment.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm md:text-base font-semibold text-green-900 mb-2">Equipment Experience Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-gray-900">{selectedEquipment.length}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            {([1, 2, 3] as const).map((level) => {
              const levelData = EQUIPMENT_EXPERIENCE_LEVELS[level];
              const count = selectedEquipment.filter(eq => eq.experienceLevel === level).length;
              return (
                <div key={level} className="text-center">
                  <div className={`w-8 h-8 md:w-9 md:h-9 mx-auto rounded flex items-center justify-center text-sm md:text-base font-bold mb-1 ${levelData.activeColor}`}>{levelData.stars}</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{count}</div>
                  <div className="text-xs text-gray-600">{levelData.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
