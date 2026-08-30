'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Video, Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ShowreelModal from '@/components/ShowreelModal';
import { ProjectType } from '@/lib/seedData';

const CATEGORIES = ['All', 'Cinematography', 'Commercial', 'Music Video', 'Web & Digital', 'Documentary'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: '',
    title: '',
  });

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePlayReel = (videoUrl: string, title: string) => {
    setActiveModal({ open: true, url: videoUrl, title });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = category === 'All' || p.category === category;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.client.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Selected Film & Digital Works
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From 8K anamorphic commercials and Sundance-nominated documentaries to high-throughput Next.js & WebGL software platforms.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl glass-panel border border-white/[0.08]">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search projects or gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">
          <span className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full inline-block animate-spin mb-3" />
          <p>Loading curated works...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-24 rounded-3xl glass-panel border border-white/[0.08] text-slate-400 space-y-3">
          <Video className="w-12 h-12 mx-auto text-slate-600" />
          <p className="text-base font-medium text-slate-300">No projects found</p>
          <p className="text-xs">Try selecting another category or refining your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id || project._id}
              project={project}
              onPlayReel={handlePlayReel}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ShowreelModal
        isOpen={activeModal.open}
        onClose={() => setActiveModal({ ...activeModal, open: false })}
        videoUrl={activeModal.url}
        title={activeModal.title}
      />
    </div>
  );
}
