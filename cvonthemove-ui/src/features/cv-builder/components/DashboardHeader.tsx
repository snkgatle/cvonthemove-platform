import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../assets/white.svg';

interface DashboardHeaderProps {
    logoNavUrl?: string;
    showAccountInfo?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ logoNavUrl = '/', showAccountInfo = true }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-slate-800/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center h-16 ${showAccountInfo ? 'justify-between' : 'justify-center'}`}>
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate(logoNavUrl)}>
                        <img src={logo} alt="CV On The Move" className="h-8 w-auto" />
                    </div>

                    {/* User Menu */}
                    {
                        showAccountInfo &&
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                    <User size={16} />
                                </div>
                                <span className="hidden md:block font-medium">Account</span>
                                <ChevronDown size={16} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                        className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div className="px-4 py-3 border-b border-white/5">
                                            <p className="text-sm text-white font-medium">My Account</p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                navigate('/account');
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center space-x-2 transition-colors"
                                        >
                                            <Settings size={16} />
                                            <span>Settings</span>
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center space-x-2 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            <span>Sign out</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    }
                </div>
            </div>
        </header>
    );
};
