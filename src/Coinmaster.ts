import { Item } from "./Item.js";

type CoinmasterObject = {};

export class Coinmaster {
  #coinmaster: CoinmasterObject;

  static none = new Coinmaster({
    token: "",
    item: "none",
    property: "",
    availableTokens: 0,
    buys: false,
    sells: false,
    nickname: "",
    shopid: "",
  });

  private static cache = new Map<string, Coinmaster>([
    ["none", Coinmaster.none],
  ]);

  private constructor(coinmaster?: CoinmasterObject) {
    if (!coinmaster) throw new Error("Fuck you");
    this.#coinmaster = coinmaster;
  }

  static all<T>(): T[];
  static all() {
    return [...Coinmaster.cache.values()];
  }

  static get(names: string[]): Coinmaster[];
  static get(name: string): Coinmaster;
  static get(identifier: string | string[]) {
    if (Array.isArray(identifier)) {
      return identifier.map((name) => Coinmaster.get(name));
    }

    return Coinmaster.cache.get(identifier) ?? Coinmaster.none;
  }

  get token() {
    return "";
  }

  get item() {
    return Item.none;
  }

  get property() {
    return "";
  }

  availableTokens = 0;

  get buys() {
    return false;
  }

  get sells() {
    return false;
  }

  get nickname() {
    return "";
  }

  get shopid() {
    return "";
  }
}
