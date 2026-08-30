'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  X, 
  Save, 
  Camera, 
  CheckCircle2 
} from 'lucide-react';
import { TeamMemberType } from '@/lib/seedData';
import ImageUpload from '@/components/ImageUpload';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberType[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberType | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<TeamMemberType>>({
    name: '',
    slug: '',
    role: 'Director of Photography',
    titleTag: 'Lead DP & Creative Technologist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: '',
    quote: '',
    specialties: [],
    primaryGear: [],
    socials: { instagram: '', vimeo: '', linkedin: '', email: '' },
    featured: true,
  });

  const [gearInput, setGearInput] = useState('');
  const [specialtiesInput, setSpecialtiesInput] = useState('');

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/team');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTeam(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      slug: '',
      role: 'Cinematographer & Colorist',
      titleTag: 'Senior Cinematographer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      bio: '',
      quote: '',
      featured: true,
      socials: { instagram: 'https://instagram.com', email: 'hello@cinehead.com' },
    });
    setGearInput('ARRI Alexa 35, Cooke S4/i Prime Lenses');
    setSpecialtiesInput('Anamorphic Cinematography, ACES Color Science');
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMemberType) => {
    setEditingMember(member);
    setFormData({ ...member });
    setGearInput((member.primaryGear || []).join(', '));
    setSpecialtiesInput((member.specialties || []).join(', '));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const gearArray = gearInput.split(',').map((g) => g.trim()).filter(Boolean);
      const specsArray = specialtiesInput.split(',').map((s) => s.trim()).filter(Boolean);

      const payload = {
        ...formData,
        primaryGear: gearArray,
        specialties: specsArray,
      };

      const isEdit = !!editingMember;
      const targetId = editingMember?._id || editingMember?.id || editingMember?.slug;
      const url = isEdit ? `/api/team/${targetId}` : '/api/team';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Operation failed');

      setMessage(isEdit ? 'Team member updated!' : 'Team member added!');
      setTimeout(() => {
        setModalOpen(false);
        setMessage('');
        fetchTeam();
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('Error saving team profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: TeamMemberType) => {
    const confirmDelete = window.confirm(`Remove "${member.name}" from team roster?`);
    if (!confirmDelete) return;

    try {
      const targetId = member._id || member.id || member.slug;
      const res = await fetch(`/api/team/${targetId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTeam();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Team & Crew Roster
          </h1>
          <p className="text-sm text-slate-400">
            Manage public team profiles, primary camera lockers, and individual detail pages.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full inline-block animate-spin mb-3" />
          <p>Loading team members...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id || member._id}
              className="rounded-3xl overflow-hidden glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A1C] to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    {member.titleTag}
                  </span>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {member.primaryGear && member.primaryGear.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.primaryGear.slice(0, 2).map((g, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <a
                    href={`/team/${member.slug}`}
                    target="_blank"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-colors"
                      aria-label="Edit member"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-red-500/20 hover:text-red-300 text-slate-300 transition-colors"
                      aria-label="Delete member"
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

      {/* Team Member Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#070D22] border border-cyan-500/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>{editingMember ? 'Edit Team Profile' : 'Add Team Member'}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-full bg-white/[0.05] text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Naim Rahman"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Slug (e.g. naim-rahman)</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. naim-rahman"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Primary Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Director of Photography & Co-Founder"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Title Badge *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleTag || ''}
                    onChange={(e) => setFormData({ ...formData, titleTag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Lead DP & Technologist"
                  />
                </div>
              </div>

              <ImageUpload
                label="Director / Technologist Portrait Photo"
                hint="Upload profile headshot directly to Cloudinary"
                value={formData.avatar || ''}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
                aspectRatio="square"
                required
              />

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Primary Camera & Gear Kit (comma separated)</label>
                <input
                  type="text"
                  value={gearInput}
                  onChange={(e) => setGearInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="ARRI Alexa 35, Atlas Orion Anamorphic, DJI Inspire 3 Drone"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Specialties (comma separated)</label>
                <input
                  type="text"
                  value={specialtiesInput}
                  onChange={(e) => setSpecialtiesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="Anamorphic Cinematography, Virtual Production, Next.js WebGL"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Biography *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Over a decade behind cinema viewfinders and terminal screens..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Personal Manifesto / Quote</label>
                <input
                  type="text"
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-cyan-400"
                  placeholder="Cinema is light sculpted through glass..."
                />
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
                      <span>{editingMember ? 'Update Profile' : 'Save Member'}</span>
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
