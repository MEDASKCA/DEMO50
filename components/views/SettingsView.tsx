'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Lock,
  Database,
  Smartphone,
  Volume2,
  Eye,
  Shield,
  Wifi,
  ChevronRight
} from 'lucide-react';

interface SettingsViewProps {
  onBack?: () => void;
}

export default function SettingsView({ onBack }: SettingsViewProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

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
            <h1 className="text-lg font-bold">Settings</h1>
            <p className="text-xs text-white/80 mt-0.5">Manage your app preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Bell className="w-4 h-4 mr-2 text-blue-600" />
                Notifications
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500 mt-0.5">Receive alerts and updates</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Sound</p>
                  <p className="text-xs text-gray-500 mt-0.5">Play notification sounds</p>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-teal-600" />
                Appearance
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500 mt-0.5">Use dark theme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="text-xs text-gray-500 mt-0.5">English (UK)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-600" />
                Security & Privacy
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Biometric Login</p>
                  <p className="text-xs text-gray-500 mt-0.5">Use Face ID or fingerprint</p>
                </div>
                <button
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    biometricEnabled ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Change Password</p>
                  <p className="text-xs text-gray-500 mt-0.5">Update your password</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
                  <p className="text-xs text-gray-500 mt-0.5">View our privacy policy</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Data & Storage Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Database className="w-4 h-4 mr-2 text-blue-600" />
                Data & Storage
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Clear Cache</p>
                  <p className="text-xs text-gray-500 mt-0.5">Free up storage space</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Download Data</p>
                  <p className="text-xs text-gray-500 mt-0.5">Export your information</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Smartphone className="w-4 h-4 mr-2 text-teal-600" />
                About
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">App Version</p>
                <p className="text-xs text-gray-500 mt-0.5">v1.0.0 (Build 100)</p>
              </div>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Terms of Service</p>
                  <p className="text-xs text-gray-500 mt-0.5">View terms and conditions</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Licenses</p>
                  <p className="text-xs text-gray-500 mt-0.5">Open source licenses</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
