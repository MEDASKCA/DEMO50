'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Mic } from 'lucide-react';
import Image from 'next/image';

export default function CinematicHome() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const hasSpokenSection = useRef<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // TOM's narration script for each section
  const narrationScript = {
    0: "Every day, the NHS faces a crisis. Ten point four billion pounds spent on temporary staffing. Forty three thousand nursing vacancies. Seven point six one million patients waiting. This cannot continue.",
    1: "But what if... there was a better way?",
    2: "I am TOM. Theatre Operations Manager. Built to transform how the NHS runs its theatres. Not to replace your systems, but to make them work together, intelligently.",
    3: "The problem is clear. Fragmented systems waste precious time. Hidden inefficiencies cost millions. Staff react to crises instead of preventing them. Every decision requires manual coordination across multiple databases.",
    4: "Here's how I work. I connect seamlessly with your existing systems. I understand context before you ask. I predict problems twenty four to forty eight hours ahead. I speak your language, literally. And I learn continuously, adapting to your trust's unique needs.",
    5: "The impact is real. Two to three hours saved daily per staff member. Thirty to forty percent reduction in emergency staffing costs. Fifteen to twenty percent increase in theatre utilization. This isn't just efficiency. This is transformation.",
    6: "The future of NHS theatre operations starts now. Are you ready?"
  };

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak when entering a new section
  useEffect(() => {
    if (!voiceEnabled || !hasStarted || !speechSynthRef.current) return;

    // Only speak if we haven't spoken this section yet
    if (!hasSpokenSection.current.has(currentSection)) {
      hasSpokenSection.current.add(currentSection);
      speakText(narrationScript[currentSection as keyof typeof narrationScript]);
    }
  }, [currentSection, voiceEnabled, hasStarted]);

  const speakText = (text: string) => {
    if (!speechSynthRef.current) return;

    // Cancel any ongoing speech
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings for a more cinematic feel
    utterance.rate = 0.85; // Slightly slower for dramatic effect
    utterance.pitch = 0.95; // Slightly lower pitch
    utterance.volume = 1.0;

    // Try to use a British English voice if available
    const voices = speechSynthRef.current.getVoices();
    const britishVoice = voices.find(voice =>
      voice.lang.includes('en-GB') || voice.name.includes('British') || voice.name.includes('Daniel')
    );
    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current.speak(utterance);
  };

  // Calculate which section we're in based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.15) setCurrentSection(0);
      else if (latest < 0.25) setCurrentSection(1);
      else if (latest < 0.40) setCurrentSection(2);
      else if (latest < 0.55) setCurrentSection(3);
      else if (latest < 0.70) setCurrentSection(4);
      else if (latest < 0.85) setCurrentSection(5);
      else setCurrentSection(6);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Audio setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/ambient-cinematic.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setSoundEnabled(!soundEnabled);
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current && soundEnabled) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  // Transform values for parallax effects
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.40], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.25, 0.40, 0.55], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.40, 0.55, 0.70], [0, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.55, 0.70, 0.85], [0, 1, 0]);
  const opacity6 = useTransform(scrollYProgress, [0.70, 0.85, 1.0], [0, 1, 0]);
  const opacity7 = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

  const scale = useTransform(scrollYProgress, [0.15, 0.25], [0.8, 1]);
  const logoScale = useTransform(scrollYProgress, [0.25, 0.40], [1, 1.2]);

  const crisisStats = [
    { value: "£10.4bn", label: "spent on temporary staffing annually", delay: 0 },
    { value: "43,000", label: "nursing vacancies while 46% plan to leave", delay: 0.5 },
    { value: "7.61M", label: "patients waiting for procedures", delay: 1 },
    { value: "£5bn", label: "in potential efficiency savings identified", delay: 1.5 },
    { value: "30%", label: "of staff experiencing burnout", delay: 2 }
  ];

  const whyContent = [
    {
      title: "Fragmented Systems",
      description: "Theatre coordinators navigate 5+ disconnected systems daily, wasting hours that should be spent on patient care."
    },
    {
      title: "Invisible Inefficiencies",
      description: "Trusts pay 22 different prices for identical surgical tools. Opportunities for improvement remain hidden in data silos."
    },
    {
      title: "Reactive Management",
      description: "Problems become crises before they're noticed. Staff shortages and scheduling conflicts emerge too late to prevent cancellations."
    },
    {
      title: "Manual Coordination",
      description: "Every handover, every change, every decision requires manual cross-referencing across multiple databases."
    }
  ];

  const howFeatures = [
    {
      title: "Intelligent Integration",
      description: "TOM connects seamlessly with your existing PAS, theatre management, rostering, and inventory systems - creating a unified intelligence layer.",
      icon: "🔗"
    },
    {
      title: "Context-Aware Intelligence",
      description: "Knows exactly where you are and what you need before you ask. Presents the right information at the right time, automatically.",
      icon: "🧠"
    },
    {
      title: "Predictive Analytics",
      description: "Continuously analyzes data to identify trends, predict bottlenecks, and generate actionable insights aligned with NHS targets.",
      icon: "📊"
    },
    {
      title: "Proactive Monitoring",
      description: "Spots potential issues 24-48 hours ahead. Prevents cancellations by catching conflicts before they impact patients.",
      icon: "⚡"
    },
    {
      title: "Natural Language",
      description: "Just ask in plain English, by voice or text. No commands to memorize, no complex interfaces to learn.",
      icon: "💬"
    },
    {
      title: "Continuous Learning",
      description: "Adapts to your trust's unique language, workflows, and priorities. Gets better with every interaction.",
      icon: "🎓"
    }
  ];

  const impactMetrics = [
    { value: "2-3 hours", label: "saved daily per staff member", icon: "⏱️" },
    { value: "30-40%", label: "reduction in emergency staffing costs", icon: "💰" },
    { value: "15-20%", label: "increase in theatre utilization", icon: "📈" },
    { value: "94%", label: "demand forecast accuracy", icon: "🎯" }
  ];

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="https://github.com/MEDASKCA/OPS/raw/refs/heads/main/logo-medaskca.png"
              alt="MEDASKCA"
              width={200}
              height={200}
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to the Future
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Experience TOM like never before
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-4"
          >
            <div className="flex gap-4 justify-center">
              <button
                onClick={toggleSound}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <span>{soundEnabled ? 'Music On' : 'Music Off'}</span>
              </button>

              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <Mic className="w-5 h-5" />
                <span>{voiceEnabled ? 'TOM Voice On' : 'TOM Voice Off'}</span>
              </button>
            </div>

            <motion.button
              onClick={startExperience}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block mx-auto px-12 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-teal-500/50 transition-all"
            >
              Begin Experience
            </motion.button>

            <p className="text-center text-gray-500 text-sm mt-4">
              {voiceEnabled ? '🎙️ TOM will narrate your journey' : '📖 Silent reading mode'}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Controls */}
      <div className="fixed top-8 right-8 z-50 flex gap-3">
        <motion.button
          onClick={toggleSound}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Toggle background music"
        >
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </motion.button>

        <motion.button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-3 rounded-full backdrop-blur-xl transition-all ${
            voiceEnabled ? 'bg-teal-500/30 hover:bg-teal-500/40' : 'bg-white/10 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Toggle TOM's voice narration"
        >
          <Mic className={`w-6 h-6 ${voiceEnabled ? 'text-teal-300' : ''}`} />
        </motion.button>
      </div>

      {/* Speaking Indicator */}
      <AnimatePresence>
        {isSpeaking && voiceEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-teal-500/20 backdrop-blur-xl border border-teal-500/30 flex items-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 bg-teal-500 rounded-full"
            />
            <span className="text-teal-300 font-medium">TOM is speaking...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 space-y-3">
        {[0, 1, 2, 3, 4, 5, 6].map((section) => (
          <div
            key={section}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentSection === section ? 'bg-teal-500 scale-150' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Section 1: THE CRISIS */}
      <motion.section
        style={{ opacity: opacity1 }}
        className="h-screen flex items-center justify-center sticky top-0"
      >
        <div className="text-center space-y-12 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-2xl md:text-4xl font-light text-gray-400 mb-16"
          >
            The NHS Theatre Crisis
          </motion.h2>

          <div className="space-y-8">
            {crisisStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 1 }}
                className="space-y-2"
              >
                <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg md:text-xl text-gray-400 font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 2 }}
            className="pt-16"
          >
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-teal-500" />
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: THE QUESTION */}
      <motion.section
        style={{ opacity: opacity2, scale }}
        className="h-screen flex items-center justify-center sticky top-0"
      >
        <div className="text-center space-y-8 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentSection >= 1 ? 1 : 0, y: currentSection >= 1 ? 0 : 20 }}
            transition={{ duration: 1.5 }}
            className="text-4xl md:text-6xl font-light"
          >
            What if there was
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentSection >= 1 ? 1 : 0, y: currentSection >= 1 ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"
          >
            a better way?
          </motion.h2>
        </div>
      </motion.section>

      {/* Section 3: THE AWAKENING */}
      <motion.section
        style={{ opacity: opacity3 }}
        className="h-screen flex items-center justify-center sticky top-0"
      >
        <div className="text-center space-y-12 px-4">
          <motion.div
            style={{ scale: logoScale }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: isSpeaking ? [
                  '0 0 30px 15px rgba(20, 184, 166, 0.6)',
                  '0 0 80px 40px rgba(20, 184, 166, 0.8)',
                  '0 0 30px 15px rgba(20, 184, 166, 0.6)'
                ] : [
                  '0 0 0 0 rgba(20, 184, 166, 0)',
                  '0 0 60px 30px rgba(20, 184, 166, 0.4)',
                  '0 0 0 0 rgba(20, 184, 166, 0)'
                ]
              }}
              transition={{ duration: isSpeaking ? 0.8 : 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <motion.div
              animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Image
                src="https://github.com/MEDASKCA/OPS/raw/refs/heads/main/logo-medaskca.png"
                alt="MEDASKCA"
                width={300}
                height={300}
                className="mx-auto relative z-10"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentSection >= 2 ? 1 : 0, y: currentSection >= 2 ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-light text-gray-400">
              Meet
            </h2>
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              TOM
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light">
              Theatre Operations Manager
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              by MEDASKCA™
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4: THE WHY */}
      <motion.section
        style={{ opacity: opacity4 }}
        className="min-h-screen flex items-center justify-center sticky top-0 py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection >= 3 ? 1 : 0 }}
            className="text-5xl md:text-6xl font-bold text-center mb-20"
          >
            Why <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">TOM</span> Exists
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {whyContent.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{
                  opacity: currentSection >= 3 ? 1 : 0,
                  x: currentSection >= 3 ? 0 : (index % 2 === 0 ? -50 : 50)
                }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4 text-teal-400">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 5: THE HOW */}
      <motion.section
        style={{ opacity: opacity5 }}
        className="min-h-screen flex items-center justify-center sticky top-0 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection >= 4 ? 1 : 0 }}
            className="text-5xl md:text-6xl font-bold text-center mb-20"
          >
            How <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">TOM</span> Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {howFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: currentSection >= 4 ? 1 : 0,
                  y: currentSection >= 4 ? 0 : 50
                }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-teal-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 6: THE REVOLUTION */}
      <motion.section
        style={{ opacity: opacity6 }}
        className="min-h-screen flex items-center justify-center sticky top-0 py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection >= 5 ? 1 : 0 }}
            className="text-5xl md:text-6xl font-bold text-center mb-8"
          >
            The <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">Impact</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection >= 5 ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-center text-gray-400 mb-20 max-w-3xl mx-auto"
          >
            Real results from trusts transforming their theatre operations
          </motion.p>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: currentSection >= 5 ? 1 : 0,
                  scale: currentSection >= 5 ? 1 : 0.8
                }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="text-4xl mb-3">{metric.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: currentSection >= 5 ? 1 : 0,
              y: currentSection >= 5 ? 0 : 30
            }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30"
          >
            <blockquote className="text-2xl md:text-3xl font-light text-center text-gray-300 italic">
              "TOM doesn't replace your systems. It makes them work together like they always should have."
            </blockquote>
            <p className="text-center text-teal-400 mt-4 font-semibold">
              — The MEDASKCA Vision
            </p>
          </motion.div>

          {/* NHS Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: currentSection >= 5 ? 1 : 0,
              y: currentSection >= 5 ? 0 : 30
            }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16 grid md:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30">
              <h4 className="text-xl font-semibold text-green-400 mb-3">💷 Financial Benefits</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Address £10.4bn temporary staffing crisis</li>
                <li>• Capture Lord Carter's £5bn efficiency savings</li>
                <li>• Reduce agency spend by 30-40%</li>
                <li>• Standardize procurement across trusts</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
              <h4 className="text-xl font-semibold text-blue-400 mb-3">🏥 Patient Care Benefits</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Reduce 7.61M patient waiting list</li>
                <li>• Prevent cancellations with 24-48hr conflict detection</li>
                <li>• Increase theatre utilization by 15-20%</li>
                <li>• Improve surgical outcomes through better coordination</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-purple-400 mb-3">👥 Workforce Benefits</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Combat 30% staff burnout rates</li>
                <li>• Save 2-3 hours daily per staff member</li>
                <li>• Address 43,000 nursing vacancy challenge</li>
                <li>• Improve retention with better work conditions</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-400 mb-3">🚀 Strategic Benefits</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Align with NHS Long Term Plan digital transformation</li>
                <li>• Meet CQC and GIRFT standards automatically</li>
                <li>• Support ICS integration and shared care records</li>
                <li>• Future-proof operations for next generation NHS</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 7: THE INVITATION */}
      <motion.section
        style={{ opacity: opacity7 }}
        className="min-h-screen flex items-center justify-center sticky top-0"
      >
        <div className="text-center space-y-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: currentSection >= 6 ? 1 : 0,
              scale: currentSection >= 6 ? 1 : 0.9
            }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Your Theatre Operations?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
              The future of NHS theatre operations starts now. Join forward-thinking trusts already transforming their services with TOM.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSection >= 6 ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
                    Today
                  </div>
                  <p className="text-sm text-gray-500">Fragmented systems, reactive management</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-teal-500 to-blue-500" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    Tomorrow
                  </div>
                  <p className="text-sm text-gray-400">Unified intelligence, proactive care</p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'https://theatre-operations-manager-j7w39axny-alex-monterubios-projects.vercel.app/admin?view=chat'}
                className="px-12 py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-teal-500/50 transition-all"
              >
                Enter TOM Dashboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'https://theatre-operations-manager-j7w39axny-alex-monterubios-projects.vercel.app/admin?view=chat&voiceMode=true'}
                className="px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white rounded-full font-semibold text-xl transition-all"
              >
                Experience Voice Mode
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection >= 6 ? 0.5 : 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-16 text-sm text-gray-600"
          >
            Designed and built by MEDASKCA™ for the NHS
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer to enable scroll */}
      <div className="h-[600vh]" />
    </div>
  );
}
