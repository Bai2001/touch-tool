import { app, BrowserWindow } from 'electron'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { startHook } from './utils/native/index.js'
import { generateCircle } from './utils/generateCircle/index.js'

// 获取当前文件夹路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let win: Electron.BrowserWindow | null = null

app.whenReady().then(() => {
  const size = 60

  win = new BrowserWindow({
    width: size,
    height: size,
    frame: false,
    transparent: true, // 背景透明
    alwaysOnTop: true, // 浮窗在最前
    resizable: false,
    skipTaskbar: true, // 不显示在任务栏
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  })

  // 设置圆形窗口
  // const react = generateCircle(size)
  // win.setShape(react)

  if (import.meta.env.MODE === 'development') {
    win.loadURL(import.meta.env.VITE_DEV_SERVER_URL)

    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(join(__dirname, '../dist/index.html'))
  }

  startHook()
})
