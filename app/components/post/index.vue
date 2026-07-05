<script setup lang="ts">
import type {PreviewArticleInterface} from "@/types/articleInterface";
import type {Page} from "@/types/resultInterface";
import {listArticleApi} from "~~/service/article";
import {useMenuStore} from "@/store/menuStore";
import {OuOPagination} from "@ahzoo/ouo";
import FeaturedArticle from "@/components/list/FeaturedArticle.vue";
import ArticleItemGrid from "@/components/list/ArticleItemGrid.vue";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";

const menuState = useMenuStore();
const {$viewport} = useNuxtApp();

const articleList = ref<PreviewArticleInterface[]>([]);
const page = ref<Page>();
const totalPage = ref(0);
const lastPagination = ref(0);

await getArticleList(1);

async function getArticleList(pagination: number) {
  const result = await listArticleApi(pagination);
  articleList.value = result.data;
  const pageRes = result.page;
  if (pageRes?.size > 0) {
    page.value = result.page;
    totalPage.value = Math.floor(Number.parseInt(pageRes.total) / pageRes.size) + 1;
  }
}

function switchPage(pagination: any) {
  const newPagination = pagination.value;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > totalPage) {
    return;
  }
  lastPagination.value = newPagination;
  getArticleList(newPagination);
}

onMounted(() => {
  menuState.setWithoutComment();
});
</script>

<template>
  <div id="post" class="flex-1">
    <div class="screen" v-if="$viewport.isLessThan('lg')">
      <ArticleItem v-for="article in articleList"
                   :key="article.path"
                   :article="article"/>
    </div>
    <div class="screen" v-else>
      <FeaturedArticle v-if="articleList?.length"
                       :article="articleList[0]"
                       :index="0"
                       class="mb-8"/>
      <div class="post-grid mt-4" v-if="articleList?.length > 1">
        <ArticleItemGrid
            v-for="(article, i) in articleList?.slice(1)"
            :key="article.path"
            :article="article"
            :index="i + 1"/>
      </div>
    </div>
    <div class="pagination flex justify-center w-full mt-4">
      <OuOPagination v-if="totalPage>1" :total=totalPage @onclick="switchPage"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.post-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.screen {
  :deep(.lead) {
    animation-delay: 0.1s !important;
  }
  :deep(.story) {
    animation-delay: calc(var(--item-index, 0) * 60ms + 0.25s) !important;
  }
}

.pagination {
  color: rgb(var(--z-fontcolor-gray));
}
</style>
