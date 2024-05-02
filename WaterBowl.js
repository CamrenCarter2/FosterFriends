export default class Waterbowl extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setInteractive();

        this.body.setImmovable(true); // Prevent it from being moved by collisions

        this.setScale(0.09);

        this.isFull = false; // Tracks if the waterbowl has water in it
    }

    fill() {
        this.setTexture('waterBowl');
        
        // Optionally change the texture or animation to show it's full
    }

    empty() {
        this.isFull = false;
        // Optionally change the texture or animation to show it's empty
    }
}