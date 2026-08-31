import { act, renderHook } from "@testing-library/react";
import { useGameTurn } from "./useGameTurn";

describe("useGameTurn", () => {
    it("creates the requested roster with a fresh turn", () => {
        const { result } = renderHook(() => useGameTurn());

        act(() => result.current.handleStart(4));

        expect(result.current.players).toHaveLength(4);
        expect(new Set(result.current.players.map((player) => player.id)).size).toBe(4);
        expect(result.current.players).toEqual([
            { id: 1, name: "JUGADOR 1", score: 0 },
            { id: 2, name: "JUGADOR 2", score: 0 },
            { id: 3, name: "JUGADOR 3", score: 0 },
            { id: 4, name: "JUGADOR 4", score: 0 },
        ]);
        expect(result.current.currentPlayerIndex).toBe(0);
        expect(result.current.isGameOver).toBe(false);
    });

    it("keeps the current player after correct feedback", () => {
        const { result } = renderHook(() => useGameTurn());
        act(() => result.current.handleStart(2));

        let shouldContinue = false;
        act(() => { shouldContinue = result.current.handleNext("correct"); });

        expect(shouldContinue).toBe(true);
        expect(result.current.currentPlayerIndex).toBe(0);
        expect(result.current.isGameOver).toBe(false);
    });

    it("rotates to the next player after incorrect feedback", () => {
        const { result } = renderHook(() => useGameTurn());
        act(() => result.current.handleStart(3));

        let shouldContinue = false;
        act(() => { shouldContinue = result.current.handleNext("incorrect"); });

        expect(shouldContinue).toBe(true);
        expect(result.current.currentPlayerIndex).toBe(1);
    });

    it("ends the game when the last player answers incorrectly", () => {
        const { result } = renderHook(() => useGameTurn());
        act(() => result.current.handleStart(2));
        act(() => result.current.handleNext("incorrect"));

        let shouldContinue = true;
        act(() => { shouldContinue = result.current.handleNext("incorrect"); });

        expect(shouldContinue).toBe(false);
        expect(result.current.currentPlayerIndex).toBe(1);
        expect(result.current.isGameOver).toBe(true);
    });

    it("increments and penalizes the active player's score", () => {
        const { result } = renderHook(() => useGameTurn());
        act(() => result.current.handleStart(2));

        act(() => result.current.incrementScore(1));
        act(() => result.current.incrementScore(-2));
        expect(result.current.players[0].score).toBe(-1);

        act(() => result.current.incrementScore());
        expect(result.current.players[0].score).toBe(0);
    });
});
