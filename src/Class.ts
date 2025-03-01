import { ClassType } from "kolmafia";
import { data } from "./data.js";
import { Path } from "./Path.js";
import { Stat } from "./Stat.js";

const classes = data.allClasses;

type ClassObject = Omit<
  NonNullable<NonNullable<typeof classes>["nodes"][0]>,
  "nodeId" | "__typename"
>;

export class Class {
  #class: ClassObject;

  static none = new Class({
    id: -1,
    name: "",
    enumName: "",
    image: "",
    primeStatIndex: 0,
    stun: "",
    path: 0,
    stomachCapacity: 0,
    liverCapacity: 0,
    spleenCapacity: 0,
  });
  // {"id":-1,"primestat":"none","path":"none"}

  private static cache = new Map<number, Class>([
    [0, Class.none],
    ...(classes?.nodes
      .filter((c) => c !== null)
      .map((clazz) => [clazz.id, new Class(clazz)] as [number, Class]) ?? []),
  ]);

  private constructor(clazz?: ClassObject) {
    if (!clazz) throw new Error("Fuck you");
    this.#class = clazz;
  }

  static all<T>(): T[];
  static all() {
    return [...Class.cache.values()];
  }

  static get(names: (string | number)[]): Class[];
  static get(name: string | number): Class;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Class.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Class.cache
          .entries()
          .find(([, clazz]) => clazz.toString() === identifier)?.[0] ??
        Class.none
      );
    }

    return Class.cache.get(identifier) ?? Class.none;
  }

  toString() {
    return this.#class.name as ClassType;
  }

  get id() {
    return this.#class.id;
  }

  get primestat() {
    return Stat.get(this.#class.primeStatIndex);
  }

  get path() {
    if (!this.#class.path) return Path.none;
    return Path.get(this.#class.path);
  }
}
