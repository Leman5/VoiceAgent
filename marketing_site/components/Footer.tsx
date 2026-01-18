"use client";

import { useState } from "react";
import { Twitter, Youtube, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";

const FOOTER_LINKS = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Demo", href: "#demo" },
        { label: "Case Studies", href: "#testimonials" }
    ],
    support: [
        { label: "Help Center", href: "#" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact Us", href: "#" },
        { label: "System Status", href: "#", status: true }
    ],
    company: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#", badge: "We're hiring!" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" }
    ]
};

const SOCIAL_LINKS = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" }
];

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <footer className="bg-surface border-t border-white/10">

            {/* Email Capture Section */}
            <div className="border-b border-white/10">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 py-12">
                    <div className="max-w-xl mx-auto text-center">
                        <m.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-white mb-2"
                        >
                            Get tips for growing your business
                        </m.h3>
                        <m.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-text-secondary mb-6"
                        >
                            Join our newsletter for insights on AI, automation, and customer service.
                        </m.p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={isSubmitting}
                                className="gap-2"
                            >
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </form>

                        <p className="text-xs text-text-muted mt-3">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <div className="w-4 h-4 bg-white rounded-sm" />
                            </div>
                            <span className="text-xl font-bold text-white">VoiceBot</span>
                        </div>
                        <p className="text-text-secondary mb-6 leading-relaxed">
                            AI phone answering for small business
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className={cn(
                                        "p-2 rounded-lg bg-white/5 border border-white/10 text-text-secondary transition-all hover:bg-white/10",
                                        social.color
                                    )}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                            Product
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.product.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary hover:text-indigo-400 transition-colors text-sm inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.support.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary hover:text-indigo-400 transition-colors text-sm inline-flex items-center gap-2"
                                    >
                                        {link.label}
                                        {link.status && (
                                            <span className="flex items-center gap-1 text-emerald-400 text-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            </span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary hover:text-indigo-400 transition-colors text-sm inline-flex items-center gap-2"
                                    >
                                        {link.label}
                                        {link.badge && (
                                            <Badge variant="success" className="text-[10px] py-0 px-1.5">
                                                {link.badge}
                                            </Badge>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 xl:px-16 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
                        <div>
                            © 2024 VoiceBot. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1">
                            Made with <m.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="text-red-500 inline-block"
                            >
                                ❤️
                            </m.span> for small businesses
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}
