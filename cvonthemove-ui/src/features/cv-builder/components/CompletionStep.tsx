import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Download, UserPlus, Check, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { type CreateCVInput } from '../types';
import { type TemplateId } from './TemplateSelector';
import { AIAgentModal } from './AIAgent/AIAgentModal';
import { cvService } from '../services/cvService';

interface CompletionStepProps {
    onDownload: () => void;
    isDownloading?: boolean;
    formData?: CreateCVInput;
    templateId?: TemplateId;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
    onDownload,
    isDownloading = false,
    formData,
    templateId
}) => {
    const navigate = useNavigate();
    const [isAgentOpen, setIsAgentOpen] = useState(false);

    const handleCreateAccount = (data?: CreateCVInput) => {
        navigate('/signup', {
            state: {
                cvData: data || formData,
                templateId: templateId
            }
        });
    };

    const handleAgentDownload = async (data: CreateCVInput) => {
        try {
            const blob = await cvService.generatePDF(data, templateId || 'classic');
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `cv-${data.personalDetails?.fullName.replace(/\s+/g, '-').toLowerCase() || 'document'}.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) link.parentNode.removeChild(link);
            setIsAgentOpen(false);
        } catch (error) {
            console.error("Failed to generate PDF from Agent", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const handleAgentSave = (data: CreateCVInput) => {
        handleCreateAccount(data);
        setIsAgentOpen(false);
    };

    return (
        <div className="max-w-2xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-400" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Your CV is Ready!</h2>
                <p className="text-slate-300 mb-8 text-lg">
                    You've successfully created your professional CV. What would you like to do next?
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => handleCreateAccount()}
                        className="w-full btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center gap-2 py-4 text-lg"
                    >
                        <UserPlus size={20} />
                        Create Account to Save
                    </button>

                    <p className="text-sm text-slate-400 my-2">
                        Create an account to save your CV, edit it later, and create multiple versions.
                    </p>

                    <div className="h-px bg-white/10 my-6"></div>

                    <button
                        onClick={onDownload}
                        disabled={isDownloading}
                        className="w-full btn-secondary bg-slate-700 hover:bg-slate-600 text-white border-none flex items-center justify-center gap-2 py-3"
                    >
                        <Download size={20} />
                        {isDownloading ? 'Generating PDF...' : 'Download PDF Only'}
                    </button>

                    <button
                        onClick={() => setIsAgentOpen(true)}
                        className="w-full btn-secondary bg-indigo-600 hover:bg-indigo-700 text-white border-none flex items-center justify-center gap-2 py-3 mt-4"
                    >
                        <Bot size={20} />
                        Use AI
                    </button>
                </div>
            </motion.div>

            <AIAgentModal
                isOpen={isAgentOpen}
                onClose={() => setIsAgentOpen(false)}
                onDownload={handleAgentDownload}
                onSave={handleAgentSave}
            />
        </div>
    );
};
