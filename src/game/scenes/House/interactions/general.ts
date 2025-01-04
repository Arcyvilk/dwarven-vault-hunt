import { Interaction } from "../../ArcyScene/types"

export const generalInteractions: Interaction[] = [
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
