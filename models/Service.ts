import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    tagline: { type: String, required: true },
    icon: { type: String, default: 'Camera' },
    category: { 
      type: String, 
      required: true,
      enum: ['Cinematography', 'Post-Production', 'Digital & Web', 'Creative Tech']
    },
    description: { type: String, required: true },
    features: [{ type: String }],
    gearAndTech: [{ type: String }],
    deliverables: [{ type: String }],
    startingPrice: { type: String, default: '' },
  },
  { timestamps: true }
);

const Service = models.Service || model('Service', ServiceSchema);
export default Service;
