<script setup lang="ts">
import {type PropType} from "vue";
import type {PreviewArticle} from "@/types/articleInterface"
import {CalendarDaysIcon, RocketLaunchIcon} from "@heroicons/vue/24/solid"
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  article: {
    type: Object as PropType<PreviewArticle>,
    required: true
  },
});

function showArticleDetail(article: PreviewArticle) {
  navigateTo(`/p/${article.path}`);
}
</script>

<template>
  <div class="article-item block relative rounded-xl"
     @click="showArticleDetail(article)">
    <div class="mask">
      <div class="w-full h-full px-5 relative">
        <img :src="article.thumbnail" class="cover rounded-t-2xl opacity-90" alt="">
        <div class="article-date w-full px-5 flex justify-end items-end absolute bottom-0 right-5 left-5">
          <div class="flex" v-if="article.createdDate">
            <span><CalendarDaysIcon class="small"/></span>
            <span>{{ formatDateTime(article.createdDate) }}</span>
          </div>
          <div class="flex" v-else>
            <span><RocketLaunchIcon class="small"/></span>
            <span>{{ formatDateTime(article.updatedDate || "") }}</span>
          </div>
        </div>
      </div>
      <div class="label-category font-size-small flex opacity-0 absolute top-0 right-0">
        <div class="label-category-item backdrop-blur-2 rounded-full ml-1"
             v-for="column in article.columnList">
            {{ column.name }}
        </div>
      </div>
    </div>
    <div class="article-info flex flex-col justify-center absolute backdrop-blur-2 rounded-b-xl px-5">
      <div class="double-line font-semibold">{{ article.title }}</div>
      <div class="article-abstract opacity-0 rounded-b-xl">
        <p class="double-line">{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  height: 150px;
}

.article-item {
  width: 100%;
  height: 260px;
  padding-top: 20px;
  background-color: rgb(var(--z-common-bg));

  &:hover {
    .article-info {
      transition: all .3s;

      .article-date {
        display: none;
      }

      .article-abstract {
        opacity: 1;
        line-height: 2;
        padding: 5px 1px 0;
        transition: all .3s;
      }
    }
    .label-category {
      opacity: 1;
      transition: all .3s;
    }
  }
}

.article-abstract {
  line-height: 0;
}

.article-info {
  width: 100%;
  min-height: 90px;
  padding: 20px;
  bottom: 0;
  background-color: rgba(var(--z-common-bg), .7);
}

.article-date {
  width: auto;
  height: inherit;
  padding: 3px 5px;
  font-size: 80%;
  opacity: .7;
  background: linear-gradient(to top, rgba(var(--z-deep-color), 55%) 0, rgba(var(--z-deep-color), 20%) 3rem, rgba(var(--z-deep-color), 10%) 4rem, #fff0);
  color: rgb(var(--z-primary-fontcolor));
}

.label-category {
  right: 27px;
  top: 27px;
  color: rgb(var(--z-primary-fontcolor));

  .label-category-item {
    padding: 3px 9px;
    background-color: rgba(var(--z-basic-color), .4);
  }
}
</style>
