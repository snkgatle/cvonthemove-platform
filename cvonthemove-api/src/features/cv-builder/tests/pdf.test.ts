import express from 'express';
import request from 'supertest';
import { describe, it, expect, jest } from '@jest/globals';
import { generatePdfController } from '../controllers/pdf.controller';
import bodyParser from 'body-parser';

// Mock Puppeteer
jest.mock('puppeteer', () => {
  return {
    launch: jest.fn().mockReturnValue(Promise.resolve({
      newPage: jest.fn().mockReturnValue(Promise.resolve({
        setContent: jest.fn(),
        pdf: jest.fn().mockReturnValue(Promise.resolve(Buffer.from('PDF_CONTENT'))),
      })),
      close: jest.fn(),
    })),
  };
});

const app = express();
app.use(bodyParser.json());
app.post('/generate-pdf', generatePdfController);

describe('PDF Generation', () => {
  it('should generate a PDF for valid input', async () => {
    const payload = {
      templateId: 'modern',
      data: {
        personalDetails: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          location: 'New York',
          summary: 'Software Engineer',
        },
        workExperiences: [],
        educations: [],
        skills: [],
      },
    };

    const res = await request(app)
      .post('/generate-pdf')
      .send(payload)
      .expect(200);

    expect(res.headers['content-type']).toBe('application/pdf');
    expect(res.body).toBeDefined();
  });

  it('should return 400 for invalid template ID', async () => {
    const payload = {
      templateId: 'invalid-template',
      data: {
        personalDetails: {
          fullName: 'John Doe',
        },
      },
    };

    await request(app)
      .post('/generate-pdf')
      .send(payload)
      .expect(400);
  });
});
