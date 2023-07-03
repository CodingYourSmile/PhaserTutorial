import Phaser from "../lib/phaser.js";

//Our Game Scene will be a class that extends from the base Phaser.Scene.
export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game');
    }

    preload()
    {
        //Preloading image for background
        this.load.image("background", "assets/Background/bg_layer1.png");
        //Preloading image for platform
        this.load.image("platform", "assets/Environment/ground_grass.png");
    }

    create()
    {
        //Adding the background to the scene
        this.add.image(240, 320, "background");
        //Adding the platform to the scene
        //this.physics.add.staticImage(240, 320, "platform").setScale(0.5);
        
        //Creating multiple platforms
        const platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 5; i++)
        {
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;

            const platform = platforms.create(x, y, "platform");
            platform.scale = 0.5;

            //Collsion mask size
            const body = platform.body;
            body.updateFromGameObject();
        }
    }
}