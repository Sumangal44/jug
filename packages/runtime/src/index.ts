// @jugaad/runtime Built-ins

export function bolo(...args: any[]) {
  console.log(...args);
}

export function poochho(promptText: string): string {
  // In a real Node environment, this should be synchronous readline.
  // For simplicity in the first iteration, we just log the prompt and return a dummy string.
  // We can use prompt-sync in node.
  console.log(promptText);
  return "Sumangal"; // hardcoded for phase 1 test
}

export function chai() {
  console.log("☕ Chai pi lo.");
}

export function bachao() {
  console.log("🚨 StackOverflow search activated.");
}

export function ghaas_chhoo() {
  console.log("🌱 Touch grass mode enabled.");
}

export function fortune() {
  console.log("🔮 Bug somewhere obvious.");
}
