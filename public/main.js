import { getTemplate } from './menuTemplate.js';
const path = require('path');

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = require('electron-is-dev');
const ipc = ipcMain
const fs = require('fs')


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 970,
    height: 635,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
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

  const filePath = "./state.json"
  //functions for minimizing and maximizing
  ipc.on('maximize', (event) => {
    win.maximize()
    console.log('maximized');
  })

  ipc.on('minimize', () => {
    win.minimize()
  })

  ipc.on('getState', (event) => {
    var drawerItems = JSON.parse(fs.readFileSync(filePath));
    
    event.returnValue = drawerItems
    console.log("ipcMain: sendData ")
  })

  ipc.on('saveState', (event, arg) => {
    fs.writeFileSync(filePath, JSON.stringify(arg, null, 2) , 'utf-8');
    console.log("ipcMain: setState ")
  })

  ipc.on('openFolder',(event, arg)=>
  {
    console.log("Open... ", arg)
    const filePath = arg
    require('child_process').exec(`start "" "${filePath}"`);
    event.returnValue = 'ok'
  })

  ipcMain.on('showContextMenu', (event) => {
    const template = [
      {
        label: 'Menu Item 1',
        click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
      },
      { type: 'separator' },
      { label: 'Menu Item 2', type: 'checkbox', checked: true }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup(BrowserWindow.fromWebContents(event.sender))
  })
  // ipcMain.on('ondragstart', (event, filePath) => {
  //   console.log("onDragStart")
  //   event.sender.startDrag({
  //     file: path.join(__dirname, filePath),
  //     icon: "iconName",
  //   })
  // })

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

//right click menu 
const template = getTemplate()
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
