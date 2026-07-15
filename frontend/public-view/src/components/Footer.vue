<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-vue-next'
import seal from '@/assets/seal.png' // MSWDO seal (column 1 + left bottom seal)
import muniSeal from '@/assets/muni-seal.png' // Municipal Government seal (right bottom seal)

const { t } = useI18n()

// Quick-link list — label + in-page anchor (or external URL)
const quickLinks = computed(() => [
  { label: t('footer.links.home'), href: '#home' },
  { label: t('footer.links.news'), href: '#news' },
  { label: t('footer.links.about'), href: '#about' },
  { label: t('footer.links.dswd'), href: 'https://www.dswd.gov.ph', external: true },
  { label: t('footer.links.municipal'), href: '#home' },
])

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#16245a] text-white">
    <!-- ===== MAIN FOOTER GRID ===== -->
    <div
      class="max-w-7xl mx-auto px-6 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
    >
      <!-- COLUMN 1 · Brand + mission tagline -->
      <div class="pb-4 min-h-[180px]">
        <div class="flex items-center gap-1 mb-4 -mt-2">
          <img :src="seal" alt="MSWDO Initao Seal" class="w-13 h-13 object-contain shrink-0" />
          <div>
            <h3 class="font-bold text-white leading-tight">MSWDO Initao</h3>
            <p class="text-[0.72rem] text-amber-400/90 leading-tight">
              Municipal Social Welfare and Development Office
            </p>
          </div>
        </div>
        <p
          class="text-white/65 text-[0.85rem] leading-relaxed max-w-[258px] text-justify hyphens-auto ml-12 -mt-4"
        >
          {{ t('footer.tagline') }}
        </p>
      </div>

      <!-- COLUMN 2 · Contact information -->
      <div>
        <h4 class="text-amber-400 font-bold uppercase tracking-[1.5px] text-[0.78rem] mb-4">
          {{ t('footer.contactTitle') }}
        </h4>
        <ul class="space-y-3 text-[0.85rem] text-white/75">
          <!-- address -->
          <li class="flex gap-2.5">
            <MapPin class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{{ t('contact.info.addressLine1') }}<br />{{ t('contact.info.addressLine2') }}</span>
          </li>
          <!-- phone -->
          <li class="flex gap-2.5 items-center">
            <Phone class="w-4 h-4 text-amber-400 shrink-0" />
            <span>{{ t('contact.info.phoneLine1') }}</span>
          </li>
          <!-- email -->
          <li class="flex gap-2.5 items-center">
            <Mail class="w-4 h-4 text-amber-400 shrink-0" />
            <span>{{ t('contact.info.emailLine1') }}</span>
          </li>
        </ul>
      </div>

      <!-- COLUMN 3 · Office hours -->
      <div>
        <h4 class="text-amber-400 font-bold uppercase tracking-[1.5px] text-[0.78rem] mb-5">
          {{ t('footer.hoursTitle') }}
        </h4>
        <p class="text-[0.85rem] text-white/75">{{ t('footer.hoursValue') }}</p>
        <p class="text-[0.78rem] text-white/45 mt-0.5">{{ t('footer.hoursNote') }}</p>
      </div>

      <!-- COLUMN 4 · Quick Links -->
      <div>
        <h4 class="text-amber-400 font-bold uppercase tracking-[1.5px] text-[0.78rem] mb-5">
          {{ t('footer.linksTitle') }}
        </h4>
        <ul class="space-y-2.5 text-[0.85rem]">
          <li v-for="link in quickLinks" :key="link.label">
            <a
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener' : undefined"
              class="group inline-flex items-center gap-1.5 text-white/75 hover:text-amber-400 transition-colors duration-200"
            >
              <ChevronRight
                class="w-3.5 h-3.5 text-amber-400/70 group-hover:translate-x-0.5 transition-transform"
              />
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- ===== AMBER COPYRIGHT BAR ===== -->
    <div class="bg-amber-400 text-[#1f3a63]">
      <!-- amber background + navy text -->

      <!-- ROW: holds the seal-group + copyright text, centered -->
      <!-- gap-0.5 = space BETWEEN the seal group and the text -->
      <!-- py-2 = bar height · px-6 = left/right padding -->
      <div
        class="max-w-2xl mx-auto px-4 py-0.5 flex items-center justify-center gap-0.5 text-center"
      >
        <!-- SEAL GROUP: keeps the two logos tightly paired together -->
        <!-- gap-[3px] = space BETWEEN the two logos (lower = closer) -->
        <div class="flex items-center gap-[1px] shrink-0">
          <!-- LEFT logo (MSWDO) · w-11 h-11 = size -->
          <img :src="seal" alt="MSWDO Seal" class="w-10 h-10 object-contain" />
          <!-- RIGHT logo (Municipal) · same size + -ml-1 overlaps it slightly toward the left -->
          <img :src="muniSeal" alt="Municipal Seal" class="w-11 h-11 object-contain -ml-1" />
        </div>
        <!-- /SEAL GROUP -->

        <!-- COPYRIGHT TEXT -->
        <p class="text-[0.82rem] font-lightbold">
          {{ t('footer.copyright', { year }) }}
        </p>
      </div>
      <!-- /ROW -->
    </div>
    <!-- /AMBER COPYRIGHT BAR -->
  </footer>
</template>
