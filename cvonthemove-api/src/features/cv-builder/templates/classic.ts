import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.6; }
  .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
  .name { font-size: 32px; font-weight: bold; text-transform: uppercase; }
  .contact-info { font-size: 14px; margin-top: 5px; }
  h2 { font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px; }
  .job { margin-bottom: 15px; }
  .job-title { font-weight: bold; }
  .company { font-style: italic; }
  .dates { font-size: 12px; color: #666; }
  .education { margin-bottom: 15px; }
`;

export const classicTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  <div class="header">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="contact-info">
      ${escape(data.personalDetails?.email)} | ${escape(data.personalDetails?.phone)} | ${escape(data.personalDetails?.location)}
      ${data.personalDetails?.linkedinUrl ? `| ${escape(data.personalDetails.linkedinUrl)}` : ''}
    </div>
  </div>

  ${data.personalDetails?.summary ? `
  <div class="section">
    <h2>Summary</h2>
    <p>${escape(data.personalDetails.summary)}</p>
  </div>
  ` : ''}

  ${data.workExperiences?.length ? `
  <div class="section">
    <h2>Experience</h2>
    ${data.workExperiences.map(job => `
      <div class="job">
        <div class="job-title">${escape(job.position)}</div>
        <div class="company">${escape(job.company)}</div>
        <div class="dates">${new Date(job.startDate).toLocaleDateString()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : '')}</div>
        <p>${escape(job.description)}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.educations?.length ? `
  <div class="section">
    <h2>Education</h2>
    ${data.educations.map(edu => `
      <div class="education">
        <div class="job-title">${escape(edu.institution)}</div>
        <div>${escape(edu.degree)}, ${escape(edu.fieldOfStudy)}</div>
        <div class="dates">${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.skills?.length ? `
  <div class="section">
    <h2>Skills</h2>
    <p>${data.skills.map(skill => escape(skill.name)).join(', ')}</p>
  </div>
  ` : ''}
</body>
</html>
`;
