export interface BookRequestOptions {
  /**
   * アプリケーションキー
   */
  appKey: string;

  /**
   * ISBN
   */
  isbn: string;

  /**
   * システムID
   */
  systemId: string | string[];
}

export const BookRequestOptionsParameter: Map<string, string> = new Map([
  ["appKey", "appkey"],
  ["isbn", "isbn"],
  ["systemId", "systemid"],
]);
