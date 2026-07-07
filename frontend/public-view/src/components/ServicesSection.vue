<script setup>
/* ===== SERVICES SECTION LOGIC ===== */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/SectionHeading.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getTranslatedServices, iconTone } from '@/data/services.js'

const { t } = useI18n()

/* The filter tabs shown above the cards.
   `key` is matched against each service's `category`. */
const filters = computed(() => [
  { key: 'all', label: t('services.filters.all') },
  { key: 'family-services', label: t('services.filters.familyServices') },
  { key: 'children-and-youth', label: t('services.filters.childrenAndYouth') },
  { key: 'persons-with-disabilities', label: t('services.filters.personsWithDisabilities') },
  { key: 'senior-citizens', label: t('services.filters.seniorCitizens') },
  { key: 'womens-services', label: t('services.filters.womensServices') },
  { key: 'livelihood-assistance', label: t('services.filters.livelihoodAssistance') },
  { key: 'emergency-assistance', label: t('services.filters.emergencyAssistance') },
  { key: 'justice-and-rehabilitation', label: t('services.filters.justiceAndRehabilitation') },
])

const activeFilter = ref('all')
const localizedServices = computed(() => getTranslatedServices(t))
const currentPage = ref(0)
const servicesPerPage = 8
const filterTrack = ref(null)

/* ---- scroll-edge tracking for the filter pill row ---- */
const atFilterStart = ref(true)
const atFilterEnd = ref(false)
// whether the pill row actually overflows its container at all;
// if it doesn't, there's nothing to scroll to, so arrows never show
const filterOverflows = ref(false)
// only reveal the arrows while the pointer is over the filter row
const isFilterHovered = ref(false)

function updateFilterEdges() {
  const el = filterTrack.value
  if (!el) return
  const tolerance = 1
  filterOverflows.value = el.scrollWidth > el.clientWidth + tolerance
  atFilterStart.value = el.scrollLeft <= tolerance
  atFilterEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance
}

onMounted(() => {
  nextTick(updateFilterEdges)
  // re-check on resize (e.g. rotating a tablet, resizing a window)
  window.addEventListener('resize', updateFilterEdges)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFilterEdges)
})

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

// filter labels change with locale, and the row's content width can change
// with them (e.g. translated text is longer/shorter) — recheck overflow then
watch(filters, () => {
  nextTick(updateFilterEdges)
})

function goPrev() {
  if (currentPage.value > 0) currentPage.value -= 1
}

function goNext() {
  if (currentPage.value < totalPages.value - 1) currentPage.value += 1
}

function selectFilter(key, event) {
  activeFilter.value = key
  // Keep the chosen pill comfortably in view on the scrollable track.
  event?.currentTarget?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  // scrollIntoView is smooth/async, so check edges a bit after it settles
  setTimeout(updateFilterEdges, 350)
}

function scrollFilters(direction) {
  if (!filterTrack.value) return
  const amount = 200
  filterTrack.value.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
  setTimeout(updateFilterEdges, 350)
}

/* Desktop mice only send vertical wheel deltas; redirect that motion
   into horizontal scroll so the pill row is scrollable without a trackpad. */
function onFilterWheel(event) {
  if (!filterTrack.value) return
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
  event.preventDefault()
  filterTrack.value.scrollLeft += event.deltaY
  updateFilterEdges()
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
    <div
      class="relative my-8 mx-auto flex max-w-[920px] items-center gap-1"
      @mouseenter="isFilterHovered = true"
      @mouseleave="isFilterHovered = false"
    >
      <button
        v-if="filterOverflows && !atFilterStart"
        type="button"
        class="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dfe6f0] bg-white text-[#1f3a63] shadow-sm transition-all duration-200 hover:bg-[#f4f6fa]"
        :class="isFilterHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        aria-label="Scroll filters left"
        @click="scrollFilters('prev')"
      >
        <ChevronLeft :size="16" />
      </button>

      <div
        ref="filterTrack"
        class="flex min-w-0 flex-1 items-center justify-start gap-2 overflow-x-auto scroll-smooth px-6 py-1 [&::-webkit-scrollbar]:hidden"
        style="scrollbar-width: none; mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)"
        @wheel="onFilterWheel"
        @scroll="updateFilterEdges"
      >
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.78rem] font-semibold tracking-[0.2px] transition-colors duration-150 ease-out"
          :class="
            activeFilter === f.key
              ? 'bg-[#1f3a63] text-white shadow-sm'
              : 'bg-transparent text-[#6b7790] hover:bg-white hover:text-[#1f3a63]'
          "
          :aria-pressed="activeFilter === f.key"
          @click="selectFilter(f.key, $event)"
        >
          {{ f.label }}
        </button>
      </div>

      <button
        v-if="filterOverflows && !atFilterEnd"
        type="button"
        class="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dfe6f0] bg-white text-[#1f3a63] shadow-sm transition-all duration-200 hover:bg-[#f4f6fa]"
        :class="isFilterHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        aria-label="Scroll filters right"
        @click="scrollFilters('next')"
      >
        <ChevronRight :size="16" />
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