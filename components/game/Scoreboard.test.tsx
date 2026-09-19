import { render, screen } from "@testing-library/react";
import { Scoreboard } from "./Scoreboard";

describe("Scoreboard", () => {
    it("renders score and optional high score with correct labels and values", () => {
        render(<Scoreboard score={10} highScore={25} />);

        expect(screen.getByText("Puntaje")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("Récord")).toBeInTheDocument();
        expect(screen.getByText("25")).toBeInTheDocument();
    });

    it("renders only current score when highScore is not provided", () => {
        render(<Scoreboard score={15} />);

        expect(screen.getByText("Puntaje")).toBeInTheDocument();
        expect(screen.getByText("15")).toBeInTheDocument();
        expect(screen.queryByText("Récord")).not.toBeInTheDocument();
    });
});
