import { app } from 'electron'
import { createBallWindow } from './windows/ball'

app.whenReady().then(() => {
  createBallWindow()
})
