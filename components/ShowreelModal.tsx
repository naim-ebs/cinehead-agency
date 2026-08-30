'use client';

import React, { useEffect } from 'react';
import { X, Play, Volume2, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export default function ShowreelModal({
  isOpen,
  onClose,
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  title = 'Cine Head - Master Cinematography & Tech Showreel',
}: ShowreelModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Convert standard YouTube/Vimeo URLs to embeddable URLs with autoplay
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&hd=1`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&color=00f0ff&title=0&byline=0&portrait=0`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isDirectVideo = embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#030612]/90 backdrop-blur-3xl transition-opacity"
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden bg-[#070D22] border border-cyan-500/20 shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/20 blur-[60px] pointer-events-none" />

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#040817]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4K Cinema HDR Stream</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400 truncate max-w-md">
              • {title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.15] transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {isDirectVideo ? (
            <video 
              src={embedUrl} 
              controls 
              autoPlay 
              playsInline
              className="w-full h-full object-contain"
            />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8 text-slate-400">
              <Play className="w-12 h-12 mx-auto mb-3 text-cyan-400 animate-bounce" />
              <p className="text-sm">Video feed currently being rendered in 8K DCI.</p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-[#050A1C] border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Dolby 7.1 Master Audio</span>
            </span>
            <span className="hidden md:inline text-slate-500">
              Color Graded in ACES / DaVinci Resolve Studio
            </span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">
            Press ESC to exit
          </span>
        </div>
      </div>
    </div>
  );
}
