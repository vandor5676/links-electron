const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
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
    // const path ="D:\\Program Files (x86)\\Regclean pro\\Folder\\dhg\\drw\\top\\sciamano"
    // require('child_process').exec(`start "" "${path}"`);
  
    // fs.writeFileSync(filePath, JSON.stringify(event, null, 2) , 'utf-8');
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


// [{
//   "id": 0,
//   "name": "Links",
//   "icon": "drawerFolder",
//   "selected": true,

//   "items":[
//     {
//     "id": 0,
//     "name": "drw",
//     "icon": "explorerIcon",
//     "selected": true
//   },
//   {
//     "id": 1,
//     "name": "PSs",
//     "icon": "explorerIcon",
//     "selected": false
//   },
//   {
//     "id": 2,
//     "name": "ImageFiles5.0",
//     "icon": "explorerIcon",
//     "path" : "C:\\Things\\c#\\ImageFilesVSCode\\ImageFiles5.0",
//     "selected": false
//   }
// ]
// },
// {
//   "id": 1,
//   "name": "Explorer",
//   "icon": "../Images/explorerIcon.png",
//   "selected": false,
//   "items":[]
// },
// {
//   "id": 2,
//   "name": "Images",
//   "icon": "../Images/explorerIcon.png",
//   "selected": false,
//   "items":[]
// }
// ]