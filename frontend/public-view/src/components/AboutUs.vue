<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ===== ABOUT US SECTION (modern, reveal-all layout) =====
// Vision + Mission shown side-by-side (no hidden tabs) for max accessibility,
// followed by a numbered Mandates grid. Tailwind only, Lucide icons, brand palette.
import {
  Eye,
  Target, // Vision / Mission
  FileText,
  Users,
  ShieldCheck,
  Award, // mandate icons
  Heart,
  Star,
  Clock,
} from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'

// VISION & MISSION statements (from the prototype)
const vision = computed(() => t('about.vision'))
const mission = computed(() => t('about.mission'))

// MANDATES — seven legal mandates, each gets a number + icon
const mandates = [
  {
    icon: FileText,
    text: 'Formulate and implement social welfare measures, plans, and strategies for the municipality.',
  },
  {
    icon: Users,
    text: 'Identify the basic needs of the needy, disadvantaged, and impoverished, and implement appropriate measures to alleviate their problems.',
  },
  {
    icon: ShieldCheck,
    text: 'Provide relief and appropriate crisis intervention for victims of abuse and exploitation.',
  },
  {
    icon: Award,
    text: 'Assist in implementing programs for the total development and protection of children.',
  },
  {
    icon: Heart,
    text: 'Facilitate welfare programs for the disabled, elderly, victims of drug addiction, and rehabilitation of prisoners.',
  },
  { icon: Star, text: 'Initiate, coordinate, and support youth welfare and development programs.' },
  {
    icon: Clock,
    text: 'Be in the frontline of service delivery for immediate relief during and after man-made or natural disasters.',
  },
]
</script>

<template>
  <!-- ABOUT US — bg-slate-50 keeps it visually distinct from the white section above -->
  <section id="about" class="bg-slate-100 px-6 sm:px-12 pt-11 pb-16 text-center">
    <div class="max-w-6xl mx-auto">
      <!-- Uniform section heading -->
      <SectionHeading
        class="mb-12"
        :eyebrow="t('about.section.eyebrow')"
        :title="t('about.section.title')"
        :subtitle="t('about.section.subtitle')"
      />

      <!-- ===== VISION + MISSION (side-by-side, always visible) ===== -->
      <div class="grid lg:grid-cols-2 gap-6 mb-16">
        <!-- VISION — filled navy card (the aspirational "north star") -->
        <article
          class="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-[#16245a] to-[#1e3a6e] p-8 md:p-10"
        >
          <!-- subtle oversized watermark icon -->
          <Eye class="absolute -right-6 -top-6 w-40 h-40 text-white/5" />
          <div class="relative">
            <!-- icon badge -->
            <div
              class="w-14 h-14 rounded-2xl bg-amber-400/15 flex items-center justify-center mb-5"
            >
              <Eye class="w-7 h-7 text-amber-400" />
            </div>
            <p class="text-amber-400 font-bold tracking-[3px] text-[0.8rem] uppercase mb-3">
              {{ t('about.visionLabel') }}
            </p>
            <p class="text-white text-lg md:text-xl leading-relaxed">{{ vision }}</p>
          </div>
        </article>

        <!-- MISSION — clean white card with navy frame (the grounded "how") -->
        <article
          class="relative overflow-hidden rounded-3xl shadow-xl bg-white border-2 border-[#1f3a63]/10 p-8 md:p-10"
        >
          <!-- subtle oversized watermark icon -->
          <Target class="absolute -right-6 -top-6 w-40 h-40 text-[#1f3a63]/[0.04]" />
          <div class="relative">
            <!-- icon badge -->
            <div class="w-14 h-14 rounded-2xl bg-[#1f3a63]/5 flex items-center justify-center mb-5">
              <Target class="w-7 h-7 text-[#1f3a63]" />
            </div>
            <p class="text-[#2a5caa] font-bold tracking-[3px] text-[0.8rem] uppercase mb-3">
              {{ t('about.missionLabel') }}
            </p>
            <p class="text-[#34415c] text-lg md:text-xl leading-relaxed">{{ mission }}</p>
          </div>
        </article>
      </div>

      <!-- ===== MANDATES ===== -->
      <!-- mini sub-heading to label the block -->
      <div class="text-center mb-8">
        <p class="text-[#2a5caa] font-bold tracking-[3px] text-[0.8rem] uppercase mb-2">
          {{ t('about.mandatesLabel') }}
        </p>
        <h3 class="font-['Anton'] text-[2rem] text-[#1f3a63] tracking-[0.5px]">Our Mandates</h3>
      </div>

      <!-- numbered mandate grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="(item, i) in mandates"
          :key="i"
          class="group relative bg-white rounded-2xl border border-slate-200 p-6 pt-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2a5caa]/40"
        >
          <!-- amber top accent that grows on hover -->
          <span
            class="absolute top-0 left-6 right-6 h-[3px] rounded-full bg-amber-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
          ></span>

          <!-- header row: number badge + icon -->
          <div class="flex items-center justify-between mb-4">
            <!-- big faded number -->
            <span class="font-['Anton'] text-3xl text-[#1f3a63]/15 leading-none">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <!-- icon badge (fills navy on hover) -->
            <div
              class="w-10 h-10 rounded-xl bg-[#1f3a63]/5 flex items-center justify-center group-hover:bg-[#1f3a63] transition duration-300"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 text-[#1f3a63] group-hover:text-amber-400 transition duration-300"
              />
            </div>
          </div>

          <!-- justified text for a clean, document-like edge -->
          <p class="text-[#5a6678] text-[0.92rem] leading-relaxed text-justify hyphens-auto">
            {{ item.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
