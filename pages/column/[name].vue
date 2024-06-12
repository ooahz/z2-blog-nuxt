<script setup lang="ts">
import {getColumnInfo} from "@/api/column";
import {listArticleByColumnId} from "@/api/article";
import type {Article} from "@/types/articleInterface";
import type {WebInfoInterface} from "@/types/webInfoInterface";
import type {PreviewColumn} from "@/types/columnInterface";
import CategoryItem from "@/components/list/CategoryItem.vue";
import ArticleItem from "@/components/list/ArticleItem.vue";
import {useArticleStore} from "@/store/articleStore";
import {getAttribute, setAttribute} from "@ahzoo/utils";

const {path} = useRoute();
const articleStore = useArticleStore();

const articleList = ref<Article[]>([]);
const columnInfo = reactive<WebInfoInterface>({
  title: ""
});
const previewColumn = ref<PreviewColumn>();

const articlePath = <string>path.split("/").pop();
const columnInfoTemp: PreviewColumn = await getColumnInfoByName(articlePath);
await getArticleListByColumnId(columnInfoTemp.id, 1);

/**
 * 进入文章详情页
 * @param article
 */
function showDetail(article: Article) {
  articleStore.setArticlePath(article.path);
  navigateTo(`/p/${article.path}`);
}

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
  if (attribute !== "scroll") {
    setAttribute("scroll", "primary");
  }
}

useSeoMeta({
  title: () => `${columnInfo.title ?? "专栏"}`,
  description: () => `${columnInfo.description ?? "专栏页"}`
})

onMounted(() => {
  initStyle();
});
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <div id="column-info" class="mb-2">
    <Landing :landing="columnInfo">
      <CategoryItem v-for="category in previewColumn?.categoryList"
                    :category="category" :style="columnInfo.style"/>
    </Landing>
  </div>
  <div id="main" class="page flex">
    <div class="page-content w-full">
      <div class="grid auto-grid gap-7 gap-y-5 pc:gap-5">
        <div v-for="article in articleList">
          <ArticleItem :article="article" @click="showDetail(article)"/>
        </div>
      </div>
    </div>
    <Sidebar/>
  </div>
</template>
