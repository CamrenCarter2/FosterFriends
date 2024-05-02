export default class Animal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.targetX = 0;
        this.targetY = 0;

        this.setScale(0.09);
        this.body.setCollideWorldBounds(true);
        this.body.setDamping(true);
        this.setInteractive();
    }

    startMovement(){
        this.targetX = Phaser.Math.RND.between(0, 1200);
        this.targetY = Phaser.Math.RND.between(0, 600);
        this.body.setDrag(this.scene.getRandomDrag(0.1, 0.9));

        var distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetX, this.targetY);
        var duration = distance * 3; 
        var speed = distance / duration; 
    
        var angle = Phaser.Math.Angle.Between(this.x, this.y, this.targetX, this.targetY);
        this.scene.physics.velocityFromRotation(angle, 200, this.body.velocity); // Adjust speed 
    }

    updateMovement(){
        if (this.body.velocity.x == 0 || this.body.velocity.y == 0) {
            this.scene.time.addEvent({ 
                callback: this.startMovement(this),
                callbackScope: this 
            });
        }
    }

    moveToFood(x, y){
        this.body.setDrag(this.scene.getRandomDrag(0.1, 0.9));

        var distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        var duration = distance * 3; 
        var speed = distance / duration; 
    
        var angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        this.scene.physics.velocityFromRotation(angle, 200, this.body.velocity); // Adjust speed 
    }

    updateMoveToFood(x,y){
        if (this.body.velocity.x == 0 || this.body.velocity.y == 0) {
            this.scene.time.addEvent({ 
                callback: this.moveToFood(x, y),
                callbackScope: this 
            });
        }
    }

    moveToWater(x, y){
        this.body.setDrag(this.scene.getRandomDrag(0.1, 0.9));
    
        var distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
        var duration = distance * 3; 
        var speed = distance / duration; 
    
        var angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        this.scene.physics.velocityFromRotation(angle, 200, this.body.velocity); // Adjust speed 

    }
}
