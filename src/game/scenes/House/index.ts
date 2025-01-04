import { ArcyScene } from "../ArcyScene"
import { interactions } from "./interactions"

export class House extends ArcyScene {
  constructor() {
    super("House", interactions)
  }

  preload() {
    this.customPreload("map_home", "map_home.json")
    this.preloadLayerImages()
  }

  create() {
    this.preLayerLoad("map_home", 1888, 736)
    this.loadLayers(this.map)
    this.postLayerLoad()
  }

  update(/**time, delta */) {
    // something
  }

  preloadLayerImages() {
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

  loadLayers(map: Phaser.Tilemaps.Tilemap) {
    const tiles_wall_wooden = map.addTilesetImage("wall_wooden", "wall_wooden")
    const tiles_floor_stone_engraved_palette = map.addTilesetImage(
      "floor_stone_engraved_palette",
      "floor_stone_engraved_palette",
    )
    const tiles_glass_floor = map.addTilesetImage("glass_floor", "glass_floor")
    const tiles_wooden_floor = map.addTilesetImage(
      "wooden_floor",
      "wooden_floor",
    )
    const tiles_fortification_wood = map.addTilesetImage(
      "fortification_wood",
      "fortification_wood",
    )
    const tiles_building_icons = map.addTilesetImage(
      "building_icons",
      "building_icons",
    )
    const tiles_stockpile = map.addTilesetImage("stockpile", "stockpile")
    const tiles_item_tool = map.addTilesetImage("item_tool", "item_tool")
    const tiles_items3 = map.addTilesetImage("items3", "items3")
    const tiles_hidden_rock = map.addTilesetImage("hidden_rock", "hidden_rock")
    const tiles_instruments = map.addTilesetImage("instruments", "instruments")

    this.layers.layerFloor = map.createLayer(
      "floor",
      [
        tiles_floor_stone_engraved_palette!,
        tiles_glass_floor!,
        tiles_wooden_floor!,
        tiles_building_icons!,
      ],
      0,
      0,
    )!
    this.layers.layerWalls = map.createLayer(
      "walls",
      [tiles_wall_wooden!, tiles_fortification_wood!, tiles_hidden_rock!],
      0,
      0,
    )!
    this.layers.layerFurniture = map.createLayer(
      "furniture",
      [tiles_building_icons!, tiles_item_tool!],
      0,
      0,
    )!
    this.layers.layerStockpiles = map.createLayer(
      "stockpiles",
      tiles_stockpile!,
      0,
      0,
    )!
    this.layers.layerItems = map.createLayer(
      "items",
      [
        tiles_item_tool!,
        tiles_wall_wooden!,
        tiles_items3!,
        tiles_instruments!,
        tiles_building_icons!,
      ],
      0,
      0,
    )!
    this.layers.layerDoor = map.createLayer(
      "door",
      [tiles_building_icons!],
      0,
      0,
    )!
    this.layers.npc = map.createLayer("npc", [tiles_building_icons!], 0, 0)!

    this.layers.layerWalls?.setCollisionByExclusion([-1])

    this.collisionLayers = [
      this.layers.layerWalls,
      this.layers.layerFurniture,
      this.layers.npc,
    ]
    this.rayCollisionLayers = [this.layers.layerWalls]
  }
}
