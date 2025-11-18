'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import {
  Brain, Sparkles, Zap, TrendingUp, Activity, Shield,
  BarChart3, Users, Calendar, Clock, ChevronRight, Star,
  Mic, MessageSquare, Search, Target, Lightbulb, Rocket
} from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Context-Aware Intelligence",
      description: "TOM knows exactly where you are and what you need - before you even ask",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: "ATLAS-Style Analytics",
      description: "Advanced data analysis with visualizations, predictions, and insights",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: Lightbulb,
      title: "Proactive Insights",
      description: "TOM identifies issues, conflicts, and opportunities automatically",
      gradient: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: Zap,
      title: "Lightning Quick Commands",
      description: "Voice shortcuts: 'Show tomorrow's sessions', 'Check staff availability'",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.4
    },
    {
      icon: Target,
      title: "RAG-Powered Precision",
      description: "Retrieval-Augmented Generation ensures accurate, data-backed responses",
      gradient: "from-green-500 to-teal-500",
      delay: 0.5
    },
    {
      icon: Rocket,
      title: "Continuous Learning",
      description: "TOM learns from every interaction to serve you better",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.6
    }
  ];

  const capabilities = [
    "Analyze theatre utilization patterns",
    "Predict scheduling conflicts",
    "Optimize staff allocations",
    "Generate detailed reports",
    "Identify bottlenecks",
    "Suggest improvements"
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        {/* Animated orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '50%', left: '50%' }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powered by Advanced AI & RAG Technology
              </span>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Meet
              </span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                TOM AI
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-4 max-w-4xl mx-auto font-light"
            >
              Your <span className="font-semibold text-blue-600 dark:text-blue-400">Intelligent Theatre Operations Manager</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Advanced RAG-powered AI that understands context, analyzes data, and provides proactive insights
              <span className="block mt-2 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Like ChatGPT's ATLAS, but built specifically for NHS theatre operations
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHoveringCTA(true)}
                onHoverEnd={() => setIsHoveringCTA(false)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: '100%' }}
                  animate={{ x: isHoveringCTA ? '0%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Start Talking to TOM
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Try Voice Mode
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "99.9%", label: "Accuracy", icon: Target },
            { value: "<100ms", label: "Response Time", icon: Zap },
            { value: "24/7", label: "Availability", icon: Clock },
            { value: "∞", label: "Learning", icon: TrendingUp }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            Superhuman Capabilities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            TOM combines cutting-edge AI with deep healthcare domain knowledge
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="relative text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capabilities Showcase */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              What Can TOM Do?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              TOM is your intelligent copilot for everything theatre operations
            </p>

            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {capability}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                {[
                  { left: 10, top: 20, duration: 2.5, delay: 0 },
                  { left: 25, top: 60, duration: 3.2, delay: 0.3 },
                  { left: 40, top: 15, duration: 2.8, delay: 0.6 },
                  { left: 55, top: 75, duration: 3.5, delay: 0.9 },
                  { left: 70, top: 35, duration: 2.2, delay: 1.2 },
                  { left: 85, top: 50, duration: 3.8, delay: 1.5 },
                  { left: 15, top: 80, duration: 2.7, delay: 0.2 },
                  { left: 30, top: 40, duration: 3.1, delay: 0.5 },
                  { left: 45, top: 90, duration: 2.9, delay: 0.8 },
                  { left: 60, top: 25, duration: 3.3, delay: 1.1 },
                  { left: 75, top: 65, duration: 2.4, delay: 1.4 },
                  { left: 90, top: 10, duration: 3.6, delay: 1.7 },
                  { left: 20, top: 45, duration: 2.6, delay: 0.4 },
                  { left: 35, top: 85, duration: 3.4, delay: 0.7 },
                  { left: 50, top: 30, duration: 2.3, delay: 1.0 },
                  { left: 65, top: 70, duration: 3.7, delay: 1.3 },
                  { left: 80, top: 55, duration: 2.1, delay: 1.6 },
                  { left: 5, top: 5, duration: 3.0, delay: 0.1 },
                  { left: 95, top: 95, duration: 2.8, delay: 1.8 },
                  { left: 50, top: 50, duration: 3.2, delay: 1.9 }
                ].map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                    }}
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative text-white">
                <h3 className="text-2xl font-bold mb-4">Try asking TOM:</h3>
                <div className="space-y-3">
                  {[
                    "Show me tomorrow's theatre sessions",
                    "Which surgeons are available next week?",
                    "Analyze utilization for Q1 2025",
                    "What conflicts exist in the schedule?",
                    "Generate a capacity report"
                  ].map((query, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{query}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              TOM is waiting in the left panel. Start your first conversation now!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 rounded-2xl font-bold text-xl shadow-2xl inline-flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Let's Go →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
