import { realOrAiItems } from "./realOrAi";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("real or AI data", () => { it("satisfies its schema", () => assertDataInvariants(realOrAiItems, { requiredFields: ["id", "image", "isAi", "hint", "description"] })); });
