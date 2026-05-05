import React from 'react';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

const ResumePreview = ({ resumeData }) => {
  const renderTemplate = () => {
    switch (resumeData.templateId) {
      case 'template2':
        return <Template2 data={resumeData} />;
      case 'template3':
        return <Template3 data={resumeData} />;
      case 'template1':
      default:
        return <Template1 data={resumeData} />;
    }
  };

  return (
    <div id="resume-preview-container" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' }}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
