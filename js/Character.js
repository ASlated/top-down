class Character extends Phaser.Sprite {
  constructor(game, column, row, key, frames = {'s': [0, 1], 'n': [2, 3], 'e': [4, 5], 'w': [6, 7]})  {
    super(game, column * 32, row * 32, key)
    this.game = game
    this.animations.add('walk-south', frames.s, 0, true)
    this.animations.add('walk-north', frames.n, 0, true)
    this.animations.add('walk-east', frames.e, 0, true)
    this.animations.add('walk-west', frames.w, 0, true)
    this.cell = {x: column, y: row}
    this.idle = true
    this.game.add.existing(this)
  }

  walk(direction, speed) {
    if (this.idle) {
      let proposed = {x: this.cell.x, y: this.cell.y}
      switch(direction) {
        case 'south': proposed.y++; break
        case 'east': proposed.x++; break
        case 'north': proposed.y--; break
        case 'west': proposed.x--; break
      }
      this.idle = false
      let framerate = 2000.0 / speed
      this.game.time.events.add(speed, this.stopWalk, this)
      this.animations.play('walk-' + direction, framerate)
      if (this.inBounds(proposed) && !this.game.map.collideIndexes.includes(this.game.map.getTile(proposed.x, proposed.y).index)) {
        this.cell = {x: proposed.x, y: proposed.y}
        let new_x = this.cell.x * 32
        let new_y = this.cell.y * 32
        this.game.add.tween(this).to({x: new_x, y: new_y}, speed, null, true)
      }
    }
  }

  stopWalk() {
    this.animations.stop(null, true)
    this.idle = true 
  }

  inBounds(cell) {
    if (cell.x < 0 || cell.y < 0) {
      return false
    } else if (cell.x > 19 || cell.y > 14) {
      return false
    } else {
      return true
    }
  }
}

module.exports.Character = Character
