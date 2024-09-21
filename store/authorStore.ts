import {defineStore} from "pinia";
import type {AuthorInterface} from "@/types/authorInterface";
import {getAuthorInfoDetail} from "@/api/author";

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
      getAuthorInfoDetail().then((res) => {
        if (res && res.website) {
          if (!res.siteName) {
            res.siteName = this.authorInfo.siteName;
          }
          if (!res.extendsParams) {
            res.extendsParams = this.authorInfo.extendsParams;
          }
          this.setAuthorInfo(res);
          this.setExtendsParams(res);
        }
      });
      return this.authorInfo;
    },
    setAuthorInfo(authorInfo: AuthorInterface) {
      this.authorInfo = authorInfo;
    },
    setExtendsParams(authorInfo: AuthorInterface) {
      if (typeof authorInfo.extendsParams === "string") {
        this.authorInfo.extendsParams = JSON.parse(authorInfo.extendsParams);
      }
    }
  }
});
