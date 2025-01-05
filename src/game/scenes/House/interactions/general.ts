import { EventBus, EventEmit } from "../../../events"
import { Item } from "../../../items/"

export const Exit = new Item(
  "exit",
  { x: 37, y: 2 },
  {
    name: "",
    rawName: "exit door",
    description: "It's a door.",
    weight: 100,
  },
  [
    {
      id: "leave",
      type: "other",
      key: "",
      prompt: "Leave the home",
      result: "",
      fn: () => {
        EventBus.emit(EventEmit.CHANGE_SCENE, "GameOver")
      },
    },
  ],
)
