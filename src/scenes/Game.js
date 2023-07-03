import Phaser from "../lib/phaser.js";

//Our Game Scene will be a class that extends from the base Phaser.Scene.
export default class Game extends Phaser.Scene
{

    player; //player is now a property of class Game
    platforms; // platform is now a property of class Game

    constructor()
    {
        super("game");
    }

    preload()
    {
        //Preloading image for background
        this.load.image("background", "assets/Background/bg_layer1.png");
        //Preloading image for platform
        this.load.image("platform", "assets/Environment/ground_grass.png");

        //Preloading image for player
        this.load.image("bunny-stand", "assets/Players/bunny1_stand.png");
    }

    create()
    {
        //Adding the background to the scene
        this.add.image(240, 320, "background");
        //Adding the platform to the scene
        //this.physics.add.staticImage(240, 320, "platform").setScale(0.5);
        
        //Creating multiple platforms
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 5; i++)
        {
            const x = Phaser.Math.Between(80, 400);
            const y = 150 * i;

            const platform = this.platforms.create(x, y, "platform");
            platform.scale = 0.5;

            //Collsion mask size
            const body = platform.body;
            body.updateFromGameObject();
        }

        //Creating bunny sprite
        this.player = this.physics.add.sprite(240, 320, "bunny-stand").setScale(0.5);

        //We have to tell it what things should collide with each other by creating a collider like this:
        this.physics.add.collider(this.platforms, this.player);
        //Set the collision check only below the player
        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        //Set the camera to follow the player
        this.cameras.main.startFollow(this.player);
    }

    update() 
    {
        this.platforms.children.iterate( child => {} )
        const touchingDown = this.player.body.touching.down;

        if (touchingDown) {
            this.player.setVelocityY(-300);
        }
    }
}