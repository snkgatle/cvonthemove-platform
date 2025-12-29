import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, UserPlus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { type CreateCVInput } from '../types';
import { type TemplateId } from './TemplateSelector';

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

    const handleCreateAccount = () => {
        navigate('/signup', {
            state: {
                cvData: formData,
                templateId: templateId
            }
        });
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
                        onClick={handleCreateAccount}
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
                </div>
            </motion.div>
        </div>
    );
};
