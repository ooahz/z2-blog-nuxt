<script setup lang="ts">
import type {CategoryMapInterface} from "@/types/categoryInterface";
import type {PreviewColumnInterface} from "@/types/columnInterface";
import {listCategoryApi} from "~~/service/category";
import {listAllColumnApi, listColumnByCategoryIdApi} from "~~/service/column";
import {OuOTag, OuOTagGroup} from "@ahzoo/ouo";
import ColumnItem from "@/components/list/ColumnItem.vue";

const categoryList = ref<CategoryMapInterface[]>([]);
const columnList = ref<PreviewColumnInterface[]>([]);
const activeCategory = ref<string | null>(null);

getCategoryList();
getAllColumnList();

async function getCategoryList() {
  const newCategoryList = await listCategoryApi();
  categoryList.value = unref(newCategoryList);
}

async function getAllColumnList() {
  const newColumnList = await listAllColumnApi();
  columnList.value = unref(newColumnList);
}

async function getColumnListByCategoryId(categoryId: string, pagination: number) {
  const newColumnList = await listColumnByCategoryIdApi(categoryId, pagination);
  columnList.value = unref(newColumnList);
}

const layoutState = reactive({
  title: "分类&专栏",
  subtitle: "这里本来是要写页面简介，但是没想好写什么",
  pageTitle: "分类页",
});

definePageMeta({
  layout: "page",
  layoutProps: layoutState
})

useSeoMeta({
  title: "分类",
  description: "分类页"
})
</script>

<template>
  <div v-if="categoryList.length > 0" class="box-header">
    <div class="mb-6 ">
      <div class="tag-group relative flex flex-wrap items-center gap-2">
        <OuOTag
            class="transition-all duration-300 hover:scale-105"
            :size="'small'"
            :type="'text'"
            @click="getAllColumnList"
            :checked="activeCategory === null || activeCategory === ''"
        >
          全部专栏
        </OuOTag>
        <OuOTag class="mr-3" :size="'small'" :type="'text'" v-for="category in categoryList"
                @click="getColumnListByCategoryId(category.id, 1)">
          {{ category.name }}
        </OuOTag>
      </div>
    </div>
  </div>
  <div class="category-column grid column-grid gap-7 gap-y-5 pc:gap-5 mt-6">
    <ColumnItem
        v-for="(column, index) in columnList"
        :key="column.id || index"
        :column="column"
    />
  </div>
</template>

<style scoped lang="scss">
.box-header {
  margin-bottom: 10px;
}

.tag-group {
  padding: 0 0 11px 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(var(--z-gray-color)), transparent);
    border-radius: 3px;
  }

  &:hover {
    .ouo-tag {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  .ouo-tag {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.5rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background-color: rgba(249, 250, 251, 0.8);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.category-column {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
