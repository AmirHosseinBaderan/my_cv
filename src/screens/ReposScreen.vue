<script setup lang="ts">
import { portfolio } from '../composables/usePortfolioData';
import ScreenNavControls from '../components/ScreenNavControls.vue';
</script>

<template>
  <div class="w-full py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 lg:px-10 space-y-8">
      <!-- Screen Header Banner -->
      <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span class="text-[12px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
            {{ portfolio.repositories.sectionNumber }} // {{ portfolio.repositories.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.repositories.tag }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="repo in portfolio.repositories.list"
          :key="repo.name"
          class="p-6 bg-[#0c0e11] border border-[#3d494c]/50 rounded-lg hover:border-[#4cd7f6]/60 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#869397] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">book</span>
                <span>{{ repo.visibility }}</span>
              </span>
              <span class="text-[10px] text-[#4edea3] font-mono">
                {{ repo.status }}
              </span>
            </div>
            <a
              :href="repo.url"
              target="_blank"
              rel="noreferrer"
              class="font-sans text-[18px] font-semibold text-[#4cd7f6] hover:underline block pt-1"
            >
              {{ repo.name }}
            </a>
            <p class="text-[12px] text-[#bcc9cd] leading-relaxed line-clamp-3">
              {{ repo.description }}
            </p>
          </div>

          <div class="pt-5 flex items-center justify-between text-[11px] text-[#869397] border-t border-[#3d494c]/20 mt-5">
            <span class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: repo.languageColor }"></span>
              <span class="text-[#e2e2e6] font-medium">{{ repo.language }}</span>
            </span>
            <span>{{ repo.updated }}</span>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
