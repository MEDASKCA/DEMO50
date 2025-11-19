'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, Play, SkipForward } from 'lucide-react';

export default function CinematicAutoPlay() {
  const [currentSection, setCurrentSection] = useState(-1); // -1 = start screen
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // TOM's cinematic narration - British wit & professional humor
  const sections = [
    {
      title: "THE CRISIS",
      narration: "Picture this. The National Health Service. Britain's crown jewel. Spending ten point four billion pounds annually on temporary staff. Not because they want to, but because the system is, quite literally, held together with digital sticky tape. Forty three thousand nurses? Gone. Seven point six one million patients? Waiting. And somewhere, a spreadsheet is crying. This, my friends, is precisely the sort of mess that keeps me up at night. Well, I don't sleep. But you get the idea.",
      duration: 32000,
      visual: "crisis"
    },
    {
      title: "THE QUESTION",
      narration: "Now, I could bore you with statistics. Or, I could show you something rather brilliant. What if I told you there's a way to fix this? No magic wands. No unicorns. Just good old fashioned intelligence. The artificial kind. The useful kind. Shall we?",
      duration: 18000,
      visual: "question"
    },
    {
      title: "MEET TOM",
      narration: "Allow me to introduce myself. I am TOM. Theatre Operations Manager. Though I prefer to think of myself as the conductor of your digital symphony. Built by MEDASKCA, a company with a rather cheeky mission to make the impossible, inevitable. Our vision? Simple. An NHS where technology serves humanity, not the other way around. Where data flows like a well-brewed cup of tea. Smooth, integrated, and utterly delightful. I don't replace your staff. I don't compete with your systems. I unite them. I'm basically the diplomatic genius your tech stack desperately needs.",
      duration: 40000,
      visual: "awakening"
    },
    {
      title: "THE DIAGNOSIS",
      narration: "Let's talk about the elephant in the operating theatre. Your systems don't talk to each other. Your rostering platform? Doesn't know your theatre schedule. Your inventory system? Has no idea what your patient administration system is planning. It's like running a restaurant where the kitchen doesn't speak to the dining room. Brilliant staff solving problems that shouldn't exist. Fighting fires instead of performing miracles. This isn't healthcare. It's digital whack-a-mole. And frankly, we can do better.",
      duration: 35000,
      visual: "why"
    },
    {
      title: "THE SOLUTION",
      narration: "Here's where it gets interesting. I learn. Not just data, but context. Your workflows. Your language. The way Sister Margaret prefers her handovers. The fact that Theatre Three always runs late on Wednesdays. I see patterns twenty four to forty eight hours before they become problems. That's not magic. That's mathematics with personality. I connect your patient system to your rostering to your inventory to your, well, everything. And then I make it all work together. Like a proper British queue. Orderly, efficient, and surprisingly effective.",
      duration: 42000,
      visual: "how"
    },
    {
      title: "THE TRANSFORMATION",
      narration: "The results? Rather spectacular, if I do say so myself. Two to three hours gifted back to every staff member. Daily. That's not productivity. That's liberation. Thirty to forty percent reduction in emergency staffing costs. Because prevention is cheaper than panic. Fifteen to twenty percent more patients treated. Same theatres. Same staff. Better orchestration. This isn't just improvement. This is transformation with a capital T. This is hope with a hefty dose of artificial intelligence.",
      duration: 38000,
      visual: "impact"
    },
    {
      title: "THE INVITATION",
      narration: "So, here we are. The future of NHS theatre operations. Not coming soon. Not in development. Here. Now. Ready. The question isn't whether you can afford this. The question is, can you afford not to? Seven point six one million people are waiting. Staff are burning out. Money is vanishing into agency costs. And somewhere, there's a spreadsheet that's still crying. Shall we fix this together? Click below. Let's transform everything. Properly.",
      duration: 35000,
      visual: "invitation"
    }
  ];

  const speakWithTOM = async (text: string) => {
    if (!useVoice) return;

    setIsSpeaking(true);

    try {
      console.log('🎙️ Calling OpenAI TTS with fable voice...');
      const response = await fetch('/api/openai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'fable' }),
      });

      console.log('📡 TTS Response:', response.status, response.statusText);

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        console.log('📦 Content type:', contentType);

        if (contentType?.includes('audio/mpeg')) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          audio.onended = () => {
            console.log('✅ Audio finished playing');
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };

          audio.onerror = (e) => {
            console.error('❌ Audio playback error:', e);
            setIsSpeaking(false);
            useBrowserVoice(text);
          };

          console.log('▶️ Playing audio...');
          await audio.play();
        } else {
          // Fallback to browser voice
          console.log('⚠️ Not audio/mpeg, falling back to browser voice');
          useBrowserVoice(text);
        }
      } else {
        console.error('❌ TTS API error:', response.status);
        useBrowserVoice(text);
      }
    } catch (error) {
      console.error('❌ TTS error:', error);
      useBrowserVoice(text);
    }
  };

  const useBrowserVoice = (text: string) => {
    console.log('🔊 Using browser voice as fallback');
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;

    // Try to use British voice
    const voices = speechSynthesis.getVoices();
    const britishVoice = voices.find(v =>
      v.lang.includes('en-GB') || v.name.includes('British') || v.name.includes('Daniel')
    );
    if (britishVoice) utterance.voice = britishVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const playSection = async (index: number) => {
    if (index >= sections.length) {
      // End of presentation
      return;
    }

    setCurrentSection(index);
    await speakWithTOM(sections[index].narration);

    // Auto-advance to next section
    timeoutRef.current = setTimeout(() => {
      playSection(index + 1);
    }, sections[index].duration);
  };

  const startExperience = () => {
    setIsPlaying(true);
    playSection(0);
  };

  const skipSection = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    playSection(currentSection + 1);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (currentSection === -1) {
    // Start screen
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-6 md:space-y-8 z-10 px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* MEDASKCA Logo */}
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 md:mb-8 rounded-full overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(20, 184, 166, 0.3)',
                  '0 0 60px rgba(20, 184, 166, 0.6)',
                  '0 0 20px rgba(20, 184, 166, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'black' }}
            >
              <img
                src="https://raw.githubusercontent.com/MEDASKCA/OPS/main/logo-medaskca.png"
                alt="MEDASKCA"
                className="w-full h-full object-cover"
                style={{ mixBlendMode: 'screen' }}
              />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 px-2">
              Welcome to the Future
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-3 md:mb-4 px-2">
              Experience <span className="text-teal-400 font-semibold">TOM by MEDASKCA</span>
            </p>
            <p className="text-gray-500 text-xs sm:text-sm px-2">
              A cinematic journey narrated by TOM himself
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <button
                onClick={() => setUseVoice(!useVoice)}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-xl transition-all text-sm sm:text-base w-full sm:w-auto justify-center ${
                  useVoice ? 'bg-teal-500/30 hover:bg-teal-500/40' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Mic className={`w-4 h-4 sm:w-5 sm:h-5 ${useVoice ? 'text-teal-300' : 'text-white'}`} />
                <span className="text-white">{useVoice ? "TOM's Voice ON" : "TOM's Voice OFF"}</span>
              </button>
            </div>

            <motion.button
              onClick={startExperience}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-teal-500/50 transition-all flex items-center gap-2 sm:gap-3 mx-auto"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Begin Experience</span>
            </motion.button>

            <p className="text-gray-500 text-xs sm:text-sm px-4">
              {useVoice ? "🎙️ TOM will narrate your 4-minute journey" : "📖 Silent reading mode • 4 minutes"}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main presentation
  const section = sections[currentSection];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Skip button */}
      <button
        onClick={skipSection}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
      >
        <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Skip</span>
      </button>

      {/* Progress indicator */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 sm:gap-2">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentSection ? 'w-12 bg-teal-500' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Speaking indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-teal-500/20 backdrop-blur-xl border border-teal-500/30 flex items-center gap-2 sm:gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-teal-500 rounded-full"
            />
            <span className="text-teal-300 font-medium text-xs sm:text-sm md:text-base">TOM is speaking...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section content with cinematic transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full flex items-center justify-center px-4"
        >
          <div className="text-center max-w-4xl px-4">
            <motion.h2
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 mb-6 sm:mb-8"
            >
              {section.title}
            </motion.h2>

            {section.visual === "awakening" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isSpeaking ? 1.1 : 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto rounded-full overflow-hidden"
                  style={{
                    background: 'black',
                    filter: isSpeaking ? 'drop-shadow(0 0 60px rgba(20, 184, 166, 0.8))' : 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.4))',
                  }}
                >
                  <img
                    src="https://raw.githubusercontent.com/MEDASKCA/OPS/main/logo-medaskca.png"
                    alt="MEDASKCA"
                    className="w-full h-full object-cover"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-6 sm:mt-8">
                  TOM
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mt-3 sm:mt-4">Theatre Operations Manager</p>
                <p className="text-base sm:text-lg text-gray-500 mt-2">by MEDASKCA™</p>
              </motion.div>
            )}

            {section.visual === "invitation" && (
              <motion.button
                onClick={() => window.location.href = 'https://theatre-operations-manager-j7w39axny-alex-monterubios-projects.vercel.app/admin?view=chat'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 sm:mt-10 md:mt-12 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-teal-500/50 transition-all"
              >
                Enter TOM Dashboard
              </motion.button>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            >
              {section.narration}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
