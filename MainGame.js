import Animal from "./Animal";
import Food from "./Food";
import PetHealthDisplay from "./PetHealthDisplay";
import Waterbowl from "./WaterBowl";
import BathSponge from "./BathSponge";

export default class MainGame extends Phaser.Scene
{
    constructor ()
    {
        super('MainGame');
        this.myAnimal = null;
        this.myFood = null;
        this.bathSponge = null;
        this.waterBowl = null;
    }    
    create ()
    {
        let lastX = -1; 
        let lastY = -1;
        this.days = 7;
        this.isDrinking = false;
        this.waterTrips = 100;

        this.targetX = 0;
        this.targetY = 0;
        this.isCursorMoving = false;
        this.num = 0;

        this.title = this.add.text(50, 30, 'Foster Friends', { font: '40px Arial', color: '#ffffff' });
        this.timeLeft = this.add.text(1000, 50, 'Days Remaining: ' + this.days, { font: '40px Arial', color: '#ffffff' });
        
        this.timer = this.time.addEvent({
            delay: 60000, 
            callback: this.timerElapsed,
            callbackScope: this,
            loop: true 
        });

      let rect3 = this.add.graphics({
         fillStyle: {
             color: 0x000000
         }
      });
        let rect = new Phaser.Geom.Rectangle(0, 0, 1200, 84);
        rect3.fillRectShape(rect);
        this.physics.add.existing(rect3);
        rect3.body.setSize(rect.width, rect.height); 
        rect3.body.setImmovable(true);

        let container = this.add.container(rect.x, rect.y, [rect3, this.title,  this.timeLeft]); // Position the container at the rectangle's top-left corner
        this.timeLeft.setOrigin(0.5);

        this.eatSoundEffect = this.sound.add('EatSound');
        this.drinkSoundEffect = this.sound.add('drinkSound');

        this.waterBowl = new Waterbowl(this, 100, 300, 'waterBowl');
        
        this.myAnimal = new Animal(this, 200, 200, 'animal');

        this.myAnimal.on('pointerover', this.hoverAnimalStart, this);
        this.myAnimal.on('pointerout', this.hoverAnimalEnd, this);

        this.food = this.add.sprite(600, 550, 'food');
        this.food.setScale(0.05);
        this.food.alpha = 0.5;
        this.food.setInteractive();

        this.food.on('pointerover', this.hoverStartFood, this);
        this.food.on('pointerdown', this.clickDownFood, this)
        this.food.on('pointerout', this.hoverEndFood, this);

        this.Sponge = this.add.sprite(1000, 550, 'sponge');
        this.Sponge.setScale(0.05);
        this.Sponge.alpha = 0.5;
        this.Sponge.setInteractive();

        this.Sponge.on('pointerover', this.hoverStartBath, this);
        this.Sponge.on('pointerdown', this.clickDownSponge, this);
        this.Sponge.on('pointerout', this.hoverEndBath, this);


        this.decorate = this.add.sprite(200, 550, 'decorate');
        this.decorate.setScale(0.05);
        this.decorate.alpha = 0.5
        this.decorate.setInteractive();

        this.decorate.on('pointerover', this.hoverStartDecorate, this);
        this.decorate.on('pointerup', () => this.clickDownDecorate(this.game), this);
        this.decorate.on('pointerout', this.hoverEndDecorate, this);

        this.waterBowl.on('pointerdown', this.fillWater, this);

        this.display = new PetHealthDisplay(this, 400, 250);

        this.physics.add.collider(this.myAnimal, rect3);
        this.physics.add.overlap(this.myAnimal, this.waterBowl, this.drinkWater, null, this);

        this.myAnimal.startMovement();
        this.display.startDepletion();
        
    };

    timerElapsed() {
        this.days -= 1;
        if(this.days < 0){
            this.days = 0; 
            this.myAnimal.destroy();
        }
        this.timeLeft.setText('Days Remaining: ' + this.days);
    }

    eatFood(){
        this.myFood.destroy();
        this.display.replenishFoodBar();
        this.eatSoundEffect.play();
    }

