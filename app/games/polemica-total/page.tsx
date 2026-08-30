"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { opinions, Opinion, OpinionMajority } from "@/data/opinions";
import { useGameTurn } from "@/lib/useGameTurn";

export default function PolemicaTotal() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [current, setCurrent] = useState<Opinion | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [answer, setAnswer] = useState<OpinionMajority | null>(null);

    const startRound = () => {
        const available = opinions.filter((opinion) => !usedIds.has(opinion.id));
        const pool = available.length > 0 ? available : opinions;
        const next = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(next);
        setUsedIds((previous) => new Set(previous).add(next.id));
        setFeedback(null);
        setAnswer(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        setUsedIds(new Set());
        startRound();
    };

    const handleAnswer = (guess: OpinionMajority) => {
        if (!current || feedback) return;
        setAnswer(guess);
        const isCorrect = guess === current.majority;
        setFeedback(isCorrect ? "correct" : "incorrect");
        if (isCorrect) turn.incrementScore(1);
    };

    const handleNext = () => {
        const proceed = turn.handleNext(feedback);
        if (proceed) startRound();
    };

    const handleReset = () => {
        turn.handleReset();
        setStarted(false);
        setCurrent(null);
        setFeedback(null);
        setAnswer(null);
        setUsedIds(new Set());
    };

    return (
        <GameShell
            title="Polémica Total"
            instructions="Elegí un bando y descubrí qué piensa la mayoría. ¡Coincidir suma un punto!"
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
            {started && current && (
                <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-comic-green p-5 md:p-10">
                    <section className="w-full max-w-4xl rounded-3xl border-4 border-black bg-white p-8 text-center shadow-comic-lg md:p-14">
                        <p className="mb-7 text-7xl" aria-hidden="true">{current.emoji || "💬"}</p>
                        <h2 className="font-display text-4xl leading-tight md:text-6xl">“{current.text}”</h2>
                    </section>
                    {feedback ? (
                        <div className={`w-full max-w-3xl rounded-2xl border-4 border-black p-5 text-center text-white shadow-comic ${feedback === "correct" ? "bg-green-600" : "bg-red-600"}`}>
                            <p className="font-display text-3xl">{feedback === "correct" ? "¡COINCIDISTE!" : "¡GANÓ EL OTRO BANDO!"}</p>
                            <p className="mt-2 text-xl font-bold">La mayoría eligió “{current.majority}” con {current.percentage}%.</p>
                            <p className="mt-1 text-sm">Tu elección: {answer}</p>
                        </div>
                    ) : (
                        <div className="flex w-full max-w-3xl gap-4">
                            <ComicButton variant="success" className="flex-1 py-5 text-xl md:text-2xl" onClick={() => handleAnswer("a favor")}>👍 A FAVOR</ComicButton>
                            <ComicButton variant="danger" className="flex-1 py-5 text-xl md:text-2xl" onClick={() => handleAnswer("en contra")}>👎 EN CONTRA</ComicButton>
                        </div>
                    )}
                </main>
            )}
        </GameShell>
    );
}
