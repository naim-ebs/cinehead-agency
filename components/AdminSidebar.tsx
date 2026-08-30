'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Film,
  LayoutDashboard,
  Video,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const ADMIN_LINKS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects & Reels', href: '/admin/projects', icon: Video },
  { label: 'Team Members', href: '/admin/team', icon: Users },
  { label: 'Client Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Site Settings & SEO', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (pathname === '/admin/login') {
    return null;
  }

  return (
    <aside className="w-64 bg-[#050A1C] border-r border-white/[0.08] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5 overflow-y-auto z-40">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#050B18] rounded-[11px] flex items-center justify-center">
                <Film className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className='flex flex-col leading-none'>
              <span className="font-extrabold text-sm tracking-wider text-white block">
                CINE<span className="text-cyan-400">HEAD</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono">
                CMS CONTROL
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${active
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer & Actions */}
      <div className="space-y-3 pt-6 border-t border-white/[0.08]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-slate-300 hover:text-white text-xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Live Website</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
