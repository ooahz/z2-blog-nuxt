<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@lucide/vue";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <MoonIcon v-if="!isDark" />
    <SunIcon v-else />
    <span class="sr-only">切换主题</span>
  </Button>
</template>
