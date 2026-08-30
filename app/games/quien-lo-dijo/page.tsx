"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { quotes, Quote } from "@/data/quotes";
import { useGameTurn } from "@/lib/useGameTurn";

export default function QuienLoDijoGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const startNewRound = () => {
        let available = quotes.filter((quote) => !usedIds.has(quote.id));
        if (available.length === 0) {
            available = quotes;
            setUsedIds(new Set());
        }
        const quote = available[Math.floor(Math.random() * available.length)];
        const sameCategory = quotes.filter(
            (item) => item.id !== quote.id && item.author !== quote.author && quote.category && item.category === quote.category,
        );
        const pool = sameCategory.length >= 3
            ? sameCategory
            : quotes.filter((item) => item.id !== quote.id && item.author !== quote.author);
        const authors = [...new Set(pool.map((item) => item.author))]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        setCurrentQuote(quote);
        setOptions([...authors, quote.author].sort(() => Math.random() - 0.5));
        setUsedIds((previous) => new Set(previous).add(quote.id));
        setFeedback(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startNewRound();
    };

    const handleAnswer = (author: string) => {
        if (feedback || !currentQuote) return;
        const correct = author === currentQuote.author;
        setFeedback(correct ? "correct" : "incorrect");
        if (correct) turn.incrementScore(1);
    };

    const handleNext = () => {
        const proceeds = turn.handleNext(feedback);
        if (proceeds) startNewRound();
    };

    const handleReset = () => {
        turn.handleReset();
        setStarted(false);
        setCurrentQuote(null);
        setUsedIds(new Set());
        setFeedback(null);
    };

    return (
        <GameShell
            title="¿Quién lo dijo?"
            instructions="Lee la frase y elige a su autor. Si aciertas, ¡sigues jugando!"
            score={turn.currentPlayer?.score || 0}
            finalScores={turn.isGameOver ? turn.players : undefined}
            isGameOver={turn.isGameOver}
            feedback={feedback}
            onStart={handleStart}
            onReset={handleReset}
            onNext={handleNext}
            fullScreen
        >
            {started && currentQuote && (
                <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
                    <div className="text-center">
                        <p className="text-lg font-bold uppercase">Turno de {turn.currentPlayer?.name}</p>
                        <div className="mt-6 max-w-3xl bg-white border-4 border-black rounded-3xl p-8 shadow-comic-lg">
                            <span className="text-6xl">{currentQuote.emoji || "💬"}</span>
                            <blockquote className="mt-4 text-3xl md:text-5xl font-display leading-tight">
                                “{currentQuote.text}”
                            </blockquote>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                        {options.map((author) => (
                            <ComicButton
                                key={author}
                                variant={feedback && author === currentQuote.author ? "success" : "secondary"}
                                className={`min-h-16 whitespace-normal ${feedback && author !== currentQuote.author ? "opacity-40" : ""}`}
                                onClick={() => handleAnswer(author)}
                                disabled={!!feedback}
                            >
                                {author}
                            </ComicButton>
                        ))}
                    </div>
                </main>
            )}
        </GameShell>
    );
}
