<script setup lang="ts">
import type {Article} from "@/types/articleInterface";
import type {PageInfoInterface} from "@/types/pageInfoInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import {getColumnInfo} from "@/api/column";
import {listArticleByColumnId} from "@/api/article";
import {getAttribute, setAttribute} from "@ahzoo/utils";
import CategoryItem from "@/components/list/CategoryItem.vue";
import ArticleItem from "@/components/list/HorizontalArticleItem.vue";
import PageScreen from "@/components/page/screen.vue"

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
  const newColumnInfo: PreviewColumn = await getColumnInfo(name);
  previewColumn.value = unref(newColumnInfo);
  columnInfo.title = newColumnInfo.name;
  columnInfo.thumbnail = newColumnInfo.thumbnail;
  columnInfo.description = newColumnInfo.description;
  columnInfo.style = newColumnInfo.style;
  return newColumnInfo;
}

async function getArticleListByColumnId(columnId: string, pagination: number) {
  const newArticleList = await listArticleByColumnId(columnId, pagination);
  articleList.value = unref(newArticleList);
}

function initStyle() {
  const attribute = getAttribute("scroll");
  if (attribute !== "scroll" && columnInfo.thumbnail) {
    setAttribute("scroll", "primary");
  } else if (!columnInfo.thumbnail) {
    setAttribute("scroll", "top");
  }
}

definePageMeta({
  layout: "home"
})

useSeoMeta({
  title: () => `${columnInfo.title ?? "专栏"}`,
  description: () => `${columnInfo.description ?? "专栏页"}`
})

onMounted(() => {
  initStyle();
});
</script>

<template>
  <div v-if="columnInfo.thumbnail&&!$viewport.isLessThan('lg')"
       id="column-info" class="mb-2">
    <PageScreen :landing="columnInfo">
      <CategoryItem v-for="category in previewColumn?.categoryList"
                    :category="category" :style="columnInfo.style"/>
    </PageScreen>
  </div>
  <div id="main" class="page flex">
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
</template>
