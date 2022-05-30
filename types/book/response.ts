export interface BookResponse {
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
  books: { [key: string]: BookSystemLibraryStatus }[];
}

/**
 * key: システムID, value: 図書館の情報
 */
export type BookSystemLibraryStatus = { [key: string]: BookLendingCondition }[];

export interface BookLendingCondition {
  /**
   * 借りられるか
   */
  status: BookLendingStatus;

  /**
   * 貸出URL
   */
  reserveurl: string;

  /**
   * 借りることができるかどうか
   * keyは図書館名、valueは状態
   */
  libkey: { [key: string]: string }[];
}

export enum BookLendingStatus {
  OK = "OK",
  Error = "Error",
  /**
   * OKと同じ
   */
  Cache = "Cache",
  Running = "Running",
}

// export enum BookLibraryStatus {
//   AVAILABLE = "貸出可",
//   LENDING = "貸出中",
//   INSIDE_ONLY = "館内のみ",
// }
