import type {ArchiveArticleInterface, ArticleInterface, PreviewArticleInterface} from "@/types/articleInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";
import type {ColumnMapInterface, PreviewColumnInterface} from "@/types/columnInterface";
import type {CommentItemInterface, TopCommentItemInterface} from "@/types/commentInterface";
import type {FriendInterface} from "@/types/friendInterface";
import type {PaginationInfo, Result, ResultList} from "@/types/resultInterface";

const coverImages = [
    "https://t.alcy.cc/fj?197239",
    "https://t.alcy.cc/fj?583010",
    "https://t.alcy.cc/fj?713020",
    "https://t.alcy.cc/fj?412086",
    "https://t.alcy.cc/fj?306029"
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
        thumbnail: "https://s.ahzoo.cn/demo/img/CG_317.png",
        total: 5,
        categoryList: [categories[0], categories[3]]
    },
    {
        id: "col-vue",
        name: "vue",
        description: "Vue 生态进阶与最佳实践",
        thumbnail: "https://s.ahzoo.cn/demo/img/CG_382.png",
        total: 4,
        categoryList: [categories[0]]
    },
    {
        id: "col-life",
        name: "life",
        description: "记录生活里的细碎与美好",
        thumbnail: "",
        total: 3,
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
        "<p>微服务后端开源仓库地址：<a href=\"https://github.com/ooahz/z2-blog-cloud\">z2-blog-cloud</a></p>\n" +
        "<h2 id=\"header-3\">赞助支持</h2>\n" +
        "<p>本项目免费开源，因此没有任何收益。若您觉得本项目对您有帮助，您的赞助支持将是我最大的动力。</p>\n" +
        "<table>\n" +
        " <thead>\n" +
        "  <tr>\n" +
        "   <th align=\"center\">微信</th>\n" +
        "   <th align=\"center\">支付宝</th>\n" +
        "  </tr>\n" +
        " </thead>\n" +
        " <tbody>\n" +
        "  <tr>\n" +
        "   <td align=\"center\"><img src=\"https://s.ahzoo.cn/mine/wechat.png\" width=\"200\"></td>\n" +
        "   <td align=\"center\"><img src=\"https://s.ahzoo.cn/mine/alipay.png\" width=\"200\"></td>\n" +
        "  </tr>\n" +
        " </tbody>\n" +
        "</table>\n" +
        "<h2 id=\"header-4\">项目预览</h2>\n" +
        "<h3 id=\"header-5\">博客</h3>\n" +
        "<p><img src=\"https://s.ahzoo.cn/img/open/blog/open10001.webp\" alt=\"\"><br><img src=\"https://s.ahzoo.cn/img/open/blog/open10002.webp\" alt=\"\"><br><img src=\"https://s.ahzoo.cn/img/open/blog/open10004.webp\" alt=\"\"><br><img src=\"https://s.ahzoo.cn/img/open/blog/open10007.webp\" alt=\"\"></p>\n" +
        "<h3 id=\"header-6\">后台管理</h3>\n" +
        "<p><img src=\"https://s.ahzoo.cn/img/open/blog/ob100021.webp\" alt=\"\"></p>\n" +
        "<h2 id=\"header-7\">功能测试</h2>\n" +
        "<h3 id=\"header-8\">三级标题</h3>\n" +
        "<h4 id=\"header-9\">四级标题</h4>\n" +
        "<h3 id=\"header-10\">引用示例</h3>\n" +
        "<blockquote>\n" +
        " <p>引用信息</p>\n" +
        "</blockquote>\n" +
        "<h3 id=\"header-11\">链接示例</h3>\n" +
        "<p><a href=\"https://ahzoo.cn\">个人主页</a></p>\n" +
        "<h3 id=\"header-12\">正文示例</h3>\n" +
        "<p>豫章故郡，洪都新府。星分翼轸(zhěn)，地接衡庐。襟三江而带五湖，控蛮荆而引瓯（ōu）越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃(fān)之榻。雄州雾列，俊采星驰，台隍(huáng)枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨(qǐ )戟遥临；宇文新州之懿(yì)范，襜(chān )帷(wéi)暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电清霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。<br>\n" +
        "  　　时维九月，序属三秋。潦（lǎo）水尽而寒潭清，烟光凝而暮山紫。俨(yǎn)骖騑(cān fēi)于上路，访风景于崇阿(ē)。临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流（一作 翔）丹，下临无地。鹤汀（tīng）凫(fú )渚（zhǔ），穷岛屿之萦(yíng)回；桂殿兰宫，即（一作 列）冈峦之体势。<br>\n" +
        "  　　披绣闼（tà），俯雕甍(méng )。山原旷其盈视，川泽纡(yū)其骇瞩。闾(lǘ)阎(yán) 扑地，钟鸣鼎食之家；舸（gě)舰弥津，青雀黄龙之舳（zhú）。云销雨霁(jì)，彩彻区明（或作 虹销雨霁，彩彻云衢 qú）。落霞与孤鹜(wù)齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡（l ǐ）之滨；雁阵惊寒，声断衡阳之浦。<br>\n" +
        "  　　遥襟甫畅，逸兴遄(chuán)飞。爽籁发而清风生，纤歌凝而白云遏(è)。睢(suī)园绿竹，气凌彭泽之樽；邺(yè)水朱华，光照临川之笔。四美具，二难并。穷睇眄(dì miǎn)于中天，极娱游于暇日。天高地迥(jiǒng)，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会（kuài）于云间。地势极而南溟(míng)深，天柱高而北辰远。关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。怀帝阍(hūn)而不见，奉宣室以何年。<br>\n" +
        "  　　嗟(jiē)乎！时运不齐，命途多舛(chuǎn)；冯唐易老，李广难封。屈贾谊（yì）于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙（hé zhé）以犹欢。北海虽赊（shē），扶摇可接；东隅(yú)已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！<br>\n" +
        "  　　勃，三尺微命，一介书生。无路请缨，等终军之弱冠（guàn）；有怀投笔，慕宗悫（què）之长风。舍簪（zān）笏（hù）于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨(tāo)陪鲤对；今兹捧袂(mèi)，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？<br>\n" +
        "  　　呜呼！胜地不常，盛筵(yán)难再；兰亭已矣，梓(zǐ) 泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔。　<br>\n" +
        "  　　滕王高阁临江渚，佩玉鸣鸾罢歌舞。<br>\n" +
        "  　　画栋朝飞南浦云，珠帘暮卷西山雨。<br>\n" +
        "  　　闲云潭影日悠悠，物换星移几度秋。<br>\n" +
        "  　　阁中帝子今何在？槛外长江空自流。</p>\n" +
        "<h3 id=\"header-13\">代码块示例</h3>\n" +
        "<pre><code class=\"language-java\">// 代码块示例\n" +
        "String home=\"https://ahzoo.cn\";\n" +
        "</code></pre>\n" +
        "<h3 id=\"header-14\">表格示例</h3>\n" +
        "<table>\n" +
        " <thead>\n" +
        "  <tr>\n" +
        "   <th align=\"center\">col1</th>\n" +
        "   <th align=\"center\">col2</th>\n" +
        "   <th align=\"center\">col3</th>\n" +
        "  </tr>\n" +
        " </thead>\n" +
        " <tbody>\n" +
        "  <tr>\n" +
        "   <td align=\"center\">1</td>\n" +
        "   <td align=\"center\">2</td>\n" +
        "   <td align=\"center\">3</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "   <td align=\"center\">4</td>\n" +
        "   <td align=\"center\">5</td>\n" +
        "   <td align=\"center\">6</td>\n" +
        "  </tr>\n" +
        " </tbody>\n" +
        "</table>",
    "vue3-composition": "<h2>Composition API 优势</h2><p>Composition API 让逻辑复用更加直观，配合 TypeScript 可以获得极佳的开发体验。</p><h2>实战技巧</h2><p>使用 <code>useFetch</code> 和 <code>useAsyncData</code> 处理服务端数据请求。</p>",
    "typescript-tips": "<h2>类型体操</h2><p>TypeScript 的高级类型系统可以帮助我们构建更安全的应用边界。</p><h2>最佳实践</h2><p>优先使用接口定义数据结构，合理使用泛型。</p>",
    "css-tricks": "<h2>现代 CSS</h2><p>Container Queries、<code>:has()</code> 和 CSS 变量正在改变我们编写样式的方式。</p>",
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
        path: "weekend-notes",
        title: "周末的咖啡与代码",
        description: "一些关于生活、技术和成长的随想。",
        thumbnail: coverImages[4],
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
    columnList: preview.columnList,
    category: preview.categoryMap
}));

const comments: CommentItemInterface[] = [
    {
        id: "c0",
        userName: "十玖八柒",
        userWebsite: "https://ahzoo.cn",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahzoo",
        content: "当前项目已关闭后台服务，使用mock数据",
        replyName: "",
        parentId: "",
        createdDate: "2026-07-08 11:00:00",
        area: "广州",
        child: []
    },
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
