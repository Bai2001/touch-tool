import { BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import tray from './tray'
import event from './event'
import { getMainWindowPosition } from '../../utils/store/windowPosition'

let win: Electron.BrowserWindow | null = null

export const createMainWindow = () => {
  // 获取当前文件夹路径
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const positionConfig = getMainWindowPosition()

  win = new BrowserWindow({
    width: positionConfig.width,
    height: positionConfig.height,
    x: positionConfig.x,
    y: positionConfig.y,
    frame: false,
    transparent: true, // 背景透明
    alwaysOnTop: true, // 浮窗在最前
    resizable: true,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true, // 不显示在任务栏
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      webSecurity: true, // 确保 web 安全功能是开启的
      contextIsolation: true, // 推荐开启
      additionalArguments: [`--csp="default-src 'self'; script-src 'self';"`],
    },
  })

  if (import.meta.env.MODE === 'development') {
    win.loadURL(import.meta.env.VITE_DEV_SERVER_URL)

    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(join(__dirname, '../dist/index.html'))
  }

  const ballTray = tray(win)

  event(win)
}

export default win
