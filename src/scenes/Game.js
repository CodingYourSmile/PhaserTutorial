import Phaser from "../lib/phaser.js";

//Our Game Scene will be a class that extends from the base Phaser.Scene.
export default class Game extends Phaser.Scene
{

    player; //player is now a property of class Game
    platforms; // platform is now a property of class Game
    cursors; //property to use the keyboard

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

        //Preloading the controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        //Adding the background to the scene
        this.add.image(240, 320, "background").setScrollFactor(1,0);
        //Adding the platform to the scene
        //this.physics.add.staticImage(240, 320, "platform").setScale(0.5);
        
        //Creating multiple static platforms
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
        //Set horizontal deadZones for camera
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
    }

    update() 
    {
        this.platforms.children.iterate( child => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;

            if (platform.y >= scrollY + 700){
                platform.y = scrollY - Phaser.Math.Between(50, 100);
                platform.x = Phaser.Math.Between(80, 400);
                platform.body.updateFromGameObject();
            }
        } )

        const touchingDown = this.player.body.touching.down;

        //Moving left and Right logic
        if (this.cursors.left.isDown && !touchingDown){
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown && !touchingDown){
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        if (touchingDown) {
            this.player.setVelocityY(-300);
        }

        this.horizontalWrap(this.player);
    }

    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        if (sprite.x < -halfWidth){
            sprite.x = gameWidth + halfWidth;
        } else if (sprite.x > gameWidth + halfWidth){
            sprite.x = -halfWidth;
        }
    }
}