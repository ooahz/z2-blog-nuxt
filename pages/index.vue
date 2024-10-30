<script setup lang="ts">
const {$viewport} = useNuxtApp();

definePageMeta({
  layout: "home"
})

useSeoMeta({
  title: () => "我的信息展示"
});
</script>
<template>
  <div v-if="!$viewport.isLessThan('lg')">
    <Welcome/>
  </div>
  <div id="main" class="page flex" :class="$viewport.isLessThan('lg') ? 'mobile' : 'pc'">
    <Post/>
    <Sidebar class="w-1/3 mt-[50px]"
             v-if="!$viewport.isLessThan('lg')"/>
  </div>
</template>

<style scoped lang="scss">
#main {
  &.pc {
    padding-top: 10px !important;
  }
}
</style>
