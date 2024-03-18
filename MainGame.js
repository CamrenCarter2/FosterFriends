export default class MainGame extends Phaser.Scene
{
    constructor ()
    {
        super('MainGame');
    }
    
    preload () {
        this.load.image('background', '/assets/OIP.jpg');
    }

    create ()
    {

        let rect3 = this.add.graphics({
            fillStyle: {
              color: 0x00f0f0
            }
          });
        let rect = new Phaser.Geom.Rectangle(0, 0, 1000, 84);
        rect3.fillRectShape(rect);

    }
}