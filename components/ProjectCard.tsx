'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowUpRight, Film, Sparkles, Layers } from 'lucide-react';
import { ProjectType } from '@/lib/seedData';

interface ProjectCardProps {
  project: ProjectType;
  onPlayReel?: (videoUrl: string, title: string) => void;
}

export default function ProjectCard({ project, onPlayReel }: ProjectCardProps) {
  const isWebCategory = project.category === 'Web & Digital';

  return (
    <div className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover flex flex-col transition-all duration-300 border border-white/[0.08] hover:border-cyan-500/40">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070D22]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A1C] via-[#050A1C]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#040817]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/20 shadow-md">
            {isWebCategory ? <Layers className="w-3 h-3 text-cyan-400" /> : <Film className="w-3 h-3 text-cyan-400" />}
            <span>{project.category}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-slate-300 bg-white/[0.08] backdrop-blur-md border border-white/[0.1]">
            {project.year}
          </span>
        </div>

        {/* Quick Play Reel Overlay Button */}
        {project.videoUrl && onPlayReel && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPlayReel(project.videoUrl, project.title);
            }}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan-500/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:bg-cyan-400"
            aria-label="Play project video"
          >
            <Play className="w-6 h-6 fill-white text-white ml-0.5" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-slate-300 tracking-wide">{project.client}</span>
            {project.aspectRatio && (
              <span className="text-[11px] font-mono text-cyan-400/80">{project.aspectRatio}</span>
            )}
          </div>

          <Link href={`/projects/${project.slug}`} className="block group-hover:text-cyan-300 transition-colors">
            <h3 className="text-xl font-bold tracking-tight text-white line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Camera Gear / Tech Tags */}
        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
          {(project.cameraGear?.slice(0, 2) || project.techStack?.slice(0, 2) || []).map((gear, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.05]"
            >
              {gear}
            </span>
          ))}

          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-1"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
