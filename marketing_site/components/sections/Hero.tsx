"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, Play, CheckCircle2, MessageSquare, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax values
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);
    const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 5]), springConfig);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black"
        >
            {/* --- Background Elements --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Gradient Mesh */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Noise Texture Overaly */}
                <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-[0.2]" />
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Content (60%) */}
                    <div className="lg:col-span-7 flex flex-col space-y-8">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Badge variant="feature" className="mb-4">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                    The Future of AI Voice Agents
                                </span>
                            </Badge>

                            <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1]">
                                Never Miss <br />
                                <span className="text-gradient-accent">A Call Again.</span>
                            </h1>
                        </m.div>

                        <m.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-lg md:text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-2xl"
                        >
                            Stop losing customers to voicemail. Deploy advanced AI voice agents that handle calls, book appointments, and capture leads 24/7 with human-like naturalness.
                        </m.p>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
                        >
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg gap-2">
                                Start Free Trial <ArrowRight className="w-5 h-5" />
                            </Button>
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg gap-2 border-white/5">
                                <Play className="w-5 h-5 fill-white" /> Watch Demo
                            </Button>
                        </m.div>

                        {/* Trust Badges / Stats */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-10"
                        >
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white tabular-nums flex items-center">
                                    <AnimatedNumber value={24} suffix="/" />
                                    <span className="ml-1">7</span>
                                </span>
                                <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Availability</span>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden sm:block" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white tabular-nums">
                                    <AnimatedNumber value={98} suffix="%" />
                                </span>
                                <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Accuracy</span>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden sm:block" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white tabular-nums">
                                    <AnimatedNumber value={0.8} suffix="s" />
                                </span>
                                <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Response Time</span>
                            </div>
                        </m.div>
                    </div>

                    {/* Right Side: Interactive Mockup (40%) */}
                    <div className="lg:col-span-5 relative flex items-center justify-center pt-20 lg:pt-0">
                        {/* 3D Phone Mockup Placeholder */}
                        <m.div
                            style={{ y: y1, rotate }}
                            className="relative w-[300px] md:w-[350px] aspect-[9/18.5] bg-surface-highlight border-[8px] border-zinc-900 rounded-[3rem] shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden"
                        >
                            {/* Inner Screen */}
                            <div className="absolute inset-0 bg-[#0A0A0B] p-6 flex flex-col items-center justify-between py-12">
                                <div className="space-y-4 text-center">
                                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-indigo-500/30">
                                        <Phone className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-1">Incoming Call</h3>
                                        <p className="text-xl font-bold text-white">Bistro AI Assistant</p>
                                    </div>
                                </div>

                                {/* Simulated Waveform */}
                                <div className="flex items-end justify-center gap-1 h-20 w-full px-4">
                                    {[...Array(12)].map((_, i) => (
                                        <m.div
                                            key={i}
                                            animate={{
                                                height: [10, 30, 20, 40, 15, 35, 10],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.1,
                                                ease: "easeInOut"
                                            }}
                                            className="w-1 bg-indigo-500/50 rounded-full"
                                        />
                                    ))}
                                </div>

                                <div className="w-full space-y-3">
                                    <div className="h-12 w-full bg-emerald-500 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg shadow-emerald-500/20">
                                        <CheckCircle2 className="w-5 h-5" /> Answered
                                    </div>
                                    <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-text-secondary text-sm font-medium">
                                        Agent Online
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Glow Overlay inside phone */}
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
                        </m.div>

                        {/* Floating elements around phone */}
                        <m.div
                            style={{ y: y2 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute -right-4 top-20 glass p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 z-20"
                        >
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Live Transcript</p>
                                <p className="text-xs text-white font-medium italic">"Sure, I can book your table..."</p>
                            </div>
                        </m.div>

                        <m.div
                            style={{ y: y1 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="absolute -left-8 md:-left-20 bottom-32 glass p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 z-20"
                        >
                            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Daily ROI</p>
                                <p className="text-xs text-white font-bold">+$240 Saved Today</p>
                            </div>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="absolute right-0 bottom-10 glass p-3 px-4 rounded-full border border-white/10 shadow-2xl flex items-center gap-2 z-20"
                        >
                            <ShieldCheck className="w-4 h-4 text-indigo-400" />
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Enterprise Secure</span>
                        </m.div>

                        {/* Large Background Circle for focus */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}
