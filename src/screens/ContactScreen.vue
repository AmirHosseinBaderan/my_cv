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
            {{ portfolio.contact.sectionNumber }} // {{ portfolio.contact.sectionTitle }}
          </span>
        </div>
        <span class="text-[10px] text-[#869397] uppercase px-2 py-0.5 rounded bg-[#1a1c1f] border border-[#3d494c]/30">
          {{ portfolio.contact.tag }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0c0e11] p-6 lg:p-10 rounded-xl border border-[#3d494c]/60 shadow-2xl">
        <div class="lg:col-span-7 space-y-4">
          <h2 class="font-sans text-3xl sm:text-4xl lg:text-[40px] text-[#e2e2e6] font-semibold tracking-tight">
            {{ portfolio.contact.heading }}
          </h2>
          <p class="text-[14px] sm:text-[15px] text-[#bcc9cd] max-w-xl leading-relaxed">
            {{ portfolio.contact.description }}
          </p>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-4">
          <!-- Direct Email Card -->
          <a
            :href="`mailto:${portfolio.contact.email}`"
            class="p-5 bg-[#1a1c1f] border border-[#3d494c]/60 hover:border-[#4cd7f6] rounded-lg flex items-center justify-between group transition-all shadow-xl hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded bg-[#1e2023] flex items-center justify-center border border-[#3d494c]/40 group-hover:border-[#4cd7f6]/50">
                <span class="material-symbols-outlined text-[22px] text-[#4cd7f6]">mail</span>
              </div>
              <div>
                <div class="text-[10px] text-[#869397] font-semibold tracking-wider">
                  {{ portfolio.contact.emailLabel }}
                </div>
                <div class="text-[13px] sm:text-[14px] text-[#e2e2e6] font-semibold font-mono">
                  {{ portfolio.contact.email }}
                </div>
              </div>
            </div>
            <span class="material-symbols-outlined text-[#869397] group-hover:text-[#4cd7f6] group-hover:translate-x-1 transition-all text-[22px]">
              arrow_forward
            </span>
          </a>

          <!-- Social / External Links -->
          <div class="grid grid-cols-2 gap-3">
            <a
              v-for="link in portfolio.contact.links"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noreferrer"
              class="p-3.5 bg-[#1a1c1f] border border-[#3d494c]/60 hover:border-[#4cd7f6] rounded-lg flex items-center justify-between group transition-all shadow-md"
            >
              <span class="text-[12px] text-[#e2e2e6] flex items-center gap-2 font-medium">
                <span class="material-symbols-outlined text-[18px] text-[#869397] group-hover:text-[#4cd7f6]">
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

      <ScreenNavControls />
    </div>
  </div>
</template>
