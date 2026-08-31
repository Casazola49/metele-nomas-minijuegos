import { headlines } from "./headlines";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("headlines data", () => { it("satisfies its schema", () => assertDataInvariants(headlines, { requiredFields: ["id", "text", "isReal", "source"], custom: (entry) => expect(entry.source.trim()).not.toBe("") })); });
