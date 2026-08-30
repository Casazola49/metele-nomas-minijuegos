"use client";

import { useState, useEffect, useMemo } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { inventions, Invention } from "@/data/inventions";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CualFuePrimeroGame() {
    // TODO: Migrar a useGameTurn (lib/useGameTurn.ts) para unificar la lógica de turnos/puntaje.
    const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [score, setScore] = useState(0); // Display score for current player
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const [leftItem, setLeftItem] = useState<Invention | null>(null);
    const [rightItem, setRightItem] = useState<Invention | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    // Sync score with current player
    useEffect(() => {
        if (players.length > 0) {
            setScore(players[currentPlayerIndex].score);
        }
    }, [players, currentPlayerIndex]);

    const startNewGame = (playerCount: number = 1) => {
        const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
            name: `Jugador ${i + 1}`,
            score: 0,
        }));
        setPlayers(newPlayers);
        setCurrentPlayerIndex(0);
        setScore(0);

        // Initial items
        const shuffled = [...inventions].sort(() => Math.random() - 0.5);
        const first = shuffled[0];
        const second = shuffled[1];

        setLeftItem(first);
        setRightItem(second);
        setUsedIds(new Set([first.id, second.id]));

        setIsGameOver(false);
        setFeedback(null);
    };

    const getNextItem = () => {
        const available = inventions.filter(i => !usedIds.has(i.id));
        if (available.length === 0) return null;
        const next = available[Math.floor(Math.random() * available.length)];
        setUsedIds(prev => new Set(prev).add(next.id));
        return next;
    };

    const handleAnswer = (selected: Invention, other: Invention) => {
        if (feedback) return;

        const isCorrect = selected.year <= other.year;

        if (isCorrect) {
            setFeedback("correct");
            // Update score for current player
            setPlayers((prev) => {
                const newPlayers = [...prev];
                newPlayers[currentPlayerIndex].score += 1;
                return newPlayers;
            });
        } else {
            setFeedback("incorrect");
            // Turn will change in handleNext
        }
    };

    const handleNext = () => {
        // Handle turn rotation if incorrect
        if (feedback === "incorrect") {
            if (currentPlayerIndex < players.length - 1) {
                setCurrentPlayerIndex((prev) => prev + 1);
            } else {
                setIsGameOver(true);
                return;
            }
        }

        setFeedback(null);
        const next = getNextItem();

        if (next && rightItem) {
            // Move right item to left, and new item to right
            setLeftItem(rightItem);
            setRightItem(next);
        } else {
            // No more items
            setIsGameOver(true);
        }
    };

    const formatYear = (year: number) => {
        if (year < 0) return `${Math.abs(year)} A.C.`;
        return year.toString();
    };

    return (
        <GameShell
            title="¿Cuál fue primero?"
            instructions="Selecciona el invento que se creó PRIMERO (el más antiguo)."
            score={score}
            isGameOver={isGameOver}
            feedback={feedback}
            onNext={handleNext}
            onStart={startNewGame}
            onReset={() => startNewGame(players.length || 1)} // Restart with same player count? Or go back to start? GameShell handles reset to start screen usually.
            finalScores={players}
            disableFeedbackOverlay={true}
            fullScreen={true}
        >
            {leftItem && rightItem && (
                <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto relative overflow-hidden bg-black">
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

                    {players.length > 0 && (
                        <div className="absolute top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
                            <motion.div
                                key={currentPlayerIndex}
                                initial={{ scale: 0.8, y: -20 }}
                                animate={{ scale: 1, y: 0 }}
                                className={`
                                    border-4 border-black px-8 py-3 rounded-full shadow-comic-lg
                                    ${["bg-comic-blue", "bg-comic-red", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"][currentPlayerIndex % 6]}
                                `}
                            >
                                <p className="text-xl md:text-2xl font-display uppercase whitespace-nowrap text-white text-stroke">
                                    Turno de: {players[currentPlayerIndex].name}
                                </p>
                            </motion.div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row h-full w-full relative">
                        {/* Left Item */}
                        <motion.div
                            className="flex-1 flex flex-col relative group cursor-pointer border-b-4 md:border-b-0 md:border-r-4 border-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => !feedback && handleAnswer(leftItem, rightItem)}
                        >
                            {/* Image Area */}
                            <div className="flex-1 relative overflow-hidden bg-gray-100">
                                <img
                                    src={leftItem.image}
                                    alt={leftItem.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden absolute inset-0 flex items-center justify-center text-9xl bg-gray-100">
                                    {leftItem.emoji}
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                {/* REVEAL YEAR CENTRERED */}
                                {feedback && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="bg-comic-yellow px-8 py-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                                        >
                                            <p className="text-7xl md:text-9xl font-display text-black leading-none text-stroke-sm">
                                                {formatYear(leftItem.year)}
                                            </p>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Name Footer */}
                            <div className="h-24 md:h-32 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 relative z-10">
                                <h3 className="text-3xl md:text-5xl font-display text-black mb-2 text-center leading-none">
                                    {leftItem.name}
                                </h3>


                            </div>
                        </motion.div>

                        {/* VS Badge */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
                            <div className="text-5xl md:text-7xl font-display text-white text-stroke drop-shadow-xl bg-comic-red w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 border-black transform -rotate-12 shadow-comic-lg">
                                VS
                            </div>
                        </div>

                        {/* Right Item */}
                        <motion.div
                            className="flex-1 flex flex-col relative group cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={rightItem.id}
                            onClick={() => !feedback && handleAnswer(rightItem, leftItem)}
                        >
                            {/* Image Area */}
                            <div className="flex-1 relative overflow-hidden bg-gray-100">
                                <img
                                    src={rightItem.image}
                                    alt={rightItem.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden absolute inset-0 flex items-center justify-center text-9xl bg-gray-100">
                                    {rightItem.emoji}
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                {/* REVEAL YEAR CENTRERED */}
                                {feedback && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <motion.div
                                            initial={{ scale: 0, rotate: 20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="bg-comic-yellow px-8 py-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                                        >
                                            <p className="text-7xl md:text-9xl font-display text-black leading-none text-stroke-sm">
                                                {formatYear(rightItem.year)}
                                            </p>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Name Footer */}
                            <div className="h-24 md:h-32 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 relative z-10">
                                <h3 className="text-3xl md:text-5xl font-display text-black mb-2 text-center leading-none">
                                    {rightItem.name}
                                </h3>


                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
