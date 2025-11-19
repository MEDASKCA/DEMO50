'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, Play, SkipForward, Users, Calendar, Package, GraduationCap, MessageSquare, TrendingUp, Shield, Zap, Settings, X } from 'lucide-react';

// Available OpenAI voices
const OPENAI_VOICES = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced' },
  { id: 'echo', name: 'Echo', description: 'Warm and upbeat' },
  { id: 'fable', name: 'Fable', description: 'British, expressive (Default TOM voice)' },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
  { id: 'nova', name: 'Nova', description: 'Energetic and lively' },
  { id: 'shimmer', name: 'Shimmer', description: 'Soft and clear' },
] as const;

type VoiceId = typeof OPENAI_VOICES[number]['id'];

export default function CinematicAutoPlay() {
  const [currentSection, setCurrentSection] = useState(-1); // -1 = start screen
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceId>('fable');
  const [showSettings, setShowSettings] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(0.25); // 25% volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioCacheRef = useRef<Map<number, string>>(new Map());

  // Load voice preference from localStorage
  useEffect(() => {
    const savedVoice = localStorage.getItem('tom_voice_preference');
    if (savedVoice && OPENAI_VOICES.some(v => v.id === savedVoice)) {
      setSelectedVoice(savedVoice as VoiceId);
    }
  }, []);

  // Save voice preference to localStorage
  const handleVoiceChange = (voiceId: VoiceId) => {
    setSelectedVoice(voiceId);
    localStorage.setItem('tom_voice_preference', voiceId);
    // Clear audio cache when voice changes
    audioCacheRef.current.clear();
  };

  // Keyboard shortcut to open settings (Ctrl+Shift+V)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        setShowSettings(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Initialize background music
  useEffect(() => {
    // Create background music element
    const music = new Audio('https://cdn.pixabay.com/download/audio/2022/05/13/audio_1808fbf07a.mp3'); // Cinematic ambient track
    music.loop = true;
    music.volume = 0; // Start silent for fade in
    backgroundMusicRef.current = music;

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  // Fade in background music when experience starts
  const fadeInBackgroundMusic = () => {
    if (!backgroundMusicRef.current) return;

    backgroundMusicRef.current.play().catch(console.error);

    // Gradual fade in over 2 seconds
    let volume = 0;
    const fadeInterval = setInterval(() => {
      if (!backgroundMusicRef.current) {
        clearInterval(fadeInterval);
        return;
      }
      volume += 0.05;
      if (volume >= backgroundMusicVolume) {
        backgroundMusicRef.current.volume = backgroundMusicVolume;
        clearInterval(fadeInterval);
      } else {
        backgroundMusicRef.current.volume = volume;
      }
    }, 100);
  };

  // Fade out background music
  const fadeOutBackgroundMusic = () => {
    if (!backgroundMusicRef.current) return;

    const currentVolume = backgroundMusicRef.current.volume;
    let volume = currentVolume;
    const fadeInterval = setInterval(() => {
      if (!backgroundMusicRef.current) {
        clearInterval(fadeInterval);
        return;
      }
      volume -= 0.05;
      if (volume <= 0) {
        backgroundMusicRef.current.volume = 0;
        backgroundMusicRef.current.pause();
        clearInterval(fadeInterval);
      } else {
        backgroundMusicRef.current.volume = volume;
      }
    }, 100);
  };

  // TOM's comprehensive cinematic narration - British wit & professional humor
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
      title: "THE SIX PILLARS",
      narration: "Allow me to walk you through my capabilities. Think of them as six pillars holding up your entire theatre operation. Workforce. Skills-aware rostering that actually understands competencies and leave. Services. A live digiboard showing exactly what's happening, right now. Logistics. Because missing a tray shouldn't delay a case. Education. Training records that don't vanish into filing cabinets. Communication. Announcements that reach the right people at the right time. And Improvement. Analytics that actually answer the questions your board is asking. Six pillars. One platform. Infinite patience.",
      duration: 45000,
      visual: "pillars",
      content: [
        { icon: Users, title: "Workforce", desc: "Skills-aware rostering, profiles and leave management" },
        { icon: Calendar, title: "Services", desc: "Live digiboard, procedure cards, and real-time logging" },
        { icon: Package, title: "Logistics", desc: "Requests, trackers, inventory - trays, implants, devices" },
        { icon: GraduationCap, title: "Education", desc: "Training dates, attendance, mentorship, appraisals" },
        { icon: MessageSquare, title: "Communication", desc: "Announcements and Teams integration" },
        { icon: TrendingUp, title: "Improvement", desc: "Analytics, exports, and actionable insights" }
      ]
    },
    {
      title: "THE BENEFITS",
      narration: "Now, what does this actually mean for your team? Theatre managers see delays as they happen. Not three hours later. Now. Coordinators can move resources across lists without seventeen phone calls. Theatre staff get rosters that respect their skills and banding. Schedulers can spot conflicts before they become problems. Surgeons know exactly when to head down, with mobile updates. And operations teams get analytics that don't require a PhD in Excel to interpret. Everyone wins. Except maybe that crying spreadsheet.",
      duration: 40000,
      visual: "benefits"
    },
    {
      title: "THE OUTCOMES",
      narration: "The results? Let me paint you a picture with numbers. Theatre utilisation? Up twelve to eighteen percent. That's real patients. Real procedures. Real lives improved. Turnaround variance? Down twenty five to forty percent. Consistency is king. And first-case delays? Reduced by an average of nine minutes. Nine minutes might not sound like much. Until you multiply it by every theatre, every day, every year. Then it becomes rather spectacular, doesn't it?",
      duration: 38000,
      visual: "outcomes",
      stats: [
        { value: "↑ 12–18%", label: "Theatre utilisation" },
        { value: "↓ 25–40%", label: "Turnaround variance" },
        { value: "− 9m", label: "Average first-case delay" }
      ]
    },
    {
      title: "INTEGRATIONS",
      narration: "Now, I know what you're thinking. This sounds wonderful, but what about our existing systems? Excellent question. I play nicely with others. Microsoft Teams for announcements. Check. Spreadsheet imports for lists and rosters. Check. Single sign-on with Entra ID. Check. E P R or P A S connections? On the roadmap. You can start simple and expand when you're ready. I'm patient. I'm an AI. I've got time.",
      duration: 35000,
      visual: "integrations"
    },
    {
      title: "SECURITY",
      narration: "And security? Oh, I take that very seriously. UK data residency. Encryption in transit and at rest. Access controls and audit logs. D S P T and I S O twenty seven thousand and one compliant. Because healthcare data deserves healthcare-grade protection. Your patients trust you. You can trust me. It's a proper British circle of trust.",
      duration: 32000,
      visual: "security"
    },
    {
      title: "REAL VOICES",
      narration: "But don't just take my word for it. Listen to the people actually using me. Theatre managers saying the digiboard turned delays into actions. Matrons noting that staffing finally reflects skills mix. Performance leads who no longer dread board pack season. These aren't marketing soundbites. These are real teams, seeing real change, in real time. And let me tell you, nothing makes me prouder than that.",
      duration: 38000,
      visual: "testimonials",
      quotes: [
        { text: "The digiboard turned delays into actions. Turnaround fell in weeks.", author: "Theatre Manager, Acute Trust" },
        { text: "Staffing reflects skills mix. Pairing scrub teams is no longer guesswork.", author: "Matron, Theatres" },
        { text: "Exports made the board pack painless. The 'so what' is obvious now.", author: "Performance Lead" }
      ]
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

  const preloadAudio = async (index: number) => {
    if (!useVoice || audioCacheRef.current.has(index)) return;

    try {
      const text = sections[index].narration;
      const response = await fetch('/api/openai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: selectedVoice }),
      });

      if (response.ok && response.headers.get('content-type')?.includes('audio/mpeg')) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audioCacheRef.current.set(index, audioUrl);
        console.log(`✅ Preloaded audio for section ${index}`);
      }
    } catch (error) {
      console.error(`❌ Failed to preload audio for section ${index}:`, error);
    }
  };

  const speakWithTOM = async (text: string, sectionIndex: number): Promise<void> => {
    if (!useVoice) return;

    // Stop any currently playing audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    speechSynthesis.cancel();

    setIsSpeaking(true);
    setIsLoadingAudio(true);

    try {
      let audioUrl = audioCacheRef.current.get(sectionIndex);

      if (!audioUrl) {
        console.log('🎙️ Generating audio with OpenAI TTS...');
        const response = await fetch('/api/openai-tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: selectedVoice }),
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');

          if (contentType?.includes('audio/mpeg')) {
            const audioBlob = await response.blob();
            audioUrl = URL.createObjectURL(audioBlob);
            audioCacheRef.current.set(sectionIndex, audioUrl);
          } else {
            console.log('⚠️ Not audio/mpeg, falling back to browser voice');
            setIsLoadingAudio(false);
            useBrowserVoice(text);
            return;
          }
        } else {
          console.error('❌ TTS API error:', response.status);
          setIsLoadingAudio(false);
          useBrowserVoice(text);
          return;
        }
      } else {
        console.log('✅ Using cached audio');
      }

      // Return a promise that resolves when audio finishes playing
      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onloadeddata = () => {
          setIsLoadingAudio(false);
        };

        audio.onended = () => {
          console.log('✅ Audio finished playing');
          setIsSpeaking(false);
          audioRef.current = null;
          resolve();
        };

        audio.onerror = (e) => {
          console.error('❌ Audio playback error:', e);
          setIsSpeaking(false);
          setIsLoadingAudio(false);
          audioRef.current = null;
          useBrowserVoice(text);
          resolve(); // Resolve anyway to continue flow
        };

        console.log('▶️ Playing audio...');
        audio.play()
          .then(() => {
            setIsLoadingAudio(false);
            // Preload next section while current is playing
            if (sectionIndex + 1 < sections.length) {
              preloadAudio(sectionIndex + 1);
            }
          })
          .catch((err) => {
            console.error('❌ Play failed:', err);
            setIsLoadingAudio(false);
            setIsSpeaking(false);
            audioRef.current = null;
            useBrowserVoice(text);
            resolve();
          });
      });
    } catch (error) {
      console.error('❌ TTS error:', error);
      setIsLoadingAudio(false);
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
      return;
    }

    setCurrentSection(index);

    // Wait for audio to completely finish playing
    await speakWithTOM(sections[index].narration, index);

    // Add a 2-second pause between sections for smooth transition
    await new Promise(resolve => {
      timeoutRef.current = setTimeout(resolve, 2000);
    });

    // Move to next section
    playSection(index + 1);
  };

  const startExperience = async () => {
    setIsInitializing(true);
    setIsPlaying(true);

    // Start background music with fade in
    fadeInBackgroundMusic();

    if (useVoice) {
      await preloadAudio(0);
    }

    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsInitializing(false);

    playSection(0);
  };

  const skipSection = () => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Cancel browser voice if active
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsLoadingAudio(false);

    // Move to next section immediately
    playSection(currentSection + 1);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      speechSynthesis.cancel();
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
              The TOM Experience
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-3 md:mb-4 px-2">
              A comprehensive journey through <span className="text-teal-400 font-semibold">Theatre Operations Management</span>
            </p>
            <p className="text-gray-500 text-xs sm:text-sm px-2">
              Narrated by TOM himself • ~8 minutes
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
              disabled={isInitializing}
              whileHover={!isInitializing ? { scale: 1.05 } : {}}
              whileTap={!isInitializing ? { scale: 0.95 } : {}}
              className={`px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-teal-500/50 transition-all flex items-center gap-2 sm:gap-3 mx-auto ${
                isInitializing ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {isInitializing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <span>Preparing TOM's Voice...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Begin Experience</span>
                </>
              )}
            </motion.button>

            <p className="text-gray-500 text-xs sm:text-sm px-4">
              {useVoice ? "🎙️ Full presentation with TOM's narration" : "📖 Silent reading mode"}
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

      {/* Loading audio indicator */}
      <AnimatePresence>
        {isLoadingAudio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 flex items-center gap-2 sm:gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-blue-500 border-t-transparent rounded-full"
            />
            <span className="text-blue-300 font-medium text-xs sm:text-sm md:text-base">Preparing audio...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaking indicator */}
      <AnimatePresence>
        {isSpeaking && !isLoadingAudio && (
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
          className="h-full flex items-center justify-center px-4 overflow-y-auto"
        >
          <div className="text-center max-w-6xl px-4 py-8">
            <motion.h2
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 mb-6 sm:mb-8"
            >
              {section.title}
            </motion.h2>

            {/* TOM Awakening */}
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

            {/* Crisis Visual - Explainer Style */}
            {section.visual === "crisis" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-3 gap-6">
                  {/* Money flying away animation */}
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-red-500/10 border-2 border-red-500 rounded-xl p-6 text-center"
                  >
                    <motion.div
                      className="text-5xl mb-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💸
                    </motion.div>
                    <div className="text-2xl font-bold text-red-400">£10.4B</div>
                    <div className="text-sm text-gray-400 mt-1">Temp Staffing</div>
                  </motion.div>

                  {/* Nurses leaving */}
                  <motion.div
                    className="bg-orange-500/10 border-2 border-orange-500 rounded-xl p-6 text-center"
                  >
                    <motion.div
                      className="text-5xl mb-2"
                      animate={{ x: [0, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      👨‍⚕️
                    </motion.div>
                    <div className="text-2xl font-bold text-orange-400">43,000</div>
                    <div className="text-sm text-gray-400 mt-1">Vacancies</div>
                  </motion.div>

                  {/* Patients waiting */}
                  <motion.div
                    className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-6 text-center"
                  >
                    <motion.div
                      className="text-5xl mb-2"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ⏳
                    </motion.div>
                    <div className="text-2xl font-bold text-yellow-400">7.61M</div>
                    <div className="text-sm text-gray-400 mt-1">Waiting</div>
                  </motion.div>
                </div>

                {/* Crying spreadsheet */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 text-center"
                >
                  <motion.div
                    className="text-6xl inline-block"
                    animate={{
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📊😭
                  </motion.div>
                  <p className="text-gray-400 mt-2">...and somewhere, a spreadsheet is crying</p>
                </motion.div>
              </motion.div>
            )}

            {/* Diagnosis Visual - Disconnected Systems */}
            {section.visual === "why" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-3 gap-4 relative">
                  {/* System 1 - Rostering */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                    className="bg-purple-500/10 border-2 border-purple-500 rounded-lg p-4 text-center"
                  >
                    <div className="text-3xl mb-2">📅</div>
                    <div className="text-sm text-purple-300">Rostering</div>
                  </motion.div>

                  {/* System 2 - Theatre Schedule */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4 text-center"
                  >
                    <div className="text-3xl mb-2">🏥</div>
                    <div className="text-sm text-blue-300">Theatre</div>
                  </motion.div>

                  {/* System 3 - Inventory */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                    className="bg-green-500/10 border-2 border-green-500 rounded-lg p-4 text-center"
                  >
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-sm text-green-300">Inventory</div>
                  </motion.div>

                  {/* Broken connections */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="text-6xl opacity-30">❌</div>
                  </motion.div>
                </div>
                <p className="text-center text-red-400 mt-4">Systems don't talk to each other!</p>
              </motion.div>
            )}

            {/* Solution Visual - Connected Systems */}
            {section.visual === "how" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 max-w-4xl mx-auto"
              >
                {/* TOM in the center connecting everything */}
                <div className="relative">
                  <div className="grid grid-cols-3 gap-4">
                    {['📅', '🏥', '📦', '👥', '📊', '💬'].map((icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="bg-teal-500/10 border-2 border-teal-500 rounded-lg p-4 text-center relative"
                      >
                        <div className="text-3xl">{icon}</div>
                        {/* Connection lines to center */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-1 bg-teal-500"
                          style={{
                            height: '60px',
                            transformOrigin: 'top',
                            transform: `rotate(${60 * i}deg)`,
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* TOM logo in center */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-6 border-4 border-teal-500"
                  >
                    <div className="text-4xl font-bold text-teal-400">TOM</div>
                  </motion.div>
                </div>
                <p className="text-center text-teal-400 mt-6">Everything connected. Everything working together.</p>
              </motion.div>
            )}

            {/* Six Pillars */}
            {section.visual === "pillars" && section.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
              >
                {section.content.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-teal-500/50 transition-all"
                  >
                    <item.icon className="w-8 h-8 text-teal-400 mb-3 mx-auto" />
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Outcomes Stats */}
            {section.visual === "outcomes" && section.stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8"
              >
                {section.stats.map((stat: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
                    className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
                  >
                    <div className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Testimonials */}
            {section.visual === "testimonials" && section.quotes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-6 mb-8 max-w-4xl mx-auto"
              >
                {section.quotes.map((quote: any, i: number) => (
                  <motion.blockquote
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.2, duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border-l-4 border-teal-500 text-left"
                  >
                    <p className="text-gray-300 italic mb-3">"{quote.text}"</p>
                    <footer className="text-sm text-gray-500">— {quote.author}</footer>
                  </motion.blockquote>
                ))}
              </motion.div>
            )}

            {/* Invitation CTA */}
            {section.visual === "invitation" && (
              <motion.button
                onClick={() => window.location.href = 'https://tom.medaskca.com'}
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

            {/* Narration text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
            >
              {section.narration}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Settings Button */}
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSettings(!showSettings)}
          className="fixed bottom-6 left-6 z-50 p-3 bg-gray-800/80 backdrop-blur-md rounded-full border border-gray-700 hover:bg-gray-700/80 transition-all shadow-lg"
          title="Voice Settings (Ctrl+Shift+V)"
        >
          <Settings className="w-5 h-5 text-gray-300" />
        </motion.button>
      )}

      {/* Voice Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-700 max-w-2xl w-full mx-4 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Voice Settings</h2>
                  <p className="text-sm text-gray-400">Select TOM's voice (applies globally)</p>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Voice Options */}
              <div className="space-y-3">
                {OPENAI_VOICES.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => handleVoiceChange(voice.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedVoice === voice.id
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{voice.name}</span>
                          {selectedVoice === voice.id && (
                            <span className="text-xs px-2 py-0.5 bg-teal-500 text-white rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{voice.description}</p>
                      </div>
                      <Volume2 className={`w-5 h-5 ${selectedVoice === voice.id ? 'text-teal-500' : 'text-gray-500'}`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer Note */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400">
                  💡 <strong>Tip:</strong> Press <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Ctrl+Shift+V</kbd> to quickly access voice settings
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Voice preference is saved globally and will apply to both the intro and TOM dashboard.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
