<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { portfolio, activeLanguage } from '../composables/usePortfolioData';
import { downloadResumePDF } from '../utils/generateResume';

// Props
const props = defineProps<{
  userHost?: string;
  terminalInfo?: string;
}>();

// Gamification State
const playerXp = ref(0);
const playerLevel = computed(() => Math.floor(playerXp.value / 100) + 1);
const xpInCurrentLevel = computed(() => playerXp.value % 100);
const soundEnabled = ref(false);

const achievements = ref<Record<string, boolean>>({
  first_command: false,
  hacker: false,
  explorer: false,
  sysadmin: false,
  matrix_master: false,
});

const achievementTitles: Record<string, { title: string; desc: string }> = {
  first_command: { title: 'INITIATE', desc: 'Executed your first terminal command' },
  hacker: { title: 'BREACH PROTOCOL', desc: 'Attempted system breach or mini-game' },
  explorer: { title: 'DEEP DIVE', desc: 'Explored portfolio projects & architecture' },
  sysadmin: { title: 'SYS_ADMIN', desc: 'Inspected system hardware & neofetch' },
  matrix_master: { title: 'THE ONE', desc: 'Triggered the matrix digital stream' },
};

const unlockedCount = computed(() => Object.values(achievements.value).filter(Boolean).length);

// Terminal History
interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'matrix';
  content?: string;
  rawHtml?: string;
}

const lines = ref<TerminalLine[]>([
  {
    id: 'init-1',
    type: 'system',
    content: 'Arch Linux 6.12.9-arch1-1 (tty1) :: Sentinel Terminal v2.4',
  },
  {
    id: 'init-2',
    type: 'output',
    content: 'Type "help" to see available commands or click quick actions below.',
  },
  {
    id: 'init-3',
    type: 'success',
    content: 'SYSTEM STATUS: All neural services running. Type "play" for cyber challenge!',
  },
]);

const currentInput = ref('');
const commandHistory = ref<string[]>([]);
const historyIndex = ref(-1);
const inputRef = ref<HTMLInputElement | null>(null);
const scrollContainer = ref<HTMLDivElement | null>(null);

// Audio Synthesis for Cyber SFX
const playSfx = (type: 'beep' | 'success' | 'error' | 'level') => {
  if (!soundEnabled.value) return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'beep') {
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'level') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.1);
      osc.frequency.setValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'error') {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Ignore audio restrictions
  }
};

const addXp = (amount: number, reason: string) => {
  const oldLevel = playerLevel.value;
  playerXp.value += amount;
  const newLevel = playerLevel.value;

  if (newLevel > oldLevel) {
    playSfx('level');
    lines.value.push({
      id: Math.random().toString(),
      type: 'success',
      content: `★ LEVEL UP! You reached LEVEL ${newLevel} [ARCH_OPERATOR]! (+${amount} XP: ${reason})`,
    });
  } else {
    playSfx('success');
  }
};

