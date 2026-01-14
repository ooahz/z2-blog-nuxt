<script lang="ts" setup>
import type {TopCommentItemInterface} from "@/types/commentInterface";
import {topCommentApi} from "~~/service/comment";
import {SuSTop} from "@ahzoo/sus/dist/v";

const appConfig = useAppConfig();
const commentList = ref<TopCommentItemInterface[]>([]);

/**
 * 数据获取
 */
await getTopComment();

async function getTopComment() {
  if (appConfig.feature.comment === "disable") {
    return;
  }
  commentList.value = await topCommentApi();
}
</script>
<template>
  <div v-if="!(appConfig.feature?.comment === 'disable')"
       class="top-comment box mt-5">
    <div class="box-header bottom-line pb-1.5 mt-1 mx-1.5">最新评论</div>
    <a :href="commentItem.website"
       v-for="commentItem in commentList"
       class="no-style" target="_blank">
      <SuSTop :comment="commentItem"/>
    </a>
  </div>
</template>

<style lang="scss">
.top-comment {
  &.box {
    padding: 1.25rem 0.875rem 1rem;
  }
}
</style>
