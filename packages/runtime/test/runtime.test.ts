import { describe, it, expect, vi } from "vitest";
import * as runtime from "../src/index";

describe("@jugaad/runtime", () => {
  it("should have bolo which maps to console.log", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    runtime.bolo("Hello World");
    expect(consoleSpy).toHaveBeenCalledWith("Hello World");
    consoleSpy.mockRestore();
  });

  it("should have chillao which maps to console.error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    runtime.chillao("Error Msg");
    expect(consoleSpy).toHaveBeenCalledWith("Error Msg");
    consoleSpy.mockRestore();
  });

  it("should have fun built-ins", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    runtime.chai();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Chai pi lo"));
    
    runtime.bachao();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Stack Overflow"));
    
    runtime.ghaas_chhoo();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("8 ghante"));
    consoleSpy.mockRestore();
  });

  it("should map JS globals properly", () => {
    expect(runtime.Vaada).toBe(Promise);
    expect(runtime.Nishan).toBe(Symbol);
    expect(runtime.Naksha).toBe(Map);
    expect(runtime.Samuh).toBe(Set);
  });
});
