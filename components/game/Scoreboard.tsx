"use client";

import { motion } from "framer-motion";

interface ScoreboardProps {
    score: number;
    highScore?: number;
}

export function Scoreboard({ score, highScore }: ScoreboardProps) {
    return (
        <div className="fixed top-4 right-4 z-40 flex gap-4">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="bg-[#181816]/90 border-2 border-white/20 shadow-comic backdrop-blur-md text-white p-3 md:p-4 rounded-xl min-w-[5.5rem] text-center"
            >
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70">Puntaje</p>
                <p className="text-3xl md:text-4xl font-display text-metele-yellow">{score}</p>
            </motion.div>

            {highScore !== undefined && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#181816]/90 border-2 border-white/20 shadow-comic backdrop-blur-md text-white p-3 md:p-4 rounded-xl min-w-[5.5rem] text-center hidden md:block"
                >
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70">Récord</p>
                    <p className="text-3xl md:text-4xl font-display text-metele-pink">{highScore}</p>
                </motion.div>
            )}
        </div>
    );
}
