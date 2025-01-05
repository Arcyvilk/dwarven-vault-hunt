import { EventBus, EventEmit } from "../../../events"
import { Item } from "../../../items/"

export const Entrance = new Item(
  "Entrance",
  { x: 92, y: 46 },
  {
    name: "",
    rawName: "entry door",
    description: "It's a door leading into an apartment block.",
    weight: 100,
  },
  [
    {
      id: "enter",
      type: "other",
      key: "",
      prompt: "Enter the apartment",
      result: "",
      fn: () => {
        EventBus.emit(EventEmit.CHANGE_SCENE, "House", { x: 2336, y: 160 })
      },
    },
  ],
)
