"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComicButton } from "@/components/ui/ComicButton";
import { FeedbackOverlay } from "@/components/ui/FeedbackOverlay";
import { Scoreboard } from "@/components/game/Scoreboard";
import { ArrowRight, RotateCcw, Users } from "lucide-react";
import Link from "next/link";

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
            <div className="min-h-screen bg-comic-yellow flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border-4 border-black p-8 rounded-2xl shadow-comic-lg max-w-2xl w-full text-center"
                >
                    <h1 className="text-6xl font-display text-comic-blue mb-6 text-stroke shadow-comic-hover inline-block">
                        {title}
                    </h1>
                    <p className="text-xl mb-8 font-bold">{instructions}</p>

                    <div className="mb-8">
                        <p className="mb-4 text-lg font-bold uppercase">¿Cuántos jugadores?</p>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPlayerCount(num)}
                                    className={`w-16 h-16 rounded-xl border-4 border-black text-2xl font-display flex items-center justify-center transition-all ${playerCount === num
                                        ? "bg-comic-blue text-white shadow-comic transform -translate-y-1"
                                        : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <ComicButton variant="secondary" aria-label="Volver al inicio">Volver</ComicButton>
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
            <div className="min-h-screen bg-comic-red flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border-4 border-black p-8 rounded-2xl shadow-comic-lg max-w-2xl w-full text-center"
                >
                    <h1 className="text-6xl font-display text-comic-red mb-6">¡Juego Terminado!</h1>

                    {finalScores ? (
                        <div className="mb-8">
                            <p className="text-2xl mb-4">Tabla de Posiciones</p>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {finalScores
                                    .sort((a, b) => b.score - a.score)
                                    .map((player, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg border-2 border-black">
                                            <span className="font-bold text-xl">#{index + 1} {player.name}</span>
                                            <span className="font-display text-2xl text-comic-blue">{player.score}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-2xl mb-4">Puntaje Final</p>
                            <p className="text-8xl font-display text-comic-blue mb-8">{score}</p>
                        </>
                    )}

                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <ComicButton variant="secondary" aria-label="Salir al inicio">Salir</ComicButton>
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
        <div className={`min-h-screen bg-comic-yellow ${fullScreen ? "p-0" : "p-4 md:p-8"}`}>
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
