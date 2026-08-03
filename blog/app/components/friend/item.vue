<script setup lang="ts">
import type {FriendInterface} from "@/types/friendInterface";
import type {PropType} from "vue";

defineProps({
  friend: Object as PropType<FriendInterface>
});
</script>

<template>
  <a :href="friend?.website" class="friends-item relative flex items-center rounded-xl overflow-hidden">
    <div class="friends-item-mask"></div>
    <div class="friends-item-img ring-2 ring-base-200 shadow-sm p-0.5">
      <img :src="friend?.avatar" loading="lazy" decoding="async" :alt="friend?.name || 'Friend avatar'"/>
    </div>
    <div class="flex flex-wrap flex-1 ml-3">
      <p class="stress friends-item-name single-line w-full pb-1.5" :title="friend?.website">{{ friend?.name }}</p>
      <p class="double-line opacity-80 font-size-90 w-full mt-1" :title="friend?.description">{{
          friend?.description
        }}</p>
    </div>
    <div class="friends-tag absolute right-2 top-2 rounded-lg">
      <span>{{ friend?.tag || "邻居" }}</span>
    </div>
  </a>
</template>

<style scoped lang="scss">
.friends-item {
  padding: 15px;
  background: rgba(var(--z-common-bg), 1);
  border: 1px solid rgba(var(--z-gray-color), 1);
  transition: all .3s ease;

  &:hover {
    transform: matrix(1, 0, 0, 1, 0, -4);
    border: 1px solid rgba(var(--z-primary-color), .3);
    box-shadow: 0 8px 30px -10px rgba(var(--z-gray-bg), 0.1);

    .friends-item-img {
      scale: 1.05;
      box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(var(--z-primary-color), .5) 0px 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    }
  }

  &-mask {
    position: absolute;
    top: -70%;
    left: -70%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(var(--z-primary-color), 0.08), transparent 50%);
    pointer-events: none;
  }

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 3px;
    overflow: hidden;
  }

  &-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(var(--z-primary-color), .1) 0px 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    transition: all .5s ease;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

.friends-tag {
  font-size: 12px;
  padding: 2px 7px;
  color: rgba(var(--z-primary-color), .6);
  background-color: rgba(var(--z-primary-color), .05);
}

.dark .friends-item a {
  filter: brightness(0.7);
  -webkit-filter: brightness(0.7);
  -o-filter: brightness(0.7);
  -moz-filter: brightness(0.7);
}
</style>
