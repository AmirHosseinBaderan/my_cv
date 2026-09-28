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
            {{ portfolio.research.sectionNumber }} // {{ portfolio.research.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.research.tag }}
        </span>
      </div>

      <div class="bg-[#111317] border border-[#3d494c]/70 rounded-lg p-6 lg:p-8 space-y-6 shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#3d494c]/30 pb-4">
          <div>
            <span class="text-[10px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.research.specimenTag }}
            </span>
            <h3 class="font-sans text-2xl lg:text-[28px] text-[#e2e2e6] font-semibold">
              {{ portfolio.research.specimenTitle }}
            </h3>
          </div>
          <span class="px-3 py-1 bg-[#1e2023] text-[#4edea3] text-[10px] rounded self-start md:self-auto border border-[#4edea3]/40 font-semibold flex items-center gap-1.5 shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            {{ portfolio.research.specimenStatus }}
          </span>
        </div>

        <!-- Hypotheses in lab notebook style -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            v-for="hypo in portfolio.research.hypotheses"
            :key="hypo.num"
            class="bg-[#1a1c1f] p-5 rounded-lg border border-[#3d494c]/40 space-y-2.5 text-[12px] shadow-md"
          >
            <span class="text-[10px] text-[#4cd7f6] font-bold tracking-wider">
              {{ hypo.num }}
            </span>
            <p class="text-[#e2e2e6] font-semibold text-[13px] leading-relaxed">
              {{ hypo.question }}
            </p>
            <p class="text-[#bcc9cd] leading-relaxed">
              {{ hypo.answer }}
            </p>
          </div>
        </div>

        <!-- Schematic Autonomous Cognition Loop Flow -->
        <div class="bg-[#0c0e11] p-5 lg:p-6 rounded-lg border border-[#3d494c]/60 text-[11px] shadow-inner">
          <div class="text-[#869397] uppercase pb-2.5 border-b border-[#3d494c]/20 mb-4 flex justify-between">
            <span class="font-semibold">{{ portfolio.research.schematic.title }}</span>
            <span class="text-[#4edea3] font-mono">{{ portfolio.research.schematic.status }}</span>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-center py-2 text-[12px]">
            <template v-for="(node, nIdx) in portfolio.research.schematic.flow" :key="node">
              <div
                :class="[
                  'px-4 py-2.5 rounded shadow-sm transition-all',
                  nIdx === portfolio.research.schematic.flow.length - 1
                    ? 'bg-[#1e2023] border border-[#4cd7f6]/60 text-[#4cd7f6] font-bold shadow-[0_0_12px_rgba(76,215,246,0.2)]'
                    : 'bg-[#1a1c1f] border border-[#3d494c]/40 text-[#e2e2e6]'
                ]"
              >
                {{ node }}
              </div>
              <span v-if="nIdx < portfolio.research.schematic.flow.length - 1" class="text-[#4cd7f6] font-bold hidden sm:inline">
                →
              </span>
            </template>
          </div>
        </div>

        <div class="p-3.5 bg-[#1a1c1f] border border-[#3d494c]/30 rounded-lg text-[11px] text-[#869397] flex items-center gap-2.5">
          <span class="material-symbols-outlined text-[18px] text-[#4cd7f6]">info</span>
          <span>{{ portfolio.research.disclaimer }}</span>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
