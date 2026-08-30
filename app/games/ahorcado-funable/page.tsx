"use client";

import { useState } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { hangmanWords, HangmanWord } from "@/data/hangman";
import { useGameTurn } from "@/lib/useGameTurn";

const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const normalize = (value: string) => value.toLocaleUpperCase("es");

export default function AhorcadoFunableGame() {
    const turn = useGameTurn();
    const [started, setStarted] = useState(false);
    const [item, setItem] = useState<HangmanWord | null>(null);
    const [guessed, setGuessed] = useState<string[]>([]);
    const [lives, setLives] = useState(6);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

    const newRound = () => {
        setItem(hangmanWords[Math.floor(Math.random() * hangmanWords.length)]);
        setGuessed([]); setLives(6); setFeedback(null); setIsGameOver(false);
    };
    const start = (count: number) => { turn.handleStart(count); setStarted(true); newRound(); };
    const guess = (letter: string) => {
        if (!item || isGameOver || guessed.includes(letter)) return;
        const nextGuessed = [...guessed, letter];
        setGuessed(nextGuessed);
        const word = normalize(item.correctWord);
        if (!word.includes(letter)) {
            const remaining = lives - 1;
            setLives(remaining);
            if (remaining === 0) { setFeedback("incorrect"); setIsGameOver(true); }
            return;
        }
        if ([...new Set(word.replace(/[^A-ZÑ]/g, ""))].every((character) => nextGuessed.includes(character))) {
            setFeedback("correct"); turn.incrementScore(); setIsGameOver(true);
        }
    };
    const reset = () => { turn.handleReset(); setStarted(false); setItem(null); setIsGameOver(false); };

    return <GameShell title="AHORCADO... ¿FUNABLE?" instructions="La imagen te engaña: adivina la palabra real, no la obvia."
        score={turn.currentPlayer?.score || 0} onStart={start} onReset={reset} isGameOver={isGameOver || turn.isGameOver}
        feedback={feedback} onNext={() => { const proceed = turn.handleNext(feedback); if (proceed) newRound(); }}
        disableFeedbackOverlay hideScoreboard finalScores={turn.isGameOver ? turn.players : undefined}>
        {started && item && <div className="mx-auto max-w-2xl space-y-5 text-center">
            <div className="rounded-3xl border-4 border-black bg-white p-4 shadow-comic-lg">
                <img src={item.image} alt={item.imageAlt} className="mx-auto h-40 w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }} />
                <span className="hidden text-7xl">{item.emoji}</span>
                <p className="mt-2 font-bold">Pista visual: {item.imageAlt} · Trampa: {item.trapWord}</p>
            </div>
            <p className="text-4xl font-display tracking-[0.3em]">{[...item.correctWord].map((letter, i) => <span key={`${letter}-${i}`} className="mx-1">{guessed.includes(normalize(letter)) ? letter.toLocaleUpperCase("es") : "_"}</span>)}</p>
            <p className="text-xl font-bold">Vidas: {"❤️".repeat(lives)}{"🖤".repeat(6 - lives)}</p>
            <div className="grid grid-cols-7 gap-2">{alphabet.map((letter) => <button key={letter} onClick={() => guess(letter)} disabled={guessed.includes(letter) || isGameOver} className="rounded-lg border-2 border-black bg-white p-2 font-bold shadow-comic hover:bg-comic-yellow disabled:opacity-40">{letter}</button>)}</div>
            {isGameOver && <ComicButton onClick={newRound}>Nueva palabra</ComicButton>}
        </div>}
    </GameShell>;
}
