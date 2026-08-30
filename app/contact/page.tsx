import React from 'react';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  ArrowRight 
} from 'lucide-react';
import EstimateForm from '@/components/EstimateForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 space-y-20 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Global Production & Tech Bookings</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Let’s Build Something Cinematic.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Whether you need a full 8K cinema crew for a commercial shoot or an enterprise Next.js web application, we are ready to bring your vision to life.
        </p>
      </div>

      {/* Main Estimator & Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EstimateForm />
      </div>

      {/* Studio Location & Direct Channels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-cyan-500/30 w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Studio Headquarters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gulshan-2 Cinema Hub, Dhaka 1212<br />
              London UK Production Affiliate Office
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="p-3 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Direct Production Email</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              hello@cinehead.agency<br />
              producers@cinehead.agency
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Response Commitment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All commercial briefing submissions are evaluated and answered within 24 hours.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
