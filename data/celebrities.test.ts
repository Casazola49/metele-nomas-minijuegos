import { celebrities } from "./celebrities";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("celebrities data", () => { it("satisfies its schema", () => assertDataInvariants(celebrities, { requiredFields: ["id", "name", "age", "role", "image"], custom: (entry) => expect(entry.name.trim()).not.toBe("") })); });
