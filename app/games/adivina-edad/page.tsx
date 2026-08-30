"use client";

import { useState, useEffect } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { celebrities, Celebrity } from "@/data/celebrities";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Scoreboard } from "@/components/game/Scoreboard";

interface Player {
    id: number;
    name: string;
    score: number;
}

export default function AdivinaEdadGame() {
    // Game State
    const [started, setStarted] = useState(false);
    // TODO: Migrar a useGameTurn (lib/useGameTurn.ts) para unificar la lógica de turnos/puntaje.
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerCount, setPlayerCount] = useState(2);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0); // Dummy for GameShell

    // Feedback & Animation State
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [feedbackPosition, setFeedbackPosition] = useState<"center" | "corner">("center");

    // Round State
    const [leftPerson, setLeftPerson] = useState<Celebrity | null>(null);
    const [rightPerson, setRightPerson] = useState<Celebrity | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    // Setup logic
    const handleStart = (count: number) => {
        setPlayerCount(count);
        const newPlayers = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `JUGADOR ${i + 1}`,
            score: 0,
        }));
        setPlayers(newPlayers);
        setStarted(true);
        startNewRound(true);
    };

    const startNewRound = (isFirstRound = false) => {
        // Prepare available pool
        let available = celebrities.filter((c) => !usedIds.has(c.id));
        if (available.length < 2) {
            available = celebrities;
            setUsedIds(new Set());
        }

        let first: Celebrity;
        let second: Celebrity;

        if (isFirstRound || !rightPerson) {
            const shuffled = [...available].sort(() => Math.random() - 0.5);
            first = shuffled[0];
            second = shuffled[1];
        } else {
            first = rightPerson; // Move right to left
            const candidates = available.filter(c => c.id !== first.id);
            if (candidates.length === 0) {
                const shuffled = [...celebrities].sort(() => Math.random() - 0.5);
                second = shuffled.find(c => c.id !== first.id) || shuffled[0];
            } else {
                const shuffled = [...candidates].sort(() => Math.random() - 0.5);
                second = shuffled[0];
            }
        }

        setLeftPerson(first);
        setRightPerson(second);

        setUsedIds(prev => new Set(prev).add(first.id).add(second.id));

        setFeedback(null);
        setFeedbackPosition("center");
    };

    const handleAnswer = (guess: "mayor" | "menor") => {
        if (feedback || !leftPerson || !rightPerson) return;

        const isOlder = rightPerson.age >= leftPerson.age;
        const isYounger = rightPerson.age <= leftPerson.age;

        let isCorrect = false;
        if (guess === "mayor" && isOlder) isCorrect = true;
        if (guess === "menor" && isYounger) isCorrect = true;

        if (isCorrect) {
            setFeedback("correct");
            setPlayers((prev) => {
                const newPlayers = [...prev];
                newPlayers[currentPlayerIndex].score += 1;
                return newPlayers;
            });
        } else {
            setFeedback("incorrect");
        }

        setFeedbackPosition("center");
    };

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => {
                setFeedbackPosition("corner");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const handleNext = () => {
        const wasCorrect = feedback === "correct";
        setFeedback(null);
        setFeedbackPosition("center");

        if (!wasCorrect) {
            if (currentPlayerIndex < players.length - 1) {
                setCurrentPlayerIndex((prev) => prev + 1);
            } else {
                setIsGameOver(true);
                return;
            }
        }

        startNewRound();
    };

    const handleReset = () => {
        setIsGameOver(false);
        setStarted(false);
        setPlayers([]);
        setCurrentPlayerIndex(0);
        setScore(0);
    };

    return (
        <GameShell
            title="Adivina la Edad"
            instructions="¡Adivina si la celebridad de la derecha es MAYOR o MENOR!"
            score={0}
            onStart={handleStart}
            onReset={handleReset}
            isGameOver={isGameOver}
            feedback={feedback}
            onNext={handleNext}
            fullScreen
            disableFeedbackOverlay
            hideScoreboard
            finalScores={isGameOver ? players : undefined}
        >
            {started && leftPerson && rightPerson && (
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

                    {/* Turn Indicator */}
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
                                Turno de: {players[currentPlayerIndex]?.name || "Jugador"}
                            </p>
                        </motion.div>
                    </div>

                    {/* Scoreboard Widget - Centered below VS */}
                    <div className="absolute left-1/2 top-[65%] transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <Scoreboard score={players[currentPlayerIndex]?.score || 0} />
                    </div>

                    {/* Result Age Badge - Moved to Root to avoid clipping */}
                    {feedback && (
                        <motion.div
                            layout
                            initial={false}
                            animate={{
                                top: feedbackPosition === "center" ? "50%" : "1.5rem", // 1.5rem ~ top-6
                                right: feedbackPosition === "center" ? "50%" : "1.5rem", // 1.5rem ~ right-6
                                x: feedbackPosition === "center" ? "50%" : 0,
                                y: feedbackPosition === "center" ? "-50%" : 0,
                            }}
                            className={`absolute z-[60] transition-all duration-500 ease-in-out ${feedbackPosition === "center"
                                    ? "transform"
                                    : ""
                                }`}
                        >
                            <motion.div
                                layout
                                initial={{ scale: 0, rotate: 12 }}
                                animate={{
                                    scale: feedbackPosition === "center" ? 1.5 : 1,
                                    rotate: feedbackPosition === "center" ? 0 : 0
                                }}
                                className="bg-comic-yellow px-6 py-4 rounded-[1.5rem] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] whitespace-nowrap"
                            >
                                <p className="text-5xl md:text-7xl font-display text-black leading-none text-stroke-sm">
                                    {rightPerson.age} <span className="text-xl block">AÑOS</span>
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row h-full w-full relative">
                        {/* LEFT PERSON (BASE) */}
                        <div className="flex-1 relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-gray-100 overflow-hidden">
                            {/* Image - Full Height */}
                            <img
                                src={leftPerson.image}
                                alt={leftPerson.name}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-4xl bg-gray-200 text-gray-400">
                                Sin Imagen
                            </div>
                            <div className="absolute inset-0 bg-black/0 transition-colors" />

                            {/* Left Age Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                <div className="bg-comic-yellow px-6 py-4 rounded-[1.5rem] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transform -rotate-12">
                                    <p className="text-5xl md:text-7xl font-display text-black leading-none text-stroke-sm">
                                        {leftPerson.age} <span className="text-xl block">AÑOS</span>
                                    </p>
                                </div>
                            </div>

                            {/* Footer Overlay - Absolute Bottom */}
                            <div className="absolute bottom-0 w-full h-24 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 z-10">
                                <h3 className="text-3xl md:text-5xl font-display text-black mb-1 text-center leading-none">
                                    {leftPerson.name}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-600 font-bold uppercase tracking-wider">
                                    {leftPerson.role}
                                </p>
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
                            <div className="text-5xl md:text-7xl font-display text-white text-stroke drop-shadow-xl bg-comic-red w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 border-black transform -rotate-12 shadow-comic-lg">
                                VS
                            </div>
                        </div>

                        {/* RIGHT PERSON (GUESS) */}
                        <div className="flex-1 relative bg-gray-100 overflow-hidden">
                            {/* Image - Full Height */}
                            <img
                                src={rightPerson.image}
                                alt={rightPerson.name}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-4xl bg-gray-200 text-gray-400">
                                Sin Imagen
                            </div>

                            {/* Controls Overlay - Positioned above footer */}
                            <div className="absolute left-0 right-0 bottom-28 flex flex-col items-center justify-end z-20 pointer-events-none">
                                <div className="pointer-events-auto">
                                    {!feedback && (
                                        <div className="flex flex-row gap-6 scale-100 md:scale-110">
                                            <ComicButton
                                                onClick={() => handleAnswer("mayor")}
                                                className="bg-comic-blue text-white w-48 text-xl py-3 flex items-center justify-center gap-2 hover:bg-blue-600 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            >
                                                <ArrowUp className="w-6 h-6" /> ES MAYOR
                                            </ComicButton>
                                            <ComicButton
                                                onClick={() => handleAnswer("menor")}
                                                className="bg-comic-purple text-white w-48 text-xl py-3 flex items-center justify-center gap-2 hover:bg-purple-600 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            >
                                                <ArrowDown className="w-6 h-6" /> ES MENOR
                                            </ComicButton>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Overlay - Absolute Bottom */}
                            <div className="absolute bottom-0 w-full h-24 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 z-10">
                                <h3 className="text-3xl md:text-5xl font-display text-black mb-1 text-center leading-none">
                                    {rightPerson.name}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-600 font-bold uppercase tracking-wider">
                                    {rightPerson.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
