'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Video, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  X, 
  Save, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProjectType } from '@/lib/seedData';
import ImageUpload from '@/components/ImageUpload';

const CATEGORIES = ['Cinematography', 'Commercial', 'Music Video', 'Web & Digital', 'Documentary'];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectType>>({
    title: '',
    slug: '',
    category: 'Cinematography',
    client: '',
    year: '2026',
    duration: '',
    aspectRatio: '2.39:1 Anamorphic',
    thumbnail: '',
    videoUrl: '',
    description: '',
    synopsis: '',
    director: 'Aryan Vance',
    cinematographer: 'Naim Rahman',
    featured: false,
    cameraGear: ['ARRI Alexa 35', 'Atlas Orion Anamorphic'],
  });

  const [gearInput, setGearInput] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Cinematography',
      client: '',
      year: new Date().getFullYear().toString(),
      duration: '3m 45s',
      aspectRatio: '2.39:1 Anamorphic',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: '',
      synopsis: '',
      director: 'Aryan Vance',
      cinematographer: 'Naim Rahman',
      featured: true,
      cameraGear: ['ARRI Alexa 35', 'Atlas Anamorphic 40mm'],
    });
    setGearInput('ARRI Alexa 35, Atlas Anamorphic 40mm');
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectType) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setGearInput((proj.cameraGear || []).join(', '));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const gearArray = gearInput
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        cameraGear: gearArray,
      };

      const isEdit = !!editingProject;
      const targetId = editingProject?._id || editingProject?.id || editingProject?.slug;
      const url = isEdit ? `/api/projects/${targetId}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Operation failed');

      setMessage(isEdit ? 'Project updated successfully!' : 'New project published!');
      setTimeout(() => {
        setModalOpen(false);
        setMessage('');
        fetchProjects();
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('Error saving project. Please check inputs.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (proj: ProjectType) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${proj.title}"?`);
    if (!confirmDelete) return;

    try {
      const targetId = proj._id || proj.id || proj.slug;
      const res = await fetch(`/api/projects/${targetId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.client.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Projects & Showreels
          </h1>
          <p className="text-sm text-slate-400">
            Add, update, or feature cinematic productions and digital web apps.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/[0.08]">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'All' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table / Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full inline-block animate-spin mb-3" />
          <p>Loading projects from database...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 rounded-3xl glass-panel border border-white/[0.08] text-slate-400 space-y-3">
          <Video className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm">No projects match the selected criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id || proj._id}
              className="rounded-3xl overflow-hidden glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] bg-black">
                <Image
                  src={proj.thumbnail}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A1C] to-transparent opacity-80" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#040817]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/20">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-slate-400">{proj.client} • {proj.year}</p>
                  <h3 className="text-base font-bold text-white line-clamp-1">{proj.title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <a
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>Preview Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors"
                      aria-label="Edit project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj)}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-red-500/20 hover:text-red-300 text-slate-300 transition-colors"
                      aria-label="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#070D22] border border-cyan-500/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>{editingProject ? 'Edit Project' : 'Create New Project'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full bg-white/[0.05] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Neon Odyssey"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">URL Slug (Auto-generated if blank)</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. neon-odyssey"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A1C] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Client / Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.client || ''}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Aura Motion Pictures"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Year</label>
                  <input
                    type="text"
                    value={formData.year || '2026'}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <ImageUpload
                  label="Project Cover / Poster Image"
                  hint="Upload 4K film poster or project still directly to Cloudinary"
                  value={formData.thumbnail || ''}
                  onChange={(url) => setFormData({ ...formData, thumbnail: url })}
                  aspectRatio="video"
                  required
                />

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Video Stream URL (YouTube / Vimeo / MP4 Direct Link) *</label>
                  <input
                    type="url"
                    required
                    value={formData.videoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                  />
                  <p className="text-[10px] text-slate-500">Supports Vimeo 4K, YouTube, and direct .mp4/.webm video links.</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Primary Camera & Tech Gear (comma separated)</label>
                <input
                  type="text"
                  value={gearInput}
                  onChange={(e) => setGearInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. ARRI Alexa 35, Atlas Orion Anamorphic 40mm, DJI Ronin 2"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Short Summary / Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Atmospheric visual study exploring neon refractions..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Full Behind-the-Scenes Synopsis</label>
                <textarea
                  rows={3}
                  value={formData.synopsis || ''}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Shot across four rain-soaked nights in Tokyo..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 bg-white/[0.05] border-white/20"
                  />
                  <span>Feature on Homepage Spotlight</span>
                </label>
              </div>

              {message && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  message.includes('Error') ? 'bg-red-500/10 text-red-300' : 'bg-emerald-500/10 text-emerald-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
