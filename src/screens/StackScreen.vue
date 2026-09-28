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
            {{ portfolio.stack.sectionNumber }} // {{ portfolio.stack.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.stack.tag }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="group in portfolio.stack.groups"
          :key="group.name"
          :class="[
            'bg-[#0c0e11] border border-[#3d494c]/50 p-6 rounded-lg shadow-xl',
            group.isWide ? 'lg:col-span-2' : ''
          ]"
        >
          <div class="text-[11px] text-[#4cd7f6] font-semibold pb-2.5 border-b border-[#3d494c]/20 flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">{{ group.icon }}</span>
            <span class="tracking-wider">{{ group.name }}</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-5">
            <span
              v-for="item in group.items"
              :key="item"
              :class="[
                'px-3 py-1.5 text-[11px] sm:text-[12px] rounded border transition-colors shadow-sm',
                group.isWide
                  ? 'bg-[#1a1c1f] text-[#4cd7f6] border-[#4cd7f6]/40 font-medium hover:border-[#4cd7f6]'
                  : 'bg-[#1a1c1f] text-[#e2e2e6] border-[#3d494c]/30 hover:border-[#4cd7f6]/40'
              ]"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
