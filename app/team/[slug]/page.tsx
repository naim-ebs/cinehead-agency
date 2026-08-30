import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTeamMemberBySlug, getTeamMembers } from '@/lib/db';
import { 
  Camera, 
  Film, 
  ArrowLeft, 
  Instagram, 
  Linkedin, 
  Github, 
  Video, 
  Mail, 
  Quote, 
  Award, 
  Sparkles, 
  CheckCircle,
  ExternalLink 
} from 'lucide-react';
import TeamCard from '@/components/TeamCard';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps) {
  const member = await getTeamMemberBySlug(params.slug);
  if (!member) return { title: 'Member Not Found' };

  return {
    title: `${member.name} • ${member.role} | Cine Head`,
    description: member.bio,
    openGraph: {
      title: `${member.name} - Cine Head Collective`,
      description: member.bio,
      images: [{ url: member.avatar }],
    },
  };
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const member = await getTeamMemberBySlug(params.slug);
  if (!member) notFound();

  const allMembers = await getTeamMembers();
  const otherMembers = allMembers.filter((m) => m.slug !== member.slug).slice(0, 3);

  return (
    <div className="pt-28 pb-24 space-y-16 animate-fade-in">
      {/* Top Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Members</span>
        </Link>
      </div>

      {/* Member Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/20 relative overflow-hidden">
          <div className="ambient-glow w-96 h-96 bg-cyan-500/10 top-0 right-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center relative z-10">
            {/* Avatar Portrait */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-white/[0.1] shadow-2xl">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                priority
                className="object-cover object-top"
              />
            </div>

            {/* Profile Intro */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-600/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {member.titleTag}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {member.name}
                </h1>
                <p className="text-cyan-400 font-medium text-sm sm:text-base">
                  {member.role}
                </p>
              </div>

              {/* Personal Manifesto Quote */}
              {member.quote && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                  <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 italic">
                    "{member.quote}"
                  </p>
                </div>
              )}

              {/* Specialties */}
              {member.specialties && member.specialties.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Core Specializations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs bg-white/[0.04] border border-white/[0.08] text-slate-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Inquiries</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative & Equipment Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Biography & Filmography (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Biography */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Biography & Background</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {member.bio}
              </p>
            </div>

            {/* Filmography & Projects Table */}
            {member.filmography && member.filmography.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-cyan-400" />
                  <span>Selected Filmography & Production Credits</span>
                </h3>

                <div className="rounded-2xl overflow-hidden glass-panel border border-white/[0.08]">
                  <div className="divide-y divide-white/[0.06]">
                    {member.filmography.map((film, idx) => (
                      <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                        <div>
                          <h4 className="text-sm font-bold text-white">{film.title}</h4>
                          <p className="text-xs text-cyan-400">{film.role}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-slate-400 block">{film.year}</span>
                          <span className="text-[10px] uppercase text-slate-500 tracking-wider">{film.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Equipment Locker (Right 1 col) */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>Primary Kit & Equipment Locker</span>
              </h3>
              <p className="text-xs text-slate-400">
                Core packages and optical rigs utilized by {member.name.split(' ')[0]} on commercial shoots and productions.
              </p>

              <div className="space-y-2 pt-2">
                {(member.primaryGear || []).map((gear, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-200 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{gear}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Booking Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 text-center space-y-4">
              <h4 className="text-base font-bold text-white">Book {member.name}</h4>
              <p className="text-xs text-slate-300">
                Available for worldwide direct DP bookings, commercial direction, and creative tech consultations.
              </p>
              <Link
                href="/contact"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Request Availability
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Other Members */}
      {otherMembers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Other Team Members</h2>
            <Link href="/team" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMembers.map((m) => (
              <TeamCard key={m.id || m._id} member={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
