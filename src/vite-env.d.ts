/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly DB_HOST: string
  readonly DB_USER: string
  readonly DB_PASSWORD: string
  readonly DB_NAME: string
  readonly NODE_ENV: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}