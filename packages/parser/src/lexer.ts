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
  "karo": "do",
  "banao": "function",
  "wapas": "return",
  "ustad": "class",
  "khud": "this",
  "lao": "import",
  "se": "from",
  "bhejo": "export",
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
  "pakka": "const",
  "rakho": "let",
  "chuno": "switch",
  "mamla": "case",
  "warna_sab": "default",
  "virasat": "extends",
  "shuru": "constructor",
  "maha_ustad": "super",
  "naya": "new",
  "sthir": "static",
  "pao": "get",
  "rakho_moolya": "set",
  "kya_ye": "instanceof",
  "misaal": "instanceof",
  "prakar": "typeof",
  "hatao": "delete",
  "mein": "in",
  "ka": "of",
  "khali": "void",
  "pakdo_bug": "debugger",
  "saath": "with",
  "pata_nahi": "undefined",
  "samajh_nahi_aya": "NaN",
  "anant": "Infinity",
  "soochi": "enum",
  "sampark": "interface",
  "potli": "package",
  "nijji": "private",
  "surakshit": "protected",
  "sarvajanik": "public",
  "bilkul_barabar": "===",
  "bilkul_alag": "!==",
  "barabar": "==",
  "alag": "!=",
  "bada": ">",
  "chhota": "<",
  "bada_ya_barabar": ">=",
  "chhota_ya_barabar": "<="
});

export function tokenize(text: string) {
  const lexResult = baseLexer.tokenize(text);
  
  if (lexResult.errors.length > 0) {
    return lexResult;
  }

  // Pre-process indentation and tokens
  const outTokens: IToken[] = [];
  const indentStack = [0];
  const scopeStack = ["global"];
  let nextScope: string | null = null;
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

    if (token.image === "ustad") nextScope = "class";
    if (token.image === "banao" && nextScope !== "class") nextScope = "function";

    if (isNewLine) {
      let currentIndent = 0;
      if (token.tokenType === WhiteSpace) {
        currentIndent = token.image.length;
      }
      
      const prevIndent = indentStack[indentStack.length - 1];
      if (currentIndent > prevIndent) {
        indentStack.push(currentIndent);
        scopeStack.push(nextScope || "block");
        nextScope = null;
        // Inject open brace
        outTokens.push({ image: "{", tokenType: AnyChar } as any);
      } else if (currentIndent < prevIndent) {
        while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          scopeStack.pop();
          // Inject close brace
          outTokens.push({ image: "}", tokenType: AnyChar } as any);
        }
      }
      isNewLine = false;
    }
    
    // Translate keywords
    if (token.tokenType === Identifier && KEYWORD_MAP[token.image]) {
      const jsKeyword = KEYWORD_MAP[token.image];
      
      // If we are inside a class scope and we see "banao", just drop it (JS classes don't use the function keyword for methods)
      if (token.image === "banao" && scopeStack[scopeStack.length - 1] === "class") {
        // Drop the token by not pushing it
        // We also need to drop the trailing space if there is one, but we'll just emit nothing
      } else {
        outTokens.push({ ...token, image: jsKeyword } as any);
      }
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

  // Inject parentheses for if, while, for, catch, switch
  for (let i = 0; i < outTokens.length; i++) {
    const token = outTokens[i];
    if (token.tokenType === Identifier && ["if", "else if", "while", "for", "catch", "switch"].includes(token.image)) {
      let j = i + 1;
      while (j < outTokens.length && outTokens[j].tokenType === WhiteSpace) {
        j++;
      }
      
      if (j < outTokens.length && outTokens[j].image !== "(") {
         outTokens.splice(j, 0, { image: "(", tokenType: AnyChar } as any);
         
         let k = j + 1;
         // Find end of condition (colon, open brace, or newline)
         while (k < outTokens.length && outTokens[k].image !== ":" && outTokens[k].image !== "{" && outTokens[k].tokenType !== Newline) {
            k++;
         }
         
         if (k < outTokens.length) {
            let endPos = k;
            while (endPos > j && outTokens[endPos - 1].tokenType === WhiteSpace) {
                endPos--;
            }
            outTokens.splice(endPos, 0, { image: ")", tokenType: AnyChar } as any);
         }
      }
    }
  }

  // Final cleanup pass to remove Python-specific colons (e.g. `agar x == 1:`) before blocks
  for (let i = 0; i < outTokens.length; i++) {
     if (outTokens[i].image === ":" && outTokens[i].tokenType === AnyChar) {
        let nextIdx = i + 1;
        while (nextIdx < outTokens.length && outTokens[nextIdx].tokenType === WhiteSpace) {
            nextIdx++;
        }
        if (nextIdx < outTokens.length && (outTokens[nextIdx].tokenType === Newline || outTokens[nextIdx].image === "{")) {
            // Check if this line starts with case or default
            let lineStart = i;
            while (lineStart > 0 && outTokens[lineStart].tokenType !== Newline) {
              lineStart--;
            }
            const lineTokens = outTokens.slice(lineStart, i);
            const isCaseOrDefault = lineTokens.some(t => t.image === "case" || t.image === "default");
            
            if (!isCaseOrDefault) {
              outTokens[i].image = ""; // erase it
            }
        }
     }
  }

  return { tokens: outTokens, errors: lexResult.errors, groups: lexResult.groups };
}
