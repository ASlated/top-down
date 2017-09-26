const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')
const fs = require('fs')

function createWindow() {
  mainWindow = new BrowserWindow({width: 640, height: 480})
  mainWindow.loadURL(url.format({pathname: path.join(__dirname, 'index.html'), protocol: 'file', slashes: true}))
  mainWindow.on('closed', function () {
    mainwindow = null
  })
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
