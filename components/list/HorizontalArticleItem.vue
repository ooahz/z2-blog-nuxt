<script setup lang="ts">
import {type PropType} from "vue";
import type {PreviewArticle} from "@/types/articleInterface";
import {CalendarDaysIcon, RocketLaunchIcon} from "@heroicons/vue/24/solid";
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  article: {
    type: Object as PropType<PreviewArticle>,
    required: true
  }
});

function showArticleDetail(article: PreviewArticle) {
  navigateTo(`/p/${article.path}`);
}
</script>

<template>
  <div class="item-hover horizontal-article-item flex relative p-3.5 rounded-xl"
       @click="showArticleDetail(article)">
    <div class="article-img relative mobile:hidden">
      <img :src="article.thumbnail" class="cover rounded-xl opacity-90" alt="">
    </div>
    <div class="article-info flex flex-[1] flex-col justify-between ml-5 mobile:ml-0">
      <div
          class="article-date opacity-70">
        <div class="flex" v-if="article.createdDate">
          <span><CalendarDaysIcon class="small"/></span>
          <span>{{ formatDateTime(article.createdDate) }}</span>
        </div>
        <div class="flex" v-else>
          <span><RocketLaunchIcon class="small"/></span>
          <span>{{ formatDateTime(article.updatedDate || "") }}</span>
        </div>
      </div>
      <div class="double-line stress">{{ article.title }}</div>
      <div class="flex">
        <p class="three-line flex-[1]">{{ article.description }}</p>
        <div class="article-img relative hidden mobile:block ml-1.5">
          <img :src="article.thumbnail" class="cover rounded-xl opacity-90" alt="">
        </div>
      </div>
      <div class="article-column flex justify-end opacity-70">
        <div class="article-column-item rounded-md"
             v-for="column in article.columnList">
          {{ column.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.horizontal-article-item {
  width: 100%;
  min-height: 200px;
  margin-bottom: 25px;
  background-color: rgb(var(--z-common-bg));
}

.article-img{
  width: 40%;
  max-width: 350px;
}

.article-date {
  padding: 3px 5px;
  margin-left: -5px;
  font-size: 80%;
}

.article-column {
  margin-top: 9px;
  font-size: 80%;

  &-item {
    margin-right: 3px;
    padding: 3px 7px;
    background-color: rgba(var(--z-gray-color), .8);
  }
}
</style>
