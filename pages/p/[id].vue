<script setup lang="ts">
import type {Article} from "@/types/articleInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import type {TocInterface} from "@/types/tocInterface";
import {getArticleDetailApi} from "@/api/article";
import {listColumnByArticleIdApi} from "@/api/column";
import {useArticleStore} from "@/store/articleStore";
import {useMenuStore} from "@/store/menuStore";
import Prism from "prismjs";
import {OuOButton, OuODottedPagination} from "@ahzoo/ouo";
import {formatDateTime, getAttribute, setAttribute, tocGenerateByDomId} from "@ahzoo/utils";
import ArticleColumn from "@/components/column/ArticleColumn.vue";
import Copyright from "@/static/svg/copyright.svg";

const {path} = useRoute();
const appConfig = useAppConfig();
const menuState = useMenuStore();
const articleStore = useArticleStore();

// 配置菜单
menuState.setWithComment();
const {$viewport} = useNuxtApp();
const article = reactive<Article>({} as Article);
const columnList = reactive<Array<PreviewColumn>>([]);
const articleTocList = ref<TocInterface[]>([]);
const nowIndex = ref(0);
const articlePath = <string>path.split("/").pop();

/**
 * 数据获取
 */
await getArticleByPath(articlePath);
await getColumnByArticleId(article.id);

function initToc() {
  articleTocList.value = tocGenerateByDomId("#article-content");
  articleStore.setTocList(articleTocList.value);
  articleStore.setSelectTitle(articleTocList.value[0]?.id);
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
  const newArticle: Article = await getArticleDetailApi(path);
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
    setAttribute("scroll", "primary");
  }
}

function goColumnPage(columnName: string) {
  navigateTo(`/column/${columnName}`);
}

definePageMeta({
  layout: "post"
})

useSeoMeta({
  title: () => `${article.title ?? ""}`,
  description: () => `${article.description ?? appConfig.description}`
})

onMounted(() => {
  initToc();
  Prism.highlightAll();
  setProperty();
  initStyle();
});

onUnmounted(() => {
  // 重置toc
  articleStore.setTocList([]);
})
</script>
<template>
  <div class="w-full">
    <Header/>
  </div>
  <div id="article" class="w-full">
    <div v-if="!article.title" id="show" class="w-full h-full">
      <Loading/>
    </div>
    <div v-else class="article__header relative">
      <div class="article-cover h-full absolute">
        <img :src="article.thumbnail" alt="">
      </div>
      <div class="article-mask absolute"></div>
      <div class="article__info w-full h-full relative t-0 flex flex-col justify-center px-11 mobile:px-5 mobile:pt-11">
        <div class="article__info-title font-semibold leading-loose text-[2.8rem] mobile:text-[1.7rem]">
          {{ article.title }}
        </div>
        <div class="font-size-small flex flex-col">
          <span class="my-4">
            <span>创建时间：{{ formatDateTime(article?.createdDate) }}</span>
            <span class="mx-2">|</span>
            <span>最后更新：{{ formatDateTime(article?.updatedDate) }}</span>
          </span>
          <span class="article-meta__sort mt-">
            <span class="sort-column cursor-pointer" v-for="columnItem in columnList"
                  @click="goColumnPage(columnItem.name)">{{ columnItem.name }}</span>
          </span>
        </div>
      </div>
      <svg v-if="!$viewport.isLessThan('lg')"
           class="article-waves w-full absolute bottom-0" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="waves-gentle" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="waves-parallax">
          <use xlink:href="#waves-gentle" x="48" y="0"/>
          <use xlink:href="#waves-gentle" x="48" y="3"/>
          <use xlink:href="#waves-gentle" x="48" y="5"/>
          <use xlink:href="#waves-gentle" x="48" y="7"/>
        </g>
      </svg>
    </div>
    <div class="article__container flex justify-end w-full p-5 mb-5 mobile:p-1">
      <div class="article__content px-6 w-[72%] mobile:w-full mobile:px-0 pad:w-full">
        <div class="aside sticky hidden screen:block">
          <div class="aside-item absolute flex flex-col">
            <OuOButton class="mb-3" :type="'card-2'" :equilateral="true" @click="scrollTo('#article')">置顶</OuOButton>
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
        <div v-if="!(appConfig.feature.comment === 'disable')" class="box mt-3">
          <Comment/>
        </div>
      </div>

      <div class="article__aside box pad:hidden mobile:hidden">
        <ClientOnly>
          <!--          目录-->
          <div id="article-toc"
               v-for="articleTocItem in articleTocList">
            <TocItem :toc="articleTocItem"/>
          </div>
        </ClientOnly>
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
    height: clamp(360px, 40vh, 500px);
    overflow: hidden;
    background: var(--z-article-bg);

    .article-cover {
      opacity: .5;
      width: 65%;
      right: 0;
      margin: 0 -20% 0 auto;
      transform: rotate(10deg) translateY(-10%) scale(2);
      filter: blur(10px);
    }
  }

  &__container {
    animation: bottom-top 1s;
    max-width: 1500px;
    margin: auto;
  }

  &__content {
    .article-content {
      padding: 18px 25px;
      min-height: 50vh;
      overflow-x: scroll;
      overflow-wrap: break-word;
    }

    .aside {
      top: 66px;

      &-item {
        width: 52px;
        height: 52px;
        left: -70px;
      }
    }
  }

  &__aside {
    top: 66px;
    position: sticky;
    overflow: hidden;
    width: 20%;
    height: fit-content;
    min-width: 200px;
  }

  &__info {
    margin: auto;
    max-width: 1500px;
    color: rgba(var(--z-primary-fontcolor));
  }

  &-mask {
    inset: 0;
    background: rgba(var(--z-primary-color), .7);
  }
}

[data-theme="dark"] .article__header {
  filter: brightness(0.9);
}

.sort-category,
.sort-column {
  padding: 6px 11px;
  margin-right: 6px;
  background: #ffffff52;
  border-radius: 5px;
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

.article-waves {
  height: 90px;
}

.waves-parallax {
  &:nth-child(1) {
    fill: rgba(var(--z-basic-color), .7);
  }

  &:nth-child(2) {
    fill: rgba(var(--z-basic-color), .5);
  }

  &:nth-child(3) {
    fill: rgba(var(--z-basic-color), .3);
  }

  &:nth-child(3) {
    fill: rgb(var(--z-basic-color));
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
</style>

<style lang="scss">
.mobile-view {
  .article__header {
    height: 280px;
  }
}

.article__content {
  a {
    padding: 0 3px;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 2px dotted rgba(var(--z-fontcolor-gray), 1);
    border-radius: 3px 3px 0 0;
    transition: all .2s;

    &:hover {
      padding: 1px 3px;
      color: rgb(var(--z-basic-color));
      background-color: rgba(var(--z-primary-color), .7);
      border-width: 0;
      border-radius: 3px;
    }
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
