import React from 'react';
import Link from 'next/link';
import { getProjects, getTeamMembers, getInquiries } from '@/lib/db';
import { 
  Video, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  Sparkles,
  Clock,
  Eye,
  Layers
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const projects = await getProjects();
  const team = await getTeamMembers();
  const inquiries = await getInquiries();

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-600/20 text-cyan-400 border border-cyan-500/30 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Studio Production Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Agency Overview
          </h1>
          <p className="text-sm text-slate-400">
            Real-time management for Cine Head productions, team roster, and client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Film / Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Projects */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Works & Films
            </span>
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-500/30">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white font-mono">{projects.length}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-cyan-400 font-semibold">{projects.filter(p => p.featured).length}</span> featured on homepage
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Crew & Engineers
            </span>
            <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white font-mono">{team.length}</p>
            <p className="text-xs text-slate-400 mt-1">
              All with public detail profiles
            </p>
          </div>
        </div>

        {/* Client Inquiries */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Client Inquiries
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white font-mono">{inquiries.length}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <span>{newInquiriesCount} requiring action</span>
            </p>
          </div>
        </div>

        {/* Live System Status */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Database Engine
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold text-emerald-400 font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Ready</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Auto-Seed & MongoDB Connected
            </p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries and Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Inquiries List */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Recent Production Briefings</span>
            </h2>
            <Link href="/admin/inquiries" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
              View All ({inquiries.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id || inq._id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{inq.name}</p>
                    {inq.company && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-slate-400">
                        {inq.company}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">{inq.projectType}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{inq.details}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                    inq.status === 'new' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {inq.status}
                  </span>
                  <p className="text-[11px] font-mono text-slate-400">{inq.budgetRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Works Overview */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Active Works Portfolio</span>
            </h2>
            <Link href="/admin/projects" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
              Manage Works ({projects.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id || proj._id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white line-clamp-1">{proj.title}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-cyan-400">{proj.category}</span>
                    <span>•</span>
                    <span>{proj.client}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
