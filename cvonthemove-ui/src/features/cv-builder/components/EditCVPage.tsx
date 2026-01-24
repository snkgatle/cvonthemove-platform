import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CVBuilderForm } from './CVBuilderForm';
import { type TemplateId } from './TemplateSelector';
import { type CreateCVInput } from '../types';
import { cvService } from '../services/cvService';
import { Download } from 'lucide-react';
import { Modal } from '../../../components/Modal';
import '../styles/form.css';
import Preloader from '../../../components/Preloader';
import { DashboardHeader } from './DashboardHeader';
import { CVBuilderSkeleton } from './CVBuilderSkeleton';

const TemplateSelector = lazy(() => import('./TemplateSelector').then(module => ({ default: module.TemplateSelector })));

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
        navigate('/dashboard', { state: { openDownloadModal: true, data } })
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
        return (
            <div className='min-h-screen bg-slate-900'>
                <DashboardHeader logoNavUrl="/dashboard" />
                <div className="p-8 max-w-4xl mx-auto">
                    <CVBuilderSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-slate-900'>
            <DashboardHeader logoNavUrl="/dashboard" />
            <div className="p-8 bg-slate-900 min-h-screen">
                <AnimatePresence>
                    {isDownloading && <Preloader />}
                </AnimatePresence>
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
                        <Suspense fallback={<Preloader />}>
                            <TemplateSelector
                                selectedTemplate={selectedTemplate}
                                onSelect={setSelectedTemplate}
                            />
                        </Suspense>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
