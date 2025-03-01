import { expectTypeOf, test } from "vitest";
import { Skill as KMSkill } from "kolmafia";

import { Skill } from "./Skill.js";

test("Skill mock matches kolmafia", () => {
  expectTypeOf(Skill).toMatchTypeOf<typeof KMSkill>();
});
