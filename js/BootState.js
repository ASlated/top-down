class BootState extends Phaser.State {
  preload() {
    this.load.spritesheet('zelda', './assets/images/zelda.png', 16, 17)
    this.load.spritesheet('sprites', './assets/images/sprites_2.png', 16, 16)
    this.load.tilemap('tilemap', './assets/tilemaps/map.csv', null, Phaser.Tilemap.CSV)
    this.load.image('tileset', './assets/tilesets/grass.png')
    this.load.image('blackRect', './assets/images/blackRect.png')
    this.load.image('battleWindowButton', './assets/gui/open_battle_window.png')
  }

  create() {
    this.stage.smoothed = false
    this.game.canvas.style.border = '1px solid black'
    this.state.start('play')

    this.game.party = {
      'Ness': {'lv': 31, 'hp': 307, 'mhp': 405, 'mp': 115, 'mmp': 130, 'exp': 65},
      'Paula': {'lv': 24, 'hp': 165, 'mhp': 165, 'mp': 79, 'mmp': 150, 'exp': 79},
      'Jeff': {'lv': 25, 'hp': 198, 'mhp': 210, 'mp': 0, 'mmp': 0, 'exp': 42},
      'Poo': {'lv': 19, 'hp': 165, 'mhp': 199, 'mp': 19, 'mmp': 65, 'exp': 76},
      'Crono': {'lv': 28, 'hp': 117, 'mhp': 223, 'mp': 92, 'mmp': 92, 'exp': 13},
      'Pikachu': {'lv': 22, 'hp': 79, 'mhp': 147, 'mp': 117, 'mmp': 137, 'exp': 52},
      'Link': {'lv': 25, 'hp': 201, 'mhp': 201, 'mp': 62, 'mmp': 84, 'exp': 43},
      'Tingle': {'lv': 27, 'hp': 99, 'mhp': 129, 'mp': 157, 'mmp': 189, 'exp': 91}
    }
    this.game.team = ['Ness', 'Crono', 'Jeff', 'Tingle']
  }
}

module.exports.BootState = BootState
