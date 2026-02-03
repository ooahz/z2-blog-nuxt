<script setup lang="ts">
const {$viewport} = useNuxtApp();
const appConfig = useAppConfig();

definePageMeta({
  layout: "home",
  page: "home"
})

useSeoMeta({
  title: () => "我的信息展示"
});
</script>
<template>
  <div id="main" class="page" :class="$viewport.isLessThan('lg') ? 'mobile' : 'pc'">
    <div class="box-header flex flex-col">
      <div class="filter flex flex-col ml-2">
        <span class="loli-font title mt-7 tracking-wide">最近文章</span>
        <span class="subtitle mt-2 mb-5">
          文章、记录、生活
        </span>
      </div>
    </div>
    <div class="home-data flex">
      <Post/>
      <Sidebar class="w-1/3"
               v-if="!$viewport.isLessThan('lg')"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
#main {
  &.pc {
    padding-top: 30px !important;
  }
}

.box-header {
  .title {
    font-size: 32px;
    font-weight: 700;
  }
}

.home-data {
  animation: fadeIn 0.5s ease forwards;
}
</style>
