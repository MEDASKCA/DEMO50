'use client';

import React from 'react';
import Image from 'next/image';

interface TomLogoProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: number;
  className?: string;
  variant?: 'fixed' | 'inline';
}

export default function TomLogo({
  isListening = false,
  isSpeaking = false,
  size = 60,
  className = '',
  variant = 'inline'
}: TomLogoProps) {
  const isActive = isListening || isSpeaking;

  return (
    <div className={`tom-logo-container ${variant === 'fixed' ? 'tom-logo-fixed' : ''} ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''} ${className}`}>
      <div className="tom-logo-wrapper" style={{ width: size, height: size, position: 'relative' }}>
        {/* Pulsing glow rings (visible when listening or speaking) */}
        {isActive && (
          <svg
            viewBox="0 0 200 200"
            className="tom-logo-svg"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Listening gradient - cyan/teal */}
              <radialGradient id="pulseGlowListening">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0891B2" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0E7490" stopOpacity="0" />
              </radialGradient>
              {/* Speaking gradient - green/teal */}
              <radialGradient id="pulseGlowSpeaking">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              className={`pulse-ring pulse-ring-1 ${isSpeaking ? 'speaking-ring' : 'listening-ring'}`}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={`url(#pulseGlow${isSpeaking ? 'Speaking' : 'Listening'})`}
              strokeWidth="8"
              opacity="0.6"
            />
            <circle
              className={`pulse-ring pulse-ring-2 ${isSpeaking ? 'speaking-ring' : 'listening-ring'}`}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={`url(#pulseGlow${isSpeaking ? 'Speaking' : 'Listening'})`}
              strokeWidth="6"
              opacity="0.4"
            />
            <circle
              className={`pulse-ring pulse-ring-3 ${isSpeaking ? 'speaking-ring' : 'listening-ring'}`}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={`url(#pulseGlow${isSpeaking ? 'Speaking' : 'Listening'})`}
              strokeWidth="4"
              opacity="0.2"
            />
          </svg>
        )}

        {/* MEDASKCA Logo Image with reactive blinking */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            boxShadow: 'none'
          }}
          className={isActive ? (isSpeaking ? 'logo-blink-speaking' : 'logo-blink-listening') : ''}
        >
          <Image
            src="https://raw.githubusercontent.com/MEDASKCA/OPS/main/logo-medaskca.png"
            alt="MEDASKCA TOM AI Logo"
            width={size}
            height={size}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
