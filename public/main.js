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

  //functions for minimizing and maximizing
  ipc.on('maximize', (event) => {

    //const path ="D:\\Program Files (x86)\\Regclean pro\\Folder\\dhg\\drw\\top\\sciamano"
    require('child_process').exec(`start "" "${path}"`);
    event.reply('asynchronous-reply', path)


    win.maximize()
    console.log('maximized');
  })
  ipc.on('minimize', () => {
    win.minimize()
  })
  ipc.on('sendData', (event) => {
    const path ="D:\\Program Files (x86)\\Regclean pro\\Folder\\dhg\\drw\\top\\sciamano"
    require('child_process').exec(`start "" "${path}"`);
    

   const items=
      [
        { id: 0, name: "drw", icon: "../Images/explorerIcon.png", selected: true },
        { id: 1, name: "PSs", icon: "../Images/explorerIcon.png", selected: false },
        { id: 2, name: "ImageFiles5.0", icon: "../Images/explorerIcon.png", selected: false },
      ]

    const fs = require('fs')
    const filePath = "./data.json"
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2) , 'utf-8');

    var data = JSON.parse(fs.readFileSync(filePath));
    event.returnValue = data[1].name
    console.log("ipcMain: sendData ")
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