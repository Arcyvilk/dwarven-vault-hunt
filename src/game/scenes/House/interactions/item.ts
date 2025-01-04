import { Interaction } from "../../ArcyScene/types"

export const itemInteractions: Interaction[] = [
  {
    id: "kufer",
    x: 31,
    y: 6,
    actions: [
      {
        id: "view",
        description: "View the kufer",
        type: "simple",
        result: "This is a kufer.",
      },
      {
        id: "open",
        description: "Open the kufer",
        type: "simple",
        result:
          "It is full of sheets, pillows, blankets and other similar items.",
      },
    ],
    name: "Kufer",
    description: "It's a kufer.",
  },
]
