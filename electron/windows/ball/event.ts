import { screen } from 'electron'

export default (win: Electron.BrowserWindow) => {
  let lastFocusTime = Date.now()
  let timer: NodeJS.Timeout

  win.on('focus', () => {
    lastFocusTime = Date.now()

    timer = setTimeout(() => {
      console.log('win click')
      win.blur()
    }, 100)
  })

  win.on('move', () => {
    clearTimeout(timer)
  })

  win.on('moved', () => {
    win.blur()

    // 获取当前窗口的位置和大小
    const [currentX, currentY] = win.getPosition()
    const [winWidth, winHeight] = win.getSize()

    // 获取主显示器的有效工作区域（排除任务栏等）
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workArea

    // 计算窗口到四个边缘的距离
    const distanceToLeft = currentX
    const distanceToRight = width - (currentX + winWidth)
    const distanceToTop = currentY
    const distanceToBottom = height - (currentY + winHeight)

    // 找到最近的边缘
    const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom)

    console.log(minDistance)
  })
}
