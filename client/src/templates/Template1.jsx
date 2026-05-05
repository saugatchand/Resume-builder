import React from 'react';

const Template1 = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div style={{ padding: '40px', fontFamily: '"Inter", sans-serif', color: '#333' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ fontSize: '14px', color: '#666', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase' }}>Professional Summary</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{personalInfo.summary}</p>
        </div>
      )}

      {workExperience && workExperience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase' }}>Experience</h2>
          {workExperience.map((work, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong style={{ fontSize: '15px' }}>{work.position}</strong>
                <span style={{ fontSize: '13px', color: '#666' }}>{work.startDate} - {work.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#555', fontStyle: 'italic', marginBottom: '5px' }}>{work.company}</div>
              <p style={{ fontSize: '13.5px', lineHeight: '1.5' }}>{work.description}</p>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase' }}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <strong style={{ fontSize: '15px' }}>{edu.institution}</strong>
                <span style={{ fontSize: '13px', color: '#666' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={{ fontSize: '14px' }}>{edu.degree}</div>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && skills[0] !== '' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, index) => (
              skill.trim() !== '' && <span key={index} style={{ fontSize: '13.5px', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template1;
