import { ArcyScene } from "./ArcyScene"

export class Preloader extends ArcyScene {
  constructor() {
    super("Preloader")
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "loading")

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    this.load.setBaseURL("https://cdn.arcyvilk.com/dwarven_grail_hunters")
    this.preloadLayerImagesHouse()
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the House. You could also swap this for a Scene Transition, such as a camera fade.
    this.changeScene("House")
  }

  // Preload images that are used in the "House" scene
  preloadLayerImagesHouse() {
    this.load.image("wall_wooden", "df_tilesets/wall_wooden.png")
    this.load.image(
      "floor_stone_engraved_palette",
      "df_tilesets/floor_stone_engraved_palette.png",
    )
    this.load.image("glass_floor", "df_tilesets/glass_floor.png")
    this.load.image("wooden_floor", "df_tilesets/wooden_floor.png")
    this.load.image("fortification_wood", "df_tilesets/fortification_wood.png")
    this.load.image("building_icons", "df_tilesets/building_icons.png")
    this.load.image("stockpile", "df_tilesets/stockpile.png")
    this.load.image("item_tool", "df_tilesets/item_tool.png")
    this.load.image("items3", "df_tilesets/items3.png")
    this.load.image("instruments", "df_tilesets/instruments.png")
    this.load.image("hidden_rock", "df_tilesets/hidden_rock.png")
  }
}
