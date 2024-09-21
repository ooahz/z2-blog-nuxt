<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumn} from "@/types/columnInterface";

const props = defineProps({
  column: {
    type: Object as PropType<PreviewColumn>,
    required: true
  }
});

function getColumnDetail() {
  navigateTo(`/column/${props.column.name}`);
}
</script>

<template>
  <div class="column-item relative box flex flex-col">
    <div @click="getColumnDetail()" class="h-16 flex cursor-pointer">
      <div v-if="column.thumbnail" class="column-item-thumbnail h-full w-20">
        <img :src="column.thumbnail" class="cover rounded-md" alt="">
      </div>
      <div class="mx-3">
        <div class="column-item-title title relative pb-0.5 mb-1">{{ column.name }}</div>
        <div class="three-line mt-1">{{ column.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.column-item {
  overflow: hidden;

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
