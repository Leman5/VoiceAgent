"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, Mic, Sparkles, Check, Clock, Star, Utensils, Scissors, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Data ---

type Message = {
    role: "agent" | "user";
    text: string;
};

type Scenario = {
    id: string;
    name: string;
    icon: React.ElementType;
    agentName: string;
    avatarColor: string;
    messages: Message[];
    finalStatus: string;
};

const SCENARIOS: Scenario[] = [
    {
        id: "restaurant",
        name: "Restaurant Order",
        icon: Utensils,
        agentName: "Bistro AI",
        avatarColor: "bg-orange-500",
        finalStatus: "Table Reserved",
        messages: [
            { role: "agent", text: "Good evening, La Maison Bistro. How can I help you?" },
            { role: "user", text: "Hi, I'd like to book a table for two tonight at 7." },
            { role: "agent", text: "I can check that for you. Just a moment... Yes, we have a table for two at 7:00 PM. Would you like to confirm?" },
            { role: "user", text: "Yes please, that would be great." },
            { role: "agent", text: "Perfect. I've booked a table for two at 7:00 PM. We look forward to seeing you!" },
        ],
    },
    {
        id: "salon",
        name: "Salon Booking",
        icon: Scissors,
        agentName: "Glow Salon",
        avatarColor: "bg-pink-500",
        finalStatus: "Appointment Confirmed",
        messages: [
            { role: "agent", text: "Hi! Thanks for calling Glow Salon. Are you looking to book an appointment?" },
            { role: "user", text: "Yeah, do you have any openings for a haircut tomorrow morning?" },
            { role: "agent", text: "Let me see... We have an opening at 10:30 AM with Sarah. Does that work for you?" },
            { role: "user", text: "That's perfect." },
            { role: "agent", text: "Great! You're booked for a haircut at 10:30 AM tomorrow. Use our parking in the back!" },
        ],
    },
    {
        id: "contractor",
        name: "Contractor Quote",
        icon: Hammer,
        agentName: "FixIt Pro",
        avatarColor: "bg-blue-600",
        finalStatus: "Quote Sent",
        messages: [
            { role: "agent", text: "FixIt Pro Services. This is the automated assistant. How can I direct your request?" },
            { role: "user", text: "My kitchen sink is leaking, I need a plumber ASAP." },
            { role: "agent", text: "I understand, a leaking sink is urgent. I can have a plumber there within the hour. The emergency call-out fee is $80. Shall I dispatch someone?" },
            { role: "user", text: "Yes, please send them now." },
            { role: "agent", text: "Dispatching a plumber to your address on file. They will arrive in approx 45 mins." },
        ],
    },
];

