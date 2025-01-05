import { EventBus, EventEmit } from "../events"
import { Action, Location, NPCData } from "../scenes/ArcyScene/types"

export class NPC {
  public id: string
  public data: NPCData
  public location: Location
  public actions: Action[]

  constructor(
    id: string,
    location: Location,
    data: NPCData,
    actions: Action[],
  ) {
    this.id = id
    this.data = data
    this.location = location
    this.actions = [
      // The actions from props must be first because when we search for action by its id
      // the first one will take precendence over the rest
      ...actions,
      {
        id: "talk",
        type: "npc_talk",
        key: "",
        prompt: `Start new conversation with the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `${this.data.species} ${this.data.name} ${this.data.surname} does not seem very talkative!`,
        fn: (action: Action) => {
          EventBus.emit(EventEmit.NPC_TALK, this, action)
        },
      },
      {
        id: "view",
        type: "npc_view",
        key: "",
        prompt: `View the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `You admire the ${this.data.species} ${this.data.name} ${this.data.surname}!`,
        fn: (action: Action) => {
          EventBus.emit(EventEmit.NPC_VIEW, this, action)
        },
      },
      {
        id: "attack",
        type: "npc_attack",
        key: "",
        prompt: `Attack the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: `You attack the ${this.data.species} ${this.data.name} ${this.data.surname} but they roll away!`,
        fn: (action: Action) => {
          EventBus.emit(EventEmit.NPC_ATTACK, this, action)
        },
      },
    ]
  }
}
