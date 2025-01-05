import { chooseRandom } from "../../utils"
import { EventBus, EventEmit } from "../events"
import { Action, Location, NPCData } from "../scenes/ArcyScene/types"

export class NPC {
  public id: string
  public data: NPCData
  public location: Location
  public actions: Action<NPC>[]

  constructor(
    id: string,
    location: Location,
    data: NPCData,
    actions: Action<NPC>[],
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
        result: this.getRandomResult(resultsTalk),
        fn: (action: Action<NPC>, entity: NPC) => {
          EventBus.emit(EventEmit.NPC_TALK, entity, action)
        },
      },
      {
        id: "view",
        type: "npc_view",
        key: "",
        prompt: `View the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: this.getRandomResult(resultsView),
        fn: (action: Action<NPC>, entity: NPC) => {
          EventBus.emit(EventEmit.NPC_VIEW, entity, action)
        },
      },
      {
        id: "attack",
        type: "npc_attack",
        key: "",
        prompt: `Attack the ${this.data.species} ${this.data.name} ${this.data.surname}`,
        result: this.getRandomResult(resultsAttack),
        fn: (action: Action<NPC>, entity: NPC) => {
          EventBus.emit(EventEmit.NPC_ATTACK, entity, action)
        },
      },
    ]
  }

  getRandomResult(answers: string[]) {
    return chooseRandom(answers)
      .replace("%species%", this.data.species ?? "")
      .replace("%name%", this.data.name ?? "")
      .replace("%surname%", this.data.surname ?? "")
  }
}

const resultsAttack = [
  `You attack the %species% %name% %surname% but they roll away!`,
]
const resultsTalk = [`%species% %name% %surname% does not seem very talkative!`]
const resultsView = [`You admire the %species% %name% %surname%!`]
