<script setup lang="ts">
import {AuthorImpl} from "@/types/impl/author";

const authorInfo = new AuthorImpl();
</script>
<template>
    <footer class="ss-font rounded-t-lg flex items-center">{{ authorInfo.footer}}</footer>
</template>

<style scoped lang="scss">
footer{
  height: 52px;
  padding: 0 30px;
  background-color: rgba(var(--z-basic-color), .8);
}
</style>
