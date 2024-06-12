<script setup lang="ts">
import {useStyleStore} from "@/store/styleStore";
import PCPage from "@/layouts/PcHome.vue";
import MobilePage from "@/layouts/MobileHome.vue";
const store = useStyleStore();

function init() {
  if (process.client) {
    if (document.documentElement.clientWidth > 767) {
      store.setDevice("pc");
    } else {
      store.setDevice("m");
    }
  }
}

onMounted(() => {
  init();
});
</script>
<template>
  <component :is="store.device === 'm' ? MobilePage : PCPage"/>
</template>

<style lang="scss">
main {
  padding: 10px 0;
  max-width: 1500px;
}
</style>
