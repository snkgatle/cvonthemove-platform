import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Check } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: (templateId: string) => void;
    isDownloading?: boolean;
}

const templates = [
    {
        id: 'modern',
        name: 'Modern',
        description: 'Clean and contemporary design with accent colors.',
        color: 'bg-blue-500',
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional layout suitable for corporate roles.',
        color: 'bg-slate-500',
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Minimalist and elegant, focusing on content.',
        color: 'bg-emerald-500',
    },
];

export const DownloadModal: React.FC<DownloadModalProps> = ({
    isOpen,
    onClose,
    onDownload,
    isDownloading = false,
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-slate-800 rounded-2xl shadow-xl border border-white/10 overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Download className="w-6 h-6 text-blue-400" />
                            Download CV
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        <p className="text-slate-300 mb-6">
                            Select a template style for your CV. All templates are optimized for ATS readability.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTemplate === template.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-white/10 hover:border-white/20 bg-white/5'
                                        }`}
                                >
                                    {selectedTemplate === template.id && (
                                        <div className="absolute top-3 right-3 text-blue-400">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center mb-3`}>
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                                    <p className="text-xs text-slate-400">{template.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onDownload(selectedTemplate)}
                                disabled={isDownloading}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isDownloading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Download PDF
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
