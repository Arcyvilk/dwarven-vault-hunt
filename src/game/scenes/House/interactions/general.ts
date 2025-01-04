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
        fn: () => {
          alert("you leave the home")
        },
      },
    ],
    name: "Door",
    description: "Door.",
  },
]
