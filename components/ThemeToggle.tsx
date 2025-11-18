'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 10 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Load saved position from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('surgical-light-position');
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem('surgical-light-position', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setHasMoved(false);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setHasMoved(true);
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    setHasMoved(true);
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  const handleClick = () => {
    // Only toggle theme if we didn't drag
    if (!hasMoved) {
      toggleTheme();
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      className="theme-toggle"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      aria-label="Toggle dark mode (drag to move)"
      title={`${theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} • Drag to reposition`}
    >
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        {/* Surgical OR Light - Realistic multi-lens design */}

        <defs>
          {/* Light glow effect */}
          <radialGradient id="orGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
          </radialGradient>

          {/* Metallic housing gradient */}
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0"/>
            <stop offset="50%" stopColor="#cbd5e1"/>
            <stop offset="100%" stopColor="#94a3b8"/>
          </linearGradient>

          {/* Lens reflection gradient */}
          <radialGradient id="lensReflection" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#64748b" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Main housing circle - metallic */}
        <circle cx="100" cy="75" r="58" fill="url(#metalGradient)" opacity="0.6"/>
        <circle cx="100" cy="75" r="56" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5"/>
        <circle cx="100" cy="75" r="52" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.3"/>

        {/* Glow backdrop (only visible in light mode) */}
        <circle className="or-glow" cx="100" cy="75" r="50" fill="url(#orGlow)" opacity="0"/>

        {/* Inner housing ring */}
        <circle cx="100" cy="75" r="48" fill="#f8fafc" opacity="0.3"/>
        <circle cx="100" cy="75" r="48" fill="none" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>

        {/* Center lens with depth */}
        <circle cx="100" cy="75" r="20" fill="#1e293b" opacity="0.3"/>
        <circle className="or-lens" cx="100" cy="75" r="18" fill="#0f172a"/>
        <circle cx="100" cy="75" r="18" fill="url(#lensReflection)"/>

        {/* Surrounding lenses - 6 main lenses in a circle */}
        <g>
          <circle cx="100" cy="43" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="100" cy="43" r="12" fill="#0f172a"/>
          <circle cx="100" cy="43" r="12" fill="url(#lensReflection)"/>
        </g>

        <g>
          <circle cx="128" cy="59" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="128" cy="59" r="12" fill="#0f172a"/>
          <circle cx="128" cy="59" r="12" fill="url(#lensReflection)"/>
        </g>

        <g>
          <circle cx="128" cy="91" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="128" cy="91" r="12" fill="#0f172a"/>
          <circle cx="128" cy="91" r="12" fill="url(#lensReflection)"/>
        </g>

        <g>
          <circle cx="100" cy="107" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="100" cy="107" r="12" fill="#0f172a"/>
          <circle cx="100" cy="107" r="12" fill="url(#lensReflection)"/>
        </g>

        <g>
          <circle cx="72" cy="91" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="72" cy="91" r="12" fill="#0f172a"/>
          <circle cx="72" cy="91" r="12" fill="url(#lensReflection)"/>
        </g>

        <g>
          <circle cx="72" cy="59" r="13" fill="#1e293b" opacity="0.3"/>
          <circle className="or-lens" cx="72" cy="59" r="12" fill="#0f172a"/>
          <circle cx="72" cy="59" r="12" fill="url(#lensReflection)"/>
        </g>

        {/* Small accent lenses between main lenses */}
        <g opacity="0.9">
          <circle className="or-lens" cx="114" cy="59" r="5.5" fill="#0f172a"/>
          <circle cx="114" cy="59" r="5.5" fill="url(#lensReflection)"/>
        </g>
        <g opacity="0.9">
          <circle className="or-lens" cx="120" cy="75" r="5.5" fill="#0f172a"/>
          <circle cx="120" cy="75" r="5.5" fill="url(#lensReflection)"/>
        </g>
        <g opacity="0.9">
          <circle className="or-lens" cx="114" cy="91" r="5.5" fill="#0f172a"/>
          <circle cx="114" cy="91" r="5.5" fill="url(#lensReflection)"/>
        </g>
        <g opacity="0.9">
          <circle className="or-lens" cx="86" cy="91" r="5.5" fill="#0f172a"/>
          <circle cx="86" cy="91" r="5.5" fill="url(#lensReflection)"/>
        </g>
        <g opacity="0.9">
          <circle className="or-lens" cx="80" cy="75" r="5.5" fill="#0f172a"/>
          <circle cx="80" cy="75" r="5.5" fill="url(#lensReflection)"/>
        </g>
        <g opacity="0.9">
          <circle className="or-lens" cx="86" cy="59" r="5.5" fill="#0f172a"/>
          <circle cx="86" cy="59" r="5.5" fill="url(#lensReflection)"/>
        </g>

      </svg>
    </button>
  );
}
