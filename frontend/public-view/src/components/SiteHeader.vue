<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Clock, Accessibility } from 'lucide-vue-next'

const phTime = ref('')
const phDate = ref('')
let timer = null

// NEW: refs for measuring
const titleRef = ref(null)     // the hidden measuring clone
const containerRef = ref(null) // the flex text column (constrains max width)
const dividerWidth = ref(0)

function measureDivider() {
  if (!titleRef.value || !containerRef.value) return
  const textWidth = titleRef.value.scrollWidth        // natural width of the text
  const maxWidth = containerRef.value.clientWidth      // available space
  dividerWidth.value = Math.min(textWidth, maxWidth)   // never exceed the column
}

function updateClock() {
  const now = new Date()
  const opts = { timeZone: 'Asia/Manila' }
  phDate.value = now.toLocaleDateString('en-US', {
    ...opts, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  phTime.value = now.toLocaleTimeString('en-US', {
    ...opts, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })
}

let resizeObserver = null

onMounted(async () => {
  updateClock()
  timer = setInterval(updateClock, 1000)

  await nextTick()
  measureDivider()

  // Recalculate whenever the header resizes (clamp() font changes with viewport)
  resizeObserver = new ResizeObserver(() => measureDivider())
  if (containerRef.value) resizeObserver.observe(containerRef.value)
})

onUnmounted(() => {
  clearInterval(timer)
  resizeObserver?.disconnect()
})
</script>

<template>
  <!--
    ===== HEADER WRAPPER ===== (the gold woven base layer)
    Tailwind notes:
    - Custom hex colors, exact px sizes, and the woven texture all use
      arbitrary value syntax: bg-[#d4a526], w-[145px], etc.
    - background-blend-mode has no built-in Tailwind utility, so it's
      set via an arbitrary property: [background-blend-mode:multiply]
    - The 900px breakpoint isn't one of Tailwind's defaults, so it uses
      the arbitrary variant max-[900px]:...
      768px IS a default breakpoint (md), so max-md:... is used for that one.
  -->
  <header
    id="site-header"
    class="relative w-full min-h-[110px] flex items-center overflow-hidden
           bg-[#d4a526] bg-[url('../assets/woven.jpg')] bg-repeat bg-[length:280px]
           [background-blend-mode:multiply]
           max-md:flex-col max-md:items-stretch"
  >
    <!-- ===== BLUE ANGLED PANEL ===== (sits on top of the gold, holds logo + titles) -->
    <div
      class="relative z-[2] flex items-center w-[73%] self-stretch px-4 py-[0.1rem]
             bg-[#2a5caa] bg-[url('../assets/woven.jpg')] bg-repeat bg-[length:280px]
             [background-blend-mode:multiply]
             [clip-path:polygon(0_0,100%_0,93%_100%,0_100%)]
             max-md:w-full max-md:[clip-path:none]"
    >
      <div class="flex items-center gap-[0.05rem] w-full">
        <!-- LOGO / municipal seal -->
        <img
          class="w-[145px] h-[145px] object-contain shrink-0 -mr-2
                 max-[900px]:w-[100px] max-[900px]:h-[100px]"
          src="@/assets/seal.png"
          alt="Municipal Seal"
        />

        <div ref="containerRef" class="text-white flex-1 min-w-0 -ml-[0.15rem] pl-0">
          <p class="text-base tracking-[1.2px] m-0 [font-weight:480]">
            REPUBLIC OF THE PHILIPPINES
          </p>

          <!-- divider sized to the measured text width, capped to the column width -->
          <div
            class="h-px mt-[0.2rem] mb-[0.3rem] bg-[rgba(182,227,3,0.55)]"
            :style="{ width: dividerWidth + 'px' }"
          ></div>

          <p class="text-[0.78rem] tracking-[0.5px] my-[0.15rem]">
            PROVINCE OF MISAMIS ORIENTAL || MUNICIPALITY OF INITAO
          </p>

          <!-- VISIBLE title, wraps normally -->
          <h1
            class="font-serif [font-weight:550] m-0 leading-[1.15]
                  tracking-[0.5px] text-[clamp(0.8rem,1.4vw,1.55rem)]
                  whitespace-normal break-words"
          >
            MUNICIPAL SOCIAL WELFARE AND DEVELOPMENT OFFICE
          </h1>

          <!-- HIDDEN clone, same font styles, used only to measure natural text width -->
          <h1
            ref="titleRef"
            aria-hidden="true"
            class="font-serif [font-weight:550] m-0 leading-[1.15]
                  tracking-[0.5px] text-[clamp(0.8rem,1.4vw,1.55rem)]
                  whitespace-nowrap absolute invisible -z-10 top-0 left-0 pointer-events-none"
          >
            MUNICIPAL SOCIAL WELFARE AND DEVELOPMENT OFFICE
          </h1>
        </div>
      </div>
    </div>

    <!-- ===== ACCESSIBILITY BUTTON ===== (black circle, top-right corner) -->
    <button
      class="absolute top-[0.6rem] right-[1.2rem] z-[5] w-[35px] h-[35px] rounded-full
             border-none bg-[#111] text-white flex items-center justify-center cursor-pointer
             shadow-[0_2px_6px_rgba(0,0,0,0.3)] hover:bg-black
             max-md:top-[0.8rem] max-md:right-[0.8rem]"
      aria-label="Accessibility options"
    >
      <!-- The little person icon (SVG). Change :size below to resize the icon. -->
      <Accessibility :size="22" />
    </button>

    <!-- ===== LIVE CLOCK ===== (on the gold area, right side) -->
    <div
      class="absolute right-[1.5rem] top-[5.1rem] z-[1] text-[#1f3a63] text-right
             max-md:static max-md:text-left max-md:px-8 max-md:py-4"
    >
      <span
        class="inline-flex items-center justify-end gap-[0.3rem] text-[0.9rem] font-normal"
      >
        <Clock :size="16" /> Philippine Standard Time:
      </span>
      <span class="block text-[1.02rem] [font-weight:570] mt-[0.1rem]">
        {{ phDate }} || {{ phTime }}
      </span>
    </div>
  </header>
</template>