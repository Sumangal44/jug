import { describe, it, expect } from "vitest";
import { compileSource } from "../src/index";

describe("JugaadLang ESM2026 100% Feature Compatibility", () => {
  it("compiles variable declarations", () => {
    const code = `maanlo x = 10\npakka y = 20`;
    const result = compileSource(code);
    expect(result).toContain("let x = 10");
    expect(result).toContain("const y = 20");
  });

  it("compiles conditions (if/else if/else)", () => {
    const code = `
agar x == 1:
  bolo("1")
shayad x == 2:
  bolo("2")
warna:
  bolo("3")
`;
    const result = compileSource(code);
    expect(result).toContain("if (x == 1)");
    expect(result).toContain("else if (x == 2)");
    expect(result).toContain("else");
    expect(result).toContain("{");
    expect(result).toContain("}");
  });

  it("compiles loops (for/while) with break/continue", () => {
    const code = `
ghumo (maanlo i = 0; i < 10; i++):
  agar i == 5:
    chalte_raho
  jabtak sahi:
    rukja
`;
    const result = compileSource(code);
    expect(result).toContain("for (let i = 0; i < 10; i++)");
    expect(result).toContain("continue");
    expect(result).toContain("while (true)");
    expect(result).toContain("break");
  });

  it("compiles functions and returns", () => {
    const code = `
banao add(a, b):
  wapas a + b
`;
    const result = compileSource(code);
    expect(result).toContain("function add(a, b)");
    expect(result).toContain("return a + b");
  });

  it("compiles classes and this (khud)", () => {
    const code = `
ustad Animal:
  constructor(name):
    khud.name = name
`;
    const result = compileSource(code);
    expect(result).toContain("class Animal");
    expect(result).toContain("this.name = name");
  });

  it("compiles try/catch/finally and throw", () => {
    const code = `
koshish:
  udao new Error("Oops")
gadbad (e):
  bolo(e)
aakhir_me:
  bolo("Done")
`;
    const result = compileSource(code);
    expect(result).toContain("try");
    expect(result).toContain("throw new Error(\"Oops\")");
    expect(result).toContain("catch (e)");
    expect(result).toContain("finally");
  });

  it("compiles async/await", () => {
    const code = `
tez banao fetch():
  maanlo res = intezaar apiCall()
  wapas res
`;
    const result = compileSource(code);
    expect(result).toContain("async function fetch()");
    expect(result).toContain("let res = await apiCall()");
  });

  it("compiles generators and yield", () => {
    const code = `
banao* generate():
  baanto 1
  baanto 2
`;
    const result = compileSource(code);
    expect(result).toContain("function* generate()");
    expect(result).toContain("yield 1");
  });

  it("compiles imports/exports", () => {
    const code = `lao { something } se "module"`;
    const result = compileSource(code);
    expect(result).toContain("import { something } from \"module\"");
  });

  it("compiles boolean and null literals", () => {
    const code = `maanlo flag = sahi aur galat ya kuch_nahi aur nahi sahi`;
    const result = compileSource(code);
    expect(result).toContain("true");
    expect(result).toContain("false");
    expect(result).toContain("null");
    expect(result).toContain("&&");
    expect(result).toContain("||");
    expect(result).toContain("!");
  });
  
  it("translates keywords inside template literals", () => {
    const code = 'bolo(`Hi ${khud.name}, intezaar is over.`)';
    const result = compileSource(code);
    expect(result).toContain('`Hi ${this.name}, await is over.`');
  });

  it("passes ES2026 syntax like destructuring, spreads, nullish coalescing transparently", () => {
    const code = `
maanlo obj = { a: 1, ...b }
maanlo { a } = obj ?? {}
`;
    const result = compileSource(code);
    expect(result).toContain("let obj = { a: 1, ...b }");
    expect(result).toContain("let { a } = obj ?? {}");
  });
});
