import { brandColors } from "./brand-colors";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("brand colors data", () => { it("satisfies its schema and hex invariants", () => assertDataInvariants(brandColors, { requiredFields: ["id", "name", "hex", "optionHexes"], custom: (entry) => { expect(entry.hex).toMatch(/^#[0-9A-Fa-f]{6}$/); expect(entry.optionHexes.filter((hex) => hex === entry.hex)).toHaveLength(1); } })); });
