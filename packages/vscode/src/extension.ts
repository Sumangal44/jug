import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in the @jugaad/lsp package
  // During development, it might be in ../../lsp/dist/index.js
  // When packaged, we will bundle the server script.
  // For now, we assume it's bundled in the same extension or resolved via node.
  
  // Actually, standard way is to point to the server file directly.
  let serverModule = context.asAbsolutePath(path.join('dist', 'server.js'));
  
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'jugaad' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.jug')
    }
  };

  client = new LanguageClient(
    'jugaadLanguageServer',
    'JugaadLang Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
