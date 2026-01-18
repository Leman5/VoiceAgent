"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

export function CookieNotice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50"
                >
                    <div className="bg-surface/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -z-10 group-hover:bg-indigo-500/10 transition-colors" />

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <Shield className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm mb-1">Cookie Notice</h3>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    We use cookies to enhance your experience and analyze site performance. By continuing, you agree to our
                                    <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 ml-1">Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button size="sm" className="flex-1 px-4 py-2" onClick={acceptCookies}>
                                Accept All
                            </Button>
                            <Button size="sm" variant="secondary" className="flex-1 px-4 py-2" onClick={() => setIsVisible(false)}>
                                Necessary Only
                            </Button>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 p-1 text-text-muted hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
