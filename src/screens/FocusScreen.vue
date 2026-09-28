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
            {{ portfolio.currentFocus.sectionNumber }} // {{ portfolio.currentFocus.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.currentFocus.badge }}
        </span>
      </div>

      <!-- Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="mod in portfolio.currentFocus.modules"
          :key="mod.id"
          class="p-6 bg-[#1a1c1f] border border-[#3d494c]/60 rounded-lg hover:border-[#4cd7f6]/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-0.5"
        >
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-[#3d494c]/20 mb-3">
              <span class="text-[11px] text-[#869397] font-mono">{{ mod.id }}</span>
              <span
                :class="[
                  'text-[10px] flex items-center gap-1.5 font-semibold uppercase',
                  mod.statusType === 'tertiary' ? 'text-[#4edea3]' : mod.statusType === 'secondary' ? 'text-[#89ceff]' : 'text-[#4cd7f6]'
                ]"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    mod.statusType === 'tertiary' ? 'bg-[#4edea3]' : mod.statusType === 'secondary' ? 'bg-[#89ceff]' : 'bg-[#4cd7f6]'
                  ]"
                ></span>
                {{ mod.status }}
              </span>
            </div>

            <h3 class="font-sans text-[18px] font-semibold text-[#e2e2e6] group-hover:text-[#4cd7f6] transition-colors">
              {{ mod.title }}
            </h3>

            <p class="text-[12px] sm:text-[13px] text-[#bcc9cd] pt-2.5 leading-relaxed">
              {{ mod.description }}
            </p>
          </div>

          <div class="pt-5 flex flex-wrap gap-1.5 mt-4 border-t border-[#3d494c]/20">
            <span
              v-for="tag in mod.tags"
              :key="tag"
              class="px-2 py-0.5 bg-[#1e2023] text-[#869397] text-[10px] rounded border border-[#3d494c]/20 group-hover:border-[#4cd7f6]/30 transition-colors"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
