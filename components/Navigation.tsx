"use client";

import { useState, useEffect } from "react";
import { m, useScroll, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
];

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Detect active section
            const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Progress Indicator */}
            <m.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Navigation Bar */}
            <m.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                    isScrolled
                        ? "h-16 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
                        : "h-20 bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">

                    {/* Logo */}
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-lg p-1"
                        aria-label="VoiceBot - Back to top"
                    >
                        <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                            <div className="w-4 h-4 bg-white rounded-sm" />
                        </div>
                        <span className="text-xl font-bold text-white">VoiceBot</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={cn(
                                    "relative text-sm font-medium transition-colors group",
                                    activeSection === link.href.replace('#', '')
                                        ? "text-white"
                                        : "text-text-secondary hover:text-white"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 h-0.5 bg-indigo-500 transition-all",
                                    activeSection === link.href.replace('#', '')
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Button
                            variant="primary"
                            className={cn(
                                "transition-all",
                                isScrolled && "shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                            )}
                        >
                            Try Free
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </m.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        />

                        {/* Menu Panel */}
                        <m.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface border-l border-white/10 z-50 md:hidden overflow-y-auto"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation menu"
                        >
                            <div className="p-6">

                                {/* Close Button */}
                                <div className="flex justify-end mb-8">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                {/* Mobile Links */}
                                <nav className="space-y-2 mb-12">
                                    {NAV_LINKS.map((link) => (
                                        <button
                                            key={link.href}
                                            onClick={() => scrollToSection(link.href)}
                                            className={cn(
                                                "block w-full text-left px-4 py-4 rounded-xl text-lg font-semibold transition-colors",
                                                activeSection === link.href.replace('#', '')
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            {link.name}
                                        </button>
                                    ))}
                                </nav>

                                {/* Mobile CTA */}
                                <Button variant="primary" className="w-full mb-8">
                                    Try Free for 14 Days
                                </Button>

                                {/* Social Proof */}
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                    <p className="text-sm text-text-secondary mb-1">Trusted by</p>
                                    <p className="text-2xl font-bold text-white">1,247 businesses</p>
                                </div>

                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
