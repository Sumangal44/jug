#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_fs = require("fs");
var import_path = require("path");
var import_compiler = require("@jugaad/compiler");
var runtime = __toESM(require("@jugaad/runtime"));
var import_node_repl = __toESM(require("repl"));
var import_node_vm = __toESM(require("vm"));
var import_chalk = __toESM(require("chalk"));
Object.assign(globalThis, runtime);
var args = process.argv.slice(2);
var command = args[0] || "repl";
if (command === "run") {
  const file = args[1];
  if (!file) {
    console.error(import_chalk.default.red("\u{1F926} Bhai kya likh diya? File name missing."));
    process.exit(1);
  }
  try {
    const fullPath = (0, import_path.resolve)(process.cwd(), file);
    const sourceCode = (0, import_fs.readFileSync)(fullPath, "utf-8");
    const jsCode = (0, import_compiler.compileSource)(sourceCode);
    eval(jsCode);
  } catch (error) {
    console.error(import_chalk.default.red("\u{1F926} Bhai kya likh diya?\n"));
    console.error(error.message);
  }
} else if (command === "repl") {
  console.log(import_chalk.default.green.bold("JugaadLang v1.0 Interactive REPL"));
  console.log(import_chalk.default.gray("Type '.exit' to quit."));
  const replServer = import_node_repl.default.start({
    prompt: import_chalk.default.cyan("jug> "),
    useColors: true,
    eval: (cmd, context, filename, callback) => {
      cmd = cmd.trim();
      if (!cmd) return callback(null, void 0);
      try {
        const jsCode2 = (0, import_compiler.compileSource)(cmd);
        const result = import_node_vm.default.runInContext(jsCode2, context);
        callback(null, result);
      } catch (error) {
        if (error instanceof SyntaxError) {
          return callback(new import_node_repl.default.Recoverable(error), null);
        }
        console.error(import_chalk.default.red("\u{1F926} Bhai kya likh diya?"));
        callback(error, null);
      }
    }
  });
  Object.assign(replServer.context, runtime);
} else {
  console.log("Commands: run, repl");
}
