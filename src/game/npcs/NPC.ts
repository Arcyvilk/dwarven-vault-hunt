import { NPCAction, NPCData, NPCLocation } from "./types"

export class NPC {
  public npc: NPCData
  public location: NPCLocation
  public actions: NPCAction[]

  constructor(npcLocation: NPCLocation, npcData: NPCData) {
    this.npc = npcData
    this.location = npcLocation
    this.actions = [
      {
        type: "talk",
        description: `Start new conversation with the ${this.npc.species} ${this.npc.name} ${this.npc.surname}`,
      },
      {
        type: "view",
        description: `View the ${this.npc.species} ${this.npc.name} ${this.npc.surname}`,
      },
      {
        type: "attack",
        description: `Attack the ${this.npc.species} ${this.npc.name} ${this.npc.surname}`,
      },
    ]
  }

  onTalk() {
    return this.actions.find((action) => action.type === "talk")
  }

  onView() {
    return this.actions.find((action) => action.type === "view")
  }

  onAttack() {
    return this.actions.find((action) => action.type === "attack")
  }
}
