import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const require = createRequire(import.meta.url)
// 获取当前文件夹路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let nodeUrl
if (import.meta.env.MODE === 'development') {
  nodeUrl = join(__dirname, '..', 'native', 'build', 'Release', 'mouseHook.node')
} else {
  nodeUrl = join(process.resourcesPath, 'native', 'build', 'Release', 'mouseHook.node')
}

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
