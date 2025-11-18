'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import TomLogo from './TomLogo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatGPTStyleTOM() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      let autoSendTimeout: NodeJS.Timeout | null = null;
      let accumulatedText = '';

      recognitionRef.current.onresult = (event: any) => {
        if (autoSendTimeout) {
          clearTimeout(autoSendTimeout);
          autoSendTimeout = null;
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

        if (finalTranscript.trim()) {
          autoSendTimeout = setTimeout(() => {
            const textToSend = accumulatedText.trim();
            if (textToSend) {
              accumulatedText = '';
              handleSendMessage(textToSend);
            }
          }, 1500);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          try {
            recognitionRef.current?.start();
          } catch (e) {}
        }
      };
    }
  }, [isListening]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const query = messageText || inputMessage;
    if (!query.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    const streamingMessageId = 'streaming-' + Date.now();
    const streamingMessage: Message = {
      id: streamingMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, streamingMessage]);

    try {
      const response = await fetch('/api/tom-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (response.ok) {
        const result = await response.json();

        setMessages(prev => prev.map(m =>
          m.id === streamingMessageId
            ? { ...m, content: result.message }
            : m
        ));

        // Speak the response with Azure TTS
        if (result.message) {
          await speakMessage(result.message);
        }
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map(m =>
        m.id === streamingMessageId
          ? { ...m, content: 'I encountered an error processing your request. Please try again.' }
          : m
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const speakMessage = async (text: string) => {
    console.log('🗣️ speakMessage called with text:', text.substring(0, 50) + '...');
    setIsSpeaking(true);

    try {
      // Try Azure TTS first
      console.log('📡 Calling Azure TTS API...');
      const response = await fetch('/api/azure-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      console.log('📡 Azure TTS response status:', response.status, response.ok);

      if (response.ok) {
        const contentType = response.headers.get('Content-Type');

        if (contentType?.includes('audio')) {
          // Azure TTS returned audio
          const audioBlob = await response.blob();
          console.log('🎵 Audio blob received, size:', audioBlob.size);

          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          // CRITICAL: audio.play() returns a Promise that must be handled!
          audio.play()
            .then(() => {
              console.log('✅ Audio playback started successfully');
            })
            .catch((error) => {
              console.error('❌ Audio playback failed:', error);
              URL.revokeObjectURL(audioUrl);
              setIsSpeaking(false);
              // Fallback to browser voice if play fails
              speakWithBrowserVoice(text);
            });

          audio.onended = () => {
            console.log('🎵 Audio playback ended');
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
          };

          audio.onerror = (error) => {
            console.error('❌ Audio element error:', error);
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
            speakWithBrowserVoice(text);
          };

          return;
        } else {
          console.log('⚠️ Response content-type is not audio:', contentType);
        }
      } else {
        console.log('⚠️ Azure TTS request failed with status:', response.status);
      }
    } catch (error) {
      console.error('❌ Azure TTS error:', error);
    }

    // Fallback to browser voice
    console.log('🔊 Falling back to browser voice');
    speakWithBrowserVoice(text);
  };

  const speakWithBrowserVoice = (text: string) => {
    console.log('🎤 Browser voice synthesis called');

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('❌ Speech synthesis not available');
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    console.log('🎤 Available voices:', voices.length);

    // Prefer British male voices
    const preferredVoices = [
      'Microsoft George - English (United Kingdom)',
      'Google UK English Male',
      'Microsoft Ryan - English (United Kingdom)',
    ];

    let selectedVoice = null;
    for (const prefName of preferredVoices) {
      selectedVoice = voices.find(v => v.name === prefName);
      if (selectedVoice) break;
    }

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-UK'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = 'en-GB';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      console.log('✅ Browser speech started');
    };

    utterance.onend = () => {
      console.log('✅ Browser speech ended');
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('❌ Browser speech error:', event.error);
      setIsSpeaking(false);
    };

    console.log('🎤 Starting speech synthesis...');
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
        {messages.length === 0 ? (
          // Welcome State - ChatGPT Style
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <TomLogo
                isListening={isListening}
                isSpeaking={isSpeaking}
                size={80}
                variant="inline"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              How can I help you with theatre operations?
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Ask me about schedules, staff availability, or any theatre operations question
            </p>
          </div>
        ) : (
          // Messages View
          <div className="w-full max-w-3xl mx-auto py-8 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">TOM is thinking...</div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - ChatGPT Style */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-4 md:py-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message TOM..."
              disabled={isProcessing}
              className="flex-1 px-5 py-3 md:py-4 bg-transparent focus:outline-none text-sm md:text-base text-gray-900 placeholder-gray-500"
            />

            <div className="flex items-center gap-2 pr-2">
              {/* Microphone Button */}
              <button
                onClick={handleVoiceInput}
                className={`p-2 md:p-2.5 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <Mic className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Wave Visualization Button */}
              <button
                onClick={handleVoiceInput}
                className={`p-2 md:p-2.5 rounded-full transition-all flex items-center justify-center ${
                  isListening || isSpeaking
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Voice mode"
              >
                <div className="flex items-center gap-0.5">
                  <div className={`w-0.5 bg-current rounded-full transition-all ${isListening || isSpeaking ? 'h-4 animate-pulse' : 'h-2'}`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-0.5 bg-current rounded-full transition-all ${isListening || isSpeaking ? 'h-6 animate-pulse' : 'h-3'}`} style={{ animationDelay: '150ms' }} />
                  <div className={`w-0.5 bg-current rounded-full transition-all ${isListening || isSpeaking ? 'h-4 animate-pulse' : 'h-2'}`} style={{ animationDelay: '300ms' }} />
                </div>
              </button>

              {/* Send Button */}
              {inputMessage.trim() && (
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isProcessing}
                  className="p-2 md:p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}
            </div>
          </div>

          {isListening && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Listening... (Speak naturally, I'll auto-send when you pause)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
