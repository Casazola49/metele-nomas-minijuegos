"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { ratings, Rating } from "@/data/ratings";
import { useGameTurn } from "@/lib/useGameTurn";

const normalizedAverage = (score: { imdb: number; rottenTomatoes: number }) =>
    (score.imdb * 10 + score.rottenTomatoes) / 2;

export default function GuerraCriticasGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [currentPair, setCurrentPair] = useState<Rating | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [selection, setSelection] = useState<"A" | "B" | null>(null);

    const startNewRound = () => {
        let available = ratings.filter((rating) => !usedIds.has(rating.id));
        if (available.length === 0) {
            available = ratings;
            setUsedIds(new Set());
        }
        const pair = available[Math.floor(Math.random() * available.length)];
        setCurrentPair(pair);
        setUsedIds((previous) => new Set(previous).add(pair.id));
        setFeedback(null);
        setSelection(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startNewRound();
    };

    const handleAnswer = (guess: "A" | "B") => {
        if (feedback || !currentPair) return;
        const winner = normalizedAverage(currentPair.scoreA) >= normalizedAverage(currentPair.scoreB) ? "A" : "B";
        setSelection(guess);
        const correct = guess === winner;
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
        setCurrentPair(null);
        setUsedIds(new Set());
        setFeedback(null);
        setSelection(null);
    };

    const scoreLabel = (score: { imdb: number; rottenTomatoes: number }) =>
        `IMDb ${score.imdb.toFixed(1)} · RT ${score.rottenTomatoes}`;

    return (
        <GameShell
            title="Batalla de críticas"
            instructions="Elige la película con el mejor promedio entre IMDb y Rotten Tomatoes."
            score={turn.currentPlayer?.score || 0}
            finalScores={turn.isGameOver ? turn.players : undefined}
            isGameOver={turn.isGameOver}
            feedback={feedback}
            onStart={handleStart}
            onReset={handleReset}
            onNext={handleNext}
            fullScreen
        >
            {started && currentPair && (
                <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
                    <p className="text-lg font-bold uppercase">Turno de {turn.currentPlayer?.name}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                        {(["A", "B"] as const).map((side) => {
                            const title = side === "A" ? currentPair.titleA : currentPair.titleB;
                            const score = side === "A" ? currentPair.scoreA : currentPair.scoreB;
                            const isSelected = selection === side;
                            return (
                                <ComicButton
                                    key={side}
                                    variant={isSelected && feedback === "correct" ? "success" : "secondary"}
                                    className={`min-h-64 flex-col gap-4 p-8 text-center whitespace-normal ${feedback && !isSelected ? "opacity-45" : ""}`}
                                    onClick={() => handleAnswer(side)}
                                    disabled={!!feedback}
                                >
                                    <span className="text-5xl">{currentPair.emoji || "🎬"}</span>
                                    <span className="text-2xl md:text-4xl">{title}</span>
                                    {feedback && <span className="text-lg normal-case">{scoreLabel(score)}</span>}
                                    {feedback && <span className="text-sm normal-case">Promedio: {normalizedAverage(score).toFixed(1)}/100</span>}
                                </ComicButton>
                            );
                        })}
                    </div>
                    <p className="text-center font-bold">{feedback ? `Película ${normalizedAverage(currentPair.scoreA) >= normalizedAverage(currentPair.scoreB) ? "A" : "B"} gana la batalla` : "¿Cuál gana?"}</p>
                </main>
            )}
        </GameShell>
    );
}
