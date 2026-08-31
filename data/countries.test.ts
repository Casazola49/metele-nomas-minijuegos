import { countries } from "./countries";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("countries data", () => { it("satisfies its schema", () => assertDataInvariants(countries, { requiredFields: ["id", "name", "silhouette", "rotateDeg"] })); });
