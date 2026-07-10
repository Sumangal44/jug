import { readFileSync } from "fs";
import { compileSource } from "./packages/compiler/dist/index.mjs";

const code = readFileSync("app.jug", "utf-8");
console.log(compileSource(code));
