<script setup>
/* ===== CITIZEN'S CHARTER SECTION =====
     Two parts:
     1) charterItems  -> the small "service standards" cards (top row)
     2) services      -> the detailed service cards (navy header + Requirements/Process),
                          now displayed as a carousel
     Now fully translated via i18n (charter.* keys in en.js / tl.js). */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ShieldCheck,
  Clock,
  FileText,
  Globe,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'

const { t, tm } = useI18n()

/* ---- TOP STANDARDS CARDS ---- */
const charterItems = computed(() => [
  {
    icon: ShieldCheck,
    title: t('charter.standards.commitment.title'),
    text: t('charter.standards.commitment.text'),
    featured: false,
  },
  {
    icon: Clock,
    title: t('charter.standards.processingTime.title'),
    text: t('charter.standards.processingTime.text'),
    featured: false,
  },
  {
    icon: FileText,
    title: t('charter.standards.documentary.title'),
    text: t('charter.standards.documentary.text'),
    featured: true,
  },
  {
    icon: Globe,
    title: t('charter.standards.zeroContact.title'),
    text: t('charter.standards.zeroContact.text'),
    featured: false,
  },
])

/* ---- DETAILED SERVICE CARDS ---- */
const serviceKeys = ['scsr', 'indigency', 'assistance', 'pmoc', 'counseling']

const services = computed(() =>
  serviceKeys.map((key, i) => ({
    no: String(i + 1).padStart(2, '0'),
    title: t(`charter.services.${key}.title`),
    time: t(`charter.services.${key}.time`),
    fee: t(`charter.services.${key}.fee`),
    requirements: tm(`charter.services.${key}.requirements`) || [],
    process: tm(`charter.services.${key}.process`) || [],
  }))
)

/* ---- CAROUSEL LOGIC ---- */
const carouselRef = ref(null)
const activeIndex = ref(0)

function scrollToIndex(i) {
  const container = carouselRef.value
  if (!container) return
  const card = container.children[i]
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }
  activeIndex.value = i
}

function prevSlide() {
  scrollToIndex(Math.max(0, activeIndex.value - 1))
}

function nextSlide() {
  scrollToIndex(Math.min(services.value.length - 1, activeIndex.value + 1))
}

function openCharter() {
  window.open('/MSWDOInitao-CitizensCharter.pdf', '_blank')
}
</script>

