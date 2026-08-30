'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Film, 
  Code2, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Palette, 
  Layers, 
  Play, 
  ChevronRight, 
  Quote, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ClientMarquee from '@/components/ClientMarquee';
import ProjectCard from '@/components/ProjectCard';
import TeamCard from '@/components/TeamCard';
import EstimateForm from '@/components/EstimateForm';
import ShowreelModal from '@/components/ShowreelModal';
import { ProjectType, TeamMemberType, INITIAL_TESTIMONIALS } from '@/lib/seedData';

const FILTER_TABS = ['All', 'Cinematography', 'Commercial', 'Music Video', 'Web & Digital'];

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [team, setTeam] = useState<TeamMemberType[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [activeModal, setActiveModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: '',
    title: '',
  });

  useEffect(() => {
    // Fetch projects and team with fresh data
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error);

    fetch('/api/team', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTeam(data);
      })
      .catch(console.error);
  }, []);

  const handlePlayReel = (videoUrl: string, title: string) => {
    setActiveModal({ open: true, url: videoUrl, title });
  };

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Client & Festival Marquee */}
      <ClientMarquee />

      {/* 3. The Hybrid Agency Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl glass-panel border border-cyan-500/20 relative overflow-hidden">
          {/* Subtle Ambient light */}
          <div className="ambient-glow w-96 h-96 bg-blue-600/10 top-0 right-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Cine Head Difference</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Where Optical Physics Meets{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                  Digital Architecture.
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Traditional video agencies lack software engineering skills. Traditional dev agencies don’t know how to light an ARRI anamorphic sensor. 
                <br /><br />
                <strong>Cine Head is built differently.</strong> We shoot Hollywood-grade cinema commercials and engineer blisteringly fast Next.js & WebGL platforms to showcase them to the world.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Film className="w-4 h-4" />
                    <span>Cinematic Wing</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ARRI Alexa 35, Atlas Anamorphic, Steadicam, heavy-lift 8K aerial drones, and ACES / Dolby Vision color grading.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Code2 className="w-4 h-4" />
                    <span>Creative Software</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Next.js App Router, Three.js WebGL spatial experiences, Cloudinary video streaming, and 99+ Lighthouse performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"
                alt="Cinema Camera Rig"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#050A1C]/80 backdrop-blur-xl border border-white/[0.1] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    Integrated Production Pipeline
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    From 8K Sensor RAW to Production Cloud Deployment
                  </p>
                </div>
                <Link
                  href="/about"
                  className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors shrink-0 ml-3"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Explore our award-winning films, commercial campaigns, music videos, and bespoke software experiences.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id || project._id}
              project={project}
              onPlayReel={handlePlayReel}
            />
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-semibold border border-white/[0.1] hover:border-cyan-400/40 transition-all"
          >
            <span>View All Works & Complete Archive</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* 5. Team Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            The Collective
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet the Directors & Engineers
          </h2>
          <p className="text-slate-400 text-sm">
            Our core team combines seasoned cinematographers, award-winning colorists, and fullstack creative coders. Click on any member for their dedicated profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard key={member.id || member._id} member={member} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/team"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest inline-flex items-center gap-1.5"
          >
            <span>Explore Full Team Roster & Filmographies</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Client Accolades
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What Global Leaders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-cyan-400/40" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/30">
                  <Image
                    src={t.avatar}
                    alt={t.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                  <p className="text-[11px] text-slate-400">{t.clientRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Interactive Project Estimator CTA */}
      <section id="estimate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EstimateForm />
      </section>

      {/* Video Modal Lightbox */}
      <ShowreelModal
        isOpen={activeModal.open}
        onClose={() => setActiveModal({ ...activeModal, open: false })}
        videoUrl={activeModal.url}
        title={activeModal.title}
      />
    </div>
  );
}
