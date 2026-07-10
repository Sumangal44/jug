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
  AnyChar: () => AnyChar,
  BacktickString: () => BacktickString,
  Comment: () => Comment,
  Identifier: () => Identifier,
  KEYWORD_MAP: () => KEYWORD_MAP,
  Newline: () => Newline,
  NumberLiteral: () => NumberLiteral,
  StringLiteral: () => StringLiteral,
  StringLiteralSingle: () => StringLiteralSingle,
  WhiteSpace: () => WhiteSpace,
  tokenize: () => tokenize,
  tokens: () => tokens
});
module.exports = __toCommonJS(index_exports);

// src/lexer.ts
var import_chevrotain = require("chevrotain");
var Newline = (0, import_chevrotain.createToken)({ name: "Newline", pattern: /\r?\n/ });
var WhiteSpace = (0, import_chevrotain.createToken)({ name: "WhiteSpace", pattern: /[ \t]+/ });
var StringLiteral = (0, import_chevrotain.createToken)({ name: "StringLiteral", pattern: /"(?:[^"\\]|\\.)*"/ });
var StringLiteralSingle = (0, import_chevrotain.createToken)({ name: "StringLiteralSingle", pattern: /'(?:[^'\\]|\\.)*'/ });
var BacktickString = (0, import_chevrotain.createToken)({ name: "BacktickString", pattern: /`(?:[^`\\]|\\.)*`/ });
var NumberLiteral = (0, import_chevrotain.createToken)({ name: "NumberLiteral", pattern: /-?\d+(?:\.\d+)?/ });
var Comment = (0, import_chevrotain.createToken)({ name: "Comment", pattern: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\// });
var Identifier = (0, import_chevrotain.createToken)({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ });
var AnyChar = (0, import_chevrotain.createToken)({ name: "AnyChar", pattern: /./ });
var tokens = [
  Newline,
  WhiteSpace,
  StringLiteral,
  StringLiteralSingle,
  BacktickString,
  NumberLiteral,
  Comment,
  Identifier,
  AnyChar
];
var baseLexer = new import_chevrotain.Lexer(tokens);
var KEYWORD_MAP = /* @__PURE__ */ Object.create(null);
Object.assign(KEYWORD_MAP, {
  "agar": "if",
  "shayad": "else if",
  "warna": "else",
  "ghumo": "for",
  "jabtak": "while",
  "banao": "function",
  "wapas": "return",
  "ustad": "class",
  "khud": "this",
  "lao": "import",
  "se": "from",
  "rukja": "break",
  "chalte_raho": "continue",
  "koshish": "try",
  "gadbad": "catch",
  "aakhir_me": "finally",
  "udao": "throw",
  "sahi": "true",
  "galat": "false",
  "kuch_nahi": "null",
  "aur": "&&",
  "ya": "||",
  "nahi": "!",
  "tez": "async",
  "intezaar": "await",
  "baanto": "yield",
  "maanlo": "let",
  "pakka": "const"
});
function tokenize(text) {
  const lexResult = baseLexer.tokenize(text);
  if (lexResult.errors.length > 0) {
    return lexResult;
  }
  const outTokens = [];
  const indentStack = [0];
  let isNewLine = true;
  for (let i = 0; i < lexResult.tokens.length; i++) {
    const token = lexResult.tokens[i];
    if (token.tokenType === Comment && token.image.startsWith("#")) {
      token.image = "//" + token.image.substring(1);
    }
    if (token.tokenType === Newline) {
      isNewLine = true;
      outTokens.push(token);
      continue;
    }
    if (isNewLine) {
      let currentIndent = 0;
      if (token.tokenType === WhiteSpace) {
        currentIndent = token.image.length;
      }
      const prevIndent = indentStack[indentStack.length - 1];
      if (currentIndent > prevIndent) {
        indentStack.push(currentIndent);
        outTokens.push({ image: "{", tokenType: AnyChar });
      } else if (currentIndent < prevIndent) {
        while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          outTokens.push({ image: "}", tokenType: AnyChar });
        }
      }
      isNewLine = false;
    }
    if (token.tokenType === Identifier && KEYWORD_MAP[token.image]) {
      const jsKeyword = KEYWORD_MAP[token.image];
      outTokens.push({ ...token, image: jsKeyword });
    } else if (token.tokenType === BacktickString) {
      const translatedImage = token.image.replace(/\$\{([^}]+)\}/g, (match, expr) => {
        let newExpr = expr;
        for (const [kw, jsKw] of Object.entries(KEYWORD_MAP)) {
          newExpr = newExpr.replace(new RegExp(`\\b${kw}\\b`, "g"), jsKw);
        }
        return `\${${newExpr}}`;
      });
      outTokens.push({ ...token, image: translatedImage });
    } else {
      outTokens.push(token);
    }
  }
  while (indentStack.length > 1) {
    indentStack.pop();
    outTokens.push({ image: "\n}", tokenType: AnyChar });
  }
  for (let i = 0; i < outTokens.length; i++) {
    if (outTokens[i].image === ":" && outTokens[i].tokenType === AnyChar) {
      let nextIdx = i + 1;
      while (nextIdx < outTokens.length && outTokens[nextIdx].tokenType === WhiteSpace) {
        nextIdx++;
      }
      if (nextIdx < outTokens.length && (outTokens[nextIdx].tokenType === Newline || outTokens[nextIdx].image === "{")) {
        outTokens[i].image = "";
      }
    }
  }
  return { tokens: outTokens, errors: lexResult.errors, groups: lexResult.groups };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnyChar,
  BacktickString,
  Comment,
  Identifier,
  KEYWORD_MAP,
  Newline,
  NumberLiteral,
  StringLiteral,
  StringLiteralSingle,
  WhiteSpace,
  tokenize,
  tokens
});
