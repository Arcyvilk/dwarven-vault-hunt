// import { EventBus } from '../../EventBus';
import { Scene } from 'phaser';

export class Home extends Scene
{
    controls: any
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: any
    cursors: any
    playerLight: Phaser.GameObjects.Light

    tileSize: number;

    // Layers
    layerWalls: Phaser.Tilemaps.TilemapLayer
    layerFloor: Phaser.Tilemaps.TilemapLayer
    layerFurniture: Phaser.Tilemaps.TilemapLayer
    layerItems: Phaser.Tilemaps.TilemapLayer
    layerStockpiles: Phaser.Tilemaps.TilemapLayer
    layerDoor: Phaser.Tilemaps.TilemapLayer

    constructor ()
    {
        super('Home');
        this.tileSize = 64
    }

    preload() {
        this.load.setBaseURL('https://cdn.arcyvilk.com/dwarven_grail_hunters')
        this.load.tilemapTiledJSON('map_home', 'map.json')

        // Load environment sprites
        this.load.image('wall_wooden', "df_tilesets/wall_wooden.png")
        this.load.image('floor_stone_engraved_palette', "df_tilesets/floor_stone_engraved_palette.png")
        this.load.image('glass_floor', "df_tilesets/glass_floor.png")
        this.load.image('wooden_floor', "df_tilesets/wooden_floor.png")
        this.load.image('fortification_wood', "df_tilesets/fortification_wood.png")
        this.load.image('building_icons', "df_tilesets/building_icons.png")
        this.load.image('stockpile', "df_tilesets/stockpile.png")
        this.load.image('item_bookcase', "df_tilesets/item_bookcase.png")
        this.load.image('items3', "df_tilesets/items3.png")
        this.load.image('hidden_rock', "df_tilesets/hidden_rock.png")
        // Load player sprite
        this.load.image('player', 'df_tilesets/floor_stone_engraved_palette.png')
    }

    create () {
        const map = this.make.tilemap({ key: 'map_home', tileWidth: this.tileSize, tileHeight: this.tileSize })
        this.loadLayers(map)
        this.setBounds(map)
        this.setControls()

        this.setPlayer()
        this.setPlayerMovement()
        this.setCollission()
    }

    update(/**time, delta */) {
        // something
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    setBounds(map: Phaser.Tilemaps.Tilemap) {
        this.cameras.main.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2);
        this.physics.world.setBounds(0, 0, map.widthInPixels * 2, map.heightInPixels * 2);
    }

    setControls() {
        this.cursors = this.input!.keyboard!.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: this.tileSize
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    }

    setPlayer() {
        // Create player sprite and its logic
        this.player = this.physics.add.image(32 + this.tileSize*10, 32 + this.tileSize*5, 'player')
            .setScale(2)
        this.player.setCollideWorldBounds(true)

        // Attach camera to player
        this.cameras.main.setRoundPixels(true)
        this.cameras.main.startFollow(this.player, true)

        // Enable light behind player
        this.lights.enable().setAmbientColor(0x000000)
        this.playerLight = this.lights.addLight(0,0, 400, 0xffffff, 2)
        this.playerLight.x = this.player.x
        this.playerLight.y = this.player.y
    }

    setPlayerMovement() {
        this.input.keyboard!.on('keydown-LEFT', () => {
            if (this.isTileCollider('left')) return;
            this.player.x -= this.tileSize
            this.playerLight.x -=this.tileSize
        })
        this.input.keyboard!.on('keydown-RIGHT', () => {
            if (this.isTileCollider('right')) return;
            this.player.x += this.tileSize
            this.playerLight.x += this.tileSize
        })
        this.input.keyboard!.on('keydown-UP', () => {
            if (this.isTileCollider('up')) return;
            this.player.y -= this.tileSize
            this.playerLight.y -= this.tileSize
        })
        this.input.keyboard!.on('keydown-DOWN', () => {
            if (this.isTileCollider('down')) return;
            this.player.y += this.tileSize
            this.playerLight.y +=this.tileSize
        })
    }

    loadLayers(map: Phaser.Tilemaps.Tilemap) {
        const tiles_wall_wooden = map.addTilesetImage('wall_wooden', "wall_wooden");
        const tiles_floor_stone_engraved_palette = map.addTilesetImage('floor_stone_engraved_palette', "floor_stone_engraved_palette");
        const tiles_glass_floor = map.addTilesetImage('glass_floor', "glass_floor");
        const tiles_wooden_floor = map.addTilesetImage('wooden_floor', "wooden_floor");
        const tiles_fortification_wood = map.addTilesetImage('fortification_wood', "fortification_wood");
        const tiles_building_icons = map.addTilesetImage('building_icons', "building_icons");
        const tiles_stockpile = map.addTilesetImage('stockpile', "stockpile");
        const tiles_item_bookcase = map.addTilesetImage('item_bookcase', "item_bookcase");
        const tiles_items3 = map.addTilesetImage('items3', "items3");
        const tiles_hidden_rock = map.addTilesetImage('hidden_rock', "hidden_rock");
    
        this.layerFloor = map.createLayer('floor', [tiles_floor_stone_engraved_palette!, tiles_glass_floor!, tiles_wooden_floor!, tiles_building_icons!], 0, 0)!;
        this.layerWalls = map.createLayer('walls', [tiles_wall_wooden!,tiles_fortification_wood!, tiles_hidden_rock!], 0, 0)!;
        this.layerFurniture = map.createLayer('furniture', [tiles_building_icons!, tiles_item_bookcase!], 0, 0)!;
        this.layerStockpiles = map.createLayer('stockpiles', tiles_stockpile!, 0, 0)!;
        this.layerItems = map.createLayer('items', [tiles_item_bookcase!, tiles_items3!], 0, 0)!;
        this.layerDoor = map.createLayer('door', [tiles_building_icons!], 0, 0)!;
    
        this.layerFloor?.setScale(2).setPipeline('Light2D')
        this.layerWalls?.setScale(2).setPipeline('Light2D').setCollisionByExclusion([-1])
        this.layerFurniture?.setScale(2).setPipeline('Light2D').setCollisionByExclusion([-1])
        this.layerStockpiles?.setScale(2).setPipeline('Light2D')
        this.layerItems?.setScale(2).setPipeline('Light2D')
        this.layerDoor?.setScale(2).setPipeline('Light2D').setCollisionByExclusion([-1])
    }

    setCollission() {
        this.physics.add.collider(this.player, this.layerWalls)
        this.physics.add.collider(this.player, this.layerFurniture)
    }

    isTileCollider(direction: 'left'|'right'|'down'|'up') {
        const getTilePosition = (): number[] => {
            if (direction === 'left') {
                return [this.player.x - this.tileSize, this.player.y]
            }
            if (direction === 'right') {
                return [this.player.x + this.tileSize, this.player.y]
            }
            if (direction === 'down') {
                return [this.player.x, this.player.y + this.tileSize]
            }
            if (direction === 'up') {
                return [this.player.x, this.player.y - this.tileSize]
            }
            return [0,0]
        }

        // Get position of the tile where player will move to soon
        const [x, y] = getTilePosition()

        // Check if the tile is present in any of the "collission" layers
        const collissionLayers = [this.layerWalls, this.layerFurniture]
        const collissionTiles = collissionLayers.map(layer => 
            layer.getTileAtWorldXY(x, y, true).index
        )
        
        // If yes, the tile is impassable and we have to block player from moving through it
        if (collissionTiles.some(index => index !== -1)) return true
        return false
    }
}

