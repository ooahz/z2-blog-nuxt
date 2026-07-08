import type {ArchiveArticleInterface, ArticleInterface, PreviewArticleInterface} from "@/types/articleInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";
import type {ColumnMapInterface, PreviewColumnInterface} from "@/types/columnInterface";
import type {CommentItemInterface, TopCommentItemInterface} from "@/types/commentInterface";
import type {FriendInterface} from "@/types/friendInterface";
import type {PaginationInfo, Result, ResultList} from "@/types/resultInterface";

const coverImages = [
    "https://picsum.photos/seed/nuxt1/800/600",
    "https://picsum.photos/seed/vue2/800/600",
    "https://picsum.photos/seed/code3/800/600",
    "https://picsum.photos/seed/blog4/800/600",
    "https://picsum.photos/seed/design5/800/600",
    "https://picsum.photos/seed/tech6/800/600"
];

const categories: CategoryMapInterface[] = [
    {id: "1", name: "前端开发"},
    {id: "2", name: "后端技术"},
    {id: "3", name: "生活随笔"},
    {id: "4", name: "开源项目"}
];

const columns: PreviewColumnInterface[] = [
    {
        id: "col-nuxt",
        name: "nuxt",
        description: "基于 Nuxt 构建现代化全栈应用实战记录",
        thumbnail: "https://picsum.photos/seed/nuxtcol/1200/400",
        total: 5,
        style: "rgba(0, 220, 130, 0.15)",
        categoryList: [categories[0], categories[3]]
    },
    {
        id: "col-vue",
        name: "vue",
        description: "Vue 生态进阶与最佳实践",
        thumbnail: "https://picsum.photos/seed/vuecol/1200/400",
        total: 4,
        style: "rgba(65, 184, 131, 0.15)",
        categoryList: [categories[0]]
    },
    {
        id: "col-life",
        name: "life",
        description: "记录生活里的细碎与美好",
        thumbnail: "https://picsum.photos/seed/lifecol/1200/400",
        total: 3,
        style: "rgba(255, 170, 100, 0.15)",
        categoryList: [categories[2]]
    }
];

const columnMaps: ColumnMapInterface[] = columns.map(c => ({id: c.id, name: c.name}));

const articleContents: Record<string, string> = {
    "nuxt-blog": "<h2 id=\"header-0\">关于</h2>\n" +
        "<h3 id=\"header-1\">技术栈</h3>\n" +
        "<p>前端主要技术栈：<br>\n" +
        "  Vue3、Nuxt3、Vite、Pinia、TypeScript、Tailwind CSS、SCSS</p>\n" +
        "<p>后端主要技术栈：<br>\n" +
        "  JDK21、SpringCloud Alibaba 2023.0.0 全家桶、SpringBoot 3+、Mybatis Plus、Mysql、Redis、ElasticSearch 8+</p>\n" +
        "<h3 id=\"header-2\">开源信息</h3>\n" +
        "<p>博主主站地址：<a href=\"https://blog.ahzoo.cn\">https://blog.ahzoo.cn</a></p>\n" +
        "<p>Github开源地址：<a href=\"https://github.com/ooahz\">十玖八柒</a></p>\n" +
        "<p>博客前端开源仓库地址：<a href=\"https://github.com/ooahz/z2-blog-nuxt\">z2-nuxt-blog</a></p>\n" +
        "<p>后台管理前端开源仓库地址：<a href=\"https://github.com/ooahz/z2-blog-admin\">z2-blog-admin</a></p>\n" +
        "<p>微服务后端开源仓库地址：<a href=\"https://github.com/ooahz/z2-blog-cloud\">z2-blog-cloud</a></p>",
    "vue3-composition": "<h2>Composition API 优势</h2><p>Composition API 让逻辑复用更加直观，配合 TypeScript 可以获得极佳的开发体验。</p><h2>实战技巧</h2><p>使用 <code>useFetch</code> 和 <code>useAsyncData</code> 处理服务端数据请求。</p>",
    "typescript-tips": "<h2>类型体操</h2><p>TypeScript 的高级类型系统可以帮助我们构建更安全的应用边界。</p><h2>最佳实践</h2><p>优先使用接口定义数据结构，合理使用泛型。</p>",
    "css-tricks": "<h2>现代 CSS</h2><p>Container Queries、<code>:has()</code> 和 CSS 变量正在改变我们编写样式的方式。</p>",
    "open-source": "<h2>开源心得</h2><p>维护开源项目需要持续的投入，文档、测试和社区反馈同样重要。</p>",
    "weekend-notes": "<h2>周末随笔</h2><p>一个安静的下午，一杯咖啡，记录一些零散的想法。</p>"
};

