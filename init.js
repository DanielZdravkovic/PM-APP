const { app, BrowserWindow } = require('electron');
const packageJson = require('./package.json'); // Import package.json

function createWindow() {
  const win = new BrowserWindow({
    width: packageJson.config.width || 800, // Default to 800 if not set
    height: packageJson.config.height || 600, // Default to 600 if not set
    fullscreen: packageJson.config.fullscreen || false, // Default to false
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
  
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);