import mongoose, { Schema, model, models } from 'mongoose';

export interface EstimatorServiceItem {
  id: string;
  label: string;
  base: number;
}

export interface EstimatorTimelineItem {
  id: string;
  label: string;
  mult: number;
}

export interface SiteSettingsType {
  id?: string;
  _id?: string;
  siteName: string;
  tagline: string;
  logoText: string;
  logoImageUrl?: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImageUrl: string;
  currencySymbol: string;
  currencyCode: string;
  contactHeading?: string;
  contactSubheading?: string;
  estimatorServices?: EstimatorServiceItem[];
  estimatorTimelines?: EstimatorTimelineItem[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    instagram?: string;
    vimeo?: string;
    youtube?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  googleAnalyticsId?: string;
}

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, default: 'Cine Head' },
    tagline: { type: String, default: 'Cinema & Code' },
    logoText: { type: String, default: 'CINEHEAD' },
    logoImageUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '/favicon.ico' },
    metaTitle: { 
      type: String, 
      default: 'Cine Head • High-End Cinematography & Creative Software Agency' 
    },
    metaDescription: { 
      type: String, 
      default: 'Cine Head is a world-class cinematography and creative technology agency. Specializing in 8K anamorphic motion pictures, commercial films, and bespoke Next.js / WebGL software solutions.' 
    },
    metaKeywords: [{ type: String }],
    ogImageUrl: { 
      type: String, 
      default: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop' 
    },
    currencySymbol: { type: String, default: '$' },
    currencyCode: { type: String, default: 'USD' },
    contactHeading: { type: String, default: "Let's Build Something Iconic" },
    contactSubheading: { 
      type: String, 
      default: 'Select your required production or software services to get an instant real-time estimate.' 
    },
    estimatorServices: {
      type: [
        {
          id: { type: String },
          label: { type: String },
          base: { type: Number },
        }
      ],
      default: undefined,
    },
    estimatorTimelines: {
      type: [
        {
          id: { type: String },
          label: { type: String },
          mult: { type: Number },
        }
      ],
      default: undefined,
    },
    contactEmail: { type: String, default: 'hello@cinehead.agency' },
    contactPhone: { type: String, default: '+880 1700-CINEHD' },
    contactAddress: { type: String, default: 'Gulshan-2 Cinema Hub, Dhaka & London Production Unit' },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com' },
      vimeo: { type: String, default: 'https://vimeo.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      github: { type: String, default: 'https://github.com' },
      twitter: { type: String, default: 'https://x.com' },
    },
    googleAnalyticsId: { type: String, default: '' },
  },
  { timestamps: true, strict: false }
);

if (models && models.SiteSettings) {
  delete (models as any).SiteSettings;
}

const SiteSettings = model('SiteSettings', SiteSettingsSchema);
export default SiteSettings;
