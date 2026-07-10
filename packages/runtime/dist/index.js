"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  bachao: () => bachao,
  bolo: () => bolo,
  chai: () => chai,
  fortune: () => fortune,
  ghaas_chhoo: () => ghaas_chhoo,
  poochho: () => poochho
});
module.exports = __toCommonJS(index_exports);
function bolo(...args) {
  console.log(...args);
}
function poochho(promptText) {
  console.log(promptText);
  return "Sumangal";
}
function chai() {
  console.log("\u2615 Chai pi lo.");
}
function bachao() {
  console.log("\u{1F6A8} StackOverflow search activated.");
}
function ghaas_chhoo() {
  console.log("\u{1F331} Touch grass mode enabled.");
}
function fortune() {
  console.log("\u{1F52E} Bug somewhere obvious.");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bachao,
  bolo,
  chai,
  fortune,
  ghaas_chhoo,
  poochho
});
