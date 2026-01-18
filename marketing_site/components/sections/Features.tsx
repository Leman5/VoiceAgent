"use client";

import { useRef, useState, useEffect } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, Check, MessageSquare, Globe, Clock } from "lucide-react";

// --- Card Components ---

function HumanSoundCard() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative h-full flex flex-col justify-between p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 z-0" />

            {/* Waveform Visualizer Background */}
            <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between gap-1 opacity-20 group-hover:opacity-40 transition-opacity px-4 pb-4 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <m.div
                        key={i}
                        className="w-full bg-indigo-400 rounded-t-sm"
                        animate={{
                            height: isPlaying
                                ? [10, Math.random() * 80 + 10, 10]
                                : 10
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-white">Sounds Completely Human</h3>
                <p className="text-text-secondary max-w-sm">
                    Ultra-realistic voice synthesis with breathing, pauses, and intonation that rivals human speech.
                </p>
            </div>

            <div className="relative z-10 mt-8">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full pr-6 pl-2 py-2 transition-all group/btn w-fit"
                >
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-white fill-current" />
                        ) : (
                            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                        )}
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-white tracking-wide uppercase">
                            {isPlaying ? "Playing Sample..." : "Hear Sample Call"}
                        </span>
                        <span className="text-[10px] text-indigo-300">0:15 Demo Audio</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

function AppointmentCard() {
    return (
        <div className="relative h-full p-6 flex flex-col overflow-hidden">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Books Appointments</h3>
                <p className="text-sm text-text-secondary">Syncs directly with your calendar.</p>
            </div>

            <div className="max-w-[80%] mx-auto bg-surface-highlight rounded-xl p-3 border border-white/5 shadow-2xl skew-x-[-2deg] rotate-[2deg] group-hover:rotate-0 group-hover:skew-x-0 transition-transform duration-500">
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-[10px] text-center text-text-muted">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {[...Array(28)].map((_, i) => (
                        <m.div
                            key={i}
                            className={cn(
                                "aspect-square rounded-[2px] flex items-center justify-center text-[10px]",
                                i === 14 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-white/5 text-text-muted"
                            )}
                            initial={i === 14 ? { scale: 0 } : { scale: 1 }}
                            animate={i === 14 ? { scale: 1 } : { scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            {i === 14 && <Check className="w-3 h-3" />}
                        </m.div>
                    ))}
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                    <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                    <div className="h-1.5 w-6 bg-emerald-500/50 rounded-full" />
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 text-[10px]">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    47 bookings today
                </div>
            </div>
        </div>
    );
}

function MessageInboxCard() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Can I reschedule?", time: "2m ago" },
        { id: 2, text: "New lead captured", time: "5m ago" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessages(prev => {
                const newMsg = { id: Date.now(), text: "New Inquiry Recieved", time: "Just now" };
                return [newMsg, ...prev.slice(0, 2)];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-full p-6 flex flex-col overflow-hidden">
            <div className="mb-4 relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Takes Messages</h3>
                <p className="text-sm text-text-secondary">Categorized & transcribed.</p>
            </div>

            <div className="space-y-2 relative z-0">
                {messages.map((m_item, i) => (
                    <m.div
                        key={m_item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-surface/50 border border-white/5 p-3 rounded-lg backdrop-blur-sm flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white truncate">{m_item.text}</p>
                            <p className="text-[10px] text-text-muted">{m_item.time}</p>
                        </div>
                    </m.div>
                ))}
            </div>
        </div>
    );
}

function IntegrationsCard() {
    return (
        <div className="relative h-full p-8 flex flex-col items-center text-center overflow-hidden">
            {/* Rotating Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-linear-to-tr from-indigo-500/20 to-transparent rounded-full blur-[60px] animate-pulse" />

            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Works With Your Tools</h3>
            <p className="text-text-secondary text-sm mb-8 relative z-10">Seamlessly integrates with your existing stack.</p>

            <div className="relative w-full h-32 flex items-center justify-center">
                {/* Central Logo */}
                <div className="absolute z-20 w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                    <div className="w-8 h-8 bg-white rounded-full" />
                </div>

                {/* Orbiting Planets (Logos simplified) */}
                {[0, 1, 2, 3].map((i) => (
                    <m.div
                        key={i}
                        className="absolute w-10 h-10 bg-surface-highlight border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
                        animate={{
                            rotate: 360,
                            x: [0, 80, 0, -80, 0],
                            y: [80, 0, -80, 0, 80]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: i * 2.5,
                            ease: "linear"
                        }}
                    >
                        <div className={cn("w-4 h-4 rounded-sm",
                            i === 0 ? "bg-[#4285F4]" : // Google
                                i === 1 ? "bg-[#635BFF]" : // Stripe
                                    i === 2 ? "bg-[#FF4F00]" : // Zapier
                                        "bg-[#E01E5A]" // Slack
                        )} />
                    </m.div>
                ))}
            </div>
        </div>
    );
}

function FAQCard() {
    return (
        <div className="relative h-full p-6 flex flex-col overflow-hidden">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Answers FAQs</h3>
                <p className="text-sm text-text-secondary">Instant answers from your knowledge base.</p>
            </div>

            <div className="space-y-3">
                <div className="self-end bg-indigo-600/20 border border-indigo-600/30 rounded-lg rounded-tr-none p-2 ml-8">
                    <p className="text-[10px] text-indigo-200">What are your opening hours?</p>
                </div>
                <div className="self-start bg-surface border border-white/10 rounded-lg rounded-tl-none p-2 mr-8">
                    <p className="text-[10px] text-text-secondary">
                        We are open 9am to 6pm, Monday through Friday.
                        <m.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-1 h-3 bg-indigo-500 ml-1 align-middle"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

function GlobalCard() {
    return (
        <div className="relative h-full p-6 flex flex-col overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">24/7 Availability</h3>
                    <p className="text-sm text-text-secondary">Always on, in every timezone.</p>
                </div>
                <Clock className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="flex-1 flex items-center justify-center relative">
                <Globe className="w-24 h-24 text-white/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                </div>
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                        style={{
                            top: `${30 + Math.random() * 40}%`,
                            left: `${20 + Math.random() * 60}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// --- Main Layout ---

const items = [
    { colSpan: "md:col-span-2", component: <HumanSoundCard /> },
    { colSpan: "md:col-span-1", component: <AppointmentCard /> },
    { colSpan: "md:col-span-1", component: <MessageInboxCard /> },
    { colSpan: "md:col-span-2", component: <IntegrationsCard /> },
    { colSpan: "md:col-span-1", component: <FAQCard /> },
    { colSpan: "md:col-span-1", component: <GlobalCard /> },
];

export function Features() {
    return (
        <section className="py-24 bg-black relative" id="features">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16">
                <div className="text-center max-w-6xl mx-auto mb-16">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Capabilities that feel like <br />
                        <span className="text-white/50">magic</span>
                    </m.h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 auto-rows-[300px]"
                >
                    {items.map((item, index) => (
                        <m.div
                            key={index}
                            className={cn(
                                "relative rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-colors duration-500",
                                item.colSpan
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {item.component}
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
