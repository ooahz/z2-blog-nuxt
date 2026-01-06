<script setup lang="ts">
import BaseLayout from "./base.vue";
</script>

<template>
  <BaseLayout layout-class="mi-font" show-sidebar reset-scroll>
    <template #main>
      <NuxtPage/>
    </template>
  </BaseLayout>
</template>
