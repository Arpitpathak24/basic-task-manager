/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string
  readonly VITE_SOME_OTHER_ENV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
