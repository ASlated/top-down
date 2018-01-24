class BattleTransitionState extends Phaser.State {
  create() {
    this.stage.backgroundColor = '#FF0000'
    this.camera.fade(0x000000, 750)
    let blackRects = this.add.group()
    let rects = 4
    let origin = Math.floor(Math.random() * 3) / 2.0
    for (let i = 0; i < rects + 1; i++) {
      let newRect = blackRects.create(0, this.game.height / rects * i, 'blackRect')
      newRect.anchor.setTo(0, origin)
      let newRectTween = this.game.add.tween(newRect.scale).to({y: 10}, 1000)
      newRectTween.onComplete.add(function() { Phaser.GAMES[0].state.start('battle') })
      newRectTween.start()
    }
  }
}

module.exports.BattleTransitionState = BattleTransitionState
