import mongoose from 'mongoose';
import Project from '@/models/Project';
import TeamMember from '@/models/TeamMember';
import Inquiry from '@/models/Inquiry';
import Service from '@/models/Service';
import SiteSettings from '@/models/SiteSettings';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { 
  INITIAL_PROJECTS, 
  INITIAL_TEAM, 
  INITIAL_SERVICES, 
  DEFAULT_SITE_SETTINGS,
  ProjectType, 
  TeamMemberType, 
  ServiceType, 
  InquiryType,
  SiteSettingsType 
} from './seedData';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
  // eslint-disable-next-line no-var
  var inMemoryStore: {
    projects: ProjectType[];
    team: TeamMemberType[];
    services: ServiceType[];
    inquiries: InquiryType[];
    settings: SiteSettingsType;
    seeded: boolean;
  } | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// In-memory fallback repository for instantaneous out-of-the-box operation
if (!global.inMemoryStore) {
  global.inMemoryStore = {
    projects: INITIAL_PROJECTS.map((p, idx) => ({ ...p, _id: `mem-proj-${idx + 1}`, id: `mem-proj-${idx + 1}` })),
    team: INITIAL_TEAM.map((t, idx) => ({ ...t, _id: `mem-team-${idx + 1}`, id: `mem-team-${idx + 1}` })),
    services: INITIAL_SERVICES.map((s, idx) => ({ ...s, _id: `mem-serv-${idx + 1}`, id: `mem-serv-${idx + 1}` })),
    settings: { ...DEFAULT_SITE_SETTINGS, id: 'mem-settings-1', _id: 'mem-settings-1' },
    inquiries: [
      {
        id: 'mem-inq-1',
        _id: 'mem-inq-1',
        name: 'Alexander Wright',
        email: 'alex@luminafilms.com',
        company: 'Lumina Global',
        phone: '+1 (555) 234-8901',
        projectType: 'Commercial Film & Brand Identity',
        budgetRange: '$25k - $50k',
        timeline: 'Within 2 Months',
        details: 'Looking for a cinematic 8K launch spot with anamorphic lenses and accompanying WebGL digital landing page.',
        status: 'new',
        createdAt: new Date().toISOString()
      }
    ],
    seeded: true,
  };
}

export async function connectDB(): Promise<boolean> {
  if (!MONGODB_URI) {
    return false;
  }

  if (cached.conn) {
    return true;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2500, // Quick fallback if offline
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    await seedDatabaseIfEmpty();
    return true;
  } catch {
    cached.promise = null;
    return false;
  }
}

async function seedDatabaseIfEmpty() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(INITIAL_PROJECTS);
    }

    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(INITIAL_TEAM);
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(INITIAL_SERVICES);
    }

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create(DEFAULT_SITE_SETTINGS);
    }

    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@cinehead.com';
    const existingAdmin = await User.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const defaultPass = process.env.ADMIN_PASSWORD || 'cinehead2026!admin';
      const hashedPassword = await bcrypt.hash(defaultPass, 10);
      await User.create({
        name: 'Cine Head Admin',
        email: defaultEmail,
        password: hashedPassword,
        role: 'admin',
      });
    }
  } catch (err: any) {
    if (err.code !== 11000) {
      console.error('Error during auto-seed check:', err);
    }
  }
}

// ----------------------------------------------------
// UNIFIED DATA REPOSITORY API (Supports both DB & Mock)
// ----------------------------------------------------

export async function getProjects(): Promise<ProjectType[]> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const docs = await Project.find().sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(docs));
    } catch {
      // Fallback
    }
  }
  return global.inMemoryStore!.projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const doc = await Project.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch {
      // Fallback
    }
  }
  const found = global.inMemoryStore!.projects.find((p) => p.slug === slug);
  return found || null;
}

