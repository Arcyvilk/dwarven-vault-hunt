import { Boot } from './scenes/Boot';
import { Home } from './scenes/Home';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import PhaserRaycaster from 'phaser-raycaster';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    parent: 'game-container',
    backgroundColor: '#ffffff',
    scene: [
        Boot,
        Preloader,
        Home,
        MainMenu,
        MainGame,
        GameOver
    ],
    plugins: {
        scene: [{
            key: 'PhaserRaycaster',
            plugin: PhaserRaycaster,
            mapping: 'raycasterPlugin'
        }]
    }
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
