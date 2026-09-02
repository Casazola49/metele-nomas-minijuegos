import { TICKER_PHRASES, SOCIAL_LINKS } from "./ticker";

describe("landing ticker data", () => {
  it("contains unique non-empty podcast phrases", () => {
    expect(TICKER_PHRASES.length).toBeGreaterThanOrEqual(11);
    expect(TICKER_PHRASES.every((phrase) => phrase.trim().length > 0)).toBe(true);
    expect(new Set(TICKER_PHRASES).size).toBe(TICKER_PHRASES.length);
  });

  it("contains the four official social destinations", () => {
    expect(SOCIAL_LINKS).toHaveLength(4);
    expect(SOCIAL_LINKS.map(({ icon }) => icon)).toEqual([
      "spotify",
      "instagram",
      "tiktok",
      "youtube",
    ]);
    SOCIAL_LINKS.forEach(({ label, href, icon }) => {
      expect(label.length).toBeGreaterThan(0);
      expect(href).toMatch(/^https:\/\//);
      expect(icon.length).toBeGreaterThan(0);
    });
  });
});
