import { Action, ItemInteraction } from "../../ArcyScene/types"

export const itemInteractions: ItemInteraction[] = [
  {
    id: "kufer",
    x: 31,
    y: 6,
    actions: [
      {
        id: "view",
        type: "item_view",
        key: "",
        prompt: "View the kufer",
        result: "",
        fn: (action: Action) => {
          alert("you look at the kufer")
        },
      },
      {
        id: "open",
        key: "",
        type: "item_loot",
        prompt: "Open the kufer",
        result: "",
        fn: (action: Action) => {
          alert("you open the kufer")
        },
      },
    ],
    name: "Kufer",
    description: "It's a kufer.",
  },
]
