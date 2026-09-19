"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComicButton } from "@/components/ui/ComicButton";
import { FeedbackOverlay } from "@/components/ui/FeedbackOverlay";
import { Scoreboard } from "@/components/game/Scoreboard";
import { ArrowRight, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

function getRankBadgeStyles(rank: number): { badge: string; text: string } {
    switch (rank) {
        case 1:
            return {
                badge: "bg-metele-yellow/20 text-metele-yellow border-metele-yellow/50 shadow-[0_0_12px_rgba(255,214,0,0.25)]",
                text: "text-metele-yellow font-black",
            };
        case 2:
            return {
                badge: "bg-metele-pink/20 text-metele-pink border-metele-pink/40",
                text: "text-metele-pink font-bold",
            };
        case 3:
            return {
                badge: "bg-metele-orange/20 text-metele-orange border-metele-orange/40",
                text: "text-metele-orange font-bold",
            };
        default:
            return {
                badge: "bg-white/5 text-white/60 border-white/10",
                text: "text-white/80",
            };
    }
}

interface GameShellProps {
    title: string;
    instructions: string;
    onStart?: (players: number) => void;
    onReset?: () => void;
    children: React.ReactNode;
    score: number;
    finalScores?: { name: string; score: number }[];
    isGameOver: boolean;
    feedback: "correct" | "incorrect" | null;
    onNext: () => void;
    disableFeedbackOverlay?: boolean;
    fullScreen?: boolean;
    hideScoreboard?: boolean;
}

export function GameShell({
    title,
    instructions,
    onStart,
    onReset,
    children,
    score,
    finalScores,
    isGameOver,
    feedback,
    onNext,
    disableFeedbackOverlay = false,
    fullScreen = false,
    hideScoreboard = false,
}: GameShellProps) {
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [playerCount, setPlayerCount] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);

    // Handle feedback display
    useEffect(() => {
        if (feedback) {
            setShowNextButton(true);
        } else {
            setShowNextButton(false);
        }
    }, [feedback]);

    // Handle Game Over
    useEffect(() => {
        if (isGameOver) {
            setGameState("gameover");
        }
    }, [isGameOver]);

    const handleStart = () => {
        setGameState("playing");
        onStart?.(playerCount);
    };

    const handleReset = () => {
        setGameState("start");
        setShowNextButton(false);
        onReset?.();
    };

    const handleNext = () => {
        setShowNextButton(false);
        onNext();
    };

    if (gameState === "start") {
        return (
            <div className="min-h-screen bg-[#1D1D1B] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="landing-dot-grid absolute inset-0 pointer-events-none" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#181816]/95 border-2 border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center relative z-10"
                >
                    <h1 className="text-6xl font-display landing-gradient-text mb-6 inline-block">
                        {title}
                    </h1>
                    <p className="text-xl mb-8 font-bold text-white/90">{instructions}</p>

                    <div className="mb-8">
                        <p className="mb-4 text-lg font-bold uppercase text-white/80">¿Cuántos jugadores?</p>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPlayerCount(num)}
                                    className={`w-16 h-16 rounded-xl font-display text-2xl flex items-center justify-center transition-all ${
                                        playerCount === num
                                            ? "bg-gradient-to-r from-metele-pink to-metele-orange text-white border-2 border-white/40 shadow-comic transform -translate-y-1"
                                            : "bg-white/5 hover:bg-white/10 text-white/80 border-2 border-white/10"
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <ComicButton variant="landing" aria-label="Volver al inicio">Volver</ComicButton>
                        </Link>
                        <ComicButton size="lg" onClick={handleStart} aria-label="Comenzar el juego">
                            ¡Comenzar!
                        </ComicButton>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (gameState === "gameover") {
        return (
            <div className="min-h-screen bg-[#1D1D1B] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="landing-dot-grid absolute inset-0 pointer-events-none" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#181816]/95 border-2 border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-center relative z-10"
                >
                    <h1 className="text-6xl font-display landing-gradient-text mb-6">¡Juego Terminado!</h1>

                    {finalScores ? (
                        <div className="mb-8">
                            <p className="text-2xl mb-4 font-bold text-white/90">Tabla de Posiciones</p>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {finalScores
                                    .sort((a, b) => b.score - a.score)
                                    .map((player, index) => {
                                        const rankStyle = getRankBadgeStyles(index + 1);
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2.5 py-1 rounded-lg text-sm font-display border ${rankStyle.badge}`}>
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-bold text-xl text-white">{player.name}</span>
                                                </div>
                                                <span className={`font-display text-2xl ${rankStyle.text}`}>{player.score}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-2xl mb-4 font-bold text-white/80">Puntaje Final</p>
                            <p className="text-8xl font-display text-metele-yellow mb-8">{score}</p>
                        </>
                    )}

                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <ComicButton variant="landing" aria-label="Salir al inicio">Salir</ComicButton>
                        </Link>
                        <ComicButton size="lg" onClick={handleReset} icon={<RotateCcw />} aria-label="Jugar de nuevo">
                            Jugar de Nuevo
                        </ComicButton>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-comic-black text-white relative overflow-hidden ${fullScreen ? "p-0" : "p-4 md:p-8"}`}>
            {/* Persistent client-side exit link */}
            <Link
                href="/"
                aria-label="Volver al inicio"
                className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-[#181816]/90 border-2 border-white/20 text-white/80 hover:text-white hover:border-white/40 shadow-comic backdrop-blur-md flex items-center gap-2 transition-all group"
            >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-display text-sm tracking-wider uppercase">Inicio</span>
            </Link>

            {!fullScreen && !hideScoreboard && <Scoreboard score={score} />}
            {fullScreen && !hideScoreboard && (
                <div className="fixed top-4 right-4 z-50">
                    <Scoreboard score={score} />
                </div>
            )}

            <div className={`${fullScreen ? "w-full h-screen" : "container mx-auto max-w-4xl pt-20"}`}>
                {children}
            </div>

            {!disableFeedbackOverlay && <FeedbackOverlay type={feedback} />}

            <AnimatePresence>
                {showNextButton && !isGameOver && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-auto"
                    >
                        <ComicButton
                            size="lg"
                            onClick={handleNext}
                            aria-label="Siguiente pregunta"
                            className="shadow-[0px_0px_20px_rgba(0,0,0,0.2)] animate-bounce"
                        >
                            Siguiente <ArrowRight className="inline ml-2" />
                        </ComicButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
