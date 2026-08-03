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
import {ArrowUp, MessageSquare, BookOpen} from "lucide-vue-next";

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

// 阅读进度
const readingProgress = ref(0);
// 阅读时长（分钟）
const readingMinutes = ref(1);
// 刊号（基于路径的稳定 hash）
const issueNo = ref("001");

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
 * 计算阅读时长与刊号
 */
function computeMeta() {
  // 阅读时长：按字符数估算（中文按字符，英文按词；简单按字符 / 400）
  const text = (article.content || "").replace(/<[^>]+>/g, "");
  const chars = text.length;
  readingMinutes.value = Math.max(1, Math.round(chars / 400));

  // 刊号：路径字符的简单 hash -> 三位数字
  let hash = 0;
  for (let i = 0; i < articlePath.length; i++) {
    hash = (hash * 31 + articlePath.charCodeAt(i)) >>> 0;
  }
  issueNo.value = String(hash % 900 + 100).padStart(3, "0");
}

/**
 * 阅读进度（基于正文区域）
 */
function updateProgress() {
  const ele = document.getElementById("article-content");
  if (!ele) return;
  const rect = ele.getBoundingClientRect();
  const total = ele.offsetHeight - window.innerHeight + rect.top + 80;
  const scrolled = Math.max(0, -rect.top + 80);
  const ratio = Math.min(1, Math.max(0, scrolled / Math.max(1, total)));
  readingProgress.value = Math.round(ratio * 100);
}

let progressHandler: (() => void) | null = null;

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
  computeMeta();
  progressHandler = () => updateProgress();
  window.addEventListener("scroll", progressHandler, {passive: true});
  updateProgress();
});

