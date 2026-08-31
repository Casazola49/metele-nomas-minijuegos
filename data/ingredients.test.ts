import { dishes } from "./ingredients";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("ingredients data", () => { it("satisfies its schema", () => assertDataInvariants(dishes, { requiredFields: ["id", "name", "ingredients", "category", "emoji"] })); });
