"use client";

import { useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Building2, Mic, Phone, CheckCircle2, Play, Settings, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// --- Visual Components ---

function FormVisual() {
    return (
        <div className="w-full bg-surface-highlight border border-white/5 rounded-xl p-4 space-y-3">
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10" />
                <div className="h-2 w-24 bg-white/10 rounded-full mt-3" />
            </div>
            {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1">
                    <div className="h-1.5 w-16 bg-white/5 rounded-full" />
                    <div className="h-8 w-full bg-surface border border-white/5 rounded-lg overflow-hidden relative">
                        <m.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 0.7 }}
                            transition={{ duration: 1, delay: i * 0.5 + 0.5 }}
                            style={{ originX: 0 }}
                            className="absolute inset-0 h-full bg-indigo-500/10"
                        />
                        {i === 2 && (
                            <m.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                                className="absolute inset-0 flex items-center px-3"
                            >
                                <span className="text-xs text-white/50">Sunday, Closed</span>
                            </m.div>
                        )}
                    </div>
                </div>
            ))}
            <m.div
                initial={{ opacity: 0.5, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.3 }}
                className="h-8 w-full bg-indigo-600 rounded-lg mt-2 flex items-center justify-center"
            >
                <span className="text-xs font-semibold text-white">Continue</span>
            </m.div>
        </div>
    );
}

function VoiceVisual() {
    const [playing, setPlaying] = useState<number | null>(null);

    return (
        <div className="w-full bg-surface-highlight border border-white/5 rounded-xl p-4 space-y-2">
            {[
                { name: "Emma", type: "Professional & Calm" },
                { name: "James", type: "Friendly & Casual" },
                { name: "Sophia", type: "Warm & Empathetic" }
            ].map((voice, i) => (
                <div
                    key={i}
                    className="group flex items-center justify-between p-3 rounded-lg bg-surface border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer"
                    onMouseEnter={() => setPlaying(i)}
                    onMouseLeave={() => setPlaying(null)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Mic className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">{voice.name}</p>
                            <p className="text-[10px] text-text-secondary">{voice.type}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 h-4">
                        {playing === i ? (
                            [...Array(5)].map((_, j) => (
                                <m.div
                                    key={j}
                                    className="w-0.5 bg-indigo-500 rounded-full"
                                    animate={{ height: [4, 12, 4] }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: j * 0.1
                                    }}
                                />
                            ))
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ConnectionVisual() {
    return (
        <div className="w-full h-40 bg-surface-highlight border border-white/5 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
            {/* Nodes */}
            <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-text-secondary" />
                </div>
                <p className="text-[10px] text-text-secondary">Your Number</p>
            </div>

            <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <Mic className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] text-white font-medium">VoiceBot</p>
            </div>

            <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-[10px] text-text-secondary">You (App)</p>
            </div>

            {/* Animating Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-6">
                <m.div
                    className="h-full bg-linear-to-r from-indigo-500 to-emerald-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            <div className="absolute top-1/2 left-0 w-full -translate-y-6 px-8 flex justify-between">
                <m.div
                    className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white"
                    animate={{ x: [0, 200], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </div>
    );
}

function LiveDashboardVisual() {
    return (
        <div className="w-full bg-surface-highlight border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-400">System Online</span>
                </div>
                <span className="text-[10px] text-text-secondary">Just now</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-text-secondary mb-1">Active Calls</p>
                    <p className="text-2xl font-bold text-white">47</p>
                </div>
                <div className="bg-surface p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] text-text-secondary mb-1">Missed</p>
                    <p className="text-2xl font-bold text-white">0</p>
                </div>
            </div>

            <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-3"
            >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-xs font-medium text-white">Setup Complete!</p>
                    <p className="text-[10px] text-emerald-400/80">Receiving calls...</p>
                </div>
            </m.div>
        </div>
    );
}

// --- Main Layout ---

const STEPS = [
    {
        title: "Tell Us About Your Business",
        desc: "Answer 5 quick questions about your hours, services, and policies. Our AI creates your base knowledge profile instantly.",
        icon: Building2,
        time: "2 mins",
        visual: FormVisual
    },
    {
        title: "Choose Your Voice",
        desc: "Pick from 12 ultra-realistic neural voices. Select the tone that best matches your brand identity - from professional to casual.",
        icon: Mic,
        time: "1 min",
        visual: VoiceVisual
    },
    {
        title: "Connect Your Phone",
        desc: "Simply enable call forwarding on your existing line, or get a brand new dedicated number from us. No hardware required.",
        icon: Settings,
        time: "3 mins",
        visual: ConnectionVisual
    },
    {
        title: "You're Live!",
        desc: "Sit back and watch the dashboard light up. Your AI agent starts answering missed calls immediately.",
        icon: CheckCircle2,
        time: "Instant",
        visual: LiveDashboardVisual
    }
];

export function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="py-24 bg-black relative" id="how-it-works">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16">
                <div className="text-center max-w-6xl mx-auto mb-20">
                    <Badge variant="outline" className="mb-4">Simple Setup</Badge>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        From signup to live in <span className="text-indigo-400">minutes</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg"
                    >
                        No complex coding or flowcharts. Just tell us what you need.
                    </m.p>
                </div>

                <div ref={containerRef} className="relative max-w-7xl mx-auto">
                    {/* Center Timeline Line (Desktop) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
                        <m.div
                            style={{ scaleY, originY: 0 }}
                            className="w-full h-full bg-linear-to-b from-indigo-500 via-purple-500 to-emerald-500"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {STEPS.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-center gap-8 md:gap-16",
                                        isEven ? "md:flex-row-reverse" : ""
                                    )}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black bg-surface z-10 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2 pl-20 md:pl-0 md:text-right">
                                        <div className={cn("md:pr-8", !isEven && "md:text-left md:pl-8 md:pr-0")}>
                                            <div className={cn(
                                                "inline-flex items-center gap-2 mb-3 bg-surface border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-text-secondary",
                                                isEven ? "md:flex-row-reverse" : ""
                                            )}>
                                                <step.icon className="w-4 h-4 text-indigo-400" />
                                                <span>Step {index + 1}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                            <p className="text-text-secondary leading-relaxed mb-4">
                                                {step.desc}
                                            </p>
                                            <div className={cn(
                                                "flex items-center gap-2 text-sm text-text-muted",
                                                isEven ? "md:justify-end" : ""
                                            )}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                Estimated time: {step.time}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual Side */}
                                    <div className="w-full md:w-1/2 pl-20 md:pl-0">
                                        <div className={cn("md:pl-8", !isEven && "md:pr-8 md:pl-0")}>
                                            <div className="relative group perspective-[1000px]">
                                                {/* 3D effect backing */}
                                                <div className="absolute inset-0 bg-indigo-500/5 blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                                                <div className="relative bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-transform duration-500 hover:rotate-1">
                                                    <step.visual />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </m.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
