<script setup lang="ts">
import {OuOLanding} from "@ahzoo/ouo";

onMounted(()=>{
  const primary = document.getElementById("primary");
  primary!.style.backgroundColor = "transparent";
})

onBeforeUnmount(()=>{
  const primary = document.getElementById("primary");
  primary!.style.backgroundColor = "rgba(var(--z-global-bg), .7)";
})
</script>

<template>
  <div class="w-full">
    <Header/>
  </div>
  <OuOLanding/>
  <Welcome/>
  <main id="main">
    <Post/>
  </main>
</template>
