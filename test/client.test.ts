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
    limit: 3,
  });

  assertEquals(libraries.length, 3);

  assertEquals(libraries[0].systemId, "Okinawa_Chatan");
});
