/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROT: string
  readonly VITE_DEV_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
