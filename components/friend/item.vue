<script setup lang="ts">
import type {Friend} from "@/types/friendInterface";
import {type PropType} from "vue";

defineProps({
  friend: Object as PropType<Friend>,
});
</script>

<template>
  <a :href="friend?.website" class="friends flex flex-wrap">
    <div class="friends-img relative">
      <img :src="friend?.avatar" alt=""/>
    </div>
    <div class="friends-info flex flex-col items-center w-full">
      <p class="friends-description" :title="friend?.description">{{ friend?.description }}</p>
      <p class="friends-title" :title="friend?.website">{{ friend?.name }}</p>
    </div>
  </a>
</template>

<style scoped lang="scss">
.friends {
  margin: 15px 15px 35px;
  padding: 0 11px 13px;
  font-weight: bold;
  color: rgb(var(--z-fontcolor-gray));
  background: rgba(var(--z-basic-bg), .6);
  border-radius: 10px;
  box-shadow: var(--ahzoo-menu-shadow);

  &:hover {
    transform: scale(1.01);
  }

  &-title {
    -webkit-line-clamp: 1;
  }

  &-description {
    -webkit-line-clamp: 2;
  }

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 3px;
    font-weight: normal;
    overflow: hidden;
  }

  &-img {
    left: 50%;
    width: 86px;
    height: 86px;
    padding: 6px;
    margin-top: -43px;
    margin-left: -43px;
    border-radius: 50%;
    border: 1px dashed rgba(var(--z-primary-color));
    box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.4);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid rgb(var(--z-basic-bg));
      box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.4);
    }
  }

  &-info {
    margin-top: 15px;
    min-height: 50px;
  }

  &-title {
    color: rgba(var(--z-primary-color));
  }
}
</style>
