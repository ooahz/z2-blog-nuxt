<script setup lang="ts">
import type {Menu} from "@/types/menuInterface";
import {useMenuStore} from "@/store/menuStore";
import {ArrowUpCircleIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIcon} from "@heroicons/vue/24/solid";
import {switchTheme} from "@ahzoo/utils";

/**
 * 定义菜单图标
 */
const menuMap = new Map<string, any>();
menuMap.set("ArrowUpCircleIcon", ArrowUpCircleIcon);
menuMap.set("ChatBubbleOvalLeftEllipsisIcon", ChatBubbleOvalLeftEllipsisIcon);
menuMap.set("SparklesIcon", SparklesIcon);

const menuState = useMenuStore();
const active = ref(false);

function clickMenu(menuItem: Menu) {
  if (menuItem.title === "主题") {
    switchTheme();
  } else if (menuItem.title === "置顶") {
    const dom = document.querySelector("#main");
    if (!dom) {
      document.querySelector("#article")?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      dom?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  } else if (menuItem.title === "评论区") {
    document.querySelector("#comment")?.scrollIntoView({
      behavior: "smooth"
    });
  }
}
</script>

<template>
  <div id="menu" class="absolute">
    <div class="menu-container relative flex items-center" :class="active?'active':''">
      <ul class="menu-button-list backdrop-blur-2 -mr-3 -mt-11">
        <li class="menu-button-list-item" v-for="menuItem in menuState.menu" @click="clickMenu(menuItem)">
          <span :title="menuItem.title" class="normal-svg">
            <component :is="menuMap.get(menuItem.icon)"/>
          </span>
        </li>
      </ul>
      <button class="menu-button w-10 h-10 flex items-center justify-center" @click="active=!active">
        <span class="menu-icon-wrapper w-3.5 h-3.5 flex flex-col justify-between">
          <span class="menu-icon-line half first"/>
          <span class="menu-icon-line"/>
          <span class="menu-icon-line half last"/>
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
$menu-icon-transition: transform 300ms cubic-bezier(0.52, -0.80, 0.52, 0.52);

#menu {
  display: none;
  opacity: 0;
  right: 20px;
  bottom: 30px;
  z-index: 9;
  transition: all .3s;
}

[scroll="scroll"] #menu {
  display: block;
  opacity: 1;
}

.menu-container {
  user-select: none;
  width: auto;

  &.active {
    .menu-button-list {
      opacity: 1;
      width: auto;
      transform: scale(1);
    }

    .menu-button-list-item {
      animation: fadeInItem .4s .1s forwards;

      &:nth-child(2) {
        animation-delay: .4s;
      }

      &:nth-child(3) {
        animation-delay: .6s;
      }

      &:nth-child(4) {
        animation-delay: .8s;
      }
    }

    .menu-button {
      animation: onePulse .6s forwards linear;
    }

    .menu-icon-wrapper {
      transform: rotate(-45deg);
    }

    .menu-icon-line {
      &.first {
        transform: rotate(-90deg) translateX(1px);
      }

      &.last {
        transform: rotate(-90deg) translateX(-1px);
      }
    }
  }
}

.menu-button {
  background-color: rgba(var(--z-primary-color), .9);
  box-shadow: 0px 0px 0px 4px rgba(var(--z-primary-color), 0.3);
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: .2s ease-in;
  position: relative;
  z-index: 50;

  &-list {
    padding: 5px 10px;
    background-color: rgba(var(--z-common-bg), .7);
    box-shadow: 0 10px 20px -10px rgba(var(--z-primary-color), .1);
    opacity: 0;
    width: 0;
    display: flex;
    border-radius: 8px;
    list-style-type: none;
    transform: scale(0);
    transform-origin: bottom right;
    transition: transform .3s ease .1s;
  }

  &-list-item {
    padding: 5px 11px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    transition: .2s ease-in;
    transform: translatex(-10px);

    &:hover {
      color: rgb(var(--z-primary-color));
      background-color: rgba(var(--z-primary-color), .1);
    }

  }
}

@keyframes onePulse {
  0% {
    box-shadow: 0px 0px 0px 0px rgba(var(--z-primary-color), 0.3);
  }

  50% {
    box-shadow: 0px 0px 0px 12px rgba(var(--z-primary-color), 0.1);
  }

  100% {
    box-shadow: 0px 0px 0px 4px rgba(var(--z-primary-color), 0.3);
  }
}

@keyframes fadeInItem {
  100% {
    transform: translatex(0px);
    opacity: 1;
  }
}

.menu-icon-wrapper {
  border-radius: 2px;
  transition: transform 330ms ease-out;
}

.menu-icon-line {
  background-color: rgb(var(--z-primary-fontcolor));
  border-radius: 2px;
  width: 100%;
  height: 2px;

  &.half {
    width: 50%;
  }

  &.first {
    transition: $menu-icon-transition;
    transform-origin: right;
  }

  &.last {
    align-self: flex-end;
    transition: $menu-icon-transition;
    transform-origin: left;
  }
}
</style>
