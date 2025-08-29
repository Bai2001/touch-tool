export const generateCircle = (size: number) => {
  const radius = Math.floor(size / 2)
  // 构造圆形区域

  const rects: Electron.Rectangle[] = []
  for (let y = 0; y < size; y++) {
    const dy = y - radius
    const dx = Math.sqrt(radius * radius - dy * dy) // 圆的水平范围
    const x1 = Math.floor(radius - dx)
    const x2 = Math.ceil(radius + dx)

    rects.push({
      x: x1,
      y: y,
      width: x2 - x1,
      height: 1,
    })
  }

  return rects
}
