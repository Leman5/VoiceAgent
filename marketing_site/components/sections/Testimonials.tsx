"use client";

import { useState, useEffect } from "react";
import { m, useAnimationControls, AnimatePresence } from "framer-motion";
import { Star, Quote, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

// --- Data ---

const TESTIMONIALS = [
    {
        id: 1,
        name: "Maria Rodriguez",
        role: "Owner, Tio's Tacos",
        quote: "Handles our delivery orders perfectly. Customers can't tell it's AI.",
        fullReview: "We used to miss so many calls during the dinner rush. Now, Voice Agent handles everything—taking orders, answering menu questions, and even handling special requests. Our after-hours orders have skyrocketed because it picks up even when we're closed.",
        metric: "+40% after-hours orders",
        emoji: "🌮",
        bg: "bg-orange-500/10",
        color: "text-orange-500",
    },
    {
        id: 2,
        name: "Jake Thompson",
        role: "Lead Contractor, BuildRite",
        quote: "Qualifies leads while I'm on job sites. Game changer.",
        fullReview: "I'm on a roof or under a sink half the day. I can't answer the phone. This agent screens calls, asks about project details/budget, and books the estimates that are actually worth my time. It's like having a full-time secretary for a fraction of the cost.",
        metric: "2x more estimates",
        emoji: "🛠️",
        bg: "bg-blue-500/10",
        color: "text-blue-500",
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        role: "Owner, Glow Salon",
        quote: "No more double-bookings. Syncs with my calendar automatically.",
        fullReview: "The calendar integration is flawless. It knows exactly when my stylists are free and books appointments directly into our system. It even handles rescheduling requests without me lifting a finger. My clients love that they can book at 2 AM.",
        metric: "Zero scheduling conflicts",
        emoji: "✂️",
        bg: "bg-pink-500/10",
        color: "text-pink-500",
    },
    {
        id: 4,
        name: "Dr. Michael Chen",
        role: "Chen Dental Practice",
        quote: "Patients love the instant response. It feels very personal.",
        fullReview: "We were worried AI would sound robotic, but the voice quality is incredible. It handles scheduling, insurance questions, and emergency triage with surprising empathy. Our patient satisfaction scores have actually gone up.",
        metric: "Patients love it",
        emoji: "🦷",
        bg: "bg-emerald-500/10",
        color: "text-emerald-500",
    },
    {
        id: 5,
        name: "Elena Vasquez",
        role: "Realtor, Horizon Homes",
        quote: "Leads answered in <5s. Speed to lead is everything.",
        fullReview: "In real estate, if you don't answer, you lose the deal. This agent picks up instantly, 24/7. It pre-qualifies buyers, schedules viewings, and sends me the transcripts immediately. I've closed 3 extra deals this month solely because of this speed.",
        metric: "Instant Lead Capture",
        emoji: "🏠",
        bg: "bg-indigo-500/10",
        color: "text-indigo-500",
    },
    {
        id: 6,
        name: "David Miller",
        role: "Partner, Miller Law",
        quote: "24/7 Intake. We finally stopped losing weekend callers.",
        fullReview: "Legal issues don't happen only 9-5. We were losing potential clients to other firms who answered the phone on weekends. Now, our AI intake agent gathers all the case details professionally, anytime. It's incredibly reliable.",
        metric: "24/7 Client Intake",
        emoji: "⚖️",
        bg: "bg-slate-500/10",
        color: "text-slate-500",
    },
];

// Duplicate for infinite scroll
const SCROLL_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const controls = useAnimationControls();
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            controls.start({
                x: "-50%",
                transition: {
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                },
            });
        } else {
            controls.stop();
        }
    }, [controls, isPaused]);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-indigo-900/5 via-purple-900/5 to-emerald-900/5 blur-[120px] pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-12 text-center relative z-10">
                <m.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-6"
                >
                    Loved by businesses everywhere
                </m.h2>
                <m.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-text-secondary text-lg"
                >
                    Join thousands of companies automating their phone lines.
                </m.p>
            </div>

            {/* Marquee Container */}
            <div
                className="w-full relative overflow-hidden py-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden">
                    <m.div
                        className="flex gap-6 pl-4"
                        animate={controls}
                        initial={{ x: "0%" }}
                        style={{ width: "max-content", willChange: "transform" }}
                    >
                        {SCROLL_ITEMS.map((item, index) => (
                            <m.div
                                key={`${item.id}-${index}`}
                                onClick={() => setSelectedId(item.id)}
                                className="w-[350px] md:w-[400px] xl:w-[450px] 2xl:w-[500px] shrink-0 p-6 rounded-2xl bg-surface/30 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all cursor-pointer group hover:bg-surface/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                role="button"
                                tabIndex={index < TESTIMONIALS.length ? 0 : -1}
                                aria-hidden={index >= TESTIMONIALS.length}
                                aria-label={`Read testimonial from ${item.name}`}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedId(item.id)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", item.bg)}>
                                        {item.emoji}
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>

                                <Quote className="w-8 h-8 text-white/10 mb-4" />

                                <h3 className="text-xl font-medium text-white mb-6 leading-relaxed">
                                    "{item.quote}"
                                </h3>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="font-semibold text-white">{item.name}</p>
                                        <p className="text-sm text-text-secondary">{item.role}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <Badge variant="outline" className={cn("border-opacity-30", item.color, item.bg)}>
                                        {item.metric}
                                    </Badge>
                                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                    </span>
                                </div>
                            </m.div>
                        ))}
                    </m.div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 mt-16 text-center border-t border-white/5 pt-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">4.9/5</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
                        </div>
                        <span className="text-sm text-text-secondary ml-2">from 1,247 reviews</span>
                    </div>
                    <div className="text-lg font-bold font-serif tracking-tight text-white">Trustpilot</div>
                    <div className="text-lg font-bold font-sans tracking-tight text-white">Capterra</div>
                    <div className="text-lg font-bold font-sans tracking-tight text-white">G2 Crowd</div>
                </div>
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        {TESTIMONIALS.filter(t => t.id === selectedId).map((item) => (
                            <m.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl z-50 overflow-hidden"
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-3xl", item.bg)}>
                                        {item.emoji}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <p className="text-text-secondary">{item.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                <p className="text-lg text-white leading-relaxed mb-8">
                                    "{item.fullReview}"
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Key Result</span>
                                        <span className={cn("text-lg font-bold", item.color)}>{item.metric}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Verified Customer</span>
                                        <span className="text-sm text-white block">Since 2024</span>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
