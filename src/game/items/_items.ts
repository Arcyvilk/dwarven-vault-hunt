import { chooseRandom } from "../../utils"
import { EventBus, EventEmit } from "../events"
import { Action, ItemData, Location } from "../scenes/ArcyScene/types"

export class Item {
  public id: string
  public data: ItemData
  public location: Location
  public actions: Action[]

  constructor(
    id: string,
    location: Location,
    data: ItemData,
    actions: Action[],
  ) {
    this.id = id
    this.data = data
    this.location = location

    this.setItemModifiers()

    this.actions = [
      // The actions from props must be first because when we search for action by its id
      // the first one will take precendence over the rest
      ...actions.map((a: Action) => ({
        ...a,
        prompt: a.prompt.replace("%%%", this.data.name),
      })),
      {
        id: "view",
        type: "item_view",
        key: "",
        prompt: `View the ${this.data.name}`,
        result: this.getRandomResult(resultsView),
        fn: (action: Action) => {
          EventBus.emit(EventEmit.ITEM_VIEW, this, action)
        },
      },
    ]
  }

  setItemModifiers() {
    this.setItemDecoration()
    this.setItemWear()
    this.setItemQuality()
  }

  setItemDecoration() {
    if (this.data.isDecorated) {
      this.data.name = `«${this.data.name}»`
    }
  }

  setItemQuality() {
    if (this.data.quality === "well") {
      this.data.name = `-${this.data.name}-`
    }
    if (this.data.quality === "fine") {
      this.data.name = `+${this.data.name}+`
    }
    if (this.data.quality === "superior") {
      this.data.name = `*${this.data.name}*`
    }
    if (this.data.quality === "exceptional") {
      this.data.name = `≡${this.data.name}≡`
    }
    if (this.data.quality === "masterful") {
      this.data.name = `☼${this.data.name}☼`
    }
  }

  setItemWear() {
    this.data.wear = this.data.wear ?? 100

    if (this.data.wear <= 25) {
      this.data.name = `XX(${this.data.name})XX`
      return
    }
    if (this.data.wear <= 50) {
      this.data.name = `X(${this.data.name})X`
      return
    }
    if (this.data.wear <= 75) {
      this.data.name = `x(${this.data.name})x`
      return
    }
  }

  getRandomResult(answers: string[]) {
    return chooseRandom(answers).replace("%name%", this.data.name ?? "")
  }
}

const resultsView = [`You admire the %name%!`]
