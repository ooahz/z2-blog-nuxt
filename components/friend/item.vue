<script setup lang="ts">
import type {Friend} from "@/types/friendInterface";
import type {PropType} from "vue";

defineProps({
  friend: Object as PropType<Friend>
});
</script>

<template>
  <div class="friends-item">
    <a :href="friend?.website" class="flex items-center">
      <div class="friends-item-img">
        <img :src="friend?.avatar" alt=""/>
      </div>
      <div class="flex flex-wrap flex-[1] ml-3">
        <p class="title friends-item-name single-line w-full pb-1.5" :title="friend?.website">{{ friend?.name }}</p>
        <p class="single-line w-full mt-1" :title="friend?.description">{{ friend?.description }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.friends-item {
  color: rgb(var(--z-fontcolor-gray));
  box-shadow: var(--z-menu-shadow);
  transition: all .3s ease;

  a {
    padding: 15px;
    border-radius: 7px;
    background: rgba(var(--z-common-bg), 1);
    transition: all .3s;

    &:hover {
      border: 1px solid rgba(var(--z-primary-color), .5);
      background: rgba(var(--z-primary-color), .2);
    }
  }

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 3px;
    overflow: hidden;
  }

  &-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(var(--z-primary-color));

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

.friends-item a p:first-child {
  color: rgba(var(--z-fontcolor));
  border-bottom: 1px dashed rgba(var(--z-primary-color), .5);
}

[data-theme="dark"] .friends-item a {
  filter: brightness(0.7);
  -webkit-filter: brightness(0.7);
  -o-filter: brightness(0.7);
  -moz-filter: brightness(0.7);
}
</style>
