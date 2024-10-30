<script setup lang="ts">
import Comment from "@/components/comment/index.vue";

useSeoMeta({
  title: "留言",
  description: "留言页"
})
</script>

<template>
  <div class="comment-content w-full h-screen mobile:px-5 px-8 pt-8 mt-5 rounded-lg">
    <Comment/>
  </div>
</template>
<style scoped lang="scss">
.comment-content {
  background: rgba(var(--z-common-bg), .6);
}
</style>
