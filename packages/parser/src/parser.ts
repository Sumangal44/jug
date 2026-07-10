import { CstParser, IRecognitionException } from "chevrotain";
import * as L from "./lexer";
import * as AST from "./ast";

class JugaadParser extends CstParser {
  constructor() {
    super(L.tokens, { maxLookahead: 2 });
    
    const $ = this as any;

    $.RULE("program", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.statement) },
          { ALT: () => $.CONSUME(L.Newline) }
        ]);
      });
    });

    $.RULE("statement", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.variableDeclaration) },
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.functionDeclaration) },
        { ALT: () => $.SUBRULE($.returnStatement) },
        { ALT: () => $.SUBRULE($.expressionStatement) }
      ]);
    });

    $.RULE("expressionStatement", () => {
      $.SUBRULE($.expression);
      $.OPTION(() => $.CONSUME(L.Newline));
    });

    $.RULE("variableDeclaration", () => {
      $.CONSUME(L.Identifier);
      $.CONSUME(L.Assign);
      $.SUBRULE($.expression);
      $.OPTION(() => $.CONSUME(L.Newline));
    });

    $.RULE("ifStatement", () => {
      $.CONSUME(L.Agar);
      $.SUBRULE($.expression);
      $.CONSUME(L.Colon);
      $.CONSUME(L.Newline);
      $.SUBRULE($.block);
      $.OPTION(() => {
        $.CONSUME(L.Warna);
        $.CONSUME2(L.Colon);
        $.CONSUME2(L.Newline);
        $.SUBRULE2($.block);
      });
    });

    $.RULE("functionDeclaration", () => {
      $.CONSUME(L.Banao);
      $.CONSUME(L.Identifier);
      $.CONSUME(L.LParen);
      $.MANY_SEP({
        SEP: L.Comma,
        DEF: () => {
          $.CONSUME2(L.Identifier);
        }
      });
      $.CONSUME(L.RParen);
      $.CONSUME(L.Colon);
      $.CONSUME(L.Newline);
      $.SUBRULE($.block);
    });

    $.RULE("returnStatement", () => {
      $.CONSUME(L.Wapas);
      $.SUBRULE($.expression);
      $.OPTION(() => $.CONSUME(L.Newline));
    });

    $.RULE("block", () => {
      $.CONSUME(L.Indent);
      $.AT_LEAST_ONE(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.statement) },
          { ALT: () => $.CONSUME(L.Newline) }
        ]);
      });
      $.CONSUME(L.Outdent);
    });

    $.RULE("expression", () => {
      $.SUBRULE($.binaryExpression);
    });

    $.RULE("binaryExpression", () => {
      $.SUBRULE($.primaryExpression);
      $.MANY(() => {
        $.OR([
          { ALT: () => $.CONSUME(L.Plus) },
          { ALT: () => $.CONSUME(L.Minus) },
          { ALT: () => $.CONSUME(L.Equals) }
        ]);
        $.SUBRULE2($.primaryExpression);
      });
    });

    $.RULE("primaryExpression", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.callExpression) },
        { ALT: () => $.CONSUME(L.NumberLiteral) },
        { ALT: () => $.CONSUME(L.StringLiteral) },
        { ALT: () => $.CONSUME(L.Identifier) },
        { ALT: () => {
            $.CONSUME(L.LParen);
            $.SUBRULE($.expression);
            $.CONSUME(L.RParen);
          }
        }
      ]);
    });

    $.RULE("callExpression", () => {
      $.CONSUME(L.Identifier);
      $.CONSUME(L.LParen);
      $.MANY_SEP({
        SEP: L.Comma,
        DEF: () => {
          $.SUBRULE($.expression);
        }
      });
      $.CONSUME(L.RParen);
    });

    this.performSelfAnalysis();
  }
}

export const parser = new JugaadParser();

export function parse(text: string) {
  const lexResult = L.tokenize(text);
  if (lexResult.errors.length > 0) {
    throw new Error(`Lexing errors:\n` + lexResult.errors.map(e => e.message).join("\n"));
  }

  parser.input = lexResult.tokens;
  const cst = (parser as any).program();

  if (parser.errors.length > 0) {
    throw new Error(`Parsing errors:\n` + parser.errors.map(e => e.message).join("\n"));
  }

  return cst;
}