<template>
  <section
    id="charter"
    class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div id="charter">
      <SectionHeader
        :eyebrow="t('charter.section.eyebrow')"
        :title="t('charter.section.title')"
        :subtitle="t('charter.section.subtitle')"
      />

      <!-- ===== TOP STANDARDS GRID (4 cards) ===== -->
      <div
        class="grid grid-cols-4 gap-5 max-w-[1180px] mx-auto mb-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
      >
        <article
          v-for="(item, i) in charterItems"
          :key="i"
          class="bg-[#fdfdfe] border border-[#e4e9f1] rounded-[14px] px-[1.4rem] py-[1.8rem] text-center transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_26px_rgba(31,58,99,0.1)]"
          :class="
            item.featured
              ? 'border-[1.5px] border-[#c9d4e6] shadow-[0_10px_24px_rgba(31,58,99,0.08)]'
              : ''
          "
        >
          <div class="flex justify-center mb-4">
            <span
              class="inline-flex items-center justify-center w-[54px] h-[54px] rounded-[14px] border border-[#e3e8f0] shadow-sm bg-[#eef1f7] text-[#2a5caa]"
            >
              <component :is="item.icon" :size="22" :stroke-width="2.2" class="shrink-0" />
            </span>
          </div>
          <h3 class="text-[#1f3a63] text-base font-bold mb-2">{{ item.title }}</h3>
          <p
            class="text-[#6b7688] text-[0.82rem] leading-[1.5] m-0 whitespace-pre-line text-justify"
          >
            {{ item.text }}
          </p>
        </article>
      </div>
    </div>

    <!-- ===== DETAILED SERVICE CARDS (CAROUSEL) ===== -->
    <div class="relative max-w-[1180px] mx-auto mb-10">
      <div
        ref="carouselRef"
        class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <article
          v-for="(svc, i) in services"
          :key="i"
          class="snap-start shrink-0 w-full bg-white rounded-[14px] overflow-hidden shadow-[0_10px_28px_rgba(31,58,99,0.08)] text-left"
        >
          <header
            class="flex items-center justify-between gap-4 bg-[#16284a] px-[1.6rem] py-[1.1rem] flex-wrap max-[600px]:flex-col max-[600px]:items-start"
          >
            <h3
              class="flex items-center gap-[0.6rem] text-white text-[1.25rem] font-extrabold m-0"
            >
              <span class="text-[#e0b13a] font-extrabold">{{ svc.no }}</span>
              {{ svc.title }}
            </h3>
            <div class="flex items-center gap-6">
              <span
                class="inline-flex items-center gap-[0.4rem] text-white text-[0.9rem] [&_svg]:text-[#e0b13a]"
                ><Clock :size="16" /> {{ svc.time }}</span
              >
              <span
                class="inline-flex items-center gap-[0.4rem] text-white text-[0.9rem] [&_svg]:text-[#e0b13a]"
                ><FileText :size="16" /> {{ svc.fee }}</span
              >
            </div>
          </header>

          <div
            class="grid grid-cols-2 gap-0 px-[1.8rem] py-[1.6rem] max-[900px]:grid-cols-1 max-[900px]:gap-6"
          >
            <div
              class="px-6 border-r border-[#e6ebf3] max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:pb-6"
            >
              <p class="text-[#2a5caa] text-[0.8rem] font-extrabold tracking-[2px] mb-4">
                {{ t('charter.detail.requirementsLabel') }}
              </p>
              <ul class="list-none m-0 p-0">
                <li
                  v-for="(req, r) in svc.requirements"
                  :key="r"
                  class="flex items-start gap-[0.6rem] text-[#344256] text-[0.95rem] leading-[1.4] mb-[0.85rem]"
                >
                  <CheckCircle2 :size="18" class="text-[#e0b13a] flex-shrink-0 mt-px" />
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>

            <div class="px-6">
              <p class="text-[#2a5caa] text-[0.8rem] font-extrabold tracking-[2px] mb-4">
                {{ t('charter.detail.processLabel') }}
              </p>
              <ol class="list-none m-0 p-0">
                <li
                  v-for="(step, s) in svc.process"
                  :key="s"
                  class="flex items-start gap-[0.7rem] text-[#344256] text-[0.95rem] leading-[1.4] mb-[0.85rem]"
                >
                  <span
                    class="inline-flex items-center justify-center w-[26px] h-[26px] flex-shrink-0 rounded-full bg-[#1f4fa3] text-white text-[0.8rem] font-bold"
                    >{{ s + 1 }}</span
                  >
                  <span>{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>
        </article>
      </div>

      <!-- Prev / Next buttons -->
      <button
        @click="prevSlide"
        class="absolute left-[-2.8rem] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(31,58,99,0.15)] flex items-center justify-center text-[#1f3a63] hover:bg-[#eef1f7] disabled:opacity-40 disabled:cursor-not-allowed max-[1050px]:left-[-1rem] max-[600px]:hidden"
        :disabled="activeIndex === 0"
        aria-label="Previous service"
      >
        <ChevronLeft :size="20" />
      </button>
      <button
        @click="nextSlide"
        class="absolute right-[-2.8rem] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(31,58,99,0.15)] flex items-center justify-center text-[#1f3a63] hover:bg-[#eef1f7] disabled:opacity-40 disabled:cursor-not-allowed max-[1050px]:right-[-1rem] max-[600px]:hidden"
        :disabled="activeIndex === services.length - 1"
        aria-label="Next service"
      >
        <ChevronRight :size="20" />
      </button>

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-5">
        <button
          v-for="(svc, i) in services"
          :key="i"
          @click="scrollToIndex(i)"
          class="w-2.5 h-2.5 rounded-full transition-colors duration-150"
          :class="activeIndex === i ? 'bg-[#1f3a63]' : 'bg-[#c9d4e6]'"
          :aria-label="`Go to slide ${i + 1}`"
        ></button>
      </div>
    </div>

    <!-- ===== ARTA COMPLIANCE BANNER ===== -->
    <div
      class="flex items-center justify-between gap-6 max-w-[1180px] mx-auto bg-[#1f3a63] border-l-[5px] border-[#d4a526] rounded-[10px] px-[1.6rem] py-[1.3rem] text-left max-[600px]:flex-col max-[600px]:items-start"
    >
      <div>
        <p class="flex items-center gap-2 text-[#d4a526] font-bold text-[0.95rem] mb-[0.4rem]">
          <BadgeCheck :size="18" class="text-[#d4a526]" />
          {{ t('charter.arta.title') }}
        </p>
        <p class="text-[#d6ddea] text-[0.83rem] leading-[1.5] m-0 max-w-[760px]">
          {{ t('charter.arta.description') }}
        </p>
      </div>
      <button
        class="inline-flex items-center gap-[0.45rem] flex-shrink-0 bg-[#d4a526] text-[#1f3a63] border-0 rounded-[7px] px-[1.2rem] py-[0.7rem] font-bold text-[0.85rem] cursor-pointer transition-colors duration-150 ease-out hover:bg-[#e0b73a]"
        @click="openCharter"
      >
        <FileText :size="16" />
        {{ t('charter.arta.viewFullCharter') }}
      </button>
    </div>
  </section>
</template>