import { createLendingRequest, createLibraryRequest } from "../mod.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertRejects,
} from "../deps.ts";

const appKey = Deno.env.get("CALIL_APP_KEY") ?? "";

Deno.test("check the status of book lending", async () => {
  const res = await createLendingRequest({
    appKey: appKey,
    isbn: "9784049133189", // キノの旅XXIII the Beautiful World
    systemId: "Tokyo_NDL",
  });

  assertNotEquals(res.books.length, 0);

  assertEquals(res.books[0].isbn, "9784049133189");
});

Deno.test("return error with empty appKey", () => {
  assertRejects(() => {
    return createLendingRequest({
      appKey: undefined,
      isbn: "9784049133189",
      systemId: "Tokyo_NDL",
    });
  }, Error);
});

Deno.test("check in multiple systemId", async () => {
  const res = await createLendingRequest({
    appKey: appKey,
    isbn: "9784049133189", // キノの旅XXIII the Beautiful World
    systemId: ["Aomori_Pref", "Tokyo_NDL"],
  });

  assertNotEquals(res.books.length, 0);

  assertEquals(res.books[0].isbn, "9784049133189");
});

Deno.test("use the result of library search", async () => {
  const libraries = await createLibraryRequest({
    appKey: appKey,
    prefecture: "沖縄",
  });

  assertNotEquals(libraries.length, 0);

  // console.log(libraries);

  const res = await createLendingRequest({
    appKey: appKey,
    isbn: "9784049133189", // キノの旅XXIII the Beautiful World
    systemId: libraries,
  });

  // console.log(res.books[0].libraries);

  assertNotEquals(res.books.length, 0);

  assertArrayIncludes(
    res.books[0].libraries.map((l) => l.systemId),
    ["Okinawa_Okinawa"],
  );
});
