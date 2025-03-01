import { data } from "./data.js";
import { Item } from "./Item.js";

const familiars = data.allFamiliars;

type FamiliarObject = Omit<
  NonNullable<NonNullable<typeof familiars>["nodes"][0]>,
  "nodeId" | "__typename"
>;

export class Familiar {
  #familiar: FamiliarObject;

  static none = new Familiar({
    id: -1,
    name: "",
    image: "",
    equipment: 0,
    larva: 0,
    cageMatch: 0,
    scavengerHunt: 0,
    hideAndSeek: 0,
    obstacleCourse: 0,
    attributes: [],
  });
  // {"id":-1,"name":"","type":"unknown","level":-1,"image":"","traincost":0,"class":"none","libram":false,"passive":false,"buff":false,"combat":false,"song":false,"expression":false,"walk":false,"summon":false,"permable":true,"dailylimit":-1,"dailylimitpref":"","timescast":0}

  private static cache = new Map<number, Familiar>([
    [0, Familiar.none],
    ...(familiars?.nodes
      .filter((i) => i !== null)
      .map(
        (familiar) =>
          [familiar.id, new Familiar(familiar)] as [number, Familiar],
      ) ?? []),
  ]);

  private constructor(familiar?: FamiliarObject) {
    if (!familiar) throw new Error("Fuck you");
    this.#familiar = familiar;
  }

  static all<T>(): T[];
  static all() {
    return [...Familiar.cache.values()];
  }

  static get(names: (string | number)[]): Familiar[];
  static get(name: string | number): Familiar;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Familiar.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Familiar.cache
          .entries()
          .find(([, familiar]) => familiar.name === identifier)?.[0] ??
        Familiar.none
      );
    }

    return Familiar.cache.get(identifier) ?? Familiar.none;
  }

  get id() {
    return this.#familiar.id;
  }

  get name() {
    return this.#familiar.name;
  }

  get image() {
    return this.#familiar.image;
  }

  get attributes() {
    return this.#familiar.attributes.filter((a) => a !== null).join(", ");
  }

  get hatchling() {
    return Item.get(this.#familiar.larva ?? -1);
  }

  owner = "";

  ownerId = 0;

  experience = 0;

  charges = 0;

  get dropName() {
    return "";
  }

  get dropItem() {
    return Item.none;
  }

  dropsToday = 0;

  get dropsLimit() {
    return 0;
  }

  fightsToday = 0;

  get fightsLimit() {
    return 0;
  }

  get combat() {
    return false;
  }

  get physicalDamage() {
    return false;
  }

  get elementalDamage() {
    return false;
  }

  get block() {
    return false;
  }

  get delevel() {
    return false;
  }

  get hpDuringCombat() {
    return false;
  }

  get mpDuringCombat() {
    return false;
  }

  get otherActionDuringCombat() {
    return false;
  }

  get hpAfterCombat() {
    return false;
  }

  get mpAfterCombat() {
    return false;
  }

  get otherActionAfterCombat() {
    return false;
  }

  get passive() {
    return false;
  }

  get underwater() {
    return false;
  }

  get variable() {
    return false;
  }

  feasted = false;

  get pokeLevel() {
    return 0;
  }

  get pokeLevel2Power() {
    return 0;
  }

  get pokeLevel2Hp() {
    return 0;
  }

  get pokeLevel3Power() {
    return 0;
  }

  get pokeLevel3Hp() {
    return 0;
  }

  get pokeLevel4Power() {
    return 0;
  }

  get pokeLevel4Hp() {
    return 0;
  }

  get pokeMove1() {
    return "";
  }

  get pokeMove2() {
    return "";
  }

  get pokeMove3() {
    return "";
  }

  get pokeAttribute() {
    return "";
  }

  soupWeight = 0;
  soupAttributes = [];
}
