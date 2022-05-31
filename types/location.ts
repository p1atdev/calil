export class Location {
  /**
   * 北緯
   */
  latitude: number;

  /**
   * 東経
   */
  longitude: number;

  constructor(params: GeocodeParams) {
    this.latitude = params.latitude;
    this.longitude = params.longitude;
  }

  /**
   * 位置情報を文字列に変換する
   * @returns {string}
   * @memberof Geocode
   */
  toString(): string {
    return `${this.latitude},${this.longitude}`;
  }

  static fromString(text: string): Location {
    const [latitude, longitude] = text.split(",");

    return new Location({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  }
}

export interface GeocodeParams {
  /**
   * 北緯
   */
  latitude: number;

  /**
   * 東経
   */
  longitude: number;
}
