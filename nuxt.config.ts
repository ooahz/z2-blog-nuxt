import prismjs from "vite-plugin-prismjs";

export default defineNuxtConfig({
    viewport: {
        breakpoints: {
            xs: 420,
            sm: 640,
            lg: 768
        }
    },
    site: {
        url: "https://ouo.pub",
        name: "Z次元",
        description: "Z次元 - 一个收藏回忆与分享技术的地方",
        defaultLocale: "zh-CN",
        trailingSlash: false
    },
    app: {
        head: {
            title: "Z次元",
            htmlAttrs: {
                lang: "zh-CN"
            },
            meta: [
                {name: "keywords", content: "Z次元,十玖八柒"},
                {name: "description", content: "Z次元 - 一个收藏回忆与分享技术的地方"},
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover"}
            ],
        }
    },
    devtools: {enabled: true},
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    css: [
        "@/static/css/style.scss"
    ],
    modules: [
        "@pinia/nuxt",
        "nuxt-svgo",
        "nuxt-viewport",
        "@nuxtjs/color-mode",
        // "@nuxtjs/stylelint-module",
    ],
    svgo: {
        autoImportPath: "./static/svg/"
    },
    // baseUrl:,
    devServer: {
        port: 3200,
        host: "0.0.0.0"
    },
    nitro: {
        devProxy: {
            "/blog/": {
                target: "http://localhost:8080/blog/",
                changeOrigin: true,
                prependPath: true
            }
        }
    },
    // 代码高亮
    vite: {
        plugins: [
            prismjs({
                languages: [
                    "java",
                    "javascript",
                    "css",
                    "html",
                    "xml",
                    "yaml",
                    "shell"
                ],
                plugins: ["line-numbers", "show-language", "copy-to-clipboard"],
                theme: "tomorrow",
                css: true
            })
        ],
        server: {
            hmr: true,
            watch: {
                usePolling: true
            }
        }
    }
})
