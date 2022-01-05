// import {getTemplate} from'./menuTemplate.mjs';
const path = require('path');

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = require('electron-is-dev');
const ipc = ipcMain
const fs = require('fs')
const exec = require('child_process').exec;


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
    var state = JSON.parse(fs.readFileSync(filePath));

    event.returnValue = state
    console.log("ipcMain: getState ")
  })

  //
  //read the state and add the open file explorers to the explorer tab and return the state
  //
  ipc.on('getOpenExplorers', async (event)=>
  {
    var state = JSON.parse(fs.readFileSync(filePath));

    //get paths of open explorers and explorers in explorer tab as arrays
    let openExplorers = await getOpenExplorers()
    let explorerTabItems = state[1].items
   
    //if a path isn't in the explorerTab add it
   openExplorers.forEach(newPath => {
      if(explorerTabItems.filter((item)=>{return item.path === newPath}).length === 0) //check if path is not already in the explorer tab
      {
        let name = newPath.split("/")
                          .pop()
                          .replaceAll('%20', ' ')
        state[1].items.push(createItem(name,newPath))//add new item
      }
    });
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf-8');

    event.returnValue = state
    console.log("ipcMain: getOpenExplorers ")
  })

  //
  //save the received state
  //
  ipc.on('saveState', async (event, arg) => {
    fs.writeFileSync(filePath, JSON.stringify(arg, null, 2), 'utf-8');
    console.log("ipcMain: setState ")
  })

  ipc.on('openFolder', (event, arg) => {
    console.log("Open... ", arg)
    const filePath = arg
    require('child_process').exec(`start "" "${filePath}"`);
    event.returnValue = 'ok'
  })


  //C:\\Things\\c#\\getOpenExplorers\\getOpenExplorers\\bin\\Debug\net6.0\\getOpenExplorers.exe
  //returns a list of all open explorer paths
   function getOpenExplorers() {
    return new Promise((resolve)=>{ 
      exec(`C:\\Things\\c#\\getOpenExplorers\\getOpenExplorers\\bin\\Debug\\net6.0\\getOpenExplorers.exe`, function (err, stdout, stderr) {
      console.log(`stderr: ${stderr} err: ${err}`)
      const paths = stdout.split('\n')
                          .filter((item)=>{ return(item !='\r' && item != '') })
                          .map((item)=>{return item.replace('\r','')})
      resolve(paths)
    });
  })
  }
  //returns a item that can be added to the state
  function createItem(name, path, icon = "explorerIcon")
  {
    let id = Math.log2(Date.now()) + Math.random();
    return({id,name,icon,path })
  }


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