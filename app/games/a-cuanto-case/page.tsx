"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { products, Product } from "@/data/products";
import { useGameTurn } from "@/lib/useGameTurn";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ACuantoCaseGame() {
    const turn = useGameTurn();

    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const [leftProduct, setLeftProduct] = useState<Product | null>(null);
    const [rightProduct, setRightProduct] = useState<Product | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startNewRound(true);
    };

    const formatPrice = (price: number) => `${price} BOB`;

    const pickNext = (exclude: string): Product => {
        let available = products.filter((p) => !usedIds.has(p.id) && p.id !== exclude);
        if (available.length === 0) {
            available = products.filter((p) => p.id !== exclude);
            setUsedIds(new Set());
        }
        return available[Math.floor(Math.random() * available.length)];
    };

    const startNewRound = (isFirstRound = false) => {
        let first: Product;
        let second: Product;

        if (isFirstRound || !rightProduct) {
            const shuffled = [...products].sort(() => Math.random() - 0.5);
            first = shuffled[0];
            second = shuffled[1];
        } else {
            first = rightProduct; // Move right to left
            second = pickNext(first.id);
        }

        setLeftProduct(first);
        setRightProduct(second);
        setUsedIds(prev => new Set(prev).add(first.id).add(second.id));
        setFeedback(null);
    };


    const handleAnswer = (guess: "mas" | "menos") => {
        if (feedback || !leftProduct || !rightProduct) return;

        const isMore = rightProduct.price > leftProduct.price;
        const isLess = rightProduct.price < leftProduct.price;

        let isCorrect = false;
        if (guess === "mas" && isMore) isCorrect = true;
        if (guess === "menos" && isLess) isCorrect = true;

        if (isCorrect) {
            setFeedback("correct");
            turn.incrementScore(1);
        } else {
            setFeedback("incorrect");
        }
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
            title="¿A Cuánto Case?"
            instructions="¿El producto de la derecha cuesta MÁS o MENOS que el de la izquierda?"
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
            {started && leftProduct && rightProduct && (
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

                    <div className="flex flex-col md:flex-row h-full w-full relative">
                        {/* LEFT PRODUCT (reference price) */}
                        <div className="flex-1 relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-gray-100 overflow-hidden">
                            <img
                                src={leftProduct.image}
                                alt={`Producto de referencia: ${leftProduct.name}`}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-9xl bg-gray-100">
                                {leftProduct.emoji}
                            </div>

                            {/* Reference Price Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                <div className="bg-comic-yellow px-6 py-4 rounded-[1.5rem] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transform -rotate-12">
                                    <p className="text-4xl md:text-6xl font-display text-black leading-none text-stroke-sm">
                                        {formatPrice(leftProduct.price)}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 w-full h-24 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 z-10">
                                <h3 className="text-2xl md:text-4xl font-display text-black mb-1 text-center leading-none">
                                    {leftProduct.name}
                                </h3>
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
                            <div className="text-5xl md:text-7xl font-display text-white text-stroke drop-shadow-xl bg-comic-red w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-4 border-black transform -rotate-12 shadow-comic-lg">
                                VS
                            </div>
                        </div>

                        {/* RIGHT PRODUCT (guess) */}
                        <div className="flex-1 relative bg-gray-100 overflow-hidden">
                            <img
                                src={rightProduct.image}
                                alt={`Producto a comparar: ${rightProduct.name}`}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center text-9xl bg-gray-100">
                                {rightProduct.emoji}
                            </div>

                            {/* Hidden / Revealed Price */}
                            <div className="absolute top-6 left-6 z-20">
                                <div className={`px-6 py-4 rounded-[1.5rem] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transform -rotate-12 ${feedback ? "bg-comic-yellow" : "bg-gray-300"}`}>
                                    <p className="text-4xl md:text-6xl font-display text-black leading-none text-stroke-sm">
                                        {feedback ? formatPrice(rightProduct.price) : "??? BOB"}
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="absolute left-0 right-0 bottom-28 flex flex-col items-center justify-end z-20 pointer-events-none">
                                <div className="pointer-events-auto">
                                    {!feedback && (
                                        <div className="flex flex-row gap-6 scale-100 md:scale-110">
                                            <ComicButton
                                                onClick={() => handleAnswer("mas")}
                                                className="bg-comic-blue text-white w-48 text-xl py-3 flex items-center justify-center gap-2 hover:bg-blue-600 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            >
                                                <ArrowUp className="w-6 h-6" /> CUESTA MÁS
                                            </ComicButton>
                                            <ComicButton
                                                onClick={() => handleAnswer("menos")}
                                                className="bg-comic-purple text-white w-48 text-xl py-3 flex items-center justify-center gap-2 hover:bg-purple-600 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            >
                                                <ArrowDown className="w-6 h-6" /> CUESTA MENOS
                                            </ComicButton>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="absolute bottom-0 w-full h-24 bg-white border-t-4 border-black flex flex-col items-center justify-center p-4 z-10">
                                <h3 className="text-2xl md:text-4xl font-display text-black mb-1 text-center leading-none">
                                    {rightProduct.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
