import { expectTypeOf, test } from "vitest";
import { Path as KMPath } from "kolmafia";

import { Path } from "./Path.js";

test("Path mock matches kolmafia", () => {
  expectTypeOf(Path).toMatchTypeOf<typeof KMPath>();
});
