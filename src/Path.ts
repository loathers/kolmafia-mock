import { data } from "./data.js";

const paths = data.allPaths;

type PathObject = Omit<NonNullable<NonNullable<typeof paths>["nodes"][0]>, "nodeId" | "__typename">;

export class Path {
  #path: PathObject;

  static none = new Path({ id: -1, name: "", enumName: "", image: "", isAvatar: false, article: "", pointsPreference: "", maximumPoints: 0, bucket: false, stomachCapacity: 0, liverCapacity: 0, spleenCapacity: 0 });
  // {"id":0,"name":"none","avatar":false,"image":"blank.gif","points":0,"familiars":true}

  private static cache = new Map<number, Path>([
    [0, Path.none],
    ...(paths?.nodes
          .filter((c) => c !== null)
          .map((path) => [path.id, new Path(path)] as [number, Path]) ?? [])
  ]);

  private constructor(path?: PathObject) {
    if (!path) throw new Error("Fuck you");
    this.#path = path;
  }

  static all<T>(): T[];
  static all() {
    return [...Path.cache.values()];
  }

  static get(names: (string | number)[]): Path[];
  static get(name: string | number): Path;
  static get(identifier: string | number | (string | number)[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Path.get(name));
    }

    if (typeof identifier === "string") {
      return (
        Path.cache
          .entries()
          .find(([, clazz]) => clazz.name === identifier)?.[0] ?? Path.none
      );
    }

    return Path.cache.get(identifier) ?? Path.none;
  }

  get id() {
    return this.#path.id;
  }

  get name() {
    return this.#path.name;
  }

  get avatar() {
    return this.#path.isAvatar;
  }

  get image() {
    return this.#path.image ?? "";  
  }

  get points() {
    return 0;
  }

  get familiars() {
    return false;
  }
}
