import {defineStore} from "pinia";
import type {AuthorInterface} from "@/types/authorInterface";

export const useAuthorStore = defineStore("authorStoreId", {
  state: () => {
    return {
      authorInfo: <AuthorInterface>{
        siteName: "Z次元",
        name: "十玖八柒",
        website: "https://blog.ahzoo.cn",
        avatar: "/avatar.webp",
        description: "一个收藏回忆与分享技术的地方",
        email: "ooahz@outlook.com",
        extendsParams: {
          landingImg: "https://s.ahzoo.cn/picture/22436164.png",
          github: "https://github.com/ooahz",
          copyright: "本文依据<strong> CC-BY-NC-SA 4.0 </strong>许可协议授权，请您在转载时注明文章来源为"
              + "<a href='https://blog.ahzoo.cn' class='highlight' target='_blank' rel='noreferrer noopener'>"
              + "Z次元</a>，若本文涉及转载第三方内容，请您一同注明。",
          footer: "©2024 ",
          icp: "ICP备xxxx号",
          icpLink: "http://beian.miit.gov.cn"
        }
      }
    };
  },
  actions: {
    getAuthorInfo(): AuthorInterface {
      return this.authorInfo;
    }
  }
});
