import { DashboardHeader } from '../cv-builder/components/DashboardHeader';
import Footer from '../../components/Footer';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <DashboardHeader logoNavUrl="/" showAccountInfo={false} />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl text-slate-300">
                <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="space-y-6">
                    <section>
                        <p className="text-sm text-slate-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                        <p>
                            Welcome to CV On The Move. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service. These terms are governed by the laws of the Republic of South Africa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Use of Service</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>You must be at least 18 years old to use this service.</li>
                            <li>You are responsible for maintaining the confidentiality of your account capabilities and password.</li>
                            <li>You agree to provide accurate, current, and complete information during the registration and CV building process.</li>
                            <li>You may not use the service for any illegal or unauthorized purpose.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Intellectual Property</h2>
                        <p>
                            The service and its original content (excluding content provided by you), features, and functionality are and will remain the exclusive property of CV On The Move and its licensors.
                        </p>
                        <p className="mt-2">
                            You retain all rights to the CV data and content you input. By using the service, you grant us a license to process this data solely for the purpose of generating your CV documents.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. User Content</h2>
                        <p>
                            You are solely responsible for the content you post on or through the Service. You represent and warrant that you own or have the necessary rights to use and display the content you submit. We reserve the right to remove non-compliant content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable South African law, including the Consumer Protection Act 68 of 2008, CV On The Move shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Termination</h2>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:<br />
                            <a href="mailto:support@cvonthemove.site" className="text-blue-400 hover:underline">support@cvonthemove.site</a>
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfServicePage;
