import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

  body {
    font-family: 'Montserrat', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #333;
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 32%;
    background-color: #2c3e50;
    color: #fff;
    padding: 40px 30px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .main {
    flex: 1;
    padding: 40px 50px;
    box-sizing: border-box;
  }

  .name { font-size: 32px; font-weight: 700; line-height: 1.2; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
  .title { font-size: 14px; font-weight: 400; text-transform: uppercase; letter-spacing: 2px; color: #bdc3c7; margin-bottom: 40px; }

  .sidebar-section { margin-bottom: 35px; }
  .sidebar h2 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 1px solid #7f8c8d;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #ecf0f1;
  }

  .contact-item { margin-bottom: 15px; font-size: 12px; display: flex; align-items: center; color: #ecf0f1; }
  .contact-icon { width: 16px; margin-right: 10px; color: #bdc3c7; }

  .sidebar-list-item { margin-bottom: 8px; font-size: 13px; color: #ecf0f1; }

  .main h2 {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 10px;
    margin-bottom: 25px;
    margin-top: 0;
    color: #2c3e50;
  }

  .main-section { margin-bottom: 40px; }

  .job { margin-bottom: 25px; }
  .job-title { font-weight: 700; font-size: 16px; color: #2c3e50; margin-bottom: 2px; }
  .job-company { font-weight: 600; font-size: 14px; color: #7f8c8d; margin-bottom: 5px; display: flex; justify-content: space-between; }
  .job-desc { font-size: 13px; line-height: 1.6; color: #555; margin-top: 10px; }

  .profile-text { font-size: 13px; line-height: 1.6; color: #555; }
`;

export const modernTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
  <div class="sidebar">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="title">${escape(data.workExperiences?.[0]?.position) || 'Professional'}</div>

    <div class="sidebar-section">
      <h2>Contact</h2>
      <div class="contact-item"><i class="fas fa-phone contact-icon"></i> ${escape(data.personalDetails?.phone)}</div>
      <div class="contact-item"><i class="fas fa-envelope contact-icon"></i> ${escape(data.personalDetails?.email)}</div>
      <div class="contact-item"><i class="fas fa-map-marker-alt contact-icon"></i> ${escape(data.personalDetails?.location)}</div>
      ${data.personalDetails?.linkedinUrl ? `<div class="contact-item"><i class="fab fa-linkedin contact-icon"></i> ${escape(data.personalDetails.linkedinUrl)}</div>` : ''}
    </div>

    ${data.educations?.length ? `
    <div class="sidebar-section">
      <h2>Education</h2>
      ${data.educations.map(edu => `
        <div style="margin-bottom: 15px;">
          <div style="font-weight: 700; font-size: 13px; color: #fff;">${escape(edu.degree)}</div>
          <div style="font-size: 12px; color: #bdc3c7;">${escape(edu.institution)}</div>
          <div style="font-size: 11px; color: #95a5a6; margin-top: 2px;">${new Date(edu.startDate).getFullYear()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.skills?.length ? `
    <div class="sidebar-section">
      <h2>Skills</h2>
      ${data.skills.map(skill => `<div class="sidebar-list-item">• ${escape(skill.name)}</div>`).join('')}
    </div>
    ` : ''}

    ${data.personalDetails?.languages?.length ? `
    <div class="sidebar-section">
      <h2>Languages</h2>
      ${data.personalDetails.languages.map(lang => `<div class="sidebar-list-item">• ${escape(lang)}</div>`).join('')}
    </div>
    ` : ''}
  </div>

  <div class="main">
    ${data.personalDetails?.summary ? `
    <div class="main-section">
      <h2>Profile</h2>
      <p class="profile-text">${escape(data.personalDetails.summary)}</p>
    </div>
    ` : ''}

    ${data.workExperiences?.length ? `
    <div class="main-section">
      <h2>Experience</h2>
      ${data.workExperiences.map(job => `
        <div class="job">
          <div class="job-title">${escape(job.position)}</div>
          <div class="job-company">
            <span>${escape(job.company)}</span>
            <span>${new Date(job.startDate).getFullYear()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).getFullYear() : '')}</span>
          </div>
          <div class="job-desc">${escape(job.description)}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.references?.length ? `
    <div class="main-section">
      <h2>References</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      ${data.references.map(ref => `
        <div style="width: 45%;">
          <div style="font-weight: 700; font-size: 14px;">${escape(ref.name)}</div>
          <div style="font-size: 13px; color: #7f8c8d;">${escape(ref.company)}</div>
          <div style="font-size: 12px; margin-top: 5px;">${escape(ref.email)}</div>
        </div>
      `).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
`;
