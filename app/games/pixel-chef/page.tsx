"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { foods, Food } from "@/data/foods";
import { useGameTurn } from "@/lib/useGameTurn";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

// 3 pixelation levels: Muy pixelado -> Poco pixelado -> Nítido
const PIXEL_BLUR = [20, 9, 0]; // blur in px
const PIXEL_SCALE = [1.12, 1.05, 1];

export default function PixelChefGame() {
    const turn = useGameTurn();

    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const [currentFood, setCurrentFood] = useState<Food | null>(null);
    const [options, setOptions] = useState<Food[]>([]);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [pixelLevel, setPixelLevel] = useState(0);

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startNewRound(true);
    };

    const startNewRound = (isFirstRound = false) => {
        let available = foods.filter((f) => !usedIds.has(f.id));
        if (available.length === 0) {
            available = foods;
            setUsedIds(new Set());
        }

        const pool = isFirstRound ? [...foods] : available;
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const target = shuffled[0];

        // Distractors: same category if available, else random
        let distractors = foods
            .filter((f) => f.id !== target.id && f.category === target.category)
            .sort(() => Math.random() - 0.5);

        if (distractors.length < 5) {
            const others = foods
                .filter((f) => f.id !== target.id && f.category !== target.category)
                .sort(() => Math.random() - 0.5);
            distractors = [...distractors, ...others];
        }

        const finalOptions = [...distractors.slice(0, 5), target].sort(
            () => Math.random() - 0.5
        );

        setCurrentFood(target);
        setOptions(finalOptions);
        setUsedIds(prev => new Set(prev).add(target.id));
        setPixelLevel(0);
        setFeedback(null);
    };


    const handleAnswer = (selected: Food) => {
        if (feedback || !currentFood) return;

        if (selected.id === currentFood.id) {
            setFeedback("correct");
            turn.incrementScore(1);
        } else {
            setFeedback("incorrect");
        }
    };

    const handleDespixelar = () => {
        if (feedback || pixelLevel >= 2) return;
        setPixelLevel((prev) => Math.min(prev + 1, 2));
        // Penalización: -0.5 puntos al usar pista
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

    const blur = feedback ? 0 : PIXEL_BLUR[pixelLevel];
    const scale = feedback ? 1 : PIXEL_SCALE[pixelLevel];

    return (
        <GameShell
            title="Pixel Chef"
            instructions="¿Qué plato es? Despixelea si te rindes, ¡pero te cuesta medio punto!"
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
            {started && currentFood && (
                <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto relative overflow-hidden bg-comic-green">
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

                    {/* Image Area */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            key={currentFood.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-2xl aspect-square bg-white border-4 border-black rounded-3xl shadow-comic-lg relative overflow-hidden flex items-center justify-center"
                        >
                            <img
                                src={currentFood.image}
                                alt="Plato pixelado para adivinar"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ filter: `blur(${blur}px)`, transform: `scale(${scale})` }}
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-[8rem] bg-white">
                                {currentFood.emoji}
                            </div>

                            {/* Reveal name when answered */}
                            {feedback && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-comic-yellow px-6 py-3 rounded-2xl border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                                >
                                    <p className="text-3xl md:text-4xl font-display text-black text-center leading-none">
                                        {currentFood.name}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Controls + Options */}
                    <div className="flex-none p-4 md:p-6 pb-10 z-10">
                        <div className="flex flex-col items-center gap-4 max-w-5xl mx-auto">
                            {!feedback && (
                                <ComicButton
                                    variant="danger"
                                    className="text-lg py-3"
                                    onClick={handleDespixelar}
                                    disabled={pixelLevel >= 2}
                                >
                                    {pixelLevel >= 2 ? (
                                        <>💡 Imagen nítida</>
                                    ) : (
                                        <><Eye className="w-5 h-5" /> DESPIXELEAR (−0.5)</>
                                    )}
                                </ComicButton>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                                {options.map((food) => (
                                    <ComicButton
                                        key={food.id}
                                        variant="secondary"
                                        className={`w-full text-base md:text-xl py-3 md:py-4 h-auto whitespace-normal leading-tight min-h-[4rem]
                                            ${feedback && food.id === currentFood.id ? "bg-green-400 text-white ring-4 ring-green-600" : ""}
                                            ${feedback === "incorrect" && food.id !== currentFood.id ? "opacity-30 scale-95 grayscale" : ""}
                                        `}
                                        onClick={() => handleAnswer(food)}
                                        disabled={!!feedback}
                                    >
                                        {food.name}
                                    </ComicButton>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
