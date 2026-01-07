import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CVBuilderForm } from './CVBuilderForm';
import { TemplateSelector, type TemplateId } from './TemplateSelector';
import { CompletionStep } from './CompletionStep';
import { type CreateCVInput } from '../types';
import { cvService } from '../services/cvService';
import { ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { Modal } from '../../../components/Modal';
import '../styles/form.css';
import Preloader from '../../../components/Preloader';
import { DashboardHeader } from './DashboardHeader';
export { DashboardPage } from './DashboardPage';

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
            {isDownloading && <Preloader />}
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
                    <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        onSelect={handleTemplateSelect}
                    />
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
                <CompletionStep
                    onDownload={handleDownload}
                    isDownloading={isDownloading}
                    formData={formData}
                    templateId={selectedTemplate}
                />
            )}
        </div>
    );
};

export const EditCVPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [initialData, setInitialData] = useState<CreateCVInput | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic');
    const [isDownloading, setIsDownloading] = useState(false);

    // Maintain current form data to use in download even if not re-fetched
    const [currentFormData, setCurrentFormData] = useState<CreateCVInput | undefined>(undefined);

    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');

    useEffect(() => {
        // Auth check
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const fetchCV = async () => {
            if (!id) return;
            try {
                const data = await cvService.getCV(id);
                setInitialData(data);
                setCurrentFormData(data);
            } catch (error) {
                console.error("Failed to fetch CV", error);
                alert("Failed to load CV.");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [id, navigate, location]);

    useEffect(() => {
        if (!loading && section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, section]);

    const handleEditDownload = async (data: CreateCVInput) => {
        navigate('/dashboard', { state: { openDownloadModal: true } })
    };

    const handlePatch = async (section: keyof CreateCVInput, data: Partial<CreateCVInput>) => {
        if (!id) return;
        try {
            await cvService.patchCV(id, data);
        } catch (error) {
            console.error(`Failed to patch ${section}`, error);
            alert(`Failed to save ${section}. Please try again.`);
            throw error;
        }
    };

    const handleDownload = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location } });
            return;
        }

        if (!currentFormData || !selectedTemplate) return;

        setIsDownloading(true);
        try {
            const blob = await cvService.generatePDF(currentFormData, selectedTemplate);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `cv-${currentFormData.personalDetails?.fullName.replace(/\s+/g, '-').toLowerCase() || 'document'}.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) link.parentNode.removeChild(link);

            // Revoke the object URL to avoid memory leaks
            setTimeout(() => window.URL.revokeObjectURL(url), 100);

            // Close modal after download starts? Optional.
            setTemplateModalOpen(false);
        } catch (error) {
            console.error("Failed to generate PDF", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className='min-h-screen bg-slate-900'>
            <DashboardHeader logoNavUrl="/dashboard" />
            <div className="p-8 bg-slate-900 min-h-screen">
                {isDownloading && <Preloader />}
                <h1 className="text-center text-white mb-8 text-3xl font-bold">Edit CV</h1>
                {initialData && (
                    <CVBuilderForm
                        initialData={initialData}
                        onSubmit={handleEditDownload}
                        onPatch={handlePatch}
                        submitLabel="Download CV"
                        submitIcon={Download}
                    />
                )}

                <Modal
                    isOpen={isTemplateModalOpen}
                    onClose={() => setTemplateModalOpen(false)}
                    title="Select Template & Download"
                    footer={(
                        <div className="flex justify-end">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="btn-primary flex items-center gap-2 px-8 py-3"
                            >
                                <Download size={20} />
                                Download PDF
                            </button>
                        </div>
                    )}
                >
                    <div className="flex flex-col gap-6">
                        <p className="text-slate-300">Choose a template for your CV:</p>
                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onSelect={setSelectedTemplate}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};
