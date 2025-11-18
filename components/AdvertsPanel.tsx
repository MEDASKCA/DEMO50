'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Bell, BookOpen, Stethoscope, Award, AlertCircle, ChevronLeft, ChevronRight, Briefcase, HeartPulse, Shield, Coffee, Zap } from 'lucide-react';
import Image from 'next/image';

interface AdCard {
  id: string;
  type: 'training' | 'demo' | 'audit' | 'change' | 'huddle' | 'announcement' | 'wellness' | 'equipment' | 'policy' | 'cpd';
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  icon?: any;
  color: string;
  bgGradient?: string;
  imageUrl?: string;
  attendees?: string;
  presenter?: string;
}

export default function AdvertsPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const adverts: AdCard[] = [
    {
      id: '1',
      type: 'training',
      title: 'Advanced Clinical Skills Workshop',
      description: 'Hands-on training session covering the latest surgical techniques and patient care protocols. Interactive scenarios and skill stations. CPD accredited.',
      date: '15 Nov 2025',
      time: '14:00 - 17:00',
      location: 'Training Suite 3',
      presenter: 'Clinical Education Team',
      attendees: '15 places available',
      imageUrl: '/ads/training.png',
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      type: 'equipment',
      title: 'Zimmer Biomet Knee Solutions',
      description: 'Discover cutting-edge knee arthroplasty technology with enhanced precision and patient-specific instrumentation. Live demonstration and case study review.',
      date: '18 Nov 2025',
      time: '10:00 - 12:00',
      location: 'Theatre 1',
      presenter: 'Zimmer Biomet Clinical Team',
      attendees: 'All orthopaedic staff invited',
      imageUrl: '/ads/Zimmer Biomet.png',
      color: 'purple',
      bgGradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: '3',
      type: 'huddle',
      title: 'Daily Theatre Huddle',
      description: "Morning briefing covering today's surgical schedule, team assignments, critical equipment status, and important safety notices. Attendance mandatory.",
      date: 'Today',
      time: '08:00',
      location: 'Staff Room',
      imageUrl: '/ads/Daily huddle.png',
      color: 'teal',
      bgGradient: 'from-teal-500 to-cyan-600'
    },
    {
      id: '4',
      type: 'audit',
      title: 'Q4 Theatre Performance Review',
      description: 'Comprehensive quarterly audit covering efficiency metrics, patient outcomes, equipment utilization, and staff development. Results will inform Q1 planning.',
      date: '22 Nov 2025',
      time: '13:00 - 15:00',
      location: 'Conference Room A',
      attendees: 'Department heads & senior staff',
      imageUrl: '/ads/audit.png',
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600'
    },
    {
      id: '5',
      type: 'policy',
      title: 'NRFit™ Connectors - Patient Safety Alert',
      description: 'New ISO 80369-3 compliant enteral feeding connectors prevent misconnections and enhance patient safety. Mandatory training for all clinical staff.',
      date: 'Effective Immediately',
      location: 'All Clinical Areas',
      imageUrl: '/ads/NRFIT.jpg',
      color: 'red',
      bgGradient: 'from-red-500 to-rose-600'
    },
    {
      id: '6',
      type: 'equipment',
      title: 'Attune® Knee System',
      description: 'Experience the next generation in cementless knee replacement technology. Enhanced stability and natural movement for improved patient outcomes.',
      date: '20 Nov 2025',
      time: '14:00 - 16:00',
      location: 'Theatre 2',
      presenter: 'DePuy Synthes Representative',
      attendees: 'Orthopaedic team',
      imageUrl: '/ads/Attune.jpg',
      color: 'pink',
      bgGradient: 'from-pink-500 to-rose-500'
    },
    {
      id: '7',
      type: 'cpd',
      title: 'Enhanced Recovery Programme Success',
      description: 'NHS England data shows Enhanced Recovery reduces hospital stays by 70,000 bed days annually. Learn how to implement ER protocols in your theatre.',
      date: '25 Nov 2025',
      time: '09:00 - 16:00',
      location: 'Education Centre',
      presenter: 'NHS England ER Team',
      attendees: 'CPD points: 6.5',
      imageUrl: '/ads/NHS-England-National-Perspective-Enhanced-Recovery-8-638.webp',
      color: 'cyan',
      bgGradient: 'from-cyan-500 to-blue-500'
    },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % adverts.length);
        setIsTransitioning(false);
      }, 500); // Fade duration
    }, 5000); // 5 seconds per advert

    return () => clearInterval(timer);
  }, [adverts.length]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'training': return 'Training Event';
      case 'demo': return 'Product Demo';
      case 'audit': return 'Audit Meeting';
      case 'change': return 'Important Change';
      case 'huddle': return 'Daily Huddle';
      case 'announcement': return 'Announcement';
      case 'wellness': return 'Staff Wellbeing';
      case 'equipment': return 'Equipment Update';
      case 'policy': return 'Policy Update';
      case 'cpd': return 'CPD Event';
      default: return 'Notice';
    }
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % adverts.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + adverts.length) % adverts.length);
      setIsTransitioning(false);
    }, 500);
  };

  const currentAd = adverts[currentIndex];

  return (
    <div className="sticky top-0 h-screen bg-gray-50 dark:bg-slate-900 flex flex-col overflow-hidden">
      {/* Full-height Advert Card with Smooth Fade Transition */}
      <div
        className={`flex-1 transition-opacity duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="h-full bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
          {/* Image Section - Fixed height at top */}
          <div className="relative h-[45vh] bg-gray-100 dark:bg-slate-800 flex-shrink-0">
            {currentAd.imageUrl && (
              <Image
                src={currentAd.imageUrl}
                alt={currentAd.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            )}

            {/* Type Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 dark:text-slate-100 shadow-lg">
                {getTypeLabel(currentAd.type)}
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all active:scale-95 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all active:scale-95 z-10"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content Section - Scrollable below image */}
          <div className="flex-1 overflow-y-auto p-3 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base mb-2 line-clamp-2">
              {currentAd.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-300 mb-3 line-clamp-2">
              {currentAd.description}
            </p>

            {/* Details */}
            <div className="space-y-1 mb-3">
              {currentAd.date && (
                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="font-medium">{currentAd.date}</span>
                  {currentAd.time && <span className="text-gray-500 dark:text-slate-400">• {currentAd.time}</span>}
                </div>
              )}
              {currentAd.location && (
                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-slate-200">
                  <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-500 dark:bg-slate-400 rounded-full" />
                  </div>
                  <span>{currentAd.location}</span>
                </div>
              )}
              {currentAd.presenter && (
                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-slate-200">
                  <Users className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-slate-300">{currentAd.presenter}</span>
                </div>
              )}
              {currentAd.attendees && (
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{currentAd.attendees}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button className="w-full py-2 rounded-lg text-xs font-bold transition-all bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-purple-700 active:scale-[0.98]">
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
        {adverts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 700);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-blue-500'
                : 'w-2 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
