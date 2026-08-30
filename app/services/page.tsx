import React from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Film, 
  Sparkles, 
  Code2, 
  Palette, 
  Layers, 
  Check, 
  ArrowRight, 
  Tv, 
  Cpu 
} from 'lucide-react';
import { getServices } from '@/lib/db';
import EstimateForm from '@/components/EstimateForm';

export const metadata = {
  title: 'Production & Creative Tech Services',
  description: 'Explore Cine Head capabilities in 8K Cinematography, Commercial Direction, Dolby Vision Color Grading, and Bespoke Next.js Software Engineering.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return Film;
      case 'Code2': return Code2;
      case 'Sparkles': return Sparkles;
      default: return Camera;
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-24 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Spectrum Agency Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Cinema Production & Creative Tech
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From concept development and Hollywood-grade 8K principal photography to bespoke WebGL interactive applications and cloud software platforms.
        </p>
      </div>

      {/* Services Breakdown Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {services.map((srv, idx) => {
          const Icon = getIcon(srv.icon);
          const isEven = idx % 2 === 0;

          return (
            <div
              key={srv.id || srv._id}
              className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                {/* Left: Info */}
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
                        {srv.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-cyan-200/90 font-medium leading-relaxed">
                    {srv.tagline}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Right: Deliverables & Pricing */}
                <div className="lg:w-80 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4 shrink-0">
                  {srv.startingPrice && (
                    <div className="pb-3 border-b border-white/[0.06]">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                        Baseline Investment
                      </span>
                      <span className="text-xl font-bold text-white font-mono">
                        {srv.startingPrice}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {srv.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs text-center shadow-md shadow-cyan-500/20"
                  >
                    Inquire for Service
                  </Link>
                </div>
              </div>

              {/* Features List */}
              <div className="pt-6 border-t border-white/[0.06]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Scope & Technical Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Scope Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EstimateForm />
      </section>
    </div>
  );
}
