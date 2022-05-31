export interface LendingResponse {
  /**
   * セッションID
   */
  session: string;

  /**
   * 取得が完了しているかどうか
   * 0なら完了、1なら未完了
   */
  continue: number;

  /**
   * 書籍
   * key: ISBN, value: 地域の図書館の情報
   */
  books: { [key: string]: LendingSystemLibraryStatus }[];
}

/**
 * key: システムID, value: 図書館の情報
 */
export type LendingSystemLibraryStatus = { [key: string]: LendingCondition }[];

export interface LendingCondition {
  /**
   * データ取得状況
   */
  status: LendingRequestStatus;

  /**
   * 貸出URL
   */
  reserveurl: string;

  /**
   * 借りることができるかどうか
   * keyは図書館名、valueは状態
   */
  libkey: {
    [key: string]: LendingStatus;
  }[];
}

export enum LendingRequestStatus {
  OK = "OK",
  Error = "Error",
  /**
   * OKと同じ
   */
  Cache = "Cache",
  Running = "Running",
}

export type LendingStatus =
  | "貸出可"
  | "蔵書あり"
  | "館内のみ"
  | "貸出中"
  | "予約中"
  | "準備中"
  | "休館中"
  | "蔵書なし"
  | "行方不明"
  | "長期延滞";
