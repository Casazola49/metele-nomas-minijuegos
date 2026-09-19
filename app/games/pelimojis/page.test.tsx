import { render, screen, fireEvent, act } from "@testing-library/react";
import PelimojisGame from "./page";

vi.mock("next/link", () => ({
    default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
        <a href={href} {...rest}>
            {children}
        </a>
    ),
}));

describe("PelimojisGame", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders start screen and begins gameplay without yellow background", () => {
        const { container } = render(<PelimojisGame />);

        expect(screen.getByRole("heading", { name: "Pelimojis" })).toBeInTheDocument();
        const startBtn = screen.getByRole("button", { name: "Comenzar el juego" });
        fireEvent.click(startBtn);

        // Turn change overlay mounts
        expect(screen.getByText("¡TURNO DE!")).toBeInTheDocument();
        expect(screen.getByText("JUGADOR 1")).toBeInTheDocument();

        // Must not contain any legacy bg-comic-yellow elements
        const yellowElements = container.querySelectorAll(".bg-comic-yellow");
        expect(yellowElements.length).toBe(0);
    });

    it("renders options and active game area after turn change with shifted header offset", () => {
        const { container } = render(<PelimojisGame />);

        const startBtn = screen.getByRole("button", { name: "Comenzar el juego" });
        fireEvent.click(startBtn);

        // Advance past turn change timer (2000ms)
        act(() => {
            vi.advanceTimersByTime(2500);
        });

        // Header info offset check to prevent collision with top-left exit link
        const headerInfo = container.querySelector(".left-28");
        expect(headerInfo).toBeInTheDocument();
        expect(screen.getByText(/Jugando:/i)).toBeInTheDocument();

        // Check options buttons are rendered
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });
});
