export default class BathSponge extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'sponge'); // Assuming you have an image called 'bathSponge' loaded

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.05);

    }

    startScrubbing(animal, display) {
        this.isScrubbing = true;
        this.targetAnimal = animal;
        this.display = display;
    }

    stopScrubbing() {
        this.isScrubbing = false;
        this.targetAnimal = null;
        
    }

    update() {
         if(this.isScrubbing){
            this.display.replenishBathBar();
         }
         if (!this.active) { return; }
         this.x = this.scene.input.mousePointer.x;
         this.y = this.scene.input.mousePointer.y
     }
}