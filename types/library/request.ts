import { Location } from "../mod.ts";

export interface LibraryRequestOptions {
  /**
   * アプリケーションキー
   */
  appKey: string;

  /**
   * セッションキー
   * 前回のリクエストの続きをリクエストする場合
   */
  session?: string;

  /**
   * 都道府県
   */
  prefecture?: string;

  /**
   * 市区町村
   */
  city?: string;

  /**
   * システムID
   */
  systemId?: string;

  /**
   * 緯度経度
   */
  location?: Location;

  /**
   * 取得数
   */
  limit?: number;
}

export const LibraryRequestOptionsParameter: Map<string, string> = new Map([
  ["appKey", "appkey"],
  ["session", "session"],
  ["prefecture", "pref"],
  ["city", "city"],
  ["systemId", "systemid"],
  ["location", "location"],
  ["limit", "limit"],
]);
