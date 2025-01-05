import { Item } from "../../../items"

export const Kufer = new Item(
  "kufer",
  { x: 31, y: 6 },
  {
    name: "",
    rawName: "wooden kufer",
    description: "It's a kufer.",
    quality: "fine",
    decoration: "a folk-style flowers and other nature depictions",
    wear: 30,
    weight: 400,
  },
  [
    {
      id: "open",
      key: "",
      type: "item_loot",
      prompt: `Open the %%%`,
      result: "",
      fn: () => {
        alert("You open the kufer")
      },
    },
  ],
)
