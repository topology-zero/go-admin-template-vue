import { resolve } from 'path'
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import viteCompression from "vite-plugin-compression"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        base: './',
        build: {
            outDir: 'dist',
            assetsDir: 'static',
            sourcemap: false,
        },
        server: {
            port: 9528,
            open: true,
            proxy: {
                '/api': {
                    target: env.VITE_APP_API,
                    ws: true,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        plugins: [
            vue(),
            // 使用 svg 图标
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, "./src/assets/svg")],
                symbolId: "icon-[name]",
            }),
            // EsLint 报错信息显示在浏览器界面上
            eslintPlugin(),
            // vite-plugin-compression 打包后会对资源文件进行gzip压缩
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: "gzip",
                ext: ".gz",
            }),
            // rollup-plugin-visualizer 打包后会在根目录生成一个 stats.html 文件，用于分析各依赖的占用大小
            visualizer(),

            // unplugin-auto-import,unplugin-vue-components 自动导入 import 和 components
            AutoImport({
                resolvers: [
                    // 自动导入 ElementPlus import 
                    ElementPlusResolver()
                ],
            }),
            Components({
                resolvers: [
                    // 自动导入 ElementPlus components 
                    ElementPlusResolver()
                ],
            })
        ],
    }
})
