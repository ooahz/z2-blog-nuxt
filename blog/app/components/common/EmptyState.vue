<script setup lang="ts">
import {Box} from "lucide-vue-next";

interface Props {
  title: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  subtitle: ""
});
</script>

<template>
  <div class="empty flex flex-col items-center justify-center">
    <Box class="empty-icon" :size="64"/>
    <p class="empty-text mt-3">{{ title }}</p>
    <p v-if="subtitle" class="empty-subtitle">{{ subtitle }}</p>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  padding: 4rem 2rem;
  color: rgba(var(--z-fontcolor-gray));

  .empty-icon {
    opacity: 0.5;
  }

  .empty-text {
    font-size: 1rem;
  }

  .empty-subtitle {
    font-size: 0.875rem;
    margin: 0.5rem 0 0;
    opacity: 0.7;
  }
}
</style>
