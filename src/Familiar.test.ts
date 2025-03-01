import { expectTypeOf, test } from "vitest";
import { Familiar as KMFamiliar } from "kolmafia";

import { Familiar } from "./Familiar.js";

test("Familiar mock matches kolmafia", () => {
  expectTypeOf(Familiar).toMatchTypeOf<typeof KMFamiliar>();
});
