"use client";

import { useState, useCallback } from "react";

export interface Player {
    id: number;
    name: string;
    score: number;
}

export interface UseGameTurnResult {
    /** Full player roster for the current game. */
    players: Player[];
    /** Number of players chosen on the start screen. */
    playerCount: number;
    /** Index of the player whose turn it is. */
    currentPlayerIndex: number;
    /** Convenience accessor for the active player (or undefined before start). */
    currentPlayer: Player | undefined;
    /** Whether the last player has exhausted their turn. */
    isGameOver: boolean;
    /** Build the player roster and begin a fresh game. */
    handleStart: (count: number) => void;
    /**
     * Advance turn state based on the last answer.
     * On an incorrect answer the turn passes to the next player; on the last
     * player's incorrect answer the game ends.
     * @returns `true` if a new round should begin, `false` if the game is over.
     */
    handleNext: (feedback: "correct" | "incorrect" | null) => boolean;
    /** Return to the pre-game (empty roster) state. */
    handleReset: () => void;
    /** Add `points` (default 1) to the current player's score. Use a negative value to penalize. */
    incrementScore: (points?: number) => void;
}

export function useGameTurn(): UseGameTurnResult {
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerCount, setPlayerCount] = useState(2);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const handleStart = useCallback((count: number) => {
        setPlayerCount(count);
        setPlayers(
            Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                name: `JUGADOR ${i + 1}`,
                score: 0,
            }))
        );
        setCurrentPlayerIndex(0);
        setIsGameOver(false);
    }, []);

    const handleNext = useCallback(
        (feedback: "correct" | "incorrect" | null): boolean => {
            // On an incorrect answer the turn rotates to the next player.
            // If it was already the last player's turn, the game ends.
            if (feedback === "incorrect" && players.length > 0) {
                if (currentPlayerIndex < players.length - 1) {
                    setCurrentPlayerIndex((prev) => prev + 1);
                } else {
                    setIsGameOver(true);
                    return false;
                }
            }
            return true;
        },
        [currentPlayerIndex, players.length]
    );

    const handleReset = useCallback(() => {
        setIsGameOver(false);
        setPlayers([]);
        setCurrentPlayerIndex(0);
    }, []);

    const incrementScore = useCallback(
        (points = 1) => {
            setPlayers((prev) => {
                if (prev.length === 0) return prev;
                const next = [...prev];
                next[currentPlayerIndex] = {
                    ...next[currentPlayerIndex],
                    score: next[currentPlayerIndex].score + points,
                };
                return next;
            });
        },
        [currentPlayerIndex]
    );

    return {
        players,
        playerCount,
        currentPlayerIndex,
        currentPlayer: players[currentPlayerIndex],
        isGameOver,
        handleStart,
        handleNext,
        handleReset,
        incrementScore,
    };
}
