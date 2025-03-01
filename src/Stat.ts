import { StatType } from "kolmafia";

type StatObject = { name: string };

export class Stat {
  #stat: StatObject;

  static none = new Stat({ name: "" });

  private static cache = new Map<number, Stat>([
    [-1, Stat.none],
    [0, new Stat({ name: "Muscle" })],
    [1, new Stat({ name: "Mysticality" })],
    [2, new Stat({ name: "Moxie" })],
  ]);

  private constructor(stat?: StatObject) {
    if (!stat) throw new Error("Fuck you");
    this.#stat = stat;
  }

  static all<T>(): T[];
  static all() {
    return [...Stat.cache.values()];
  }

  static get(names: (string | number)[]): Stat[];
  static get(name: string | number): Stat;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Stat.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Stat.cache
          .entries()
          .find(([, item]) => item.toString() === identifier)?.[0] ?? Stat.none
      );
    }

    return Stat.cache.get(identifier) ?? Stat.none;
  }

  toString() {
    return this.#stat.name as StatType;
  }
}
