const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')
console.log("Preload script loaded")

contextBridge.exposeInMainWorld('myAPI', {
  maximize: () => {ipcRenderer.send('maximize')},
  minimize: () => {ipcRenderer.send('minimize')},
  sendData: () => {return ipcRenderer.sendSync('sendData')},

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