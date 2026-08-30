"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { countries, Country } from "@/data/countries";
import { useGameTurn } from "@/lib/useGameTurn";

export default function MundoGiradoGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [current, setCurrent] = useState<Country | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    const startRound = () => {
        const available = countries.filter((country) => !usedIds.has(country.id));
        const pool = available.length > 0 ? available : countries;
        const next = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(next);
        const distractors = countries
            .filter((country) => country.id !== next.id)
            .slice(0, 3)
            .map((country) => country.name);
        setOptions([next.name, ...distractors].sort(() => Math.random() - 0.5));
        setUsedIds((previous) => new Set(previous).add(next.id));
        setFeedback(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startRound();
    };

    const handleAnswer = (answer: string) => {
        if (!current || feedback) return;
        const correct = answer === current.name;
        setFeedback(correct ? "correct" : "incorrect");
        if (correct) turn.incrementScore();
    };

    const handleNext = () => {
        const proceed = turn.handleNext(feedback);
        if (proceed) startRound();
    };

    const handleReset = () => {
        turn.handleReset();
        setStarted(false);
        setCurrent(null);
        setUsedIds(new Set());
        setFeedback(null);
    };

    return (
        <GameShell
            title="Mundo girado"
            instructions="Mira la silueta desde una perspectiva imposible y adivina el país."
            score={turn.currentPlayer?.score || 0}
            onStart={handleStart}
            onReset={handleReset}
            isGameOver={turn.isGameOver}
            feedback={feedback}
            onNext={handleNext}
            finalScores={turn.isGameOver ? turn.players : undefined}
        >
            {started && current && (
                <main className="flex flex-col items-center gap-6">
                    <p className="text-lg font-bold uppercase">Turno de {turn.currentPlayer?.name}</p>
                    <div className="flex h-64 w-64 items-center justify-center rounded-3xl border-4 border-black bg-white shadow-comic">
                        <svg
                            viewBox="0 0 120 120"
                            className="h-48 w-48 transition-transform duration-500"
                            style={{ transform: `rotate(${current.rotateDeg}deg)` }}
                            role="img"
                            aria-label="Silueta de país para adivinar"
                        >
                            <path d={current.silhouette} fill="#202020" stroke="#000" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="text-center text-lg">💡 {current.hint}</p>
                    <div className="grid w-full max-w-xl grid-cols-2 gap-4">
                        {options.map((option) => (
                            <ComicButton key={option} variant="secondary" disabled={Boolean(feedback)} onClick={() => handleAnswer(option)}>
                                {option}
                            </ComicButton>
                        ))}
                    </div>
                    {feedback && <p className="rounded-xl border-4 border-black bg-white px-5 py-3 text-xl font-bold">Era: {current.name} {current.emoji}</p>}
                </main>
            )}
        </GameShell>
    );
}
