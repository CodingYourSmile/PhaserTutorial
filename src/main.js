import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js"

export default new Phaser.Game(
    {
        //Canvas and WebGL are two different ways Phaser can render your game in the browser.
        type: Phaser.AUTO,          //Phaser will decide to use Canvas or WebGL mode depending on the browser and device.
        //Setting the game screen size
        width: 480, 
        height: 640,
        scene: Game,
        //arcade physics
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y:200
                },
                debug: true
            }
        }
    }
);