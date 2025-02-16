import authorConfig from './author.config'

export default defineAppConfig({
    ...authorConfig,
    landingImg: "https://s.ahzoo.cn/picture/22436164.png",
    github: "https://github.com/ooahz",
    copyright: "本文依据<strong> CC-BY-NC-SA 4.0 </strong>许可协议授权，请您在转载时注明文章来源为"
        + "<a href='https://blog.ahzoo.cn' class='highlight' target='_blank' rel='noreferrer noopener'>"
        + "Z次元</a>，若本文涉及转载第三方内容，请您一同注明。",
    footer: "©2024 - 2025",
    icp: "豫ICP备20021466号",
    icpLink: "http://beian.miit.gov.cn"
})