const unlockAchievement = (key: keyof typeof achievements.value) => {
  if (!achievements.value[key]) {
    achievements.value[key] = true;
    const ach = achievementTitles[key];
    lines.value.push({
      id: Math.random().toString(),
      type: 'success',
      content: `🏆 UNLOCKED ACHIEVEMENT: [${ach.title}] — ${ach.desc}! (+50 XP)`,
    });
    addXp(50, `Achievement: ${ach.title}`);
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
};

const focusInput = () => {
  inputRef.value?.focus();
};

// Mini-game State
const miniGameActive = ref(false);
const secretTarget = ref(0);
const guessesLeft = ref(3);

const executeCommand = (cmdStr: string) => {
  const trimmed = cmdStr.trim();
  if (!trimmed) return;

  commandHistory.value.push(trimmed);
  historyIndex.value = commandHistory.value.length;

  lines.value.push({
    id: Math.random().toString(),
    type: 'input',
    content: trimmed,
  });

  unlockAchievement('first_command');
  addXp(10, 'Executed command');

  const args = trimmed.split(' ').filter(Boolean);
  const root = args[0].toLowerCase();

  // If mini-game is active
  if (miniGameActive.value) {
    handleMiniGameInput(trimmed);
    currentInput.value = '';
    scrollToBottom();
    return;
  }

  switch (root) {
    case 'help':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `Available Commands:
  • whoami     - Display developer identity and core stats
  • skills     - Show technical skill proficiency bars
  • exp        - List verified production workplaces & roles
  • projects   - Showcase top engineered projects & architecture
  • neofetch   - Display developer hardware & environment specs
  • play       - Start the interactive Cyber Breach puzzle mini-game
  • matrix     - Run digital rain simulation
  • xp         - Check your player level, achievements and score
  • resume     - Download Amir Hossein's official PDF resume
  • contact    - Display email, GitHub & LinkedIn direct channels
  • clear      - Clear terminal output (keeps your XP & badges)
  • sudo       - Request root superuser privileges`,
      });
      break;

    case 'whoami':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `User: Amir Hossein Baderan (amirhossein.dev)
Role: Full-Stack Developer & AI Systems Engineer
Status: Online • 4.5+ Years Production Experience
Location: Tehran / Remote
Mission: Building low-latency backend pipelines, distributed systems, and exploring neural architectures.`,
      });
      addXp(15, 'whoami checked');
      break;

    case 'skills':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `SYSTEM PROFICIENCY METRICS:
  [.NET / C#]      [██████████████████░] 92%  (ASP.NET Core, EF Core, Microservices)
  [Flutter / Dart] [█████████████████░░] 88%  (Cross-platform Mobile, 60fps UI)
  [Python / AI]    [████████████████░░░] 82%  (FastAPI, LLM orchestration, PyTorch)
  [Go / Backend]   [██████████████░░░░░] 74%  (Gin, Concurrency, Microservices)
  [Postgres/Redis] [█████████████████░░] 86%  (Caching, High-throughput DBs)
  [Docker/Linux]   [████████████████░░░] 84%  (Containers, CI/CD, Shell)`,
      });
      addXp(20, 'Inspected skills');
      break;

    case 'exp':
    case 'experience':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `VERIFIED PRODUCTION EXPERIENCE (4.5+ YEARS):
  1. iBimeh (آی بیمه)
     Role: .NET Backend Developer [Feb 2025 — Present]
     Tech: C#, .NET Core, PostgreSQL, Redis, RabbitMQ

  2. Hamrah Electronic Avaye Parsi (همراه الکترونیک آوای پارسی)
     Role: .NET Software Engineer [Feb 2024 — Present]
     Tech: C#, ASP.NET Core, SQL Server, Clean Architecture

  3. Green Food (Austria)
     Role: Mobile Application Developer [Feb 2024 — Oct 2025]
     Tech: Flutter, Dart, REST APIs, Logistics Tracking

  4. FilmNab (فیلم ناب)
     Role: Flutter Mobile Developer [Jul 2023 — Oct 2023]
     Tech: Flutter, Hardware-accelerated Video, Offline Caching

  5. Motahar Net Pars (موسسه مطهر نت پارس)
     Role: Backend Developer [Aug 2020 — May 2022]
     Tech: C#, ASP.NET MVC, SQL Server, Automation`,
      });
      unlockAchievement('explorer');
      addXp(25, 'Reviewed experience track');
      break;

    case 'projects':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `SELECTED PRODUCTION & RESEARCH PROJECTS:
  [01] Vector DB From Scratch: Pure C HNSW graph-indexed ANN engine.
  [02] Model Serving Harness: Low-latency FastAPI + ONNX Runtime pipeline.
  [03] mini-ai-assistant: LLM multi-agent orchestration with MCP tools.
  [04] Human Brain: Autonomous epistemic cognitive loop experiment.
  [05] Rubika.Package: High-performance .NET library (NuGet v2.0.0).`,
      });
      unlockAchievement('explorer');
      addXp(25, 'Explored projects');
      break;

    case 'neofetch':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `       /\\         User: amirhossein@arch
      /  \\        OS: Arch Linux x86_64
     /\\   \\       Host: Developer Station v2026
    /      \\      Kernel: 6.12.9-zen-hardened
   /   ,,   \\     Uptime: 4.5+ years of production code
  /   |  |  -\\    Packages: .NET 9, Go 1.24, Python 3.12, Flutter 3.29
 /_-''    ''-_\\   Shell: zsh 5.9 + tmux
                  Terminal: sentinel-term-v2.4
                  Memory: 64GB DDR5 ECC / Latency: <14ms P99`,
      });
      unlockAchievement('sysadmin');
      addXp(30, 'Sysadmin specs verified');
      break;

    case 'matrix':
      lines.value.push({
        id: Math.random().toString(),
        type: 'matrix',
        content: `01000001 01101101 01101001 01110010 00100000 01001000 01101111 01110011 01110011 01100101 01101001 01101110
SYSTEM OVERRIDE DETECTED... ACCESSING CORE CIPHER...
Wake up, Neo... The Matrix has you.
Follow the cyan rabbit. 🐇`,
      });
      unlockAchievement('matrix_master');
      addXp(40, 'Matrix digital rain triggered');
      break;

    case 'play':
    case 'hack':
      startMiniGame();
      break;

    case 'xp':
    case 'stats':
      lines.value.push({
        id: Math.random().toString(),
        type: 'success',
        content: `PLAYER PROFILE STATS:
  Level: ${playerLevel.value} [${playerLevel.value >= 3 ? 'CYBER SENTINEL' : playerLevel.value === 2 ? 'ARCH-OPERATOR' : 'GUEST EXPLORER'}]
  Total XP: ${playerXp.value} XP (Next level in ${100 - xpInCurrentLevel.value} XP)
  Achievements Unlocked: ${unlockedCount.value} / ${Object.keys(achievements.value).length}
  Active Badges: ${Object.keys(achievements.value).filter(k => achievements.value[k]).map(k => `[${achievementTitles[k].title}]`).join(' ') || 'None yet'}`,
      });
      break;

    case 'resume':
    case 'cv':
      lines.value.push({
        id: Math.random().toString(),
        type: 'success',
        content: 'Initiating PDF resume generator stream... Check your downloads folder!',
      });
      downloadResumePDF(portfolio.value, activeLanguage.value);
      addXp(30, 'Downloaded resume PDF');
      break;

    case 'contact':
    case 'email':
      lines.value.push({
        id: Math.random().toString(),
        type: 'output',
        content: `DIRECT COMMUNICATION CHANNELS:
  Email:    amirhosseinbaderan.dev@proton.me
  GitHub:   https://github.com/amirhosseinbaderan
  LinkedIn: https://www.linkedin.com/in/amir-hossein-baderan-9018b9213/
  Domain:   amirhossein.dev`,
      });
      addXp(15, 'Checked contact coordinates');
      break;

    case 'sudo':
      lines.value.push({
        id: Math.random().toString(),
        type: 'error',
        content: '[SECURITY ALERT] amirhossein is not in the sudoers file. This incident has been logged to /var/log/security.log (+15 XP for hacker curiosity!)',
      });
      unlockAchievement('hacker');
      addXp(15, 'Hacker attempt');
      break;

    case 'clear':
    case 'cls':
      lines.value = [
        {
          id: Math.random().toString(),
          type: 'system',
          content: 'Terminal cleared. All XP and unlocked achievements preserved.',
        },
      ];
      break;

    default:
      playSfx('error');
      lines.value.push({
        id: Math.random().toString(),
        type: 'error',
        content: `Command not found: "${trimmed}". Type "help" to view valid commands or click quick suggestions below.`,
      });
      break;
  }

  currentInput.value = '';
  scrollToBottom();
};

