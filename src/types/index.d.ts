// 确保这个文件能被 TypeScript 正确识别为模块
export {}

declare global {
  interface Window {
    api: {
      onDrag: (cb: (event, isDrag: boolean) => void) => void
    }
  }
}
