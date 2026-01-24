import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

  body {
    font-family: 'Open Sans', 'Helvetica', sans-serif;
    color: #333;
    line-height: 1.5;
    margin: 0;
    padding: 40px;
    background: white;
  }

  .header { margin-bottom: 30px; border-bottom: 2px solid #5a6b7c; padding-bottom: 20px; }
  .name { font-size: 36px; font-weight: 800; text-transform: uppercase; color: #34495e; letter-spacing: 1px; }
  .title { font-size: 18px; text-transform: uppercase; letter-spacing: 2px; color: #5a6b7c; margin-top: 5px; }

  .container { display: flex; gap: 40px; }
  .left-col { width: 30%; flex-shrink: 0; }
  .right-col { flex: 1; }

  h2 {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #34495e;
    margin-top: 0;
    margin-bottom: 15px;
    border-bottom: 2px solid #34495e;
    padding-bottom: 5px;
    display: inline-block;
    min-width: 100px;
  }

  .left-section { margin-bottom: 30px; }
  .contact-item { margin-bottom: 12px; font-size: 12px; display: flex; align-items: center; }
  .contact-icon { width: 16px; margin-right: 10px; color: #34495e; text-align: center; }

  .skill-item { margin-bottom: 8px; font-size: 13px; }

  .timeline-item {
    position: relative;
    padding-left: 20px;
    margin-bottom: 25px;
    border-left: 2px solid #34495e;
  }
  .timeline-item:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    border: 2px solid #34495e;
  }

  .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
  .job-title { font-weight: 700; font-size: 15px; color: #333; }
  .job-company { font-weight: 600; font-size: 14px; color: #555; }
  .job-date { font-size: 12px; font-weight: 600; color: #34495e; text-transform: uppercase; }
  .job-desc { font-size: 13px; color: #555; margin-top: 8px; }

  .profile-text { font-size: 13px; color: #555; margin-bottom: 30px; text-align: justify; }

  .ref-item { margin-bottom: 15px; font-size: 13px; }
  .ref-name { font-weight: 700; }
  .ref-role { font-style: italic; font-size: 12px; color: #666; }
`;

export const professionalTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
  <div class="header">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="title">${escape(data.workExperiences?.[0]?.position) || 'Professional'}</div>
  </div>

  <div class="container">
    <div class="left-col">
      <div class="left-section">
        <h2>Contact</h2>
        <div class="contact-item"><i class="fas fa-phone contact-icon"></i> ${escape(data.personalDetails?.phone)}</div>
        <div class="contact-item"><i class="fas fa-envelope contact-icon"></i> ${escape(data.personalDetails?.email)}</div>
        <div class="contact-item"><i class="fas fa-map-marker-alt contact-icon"></i> ${escape(data.personalDetails?.location)}</div>
        ${data.personalDetails?.linkedinUrl ? `<div class="contact-item"><i class="fab fa-linkedin contact-icon"></i> ${escape(data.personalDetails.linkedinUrl)}</div>` : ''}
      </div>

      ${data.skills?.length ? `
      <div class="left-section">
        <h2>Skills</h2>
        ${data.skills.map(skill => `<div class="skill-item">• ${escape(skill.name)}</div>`).join('')}
      </div>
      ` : ''}

      ${data.personalDetails?.languages?.length ? `
      <div class="left-section">
        <h2>Languages</h2>
        ${data.personalDetails.languages.map(lang => `<div class="skill-item">• ${escape(lang)}</div>`).join('')}
      </div>
      ` : ''}

      ${data.references?.length ? `
      <div class="left-section">
        <h2>Reference</h2>
        ${data.references.map(ref => `
          <div class="ref-item">
            <div class="ref-name">${escape(ref.name)}</div>
            ${ref.company ? `<div>${escape(ref.company)}</div>` : ''}
            <div class="ref-role">${escape(ref.relationship)}</div>
            <div>${escape(ref.phone)}</div>
            <div>${escape(ref.email)}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>

    <div class="right-col">
      ${data.personalDetails?.summary ? `
      <div style="margin-bottom: 30px;">
        <h2>Profile</h2>
        <div class="profile-text">${escape(data.personalDetails.summary)}</div>
      </div>
      ` : ''}

      ${data.workExperiences?.length ? `
      <div style="margin-bottom: 30px;">
        <h2>Work Experience</h2>
        ${data.workExperiences.map(job => `
          <div class="timeline-item">
            <div class="job-header">
              <div class="job-company">${escape(job.company)}</div>
              <div class="job-date">${new Date(job.startDate).getFullYear()} - ${job.current ? 'PRESENT' : (job.endDate ? new Date(job.endDate).getFullYear() : '')}</div>
            </div>
            <div class="job-title">${escape(job.position)}</div>
            <div class="job-desc">${escape(job.description)}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${data.educations?.length ? `
      <div>
        <h2>Education</h2>
        ${data.educations.map(edu => `
          <div class="timeline-item">
            <div class="job-header">
              <div class="job-company">${escape(edu.institution)}</div>
              <div class="job-date">${new Date(edu.startDate).getFullYear()} - ${edu.current ? 'PRESENT' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}</div>
            </div>
            <div class="job-title">${escape(edu.degree)}</div>
            <div class="job-desc">${escape(edu.fieldOfStudy)}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
`;
