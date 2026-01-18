"use client";

import { useState, useEffect, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---

const SAMPLE_ACTIVITIES = [
    { business: "Sarah's Salon", action: "answered 3 calls", initial: "S", color: "bg-pink-500" },
    { business: "Mike's Pizza", action: "booked 2 deliveries", initial: "M", color: "bg-orange-500" },
    { business: "Pro Plumbing", action: "scheduled estimate", initial: "P", color: "bg-blue-500" },
    { business: "Bella's Bistro", action: "took 5 reservations", initial: "B", color: "bg-rose-500" },
    { business: "Zen Dental", action: "confirmed 4 appointments", initial: "Z", color: "bg-emerald-500" },
    { business: "Elite Realty", action: "qualified 2 leads", initial: "E", color: "bg-indigo-500" },
    { business: "Max Construction", action: "answered 6 calls", initial: "M", color: "bg-amber-500" },
    { business: "Luna Spa", action: "handled booking inquiry", initial: "L", color: "bg-purple-500" },
    { business: "Quick Auto", action: "scheduled 3 services", initial: "Q", color: "bg-cyan-500" },
    { business: "Home Chef", action: "took catering order", initial: "H", color: "bg-red-500" }
];

type Activity = {
    id: number;
    business: string;
    action: string;
    initial: string;
    color: string;
    timestamp: string;
};

function getRandomActivity(): Activity {
    const sample = SAMPLE_ACTIVITIES[Math.floor(Math.random() * SAMPLE_ACTIVITIES.length)];
    const minutesAgo = Math.floor(Math.random() * 10) + 1;
    return {
        id: Date.now() + Math.random(),
        ...sample,
        timestamp: `${minutesAgo} min ago`
    };
}

export function FinalCTA() {
    const [activities, setActivities] = useState<Activity[]>([
        { ...getRandomActivity(), id: 1 },
        { ...getRandomActivity(), id: 2 },
        { ...getRandomActivity(), id: 3 }
    ]);

    // Auto-update feed
    useEffect(() => {
        const interval = setInterval(() => {
            setActivities(prev => {
                const newActivity = getRandomActivity();
                return [newActivity, ...prev.slice(0, 4)]; // Keep only 5 items
            });
        }, 5000); // New activity every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Magnetic button effect
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - centerX) * 0.3;
        const distanceY = (e.clientY - centerY) * 0.3;
        mouseX.set(distanceX);
        mouseY.set(distanceY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-emerald-900" />

            {/* Animated Mesh Gradient Overlay */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.3),transparent_50%)] animate-pulse" style={{ animationDuration: "4s" }} />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse" style={{ animationDuration: "6s" }} />
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.15]" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: CTA Content */}
                    <div className="text-center lg:text-left">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Stop Missing Calls
                            </h2>
                            <p className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed">
                                Start answering every customer. Today.
                            </p>

                            <m.button
                                ref={buttonRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    x: springX,
                                    y: springY
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-lg font-bold rounded-full shadow-2xl shadow-white/20 hover:shadow-white/40 transition-shadow mb-6"
                            >
                                <span>Try Free for 14 Days</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                            </m.button>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-indigo-100 mb-6">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm">No credit card</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm">2 min setup</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm">Cancel anytime</span>
                                </div>
                            </div>

                            <p className="text-sm text-indigo-200/60">
                                Join <span className="font-semibold text-white">1,247 businesses</span> already using VoiceBot
                            </p>
                        </m.div>
                    </div>

                    {/* Right: Live Activity Feed */}
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    Live Activity
                                </h3>
                                <span className="text-xs text-indigo-200/60">Real businesses, right now</span>
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-hidden">
                                {activities.map((activity, index) => (
                                    <m.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                    >
                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0", activity.color)}>
                                            {activity.initial}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white font-medium truncate">
                                                <span className="font-bold">{activity.business}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-indigo-200/60">{activity.timestamp}</p>
                                        </div>
                                    </m.div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 text-center">
                                <p className="text-xs text-indigo-200/60">
                                    Updates every few seconds • {activities.length} recent activities
                                </p>
                            </div>
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute -inset-4 bg-linear-to-r from-indigo-500/20 to-emerald-500/20 blur-3xl -z-10 opacity-50" />
                    </m.div>

                </div>
            </div>
        </section>
    );
}
