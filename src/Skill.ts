import { Class } from "./Class.js";
import { data } from "./data.js";

const skills = data.allSkills;

type SkillObject = Omit<
  NonNullable<NonNullable<typeof skills>["nodes"][0]>,
  "nodeId" | "__typename"
>;

export class Skill {
  #skill: SkillObject;

  static none = new Skill({
    id: -1,
    name: "",
    image: "",
    mpCost: 0,
    duration: 0,
    guildLevel: 0,
    maxLevel: 0,
    permable: false,
    ambiguous: false,
  });
  // {"id":-1,"name":"","type":"unknown","level":-1,"image":"","traincost":0,"class":"none","libram":false,"passive":false,"buff":false,"combat":false,"song":false,"expression":false,"walk":false,"summon":false,"permable":true,"dailylimit":-1,"dailylimitpref":"","timescast":0}

  private static cache = new Map<number, Skill>([
    [0, Skill.none],
    ...(skills?.nodes
      .filter((i) => i !== null)
      .map((item) => [item.id, new Skill(item)] as [number, Skill]) ?? []),
  ]);

  private constructor(skill?: SkillObject) {
    if (!skill) throw new Error("Fuck you");
    this.#skill = skill;
  }

  static all<T>(): T[];
  static all() {
    return [...Skill.cache.values()];
  }

  static get(names: (string | number)[]): Skill[];
  static get(name: string | number): Skill;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Skill.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Skill.cache
          .entries()
          .find(([, item]) => item.name === identifier)?.[0] ?? Skill.none
      );
    }

    return Skill.cache.get(identifier) ?? Skill.none;
  }

  get id() {
    return this.#skill.id;
  }

  get name() {
    return this.#skill.name;
  }

  get type() {
    return "";
  }

  get level() {
    return this.#skill.guildLevel ?? 0;
  }

  get image() {
    return this.#skill.image;
  }

  get traincost() {
    return 0;
  }

  get class() {
    return Class.none;
  }

  get libram() {
    return false;
  }

  get passive() {
    return false;
  }

  get buff() {
    return false;
  }

  get combat() {
    return false;
  }

  get song() {
    return false;
  }

  get expression() {
    return false;
  }

  get walk() {
    return false;
  }

  get summon() {
    return false;
  }

  get permable() {
    return this.#skill.permable;
  }

  get dailylimit() {
    return -1;
  }

  get dailylimitpref() {
    return "";
  }

  get timescast() {
    return 0;
  }
}
