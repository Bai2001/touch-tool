import { setMainWindowPosition } from '../../utils/store/windowPosition'
import store from '../../utils/store'

export default (win: Electron.BrowserWindow) => {
  win.on('focus', () => {})

  win.on('move', () => {})

  win.on('moved', () => {
    const position = win.getPosition()
    const size = win.getSize()

    setMainWindowPosition(position[0], position[1], size[0], size[1])
  })

  win.on('resize', () => {
    const position = win.getPosition()
    const size = win.getSize()

    setMainWindowPosition(position[0], position[1], size[0], size[1])
  })
}
