import React from 'react';

const Template3 = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div style={{ padding: '50px', fontFamily: '"Times New Roman", serif', color: '#000', backgroundColor: '#fff', maxWidth: '210mm' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', fontWeight: 'normal' }}>{personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {personalInfo.address && <span>{personalInfo.address} | </span>}
          {personalInfo.phone && <span>{personalInfo.phone} | </span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'justify', margin: 0 }}>{personalInfo.summary}</p>
        </div>
      )}

      {workExperience && workExperience.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Professional Experience</h2>
          {workExperience.map((work, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <strong style={{ fontSize: '15px' }}>{work.company}</strong>
                <span style={{ fontSize: '13px' }}>{work.startDate} - {work.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '5px' }}>{work.position}</div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', lineHeight: '1.5' }}>
                <li>{work.description}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <strong style={{ fontSize: '15px' }}>{edu.institution}</strong>
                <span style={{ fontSize: '13px' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={{ fontSize: '14px' }}>{edu.degree}</div>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && skills[0] !== '' && (
        <div>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Skills & Abilities</h2>
          <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            {skills.filter(s => s.trim() !== '').join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Template3;
