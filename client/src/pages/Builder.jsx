import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, Download, LayoutTemplate, Wand2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const initialResume = {
  title: 'Untitled Resume',
  templateId: 'template1',
  personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '' },
  education: [],
  workExperience: [],
  skills: [''],
  projects: []
};

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(initialResume);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/resumes/${id}`);
      setResumeData({ ...initialResume, ...data });
    } catch (error) {
      console.error('Failed to fetch resume', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/resumes/${id}`, resumeData);
      } else {
        const { data } = await axios.post('http://localhost:5000/api/resumes', resumeData);
        navigate(`/builder/${data._id}`);
      }
    } catch (error) {
      console.error('Failed to save resume', error);
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById('resume-preview-container');
    const opt = {
      margin: 0,
      filename: `${resumeData.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const switchTemplate = () => {
    const templates = ['template1', 'template2', 'template3'];
    const currentIndex = templates.indexOf(resumeData.templateId);
    const nextIndex = (currentIndex + 1) % templates.length;
    setResumeData({ ...resumeData, templateId: templates[nextIndex] });
  };

  if (loading && id) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner"></div></div>;
  }

  return (
    <div>
      {/* Builder Toolbar */}
      <div style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input 
          type="text" 
          value={resumeData.title} 
          onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
          style={{ width: '300px', padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', fontSize: '1.25rem', fontWeight: 600 }}
        />
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={switchTemplate} className="btn-secondary">
            <LayoutTemplate size={18} /> Template: {resumeData.templateId.replace('template', 'T')}
          </button>
          <button onClick={downloadPDF} className="btn-secondary">
            <Download size={18} /> Download
          </button>
          <button onClick={handleSave} className="btn-primary" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="builder-layout">
        <div className="builder-sidebar">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="builder-preview">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default Builder;
