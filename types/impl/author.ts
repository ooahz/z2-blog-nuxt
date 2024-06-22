import type {AuthorInterface} from "@/types/authorInterface";

const copyrightWebsite = "";

export class AuthorImpl implements AuthorInterface {
    avatar: string = "/avatar.webp";
    description: string = "一个收藏回忆与分享技术的地方";
    website: string = "https://ouo.pub";
    icp: string = "京ICP备xxxxxxxx号";
    saying: string = "每天进步多一点👏";
    email: string = "ooahz@outlook.com";
    github: string = "https://github.com/ooahz";
    name: string = "十玖八柒";
    enName: string = "Ahzoo";
    siteName: string = "Z次元";
    copyright: string = "本文依据 <a class='highlight' href=" + copyrightWebsite + ">CC-BY-NC-SA 4.0 许可协议</a> 授权，请您在转载时注明文章来源为 <a class='highlight' href=" + this.website + ">" + this.name + "</a> ，若本文涉及转载第三方内容，请您一同注明。";
    footer: string = "©2024 ";
}
