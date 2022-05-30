import { createLendingRequest } from "../utils/mod.ts";
import { assertEquals, assertNotEquals } from "../deps.ts";

const appKey = Deno.env.get("CALIL_APP_KEY")!;

Deno.test("check the status of book lending", async () => {
  const res = await createLendingRequest({
    appKey: appKey,
    isbn: "9784049133189", // キノの旅XXIII the Beautiful World
    systemId: "Tokyo_NDL",
  });

  assertNotEquals(res.books.length, 0);

  assertEquals(res.books[0].isbn, "9784049133189");
});
