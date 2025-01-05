import { ArcyScene } from "../ArcyScene"
import { Entrance } from "./interactions/general"

export class Fornebu extends ArcyScene {
  constructor() {
    super("Fornebu")
    this.items = [Entrance]
  }

  preload() {
    this.customPreload("map_fornebu", "map_fornebu.json")
  }

  create() {
    this.customCreate()
    this.preLayerLoad("map_fornebu", 5920, 3040)
    this.loadLayers(this.map)
    this.postLayerLoad()
    this.setSceneReady()
  }

  update(/**time, delta */) {
    // something
  }

  loadLayers(map: Phaser.Tilemaps.Tilemap) {
    const tiles_buildings = map.addTilesetImage(
      "building_icons",
      "building_icons",
    )
    const tiles_floors = map.addTilesetImage("floors", "floors")
    const tiles_liquids = map.addTilesetImage("liquids", "liquids")
    const tiles_tree_maple = map.addTilesetImage("tree_maple", "tree_maple")
    const tiles_tree_saplings = map.addTilesetImage(
      "tree_saplings",
      "tree_saplings",
    )
    const tiles_grass_flowers = map.addTilesetImage(
      "grass_flowers",
      "grass_flowers",
    )

    this.layers.layerPaths = map.createLayer("paths", [tiles_floors!], 0, 0)!
    this.layers.layerWater = map.createLayer("water", [tiles_liquids!], 0, 0)!
    this.layers.layerBigPlants = map.createLayer(
      "big_plants",
      [tiles_tree_maple!, tiles_tree_saplings!],
      0,
      0,
    )!
    this.layers.layerSmallPlants = map.createLayer(
      "small_plants",
      [tiles_tree_maple!, tiles_tree_saplings!],
      0,
      0,
    )!
    this.layers.layerFloors = map.createLayer(
      "floors",
      [tiles_floors!, tiles_grass_flowers!],
      0,
      0,
    )!
    this.layers.layerBuildings = map.createLayer(
      "buildings",
      [tiles_buildings!],
      0,
      0,
    )!
    this.layers.layerItems = map.createLayer("items", [tiles_buildings!], 0, 0)!

    this.layers.layerBuildings?.setCollisionByExclusion([-1])
    this.layers.layerBigPlants?.setCollisionByExclusion([-1])

    this.collisionLayers = [
      this.layers.layerItems,
      this.layers.layerBuildings,
      this.layers.layerBigPlants,
      this.layers.layerWater,
    ]
    this.rayCollisionLayers = [
      this.layers.layerBuildings,
      this.layers.layerBigPlants,
    ]

    // Those cast rays but should be visible
    this.layers.layerBigPlants.setDepth(2)
    // this.layers.layerItems.setDepth(2)
  }
}
