<script setup lang="ts">
const appConfig = useAppConfig();
</script>
<template>
  <footer class="font-size-x-small w-full">
    <div class="footer-container flex mobile:flex-col justify-between items-center w-full">
      <ul class="text-left">
        <li>
          {{ appConfig.footer }} By {{ appConfig.name }} 版权所有
        </li>
      </ul>
      <ul class="text-right justify-center">
        <li class="hover-color">
          <a class="no-style" :href="appConfig.icpLink" target="_blank">
            {{ appConfig.icp }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 25px 50px 18px;
  background: linear-gradient(to top, rgba(var(--z-common-bg), .9) 4rem, rgba(var(--z-common-bg), 30%));
}

.footer-container {
  li {
    margin: 5px;
  }
}
</style>
