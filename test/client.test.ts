import { CalilClient } from "../models/mod.ts";
import { assertEquals } from "../deps.ts";

const appKey = Deno.env.get("CALIL_APP_KEY")!;

Deno.test("calil client: initialize", () => {
  const client = new CalilClient({ appKey });

  assertEquals(client.appKey, appKey);
});

Deno.test("calil client: search libraries", async () => {
  const client = new CalilClient({ appKey });

  const libraries = await client.searchLibrary({
    prefecture: "沖縄",
    limit: 2,
  });

  console.dir(libraries, { depth: 4 });

  assertEquals(libraries.length, 2);

  assertEquals(libraries[0].systemId, "Okinawa_Chatan");
});

Deno.test("calil client: search lending", async () => {
  const client = new CalilClient({ appKey });

  const lending = await client.searchLending({
    isbn: "9784048923965", // キノの旅ＸＸ the Beautiful World
    systemId: "Tokyo_NDL",
  });

  console.dir(lending, { depth: 8 });

  assertEquals(
    lending.books[0].libraries[0].reserveUrl,
    "https://ndlonline.ndl.go.jp/#!/detail/R300000001-I027617183-00",
  );
});
