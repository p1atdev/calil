import { createLibraryRequest, Prefecture } from "../mod.ts";
import { assertEquals, assertRejects } from "../deps.ts";

const appKey = Deno.env.get("CALIL_APP_KEY") ?? "";

Deno.test("fetch libraries", async () => {
  const res = await createLibraryRequest({
    appKey: appKey,
    prefecture: Prefecture.TOKYO,
    limit: 5,
  });

  assertEquals(res.length, 5);

  assertEquals(res[0].libraryId, "111839");
});

Deno.test("fetch Tokyo_NDL", async () => {
  const res = await createLibraryRequest({
    appKey: appKey,
    systemId: "Tokyo_NDL",
    limit: 100,
  });

  // 東京の国立国会図書館は三つに分かれてる
  assertEquals(res.length, 3);

  assertEquals(res[0].systemName, "国立国会図書館");
});

Deno.test("this should throw", async () => {
  await assertRejects(async () =>
    await createLibraryRequest({
      appKey: appKey,
      limit: 100,
    }), Error);
});

Deno.test("search lending status from library", async () => {
  const res = await createLibraryRequest({
    appKey: appKey,
    systemId: "Tokyo_NDL",
    limit: 1,
  });

  assertEquals(res.length, 1);

  const library = res[0];

  const lending = await library.searchLending({
    appKey: appKey,
    isbn: "9784048923965", // キノの旅ＸＸ the Beautiful World
  });

  assertEquals(
    lending.books[0].libraries[0].reserveUrl,
    "https://ndlonline.ndl.go.jp/#!/detail/R300000001-I027617183-00",
  );
});
