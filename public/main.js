const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const ipc = ipcMain

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 970,
    height: 635,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
        contextIsolation:true,
        preload: path.join(__dirname, 'preload.js')
    },
  });
  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  //functions for minimizing and maximizing
ipc.on('maximize', ()=>
    {
      win.maximize()
    })
ipc.on('minimize', ()=>
    {
      win.minimize()
    })
    
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});