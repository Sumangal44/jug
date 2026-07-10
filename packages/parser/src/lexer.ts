import { createToken, Lexer, IToken } from "chevrotain";

export const Newline = createToken({ name: "Newline", pattern: /\r?\n/ });
export const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t]+/ });
export const StringLiteral = createToken({ name: "StringLiteral", pattern: /"(?:[^"\\]|\\.)*"/ });
export const StringLiteralSingle = createToken({ name: "StringLiteralSingle", pattern: /'(?:[^'\\]|\\.)*'/ });
export const BacktickString = createToken({ name: "BacktickString", pattern: /`(?:[^`\\]|\\.)*`/ });
export const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /-?\d+(?:\.\d+)?/ });
export const Comment = createToken({ name: "Comment", pattern: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\// });

// Also support decorators if needed? JS handles @ as AnyChar
export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ });
export const AnyChar = createToken({ name: "AnyChar", pattern: /./ });

export const tokens = [
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

const baseLexer = new Lexer(tokens);

// Create without prototype to avoid 'constructor' bug
export const KEYWORD_MAP: Record<string, string> = Object.create(null);
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

export function tokenize(text: string) {
  const lexResult = baseLexer.tokenize(text);
  
  if (lexResult.errors.length > 0) {
    return lexResult;
  }

  // Pre-process indentation and tokens
  const outTokens: IToken[] = [];
  const indentStack = [0];
  let isNewLine = true;

  for (let i = 0; i < lexResult.tokens.length; i++) {
    const token = lexResult.tokens[i];
    
    // Convert Python-like # comments to JS // comments
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
        // Inject open brace
        outTokens.push({ image: "{", tokenType: AnyChar } as any);
      } else if (currentIndent < prevIndent) {
        while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          // Inject close brace
          outTokens.push({ image: "}", tokenType: AnyChar } as any);
        }
      }
      isNewLine = false;
    }
    
    // Translate keywords
    if (token.tokenType === Identifier && KEYWORD_MAP[token.image]) {
      const jsKeyword = KEYWORD_MAP[token.image];
      outTokens.push({ ...token, image: jsKeyword } as any);
    } else if (token.tokenType === BacktickString) {
      // Translate keywords inside template literal interpolations ${...}
      const translatedImage = token.image.replace(/\$\{([^}]+)\}/g, (match: string, expr: string) => {
        let newExpr = expr;
        for (const [kw, jsKw] of Object.entries(KEYWORD_MAP)) {
          newExpr = newExpr.replace(new RegExp(`\\b${kw}\\b`, 'g'), jsKw);
        }
        return `\${${newExpr}}`;
      });
      outTokens.push({ ...token, image: translatedImage } as any);
    } else {
      outTokens.push(token);
    }
  }

  // Close remaining blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    outTokens.push({ image: "\n}", tokenType: AnyChar } as any);
  }

  // Final cleanup pass to remove Python-specific colons (e.g. `agar x == 1:`) before blocks
  // In JS, we don't need them.
  for (let i = 0; i < outTokens.length; i++) {
     if (outTokens[i].image === ":" && outTokens[i].tokenType === AnyChar) {
        // Just remove the colon if it's likely a block starter (e.g. followed by newline)
        // Or honestly, we can just replace all stray colons not in ternary or objects.
        // Actually, to be safe, if a colon is followed by a Newline or { we can strip it.
        let nextIdx = i + 1;
        while (nextIdx < outTokens.length && outTokens[nextIdx].tokenType === WhiteSpace) {
            nextIdx++;
        }
        if (nextIdx < outTokens.length && (outTokens[nextIdx].tokenType === Newline || outTokens[nextIdx].image === "{")) {
            outTokens[i].image = ""; // erase it
        }
     }
  }

  return { tokens: outTokens, errors: lexResult.errors, groups: lexResult.groups };
}
