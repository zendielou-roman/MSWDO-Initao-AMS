<script setup>
/* ===== SERVICES SECTION LOGIC ===== */
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/SectionHeading.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getTranslatedServices, iconTone } from '@/data/services.js'

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
const localizedServices = computed(() => getTranslatedServices(t))
const currentPage = ref(0)
const servicesPerPage = 8

/* Show all cards on "ALL", otherwise only the matching category. */
const visibleServices = computed(() =>
  activeFilter.value === 'all'
    ? localizedServices.value
    : localizedServices.value.filter((s) => s.category === activeFilter.value),
)

const totalPages = computed(() => Math.max(1, Math.ceil(visibleServices.value.length / servicesPerPage)))
const safePage = computed(() => Math.min(currentPage.value, totalPages.value - 1))
const pagedServices = computed(() => {
  const start = safePage.value * servicesPerPage
  return visibleServices.value.slice(start, start + servicesPerPage)
})

watch(visibleServices, () => {
  currentPage.value = 0
})

function goPrev() {
  if (currentPage.value > 0) currentPage.value -= 1
}

function goNext() {
  if (currentPage.value < totalPages.value - 1) currentPage.value += 1
}
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

    <!-- ===== CARD CAROUSEL ===== -->
    <div class="relative max-w-[1180px] mx-auto">
      <button
        type="button"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6f0] bg-white text-[#1f3a63] shadow-sm transition hover:bg-[#f4f6fa] disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="safePage === 0"
        aria-label="Previous"
        @click="goPrev"
      >
        <ChevronLeft :size="22" />
      </button>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-10 sm:px-12">
        <article
          v-for="s in pagedServices"
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
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6f0] bg-white text-[#1f3a63] shadow-sm transition hover:bg-[#f4f6fa] disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="safePage >= totalPages - 1"
        aria-label="Next"
        @click="goNext"
      >
        <ChevronRight :size="22" />
      </button>

      <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="h-2.5 w-2.5 rounded-full transition-all"
          :class="safePage + 1 === page ? 'bg-[#2f72c4]' : 'bg-[#c7d2e1] hover:bg-[#9fb3cf]'"
          :aria-label="`Go to page ${page}`"
          @click="currentPage = page - 1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
</style>
