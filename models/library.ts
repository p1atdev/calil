import { LibraryCategory, LibraryResponse, Location } from "../types/mod.ts";

export class Library {
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
  geocode: Location;

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

  constructor(data: LibraryResponse) {
    this.libid = data.libid;
    this.formal = data.formal;
    this.short = data.short;
    this.systemid = data.systemid;
    this.systemname = data.systemname;
    this.libkey = data.libkey;
    this.category = data.category;
    this.post = data.post;
    this.tel = data.tel;
    this.pref = data.pref;
    this.city = data.city;
    this.address = data.address;
    this.geocode = Location.fromString(data.geocode);
    this.isil = data.isil;
    this.faid = data.faid;
    this.url_pc = data.url_pc;
  }
}
