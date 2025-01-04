import { Driller } from "../../npcs/Driller"
import { ArcyScene } from "../ArcyScene"
import { interactions } from "./interactions"

export class House extends ArcyScene {
  constructor() {
    super("House", interactions)
    this.npcs = [Driller]
  }

  preload() {
    this.customPreload("map_home", "map_home.json")
  }

  create() {
    this.preLayerLoad("map_home", 1888, 736)
    this.loadLayers(this.map)
    this.postLayerLoad()
  }

  update(/**time, delta */) {
    // something
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
