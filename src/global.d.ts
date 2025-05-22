/// <reference types="react-scripts" />

interface ImportMetaEnv {
  readonly BACKEND_DOMAIN: string;

  // add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
