import { expectTypeOf, test } from "vitest";
import { Stat as KMStat } from "kolmafia";

import { Stat } from "./Stat.js";

test("Stat mock matches kolmafia", () => {
  expectTypeOf(Stat).toMatchTypeOf<typeof KMStat>();
});
