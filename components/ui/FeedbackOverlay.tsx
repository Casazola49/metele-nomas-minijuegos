"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface FeedbackOverlayProps {
    type: "correct" | "incorrect" | null;
    onComplete?: () => void;
}

export function FeedbackOverlay({ type, onComplete }: FeedbackOverlayProps) {
    useEffect(() => {
        if (type) {
            // Sound logic would go here
            const timer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1500); // Show for 1.5 seconds
            return () => clearTimeout(timer);
        }
    }, [type, onComplete]);

    return (
        <AnimatePresence>
            {type && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none backdrop-blur-sm ${
                        type === "correct" ? "bg-green-500/85" : "bg-red-500/85"
                    }`}
                >
                    <motion.div
                        initial={{ scale: 0.5, rotate: -10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        exit={{ scale: 0.5, rotate: 10 }}
                        className="bg-[#181816]/95 border-2 border-white/20 p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center text-white"
                    >
                        <h2
                            className={`text-6xl font-display uppercase ${
                                type === "correct" ? "text-metele-green" : "text-comic-red"
                            }`}
                        >
                            {type === "correct" ? "¡Correcto!" : "¡Incorrecto!"}
                        </h2>
                        <p className="text-2xl font-bold mt-4 text-white/90">
                            {type === "correct" ? "Ding! Ding! Ding!" : "Bocinazo!"}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
