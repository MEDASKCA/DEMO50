'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MedaskLogoProps {
  size?: number;
  variant?: 'default' | 'compact' | 'icon-only';
  animate?: boolean;
}

export default function MedaskLogo({ size = 120, variant = 'default', animate = true }: MedaskLogoProps) {
  const iconSize = variant === 'icon-only' ? size : size * 0.4;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glowing background orb */}
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main logo container */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Icon/Symbol */}
        <motion.div
          className="relative"
          animate={animate ? {
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-30 blur-md"
            style={{ width: iconSize * 1.2, height: iconSize * 1.2, left: '-10%', top: '-10%' }}
          />

          {/* Main icon circle */}
          <div
            className="relative rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl"
            style={{ width: iconSize, height: iconSize }}
          >
            {/* Inner highlight */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

            {/* Letter M with medical cross */}
            <svg
              width={iconSize * 0.6}
              height={iconSize * 0.6}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Medical Cross */}
              <motion.path
                d="M18 8 L18 32 M10 20 L26 20"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                animate={animate ? {
                  opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Letter M stylized */}
              <motion.path
                d="M8 14 L12 22 L16 14 M24 14 L28 22 L32 14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={animate ? {
                  opacity: [1, 0.7, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </svg>

            {/* Pulse ring */}
            {animate && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Text logo */}
        {variant !== 'icon-only' && (
          <div className="flex flex-col">
            <motion.span
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none"
              style={{ fontSize: size * 0.25 }}
              animate={animate ? {
                backgroundPosition: ['0%', '100%', '0%'],
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              MEDASKCA
            </motion.span>
            {variant === 'default' && (
              <span
                className="text-gray-600 dark:text-gray-400 font-medium leading-tight"
                style={{ fontSize: size * 0.12 }}
              >
                Healthcare Innovation
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
