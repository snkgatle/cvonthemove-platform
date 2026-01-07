import { DashboardHeader } from '../cv-builder/components/DashboardHeader';
import Footer from '../../components/Footer';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <DashboardHeader logoNavUrl="/" showAccountInfo={false} />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl text-slate-300">
                <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6">
                    <section>
                        <p className="text-sm text-slate-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                        <p>
                            At CV On The Move, we are committed to protecting your privacy and ensuring that your personal information is collected and processed in compliance with the Protection of Personal Information Act (POPIA) of South Africa. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CV building platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p className="mb-2">We collect personal information that you voluntarily provide to us when creating your CV, including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Personal identifiers (Name, ID number, Date of Birth).</li>
                            <li>Contact details (Email address, Phone number, Physical address).</li>
                            <li>Professional history (Employment history, Education, Skills, References).</li>
                            <li>Account credentials (when you register for an account).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p className="mb-2">Your personal information is processed for the following purposes:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To provide and maintain our CV generation service.</li>
                            <li>To generate downloadable PDF documents containing your CV data.</li>
                            <li>To manage your account and authentication.</li>
                            <li>To communicate with you regarding your account or service updates.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Compliance with POPIA</h2>
                        <p>
                            We acknowledge our role as a "Responsible Party" under POPIA. We take reasonable technical and organizational measures to prevent loss of, damage to, or unauthorized destruction of personal information and unlawful access to or processing of personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Information Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal identification information to others. We do not share your CV data with third-party recruiters or employers unless you explicitly authorize us to do so in future features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
                        <p className="mb-2">Under South African law, you have the right to:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Request access to the personal information we hold about you.</li>
                            <li>Request the correction or update of your personal information.</li>
                            <li>Request the deletion of your personal information.</li>
                            <li>Object to the processing of your personal information.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or wish to exercise your rights under POPIA, please contact our Information Officer at:<br />
                            <a href="mailto:privacy@cvonthemove.site" className="text-blue-400 hover:underline">privacy@cvonthemove.site</a>
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
