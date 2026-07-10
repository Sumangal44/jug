import { parser } from "./parser";
import * as AST from "./ast";

const BaseJugaadVisitor = parser.getBaseCstVisitorConstructor();

class JugaadVisitor extends BaseJugaadVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  program(ctx: any): AST.Program {
    const body: AST.Statement[] = [];
    if (ctx.statement) {
      ctx.statement.forEach((stmtCtx: any) => {
        body.push(this.visit(stmtCtx));
      });
    }
    return { type: "Program", body };
  }

  statement(ctx: any): AST.Statement {
    if (ctx.variableDeclaration) return this.visit(ctx.variableDeclaration[0]);
    if (ctx.ifStatement) return this.visit(ctx.ifStatement[0]);
    if (ctx.functionDeclaration) return this.visit(ctx.functionDeclaration[0]);
    if (ctx.returnStatement) return this.visit(ctx.returnStatement[0]);
    if (ctx.expressionStatement) return this.visit(ctx.expressionStatement[0]);
    throw new Error("Unknown statement");
  }

  expressionStatement(ctx: any): AST.ExpressionStatement {
    return {
      type: "ExpressionStatement",
      expression: this.visit(ctx.expression[0])
    };
  }

  variableDeclaration(ctx: any): AST.VariableDeclaration {
    return {
      type: "VariableDeclaration",
      identifier: { type: "Identifier", name: ctx.Identifier[0].image },
      init: this.visit(ctx.expression[0])
    };
  }

  ifStatement(ctx: any): AST.IfStatement {
    const test = this.visit(ctx.expression[0]);
    const consequent = this.visit(ctx.block[0]);
    let alternate;
    if (ctx.Warna) {
      alternate = this.visit(ctx.block[1]);
    }
    return {
      type: "IfStatement",
      test,
      consequent,
      alternate
    };
  }

  functionDeclaration(ctx: any): AST.FunctionDeclaration {
    const id = { type: "Identifier", name: ctx.Identifier[0].image } as AST.Identifier;
    const params: AST.Identifier[] = [];
    if (ctx.Identifier && ctx.Identifier.length > 1) {
       for (let i = 1; i < ctx.Identifier.length; i++) {
           params.push({ type: "Identifier", name: ctx.Identifier[i].image });
       }
    }
    const body = this.visit(ctx.block[0]);
    return {
      type: "FunctionDeclaration",
      id,
      params,
      body
    };
  }

  returnStatement(ctx: any): AST.ReturnStatement {
    return {
      type: "ReturnStatement",
      argument: this.visit(ctx.expression[0])
    };
  }

  block(ctx: any): AST.Statement[] {
    const stmts: AST.Statement[] = [];
    if (ctx.statement) {
      ctx.statement.forEach((stmtCtx: any) => {
        stmts.push(this.visit(stmtCtx));
      });
    }
    return stmts;
  }

  expression(ctx: any): AST.Expression {
    return this.visit(ctx.binaryExpression[0]);
  }

  binaryExpression(ctx: any): AST.Expression {
    let left = this.visit(ctx.primaryExpression[0]);
    
    let allOperators: any[] = [];
    if (ctx.Plus) allOperators = allOperators.concat(ctx.Plus);
    if (ctx.Minus) allOperators = allOperators.concat(ctx.Minus);
    if (ctx.Equals) allOperators = allOperators.concat(ctx.Equals);
    
    allOperators.sort((a, b) => a.startOffset - b.startOffset);

    if (allOperators.length > 0) {
      let i = 1;
      for (const opToken of allOperators) {
         const right = this.visit(ctx.primaryExpression[i]);
         left = {
            type: "BinaryExpression",
            operator: opToken.image,
            left,
            right
         } as AST.BinaryExpression;
         i++;
      }
    }
    return left;
  }

  primaryExpression(ctx: any): AST.Expression {
    if (ctx.callExpression) return this.visit(ctx.callExpression[0]);
    if (ctx.NumberLiteral) return { type: "Literal", value: parseFloat(ctx.NumberLiteral[0].image), raw: ctx.NumberLiteral[0].image };
    if (ctx.StringLiteral) return { type: "Literal", value: ctx.StringLiteral[0].image.slice(1, -1), raw: ctx.StringLiteral[0].image };
    if (ctx.Identifier) return { type: "Identifier", name: ctx.Identifier[0].image };
    if (ctx.expression) return this.visit(ctx.expression[0]); // parenthesis
    throw new Error("Unknown primary expression");
  }

  callExpression(ctx: any): AST.CallExpression {
    const callee = { type: "Identifier", name: ctx.Identifier[0].image } as AST.Identifier;
    const args: AST.Expression[] = [];
    if (ctx.expression) {
      ctx.expression.forEach((exprCtx: any) => {
        args.push(this.visit(exprCtx));
      });
    }
    return {
      type: "CallExpression",
      callee,
      arguments: args
    };
  }
}

export const visitor = new JugaadVisitor();

export function toAST(cst: any): AST.Program {
  return visitor.visit(cst);
}
