import {
  Book,
  BookRequestOptions,
  BookRequestOptionsParameter,
  BookResponse,
} from "../../types/mod.ts";

const endpoint = "https://api.calil.jp/check";

const createRequestURL = (options: BookRequestOptions): URL => {
  if (options.isbn === undefined) {
    throw new Error("isbn is required");
  }

  if (options.appKey === undefined) {
    throw new Error("appKey is required");
  }

  const url = new URL(endpoint);

  Object.keys(options).forEach((key) => {
    const value = Object.getOwnPropertyDescriptor(options, key)?.value;
    if (value !== undefined) {
      const parameter = BookRequestOptionsParameter.get(key)!;
      switch (key) {
        case "systemId": {
          if (Array.isArray(value)) {
            url.searchParams.append(parameter, value.join(","));
          } else {
            url.searchParams.append(parameter, value as string);
          }
          break;
        }
        default: {
          url.searchParams.append(parameter, value as string);
        }
      }
    }
  });

  // json指定
  url.searchParams.append("format", "json");
  url.searchParams.append("callback", "no");

  return url;
};

/**
 * 書籍を検索
 * @param options BookRequestOptions
 * @returns Promise<Book[]>
 */
export const createBookRequest = async (
  options: BookRequestOptions,
): Promise<Book> => {
  const url = createRequestURL(options);

  console.log("url:", url.toString());

  while (true) {
    const json = await fetch(url.toString()).then((res) => res.json());

    const res: BookResponse = json;

    if (res.continue === 1) {
      // セッションキーをセット
      url.searchParams.set("session", res.session);
      continue;
    } else if (res.continue === 0) {
      // TODO: ここでデータを整形
      const book: Book = new Book(res);
      return book;
    } else {
      throw new Error(`unexpected continue value: ${res.continue}`);
    }
  }
};
