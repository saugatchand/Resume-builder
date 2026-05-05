import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: 'Untitled Resume',
  },
  templateId: {
    type: String,
    default: 'template1',
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  workExperience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  skills: [{
    type: String,
  }],
  projects: [{
    title: String,
    link: String,
    description: String,
  }],
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
