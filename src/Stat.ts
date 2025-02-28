import { StatType } from "kolmafia";

type StatObject = { name: string };

export class Stat {
  #stat: StatObject;

  static none = new Stat({ name: "" });

  private static cache = new Map<string, Stat>([
    ["", Stat.none],
    ["Muscle", new Stat({ name: "Muscle" })],
    ["Mysticality", new Stat({ name: "Mysticality" })],
    ["Moxie", new Stat({ name: "Moxie" })],
  ]);

  private constructor(stat?: StatObject) {
    if (!stat) throw new Error("Fuck you");
    this.#stat = stat;
  }

  static all<T>(): T[];
  static all() {
    return [...Stat.cache.values()];
  }

  static get(names: string[]): Stat[];
  static get(name: string): Stat;
  static get(identifier: string | string[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Stat.get(name));
    }

    return Stat.cache.get(identifier) ?? Stat.none;
  }

  toString() {
    return this.#stat.name as StatType;
  }

}
