import { ref, computed } from 'vue';
import rawData from '../../public/data.json';

export type Language = 'en' | 'fa';

export interface DataPayload {
  activeLang: Language;
  en: any;
  fa: any;
}

// Global reactive state initialized with bundled data
const fullData = ref<DataPayload>(rawData as unknown as DataPayload);
const currentLang = ref<Language>('en');

// Check localStorage if user previously switched language
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('app_lang') as Language;
  if (saved === 'en' || saved === 'fa') {
    currentLang.value = saved;
  }
}

// Computed active language slice
export const portfolio = computed(() => {
  return fullData.value[currentLang.value] || fullData.value.en;
});

export const activeLanguage = computed(() => currentLang.value);

export const setLanguage = (lang: Language) => {
  currentLang.value = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('app_lang', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
};

let pollTimer: number | null = null;

// Function to fetch /data.json and refresh reactive data automatically
export const refreshDataFromJson = async () => {
  try {
    const res = await fetch(`/data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json && (json.en || json.meta)) {
        // Support both bilingual {en, fa} format and single-lang format
        if (json.en) {
          fullData.value = json;
        } else {
          fullData.value.en = json;
        }
      }
    }
  } catch (err) {
    // Keep cached data
  }
};

export const startLiveRefresh = () => {
  if (pollTimer !== null) return;
  refreshDataFromJson();
  pollTimer = window.setInterval(refreshDataFromJson, 2000);
};

export const stopLiveRefresh = () => {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
};