const startMiniGame = () => {
  unlockAchievement('hacker');
  miniGameActive.value = true;
  secretTarget.value = Math.floor(Math.random() * 9) + 1; // 1 to 9
  guessesLeft.value = 3;

  lines.value.push({
    id: Math.random().toString(),
    type: 'system',
    content: `>>> CYBER BREACH PROTOCOL INITIALIZED <<<
A security firewall has intercepted your session!
Guess the single-digit numeric override bypass code (between 1 and 9).
You have 3 attempts remaining. Type your guess (1-9) or type "exit":`,
  });
};

const handleMiniGameInput = (guessStr: string) => {
  if (guessStr.toLowerCase() === 'exit') {
    miniGameActive.value = false;
    lines.value.push({
      id: Math.random().toString(),
      type: 'output',
      content: 'Cyber breach protocol aborted by operator.',
    });
    return;
  }

  const num = parseInt(guessStr, 10);
  if (isNaN(num) || num < 1 || num > 9) {
    lines.value.push({
      id: Math.random().toString(),
      type: 'error',
      content: 'Invalid code format. Enter a single digit between 1 and 9 (or type "exit").',
    });
    return;
  }

  guessesLeft.value--;

  if (num === secretTarget.value) {
    playSfx('level');
    lines.value.push({
      id: Math.random().toString(),
      type: 'success',
      content: `🎉 ACCESS GRANTED! You cracked the firewall bypass code [${secretTarget.value}]!
Reward: +80 XP awarded to your operator license!`,
    });
    addXp(80, 'Firewall cracked');
    miniGameActive.value = false;
  } else if (guessesLeft.value > 0) {
    playSfx('error');
    const hint = num < secretTarget.value ? 'HIGHER ▲' : 'LOWER ▼';
    lines.value.push({
      id: Math.random().toString(),
      type: 'error',
      content: `ACCESS DENIED. Signal telemetry indicates code is ${hint}. (${guessesLeft.value} attempts remaining)`,
    });
  } else {
    playSfx('error');
    lines.value.push({
      id: Math.random().toString(),
      type: 'error',
      content: `FIREWALL LOCKOUT. Correct code was [${secretTarget.value}]. Better luck next time! Type "play" to retry.`,
    });
    miniGameActive.value = false;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    executeCommand(currentInput.value);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex.value > 0) {
      historyIndex.value--;
      currentInput.value = commandHistory.value[historyIndex.value] || '';
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      currentInput.value = commandHistory.value[historyIndex.value] || '';
    } else {
      historyIndex.value = commandHistory.value.length;
      currentInput.value = '';
    }
  } else {
    playSfx('beep');
  }
};

