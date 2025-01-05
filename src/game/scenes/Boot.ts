import { ArcyScene } from "./ArcyScene"

export class Boot extends ArcyScene {
  constructor() {
    super("Boot")
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.image("loading", "assets/loading.png")
  }

  create() {
    this.changeScene("Preloader")
  }
}
