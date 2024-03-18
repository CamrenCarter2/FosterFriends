
export default class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        
        this.load.image('background', '/assets/OIP.jpg');

    }

    create ()
    {
        this.add.image(0, 0, 'background');
        this.scene.start('Preloader');
    }
}