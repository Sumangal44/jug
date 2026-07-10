export interface Node {
  type: string;
}

export interface Program extends Node {
  type: "Program";
  body: Statement[];
}

export type Statement = ExpressionStatement | VariableDeclaration | IfStatement | FunctionDeclaration | ReturnStatement;

export interface ExpressionStatement extends Node {
  type: "ExpressionStatement";
  expression: Expression;
}

export interface VariableDeclaration extends Node {
  type: "VariableDeclaration";
  identifier: Identifier;
  init: Expression;
}

export interface IfStatement extends Node {
  type: "IfStatement";
  test: Expression;
  consequent: Statement[];
  alternate?: Statement[];
}

export interface FunctionDeclaration extends Node {
  type: "FunctionDeclaration";
  id: Identifier;
  params: Identifier[];
  body: Statement[];
}

export interface ReturnStatement extends Node {
  type: "ReturnStatement";
  argument: Expression;
}

export type Expression = CallExpression | BinaryExpression | Literal | Identifier;

export interface CallExpression extends Node {
  type: "CallExpression";
  callee: Identifier;
  arguments: Expression[];
}

export interface BinaryExpression extends Node {
  type: "BinaryExpression";
  operator: string;
  left: Expression;
  right: Expression;
}

export interface Literal extends Node {
  type: "Literal";
  value: string | number;
  raw: string;
}

export interface Identifier extends Node {
  type: "Identifier";
  name: string;
}
