import { Program, Statement, Expression, ASTNode } from "@jugaad/parser";

export class CodeGenerator {
  private indentLevel = 0;

  generate(program: Program): string {
    return this.generateBlock(program.body);
  }

  private generateBlock(statements: Statement[]): string {
    return statements.map(s => this.generateStatement(s)).join("\n");
  }

  private indent(): string {
    return "  ".repeat(this.indentLevel);
  }

  private generateStatement(stmt: Statement): string {
    const indent = this.indent();
    switch (stmt.type) {
      case "ExpressionStatement":
        return `${indent}${this.generateExpression(stmt.expression)};`;
      case "VariableDeclaration":
        return `${indent}let ${stmt.identifier.name} = ${this.generateExpression(stmt.init)};`;
      case "IfStatement":
        let code = `${indent}if (${this.generateExpression(stmt.test)}) {\n`;
        this.indentLevel++;
        code += this.generateBlock(stmt.consequent) + "\n";
        this.indentLevel--;
        code += `${indent}}`;
        if (stmt.alternate) {
          code += ` else {\n`;
          this.indentLevel++;
          code += this.generateBlock(stmt.alternate) + "\n";
          this.indentLevel--;
          code += `${indent}}`;
        }
        return code;
      case "FunctionDeclaration":
        let fnCode = `${indent}function ${stmt.id.name}(${stmt.params.map(p => p.name).join(", ")}) {\n`;
        this.indentLevel++;
        fnCode += this.generateBlock(stmt.body) + "\n";
        this.indentLevel--;
        fnCode += `${indent}}`;
        return fnCode;
      case "ReturnStatement":
        return `${indent}return ${this.generateExpression(stmt.argument)};`;
      default:
        throw new Error(`Unknown statement type: ${(stmt as any).type}`);
    }
  }

  private generateExpression(expr: Expression): string {
    switch (expr.type) {
      case "Literal":
        return typeof expr.value === "string" ? `"${expr.value}"` : String(expr.value);
      case "Identifier":
        return expr.name;
      case "BinaryExpression":
        return `${this.generateExpression(expr.left)} ${expr.operator} ${this.generateExpression(expr.right)}`;
      case "CallExpression":
        return `${expr.callee.name}(${expr.arguments.map(a => this.generateExpression(a)).join(", ")})`;
      default:
        throw new Error(`Unknown expression type: ${(expr as any).type}`);
    }
  }
}

export function compile(program: Program): string {
  const generator = new CodeGenerator();
  return generator.generate(program);
}
