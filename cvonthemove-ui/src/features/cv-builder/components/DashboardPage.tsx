import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cvService } from '../services/cvService';
import { type CV } from '../types';
import Preloader from '../../../components/Preloader';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSkeleton } from './DashboardSkeleton';

const Modal = lazy(() => import('../../../components/Modal').then(module => ({ default: module.Modal })));
const DownloadModal = lazy(() => import('./DownloadModal').then(module => ({ default: module.DownloadModal })));
const ShareQR = lazy(() => import('./ShareQR').then(module => ({ default: module.ShareQR })));

export const DashboardPage = () => {
    // ... state and effects remain the same ...
    const [cv, setCv] = useState<CV | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for download intent from redirection
        if (location.state?.openDownloadModal) {
            setIsDownloadModalOpen(true);
            // Clear state to prevent reopening on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            const state = location.state?.openDownloadModal
                ? { from: '/dashboard', action: 'download' }
                : { from: '/dashboard' }; // Or default behavior

            // Prefer signup as per user request for download flow
            if (location.state?.openDownloadModal) {
                navigate('/signup', { state });
            } else {
                navigate('/login');
            }
            return;
        }

        const fetchCv = async () => {
            try {
                const data = await cvService.getMyCV();
                setCv(data);
            } catch (error) {
                console.error("Failed to fetch CV", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCv();
    }, [navigate]);

    const handleDownloadClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signup', {
                state: {
                    from: '/dashboard',
                    action: 'download'
                }
            });
            return;
        }
        setIsDownloadModalOpen(true);
    };

    const handleShareClick = () => {
        setIsShareModalOpen(true);
    };

    const handleDownloadConfirm = async (templateId: string) => {
        if (!cv) return;

        setIsDownloading(true);
        try {
            await cvService.downloadCV(cv, templateId);
            setIsDownloadModalOpen(false);
        } catch (error) {
            console.error('Download failed:', error);
            // Optionally show error toast here
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <DashboardSkeleton key="skeleton" />
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-screen bg-slate-900"
                >
                    <DashboardHeader logoNavUrl="/" />
                    {!cv ? (
                        <div className="p-8 text-white text-center">
                            <h1 className="text-3xl font-bold mb-4">No CV Found</h1>
                            <p className="mb-8">You haven't created a CV yet. Let's get started!</p>
                            <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Create a New CV
                            </Link>
                        </div>
                    ) : (
                        <div className="p-8">
                            <h1 className="text-center text-white mb-8 text-3xl font-bold">Edit Your CV</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                <DashboardCard
                                    title="Personal Details"
                                    description="Edit your personal information."
                                    link={`/edit/${cv.id}?section=personalDetails`}
                                />
                                <DashboardCard
                                    title="Addresses"
                                    description="Manage your addresses."
                                    link={`/edit/${cv.id}?section=addresses`}
                                />
                                <DashboardCard
                                    title="Educational Information"
                                    description="Update your education history."
                                    link={`/edit/${cv.id}?section=educations`}
                                />
                                <DashboardCard
                                    title="Work Experience"
                                    description="Modify your work experience."
                                    link={`/edit/${cv.id}?section=workExperiences`}
                                />
                                <DashboardCard
                                    title="Skills"
                                    description="Update your professional skills."
                                    link={`/edit/${cv.id}?section=skills`}
                                />
                                <DashboardCard
                                    title="References"
                                    description="Update your references."
                                    link={`/edit/${cv.id}?section=references`}
                                />

                                <div
                                    className="bg-slate-800 p-6 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-blue-500/30 hover:border-blue-500/60"
                                    onClick={handleDownloadClick}
                                >
                                    <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                        Download CV
                                    </h2>
                                    <p className="text-slate-400 mt-2">Generate a PDF of your CV.</p>
                                    <div className="mt-4 text-blue-500 hover:text-blue-400">
                                        Download PDF &rarr;
                                    </div>
                                </div>

                                <div
                                    className="bg-slate-800 p-6 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-purple-500/30 hover:border-purple-500/60"
                                    onClick={handleShareClick}
                                >
                                    <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                        Share CV
                                    </h2>
                                    <p className="text-slate-400 mt-2">Share your CV via QR Code.</p>
                                    <div className="mt-4 text-purple-500 hover:text-purple-400">
                                        View QR Code &rarr;
                                    </div>
                                </div>
                            </div>

                            <Suspense fallback={<Preloader />}>
                                {isDownloadModalOpen && (
                                    <DownloadModal
                                        isOpen={isDownloadModalOpen}
                                        onClose={() => setIsDownloadModalOpen(false)}
                                        onDownload={handleDownloadConfirm}
                                        isDownloading={isDownloading}
                                    />
                                )}

                                {isShareModalOpen && (
                                    <Modal
                                        isOpen={isShareModalOpen}
                                        onClose={() => setIsShareModalOpen(false)}
                                        title="Share Your CV"
                                    >
                                        <ShareQR
                                            url={`${window.location.origin}/cv-builder/${cv.id}`}
                                            description="Employers can scan this code to view your digital CV."
                                        />
                                    </Modal>
                                )}
                            </Suspense>

                            <AnimatePresence>
                                {isDownloading && <Preloader />}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
}

const DashboardCard = ({ title, description, link }: DashboardCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-slate-800 p-6 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
            onClick={() => navigate(link)}
        >
            <h2 className="text-white text-xl font-bold">{title}</h2>
            <p className="text-slate-400 mt-2">{description}</p>
            <div className="mt-4 text-blue-500 hover:text-blue-400">
                Edit Section &rarr;
            </div>
        </div>
    );
};
