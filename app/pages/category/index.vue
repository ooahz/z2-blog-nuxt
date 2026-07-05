<script setup lang="ts">
import type {PreviewColumnInterface} from "@/types/columnInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";
import {listCategoryApi} from "~~/service/category";
import {listAllColumnApi, listColumnByCategoryIdApi} from "~~/service/column";
import PageHero from "@/layouts/PageHero.vue";

const categoryList = ref<CategoryMapInterface[]>([]);
const columnList = ref<PreviewColumnInterface[]>([]);
const totalColumnCount = ref(0);
const selectIndex = ref(-1);
const loading = ref(false);

await getCategoryList();
await getAllColumnList();

async function getCategoryList() {
  categoryList.value = await listCategoryApi();
}

async function getAllColumnList() {
  loading.value = true;
  selectIndex.value = -1;
  columnList.value = await listAllColumnApi();
  totalColumnCount.value = columnList.value.length;
  loading.value = false;
}

async function getColumnListByCategoryId(category: CategoryMapInterface, index: number) {
  if (index === selectIndex.value) {
    return;
  }
  loading.value = true;
  selectIndex.value = index;
  columnList.value = await listColumnByCategoryIdApi(category.id, 1);
  loading.value = false;
}

const appConfig = useAppConfig();
const heroThumbnail = appConfig.heroThumbnails.category ?? appConfig.heroThumbnails.default;
const heroSubtitle = "这里本来是要写页面简介，但是没想好写什么";

const heroStats = computed(() => [
  { value: categoryList.value.length, label: "个分类" },
  { value: totalColumnCount.value, label: "个专栏" },
]);

useSeoMeta({
  title: "专栏分类" + " | Z次元",
  ogTitle: "专栏分类" + " | Z次元"
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        title="分类&专栏"
        eyebrow="Category"
        :subtitle="heroSubtitle"
        :thumbnail="heroThumbnail"
        :stats="heroStats"
      />
    </template>

    <Category
      :category-list="categoryList"
      :column-list="columnList"
      :select-index="selectIndex"
      :loading="loading"
      @select-all="getAllColumnList"
      @select-category="getColumnListByCategoryId"
    />
  </NuxtLayout>
</template>
