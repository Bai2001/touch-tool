import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  onDrag: (cb: any) => ipcRenderer.on('drag', cb),
})
