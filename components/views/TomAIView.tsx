'use client';

import React, { useState, useRef, useEffect } from 'react';
import TomLogo from '../TomLogo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TomAIChatPanelProps {
  showHeader?: boolean;
}

// Varied greetings for chat
const getRandomGreeting = () => {
  const greetings = [
    "Hello! I'm TOM, your Theatre Operations Manager. How can I assist you today?",
    "Good day! TOM here, ready to help with your theatre operations. What would you like to discuss?",
    "Greetings! I'm TOM, and I'm delighted to assist you with theatre management. How may I help?",
    "Welcome! This is TOM, your dedicated theatre operations assistant. What can I do for you today?",
    "Hello there! TOM at your service. I'm here to help make your theatre operations run smoothly. What's on your mind?",
    "Hi! I'm TOM, your Theatre Operations Manager. Ready to help with scheduling, staffing, or any questions!",
    "Good to see you! TOM here. Whether it's rosters, resources, or theatre logistics, I'm here to help.",
    "Welcome back! I'm TOM, and I'm excited to assist with your theatre operations today. How can I support you?",
    "Hello! TOM speaking. I specialise in theatre operations management. What would you like help with?",
    "Wonderful to connect! I'm TOM, your theatre operations expert. Ready to tackle challenges together!"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

export default function TomAIChatPanel({ showHeader = true }: TomAIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm TOM, your Theatre Operations Manager. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceUiMode, setVoiceUiMode] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 0.95,
    pitch: 1.0,
    volume: 1.0,
    selectedVoice: '',
    openaiVoice: 'arbor' // arbor (newest, most natural & expressive), alloy, echo, fable, onyx, nova, shimmer
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Derived states for backwards compatibility
  const isSpeaking = voiceUiMode === 'speaking';
  const isListening = voiceUiMode === 'listening';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const voiceModeRecognitionRef = useRef<any>(null);
  const isStoppingVoiceMode = useRef(false);
  const isSpeakingRef = useRef(false);
  const thinkingStartTime = useRef<number>(0);
  const isVoiceModeRef = useRef(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  // Update initial greeting with random one after client-side mount to fix hydration
  useEffect(() => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 1 && prevMessages[0].id === '1') {
        return [
          {
            ...prevMessages[0],
            content: getRandomGreeting()
          }
        ];
      }
      return prevMessages;
    });
  }, []);

  // Audio Feedback Functions - ChatGPT-style sounds
  const playOpeningClick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  };

  const playDetectionClick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  };

  const playThinkingSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = 200;
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  };

  const playReadyToSpeakClick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  };

  // Keep ref in sync with state
  useEffect(() => {
    isVoiceModeRef.current = isVoiceMode;
  }, [isVoiceMode]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        setAvailableVoices(voices);

        // Set default voice if not already set
        if (!voiceSettings.selectedVoice) {
          const defaultVoice = voices.find(v =>
            v.name.includes('Google UK English Female') ||
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.lang.startsWith('en')
          );
          if (defaultVoice) {
            setVoiceSettings(prev => ({ ...prev, selectedVoice: defaultVoice.name }));
          }
        }
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Recording Mode Speech Recognition (mic button)
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const currentText = (finalTranscript + interimTranscript).trim();
        setInputMessage(currentText);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Recording error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Initialize Voice Mode Speech Recognition (continuous listening) - FIXED VERSION
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      voiceModeRecognitionRef.current = new SpeechRecognition();
      voiceModeRecognitionRef.current.continuous = false; // CHANGED: Use single result mode
      voiceModeRecognitionRef.current.interimResults = true;
      voiceModeRecognitionRef.current.lang = 'en-GB';
      voiceModeRecognitionRef.current.maxAlternatives = 1;

      let currentTranscript = '';

      voiceModeRecognitionRef.current.onresult = (event: any) => {
        // PREVENT FEEDBACK LOOP: Ignore all speech while TOM is speaking
        if (isSpeakingRef.current) {
          console.log('⚠️ Ignoring speech - TOM is currently speaking (preventing feedback loop)');
          return;
        }

        // Cancel any ongoing speech when user starts talking
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        // Clear any existing timeout
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current);
          messageTimeoutRef.current = null;
        }

        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          currentTranscript = finalTranscript.trim();

          // NOISE FILTER: Ignore short gibberish/noise (less than 2 words or 5 characters)
          const wordCount = currentTranscript.split(/\s+/).filter(w => w.length > 0).length;
          const isLikelyNoise = currentTranscript.length < 5 || wordCount < 2;

          if (isLikelyNoise) {
            console.log('⚠️ Filtered out noise:', currentTranscript);
            currentTranscript = '';
            setInputMessage('');
            return;
          }

          // 🔊 DETECTION CLICK - Speech detected!
          playDetectionClick();

          setInputMessage(currentTranscript);

          // Set timeout to send message after 1.5 seconds of silence
          messageTimeoutRef.current = setTimeout(() => {
            if (currentTranscript && isVoiceModeRef.current) {
              console.log('Sending message after silence:', currentTranscript);
              setInputMessage('');
              thinkingStartTime.current = Date.now();
              setVoiceUiMode('thinking');

              // 🔊 THINKING SOUND - Processing!
              playThinkingSound();

              // Send the message
              handleSendMessageInternal(currentTranscript);
              currentTranscript = '';
            }
          }, 1500);
        } else {
          // Update interim transcript display (but don't show if too short)
          if (interimTranscript.length >= 3) {
            setInputMessage(interimTranscript);
          }
        }

        setVoiceUiMode('listening');
      };

      voiceModeRecognitionRef.current.onerror = (event: any) => {
        console.log('Voice recognition error:', event.error);

        // Restart recognition on recoverable errors
        if (event.error === 'no-speech' || event.error === 'network') {
          if (isVoiceModeRef.current && !isStoppingVoiceMode.current) {
            setTimeout(() => {
              try {
                voiceModeRecognitionRef.current?.start();
                setVoiceUiMode('listening');
              } catch (e) {
                console.log('Could not restart recognition:', e);
              }
            }, 500);
          }
        }
      };

      voiceModeRecognitionRef.current.onend = () => {
        // Automatically restart if still in voice mode
        if (isVoiceModeRef.current && !isStoppingVoiceMode.current && !isSpeakingRef.current) {
          setTimeout(() => {
            try {
              voiceModeRecognitionRef.current?.start();
              setVoiceUiMode('listening');
            } catch (e) {
              console.log('Could not restart recognition:', e);
            }
          }, 100);
        }
      };
    }
  }, []);

  const handleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleVoiceMode = () => {
    // If turning OFF voice mode
    if (isVoiceMode) {
      isStoppingVoiceMode.current = true;
      try {
        voiceModeRecognitionRef.current?.stop();
      } catch (e) {
        console.log('Error stopping voice recognition:', e);
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
        messageTimeoutRef.current = null;
      }
      setIsVoiceMode(false);
      setVoiceUiMode('idle');
      setInputMessage('');
      return;
    }

    // If turning ON voice mode
    if (!voiceModeRecognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    // Start voice mode
    isStoppingVoiceMode.current = false;
    setIsVoiceMode(true);
    setVoiceUiMode('speaking'); // Start in speaking mode for greeting

    // TOM introduces himself with varied greetings
    const greetings = [
      "Hello! I'm TOM, your Theatre Operations Manager. How can I assist you today?",
      "Good day! TOM here, ready to help with your theatre operations. What would you like to discuss?",
      "Greetings! I'm TOM, and I'm delighted to assist you with theatre management. How may I help?",
      "Welcome! This is TOM, your dedicated theatre operations assistant. What can I do for you today?",
      "Hello there! TOM at your service. I'm here to help make your theatre operations run smoothly. What's on your mind?",
      "Hi! I'm TOM, your Theatre Operations Manager. I'm ready to help you with scheduling, staffing, or any theatre operations questions.",
      "Good to see you! TOM here. Whether it's rosters, resources, or theatre logistics, I'm here to help. What do you need?",
      "Welcome back! I'm TOM, and I'm excited to assist with your theatre operations today. How can I support you?",
      "Hello! TOM speaking. I specialise in theatre operations management and I'm here to make your day easier. What would you like help with?",
      "Wonderful to connect! I'm TOM, your theatre operations expert. Ready to tackle any challenges together. What's the task?"
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Speak greeting, then start listening
    speakMessage(randomGreeting).then(() => {
      // 🔊 OPENING CLICK - Ready to listen!
      playOpeningClick();

      // After greeting, start listening
      setTimeout(() => {
        try {
          voiceModeRecognitionRef.current.start();
          setVoiceUiMode('listening');
          console.log('Started voice recognition after greeting');
        } catch (e) {
          console.error('Error starting voice recognition:', e);
          setVoiceUiMode('idle');
        }
      }, 300);
    });
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessageInternal = async (messageText: string) => {
    if (messageText.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: messageText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Create a streaming message
      const streamingMessageId = 'streaming-' + Date.now();
      const streamingMessage: Message = {
        id: streamingMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, streamingMessage]);

      // Create abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        console.log('Sending message to TOM API:', messageText.substring(0, 50));
        const response = await fetch('/api/tom-chat-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageText }),
          signal: abortController.signal
        });

        console.log('Got response from TOM API, status:', response.ok);
        if (!response.ok) {
          throw new Error('OpenAI request failed');
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;

            // Update the message with accumulated content
            setMessages(prev => prev.map(m =>
              m.id === streamingMessageId
                ? { ...m, content: fullResponse }
                : m
            ));
          }

          // Only speak the response in voice mode
          if (isVoiceModeRef.current && fullResponse) {
            console.log('Speaking response in voice mode:', fullResponse.substring(0, 50));
            speakMessage(fullResponse);
          }

          setIsLoading(false);
          abortControllerRef.current = null;
        }
      } catch (error: any) {
        console.error('Chat error:', error);

        if (error.name === 'AbortError') {
          setMessages(prev => prev.filter(m => m.id !== streamingMessageId));
        } else {
          setMessages(prev => prev.map(m =>
            m.id === streamingMessageId
              ? { ...m, content: 'I encountered an error processing your request. Please try again.' }
              : m
          ));
        }

        setIsLoading(false);
        abortControllerRef.current = null;

        // Restart listening if in voice mode
        if (isVoiceModeRef.current) {
          setTimeout(() => {
            setVoiceUiMode('listening');
            try {
              voiceModeRecognitionRef.current?.start();
            } catch (e) {
              console.log('Could not restart after error:', e);
            }
          }, 500);
        }
      }
    }
  };

  const handleSendMessage = () => {
    handleSendMessageInternal(inputMessage);
    setInputMessage('');
  };

  const speakMessage = async (text: string) => {
    // Cancel any ongoing speech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    try {
      // Try OpenAI TTS first
      console.log('🎤 Requesting OpenAI TTS with voice:', voiceSettings.openaiVoice);
      const response = await fetch('/api/openai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voiceSettings.openaiVoice
        })
      });

      console.log('OpenAI TTS response status:', response.status);

      if (!response.ok) {
        throw new Error('OpenAI TTS request failed');
      }

      const contentType = response.headers.get('Content-Type');

      if (contentType?.includes('audio/mpeg')) {
        // We got audio from OpenAI
        console.log('✅ Got audio from OpenAI, creating audio element');
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.volume = voiceSettings.volume;

        audio.onloadeddata = () => {
          console.log('✅ Audio loaded, duration:', audio.duration);
        };

        // Return a Promise that resolves when audio finishes
        return new Promise<void>((resolve, reject) => {
          audio.onplay = () => {
            console.log('🔊 OpenAI TTS PLAYING!');

            // 🔊 READY TO SPEAK CLICK - Before TOM speaks!
            playReadyToSpeakClick();

            isSpeakingRef.current = true;
            setVoiceUiMode('speaking');

            // STOP recognition to prevent feedback loop
            try {
              voiceModeRecognitionRef.current?.stop();
              console.log('🔇 Stopped microphone during speech');
            } catch (e) {
              console.log('Recognition already stopped');
            }
          };

          audio.onended = () => {
            console.log('✅ OpenAI TTS ended');
            isSpeakingRef.current = false;
            URL.revokeObjectURL(audioUrl);
            resolve(); // Resolve the promise when audio finishes
          };

          audio.onerror = (event) => {
            console.error('❌ Audio error:', event);
            isSpeakingRef.current = false;
            URL.revokeObjectURL(audioUrl);
            reject(event);
          };

          console.log('🎵 Playing audio...');
          audio.play().catch(reject);
        });
      } else {
        // Use browser voice
        const data = await response.json();
        if (data.useBrowserVoice) {
          console.log('Using browser voice as instructed');
          speakWithBrowserVoice(text);
        }
      }
    } catch (error) {
      console.error('❌ TTS error:', error);
      speakWithBrowserVoice(text);
    }
  };

  const speakWithBrowserVoice = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.log('Browser speech not available');
      return;
    }

    console.log('Using browser voice');

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      let selectedVoice = null;
      if (voiceSettings.selectedVoice) {
        selectedVoice = voices.find(v => v.name === voiceSettings.selectedVoice);
      }

      if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }

      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      utterance.onstart = () => {
        console.log('Speech started');
        isSpeakingRef.current = true;
        setVoiceUiMode('speaking');

        // STOP recognition to prevent feedback loop
        try {
          voiceModeRecognitionRef.current?.stop();
          console.log('🔇 Stopped microphone during browser speech');
        } catch (e) {
          console.log('Recognition already stopped');
        }
      };

      utterance.onend = () => {
        console.log('Speech ended');
        isSpeakingRef.current = false;

        if (isVoiceModeRef.current) {
          setVoiceUiMode('listening');
          setTimeout(() => {
            try {
              voiceModeRecognitionRef.current?.start();
            } catch (e) {
              console.log('Could not restart:', e);
            }
          }, 200);
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', {
          error: event.error,
          charIndex: event.charIndex
        });
        isSpeakingRef.current = false;

        // Reset UI state and restart listening if in voice mode
        if (isVoiceModeRef.current) {
          setVoiceUiMode('listening');
          setTimeout(() => {
            try {
              voiceModeRecognitionRef.current?.start();
            } catch (e) {
              console.log('Could not restart recognition after speech error:', e);
            }
          }, 200);
        } else {
          setVoiceUiMode('idle');
        }
      };

      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      <style jsx global>{`
        @keyframes chatgpt-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes chatgpt-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes chatgpt-thinking {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes chatgpt-jitter {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        @keyframes chatgpt-speak {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
      `}</style>

      {showHeader && !isVoiceMode && (
        <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3 hidden md:block">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">TOM</h2>
        </div>
      )}

      {/* Immersive Voice Mode - Full Screen */}
      {isVoiceMode && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">

          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 dark:bg-white/5"
                style={{
                  width: `${Math.random() * 80 + 40}px`,
                  height: `${Math.random() * 80 + 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Pulsing Rings */}
          {(voiceUiMode === 'listening' || voiceUiMode === 'speaking') && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[0, 0.5, 1].map((delay, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full border-2 ${
                    voiceUiMode === 'speaking' ? 'border-teal-400' : 'border-blue-400'
                  }`}
                  style={{
                    width: `${300 + i * 100}px`,
                    height: `${300 + i * 100}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.4 - i * 0.1,
                    animation: `pulse-ring 2s ease-out infinite ${delay}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Centered Logo with ChatGPT-like Effects */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative">
              {/* Single Glow Layer Behind Logo */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '320px',
                  height: '320px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: voiceUiMode === 'speaking'
                    ? 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, rgba(59,130,246,0.3) 70%, transparent 100%)'
                    : voiceUiMode === 'listening'
                    ? 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(99,102,241,0.3) 70%, transparent 100%)'
                    : voiceUiMode === 'thinking'
                    ? 'radial-gradient(circle, rgba(147,51,234,0.6) 0%, rgba(196,181,253,0.3) 70%, transparent 100%)'
                    : 'radial-gradient(circle, rgba(107,114,128,0.3) 0%, rgba(156,163,175,0.1) 70%, transparent 100%)',
                  filter: 'blur(40px)',
                  animation: voiceUiMode === 'speaking'
                    ? 'chatgpt-glow 2s ease-in-out infinite'
                    : voiceUiMode === 'listening' && inputMessage
                    ? 'chatgpt-pulse 3s ease-in-out infinite'
                    : voiceUiMode === 'thinking'
                    ? 'chatgpt-thinking 3s linear infinite'
                    : 'none',
                  opacity: voiceUiMode !== 'idle' ? 1 : 0.5
                }}
              />

              {/* Main Logo - Single Instance Only */}
              <div
                className="relative transition-all duration-300"
                style={{
                  animation: voiceUiMode === 'speaking'
                    ? 'chatgpt-speak 0.8s ease-in-out infinite'
                    : voiceUiMode === 'listening' && inputMessage
                    ? 'chatgpt-jitter 0.15s ease-in-out infinite'
                    : voiceUiMode === 'thinking'
                    ? 'chatgpt-thinking 2s linear infinite'
                    : 'none',
                  filter: voiceUiMode === 'speaking'
                    ? 'drop-shadow(0 0 40px rgba(20, 184, 166, 0.9))'
                    : voiceUiMode === 'listening'
                    ? 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))'
                    : voiceUiMode === 'thinking'
                    ? 'drop-shadow(0 0 25px rgba(147, 51, 234, 0.7))'
                    : 'drop-shadow(0 0 20px rgba(107, 114, 128, 0.4))',
                  transform: voiceUiMode === 'speaking'
                    ? 'scale(1.1)'
                    : voiceUiMode === 'listening'
                    ? 'scale(1.05)'
                    : 'scale(1)'
                }}
              >
                <TomLogo
                  isListening={voiceUiMode === 'listening'}
                  isSpeaking={voiceUiMode === 'speaking'}
                  size={280}
                  variant="fixed"
                />
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center space-y-3 mt-8">
              <p className={`text-4xl font-bold transition-all duration-500 ${
                voiceUiMode === 'speaking'
                  ? 'text-teal-600 dark:text-teal-300'
                  : voiceUiMode === 'thinking'
                  ? 'text-purple-600 dark:text-purple-300'
                  : voiceUiMode === 'listening'
                  ? 'text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {voiceUiMode === 'speaking' ? 'TOM is speaking...' :
                 voiceUiMode === 'thinking' ? 'Processing...' :
                 voiceUiMode === 'listening' ? 'Listening...' :
                 'Voice Mode'}
              </p>

              {/* Live Transcript */}
              {inputMessage && voiceUiMode === 'listening' && (
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl px-6 py-4 max-w-2xl mx-auto border border-blue-200 dark:border-blue-800 shadow-xl">
                  <p className="text-lg text-gray-800 dark:text-slate-200 italic">
                    "{inputMessage}"
                  </p>
                </div>
              )}

              {/* Thinking Dots */}
              {voiceUiMode === 'thinking' && (
                <div className="flex justify-center gap-2">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Voice Settings Panel */}
          {showVoiceSettings && (
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 dark:border-slate-700 z-20 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Voice Settings</h3>
                <button
                  onClick={() => setShowVoiceSettings(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* OpenAI Voice */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OpenAI Voice
                  </label>
                  <select
                    value={voiceSettings.openaiVoice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, openaiVoice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="alloy">Alloy</option>
                    <option value="echo">Echo</option>
                    <option value="fable">Fable</option>
                    <option value="onyx">Onyx</option>
                    <option value="nova">Nova</option>
                    <option value="shimmer">Shimmer</option>
                  </select>
                </div>

                {/* Test Button */}
                <button
                  onClick={() => speakMessage("Hello! This is how I sound with these settings.")}
                  className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
                >
                  Test Voice
                </button>
              </div>
            </div>
          )}

          {/* Chat History Transcript - Bottom Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-slate-700 max-h-48 overflow-y-auto">
            <div className="p-4 space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Conversation</h3>
              {messages.slice(-5).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-52 left-0 right-0 flex items-center justify-center gap-4 px-4">
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className={`p-3 rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 border ${
                showVoiceSettings
                  ? 'bg-teal-500 text-white border-teal-600'
                  : 'bg-white/90 text-gray-700 border-gray-200 dark:bg-slate-800/90 dark:text-gray-300 dark:border-slate-700'
              }`}
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button
              onClick={handleVoiceMode}
              className="p-3 rounded-full bg-red-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-red-600"
              title="Exit voice mode"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      {!isVoiceMode && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'rounded-2xl px-4 py-2.5 bg-gray-500 dark:bg-slate-100 text-white dark:text-gray-900'
                    : ''
                }`}
              >
                <p className={`text-sm whitespace-pre-wrap ${
                  message.role === 'assistant' ? 'text-gray-900 dark:text-slate-100' : ''
                }`}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      {!isVoiceMode && (
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "Recording..." : "Message TOM..."}
                disabled={isLoading}
                className="w-full pl-4 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={handleRecording}
                  disabled={isLoading}
                  className={`p-2 rounded-full transition-all ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={isRecording ? 'Stop' : 'Record'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>

                {isLoading ? (
                  <button
                    onClick={handleStopGenerating}
                    className="p-2 rounded-full bg-gray-800 dark:bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500 transition-all"
                    title="Stop"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx="1" />
                    </svg>
                  </button>
                ) : inputMessage.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-gray-800 dark:bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500 transition-all"
                    title="Send"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleVoiceMode}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    title="Voice mode"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h2m0 0v4m0-4V8m4 4h2m0 0v6m0-6V6m4 6h2m0 0v2m0-2v-2m4 2h2m0 0v4m0-4V8" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
