import puppeteer from 'puppeteer';
import { GeneratePdfInput } from '../schemas/pdf.schema';
import { getTemplateHtml, TemplateId } from '../templates';

export const generatePdf = async (input: GeneratePdfInput): Promise<Buffer> => {
  const { templateId, data } = input;
  const html = getTemplateHtml(templateId as TemplateId, data);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for some environments
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px',
      },
    });

    // Convert Uint8Array to Buffer
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
