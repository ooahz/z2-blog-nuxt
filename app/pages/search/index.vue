<script setup lang="ts">
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {searchAllApi} from "~~/service/search";
import {useSearchStore} from "@/store/searchStore";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";
import PageHero from "@/layouts/PageHero.vue";

const searchStore = useSearchStore();

const searchList = ref<PreviewArticleInterface[]>([] as PreviewArticleInterface[]);
const showLoading = ref(false);

/**
 * 数据获取
 */
await searchArticleList(searchStore.keyword, 1);

async function searchArticleList(keyword: string, pagination: number) {
  if (!searchStore.keyword) {
    navigateTo("/");
    return;
  }
  const params = {
    "k": keyword,
    "p": pagination
  };
  showLoading.value = true;
  searchList.value = await searchAllApi(params);
  showLoading.value = false;
}

/**
 * 监听搜索关键词变化
 */
searchStore.$subscribe((mutation, state) => {
  searchArticleList(state.marking, 1);
});

const appConfig = useAppConfig();
const heroThumbnail = appConfig.heroThumbnails.search ?? appConfig.heroThumbnails.default;
const heroSubtitle = computed(() => searchStore.keyword ? `正在搜索：${searchStore.keyword}` : "");

const heroStats = computed(() => [
  { value: searchList.value.length, label: "条结果" },
]);

useSeoMeta({
  title: "搜索",
  description: "搜索页"
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        title="文章搜索"
        eyebrow="Search"
        :subtitle="heroSubtitle"
        :thumbnail="heroThumbnail"
        :stats="heroStats"
      />
    </template>

    <div v-show="showLoading" class="w-full h-full">
      <Loading/>
    </div>
    <div v-show="!showLoading" class="page-content w-full">
      <div class="mt-7">
        <div v-if="!searchList||searchList.length<=0" class="text-center">
          什么也没有搜索到（⊙ｏ⊙）
        </div>
        <div v-for="article in searchList">
          <ArticleItem :article="article"/>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
