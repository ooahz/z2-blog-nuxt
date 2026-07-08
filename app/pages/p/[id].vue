<script setup lang="ts">
import type {ArticleInterface} from "@/types/articleInterface";
import type {PreviewColumnInterface} from "@/types/columnInterface";
import type {CommentItemInterface} from "@/types/commentInterface";
import {getArticleDetailApi} from "~~/service/article";
import {listColumnByArticleIdApi} from "~~/service/column";
import {listFriendApi} from "~~/service/comment";
import {useArticleStore} from "@/store/articleStore";
import {useMenuStore} from "@/store/menuStore";
import Prism from "prismjs";
import {OuOButton, OuODottedPagination} from "@ahzoo/ouo";
import {formatDateTime, getAttribute, setAttribute} from "@ahzoo/utils";
import ArticleColumn from "@/components/column/ArticleColumn.vue";
import Copyright from "@/static/svg/copyright.svg";
import Toc from "@/components/toc/Toc.vue";

const {path} = useRoute();
const appConfig = useAppConfig();
const menuState = useMenuStore();
const articleStore = useArticleStore();

// 配置菜单
menuState.setWithComment();
const {$viewport} = useNuxtApp();
const article = reactive<ArticleInterface>({} as ArticleInterface);
const columnList = reactive<Array<PreviewColumnInterface>>([]);
const commentList = ref<CommentItemInterface[]>([]);

const nowIndex = ref(0);
const articlePath = <string>path.split("/").pop();

/**
 * 数据获取
 */
await getArticleByPath(articlePath);
await getColumnByArticleId(article.id);
await getCommentList();

async function getCommentList(pagination: number = 1) {
  commentList.value = await listFriendApi(articlePath, pagination).then((res) => {
    if (!res) return [];
    return res.map(item => ({
      ...item,
      avatarDisplay: "text"
    }));
  });
}


function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth"
  });
}

/**
 * 切换底部相关专栏滑窗
 * @param page
 */
function switchColumn(page: any) {
  nowIndex.value = page.value - 1;
}

async function getColumnByArticleId(articleId: string) {
  if (!articleId) {
    return;
  }
  const newColumn = await listColumnByArticleIdApi(articleId);
  Object.assign(columnList, newColumn);
}

async function getArticleByPath(path: string) {
  const newArticle: ArticleInterface = await getArticleDetailApi(path);
  if (!newArticle || !newArticle.id) {
    navigateTo("/");
    return;
  }
  Object.assign(article, newArticle);
  return article;
}

/**
 * 动态修改主题
 */
function setProperty() {
  const articleEle = document.getElementById("article");
  if (!!article.style) {
    articleEle!.style.setProperty("--z-article-bg", article.style);
  }
}

function initStyle() {
  const attribute = getAttribute("scroll");
  if (attribute !== "scroll") {
    setAttribute("scroll", "top");
  }
}

definePageMeta({
  layout: "post",
  page: "post"
})

useSeoMeta({
  title: () => `${article.title ?? ""}`,
  description: () => `${article.description ?? appConfig.description}`
})

onMounted(() => {
  Prism.highlightAll();
  setProperty();
  initStyle();
});

onUnmounted(() => {
  // 重置toc
  articleStore.setTocList([]);
  articleStore.setSelectTitle("");
})
</script>
<template>
  <div v-if="!article.title" id="show" class="w-full h-full">
    <Loading/>
  </div>
  <div v-else>
    <Banner class="article__header">
      <div class="article-mask absolute"/>
      <div class="article-cover h-full absolute">
        <img :src="article.thumbnail" class="" alt="">
      </div>
      <div
          class="banner__container article__info w-full h-full absolute top-0 flex flex-col justify-center pad:px-11 mobile:px-5 mobile:pt-5 pad:pt-11 pc:pt-0">
        <div
            class="article__info-title font-semibold leading-loose pad:text-[2.8rem] mobile:text-[1.7rem] pc:mt-[-50px] screen:mt-[-50px]">
          {{ article.title }}
        </div>
        <div class="font-size-small flex flex-col mt-2">
          <span class="my-4 font-size-95">
            <span>创建时间：{{ formatDateTime(article?.createdDate) }}</span>
            <span class="mx-2">|</span>
            <span>最后更新：{{ formatDateTime(article?.updatedDate) }}</span>
          </span>
          <span class="article-meta__sort mt-2">
            <a :href="`/column/${columnItem.name}`" class="sort-column cursor-pointer" v-for="columnItem in columnList">{{
                columnItem.name
              }}</a>
          </span>
        </div>
      </div>
    </Banner>
    <div id="article">
      <div class="article__container flex justify-end mb-5 px-5 mobile:px-0">
        <div class="article__content flex flex-col pad:px-6 mobile:px-0 flex-1">
          <div class="aside sticky hidden screen:block">
            <div class="aside-item absolute flex flex-col">
              <OuOButton class="mb-3" :type="'card-2'" :equilateral="true" @click="scrollTo('#article')">置顶
              </OuOButton>
              <OuOButton :type="'card-2'" :equilateral="true" @click="scrollTo('#comment')">评论</OuOButton>
            </div>
          </div>
          <div id="article-content" class="article-content w-full rounded-t-xl leading-loose overflow-hidden"
               v-html="article.content">
          </div>
          <div class="copyright relative flex items-center my-5 p-5 rounded-b-xl overflow-hidden">
            <span v-html="appConfig.copyright"></span>
            <Copyright/>
          </div>
          <div class="column-list flex flex-col overflow-hidden relative">
            <ArticleColumn
                v-show="index===nowIndex"
                v-for="(column, index) in columnList"
                :column="column"/>
            <div class="w-full flex flex-row justify-center m-1">
              <OuODottedPagination v-if="columnList.length>=3" :total=3 @onclick="switchColumn"/>
              <OuODottedPagination v-if="columnList.length===2" :total=2 @onclick="switchColumn"/>
            </div>
          </div>
          <div v-if="!(appConfig.feature?.comment === 'disable')" class="box mt-3">
            <div class="absolute flex z-[2]">
              <div class="box-title-line w-1 h-5 mr-2.5 rounded-full"></div>
              <span class="title">评论区</span>
            </div>
            <div class="mt-3">
              <ClientOnly>
                <Comment :comment-list="commentList" @refresh="getCommentList"/>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="article__aside box pc:block pad:hidden mobile:hidden">
          <ClientOnly>
            <Toc/>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

