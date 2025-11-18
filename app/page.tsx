'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import {
  Brain, Sparkles, Zap, TrendingUp, Activity, Shield,
  BarChart3, Users, Calendar, Clock, ChevronRight, Star,
  Mic, MessageSquare, Search, Target, Lightbulb, Rocket,
  X, Play, BookOpen, Video, ExternalLink, Database, Network,
  LineChart, AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

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
      delay: 0.1,
      detailedContent: {
        title: "Context-Aware Intelligence",
        problem: "NHS staff waste precious time navigating between disconnected systems, searching for information that should be at their fingertips. Every minute spent clicking through siloed databases is a minute lost from patient care.",
        solution: "TOM integrates seamlessly with your existing NHS systems - PAS, theatre management, rostering, and more - creating a unified intelligence layer. It understands your role, location, and current task, presenting exactly what you need, when you need it.",
        example: "A theatre coordinator opens TOM at 7am. Instead of logging into five different systems, TOM immediately shows: today's full schedule pulled from your theatre system, staff availability from your roster, equipment status from inventory, and flags a potential conflict - all in one view.",
        benefits: [
          "Save 2-3 hours daily per staff member on system navigation",
          "Reduce errors from manually cross-referencing multiple systems",
          "Instant access to critical information during emergencies",
          "Works with your existing infrastructure - no rip and replace"
        ]
      }
    },
    {
      icon: LineChart,
      title: "Advanced Predictive Analytics",
      description: "Powerful data analysis with visualizations, forecasting, and actionable insights",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2,
      detailedContent: {
        title: "Advanced Predictive Analytics",
        problem: "Theatre departments sit on mountains of data but lack the tools to extract meaningful insights. Utilization reports are weeks old, patterns go unnoticed, and opportunities for improvement are invisible until it's too late.",
        solution: "TOM continuously analyzes data from all connected systems, identifying trends, predicting bottlenecks, and generating actionable insights. It transforms raw data into clear visualizations and recommendations aligned with NHS efficiency targets.",
        example: "TOM analyzes 6 months of theatre data and alerts you: 'Theatre 3 shows a 22-minute average delay on Wednesdays between 2-4pm. Pattern matches anaesthesia handover timing. Suggested solution: adjust handover schedule. Potential savings: 88 hours annually, £15,000 in efficiency gains.'",
        benefits: [
          "Identify hidden inefficiencies costing thousands annually",
          "Forecast demand 2-3 months ahead with 94% accuracy",
          "Align operations with NHS Long Term Plan targets",
          "Evidence-based decision making for executive reviews"
        ]
      }
    },
    {
      icon: Lightbulb,
      title: "Proactive Intelligence",
      description: "TOM identifies conflicts, risks, and opportunities automatically",
      gradient: "from-orange-500 to-red-500",
      delay: 0.3,
      detailedContent: {
        title: "Proactive Intelligence",
        problem: "Problems in theatre operations often go unnoticed until they cause delays, cancellations, or patient harm. Staff shortages, equipment conflicts, and scheduling errors emerge as crises rather than preventable issues.",
        solution: "TOM constantly monitors your operations across all connected systems, using AI to spot potential issues before they impact patients. It alerts the right people at the right time with suggested solutions, turning reactive firefighting into proactive management.",
        example: "Monday 6am: TOM detects that Theatre Nurse Sarah called in sick, creating a staffing gap for a complex cardiac case at 9am. It cross-references skills databases, identifies three qualified replacements, checks their rosters, and sends notifications - all before the coordinator arrives.",
        benefits: [
          "Prevent cancellations by catching conflicts 24-48 hours ahead",
          "Reduce emergency staffing costs by 30-40%",
          "Ensure compliance with skill-mix requirements automatically",
          "Free managers from constant monitoring to focus on improvement"
        ]
      }
    },
    {
      icon: Zap,
      title: "Natural Language Commands",
      description: "Voice shortcuts: 'Show tomorrow's sessions', 'Check staff availability'",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.4,
      detailedContent: {
        title: "Natural Language Commands",
        problem: "Clinical staff shouldn't need IT training to access vital information. Complex interfaces and multiple login screens create barriers, especially during time-critical situations when every second matters.",
        solution: "TOM understands natural language - just ask in plain English, by voice or text. No commands to memorize, no forms to fill. Whether you're sterile in theatre or rushing between departments, TOM responds instantly to conversational requests.",
        example: "A surgeon asks: 'TOM, can we fit an emergency appendectomy this afternoon?' TOM checks: available theatre slots, required staff and their current schedules, equipment availability, and post-op bed capacity - responding in 3 seconds: 'Yes, Theatre 2 available 3-5pm. Staff confirmed. HDU bed reserved.'",
        benefits: [
          "Zero learning curve - if you can speak, you can use TOM",
          "Hands-free operation during sterile procedures",
          "Instant answers vs. 10+ minutes of system navigation",
          "Works via mobile, desktop, or voice-only devices"
        ]
      }
    },
    {
      icon: Database,
      title: "Intelligent Data Integration",
      description: "Retrieval-Augmented Generation ensures accurate, data-backed responses from your systems",
      gradient: "from-green-500 to-teal-500",
      delay: 0.5,
      detailedContent: {
        title: "Intelligent Data Integration",
        problem: "NHS trusts operate data silos - patient administration, theatre management, rostering, inventory, and finance rarely communicate. Staff manually reconcile information, leading to errors, delays, and duplicated effort costing millions annually.",
        solution: "TOM uses Retrieval-Augmented Generation (RAG) to securely connect all your systems while respecting access controls and data governance. It retrieves real-time information from multiple sources and synthesizes it into coherent, accurate answers - never inventing data, always showing sources.",
        example: "Finance asks TOM: 'What's driving our agency staff spend in theatres?' TOM queries rostering (vacancy patterns), theatre system (case volumes), HR (recruitment pipeline), and finance (cost breakdown), then presents: 'Primary driver: 12 unfilled Band 6 posts. Cases up 18% vs. plan. 3 recruits start next month. Suggested interim: internal bank incentives could save £45k vs. agency.'",
        benefits: [
          "Break down data silos without expensive system replacements",
          "Single source of truth across all departments",
          "Audit trail showing exactly where information came from",
          "Meets NHS data security and governance standards"
        ]
      }
    },
    {
      icon: Network,
      title: "Continuous Learning & Adaptation",
      description: "TOM learns from every interaction to serve your trust better",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.6,
      detailedContent: {
        title: "Continuous Learning & Adaptation",
        problem: "Every NHS trust is unique - different systems, workflows, terminology, and priorities. Generic software forces trusts to adapt to rigid tools rather than tools adapting to them, creating friction and resistance to adoption.",
        solution: "TOM learns your trust's specific language, workflows, and priorities. It adapts to how your teams work, learns from their feedback, and continuously improves its recommendations based on what works in your environment. The more you use it, the better it gets.",
        example: "Initially, TOM uses standard NHS terminology. After 2 weeks, it learns that your trust calls the main theatre 'Hub' not 'Theatre 1', that 'quick turnaround' means under 20 minutes (not 15), and that Dr. Patel always needs specific equipment ready. It automatically adapts all future interactions to match your trust's unique language and needs.",
        benefits: [
          "Feels native to your trust, not generic software",
          "Reduces training time as TOM learns your terminology",
          "Recommendations improve weekly based on outcomes",
          "Respects department-specific workflows and preferences"
        ]
      }
    }
  ];

  const capabilities = [
    {
      text: "Analyze theatre utilization patterns and identify improvement opportunities",
      detail: "TOM examines historical data to reveal trends in theatre usage, pinpointing underutilized slots and peak demand periods. It calculates your current utilization rate against NHS targets and suggests specific scheduling changes to increase efficiency by 15-20%, potentially recovering hundreds of unused theatre hours annually."
    },
    {
      text: "Predict scheduling conflicts before they cause cancellations",
      detail: "By analyzing patterns in staff rosters, equipment availability, and case complexity, TOM forecasts potential conflicts 24-48 hours in advance. This early warning system helps prevent last-minute cancellations that cost £1,200+ per case and damage patient trust, while supporting NHS efforts to reduce the 7.6 million patient backlog."
    },
    {
      text: "Optimize staff allocations across skill mix and demand",
      detail: "TOM balances staff schedules against case complexity, regulatory requirements, and demand forecasts. It ensures you meet safer staffing guidelines while minimizing expensive agency use - helping address the NHS's £10.4bn annual temporary staffing spend while maintaining quality care standards."
    },
    {
      text: "Generate detailed reports for boards and regulators",
      detail: "Instantly create comprehensive reports aligned with NHS reporting requirements - Model Hospital metrics, Getting It Right First Time (GIRFT) standards, and Care Quality Commission (CQC) evidence. Reports include benchmarking against peers, trend analysis, and improvement recommendations, saving 10+ hours of manual data compilation monthly."
    },
    {
      text: "Identify operational bottlenecks and suggest evidence-based solutions",
      detail: "TOM maps your entire theatre pathway from booking to discharge, identifying where delays accumulate. It compares your performance against best-practice trusts and national standards, then suggests specific, costed interventions proven to work in similar environments - aligned with Lord Carter's £5bn efficiency opportunity."
    },
    {
      text: "Support digital transformation and system integration goals",
      detail: "Rather than replacing your existing investments, TOM creates an intelligent layer connecting EPR, theatre systems, rostering, and more. This supports NHS Digital Long Term Plan goals for interoperability and shared records, helping trusts maximize ROI from existing systems while preparing for future digital maturity requirements."
    }
  ];

  const handleNavigateToApp = (voiceMode: boolean = false) => {
    // Navigate to theatre-operations-manager
    if (voiceMode) {
      window.location.href = 'https://theatre-operations-manager-j7w39axny-alex-monterubios-projects.vercel.app/admin?view=chat&voiceMode=true';
    } else {
      window.location.href = 'https://theatre-operations-manager-j7w39axny-alex-monterubios-projects.vercel.app/admin?view=chat';
    }
  };

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
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent Integration for Your Existing NHS Systems
              </span>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6"
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
              className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-4 max-w-4xl mx-auto font-normal"
            >
              Your <span className="font-semibold text-blue-600 dark:text-blue-400">Intelligent Theatre Operations Manager</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light"
            >
              AI-powered intelligence that connects and amplifies your existing NHS systems
              <span className="block mt-2 font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Making your current infrastructure work smarter, not harder
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
                onClick={() => handleNavigateToApp(false)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: '100%' }}
                  animate={{ x: isHoveringCTA ? '0%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Launch TOM Dashboard
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigateToApp(true)}
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-2xl font-semibold text-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Experience Voice Mode
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "99.9%", label: "System Uptime", icon: Target },
            { value: "<100ms", label: "Response Time", icon: Zap },
            { value: "24/7", label: "Availability", icon: Clock },
            { value: "∞", label: "Continuous Learning", icon: TrendingUp }
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
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-normal mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid - Changed heading */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Supercharging Your Existing Systems
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
            TOM doesn't replace your infrastructure - it connects, learns from, and amplifies everything you already have. Think of it as adding a highly intelligent nervous system to your current setup.
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
              onClick={() => setSelectedFeature(index)}
              className="group relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="relative text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-4">
                {feature.description}
              </p>

              <div className="relative flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

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

      {/* Video/Tutorial Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See TOM in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Watch how TOM transforms theatre operations in real NHS environments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Introduction to TOM",
              duration: "3:45",
              description: "Overview of TOM's capabilities and how it integrates with your systems",
              icon: Play
            },
            {
              title: "Voice Mode Tutorial",
              duration: "5:20",
              description: "Learn how to use TOM's natural language interface for hands-free operation",
              icon: Mic
            },
            {
              title: "Analytics Deep Dive",
              duration: "8:15",
              description: "Exploring TOM's predictive analytics and reporting features",
              icon: BarChart3
            }
          ].map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                >
                  <video.icon className="w-8 h-8 text-blue-600 ml-1" />
                </motion.div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  {video.description}
                </p>
              </div>
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
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Can TOM Do for Your Trust?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-light">
              TOM addresses the real challenges facing NHS theatre departments today - from the £10.4bn temporary staffing crisis to the 7.6 million patient backlog
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
                  className="group relative"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 cursor-pointer">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mt-0.5">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {capability.text}
                      </span>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileHover={{ height: 'auto', opacity: 1 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                          {capability.detail}
                        </p>
                      </motion.div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                  </div>
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
                <h3 className="text-2xl font-semibold mb-4">Try asking TOM:</h3>
                <div className="space-y-3">
                  {[
                    "Show me tomorrow's theatre sessions",
                    "Which surgeons are available next week?",
                    "Analyze utilization for Q1 2025",
                    "What conflicts exist in the schedule?",
                    "Generate a capacity report for the board"
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
                        <span className="font-normal">{query}</span>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Theatre Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8 font-light">
              Join NHS trusts already using TOM to improve efficiency, reduce costs, and enhance patient care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavigateToApp(false)}
                className="px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 rounded-2xl font-semibold text-xl shadow-2xl inline-flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border-2 border-white/30 rounded-2xl font-semibold text-xl shadow-2xl inline-flex items-center justify-center gap-3"
              >
                <BookOpen className="w-6 h-6" />
                Read Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${features[selectedFeature].gradient} flex items-center justify-center`}>
                  {React.createElement(features[selectedFeature].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {features[selectedFeature].detailedContent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">The Challenge</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {features[selectedFeature].detailedContent.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">How TOM Solves It</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {features[selectedFeature].detailedContent.solution}
                </p>
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Play className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Real-World Example</h4>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-light italic">
                    {features[selectedFeature].detailedContent.example}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Benefits</h4>
                </div>
                <ul className="space-y-2">
                  {features[selectedFeature].detailedContent.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedFeature(null);
                    handleNavigateToApp(false);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                >
                  <span>Experience This Feature</span>
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
