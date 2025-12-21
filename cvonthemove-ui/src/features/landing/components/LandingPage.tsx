import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Edit3, ArrowRight, Layout, Briefcase, GraduationCap } from 'lucide-react';
import '../styles/LandingPage.css';

export const LandingPage: React.FC = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="logo-section">
                    <FileText className="logo-icon" size={28} />
                    <span>CV On The Move</span>
                </div>
                <nav>
                    {/* Placeholder for future auth/nav */}
                </nav>
            </header>

            <main className="hero-section">
                <h1 className="hero-title">
                    Craft Your Professional Story
                </h1>
                <p className="hero-subtitle">
                    Create a stunning CV in minutes. Choose from premium templates,
                    manage multiple versions, and export to PDF instantly.
                </p>

                <div className="action-cards">
                    <div className="card">
                        <div className="card-icon">
                            <FileText size={32} />
                        </div>
                        <h2 className="card-title">Create New</h2>
                        <p className="card-text">
                            Start from scratch with our step-by-step builder.
                            We'll guide you through each section to ensure nothing is missed.
                        </p>
                        <Link to="/create" className="card-link">
                            Start Building <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="card">
                        <div className="card-icon">
                            <Edit3 size={32} />
                        </div>
                        <h2 className="card-title">Edit Existing</h2>
                        <p className="card-text">
                            Already have a profile? Jump back in to update your details,
                            add new skills, or try a different template design.
                        </p>
                        {/* 
                In a real app, this might link to a dashboard or a specific ID.
                For now we link to a placeholder 'edit' route.
             */}
                        <Link to="/edit/demo-cv-id" className="card-link">
                            Edit CV <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Features Grid (Optional additional content) */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#38bdf8', marginBottom: '1rem' }}><Layout /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Premium Templates</h3>
                        <p style={{ color: '#94a3b8' }}>Stand out with professionally designed layouts that pass ATS checks.</p>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#38bdf8', marginBottom: '1rem' }}><Briefcase /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Career Focused</h3>
                        <p style={{ color: '#94a3b8' }}>Tailor your experience and skills to highlight your best assets.</p>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#38bdf8', marginBottom: '1rem' }}><GraduationCap /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Easy Export</h3>
                        <p style={{ color: '#94a3b8' }}>Download high-quality PDFs instantly, ready for application.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
