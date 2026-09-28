<script setup lang="ts">
import { portfolio } from '../composables/usePortfolioData';
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
            {{ portfolio.projects.sectionNumber }} // {{ portfolio.projects.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.projects.badge }}
        </span>
      </div>

      <!-- Featured Projects List -->
      <div class="space-y-8">
        <div
          v-for="proj in portfolio.projects.featured"
          :key="proj.id"
          class="bg-[#0c0e11] border border-[#3d494c]/70 rounded-lg p-6 lg:p-8 hover:border-[#4cd7f6]/60 transition-all shadow-2xl"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <!-- Project info -->
            <div class="lg:col-span-7 space-y-3.5">
              <div class="flex items-center gap-3">
                <span class="text-[11px] text-[#4cd7f6] uppercase font-semibold tracking-wider">
                  {{ proj.id }} / {{ proj.category }}
                </span>
                <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
                  {{ proj.tag }}
                </span>
              </div>

              <h2 class="font-sans text-2xl lg:text-[28px] text-[#e2e2e6] font-semibold">
                {{ proj.title }}
              </h2>

              <p class="text-[13px] sm:text-[14px] text-[#bcc9cd] leading-relaxed">
                {{ proj.description }}
              </p>

              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="(tag, idx) in proj.tags"
                  :key="tag"
                  :class="[
                    'px-2.5 py-0.5 text-[10px] rounded border',
                    idx === proj.tags.length - 1
                      ? 'bg-[#1e2023] text-[#4cd7f6] border-[#4cd7f6]/30 font-medium'
                      : 'bg-[#1a1c1f] text-[#bcc9cd] border-[#3d494c]/30'
                  ]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Architectural Visualization Diagram -->
            <div class="lg:col-span-5 bg-[#1a1c1f] border border-[#3d494c]/40 p-5 rounded-lg shadow-inner">
              <!-- Case 1: Cognitive Loop Diagram -->
              <template v-if="proj.type === 'cognitive-loop'">
                <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                  <span>{{ proj.diagram.title }}</span>
                  <span class="text-[#4edea3]">{{ proj.diagram.status }}</span>
                </div>
                <div class="py-4 flex flex-col gap-2.5 text-[11px]">
                  <div class="flex items-center justify-between bg-[#0c0e11] px-3.5 py-2 rounded border border-[#3d494c]/30">
                    <span class="text-[#869397] font-bold">ENV</span>
                    <span class="text-[#4cd7f6] font-semibold">Environment Dynamics</span>
                    <span class="material-symbols-outlined text-[14px] text-[#4edea3]">sync_alt</span>
                  </div>
                  <div class="flex justify-center text-[#4cd7f6] text-[10px]">
                    ↓ ↑ Perception stream
                  </div>
                  <div class="flex items-center justify-between bg-[#0c0e11] px-3.5 py-2 rounded border border-[#3d494c]/30">
                    <span class="text-[#869397] font-bold">MEM</span>
                    <span class="text-[#e2e2e6] font-semibold">Memory &amp; Internal State</span>
                    <span class="text-[#4edea3] text-[10px]">Vector + Graph</span>
                  </div>
                  <div class="flex justify-center text-[#4cd7f6] text-[10px]">
                    ↓ ↑ Epistemic arbitration
                  </div>
                  <div class="flex items-center justify-between bg-[#1e2023] px-3.5 py-2 rounded border border-[#4cd7f6]/40 shadow-[0_0_10px_rgba(76,215,246,0.15)]">
                    <span class="text-[#4cd7f6] font-bold">CORE</span>
                    <span class="text-[#4cd7f6] font-semibold">Reasoning &amp; Action Selection</span>
                    <span class="text-[#4edea3] text-[10px]">Active</span>
                  </div>
                </div>
              </template>

              <!-- Case 2: Vector Graph HNSW Topology -->
              <template v-else-if="proj.type === 'vector-graph'">
                <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                  <span>{{ proj.diagram.title }}</span>
                  <span class="text-[#4cd7f6] font-mono">{{ proj.diagram.metrics }}</span>
                </div>
                <div class="py-4 flex items-center justify-center">
                  <svg class="w-full h-28 text-[#869397]" viewBox="0 0 280 120">
                    <!-- Level 2 -->
                    <circle cx="50" cy="20" r="4" fill="#4cd7f6"></circle>
                    <circle cx="230" cy="20" r="4" fill="#4cd7f6"></circle>
                    <line x1="50" y1="20" x2="230" y2="20" stroke="#4cd7f6" stroke-width="1.5" stroke-dasharray="3,3"></line>
                    <text x="140" y="15" fill="#4cd7f6" font-family="monospace" font-size="9" text-anchor="middle">
                      Layer 2 (Express Links)
                    </text>
                    <!-- Downward Projection lines -->
                    <line x1="50" y1="20" x2="80" y2="60" stroke="#869397" stroke-width="0.75"></line>
                    <line x1="230" y1="20" x2="200" y2="60" stroke="#869397" stroke-width="0.75"></line>
                    <!-- Level 1 -->
                    <circle cx="80" cy="60" r="3.5" fill="#89ceff"></circle>
                    <circle cx="140" cy="55" r="3.5" fill="#89ceff"></circle>
                    <circle cx="200" cy="60" r="3.5" fill="#89ceff"></circle>
                    <line x1="80" y1="60" x2="140" y2="55" stroke="#3d494c" stroke-width="1"></line>
                    <line x1="140" y1="55" x2="200" y2="60" stroke="#3d494c" stroke-width="1"></line>
                    <!-- Level 0 (Dense) -->
                    <circle cx="30" cy="100" r="2.5" fill="#869397"></circle>
                    <circle cx="70" cy="98" r="2.5" fill="#869397"></circle>
                    <circle cx="110" cy="102" r="2.5" fill="#869397"></circle>
                    <circle cx="150" cy="99" r="2.5" fill="#869397"></circle>
                    <circle cx="190" cy="103" r="2.5" fill="#869397"></circle>
                    <circle cx="240" cy="100" r="2.5" fill="#869397"></circle>
                    <line x1="30" y1="100" x2="70" y2="98" stroke="#3d494c" stroke-width="0.75"></line>
                    <line x1="70" y1="98" x2="110" y2="102" stroke="#3d494c" stroke-width="0.75"></line>
                    <line x1="110" y1="102" x2="150" y2="99" stroke="#3d494c" stroke-width="0.75"></line>
                    <line x1="150" y1="99" x2="190" y2="103" stroke="#3d494c" stroke-width="0.75"></line>
                    <line x1="190" y1="103" x2="240" y2="100" stroke="#3d494c" stroke-width="0.75"></line>
                  </svg>
                </div>
                <div class="text-[10px] text-[#869397] flex justify-between border-t border-[#3d494c]/20 pt-1.5">
                  <span>{{ proj.diagram.subLeft }}</span>
                  <span class="text-[#4edea3]">{{ proj.diagram.subRight }}</span>
                </div>
              </template>

              <!-- Case 3: Pipeline Diagram -->
              <template v-else-if="proj.type === 'pipeline'">
                <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                  <span>{{ proj.diagram.title }}</span>
                  <span class="text-[#4edea3]">{{ proj.diagram.latency }}</span>
                </div>
                <div class="py-4 flex flex-col gap-2 text-[11px]">
                  <div
                    v-for="stage in proj.diagram.stages"
                    :key="stage.name"
                    class="flex items-center justify-between text-[#e2e2e6] bg-[#1e2023] px-3.5 py-1.5 rounded border border-[#3d494c]/20"
                  >
                    <span>{{ stage.name }}</span>
                    <span
                      :class="[
                        'font-mono font-medium',
                        stage.color === 'primary' ? 'text-[#4cd7f6]' : stage.color === 'secondary' ? 'text-[#89ceff]' : stage.color === 'tertiary' ? 'text-[#4edea3]' : 'text-[#4cd7f6]'
                      ]"
                    >
                      {{ stage.result }}
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Compact Projects Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div
            v-for="cproj in portfolio.projects.compact"
            :key="cproj.id"
            class="bg-[#0c0e11] border border-[#3d494c]/70 rounded-lg p-6 hover:border-[#4cd7f6]/60 transition-all flex flex-col justify-between shadow-xl"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-[#4cd7f6] uppercase font-semibold">
                  {{ cproj.id }} / {{ cproj.category }}
                </span>
                <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
                  {{ cproj.tag }}
                </span>
              </div>

              <h3 class="font-sans text-[18px] font-semibold text-[#e2e2e6]">
                {{ cproj.title }}
              </h3>

              <p class="text-[12px] text-[#bcc9cd] leading-relaxed">
                {{ cproj.description }}
              </p>

              <div class="flex flex-wrap gap-1.5 pt-1">
                <span
                  v-for="tag in cproj.tags"
                  :key="tag"
                  class="px-2 py-0.5 bg-[#1e2023] text-[#bcc9cd] text-[10px] rounded border border-[#3d494c]/30"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="pt-4 border-t border-[#3d494c]/30 mt-4 flex items-center justify-between">
              <span class="text-[10px] text-[#4edea3] font-mono">
                {{ cproj.footerStatus }}
              </span>
              <a
                :href="cproj.repoUrl"
                target="_blank"
                rel="noreferrer"
                class="text-[#4cd7f6] hover:text-[#acedff] flex items-center gap-1 text-[10px] font-semibold"
              >
                <span class="material-symbols-outlined text-[16px]">code</span>
                <span>Source</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ScreenNavControls />
    </div>
  </div>
</template>
