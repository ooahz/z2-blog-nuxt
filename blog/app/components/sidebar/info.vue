<script setup lang="ts">
import Github from "@/static/svg/github.svg";
import Mail from "@/static/svg/mail.svg";

const appConfig = useAppConfig();
</script>
<template>
  <div class="author-card sidebar-card flex flex-col justify-center items-center text-center">
    <div class="card-glow"></div>
    <div class="user-avatar relative w-[90px] h-[90px] mb-5">
      <img
          class="cover w-full h-full rounded-full object-cover border-[3px] border-[rgba(var(--z-common-bg),1)] shadow-lg"
          :src="appConfig.avatar" :alt="appConfig.name" loading="eager" decoding="async">
      <div class="avatar-ring"></div>
    </div>
    <div class="relative z-[2]">
      <div class="user-name font-size-large font-semibold text-center">
        {{ appConfig.name }}
      </div>
      <p class="user-bio font-size-small leading-relaxed mb-5">{{ appConfig.description }}</p>
      <div class="user-social flex justify-center gap-5 mt-5">
        <a class="social-link inline-flex items-center justify-center"
           :href="appConfig.github" title="GitHub" target="_blank" rel="noreferrer noopener">
          <Github class="social-icon w-5 h-5"/>
        </a>
        <a class="social-link inline-flex items-center justify-center"
           :href="'mailto:'+ appConfig.email" title="邮件" target="_blank" rel="noreferrer noopener">
          <Mail class="social-icon w-5 h-5 p-[1px]"/>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.author-card {
  padding: 2.5rem 1.25rem 1.6rem;
  background: linear-gradient(to bottom, rgba(var(--z-common-bg), 0.5) 0%, rgba(var(--z-common-bg), 0.8) 40%, rgba(var(--z-common-bg)) 60%, rgba(var(--z-common-bg))), url(https://s.ahzoo.cn/picture/22436164.png) no-repeat center;
  background-size: cover;
}

.user-name {
  color: rgba(var(--z-fontcolor), 0.95);
}

.user-bio {
  color: rgba(var(--z-fontcolor), 0.55);
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 11px;
  color: rgba(var(--z-fontcolor), 0.8);
  background-color: rgba(var(--z-plain-bg), .7);
  transition: color,transform 0.3s ease !important;

  &:hover {
    background: rgba(var(--z-primary-color), 0.1);
    border: 1px solid rgba(var(--z-primary-color), 0.3);
    transform: translateY(-2px);

    .social-icon {
      color: rgba(var(--z-primary-color), 0.9);
    }
  }
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
          circle at 30% 30%,
          rgba(var(--z-primary-color), 0.08),
          transparent 50%
  );
  pointer-events: none;
}

.avatar-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid rgba(var(--z-primary-color), 0.2);
  border-radius: 50%;
  border-top-color: rgba(var(--z-primary-color), 0.6);
  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
