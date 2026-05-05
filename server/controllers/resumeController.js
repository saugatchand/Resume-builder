import Resume from '../models/Resume.js';

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResume = async (req, res) => {
  try {
    const newResume = await Resume.create({
      userId: req.user.id,
      title: req.body.title || 'Untitled Resume',
      templateId: req.body.templateId || 'template1',
    });
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await resume.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
