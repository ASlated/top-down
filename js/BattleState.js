const ipc = require('electron').ipcRenderer

class BattleState extends Phaser.State {
  create() {
    this.stage.backgroundColor = '#FFFFFF'
    ipc.send('battle-window', this.game.team, this.game.party)
    this.add.button(2, this.game.height - 26, 'battleWindowButton', function() { this.state.start('play') }, this)
    this.add.button(this.game.width - 26, this.game.height - 26, 'battleWindowButton', function() {
      this.changeStat('Ness', 'hp', Math.floor(Math.random() * this.game.party.Ness.mhp))
      this.changeStat('Ness', 'mp', Math.floor(Math.random() * this.game.party.Ness.mmp))
      this.changeStat('Crono', 'hp', Math.floor(Math.random() * this.game.party.Crono.mhp))
      this.changeStat('Crono', 'mp', Math.floor(Math.random() * this.game.party.Crono.mmp))
      this.changeStat('Jeff', 'hp', Math.floor(Math.random() * this.game.party.Jeff.mhp))
      this.changeStat('Jeff', 'mp', Math.floor(Math.random() * this.game.party.Jeff.mmp))
      this.changeStat('Tingle', 'hp', Math.floor(Math.random() * this.game.party.Tingle.mhp))
      this.changeStat('Tingle', 'mp', Math.floor(Math.random() * this.game.party.Tingle.mmp))
    }, this)
  }

  changeStat(name, stat, newValue) {
    ipc.send('battle-window', this.game.team, this.game.party)
    ipc.send('request-change-stat', name, stat, newValue, this.game.party[name]['m' + stat])
    if (newValue > this.game.party[name]['m' + stat]) {
      this.game.party[name][stat] = this.game.party[name]['m' + stat]
    } else {
      this.game.party[name][stat] = newValue
    }
  }
}

module.exports.BattleState = BattleState
