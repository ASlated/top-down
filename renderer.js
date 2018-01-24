window.PIXI = require('phaser-ce/build/custom/pixi')
window.p2 = require('phaser-ce/build/custom/p2')
window.Phaser = require('phaser-ce/build/custom/phaser-split')

const BootState = require('./js/BootState.js').BootState
const PlayState = require('./js/PlayState.js').PlayState
const BattleState = require('./js/BattleState.js').BattleState
const BattleTransitionState = require('./js/BattleTransitionState.js').BattleTransitionState

class Game extends Phaser.Game {
  constructor() {
    let config = {
      width: 640,
      height: 480,
      antialias: false,
      renderer: Phaser.AUTO,
      resolution: 0.5
    }
    super(config)
    this.state.add('boot', new BootState(this))
    this.state.add('play', new PlayState(this))
    this.state.add('battle', new BattleState(this))
    this.state.add('battleTransition', new BattleTransitionState(this))
    this.state.start('boot')
  }
}

const game = new Game()
