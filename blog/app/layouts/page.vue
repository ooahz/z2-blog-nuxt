<script setup lang="ts">
import BaseLayout from "./base.vue";

const route = useRoute();

const layoutProps = computed(() => {
  return {...(route.meta.layoutProps as any || {})};
});
</script>

<template>
  <BaseLayout class="layout-page overflow-y-scroll">
    <div id="main" class="page">
      <slot name="hero"/>
      <slot v-if="layoutProps.fullPage"/>
      <div class="flex" v-else>
        <div class="w-full"
             :class="layoutProps.customPage ? 'custom-page-content' : 'page-content mobile:px-3 pad:px-8 py-8 rounded-lg'">
          <slot/>
        </div>
        <Sidebar
            v-if="!$viewport.isLessThan('lg')"
            class="w-1/3"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
  position: relative;

  .title {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .subtitle {
    position: relative;
    padding-bottom: 7px;

    &::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, rgba(var(--z-primary-color)), transparent);
      border-radius: 3px;
    }
  }
}

.page {
  &-content {
    background: rgba(var(--z-common-bg), .6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--z-border-color), 0.1);
    box-shadow: 0 -10px 30px -18px rgba(var(--z-gray-bg), 0.08);
    transition: all 0.3s ease;
    animation: fadeIn 0.5s ease forwards;

    &:hover {
      background: rgba(var(--z-common-bg));
    }
  }
}
</style>
