import store from '..'

export interface WindowPosition {
  x?: number
  y?: number
  width: number
  height: number
}

export const setMainWindowPosition = (x: number, y: number, width: number, height: number) => {
  store.set('window-position', { x, y, width, height })
}

export const getMainWindowPosition = () => {
  return store.get('window-position')
}
