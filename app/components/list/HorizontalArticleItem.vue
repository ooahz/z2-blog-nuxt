<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {CalendarDaysIcon, RocketLaunchIcon} from "@heroicons/vue/24/solid";
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a class="item-hover horizontal-article-item flex relative p-4 rounded-xl"
     :href="`/p/${article.path}`">
    <div class="article-img relative pad:block mobile:hidden">
      <img :src="article.thumbnail" class="cover rounded-xl opacity-90" loading="lazy" decoding="async"
           :alt="article.title">
    </div>
    <div class="article-info flex flex-[1] flex-col justify-between pad:ml-5 mobile:ml-0">
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
      <div class="double-line item-title">{{ article.title }}</div>
      <div class="flex">
        <p class="three-line flex-[1]">{{ article.description }}</p>
        <div class="article-img relative mobile:block pad:hidden ml-1.5">
          <img :src="article.thumbnail" class="cover rounded-xl opacity-90" loading="lazy" decoding="async"
               :alt="article.title">
        </div>
      </div>
      <div class="article-column flex justify-end opacity-70">
        <div class="article-column-item rounded-md"
             v-for="column in article.columnList">
          {{ column.name }}
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.horizontal-article-item {
  width: 100%;
  min-height: 200px;
  margin-bottom: 25px;
  background-color: rgb(var(--z-common-bg));
}

.article-img {
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
    padding: 4px 8px;
    background-color: rgba(var(--z-regular-bg));
    transition: all .3s;

    &:hover {
      background-color: rgba(var(--z-regular-hover-bg));
    }
  }
}

.item-title {
  font-size: 19px;
  font-weight: 700;
}
</style>
