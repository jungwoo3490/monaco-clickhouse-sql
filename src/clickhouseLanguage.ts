import * as monaco from "monaco-editor";
import { clickhouseLanguage } from "./clickhouseTokens";
import {
  CLICKHOUSE_KEYWORDS,
  CLICKHOUSE_FUNCTIONS,
  CLICKHOUSE_ENGINES,
  CLICKHOUSE_SETTINGS,
  CLICKHOUSE_SYSTEM_TABLES,
} from "./keywords";

export function registerClickHouseLanguage(monacoInstance: typeof monaco) {
  const LANGUAGE_ID = "clickhouse-sql";

  monacoInstance.languages.register({ id: LANGUAGE_ID });

  monacoInstance.languages.setMonarchTokensProvider(
    LANGUAGE_ID,
    clickhouseLanguage
  );

  monacoInstance.languages.setLanguageConfiguration(LANGUAGE_ID, {
    comments: {
      lineComment: "--",
      blockComment: ["/*", "*/"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "`", close: "`", notIn: ["string", "comment"] },
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
    ],
    surroundingPairs: [
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
    ],

    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  monacoInstance.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions: monaco.languages.CompletionItem[] = [];

      CLICKHOUSE_KEYWORDS.forEach((keyword) => {
        suggestions.push({
          label: keyword,
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range,
        });
      });

      CLICKHOUSE_FUNCTIONS.forEach((func) => {
        suggestions.push({
          label: func,
          kind: monacoInstance.languages.CompletionItemKind.Function,
          insertText: func,
          range,
        });
      });

      CLICKHOUSE_ENGINES.forEach((engine) => {
        suggestions.push({
          label: engine,
          kind: monacoInstance.languages.CompletionItemKind.Class,
          insertText: engine,
          range,
        });
      });

      CLICKHOUSE_SETTINGS.forEach((setting) => {
        suggestions.push({
          label: setting,
          kind: monacoInstance.languages.CompletionItemKind.Variable,
          insertText: setting,
          range,
        });
      });

      CLICKHOUSE_SYSTEM_TABLES.forEach((table) => {
        suggestions.push({
          label: table,
          kind: monacoInstance.languages.CompletionItemKind.Struct,
          insertText: table,
          range,
        });
      });

      return { suggestions };
    },
  });
}
