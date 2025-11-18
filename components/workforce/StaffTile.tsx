'use client';

import React from 'react';
import { getSpecialtyColors, getProfessionalTitle } from '@/lib/constants/specialtyColors';

interface StaffTileProps {
  staff: {
    id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    band: string;
    specialty?: string;
    fte: number;
    supernumeraryIn?: string[];
  };
  onDoubleClick: () => void;
  onMarkCompetent?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export default function StaffTile({
  staff,
  onDoubleClick,
  draggable = true,
  onDragStart,
  onDragEnd,
}: StaffTileProps) {
  const specialty = staff.specialty || 'General Surgery';
  const colors = getSpecialtyColors(specialty);
  const professionalTitle = getProfessionalTitle(staff.roles[0] || '');

  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart?.(e);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    onDragEnd?.(e);
  };

  return (
    <>
      {/* Desktop: Compact Row View */}
      <div
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={onDoubleClick}
        className={`
          hidden sm:flex
          bg-gray-50 border border-gray-200 rounded-lg p-3
          cursor-grab active:cursor-grabbing
          transition-all duration-200
          hover:bg-white hover:shadow-md hover:border-gray-300
          items-center gap-3
          ${isDragging ? 'opacity-50 scale-95' : ''}
        `}
        title="Drag to move • Click to view profile"
      >
        {/* Drag Handle Indicator */}
        <div className="flex-shrink-0 text-gray-300 hover:text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="4" cy="4" r="1.5"/>
            <circle cx="4" cy="8" r="1.5"/>
            <circle cx="4" cy="12" r="1.5"/>
            <circle cx="8" cy="4" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="8" cy="12" r="1.5"/>
          </svg>
        </div>

        {/* Staff Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-900 text-sm truncate">
              {staff.firstName} {staff.lastName}
            </span>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {staff.band}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-0.5 truncate">
            {professionalTitle}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-1.5 flex-shrink-0">
          {staff.fte !== 1 && (
            <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              {staff.fte} FTE
            </span>
          )}
          {staff.supernumeraryIn?.includes(specialty) && (
            <span className="text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
              Training
            </span>
          )}
        </div>

        {/* Color Accent */}
        <div className={`w-1 h-8 rounded-full ${colors.bg}`}></div>
      </div>

      {/* Mobile: Compact List View */}
      <div
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={onDoubleClick}
        className={`
          flex sm:hidden
          bg-gray-50 border-l-4 border-y border-r border-gray-200 rounded-r-lg p-2.5
          ${colors.border}
          cursor-grab active:cursor-grabbing
          transition-all duration-200
          hover:bg-white hover:shadow-sm
          items-center gap-2
          ${isDragging ? 'opacity-50 scale-95' : ''}
        `}
        title="Tap to view • Hold and drag to move"
      >
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900 truncate">
            {staff.firstName} {staff.lastName}
          </div>
          <div className="text-xs text-gray-600 truncate mt-0.5">
            {professionalTitle} • {staff.band}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-1 flex-shrink-0">
          {staff.fte !== 1 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              {staff.fte}
            </span>
          )}
          {staff.supernumeraryIn?.includes(specialty) && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
              SN
            </span>
          )}
        </div>
      </div>
    </>
  );
}
