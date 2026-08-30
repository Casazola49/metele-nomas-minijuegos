"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { faceMashups, FaceMashup } from "@/data/faces";
import { useGameTurn } from "@/lib/useGameTurn";

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export default function FaceMashupGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [item, setItem] = useState<FaceMashup | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const newRound = () => {
        const next = faceMashups[Math.floor(Math.random() * faceMashups.length)];
        const correct = `${next.nameA} + ${next.nameB}`;
        const distractors = faceMashups.filter((f) => f.id !== next.id)
            .flatMap((f) => [`${next.nameA} + ${f.nameB}`, `${f.nameA} + ${next.nameB}`]);
        setItem(next); setOptions(shuffle([correct, ...distractors]).slice(0, 4)); setFeedback(null);
    };
    const start = (count: number) => { turn.handleStart(count); setStarted(true); newRound(); };
    const answer = (choice: string) => {
        if (feedback || !item) return;
        const correct = choice === `${item.nameA} + ${item.nameB}`;
        setFeedback(correct ? "correct" : "incorrect");
        if (correct) turn.incrementScore();
    };
    const next = () => { const proceed = turn.handleNext(feedback); if (proceed) newRound(); };

    return <GameShell title="FACE MASHUP" instructions="¿Qué dos famosos forman esta cara fusionada?"
        score={turn.currentPlayer?.score || 0} onStart={start} onReset={() => { turn.handleReset(); setStarted(false); }}
        isGameOver={turn.isGameOver} feedback={feedback} onNext={next} finalScores={turn.isGameOver ? turn.players : undefined}>
        {started && item && <div className="space-y-6 text-center">
            <div className="mx-auto flex h-64 max-w-md items-center justify-center overflow-hidden rounded-3xl border-4 border-black bg-white shadow-comic-lg">
                <img src={item.image} alt="Cara fusionada" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }} />
                <span className="hidden text-8xl">{item.emoji}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{options.map((option) => <ComicButton key={option} onClick={() => answer(option)} disabled={!!feedback}>{option}</ComicButton>)}</div>
        </div>}
    </GameShell>;
}
