import { app } from 'electron'
import { createMainWindow } from './windows/main'

app.whenReady().then(() => {
  createMainWindow()
})
