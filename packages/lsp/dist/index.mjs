// src/index.ts
import {
  createConnection,
  TextDocuments,
  DiagnosticSeverity,
  ProposedFeatures,
  TextDocumentSyncKind
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { tokenize } from "@jugaad/parser";
var connection = createConnection(ProposedFeatures.all);
var documents = new TextDocuments(TextDocument);
connection.onInitialize((params) => {
  const result = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
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
    const lexResult = tokenize(text);
    if (lexResult.errors && lexResult.errors.length > 0) {
      for (const err of lexResult.errors) {
        const diagnostic = {
          severity: DiagnosticSeverity.Error,
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
      severity: DiagnosticSeverity.Error,
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
