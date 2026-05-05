import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit3, Trash2, FileText } from 'lucide-react';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/resumes');
      setResumes(data);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/resumes', { title: 'New Professional Resume' });
      navigate(`/builder/${data._id}`);
    } catch (error) {
      console.error('Failed to create resume', error);
    }
  };

  const deleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`http://localhost:5000/api/resumes/${id}`);
        setResumes(resumes.filter((r) => r._id !== id));
      } catch (error) {
        console.error('Failed to delete resume', error);
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Resumes</h2>
        <button onClick={createNewResume} className="btn-primary">
          <Plus size={20} /> Create New
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', padding: '4rem' }}>
          <div className="spinner"></div>
        </div>
      ) : resumes.length === 0 ? (
        <div className="card animate-fade-in-up" style={{ marginTop: '3rem', textAlign: 'center', padding: '5rem 2rem', background: 'var(--glass-bg)', border: 'var(--glass-border)' }}>
          <div style={{ display: 'inline-block', padding: '1.5rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', marginBottom: '1.5rem' }}>
            <FileText size={56} color="var(--accent-primary)" style={{ animation: 'float 3s ease-in-out infinite' }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Let's Build Your Dream Resume</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>Create an AI-powered resume in minutes and stand out from the crowd.</p>
          <button onClick={createNewResume} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started Now</button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {resumes.map((resume, index) => (
            <div key={resume._id} className="card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{resume.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div className="resume-card-actions">
                <button onClick={() => navigate(`/builder/${resume._id}`)} className="btn-secondary" style={{ flex: 1 }}>
                  <Edit3 size={16} /> Edit
                </button>
                <button onClick={() => deleteResume(resume._id)} className="btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
