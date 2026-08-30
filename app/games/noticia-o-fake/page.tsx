"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { headlines, Headline } from "@/data/headlines";
import { useGameTurn } from "@/lib/useGameTurn";

export default function NoticiaOFake() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [current, setCurrent] = useState<Headline | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    const startRound = () => {
        const available = headlines.filter((headline) => !usedIds.has(headline.id));
        const pool = available.length > 0 ? available : headlines;
        const next = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(next);
        setUsedIds((previous) => new Set(previous).add(next.id));
        setFeedback(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        setUsedIds(new Set());
        startRound();
    };

    const handleAnswer = (guess: boolean) => {
        if (!current || feedback) return;
        const isCorrect = guess === current.isReal;
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
        setUsedIds(new Set());
    };

    return (
        <GameShell
            title="¿Real o Fake News?"
            instructions="Leé el titular y decidí si ocurrió de verdad o salió de la imaginación."
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
                <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-comic-pink p-5 md:p-10">
                    <div className="w-full max-w-4xl rounded-3xl border-4 border-black bg-white p-6 text-center shadow-comic-lg md:p-12">
                        <p className="mb-5 font-display text-lg uppercase text-comic-blue">Titular #{current.id.replace("headline-", "")}</p>
                        <div className="relative mx-auto mb-7 flex aspect-video max-w-xl items-center justify-center overflow-hidden rounded-2xl border-4 border-black bg-gray-100">
                            <img src={current.image} alt="Ilustración de la noticia" className="absolute inset-0 h-full w-full object-cover" onError={(event) => {
                                event.currentTarget.style.display = "none";
                                event.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }} />
                            <div className="hidden text-8xl" aria-label={current.emoji}>{current.emoji || "📰"}</div>
                        </div>
                        <h2 className="font-display text-3xl leading-tight md:text-5xl">{current.text}</h2>
                    </div>
                    {feedback ? (
                        <div className={`w-full max-w-3xl rounded-2xl border-4 border-black p-5 text-center text-white shadow-comic ${feedback === "correct" ? "bg-green-600" : "bg-red-600"}`}>
                            <p className="font-display text-3xl">{feedback === "correct" ? "¡CORRECTO!" : "¡ERA FAKE!"}</p>
                            <p className="mt-2 text-lg font-bold">Fuente: {current.source}</p>
                        </div>
                    ) : (
                        <div className="flex w-full max-w-3xl gap-4">
                            <ComicButton variant="success" className="flex-1 py-5 text-2xl" onClick={() => handleAnswer(true)}>✅ REAL</ComicButton>
                            <ComicButton variant="danger" className="flex-1 py-5 text-2xl" onClick={() => handleAnswer(false)}>❌ FAKE</ComicButton>
                        </div>
                    )}
                </main>
            )}
        </GameShell>
    );
}