const runPreset = (cmd: string) => {
  executeCommand(cmd);
  focusInput();
};

onMounted(() => {
  focusInput();
});
</script>

<template>
  <div
    class="bg-[#0c0e11] border border-[#3d494c] rounded-lg overflow-hidden shadow-2xl text-[12px] flex flex-col font-mono"
    @click="focusInput"
  >
    <!-- Terminal Titlebar with XP & Level Gamification HUD -->
    <div class="bg-[#1a1c1f] px-3.5 py-2 flex items-center justify-between border-b border-[#3d494c]/60 select-none flex-wrap gap-2">
      <!-- Window Controls -->
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#ff6b6b]/80 inline-block shadow-sm"></span>
        <span class="w-3 h-3 rounded-full bg-[#feca57]/80 inline-block shadow-sm"></span>
        <span class="w-3 h-3 rounded-full bg-[#1dd1a1]/80 inline-block shadow-sm"></span>
        <span class="text-[10px] text-[#869397] ml-1.5 hidden sm:inline">
          {{ props.userHost || 'amirhossein@arch: ~' }}
        </span>
      </div>

      <!-- Gamification HUD: Level & XP Bar -->
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-1.5 bg-[#0c0e11] px-2 py-0.5 rounded border border-[#3d494c]/40 text-[10px]">
          <span class="text-[#feca57] font-bold">LVL {{ playerLevel }}</span>
          <div class="w-12 h-1.5 bg-[#1e2023] rounded-full overflow-hidden border border-[#3d494c]/30">
            <div
              class="h-full bg-gradient-to-r from-[#4cd7f6] to-[#4edea3] transition-all duration-300"
              :style="{ width: `${xpInCurrentLevel}%` }"
            ></div>
          </div>
          <span class="text-[#869397] text-[9px]">{{ playerXp }} XP</span>
        </div>

        <!-- Audio SFX Toggle -->
        <button
          type="button"
          @click.stop="soundEnabled = !soundEnabled"
          :class="[
            'p-1 rounded text-[10px] flex items-center gap-1 border transition-colors',
            soundEnabled
              ? 'bg-[#1e2023] text-[#4edea3] border-[#4edea3]/40'
              : 'text-[#869397] border-[#3d494c]/30 hover:text-[#e2e2e6]'
          ]"
          :title="soundEnabled ? 'Mute terminal sound' : 'Enable retro audio SFX'"
        >
          <span class="material-symbols-outlined text-[13px]">
            {{ soundEnabled ? 'volume_up' : 'volume_off' }}
          </span>
        </button>

        <span class="text-[10px] text-[#4cd7f6]/80 hidden md:inline">
          {{ props.terminalInfo || 'zsh [interactive]' }}
        </span>
      </div>
    </div>

    <!-- Terminal Output Stream -->
    <div
      ref="scrollContainer"
      class="p-4 space-y-2.5 bg-[#0c0e11] max-h-[380px] overflow-y-auto leading-relaxed select-text"
    >
      <div
        v-for="line in lines"
        :key="line.id"
        class="whitespace-pre-wrap break-words"
      >
        <template v-if="line.type === 'input'">
          <span class="text-[#4edea3] font-bold">$ </span>
          <span class="text-[#e2e2e6]">{{ line.content }}</span>
        </template>
        <template v-else-if="line.type === 'system'">
          <span class="text-[#869397] text-[11px] italic">{{ line.content }}</span>
        </template>
        <template v-else-if="line.type === 'success'">
          <span class="text-[#4edea3]">{{ line.content }}</span>
        </template>
        <template v-else-if="line.type === 'error'">
          <span class="text-[#ff6b6b]">{{ line.content }}</span>
        </template>
        <template v-else-if="line.type === 'matrix'">
          <div class="text-[#4edea3] font-mono text-[11px] bg-[#001408] p-2 rounded border border-[#4edea3]/30 animate-pulse">
            {{ line.content }}
          </div>
        </template>
        <template v-else>
          <span class="text-[#bcc9cd]">{{ line.content }}</span>
        </template>
      </div>

      <!-- Live Input Line -->
      <div class="flex items-center gap-1.5 pt-1">
        <span class="text-[#4edea3] font-bold flex-shrink-0">$</span>
        <input
          ref="inputRef"
          v-model="currentInput"
          type="text"
          class="flex-1 bg-transparent text-[#e2e2e6] outline-none border-none p-0 font-mono text-[12px] focus:ring-0"
          placeholder="type a command (e.g. help, play, skills)..."
          @keydown="handleKeyDown"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <span class="w-2 h-4 bg-[#4cd7f6] inline-block animate-pulse flex-shrink-0"></span>
      </div>
    </div>

    <!-- Quick Action / Gamified Command Chips -->
    <div class="bg-[#141619] px-3.5 py-2 border-t border-[#3d494c]/40 flex items-center gap-1.5 overflow-x-auto text-[10px] select-none no-scrollbar">
      <span class="text-[#869397] text-[9px] uppercase tracking-wider flex-shrink-0 hidden sm:inline">
        QUICK RUN:
      </span>
      <button
        @click.stop="runPreset('help')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#4cd7f6] border border-[#3d494c]/40 transition-colors flex-shrink-0"
      >
        help
      </button>
      <button
        @click.stop="runPreset('play')"
        class="px-2 py-0.5 rounded bg-[#1e2023] hover:bg-[#feca57] text-[#feca57] hover:text-[#000] border border-[#feca57]/40 font-semibold transition-all flex-shrink-0 shadow-[0_0_8px_rgba(254,202,87,0.15)]"
      >
        ⚡ play mini-game
      </button>
      <button
        @click.stop="runPreset('skills')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#bcc9cd] hover:text-[#e2e2e6] border border-[#3d494c]/40 transition-colors flex-shrink-0"
      >
        skills
      </button>
      <button
        @click.stop="runPreset('exp')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#bcc9cd] hover:text-[#e2e2e6] border border-[#3d494c]/40 transition-colors flex-shrink-0"
      >
        exp
      </button>
      <button
        @click.stop="runPreset('neofetch')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#bcc9cd] hover:text-[#e2e2e6] border border-[#3d494c]/40 transition-colors flex-shrink-0"
      >
        neofetch
      </button>
      <button
        @click.stop="runPreset('matrix')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#4edea3] border border-[#4edea3]/30 transition-colors flex-shrink-0"
      >
        matrix
      </button>
      <button
        @click.stop="runPreset('clear')"
        class="px-2 py-0.5 rounded bg-[#1a1c1f] hover:bg-[#1e2023] text-[#869397] hover:text-[#ff6b6b] border border-[#3d494c]/40 transition-colors flex-shrink-0"
      >
        clear
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
