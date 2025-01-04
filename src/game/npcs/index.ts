import { EventBus } from "../EventBus"
import { Action, NPCData, NPCLocation } from "../scenes/ArcyScene/types"

export class NPC {
  public id: string
  public data: NPCData
  public location: NPCLocation
  public actions: Action[]

  constructor(id: string, npcLocation: NPCLocation, npcData: NPCData) {
    this.id = id
    this.data = npcData
    this.location = npcLocation
    this.actions = [
      {
        id: "talk",
        type: "npc_talk",
        key: "",
        prompt: `Start new conversation with the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `${this.data.species} ${this.data.name} ${this.data.surname} does not seem very talkative!`,
        fn: (action: Action) => {
          EventBus.emit("npc_talk", this, action)
        },
      },
      {
        id: "view",
        type: "npc_view",
        key: "",
        prompt: `View the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `You admire the ${this.data.species} ${this.data.name} ${this.data.surname}!`,
        fn: (action: Action) => {
          EventBus.emit("npc_view", this, action)
        },
      },
      {
        id: "attack",
        type: "npc_attack",
        key: "",
        prompt: `Attack the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `You attack the ${this.data.species} ${this.data.name} ${this.data.surname} but they roll away!`,
        fn: (action: Action) => {
          EventBus.emit("npc_attack", this, action)
        },
      },
    ]
  }
}
