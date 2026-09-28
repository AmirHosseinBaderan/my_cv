<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { portfolio, activeLanguage } from '../composables/usePortfolioData';

const route = useRoute();
const router = useRouter();

const screens = [
  { path: '/', id: 'overview', label: computed(() => portfolio.value.nav?.overview || 'Overview') },
  { path: '/about', id: 'about', label: computed(() => portfolio.value.nav?.about || 'About') },
  { path: '/focus', id: 'focus', label: computed(() => portfolio.value.nav?.focus || 'Focus') },
  { path: '/projects', id: 'projects', label: computed(() => portfolio.value.nav?.projects || 'Projects') },
  { path: '/experience', id: 'experience', label: computed(() => portfolio.value.nav?.experience || 'Experience') },
  { path: '/principles', id: 'principles', label: computed(() => portfolio.value.nav?.principles || 'Principles') },
  { path: '/stack', id: 'stack', label: computed(() => portfolio.value.nav?.stack || 'Stack') },
  { path: '/research', id: 'research', label: computed(() => portfolio.value.nav?.research || 'Research') },
  { path: '/repos', id: 'repos', label: computed(() => portfolio.value.nav?.repos || 'Repos') },
  { path: '/contact', id: 'contact', label: computed(() => portfolio.value.nav?.contact || 'Contact') },
];

const currentIndex = computed(() => {
  return screens.findIndex((s) => s.path === route.path);
});

const prevScreen = computed(() => {
  if (currentIndex.value > 0) return screens[currentIndex.value - 1];
  return null;
});

const nextScreen = computed(() => {
  if (currentIndex.value < screens.length - 1) return screens[currentIndex.value + 1];
  return null;
});

const goTo = (path: string) => {
  router.push(path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto py-8 px-4 lg:px-10 border-t border-[#3d494c]/40 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
    <!-- Previous Screen Button -->
    <div class="w-full sm:w-auto">
      <button
        v-if="prevScreen"
        @click="goTo(prevScreen.path)"
        class="w-full sm:w-auto px-4 py-2.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] border border-[#3d494c]/60 hover:border-[#4cd7f6]/50 text-[#bcc9cd] hover:text-[#e2e2e6] transition-all flex items-center justify-center sm:justify-start gap-2 group shadow-md"
      >
        <span class="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
          {{ activeLanguage === 'fa' ? 'arrow_forward' : 'arrow_back' }}
        </span>
        <span>
          {{ activeLanguage === 'fa' ? 'صفحه قبل:' : 'Previous Screen:' }}
          <strong class="text-[#4cd7f6]">{{ prevScreen.label.value }}</strong>
        </span>
      </button>
    </div>

    <!-- Center Screen Breadcrumb dots -->
    <div class="flex items-center gap-1.5 flex-wrap justify-center">
      <button
        v-for="s in screens"
        :key="s.path"
        @click="goTo(s.path)"
        :class="[
          'px-2 py-1 rounded text-[10px] font-medium transition-colors border',
          route.path === s.path
            ? 'bg-[#06b6d4] text-[#003640] border-[#06b6d4]'
            : 'bg-[#1a1c1f] text-[#869397] border-[#3d494c]/30 hover:text-[#e2e2e6] hover:border-[#4cd7f6]/40'
        ]"
      >
        {{ s.label.value }}
      </button>
    </div>

    <!-- Next Screen Button -->
    <div class="w-full sm:w-auto flex justify-end">
      <button
        v-if="nextScreen"
        @click="goTo(nextScreen.path)"
        class="w-full sm:w-auto px-4 py-2.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] border border-[#3d494c]/60 hover:border-[#4cd7f6]/50 text-[#bcc9cd] hover:text-[#e2e2e6] transition-all flex items-center justify-center sm:justify-end gap-2 group shadow-md"
      >
        <span>
          {{ activeLanguage === 'fa' ? 'صفحه بعد:' : 'Next Screen:' }}
          <strong class="text-[#4cd7f6]">{{ nextScreen.label.value }}</strong>
        </span>
        <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
          {{ activeLanguage === 'fa' ? 'arrow_back' : 'arrow_forward' }}
        </span>
      </button>
    </div>
  </div>
</template>