onUnmounted(() => {
  // 重置toc
  articleStore.setTocList([]);
  articleStore.setSelectTitle("");
  if (progressHandler) {
    window.removeEventListener("scroll", progressHandler);
    progressHandler = null;
  }
})
</script>
<template>
  <div v-if="!article.title" id="show" class="w-full h-full">
    <Loading/>
  </div>
  <div v-else class="post-shell">

    <!-- 左侧浮动操作轴 -->
    <aside class="rail rail--left" aria-hidden="true">
      <div class="rail-inner">
        <button class="rail-btn" @click="scrollTo('#article')" title="回到顶部">
          <ArrowUp :size="16"/>
        </button>
        <span class="rail-divider"></span>
        <button class="rail-btn" @click="scrollTo('#comment')" title="前往评论">
          <MessageSquare :size="16"/>
        </button>
        <span class="rail-divider"></span>
        <div class="rail-meter">
          <div class="rail-meter-fill" :style="{height: readingProgress + '%'}"></div>
        </div>
        <span class="rail-percent">{{ readingProgress }}</span>
      </div>
    </aside>

    <!-- 巨型刊头 / Hero -->
    <header class="hero">
      <!-- 印刷网格 + 颗粒背景 -->
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="hero-grain" aria-hidden="true"></div>

      <!-- 巨型刊号水印 -->
      <div class="hero-watermark" aria-hidden="true">{{ issueNo }}</div>

      <!-- 顶部报纸式刊眉条 -->
      <div class="hero-mastbar">
        <div class="mastbar-left">
          <BookOpen :size="12"/>
          <span>ISSUE NO.{{ issueNo }}</span>
        </div>
        <div class="mastbar-center">
          <span v-if="columnList?.length" class="mastbar-cat">{{ columnList[0].name }}</span>
          <span v-else class="mastbar-cat">FEATURE</span>
        </div>
        <div class="mastbar-right">
          <span>{{ formatDateTime(article?.createdDate) }}</span>
        </div>
      </div>

      <!-- 主体不对称网格 -->
      <div class="hero-frame">
        <div class="hero-grid">

          <!-- 左列：标签 + 标题 + 引文 -->
          <div class="hero-left">
            <div class="hero-label">
              <span class="label-num">N°{{ issueNo }}</span>
              <span class="label-line"></span>
              <span class="label-text">FEATURE STORY</span>
            </div>

            <h1 class="hero-title">
              <span class="title-row title-row--1">{{ article.title }}</span>
            </h1>

            <div v-if="article.description" class="hero-pull">
              <span class="pull-mark" aria-hidden="true">"</span>
              <p class="pull-text">{{ article.description }}</p>
            </div>
          </div>

          <!-- 右列：封面图卡 -->
          <div class="hero-right">
            <figure class="hero-figure">
              <div class="figure-frame">
                <img :src="article.thumbnail" alt=""/>
                <span class="figure-corner figure-corner--tl" aria-hidden="true"></span>
                <span class="figure-corner figure-corner--br" aria-hidden="true"></span>
              </div>
              <figcaption class="figure-caption">
                <span class="fig-tag">FIG.01</span>
                <span class="fig-text">COVER — {{ article.title }}</span>
              </figcaption>
            </figure>
          </div>

        </div>

        <!-- 底部四列元信息条 -->
        <div class="hero-strip">
          <div class="strip-cell">
            <span class="cell-num">01</span>
            <div class="cell-body">
              <span class="cell-label">阅读时长</span>
              <span class="cell-value">{{ readingMinutes }} min</span>
            </div>
          </div>
          <div class="strip-cell">
            <span class="cell-num">02</span>
            <div class="cell-body">
              <span class="cell-label">最后更新</span>
              <span class="cell-value">{{ formatDateTime(article?.updatedDate) }}</span>
            </div>
          </div>
          <div v-if="columnList?.length" class="strip-cell">
            <span class="cell-num">03</span>
            <div class="cell-body">
              <span class="cell-label">所属专栏</span>
              <div class="cell-cols">
                <a v-for="columnItem in columnList" :key="columnItem.name"
                   :href="`/column/${columnItem.name}`" class="cell-col">
                  {{ columnItem.name }}
                </a>
              </div>
            </div>
          </div>
          <div class="strip-cell">
            <span class="cell-num">04</span>
            <div class="cell-body">
              <span class="cell-label">刊号</span>
              <span class="cell-value">NO.{{ issueNo }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 四角裁切标记 -->
      <span class="hero-crop hero-crop--tl" aria-hidden="true"></span>
      <span class="hero-crop hero-crop--tr" aria-hidden="true"></span>
      <span class="hero-crop hero-crop--bl" aria-hidden="true"></span>
      <span class="hero-crop hero-crop--br" aria-hidden="true"></span>
    </header>

    <!-- 主体：内容 + 右侧 sticky 索引栏 -->
    <div id="article" class="post-body">
      <div class="post-grid">

        <!-- 主内容列 -->
        <main class="post-main">
          <div class="lead-line" aria-hidden="true">
            <span class="lead-tag">正文</span>
            <span class="lead-rule"></span>
          </div>

          <article id="article-content" class="article-content" v-html="article.content"></article>

          <!-- 印章式版权区 -->
          <section class="stamp">
            <div class="stamp-edge" aria-hidden="true"></div>
            <div class="stamp-body">
              <div class="stamp-icon">
                <Copyright/>
              </div>
              <div class="stamp-text">
                <span class="stamp-kicker">COPYRIGHT</span>
                <p v-html="appConfig.copyright"></p>
              </div>
              <div class="stamp-seal">
                <span>NO.</span>
                <strong>{{ issueNo }}</strong>
              </div>
            </div>
          </section>

          <!-- 继续阅读 / 相关专栏 -->
          <section v-if="columnList?.length" class="continue">
            <div class="section-head">
              <span class="section-num">{{ String(columnList.length).padStart(2, '0') }}</span>
              <div class="section-head-text">
                <span class="section-kicker">CONTINUE READING</span>
                <h2 class="section-title">继续阅读 · 相关专栏</h2>
              </div>
              <span class="section-rule"></span>
            </div>

            <div class="column-stack">
              <ArticleColumn
                  v-show="index===nowIndex"
                  v-for="(column, index) in columnList"
                  :key="index"
                  :column="column"/>
              <div class="column-pager">
                <OuODottedPagination v-if="columnList.length>=3" :total="3" @onclick="switchColumn"/>
                <OuODottedPagination v-if="columnList.length===2" :total="2" @onclick="switchColumn"/>
              </div>
            </div>
          </section>

          <!-- 评论区 -->
          <section v-if="!(appConfig.feature?.comment === 'disable')" id="comment" class="post-comments">
            <div class="section-head">
              <span class="section-num">{{ String(commentList?.length || 0).padStart(2, '0') }}</span>
              <div class="section-head-text">
                <span class="section-kicker">DISCUSSION</span>
                <h2 class="section-title">读者来信</h2>
              </div>
              <span class="section-rule"></span>
            </div>

            <ClientOnly>
              <Comment :comment-list="commentList" @refresh="getCommentList"/>
            </ClientOnly>
          </section>
        </main>

        <!-- 右侧 sticky 索引栏 -->
        <aside class="post-aside">
          <div class="aside-sticky">
            <div class="aside-card aside-card--toc">
              <div class="aside-head">
                <span class="aside-kicker">CONTENTS</span>
                <span class="aside-count">{{ articleStore.tocList?.length || 0 }}</span>
              </div>
              <ClientOnly>
                <Toc/>
              </ClientOnly>
            </div>

            <div class="aside-card aside-card--meta">
              <div class="aside-head">
                <span class="aside-kicker">META</span>
              </div>
              <dl class="meta-list">
                <div class="meta-row">
                  <dt>刊号</dt>
                  <dd>NO.{{ issueNo }}</dd>
                </div>
                <div class="meta-row">
                  <dt>时长</dt>
                  <dd>{{ readingMinutes }} min</dd>
                </div>
                <div class="meta-row">
                  <dt>创建</dt>
                  <dd>{{ formatDateTime(article?.createdDate) }}</dd>
                </div>
                <div class="meta-row">
                  <dt>更新</dt>
                  <dd>{{ formatDateTime(article?.updatedDate) }}</dd>
                </div>
              </dl>
            </div>

            <div class="aside-cta">
              <OuOButton :type="'card-2'" :equilateral="true" @click="scrollTo('#article')">
                <ArrowUp :size="16"/>
              </OuOButton>
              <OuOButton :type="'card-2'" :equilateral="true" @click="scrollTo('#comment')">
                <MessageSquare :size="16"/>
              </OuOButton>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-shell {
  --z-article-bg: rgba(var(--z-primary-color), .8);
  --editorial-display: "kksj", "mi", "Times New Roman", Georgia, serif;
  --editorial-mono: "mi", ui-monospace, "SFMono-Regular", Menlo, monospace;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.article-content,
.copyright {
  background-color: rgb(var(--z-common-bg));
}

/* ============ 左侧浮动操作轴 ============ */
.rail--left {
  position: fixed;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  pointer-events: none;
}

.rail-inner {
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 14px 8px;
  background: rgba(var(--z-common-bg), 0.72);
  border: 1px solid rgba(var(--z-border-color), 0.5);
  border-radius: 999px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 40px -16px rgba(0, 0, 0, 0.18);
}

.rail-btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(var(--z-primary-color), 0.25);
  background: rgba(var(--z-basic-color), 0.6);
  color: rgb(var(--z-fontcolor));
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: rgb(var(--z-primary-color));
    color: rgb(var(--z-btn-fontcolor));
    transform: translateY(-2px);
    border-color: rgb(var(--z-primary-color));
  }
}

