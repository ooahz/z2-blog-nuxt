<script setup lang="ts">
interface Props {
  icon?: string;
  title: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  icon: "📄",
  subtitle: ""
});
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-4xl mb-4 opacity-50">{{ icon }}</div>
    <p class="text-lg text-muted-foreground">{{ title }}</p>
    <p v-if="subtitle" class="text-sm text-muted-foreground mt-2">{{ subtitle }}</p>
  </div>
</template>
