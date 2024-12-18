<script setup lang="ts">
import type {Friend} from "@/types/friendInterface";
import {type PropType} from "vue";

defineProps({
  friend: Object as PropType<Friend>
});
</script>

<template>
  <div class="item-hover friends-item">
    <a :href="friend?.website" class="flex items-center">
      <div class="friends-item-img">
        <img :src="friend?.avatar" alt=""/>
      </div>
      <div class="flex flex-wrap flex-[1] ml-3">
        <p class="stress friends-item-name single-line w-full pb-1.5" :title="friend?.website">{{ friend?.name }}</p>
        <p class="double-line w-full mt-1" :title="friend?.description">{{ friend?.description }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.friends-item {
  color: rgb(var(--z-fontcolor-gray));
  box-shadow: var(--z-menu-shadow);

  a {
    padding: 13px 13px 13px 10px;
    border-radius: 7px;
    background: rgba(var(--z-common-bg), 1);
  }

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 3px;
    overflow: hidden;
  }

  &-img {
    width: 56px;
    height: 56px;
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

.friends-item a {
  border-left-width: 2px;
  border-left-style: solid;
}

.friends-item:nth-of-type(6n + 1) a {
  border-left-color: #ff002b80;
}

.friends-item:nth-of-type(6n + 2) a {
  border-left-color: #ffa90080;
}

.friends-item:nth-of-type(6n + 3) a {
  border-left-color: #00cc0080;
}

.friends-item:nth-of-type(6n + 4) a {
  border-left-color: #00ccff80;
}

.friends-item:nth-of-type(6n + 5) a {
  border-left-color: #9933cc80;
}

.friends-item:nth-of-type(6n + 6) a {
  border-left-color: #40404080;
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
