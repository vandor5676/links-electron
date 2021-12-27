const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')
const path = require('path')
console.log("Preload script loaded")

contextBridge.exposeInMainWorld('myAPI', {
  maximize: () => {ipcRenderer.send('maximize')},
  minimize: () => {ipcRenderer.send('minimize')},
  getState: () => {return ipcRenderer.sendSync('getState')},
  openFolder: (arg) => {ipcRenderer.sendSync('openFolder',arg)},
  saveState: (state) => {
    ipcRenderer.send('saveState', state)
  },
  showContextMenu: ()=> 
  {
    ipcRenderer.sendSync('showContextMenu')
  }

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