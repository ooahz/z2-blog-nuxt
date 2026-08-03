export default defineAppConfig({
    // 作者/站点信息
    siteName: "Z次源",
    name: "十玖八柒",
    website: "https://blog.ahzoo.cn",
    avatar: "/avatar.webp",
    description: "反正也没人看，就随便写写吧",
    email: "ooahz@outlook.com",

    // 其他配置
    landingImg: "https://s.ahzoo.cn/picture/22436164.png",
    bannerImg: "https://s.ahzoo.cn/picture/22436164.png",
    github: "https://github.com/ooahz",
    copyright: "本文依据<strong> CC-BY-NC-SA 4.0 </strong>许可协议授权，请您在转载时注明文章来源为"
        + "<a href='https://blog.ahzoo.cn' class='highlight' target='_blank' rel='noreferrer noopener'>"
        + "Z次源</a>，若本文涉及转载第三方内容，请您一同注明。",
    footer: "©2024 - 2026",
    icp: "豫ICP备20021466号",
    icpLink: "http://beian.miit.gov.cn",

    // 页面 Hero 背景图
    heroThumbnails: {
        default: "https://s.ahzoo.cn/picture/22436164.png",
        archive: "https://s.ahzoo.cn/picture/22436164.png",
        category: "https://s.ahzoo.cn/picture/22436164.png",
        comment: "https://s.ahzoo.cn/picture/22436164.png",
        search: "https://s.ahzoo.cn/picture/22436164.png",
        friends: "https://s.ahzoo.cn/picture/22436164.png"
    },

    // 功能开关
    feature: {
        // 评论功能（enable,disable)
        comment: "enable",
        // 搜索功能（enable,disable)
        search: "enable",
        // 友链交换功能（enable,disable)
        friendLink: "enable",
    }
})