.rail-divider {
  width: 18px;
  height: 1px;
  background: rgba(var(--z-fontcolor), 0.18);
}

.rail-meter {
  position: relative;
  width: 4px;
  height: 120px;
  border-radius: 999px;
  background: rgba(var(--z-fontcolor), 0.12);
  overflow: hidden;
}

.rail-meter-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(var(--z-primary-color), 0.4), rgb(var(--z-primary-color)));
  transition: height 0.15s linear;
}

.rail-percent {
  font-family: var(--editorial-mono);
  font-size: 10px;
  color: rgba(var(--z-fontcolor), 0.55);
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* ============ 巨型刊头 / Hero ============ */
.hero {
  position: relative;
  width: 100%;
  min-height: clamp(480px, 78vh, 720px);
  margin-left: -50vw;
  left: 50%;
  overflow: hidden;
  isolation: isolate;
  --hero-tint: 63, 71, 95;
  background: rgb(var(--hero-tint));
  display: flex;
  flex-direction: column;
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.09;
  background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}

.hero-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.15;
  mix-blend-mode: overlay;
  background-image:
      repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 3px),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 3px);
  pointer-events: none;
}

/* 巨型刊号水印 */
.hero-watermark {
  position: absolute;
  z-index: 1;
  right: -3vw;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--editorial-display);
  font-size: clamp(20rem, 42vw, 38rem);
  font-weight: 900;
  line-height: 0.8;
  color: rgba(255, 255, 255, 0.045);
  letter-spacing: -0.05em;
  pointer-events: none;
  user-select: none;
}

