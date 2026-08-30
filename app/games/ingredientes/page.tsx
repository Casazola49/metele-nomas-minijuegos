"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { dishes, Dish } from "@/data/ingredients";
import { useGameTurn } from "@/lib/useGameTurn";

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export default function IngredientesGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [item, setItem] = useState<Dish | null>(null);
    const [options, setOptions] = useState<Dish[]>([]);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const newRound = () => {
        const next = dishes[Math.floor(Math.random() * dishes.length)];
        const siblings = dishes.filter((dish) => dish.category === next.category && dish.id !== next.id);
        setItem(next); setOptions(shuffle([next, ...siblings]).slice(0, 4)); setFeedback(null);
    };
    const start = (count: number) => { turn.handleStart(count); setStarted(true); newRound(); };
    const answer = (choice: Dish) => {
        if (feedback || !item) return;
        const correct = choice.id === item.id;
        setFeedback(correct ? "correct" : "incorrect");
        if (correct) turn.incrementScore();
    };
    const next = () => { const proceed = turn.handleNext(feedback); if (proceed) newRound(); };

    return <GameShell title="INGREDIENTES" instructions="Mira los ingredientes y descubre el plato exacto."
        score={turn.currentPlayer?.score || 0} onStart={start} onReset={() => { turn.handleReset(); setStarted(false); }}
        isGameOver={turn.isGameOver} feedback={feedback} onNext={next} finalScores={turn.isGameOver ? turn.players : undefined}>
        {started && item && <div className="space-y-6 text-center">
            <div className="mx-auto max-w-md rounded-3xl border-4 border-black bg-white p-4 shadow-comic-lg">
                <img src={item.image} alt="Ingredientes del plato" className="mx-auto h-48 w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }} />
                <span className="hidden text-7xl">{item.emoji}</span>
                <p className="mt-3 text-lg font-bold">{item.ingredients.join(" · ")}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{options.map((option) => <ComicButton key={option.id} onClick={() => answer(option)} disabled={!!feedback}>{option.name}</ComicButton>)}</div>
        </div>}
    </GameShell>;
}