    drinkWater() {
        if(this.waterTrips > 0){
        this.display.replenishWaterBar();
        this.drinkSoundEffect.play();
        }
        this.waterTrips -= 0.1;
        if(this.waterTrips <= 0) {
            this.waterBowl.setTexture('empty');
            this.waterTrips = 0;
        }
    }

    fillWater(){
        if(this.waterBowl){
            this.waterBowl.fill();
            this.waterTrips = 100;
        }
    }

    clickDownFood(){
        if(this.myFood){
            this.myFood.destroy();
        }
        this.myFood = new Food(this, 600, 550, 'food');
        this.input.setDraggable(this.myFood);

        this.myFood.on('dragstart', (pointer, dragX, dragY) => {});
        
        this.myFood.on('drag', (pointer, dragX, dragY) => {
            this.myFood.x = dragX;
            this.myFood.y = dragY;
        });
        
        this.myFood.on('dragend', (pointer) => {
            this.myAnimal.moveToFood(this.myFood.x, this.myFood.y);
            this.physics.add.overlap(this.myAnimal, this.myFood, this.eatFood, null, this);
        });

    }

    clickDownSponge(){
        if(this.myAnimal.active){
            if(this.bathSponge){
            this.bathSponge.destroy();
            }
            this.bathSponge = new BathSponge(this, 500, 450);
        }
    }

    clickDownDecorate() {
        //Not Finished or Functioning
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
      
        fileInput.onchange = (event) => { 
          const file = event.target.files[0];
      
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
      
            reader.onload = () => {
              // Update the existing texture data
              this.textures.setTexture('uploadedImage', reader.result); 
      
              // If the sprite already exists, update its texture
              if (this.sprite) {  
                this.sprite.setTexture('uploadedImage');
              } else {
                // Create the sprite if it doesn't
                this.sprite = this.add.sprite(400, 200, 'uploadedImage'); 
              }
            }; 
          } 
        }; 

    }

    hoverStartFood () {
        this.food.alpha = 1;
        this.food.setScale(0.06);
    }

    hoverEndFood (){
        this.food.alpha = 0.5;
        this.food.setScale(0.05);       
    }

    hoverAnimalStart(){
        if(this.bathSponge){
            this.bathSponge.startScrubbing(this.myAnimal, this.display);
        }
        this.display.show();
    }

    hoverStartBath () {
        this.Sponge.alpha = 1;
        this.Sponge.setScale(0.06);
    }
    
    hoverEndBath (){
        this.Sponge.alpha = 0.5;
        this.Sponge.setScale(0.05);
    }

    hoverStartDecorate() {
        this.decorate.alpha = 1;
        this.decorate.setScale(0.06);
    }

    hoverEndDecorate (){
        this.decorate.alpha = 0.5;
        this.decorate.setScale(0.05);
    }


    hoverAnimalEnd(){
        if(this.display.setVisible != true){

            if(this.bathSponge){
                this.bathSponge.stopScrubbing();
                this.bathSponge.destroy();
                this.bathSponge = null;
            }
            this.display.hide();
        }
    }


    getRandomDrag(min, max) {
        return Math.random() * (max - min) + min;
    }

    repeatMove(sprite){
        if (this.animal.body.velocity.x == 0 || this.animal.body.velocity.y == 0) {
            this.time.addEvent({ 
                callback: this.startMovement(sprite),
                callbackScope: this 
            });
        }
    }

    update () {
        if(this.myAnimal.active){
            this.myAnimal.updateMovement();
            this.display.update(this.myAnimal.x, this.myAnimal.y, this.time)
        }
        if(this.myFood){
            this.myFood.update();
        }
        if(this.bathSponge){
            this.bathSponge.update();
            
            }
        if(this.display.getCurrentWater() < 25){
            this.myAnimal.moveToWater(this.waterBowl.x, this.waterBowl.y);
        }
        if(this.display.getCurrentFood() <= 0){
            this.myAnimal.destroy();
            this.display.hide();
        }
        if(this.display.getCurrentBath() <= 0){
            this.myAnimal.destroy();
            this.display.hide();
        }
        if(this.display.getCurrentWater() <= 0){
            this.myAnimal.destroy();
            this.display.hide();
        }
    }   
}