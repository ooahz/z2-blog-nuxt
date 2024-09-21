<script setup lang="ts">
import Comment from "@/components/comment/index.vue";
import {OuOLanding} from "@ahzoo/ouo";

const comment = ref();

useSeoMeta({
  title: "留言",
  description: "留言页"
})
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <OuOLanding/>
  <div id="main" class="page flex">
    <div class="comment-content w-full h-screen p-5 mt-5 rounded-lg">
      <Comment/>
    </div>
    <Sidebar class="w-1/3 mt-5"
             v-if="!$viewport.isLessThan('sm')"/>
  </div>
</template>
<style scoped lang="scss">
.comment-content {
  background: rgba(var(--z-common-bg), .6);
}
</style>
