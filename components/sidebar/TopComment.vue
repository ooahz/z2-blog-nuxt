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
    <div class="box-header bottom-line pb-1.5">最新评论</div>
    <SuSTop v-for="commentItem in commentList" :comment="commentItem"/>
  </div>
</template>
