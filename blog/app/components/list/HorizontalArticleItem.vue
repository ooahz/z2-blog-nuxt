<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {CalendarClock, CalendarDays} from "lucide-vue-next";


defineProps({
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a class="item-hover box-item horizontal-article-item flex relative p-4.5 rounded-xl"
     :href="`/p/${article.path}`">
    <div class="article-info flex flex-[1] flex-col py-2 pl-5 pad:mr-5 mobile:mr-0">
      <div class="item-title relative">{{ article.title }}</div>
      <div
          class="article-date flex opacity-70 mt-2">
        <div class="flex items-center" v-if="article.createdDate" title="创建时间">
          <span class="meta-icon"><CalendarDays/></span>
          <span>{{ formatDateTime(article.createdDate) }}</span>
        </div>
        <div class="flex items-center ml-5" v-if="article.updatedDate" title="更新时间">
          <span class="meta-icon"><CalendarClock/></span>
          <span>{{ formatDateTime(article.updatedDate || "") }}</span>
        </div>
      </div>
      <div class="flex flex-1 my-3">
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
    <div class="article-img relative pad:block mobile:hidden">
      <img :src="article.thumbnail" class="cover rounded-xl opacity-90" loading="lazy" decoding="async"
           :alt="article.title">
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

.article {
  &-img {
    width: 40%;
    max-width: 350px;
  }

  &-date {
    margin-left: -3px;
    font-size: 90%;
  }

  &-column {
    margin-top: 9px;
    font-size: 80%;

    &-item {
      margin-right: 3px;
      padding: 4px 8px;
      color: rgba(var(--z-regular-fontcolor));
      background-color: rgba(var(--z-primary-color), .1);
      transition: all .3s;

      &:hover {
        background-color: rgba(var(--z-regular-hover-bg));
      }
    }
  }
}

.item-title {
  font-size: 21px;
  font-weight: 700;
}

.meta-icon {
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
