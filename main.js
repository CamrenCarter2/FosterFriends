import './style.css'
import Phaser from 'phaser'
import Boot from './Boot'
import Preloader from './Preloader'
import MainGame from './MainGame'
import DecorateScene from './DecorateScene'

const sizes = {
  width:1200,
  height:600
}


const config = {
  type:Phaser.WEBGL,
  backgroundColor: '#d3d3d3',
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
  scene: [Boot, Preloader, MainGame, DecorateScene],
  physics: {
    default: 'arcade',
    arcade: {debug: false}
  }
}


const game = new Phaser.Game(config)

