'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        setError(data.message || 'These credentials do not match our records.');
        setLoading(false);
        return;
      }

      // Successful login -> Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-36 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md border border-gray-100 p-2.5">
            <img
              src="/assets/logo.png"
              alt="Digital Nawab"
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Main Card Inner Box */}
        <div className="bg-white/80 rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-3 shrink-0" />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@digitalnawab.com"
                  autoComplete="username"
                  className="pl-12 block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-[#edf2f7] transition-all duration-200 hover:bg-white focus:bg-white text-gray-900 text-sm py-3 outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pl-12 pr-12 block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-[#edf2f7] transition-all duration-200 hover:bg-white focus:bg-white text-gray-900 text-sm py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="ml-2.5 text-xs sm:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Please contact your administrator at support@digitalnawab.com to reset your credentials.');
                }}
                className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full justify-center py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-white shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'SIGN IN'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <span>🔒</span>
            <span>Your information is protected with industry-standard encryption</span>
          </p>
        </div>
      </div>
    </div>
  );
}
