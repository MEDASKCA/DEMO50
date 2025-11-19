'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to home (cinematic intro)
        router.push('/');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{
              background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
              boxShadow: '0 10px 24px rgba(20,184,166,.15), 0 8px 22px rgba(59,130,246,.12)',
              padding: '8px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}>
                <img
                  src="https://raw.githubusercontent.com/MEDASKCA/OPS/main/logo-medaskca.png"
                  alt="MEDASKCA Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen' }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              TOM by MEDASKCA
            </h1>
            <p className="text-sm text-gray-400">Cinematic Experience</p>
            <p className="text-xs mt-1 text-gray-500">Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-800">
              <p className="text-sm text-center text-red-400">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-150 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-20 outline-none"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="block w-full pl-3 pr-12 py-3 rounded-lg transition-all duration-150 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-20 outline-none"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3 px-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)'
              }}
            >
              {loading ? 'Authenticating...' : 'Access Cinematic Experience'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6 text-gray-500">
          Demo for NHS Clinical Entrepreneur Programme
        </p>
      </div>
    </div>
  );
}
