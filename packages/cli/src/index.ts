#!/usr/bin/env node

import { readFileSync } from "fs";
import { resolve } from "path";
import { compileSource, getFunnyError } from "@jugaad/compiler";
import * as runtime from "@jugaad/runtime";
import repl from "node:repl";
import vm from "node:vm";
import chalk from "chalk";

// Inject runtime globally for the script
Object.assign(globalThis, runtime);

const args = process.argv.slice(2);
const command = args[0] || "repl"; // default to repl

if (command === "run") {
  const file = args[1];
  if (!file) {
    console.error(chalk.red("🤦 Bhai kya likh diya? File name missing."));
    process.exit(1);
  }

  try {
    const fullPath = resolve(process.cwd(), file);
    const sourceCode = readFileSync(fullPath, "utf-8");
    const jsCode = compileSource(sourceCode);
    
    // Execute using dynamic import to fully support ESM (imports, top-level await)
    const dataUri = "data:text/javascript," + encodeURIComponent(jsCode);
    import(dataUri).catch(err => {
      console.error(chalk.red(getFunnyError(err)));
    });
  } catch (error: any) {
    console.error(chalk.red(getFunnyError(error)));
  }
} else if (command === "repl") {
  console.log(chalk.green.bold("JugaadLang v1.0 Interactive REPL"));
  console.log(chalk.gray("Type '.exit' to quit."));
  
  const replServer = repl.start({
    prompt: chalk.cyan("jug> "),
    useColors: true,
    eval: (cmd, context, filename, callback) => {
      cmd = cmd.trim();
      if (!cmd) return callback(null, undefined);
      
      try {
        const jsCode = compileSource(cmd);
        const result = vm.runInContext(jsCode, context);
        callback(null, result);
      } catch (error: any) {
        if (error instanceof SyntaxError) {
           return callback(new repl.Recoverable(error), null);
        }
        console.error(chalk.red(getFunnyError(error)));
        callback(null, null); // Don't crash REPL
      }
    }
  });

  Object.assign(replServer.context, runtime);
} else {
  console.log("Commands: run, repl");
}
