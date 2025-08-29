import { app, Menu, Tray } from 'electron'

export default (win: Electron.BrowserWindow) => {
  // 托盘设置
  const tray = new Tray(`C:\\Program Files (x86)\\DingDing\\logo.ico`)
  tray.setToolTip(app.name)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '拖动',
      type: 'checkbox',
      click: (item) => {
        win.webContents.send('drag', item.checked)
      },
    },
    {
      label: '退出',
      role: 'quit',
    },
  ])

  tray.setContextMenu(contextMenu)

  return tray
}
