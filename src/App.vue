<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { portfolio, activeLanguage, setLanguage, startLiveRefresh, stopLiveRefresh } from './composables/usePortfolioData';
import { downloadResumePDF } from './utils/generateResume';
import BottomNavBar from './components/BottomNavBar.vue';

const route = useRoute();

const isHomePage = computed(() => route.path === '/');

const homeSectionAnchors = [
  { href: '#about', labelKey: 'about', defaultLabel: 'About' },
  { href: '#focus', labelKey: 'focus', defaultLabel: 'Focus' },
  { href: '#projects', labelKey: 'projects', defaultLabel: 'Projects' },
  { href: '#experience', labelKey: 'experience', defaultLabel: 'Experience' },
  { href: '#stack', labelKey: 'stack', defaultLabel: 'Stack' },
  { href: '#research', labelKey: 'research', defaultLabel: 'Research' },
  { href: '#contact', labelKey: 'contact', defaultLabel: 'Contact' },
];

onMounted(() => {
  startLiveRefresh();
  document.documentElement.dir = activeLanguage.value === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = activeLanguage.value;
});

onUnmounted(() => {
  stopLiveRefresh();
});

const toggleLang = () => {
  const next = activeLanguage.value === 'en' ? 'fa' : 'en';
  setLanguage(next);
};

const handleDownloadResume = () => {
  downloadResumePDF(portfolio.value, activeLanguage.value);
};
</script>

<template>
  <div :class="['min-h-screen bg-[#111317] text-[#e2e2e6] font-mono antialiased flex flex-col selection:bg-[#4cd7f6]/30 selection:text-[#4cd7f6]', activeLanguage === 'fa' ? 'rtl text-right' : 'ltr text-left']">
    <!-- Top App Bar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-[#0c0e11]/90 backdrop-blur-xl border-b border-[#282a2d]/70 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
      <div class="h-16 max-w-7xl mx-auto px-4 lg:px-10 flex items-center justify-between gap-4">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2">
          <router-link
            to="/"
            class="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1c1f] hover:bg-[#1e2023] transition-colors border border-[#3d494c]/40 shadow-sm"
          >
            <span class="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span class="text-[12px] text-[#e2e2e6] tracking-wider font-semibold">
              {{ portfolio.meta?.domain || 'amirhossein.dev' }}
            </span>
          </router-link>
        </div>

        <!-- In Home Page: In-page section anchor links only (No pages sections in app bar) -->
        <nav v-if="isHomePage" class="hidden lg:flex items-center gap-1.5 text-[12px]">
          <a
            v-for="anchor in homeSectionAnchors"
            :key="anchor.href"
            :href="anchor.href"
            class="px-2.5 py-1 text-[#bcc9cd] hover:text-[#4cd7f6] hover:bg-[#1a1c1f] rounded transition-colors"
          >
            {{ portfolio.nav?.[anchor.labelKey] || anchor.defaultLabel }}
          </a>
        </nav>

        <!-- Right Side Utility Controls: Language Switcher, PDF Download, GitHub, Avatar -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- i18n Language Toggle Button -->
          <button
            @click="toggleLang"
            class="px-2.5 py-1.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] border border-[#3d494c]/60 text-[#4cd7f6] text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            :title="activeLanguage === 'en' ? 'تغییر زبان به فارسی' : 'Switch to English'"
          >
            <span class="material-symbols-outlined text-[15px]">language</span>
            <span>{{ activeLanguage === 'en' ? 'FA (فارسی)' : 'EN (English)' }}</span>
          </button>

          <!-- Download Resume PDF Action Button -->
          <button
            @click="handleDownloadResume"
            class="px-3 py-1.5 rounded bg-[#1e2023] hover:bg-[#4edea3] text-[#4edea3] hover:text-[#003824] border border-[#4edea3]/40 text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
            :title="portfolio.nav?.downloadResume || 'Download Resume (PDF)'"
          >
            <span class="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform">download</span>
            <span class="hidden sm:inline">{{ portfolio.nav?.downloadResume || 'Resume PDF' }}</span>
          </button>

          <!-- GitHub Source Link -->
          <a
            :href="portfolio.meta?.githubUrl || 'https://github.com/amirhosseinbaderan'"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            class="p-1.5 rounded text-[#bcc9cd] hover:text-[#4cd7f6] hover:bg-[#1e2023] transition-colors flex items-center justify-center border border-transparent hover:border-[#3d494c]/50"
          >
            <span class="material-symbols-outlined text-[19px]">terminal</span>
          </a>

          <!-- Avatar Symbol -->
          <div class="w-8 h-8 rounded-full bg-[#4cd7f6] flex items-center justify-center shadow-[0_0_12px_rgba(76,215,246,0.3)]">
            <span class="material-symbols-outlined text-[#003640] text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Viewport (adds bottom padding on other pages so bottom nav never overlaps content) -->
    <main :class="['w-full pt-16 flex-1 flex flex-col', !isHomePage ? 'pb-24' : '']">
      <router-view />
    </main>

    <!-- Fixed Bottom Navigation Bar for other pages -->
    <BottomNavBar />

    <!-- Site Footer -->
    <footer :class="['w-full bg-[#0c0e11] py-8 border-t border-[#282a2d]/60 font-mono text-[11px]', !isHomePage ? 'pb-28' : '']">
      <div class="max-w-7xl mx-auto px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-[#bcc9cd]">
          <span class="text-[#4cd7f6] font-bold">::</span>
          <span>{{ portfolio.footer?.copyright || '© 2026 Amir Hossein Baderan · Built with curiosity, code and experiments' }}</span>
        </div>

        <div class="flex items-center gap-6">
          <router-link to="/about" class="text-[#869397] hover:text-[#4cd7f6] transition-colors">
            {{ portfolio.nav?.about || 'About' }}
          </router-link>
          <router-link to="/projects" class="text-[#869397] hover:text-[#4cd7f6] transition-colors">
            {{ portfolio.nav?.projects || 'Projects' }}
          </router-link>
          <router-link to="/experience" class="text-[#869397] hover:text-[#4cd7f6] transition-colors">
            {{ portfolio.nav?.experience || 'Experience' }}
          </router-link>
          <router-link to="/research" class="text-[#869397] hover:text-[#4cd7f6] transition-colors">
            {{ portfolio.nav?.research || 'Research' }}
          </router-link>
          <a
            :href="portfolio.meta?.githubUrl || 'https://github.com/amirhosseinbaderan'"
            target="_blank"
            rel="noreferrer"
            class="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">terminal</span>
            <span>GitHub</span>
          </a>
          <a
            :href="portfolio.meta?.linkedinUrl || 'https://www.linkedin.com/in/amir-hossein-baderan-9018b9213/'"
            target="_blank"
            rel="noreferrer"
            class="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">link</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
