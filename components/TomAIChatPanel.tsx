'use client';

import React, { useState, useRef, useEffect } from 'react';
import TomLogo from './TomLogo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TomAIChatPanelProps {
  showHeader?: boolean;
}

export default function TomAIChatPanel({ showHeader = true }: TomAIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello Alexander! How can I help you with theatre operations today? Just start speaking when you're ready.",
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
    openaiVoice: 'nova' // alloy, echo, fable, onyx, nova, shimmer
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

  // Initialize Voice Mode Speech Recognition (continuous listening)
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      voiceModeRecognitionRef.current = new SpeechRecognition();
      voiceModeRecognitionRef.current.continuous = true; // Continuous listening
      voiceModeRecognitionRef.current.interimResults = true;
      voiceModeRecognitionRef.current.lang = 'en-GB';

      let accumulatedText = '';
      let silenceTimer: NodeJS.Timeout | null = null;

      voiceModeRecognitionRef.current.onresult = (event: any) => {
        // Cancel any ongoing speech when user starts talking
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        // Clear any existing silence timer
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
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
          accumulatedText += finalTranscript;
        }

        const currentText = (accumulatedText + interimTranscript).trim();
        setInputMessage(currentText);
        setVoiceUiMode('listening');

        // If we have accumulated text, start a silence timer to auto-send after pause
        if (accumulatedText.trim()) {
          silenceTimer = setTimeout(() => {
            const textToSend = accumulatedText.trim();
            if (textToSend && isVoiceMode) {
              accumulatedText = '';
              setInputMessage('');
              thinkingStartTime.current = Date.now();
              setVoiceUiMode('thinking');

              // Stop recognition temporarily while processing
              try {
                voiceModeRecognitionRef.current?.stop();
              } catch (e) {
                console.log('Recognition already stopped');
              }

              // Send the message
              handleSendMessage();
            }
          }, 600); // Auto-send after 0.6 seconds of silence (immediate!)
        }
      };

      voiceModeRecognitionRef.current.onerror = (event: any) => {
        console.log('Voice recognition error:', event.error);

        // Restart recognition on error (except when voice mode is being stopped)
        if (event.error !== 'aborted' && isVoiceMode && !isStoppingVoiceMode.current) {
          setTimeout(() => {
            if (isVoiceMode && voiceModeRecognitionRef.current) {
              try {
                voiceModeRecognitionRef.current.start();
                setVoiceUiMode('listening');
              } catch (e) {
                console.log('Could not restart recognition:', e);
              }
            }
          }, 500);
        }
      };

      voiceModeRecognitionRef.current.onend = () => {
        // Automatically restart recognition if still in voice mode and not speaking
        if (isVoiceMode && !isStoppingVoiceMode.current && !isSpeakingRef.current) {
          setTimeout(() => {
            if (isVoiceMode && voiceModeRecognitionRef.current) {
              try {
                voiceModeRecognitionRef.current.start();
                setVoiceUiMode('listening');
              } catch (e) {
                console.log('Could not restart recognition:', e);
              }
            }
          }, 300);
        }
      };
    }
  }, [isVoiceMode]);

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
    // If turning OFF voice mode, always allow it
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
      setIsVoiceMode(false);
      setVoiceUiMode('idle');
      setInputMessage('');
      return;
    }

    // If turning ON voice mode, check support
    if (!voiceModeRecognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    // Start voice mode and immediately begin listening
    isStoppingVoiceMode.current = false;
    setIsVoiceMode(true);
    setVoiceUiMode('listening');

    // Start continuous listening
    try {
      voiceModeRecognitionRef.current.start();
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      setVoiceUiMode('idle');
    }
  };

  const handleTapToSpeak = () => {
    if (!voiceModeRecognitionRef.current || voiceUiMode === 'thinking' || voiceUiMode === 'speaking') {
      return;
    }

    try {
      // Clear any previous input
      setInputMessage('');
      voiceModeRecognitionRef.current.start();
      setVoiceUiMode('listening');
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      setVoiceUiMode('idle');
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: inputMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      const query = inputMessage;
      setInputMessage('');
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
        console.log('Sending message to TOM API:', query.substring(0, 50));
        const response = await fetch('/api/tom-chat-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query }),
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

          // Only speak the response in voice mode (use ref to avoid stale closure)
          if (isVoiceModeRef.current && fullResponse) {
            console.log('Speaking response in voice mode:', fullResponse.substring(0, 50));
            speakMessage(fullResponse);
          } else {
            console.log('Not speaking - isVoiceModeRef:', isVoiceModeRef.current, 'hasResponse:', !!fullResponse);
          }

          setIsLoading(false);
          abortControllerRef.current = null;
        }
      } catch (error: any) {
        console.error('Chat error:', error);

        // Check if request was aborted
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
      }
    }
  };

  const speakMessage = async (text: string) => {
    // Cancel any ongoing speech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    try {
      // Try OpenAI TTS first
      console.log('Requesting OpenAI TTS with voice:', voiceSettings.openaiVoice);
      const response = await fetch('/api/openai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voiceSettings.openaiVoice // Can be: alloy, echo, fable, onyx, nova, shimmer
        })
      });

      console.log('OpenAI TTS response status:', response.status, 'Content-Type:', response.headers.get('Content-Type'));

      if (!response.ok) {
        throw new Error('OpenAI TTS request failed');
      }

      const contentType = response.headers.get('Content-Type');

      // Check if we got audio or a fallback instruction
      if (contentType?.includes('audio/mpeg')) {
        // We got audio from OpenAI - play it
        console.log('Got audio from OpenAI, creating audio element');
        const audioBlob = await response.blob();
        console.log('Audio blob size:', audioBlob.size, 'bytes');
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onloadeddata = () => {
          console.log('✅ Audio loaded successfully, duration:', audio.duration);
        };

        audio.onplay = () => {
          console.log('🔊 OpenAI TTS PLAYING NOW!');
          isSpeakingRef.current = true;
          setVoiceUiMode('speaking'); // Immediate transition to speaking
        };

        audio.onended = () => {
          console.log('✅ OpenAI TTS ended');
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);

          if (isVoiceMode) {
            // Restart listening after speaking
            setVoiceUiMode('listening');
            setTimeout(() => {
              if (isVoiceMode && voiceModeRecognitionRef.current && !isStoppingVoiceMode.current) {
                try {
                  voiceModeRecognitionRef.current.start();
                  console.log('🎤 Restarted listening after speech');
                } catch (e) {
                  console.log('Could not restart recognition after speech:', e);
                }
              }
            }, 300);
          }
        };

        audio.onerror = (event) => {
          console.error('❌ Audio playback error:', event, audio.error);
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);

          // Fallback to browser voice on playback error
          console.log('⚠️ Falling back to browser voice');
          speakWithBrowserVoice(text);

          if (isVoiceMode) {
            // Restart listening after error
            setTimeout(() => {
              if (isVoiceMode && voiceModeRecognitionRef.current && !isStoppingVoiceMode.current) {
                try {
                  voiceModeRecognitionRef.current.start();
                } catch (e) {
                  console.log('Could not restart recognition after error:', e);
                }
              }
            }, 300);
          }
        };

        console.log('🎵 Starting audio playback...');
        try {
          await audio.play();
          console.log('✅ Audio.play() succeeded');
        } catch (playError) {
          console.error('❌ Audio.play() failed:', playError);
          // Fallback to browser voice
          speakWithBrowserVoice(text);
        }
        return;
      } else {
        // Response says to use browser voice (API key not configured or error)
        console.log('⚠️ OpenAI TTS returned non-audio response');
        const data = await response.json();
        if (data.useBrowserVoice) {
          console.log('Using browser voice as instructed by API');
          speakWithBrowserVoice(text);
        }
      }
    } catch (error) {
      console.error('❌ OpenAI TTS error:', error);
      // Fallback to browser voice on any error
      console.log('⚠️ Falling back to browser voice due to error');
      speakWithBrowserVoice(text);
    }
  };

  const speakWithBrowserVoice = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.log('Browser speech synthesis not available');
      if (isVoiceMode) {
        setVoiceUiMode('idle');
      }
      return;
    }

    console.log('Using browser voice');

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      console.log('Available voices:', voices.length);

      // Use selected voice from settings
      let selectedVoice = null;
      if (voiceSettings.selectedVoice) {
        selectedVoice = voices.find(v => v.name === voiceSettings.selectedVoice);
      }

      // Fallback to default if selected voice not found
      if (!selectedVoice) {
        const preferredVoices = [
          'Google UK English Female',
          'Google US English',
          'Samantha',
          'Microsoft Zira - English (United States)'
        ];

        for (const prefName of preferredVoices) {
          selectedVoice = voices.find(v => v.name === prefName);
          if (selectedVoice) break;
        }

        // Last resort: any English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        console.log('Selected voice:', selectedVoice.name);
      } else {
        utterance.lang = 'en-GB';
        console.log('No specific voice found, using default en-GB');
      }

      // Use settings from state
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      utterance.onstart = () => {
        console.log('Speech started');
        isSpeakingRef.current = true;

        // Ensure minimum thinking duration of 600ms
        const thinkingDuration = Date.now() - thinkingStartTime.current;
        const minThinkingTime = 600;
        const remainingTime = Math.max(0, minThinkingTime - thinkingDuration);

        setTimeout(() => {
          setVoiceUiMode('speaking'); // assistant-audio-start event
        }, remainingTime);

        // Stop listening to prevent feedback loop
        if (voiceModeRecognitionRef.current) {
          try {
            voiceModeRecognitionRef.current.stop();
          } catch (e) {
            console.log('Recognition already stopped');
          }
        }
      };
      utterance.onend = () => {
        console.log('Speech ended');
        isSpeakingRef.current = false;

        if (isVoiceMode) {
          // Restart listening after speaking
          setVoiceUiMode('listening');
          setTimeout(() => {
            if (isVoiceMode && voiceModeRecognitionRef.current && !isStoppingVoiceMode.current) {
              try {
                voiceModeRecognitionRef.current.start();
              } catch (e) {
                console.log('Could not restart recognition after speech:', e);
              }
            }
          }, 300);
        }
      };
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        isSpeakingRef.current = false;

        if (isVoiceMode) {
          // Restart listening after error
          setVoiceUiMode('listening');
          setTimeout(() => {
            if (isVoiceMode && voiceModeRecognitionRef.current && !isStoppingVoiceMode.current) {
              try {
                voiceModeRecognitionRef.current.start();
              } catch (e) {
                console.log('Could not restart recognition after error:', e);
              }
            }
          }, 300);
        }
      };

      console.log('Starting speech...');
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
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {showHeader && !isVoiceMode && (
        <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">TOM</h2>
        </div>
      )}

      {/* Immersive Voice Mode - Full Screen */}
      {isVoiceMode && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">

          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 dark:bg-white/5"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Pulsing Rings Around Logo */}
          {(voiceUiMode === 'listening' || voiceUiMode === 'speaking') && (
            <>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`rounded-full border-2 ${
                    voiceUiMode === 'speaking' ? 'border-teal-400/40' : 'border-blue-400/40'
                  }`}
                  style={{
                    width: '300px',
                    height: '300px',
                    animation: 'pulse-ring 2s ease-out infinite'
                  }}
                />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`rounded-full border-2 ${
                    voiceUiMode === 'speaking' ? 'border-teal-400/30' : 'border-blue-400/30'
                  }`}
                  style={{
                    width: '400px',
                    height: '400px',
                    animation: 'pulse-ring 2s ease-out infinite 0.5s'
                  }}
                />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`rounded-full border-2 ${
                    voiceUiMode === 'speaking' ? 'border-teal-400/20' : 'border-blue-400/20'
                  }`}
                  style={{
                    width: '500px',
                    height: '500px',
                    animation: 'pulse-ring 2s ease-out infinite 1s'
                  }}
                />
              </div>
            </>
          )}

          {/* Centered Logo - Non-interactive (always listening) */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with Dramatic Animation - NO CONTAINER */}
            {/* Multiple Glow Layers for Drama */}
            <div
              className={`absolute blur-3xl transition-all duration-700 ${
                  voiceUiMode === 'speaking' ? 'opacity-90 scale-150' :
                  voiceUiMode === 'listening' ? 'opacity-70 scale-125' :
                  voiceUiMode === 'thinking' ? 'opacity-60 scale-110' :
                  'opacity-40 scale-100'
                }`}
                style={{
                  animation: voiceUiMode === 'speaking' ? 'dramatic-glow 2s ease-in-out infinite' :
                             voiceUiMode === 'listening' ? 'subtle-pulse 3s ease-in-out infinite' :
                             'none',
                  filter: voiceUiMode === 'speaking' ? 'hue-rotate(160deg) brightness(1.3)' :
                          voiceUiMode === 'listening' ? 'hue-rotate(200deg)' :
                          voiceUiMode === 'thinking' ? 'hue-rotate(280deg)' :
                          'none'
                }}
              >
                <TomLogo
                  isListening={voiceUiMode === 'listening'}
                  isSpeaking={voiceUiMode === 'speaking'}
                  size={280}
                  variant="standalone"
                />
            </div>

            {/* Secondary Glow */}
            <div
              className={`absolute blur-2xl transition-all duration-500 ${
                  voiceUiMode === 'speaking' ? 'opacity-80' :
                  voiceUiMode === 'listening' ? 'opacity-60' :
                  'opacity-30'
                }`}
              >
                <TomLogo
                  isListening={voiceUiMode === 'listening'}
                  isSpeaking={voiceUiMode === 'speaking'}
                  size={280}
                  variant="standalone"
                />
            </div>

            {/* Main Logo */}
            <div
              className={`relative transition-all duration-500 ${
                  voiceUiMode === 'speaking' ? 'scale-110' :
                  voiceUiMode === 'listening' ? 'scale-105' :
                  'scale-100 group-hover:scale-105'
                }`}
                style={{
                  animation: voiceUiMode === 'speaking'
                    ? 'dramatic-speak 1.5s ease-in-out infinite'
                    : voiceUiMode === 'listening' && inputMessage
                    ? 'listening-jitter 0.6s ease-in-out infinite'
                    : 'none',
                  filter: voiceUiMode === 'speaking' ? 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.8))' :
                          voiceUiMode === 'listening' ? 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.7))' :
                          'drop-shadow(0 0 15px rgba(147, 51, 234, 0.5))'
                }}
              >
                <TomLogo
                  isListening={voiceUiMode === 'listening'}
                  isSpeaking={voiceUiMode === 'speaking'}
                  size={280}
                  variant="standalone"
                />
            </div>

            {/* Status Text */}
            <div className="text-center space-y-3 mt-8">
              <p className={`text-4xl font-bold transition-all duration-500 ${
                voiceUiMode === 'speaking'
                  ? 'text-teal-600 dark:text-teal-300 animate-pulse'
                  : voiceUiMode === 'thinking'
                  ? 'text-purple-600 dark:text-purple-300 animate-pulse'
                  : voiceUiMode === 'listening'
                  ? 'text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400'
              }`} style={{
                textShadow: voiceUiMode === 'speaking' ? '0 0 20px rgba(20, 184, 166, 0.5)' :
                            voiceUiMode === 'thinking' ? '0 0 20px rgba(147, 51, 234, 0.5)' :
                            voiceUiMode === 'listening' ? '0 0 20px rgba(59, 130, 246, 0.5)' :
                            'none'
              }}>
                {voiceUiMode === 'speaking' ? 'TOM is speaking...' :
                 voiceUiMode === 'thinking' ? 'Processing...' :
                 'Listening...'}
              </p>

              {/* Live Transcript Preview */}
              {inputMessage && voiceUiMode === 'listening' && (
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl px-6 py-4 max-w-2xl mx-auto border border-blue-200 dark:border-blue-800 shadow-xl">
                  <p className="text-lg text-gray-800 dark:text-slate-200 italic font-medium">
                    "{inputMessage}"
                  </p>
                </div>
              )}

              {/* Thinking Indicator */}
              {voiceUiMode === 'thinking' && (
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              )}
            </div>

            {/* Dramatic Voice Visualization Bars */}
            {voiceUiMode !== 'thinking' && (
              <div className="flex items-center justify-center gap-3 h-24 mt-6">
                {[...Array(voiceUiMode === 'speaking' ? 9 : 7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 rounded-full transition-all duration-300 shadow-lg ${
                      voiceUiMode === 'speaking'
                        ? 'bg-gradient-to-t from-teal-500 via-teal-400 to-teal-300'
                        : 'bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300'
                    }`}
                    style={{
                      height: '60px',
                      transformOrigin: 'center',
                      animationName: voiceUiMode === 'speaking' ? 'dramatic-bars-speaking' : 'dramatic-bars-listening',
                      animationDuration: voiceUiMode === 'speaking'
                        ? `${0.3 + Math.random() * 0.2}s`
                        : `${0.5 + Math.random() * 0.3}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${i * 0.05}s`,
                      boxShadow: voiceUiMode === 'speaking'
                        ? '0 0 15px rgba(20, 184, 166, 0.6)'
                        : '0 0 12px rgba(59, 130, 246, 0.5)'
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Voice Settings Panel */}
          {showVoiceSettings && (
            <div className="absolute top-8 right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 dark:border-slate-700 z-20">
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
                {/* OpenAI Voice Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OpenAI Voice (Primary)
                  </label>
                  <select
                    value={voiceSettings.openaiVoice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, openaiVoice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="alloy">Alloy (Neutral)</option>
                    <option value="echo">Echo (Male)</option>
                    <option value="fable">Fable (British)</option>
                    <option value="onyx">Onyx (Deep Male)</option>
                    <option value="nova">Nova (Female)</option>
                    <option value="shimmer">Shimmer (Soft Female)</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ChatGPT-quality voices from OpenAI
                  </p>
                </div>

                {/* Browser Voice Selection (Fallback) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Browser Voice (Fallback)
                  </label>
                  <select
                    value={voiceSettings.selectedVoice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, selectedVoice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                  >
                    {availableVoices
                      .filter(v => v.lang.startsWith('en'))
                      .map(voice => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name}
                        </option>
                      ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Used if OpenAI TTS fails
                  </p>
                </div>

                {/* Speed/Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Speed: {voiceSettings.rate.toFixed(2)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={voiceSettings.rate}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>

                {/* Pitch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pitch: {voiceSettings.pitch.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={voiceSettings.pitch}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Lower</span>
                    <span>Higher</span>
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Volume: {Math.round(voiceSettings.volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={voiceSettings.volume}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                    className="w-full accent-teal-500"
                  />
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

          {/* Voice Mode Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-4">
            {/* Upload Button */}
            <button
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-200"
              title="Upload file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className={`p-3 rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 border ${
                showVoiceSettings
                  ? 'bg-teal-500 text-white border-teal-600'
                  : 'bg-white/90 text-gray-700 border-gray-200'
              }`}
              title="Voice settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Close (X) Button */}
            <button
              onClick={handleVoiceMode}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-200"
              title="Exit voice mode"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Share Button */}
            <button
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-200"
              title="Share conversation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages Area - Hidden in Voice Mode */}
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
              <p className={`text-sm whitespace-pre-wrap ${message.role === 'assistant' ? 'text-gray-900 dark:text-slate-100' : ''}`}>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area - Fixed at bottom - Hidden in Voice Mode */}
      {!isVoiceMode && (
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2 items-center">
          {/* Upload (+) Button */}
          <button
            className="flex-shrink-0 p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            title="Upload file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isRecording ? "Recording..." : "Message TOM..."}
              disabled={isLoading}
              className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* Mic Button - Recording/Dictation */}
              <button
                onClick={handleRecording}
                disabled={isLoading}
                className={`p-2 rounded-full transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                title={isRecording ? 'Stop recording' : 'Record message'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* Dynamic Button - Stop/Send/Voice Mode */}
              {isLoading ? (
                // Stop button while generating
                <button
                  onClick={handleStopGenerating}
                  className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
                  title="Stop generating"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                </button>
              ) : inputMessage.trim() ? (
                // Send button when there's text
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
                  title="Send message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                // Voice Mode button when idle
                <button
                  onClick={handleVoiceMode}
                  disabled={isRecording}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  title="Start voice conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h2m0 0v4m0-4V8m4 4h2m0 0v6m0-6V6m4 6h2m0 0v2m0-2v-2m4 2h2m0 0v4m0-4V8" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        {isRecording && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></span>
              <span className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
              <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></span>
              <span className="w-1 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
            </div>
            <p className="text-xs text-gray-600">Recording - Press Enter to send</p>
          </div>
        )}
        {isVoiceMode && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></span>
              <span className="w-1 h-5 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
              <span className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></span>
              <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
            </div>
            <p className="text-xs text-blue-600">Voice mode - I'll respond when you pause</p>
          </div>
        )}
        {isSpeaking && (
          <div className="mt-3 flex items-center gap-2">
            <TomLogo isListening={false} isSpeaking={true} size={20} variant="inline" />
            <p className="text-xs text-teal-600">TOM is speaking...</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
