import { foods } from "./foods";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("foods data", () => { it("satisfies its schema", () => assertDataInvariants(foods, { requiredFields: ["id", "name", "category", "image", "pixelLevel"] })); });
