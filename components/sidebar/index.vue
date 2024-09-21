<script setup lang="ts">
import Info from "./info.vue";
import TopComment from "@/components/sidebar/TopComment.vue";
</script>

<template>
    <aside id="sidebar" class="ml-9 block">
      <Info/>
      <TopComment/>
    </aside>
</template>

<style lang="scss">
#sidebar{
  max-width: 300px;
  min-width: 200px;
}
</style>
