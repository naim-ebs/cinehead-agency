'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Sparkles, ArrowRight, Film, Code2, Award, Video, ShieldCheck } from 'lucide-react';
import ShowreelModal from './ShowreelModal';

export default function HeroSection() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Ambient Glows & Dynamic Mesh */}
      <div className="ambient-glow w-[600px] h-[600px] bg-blue-600/20 -top-40 left-1/2 -translate-x-1/2 animate-pulse-glow" />
      <div className="ambient-glow w-[400px] h-[400px] bg-cyan-500/15 top-1/3 -right-20" />
      <div className="ambient-glow w-[450px] h-[450px] bg-indigo-600/15 bottom-10 -left-20" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">

          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
              Cine Head 2026 Reel & Studio Portal
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">• 8K Anamorphic & Web Solutions</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Cinematography Mastered.{' '}
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent text-glow-neon">
                Creative Software Engineered.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              We merge the visual poetry of ARRI 8K anamorphic filmmaking with high-performance Next.js & WebGL software architecture. Crafted for visionary brands and cinematic storytellers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Showreel Trigger */}
            <button
              onClick={() => setShowreelOpen(true)}
              className="relative group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold text-sm shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] transition-all duration-500 transform hover:-translate-y-0.5"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span className="tracking-wide">Watch 2026 Showreel</span>
            </button>

            {/* Explore Portfolio */}
            <Link
              href="/projects"
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white text-sm font-semibold backdrop-blur-xl border border-white/[0.12] hover:border-cyan-500/40 transition-all duration-300"
            >
              <span>Explore Works</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>

            {/* Book Project */}
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-4 rounded-full text-slate-400 hover:text-cyan-300 text-sm font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Get Project Quote</span>
            </Link>
          </div>

          {/* Hero Reel Video Spotlight Card */}
          <div className="w-full pt-8 relative">
            <div
              onClick={() => setShowreelOpen(true)}
              className="group cursor-pointer relative mx-auto max-w-4xl aspect-[21/9] sm:aspect-[2.35/1] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_80px_rgba(0,240,255,0.3)] transition-all duration-500 transform hover:-translate-y-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1800&auto=format&fit=crop"
                alt="Cine Head Showreel Preview"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/40 to-transparent opacity-80" />

              {/* Pulsing Play Orb */}
              <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-cyan-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,240,255,0.8)] group-hover:scale-110 group-hover:bg-cyan-400 transition-all duration-300">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>

              {/* Floating Meta Pills */}
              <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600/80 text-white backdrop-blur-md flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>4K MASTER REEL</span>
                </span>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-slate-300 backdrop-blur-md border border-white/10">
                  ARRI Alexa 35 • Atlas Anamorphic
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between text-xs text-slate-300">
                <div className="text-left">
                  <p className="text-white font-bold text-sm sm:text-base">Neon Odyssey & Commercial Highlights</p>
                  <p className="text-slate-400 text-xs hidden sm:block">Directed & Engineered by Cine Head Collective</p>
                </div>
                <span className="text-cyan-400 font-semibold tracking-wider uppercase text-xs flex items-center gap-1">
                  <span>Click to Play</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Agency Metric Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-10 border-t border-white/[0.08]">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm space-y-1 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">8K / DCI</p>
              <p className="text-xs text-slate-400 font-medium">Cinema Standards</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm space-y-1 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">15M+</p>
              <p className="text-xs text-slate-400 font-medium">Global Views</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm space-y-1 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">99.8%</p>
              <p className="text-xs text-slate-400 font-medium">Client Success</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm space-y-1 text-center">
              <p className="text-2xl sm:text-2xl font-extrabold text-white font-mono">4+ Cannes/Lions</p>
              <p className="text-xs text-slate-400 font-medium">Industry Honors</p>
            </div>
          </div>

        </div>
      </div>

      {/* Showreel Lightbox Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        title="Cine Head - Official 2026 Master Cinematography & Web Reel"
      />
    </section>
  );
}