/* 顶部报纸式刊眉条 */
.hero-mastbar {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 14px clamp(28px, 6vw, 80px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  font-family: var(--editorial-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  .mastbar-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mastbar-center {
    .mastbar-cat {
      padding: 3px 12px;
      border: 1px solid rgba(255, 255, 255, 0.45);
      border-radius: 2px;
      letter-spacing: 1.8px;
    }
  }

  .mastbar-right {
    text-align: right;
  }
}

/* 主体框架 */
.hero-frame {
  position: relative;
  z-index: 3;
  flex: 1;
  width: 100%;
  max-width: var(--z-max-width);
  margin: 0 auto;
  padding: clamp(36px, 5vh, 60px) clamp(28px, 6vw, 80px) clamp(28px, 4vh, 44px);
  display: flex;
  flex-direction: column;
  color: rgb(var(--z-primary-fontcolor));
}

/* 不对称网格：左标题 / 右封面 */
.hero-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
}

/* 左列：标签 + 标题 + 引文 */
.hero-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  animation: heroIn 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: clamp(20px, 3vh, 32px);

  .label-num {
    font-family: var(--editorial-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.8px;
    color: rgba(255, 255, 255, 0.9);
    padding: 4px 10px;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 2px;
  }

  .label-line {
    flex: 0 0 40px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
  }

  .label-text {
    font-family: var(--editorial-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.65);
  }
}

.hero-title {
  margin: 0;
  padding: 0;
  font-family: var(--editorial-display);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -2px;
  font-size: clamp(2.8rem, 7vw, 5.6rem);
  text-wrap: balance;
  color: #fff;

  .title-row {
    display: block;
    background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.82) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

/* 引文（pull quote） */
.hero-pull {
  position: relative;
  margin-top: clamp(22px, 3vh, 34px);
  padding-left: 22px;
  border-left: 3px solid rgba(255, 255, 255, 0.55);
  max-width: 52ch;

  .pull-mark {
    position: absolute;
    left: 10px;
    top: -18px;
    font-family: var(--editorial-display);
    font-size: 3.2rem;
    line-height: 1;
    color: rgba(255, 255, 255, 0.28);
    pointer-events: none;
  }

  .pull-text {
    margin: 0;
    font-size: clamp(0.92rem, 1.3vw, 1.08rem);
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
    letter-spacing: 0.2px;
  }
}

/* 右列：封面图卡 */
.hero-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: heroIn 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.hero-figure {
  margin: 0;
  position: relative;

  .figure-frame {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.55);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(1.05) contrast(1.05);
      transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  .figure-corner {
    position: absolute;
    z-index: 2;
    width: 16px;
    height: 16px;
    pointer-events: none;

    &--tl {
      top: 10px;
      left: 10px;
      border-top: 2px solid rgba(255, 255, 255, 0.75);
      border-left: 2px solid rgba(255, 255, 255, 0.75);
    }

    &--br {
      bottom: 10px;
      right: 10px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.75);
      border-right: 2px solid rgba(255, 255, 255, 0.75);
    }
  }

  .figure-caption {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-family: var(--editorial-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);

    .fig-tag {
      flex-shrink: 0;
      padding: 2px 8px;
      background: rgba(255, 255, 255, 0.14);
      border-radius: 2px;
      color: #fff;
    }

    .fig-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* 底部四列元信息条 */
.hero-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: clamp(28px, 4vh, 44px);
  padding-top: clamp(20px, 3vh, 28px);
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  animation: heroIn 0.8s 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;

  .strip-cell {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 0 18px;
    border-right: 1px solid rgba(255, 255, 255, 0.12);

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      border-right: 0;
      padding-right: 0;
    }
  }

  .cell-num {
    flex-shrink: 0;
    font-family: var(--editorial-display);
    font-size: 1.6rem;
    font-weight: 900;
    line-height: 1;
    color: rgba(255, 255, 255, 0.35);
  }

  .cell-body {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .cell-label {
    font-family: var(--editorial-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }

  .cell-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: 0.3px;
  }

  .cell-cols {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .cell-col {
    padding: 2px 9px;
    font-size: 11px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.95);
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.95);
      color: rgb(var(--hero-tint));
    }
  }
}

