import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Film, 
  Sparkles, 
  Camera, 
  Award, 
  Code2, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Sliders
} from 'lucide-react';
import ClientMarquee from '@/components/ClientMarquee';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'About Cine Head • Studio Philosophy & Gear Vault',
  description: 'Learn about Cine Head: a hybrid cinematography and creative tech collective crafting 8K motion pictures and high-performance web software.',
};

const GEAR_LOCKER = [
  {
    category: 'Cinema Camera Systems',
    items: ['ARRI Alexa 35 (Super 35 Native 4.6K)', 'ARRI Alexa Mini LF (Large Format)', 'RED V-Raptor 8K VV Multi-Format', 'Sony FX9 & FX6 Full Frame Packages']
  },
  {
    category: 'Anamorphic & Spherical Optics',
    items: ['Atlas Orion Anamorphic 2X (32, 40, 65, 80, 100mm)', 'Cooke S4/i Prime Lenses (18, 25, 32, 50, 75, 100mm)', 'Sony G-Master Cinema Cine-Primes', 'Tokina Cinema Vista Primes']
  },
  {
    category: 'Motion Control, Drones & Rigs',
    items: ['DJI Inspire 3 (8K Full Frame Cinema Drone)', 'Steadicam M-2 with Volt Horizon Active Stabilization', 'DJI Ronin 2 3-Axis Heavy-Lift Gimbal', 'Motorized Slider & Precision Jib Cranes']
  },
  {
    category: 'Post, Color & Creative Tech',
    items: ['Sony BVM-HX310 4K HDR Reference Master Monitors', 'DaVinci Resolve Studio Advanced Color Panels', 'Next.js 15 App Router & WebGL Shader Pipelines', 'Dolby Vision Certified Color Suite']
  }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 space-y-24 animate-fade-in">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Cine Head Manifesto</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Crafting Visual Immersion Through{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
            Optics and Code.
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Founded on the principle that the highest-level visual storytelling requires seamless synchronicity between cinematography on set and the digital platforms where films are distributed.
        </p>
      </div>

      {/* Origin & Story Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              The Evolution of Cine Head
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cine Head started as a collaborative brotherhood of cinematographers, gaffers, and colorists who spent sleepless nights on soundstages and remote locations chasing natural light.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              As digital distribution evolved, we realized that conventional agencies outsourced their websites and digital tools to generic software houses—destroying the cinematic mood.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We brought full-stack software engineers into the studio locker. Today, we engineer everything: from the 8K anamorphic camera package on the shoot car to the Next.js interactive web portal that launches the campaign.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                <span>Collaborate With Our Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop"
              alt="Cine Head Production on Location"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#040817]/80 backdrop-blur-md border border-white/[0.1]">
              <p className="text-xs font-bold text-white">On Location • Seoul Night Shoot</p>
              <p className="text-[11px] text-cyan-400 font-mono">ARRI Alexa 35 + Atlas Orion 40mm Anamorphic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Locker / Studio Vault */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Hardware & Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Studio Equipment Vault
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We own and field first-tier cinema packages, avoiding middleman rental markups and guaranteeing spotless technical execution on every shoot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEAR_LOCKER.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {sec.category}
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand & Festival Trust */}
      <ClientMarquee />
    </div>
  );
}
