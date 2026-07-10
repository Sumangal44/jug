import { describe, it, expect } from "vitest";
import { compileSource } from "@jugaad/compiler";
import vm from "node:vm";
import { exec } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const execAsync = promisify(exec);

describe("@jugaad/cli - REPL Evaluator", () => {
  it("should evaluate basic jugaadlang expressions", () => {
    const code2 = compileSource(`rakho x = 10; x + 5`);
    const context = vm.createContext({});
    const result = vm.runInContext(code2, context);
    expect(result).toBe(15);
  });

  it("should evaluate multiline string concatenation", () => {
    const code = compileSource(`"Namaste " + "Duniya"`);
    const context = vm.createContext({});
    const result = vm.runInContext(code, context);
    expect(result).toBe("Namaste Duniya");
  });

  it("should support runtime builtins in REPL context", () => {
    const context = vm.createContext({
      bolo: (msg: string) => msg + " test"
    });
    const code = compileSource(`bolo("hello")`);
    const result = vm.runInContext(code, context);
    expect(result).toBe("hello test");
  });
});

describe("@jugaad/cli - Run Command", () => {
  it("should successfully run a .jug file", async () => {
    const testFile = join(__dirname, "test_run.jug");
    writeFileSync(testFile, `
rakho a = 10
rakho b = 20
bolo("Sum is " + (a+b))
`);
    // Run the built CLI via node
    const cliPath = join(__dirname, "../dist/index.js");
    const { stdout, stderr } = await execAsync(`node ${cliPath} run ${testFile}`);
    
    expect(stderr).toBe("");
    expect(stdout).toContain("Sum is 30");
    
    unlinkSync(testFile);
  });
});
