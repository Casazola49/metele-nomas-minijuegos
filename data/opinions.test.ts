import { opinions } from "./opinions";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("opinions data", () => { it("satisfies its schema", () => assertDataInvariants(opinions, { requiredFields: ["id", "text", "majority", "percentage", "emoji"], custom: (entry) => expect(["a favor", "en contra"]).toContain(entry.majority) })); });
