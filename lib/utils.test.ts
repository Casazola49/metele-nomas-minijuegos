import { cn } from "./utils";

describe("cn", () => {
    it("drops false, null, and undefined inputs", () => {
        expect(cn("text-sm", false, null, undefined, "font-bold")).toBe("text-sm font-bold");
    });

    it("keeps the last conflicting Tailwind utility", () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
    });
});
