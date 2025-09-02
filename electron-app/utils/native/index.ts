import { createRequire } from 'module'
import { join } from 'path'
import { app } from 'electron'

const require = createRequire(import.meta.url)

let basePath
if (import.meta.env.MODE === 'development') {
  basePath = app.getAppPath()
} else {
  basePath = process.resourcesPath
}
const nodeUrl = join(basePath, 'native', 'build', 'Release', 'mouseHook.node')

const mouseHook = require(nodeUrl)

export const stopHook: () => void = mouseHook.stopHook
export const setTouchScreenRect: (rect: Electron.Rectangle) => void = mouseHook.setTouchScreenRect
export const startHook = (cb?: (e: { x: number; y: number; type: any }) => void) => {
  if (!cb) {
    cb = () => {}
  }
  mouseHook.stopHook()
  mouseHook.startHook(cb)
}
