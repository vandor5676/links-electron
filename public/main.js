// import {getTemplate} from'./menuTemplate.mjs';
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
    minWidth: 645,
    minHeight: 300,
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
    fs.writeFileSync(filePath, JSON.stringify(arg, null, 2), 'utf-8');
    console.log("ipcMain: setState ")
  })

  ipc.on('openFolder', (event, arg) => {
    console.log("Open... ", arg)
    const filePath = arg
    require('child_process').exec(`start "" "${filePath}"`);
    event.returnValue = 'ok'
  })

  ipcMain.on('showContextMenu', (event) => {
    const template = [
      {
        label: 'Menu Item 1',
        click: () => { event.returnValue = 'Item1' }
      },
      { type: 'separator' },
      {
        label: 'Menu Item 2', type: 'checkbox', checked: true,
        click: () => { event.returnValue = 'Item2' }
      }
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

app.on('ready', () => {

});

// //right click menu 
// const isMac = process.platform === 'darwin'

// const template = [
//   // { role: 'appMenu' }
//   ...(isMac ? [{
//     label: app.name,
//     submenu: [
//       { role: 'about' },
//       { type: 'separator' },
//       { role: 'services' },
//       { type: 'separator' },
//       { role: 'hide' },
//       { role: 'hideOthers' },
//       { role: 'unhide' },
//       { type: 'separator' },
//       { role: 'quit' }
//     ]
//   }] : []),
//   // { role: 'fileMenu' }
//   {
//     label: 'File',
//     submenu: [
//       isMac ? { role: 'close' } : { role: 'quit' }
//     ]
//   },
//   // { role: 'editMenu' }
//   {
//     label: 'Edit',
//     submenu: [
//       { role: 'undo' },
//       { role: 'redo' },
//       { type: 'separator' },
//       { role: 'cut' },
//       { role: 'copy' },
//       { role: 'paste' },
//       ...(isMac ? [
//         { role: 'pasteAndMatchStyle' },
//         { role: 'delete' },
//         { role: 'selectAll' },
//         { type: 'separator' },
//         {
//           label: 'Speech',
//           submenu: [
//             { role: 'startSpeaking' },
//             { role: 'stopSpeaking' }
//           ]
//         }
//       ] : [
//         { role: 'delete' },
//         { type: 'separator' },
//         { role: 'selectAll' }
//       ])
//     ]
//   },
//   // { role: 'viewMenu' }
//   {
//     label: 'View',
//     submenu: [
//       { role: 'reload' },
//       { role: 'forceReload' },
//       { role: 'toggleDevTools' },
//       { type: 'separator' },
//       { role: 'resetZoom' },
//       { role: 'zoomIn' },
//       { role: 'zoomOut' },
//       { type: 'separator' },
//       { role: 'togglefullscreen' }
//     ]
//   },
//   // { role: 'windowMenu' }
//   {
//     label: 'Window',
//     submenu: [
//       { role: 'minimize' },
//       { role: 'zoom' },
//       ...(isMac ? [
//         { type: 'separator' },
//         { role: 'front' },
//         { type: 'separator' },
//         { role: 'window' }
//       ] : [
//         { role: 'close' }
//       ])
//     ]
//   },
//   {
//     role: 'help',
//     submenu: [
//       {
//         label: 'Learn More',
//         click: async () => {
//           const { shell } = require('electron')
//           await shell.openExternal('https://electronjs.org')
//         }
//       }
//     ]
//   }
// ]
// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)
