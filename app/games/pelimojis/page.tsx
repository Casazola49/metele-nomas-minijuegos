"use client";

import { useState, useEffect, useMemo } from "react";
import { GameShell } from "@/components/game/GameShell";
import { ComicButton } from "@/components/ui/ComicButton";
import { movies, Movie } from "@/data/movies";
import { motion, AnimatePresence } from "framer-motion";

export default function PelimojisGame() {
    // TODO: Migrar a useGameTurn (lib/useGameTurn.ts) para unificar la lógica de turnos/puntaje.
    const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [showTurnChange, setShowTurnChange] = useState(false);

    // Shuffle movies on mount/reset
    const shuffledMovies = useMemo(() => {
        return [...movies].sort(() => Math.random() - 0.5);
    }, [isGameOver]);

    const currentMovie = shuffledMovies[currentMovieIndex];

    // Generate options (1 correct + 5 distractors = 6 total)
    const options = useMemo(() => {
        if (!currentMovie) return [];

        // Try to find distractors of the same genre
        let distractors = movies
            .filter((m) => m.id !== currentMovie.id && m.genre === currentMovie.genre)
            .sort(() => Math.random() - 0.5);

        // If not enough, fill with others
        if (distractors.length < 5) {
            const others = movies
                .filter(m => m.id !== currentMovie.id && m.genre !== currentMovie.genre)
                .sort(() => Math.random() - 0.5);
            distractors = [...distractors, ...others];
        }

        const finalDistractors = distractors.slice(0, 5);
        return [...finalDistractors, currentMovie].sort(() => Math.random() - 0.5);
    }, [currentMovie]);

    const handleStart = (playerCount: number) => {
        const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
            name: `JUGADOR ${i + 1}`,
            score: 0,
        }));
        setPlayers(newPlayers);
        setCurrentPlayerIndex(0);
        setScore(0);
        setIsGameOver(false);
        setFeedback(null);
        setCurrentMovieIndex(0);
        setShowTurnChange(true); // Show turn start
    };

    // Keep a local score state for the shell's top-right display (current player's score)
    const [score, setScore] = useState(0);

    // Sync score with current player
    useEffect(() => {
        if (players.length > 0) {
            setScore(players[currentPlayerIndex].score);
        }
    }, [players, currentPlayerIndex]);

    // Handle Turn Change Animation
    useEffect(() => {
        if (showTurnChange) {
            const timer = setTimeout(() => {
                setShowTurnChange(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showTurnChange]);

    const handleAnswer = (selectedMovie: Movie) => {
        if (feedback) return;

        if (selectedMovie.id === currentMovie.id) {
            setFeedback("correct");
            setPlayers((prev) => {
                const newPlayers = [...prev];
                newPlayers[currentPlayerIndex].score += 1;
                return newPlayers;
            });
        } else {
            setFeedback("incorrect");
        }
    };

    const handleNext = () => {
        let nextPlayerIndex = currentPlayerIndex;
        let gameOver = false;

        // Logic: specific rule was "Si fallas, pierdes el turno".
        // If correct, do you keep turn? The user didn't specify for this game, but in previous game they did.
        // The instructions say "Si fallas, pierdes el turno". I'll assume standard play: next question goes to next player usually?
        // Or "Pass the device"? 
        // User request: "destaque muchisimo mas el cambio de turno a otro jugador".
        // This implies turn changing is significant.
        // Let's stick to simple: Always next player? Or "Correct -> Keep turn"?
        // In "Adivina Edad", correct = keep turn.
        // In "Pelimojis", prompt says "Si fallas, pierdes el turno".
        // This implies if you succeed, you might KEEP the turn?
        // Let's implement: Correct -> Next Movie, Same Player. Incorrect -> Next Player, Next Movie (or same movie? usually next).

        // Actually, for simplicity and typical flow unless specified:
        // Let's make it so you pass turn on incorrect.

        if (feedback === "incorrect") {
            if (currentPlayerIndex < players.length - 1) {
                nextPlayerIndex = currentPlayerIndex + 1;
                setShowTurnChange(true);
            } else {
                // Loop back to player 1? Or Game Over?
                // In previous game we did Game Over at end of last player.
                // But typically games loop.
                // "Adivina Edad" ended.
                // Let's loop players here for endless fun until movies run out?
                // Or stick to game over. The code had `setIsGameOver` on last player. I'll stick to that.
                gameOver = true;
            }
        }

        // If correct, stay on same player? 
        // Code previously was: incorrect -> next player. Correct -> just next movie (implied same player).
        // I will keep that logic.

        if (gameOver) {
            setIsGameOver(true);
            return;
        }

        setFeedback(null);
        setCurrentPlayerIndex(nextPlayerIndex);

        if (currentMovieIndex < shuffledMovies.length - 1) {
            setCurrentMovieIndex((i) => i + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const handleReset = () => {
        setScore(0);
        setIsGameOver(false);
        setFeedback(null);
        setCurrentMovieIndex(0);
        setPlayers([]);
        setShowTurnChange(false);
    };

    return (
        <GameShell
            title="Pelimojis"
            instructions="Adivina la película. Si aciertas, sigues jugando. Si fallas, ¡next!"
            score={score}
            isGameOver={isGameOver}
            feedback={feedback}
            onNext={handleNext}
            onReset={handleReset}
            onStart={handleStart}
            finalScores={players}
            fullScreen
        >
            {/* Turn Change Overlay */}
            <AnimatePresence>
                {showTurnChange && players.length > 0 && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[100] bg-comic-yellow flex items-center justify-center border-l-8 border-black"
                    >
                        <div className="bg-white border-4 border-black p-12 rounded-3xl shadow-[20px_20px_0px_rgba(0,0,0,1)] transform -rotate-3 text-center">
                            <h2 className="text-6xl md:text-8xl font-display text-comic-blue text-stroke mb-4">
                                ¡TURNO DE!
                            </h2>
                            <p className="text-4xl md:text-6xl font-bold uppercase">
                                {players[currentPlayerIndex].name}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {currentMovie && (
                <div className="flex flex-col h-screen w-full bg-comic-yellow overflow-hidden relative">
                    {/* Header Info */}
                    {!showTurnChange && players.length > 0 && (
                        <div className="absolute top-4 left-4 z-20">
                            <div className="bg-white border-4 border-black px-6 py-2 rounded-full shadow-comic">
                                <p className="text-xl font-bold uppercase">
                                    Jugando: <span className="text-comic-blue">{players[currentPlayerIndex].name}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Main Emoji Display - Takes remaining space */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 pb-0">
                        <motion.div
                            key={currentMovie.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full h-full bg-white border-4 border-black rounded-3xl shadow-comic-lg relative overflow-hidden flex items-center justify-center"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent w-full h-full scale-150" />

                            <div className="relative z-10 w-full h-full px-4 flex items-center justify-center overflow-auto">
                                {/* Adjusted text size and layout for multi-line emojis */}
                                <p className="text-[15vw] md:text-[8rem] lg:text-[10rem] leading-tight tracking-wide select-none filter drop-shadow-lg text-center break-words whitespace-pre-wrap">
                                    {currentMovie.emojis}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Options Grid - Fixed height area at bottom */}
                    <div className="flex-none p-4 md:p-6 pb-8 z-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-7xl mx-auto">
                            {options.map((movie) => (
                                <ComicButton
                                    key={movie.id}
                                    variant="secondary"
                                    className={`w-full text-base md:text-xl py-3 md:py-4 h-auto whitespace-normal leading-tight min-h-[4rem]
                                        ${feedback && movie.id === currentMovie.id ? "bg-green-400 text-white ring-4 ring-green-600" : ""}
                                        ${feedback === "incorrect" && movie.id !== currentMovie.id ? "opacity-30 scale-95 grayscale" : ""}
                                    `}
                                    onClick={() => handleAnswer(movie)}
                                    disabled={!!feedback}
                                >
                                    {movie.title}
                                </ComicButton>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </GameShell>
    );
}
