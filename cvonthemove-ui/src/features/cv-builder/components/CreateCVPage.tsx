import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CVBuilderForm } from './CVBuilderForm';
import { type TemplateId } from './TemplateSelector';
import { type CreateCVInput } from '../types';
import { cvService } from '../services/cvService';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import '../styles/form.css';
import Preloader from '../../../components/Preloader';
import { DashboardHeader } from './DashboardHeader';

const TemplateSelector = lazy(() => import('./TemplateSelector').then(module => ({ default: module.TemplateSelector })));
const CompletionStep = lazy(() => import('./CompletionStep').then(module => ({ default: module.CompletionStep })));

const CreateStep = {
    FORM: 1,
    TEMPLATE: 2,
    COMPLETION: 3
} as const;

type CreateStep = typeof CreateStep[keyof typeof CreateStep];

export const CreateCVPage = () => {
    // const navigate = useNavigate(); // Not used currently in CreateCVPage logic except implicitly by back
    const [step, setStep] = useState<CreateStep>(CreateStep.FORM);
    const [formData, setFormData] = useState<CreateCVInput | undefined>(undefined);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleFormSubmit = (data: CreateCVInput) => {
        setFormData(data);
        setStep(CreateStep.TEMPLATE);
        window.scrollTo(0, 0);
    };

    const handleTemplateSelect = (templateId: TemplateId) => {
        setSelectedTemplate(templateId);
    };

    const handleTemplateConfirm = () => {
        if (selectedTemplate) {
            setStep(CreateStep.COMPLETION);
            window.scrollTo(0, 0);
        }
    };

    const handleDownload = async () => {
        if (!formData || !selectedTemplate) return;

        setIsDownloading(true);
        try {
            const blob = await cvService.generatePDF(formData, selectedTemplate);
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `cv-${formData.personalDetails?.fullName.replace(/\s+/g, '-').toLowerCase() || 'document'}.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Failed to generate PDF", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleBack = () => {
        if (step === CreateStep.TEMPLATE) setStep(CreateStep.FORM);
        if (step === CreateStep.COMPLETION) setStep(CreateStep.TEMPLATE);
    };

    return (
        <div className="p-4 md:p-8 bg-slate-900 min-h-screen">
            <AnimatePresence>
                {isDownloading && <Preloader />}
            </AnimatePresence>
            <DashboardHeader showAccountInfo={false} />
            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto mb-8 mt-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10"></div>
                    <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-700'}`}>1</div>
                        <span className="text-xs md:text-sm font-medium">Details</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-700'}`}>2</div>
                        <span className="text-xs md:text-sm font-medium">Template</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-blue-400' : 'text-slate-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-700'}`}>3</div>
                        <span className="text-xs md:text-sm font-medium">Download</span>
                    </div>
                </div>
            </div>

            {step > 1 && (
                <button
                    onClick={handleBack}
                    className="mb-4 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft size={20} /> Back
                </button>
            )}

            {step === CreateStep.FORM && (
                <>
                    <h1 className="text-center text-white mb-8 text-3xl font-bold">Enter CV Details</h1>
                    <CVBuilderForm
                        initialData={formData}
                        onSubmit={handleFormSubmit}
                        submitLabel="Next Step"
                        submitIcon={ArrowRight}
                    />
                </>
            )}

            {step === CreateStep.TEMPLATE && (
                <div className="flex flex-col gap-8">
                    <Suspense fallback={<Preloader />}>
                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onSelect={handleTemplateSelect}
                        />
                    </Suspense>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleTemplateConfirm}
                            className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
                        >
                            Next Step <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {step === CreateStep.COMPLETION && (
                <Suspense fallback={<Preloader />}>
                    <CompletionStep
                        onDownload={handleDownload}
                        isDownloading={isDownloading}
                        formData={formData}
                        templateId={selectedTemplate}
                    />
                </Suspense>
            )}
        </div>
    );
};
