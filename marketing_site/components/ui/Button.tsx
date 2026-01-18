"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * 0.1; // Magnetic pull strength
            const y = (clientY - (top + height / 2)) * 0.1;
            setPosition({ x, y });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        const variants = {
            primary: "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border-transparent rounded-full",
            secondary: "glass text-white hover:bg-white/10 hover:border-white/20 rounded-lg",
            ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 rounded-lg",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center font-medium overflow-hidden outline-none backdrop-blur-sm transition-colors",
                    variants[variant],
                    sizes[size],
                    isLoading && "opacity-80 cursor-wait",
                    className
                )}
                disabled={isLoading || props.disabled}
                initial={false}
                animate={{ x: position.x, y: position.y }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <span className="relative z-10 flex items-center gap-2">{children}</span>

                {/* Glow effect for primary buttons */}
                {variant === "primary" && (
                    <div className="absolute inset-0 -z-10 bg-linear-to-r from-indigo-600/0 via-white/20 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg translate-x-[-100%] group-hover:translate-x-[100%]" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
