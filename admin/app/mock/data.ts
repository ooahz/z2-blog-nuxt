import type { Article } from "@/types/article";
import type { Category } from "@/types/category";
import type { Column } from "@/types/column";
import type { Friend } from "@/types/friend";
import type { HomeStatistics } from "@/types/statistics";

// ---------- Categories ----------
export const mockCategories: Category[] = [
  { id: "cat-001", name: "前端开发" },
  { id: "cat-002", name: "后端架构" },
  { id: "cat-003", name: "DevOps" },
  { id: "cat-004", name: "产品设计" },
  { id: "cat-005", name: "随笔杂谈" },
  { id: "cat-006", name: "开源项目" },
  { id: "cat-007", name: "数据库" },
  { id: "cat-008", name: "算法笔记" },
];

// ---------- Columns ----------
export const mockColumns: Column[] = [
  {
    id: "col-001",
    name: "Nuxt 全栈实战",
    description: "从零搭建一个现代化的 Nuxt 全栈应用，涵盖 SSR、API 路由、数据库集成与部署。",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    categoryList: [mockCategories[0], mockCategories[5]],
    categoryIds: ["cat-001", "cat-006"],
  },
  {
    id: "col-002",
    name: "云原生札记",
    description: "记录 Kubernetes、Docker、CI/CD 等云原生技术的实践经验与踩坑总结。",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    categoryList: [mockCategories[2]],
    categoryIds: ["cat-003"],
  },
  {
    id: "col-003",
    name: "工程化漫谈",
    description: "前端工程化、Monorepo、构建优化与团队协作的最佳实践。",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    categoryList: [mockCategories[0], mockCategories[2]],
    categoryIds: ["cat-001", "cat-003"],
  },
  {
    id: "col-004",
    name: "生活随笔",
    description: "技术之外的生活感悟、读书笔记与旅行见闻。",
    thumbnail: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&h=300&fit=crop",
    categoryList: [mockCategories[4]],
    categoryIds: ["cat-005"],
  },
];

// ---------- Articles ----------
const articleTitles = [
  "Nuxt 4 全新特性解析与迁移指南",
  "使用 shadcn-vue 构建现代化后台管理系统",
  "Tailwind CSS v4 主题系统深度剖析",
  "Vue 3.5 响应式系统性能优化实战",
  "TypeScript 类型体操：从入门到上瘾",
  "Kubernetes 零宕机滚动更新最佳实践",
  "Docker 多阶段构建优化镜像体积",
  "前端 Monorepo 方案对比：pnpm vs Nx vs Turborepo",
  "从零实现一个 Vue3 组件库并发布到 npm",
  "PostgreSQL 索引优化与查询计划分析",
  "Redis 分布式锁的三种实现方案",
  "Vite 插件开发入门与原理详解",
  "CSS Container Query 实战：真正的响应式布局",
  "Web 性能优化：LCP 与 CLS 优化指南",
  "Node.js 流式处理大文件的几种方式",
];

const articleContents = [
  "## 引言\n\n本文将带你深入了解最新版本的核心特性，包括全新的数据获取机制、改进的类型推导以及性能上的显著提升。\n\n## 核心特性\n\n- **更快的冷启动**：通过优化构建管线，开发服务器启动速度提升 40%\n- **类型安全**：端到端的 TypeScript 支持\n- **混合渲染**：SSR、SSG、ISR 自由组合\n\n## 迁移建议\n\n建议先在非核心项目上试用，逐步迁移生产环境应用。",
  "## 概述\n\nshadcn-vue 是一个基于 Radix Vue / Reka UI 的组件集合，它将组件源码直接复制到你的项目中，让你拥有完全的控制权。\n\n## 为什么选择 shadcn-vue\n\n1. 可定制性极强\n2. 无运行时依赖\n3. 设计系统统一\n\n## 快速开始\n\n```bash\nnpx shadcn-vue@latest init\nnpx shadcn-vue@latest add button card dialog\n```",
];

export const mockArticles: Article[] = articleTitles.map((title, i) => ({
  id: `art-${String(i + 1).padStart(3, "0")}`,
  path: `/article/${String(i + 1).padStart(3, "0")}`,
  title,
  thumbnail: `https://images.unsplash.com/photo-${[
    "1517694712202-14dd9538aa97",
    "1461749280684-dccba630e2f6",
    "1542831371-29b0f74f9713",
    "1516259262371-7ce9cdda1a1e",
    "1551033406-611cf9a28f67",
    "1518770660439-4636190af475",
    "1607799279861-4dd421887fb3",
    "1555066931-4365d14bab8c",
    "1551033406-611cf9a28f67",
    "1544383835-bda2bc66a55d",
    "1518770660439-4636190af475",
    "1633356122544-f134324a6cee",
    "1507721999472-8ed4421c4af2",
    "1526374965328-7f61d4dc18c5",
    "1555066931-4365d14bab8c",
  ][i]}?w=800&h=500&fit=crop`,
  content: articleContents[i % articleContents.length],
  htmlContent: `<p>${articleContents[i % articleContents.length].replace(/\n/g, "</p><p>")}</p>`,
  description: `这是一篇关于「${title}」的详细技术文章，涵盖核心概念、实战案例与最佳实践。`,
  createdDate: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")} 10:30:00`,
  updatedDate: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")} 15:45:00`,
  weight: (15 - i) * 10,
  status: i % 3 + 1, // 1: 正常, 2: 隐藏, 3: 草稿
  columnIds: [`col-${String((i % 4) + 1).padStart(3, "0")}`],
}));

// ---------- Friends ----------
export const mockFriends: Friend[] = [
  {
    id: "frd-001",
    website: "https://ahzoo.cn",
    oldWebsite: "https://old.ahzoo.cn",
    name: "Z次源",
    description: "现代化技术博客，专注前端与全栈开发。",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahzoo",
    weight: 100,
    status: 1,
    type: 0,
  },
  {
    id: "frd-002",
    website: "https://nuxt.com",
    oldWebsite: "",
    name: "Nuxt 官方",
    description: "The Intuitive Vue Framework.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nuxt",
    weight: 90,
    status: 1,
    type: 0,
  },
  {
    id: "frd-003",
    website: "https://vuejs.org",
    oldWebsite: "",
    name: "Vue.js",
    description: "The Progressive JavaScript Framework.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vue",
    weight: 80,
    status: 1,
    type: 0,
  },
  {
    id: "frd-004",
    website: "https://tailwindcss.com",
    oldWebsite: "",
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tailwind",
    weight: 70,
    status: 1,
    type: 1,
  },
  {
    id: "frd-005",
    website: "https://shadcn-vue.com",
    oldWebsite: "",
    name: "shadcn-vue",
    description: "Beautifully designed components built with Radix Vue and Tailwind CSS.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shadcn",
    weight: 60,
    status: 0,
    type: 1,
  },
  {
    id: "frd-006",
    website: "https://www.typescriptlang.org",
    oldWebsite: "",
    name: "TypeScript",
    description: "JavaScript with syntax for types.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ts",
    weight: 50,
    status: 1,
    type: 1,
  },
];

// ---------- Statistics ----------
export const mockStatistics: HomeStatistics = {
  columns: mockColumns.length,
  articles: {
    publish: mockArticles.filter((a) => a.status === 1).length,
    total: mockArticles.length,
  },
  friends: mockFriends.length,
};

// ---------- Mock user ----------
export const mockUserInfo = {
  email: "admin@ahzoo.cn",
  name: "Ahzoo",
};
