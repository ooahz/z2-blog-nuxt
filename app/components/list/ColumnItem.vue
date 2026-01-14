<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumnInterface} from "@/types/columnInterface";

defineProps({
  column: {
    type: Object as PropType<PreviewColumnInterface>,
    required: true
  }
});
</script>

<template>
  <div class="column-item relative box flex flex-col overflow-hidden">
    <a :href="`/column/${column.name}`" class="h-16 flex cursor-pointer">
      <div v-if="column.thumbnail" class="column-item-thumbnail h-full w-20">
        <img :src="column.thumbnail" class="cover rounded-md" loading="lazy" decoding="async" :alt="column.name">
      </div>
      <div class="mx-3">
        <div class="column-item-title title relative pb-0.5 mb-1">{{ column.name }}</div>
        <div class="three-line mt-1">{{ column.description }}</div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.column-item {
  max-width: 550px;
  border: 1px solid rgba(var(--z-gray-color), .5);
  transition: all .3s ease;

  &:hover {
    background-color: rgba(var(--z-basic-color), .8);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
  }

  &-title:after {
    bottom: 0;
    width: 23px;
    left: 0;
    height: 2px;
    background: rgba(var(--z-fontcolor), .8);
    content: "";
    border-radius: 1px;
    position: absolute;
  }
}
</style>
