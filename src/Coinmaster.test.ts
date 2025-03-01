import { expectTypeOf, test } from "vitest";
import { Coinmaster as KMCoinmaster } from "kolmafia";

import { Coinmaster } from "./Coinmaster.js";

test("Coinmaster mock matches kolmafia", () => {
  expectTypeOf(Coinmaster).toMatchTypeOf<typeof KMCoinmaster>();
});
