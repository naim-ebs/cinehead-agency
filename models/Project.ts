import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['Cinematography', 'Commercial', 'Music Video', 'Web & Digital', 'Documentary'] 
    },
    client: { type: String, required: true },
    year: { type: String, required: true, default: new Date().getFullYear().toString() },
    duration: { type: String, default: '' },
    aspectRatio: { type: String, default: '2.39:1 Anamorphic' },
    cameraGear: [{ type: String }],
    thumbnail: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: true },
    synopsis: { type: String, default: '' },
    director: { type: String, default: 'Cine Head Collective' },
    cinematographer: { type: String, default: 'Cine Head DP' },
    colorist: { type: String, default: '' },
    techStack: [{ type: String }],
    featured: { type: Boolean, default: false },
    galleryImages: [{ type: String }],
    awards: [{ type: String }],
    deliverables: [{ type: String }],
  },
  { timestamps: true }
);

const Project = models.Project || model('Project', ProjectSchema);
export default Project;
