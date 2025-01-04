import { ItemInteraction } from "../../ArcyScene/types"

export const generalInteractions: ItemInteraction[] = [
  {
    id: "exit",
    x: 37,
    y: 2,
    actions: [
      {
        id: "leave",
        description: "Leave the home",
        type: "simple",
      },
    ],
    name: "Door",
    description: "Door.",
  },
]
