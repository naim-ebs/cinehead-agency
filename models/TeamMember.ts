import mongoose, { Schema, model, models } from 'mongoose';

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, required: true },
    titleTag: { type: String, required: true },
    avatar: { type: String, required: true },
    coverImage: { type: String, default: '' },
    bio: { type: String, required: true },
    quote: { type: String, default: '' },
    specialties: [{ type: String }],
    primaryGear: [{ type: String }],
    filmography: [
      {
        title: { type: String, required: true },
        year: { type: String, required: true },
        role: { type: String, required: true },
        type: { type: String, default: 'Film' },
      }
    ],
    socials: {
      instagram: { type: String, default: '' },
      imdb: { type: String, default: '' },
      vimeo: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);
export default TeamMember;
