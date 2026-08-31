import { ratings } from "./ratings";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("ratings data", () => { it("satisfies its schema and score ranges", () => assertDataInvariants(ratings, { requiredFields: ["id", "titleA", "scoreA", "titleB", "scoreB"], custom: (entry) => { [entry.scoreA, entry.scoreB].forEach((score) => { expect(score.imdb).toBeGreaterThanOrEqual(0); expect(score.imdb).toBeLessThanOrEqual(10); expect(score.rottenTomatoes).toBeGreaterThanOrEqual(0); expect(score.rottenTomatoes).toBeLessThanOrEqual(100); }); } })); });
