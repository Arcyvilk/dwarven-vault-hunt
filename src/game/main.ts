import { AUTO, Game } from "phaser"
import PhaserRaycaster from "phaser-raycaster"

import { Boot } from "./scenes/Boot"
import { House } from "./scenes/House"
import { Preloader } from "./scenes/Preloader"
import { GameOver } from "./scenes/GameOver"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  pixelArt: true,
  physics: {
    default: "arcade",
  },
  parent: "game-container",
  backgroundColor: "#000000",
  scene: [Boot, Preloader, House, GameOver],
  plugins: {
    scene: [
      {
        key: "PhaserRaycaster",
        plugin: PhaserRaycaster,
        mapping: "raycasterPlugin",
      },
    ],
  },
}

const StartGame = (parent: string) => {
  return new Game({ ...config, parent })
}

export default StartGame
