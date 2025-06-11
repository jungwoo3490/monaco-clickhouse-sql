import * as monaco from "monaco-editor";
import { registerClickHouseLanguage } from "./clickhouseLanguage";

export function registerClickHouse(monacoInstance: typeof monaco) {
  registerClickHouseLanguage(monacoInstance);
}
