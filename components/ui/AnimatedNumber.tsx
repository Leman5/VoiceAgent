"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    format?: "currency" | "percentage" | "plain";
    className?: string;
    prefix?: string;
    suffix?: string;
}

export function AnimatedNumber({
    value,
    format = "plain",
    className = "",
    prefix = "",
    suffix = ""
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                let formatted = "";

                if (format === "currency") {
                    formatted = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                    }).format(Math.round(latest));
                } else if (format === "percentage") {
                    formatted = Math.round(latest).toString();
                } else {
                    formatted = Math.round(latest).toLocaleString();
                }

                ref.current.textContent = `${prefix}${formatted}${suffix}`;
            }
        });
    }, [springValue, format, prefix, suffix]);

    return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
