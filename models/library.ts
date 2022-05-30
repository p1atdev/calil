import { LibraryCategory, LibraryResponse, Location } from "../types/mod.ts";

export class Library {
  /**
   * 図書館ID
   * 例: "100002"
   */
  libraryId: string;

  /**
   * 図書館の正式名称
   * 例: "阿久比町立図書館"
   */
  formalName: string;

  /**
   * 図書館の略称
   */
  shortName: string;

  /**
   * システムID
   * 例: "Aichi_Agui"
   */
  systemId: string;

  /**
   * システム名称
   * 例: "愛知県阿久比町"
   */
  systemName: string;

  /**
   * システム毎の図書館キー
   * 例: "阿久比町立図書館"
   */
  libraryKey: string;

  /**
   * 図書館のカテゴリー
   */
  category: LibraryCategory;

  /**
   * 郵便番号
   * 例: "470-2212"
   */
  postalCode: string;

  /**
   * 電話番号
   * 例: "0000-00-0000"
   */
  tel: string;

  /**
   * 都道府県
   */
  prefecture: string;

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
  location: Location;

  /**
   * ISIL国際標準識別子
   */
  isil?: string;

  /** */
  faid: null;

  /**
   * PC用URL
   */
  url: string;

  constructor(data: LibraryResponse) {
    this.libraryId = data.libid;
    this.formalName = data.formal;
    this.shortName = data.short;
    this.systemId = data.systemid;
    this.systemName = data.systemname;
    this.libraryKey = data.libkey;
    this.category = data.category;
    this.postalCode = data.post;
    this.tel = data.tel;
    this.prefecture = data.pref;
    this.city = data.city;
    this.address = data.address;
    this.location = Location.fromString(data.geocode);
    this.isil = data.isil;
    this.faid = data.faid;
    this.url = data.url_pc;
  }
}
