// src/lexer.ts
import { createToken, Lexer } from "chevrotain";
var Newline = createToken({ name: "Newline", pattern: /\r?\n/ });
var WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t]+/ });
var StringLiteral = createToken({ name: "StringLiteral", pattern: /"(?:[^"\\]|\\.)*"/ });
var StringLiteralSingle = createToken({ name: "StringLiteralSingle", pattern: /'(?:[^'\\]|\\.)*'/ });
var BacktickString = createToken({ name: "BacktickString", pattern: /`(?:[^`\\]|\\.)*`/ });
var NumberLiteral = createToken({ name: "NumberLiteral", pattern: /-?\d+(?:\.\d+)?/ });
var Comment = createToken({ name: "Comment", pattern: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\// });
var Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ });
var AnyChar = createToken({ name: "AnyChar", pattern: /./ });
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
var baseLexer = new Lexer(tokens);
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
export {
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
};
