<script setup lang="ts">
import PCPage from "@/layouts/PcHome.vue";
import MobilePage from "@/layouts/MobileHome.vue";

const {$viewport} = useNuxtApp();

</script>
<template>
  <div v-if="$viewport.isLessThan('tablet')">
    <MobilePage/>
  </div>
  <div v-else>
    <PCPage/>
  </div>
</template>

<style lang="scss">
main {
  padding: 10px 0;
}
</style>
