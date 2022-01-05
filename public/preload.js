const { ipcRenderer ,remote,contextBridge} = require('electron')
const path = require('path')
console.log("Preload script loaded")

contextBridge.exposeInMainWorld('myAPI', {
  getOpenExplorers: () => { return ipcRenderer.sendSync('getOpenExplorers')},
  maximize: () => {ipcRenderer.send('maximize')},
  minimize: () => {ipcRenderer.send('minimize')},
  getState: () => {return ipcRenderer.sendSync('getState')},
  openFolder: (arg) => {ipcRenderer.sendSync('openFolder',arg)},
  saveState: (state) => {
    ipcRenderer.send('saveState', state)
  },
  showContextMenu: ()=> 
  {
    // return ipcRenderer.sendSync('showContextMenu')
    // menu.popup(remote.getCurrentWindow())
  },
  contextMenuCommand: (e, command)=>
  {
    alert(command)
  }

})
ipcRenderer.on('context-menu-command', (e, command) => {
  alert("context-menu-command")
 })

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})


