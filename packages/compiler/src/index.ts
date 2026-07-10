import { tokenize } from "@jugaad/parser";

export function compileSource(sourceCode: string): string {
  const lexResult = tokenize(sourceCode);
  if (lexResult.errors.length > 0) {
     throw new Error("Lexing errors:\n" + lexResult.errors.map((e: any) => e.message).join("\n"));
  }
  
  // Reconstruct standard JavaScript string from our translated tokens
  const jsCode = lexResult.tokens.map((t: any) => t.image).join("");
  return jsCode;
}