/* 四角裁切标记 */
.hero-crop {
  position: absolute;
  z-index: 5;
  width: 22px;
  height: 22px;
  pointer-events: none;

  &--tl {
    top: 12px;
    left: 12px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
  }

  &--tr {
    top: 12px;
    right: 12px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
  }

  &--bl {
    bottom: 12px;
    left: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
  }

  &--br {
    bottom: 12px;
    right: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
  }
}

@keyframes heroIn {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* ============ 主体布局 ============ */
.post-body {
  position: relative;
  width: 100%;
  background: rgb(var(--z-global-bg));
}

.post-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(240px, 22%, 320px);
  gap: clamp(32px, 4vw, 64px);
  width: 100%;
  max-width: var(--z-max-width);
  margin: 0 auto;
  padding: clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px) 80px;
  box-sizing: border-box;
  animation: bodyIn 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes bodyIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-main {
  min-width: 0;
}

/* ============ 正文 / 引导线 ============ */
.lead-line {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;

  .lead-tag {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    font-family: var(--editorial-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: rgb(var(--z-primary-fontcolor));
    background: rgb(var(--z-primary-color));
    border-radius: 4px;
  }

  .lead-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(var(--z-primary-color), 0.6), rgba(var(--z-primary-color), 0));
  }
}

