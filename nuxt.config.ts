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
        name: "Z次源",
        description: "Z次源 - 一个收藏回忆与分享技术的地方",
        defaultLocale: "zh-CN",
        trailingSlash: false
    },
    app: {
        head: {
            title: "Z次源",
            htmlAttrs: {
                lang: "zh-CN"
            },
            meta: [
                {name: "keywords", content: "Z次源,十玖八柒,博客,技术分享,前端开发,Vue,Nuxt"},
                {name: "description", content: "Z次源 - 一个收藏回忆与分享技术的地方，专注于前端开发、Vue、Nuxt等技术分享"},
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover"},
                {name: "robots", content: "index, follow"}
            ],
            link: [
                {rel: "preload", as: "image", href: "/basic-bg.png", fetchpriority: "high"},
                {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
                {rel: "apple-touch-icon", href: "/avatar.webp"},
                {rel: "canonical", href: "https://ouo.pub"}
            ],
            script: [
                {
                    children: `
                        // 安全相关的客户端脚本
                        window.addEventListener('DOMContentLoaded', function() {
                            // 防止XSS攻击的基本措施
                            const sanitizeInput = function(input) {
                                const div = document.createElement('div');
                                div.textContent = input;
                                return div.innerHTML;
                            };
                            
                            // 为所有输入字段添加安全处理
                            const inputs = document.querySelectorAll('input, textarea');
                            inputs.forEach(input => {
                                input.addEventListener('input', function() {
                                    this.dataset.rawValue = this.value;
                                });
                            });
                        });
                    `
                }
            ],
            // 安全相关的头部配置
            "X-Frame-Options": process.env.NUXT_SECURITY_X_FRAME_OPTIONS || "DENY",
            "X-Content-Type-Options": "nosniff",
            "X-XSS-Protection": "1; mode=block",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Permissions-Policy": "geolocation=(self), microphone=(), camera=()",
            "Content-Security-Policy": process.env.NUXT_SECURITY_CONTENT_SECURITY_POLICY || "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'"
        },
        pageTransition: {
            name: "page",
            mode: "out-in"
        },
        layoutTransition: {
            name: "layout",
            mode: "out-in"
        }
    },
    devtools: {enabled: true},
    postcss: {
        plugins: {
            "@tailwindcss/postcss": {},
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
                target: "http://127.0.0.1:8080/blog/",
                changeOrigin: true,
                prependPath: true
            }
        },
        compressPublicAssets: {
            gzip: true,
            brotli: true
        },
        routeRules: {
            "/_nuxt/**": {
                cache: {
                    maxAge: 60 * 60 * 24 * 365,
                    immutable: true
                }
            },
            "/static/**": {
                cache: {
                    maxAge: 60 * 60 * 24 * 365,
                    immutable: true
                }
            },
            "/**/*.{css,js,ico,png,svg,woff2}": {
                cache: {
                    maxAge: 60 * 60 * 24 * 365,
                    immutable: true
                }
            }
        }
    },
    experimental: {
        payloadExtraction: true,
        inlineRouteRules: true,
        componentIslands: true
    },
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
            },
            host: true
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        "vendor": ["vue", "@vueuse/core"],
                        "ui": ["lucide-vue-next"],
                        "markdown": ["prismjs"]
                    }
                }
            },
            minify: "terser",
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            cssCodeSplit: true,
            sourcemap: false,
            target: "es2015"
        },
        optimizeDeps: {
            include: ["lucide-vue-next", "@vueuse/core", "prismjs"]
        },
    },
    sourcemap: {
        server: false,
        client: false
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || "/blog"
        },
        security: {
            xFrameOptions: process.env.NUXT_SECURITY_X_FRAME_OPTIONS || "DENY",
            contentSecurityPolicy: process.env.NUXT_SECURITY_CONTENT_SECURITY_POLICY
        }
    },
    routeRules: {
    },
    typescript: {
        strict: true,
        shim: false,
        tsConfig: {
            compilerOptions: {
                target: "ES2020",
                module: "ESNext",
                moduleResolution: "node",
                strict: true,
                jsx: "preserve",
                sourceMap: true,
                resolveJsonModule: true,
                isolatedModules: true,
                esModuleInterop: true,
                lib: ["ES2020", "DOM", "DOM.Iterable"],
                skipLibCheck: true
            }
        }
    }
})
