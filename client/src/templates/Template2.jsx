import React from 'react';

const Template2 = ({ data }) => {
  const { personalInfo, education, workExperience, skills } = data;

  return (
    <div style={{ display: 'flex', minHeight: '100%', fontFamily: '"Roboto", "Inter", sans-serif', color: '#2d3748', backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#2b6cb0', color: '#fff', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '5px', fontWeight: 700 }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#fff', marginBottom: '20px' }}></div>
        
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Contact</h2>
        <div style={{ fontSize: '13px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
        </div>

        {skills && skills.length > 0 && skills[0] !== '' && (
          <>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Skills</h2>
            <ul style={{ paddingLeft: '15px', fontSize: '13px', margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {skills.map((skill, index) => (
                skill.trim() !== '' && <li key={index}>{skill}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '65%', padding: '40px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: '#2b6cb0', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Profile</h2>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6' }}>{personalInfo.summary}</p>
          </div>
        )}

        {workExperience && workExperience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: '#2b6cb0', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Experience</h2>
            {workExperience.map((work, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 5px 0' }}>{work.position}</h3>
                <div style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}>
                  {work.company} | {work.startDate} - {work.endDate}
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.5', margin: 0 }}>{work.description}</p>
              </div>
            ))}
          </div>
        )}

        {education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', color: '#2b6cb0', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 5px 0' }}>{edu.degree}</h3>
                <div style={{ fontSize: '13px', color: '#718096' }}>
                  {edu.institution} | {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template2;
