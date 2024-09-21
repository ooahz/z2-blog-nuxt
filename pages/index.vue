<script setup lang="ts">
const {$viewport} = useNuxtApp();

useSeoMeta({
  title: () => "我的信息展示"
});
</script>
<template>
  <div class="w-full">
    <Header/>
  </div>
  <div v-if="!$viewport.isLessThan('sm')">
    <Welcome/>
  </div>
  <main id="main"
        :class="$viewport.isLessThan('sm') ? 'mobile' : 'pc'">
    <Post/>
  </main>
</template>

<style lang="scss">
main {
  &.pc {
    padding: 0 !important;
  }

  &.mobile {
    margin-top: var(--z-header-height) !important;
  }
}
</style>
