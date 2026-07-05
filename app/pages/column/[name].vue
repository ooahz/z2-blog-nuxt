<script setup lang="ts">
import type {ArticleInterface} from "@/types/articleInterface";
import type {PageInfoInterface} from "@/types/pageInfoInterface";
import type {PreviewColumnInterface} from "@/types/columnInterface";
import {getColumnInfoApi} from "~~/service/column";
import {listArticleByColumnIdApi} from "~~/service/article";
import PageHero from "@/layouts/PageHero.vue";
import FeaturedArticle from "@/components/list/FeaturedArticle.vue";
import ArticleItemGrid from "@/components/list/ArticleItemGrid.vue";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";
import {FileText} from "lucide-vue-next";

const {path} = useRoute();

const articleList = ref<ArticleInterface[]>([]);
const columnInfo = reactive<PageInfoInterface>({
  title: ""
});
const previewColumn = ref<PreviewColumnInterface>();

const articlePath = <string>path.split("/").pop();
await getColumnInfoByName(articlePath);
await getArticleListByColumnId(previewColumn.value.id, 1);

const leadArticle = computed<ArticleInterface | undefined>(() => articleList.value[0]);
const restArticles = computed<ArticleInterface[]>(() => articleList.value.slice(1));
const totalCount = computed(() => previewColumn.value?.total ?? articleList.value.length);

async function getColumnInfoByName(name: string) {
  previewColumn.value = await getColumnInfoApi(name);
  columnInfo.title = previewColumn.value.name;
  columnInfo.thumbnail = previewColumn.value.thumbnail;
  columnInfo.description = previewColumn.value.description;
  columnInfo.style = previewColumn.value.style;
}

async function getArticleListByColumnId(columnId: string, pagination: number) {
  articleList.value = await listArticleByColumnIdApi(columnId, pagination);
}

watch(() => columnInfo.style, (style) => {
  if (import.meta.client && style) {
    document.getElementById("ahzoo")?.style.setProperty("--z-bg", style);
  }
}, {immediate: true});

const heroStats = computed(() => {
  const stats = [{ value: totalCount.value, label: "篇文章" }];
  const categoryCount = previewColumn.value?.categoryList?.length;
  if (categoryCount) {
    stats.push({ value: categoryCount, label: "个分类" });
  }
  return stats;
});

definePageMeta({
  layout: false,
  layoutProps: {fullPage: true}
})

useSeoMeta({
  title: () => `${columnInfo.title ?? "专栏"}`,
  description: () => `${columnInfo.description ?? "专栏页"}`
})
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        :title="columnInfo.title || '专栏'"
        eyebrow="Column"
        :subtitle="columnInfo.description"
        :thumbnail="columnInfo.thumbnail"
        :stats="heroStats"
      />
    </template>

    <div class="column-page flex">
      <div class="page-content w-full">
        <div v-if="$viewport.isLessThan('lg')">
          <ArticleItem v-for="article in articleList"
                       :key="article.path"
                       :article="article"/>
        </div>
        <template v-else>
          <section class="masthead" v-if="articleList.length">
            <div class="masthead__left">
              <span class="masthead__dot"/>
              <span class="masthead__label">Column Articles</span>
            </div>
            <div class="masthead__right">
              <FileText :size="14"/>
              <span>专栏文章</span>
            </div>
            <div class="masthead__rule"/>
          </section>

          <FeaturedArticle v-if="leadArticle" :article="leadArticle" :index="0" class="mb-8"/>

          <section class="story-grid" v-if="restArticles.length">
            <div class="story-grid__list">
              <ArticleItemGrid
                  v-for="(article, i) in restArticles"
                  :key="article.path"
                  :article="article"
                  :index="i + 1"/>
            </div>
          </section>
        </template>
      </div>

      <Sidebar class="w-1/3"
               v-if="!$viewport.isLessThan('lg')"/>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.column-page {
  gap: 0;
}

.masthead {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 4px 18px;
  margin-bottom: 22px;
  opacity: 0;
  animation: masthead-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.75s forwards;

  &__left {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(var(--z-fontcolor), 0.6);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgb(var(--z-primary-color));
    animation: pulse-dot 2.4s ease-in-out infinite;
  }

  &__right {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: rgba(var(--z-fontcolor), 0.5);

    svg {
      opacity: 0.7;
    }
  }

  &__rule {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
            rgba(var(--z-primary-color), 0.4) 0%,
            rgba(var(--z-fontcolor), 0.08) 30%,
            transparent 100%);
  }
}

.story-grid {
  margin-top: 36px;
}

.story-grid__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

@keyframes masthead-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}
</style>
