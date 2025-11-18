'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  Send,
  Clock
} from 'lucide-react';

interface HelpSupportViewProps {
  onBack?: () => void;
}

export default function HelpSupportView({ onBack }: HelpSupportViewProps) {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const faqs = [
    {
      question: 'How do I view my shift schedule?',
      answer: 'Navigate to the "My Shifts" section from the Account menu or Logistics menu. Your schedule will display all upcoming shifts with details including date, time, location, and role.'
    },
    {
      question: 'How can I request a shift change?',
      answer: 'Go to your shift details and tap "Request Change". Select the reason for your request and submit. Your manager will be notified and will review your request within 24 hours.'
    },
    {
      question: 'Where can I find theatre readiness information?',
      answer: 'Access the Readiness tab from the Operations menu. You\'ll see real-time status of all theatres including equipment, staffing levels, and any outstanding issues.'
    },
    {
      question: 'How do I report a supply shortage?',
      answer: 'Go to the Supply section, find the item in question, and tap "Report Issue". Select "Shortage" and provide details. The procurement team will be automatically notified.'
    },
    {
      question: 'How can I update my profile information?',
      answer: 'Tap the Account icon at the bottom right, select "Update Profile", and edit your information. Remember to save your changes before exiting.'
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'On the login screen, tap "Forgot Password?". Enter your email address and you\'ll receive a password reset link within minutes.'
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: '+44 (0) 20 7946 0958',
      subtitle: 'Mon-Fri, 8am-6pm',
      color: 'from-blue-500 to-teal-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@medaskca.com',
      subtitle: 'Response within 24 hours',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Start a conversation',
      subtitle: 'Available now',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'User Guide',
      description: 'Complete guide to using TOM'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video walkthroughs'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Technical documentation and APIs'
    }
  ];

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleBack}
            className="flex items-center justify-center text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Help & Support</h1>
            <p className="text-xs text-white/80 mt-0.5">We're here to help you</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Contact Support</h2>
            </div>
            <div className="p-4 space-y-3">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-gray-900">{option.title}</p>
                      <p className="text-xs text-gray-600">{option.description}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-0.5">
                        <Clock className="w-3 h-3 mr-1" />
                        {option.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900 text-left pr-2">{faq.question}</p>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-3 pt-1">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
                Resources
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <button
                    key={index}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                        <p className="text-xs text-gray-500">{resource.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Send Message Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Send us a message</h2>
            </div>
            <div className="p-4 space-y-3">
              <textarea
                placeholder="Describe your issue or question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none"
              />
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:via-teal-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">System Status</p>
                  <p className="text-xs text-gray-500 mt-0.5">All systems operational</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
