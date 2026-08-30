'use client';

import React from 'react';
import { Award, Film, Sparkles, Tv, ShieldCheck } from 'lucide-react';

const CLIENTS = [
  { name: 'AURA SPATIAL', category: 'Spatial Computing' },
  { name: 'VANGUARD AUTOMOBILI', category: 'Automotive' },
  { name: 'ISLAND WAVE RECORDS', category: 'Music & Entertainment' },
  { name: 'NORDIC HERITAGE', category: 'Documentary Trust' },
  { name: 'SYNTHETIX AI', category: 'Enterprise SaaS' },
  { name: 'SONY PICTURES INDIE', category: 'Feature Distribution' },
];

const FESTIVALS = [
  'CAMERIMAGE OFFICIAL SELECTION',
  'CANNES LIONS BRONZE 2025',
  'SUNDANCE INDIE SHORTS',
  'AWWWARDS SITE OF THE MONTH',
  'CLIO AWARDS SILVER',
  'MTV VMA NOMINEE',
];

export default function ClientMarquee() {
  return (
    <section className="py-16 border-y border-white/[0.06] bg-[#030612]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
          TRUSTED BY VISIONARY BRANDS & ACCREDITED BY GLOBAL FESTIVALS
        </span>
      </div>

      {/* Festival Ribbon */}
      <div className="flex overflow-x-hidden space-x-8 py-3 mb-6 select-none opacity-80">
        <div className="flex space-x-8 animate-marquee shrink-0 items-center">
          {FESTIVALS.concat(FESTIVALS).map((fest, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-semibold tracking-wider text-slate-300 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{fest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-all text-center flex flex-col justify-center items-center h-20 group"
            >
              <span className="font-extrabold text-xs tracking-wider text-slate-400 group-hover:text-white transition-colors">
                {client.name}
              </span>
              <span className="text-[9px] text-slate-400/80 uppercase font-mono mt-0.5">
                {client.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
