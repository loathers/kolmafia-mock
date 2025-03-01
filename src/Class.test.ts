import { expectTypeOf, test } from "vitest";
import { Class as KMClass } from "kolmafia";

import { Class } from "./Class.js";

test("Class mock matches kolmafia", () => {
  expectTypeOf(Class).toMatchTypeOf<typeof KMClass>();
});
