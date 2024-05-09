export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        //Images
        this.load.image('animal' , '/assets/dog.jpg');
        this.load.image('food', '/assets/Food.png');
        this.load.image('foodIcon', '/assets/FoodIcon.png');
        this.load.image('waterIcon', '/assets/WaterIcon.png');
        this.load.image('BathIcon', '/assets/BathIcon.png');
        this.load.image("happyicon", '/assets/HappyFaceIcon.png');
        this.load.image("waterBowl" , '/assets/WaterBowl.png');
        this.load.image("empty" , '/assets/EmptyWaterBowl.png');
        this.load.image("sponge", '/assets/Sponge.png');
        this.load.image('decorate', '/assets/Decorate.png');
        this.load.image('dogBed' , '/assets/decorations/DogBed.png')
        this.load.image('ballTub', '/assets/decorations/ballTub.png');
        this.load.image('dogToy', '/assets/decorations/dogToy.png');
        
        //Audio
        this.load.audio('EatSound', '/assets/sounds/Eat.wav');
        this.load.audio('drinkSound', '/assets/sounds/Slurp.mp3');
    }

    create ()
    {
        this.scene.start('MainGame');
    }
}