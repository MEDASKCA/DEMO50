'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Clock,
  CheckCircle,
  Download,
  ArrowUp,
  ArrowDown,
  Zap,
  Award,
  Target
} from 'lucide-react';

interface AnalyticsViewProps {
  onBack?: () => void;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
}

// Premium Circular Progress with Glow
function PremiumCircularProgress({
  value,
  size = 140,
  strokeWidth = 8,
  color = '#3b82f6',
  glowColor = '#3b82f6',
  label,
  sublabel
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  glowColor?: string;
  label?: string;
  sublabel?: string;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedValue(value), 100);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center group">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id={`glow-${value}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={glowColor} />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle with glow */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${value})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-[2000ms] ease-out"
          filter={`url(#glow-${value})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-black bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {Math.round(animatedValue)}%
        </div>
        {label && <div className="text-xs font-semibold text-gray-500 mt-1">{label}</div>}
        {sublabel && <div className="text-[10px] text-gray-400">{sublabel}</div>}
      </div>
    </div>
  );
}

// Premium Metric Card with 3D Effect
function PremiumMetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  gradient,
  sparklineData
}: {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: any;
  gradient: string;
  sparklineData?: number[];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect - Desktop only */}
      <div className={`hidden md:block absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

      <div className={`relative bg-white md:bg-white rounded-md md:rounded-2xl p-3 md:p-6 border border-gray-200 md:border-gray-100 md:shadow-lg transition-all duration-500 ${isHovered ? 'md:transform md:scale-105 md:shadow-2xl' : ''}`}>
        {/* Icon - simplified on mobile */}
        <div className="flex items-start justify-between mb-2 md:mb-0">
          <div className={`hidden md:flex w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} items-center justify-center mb-0 md:mb-4 shadow-lg transform transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div className="md:hidden">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="text-[10px] md:text-sm font-medium md:font-semibold text-gray-500 uppercase tracking-wide mb-1 md:mb-2">{title}</div>
        <div className="text-xl md:text-3xl font-bold md:font-black text-gray-900 mb-1 md:mb-2">
          <AnimatedCounter end={typeof value === 'number' ? value : parseInt(value.replace(/\D/g, '')) || 0} suffix={typeof value === 'string' && value.includes('%') ? '%' : ''} />
        </div>

        {/* Trend indicator */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium md:font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUp className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />}
            <span>{change}%</span>
          </div>

          {/* Sparkline */}
          {sparklineData && (
            <svg width="60" height="20" className="opacity-60 hidden md:block">
              <defs>
                <linearGradient id={`sparkline-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={trend === 'up' ? '#10b981' : '#ef4444'} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path
                d={`M 0 24 ${sparklineData.map((val, i) =>
                  `L ${(i * 80) / (sparklineData.length - 1)} ${24 - (val / Math.max(...sparklineData)) * 20}`
                ).join(' ')} L 80 24 Z`}
                fill={`url(#sparkline-${title})`}
              />
              {/* Line */}
              <polyline
                points={sparklineData.map((val, i) =>
                  `${(i * 80) / (sparklineData.length - 1)},${24 - (val / Math.max(...sparklineData)) * 20}`
                ).join(' ')}
                fill="none"
                stroke={trend === 'up' ? '#10b981' : '#ef4444'}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

// Premium Radial Chart
function PremiumRadialChart({ data, size = 200 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimationProgress(1), 100);
  }, []);

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 25;
  const barWidth = 14;
  const gap = 6;

  return (
    <div className="relative">
      <svg width={size} height={size} className="filter drop-shadow-lg">
        <defs>
          {data.map((item, index) => (
            <linearGradient key={index} id={`radial-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={item.color} stopOpacity="1" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>
        {data.map((item, index) => {
          const radius = maxRadius - (index * (barWidth + gap));
          const circumference = 2 * Math.PI * radius;
          const percentage = item.value / 100;
          const offset = circumference - (percentage * circumference * animationProgress);

          return (
            <g key={index}>
              {/* Background circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={barWidth}
                fill="none"
                opacity="0.2"
              />
              {/* Value circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke={`url(#radial-gradient-${index})`}
                strokeWidth={barWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${centerX} ${centerY})`}
                className="transition-all duration-[2000ms] ease-out"
                style={{ filter: `drop-shadow(0 0 6px ${item.color}40)` }}
              />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-4xl font-black bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <AnimatedCounter end={88} suffix="%" />
        </div>
        <div className="text-xs font-semibold text-gray-500 mt-1">Average</div>
      </div>
    </div>
  );
}

// Premium Donut Chart
function PremiumDonutChart({
  data,
  size = 200
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimationProgress(1), 100);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90 filter drop-shadow-xl">
          <defs>
            {data.map((item, index) => (
              <linearGradient key={index} id={`donut-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={item.color} />
                <stop offset="100%" stopColor={item.color} stopOpacity="0.7" />
              </linearGradient>
            ))}
          </defs>
          {data.map((item, index) => {
            const percentage = item.value / total;
            const dashArray = `${percentage * circumference * animationProgress} ${circumference}`;
            const offset = -accumulatedOffset * animationProgress;
            accumulatedOffset += percentage * circumference;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={`url(#donut-gradient-${index})`}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={dashArray}
                strokeDashoffset={offset}
                className="transition-all duration-[2000ms] ease-out hover:stroke-width-[36] cursor-pointer"
                style={{ filter: `drop-shadow(0 0 8px ${item.color}40)` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <AnimatedCounter end={total} />
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Total Cases</div>
        </div>
      </div>
      <div className="mt-6 space-y-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shadow-lg transform group-hover:scale-125 transition-transform"
                style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}80` }}
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900">{item.label}</span>
            </div>
            <span className="font-bold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theatre Performance Card with 3D Effect
function TheatrePerformanceCard({ theatre }: { theatre: { name: string; utilization: number; cases: number } }) {
  const [isHovered, setIsHovered] = useState(false);

  const getColor = () => {
    if (theatre.utilization >= 90) return { main: '#10b981', glow: '#10b98140', bg: 'bg-green-50', text: 'text-green-700' };
    if (theatre.utilization >= 85) return { main: '#3b82f6', glow: '#3b82f640', bg: 'bg-blue-50', text: 'text-blue-700' };
    if (theatre.utilization >= 80) return { main: '#f59e0b', glow: '#f59e0b40', bg: 'bg-orange-50', text: 'text-orange-700' };
    return { main: '#ef4444', glow: '#ef444440', bg: 'bg-red-50', text: 'text-red-700' };
  };

  const color = getColor();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`hidden md:block absolute -inset-1 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500`}
        style={{ background: color.glow }}
      />
      <div className={`relative flex flex-col items-center p-3 md:p-5 bg-white rounded-md md:rounded-2xl border border-gray-200 md:border-gray-100 md:shadow-md transition-all duration-500 ${isHovered ? 'md:transform md:scale-110 md:shadow-2xl' : ''}`}>
        {/* Mobile: Simple text-based design */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-gray-900">{theatre.name}</div>
            <div className={`text-xs font-bold ${color.text}`}>{theatre.utilization}%</div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
            <div className={`h-1.5 rounded-full ${color.bg.replace('bg-', 'bg-')}`} style={{ width: `${theatre.utilization}%`, backgroundColor: color.main }}></div>
          </div>
          <div className="text-[10px] text-gray-500">
            {theatre.cases} cases
          </div>
        </div>

        {/* Desktop: Circular progress */}
        <div className="hidden md:block">
          <PremiumCircularProgress
            value={theatre.utilization}
            size={60}
            strokeWidth={6}
            color={color.main}
            glowColor={color.main}
          />
          <div className="mt-2 md:mt-4 text-center">
            <div className="text-[10px] md:text-sm font-bold text-gray-900">{theatre.name}</div>
            <div className="text-[9px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
              <AnimatedCounter end={theatre.cases} /> cases
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsView({ onBack }: AnalyticsViewProps) {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const theatreUtilizationData = [
    { name: 'Theatre 1', utilization: 92, cases: 145 },
    { name: 'Theatre 2', utilization: 88, cases: 132 },
    { name: 'Theatre 3', utilization: 95, cases: 158 },
    { name: 'Theatre 4', utilization: 78, cases: 98 },
    { name: 'Theatre 5', utilization: 85, cases: 115 },
    { name: 'Theatre 6', utilization: 90, cases: 140 },
  ];

  const specialtyDistribution = [
    { label: 'Trauma & Ortho', value: 245, color: '#3b82f6' },
    { label: 'General Surgery', value: 198, color: '#8b5cf6' },
    { label: 'Neurosurgery', value: 65, color: '#f59e0b' },
    { label: 'ENT', value: 156, color: '#10b981' },
  ];

  const radialData = [
    { label: 'Theatre 1', value: 92, color: '#3b82f6' },
    { label: 'Theatre 2', value: 88, color: '#8b5cf6' },
    { label: 'Theatre 3', value: 95, color: '#10b981' },
    { label: 'Theatre 4', value: 78, color: '#f59e0b' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white md:bg-gradient-to-br md:from-slate-50 md:via-blue-50 md:to-purple-50 pb-20 md:pb-4">
      {/* Mobile Header */}
      <div className="sm:hidden bg-gray-900 text-white px-3 py-3 sticky top-0 z-30 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold tracking-tight">Analytics</h1>
            <p className="text-xs text-gray-400 mt-0.5">Performance overview</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-gray-100 rounded-md text-xs font-medium hover:bg-gray-700 transition-colors border border-gray-700">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        {/* Time Range Filter - Mobile */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                timeRange === range
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
            >
              {range === 'week' ? 'Week' : range === 'month' ? 'Month' : range === 'quarter' ? 'Quarter' : 'Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:block bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-lg bg-opacity-90 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Theatre Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Real-time performance insights</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:scale-105'
                }`}
              >
                {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : range === 'quarter' ? 'This Quarter' : 'This Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 md:p-6 space-y-3 md:space-y-6 bg-gray-50 md:bg-transparent">
        {/* Premium KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          <PremiumMetricCard
            title="Total Cases"
            value={1243}
            change={12.5}
            trend="up"
            icon={Zap}
            gradient="from-blue-500 to-cyan-500"
            sparklineData={[580, 620, 650, 645, 670, 690, 720]}
          />
          <PremiumMetricCard
            title="Utilization"
            value="88%"
            change={3.2}
            trend="up"
            icon={Activity}
            gradient="from-purple-500 to-pink-500"
            sparklineData={[82, 84, 85, 86, 87, 88, 88]}
          />
          <PremiumMetricCard
            title="On-Time Start"
            value="92%"
            change={1.8}
            trend="up"
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
            sparklineData={[88, 89, 90, 91, 91, 92, 92]}
          />
          <PremiumMetricCard
            title="Avg Duration"
            value="128m"
            change={3.8}
            trend="down"
            icon={Clock}
            gradient="from-orange-500 to-red-500"
            sparklineData={[145, 140, 138, 135, 132, 130, 128]}
          />
        </div>

        {/* Radial and Donut Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          {/* Theatre Utilization - Radial Chart */}
          <div className="bg-white rounded-md md:rounded-2xl p-3 md:p-8 border border-gray-200 md:border-gray-100 md:shadow-lg md:hover:shadow-2xl transition-all duration-500">
            <h2 className="text-sm md:text-lg font-semibold md:font-black text-gray-900 mb-3 md:mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-gray-600 md:text-blue-600" />
              Theatre Utilization
            </h2>
            <div className="hidden md:flex justify-center mb-3 md:mb-6">
              <PremiumRadialChart data={radialData} size={180} />
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {radialData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2 md:p-3 bg-gray-50 md:bg-gradient-to-br md:from-gray-50 md:to-white rounded-md md:rounded-xl border border-gray-200 md:border-gray-100 md:hover:shadow-md transition-all md:hover:scale-105 md:cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full md:shadow-lg"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 text-[11px] md:text-xs font-medium md:font-semibold">{item.label}</span>
                  </div>
                  <span className="font-bold md:font-black text-gray-900 text-xs md:text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Distribution - Donut Chart */}
          <div className="bg-white rounded-md md:rounded-2xl p-3 md:p-8 border border-gray-200 md:border-gray-100 md:shadow-lg md:hover:shadow-2xl transition-all duration-500">
            <h2 className="text-sm md:text-lg font-semibold md:font-black text-gray-900 mb-3 md:mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-gray-600 md:text-purple-600" />
              Cases by Specialty
            </h2>
            <div className="flex justify-center">
              <PremiumDonutChart data={specialtyDistribution} size={180} />
            </div>
          </div>
        </div>

        {/* Individual Theatre Performance */}
        <div className="bg-white rounded-md md:rounded-2xl p-3 md:p-8 border border-gray-200 md:border-gray-100 md:shadow-lg">
          <h2 className="text-sm md:text-lg font-semibold md:font-black text-gray-900 mb-3 md:mb-8 flex items-center gap-2">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-600 md:text-indigo-600" />
            Theatre Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
            {theatreUtilizationData.map((theatre) => (
              <TheatrePerformanceCard key={theatre.name} theatre={theatre} />
            ))}
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Mobile: Clean cards, Desktop: Gradient cards */}
          <div className="relative group overflow-hidden rounded-md md:rounded-xl border border-gray-200 md:border-0">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="hidden md:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative p-3 md:p-6 bg-white md:bg-transparent text-gray-900 md:text-white">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="p-1.5 md:p-3 bg-green-50 md:bg-white/20 rounded-md md:rounded-xl md:backdrop-blur-sm md:shadow-lg">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-green-600 md:text-white" />
                </div>
                <h3 className="font-semibold md:font-black text-xs md:text-lg text-gray-700 md:text-white">Top Performer</h3>
              </div>
              <div className="text-xl md:text-4xl font-bold md:font-black mb-1 md:mb-2">Theatre 3</div>
              <div className="text-[11px] md:text-sm font-medium md:font-semibold text-gray-600 md:text-white/90">95% utilization • 158 cases</div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-md md:rounded-xl border border-gray-200 md:border-0">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="hidden md:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative p-3 md:p-6 bg-white md:bg-transparent text-gray-900 md:text-white">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="p-1.5 md:p-3 bg-blue-50 md:bg-white/20 rounded-md md:rounded-xl md:backdrop-blur-sm md:shadow-lg">
                  <Activity className="w-4 h-4 md:w-6 md:h-6 text-blue-600 md:text-white" />
                </div>
                <h3 className="font-semibold md:font-black text-xs md:text-lg text-gray-700 md:text-white">Peak Period</h3>
              </div>
              <div className="text-xl md:text-4xl font-bold md:font-black mb-1 md:mb-2">Wednesday</div>
              <div className="text-[11px] md:text-sm font-medium md:font-semibold text-gray-600 md:text-white/90">48 cases • 95% utilization</div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-md md:rounded-xl border border-gray-200 md:border-0">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="hidden md:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative p-3 md:p-6 bg-white md:bg-transparent text-gray-900 md:text-white">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="p-1.5 md:p-3 bg-purple-50 md:bg-white/20 rounded-md md:rounded-xl md:backdrop-blur-sm md:shadow-lg">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-purple-600 md:text-white" />
                </div>
                <h3 className="font-semibold md:font-black text-xs md:text-lg text-gray-700 md:text-white">Busiest Specialty</h3>
              </div>
              <div className="text-xl md:text-4xl font-bold md:font-black mb-1 md:mb-2">Trauma & Ortho</div>
              <div className="text-[11px] md:text-sm font-medium md:font-semibold text-gray-600 md:text-white/90">245 cases • 94% on-time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
