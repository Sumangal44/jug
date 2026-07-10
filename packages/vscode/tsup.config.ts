import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/extension.ts', 'src/server.ts'],
  format: ['cjs'],
  external: ['vscode'],
  noExternal: [
    "vscode-languageclient",
    "vscode-languageserver",
    "vscode-languageserver-textdocument",
    "@jugaad/lsp",
    "@jugaad/parser",
    "chevrotain"
  ],
  clean: true
});
