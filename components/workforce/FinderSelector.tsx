'use client';

import React, { useState, useEffect } from 'react';
import { Users, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import TomLogo from '@/components/TomLogo';

interface FinderSelectorProps {
  onSelect: (type: 'staff' | 'hospital') => void;
}

export default function FinderSelector({ onSelect }: FinderSelectorProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'staff' | 'hospital' | null>(null);

  const fullMessage = "Hi there! I'm TOM, your Theatre Operations Manager assistant. What can I help you find today?";

  // Animate TOM's message appearing
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(messageTimer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!showMessage) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullMessage.length) {
        setTypingText(fullMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Show options after typing is complete
        setTimeout(() => setShowOptions(true), 300);
      }
    }, 30); // Typing speed

    return () => clearInterval(typingInterval);
  }, [showMessage]);

  const handleSelect = (type: 'staff' | 'hospital') => {
    setSelectedOption(type);
    setTimeout(() => {
      onSelect(type);
    }, 600);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 p-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* TOM AI Avatar & Message */}
        <div className="flex items-start gap-4 animate-fade-in">
          {/* TOM Avatar */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 flex items-center justify-center shadow-2xl flex-shrink-0 transition-all duration-500 ${
            showMessage ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            <TomLogo size={32} />
          </div>

          {/* Chat Bubble */}
          {showMessage && (
            <div className="flex-1 bg-white rounded-3xl rounded-tl-md shadow-xl p-6 border-2 border-blue-200 animate-slide-up">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900">TOM AI</span>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">
                {typingText}
                {typingText.length < fullMessage.length && (
                  <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-blink"></span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Option Cards */}
        {showOptions && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
            {/* Find Staff Option */}
            <button
              onClick={() => handleSelect('staff')}
              disabled={selectedOption !== null && selectedOption !== 'staff'}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 ${
                selectedOption === 'staff'
                  ? 'scale-105 shadow-2xl ring-4 ring-blue-400'
                  : selectedOption === null
                  ? 'hover:scale-105 hover:shadow-2xl'
                  : 'opacity-50 scale-95'
              }`}
              style={{
                background: selectedOption === 'staff'
                  ? 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
                  : 'white'
              }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  selectedOption === 'staff'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:bg-white/20'
                }`}>
                  <Users className={`w-10 h-10 transition-colors duration-300 ${
                    selectedOption === 'staff'
                      ? 'text-white'
                      : 'text-blue-600 group-hover:text-white'
                  }`} />
                </div>

                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                  selectedOption === 'staff'
                    ? 'text-white'
                    : 'text-gray-900 group-hover:text-white'
                }`}>
                  Looking for Staff?
                </h3>

                <p className={`text-base mb-6 transition-colors duration-300 ${
                  selectedOption === 'staff'
                    ? 'text-white/90'
                    : 'text-gray-600 group-hover:text-white/90'
                }`}>
                  Find qualified theatre staff for your hospital based on dates, shifts, and specialties
                </p>

                <div className={`flex items-center gap-2 font-semibold transition-colors duration-300 ${
                  selectedOption === 'staff'
                    ? 'text-white'
                    : 'text-blue-600 group-hover:text-white'
                }`}>
                  <span>Browse Staff Directory</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Selection indicator */}
              {selectedOption === 'staff' && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-scale-in">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>

            {/* Find Hospital/Shifts Option */}
            <button
              onClick={() => handleSelect('hospital')}
              disabled={selectedOption !== null && selectedOption !== 'hospital'}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 ${
                selectedOption === 'hospital'
                  ? 'scale-105 shadow-2xl ring-4 ring-purple-400'
                  : selectedOption === null
                  ? 'hover:scale-105 hover:shadow-2xl'
                  : 'opacity-50 scale-95'
              }`}
              style={{
                background: selectedOption === 'hospital'
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)'
                  : 'white'
              }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  selectedOption === 'hospital'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-purple-100 to-cyan-100 group-hover:bg-white/20'
                }`}>
                  <MapPin className={`w-10 h-10 transition-colors duration-300 ${
                    selectedOption === 'hospital'
                      ? 'text-white'
                      : 'text-purple-600 group-hover:text-white'
                  }`} />
                </div>

                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                  selectedOption === 'hospital'
                    ? 'text-white'
                    : 'text-gray-900 group-hover:text-white'
                }`}>
                  Looking for Shifts?
                </h3>

                <p className={`text-base mb-6 transition-colors duration-300 ${
                  selectedOption === 'hospital'
                    ? 'text-white/90'
                    : 'text-gray-600 group-hover:text-white/90'
                }`}>
                  Discover available shifts at nearby hospitals and apply for positions that match your skills
                </p>

                <div className={`flex items-center gap-2 font-semibold transition-colors duration-300 ${
                  selectedOption === 'hospital'
                    ? 'text-white'
                    : 'text-purple-600 group-hover:text-white'
                }`}>
                  <span>Find Hospitals</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Selection indicator */}
              {selectedOption === 'hospital' && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-scale-in">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