const previewArticles: PreviewArticleInterface[] = [
    {
        id: "1",
        path: "nuxt-blog",
        title: "使用 Nuxt 搭建个人博客",
        description: "从零开始，用 Nuxt 构建一个现代化的个人博客系统，包含文章、专栏、评论等核心模块。",
        thumbnail: coverImages[0],
        createdDate: "2025-12-15T10:30:00",
        updatedDate: "2026-01-10T14:20:00",
        columnList: [columnMaps[0]],
        categoryMap: categories[0]
    },
    {
        id: "2",
        path: "vue3-composition",
        title: "Vue3 Composition API 实战",
        description: "深入理解 Composition API，掌握响应式系统与逻辑复用的最佳实践。",
        thumbnail: coverImages[1],
        createdDate: "2025-11-28T09:00:00",
        updatedDate: "2025-12-05T16:45:00",
        columnList: [columnMaps[1]],
        categoryMap: categories[0]
    },
    {
        id: "3",
        path: "typescript-tips",
        title: "TypeScript 高级类型技巧",
        description: "分享一些日常开发中常用的 TypeScript 类型工具与模式。",
        thumbnail: coverImages[2],
        createdDate: "2025-10-20T20:15:00",
        updatedDate: "2025-11-02T11:30:00",
        columnList: [columnMaps[1]],
        categoryMap: categories[0]
    },
    {
        id: "4",
        path: "css-tricks",
        title: "现代 CSS 布局完全指南",
        description: "Grid、Flexbox、Subgrid 一网打尽，彻底掌握现代 CSS 布局。",
        thumbnail: coverImages[3],
        createdDate: "2025-09-12T14:00:00",
        updatedDate: "2025-09-18T10:00:00",
        columnList: [columnMaps[0]],
        categoryMap: categories[0]
    },
    {
        id: "5",
        path: "open-source",
        title: "参与开源项目的一年",
        description: "回顾过去一年参与开源社区的经历，分享收获与思考。",
        thumbnail: coverImages[4],
        createdDate: "2025-08-05T08:30:00",
        updatedDate: "2025-08-20T19:00:00",
        columnList: [columnMaps[0]],
        categoryMap: categories[3]
    },
    {
        id: "6",
        path: "weekend-notes",
        title: "周末的咖啡与代码",
        description: "一些关于生活、技术和成长的随想。",
        thumbnail: coverImages[5],
        createdDate: "2025-07-22T16:00:00",
        updatedDate: "2025-07-22T16:00:00",
        columnList: [columnMaps[2]],
        categoryMap: categories[2]
    }
];

const fullArticles: ArticleInterface[] = previewArticles.map(preview => ({
    id: preview.id,
    path: preview.path,
    title: preview.title,
    description: preview.description,
    content: articleContents[preview.path] || `<p>${preview.description}</p>`,
    thumbnail: preview.thumbnail,
    createdDate: preview.createdDate || "",
    updatedDate: preview.updatedDate || "",
    style: "rgba(63, 71, 95, 1)",
    columnList: preview.columnList,
    category: preview.categoryMap
}));

const comments: CommentItemInterface[] = [
    {
        id: "c1",
        userName: "星野",
        userWebsite: "https://example.com",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xingye",
        content: "文章写得很清晰，Nuxt 4 的变化确实值得期待！",
        createdDate: "2026-01-13 11:00:00",
        area: "北京",
        tag: "站长",
        child: [
            {
                id: "c1-1",
                userName: "十玖八柒",
                userWebsite: "https://ahzoo.cn",
                userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahzoo",
                content: "谢谢支持，后续会继续更新相关实践。",
                replyName: "星野",
                parentId: "c1",
                createdDate: "2026-01-12 11:00:00",
                area: "上海",
                child: []
            }
        ]
    },
    {
        id: "c2",
        userName: "匿名读者",
        userWebsite: "",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anon",
        content: "TypeScript 那部分很有帮助，已收藏。",
        createdDate: "2026-01-08T11:00:00",
        area: "广州",
        child: []
    }
];

const topComments: TopCommentItemInterface[] = [
    {userName: "星野", website: "https://ahzoo.cn", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xingye", content: "Nuxt 4 的升级路线非常清晰。"},
    {userName: "小鱼", website: "https://ahzoo.cn", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoyu", content: "期待更多 Vue 生态的实战文章。"},
    {userName: "阿杰", website: "https://ahzoo.cn", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ajie", content: "博客设计得很漂亮，学习了。"}
];

const friends: FriendInterface[] = [
    {website: "https://ahzoo.cn", oldWebsite: "", name: "Z次源", description: "一个收藏回忆与分享技术的地方", email: "ooahz@outlook.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahzoo", type: "技术"},
    {website: "https://example.com", oldWebsite: "", name: "示例站点", description: "这是一个示例友链", email: "demo@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo", type: "生活"}
];

function buildPagination<T>(items: T[], pagination: number, size = 10): {list: T[]; page: PaginationInfo} {
    const current = Math.max(1, pagination || 1);
    const total = items.length;
    const totalPage = Math.max(1, Math.ceil(total / size));
    const start = (current - 1) * size;
    const list = items.slice(start, start + size);
    return {
        list,
        page: {
            count: list.length,
            pagination: current,
            size,
            total: String(total),
            totalPage
        }
    };
}

export function success<T>(data: T): Result<T> {
    return {state: "success", code: "200", message: "ok", data};
}

export function successList<T>(items: T[], pagination = 1, size = 10): ResultList<T[]> {
    const {list, page} = buildPagination(items, pagination, size);
    return {state: "success", code: "200", message: "ok", data: list, page};
}

export function getPagination(event: any): number {
    const query = getQuery(event);
    const p = Number(query.p);
    return Number.isNaN(p) || p < 1 ? 1 : p;
}

export {categories, columns, columnMaps, previewArticles, fullArticles, comments, topComments, friends};
