import { quotes } from "./quotes";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("quotes data", () => { it("satisfies its schema", () => assertDataInvariants(quotes, { requiredFields: ["id", "text", "author"], custom: (entry) => expect(entry.author.trim()).not.toBe("") })); });
