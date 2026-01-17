"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent">
                        404
                    </h1>
                </m.div>

                <m.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-bold mb-4"
                >
                    Page Not Found
                </m.h2>

                <m.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-text-secondary mb-8 max-w-md mx-auto"
                >
                    Even our AI assistant couldn't find this page. It might have been moved or deleted.
                </m.p>

                <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button variant="primary" className="w-full sm:w-auto p-0">
                        <Link href="/" className="flex items-center gap-2 px-8 h-full">
                            <Home className="w-4 h-4" />
                            Return Home
                        </Link>
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </m.div>

                {/* Decorative Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
            </div>
        </div>
    );
}
