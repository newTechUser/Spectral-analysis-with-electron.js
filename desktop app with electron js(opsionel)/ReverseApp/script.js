const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs')
 
//esas pencere parametrleri daxil edilir ve acilir
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      sandbox:false, 
      contextIsolation: false 
    }
  });
  mainWindow.loadFile('page.html'); 
}

app.whenReady().then(createWindow);
