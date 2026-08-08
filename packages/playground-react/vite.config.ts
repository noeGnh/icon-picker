/* eslint-disable @typescript-eslint/no-unused-expressions */
import react from '@vitejs/plugin-react-swc'
// import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

process.env.NODE_ENV
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/react-icon-picker' : '/',
  plugins: [
    react(),
    /* visualizer({
      filename: 'dist/stats.html',
      open: true, // open in browser
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // or 'sunburst', 'network'
    }), */
  ],
  resolve: {
    alias: {
      '@arkn/react-icon-picker':
        process.env.NODE_ENV === 'production'
          ? '@arkn/react-icon-picker'
          : '@arkn/react-icon-picker/src/index.ts',
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    minify: false,
    rollupOptions: {
      //
    },
  },
  optimizeDeps: {
    exclude: ['@arkn/react-icon-picker'],
  },
  server: {
    port: 4320,
  },
})
