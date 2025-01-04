import PhaserRaycaster from "phaser-raycaster"
import { Scene } from "phaser"
import { EventBus } from "../../EventBus"
import { ItemInteraction } from "./types"
import { NPC } from "../../npcs/NPC"

export class ArcyScene extends Scene {
  // Basic map related props
  tileSize: number = 64
  map: Phaser.Tilemaps.Tilemap
  layers: Record<string, Phaser.Tilemaps.TilemapLayer> = {}
  player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  // Interactions with items on the map
  itemInteractions: ItemInteraction[] = []
  npcs: NPC[] = []

  // Body and light collission props
  collisionLayers: Phaser.Tilemaps.TilemapLayer[]
  rayCollisionLayers: Phaser.Tilemaps.TilemapLayer[]

  // Raycaster props
  raycasterPlugin: PhaserRaycaster
  raycaster: Raycaster
  ray: Raycaster.Ray
  rayIntersections: Phaser.Geom.Point[]
  graphics: Phaser.GameObjects.Graphics
  maskGraphics: Phaser.GameObjects.Graphics
  mask: Phaser.Display.Masks.GeometryMask
  fov: Phaser.GameObjects.Graphics

  // Control and view props
  camera: Phaser.Cameras.Scene2D.Camera
  controls: Phaser.Cameras.Controls.FixedKeyControl
  cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(sceneName: string, itemInteractions: ItemInteraction[]) {
    super(sceneName)
    this.itemInteractions = itemInteractions
  }

  customPreload(tilemapName: string, tilemapPath: string) {
    this.load.setBaseURL("https://cdn.arcyvilk.com/dwarven_grail_hunters")
    this.load.tilemapTiledJSON(tilemapName, tilemapPath)
    this.load.image("player", "player.png")
  }

  preLayerLoad(
    tilemapName: string,
    playerStartX: number,
    playerStartY: number,
  ) {
    this.map = this.make.tilemap({
      key: tilemapName,
      tileWidth: this.tileSize,
      tileHeight: this.tileSize,
    })
    this.setBounds()
    this.setControls()

    this.setPlayer(playerStartX, playerStartY)
    this.setPlayerMovement()
  }

  postLayerLoad() {
    Object.values(this.layers).forEach((layer) => layer.setScale(2))
    this.setLightningMask()
    this.setRaycasting()
  }

