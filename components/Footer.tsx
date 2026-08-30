'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, ArrowUpRight, Instagram, Linkedin, Github, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { SiteSettingsType, DEFAULT_SITE_SETTINGS } from '@/lib/seedData';
import Image from 'next/image';

export default function Footer({ initialSettings }: { initialSettings?: SiteSettingsType }) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettingsType>(initialSettings || DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
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
  }, [initialSettings, pathname]);

  // Hide footer on admin panel
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030712] overflow-hidden pt-20 pb-12">
      {/* Background ambient light */}
      <div className="ambient-glow w-[500px] h-[300px] bg-blue-600/10 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              {settings.logoImageUrl ? (
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/[0.1]">
                  <Image src={settings.logoImageUrl} alt={settings.siteName} fill className="object-contain p-1" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 p-[1px]">
                  <div className="w-full h-full bg-[#050B18] rounded-[11px] flex items-center justify-center">
                    <Film className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
              )}
              <span className="font-extrabold text-xl tracking-wider text-white">
                {settings.logoText ? (
                  <>
                    {settings.logoText.slice(0, 4)}
                    <span className="text-cyan-400">{settings.logoText.slice(4)}</span>
                  </>
                ) : (
                  settings.siteName
                )}
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {settings.metaDescription || 'A high-concept visual production and creative engineering collective. We craft 8K cinema, anamorphic motion pictures, and bespoke digital software applications for visionary brands.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Global Bookings Q3/Q4</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group">
                  <span>Selected Works</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group">
                  <span>Production & Tech Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group">
                  <span>Directors & Engineers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group">
                  <span>Studio Philosophy & Gear</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• ARRI Alexa 35 & 8K Cinema</li>
              <li>• Anamorphic Optics & Steadicam</li>
              <li>• Heavy-Lift 8K Aerial Drone</li>
              <li>• Dolby Vision Color Grading</li>
              <li>• Next.js & WebGL 3D Platforms</li>
              <li>• Enterprise Cloud Software</li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              Studio Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{settings.contactAddress || 'Gulshan-2 Cinema Hub, Dhaka & London Production Unit'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{settings.contactEmail || 'hello@cinehead.agency'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{settings.contactPhone || '+880 1700-CINEHD'}</span>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CINE HEAD Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
