import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Download } from 'lucide-react';
import logo from '../../assets/white.svg';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div> {/* Optional generic grid suggestion */}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 flex flex-col items-center max-w-4xl w-full"
            >
                <motion.div variants={itemVariants} className="mb-8 p-4 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                    <img src={logo} alt="CV On The Move" className="h-16 w-auto" />
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                    CV On The Move
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl text-slate-300 text-center mb-12 max-w-2xl">
                    Create, edit, and download professional resumes in minutes.
                    Your career journey starts here.
                </motion.p>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <Card
                        icon={<Plus className="w-8 h-8 text-blue-400" />}
                        title="Create CV"
                        description="Start from scratch with our easy-to-use wizard."
                        onClick={() => navigate('/create')}
                    />
                    <Card
                        icon={<Edit3 className="w-8 h-8 text-emerald-400" />}
                        title="Edit CV"
                        description="Update your existing CV with new achievements."
                        onClick={() => navigate('/dashboard')}
                    />
                    <Card
                        icon={<Download className="w-8 h-8 text-purple-400" />}
                        title="Download"
                        description="Get your CV in PDF format instantly."
                        onClick={() => navigate('/download')}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

interface CardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, title, description, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 transition-colors text-center group h-full"
        >
            <div className="mb-4 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
        </motion.button>
    );
};

export default LandingPage;
