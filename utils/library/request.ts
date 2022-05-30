import {
  LibraryRequestOptions,
  LibraryRequestOptionsParameter,
  LibraryResponse,
  Location,
  Prefecture,
} from "../../types/mod.ts";
import { Library } from "../../models/mod.ts";

const endpoint = "https://api.calil.jp/library";

const createRequestURL = (options: LibraryRequestOptions): URL => {
  if (
    options.prefecture === undefined && options.systemId === undefined &&
    options.location === undefined
  ) {
    throw new Error("pref, systemid or geocode is required");
  }

  if (options.appKey === undefined) {
    throw new Error("appKey is required");
  }

  const url = new URL(endpoint);

  Object.keys(options).forEach((key) => {
    const value = Object.getOwnPropertyDescriptor(options, key)?.value;
    if (value !== undefined) {
      const parameter = LibraryRequestOptionsParameter.get(key)!;

      switch (key) {
        case "prefecture": {
          const pref = value as Prefecture;

          url.searchParams.append(parameter, pref);

          break;
        }
        case "location": {
          const location = (value as Location).toString();

          url.searchParams.append(parameter, location);

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
  url.searchParams.append("callback", "");

  return url;
};

/**
 * 図書館を検索
 * @param options LibraryRequestOptions
 * @returns Promise<Library[]>
 */
export const createLibraryRequest = async (
  options: LibraryRequestOptions,
): Promise<Library[]> => {
  const url = createRequestURL(options);

  console.log("url:", url.toString());

  const json = await fetch(url.toString()).then((res) => res.json());

  const res: LibraryResponse[] = json;

  // TODO: ここでもうちょいデータを整形してから返す
  const libraries: Library[] = res.map((library) => {
    return new Library(library);
  });

  return libraries;
};
