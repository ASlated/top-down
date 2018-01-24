const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')
const fs = require('fs')

function createWindow() {
  mainWindow = new BrowserWindow({width: 680, height: 520, fullscreen: true, title: 'Top Down RPG'})
  mainWindow.loadURL(url.format({pathname: path.join(__dirname, 'index.html'), protocol: 'file', slashes: true}))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createBattleWindow() {
  let options = {
    width: 400,
    height: 400,
    fullscreenable: false,
    x: 660,
    y: 0,
    alwaysOnTop: true,
    focusable: false,
    resizable: false
  }
  battleWindow = new BrowserWindow(options)
  battleWindow.loadURL(url.format({pathname: path.join(__dirname, 'battle.html'), protocol: 'file', slashes: true}))
  battleWindow.on('closed', function() {
    battleWindow = null
  })
  debugger
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

let battleWindow = null
let team, party
ipc.on('battle-window', function(event, teamArg, partyArg) {
  if (battleWindow === null) {
    team = teamArg
    party = partyArg
    createBattleWindow()
  }
})

ipc.on('get-battle-window-contents', function(event) {
  event.sender.send('set-battle-window-contents', team, party)
})

ipc.on('request-change-stat', function(event, name, stat, newValue, max) {
  battleWindow.webContents.send('change-stat', name, stat, newValue, max)
})
