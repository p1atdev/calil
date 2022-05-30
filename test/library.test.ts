import { createLibraryRequest } from "../utils/mod.ts";
import { Prefecture } from "../types/mod.ts";
import { assertEquals, assertRejects } from "../deps.ts";

const appKey = Deno.env.get("CALIL_APP_KEY")!;

Deno.test("fetch libraries", async () => {
  const res = await createLibraryRequest({
    appKey: appKey,
    prefecture: Prefecture.TOKYO,
    limit: 5,
  });

  assertEquals(res.length, 5);

  assertEquals(res[0].libid, "111839");
});

Deno.test("fetch 国立国会図書館", async () => {
  const res = await createLibraryRequest({
    appKey: appKey,
    systemId: "Tokyo_NDL",
    limit: 100,
  });

  // 東京の国立国会図書館は三つに分かれてる
  assertEquals(res.length, 3);

  assertEquals(res[0].systemname, "国立国会図書館");
});

Deno.test("this should throw", async () => {
  await assertRejects(async () =>
    await createLibraryRequest({
      appKey: appKey,
      limit: 100,
    }), Error);
});
