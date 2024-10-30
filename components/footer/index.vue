<script setup lang="ts">
import {useAuthorStore} from "@/store/authorStore";

const authorStore = useAuthorStore();
const authorInfo = authorStore.getAuthorInfo();

</script>
<template>
  <footer class="font-size-small w-full mt-7">
    <div class="footer-container flex justify-between w-full">
      <ul class="text-left">
        <li>
          {{ authorInfo.extendsParams.footer }} By {{ authorInfo.name }} 版权所有
        </li>
      </ul>
      <ul class="text-right mobile:flex justify-center">
        <li class="hover-color">
          <a class="no-style" :href="authorInfo.extendsParams.icpLink" target="_blank">
            {{authorInfo.extendsParams.icp }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 35px 50px 20px;
  background: linear-gradient(to top, rgba(var(--z-global-bg), .9) 4rem, rgba(var(--z-global-bg), 30%));
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(var(--z-common-bg), .5);
}

.footer-container {
  li {
    margin: 5px;
  }
}
</style>
