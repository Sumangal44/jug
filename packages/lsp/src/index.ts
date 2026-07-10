import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { tokenize } from '@jugaad/parser';
import { getFunnyError } from '@jugaad/compiler';

// Create a connection for the server, using Node's IPC as a transport.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. 
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
  const result: InitializeResult = {
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

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  const text = textDocument.getText();
  const diagnostics: Diagnostic[] = [];

  try {
    const lexResult = tokenize(text);
    
    // Convert chevrotain errors to VS Code Diagnostics
    if (lexResult.errors && lexResult.errors.length > 0) {
      for (const err of lexResult.errors) {
        const diagnostic: Diagnostic = {
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: (err.line ?? 1) - 1, character: (err.column ?? 1) - 1 },
            end: { line: (err.line ?? 1) - 1, character: (err.column ?? 1) + (err.length ?? 1) - 1 }
          },
          message: getFunnyError(err),
          source: 'jugaad'
        };
        diagnostics.push(diagnostic);
      }
    }
  } catch (e: any) {
    // Unhandled parser crashes
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 1 }
      },
      message: getFunnyError(e),
      source: 'jugaad'
    });
  }

  // Send the computed diagnostics to VSCode.
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
