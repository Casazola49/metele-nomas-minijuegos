import { inventions } from "./inventions";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("inventions data", () => { it("satisfies its schema", () => assertDataInvariants(inventions, { requiredFields: ["id", "name", "emoji", "year", "image"] })); });
