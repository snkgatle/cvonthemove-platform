import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  body { font-family: 'Arial', sans-serif; color: #444; }
  .sidebar { width: 30%; float: left; background: #f4f4f4; height: 100vh; padding: 20px; box-sizing: border-box; }
  .main { width: 70%; float: left; padding: 20px; box-sizing: border-box; }
  .name { font-size: 28px; font-weight: bold; color: #2c3e50; }
  .contact-info { font-size: 12px; margin-bottom: 20px; }
  .contact-info div { margin-bottom: 5px; }
  h2 { font-size: 16px; color: #2980b9; border-bottom: 2px solid #2980b9; padding-bottom: 5px; margin-top: 0; }
  .job { margin-bottom: 20px; }
  .job-title { font-weight: bold; font-size: 14px; }
  .company { color: #7f8c8d; font-size: 12px; }
  .skill-tag { display: inline-block; background: #2980b9; color: white; padding: 3px 8px; border-radius: 4px; font-size: 10px; margin: 2px; }
`;

export const modernTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  <div class="sidebar">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="contact-info">
      <div>${escape(data.personalDetails?.email)}</div>
      <div>${escape(data.personalDetails?.phone)}</div>
      <div>${escape(data.personalDetails?.location)}</div>
    </div>

    ${data.skills?.length ? `
    <h2>Skills</h2>
    <div>
      ${data.skills.map(skill => `<span class="skill-tag">${escape(skill.name)}</span>`).join('')}
    </div>
    ` : ''}

    ${data.personalDetails?.languages?.length ? `
    <h2 style="margin-top: 20px;">Languages</h2>
    <ul>
      ${data.personalDetails.languages.map(lang => `<li>${escape(lang)}</li>`).join('')}
    </ul>
    ` : ''}
  </div>

  <div class="main">
    ${data.personalDetails?.summary ? `
    <h2>Profile</h2>
    <p>${escape(data.personalDetails.summary)}</p>
    ` : ''}

    ${data.workExperiences?.length ? `
    <h2>Experience</h2>
    ${data.workExperiences.map(job => `
      <div class="job">
        <div class="job-title">${escape(job.position)}</div>
        <div class="company">${escape(job.company)} | ${new Date(job.startDate).toLocaleDateString()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : '')}</div>
        <p>${escape(job.description)}</p>
      </div>
    `).join('')}
    ` : ''}

    ${data.educations?.length ? `
    <h2>Education</h2>
    ${data.educations.map(edu => `
      <div class="job">
        <div class="job-title">${escape(edu.institution)}</div>
        <div class="company">${escape(edu.degree)}, ${escape(edu.fieldOfStudy)}</div>
        <div class="company">${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}</div>
      </div>
    `).join('')}
    ` : ''}
  </div>
</body>
</html>
`;
