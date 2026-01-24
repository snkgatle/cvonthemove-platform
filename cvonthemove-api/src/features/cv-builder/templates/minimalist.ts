import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

  body {
    font-family: 'Lato', 'Helvetica', sans-serif;
    color: #333;
    margin: 0;
    padding: 50px;
    background: white;
  }

  .header { margin-bottom: 50px; }
  .name { font-size: 38px; text-transform: uppercase; letter-spacing: 2px; font-weight: 300; }
  .title { font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: #777; margin-top: 5px; }

  .container { display: flex; gap: 50px; }
  .left-col { width: 30%; flex-shrink: 0; }
  .right-col { flex: 1; }

  h2 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 25px;
    margin-top: 0;
    color: #333;
    font-weight: 400;
  }

  .left-section { margin-bottom: 40px; }

  .contact-item { margin-bottom: 15px; font-size: 13px; display: flex; align-items: center; color: #555; }
  .contact-icon { width: 16px; margin-right: 15px; color: #000; }

  .edu-item { margin-bottom: 20px; }
  .edu-inst { font-weight: 700; font-size: 13px; margin-bottom: 2px; }
  .edu-deg { font-size: 13px; color: #555; margin-bottom: 2px; }
  .edu-date { font-size: 11px; color: #999; }

  .skill-item { margin-bottom: 10px; font-size: 13px; color: #555; }

  .right-section { margin-bottom: 40px; }

  .job { margin-bottom: 35px; }
  .job-header { margin-bottom: 5px; }
  .job-company { font-weight: 700; font-size: 15px; color: #333; display: block; margin-bottom: 2px; }
  .job-role { font-size: 14px; color: #555; display: inline-block; }
  .job-date { font-size: 13px; color: #777; display: block; margin-top: 2px; }
  .job-desc { font-size: 13px; line-height: 1.6; color: #555; margin-top: 10px; }

  .summary { font-size: 13px; line-height: 1.7; color: #555; margin-bottom: 30px; }
`;

export const minimalistTemplate = (data: CreateCVInput) => `
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

      ${data.educations?.length ? `
      <div class="left-section">
        <h2>Education</h2>
        ${data.educations.map(edu => `
          <div class="edu-item">
            <div class="edu-inst">${escape(edu.institution)}</div>
            <div class="edu-deg">${escape(edu.degree)}</div>
            <div class="edu-date">${new Date(edu.startDate).getFullYear()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${data.skills?.length ? `
      <div class="left-section">
        <h2>Skills</h2>
        ${data.skills.map(skill => `<div class="skill-item">${escape(skill.name)}</div>`).join('')}
      </div>
      ` : ''}
    </div>

    <div class="right-col">
      ${data.personalDetails?.summary ? `
      <div class="right-section">
        <h2>Professional Summary</h2>
        <div class="summary">${escape(data.personalDetails.summary)}</div>
      </div>
      ` : ''}

      ${data.workExperiences?.length ? `
      <div class="right-section">
        <h2>Work Experience</h2>
        ${data.workExperiences.map(job => `
          <div class="job">
            <div class="job-header">
              <span class="job-company">${escape(job.company)}</span>
              <span class="job-role">${escape(job.position)}</span>
              <span class="job-date">${new Date(job.startDate).getFullYear()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).getFullYear() : '')}</span>
            </div>
            <div class="job-desc">${escape(job.description)}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
`;
