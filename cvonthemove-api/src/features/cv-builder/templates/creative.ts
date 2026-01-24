import { CreateCVInput } from '../schemas/cvSchemas';
import he from 'he';

const escape = (str?: string | null) => str ? he.encode(str) : '';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

  body {
    font-family: 'Roboto Condensed', 'Arial', sans-serif;
    color: #333;
    margin: 0;
    padding: 40px;
    background: white;
  }

  .header { text-align: center; margin-bottom: 40px; }
  .name { font-size: 36px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; }
  .role { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #555; letter-spacing: 1px; }

  .logo-container { display: flex; justify-content: center; margin: 20px 0; }
  .hexagon {
    width: 60px;
    height: 34.64px;
    background-color: #333;
    margin: 17.32px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
  }
  .hexagon:before,
  .hexagon:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
  }
  .hexagon:before {
    bottom: 100%;
    border-bottom: 17.32px solid #333;
  }
  .hexagon:after {
    top: 100%;
    width: 0;
    border-top: 17.32px solid #333;
  }

  .contact-bar { display: flex; justify-content: center; gap: 30px; font-size: 11px; color: #555; text-transform: uppercase; margin-bottom: 30px; }
  .contact-item { font-weight: 700; }
  .contact-val { font-weight: 400; }

  h2 {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 25px;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-icon {
    width: 20px; height: 20px; background: #333;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .item-row { display: flex; margin-bottom: 25px; }
  .left-col { width: 25%; padding-right: 20px; text-align: right; box-sizing: border-box; }
  .right-col { width: 75%; }

  .item-title { font-weight: 700; font-size: 14px; text-transform: uppercase; line-height: 1.2; margin-bottom: 5px; }
  .item-date { font-size: 12px; color: #777; margin-bottom: 5px; }
  .item-subtitle { font-weight: 700; font-size: 13px; text-transform: uppercase; color: #333; margin-bottom: 5px; }
  .item-desc { font-size: 13px; color: #555; text-align: justify; line-height: 1.5; }

  .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .skill-tag { border: 1px solid #333; padding: 5px 10px; font-size: 12px; text-transform: uppercase; font-weight: 700; }
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

    <div class="logo-container">
      <div class="hexagon">
        ${escape((data.personalDetails?.fullName || '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase())}
      </div>
    </div>

    <div class="contact-bar">
      <div>
        <div class="contact-item">Contact</div>
        <div class="contact-val">${escape(data.personalDetails?.phone)}</div>
      </div>
      <div>
        <div class="contact-item">Email</div>
        <div class="contact-val">${escape(data.personalDetails?.email)}</div>
      </div>
      <div>
        <div class="contact-item">Location</div>
        <div class="contact-val">${escape(data.personalDetails?.location)}</div>
      </div>
    </div>
  </div>

  ${data.personalDetails?.summary ? `
  <h2><span>Profile</span> <div class="section-icon"></div></h2>
  <div class="item-desc" style="margin-bottom: 30px;">${escape(data.personalDetails.summary)}</div>
  ` : ''}

  ${data.workExperiences?.length ? `
  <h2><span>Experience</span> <div class="section-icon"></div></h2>
  ${data.workExperiences.map(job => `
    <div class="item-row">
      <div class="left-col">
        <div class="item-title">${escape(job.position)}</div>
        <div class="item-date">${new Date(job.startDate).getFullYear()}-${job.current ? 'Present' : (job.endDate ? new Date(job.endDate).getFullYear() : '')}</div>
      </div>
      <div class="right-col">
        <div class="item-subtitle">${escape(job.company)}</div>
        <div class="item-desc">${escape(job.description)}</div>
      </div>
    </div>
  `).join('')}
  ` : ''}

  ${data.educations?.length ? `
  <h2><span>Education</span> <div class="section-icon"></div></h2>
  ${data.educations.map(edu => `
    <div class="item-row">
      <div class="left-col">
        <div class="item-title">${escape(edu.degree)}</div>
        <div class="item-date">${new Date(edu.startDate).getFullYear()}-${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}</div>
      </div>
      <div class="right-col">
        <div class="item-subtitle">${escape(edu.institution)}</div>
        <div class="item-desc">${escape(edu.fieldOfStudy)}</div>
      </div>
    </div>
  `).join('')}
  ` : ''}

  ${data.skills?.length ? `
  <h2><span>Expertise</span> <div class="section-icon"></div></h2>
  <div class="skills-grid">
    ${data.skills.map(skill => `<div class="skill-tag">${escape(skill.name)}</div>`).join('')}
  </div>
  ` : ''}

  ${data.references?.length ? `
  <h2><span>Awards / Refs</span> <div class="section-icon"></div></h2>
  ${data.references.map(ref => `
     <div class="item-row">
      <div class="left-col">
        <div class="item-title">${escape(ref.name)}</div>
      </div>
      <div class="right-col">
        <div class="item-subtitle">${escape(ref.company)}</div>
        <div class="item-desc">${escape(ref.relationship)} | ${escape(ref.email)}</div>
      </div>
    </div>
  `).join('')}
  ` : ''}
</body>
</html>
`;
