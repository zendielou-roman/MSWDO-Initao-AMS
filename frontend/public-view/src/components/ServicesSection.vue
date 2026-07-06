<script setup>
/* ===== SERVICES SECTION LOGIC ===== */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/SectionHeading.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { services, iconTone } from '@/data/services.js'

const { t } = useI18n()

/* The filter tabs shown above the cards.
   `key` is matched against each service's `category`. */
const filters = computed(() => [
  { key: 'all', label: t('services.filters.all') },
  { key: 'health', label: t('services.filters.health') },
  { key: 'livelihood', label: t('services.filters.livelihood') },
  { key: 'pwd', label: t('services.filters.pwd') },
])

const activeFilter = ref('all')

/* Show all cards on "ALL", otherwise only the matching category. */
const visibleServices = computed(() =>
  activeFilter.value === 'all'
    ? services
    : services.filter((s) => s.category === activeFilter.value),
)
</script>

<template>
  <section
    id="services"
    class="bg-slate-100 px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <SectionHeader
      :eyebrow="t('services.section.eyebrow')"
      :title="t('services.section.title')"
      :subtitle="t('services.section.subtitle')"
    />

    <!-- ===== FILTER TABS ===== -->
    <div class="flex justify-center gap-6 sm:gap-10 my-8 flex-wrap">
      <button
        v-for="f in filters"
        :key="f.key"
        class="bg-none border-0 border-b-[3px] cursor-pointer font-bold text-[0.85rem] tracking-[1px] pb-1.5 transition-colors duration-150 ease-out"
        :class="
          activeFilter === f.key
            ? 'text-[#1f3a63] border-b-[#2f72c4]'
            : 'text-[#6b7790] border-b-transparent hover:text-[#1f3a63]'
        "
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- ===== CARD GRID (with side arrows) ===== -->
    <div class="relative max-w-[1180px] mx-auto">
      <!-- decorative left/right chevrons like the prototype -->
      <button
        class="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-9 bg-none border-0 text-[#1f3a63] cursor-pointer opacity-60 transition-opacity duration-150 ease-out hover:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft :size="22" />
      </button>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="s in visibleServices"
          :key="s.title"
          class="bg-white rounded-xl px-[1.4rem] py-6 text-left shadow-[0_6px_18px_rgba(31,58,99,0.06)] flex flex-col transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(31,58,99,0.12)]"
        >
          <!-- pastel icon chip; tone class sets its color -->
          <span
            class="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
            :class="iconTone[s.tone]"
          >
            <component :is="s.icon" :size="22" />
          </span>

          <h3 class="text-[#1f3a63] text-[0.98rem] font-extrabold leading-[1.3] mb-2.5">
            {{ s.title }}
          </h3>
          <!-- navy bold title -->
          <p class="text-[#6b7790] text-[0.85rem] leading-[1.55] mb-4 flex-1">{{ s.desc }}</p>
          <!-- gray description -->

          <!-- routes to the service's dedicated detail page, e.g. /services/aics -->
          <router-link
            :to="`/services/${s.slug}`"
            class="text-[#2a5caa] font-bold text-[0.82rem] no-underline hover:underline"
            >{{ t('services.card.learnMore') }} &rsaquo;</router-link
          >
          <!-- blue link -->
        </article>
      </div>

      <button
        class="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-9 bg-none border-0 text-[#1f3a63] cursor-pointer opacity-60 transition-opacity duration-150 ease-out hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight :size="22" />
      </button>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
</style>
