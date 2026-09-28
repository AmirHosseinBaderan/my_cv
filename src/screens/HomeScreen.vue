<script setup lang="ts">
import { portfolio, activeLanguage } from '../composables/usePortfolioData';
import { downloadResumePDF } from '../utils/generateResume';
import ThreeSentinel from '../components/ThreeSentinel.vue';
import InteractiveTerminal from '../components/InteractiveTerminal.vue';

const handleDownloadResume = () => {
  downloadResumePDF(portfolio.value, activeLanguage.value);
};
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- HERO SECTION -->
    <section class="relative w-full px-4 lg:px-10 py-12 lg:py-24 overflow-hidden border-b border-[#282a2d]/60 bg-[#111317]">
      <!-- Fine SVG System Background Grid -->
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <svg class="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#4cd7f6" opacity="0.6"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)"></rect>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Left Column: Identity & Direct Mission -->
        <div class="lg:col-span-7 flex flex-col items-start gap-4">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1a1c1f] border border-[#3d494c]/60 rounded">
            <span class="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-medium">
              {{ portfolio.hero.badge }}
            </span>
          </div>

          <h1 class="font-sans text-3xl sm:text-4xl lg:text-[40px] text-[#e2e2e6] font-semibold tracking-tight leading-tight">
            {{ portfolio.hero.titlePrefix }}
            <span class="text-[#4cd7f6] underline decoration-[#4cd7f6]/40 decoration-1 underline-offset-8">
              {{ portfolio.hero.titleHighlight }}
            </span>
            {{ portfolio.hero.titleSuffix }}
          </h1>

          <p class="text-[14px] sm:text-[15px] text-[#bcc9cd] max-w-2xl leading-relaxed">
            {{ portfolio.hero.subtitle }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a
              :href="portfolio.meta.githubUrl"
              target="_blank"
              rel="noreferrer"
              class="px-4 py-2.5 bg-[#1a1c1f] border border-[#3d494c]/80 text-[#e2e2e6] text-[12px] rounded hover:bg-[#1e2023] hover:border-[#4cd7f6]/50 transition-colors flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[16px]">code</span>
              <span>{{ portfolio.hero.ctaGithub }}</span>
            </a>

            <!-- Resume Download Action Button -->
            <button
              @click="handleDownloadResume"
              class="px-4 py-2.5 bg-[#1e2023] border border-[#4edea3]/50 text-[#4edea3] text-[12px] font-semibold rounded hover:bg-[#4edea3] hover:text-[#003824] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(78,222,163,0.15)] group"
            >
              <span class="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform">download</span>
              <span>{{ portfolio.hero.ctaResume || 'Download Resume (PDF)' }}</span>
            </button>

            <span class="text-[10px] text-[#869397] tracking-wider hidden sm:inline ml-2">
              {{ portfolio.hero.systemStatus }}
            </span>
          </div>
        </div>

        <!-- Right Column: Interactive Developer Terminal with Gamification -->
        <div class="lg:col-span-5 w-full">
          <InteractiveTerminal
            :userHost="portfolio.hero.terminal.userHost"
            :terminalInfo="portfolio.hero.terminal.terminalInfo"
          />
        </div>
      </div>
    </section>

    <!-- 3D INTERACTIVE MINIMAL CHARACTER SHOWCASE BANNER -->
    <ThreeSentinel :sentinelData="portfolio.sentinel" />

    <!-- 01 // ABOUT SECTION -->
    <section id="about" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#111317]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.about.sectionNumber }} // {{ portfolio.about.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.about.fileTag }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div class="lg:col-span-8 space-y-4">
            <p
              v-for="(para, idx) in portfolio.about.paragraphs"
              :key="idx"
              :class="idx === 0 ? 'text-[15px] text-[#e2e2e6] leading-relaxed' : 'text-[13px] text-[#bcc9cd] leading-relaxed'"
            >
              {{ para }}
            </p>
          </div>

          <div class="lg:col-span-4 bg-[#0c0e11] border border-[#3d494c]/60 p-5 rounded-lg flex flex-col justify-between shadow-xl">
            <div class="space-y-2">
              <span class="text-[10px] text-[#4cd7f6] uppercase tracking-wider font-semibold">
                {{ portfolio.about.corePrinciple.label }}
              </span>
              <p class="font-sans text-[18px] text-[#e2e2e6] font-semibold">
                {{ portfolio.about.corePrinciple.title }}
              </p>
              <p class="text-[12px] text-[#bcc9cd] leading-relaxed">
                {{ portfolio.about.corePrinciple.description }}
              </p>
            </div>
            <div class="pt-4 text-[10px] text-[#869397] flex items-center justify-between border-t border-[#3d494c]/30 mt-4">
              <span>{{ portfolio.about.corePrinciple.location }}</span>
              <span class="text-[#4edea3] font-medium">{{ portfolio.about.corePrinciple.status }}</span>
            </div>
          </div>
        </div>

        <!-- Technical Evolution Timeline Flow -->
        <div class="pt-4">
          <div class="text-[#869397] text-[10px] uppercase tracking-wider mb-3">
            {{ activeLanguage === 'fa' ? 'مسیر تکامل فنی' : 'Evolutionary Vector & Track' }}
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div
              v-for="item in portfolio.about.evolutionVector"
              :key="item.id"
              :class="[
                'p-3 rounded flex flex-col justify-between transition-colors border shadow-sm',
                item.active
                  ? 'bg-[#1e2023] border-[#4cd7f6]/50 shadow-[0_0_12px_rgba(76,215,246,0.15)]'
                  : 'bg-[#1a1c1f] border-[#3d494c]/40'
              ]"
            >
              <span :class="['text-[10px]', item.active ? 'text-[#4cd7f6] font-bold' : 'text-[#869397]']">
                {{ item.id }}
              </span>
              <div :class="['text-[11px] my-1.5 font-semibold', item.active ? 'text-[#4cd7f6]' : 'text-[#e2e2e6]']">
                {{ item.title }}
              </div>
              <span :class="['text-[10px]', item.active ? 'text-[#4edea3]' : 'text-[#4cd7f6]']">
                {{ item.detail }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 // CURRENT FOCUS SECTION -->
    <section id="focus" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#0c0e11]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.currentFocus.sectionNumber }} // {{ portfolio.currentFocus.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.currentFocus.badge }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="mod in portfolio.currentFocus.modules"
            :key="mod.id"
            class="p-5 bg-[#1a1c1f] border border-[#3d494c]/60 rounded-lg hover:border-[#4cd7f6]/50 transition-colors flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-[#3d494c]/20 mb-3">
                <span class="text-[10px] text-[#869397] font-mono">{{ mod.id }}</span>
                <span
                  :class="[
                    'text-[10px] flex items-center gap-1 font-semibold uppercase',
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
              <h3 class="font-sans text-[16px] font-semibold text-[#e2e2e6] group-hover:text-[#4cd7f6] transition-colors">
                {{ mod.title }}
              </h3>
              <p class="text-[12px] text-[#bcc9cd] pt-2 leading-relaxed">
                {{ mod.description }}
              </p>
            </div>

            <div class="pt-4 flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in mod.tags"
                :key="tag"
                class="px-2 py-0.5 bg-[#1e2023] text-[#869397] text-[10px] rounded border border-[#3d494c]/20"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 // SELECTED PROJECTS SECTION -->
    <section id="projects" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#111317]">
      <div class="max-w-7xl mx-auto space-y-10">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.projects.sectionNumber }} // {{ portfolio.projects.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.projects.badge }}
          </span>
        </div>

        <div class="space-y-8">
          <div
            v-for="proj in portfolio.projects.featured"
            :key="proj.id"
            class="bg-[#0c0e11] border border-[#3d494c]/70 rounded-lg p-6 lg:p-8 hover:border-[#4cd7f6]/60 transition-all shadow-xl"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div class="lg:col-span-7 space-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-[10px] text-[#4cd7f6] uppercase font-semibold tracking-wider">
                    {{ proj.id }} / {{ proj.category }}
                  </span>
                  <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
                    {{ proj.tag }}
                  </span>
                </div>

                <h2 class="font-sans text-2xl lg:text-[28px] text-[#e2e2e6] font-semibold">
                  {{ proj.title }}
                </h2>

                <p class="text-[13px] text-[#bcc9cd] leading-relaxed">
                  {{ proj.description }}
                </p>

                <div class="flex flex-wrap gap-2 pt-2">
                  <span
                    v-for="(tag, idx) in proj.tags"
                    :key="tag"
                    :class="[
                      'px-2.5 py-0.5 text-[10px] rounded border',
                      idx === proj.tags.length - 1
                        ? 'bg-[#1e2023] text-[#4cd7f6] border-[#4cd7f6]/30'
                        : 'bg-[#1a1c1f] text-[#bcc9cd] border-[#3d494c]/30'
                    ]"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Diagram Panel -->
              <div class="lg:col-span-5 bg-[#1a1c1f] border border-[#3d494c]/40 p-5 rounded">
                <template v-if="proj.type === 'cognitive-loop'">
                  <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                    <span>{{ proj.diagram.title }}</span>
                    <span class="text-[#4edea3]">{{ proj.diagram.status }}</span>
                  </div>
                  <div class="py-4 flex flex-col gap-2 text-[11px]">
                    <div class="flex items-center justify-between bg-[#0c0e11] px-3 py-1.5 rounded border border-[#3d494c]/30">
                      <span class="text-[#869397] font-bold">ENV</span>
                      <span class="text-[#4cd7f6] font-semibold">Environment Dynamics</span>
                      <span class="material-symbols-outlined text-[14px] text-[#4edea3]">sync_alt</span>
                    </div>
                    <div class="flex justify-center text-[#4cd7f6] text-[10px]">
                      ↓ ↑ Perception stream
                    </div>
                    <div class="flex items-center justify-between bg-[#0c0e11] px-3 py-1.5 rounded border border-[#3d494c]/30">
                      <span class="text-[#869397] font-bold">MEM</span>
                      <span class="text-[#e2e2e6] font-semibold">Memory &amp; Internal State</span>
                      <span class="text-[#4edea3] text-[10px]">Vector + Graph</span>
                    </div>
                    <div class="flex justify-center text-[#4cd7f6] text-[10px]">
                      ↓ ↑ Epistemic arbitration
                    </div>
                    <div class="flex items-center justify-between bg-[#1e2023] px-3 py-1.5 rounded border border-[#4cd7f6]/40 shadow-[0_0_8px_rgba(76,215,246,0.15)]">
                      <span class="text-[#4cd7f6] font-bold">CORE</span>
                      <span class="text-[#4cd7f6] font-semibold">Reasoning &amp; Action Selection</span>
                      <span class="text-[#4edea3] text-[10px]">Active</span>
                    </div>
                  </div>
                </template>

                <template v-else-if="proj.type === 'vector-graph'">
                  <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                    <span>{{ proj.diagram.title }}</span>
                    <span class="text-[#4cd7f6] font-mono">{{ proj.diagram.metrics }}</span>
                  </div>
                  <div class="py-4 flex items-center justify-center">
                    <svg class="w-full h-28 text-[#869397]" viewBox="0 0 280 120">
                      <circle cx="50" cy="20" r="4" fill="#4cd7f6"></circle>
                      <circle cx="230" cy="20" r="4" fill="#4cd7f6"></circle>
                      <line x1="50" y1="20" x2="230" y2="20" stroke="#4cd7f6" stroke-width="1.5" stroke-dasharray="3,3"></line>
                      <text x="140" y="15" fill="#4cd7f6" font-family="monospace" font-size="9" text-anchor="middle">
                        Layer 2 (Express Links)
                      </text>
                      <line x1="50" y1="20" x2="80" y2="60" stroke="#869397" stroke-width="0.75"></line>
                      <line x1="230" y1="20" x2="200" y2="60" stroke="#869397" stroke-width="0.75"></line>
                      <circle cx="80" cy="60" r="3.5" fill="#89ceff"></circle>
                      <circle cx="140" cy="55" r="3.5" fill="#89ceff"></circle>
                      <circle cx="200" cy="60" r="3.5" fill="#89ceff"></circle>
                      <line x1="80" y1="60" x2="140" y2="55" stroke="#3d494c" stroke-width="1"></line>
                      <line x1="140" y1="55" x2="200" y2="60" stroke="#3d494c" stroke-width="1"></line>
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

                <template v-else-if="proj.type === 'pipeline'">
                  <div class="text-[10px] text-[#869397] pb-2 border-b border-[#3d494c]/30 flex justify-between">
                    <span>{{ proj.diagram.title }}</span>
                    <span class="text-[#4edea3]">{{ proj.diagram.latency }}</span>
                  </div>
                  <div class="py-4 flex flex-col gap-2 text-[11px]">
                    <div
                      v-for="stage in proj.diagram.stages"
                      :key="stage.name"
                      class="flex items-center justify-between text-[#e2e2e6] bg-[#1e2023] px-3 py-1.5 rounded border border-[#3d494c]/20"
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
        </div>
      </div>
    </section>

    <!-- 04 // EXPERIENCE & WORKPLACES SECTION -->
    <section id="experience" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#0c0e11]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.experience?.sectionNumber || '04' }} // {{ portfolio.experience?.sectionTitle || 'EXPERIENCE & WORKPLACES' }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30 font-mono">
            {{ portfolio.experience?.tag || 'PRODUCTION TRACK RECORD' }}
          </span>
        </div>

        <div v-if="portfolio.experience?.summary" class="bg-[#1a1c1f]/60 p-4 rounded border border-[#3d494c]/40">
          <p class="text-[13px] sm:text-[14px] text-[#e2e2e6] leading-relaxed">
            {{ portfolio.experience.summary }}
          </p>
        </div>

        <div class="space-y-5">
          <div
            v-for="item in portfolio.experience?.items"
            :key="item.id"
            class="bg-[#111317] border border-[#3d494c]/60 rounded-lg p-5 lg:p-6 hover:border-[#4cd7f6]/60 transition-all shadow-xl group"
          >
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#3d494c]/30 pb-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[10px] text-[#4cd7f6] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1e2023] border border-[#4cd7f6]/30">
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
                  <span class="text-[11px] text-[#869397]">{{ item.type }}</span>
                </div>
                <h3 class="font-sans text-[18px] font-semibold text-[#e2e2e6] pt-1">
                  {{ item.role }}
                </h3>
                <div class="flex items-center gap-2 text-[12px] text-[#4cd7f6]">
                  <a :href="item.companyUrl || '#'" target="_blank" rel="noreferrer" class="hover:underline flex items-center gap-1">
                    <span>{{ item.company }}</span>
                    <span class="material-symbols-outlined text-[13px]">north_east</span>
                  </a>
                  <span class="text-[#3d494c]">•</span>
                  <span class="text-[#869397] text-[11px]">{{ item.location }}</span>
                </div>
              </div>
              <div class="font-mono text-[11px] text-[#4cd7f6] bg-[#1a1c1f] px-2.5 py-1 rounded border border-[#3d494c]/40 self-start sm:self-auto">
                {{ item.period }}
              </div>
            </div>

            <div class="py-3 space-y-2.5 text-[12px]">
              <p class="text-[#bcc9cd] leading-relaxed">
                {{ item.description }}
              </p>
              <ul v-if="item.achievements && item.achievements.length" class="space-y-1">
                <li
                  v-for="(ach, aIdx) in item.achievements"
                  :key="aIdx"
                  class="flex items-start gap-2 text-[#e2e2e6] leading-relaxed"
                >
                  <span class="text-[#4cd7f6] font-bold">→</span>
                  <span>{{ ach }}</span>
                </li>
              </ul>
            </div>

            <div class="pt-3 border-t border-[#3d494c]/30 flex flex-wrap items-center gap-1.5">
              <span
                v-for="tech in item.technologies"
                :key="tech"
                class="px-2 py-0.5 bg-[#1e2023] text-[#bcc9cd] font-mono text-[10px] rounded border border-[#3d494c]/30"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 // HOW I BUILD (PRINCIPLES) SECTION -->
    <section id="principles" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#111317]">
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.principles.sectionNumber }} // {{ portfolio.principles.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.principles.tag }}
          </span>
        </div>

        <div>
          <p class="font-sans text-[16px] text-[#e2e2e6] font-semibold">
            {{ portfolio.principles.headline }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="item in portfolio.principles.items"
            :key="item.id"
            class="p-4 bg-[#1a1c1f] border border-[#3d494c]/40 rounded-lg flex flex-col justify-between hover:border-[#4cd7f6]/50 transition-colors shadow-lg"
          >
            <span class="text-[10px] text-[#4cd7f6] font-bold">
              {{ item.id }}
            </span>
            <div class="py-4">
              <h4 class="font-sans text-[15px] font-semibold text-[#e2e2e6] pb-1">
                {{ item.title }}
              </h4>
              <p class="text-[12px] text-[#bcc9cd] leading-relaxed">
                {{ item.description }}
              </p>
            </div>
            <span class="text-[10px] text-[#869397] uppercase font-mono">
              {{ item.tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 06 // SYSTEM STACK SECTION -->
    <section id="stack" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#0c0e11]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.stack.sectionNumber }} // {{ portfolio.stack.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.stack.tag }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="group in portfolio.stack.groups"
            :key="group.name"
            :class="[
              'bg-[#111317] border border-[#3d494c]/50 p-5 rounded-lg shadow-lg',
              group.isWide ? 'lg:col-span-2' : ''
            ]"
          >
            <div class="text-[11px] text-[#4cd7f6] font-semibold pb-2 border-b border-[#3d494c]/20 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">{{ group.icon }}</span>
              <span>{{ group.name }}</span>
            </div>
            <div class="flex flex-wrap gap-2 pt-4">
              <span
                v-for="item in group.items"
                :key="item"
                :class="[
                  'px-2.5 py-1 text-[11px] rounded border transition-colors',
                  group.isWide
                    ? 'bg-[#1a1c1f] text-[#4cd7f6] border-[#4cd7f6]/30 font-medium'
                    : 'bg-[#1a1c1f] text-[#e2e2e6] border-[#3d494c]/30'
                ]"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07 // RESEARCH / EXPERIMENTS SECTION -->
    <section id="research" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#111317]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.research.sectionNumber }} // {{ portfolio.research.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.research.tag }}
          </span>
        </div>

        <div class="bg-[#0c0e11] border border-[#3d494c]/70 rounded-lg p-6 lg:p-8 space-y-6 shadow-xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#3d494c]/30 pb-3">
            <div>
              <span class="text-[10px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
                {{ portfolio.research.specimenTag }}
              </span>
              <h3 class="font-sans text-2xl lg:text-[28px] text-[#e2e2e6] font-semibold">
                {{ portfolio.research.specimenTitle }}
              </h3>
            </div>
            <span class="px-2.5 py-1 bg-[#1e2023] text-[#4edea3] text-[10px] rounded self-start md:self-auto border border-[#4edea3]/30 font-semibold">
              {{ portfolio.research.specimenStatus }}
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              v-for="hypo in portfolio.research.hypotheses"
              :key="hypo.num"
              class="bg-[#1a1c1f] p-5 rounded border border-[#3d494c]/40 space-y-2 text-[12px]"
            >
              <span class="text-[10px] text-[#4cd7f6] font-bold">
                {{ hypo.num }}
              </span>
              <p class="text-[#e2e2e6] font-medium leading-relaxed">
                {{ hypo.question }}
              </p>
              <p class="text-[#bcc9cd] leading-relaxed">
                {{ hypo.answer }}
              </p>
            </div>
          </div>

          <div class="bg-[#111317] p-5 rounded border border-[#3d494c]/60 text-[11px]">
            <div class="text-[#869397] uppercase pb-2 border-b border-[#3d494c]/20 mb-4 flex justify-between">
              <span>{{ portfolio.research.schematic.title }}</span>
              <span class="text-[#4edea3]">{{ portfolio.research.schematic.status }}</span>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 text-center py-2 text-[12px]">
              <template v-for="(node, nIdx) in portfolio.research.schematic.flow" :key="node">
                <div
                  :class="[
                    'px-3.5 py-2 rounded',
                    nIdx === portfolio.research.schematic.flow.length - 1
                      ? 'bg-[#1e2023] border border-[#4cd7f6]/50 text-[#4cd7f6] font-bold shadow-[0_0_12px_rgba(76,215,246,0.2)]'
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

          <div class="p-3 bg-[#1a1c1f] border border-[#3d494c]/30 rounded text-[11px] text-[#869397] flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px] text-[#4cd7f6]">info</span>
            <span>{{ portfolio.research.disclaimer }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 08 // GITHUB REPOSITORIES SECTION -->
    <section id="repos" class="w-full px-4 lg:px-10 py-12 lg:py-16 border-b border-[#282a2d]/60 bg-[#0c0e11]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.repositories.sectionNumber }} // {{ portfolio.repositories.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.repositories.tag }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="repo in portfolio.repositories.list"
            :key="repo.name"
            class="p-5 bg-[#111317] border border-[#3d494c]/50 rounded-lg hover:border-[#4cd7f6]/50 transition-colors flex flex-col justify-between group shadow-lg"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-[#869397] flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">book</span>
                  <span>{{ repo.visibility }}</span>
                </span>
                <span class="text-[10px] text-[#4edea3]">
                  {{ repo.status }}
                </span>
              </div>
              <a
                :href="repo.url"
                target="_blank"
                rel="noreferrer"
                class="font-sans text-[16px] font-semibold text-[#4cd7f6] hover:underline block pt-1"
              >
                {{ repo.name }}
              </a>
              <p class="text-[12px] text-[#bcc9cd] line-clamp-2 leading-relaxed">
                {{ repo.description }}
              </p>
            </div>

            <div class="pt-4 flex items-center justify-between text-[10px] text-[#869397] border-t border-[#3d494c]/20 mt-4">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: repo.languageColor }"></span>
                {{ repo.language }}
              </span>
              <span>{{ repo.updated }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 09 // CONTACT SECTION -->
    <section id="contact" class="w-full px-4 lg:px-10 py-12 lg:py-16 bg-[#111317]">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between border-b border-[#3d494c]/40 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="text-[11px] text-[#4cd7f6] tracking-widest uppercase font-semibold">
              {{ portfolio.contact.sectionNumber }} // {{ portfolio.contact.sectionTitle }}
            </span>
          </div>
          <span class="text-[10px] text-[#869397] uppercase px-1.5 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
            {{ portfolio.contact.tag }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0c0e11] p-6 lg:p-10 rounded-xl border border-[#3d494c]/60 shadow-2xl">
          <div class="lg:col-span-7 space-y-3">
            <h2 class="font-sans text-3xl sm:text-4xl lg:text-[40px] text-[#e2e2e6] font-semibold tracking-tight">
              {{ portfolio.contact.heading }}
            </h2>
            <p class="text-[14px] text-[#bcc9cd] max-w-xl leading-relaxed">
              {{ portfolio.contact.description }}
            </p>
          </div>

          <div class="lg:col-span-5 flex flex-col gap-3">
            <a
              :href="`mailto:${portfolio.contact.email}`"
              class="p-4 bg-[#1a1c1f] border border-[#3d494c]/50 hover:border-[#4cd7f6] rounded flex items-center justify-between group transition-colors shadow-lg"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px] text-[#4cd7f6]">mail</span>
                <div>
                  <div class="text-[10px] text-[#869397] font-semibold">
                    {{ portfolio.contact.emailLabel }}
                  </div>
                  <div class="text-[13px] text-[#e2e2e6] font-semibold">
                    {{ portfolio.contact.email }}
                  </div>
                </div>
              </div>
              <span class="material-symbols-outlined text-[#869397] group-hover:text-[#4cd7f6] group-hover:translate-x-1 transition-all text-[20px]">
                arrow_forward
              </span>
            </a>

            <div class="grid grid-cols-2 gap-3">
              <a
                v-for="link in portfolio.contact.links"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noreferrer"
                class="p-3 bg-[#1a1c1f] border border-[#3d494c]/50 hover:border-[#4cd7f6] rounded flex items-center justify-between group transition-colors"
              >
                <span class="text-[11px] text-[#e2e2e6] flex items-center gap-1.5 font-medium">
                  <span class="material-symbols-outlined text-[16px] text-[#869397] group-hover:text-[#4cd7f6]">
                    {{ link.icon }}
                  </span>
                  <span>{{ link.name }}</span>
                </span>
                <span class="material-symbols-outlined text-[16px] text-[#869397] group-hover:text-[#4cd7f6]">
                  north_east
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
