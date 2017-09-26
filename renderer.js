require('pixi.js')
require('phaser-shim')

class Game extends Phaser.Game {
  constructor() {
    let config = {
      width: 640,
      height: 480,
      antialias: false,
      renderer: Phaser.WEBGL,
      states: {
        preload: preload,
        create: create,
        update: update
      }
    }
    super(config)
  }

  preload() {
    this.load.image('robot', 'assets/images/robot.png')
  }

  create() {
    this.add.sprite(0, 0, 'robot') 
  }
}

const game = new Game()
