'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Send, CheckCircle2, AlertCircle, Camera, Code2, Film, Palette, Clapperboard, Layers, Sliders } from 'lucide-react';
import { SiteSettingsType, DEFAULT_SITE_SETTINGS, EstimatorServiceItem, EstimatorTimelineItem } from '@/lib/seedData';

// Icon mapper for aesthetic capabilities
const getServiceIcon = (id: string, label: string) => {
  const l = label.toLowerCase();
  if (l.includes('camera') || l.includes('cinema') || l.includes('commercial')) return Camera;
  if (l.includes('web') || l.includes('tech') || l.includes('software') || l.includes('app')) return Code2;
  if (l.includes('color') || l.includes('grade') || l.includes('vision') || l.includes('dolby')) return Palette;
  if (l.includes('music') || l.includes('narrative') || l.includes('film')) return Film;
  if (l.includes('drone') || l.includes('aerial') || l.includes('vfx') || l.includes('cgi')) return Layers;
  return Clapperboard;
};

export default function EstimateForm({ initialSettings }: { initialSettings?: SiteSettingsType }) {
  const [settings, setSettings] = useState<SiteSettingsType>(initialSettings || DEFAULT_SITE_SETTINGS);

  const activeServices: EstimatorServiceItem[] = 
    settings.estimatorServices && settings.estimatorServices.length > 0 
      ? settings.estimatorServices 
      : DEFAULT_SITE_SETTINGS.estimatorServices || [];

  const activeTimelines: EstimatorTimelineItem[] = 
    settings.estimatorTimelines && settings.estimatorTimelines.length > 0 
      ? settings.estimatorTimelines 
      : DEFAULT_SITE_SETTINGS.estimatorTimelines || [];

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const currency = settings.currencySymbol || '$';

  // Initialize selected defaults once services load
  useEffect(() => {
    if (activeServices.length > 0 && selectedServices.length === 0) {
      setSelectedServices([activeServices[0].id]);
    }
    if (activeTimelines.length > 0 && !selectedTimeline) {
      const standardOrFirst = activeTimelines.find((t) => t.id === 'standard') || activeTimelines[0];
      setSelectedTimeline(standardOrFirst.id);
    }
  }, [activeServices, activeTimelines, selectedServices.length, selectedTimeline]);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.siteName) setSettings(data);
      })
      .catch(console.error);

    const handleSettingsUpdated = (e: any) => {
      if (e.detail) setSettings(e.detail);
    };
    window.addEventListener('site-settings-updated', handleSettingsUpdated);
    return () => window.removeEventListener('site-settings-updated', handleSettingsUpdated);
  }, []);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate dynamic estimated range
  const calculateEstimate = () => {
    let baseSum = 0;
    selectedServices.forEach((sId) => {
      const found = activeServices.find((s) => s.id === sId);
      if (found) baseSum += found.base;
    });

    const timeObj = activeTimelines.find((t) => t.id === selectedTimeline);
    const multiplier = timeObj ? timeObj.mult : 1.0;
    const minEst = Math.round((baseSum * multiplier) / 50) * 50;
    const maxEst = Math.round((minEst * 1.75) / 50) * 50;

    return { minEst, maxEst };
  };

  const { minEst, maxEst } = calculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setError('Please fill in your name, email, and project requirements.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const selectedNames = selectedServices
        .map((sId) => activeServices.find((s) => s.id === sId)?.label)
        .filter(Boolean)
        .join(' + ');

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: selectedNames || 'Custom Production',
          budgetRange: `${currency}${minEst.toLocaleString()} - ${currency}${maxEst.toLocaleString()}`,
          timeline: activeTimelines.find((t) => t.id === selectedTimeline)?.label || 'Standard',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', details: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-10">
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-blue-600/20 text-cyan-300 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Production Estimator</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {settings.contactHeading || "Let's Build Something Iconic"}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          {settings.contactSubheading || 'Select your required capabilities and timeline. Receive an immediate baseline estimate and submit your briefing to our producers.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Select Capabilities */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            1. Select Required Capabilities
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeServices.map((srv) => {
              const active = selectedServices.includes(srv.id);
              const Icon = getServiceIcon(srv.id, srv.label);
              return (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3.5 ${
                    active
                      ? 'bg-blue-900/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${active ? 'bg-cyan-500 text-black' : 'bg-white/[0.05] text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs sm:text-sm font-bold ${active ? 'text-white' : 'text-slate-300'}`}>
                      {srv.label}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Starts from {currency}{srv.base.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Production Timeline */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            2. Production Timeline & Urgency
          </label>
          <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(activeTimelines.length || 3, 4)} gap-3`}>
            {activeTimelines.map((time) => {
              const active = selectedTimeline === time.id;
              return (
                <button
                  type="button"
                  key={time.id}
                  onClick={() => setSelectedTimeline(time.id)}
                  className={`p-3.5 rounded-2xl border text-center text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600/30 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                >
                  {time.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimated Price Range Preview */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-blue-950/60 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Estimated Baseline Range ({settings.currencyCode || 'USD'})
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {currency}{minEst.toLocaleString()} <span className="text-slate-400 text-base font-normal">to</span> {currency}{maxEst.toLocaleString()}
            </p>
          </div>
          <div className="text-xs text-slate-400 max-w-xs">
            * Final quotation depends on camera package (ARRI/RED), shooting days, crew scale, and technical software architecture.
          </div>
        </div>

        {/* Step 3: Contact & Brief Inputs */}
        <div className="space-y-4 pt-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            3. Project Brief & Contact Information
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                placeholder="e.g. Christopher Nolan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">Work Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Company / Production House</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                placeholder="e.g. Syncopy Films"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">Phone / WhatsApp</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Tell Us About Your Project & Scope *</label>
            <textarea
              rows={4}
              required
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 resize-none"
              placeholder="Provide a short synopsis, target timeline, locations, or technical requirements..."
            />
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm flex items-start gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">Thank you! Your project brief has been submitted directly to our producers.</p>
              <p className="text-slate-300 text-xs">Our executive production director will review your requirements and respond within 24 hours.</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Production Brief</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
