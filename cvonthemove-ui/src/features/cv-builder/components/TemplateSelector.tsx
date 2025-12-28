import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export type TemplateId = 'classic' | 'modern' | 'minimalist' | 'creative' | 'professional';

interface TemplateSelectorProps {
    onSelect: (templateId: TemplateId) => void;
    selectedTemplate?: TemplateId;
}

const templates: { id: TemplateId; name: string; description: string; color: string }[] = [
    { id: 'classic', name: 'Classic', description: 'Timeless and professional design.', color: 'bg-slate-700' },
    { id: 'modern', name: 'Modern', description: 'Clean lines and contemporary look.', color: 'bg-blue-600' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple, elegant, and to the point.', color: 'bg-emerald-600' },
    { id: 'creative', name: 'Creative', description: 'Stand out with a unique layout.', color: 'bg-purple-600' },
    { id: 'professional', name: 'Professional', description: 'Structured for corporate roles.', color: 'bg-gray-800' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, selectedTemplate }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Select a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <motion.button
                        key={template.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(template.id)}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all h-full flex flex-col ${
                            selectedTemplate === template.id
                                ? 'border-blue-400 bg-white/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                    >
                        <div className={`h-32 w-full rounded-lg mb-4 ${template.color} flex items-center justify-center`}>
                            {/* Placeholder for template preview */}
                            <span className="text-white/50 text-sm font-medium">{template.name} Preview</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                        <p className="text-slate-400 text-sm flex-grow">{template.description}</p>

                        {selectedTemplate === template.id && (
                            <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-1">
                                <Check size={16} className="text-white" />
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
