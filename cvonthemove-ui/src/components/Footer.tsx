import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-white/5 py-8 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} CV On The Move.</p>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <div className="flex gap-4">
                            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Made with</span>
                        <Heart size={14} className="text-red-500 fill-red-500" />
                        <span>by Kempire</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
                        <SocialLink href="#" icon={<Github size={18} />} label="GitHub" />
                        <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a
        href={href}
        className="text-slate-400 hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-full"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
