import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  body { font-family: 'Verdana', sans-serif; color: #222; }
  .header { background: #333; color: white; padding: 40px; text-align: right; }
  .name { font-size: 36px; font-weight: bold; color: #f1c40f; }
  .role { font-size: 18px; margin-bottom: 20px; }
  .content { padding: 40px; }
  h2 { color: #333; font-size: 20px; border-left: 5px solid #f1c40f; padding-left: 10px; margin-top: 30px; }
  .job { margin-bottom: 20px; border-left: 1px solid #ddd; padding-left: 20px; margin-left: 2px; }
  .job-title { font-weight: bold; font-size: 16px; }
`;

export const creativeTemplate = (data: CreateCVInput) => `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  <div class="header">
    <div class="name">${escape(data.personalDetails?.fullName)}</div>
    <div class="role">${escape(data.workExperiences?.[0]?.position) || 'Professional'}</div>
    <div>${escape(data.personalDetails?.email)}</div>
    <div>${escape(data.personalDetails?.phone)}</div>
  </div>

  <div class="content">
    ${data.personalDetails?.summary ? `
    <h2>About Me</h2>
    <p>${escape(data.personalDetails.summary)}</p>
    ` : ''}

    ${data.workExperiences?.length ? `
    <h2>Work Experience</h2>
    ${data.workExperiences.map(job => `
      <div class="job">
        <div class="job-title">${escape(job.position)}</div>
        <div>${escape(job.company)}</div>
        <small>${new Date(job.startDate).toLocaleDateString()} - ${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).toLocaleDateString() : '')}</small>
        <p>${escape(job.description)}</p>
      </div>
    `).join('')}
    ` : ''}

    ${data.educations?.length ? `
    <h2>Education</h2>
    ${data.educations.map(edu => `
      <div class="job">
        <div class="job-title">${escape(edu.institution)}</div>
        <div>${escape(edu.degree)} in ${escape(edu.fieldOfStudy)}</div>
        <small>${new Date(edu.startDate).toLocaleDateString()} - ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '')}</small>
      </div>
    `).join('')}
    ` : ''}
  </div>
</body>
</html>
`;
