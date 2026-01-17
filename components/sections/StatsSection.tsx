"use client";

import { useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Phone, Zap, Heart, PiggyBank, Star } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Badge } from "@/components/ui/Badge";

// Sub-components for better organization and local state
function LiveCallsStat() {
    return (
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <Badge variant="success" className="animate-pulse">Live</Badge>
            </div>
            <div className="text-4xl font-bold text-white tabular-nums mb-1">
                <AnimatedNumber value={2847} />
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Calls Answered Today</p>
            {/* Animated bar */}
            <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                <m.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/3 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                />
            </div>
        </div>
    );
}

function ResponseTimeStat() {
    return (
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-tighter">Speed</span>
            </div>
            <div className="text-4xl font-bold text-white tabular-nums mb-1">
                <AnimatedNumber value={0.8} suffix="s" />
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Average Response Time</p>
            {/* Simple speed bar */}
            <div className="w-24 h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <m.div
                    className="h-full bg-amber-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "95%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </div>
    );
}

function SatisfactionStat() {
    return (
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <span className="text-xs text-rose-400 font-bold uppercase tracking-tighter">Growth</span>
            </div>
            <div className="text-4xl font-bold text-white tabular-nums mb-1">
                <AnimatedNumber value={94} suffix="%" />
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Customer Satisfaction</p>
            <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                    <m.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                    >
                        <Star className="w-3 h-3 text-rose-400 fill-rose-400" />
                    </m.div>
                ))}
            </div>
        </div>
    );
}

function SavingsStat() {
    return (
        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-emerald-400" />
                </div>
                <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">ROI</Badge>
            </div>
            <div className="text-4xl font-bold text-white tabular-nums mb-1">
                <span className="text-2xl text-white/50">$</span>
                <AnimatedNumber value={2100} />
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Avg. Monthly Savings</p>
            <p className="text-[10px] text-emerald-400/70 mt-2 font-mono">Based on 1.2k users</p>
        </div>
    );
}

export function StatsSection() {
    return (
        <section className="relative py-12 bg-black border-y border-white/5 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12 xl:gap-16">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <LiveCallsStat />
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <ResponseTimeStat />
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <SatisfactionStat />
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <SavingsStat />
                    </m.div>
                </div>
            </div>
        </section>
    );
}
