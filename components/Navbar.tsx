'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

import { SiteSettingsType, DEFAULT_SITE_SETTINGS } from '@/lib/seedData';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ initialSettings }: { initialSettings?: SiteSettingsType }) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettingsType>(initialSettings || DEFAULT_SITE_SETTINGS);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isCurrent = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Don't render public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'py-3 bg-[#040817]/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
        : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white font-bold tracking-tight text-xl"
        >
          {settings.logoImageUrl ? (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/[0.1]">
              <Image
                src={settings.logoImageUrl}
                alt={settings.siteName}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-[#050B18] rounded-[11px] flex items-center justify-center">
                <Film className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          )}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
              {settings.logoText ? (
                <>
                  {settings.logoText.slice(0, 4)}
                  <span className="text-cyan-400">{settings.logoText.slice(4)}</span>
                </>
              ) : (
                settings.siteName
              )}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-medium">
              {settings.tagline || 'Cinema & Code'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${pathname === '/'
              ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => {
            const active = isCurrent(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${active
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#060D20] rounded-full transition-all duration-300 group-hover:bg-transparent">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-200 hover:text-white hover:bg-white/[0.1]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#070E24]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === '/' ? 'bg-blue-600/30 text-cyan-300' : 'text-slate-300 hover:bg-white/[0.05]'
                }`}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isCurrent(link.href) ? 'bg-blue-600/30 text-cyan-300' : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.08]">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book a Production</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
