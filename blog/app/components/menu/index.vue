<script setup lang="ts">
import {OuOButton} from "@ahzoo/ouo";
import {ArrowUpToLine, SunMoon} from "lucide-vue-next";

const colorMode = useColorMode();
const isDark = ref(false);

function scrollToTop() {
  const dom = document.querySelector("body");
  if (!dom) {
    document.querySelector("#article")?.scrollIntoView({
      behavior: "smooth"
    });
  } else {
    dom?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function switchTheme({clientX: x, clientY: y}: MouseEvent) {
  isDark.value = colorMode.value === "dark";
  document.startViewTransition(() => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  }).ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
        {
          clipPath: !isDark.value ? clipPath.reverse() : clipPath
        },
        {
          duration: 300,
          easing: "ease-in",
          pseudoElement: !isDark.value
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)"
        }
    )
  })
}
</script>

<template>
  <div id="menu" class="fixed">
    <OuOButton class="my-1.5" :type="'card-2'" :equilateral="true" @click="switchTheme" title="夜间模式">
      <SunMoon/>
    </OuOButton>
    <OuOButton :type="'card-2'" :equilateral="true" @click="scrollToTop">
      <ArrowUpToLine/>
    </OuOButton>
  </div>
</template>

<style lang="scss">
#menu {
  display: none;
  opacity: 0;
  right: 20px;
  bottom: 30px;
  z-index: 9;
  transition: all .3s;
}

[view="mobile"] #menu {
  right: 5px;
  bottom: 10px;
}

[scroll="scroll"] #menu {
  display: block;
  opacity: 1;
}
</style>
