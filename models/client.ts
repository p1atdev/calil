export class CalilClient {
  /**
   * アプリケーションキー
   */
  appKey: string;

  constructor(params: CalilClientParams) {
    this.appKey = params.appKey;
  }
}

export type CalilClientParams = {
  appKey: string;
};
