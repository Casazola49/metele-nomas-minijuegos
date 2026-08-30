"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { brandColors, BrandColor } from "@/data/brand-colors";
import { useGameTurn } from "@/lib/useGameTurn";

export default function ColorCorrectoGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [current, setCurrent] = useState<BrandColor | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

    const startRound = () => {
        const available = brandColors.filter((brand) => !usedIds.has(brand.id));
        const pool = available.length > 0 ? available : brandColors;
        const next = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(next);
        setOptions([...next.optionHexes].sort(() => Math.random() - 0.5));
        setUsedIds((previous) => new Set(previous).add(next.id));
        setFeedback(null);
    };

    const handleStart = (count: number) => {
        turn.handleStart(count);
        setStarted(true);
        startRound();
    };

    const handleAnswer = (hex: string) => {
        if (!current || feedback) return;
        const correct = hex === current.hex;
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
            title="¿De qué color es?"
            instructions="Reconoce el tono exacto de las marcas más famosas."
            score={turn.currentPlayer?.score || 0}
            onStart={handleStart}
            onReset={handleReset}
            isGameOver={turn.isGameOver}
            feedback={feedback}
            onNext={handleNext}
            finalScores={turn.isGameOver ? turn.players : undefined}
        >
            {started && current && (
                <main className="flex flex-col items-center gap-8">
                    <div className="text-center">
                        <p className="text-lg font-bold uppercase">Turno de {turn.currentPlayer?.name}</p>
                        <div className="mx-auto mt-4 flex h-36 w-64 items-center justify-center rounded-2xl border-4 border-black bg-white shadow-comic grayscale">
                            <span className="text-7xl" role="img" aria-label={`Logo placeholder de ${current.name}`}>{current.emoji}</span>
                        </div>
                        <h2 className="mt-4 text-4xl font-display">{current.name}</h2>
                    </div>
                    <div className="grid w-full max-w-xl grid-cols-2 gap-4">
                        {options.map((hex) => (
                            <ComicButton
                                key={hex}
                                variant="secondary"
                                disabled={Boolean(feedback)}
                                onClick={() => handleAnswer(hex)}
                                className="h-28 flex-col gap-2"
                            >
                                <span className="h-12 w-20 rounded-lg border-2 border-black" style={{ backgroundColor: hex }} />
                                <span className="font-mono text-sm normal-case">{hex}</span>
                            </ComicButton>
                        ))}
                    </div>
                    {feedback && <p className="rounded-xl border-4 border-black bg-white px-5 py-3 text-xl font-bold">Color correcto: <span className="font-mono">{current.hex}</span></p>}
                </main>
            )}
        </GameShell>
    );
}
