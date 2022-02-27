import EndScene from './EndScene.js';
import GameScene from './GameScene.js';
import StartScene from './StartScene.js';

/**
 * Configuration of the game
 */
const configurations = {
    type: Phaser.AUTO,
    backgroundColor: '#FFFFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debut: true,
        },
    },
    scene: [StartScene, GameScene, EndScene],
};

/**
 * The main controller for the entire Phaser game.
 * 
 * @name game
 * @type {object}
 */
new Phaser.Game(configurations);