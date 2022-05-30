export interface LendingRequestOptions {
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

export const LendingRequestOptionsParameter: Map<string, string> = new Map([
  ["appKey", "appkey"],
  ["isbn", "isbn"],
  ["systemId", "systemid"],
]);
