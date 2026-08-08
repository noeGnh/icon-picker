/// <reference types="vite/client" />

/** Injected at build time from package.json's version, see vite.config.ts. */
declare const __PKG_VERSION__: string

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}