import MainGame from "./MainGame";
import globalData from "./dataManager";

export default class DecorateScene extends Phaser.Scene {

    constructor() {
        super('DecorateScene');
    }
        create() {
        // Add a background to slightly dim the game
        let background = this.add.graphics().fillStyle(0x000000, 0.7).fillRect(0, 0, 1200, 600);

        // Pop-up container
        let popup = this.add.container(600, 300); // Position in the center

        // Text
        popup.add(this.add.text(-100, -200, 'Add Docorations?', { font: '24px Arial', color: '#ffffff' })); 

        // Yes Button 
        this.dogBed = this.add.sprite(-300, -100, 'dogBed')
            .setInteractive()
            .setScale(0.08)
            .on('pointerdown', () => this.ChosenDecoration(1));

        this.dogToy = this.add.sprite(0, -100, 'dogToy')
            .setInteractive()
            .setScale(0.08)
            .on('pointerdown', ()=> this.ChosenDecoration(2));

        this.ballTub = this.add.sprite(300, -100 , 'ballTub')
            .setInteractive()
            .setScale(0.08)
            .on('pointerdown', ()=> this.ChosenDecoration(3));

        let noButton = this.add.text(0, 50, 'No', { font: '20px Arial', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.endGame());

        popup.add([this.dogBed, this.dogToy, this.ballTub, noButton]);
    }

    ChosenDecoration(decision) {
        switch (decision){
            case 1:
                globalData[0] = 1;
                this.scene.stop();
                break;
            case 2:
                globalData[0] = 2;
                this.scene.stop();
                break;
            case 3:
                globalData[0] = 3;
                this.scene.stop();
                break;
            default:
                this.scene.stop();
                break;

        }
         // Close the pop up
        
        
    }

    endGame() {
        // ... Logic to end the game 
        this.scene.stop(); // Close the pop up
    }
}
