import { expectTypeOf, test } from "vitest";
import { Item as KMItem } from "kolmafia";

import { Item } from "./Item.js";

test("Item mock matches kolmafia", () => {
  expectTypeOf(Item).toMatchTypeOf<typeof KMItem>();
});
