import { EventBus, EventEmit } from "../../../events"
import { Item } from "../../../items/"

export const Exit = new Item(
  "exit",
  { x: 37, y: 2 },
  {
    name: "exit door",
    description: "It's a door.",
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
