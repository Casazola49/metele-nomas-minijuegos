import { products } from "./products";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("products data", () => { it("satisfies its schema", () => assertDataInvariants(products, { requiredFields: ["id", "name", "price", "currency", "image", "category"] })); });
