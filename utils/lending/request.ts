import {
  LendingRequestOptions,
  LendingRequestOptionsParameter,
  LendingResponse,
} from "../../types/mod.ts";
import { Lending, Library } from "../../models/mod.ts";

const endpoint = "https://api.calil.jp/check";

const createRequestURL = (options: LendingRequestOptions): URL => {
  if (options.appKey === undefined) {
    throw new Error("appKey is required");
  }

  const url = new URL(endpoint);

  Object.keys(options).forEach((key) => {
    const value = Object.getOwnPropertyDescriptor(options, key)?.value;
    if (value !== undefined) {
      const parameter = LendingRequestOptionsParameter.get(key)!;
      switch (key) {
        case "systemId": {
          if (Array.isArray(value)) {
            if (value.every((v) => v instanceof Library)) {
              url.searchParams.append(
                parameter,
                value.map((lib) => {
                  return (lib as Library).systemId;
                }).join(","),
              );
            } else {
              url.searchParams.append(parameter, value.join(","));
            }
          } else {
            if (value instanceof Library) {
              url.searchParams.append(parameter, (value as Library).systemId);
            } else {
              url.searchParams.append(parameter, value as string);
            }
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
 * @param options LendingRequestOptions
 * @returns Promise<Book[]>
 */
export const createLendingRequest = async (
  options: LendingRequestOptions,
): Promise<Lending> => {
  const url = createRequestURL(options);

  // console.log("url:", url.toString());

  while (true) {
    const json = await fetch(url.toString()).then((res) => res.json());

    const res: LendingResponse = json;

    if (res.continue === 1) {
      // セッションキーをセット
      url.searchParams.set("session", res.session);
      continue;
    } else if (res.continue === 0) {
      // TODO: ここでデータを整形
      const book: Lending = new Lending(res);
      return book;
    } else {
      throw new Error(`unexpected continue value: ${res.continue}`);
    }
  }
};
