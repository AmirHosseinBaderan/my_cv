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
            {{ portfolio.principles.sectionNumber }} // {{ portfolio.principles.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.principles.tag }}
        </span>
      </div>

      <div>
        <p class="font-sans text-[18px] sm:text-[20px] text-[#e2e2e6] font-semibold">
          {{ portfolio.principles.headline }}
        </p>
      </div>

      <!-- Principles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="item in portfolio.principles.items"
          :key="item.id"
          class="p-5 bg-[#1a1c1f] border border-[#3d494c]/40 rounded-lg flex flex-col justify-between hover:border-[#4cd7f6]/50 transition-all shadow-xl hover:-translate-y-1"
        >
          <span class="text-[10px] text-[#4cd7f6] font-bold">
            {{ item.id }}
          </span>
          <div class="py-5">
            <h4 class="font-sans text-[16px] font-semibold text-[#e2e2e6] pb-1.5">
              {{ item.title }}
            </h4>
            <p class="text-[12px] text-[#bcc9cd] leading-relaxed">
              {{ item.description }}
            </p>
          </div>
          <span class="text-[10px] text-[#869397] uppercase font-mono tracking-wider pt-2 border-t border-[#3d494c]/20">
            {{ item.tag }}
          </span>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
