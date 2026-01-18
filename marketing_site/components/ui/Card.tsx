"use client";

import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "default" | "hover-lift" | "hover-glow" | "spotlight";
    interactive?: boolean;
    children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
        // Spotlight logic
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        };

        const baseStyles = "relative rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl text-text-primary overflow-hidden";

        const variants = {
            default: "",
            "hover-lift": "hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300",
            "hover-glow": "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300",
            "spotlight": "group", // Uses internal logic
        };

        const isSpotlight = variant === "spotlight";

        return (
            <motion.div
                ref={ref}
                className={cn(baseStyles, variants[variant], interactive && "cursor-pointer", className)}
                onMouseMove={isSpotlight ? handleMouseMove : undefined}
                initial={interactive ? { opacity: 0, y: 20 } : undefined}
                whileInView={interactive ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                {...props}
            >
                {isSpotlight && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  rgba(99, 102, 241, 0.15),
                  transparent 80%
                )
              `,
                        }}
                    />
                )}
                <div className="relative z-10">{children}</div>
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
