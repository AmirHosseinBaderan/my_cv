<script setup lang="ts">
import { portfolio, activeLanguage } from '../composables/usePortfolioData';
import ScreenNavControls from '../components/ScreenNavControls.vue';
</script>

<template>
  <div class="w-full py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 lg:px-10 space-y-10">
      <!-- Screen Header Banner -->
      <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span class="text-[12px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
            {{ portfolio.experience?.sectionNumber || '04' }} // {{ portfolio.experience?.sectionTitle || 'EXPERIENCE & WORKPLACES' }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30 font-mono">
          {{ portfolio.experience?.tag || 'PRODUCTION TRACK RECORD' }}
        </span>
      </div>

      <!-- Overview Summary Statement -->
      <div v-if="portfolio.experience?.summary" class="bg-[#1a1c1f]/60 p-5 rounded-lg border border-[#3d494c]/40">
        <p class="text-[14px] sm:text-[15px] text-[#e2e2e6] leading-relaxed">
          {{ portfolio.experience.summary }}
        </p>
      </div>

      <!-- Experience & Workplaces Timeline List -->
      <div class="space-y-6">
        <div
          v-for="item in portfolio.experience?.items"
          :key="item.id"
          class="bg-[#0c0e11] border border-[#3d494c]/70 rounded-lg p-6 lg:p-8 hover:border-[#4cd7f6]/60 transition-all shadow-2xl relative overflow-hidden group"
        >
          <!-- Corner Accent Ribbon / Dot -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#4cd7f6]/5 to-transparent pointer-events-none"></div>

          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#3d494c]/30 pb-4">
            <!-- Left Info: Role & Company -->
            <div class="space-y-1.5">
              <div class="flex items-center gap-2.5 flex-wrap">
                <span class="text-[10px] text-[#4cd7f6] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#1e2023] border border-[#4cd7f6]/30">
                  {{ item.id }}
                </span>
                <span
                  :class="[
                    'text-[10px] font-semibold uppercase px-2 py-0.5 rounded flex items-center gap-1.5 border',
                    item.status === 'CURRENT' || item.status === 'شاغل'
                      ? 'bg-[#1e2023] text-[#4edea3] border-[#4edea3]/40'
                      : 'bg-[#1a1c1f] text-[#869397] border-[#3d494c]/30'
                  ]"
                >
                  <span
                    v-if="item.status === 'CURRENT' || item.status === 'شاغل'"
                    class="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"
                  ></span>
                  {{ item.status }}
                </span>
                <span class="text-[11px] text-[#869397]">
                  {{ item.type }}
                </span>
              </div>

              <h2 class="font-sans text-xl lg:text-[22px] font-semibold text-[#e2e2e6] pt-1">
                {{ item.role }}
              </h2>

              <div class="flex items-center gap-2 text-[13px] text-[#4cd7f6] font-medium">
                <a
                  :href="item.companyUrl || '#'"
                  target="_blank"
                  rel="noreferrer"
                  class="hover:underline flex items-center gap-1 group-hover:text-[#acedff]"
                >
                  <span>{{ item.company }}</span>
                  <span class="material-symbols-outlined text-[14px]">north_east</span>
                </a>
                <span class="text-[#3d494c]">•</span>
                <span class="text-[#869397] text-[12px]">{{ item.location }}</span>
              </div>
            </div>

            <!-- Right Info: Period -->
            <div class="font-mono text-[12px] text-[#4cd7f6] bg-[#1a1c1f] px-3 py-1.5 rounded border border-[#3d494c]/40 self-start lg:self-auto">
              {{ item.period }}
            </div>
          </div>

          <!-- Description -->
          <div class="py-4 space-y-3">
            <p class="text-[13px] sm:text-[14px] text-[#bcc9cd] leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Key Achievements -->
            <div v-if="item.achievements && item.achievements.length" class="space-y-2 pt-2">
              <div class="text-[10px] text-[#869397] uppercase tracking-wider font-semibold">
                {{ activeLanguage === 'fa' ? 'دستاوردهای کلیدی و اثرگذاری:' : 'Key Engineering Impact & Deliverables:' }}
              </div>
              <ul class="space-y-1.5">
                <li
                  v-for="(ach, aIdx) in item.achievements"
                  :key="aIdx"
                  class="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-[#e2e2e6] leading-relaxed"
                >
                  <span class="text-[#4cd7f6] font-bold mt-0.5">→</span>
                  <span>{{ ach }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Technologies / Systems Stack Chips -->
          <div class="pt-4 border-t border-[#3d494c]/30 flex flex-wrap items-center gap-2">
            <span class="text-[10px] text-[#869397] uppercase mr-1">
              {{ activeLanguage === 'fa' ? 'ابزارها:' : 'Tech Stack:' }}
            </span>
            <span
              v-for="tech in item.technologies"
              :key="tech"
              class="px-2.5 py-0.5 bg-[#1e2023] text-[#bcc9cd] font-mono text-[11px] rounded border border-[#3d494c]/30 group-hover:border-[#4cd7f6]/40 transition-colors"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
