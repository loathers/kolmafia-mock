import { Coinmaster } from "./Coinmaster.js";
import { data } from "./data.js";
import { Skill } from "./Skill.js";

const items = data.allItems;

type ItemObject = Omit<
  NonNullable<NonNullable<typeof items>["nodes"][0]>,
  "nodeId" | "__typename"
>;

export class Item {
  #item: ItemObject;

  static none = new Item({
    id: -1,
    name: "",
    plural: "",
    descid: "",
    image: "",
    quest: false,
    gift: false,
    tradeable: false,
    discardable: false,
    autosell: 0,
    ambiguous: false,
    consumableById: {
      nodeId: "",
      __typename: "Consumable",
      id: -1,
      stomach: 0,
      liver: 0,
      spleen: 0,
      quality: "NONE",
      levelRequirement: 0,
      adventureRange: "",
      adventures: 0,
      muscle: 0,
      muscleRange: "",
      mysticality: 0,
      mysticalityRange: "",
      moxie: 0,
      moxieRange: "",
      notes: null,
    },
  });

  private static cache = new Map<number, Item>([
    [-1, Item.none],
    ...(items?.nodes
      .filter((i) => i !== null)
      .map((item) => [item.id, new Item(item)] as [number, Item]) ?? []),
  ]);

  private constructor(item?: ItemObject) {
    if (!item) throw new Error("Fuck you");
    this.#item = item;
  }

  static all<T>(): T[];
  static all() {
    return [...Item.cache.values()];
  }

  static get(names: (string | number)[]): Item[];
  static get(name: string | number): Item;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Item.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Item.cache
          .entries()
          .find(([, item]) => item.name === identifier)?.[0] ?? Item.none
      );
    }

    return Item.cache.get(identifier) ?? Item.none;
  }

  get id() {
    return this.#item.id;
  }

  get name() {
    return this.#item.name;
  }

  get plural() {
    return this.#item.plural ?? this.#item.name + "s";
  }

  get descid() {
    return this.#item.descid ?? "";
  }

  get image() {
    return this.#item.image ?? "";
  }

  get smallimage() {
    return this.#item.image ?? "";
  }

  get levelreq() {
    return this.#item.consumableById?.levelRequirement ?? 0;
  }

  get quality() {
    return this.#item.consumableById?.quality ?? "";
  }

  get adventures() {
    return this.#item.consumableById?.adventureRange ?? "";
  }

  get muscle() {
    return this.#item.consumableById?.muscleRange ?? "";
  }

  get mysticality() {
    return this.#item.consumableById?.mysticalityRange ?? "";
  }

  get moxie() {
    return this.#item.consumableById?.moxieRange ?? "";
  }

  get fullness() {
    return this.#item.consumableById?.stomach ?? 0;
  }

  get inebriety() {
    return this.#item.consumableById?.liver ?? 0;
  }

  get spleen() {
    return this.#item.consumableById?.spleen ?? 0;
  }

  get minhp() {
    return 0;
  }

  get maxhp() {
    return 0;
  }

  get minmp() {
    return 0;
  }

  get maxmp() {
    return 0;
  }

  get dailyusesleft() {
    return 2147483647;
  }

  get notes() {
    return this.#item.consumableById?.notes ?? "";
  }

  get quest() {
    return this.#item.quest;
  }

  get gift() {
    return this.#item.gift;
  }

  get tradeable() {
    return this.#item.tradeable;
  }

  get discardable() {
    return this.#item.discardable;
  }

  get combat() {
    return false;
  }

  get combatReusable() {
    return false;
  }

  get usable() {
    return false;
  }

  get reusable() {
    return false;
  }

  get multi() {
    return false;
  }

  get fancy() {
    return false;
  }

  get pasteable() {
    return false;
  }

  get smithable() {
    return false;
  }

  get cookable() {
    return false;
  }

  get mixable() {
    return false;
  }

  get candy() {
    return false;
  }

  get candyType() {
    return "none";
  }

  get chocolate() {
    return false;
  }

  get potion() {
    return false;
  }

  get seller() {
    return Coinmaster.none;
  }

  get buyer() {
    return Coinmaster.none;
  }

  get nameLength() {
    return this.#item.name.length;
  }

  get noobSkill() {
    return Skill.none;
  }

  get tcrsName() {
    return "";
  }

  get skill() {
    return Skill.none;
  }

  get recipe() {
    return Item.none;
  }
}
