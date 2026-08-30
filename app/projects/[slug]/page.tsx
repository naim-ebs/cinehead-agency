import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { 
  Film, 
  Camera, 
  Award, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  CheckCircle, 
  Eye, 
  Share2 
} from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} • Cine Head Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Cine Head`,
      description: project.description,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  // Video embed converter
  const getEmbedUrl = (url: string) => {
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&hd=1`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?color=00f0ff&title=0&byline=0&portrait=0`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);

  return (
    <div className="pt-28 pb-24 space-y-16 animate-fade-in">
      {/* Top Breadcrumb & Hero Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-600/20 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Client: {project.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
          </div>

          {/* Quick Specs Pill */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            {project.year && (
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-500 block text-[10px] uppercase">Year</span>
                <span className="font-bold text-white">{project.year}</span>
              </div>
            )}
            {project.duration && (
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-500 block text-[10px] uppercase">Format</span>
                <span className="font-bold text-cyan-400">{project.duration}</span>
              </div>
            )}
            {project.aspectRatio && (
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-500 block text-[10px] uppercase">Ratio</span>
                <span className="font-bold text-white">{project.aspectRatio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Video Stream Player */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-black">
          {embedUrl.endsWith('.mp4') ? (
            <video src={embedUrl} controls className="w-full h-full object-cover" />
          ) : (
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Case Study Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Narrative (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Project Vision & Story</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.synopsis || project.description}
              </p>
            </div>

            {/* Behind the Scenes Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Behind-the-Scenes & Stills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-white/[0.08]">
                      <Image
                        src={img}
                        alt={`${project.title} still ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accolades & Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Accolades & Festival Selections</span>
                </h3>
                <div className="space-y-2">
                  {project.awards.map((award, i) => (
                    <p key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{award}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs (Right 1 col) */}
          <div className="space-y-6">
            
            {/* Credits Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Key Creative Personnel
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Director</span>
                  <span className="font-bold text-white text-sm">{project.director}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Director of Photography</span>
                  <span className="font-bold text-white text-sm">{project.cinematographer}</span>
                </div>
                {project.colorist && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Colorist</span>
                    <span className="font-bold text-white text-sm">{project.colorist}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Camera Rig & Tech Stack */}
            <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>Production Gear & Tech</span>
              </h3>
              <div className="space-y-2">
                {(project.cameraGear || project.techStack || []).map((gear, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{gear}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Deliverables Mastered
                </h3>
                <div className="space-y-2">
                  {project.deliverables.map((deliv, idx) => (
                    <p key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 text-center space-y-4">
              <h4 className="text-base font-bold text-white">Have a similar project in mind?</h4>
              <p className="text-xs text-slate-300">
                Let’s craft your next visual story or web software platform.
              </p>
              <Link
                href="/contact"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Inquire for Production
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Related Works */}
      {relatedProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">More Projects</h2>
            <Link href="/projects" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              View All Works →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id || p._id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
