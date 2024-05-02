export default class PetHealthDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        // Visual elements
        this.background = scene.add.rectangle(0, 0, 150, 150, 0x333356).setOrigin(0);
        this.foodbar = scene.add.rectangle(40, 20, 100, 20, 0x00ff00).setOrigin(0);
        this.waterbar = scene.add.rectangle(40, 50, 100, 20, 0x00ff00).setOrigin(0);
        this.bathbar = scene.add.rectangle(40, 80, 100, 20, 0x00ff00).setOrigin(0);

        //images
        this.foodIcon = scene.add.image(20, 30, 'foodIcon').setScale(0.02);
        this.waterIcon = scene.add.image(20, 60, 'waterIcon').setScale(0.02);
        this.BathIcon = scene.add.image(20, 90, 'BathIcon').setScale(0.01);
        this.HappyIcon = scene.add.image(75, 120, 'happyicon').setScale(0.02);

        // Health properties
        this.maxFood = 100;
        this.foodTimer = 60;
        this.currentFood = 100;
        this.foodDepletionRate = 0.5; // Per second

        this.maxBath = 100;
        this.currentBath = this.maxBath;
        this.bathDepletionRate = 0.3; // Per second

        this.maxWater = 100;
        this.currentWater = this.maxWater;
        this.waterDepletionRate = 1; // Per second

        this.startTimes = { // Track start times for each resource
            food: null,
            bath: null,
            water: null
        };

        this.add([this.background, this.foodbar, this.waterbar, this.bathbar, this.foodIcon, this.waterIcon, this.BathIcon, this.HappyIcon]);
        scene.add.existing(this);

        this.hide();
    }

    getCurrentFood(){
        return this.currentFood;
    }
    getCurrentBath(){
        return this.currentBath;
    }
    getCurrentWater(){
        return this.currentWater;
    }

    update(x, y, time){
        if(x < 600){
        this.x = x + 70;
        } else {
            this.x = x - 220;
        }

        if(y < 350){
            this.y = y + 50;
        }
        else{
            this.y = y - 200;
        }

        this.depleteFood(time);
        this.depleteBath(time);
        this.depleteWater(time);
    }

    show(){
        this.setVisible(true);
    }

    hide(){
        this.setVisible(false);
    }

    

    depleteFood(time) {
        if (this.startTimes.food !== null) {
            if(this.currentFood > 0){
                this.currentFood = this.currentFood - 0.02;
            }
            this.foodbar.setScale(this.currentFood / this.maxFood, 1);

        }
    }

    depleteWater(time) {
        if (this.startTimes.water !== null) {

            if(this.currentWater > 0){
                this.currentWater = this.currentWater - 0.01;
            }
            
            this.waterbar.setScale(this.currentWater / this.maxWater, 1);
        }
    }

    depleteBath(time) {
        if (this.startTimes.bath !== null) {

            if(this.currentBath > 0){
            this.currentBath = this.currentBath - 0.03;
            }
            this.bathbar.setScale(this.currentBath / this.maxBath, 1);
        }
    }
    
    replenishFoodBar() {
        if(this.currentFood + 25 > 100){
            this.currentFood = 100;
        }
        else{
            this.currentFood += 25;
        }
        
    }

    replenishWaterBar() {
        if(this.currentWater + 1 > 100){
            this.currentWater = 100;
        }
        else{
            this.currentWater += 0.1;
        }
        
    }

    replenishBathBar() {
        if(this.currentBath + 1 > 100){
            this.currentBath = 100;
        }
        else{
            this.currentBath += 0.5;
        }
        
    }

    startDepletion() {
        console.log("Depletion Started");
        this.startTimes.food = this.scene.time.now;
        this.startTimes.bath = this.scene.time.now;
        this.startTimes.water = this.scene.time.now;
    }

}