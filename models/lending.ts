import {
  LendingCondition,
  LendingRequestStatus,
  LendingResponse,
  LendingStatus,
  LendingSystemLibraryStatus,
} from "../types/mod.ts";

export class Lending {
  /**
   * 書籍
   */
  books: LendingData[];

  constructor(data: LendingResponse) {
    this.books = Object.keys(data.books).map((isbn) => {
      const library = Object.getOwnPropertyDescriptor(data.books, isbn)?.value;
      if (!library) {
        throw new Error(`Library is not found for isbn: ${isbn}`);
      }
      return new LendingData(isbn, library);
    });
  }
}

export class LendingData {
  /**
   * ISBN
   */
  isbn: string;

  /**
   * 図書館
   */
  libraries: LendingLibraryInformation[];

  constructor(isbn: string, data: LendingSystemLibraryStatus) {
    this.isbn = isbn;
    this.libraries = Object.keys(data).map((key) => {
      const condition = Object.getOwnPropertyDescriptor(data, key)?.value;
      if (!condition) {
        throw new Error(`Condition is not found for system: ${key}`);
      }
      return new LendingLibraryInformation(key, condition);
    });
  }
}

export class LendingLibraryInformation {
  /**
   * システムID
   */
  systemId: string;

  /**
   * ステータス
   */
  status: LendingRequestStatus;

  /**
   * 貸出URL
   */
  reserveUrl: string;

  /**
   * 図書館とそれぞれの状況
   */
  libraryStatus: {
    /**
     * 図書館の名称
     */
    name: string;
    /**
     * 日本語での貸出状況
     */
    status: LendingStatus;
  }[];

  constructor(systemId: string, data: LendingCondition) {
    this.systemId = systemId;
    this.status = data.status;
    this.reserveUrl = data.reserveurl;
    this.libraryStatus = Object.keys(data.libkey).map((key) => {
      const status = Object.getOwnPropertyDescriptor(data.libkey, key)?.value;
      if (!status) {
        throw new Error(`Status is not found for library: ${key}`);
      }
      return {
        name: key,
        status: status,
      };
    });
  }
}
