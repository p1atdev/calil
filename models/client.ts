import { createLendingRequest, createLibraryRequest } from "../utils/mod.ts";
import { LendingRequestOptions, LibraryRequestOptions } from "../types/mod.ts";
import { Lending, Library } from "./mod.ts";

export class CalilClient {
  /**
   * アプリケーションキー
   */
  appKey?: string;

  constructor(params?: CalilClientParams) {
    this.appKey = params?.appKey ?? Deno.env.get("CALIL_APP_KEY") ?? undefined;
  }

  /**
   * 図書館を検索
   */
  async searchLibrary(
    params: Omit<LibraryRequestOptions, "appKey">,
  ): Promise<Library[]> {
    const res = await createLibraryRequest({ ...params, appKey: this.appKey });

    return res;
  }

  /**
   * 書籍を検索
   */
  async searchLending(
    params: Omit<LendingRequestOptions, "appKey">,
  ): Promise<Lending> {
    const res = await createLendingRequest({ ...params, appKey: this.appKey });

    return res;
  }
}

export type CalilClientParams = {
  appKey?: string;
};

export const createCalilClient = (params: CalilClientParams) => {
  /**
   * アプリケーションキー
   */
  const appKey = params.appKey ?? Deno.env.get("CALIL_APP_KEY") ?? undefined;

  /**
   * 図書館を検索
   */
  const searchLibrary = async (
    params: Omit<LibraryRequestOptions, "appKey">,
  ): Promise<Library[]> => {
    const res = await createLibraryRequest({ ...params, appKey: appKey });

    return res;
  };

  /**
   * 書籍を検索
   */
  const searchLending = async (
    params: Omit<LendingRequestOptions, "appKey">,
  ): Promise<Lending> => {
    const res = await createLendingRequest({ ...params, appKey: appKey });

    return res;
  };

  return {
    searchLibrary,
    searchLending,
  };
};
