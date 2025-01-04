import { EventBus } from "../game/EventBus"
import { NPC } from "../game/npcs/NPC"

export const useEventNPC = () => {
  EventBus.on("npc_view", (npc: NPC) => {
    alert(`You look at ${npc.data.name}`)
  })

  EventBus.on("npc_talk", (npc: NPC) => {
    alert(`You talk to ${npc.data.name}`)
  })

  EventBus.on("npc_attack", (npc: NPC) => {
    alert(`You attacked ${npc.data.name}`)
  })
}
