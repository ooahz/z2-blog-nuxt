<script setup lang="ts">
import type {PreviewArticle} from "@/types/articleInterface";
import type {Page} from "@/types/resultInterface";
import {listArticle} from "@/api/article";
import {useMenuStore} from "@/store/menuStore";
import {OuOPagination, OuOTag} from "@ahzoo/ouo";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";

const menuState = useMenuStore();

const articleList = ref<PreviewArticle[]>([]);
const page = ref<Page>();
const totalPage = ref(0);
const lastPagination = ref(0);

await getArticleList(1);

async function getArticleList(pagination: number) {
  const result = await listArticle(pagination);
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
  <div id="post" class="flex-[1]">
    <div class="box-header flex justify-between">
      <div class="filter flex">
        <OuOTag class="mr-2" :size="'small'" :checked=true @click="">
          全部文章
        </OuOTag>
      </div>
    </div>
    <div class="screen">
      <div v-for="article in articleList">
        <ArticleItem :article="article"/>
      </div>
    </div>
    <div class="pagination flex justify-center w-full mt-4">
      <OuOPagination v-if="totalPage>1" :total=totalPage @onclick="switchPage"/>
    </div>
  </div>
</template>

<style lang="scss">
.pagination {
  color: rgb(var(--z-fontcolor-gray));
}
</style>
