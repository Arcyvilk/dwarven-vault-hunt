import { Action } from "../../ArcyScene/types"
import { Item } from "../../../items"

export const Kufer = new Item(
  "kufer",
  { x: 31, y: 6 },
  {
    name: "wooden kufer",
    description: "It's a kufer.",
    quality: "fine",
    wear: 10,
  },
  [
    {
      id: "open",
      key: "",
      type: "item_loot",
      prompt: `Open the %%%`,
      result: "",
      fn: (action: Action) => {
        alert("you open the kufer")
      },
    },
  ],
)
