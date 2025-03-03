import { createClient } from "data-of-loathing";

export const client = createClient();

export const data = await client.query({
  allItems: {
    nodes: {
      __scalar: true,
      consumableById: {
        __scalar: true,
      },
    },
  },
  allClasses: {
    nodes: {
      __scalar: true,
    },
  },
  allPaths: {
    nodes: {
      __scalar: true,
    },
  },
  allSkills: {
    nodes: {
      __scalar: true,
    },
  },
  allFamiliars: {
    nodes: {
      __scalar: true,
      attributes: true,
    },
  },
});
