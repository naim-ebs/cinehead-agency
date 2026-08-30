'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Settings, 
  Save, 
  Sparkles, 
  Globe, 
  Image as ImageIcon, 
  Search, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  ExternalLink,
  Calculator,
  Plus,
  Trash2,
  DollarSign
} from 'lucide-react';
import { SiteSettingsType, DEFAULT_SITE_SETTINGS, EstimatorServiceItem, EstimatorTimelineItem } from '@/lib/seedData';
import ImageUpload from '@/components/ImageUpload';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsType>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'contact' | 'pricing' | 'social'>('general');
  const [keywordsInput, setKeywordsInput] = useState('');

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load settings');
        return res.json();
      })
      .then((data) => {
        if (data && data.siteName) {
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            estimatorServices: data.estimatorServices && data.estimatorServices.length > 0 
              ? data.estimatorServices 
              : DEFAULT_SITE_SETTINGS.estimatorServices,
            estimatorTimelines: data.estimatorTimelines && data.estimatorTimelines.length > 0 
              ? data.estimatorTimelines 
              : DEFAULT_SITE_SETTINGS.estimatorTimelines,
          });
          setKeywordsInput((data.metaKeywords || []).join(', '));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const keywordsArray = keywordsInput
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      const payload = {
        ...settings,
        metaKeywords: keywordsArray,
      };

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type');
      let data: any = {};
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        if (!res.ok) {
          throw new Error(res.status === 401 ? 'Session expired. Please log in again.' : `Server error (${res.status})`);
        }
      }

      if (!res.ok) {
        throw new Error(data.error || `Failed to save settings (${res.status})`);
      }

      if (data.settings) {
        setSettings({
          ...DEFAULT_SITE_SETTINGS,
          ...data.settings,
        });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('site-settings-updated', { detail: data.settings }));
        }
      }
      setIsError(false);
      setMessage('Agency site settings, pricing & SEO updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error saving settings';
      setIsError(true);
      setMessage(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  // Helper functions for Estimator Services
  const addService = () => {
    const newId = `srv-${Date.now()}`;
    const newService: EstimatorServiceItem = {
      id: newId,
      label: 'New Capability / Film Service',
      base: 2500,
    };
    setSettings({
      ...settings,
      estimatorServices: [...(settings.estimatorServices || []), newService],
    });
  };

  const updateService = (index: number, field: keyof EstimatorServiceItem, value: any) => {
    const updated = [...(settings.estimatorServices || [])];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, estimatorServices: updated });
  };

  const removeService = (index: number) => {
    const updated = [...(settings.estimatorServices || [])];
    if (updated.length <= 1) {
      alert('At least one capability service must remain.');
      return;
    }
    updated.splice(index, 1);
    setSettings({ ...settings, estimatorServices: updated });
  };

  // Helper functions for Estimator Timelines
  const addTimeline = () => {
    const newId = `time-${Date.now()}`;
    const newTimeline: EstimatorTimelineItem = {
      id: newId,
      label: 'Custom Timeline',
      mult: 1.0,
    };
    setSettings({
      ...settings,
      estimatorTimelines: [...(settings.estimatorTimelines || []), newTimeline],
    });
  };

  const updateTimeline = (index: number, field: keyof EstimatorTimelineItem, value: any) => {
    const updated = [...(settings.estimatorTimelines || [])];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, estimatorTimelines: updated });
  };

  const removeTimeline = (index: number) => {
    const updated = [...(settings.estimatorTimelines || [])];
    if (updated.length <= 1) {
      alert('At least one timeline option must remain.');
      return;
    }
    updated.splice(index, 1);
    setSettings({ ...settings, estimatorTimelines: updated });
  };

  const currency = settings.currencySymbol || '$';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-600/20 text-cyan-400 border border-cyan-500/30 mb-2">
            <Settings className="w-3 h-3" />
            <span>Dynamic CMS Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Agency Settings & Estimator Pricing
          </h1>
          <p className="text-sm text-slate-400">
            Manage site titles, dynamic logo, favicon, estimator capabilities, pricing multipliers, SEO tags, and contact info.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all disabled:opacity-50"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-x-auto">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'general'
              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Brand, Logo & Favicon</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'pricing'
              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Estimator & Pricing Capabilities</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'seo'
              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>SEO & Social Cards</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'contact'
              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Studio Contact Channels</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'social'
              ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social & Analytics</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
          isError ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
        }`}>
          {isError ? <AlertCircle className="w-4 h-4 shrink-0 text-red-400" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
          <span className="font-semibold">{message}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Tab 1: Brand & Logo & Favicon */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Brand Identity, Logo & Favicon Configuration</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Agency Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Cine Head"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Cinema & Code"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  Navbar Text Logo (Optional if custom image is used)
                </label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. CINEHEAD"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <ImageUpload
                  label="Custom Brand Logo Image"
                  hint="Upload transparent PNG/SVG logo to Cloudinary"
                  value={settings.logoImageUrl || ''}
                  onChange={(url) => setSettings({ ...settings, logoImageUrl: url })}
                  aspectRatio="square"
                />

                <ImageUpload
                  label="Browser Tab Favicon"
                  hint="Upload 32x32 or 64x64 favicon icon/image"
                  value={settings.faviconUrl || ''}
                  onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                  aspectRatio="square"
                  required
                />
              </div>
            </div>

            {/* Live Previews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Logo Preview Box */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">
                  Live Navbar Brand Preview
                </span>
                <div className="p-4 rounded-2xl bg-[#040817] border border-white/[0.08] inline-flex items-center gap-3">
                  {settings.logoImageUrl ? (
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/[0.1]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={settings.logoImageUrl} 
                        alt={settings.siteName} 
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[1px] flex items-center justify-center">
                      <div className="w-full h-full bg-[#050B18] rounded-[11px] flex items-center justify-center text-cyan-400 font-bold text-sm">
                        🎬
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="font-extrabold text-lg text-white tracking-wider">
                      {settings.logoText || settings.siteName}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-medium block">
                      {settings.tagline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Browser Tab Favicon Preview */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">
                  Live Browser Tab Favicon Preview
                </span>
                <div className="p-3.5 rounded-2xl bg-[#1e2029] border border-white/[0.08] max-w-sm flex items-center gap-3">
                  <div className="relative w-5 h-5 rounded overflow-hidden shrink-0 bg-black/40 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={settings.faviconUrl || '/favicon.ico'} 
                      alt="Favicon" 
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-medium text-slate-200 truncate block">
                      {settings.siteName} • {settings.tagline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Estimator Capabilities & Pricing Manager */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Currency & Section Titles */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <span>Currency & Estimator Titles</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Currency Symbol *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={settings.currencySymbol || '$'}
                      onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                      className="w-24 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-bold text-center focus:outline-none focus:border-cyan-400"
                      placeholder="$"
                    />
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['$', '৳', '£', '€', 'AED'].map((sym) => (
                        <button
                          type="button"
                          key={sym}
                          onClick={() => setSettings({ ...settings, currencySymbol: sym })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                            (settings.currencySymbol || '$') === sym
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white'
                          }`}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Currency Code (e.g. USD, BDT, EUR)
                  </label>
                  <input
                    type="text"
                    value={settings.currencyCode || 'USD'}
                    onChange={(e) => setSettings({ ...settings, currencyCode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono uppercase focus:outline-none focus:border-cyan-400"
                    placeholder="USD"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-white/[0.06]">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Estimator Main Heading
                  </label>
                  <input
                    type="text"
                    value={settings.contactHeading || "Let's Build Something Iconic"}
                    onChange={(e) => setSettings({ ...settings, contactHeading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Estimator Subheading
                  </label>
                  <input
                    type="text"
                    value={settings.contactSubheading || 'Select your required capabilities and timeline to calculate an immediate baseline estimate.'}
                    onChange={(e) => setSettings({ ...settings, contactSubheading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Estimator Capabilities & Base Prices List */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-cyan-400" />
                    <span>Select Required Capabilities & Base Prices</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add or modify production capabilities and their starting baseline price in {currency}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Capability</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings.estimatorServices || []).map((srv, idx) => (
                  <div 
                    key={srv.id || idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Capability Label
                      </label>
                      <input
                        type="text"
                        required
                        value={srv.label}
                        onChange={(e) => updateService(idx, 'label', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. 8K Cinema & Commercials"
                      />
                    </div>

                    <div className="w-full sm:w-44 space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Base Starting Price ({currency})
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-400">
                          {currency}
                        </span>
                        <input
                          type="number"
                          required
                          min={0}
                          value={srv.base}
                          onChange={(e) => updateService(idx, 'base', Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono font-bold focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="sm:pt-5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeService(idx)}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete capability"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Timeline & Urgency Multipliers */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span>Production Timeline & Urgency Multipliers</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Define timeline tiers and their pricing multiplier (e.g. 1.3 = +30% for rush, 1.0 = standard, 0.95 = 5% discount).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addTimeline}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Timeline Option</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings.estimatorTimelines || []).map((time, idx) => (
                  <div 
                    key={time.id || idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Timeline Title
                      </label>
                      <input
                        type="text"
                        required
                        value={time.label}
                        onChange={(e) => updateTimeline(idx, 'label', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Rush (< 2 Weeks)"
                      />
                    </div>

                    <div className="w-full sm:w-44 space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Price Multiplier (1.0 = 100%)
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        required
                        min={0.1}
                        max={5.0}
                        value={time.mult}
                        onChange={(e) => updateTimeline(idx, 'mult', Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs font-mono font-bold focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:pt-5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeTimeline(idx)}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete timeline option"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SEO & Social Sharing Cards */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                <span>Search Engine Optimization (SEO) & Meta Tags</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  Primary SEO Title Tag *
                </label>
                <input
                  type="text"
                  required
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Cine Head • High-End Cinematography & Creative Software Agency"
                />
                <span className="text-[10px] text-slate-500">Recommended: 50-60 characters</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  Meta Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Compelling description for Google and social search results..."
                />
                <span className="text-[10px] text-slate-500">Recommended: 120-160 characters</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  SEO Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="Cinematography, 8K Video, ARRI Alexa 35, Next.js, WebGL..."
                />
              </div>

              <ImageUpload
                label="OpenGraph Social Share Image (1200x630 px)"
                hint="Upload high-res banner for Facebook, LinkedIn, Twitter/X and WhatsApp previews"
                value={settings.ogImageUrl || ''}
                onChange={(url) => setSettings({ ...settings, ogImageUrl: url })}
                aspectRatio="wide"
                required
              />
            </div>

            {/* Live Search Engine Preview */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Google Search Result Snippet Preview</span>
              </span>

              <div className="p-5 rounded-2xl bg-[#202124] border border-white/[0.08] max-w-xl space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                  <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] text-black font-bold">C</span>
                  <span className="text-[11px] truncate">https://cinehead.agency</span>
                </div>
                <h3 className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium line-clamp-1">
                  {settings.metaTitle || 'Cine Head Agency'}
                </h3>
                <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                  {settings.metaDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Studio Contact Info */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Official Studio Contact Channels</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Public Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="hello@cinehead.agency"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="+880 1700-CINEHD"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  Studio Headquarters & Locations
                </label>
                <input
                  type="text"
                  value={settings.contactAddress}
                  onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="Gulshan-2 Cinema Hub, Dhaka & London Production Unit"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Social Networks & Analytics */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <span>Social Profiles & Analytics Telemetry</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.instagram || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://instagram.com/cinehead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Vimeo URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.vimeo || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, vimeo: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://vimeo.com/cinehead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    YouTube URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.youtube || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://youtube.com/@cinehead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.linkedin || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://linkedin.com/company/cinehead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    GitHub URL (Software Division)
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.github || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://github.com/cinehead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Twitter / X URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks?.twitter || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://x.com/cinehead"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                  Google Analytics Measurement ID (GA4)
                </label>
                <input
                  type="text"
                  value={settings.googleAnalyticsId || ''}
                  onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
