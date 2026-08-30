import React from 'react';
import { Sparkles } from 'lucide-react';
import TeamCard from '@/components/TeamCard';
import { getTeamMembers } from '@/lib/db';

export const metadata = {
  title: 'Directors & Engineers • Team Roster',
  description: 'Meet the cinematographers, colorists, film directors, and creative technologists behind Cine Head.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Minds Behind the Lens & Code</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Directors, DPs & Engineers
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          A multidisciplinary collective dedicated to optical excellence, precision camera motion, and high-performance creative software engineering.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <TeamCard key={member.id || member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
