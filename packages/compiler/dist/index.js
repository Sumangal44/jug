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
  compileSource: () => compileSource
});
module.exports = __toCommonJS(index_exports);
var import_parser = require("@jugaad/parser");
function compileSource(sourceCode) {
  const lexResult = (0, import_parser.tokenize)(sourceCode);
  if (lexResult.errors.length > 0) {
    throw new Error("Lexing errors:\n" + lexResult.errors.map((e) => e.message).join("\n"));
  }
  const jsCode = lexResult.tokens.map((t) => t.image).join("");
  return jsCode;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compileSource
});
