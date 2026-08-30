"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { realOrAiItems, RealOrAiItem } from "@/data/realOrAi";
import { useGameTurn } from "@/lib/useGameTurn";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Lightbulb } from "lucide-react";

export default function RealOIA() {
    const turn = useGameTurn();

    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const [currentItem, setCurrentItem] = useState<RealOrAiItem | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [showHint, setShowHint] = useState(false);

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startNewRound(true);
    };

    const startNewRound = (isFirstRound = false) => {
        let available = realOrAiItems.filter((i) => !usedIds.has(i.id));
        if (available.length === 0) {
            available = realOrAiItems;
            setUsedIds(new Set());
        }

        const pool = isFirstRound ? [...realOrAiItems] : available;
        const next = pool[Math.floor(Math.random() * pool.length)];

        setCurrentItem(next);
        setUsedIds(prev => new Set(prev).add(next.id));
        setFeedback(null);
        setShowHint(false);
    };


    const handleAnswer = (guess: "real" | "ia") => {
        if (feedback || !currentItem) return;

        const isCorrect = (guess === "real" && !currentItem.isAi) || (guess === "ia" && currentItem.isAi);

        if (isCorrect) {
            setFeedback("correct");
            turn.incrementScore(1);
        } else {
            setFeedback("incorrect");
        }
    };

    const handleHint = () => {
        if (feedback) return;
        setShowHint(true);
        // Penalización visual: -0.5 puntos por usar pista
        turn.incrementScore(-0.5);
    };

    const handleNext = () => {
        setFeedback(null);
        const proceed = turn.handleNext(feedback);
        if (proceed) startNewRound();
    };

    const handleReset = () => {
        turn.handleReset();
        setStarted(false);
    };

    return (
        <GameShell
            title="¿Real o IA?"
            instructions="¿La imagen es real o fue generada por una IA? Confía en tu ojo."
            score={turn.currentPlayer?.score || 0}
            onStart={handleStart}
            onReset={handleReset}
            isGameOver={turn.isGameOver}
            feedback={feedback}
            onNext={handleNext}
            fullScreen
            disableFeedbackOverlay
            finalScores={turn.isGameOver ? turn.players : undefined}
        >
            {started && currentItem && (
                <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto relative overflow-hidden bg-comic-pink">
                    {/* Flash Feedback Overlay */}
                    <AnimatePresence mode="wait">
                        {feedback === "correct" && (
                            <motion.div
                                key="flash-correct"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.8, 0] }}
                                transition={{ duration: 3, times: [0, 0.05, 1] }}
                                className="absolute inset-0 bg-green-500 z-50 pointer-events-none mix-blend-hard-light"
                            />
                        )}
                        {feedback === "incorrect" && (
                            <motion.div
                                key="flash-incorrect"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.8, 0] }}
                                transition={{ duration: 3, times: [0, 0.05, 1] }}
                                className="absolute inset-0 bg-red-600 z-50 pointer-events-none mix-blend-hard-light"
                            />
                        )}
                    </AnimatePresence>

                    {/* Turn Indicator */}
                    <div className="absolute top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
                        <motion.div
                            key={turn.currentPlayerIndex}
                            initial={{ scale: 0.8, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            className={`
                                    border-4 border-black px-8 py-3 rounded-full shadow-comic-lg
                                    ${["bg-comic-blue", "bg-comic-red", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"][turn.currentPlayerIndex % 6]}
                                `}
                        >
                            <p className="text-xl md:text-2xl font-display uppercase whitespace-nowrap text-white text-stroke">
                                Turno de: {turn.currentPlayer?.name || "Jugador"}
                            </p>
                        </motion.div>
                    </div>

                    {/* Image centered */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            key={currentItem.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-2xl aspect-square bg-white border-4 border-black rounded-3xl shadow-comic-lg relative overflow-hidden flex items-center justify-center"
                        >
                            <img
                                src={currentItem.image}
                                alt="Imagen a evaluar: ¿real o generada por IA?"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-[8rem] bg-gray-100">
                                🖼️
                            </div>
                        </motion.div>
                    </div>

                    {/* Feedback / Explanation */}
                    {feedback && (
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute left-1/2 -translate-x-1/2 top-[62%] z-[60] w-[90%] max-w-2xl"
                        >
                            <div className={`border-4 border-black rounded-2xl px-6 py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] ${feedback === "correct" ? "bg-green-500" : "bg-red-600"}`}>
                                <p className="text-2xl md:text-3xl font-display text-white text-center leading-none mb-1">
                                    {feedback === "correct" ? "¡CORRECTO!" : "¡INCORRECTO!"}
                                </p>
                                <p className="text-white text-center font-bold text-base md:text-lg">
                                    {currentItem.description}
                                </p>
                                <p className="text-white/90 text-center text-sm mt-1 italic">
                                    💡 {currentItem.hint}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Controls */}
                    <div className="flex-none p-4 md:p-6 pb-10 z-10">
                        <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
                            {!feedback && showHint && (
                                <div className="bg-comic-yellow border-4 border-black rounded-2xl px-5 py-3 shadow-comic max-w-xl text-center">
                                    <p className="text-lg font-bold text-black">💡 Pista: {currentItem.hint}</p>
                                </div>
                            )}

                            <div className="flex flex-row gap-4 md:gap-6 w-full justify-center">
                                {!feedback && (
                                    <ComicButton
                                        variant="success"
                                        className="flex-1 text-xl md:text-3xl py-5"
                                        onClick={() => handleAnswer("real")}
                                    >
                                        <Check className="w-6 h-6 md:w-8 md:h-8" /> ES REAL
                                    </ComicButton>
                                )}
                                {!feedback && (
                                    <ComicButton
                                        variant="danger"
                                        className="flex-1 text-xl md:text-3xl py-5"
                                        onClick={() => handleAnswer("ia")}
                                    >
                                        <X className="w-6 h-6 md:w-8 md:h-8" /> ES IA
                                    </ComicButton>
                                )}
                            </div>

                            {!feedback && !showHint && (
                                <ComicButton
                                    variant="outline"
                                    className="text-base py-2"
                                    onClick={handleHint}
                                >
                                    <Lightbulb className="w-5 h-5" /> PISTA (−0.5)
                                </ComicButton>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
