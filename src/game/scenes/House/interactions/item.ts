import { ItemInteraction } from "../../ArcyScene/types"

export const itemInteractions: ItemInteraction[] = [
  {
    id: "kufer",
    x: 31,
    y: 6,
    actions: [
      {
        id: "view",
        description: "View the kufer",
        type: "simple",
        fn: () => {
          alert("you look at the kufer")
        },
      },
      {
        id: "open",
        description: "Open the kufer",
        type: "simple",
        fn: () => {
          alert("you open the kufer")
        },
      },
    ],
    name: "Kufer",
    description: "It's a kufer.",
  },
]
