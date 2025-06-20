import * as monaco from "monaco-editor";
import {
  CLICKHOUSE_KEYWORDS,
  CLICKHOUSE_FUNCTIONS,
  CLICKHOUSE_ENGINES,
  CLICKHOUSE_SETTINGS,
  CLICKHOUSE_SYSTEM_TABLES,
} from "./keywords";

export const clickhouseLanguage: monaco.languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".clickhouse-sql",
  ignoreCase: true,

  keywords: CLICKHOUSE_KEYWORDS,
  functions: CLICKHOUSE_FUNCTIONS,
  engines: CLICKHOUSE_ENGINES,
  settings: CLICKHOUSE_SETTINGS,
  system_tables: CLICKHOUSE_SYSTEM_TABLES,

  operators: [
    "=",
    ">",
    "<",
    "!",
    "~",
    "?",
    ":",
    "==",
    "<=",
    ">=",
    "!=",
    "<>",
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "^",
    "<<",
    ">>",
    "||",
  ],

  builtinConstants: ["TRUE", "FALSE", "NULL", "INF", "NAN"],

  tokenizer: {
    root: [
      [
        /[a-zA-Z_][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@engines": "type",
            "@settings": "variable.setting",
            "@system_tables": "variable.system",
            "@builtinConstants": "constant",
            "@default": "identifier",
          },
        },
      ],

      { include: "@whitespace" },

      [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, "number.float"],
      [/\d+([eE][\-+]?\d+)?[fFdD]?/, "number.integer"],
      [/0[xX][\da-fA-F]+/, "number.hex"],

      [/'/, "string", "@string_single"],
      [/"/, "string", "@string_double"],
      [/`/, "identifier.quoted", "@string_backtick"],

      [/[=><|!+\-*/%&^~?:]/, "operator"],
      [/[;,.]/, "delimiter"],
      [/[{}()\[\]]/, "@brackets"],

      [/\$[a-zA-Z_][\w$]*/, "variable"],
      [/\{[a-zA-Z_][\w$]*\}/, "variable.parameter"],
    ],

    whitespace: [
      [/\s+/, "white"],
      [/--.*$/, "comment"],
      [/\/\*/, "comment", "@comment"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/\\./, "string.escape"],
      [/'/, "string", "@pop"],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, "string", "@pop"],
    ],

    string_backtick: [
      [/[^\\`]+/, "identifier.quoted"],
      [/\\./, "identifier.quoted.escape"],
      [/`/, "identifier.quoted", "@pop"],
    ],
  },
};
