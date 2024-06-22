<script setup lang="ts">
import {AuthorImpl} from "@/types/impl/author";

const authorInfo = new AuthorImpl();

</script>
<template>
  <footer class="font-size-small rounded-t-lg w-full mt-7">
    <div class="footer-container flex justify-between w-full">
      <ul class="text-left">
        <li>
          {{ authorInfo.footer }} By {{ authorInfo.name + "(" + authorInfo.enName + ")" }} 版权所有
        </li>
      </ul>
      <ul class="text-right">
        <li>
          {{ authorInfo.icp }}
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 25px 6vw;
  background: linear-gradient(to top, rgba(var(--z-global-bg), 70%) 3rem, rgba(var(--z-global-bg), 50%) 4rem, rgba(var(--z-global-bg), 30%));
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(var(--z-common-bg), .5);
}
</style>
