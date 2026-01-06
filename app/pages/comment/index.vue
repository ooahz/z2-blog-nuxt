<script setup lang="ts">
import Comment from "@/components/comment/index.vue";


const layoutState = reactive({
  title: "交流与讨论",
  subtitle: "反正开源项目也没人看，页面介绍也随便写写吧",
  pageTitle: "评论页"
});

definePageMeta({
  layout: "page",
  layoutProps: layoutState
})

useSeoMeta({
  title: "留言",
  description: "留言页"
})
</script>

<template>
  <Comment/>
</template>
<style scoped lang="scss">
</style>
