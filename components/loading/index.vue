<template>
  <div class="loading__mask flex items-center justify-center fixed top-0 left-0 w-full h-full">
    <div class="loading__animation flex relative items-center justify-center">
      <div class="animation__1"></div>
      <div class="animation__2"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$z-loading-size: 66px;

.loading__mask {
  z-index: 51;
  background-color: rgba(var(--z-common-bg), .5);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
}

.loading__animation {
  width: $z-loading-size;
  height: $z-loading-size;
  border-radius: 50%;

  .animation__1, .animation__2 {
    width: 0;
    height: 0;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    -webkit-box-shadow: 0 0 10px 0 rgba(var(--z-primary-color), .5);
    box-shadow: 0 0 10px 0 rgba(var(--z-primary-color), .5);
  }

  .animation__1 {
    -webkit-animation: waves .7s ease infinite;
    animation: waves .7s ease infinite;
  }

  .animation__2 {
    -webkit-animation: waves 1.4s linear infinite;
    animation: waves 1.4s linear infinite;
  }
}

@keyframes waves {
  0% {
    width: 0;
    height: 0
  }

  to {
    height: $z-loading-size;
    width: $z-loading-size;
    opacity: 0
  }
}
</style>
