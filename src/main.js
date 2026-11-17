import { KitchenScene } from './scenes/KitchenScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [KitchenScene]
};

const game = new Phaser.Game(config);