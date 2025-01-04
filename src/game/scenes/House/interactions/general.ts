import { Action, ItemInteraction } from "../../ArcyScene/types"

export const generalInteractions: ItemInteraction[] = [
  {
    id: "exit",
    x: 37,
    y: 2,
    actions: [
      {
        id: "leave",
        type: "other",
        key: "",
        prompt: "Leave the home",
        result: "",
        fn: (action: Action) => {
          alert("you leave the home")
        },
      },
    ],
    name: "Door",
    description: "Door.",
  },
]
