<script lang="ts" setup>
import {SuSTop} from "@ahzoo/sus";
import {topComment} from "@/api/comment";
import type {TopCommentItem} from "@/types/commentInterface";

const commentList = ref<TopCommentItem[]>([]);

/**
 * 数据获取
 */
await getTopComment();

async function getTopComment() {
  const newCommentList = await topComment();
  commentList.value = unref(newCommentList);
}
</script>
<template>
  <div class="top-comment box mt-5">
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