  setBounds() {
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * 2,
      this.map.heightInPixels * 2,
    )
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels * 2,
      this.map.heightInPixels * 2,
    )
  }

  setControls() {
    this.cursors = this.input.keyboard!.createCursorKeys()
    const controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      speed: this.tileSize,
    }
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig)
  }

  setPlayer(playerStartX: number, playerStartY: number) {
    this.player = this.physics.add.image(playerStartX, playerStartY, "player")
    this.player.setCollideWorldBounds(true)
    this.player.setDepth(5)

    // Attach camera to player
    this.cameras.main.setRoundPixels(true)
    this.cameras.main.startFollow(this.player, true)
  }

  setLightningMask() {
    this.graphics = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
        alpha: 0.3,
      },
    })

    // create FoV
    this.maskGraphics = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
        alpha: 0,
      },
    })
    this.mask = new Phaser.Display.Masks.GeometryMask(this, this.maskGraphics)
    this.mask.setInvertAlpha()
    this.fov = this.add
      .graphics({
        fillStyle: {
          color: 0x000000,
          alpha: 0.925,
        },
      })
      .setDepth(29)
    this.fov.setMask(this.mask)
    this.fov.fillRect(
      0,
      0,
      this.map.widthInPixels * 2,
      this.map.heightInPixels * 2,
    )

    //set depths
    this.fov.setDepth(1)
    this.graphics.setDepth(3)

    this.rayCollisionLayers.forEach((rayCollisionLayer) => {
      rayCollisionLayer.setDepth(1)
    })
  }

  setRaycasting() {
    this.raycaster = this.raycasterPlugin.createRaycaster({
      autoUpdate: false,
    })

    this.rayCollisionLayers.forEach((rayCollisionLayer) => {
      this.raycaster.mapGameObjects(rayCollisionLayer, true, {
        collisionTiles: rayCollisionLayer.layer.collideIndexes,
      })
    })

    this.ray = this.raycaster.createRay()
    this.updateRays()
  }

  setPlayerMovement() {
    this.input.keyboard!.on("keydown-LEFT", () => {
      if (this.isObstacle("left")) return
      this.player.x -= this.tileSize
      this.updateRays()
    })
    this.input.keyboard!.on("keydown-RIGHT", () => {
      if (this.isObstacle("right")) return
      this.player.x += this.tileSize
      this.updateRays()
    })
    this.input.keyboard!.on("keydown-UP", () => {
      if (this.isObstacle("up")) return
      this.player.y -= this.tileSize
      this.updateRays()
    })
    this.input.keyboard!.on("keydown-DOWN", () => {
      if (this.isObstacle("down")) return
      this.player.y += this.tileSize
      this.updateRays()
    })
  }

  updateRays() {
    this.ray.setOrigin(this.player.x, this.player.y)
    this.rayIntersections = this.ray.castCircle()
    this.drawRays()
  }

  drawRays() {
    this.graphics.clear()
    this.maskGraphics.clear()
    this.maskGraphics.fillPoints(this.rayIntersections)

    // draw rays
    for (const intersection of this.rayIntersections) {
      // @ts-expect-error this works as intended
      this.graphics.strokeLineShape({
        x1: this.ray.origin.x,
        y1: this.ray.origin.y,
        x2: intersection.x,
        y2: intersection.y,
      })

      this.graphics.fillStyle(0xff00ff)
      //draw ray origin
      this.graphics.fillPoint(this.ray.origin.x, this.ray.origin.y, 3)
    }
  }

  isObstacle(direction: "left" | "right" | "down" | "up") {
    const getTilePosition = (): number[] => {
      if (direction === "left") {
        return [this.player.x - this.tileSize, this.player.y]
      }
      if (direction === "right") {
        return [this.player.x + this.tileSize, this.player.y]
      }
      if (direction === "down") {
        return [this.player.x, this.player.y + this.tileSize]
      }
      if (direction === "up") {
        return [this.player.x, this.player.y - this.tileSize]
      }
      return [0, 0]
    }

    // Get position of the tile where player will move to soon
    const [x, y] = getTilePosition()

    // Check if the tile is present in any of the "collision" layers
    const collisionTiles = this.collisionLayers.map((layer) =>
      layer.getTileAtWorldXY(x, y, true),
    )

    // If yes, the tile is impassable and we have to block player from moving through it
    const obstacle = collisionTiles.find((tile) => tile.index !== -1)
    if (obstacle) {
      this.checkForInteraction(obstacle)
      return true
    }
    return false
  }

  checkForInteraction(obstacle: Phaser.Tilemaps.Tile) {
    EventBus.emit("obstacleFound", obstacle.x, obstacle.y)
    this.checkForItemInteraction(obstacle)
    this.checkForNPCInteraction(obstacle)
  }

  checkForItemInteraction(obstacle: Phaser.Tilemaps.Tile) {
    const interaction = this.itemInteractions.find(
      (item) => item.x === obstacle.x && item.y === obstacle.y,
    )
    // If no item interaction, the undefined is emit anyway
    EventBus.emit("itemInteraction", interaction)
  }

  checkForNPCInteraction(obstacle: Phaser.Tilemaps.Tile) {
    const npc = this.npcs.find(
      (npc) => npc.location.x === obstacle.x && npc.location.y === obstacle.y,
    )
    // If no npc interaction, the undefined is emit anyway
    EventBus.emit("npcInteraction", npc)
  }
}
