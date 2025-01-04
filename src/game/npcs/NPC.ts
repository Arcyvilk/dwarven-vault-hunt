import { EventBus } from "../EventBus"
import { NPCAction, NPCData, NPCLocation } from "./types"

export class NPC {
  public id: string
  public data: NPCData
  public location: NPCLocation
  public actions: NPCAction[]

  constructor(id: string, npcLocation: NPCLocation, npcData: NPCData) {
    this.id = id
    this.data = npcData
    this.location = npcLocation
    this.actions = [
      {
        type: "talk",
        description: `Start new conversation with the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        fn: () => {
          EventBus.emit("npc_talk", this)
        },
      },
      {
        type: "view",
        description: `View the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        fn: () => {
          EventBus.emit("npc_view", this)
        },
      },
      {
        type: "attack",
        description: `Attack the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        fn: () => {
          EventBus.emit("npc_attack", this)
        },
      },
    ]
  }
}
