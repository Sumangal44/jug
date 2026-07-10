// src/index.ts
import { tokenize } from "@jugaad/parser";
function compileSource(sourceCode) {
  const lexResult = tokenize(sourceCode);
  if (lexResult.errors.length > 0) {
    throw new Error("Lexing errors:\n" + lexResult.errors.map((e) => e.message).join("\n"));
  }
  const jsCode = lexResult.tokens.map((t) => t.image).join("");
  return jsCode;
}
export {
  compileSource
};
