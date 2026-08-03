<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Sonner position="top-right" rich-colors close-button />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster as Sonner } from "@/components/ui/sonner";
</script>
