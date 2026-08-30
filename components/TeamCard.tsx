'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Camera, Instagram, Linkedin, Github, Video } from 'lucide-react';
import { TeamMemberType } from '@/lib/seedData';

interface TeamCardProps {
  member: TeamMemberType;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover flex flex-col transition-all duration-300 border border-white/[0.08] hover:border-cyan-500/40">
      {/* Avatar / Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070D22]">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A1C] via-[#050A1C]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

        {/* Floating Role Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#040817]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/20 shadow-md">
            {member.titleTag.split('/')[0].trim()}
          </span>
        </div>

        {/* Floating Bottom Name & Specialty */}
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <Link href={`/team/${member.slug}`}>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{member.name}</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 -translate-y-1 transition-all" />
            </h3>
          </Link>
          <p className="text-xs text-slate-300 font-medium line-clamp-1">
            {member.role}
          </p>
        </div>
      </div>

      {/* Details & Gear Summary */}
      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed italic">
          "{member.quote || member.bio.slice(0, 100) + '...'}"
        </p>

        {/* Primary Gear Highlights */}
        {member.primaryGear && member.primaryGear.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>Primary Kit & Rig</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {member.primaryGear.slice(0, 2).map((gear, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.06] truncate max-w-[200px]"
                >
                  {gear}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links & Detail Page CTA */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            {member.socials?.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <Link
            href={`/team/${member.slug}`}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Full Profile</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
