import { Item } from "./Item.js";
import { Coinmaster } from "./Coinmaster.js";
import { Skill } from "./Skill.js";
import { Class } from "./Class.js";
import { Path } from "./Path.js";
import { Stat } from "./Stat.js";

export const kolmafia = await import("kolmafia");
// kolmafia.Coinmaster = Coinmaster;
// kolmafia.Item = Item;
// kolmafia.Skill = Skill;
// kolmafia.Class = Class;
// kolmafia.Path = Path;
// kolmafia.Stat = Stat;

const { visitUrl } = kolmafia;

export { Item, Coinmaster, Skill, Class, Path, Stat, visitUrl };