export function InteractiveDemo() {
    const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
    const [callState, setCallState] = useState<"idle" | "incoming" | "active" | "ended">("idle");
    const [messagesState, setMessagesState] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- Logic ---

    const startScenario = (scenario: Scenario) => {
        setActiveScenario(scenario);
        setCallState("incoming");
        setMessagesState([]);
    };

    const answerCall = () => {
        setCallState("active");
        playConversation(activeScenario);
    };

    const playConversation = async (scenario: Scenario) => {
        // Initial delay for realism
        await new Promise((resolve) => setTimeout(resolve, 800));

        for (const msg of scenario.messages) {
            if (msg.role === "agent") {
                setIsTyping(true);
                await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500)); // Simulate thinking
                setIsTyping(false);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 500)); // Simulate user listening/speaking
            }

            setMessagesState((prev) => [...prev, msg]);

            // Auto-scroll
            if (scrollRef.current) {
                setTimeout(() => {
                    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
                }, 100);
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCallState("ended");
    };

    // Reset when switching tabs
    const handleTabClick = (scenario: Scenario) => {
        if (callState !== "idle") {
            setCallState("idle");
            setMessagesState([]);
            setTimeout(() => startScenario(scenario), 200);
        } else {
            startScenario(scenario);
        }
    };

    useEffect(() => {
        setCallState("incoming");
    }, []);

    return (
        <section className="py-24 bg-black relative overflow-hidden" id="demo">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 relative z-10">
                <div className="text-center mb-16">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-white">Live Simulation</span>
                    </m.div>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        See It In Action
                    </m.h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Experience how our AI agents handle real-world conversations with human-like latency and understanding.
                    </p>
                </div>

                {/* Scenario Selectors */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {SCENARIOS.map((scenario) => {
                        const Icon = scenario.icon;
                        const isActive = activeScenario.id === scenario.id;
                        return (
                            <button
                                key={scenario.id}
                                onClick={() => handleTabClick(scenario)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300",
                                    isActive
                                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                                        : "bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{scenario.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-[95%] xl:max-w-[90%] 2xl:max-w-[85%] mx-auto">

                    {/* Left: Stats & Context */}
                    <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                        <div className="p-6 rounded-2xl bg-surface/50 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs uppercase tracking-wider font-semibold">Response Time</p>
                                    <p className="text-2xl font-bold text-white">
                                        {callState === "active" || callState === "ended" ? "0.6s" : "--"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <m.div
                                    className="h-full bg-indigo-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: callState === "active" ? "85%" : "0%" }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface/50 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs uppercase tracking-wider font-semibold">Intent Accuracy</p>
                                    <p className="text-2xl font-bold text-white">
                                        {callState === "active" || callState === "ended" ? "98.5%" : "--"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <m.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: callState === "active" ? "98%" : "0%" }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>

                        {callState === "ended" && (
                            <m.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 text-center"
                            >
                                <div className="inline-flex p-3 rounded-full bg-emerald-500 text-white mb-4 shadow-lg shadow-emerald-500/30">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{activeScenario.finalStatus}</h3>
                                <p className="text-emerald-300 text-sm">Action completed successfully.</p>
                            </m.div>
                        )}
                    </div>

                    {/* Center: The Phone */}
                    <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center perspective-[2000px]">
                        <div className="w-[320px] h-[650px] bg-black rounded-[45px] border-[8px] border-surface-highlight shadow-2xl relative overflow-hidden select-none">
                            {/* Dynamic Island */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-2xl z-50 pointer-events-none" />

                            {/* Status Bar */}
                            <div className="absolute top-3 left-0 w-full px-6 flex justify-between text-white text-[10px] font-medium z-40">
                                <span>9:41</span>
                                <div className="flex gap-1.5">
                                    <span className="w-4 h-2.5 bg-white rounded-xs" />
                                    <span className="w-4 h-2.5 bg-white rounded-xs" />
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="w-full h-full bg-gray-900 relative">
                                <AnimatePresence mode="wait">

                                    {/* State: Incoming Call */}
                                    {callState === "incoming" && (
                                        <m.div
                                            key="incoming"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-30 bg-gray-900/90 backdrop-blur-3xl flex flex-col pt-24 pb-12 px-6 items-center"
                                        >
                                            <div className="flex-1 flex flex-col items-center gap-6 w-full">
                                                <div className="flex flex-col items-center">
                                                    <div className={cn("w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-2xl mb-4", activeScenario.avatarColor)}>
                                                        <activeScenario.icon className="w-12 h-12 text-white" />
                                                    </div>
                                                    <h3 className="text-3xl font-semibold text-white">{activeScenario.agentName}</h3>
                                                    <p className="text-white/60 text-lg">Voice AI Agent</p>
                                                </div>
                                            </div>

                                            <div className="w-full flex justify-between items-center px-4 mb-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                                                        <Phone className="w-8 h-8 text-white rotate-135" />
                                                    </div>
                                                    <span className="text-white text-sm">Decline</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <button
                                                        onClick={answerCall}
                                                        className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center animate-pulse"
                                                    >
                                                        <Phone className="w-8 h-8 text-white" />
                                                    </button>
                                                    <span className="text-white text-sm">Accept</span>
                                                </div>
                                            </div>
                                        </m.div>
                                    )}

                                    {/* State: Active Call (Chat UI) */}
                                    {(callState === "active" || callState === "ended") && (
                                        <m.div
                                            key="active"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-0 bg-gray-950 flex flex-col"
                                        >
                                            {/* Header */}
                                            <div className="pt-14 pb-4 px-4 border-b border-white/5 bg-gray-900/50 backdrop-blur-md flex items-center gap-3">
                                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", activeScenario.avatarColor)}>
                                                    <activeScenario.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium text-sm">{activeScenario.agentName}</h4>
                                                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                        {callState === "active" ? "Connected" : "Call Ended"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Messages Area */}
                                            <div
                                                ref={scrollRef}
                                                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none"
                                            >
                                                {messagesState.map((msg, idx) => (
                                                    <m.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        className={cn(
                                                            "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                                                            msg.role === "user"
                                                                ? "ml-auto bg-indigo-600 text-white rounded-tr-sm"
                                                                : "mr-auto bg-gray-800 text-gray-100 rounded-tl-sm"
                                                        )}
                                                    >
                                                        {msg.text}
                                                    </m.div>
                                                ))}

                                                {isTyping && (
                                                    <m.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="mr-auto bg-gray-800 p-3 rounded-2xl rounded-tl-sm w-16"
                                                    >
                                                        <div className="flex gap-1 justify-center">
                                                            <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                            <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                            <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" />
                                                        </div>
                                                    </m.div>
                                                )}
                                            </div>

                                            {/* Bottom Simulated Input */}
                                            <div className="p-4 bg-gray-900 border-t border-white/5">
                                                <div className="h-10 bg-gray-800 rounded-full flex items-center px-4 justify-between">
                                                    <span className="text-gray-500 text-sm">Type a message...</span>
                                                    <Mic className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div className="h-1 w-1/3 bg-white/20 rounded-full mx-auto mt-6" /> {/* Home indicator */}
                                            </div>
                                        </m.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Highlights */}
                    <div className="lg:col-span-4 space-y-8 order-3">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Natural Conversation Flow</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Our agents handle interruptions, pause naturally, and understand context just like a human operator.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                </div>
                                <h4 className="font-semibold text-lg text-white">Consistent Experience</h4>
                            </div>
                            <p className="text-text-secondary">
                                Every customer gets the same high-quality service, 24/7 without fatigue or wait times.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <blockquote className="text-text-secondary italic">
                                "It handled our Saturday night rush bookings perfectly. I legitimately forgot it wasn't my front-of-house staff."
                            </blockquote>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-white/5">
                                    <span className="text-xs font-bold">F.C</span>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">Felix Chen</p>
                                    <p className="text-text-secondary text-xs">Owner, La Maison</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
