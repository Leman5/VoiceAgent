"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-text-muted mb-6">Last updated: January 18, 2026</p>

                <section className="space-y-8 prose prose-invert max-w-none">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                        <p className="text-text-secondary leading-relaxed">
                            We collect information you provide directly to us, such as when you create an account, use our AI voice services, or contact support. This may include your name, email, phone number, and recordings/transcripts of calls processed by our AI agents.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-text-secondary space-y-2">
                            <li>To provide, maintain, and improve our AI voice services.</li>
                            <li>To process calls and schedule appointments on your behalf.</li>
                            <li>To send you technical notices, updates, and security alerts.</li>
                            <li>To monitor and analyze trends, usage, and activities.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
                        <p className="text-text-secondary leading-relaxed">
                            We use industry-standard security measures to protect your data. All calls are encrypted in transit and at rest. We do not sell your personal information or call data to third parties.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">4. GDPR Compliance</h2>
                        <p className="text-text-secondary leading-relaxed">
                            For users in the European Union, we comply with GDPR requirements. You have the right to access, rectify, or erase your personal data at any time through your dashboard or by contacting us.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
                        <p className="text-text-secondary leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@voicebot.ai.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
