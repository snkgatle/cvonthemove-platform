import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  body { font-family: 'Courier New', monospace; color: #000; padding: 40px; }
  .header { text-align: center; margin-bottom: 40px; }
  .name { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
  .contact { font-size: 10px; margin-top: 10px; }
  h2 { font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; }
  .item { margin-bottom: 15px; }
  .title { font-weight: bold; }
  .meta { font-size: 11px; }
`;

export const minimalistTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  <div class="header">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="contact">
      ${escape(data.personalDetails?.email)} &bull; ${escape(data.personalDetails?.phone)} &bull; ${escape(data.personalDetails?.location)}
    </div>
  </div>

  ${data.workExperiences?.length ? `
  <h2>Experience</h2>
  ${data.workExperiences.map(job => `
    <div class="item">
      <div class="title">${escape(job.position)}, ${escape(job.company)}</div>
      <div class="meta">${new Date(job.startDate).toLocaleDateString()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : '')}</div>
      <p>${escape(job.description)}</p>
    </div>
  `).join('')}
  ` : ''}

  ${data.educations?.length ? `
  <h2>Education</h2>
  ${data.educations.map(edu => `
    <div class="item">
      <div class="title">${escape(edu.institution)}</div>
      <div class="meta">${escape(edu.degree)}, ${escape(edu.fieldOfStudy)}</div>
      <div class="meta">${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}</div>
    </div>
  `).join('')}
  ` : ''}

  ${data.skills?.length ? `
  <h2>Skills</h2>
  <p>${data.skills.map(skill => escape(skill.name)).join(' / ')}</p>
  ` : ''}
</body>
</html>
`;