export async function createProject(data: Partial<ProjectType>): Promise<ProjectType> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const created = await Project.create(data);
      return JSON.parse(JSON.stringify(created));
    } catch {
      // fallback
    }
  }
  const newProj: ProjectType = {
    ...data,
    id: `mem-proj-${Date.now()}`,
    _id: `mem-proj-${Date.now()}`,
    title: data.title || 'Untitled Project',
    slug: data.slug || `project-${Date.now()}`,
    category: data.category || 'Cinematography',
    client: data.client || 'Confidential Client',
    year: data.year || new Date().getFullYear().toString(),
    cameraGear: data.cameraGear || [],
    thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    videoUrl: data.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: data.description || '',
    synopsis: data.synopsis || '',
    director: data.director || 'Cine Head',
    cinematographer: data.cinematographer || 'Cine Head DP',
    featured: !!data.featured,
    galleryImages: data.galleryImages || [],
    createdAt: new Date().toISOString(),
  };
  global.inMemoryStore!.projects.unshift(newProj);
  return newProj;
}

export async function updateProject(idOrSlug: string, data: Partial<ProjectType>): Promise<ProjectType | null> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const updated = await Project.findOneAndUpdate(
        { $or: [{ _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }, { slug: idOrSlug }] },
        { $set: data },
        { new: true }
      ).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch {
      // fallback
    }
  }
  const idx = global.inMemoryStore!.projects.findIndex((p) => p._id === idOrSlug || p.id === idOrSlug || p.slug === idOrSlug);
  if (idx !== -1) {
    global.inMemoryStore!.projects[idx] = { ...global.inMemoryStore!.projects[idx], ...data };
    return global.inMemoryStore!.projects[idx];
  }
  return null;
}

export async function deleteProject(idOrSlug: string): Promise<boolean> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await Project.findOneAndDelete({
        $or: [{ _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }, { slug: idOrSlug }],
      });
      return true;
    } catch {
      // fallback
    }
  }
  const idx = global.inMemoryStore!.projects.findIndex((p) => p._id === idOrSlug || p.id === idOrSlug || p.slug === idOrSlug);
  if (idx !== -1) {
    global.inMemoryStore!.projects.splice(idx, 1);
    return true;
  }
  return false;
}

// ----------------------------------------------------
// TEAM REPOSITORY
// ----------------------------------------------------

export async function getTeamMembers(): Promise<TeamMemberType[]> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const docs = await TeamMember.find().sort({ order: 1, createdAt: 1 }).lean();
      return JSON.parse(JSON.stringify(docs));
    } catch {
      // fallback
    }
  }
  return global.inMemoryStore!.team;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMemberType | null> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const doc = await TeamMember.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch {
      // fallback
    }
  }
  const found = global.inMemoryStore!.team.find((t) => t.slug === slug);
  return found || null;
}

export async function createTeamMember(data: Partial<TeamMemberType>): Promise<TeamMemberType> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const created = await TeamMember.create(data);
      return JSON.parse(JSON.stringify(created));
    } catch {
      // fallback
    }
  }
  const newMember: TeamMemberType = {
    ...data,
    id: `mem-team-${Date.now()}`,
    _id: `mem-team-${Date.now()}`,
    name: data.name || 'Team Member',
    slug: data.slug || `member-${Date.now()}`,
    role: data.role || 'Cinematographer',
    titleTag: data.titleTag || 'Creative Member',
    avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: data.bio || '',
    quote: data.quote || '',
    specialties: data.specialties || [],
    primaryGear: data.primaryGear || [],
    filmography: data.filmography || [],
    socials: data.socials || {},
    featured: true,
    order: (global.inMemoryStore!.team.length + 1),
  };
  global.inMemoryStore!.team.push(newMember);
  return newMember;
}

export async function updateTeamMember(idOrSlug: string, data: Partial<TeamMemberType>): Promise<TeamMemberType | null> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const updated = await TeamMember.findOneAndUpdate(
        { $or: [{ _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }, { slug: idOrSlug }] },
        { $set: data },
        { new: true }
      ).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch {
      // fallback
    }
  }
  const idx = global.inMemoryStore!.team.findIndex((t) => t._id === idOrSlug || t.id === idOrSlug || t.slug === idOrSlug);
  if (idx !== -1) {
    global.inMemoryStore!.team[idx] = { ...global.inMemoryStore!.team[idx], ...data };
    return global.inMemoryStore!.team[idx];
  }
  return null;
}

