import { render, screen } from "@testing-library/react";
import { FeedbackOverlay } from "./FeedbackOverlay";

describe("FeedbackOverlay", () => {
    it("renders correct feedback heading and subtitle when type is correct", () => {
        render(<FeedbackOverlay type="correct" />);

        expect(screen.getByRole("heading", { name: "¡Correcto!" })).toBeInTheDocument();
        expect(screen.getByText("Ding! Ding! Ding!")).toBeInTheDocument();
    });

    it("renders incorrect feedback heading and subtitle when type is incorrect", () => {
        render(<FeedbackOverlay type="incorrect" />);

        expect(screen.getByRole("heading", { name: "¡Incorrecto!" })).toBeInTheDocument();
        expect(screen.getByText("Bocinazo!")).toBeInTheDocument();
    });

    it("renders nothing when type is null", () => {
        const { container } = render(<FeedbackOverlay type={null} />);
        expect(container.firstChild).toBeNull();
    });
});
