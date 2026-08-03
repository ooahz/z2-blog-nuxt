<script setup lang="ts">
interface Stat {
  value: string | number;
  label?: string;
}

interface Props {
  thumbnail: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  stats?: Stat[];
}

withDefaults(defineProps<Props>(), {
  eyebrow: "Archive",
  subtitle: "",
  stats: () => []
});
</script>

<template>
  <section class="page-hero paragraph">
    <div class="page-hero__grid-lines"/>
    <div class="page-hero__thumb" aria-hidden="true">
      <div class="thumb-frame">
        <img :src="thumbnail" alt="" class="thumb-img" decoding="async">
      </div>
      <div class="thumb-sheen"></div>
      <div class="thumb-fade"></div>
      <div class="thumb-grain"></div>
    </div>

    <div class="page-hero__content">
      <div class="hero-eyebrow">
        <span class="hero-eyebrow-line"></span>
        <span class="hero-eyebrow-text">{{ eyebrow }}</span>
      </div>

      <div class="hero-title loli-font">{{ title }}</div>
      <p v-if="subtitle" class="hero-subtitle" v-html="subtitle"></p>

      <div v-if="stats.length" class="hero-stats">
        <template v-for="(stat, index) in stats" :key="index">
          <span v-if="index > 0" class="stat-divider"></span>
          <div class="stat">
            <span class="stat-num loli-font">{{ stat.value }}</span>
            <span v-if="stat.label" class="stat-label">{{ stat.label }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  margin-bottom: 28px;
  border-radius: 18px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(var(--z-border-color), 0.08);
  background: rgba(var(--z-common-bg), 0.45);
  box-shadow: 0 10px 30px -18px rgba(var(--z-gray-bg), 0.10);
  animation: heroFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(16px);

  @keyframes heroFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__grid-lines {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  }
}

.page-hero__thumb {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.thumb-frame {
  position: absolute;
  top: 75%;
  right: -6%;
  width: 62%;
  height: 150%;
  transform: translateY(-50%) rotate(6deg) scale(1.5);
  filter: blur(5px);
  -webkit-mask-image: radial-gradient(ellipse 75% 75% at 62% 50%, #000 25%, transparent 82%);
  mask-image: radial-gradient(ellipse 75% 75% at 62% 50%, #000 25%, transparent 82%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: 0 0 180px 30px rgba(var(--z-primary-color), 0.28) inset;
  }
}

.thumb-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(125deg,
      transparent 30%,
      rgba(255, 255, 255, 0.08) 50%,
      transparent 70%);
  mix-blend-mode: overlay;
}

.thumb-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
      rgba(var(--z-common-bg), 0.72) 0%,
      rgba(var(--z-common-bg), 0.3) 32%,
      transparent 55%,
      transparent 100%);
}

.thumb-grain {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.page-hero__content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2.5rem 2.25rem 2rem;
  min-height: 320px;
  justify-content: space-between;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;

  &-line {
    width: 32px;
    height: 1.5px;
    background: rgba(var(--z-primary-color), 0.7);
  }

  &-text {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(var(--z-fontcolor), 0.55);
  }
}

.hero-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: 0.5px;
  line-height: 1.3;
  text-shadow: 0 2px 30px rgba(var(--z-common-bg), 0.6);
}

.hero-subtitle {
  line-height: 1.6;
  color: rgba(var(--z-fontcolor), 0.7);
  max-width: 60ch;
}

.hero-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(var(--z-fontcolor), 0.12);
}

.stat {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  color: rgb(var(--z-primary-color));
  letter-spacing: -0.01em;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(var(--z-fontcolor), 0.6);
}

.stat-divider {
  width: 1px;
  height: 22px;
  background: rgba(var(--z-fontcolor), 0.15);
}

[view="mobile"] {
  .page-hero {
    box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.05) 0 1px 2px 0;
  }

  .page-hero__content {
    min-height: 240px;
    padding: 1.75rem 1.25rem 1.5rem;
  }

  .hero-title {
    font-size: 1.85rem;
  }

  .stat-num {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-hero {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
