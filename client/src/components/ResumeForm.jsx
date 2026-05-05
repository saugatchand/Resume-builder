import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [openSections, setOpenSections] = useState({ personal: true, education: false, work: false, skills: false, projects: false });
  const [aiLoading, setAiLoading] = useState(false);

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  const handlePersonalChange = (e) => {
    setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, [e.target.name]: e.target.value } });
  };

  const handleArrayChange = (field, index, subfield, value) => {
    const updatedArray = [...resumeData[field]];
    if (typeof updatedArray[index] === 'string') {
      updatedArray[index] = value;
    } else {
      updatedArray[index][subfield] = value;
    }
    setResumeData({ ...resumeData, [field]: updatedArray });
  };

  const addArrayItem = (field, emptyItem) => {
    setResumeData({ ...resumeData, [field]: [...resumeData[field], emptyItem] });
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = resumeData[field].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [field]: updatedArray });
  };

  // AI Helpers
  const generateSummary = async () => {
    if (!resumeData.personalInfo.fullName) return alert('Please enter your name and some skills first.');
    setAiLoading('summary');
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/generate-summary', {
        position: 'professional',
        experience: resumeData.workExperience.length * 2 || 2, // arbitrary
        skills: resumeData.skills
      });
      setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, summary: data.result } });
    } catch (e) {
      console.error(e);
      alert('Failed to generate AI summary. Check API Key.');
    }
    setAiLoading(false);
  };

  const improveBulletPoint = async (index) => {
    const text = resumeData.workExperience[index].description;
    if (!text) return;
    setAiLoading(`work-${index}`);
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/improve-bullet-points', { text });
      handleArrayChange('workExperience', index, 'description', data.result);
    } catch (e) {
      console.error(e);
      alert('Failed to improve text.');
    }
    setAiLoading(false);
  };

  return (
    <div>
      {/* Personal Info */}
      <div className="card" style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        <div className="section-header" onClick={() => toggleSection('personal')}>
          <span>Personal Information</span>
          {openSections.personal ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {openSections.personal && (
          <div style={{ marginTop: '1rem' }}>
            <div className="form-group"><label>Full Name</label><input type="text" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalChange} /></div>
            <div className="form-group"><label>Email</label><input type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalChange} /></div>
            <div className="form-group"><label>Phone</label><input type="text" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalChange} /></div>
            <div className="form-group"><label>Address</label><input type="text" name="address" value={resumeData.personalInfo.address} onChange={handlePersonalChange} /></div>
            <div className="form-group">
              <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                Professional Summary
                <button type="button" onClick={generateSummary} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} disabled={aiLoading === 'summary'}>
                  <Wand2 size={12} /> {aiLoading === 'summary' ? 'Generating...' : 'AI Generate'}
                </button>
              </label>
              <textarea name="summary" value={resumeData.personalInfo.summary} onChange={handlePersonalChange} rows="4" />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="card" style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        <div className="section-header" onClick={() => toggleSection('work')}>
          <span>Work Experience</span>
          {openSections.work ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {openSections.work && (
          <div style={{ marginTop: '1rem' }}>
            {resumeData.workExperience.map((work, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <button onClick={() => removeArrayItem('workExperience', index)} className="btn-danger" style={{ padding: '0.2rem 0.5rem' }}><Trash2 size={14} /></button>
                </div>
                <div className="form-group"><label>Company</label><input type="text" value={work.company} onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)} /></div>
                <div className="form-group"><label>Position</label><input type="text" value={work.position} onChange={(e) => handleArrayChange('workExperience', index, 'position', e.target.value)} /></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}><label>Start Date</label><input type="text" placeholder="MM/YYYY" value={work.startDate} onChange={(e) => handleArrayChange('workExperience', index, 'startDate', e.target.value)} /></div>
                  <div className="form-group" style={{ flex: 1 }}><label>End Date</label><input type="text" placeholder="MM/YYYY or Present" value={work.endDate} onChange={(e) => handleArrayChange('workExperience', index, 'endDate', e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Description
                    <button type="button" onClick={() => improveBulletPoint(index)} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} disabled={aiLoading === `work-${index}`}>
                      <Wand2 size={12} /> {aiLoading === `work-${index}` ? 'Improving...' : 'AI Improve'}
                    </button>
                  </label>
                  <textarea value={work.description} onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)} rows="3" placeholder="Developed X using Y..." />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('workExperience', { company: '', position: '', startDate: '', endDate: '', description: '' })} className="btn-secondary" style={{ width: '100%' }}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="card" style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        <div className="section-header" onClick={() => toggleSection('education')}>
          <span>Education</span>
          {openSections.education ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {openSections.education && (
          <div style={{ marginTop: '1rem' }}>
            {resumeData.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px dashed var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <button onClick={() => removeArrayItem('education', index)} className="btn-danger" style={{ padding: '0.2rem 0.5rem' }}><Trash2 size={14} /></button>
                </div>
                <div className="form-group"><label>Institution</label><input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} /></div>
                <div className="form-group"><label>Degree</label><input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} /></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}><label>Start Date</label><input type="text" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} /></div>
                  <div className="form-group" style={{ flex: 1 }}><label>End Date</label><input type="text" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('education', { institution: '', degree: '', startDate: '', endDate: '' })} className="btn-secondary" style={{ width: '100%' }}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="card" style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        <div className="section-header" onClick={() => toggleSection('skills')}>
          <span>Skills</span>
          {openSections.skills ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {openSections.skills && (
          <div style={{ marginTop: '1rem' }}>
            {resumeData.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="text" value={skill} onChange={(e) => handleArrayChange('skills', index, null, e.target.value)} placeholder="e.g. JavaScript, Project Management" />
                <button onClick={() => removeArrayItem('skills', index)} className="btn-danger"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem('skills', '')} className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Plus size={16} /> Add Skill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
