import { Library } from "../../models/mod.ts";

export interface LendingRequestOptions {
  /**
   * アプリケーションキー
   */
  appKey?: string;

  /**
   * ISBN
   */
  isbn: string;

  /**
   * システムID
   */
  systemId: string | string[] | Library | Library[];
}

export const LendingRequestOptionsParameter: Map<string, string> = new Map([
  ["appKey", "appkey"],
  ["isbn", "isbn"],
  ["systemId", "systemid"],
]);
