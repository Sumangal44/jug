// @jugaad/runtime Built-ins

export function bolo(...args: any[]) {
  console.log(...args);
}

export function chillao(...args: any[]) {
  console.error(...args);
}

export function poochho(promptText: string): string {
  console.log(promptText);
  return "Sumangal"; 
}

export function batao(msg: string) {
  console.log("ALERT:", msg);
}

export function pakka_poochho(msg: string): boolean {
  console.log("CONFIRM:", msg);
  return true;
}

export const baad_me = setTimeout;
export const har_baar = setInterval;
export const rok_do = clearTimeout;
export const band_kar = clearInterval;

export const Nishan = Symbol;
export const Pehredar = Proxy;
export const Darpan = Reflect;
export const Vaada = Promise;
export const KamzorNaksha = WeakMap;
export const KamzorSamuh = WeakSet;
export const Naksha = Map;
export const Samuh = Set;

export function chai() {
  console.log("☕ Chai pi lo.\nCoding aur acchi hogi.");
}

export function bachao() {
  console.log("🚨 Stack Overflow khol raha hoon...");
}

export function ghaas_chhoo() {
  console.log("🌱 8 ghante coding ho gayi.\nThoda bahar ghoom aao.");
}

export function fortune() {
  console.log("🔮 Bug somewhere obvious.");
}