export async function deleteTeamMember(idOrSlug: string): Promise<boolean> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await TeamMember.findOneAndDelete({
        $or: [{ _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null }, { slug: idOrSlug }],
      });
      return true;
    } catch {
      // fallback
    }
  }
  const idx = global.inMemoryStore!.team.findIndex((t) => t._id === idOrSlug || t.id === idOrSlug || t.slug === idOrSlug);
  if (idx !== -1) {
    global.inMemoryStore!.team.splice(idx, 1);
    return true;
  }
  return false;
}

// ----------------------------------------------------
// INQUIRIES REPOSITORY
// ----------------------------------------------------

export async function getInquiries(): Promise<InquiryType[]> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const docs = await Inquiry.find().sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(docs));
    } catch {
      // fallback
    }
  }
  return global.inMemoryStore!.inquiries;
}

export async function createInquiry(data: Partial<InquiryType>): Promise<InquiryType> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const created = await Inquiry.create(data);
      return JSON.parse(JSON.stringify(created));
    } catch {
      // fallback
    }
  }
  const newInq: InquiryType = {
    ...data,
    id: `mem-inq-${Date.now()}`,
    _id: `mem-inq-${Date.now()}`,
    name: data.name || 'Client',
    email: data.email || 'client@example.com',
    company: data.company || '',
    phone: data.phone || '',
    projectType: data.projectType || 'Cinematography',
    budgetRange: data.budgetRange || '$10k - $25k',
    timeline: data.timeline || 'Flexible',
    details: data.details || '',
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  global.inMemoryStore!.inquiries.unshift(newInq);
  return newInq;
}

export async function updateInquiryStatus(id: string, status: InquiryType['status']): Promise<boolean> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await Inquiry.findByIdAndUpdate(id, { status });
      return true;
    } catch {
      // fallback
    }
  }
  const item = global.inMemoryStore!.inquiries.find((i) => i._id === id || i.id === id);
  if (item) {
    item.status = status;
    return true;
  }
  return false;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await Inquiry.findByIdAndDelete(id);
      return true;
    } catch {
      // fallback
    }
  }
  const idx = global.inMemoryStore!.inquiries.findIndex((i) => i._id === id || i.id === id);
  if (idx !== -1) {
    global.inMemoryStore!.inquiries.splice(idx, 1);
    return true;
  }
  return false;
}

// ----------------------------------------------------
// SERVICES REPOSITORY
// ----------------------------------------------------

export async function getServices(): Promise<ServiceType[]> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const docs = await Service.find().lean();
      return JSON.parse(JSON.stringify(docs));
    } catch {
      // fallback
    }
  }
  return global.inMemoryStore!.services;
}

export async function getServiceBySlug(slug: string): Promise<ServiceType | null> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const doc = await Service.findOne({ slug }).lean();
      if (doc) return JSON.parse(JSON.stringify(doc));
    } catch {
      // fallback
    }
  }
  const found = global.inMemoryStore!.services.find((s) => s.slug === slug);
  return found || null;
}

// ----------------------------------------------------
// SITE SETTINGS & SEO REPOSITORY
// ----------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettingsType> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const doc = await SiteSettings.findOne().lean();
      if (doc) {
        const parsed = JSON.parse(JSON.stringify(doc));
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          estimatorServices: parsed.estimatorServices && parsed.estimatorServices.length > 0
            ? parsed.estimatorServices
            : DEFAULT_SITE_SETTINGS.estimatorServices,
          estimatorTimelines: parsed.estimatorTimelines && parsed.estimatorTimelines.length > 0
            ? parsed.estimatorTimelines
            : DEFAULT_SITE_SETTINGS.estimatorTimelines,
        };
      }
    } catch (e) {
      console.error('Error fetching settings from MongoDB:', e);
    }
  }
  return global.inMemoryStore!.settings || DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(data: Partial<SiteSettingsType>): Promise<SiteSettingsType> {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      const doc = await SiteSettings.findOneAndUpdate(
        {},
        { $set: data },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      if (doc) {
        const parsed = JSON.parse(JSON.stringify(doc));
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
        };
      }
    } catch (e) {
      console.error('Error updating site settings in MongoDB:', e);
    }
  }
  global.inMemoryStore!.settings = {
    ...(global.inMemoryStore!.settings || DEFAULT_SITE_SETTINGS),
    ...data,
  };
  return global.inMemoryStore!.settings;
}
