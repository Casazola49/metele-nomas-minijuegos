import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameShell } from "./GameShell";

vi.mock("next/link", () => ({
    default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
        <a href={href} {...rest}>
            {children}
        </a>
    ),
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
        const volverBtn = screen.getByRole("button", { name: "Volver al inicio" });
        expect(volverBtn).toBeInTheDocument();
        expect(volverBtn.closest("a")).toHaveAttribute("href", "/");

        await user.click(screen.getByRole("button", { name: "2" }));
        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));

        expect(baseProps.onStart).toHaveBeenCalledWith(2);
    });

    it("allows selecting higher player counts (triangulation)", async () => {
        const user = userEvent.setup();
        const onStart = vi.fn();
        render(<GameShell {...baseProps} onStart={onStart} />);

        await user.click(screen.getByRole("button", { name: "4" }));
        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));

        expect(onStart).toHaveBeenCalledWith(4);
    });

    it("renders single score summary on gameover when finalScores is omitted", async () => {
        render(<GameShell {...baseProps} isGameOver score={42} />);

        expect(await screen.findByRole("heading", { name: "¡Juego Terminado!" })).toBeInTheDocument();
        expect(screen.getByText("Puntaje Final")).toBeInTheDocument();
        expect(screen.getByText("42")).toBeInTheDocument();
        const salirBtn = screen.getByRole("button", { name: "Salir al inicio" });
        expect(salirBtn.closest("a")).toHaveAttribute("href", "/");
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

    it("renders persistent exit link to home during playing state", async () => {
        const user = userEvent.setup();
        render(<GameShell {...baseProps} />);

        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));

        const exitLink = screen.getByRole("link", { name: /volver al inicio/i });
        expect(exitLink).toBeInTheDocument();
        expect(exitLink).toHaveAttribute("href", "/");
    });

    it("renders persistent exit link even when fullScreen is true", async () => {
        const user = userEvent.setup();
        render(<GameShell {...baseProps} fullScreen />);

        await user.click(screen.getByRole("button", { name: "Comenzar el juego" }));

        const exitLink = screen.getByRole("link", { name: /volver al inicio/i });
        expect(exitLink).toBeInTheDocument();
        expect(exitLink).toHaveAttribute("href", "/");
    });

    it("renders ranked leaderboard entries when finalScores are provided on gameover", async () => {
        const finalScores = [
            { name: "Jugador 1", score: 10 },
            { name: "Jugador 2", score: 8 },
            { name: "Jugador 3", score: 5 },
        ];
        render(<GameShell {...baseProps} isGameOver finalScores={finalScores} />);

        expect(await screen.findByRole("heading", { name: "¡Juego Terminado!" })).toBeInTheDocument();
        expect(screen.getByText("#1")).toBeInTheDocument();
        expect(screen.getByText("Jugador 1")).toBeInTheDocument();
        expect(screen.getByText("#2")).toBeInTheDocument();
        expect(screen.getByText("Jugador 2")).toBeInTheDocument();
        expect(screen.getByText("#3")).toBeInTheDocument();
        expect(screen.getByText("Jugador 3")).toBeInTheDocument();
    });
});
