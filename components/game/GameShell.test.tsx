import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameShell } from "./GameShell";

vi.mock("next/link", () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("GameShell lifecycle", () => {
    const baseProps = {
        title: "Juego de prueba",
        instructions: "Probá tu suerte",
        score: 0,
        isGameOver: false,
        feedback: null as "correct" | "incorrect" | null,
        onNext: vi.fn(),
        onStart: vi.fn(),
        onReset: vi.fn(),
        children: <p>Contenido del juego</p>,
    };

    it("starts with a player count and reaches the playing control", async () => {
        const user = userEvent.setup();
        render(<GameShell {...baseProps} />);

        expect(screen.getByRole("button", { name: "Comenzar el juego" })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));

        expect(baseProps.onStart).toHaveBeenCalledWith(2);
    });

    it("exposes Siguiente after feedback and renders game over reset", async () => {
        const user = userEvent.setup();
        const { rerender } = render(<GameShell {...baseProps} feedback="correct" />);
        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));
        expect(screen.getByRole("button", { name: "Siguiente pregunta" })).toBeInTheDocument();

        rerender(<GameShell {...baseProps} feedback={null} isGameOver />);
        expect(await screen.findByRole("heading", { name: "¡Juego Terminado!" })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Jugar de nuevo" }));
        expect(baseProps.onReset).toHaveBeenCalledTimes(1);
    });
});
