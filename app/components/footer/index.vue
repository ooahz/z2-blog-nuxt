<script setup lang="ts">
import FooterInfo from "./info.vue";

const appConfig = useAppConfig();
</script>
<template>
  <footer class="font-size-x-small w-full mt-7">
    <FooterInfo/>
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
  background: linear-gradient(to bottom, rgba(var(--z-common-bg), .5) 0, rgba(var(--z-common-bg)) 60%);
}

.footer-container {
  padding: 8px 70px 12px;
  background-color: rgba(var(--z-global-bg));

  li {
    margin: 5px;
  }
}

[view="mobile"] {
  .footer-container {
    padding: 8px 15px 12px;
  }
}
</style>
