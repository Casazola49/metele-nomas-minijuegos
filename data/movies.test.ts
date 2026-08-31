import { movies } from "./movies";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("movies data", () => { it("satisfies its schema", () => assertDataInvariants(movies, { requiredFields: ["id", "emojis", "title", "genre"] })); });
