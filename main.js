import './style.css'
import Phaser from 'phaser'
import Boot from './Boot'
import Preloader from './Preloader'
import MainGame from './MainGame'

const sizes = {
  width:1000,
  height:500
}


const config = {
  type:Phaser.WEBGL,
  backgroundColor: '#FFFFFF',
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
  scene: [Boot, Preloader, MainGame]
}

const game = new Phaser.Game(config)