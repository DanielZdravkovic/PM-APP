const { app, BrowserWindow } = require('electron')

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, icon: "assets/leaf.png"})
  win.loadFile(`index.html`)
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)