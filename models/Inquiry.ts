import mongoose, { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    projectType: { type: String, required: true },
    budgetRange: { type: String, required: true },
    timeline: { type: String, default: 'Flexible' },
    details: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['new', 'contacted', 'proposal_sent', 'archived'], 
      default: 'new' 
    },
  },
  { timestamps: true }
);

const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);
export default Inquiry;
