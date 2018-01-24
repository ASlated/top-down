const Character = require('./Character.js').Character

class Player extends Character {
  constructor(game, x, y) {
    super(game, x, y, 'sprites', {'s': [1, 2], 'n': [33, 34], 'e': [17, 18], 'w': [49, 50]})
    this.game = game
    this.keys = {}
    this.keys.run = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
  }

  update() { 
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.walk('south', this.speed())
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.walk('east', this.speed())
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.walk('north', this.speed())
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.walk('west', this.speed())
    }
  }

  speed() {
    if (this.keys.run.isDown) {
      return 100
    } else {
      return 200
    }
  }

  stopWalk() {
    this.idle = true
    this.animations.stop(null, true)
    if (Math.random() > 0.95) {
      this.game.state.start('battleTransition')
    }
  }
}

module.exports.Player = Player
