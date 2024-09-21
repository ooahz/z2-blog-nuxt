import prismjs from "vite-plugin-prismjs";

export default defineNuxtConfig({
    viewport: {
        breakpoints: {
            xs: 420,
            sm: 640,
            lg: 780
        }
    },
    // site: {
    //     url: "https://blog.ahzoo.cn",
    //     name: "Z次元",
    // },
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
            link: [
                {
                    rel: "stylesheet",
                    href: "https://npm.elemecdn.com/@fortawesome/fontawesome-free/css/all.min.css",
                    media: "all",
                    onload: "this.media='all'"
                }
            ]
        }
    },
    devtools: {enabled: true},
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    modules: [
        "@pinia/nuxt",
        "nuxt-svgo",
        "nuxt-viewport",
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
            "/api": {
                target: "http://localhost:9000",
                changeOrigin: true,
                prependPath: true,
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