.article-content {
  padding: clamp(24px, 3vw, 40px);
  min-height: 50vh;
  border-radius: 4px;
  background: rgb(var(--z-common-bg));
  overflow-x: auto;
  overflow-wrap: break-word;
  box-shadow: 0 1px 0 rgba(var(--z-fontcolor), 0.04), 0 18px 40px -28px rgba(0, 0, 0, 0.2);
  position: relative;

  /* 首段首字下沉 */
  > p:first-of-type::first-letter {
    font-family: var(--editorial-display);
    font-size: 3.4em;
    font-weight: 900;
    line-height: 0.85;
    float: left;
    margin: 6px 12px 0 0;
    color: rgb(var(--z-primary-color));
    background: linear-gradient(180deg, rgba(var(--z-primary-color), 1) 0%, rgba(var(--z-primary-color), 0.55) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

/* ============ 印章式版权 ============ */
.stamp {
  position: relative;
  margin: clamp(28px, 4vw, 48px) 0;
  border-radius: 4px;
  overflow: hidden;
  background: rgb(var(--z-common-bg));
  border: 1px dashed rgba(var(--z-primary-color), 0.35);
}

.stamp-edge {
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(var(--z-primary-color), 0.18);
  border-radius: 2px;
  pointer-events: none;
}

.stamp-body {
  position: relative;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: clamp(22px, 3vw, 36px);

  .stamp-icon {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(var(--z-primary-color), 0.08);
    color: rgb(var(--z-primary-color));

    svg {
      width: 30px;
      height: 30px;
      opacity: 0.85;
    }
  }

  .stamp-text {
    flex: 1;
    min-width: 0;

    .stamp-kicker {
      display: inline-block;
      font-family: var(--editorial-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.6px;
      color: rgb(var(--z-primary-color));
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.7;
      color: rgba(var(--z-fontcolor), 0.85);
    }

    a {
      color: rgb(var(--z-primary-color));
      font-weight: 600;
      text-decoration: none;
    }
  }

  .stamp-seal {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border: 2px solid rgb(var(--z-primary-color));
    border-radius: 8px;
    transform: rotate(-6deg);
    color: rgb(var(--z-primary-color));
    font-family: var(--editorial-mono);

    span {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.4px;
    }

    strong {
      font-size: 1.6rem;
      font-weight: 900;
      line-height: 1;
      margin-top: 2px;
    }
  }
}

/* ============ 章节标题（继续阅读 / 评论）============ */
.section-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: clamp(40px, 5vw, 64px) 0 24px;

  .section-num {
    flex-shrink: 0;
    font-family: var(--editorial-display);
    font-size: 2.6rem;
    font-weight: 900;
    line-height: 1;
    color: rgb(var(--z-primary-color));
    opacity: 0.95;
  }

  .section-head-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .section-kicker {
    font-family: var(--editorial-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.8px;
    color: rgba(var(--z-fontcolor), 0.55);
    text-transform: uppercase;
  }

  .section-title {
    margin: 0;
    font-family: var(--editorial-display);
    font-size: clamp(1.3rem, 2.4vw, 1.8rem);
    font-weight: 800;
    color: rgb(var(--z-fontcolor));
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .section-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(var(--z-primary-color), 0.4), rgba(var(--z-primary-color), 0));
  }
}

/* ============ 继续阅读 / 专栏列表 ============ */
.column-stack {
  position: relative;

  .column-pager {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}

/* ============ 评论 ============ */
.post-comments {
  scroll-margin-top: 100px;
}

/* ============ 右侧 sticky 索引栏 ============ */
.post-aside {
  position: relative;
}

.aside-sticky {
  position: sticky;
  top: calc(var(--z-header-height) + 16px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aside-card {
  background: rgb(var(--z-common-bg));
  border: 1px solid rgba(var(--z-border-color), 0.45);
  border-radius: 4px;
  padding: 18px 18px 20px;
  box-shadow: 0 14px 40px -28px rgba(0, 0, 0, 0.25);
}

.aside-card--toc {
  max-height: calc(100vh - var(--z-header-height) - 120px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.aside-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(var(--z-fontcolor), 0.1);

  .aside-kicker {
    font-family: var(--editorial-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.8px;
    color: rgb(var(--z-primary-color));
    text-transform: uppercase;
  }

  .aside-count {
    display: grid;
    place-items: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 999px;
    background: rgba(var(--z-primary-color), 0.12);
    color: rgb(var(--z-primary-color));
    font-family: var(--editorial-mono);
    font-size: 11px;
    font-weight: 700;
  }
}

.aside-card--toc :deep(.toc-container) {
  max-height: none;
  overflow-y: auto;
  padding-right: 4px;
}

.meta-list {
  margin: 0;
  padding: 0;

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(var(--z-fontcolor), 0.1);

    &:last-child {
      border-bottom: 0;
    }
  }

  dt {
    font-family: var(--editorial-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: rgba(var(--z-fontcolor), 0.55);
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgb(var(--z-fontcolor));
    text-align: right;
  }
}

.aside-cta {
  display: flex;
  gap: 10px;

  :deep(button) {
    flex: 1;
  }
}

/* ============ 暗色模式 ============ */
.dark {
  .hero-figure .figure-frame img {
    filter: saturate(0.9) brightness(0.82);
  }

  .article-content {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 18px 40px -28px rgba(0, 0, 0, 0.6);
  }
}

/* ============ 响应式 ============ */
[view="mobile"] {
  .rail--left {
    display: none;
  }

  .hero {
    min-height: auto;
    margin-left: 0;
    left: 0;
  }

  .hero-mastbar {
    padding: 11px 18px;
    gap: 10px;
    font-size: 10px;
    letter-spacing: 1.2px;
  }

  .hero-frame {
    padding: 26px 18px 24px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .hero-right {
    order: -1;
  }

  .hero-figure .figure-frame {
    aspect-ratio: 16 / 10;
  }

  .hero-watermark {
    font-size: clamp(14rem, 60vw, 22rem);
    right: -8vw;
    opacity: 0.6;
  }

  .hero-strip {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 0;

    .strip-cell {
      padding: 0 12px;
      border-right: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 12px;

      &:first-child {
        padding-left: 12px;
      }

      &:nth-child(2n+1) {
        padding-left: 0;
      }

      &:nth-child(2n) {
        border-right: 0;
      }

      &:nth-last-child(-n+2) {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    .cell-num {
      font-size: 1.3rem;
    }
  }

  .hero-crop {
    display: none;
  }

  .post-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 28px 16px 60px;
  }

  .post-aside {
    order: -1;
  }

  .aside-sticky {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }

  .aside-card {
    flex: 1 1 100%;
  }

  .aside-card--meta,
  .aside-cta {
    display: none;
  }

  .aside-card--toc {
    max-height: 240px;
  }

  .article-content {
    padding: 18px 16px;

    > p:first-of-type::first-letter {
      font-size: 2.8em;
    }
  }

  .stamp-body {
    flex-wrap: wrap;

    .stamp-seal {
      display: none;
    }
  }

  .section-head {
    gap: 12px;

    .section-num {
      font-size: 2rem;
    }
  }
}

@media (max-width: 1280px) {
  .rail--left {
    display: none;
  }
}
</style>

<style lang="scss">
[view="mobile"] {
  .article-content {
    padding: 16px 14px;
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
