import { Request, Response } from 'express';
import { generatePdf } from '../services/pdf.service';
import { GeneratePdfSchema } from '../schemas/pdf.schema';
import { CVBuilderService } from '../services/CVBuilderService';

export const generatePdfController = async (req: Request, res: Response) => {
  try {
    const validation = GeneratePdfSchema.safeParse(req.body);

    console.log(validation, req.body);

    if (!validation.success) {
      res.status(400).json({ error: validation.error.issues });
      return;
    }

    const pdfBuffer = await generatePdf(validation.data);

    const userId = req.user?.userId;

    if (userId && validation.data.cvId) {
      await CVBuilderService.sendCVDoc(validation.data.cvId, userId);
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cv-${validation.data.templateId}.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
