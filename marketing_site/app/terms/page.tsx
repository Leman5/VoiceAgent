"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <p className="text-text-muted mb-6">Last updated: January 18, 2026</p>

                <section className="space-y-8 prose prose-invert max-w-none">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-text-secondary leading-relaxed">
                            By accessing or using VoiceBot, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                        <p className="text-text-secondary leading-relaxed">
                            VoiceBot provides AI-powered phone answering, appointment scheduling, and lead capture services. We reserve the right to modify or discontinue any part of the service at any time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">3. User Obligations</h2>
                        <p className="text-text-secondary leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use the service in compliance with all applicable laws and regulations, including those regarding telemarketing and privacy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">4. Pricing and Payments</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Pricing for our services is listed on our website. We reserve the right to change our pricing upon notice. All payments are non-refundable unless otherwise specified.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                        <p className="text-text-secondary leading-relaxed">
                            VoiceBot shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the service.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
