export type LibraryResponse = {
  /**
   * 図書館ID
   * 例: "100002"
   */
  libid: string;

  /**
   * 図書館の正式名称
   * 例: "阿久比町立図書館"
   */
  formal: string;

  /**
   * 図書館の略称
   */
  short: string;

  /**
   * システムID
   * 例: "Aichi_Agui"
   */
  systemid: string;

  /**
   * システム名称
   * 例: "愛知県阿久比町"
   */
  systemname: string;

  /**
   * システム毎の図書館キー
   * 例: "阿久比町立図書館"
   */
  libkey: string;

  /**
   * 図書館のカテゴリー
   */
  category: LibraryCategory;

  /**
   * 郵便番号
   * 例: "470-2212"
   */
  post: string;

  /**
   * 電話番号
   * 例: "0000-00-0000"
   */
  tel: string;

  /**
   * 都道府県
   */
  pref: string;

  /**
   * 市区町村
   */
  city: string;

  /**
   * 住所
   */
  address: string;

  /**
   * 位置情報、緯度経度
   */
  geocode: string;

  /**
   * ISIL国際標準識別子
   */
  isil?: string;

  /** */
  faid: null;

  /**
   * PC用URL
   */
  url_pc: string;
};

export const enum LibraryCategory {
  /**
   * 図書室・公民館
   */
  SMALL = "SMALL",

  /**
   * 図書館(地域)
   */
  MEDIUM = "MEDIUM",

  /**
   * 図書館(広域)
   */
  LARGE = "LARGE",

  /**
   * 大学
   */
  UNIV = "UNIV",

  /**
   * 専門
   */
  SPECIAL = "SPECIAL",

  /**
   * 移動・BM
   */
  BM = "BM",
}
