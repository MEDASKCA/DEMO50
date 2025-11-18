'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DrawerNav({ isOpen, onClose, title, children }: DrawerNavProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startY, setStartY] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setDragOffset(0);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    // Only allow dragging down
    if (diff > 0) {
      e.preventDefault();
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // If dragged down more than 150px, close the drawer
    if (dragOffset > 150) {
      onClose();
    }

    setDragOffset(0);
    setStartY(0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 - (dragOffset / 500) : 0 }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-x-0 bottom-0 z-50 pb-16 animate-in slide-in-from-bottom duration-300"
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
        }}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl border-t-4 border-t-blue-500 max-h-[80vh] flex flex-col">
          {/* Drag Handle */}
          <div
            className="pt-4 pb-2 cursor-grab active:cursor-grabbing bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 rounded-t-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
          >
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 rounded-full mx-auto shadow-sm" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-50 via-teal-50 to-purple-50 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent !text-gray-900">{title}</h2>
              <p className="text-xs !text-gray-700 mt-0.5">Select an option below</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:opacity-70 transition-opacity active:scale-95"
            >
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
