"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---

type ComparisonType = "receptionist" | "voicemail" | "callcenter";

type CompetitorData = {
    name: string;
    cost: string;
    costStatus: "good" | "bad" | "neutral";
    availability: string;
    availabilityStatus: "good" | "bad" | "neutral";
    setupTime: string;
    setupStatus: "good" | "bad" | "neutral";
    multiCall: string;
    multiCallStatus: "good" | "bad" | "neutral";
    appointments: string;
    appointmentsStatus: "good" | "bad" | "neutral";
    messages: string;
    messagesStatus: "good" | "bad" | "neutral";
    professional: string;
    professionalStatus: "good" | "bad" | "neutral";
    integrations: string;
    integrationsStatus: "good" | "bad" | "neutral";
    monthlySavings: number;
    roi: string;
};

const COMPETITORS: Record<ComparisonType, CompetitorData> = {
    receptionist: {
        name: "Human Receptionist",
        cost: "$2,400+",
        costStatus: "bad",
        availability: "Business hours only",
        availabilityStatus: "bad",
        setupTime: "2-4 weeks",
        setupStatus: "bad",
        multiCall: "One at a time",
        multiCallStatus: "bad",
        appointments: "Manual entry",
        appointmentsStatus: "neutral",
        messages: "Sometimes",
        messagesStatus: "neutral",
        professional: "Yes",
        professionalStatus: "good",
        integrations: "No",
        integrationsStatus: "bad",
        monthlySavings: 2251,
        roi: "45x"
    },
    voicemail: {
        name: "Traditional Voicemail",
        cost: "$10-50",
        costStatus: "neutral",
        availability: "24/7",
        availabilityStatus: "good",
        setupTime: "Instant",
        setupStatus: "good",
        multiCall: "Unlimited",
        multiCallStatus: "good",
        appointments: "No",
        appointmentsStatus: "bad",
        messages: "Yes",
        messagesStatus: "good",
        professional: "No",
        professionalStatus: "bad",
        integrations: "Limited",
        integrationsStatus: "neutral",
        monthlySavings: 0,
        roi: "N/A"
    },
    callcenter: {
        name: "Call Center Service",
        cost: "$500-1,200",
        costStatus: "bad",
        availability: "24/7",
        availabilityStatus: "good",
        setupTime: "1-2 weeks",
        setupStatus: "neutral",
        multiCall: "Limited agents",
        multiCallStatus: "neutral",
        appointments: "Yes",
        appointmentsStatus: "good",
        messages: "Yes",
        messagesStatus: "good",
        professional: "Yes",
        professionalStatus: "good",
        integrations: "Sometimes",
        integrationsStatus: "neutral",
        monthlySavings: 751,
        roi: "12x"
    }
};

const VOICEBOT_DATA = {
    cost: "$49-149",
    availability: "24/7/365",
    setupTime: "5 minutes",
    multiCall: "Unlimited",
    appointments: "Yes",
    messages: "Yes",
    professional: "Yes",
    integrations: "Yes"
};

// --- Components ---

function StatusIcon({ status }: { status: "good" | "bad" | "neutral" }) {
    if (status === "good") {
        return (
            <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
            >
                <Check className="w-3 h-3 text-white" />
            </m.div>
        );
    }
    if (status === "bad") {
        return (
            <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
            >
                <X className="w-3 h-3 text-white" />
            </m.div>
        );
    }
    return (
        <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
        >
            <Minus className="w-3 h-3 text-white" />
        </m.div>
    );
}

