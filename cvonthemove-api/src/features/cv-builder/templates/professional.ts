import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  body { font-family: 'Times New Roman', serif; color: #111; line-height: 1.4; }
  .header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
  .name { font-size: 26px; font-weight: bold; }
  .contact { margin-top: 5px; font-size: 14px; }
  h2 { font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 20px; }
  .job { margin-bottom: 10px; }
  .job-header { display: flex; justify-content: space-between; font-weight: bold; }
  .job-sub { display: flex; justify-content: space-between; font-style: italic; }
  ul { margin: 5px 0; padding-left: 20px; }
`;

export const professionalTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  <div class="header">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="contact">
      ${escape(data.personalDetails?.location)} | ${escape(data.personalDetails?.phone)} | ${escape(data.personalDetails?.email)}
      ${data.personalDetails?.linkedinUrl ? `| ${escape(data.personalDetails.linkedinUrl)}` : ''}
    </div>
  </div>

  ${data.personalDetails?.summary ? `
  <h2>Professional Summary</h2>
  <p>${escape(data.personalDetails.summary)}</p>
  ` : ''}

  ${data.workExperiences?.length ? `
  <h2>Experience</h2>
  ${data.workExperiences.map(job => `
    <div class="job">
      <div class="job-header">
        <span>${escape(job.company)}</span>
        <span>${new Date(job.startDate).toLocaleDateString()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : '')}</span>
      </div>
      <div class="job-sub">
        <span>${escape(job.position)}</span>
        <span>${escape(data.personalDetails?.location)}</span>
      </div>
      <p>${escape(job.description)}</p>
    </div>
  `).join('')}
  ` : ''}

  ${data.educations?.length ? `
  <h2>Education</h2>
  ${data.educations.map(edu => `
    <div class="job">
      <div class="job-header">
        <span>${escape(edu.institution)}</span>
        <span>${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}</span>
      </div>
      <div class="job-sub">
        <span>${escape(edu.degree)} in ${escape(edu.fieldOfStudy)}</span>
      </div>
    </div>
  `).join('')}
  ` : ''}

  ${data.skills?.length ? `
  <h2>Skills</h2>
  <p>${data.skills.map(skill => escape(skill.name)).join(', ')}</p>
  ` : ''}
</body>
</html>
`;
