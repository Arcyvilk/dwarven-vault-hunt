import { EventBus, EventEmit } from "../../../events"
import { Item } from "../../../items"
import { Action } from "../../ArcyScene/types"

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
      type: "item_other",
      prompt: `Open the %%%`,
      result:
        "This kufer is full of blankets, douvets and other good night sleep accessories.",
      fn: (action: Action<Item>, entity: Item) => {
        EventBus.emit(EventEmit.ITEM_OTHER, entity, action)
      },
    },
  ],
)
