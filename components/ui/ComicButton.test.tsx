import { render, screen } from "@testing-library/react";
import { ComicButton } from "./ComicButton";

describe("ComicButton variants", () => {
  it("keeps the primary variant as the default", () => {
    render(<ComicButton>Primario</ComicButton>);
    const button = screen.getByRole("button", { name: "Primario" });

    expect(button).toHaveClass("bg-comic-blue", "text-white", "border-comic-black");
    expect(button).not.toHaveClass("bg-white/10", "backdrop-blur-md");
  });

  it("applies the opt-in landing glass variant", () => {
    render(<ComicButton variant="landing">Jugar</ComicButton>);
    expect(screen.getByRole("button", { name: "Jugar" })).toHaveClass(
      "bg-white/10",
      "text-white",
      "border-white/20",
      "backdrop-blur-md",
      "hover:bg-white/20",
    );
  });
});
