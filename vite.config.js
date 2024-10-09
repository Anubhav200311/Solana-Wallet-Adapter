import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import { Buffer } from 'buffer'

   export default defineConfig({
     plugins: [react()],
     define: {
       'process.env': {},
       'global': {},
     },
     resolve: {
       alias: {
         process: "process/browser",
         stream: "stream-browserify",
         zlib: "browserify-zlib",
         util: 'util'
       }
     },
     build: {
       rollupOptions: {
         plugins: [
           // Plugin to polyfill built-in nodejs modules
           {
             name: 'node-globals',
             resolveId(source) {
               if (source === 'buffer') {
                 return source
               }
               return null
             },
             load(id) {
               if (id === 'buffer') {
                 return `export { Buffer } from 'buffer'`
               }
               return null
             }
           }
         ]
       }
     }
   })