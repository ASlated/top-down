const ipc = require('electron').ipcRenderer

const progressSpeed = 5

ipc.send('get-battle-window-contents')
ipc.on('set-battle-window-contents', function(event, team, party) {
  setBattleWindowContent(team, party)
})
ipc.on('change-stat', function(event, name, stat, newValue, max) {
  changeStat(name, stat, newValue, max)
})

function setBattleWindowContent(team, party) {
  let content = ''
  for(let i = 0; i < team.length; i++) {
    let p = party[team[i]]
    content = content.concat('<div class="player">')
    content = content.concat(`<p class=\"player_name\">${team[i]}</p>`)
    content = content.concat(`<p class=\"player_name\" style=\"float:right;\">lv ${p.lv}</p>`)
    content = content.concat('<br>')
    content = content.concat(`<progress class=\"exp_bar\" value=\"${p.exp}\" max=\"100\"></progress>`)
    content = content.concat(`<progress id=\"${team[i]} hp\" class=\"hp_bar\" value=\"${p.hp}\" max=\"${p.mhp}\" data-label=\"${p.hp} (${p.mhp})\">HP</progress>`)
    content = content.concat(`<progress id=\"${team[i]} mp\" class=\"mp_bar\" value=\"${p.mp}\" max=\"${p.mmp}\" data-label=\"${p.mp} (${p.mmp})\">MP</progress>`)
    content = content.concat('</div>')
  }
  document.getElementById('main-area').innerHTML = content
}

function changeStat(name, stat, newValue, max) {
  let bar = document.getElementById(name + ' ' + stat)
  if (bar.value > newValue && bar.value > 0) {
    decrementStat(bar, newValue, max)
  } else if (bar.value < newValue && bar.value < max) {
    incrementStat(bar, newValue, max)
  }
}

function incrementStat(bar, newValue, max) {
  bar.value++
  bar.setAttribute('data-label', bar.value + ' (' + max + ')')
  if (bar.value < newValue && bar.value < max) {
    window.setTimeout(incrementStat, progressSpeed, bar, newValue, max)
  }
}

function decrementStat(bar, newValue, max) {
  bar.value--
  bar.setAttribute('data-label', bar.value + ' (' + max + ')')
  if (bar.value > newValue && bar.value > 0) {
    window.setTimeout(decrementStat, progressSpeed, bar, newValue, max)
  }
}
