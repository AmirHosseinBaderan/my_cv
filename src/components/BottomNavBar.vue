<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { portfolio, activeLanguage } from '../composables/usePortfolioData';

const route = useRoute();

const navItems = [
  { path: '/', labelKey: 'overview', defaultLabel: 'Home', icon: 'home' },
  { path: '/about', labelKey: 'about', defaultLabel: 'About', icon: 'person' },
  { path: '/focus', labelKey: 'focus', defaultLabel: 'Focus', icon: 'adjust' },
  { path: '/projects', labelKey: 'projects', defaultLabel: 'Projects', icon: 'terminal' },
  { path: '/experience', labelKey: 'experience', defaultLabel: 'Experience', icon: 'work' },
  { path: '/principles', labelKey: 'principles', defaultLabel: 'Principles', icon: 'psychology' },
  { path: '/stack', labelKey: 'stack', defaultLabel: 'Stack', icon: 'dns' },
  { path: '/research', labelKey: 'research', defaultLabel: 'Research', icon: 'science' },
  { path: '/repos', labelKey: 'repos', defaultLabel: 'Repos', icon: 'code' },
  { path: '/contact', labelKey: 'contact', defaultLabel: 'Contact', icon: 'mail' },
];

const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <!-- Fixed Cybernetic Bottom Navigation Bar for other pages -->
  <nav
    v-if="!isHomePage"
    class="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0e11]/95 backdrop-blur-xl border-t border-[#282a2d]/80 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar font-mono">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all flex-shrink-0 group',
          route.path === item.path
            ? 'bg-[#06b6d4] text-[#003640] font-semibold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
            : 'text-[#869397] hover:text-[#e2e2e6] hover:bg-[#1a1c1f]'
        ]"
      >
        <span
          :class="[
            'material-symbols-outlined text-[17px] transition-transform group-hover:scale-110',
            route.path === item.path ? 'text-[#003640]' : 'text-[#4cd7f6]'
          ]"
        >
          {{ item.icon }}
        </span>
        <span class="tracking-wider">
          {{ portfolio.nav?.[item.labelKey] || item.defaultLabel }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
