# Calil Client

![Deno JS](https://img.shields.io/badge/deno%20js-000000?style=for-the-badge&logo=deno&logoColor=white)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![codecov](https://codecov.io/gh/p1atdev/calil/branch/main/graph/badge.svg?token=S37OD55SBF)](https://codecov.io/gh/p1atdev/calil)
![Testing](https://github.com/p1atdev/calil/actions/workflows/test.yml/badge.svg)
![Lint](https://github.com/p1atdev/calil/actions/workflows/lint.yml/badge.svg)

図書館蔵書検索 API Calil(カーリル) の Deno クライアント

## 使い方

### 図書館の検索

```ts
import { CalilClient } from "https://deno.land/x/calil@v0.1.1/mod.ts";

const client = new CalilClient({ appKey: "your_app_key" });

const libraries = await client.searchLibrary({
  prefecture: "沖縄",
  limit: 2,
});

console.log(libraries);
```

output:

```
[
  Library {
    libraryId: "102944",
    formalName: "北谷町立北玉小学校図書室",
    shortName: "北玉小学校",
    systemId: "Okinawa_Chatan",
    systemName: "沖縄県北谷町",
    libraryKey: "北玉小学校",
    category: "SMALL",
    postalCode: "904-0105",
    tel: "098-936-3928",
    prefecture: "沖縄県",
    city: "中頭郡北谷町",
    address: "沖縄県中頭郡北谷町字吉原875番地",
    location: Location { latitude: 127.7729474, longitude: 26.3137224 },
    isil: null,
    faid: null,
    url: "https://www.chatan.jp/kosodate/library/"
  },
  Library {
    libraryId: "102945",
    formalName: "北谷町立北谷中学校図書室",
    shortName: "北谷中学校",
    systemId: "Okinawa_Chatan",
    systemName: "沖縄県北谷町",
    libraryKey: "北谷中学校",
    category: "SMALL",
    postalCode: "904-0105",
    tel: "098-936-3929",
    prefecture: "沖縄県",
    city: "中頭郡北谷町",
    address: "沖縄県中頭郡北谷町字吉原480番地",
    location: Location { latitude: 127.7796607, longitude: 26.3198774 },
    isil: null,
    faid: null,
    url: "https://www.chatan.jp/kosodate/library/"
  }
]
```

#### オプション

| 名前          | 説明         | 型        | 例                 |
| ----------- | ---------- | -------- | ----------------- |
| appKey?     | アプリケーションキー | string   | `your_key`        |
| prefecture? | 都道府県       | string   | `東京`              |
| city?       | 市区町村       | string   | `千代田区`            |
| systemId?   | システム ID    | string   | `Tokyo_NDL`       |
| location?   | 緯度&軽度      | Location | 上の返り値 location 参照 |
| limit?      | 取得数        | number   | `10`              |

`prefecture`、`systemId`、`location`のうち、少なくともどれかは指定する必要があります

※ システム ID とは？

> システム ID
> は、各図書館が導入している蔵書管理システムの固有の識別子で「Kanagawa_Fujisawa」のようなアルファベットとアンダーラインによって構成されています。
> 一つのシステム ID には多くの場合、複数の図書館／図書室が紐付いています。市に一つのシステム ID
> があり、市内の全ての図書館・図書室が含まれていることが多いですが、複数の市町村で共同で一つのシステム ID
> がある場合や、合併などによって一つの市に複数のシステム ID があることもあります。

詳しくは [カーリル図書館 API 仕様書](https://calil.jp/doc/api_ref.html) を参照

### 貸出状況の検索

```ts
import { CalilClient } from "https://deno.land/x/calil@v0.1.1/mod.ts";

const appKey = "your_app_key";

const client = new CalilClient({ appKey });

const lending = await client.searchLending({
  isbn: "9784048923965", // キノの旅ＸＸ the Beautiful World
  systemId: "Tokyo_NDL",
});

console.log(lending);
```

output:

```
Lending {
  books: [
    LendingData {
      isbn: "9784048923965",
      libraries: [
        LendingLibraryInformation {
          systemId: "Tokyo_NDL",
          status: "Cache",
          reserveUrl: "https://ndlonline.ndl.go.jp/#!/detail/R300000001-I027617183-00",
          libraryStatus: [ { name: "東京本館", status: "蔵書あり" } ]
        }
      ]
    }
  ]
}
```

#### オプション

| 名前       | 説明         | 型                                    | 例               |
| -------- | ---------- | ------------------------------------ | --------------- |
| appKey?  | アプリケーションキー | string                               | `your_app_key`  |
| isbn     | 書籍 ISBN    | string                               | `9784048923965` |
| systemId | システム ID    | string, string[], Library, Library[] | `Tokyo_NDL`     |

systemId は図書館を指定します。図書館検索で帰ってきた `Library` を渡すことも可能です。

※ ISBN とは

> ISBN（アイエスビーエヌ）は、International Standard Book Number
> の略称（頭字語）。図書（書籍）および資料の識別用に設けられた国際規格コード（番号システム）の一種。アラビア数字で表される。日本における漢訳名は「国際標準図書番号」。

[Wikipedia - ISBN](https://ja.wikipedia.org/wiki/ISBN)

本の一番後ろのページとかに 必ず書いてある 10 桁、または 13 桁の数字です。ハイフンで区切られていることもあります。Amazon
の商品ページとかにも載っています。

## 仕様書

詳細な型定義はコードを参照してください

API 仕様書: https://calil.jp/doc/api_ref.html

appKey は [ダッシュボード](https://calil.jp/api/dashboard/) から取得できます。無料です。

ダッシュボード: https://calil.jp/api/dashboard/
