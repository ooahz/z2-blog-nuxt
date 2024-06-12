<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumn} from "@/types/columnInterface";
import type {PreviewArticle} from "@/types/articleInterface";

const props = defineProps({
  column: {
    type: Object as PropType<PreviewColumn>,
    required: true
  },
});

function getColumnDetail() {
  navigateTo(`/column/${props.column.name}`);
}
</script>

<template>
  <div class="column-item relative box flex flex-col">
    <div @click="getColumnDetail()" class="h-16 flex cursor-pointer">
      <div class="column-item-thumbnail h-full w-20">
        <img :src="column.thumbnail" class="cover rounded-md" alt="">
      </div>
      <div class="mx-3">
        <div class="column-item-title title relative pb-0.5 mb-1">{{ column.name }}</div>
        <div class="three-line mt-1">{{ column.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-item {
  overflow: hidden;
  max-width: 300px;

  &-thumbnail {
    position: absolute;
    right: 0;
    top: 30%;
    opacity: 0.3;
    filter: blur(2px);
    transform: scale(1.0) rotate(15deg);
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
