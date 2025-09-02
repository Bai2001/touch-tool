import Store from 'electron-store'
import { WindowPosition } from './windowPosition'

interface ElectronStoreSchema {
  'window-position': WindowPosition
}

const defaultStore = {
  'window-position': {
    width: 800,
    height: 600,
  },
}

const store = new Store<ElectronStoreSchema>({
  defaults: defaultStore,
}) as Store<ElectronStoreSchema> & { set: Function; get: Function }

export default store
