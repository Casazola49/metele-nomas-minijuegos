"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComicButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "landing";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export function ComicButton({
    children,
    className,
    variant = "primary",
    size = "md",
    icon,
    ...props
}: ComicButtonProps) {
    const variants = {
        primary: "bg-comic-blue text-white border-comic-black hover:bg-blue-600",
        secondary: "bg-white text-comic-black border-comic-black hover:bg-gray-100",
        danger: "bg-comic-red text-white border-comic-black hover:bg-red-600",
        success: "bg-comic-green text-white border-comic-black hover:bg-green-600",
        outline: "bg-transparent text-comic-black border-comic-black hover:bg-black/5",
        landing: "bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-metele-pink/50 shadow-none border-2",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        md: "px-6 py-2 text-lg border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        lg: "px-8 py-4 text-xl border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, x: 2, y: 2, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className={cn(
                "font-display font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {icon}
            {children}
        </motion.button>
    );
}