#article {
  --z-article-bg: rgba(var(--z-primary-color), .8);
}

.article-content,
.copyright {
  background-color: rgb(var(--z-common-bg));
}

.article {
  &__header {
    --z-primary-color: 63, 71, 95;
    height: clamp(450px, 55vh, 550px);
    width: 100%;
    margin-left: -50vw;
    left: 50%;
    position: relative;
    overflow: hidden;

    .article-cover {
      position: relative;
      opacity: .5;
      width: 70%;
      height: 100%;
      margin: 0 -20% 0 auto;
      overflow: hidden;
      filter: blur(30px);
      transform: rotate(10deg) translateY(30%) scale(2) translateZ(0);

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 110px -130px 300px 60px rgba(var(--z-primary-color)) inset;
      }

      img {
        opacity: .8;
        object-fit: cover;
        min-width: 50vw;
        transition: opacity .5s ease-out;
      }
    }
  }

  &__container {
    animation: bottom-top 1s;
    width: 100%;
    max-width: var(--z-max-width);
    margin: auto;
    box-sizing: border-box;
  }

  &__content {
    min-width: 0;

    .article-content {
      padding: 18px 25px;
      min-height: 50vh;
      border-radius: 12px 12px 0 0;
      overflow-x: scroll;
      overflow-wrap: break-word;
    }

    .aside {
      top: var(--z-header-height);

      &-item {
        width: 52px;
        height: 52px;
        left: -70px;
      }
    }
  }

  &__aside {
    top: var(--z-header-height);
    position: sticky;
    overflow: hidden;
    width: clamp(200px, 23%, 350px);
    height: fit-content;
  }

  &__info {
    margin: auto;
    max-width: var(--z-max-width);
    color: rgba(var(--z-primary-fontcolor));
  }

  &-mask {
    inset: 0;
    background: rgba(var(--z-primary-color));
  }
}

.dark .article__header {
  filter: brightness(0.9);
}

.sort-category,
.sort-column {
  font-size: 95%;
  padding: 8px 10px;
  margin-right: 6px;
  background: rgba(var(--z-regular-bg), .2);
  border-radius: 12px;
  transition: all .3s;

  &:hover {
    color: rgba(var(--z-primary-color));
    background: rgba(var(--z-basic-color));
  }
}

.copyright {
  min-height: 80px;

  svg {
    position: absolute;
    top: 5px;
    right: -20px;
    width: 110px;
    height: 110px;
    opacity: .05;
    transform-origin: 50% 50%;
    transform: rotate(-20deg);
  }
}

@keyframes bottom-top {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    margin-top: 50px;
  }
  100% {
    opacity: 1;
    filter: none;
    margin-top: 0;
  }
}

[view="mobile"] {
  .article-content {
    padding: 10px 12px;
  }

  .article-cover {
    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 200%;
      bottom: 0;
      left: 0;
      box-shadow: 0 -214px 287px 45px var(--heo-main-op) inset;
      z-index: 0;
    }
  }
}

.dark {
  .article-mask {
    background: rgba(35, 38, 57, 20%);
  }
}

.box-title-line {
  margin-top: 3px;
  background-image: linear-gradient(rgba(var(--z-primary-color)), rgba(0, 0, 0, 0));
}
</style>

<style lang="scss">
[view="mobile"] {
  .article__header {
    height: 290px;
  }
}

.comment {
  &-head {
    height: 7px;
  }

  &-headline {
    display: none;
  }
}

.ouo-pagination__item.inactive {
  background-color: rgba(var(--ouo-primary-color), .1) !important;
  border: 1px solid rgb(var(--z-basic-input-color));
}
</style>
