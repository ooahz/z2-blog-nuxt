<script setup lang="ts">
import Info from "./info.vue";
import TopComment from "@/components/sidebar/TopComment.vue";
</script>

<template>
    <aside id="sidebar" class="w-1/3 ml-9 rounded-tr-md block mobile:hidden">
      <Info/>
      <TopComment/>
    </aside>
</template>

<style scoped lang="scss">
#sidebar{
  max-width: 300px;
  min-width: 200px;
}
</style>
