"use strict";

// src/index.ts
var import_node = require("vscode-languageserver/node");
var import_vscode_languageserver_textdocument = require("vscode-languageserver-textdocument");
var import_parser = require("@jugaad/parser");
var connection = (0, import_node.createConnection)(import_node.ProposedFeatures.all);
var documents = new import_node.TextDocuments(import_vscode_languageserver_textdocument.TextDocument);
connection.onInitialize((params) => {
  const result = {
    capabilities: {
      textDocumentSync: import_node.TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion (we can add later)
      completionProvider: {
        resolveProvider: true
      }
    }
  };
  return result;
});
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});
async function validateTextDocument(textDocument) {
  const text = textDocument.getText();
  const diagnostics = [];
  try {
    const lexResult = (0, import_parser.tokenize)(text);
    if (lexResult.errors && lexResult.errors.length > 0) {
      for (const err of lexResult.errors) {
        const diagnostic = {
          severity: import_node.DiagnosticSeverity.Error,
          range: {
            start: { line: (err.line ?? 1) - 1, character: (err.column ?? 1) - 1 },
            end: { line: (err.line ?? 1) - 1, character: (err.column ?? 1) + (err.length ?? 1) - 1 }
          },
          message: (void 0)(err),
          source: "jugaad"
        };
        diagnostics.push(diagnostic);
      }
    }
  } catch (e) {
    diagnostics.push({
      severity: import_node.DiagnosticSeverity.Error,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 1 }
      },
      message: (void 0)(e),
      source: "jugaad"
    });
  }
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
documents.listen(connection);
connection.listen();
