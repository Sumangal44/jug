import { describe, it, expect } from "vitest";
import { tokenize, KEYWORD_MAP } from "../src/lexer";

describe("@jugaad/parser - Lexer", () => {
  it("should tokenize standard identifiers", () => {
    const result = tokenize("myVar");
    expect(result.errors.length).toBe(0);
    expect(result.tokens[0].image).toBe("myVar");
  });

  it("should translate Hindi keywords to JS keywords", () => {
    const result = tokenize("agar shayad warna ghumo");
    const images = result.tokens.map(t => t.image).filter(i => i.trim() !== "");
    // Parentheses are auto-injected for agar, shayad, and ghumo!
    expect(images).toContain("if");
    expect(images).toContain("else if");
    expect(images).toContain("else");
    expect(images).toContain("for");
  });

  it("should handle string literals and comments properly", () => {
    const result = tokenize(`"string test" // comment`);
    const images = result.tokens.map(t => t.image).filter(img => img.trim() !== "");
    expect(images[0]).toBe(`"string test"`);
    expect(images[1]).toBe(`// comment`);
  });

  it("should handle python-style comments", () => {
    const result = tokenize(`# comment`);
    expect(result.tokens[0].image).toBe(`// comment`);
  });

  it("should inject parentheses for if/while statements", () => {
    const result = tokenize(`agar x == 1:\n  bolo(x)`);
    // Should contain "(" before condition and ")" before ":" or "{"
    const images = result.tokens.map(t => t.image).join("");
    expect(images).toContain("if (x == 1)");
  });

  it("should inject correct braces for indentation blocks", () => {
    const code = `
agar x:
  bolo(1)
  agar y:
    bolo(2)
bolo(3)
`;
    const result = tokenize(code);
    const text = result.tokens.map(t => t.image).join("");
    // We expect { and } to be injected in place of indentation changes
    expect(text).toContain("{");
    expect(text).toContain("}");
    // Should have 2 opening and 2 closing braces overall (or equivalent logic)
    const openBraces = text.match(/\{/g)?.length || 0;
    const closeBraces = text.match(/\}/g)?.length || 0;
    expect(openBraces).toBe(2);
    expect(closeBraces).toBe(2);
  });
});
