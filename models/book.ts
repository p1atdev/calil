import {
  BookLendingCondition,
  BookLendingStatus,
  //   BookLibraryStatus,
  BookResponse,
  BookSystemLibraryStatus,
} from "../types/mod.ts";

export class Book {
  /**
   * 書籍
   */
  books: BookData[];

  constructor(data: BookResponse) {
    this.books = Object.keys(data.books).map((isbn) => {
      const library = Object.getOwnPropertyDescriptor(data.books, isbn)?.value;
      if (!library) {
        throw new Error(`Library is not found for isbn: ${isbn}`);
      }
      return new BookData(isbn, library);
    });
  }
}

export class BookData {
  /**
   * ISBN
   */
  isbn: string;

  /**
   * 図書館
   */
  libraries: BookLibraryInformation[];

  constructor(isbn: string, data: BookSystemLibraryStatus) {
    this.isbn = isbn;
    this.libraries = Object.keys(data).map((key) => {
      const condition = Object.getOwnPropertyDescriptor(data, key)?.value;
      if (!condition) {
        throw new Error(`Condition is not found for system: ${key}`);
      }
      return new BookLibraryInformation(key, condition);
    });
  }
}

export class BookLibraryInformation {
  /**
   * システムID
   */
  systemId: string;

  /**
   * ステータス
   */
  status: BookLendingStatus;

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
    status: string;
  }[];

  constructor(systemId: string, data: BookLendingCondition) {
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
