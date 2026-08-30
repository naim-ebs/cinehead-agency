'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Film, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@cinehead.studio');
  const [password, setPassword] = useState('cinehead2026!admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-blue-600/20 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow w-[350px] h-[350px] bg-cyan-500/15 bottom-10 right-10" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[1px] shadow-[0_0_25px_rgba(56,189,248,0.4)]">
              <div className="w-full h-full bg-[#050B18] rounded-[15px] flex items-center justify-center">
                <Film className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CINE HEAD CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Agency Command & Content Management Studio
          </p>
        </div>

        {/* Login Glass Panel */}
        <div className="rounded-3xl p-8 glass-panel border border-white/[0.1] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Restricted Access</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">v3.0 Production</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">
                Executive Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="admin@cinehead.studio"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Seed Credentials Quick Hint */}
          {/* <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/30 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Default Seed Credentials:</span>
            </p>
            <p className="font-mono text-[11px] text-slate-300">
              Email: <span className="text-white font-semibold">admin@cinehead.studio</span>
            </p>
            <p className="font-mono text-[11px] text-slate-300">
              Pass: <span className="text-white font-semibold">cinehead2026!admin</span>
            </p>
          </div> */}
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
            ← Return to Cine Head Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
