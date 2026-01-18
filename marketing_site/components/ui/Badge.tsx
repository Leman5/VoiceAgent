import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "feature" | "outline";
    icon?: LucideIcon;
    children: React.ReactNode;
}

export function Badge({ className, variant = "default", icon: Icon, children, ...props }: BadgeProps) {
    const variants = {
        default: "bg-surface text-text-secondary border-white/10",
        outline: "bg-transparent border-white/20 text-text-secondary",
        feature: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105",
                variants[variant],
                className
            )}
            {...props}
        >
            {Icon && <Icon className="w-3 h-3" />}
            {children}
        </div>
    );
}
