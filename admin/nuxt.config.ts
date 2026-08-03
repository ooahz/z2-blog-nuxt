import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  modules: ['shadcn-nuxt'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // 开发环境代理：将 /blog/v1 请求代理到后端服务，解决跨域问题
  // 生产环境请通过 Nginx 等反向代理将 /blog/v1 转发到后端
  nitro: {
    devProxy: {
      // 注意：devProxy 会剥掉匹配到的 /blog/v1 前缀再转发，
      // 因此 target 需补回 /blog/v1，保证后端收到完整路径 /blog/v1/xxx
      '/blog/v1': {
        target: 'http://localhost:8080/blog/v1',
        changeOrigin: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      // 后端 API 基础地址（开发环境走代理用相对路径，生产环境可配置完整地址）
      apiBase: '/blog/v1',
      // 是否启用内存 Mock：true 走 mock 数据（无需后端），false 走真实后端
      // 通过环境变量 NUXT_PUBLIC_MOCK_ENABLED=true 开启
      mockEnabled: false,
    },
  },
})
