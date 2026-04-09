<script setup lang="ts">

const layoutState = reactive({
  title: "分类&专栏",
  subtitle: "这里本来是要写页面简介，但是没想好写什么",
  pageTitle: "分类页",
});

definePageMeta({
  layout: "page",
  layoutProps: layoutState
})

useSeoMeta({
  title: "专栏分类" + " | Z次元",
  ogTitle: "专栏分类" + " | Z次元"
})
</script>

<template>
  <Category/>
</template>
