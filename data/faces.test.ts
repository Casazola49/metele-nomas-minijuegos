import { faceMashups } from "./faces";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("faces data", () => { it("satisfies its schema", () => assertDataInvariants(faceMashups, { requiredFields: ["id", "nameA", "nameB", "categoryA", "categoryB", "emoji"] })); });
