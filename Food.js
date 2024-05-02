

export default class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this); // Add to the scene
        scene.physics.add.existing(this); // Add physics

        this.setScale(0.05); // Set the scale
        this.setInteractive();  // Make it interactive 

    }
}