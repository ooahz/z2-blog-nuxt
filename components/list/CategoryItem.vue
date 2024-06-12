<script setup lang="ts">
import type {PropType} from "vue";
import type {CategoryMap} from "@/types/categoryInterface";

const props = defineProps({
  category: {
    type: Object as PropType<CategoryMap>,
    required: true
  },
  style: String
});

/**
 * 设置预览页主题
 */
function setProperty() {
  const primary = document.getElementById("primary");
  if (!!props.style) {
    primary!.style.setProperty("--z-bg", props.style);
  }
}

onMounted(() => {
  setProperty();
})
</script>

<template>
  <div class="category-item backdrop-blur-2 relative mx-3">
    <div class="h-10 cursor-pointer">
      <div class="category-item-svg h-full w-20">
      </div>
      <div class="mx-3">
        <div class="category-item-title flex flex-col title relative pb-0.5 mb-1">{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.category-item {
  overflow: hidden;
  width: 150px;
  padding: 1.25rem;
  border-radius: 0.75rem;
  opacity: .5;
  background-color: rgba(var(--z-basic-color), .6);
  transition: all 0.3s;

  &:hover {
    color: rgb(var(--z-primary-fontcolor));
    opacity: 1;
    background: var(--z-bg);

    .category-item-title {
      background: white;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &:after {
        background: rgba(var(--z-primary-fontcolor), .8);
      }
    }
  }

  &-svg {
    position: absolute;
    right: 0;
    top: 30%;
    opacity: 0.3;
    filter: blur(2px);
    transform: scale(1.0) rotate(15deg);
  }

  &-title {
    background: var(--z-bg);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:after {
      bottom: 0;
      width: 23px;
      left: 0;
      height: 2px;
      background: var(--z-bg);
      content: "";
      border-radius: 1px;
      position: absolute;
    }
  }
}
</style>
