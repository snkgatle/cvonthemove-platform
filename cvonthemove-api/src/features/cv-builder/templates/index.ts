import { CreateCVInput } from '../schemas/cvSchemas';
import { classicTemplate } from './classic';
import { modernTemplate } from './modern';
import { minimalistTemplate } from './minimalist';
import { creativeTemplate } from './creative';
import { professionalTemplate } from './professional';

export type TemplateId = 'classic' | 'modern' | 'minimalist' | 'creative' | 'professional';

const templates: Record<TemplateId, (data: CreateCVInput) => string> = {
  classic: classicTemplate,
  modern: modernTemplate,
  minimalist: minimalistTemplate,
  creative: creativeTemplate,
  professional: professionalTemplate,
};

export const getTemplateHtml = (templateId: TemplateId, data: CreateCVInput): string => {
  const template = templates[templateId];
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }
  return template(data);
};