export function Comparison() {
    const [selected, setSelected] = useState<ComparisonType>("receptionist");
    const competitor = COMPETITORS[selected];

    const features = [
        { label: "Monthly Cost", voicebot: VOICEBOT_DATA.cost, competitor: competitor.cost, status: competitor.costStatus },
        { label: "Availability", voicebot: VOICEBOT_DATA.availability, competitor: competitor.availability, status: competitor.availabilityStatus },
        { label: "Setup Time", voicebot: VOICEBOT_DATA.setupTime, competitor: competitor.setupTime, status: competitor.setupStatus },
        { label: "Handles Multiple Calls", voicebot: VOICEBOT_DATA.multiCall, competitor: competitor.multiCall, status: competitor.multiCallStatus },
        { label: "Books Appointments", voicebot: VOICEBOT_DATA.appointments, competitor: competitor.appointments, status: competitor.appointmentsStatus },
        { label: "Takes Messages", voicebot: VOICEBOT_DATA.messages, competitor: competitor.messages, status: competitor.messagesStatus },
        { label: "Sounds Professional", voicebot: VOICEBOT_DATA.professional, competitor: competitor.professional, status: competitor.professionalStatus },
        { label: "Integrations", voicebot: VOICEBOT_DATA.integrations, competitor: competitor.integrations, status: competitor.integrationsStatus }
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden" id="comparison">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        VoiceBot vs Traditional Solutions
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg mb-8"
                    >
                        See how we stack up against the competition
                    </m.p>

                    {/* Toggle Switch */}
                    <div className="inline-flex p-1 bg-surface border border-white/10 rounded-full">
                        {(["receptionist", "voicemail", "callcenter"] as ComparisonType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelected(type)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    selected === type
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                        : "text-text-secondary hover:text-white"
                                )}
                            >
                                {type === "receptionist" && "Receptionist"}
                                {type === "voicemail" && "Voicemail"}
                                {type === "callcenter" && "Call Center"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto">
                    <div className="bg-surface/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">

                        {/* Table Header */}
                        <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 bg-surface-highlight">
                            <div className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
                                Feature
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full">
                                    <span className="text-white font-bold">VoiceBot</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <AnimatePresence mode="wait">
                                    <m.div
                                        key={selected}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                                    >
                                        <span className="text-text-secondary font-bold">{competitor.name}</span>
                                    </m.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-white/5">
                            {features.map((feature, index) => (
                                <m.div
                                    key={feature.label}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="grid grid-cols-3 gap-4 p-6 hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Feature Name */}
                                    <div className="text-text-secondary font-medium flex items-center">
                                        {feature.label}
                                    </div>

                                    {/* VoiceBot Value (Always Green) */}
                                    <div className="text-center flex items-center justify-center gap-2">
                                        <StatusIcon status="good" />
                                        <span className="text-emerald-400 font-semibold">{feature.voicebot}</span>
                                    </div>

                                    {/* Competitor Value (Animated) */}
                                    <div className="text-center flex items-center justify-center gap-2">
                                        <AnimatePresence mode="wait">
                                            <m.div
                                                key={`${selected}-${feature.label}`}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2"
                                            >
                                                <StatusIcon status={feature.status} />
                                                <span className={cn(
                                                    "font-semibold",
                                                    feature.status === "good" && "text-emerald-400",
                                                    feature.status === "bad" && "text-red-400",
                                                    feature.status === "neutral" && "text-amber-400"
                                                )}>
                                                    {feature.competitor}
                                                </span>
                                            </m.div>
                                        </AnimatePresence>
                                    </div>
                                </m.div>
                            ))}
                        </div>

                    </div>

                    {/* Summary */}
                    {competitor.monthlySavings > 0 && (
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-emerald-900/10 to-emerald-950/5 border border-emerald-500/10"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <p className="text-text-secondary text-sm mb-2 uppercase tracking-wider">Average Monthly Savings</p>
                                    <AnimatePresence mode="wait">
                                        <m.p
                                            key={competitor.monthlySavings}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-4xl md:text-5xl font-bold text-emerald-400 tabular-nums"
                                        >
                                            ${competitor.monthlySavings.toLocaleString()}
                                        </m.p>
                                    </AnimatePresence>
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-text-secondary text-sm mb-2 uppercase tracking-wider">Return on Investment</p>
                                    <AnimatePresence mode="wait">
                                        <m.p
                                            key={competitor.roi}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-4xl md:text-5xl font-bold text-emerald-400"
                                        >
                                            {competitor.roi}
                                        </m.p>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </m.div>
                    )}

                </div>
            </div>
        </section>
    );
}
