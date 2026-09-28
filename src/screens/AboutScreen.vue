<script setup lang="ts">
import { portfolio, activeLanguage } from '../composables/usePortfolioData';
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
            {{ portfolio.about.sectionNumber }} // {{ portfolio.about.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.about.fileTag }}
        </span>
      </div>

      <!-- Core Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div class="lg:col-span-8 space-y-4">
          <p
            v-for="(para, idx) in portfolio.about.paragraphs"
            :key="idx"
            :class="idx === 0 ? 'text-[15px] sm:text-[16px] text-[#e2e2e6] leading-relaxed' : 'text-[13px] sm:text-[14px] text-[#bcc9cd] leading-relaxed'"
          >
            {{ para }}
          </p>
        </div>

        <div class="lg:col-span-4 bg-[#0c0e11] border border-[#3d494c]/60 p-6 rounded-lg flex flex-col justify-between shadow-xl">
          <div class="space-y-2">
            <span class="text-[10px] text-[#4cd7f6] uppercase tracking-wider font-semibold">
              {{ portfolio.about.corePrinciple.label }}
            </span>
            <p class="font-sans text-[20px] text-[#e2e2e6] font-semibold">
              {{ portfolio.about.corePrinciple.title }}
            </p>
            <p class="text-[12px] text-[#bcc9cd] leading-relaxed">
              {{ portfolio.about.corePrinciple.description }}
            </p>
          </div>
          <div class="pt-4 text-[10px] text-[#869397] flex items-center justify-between border-t border-[#3d494c]/30 mt-6">
            <span>{{ portfolio.about.corePrinciple.location }}</span>
            <span class="text-[#4edea3] font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              {{ portfolio.about.corePrinciple.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Technical Evolution Timeline Flow -->
      <div class="pt-6">
        <div class="text-[#869397] text-[11px] uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>{{ activeLanguage === 'fa' ? 'مسیر و بردار تکامل فنی' : 'Evolutionary Vector & Track' }}</span>
          <span class="text-[#4cd7f6] text-[10px]">00_INIT → 05_ACTIVE</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div
            v-for="item in portfolio.about.evolutionVector"
            :key="item.id"
            :class="[
              'p-3.5 rounded flex flex-col justify-between transition-colors border shadow-md',
              item.active
                ? 'bg-[#1e2023] border-[#4cd7f6]/60 shadow-[0_0_12px_rgba(76,215,246,0.15)]'
                : 'bg-[#1a1c1f] border-[#3d494c]/40 hover:border-[#4cd7f6]/30'
            ]"
          >
            <span :class="['text-[10px]', item.active ? 'text-[#4cd7f6] font-bold' : 'text-[#869397]']">
              {{ item.id }}
            </span>
            <div :class="['text-[12px] my-2 font-semibold', item.active ? 'text-[#4cd7f6]' : 'text-[#e2e2e6]']">
              {{ item.title }}
            </div>
            <span :class="['text-[10px]', item.active ? 'text-[#4edea3]' : 'text-[#4cd7f6]']">
              {{ item.detail }}
            </span>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
