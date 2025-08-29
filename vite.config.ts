import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron/main.ts', // 主进程入口
          vite: {
            build: {
              outDir: 'dist-electron/',
            },
          },
        },
        {
          entry: 'electron/preload.ts', // 预加载进程入口
          vite: {
            build: {
              outDir: 'dist-electron/',
              target: 'node16',
              minify: false,
              lib: {
                entry: 'electron/preload.ts',
                formats: ['cjs'], // <--- 关键
              },
              rollupOptions: {
                output: {
                  format: 'cjs', // ✅ 输出 CommonJS
                },
              },
            },
          },
        },
      ]),
    ],
    server: {
      port: 8081,
      host: '127.0.0.1',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        external: ['electron'],
      },
    },
    base: './',
  }
})
