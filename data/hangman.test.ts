import { hangmanWords } from "./hangman";
import { assertDataInvariants } from "@/test-helpers/data-invariants";
describe("hangman data", () => { it("satisfies its schema", () => assertDataInvariants(hangmanWords, { requiredFields: ["id", "image", "imageAlt", "trapWord", "correctWord", "emoji"] })); });
