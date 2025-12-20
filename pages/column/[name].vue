<script setup lang="ts">
import type {Article} from "@/types/articleInterface";
import type {PageInfoInterface} from "@/types/pageInfoInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import {getColumnInfoApi} from "@/api/column";
import {listArticleByColumnIdApi} from "@/api/article";
import CategoryItem from "@/components/list/CategoryItem.vue";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";
import ColumnMetaInfo from "@/components/column/info.vue";

const {path} = useRoute();

const articleList = ref<Article[]>([]);
const columnInfo = reactive<PageInfoInterface>({
  title: ""
});
const previewColumn = ref<PreviewColumn>();

const articlePath = <string>path.split("/").pop();
const columnInfoTemp: PreviewColumn = await getColumnInfoByName(articlePath);
await getArticleListByColumnId(columnInfoTemp.id, 1);

async function getColumnInfoByName(name: string) {
  const newColumnInfo: PreviewColumn = await getColumnInfoApi(name);
  previewColumn.value = unref(newColumnInfo);
  columnInfo.title = newColumnInfo.name;
  columnInfo.thumbnail = newColumnInfo.thumbnail;
  columnInfo.description = newColumnInfo.description;
  columnInfo.style = newColumnInfo.style;
  return newColumnInfo;
}

async function getArticleListByColumnId(columnId: string, pagination: number) {
  const newArticleList = await listArticleByColumnIdApi(columnId, pagination);
  articleList.value = unref(newArticleList);
}

definePageMeta({
  layout: "home"
})

useSeoMeta({
  title: () => `${columnInfo.title ?? "专栏"}`,
  description: () => `${columnInfo.description ?? "专栏页"}`
})
</script>

<template>
  <div id="main" class="page">
    <div v-if="columnInfo.thumbnail&&!$viewport.isLessThan('lg')"
         id="column-info" class="mb-2">
      <ColumnMetaInfo :landing="columnInfo">
        <CategoryItem v-for="category in previewColumn?.categoryList"
                      :category="category" :style="columnInfo.style"/>
      </ColumnMetaInfo>
    </div>
    <div class="flex mt-11">
      <div class="page-content w-full">
        <div v-if="!columnInfo.thumbnail||$viewport.isLessThan('lg')">
          <div class="page-header box flex-col relative rounded-xl my-5 overflow-hidden">
            <div class="title mb-3 mx-3">{{ columnInfo.title }}</div>
            <div class="mb-1 mx-3">所属分类：
              <span class="tag-item" v-for="category in previewColumn?.categoryList">{{ category.name }}</span>
            </div>
            <div v-if="columnInfo.thumbnail" class="column-item-thumbnail h-full w-20">
              <img :src="columnInfo.thumbnail" class="cover rounded-md" alt="">
            </div>
          </div>
        </div>
        <div v-for="article in articleList">
          <ArticleItem :article="article"/>
        </div>
      </div>
      <Sidebar class="w-1/3"
               v-if="!$viewport.isLessThan('lg')"/>
    </div>
  </div>
</template>
