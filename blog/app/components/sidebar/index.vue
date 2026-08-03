<script setup lang="ts">
import Info from "./info.vue";
import TopComment from "./TopComment.vue";
</script>

<template>
    <aside id="sidebar" class="ml-11 block flex flex-col gap-5">
      <Info/>
      <TopComment/>
    </aside>
</template>

<style lang="scss">
#sidebar{
  max-width: 300px;
  min-width: 230px;
}

.sidebar-card {
  position: relative;
  background: rgba(var(--z-common-bg), 0.7);
  border-radius: 0.75rem;
  padding: 24px;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.05) 0 1px 2px 0;

  &:hover {
    border-color: rgba(var(--z-primary-color), 0.15);
    box-shadow: 0 8px 30px -10px rgba(var(--z-gray-bg), 0.1);
    transform: translateY(-2px);
  }
}

</style>
