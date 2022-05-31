# Calil Client

[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)

図書館蔵書検索 API Calil(カーリル) の Deno クライアント

## 使い方

```ts
import { CalilClient } from "https://deno.land/x/calil@v0.1.0/mod.ts"

const client = new CalilClient({ appKey: "your_app_key" })

const libraries = await client.searchLibrary({
    prefecture: "沖縄",
    limit: 3,
})

console.log(libraries)
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
  },
  Library {
    libraryId: "102947",
    formalName: "北谷町立図書館",
    shortName: "北谷町立図書館",
    systemId: "Okinawa_Chatan",
    systemName: "沖縄県北谷町",
    libraryKey: "北谷図書館",
    category: "MEDIUM",
    postalCode: "904-0103",
    tel: "098-936-3542",
    prefecture: "沖縄県",
    city: "中頭郡北谷町",
    address: "沖縄県中頭郡北谷町字桑江467−1",
    location: Location { latitude: 127.7688556, longitude: 26.3249464 },
    isil: "JP-1003226",
    faid: null,
    url: "http://www.chatan.jp/library/"
  }
]
```

## 仕様書

型定義はコードを参照してください

API 仕様書: https://calil.jp/doc/api_ref.html

appKey は [ダッシュボード](https://calil.jp/api/dashboard/) から取得できます。無料です。

ダッシュボード: https://calil.jp/api/dashboard/
