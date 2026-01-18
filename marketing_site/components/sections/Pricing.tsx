"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

// --- Constants ---
const RECEPTIONIST_COST = 2400; // Monthly cost reference
const AVG_CALL_DURATION = 3; // Minutes
const PAYG_RATE = 0.20; // Per minute
const UNLIMITED_PRICE = 149; // Flat rate

export function Pricing() {
    const [callsPerMonth, setCallsPerMonth] = useState(200);
    const [faqOpen, setFaqOpen] = useState<string | null>(null);

    // --- Calculations ---
    const estimatedMinutes = callsPerMonth * AVG_CALL_DURATION;
    const paygCost = estimatedMinutes * PAYG_RATE;
    // Smart pricing: show the lowest cost option (PAYG vs Unlimited)
    const monthlyCost = Math.min(paygCost, UNLIMITED_PRICE);
    const isCapped = paygCost > UNLIMITED_PRICE;
    const savings = RECEPTIONIST_COST - monthlyCost;

    const faqs = [
        {
            question: "How does it sound so human?",
            answer: "We use cutting-edge neural voice synthesis that includes natural breathing patterns, pauses, and intonation. Our models are trained on thousands of hours of real conversations, not robotic text-to-speech. The result is indistinguishable from a human assistant in most cases."
        },
        {
            question: "Can customers tell it's AI?",
            answer: "In blind tests, 94% of callers couldn't identify our agent as AI during the first 30 seconds. Many never realize at all. However, we recommend transparency - you can configure it to introduce itself as an 'automated assistant' if you prefer."
        },
        {
            question: "What if it can't answer something?",
            answer: "The agent is trained to recognize when it's out of its depth. It will offer to take a detailed message, transfer to your phone/team, or schedule a callback. You'll receive an immediate notification with a transcript of what the customer needed."
        },
        {
            question: "How long does setup take?",
            answer: "Most customers are live within 5-10 minutes. You'll fill out a quick questionnaire about your business (hours, services, policies), pick a voice, and connect your phone. Our onboarding wizard guides you through each step. No technical knowledge required."
        },
        {
            question: "Can I port my existing number?",
            answer: "Yes! We support number porting from all major carriers (takes 3-5 days). Alternatively, you can use conditional forwarding or we can provide a new dedicated number."
        },
        {
            question: "What happens if I go over my plan limits?",
            answer: "On the Pay As You Go plan, there's no limit - just pay $0.20/min. On the Unlimited plan, fair use is 5,000 mins/month, after which standard rates apply. We'll notify you before you hit any thresholds."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Absolutely. There are no long-term contracts. You can pause or cancel from your dashboard anytime and retain access through the end of your billing period."
        },
        {
            question: "Does it work for my industry?",
            answer: "Our agents serve restaurants, salons, contractors, law firms, and more. If you take calls for scheduling or inquiries, it works. We offer industry-specific templates to get you started."
        },
        {
            question: "Is my data secure?",
            answer: "Yes. All calls are encrypted. We're SOC 2 Type II and GDPR compliant. Your data is never shared or sold, and you can delete call records anytime."
        },
        {
            question: "Can I customize what it says?",
            answer: "Completely. You control the greeting, hold messages, appointment scripts, and FAQs. Changes take effect immediately without re-training."
        },
        {
            question: "Does it support multiple languages?",
            answer: "Yes, our agents speak over 50 languages and can automatically detect and switch languages during a call."
        },
        {
            question: "Is there a setup fee?",
            answer: "No, there are no hidden setup fees. You can get started for free with our 14-day trial."
        }
    ];

    return (
        <section className="py-24 bg-black relative" id="pricing">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 relative z-10">

                {/* Header */}
                <div className="text-center max-w-6xl mx-auto mb-16">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Pricing That Makes Sense
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg"
                    >
                        Pay for what you use. No surprises.
                    </m.p>
                </div>

                {/* --- Interactive Calculator --- */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="bg-surface/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="text-[200px] leading-none font-bold text-white select-none">$</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                            {/* Input Side */}
                            <div className="space-y-8">
                                <div>
                                    <label className="text-white font-medium text-lg block mb-4">
                                        How many calls do you receive per month?
                                    </label>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-text-secondary text-sm">0</span>
                                        <span className="text-3xl font-bold text-white tabular-nums">{callsPerMonth}</span>
                                        <span className="text-text-secondary text-sm">1,000+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        step="10"
                                        value={callsPerMonth}
                                        onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                                        className="w-full h-2 bg-surface-highlight rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    />
                                    <p className="text-xs text-text-secondary mt-2">
                                        *Estimated based on average 3-minute call duration
                                    </p>
                                </div>

                                <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-text-secondary">Vs. Hiring Receptionist</span>
                                        <span className="text-white font-semibold line-through decoration-red-500/50 decoration-2">${RECEPTIONIST_COST}/mo</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-emerald-400 font-bold">You Save</span>
                                        <span className="text-emerald-400 font-bold text-xl">
                                            $<AnimatedNumber value={savings} />/mo
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Output Side */}
                            <div className="flex flex-col justify-center items-center text-center space-y-4">
                                <p className="text-text-secondary">Estimated Monthly Cost</p>

                                <div className="relative">
                                    <div className="text-6xl md:text-7xl font-bold text-white tracking-tight flex items-start justify-center">
                                        <span className="text-3xl mt-2 mr-1 text-text-secondary">$</span>
                                        <AnimatedNumber value={monthlyCost} />
                                    </div>
                                    {isCapped && (
                                        <m.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max"
                                        >
                                            <Badge variant="feature" className="bg-indigo-500 text-white border-transparent">
                                                Capped at Unlimited Plan
                                            </Badge>
                                        </m.div>
                                    )}
                                </div>

                                <p className="text-sm text-text-secondary py-4 max-w-xs">
                                    {isCapped
                                        ? "Your volume qualifies for our flat-rate Unlimited plan."
                                        : "Based on pay-as-you-go rates. Scale up or down anytime."}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- Plan Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto mb-20">

                    {/* PAYG Card */}
                    <Card className="p-8 flex flex-col items-start border-white/10 hover:border-white/20 transition-colors">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Pay As You Go</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">$0.20</span>
                                <span className="text-text-secondary">/ minute</span>
                            </div>
                            <p className="text-text-secondary text-sm mt-3">No monthly fee. Perfect for low-volume or seasonal businesses.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1 w-full border-t border-white/5 pt-6">
                            {["No monthly commitment", "Unlimited concurrent calls", "Basic Analytics", "Email Support", "Voicemail Transcription"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-white/50" />
                                    <span className="text-sm text-text-secondary">{feat}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="secondary" className="w-full">Start Free Trial</Button>
                    </Card>

                    {/* Unlimited Card */}
                    <Card className="p-8 flex flex-col items-start bg-indigo-900/10 border-indigo-500/30 hover:border-indigo-500/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            MOST POPULAR
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Unlimited</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">$149</span>
                                <span className="text-text-secondary">/ month</span>
                            </div>
                            <p className="text-indigo-200 text-sm mt-3">Predictable flat pricing for busy businesses.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1 w-full border-t border-indigo-500/20 pt-6">
                            {["Everything in PAYG", "Unlimited Call Minutes", "Priority 24/7 Support", "Advanced Analytics Dashboard", "Custom Voice Cloning"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-0.5 bg-indigo-500 rounded-full">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm text-white">{feat}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant="primary" className="w-full">Start Free Trial</Button>
                    </Card>

                </div>

                {/* --- Trust & FAQ --- */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6"
                        >
                            Questions? Answered.
                        </m.h2>
                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-text-secondary text-lg mb-8"
                        >
                            Everything you need to know about VoiceBot
                        </m.p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <m.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-white font-medium"
                            >
                                All plans include a 14-day free trial
                            </m.p>
                            <span className="hidden sm:block text-white/10">|</span>
                            <m.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-text-secondary text-sm"
                            >
                                No credit card required to start.
                            </m.p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-white/10 last:border-0">
                                <button
                                    onClick={() => setFaqOpen(faqOpen === String(i) ? null : String(i))}
                                    className="w-full py-4 flex items-center justify-between text-left hover:text-white transition-colors text-text-secondary"
                                >
                                    <span className="font-medium text-white">{faq.question}</span>
                                    {faqOpen === String(i) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                <AnimatePresence>
                                    {faqOpen === String(i) && (
                                        <m.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <p className="pb-4 text-text-secondary text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
