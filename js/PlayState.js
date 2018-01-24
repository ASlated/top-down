const Player = require('./Player.js').Player

class PlayState extends Phaser.State {
  create() {
    this.game.movementPaused = false
    this.game.map = this.add.tilemap('tilemap', 16, 16)
    this.game.map.addTilesetImage('tileset')
    this.layer = this.game.map.createLayer(0)
    this.layer.resizeWorld()
    this.game.map.collideIndexes.push(3, 4, 5, 6, 7, 8)
    this.player = new Player(this.game, 3, 2)
  }
}

module.exports.PlayState = PlayState
